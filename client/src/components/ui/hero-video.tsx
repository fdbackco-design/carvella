import { useEffect, useRef, useState } from "react";
import carvellaVideo from "@/assets/carvella-hero-new.mp4";
import carvellaLogo from "@/assets/carbella-logo.png";

interface HeroVideoProps {
  className?: string;
  children?: React.ReactNode;
}

export default function HeroVideo({ className = "", children }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Fallback if autoplay fails
              console.log('Video autoplay failed - using poster image');
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 } // Reduced threshold for better mobile performance
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <section 
      className={`relative min-h-[100svh] sm:h-screen bg-muted overflow-hidden ${className}`} 
      data-testid="hero-video-section"
    >
      <div className="absolute inset-0">
        {!prefersReducedMotion ? (
          <video
            ref={videoRef}
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster={carvellaLogo}
            preload="metadata"
            onLoadedData={() => setIsVideoLoaded(true)}
            data-testid="hero-video"
          >
            <source
              src={carvellaVideo}
              type="video/mp4"
            />
            {/* Fallback for unsupported video */}
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
              }}
            />
          </video>
        ) : (
          // Static image for reduced motion preference
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
            }}
          />
        )}
        <div className="absolute inset-0 bg-black/40 sm:bg-black/30"></div>
      </div>
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full max-w-4xl">
          {children}
        </div>
      </div>
    </section>
  );
}
