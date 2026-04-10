import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function NotFound() {
  return (
    <Layout>
      <section className="py-24 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <div className="rounded-[2rem] border border-border/80 bg-card p-8 shadow-sm sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">404</p>
            <h1 className="mt-4 font-heading text-4xl text-primary sm:text-5xl">Page not found</h1>
            <p className="mt-4 text-base leading-8 text-foreground/70">
              Coming soon
            </p>
            <p className="mt-2 text-base leading-8 text-foreground/70">
              Use Meku to generate content for this page.
            </p>
            <Link
              to="/"
              className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              Return home
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}