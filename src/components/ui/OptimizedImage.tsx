import React, { useState, useEffect, useRef } from 'react';

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  fallbackSrc?: string;
  containerClassName?: string;
}

const DEFAULT_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80';

// Ultra-lightweight default SVG blur shimmer data URI (prevents any initial flash or layout shift)
const DEFAULT_BLUR_DATA_URL =
  'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%25" height="100%25"%3E%3Cdefs%3E%3ClinearGradient id="g" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" stop-color="%231e293b" /%3E%3Cstop offset="50%25" stop-color="%230f172a" /%3E%3Cstop offset="100%25" stop-color="%23090d16" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23g)" /%3E%3C/svg%3E';

/**
 * Generate a tiny, low-bandwidth blur-up image URL from supported CDN sources (e.g. Unsplash)
 * Emulates next/image blurDataURL placeholder generation
 */
function getLowResPlaceholder(src: string): string | null {
  if (!src) return null;
  if (src.includes('images.unsplash.com')) {
    try {
      const url = new URL(src);
      url.searchParams.set('w', '32');
      url.searchParams.set('q', '15');
      url.searchParams.set('auto', 'format');
      url.searchParams.set('blur', '40');
      return url.toString();
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Next.js 'next/image' style optimized image component for React:
 * - Blur-up progressive placeholder loading
 * - Native decoding="async" and loading="lazy" (or eager with priority)
 * - Shimmer skeleton background while fetching
 * - Zero Cumulative Layout Shift (CLS)
 * - Reliable fallback handling on network drops
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  placeholder = 'blur',
  blurDataURL,
  objectFit = 'contain',
  objectPosition = 'center',
  fallbackSrc = DEFAULT_FALLBACK_IMAGE,
  className = '',
  containerClassName = '',
  style,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Derive dynamic blur source
  const lowResUrl = getLowResPlaceholder(currentSrc);
  const placeholderSrc = blurDataURL || lowResUrl || DEFAULT_BLUR_DATA_URL;

  // Sync if source prop updates dynamically
  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  // Check if image is already cached in memory by browser
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [currentSrc]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(e);
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError && currentSrc !== fallbackSrc) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    } else {
      setIsLoaded(true); // Don't keep placeholder spinning if fallback fails
    }
    if (onError) {
      onError(e);
    }
  };

  // Inline container styles for layout containment
  const containerStyle: React.CSSProperties = fill
    ? {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }
    : {
        position: 'relative',
        width: width || '100%',
        height: height || '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      };

  return (
    <div
      className={`optimized-image-container relative select-none ${containerClassName}`}
      style={containerStyle}
    >
      {/* 1. Shimmer Skeleton Background (Visible until fully loaded) */}
      {!isLoaded && (
        <div
          className="absolute inset-0 w-full h-full image-shimmer-bg pointer-events-none z-0"
          aria-hidden="true"
        />
      )}

      {/* 2. Blur-Up Low-Res Placeholder Layer (Visible during fetch, smoothly fades out) */}
      {placeholder === 'blur' && !isLoaded && (
        <img
          src={placeholderSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none z-1 transform scale-110 filter blur-lg opacity-85 transition-opacity duration-500 ease-out"
          style={{
            objectFit,
            objectPosition
          }}
        />
      )}

      {/* 3. Primary Full-Resolution Image */}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          objectFit,
          objectPosition,
          ...style
        }}
        className={`transition-all duration-500 ease-out z-2 ${
          isLoaded
            ? 'opacity-100 filter-none scale-100'
            : 'opacity-0 filter blur-sm scale-[1.02]'
        } ${fill ? 'w-full h-full' : ''} ${className}`}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
