import React from 'react';
import { ExternalLink, PlayCircle } from 'lucide-react';

type VideoPreviewProps = {
  url: string;
};

function getYouTubeEmbedUrl(url: string) {
  try {
    const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
    const longMatch = url.match(/[?&]v=([^&]+)/);
    const embedId = shortMatch?.[1] || longMatch?.[1];

    if (!embedId) return '';

    return `https://www.youtube.com/embed/${embedId}`;
  } catch {
    return '';
  }
}

export default function VideoPreview({ url }: VideoPreviewProps) {
  const embedUrl = getYouTubeEmbedUrl(url);

  if (!embedUrl) {
    return (
      <div className="rounded-3xl border border-border/80 bg-card p-8">
        <div className="flex items-center gap-3 text-primary">
          <PlayCircle className="h-5 w-5" />
          <p className="text-sm font-medium">Invalid YouTube link preview</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm">
      <div className="aspect-video">
        <iframe
          src={embedUrl}
          title="YouTube preview"
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <div className="flex items-center justify-between gap-4 p-5">
        <p className="text-sm text-foreground/65">Embedded video preview</p>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 px-4 py-2 text-sm font-semibold text-primary transition-all duration-300 hover:scale-105 hover:border-primary/40 hover:bg-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/50"
        >
          Open link
          <ExternalLink className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}