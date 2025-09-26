import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  skeleton?: boolean;
  aspectRatio?: string;
  sizes?: string;
  loading?: "lazy" | "eager";
  'data-testid'?: string;
}

export default function ResponsiveImage({
  src,
  alt,
  className = "",
  priority = false,
  skeleton = true,
  aspectRatio = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  loading = "lazy",
  'data-testid': testId,
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate responsive sources for external images
  const generateResponsiveSrc = (originalSrc: string) => {
    if (originalSrc.includes('unsplash.com')) {
      // Extract base URL and create responsive variants
      const baseUrl = originalSrc.split('?')[0];
      const params = 'ixlib=rb-4.0.3&auto=format&fit=crop';
      
      return {
        src: `${baseUrl}?${params}&w=800&h=600&q=75`,
        srcSet: [
          `${baseUrl}?${params}&w=400&h=300&q=75 400w`,
          `${baseUrl}?${params}&w=600&h=450&q=75 600w`,
          `${baseUrl}?${params}&w=800&h=600&q=75 800w`,
          `${baseUrl}?${params}&w=1200&h=900&q=75 1200w`,
        ].join(', ')
      };
    }
    
    // For local assets, return as-is (could be enhanced with build-time optimization)
    return {
      src: originalSrc,
      srcSet: ''
    };
  };

  const { src: optimizedSrc, srcSet } = generateResponsiveSrc(src);

  useEffect(() => {
    // Preload critical images
    if (priority) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = optimizedSrc;
      document.head.appendChild(link);
    }
  }, [priority, optimizedSrc]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  return (
    <div className={cn("relative overflow-hidden", aspectRatio, className)}>
      {/* Skeleton loader */}
      {skeleton && !isLoaded && !hasError && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <div className="text-center p-4">
            <div className="text-muted-foreground text-sm">이미지를 불러올 수 없습니다</div>
          </div>
        </div>
      )}

      {/* Main image */}
      <img
        ref={imgRef}
        src={optimizedSrc}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading={priority ? "eager" : loading}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        data-testid={testId}
      />
    </div>
  );
}