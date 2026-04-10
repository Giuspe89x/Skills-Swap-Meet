import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import AdminEditor from '../components/AdminEditor';

export default function Admin() {
  return (
    <Layout>
      <section className="border-b border-border/70 bg-secondary/35 py-24 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-5xl leading-tight text-primary sm:text-6xl">Admin</h1>
            <p className="mt-6 text-lg leading-8 text-foreground/72">
              Sign in to manage article content, categories, homepage copy, About page details, images, and YouTube
              previews from a streamlined editing workspace.
            </p>
          </motion.div>
        </div>
      </section>

      <AdminEditor />
    </Layout>
  );
}