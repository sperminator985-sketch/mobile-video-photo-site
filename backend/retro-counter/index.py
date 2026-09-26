import os
import io
import json
import hashlib
import base64

import psycopg2

SCHEMA = 't_p68468339_mobile_video_photo_s'

SEG = {
    '0': 'abcdef', '1': 'bc', '2': 'abdeg', '3': 'abcdg', '4': 'bcfg',
    '5': 'acdfg', '6': 'acdefg', '7': 'abc', '8': 'abcdefg', '9': 'abcdfg',
}

W, H = 16, 24
ON = (51, 255, 51)
OFF = (20, 50, 20)
BG = (0, 0, 0)
BORD = (90, 90, 90)


def build_gif(number: int, digits: int = 5) -> bytes:
    from PIL import Image, ImageDraw

    text = str(number).zfill(digits)[-digits:]
    im = Image.new('RGB', (W * len(text), H), BG)
    dr = ImageDraw.Draw(im)

    t, m = 2, 3
    for i, ch in enumerate(text):
        ox = i * W
        x0, y0, x1, y1 = ox + m, m, ox + W - m - 1, H - m - 1
        ym = (y0 + y1) // 2
        segs = {
            'a': [(x0 + t, y0), (x1 - t, y0 + t)],
            'b': [(x1 - t, y0 + t), (x1, ym - t // 2)],
            'c': [(x1 - t, ym + t // 2), (x1, y1 - t)],
            'd': [(x0 + t, y1 - t), (x1 - t, y1)],
            'e': [(x0, ym + t // 2), (x0 + t, y1 - t)],
            'f': [(x0, y0 + t), (x0 + t, ym - t // 2)],
            'g': [(x0 + t, ym - t // 2), (x1 - t, ym + t // 2)],
        }
        on = SEG.get(ch, '')
        for k, (p, q) in segs.items():
            dr.rectangle([p, q], fill=ON if k in on else OFF)
        dr.rectangle([ox, 0, ox + W - 1, H - 1], outline=BORD)

    buf = io.BytesIO()
    im.convert('P', palette=Image.ADAPTIVE, colors=8).save(buf, format='GIF')
    return buf.getvalue()


def handler(event: dict, context) -> dict:
    """Счётчик посещений ретро-версии сайта: считает визиты и отдаёт GIF-табло с числом."""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    params = event.get('queryStringParameters') or {}
    name = params.get('name', 'retro_index')
    fmt = params.get('format', 'gif')

    ip = ((event.get('requestContext') or {}).get('identity') or {}).get('sourceIp', '')
    ip_hash = hashlib.sha256((name + '|' + str(ip)).encode()).hexdigest()

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    conn.autocommit = True
    cur = conn.cursor()

    safe_name = name.replace("'", "''")[:64]
    safe_hash = ip_hash.replace("'", "''")

    cur.execute(
        "DELETE FROM %s.retro_counter_seen WHERE seen_at < NOW() - INTERVAL '12 hours'" % SCHEMA
    )

    cur.execute(
        "INSERT INTO %s.retro_counter_seen (ip_hash) VALUES ('%s') "
        "ON CONFLICT (ip_hash) DO NOTHING RETURNING ip_hash" % (SCHEMA, safe_hash)
    )
    is_new = cur.fetchone() is not None

    if is_new:
        cur.execute(
            "INSERT INTO %s.retro_counter (name, hits) VALUES ('%s', 1) "
            "ON CONFLICT (name) DO UPDATE SET hits = %s.retro_counter.hits + 1, "
            "updated_at = NOW() RETURNING hits" % (SCHEMA, safe_name, SCHEMA)
        )
        row = cur.fetchone()
    else:
        cur.execute(
            "SELECT hits FROM %s.retro_counter WHERE name = '%s'" % (SCHEMA, safe_name)
        )
        row = cur.fetchone()

    hits = int(row[0]) if row else 0

    cur.close()
    conn.close()

    if fmt == 'json':
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
            },
            'isBase64Encoded': False,
            'body': json.dumps({'name': name, 'hits': hits}),
        }

    gif = build_gif(hits, digits=int(params.get('digits', 5)))

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'image/gif',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
        },
        'isBase64Encoded': True,
        'body': base64.b64encode(gif).decode(),
    }
