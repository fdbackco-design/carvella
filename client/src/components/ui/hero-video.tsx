import { useEffect, useRef } from "react";

interface HeroVideoProps {
  className?: string;
  children?: React.ReactNode;
}

export default function HeroVideo({ className = "", children }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Fallback if autoplay fails
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <section className={`relative h-screen bg-muted overflow-hidden ${className}`} data-testid="hero-video-section">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          data-testid="hero-video"
        >
          {/* Using a placeholder video URL - in production this would be the actual brand video */}
          <source
            src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761"
            type="video/mp4"
          />
          {/* Fallback image */}
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
            }}
          />
        </video>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
        {children}
      </div>
    </section>
  );
}
