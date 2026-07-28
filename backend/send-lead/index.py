import json
import os
import smtplib
from email.mime.text import MIMEText
from email.header import Header


def handler(event: dict, context) -> dict:
    '''Принимает заявку с формы сайта и отправляет её на почту студии по SMTP.'''
    method = event.get('httpMethod', 'GET')

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    try:
        data = json.loads(event.get('body') or '{}')
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Invalid JSON'}),
        }

    name = (data.get('name') or '').strip()
    phone = (data.get('phone') or '').strip()
    date = (data.get('date') or '').strip()
    message = (data.get('message') or '').strip()

    if len(name) < 2 or len(''.join(ch for ch in phone if ch.isdigit())) < 10:
        return {
            'statusCode': 400,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Проверьте имя и телефон'}),
        }

    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    recipient = 'daumsam@mail.ru'

    lines = [
        'Новая заявка с сайта Айсберг-видео',
        '',
        f'Имя: {name}',
        f'Телефон: {phone}',
        f'Дата свадьбы: {date or "не указана"}',
        f'Комментарий: {message or "нет"}',
    ]
    body_text = '\n'.join(lines)

    msg = MIMEText(body_text, 'plain', 'utf-8')
    msg['Subject'] = Header('Новая заявка с сайта', 'utf-8')
    msg['From'] = smtp_user
    msg['To'] = recipient

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, [recipient], msg.as_string())

    return {
        'statusCode': 200,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'body': json.dumps({'ok': True}),
    }
