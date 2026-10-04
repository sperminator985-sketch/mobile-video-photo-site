import { zipSync } from 'fflate';

const PUBLIC_FILES = [
  'favicon.svg',
  'placeholder.svg',
  'robots.txt',
  'sitemap.xml',
  '.htaccess',
  'assets/iceberg-video-logo-text.png',
  'retro/index.html',
  'retro/about.html',
  'retro/foto.html',
  'retro/price.html',
  'retro/kontakt.html',
  'retro/zakaz.html',
  'retro/zayavka.php',
  'retro/counter.php',
  'retro/.htaccess',
  'retro/favicon.ico',
  'retro/img/hero.jpg',
  'retro/img/cnt_fallback.gif',
  'retro/img/bg2.gif',
  'retro/img/logo.gif',
  'retro/img/p1.jpg',
  'retro/img/p2.jpg',
  'retro/img/p3.jpg',
  'retro/img/p4.jpg',
  'retro/img/p5.jpg',
  'retro/img/p6.jpg',
  'retro/img/p7.jpg',
  'retro/img/p8.jpg',
];

const fetchBytes = async (path: string) => {
  const res = await fetch(`/${path}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const type = res.headers.get('content-type') || '';
  if (type.includes('text/html') && !path.endsWith('.html')) return null;
  return new Uint8Array(await res.arrayBuffer());
};

const localRefs = (text: string) => {
  const found = new Set<string>();
  const re = /["'(]\/((?:assets|retro)\/[^"'()\s?#]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) found.add(m[1]);
  return found;
};

export const downloadBuild = async () => {
  if (import.meta.env.DEV) {
    throw new Error('Скачивание работает только на опубликованной версии сайта');
  }

  const files: Record<string, Uint8Array> = {};
  const decoder = new TextDecoder();
  const queue = new Set<string>(PUBLIC_FILES);

  const indexBytes = await fetchBytes('index.html');
  if (!indexBytes) throw new Error('Не удалось получить главную страницу');
  files['index.html'] = indexBytes;
  localRefs(decoder.decode(indexBytes)).forEach((p) => queue.add(p));

  const done = new Set<string>();
  while (done.size < queue.size) {
    const batch = [...queue].filter((p) => !done.has(p));
    await Promise.all(
      batch.map(async (path) => {
        done.add(path);
        const bytes = await fetchBytes(path);
        if (!bytes) return;
        files[path] = bytes;
        if (/\.(js|css)$/.test(path)) {
          localRefs(decoder.decode(bytes)).forEach((p) => queue.add(p));
        }
      }),
    );
  }

  const zip = zipSync(files, { level: 9 });
  const blob = new Blob([zip], { type: 'application/zip' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const date = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `icebergvideo-build-${date}.zip`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
};

const PASSWORD_HASH = '22514a2f98aa6de612a1c47719512513b9273f66070d41157271f18764f51f15';

export const checkPassword = async (value: string) => {
  if (!window.crypto?.subtle) return false;
  const digest = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  const hex = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hex === PASSWORD_HASH;
};
