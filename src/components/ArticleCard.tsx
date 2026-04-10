import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, PlayCircle } from 'lucide-react';
import type { Article } from '../context/SiteContext';

type ArticleCardProps = {
  article: Article;
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

const fallbackImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="720" height="480"%3E%3Crect fill="%23e5e7eb" width="720" height="480"/%3E%3C/svg%3E';

export default function ArticleCard({ article }: ArticleCardProps) {
  const [imageSrc, setImageSrc] = React.useState(article.imageUrl || fallbackImage);
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      setImageSrc(fallbackImage);
    }
  };

  return (
    <article className="group overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <img
          src={imageSrc}
          alt={article.title}
          width={720}
          height={480}
          className="h-56 w-full object-cover"
          loading="lazy"
          onError={handleImageError}
        />
        <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/35 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {article.category}
        </div>
      </div>

      <div className="space-y-5 p-8">
        <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60">
          <span className="inline-flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {formatDate(article.createdAt)}
          </span>
          <span className="inline-flex items-center gap-2">
            <Tag className="h-5 w-5" />
            {article.category}
          </span>
          {article.youtubeUrl ? (
            <span className="inline-flex items-center gap-2 text-primary">
              <PlayCircle className="h-5 w-5" />
              Video included
            </span>
          ) : null}
        </div>

        <div>
          <h3 className="font-heading text-2xl leading-tight text-primary transition-colors duration-300 group-hover:text-primary/85">
            {article.title}
          </h3>
          <p className="mt-3 line-clamp-4 text-base leading-7 text-foreground/72">
            {article.excerpt || article.content}
          </p>
        </div>

        <Link
          to="/articles"
          className="inline-flex rounded-full border border-primary/20 px-5 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:scale-105 hover:border-primary/40 hover:bg-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/50"
        >
          Read more
        </Link>
      </div>
    </article>
  );
}