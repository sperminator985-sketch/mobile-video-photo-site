import { useEffect, useRef, useState } from 'react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  priority?: boolean;
  maxRetries?: number;
}

const SmartImage = ({
  src,
  priority = false,
  maxRetries = 3,
  className = '',
  ...props
}: SmartImageProps) => {
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);
  const timerRef = useRef<number>();

  useEffect(() => {
    setAttempt(0);
    setFailed(false);
  }, [src]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const handleError = () => {
    if (attempt >= maxRetries) {
      setFailed(true);
      return;
    }
    const delay = 600 * Math.pow(2, attempt);
    timerRef.current = window.setTimeout(() => {
      setAttempt((a) => a + 1);
    }, delay);
  };

  const resolvedSrc = attempt === 0 ? src : `${src}${src.includes('?') ? '&' : '?'}r=${attempt}`;

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-muted text-muted-foreground ${className}`}
        aria-label={props.alt || 'Изображение недоступно'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
      </div>
    );
  }

  return (
    <img
      key={resolvedSrc}
      src={resolvedSrc}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      {...{ fetchpriority: priority ? 'high' : 'auto' }}
      onError={handleError}
      className={className}
      {...props}
    />
  );
};

export default SmartImage;