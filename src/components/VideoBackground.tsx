import { ImageWithFallback } from "@/components/ImageWithFallback";

type VideoBackgroundProps = {
  poster: string;
  video?: string;
  alt: string;
};

export function VideoBackground({ poster, video, alt }: VideoBackgroundProps) {
  if (!video) {
    return (
      <ImageWithFallback
        src={poster}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover motion-safe:scale-105"
      />
    );
  }

  return (
    <video
      className="h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      aria-label={alt}
    >
      <source src={video} type="video/mp4" />
    </video>
  );
}
