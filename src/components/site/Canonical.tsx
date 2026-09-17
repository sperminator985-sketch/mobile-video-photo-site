import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE = 'https://icebergvideo.ru';

const setTag = (selector: string, create: () => HTMLElement, value: string) => {
  let el = document.head.querySelector(selector) as HTMLElement | null;
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  if (el.tagName === 'LINK') el.setAttribute('href', value);
  else el.setAttribute('content', value);
};

const Canonical = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const clean = pathname.replace(/\/+$/, '') || '/';
    const url = clean === '/' ? `${SITE}/` : `${SITE}${clean}`;

    setTag(
      'link[rel="canonical"]',
      () => {
        const l = document.createElement('link');
        l.setAttribute('rel', 'canonical');
        return l;
      },
      url,
    );

    setTag(
      'meta[property="og:url"]',
      () => {
        const m = document.createElement('meta');
        m.setAttribute('property', 'og:url');
        return m;
      },
      url,
    );
  }, [pathname]);

  return null;
};

export default Canonical;
