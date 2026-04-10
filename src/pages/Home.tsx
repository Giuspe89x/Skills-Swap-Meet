import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpenText, Layers3 } from 'lucide-react';
import Layout from '../components/Layout';
import SectionHeading from '../components/SectionHeading';
import ArticleCard from '../components/ArticleCard';
import CategoryPills from '../components/CategoryPills';
import { useSite } from '../context/SiteContext';

const fallbackImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="900" height="720"%3E%3Crect fill="%23e5e7eb" width="900" height="720"/%3E%3C/svg%3E';

export default function Home() {
  const { articles, categories, homepageContent } = useSite();
  const [activeCategory, setActiveCategory] = useState('All');
  const [heroImageSrc, setHeroImageSrc] = React.useState(homepageContent.heroImageUrl || fallbackImage);
  const [heroImageError, setHeroImageError] = React.useState(false);

  const filteredArticles =
    activeCategory === 'All'
      ? articles.slice(0, 3)
      : articles.filter((article) => article.category === activeCategory).slice(0, 3);

  const handleHeroImageError = () => {
    if (!heroImageError) {
      setHeroImageError(true);
      setHeroImageSrc(fallbackImage);
    }
  };

  return (
    <Layout>
      <section className="relative overflow-hidden border-b border-border/70 bg-secondary/35 py-24 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsla(var(--accent-strong),0.18),transparent_38%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/80 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
              <BookOpenText className="h-5 w-5" />
              Minimal publishing for modern readers
            </div>
            <h1 className="font-heading text-5xl leading-tight text-primary sm:text-6xl">
              {homepageContent.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/72">
              {homepageContent.heroText}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#recent-articles"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                Explore articles
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#categories"
                className="inline-flex items-center justify-center rounded-full border border-primary/20 px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:scale-105 hover:border-primary/40 hover:bg-background/80 focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                Browse categories
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="rounded-[2rem] border border-border/70 bg-card p-8 shadow-lg"
          >
            <img
              src={heroImageSrc}
              alt="Homepage hero"
              width={900}
              height={720}
              className="h-72 w-full rounded-[1.5rem] object-cover"
              loading="lazy"
              onError={handleHeroImageError}
            />
            <div className="mt-6 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-accent/35 px-4 py-2 text-sm font-medium text-primary">
                <Layers3 className="h-5 w-5" />
                Thoughtful writing, simple structure
              </div>
              <p className="text-base leading-8 text-foreground/72">
                Publish articles with categories, imagery, and media support while keeping the experience calm,
                readable, and easy to manage.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="categories" className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Discover"
            title="Browse by category"
            description="Use simple category navigation to move through recent topics and find the articles most relevant to your interests."
          />
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <CategoryPills
              categories={categories}
              activeCategory={activeCategory}
              onSelect={setActiveCategory}
            />
          </motion.div>
        </div>
      </section>

      <section id="recent-articles" className="border-t border-border/70 bg-secondary/35 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Recent"
            title="Latest articles"
            description="A curated stream of recent writing presented with clean cards, easy scanning, and mobile-friendly spacing."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))
            ) : (
              <div className="rounded-[2rem] border border-border/80 bg-card p-8 text-left shadow-sm">
                <h3 className="font-heading text-2xl text-primary">No articles yet</h3>
                <p className="mt-3 text-base leading-8 text-foreground/70">
                  Add articles from the admin panel to see them here.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}