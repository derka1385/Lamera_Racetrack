"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ImageWithFallbackProps = Omit<ImageProps, "src" | "alt"> & {
  src?: string;
  alt: string;
  fallbackClassName?: string;
};

export function ImageWithFallback({
  src,
  alt,
  className,
  fallbackClassName,
  ...props
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex h-full min-h-48 w-full items-center justify-center bg-[linear-gradient(135deg,#0b0f0c,#1a1f1b_55%,#0d120f)]",
          fallbackClassName,
        )}
      >
        <span className="grid h-14 w-14 place-items-center rounded border border-brand/40 text-sm font-bold text-brand">
          RTC
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
