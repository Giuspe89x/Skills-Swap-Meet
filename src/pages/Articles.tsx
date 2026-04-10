import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import SectionHeading from '../components/SectionHeading';
import ArticleCard from '../components/ArticleCard';
import CategoryPills from '../components/CategoryPills';
import VideoPreview from '../components/VideoPreview';
import { useSite } from '../context/SiteContext';

export default function Articles() {
  const { articles, categories } = useSite();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredArticles =
    activeCategory === 'All'
      ? articles
      : articles.filter((article) => article.category === activeCategory);

  const featuredVideoArticle = filteredArticles.find((article) => article.youtubeUrl);

  return (
    <Layout>
      <section className="border-b border-border/70 bg-secondary/35 py-24 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="font-heading text-5xl leading-tight text-primary sm:text-6xl">Articles</h1>
            <p className="text-lg leading-8 text-foreground/72">
              Browse recent writing by category, explore visual article previews, and discover posts with embedded
              YouTube references.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <CategoryPills
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />

          {featuredVideoArticle?.youtubeUrl ? (
            <div className="mt-12">
              <SectionHeading
                eyebrow="Featured media"
                title={featuredVideoArticle.title}
                description="A linked YouTube preview appears directly alongside article browsing when available."
              />
              <div className="mt-8 max-w-4xl">
                <VideoPreview url={featuredVideoArticle.youtubeUrl} />
              </div>
            </div>
          ) : null}

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))
            ) : (
              <div className="rounded-[2rem] border border-border/80 bg-card p-8 shadow-sm">
                <h2 className="font-heading text-2xl text-primary">No articles found</h2>
                <p className="mt-3 text-base leading-8 text-foreground/70">
                  Try a different category or add articles from the admin panel.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}