import React from 'react';
import { motion } from 'framer-motion';
import { PenSquare, Shapes, ShieldCheck } from 'lucide-react';
import Layout from '../components/Layout';
import SectionHeading from '../components/SectionHeading';
import { useSite } from '../context/SiteContext';

const highlights = [
  {
    title: 'Simple editorial flow',
    description:
      'Create and update homepage copy, About page text, and article content through a focused admin space.',
    icon: PenSquare,
  },
  {
    title: 'Structured publishing',
    description:
      'Organize content with categories, visual thumbnails, and optional YouTube references for richer storytelling.',
    icon: Shapes,
  },
  {
    title: 'Secure-looking access',
    description:
      'The admin experience includes a gated login interface tailored for content management workflows.',
    icon: ShieldCheck,
  },
];

export default function About() {
  const { aboutContent } = useSite();

  return (
    <Layout>
      <section className="border-b border-border/70 bg-secondary/35 py-24 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-5xl leading-tight text-primary sm:text-6xl">
              {aboutContent.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-foreground/72">{aboutContent.content}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Overview"
            title="Built for calm reading and practical publishing"
            description="The product experience balances minimalist presentation with the essential tools needed to manage a growing article library."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-[2rem] border border-border/80 bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-5 inline-flex rounded-full border border-accent/30 bg-accent/15 p-3 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="font-heading text-2xl text-primary">{item.title}</h2>
                  <p className="mt-3 text-base leading-8 text-foreground/70">{item.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}