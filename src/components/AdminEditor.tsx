import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  ImagePlus,
  KeyRound,
  LockKeyhole,
  PencilLine,
  PlusCircle,
  Save,
  Trash2,
  Type,
  AlertTriangle,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import VideoPreview from './VideoPreview';
import { useSite } from '../context/SiteContext';
import type { Article } from '../context/SiteContext';

function createBlankArticle(categories: string[]): Article {
  const now = new Date().toISOString();
  return {
    id: Date.now(),
    title: '',
    content: '',
    excerpt: '',
    category: categories.find((c) => c !== 'All') ?? 'General',
    imageUrl:
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    youtubeUrl: '',
    createdAt: now,
    updatedAt: now,
  };
}

export default function AdminEditor() {
  const {
    articles,
    categories,
    homepageContent,
    aboutContent,
    adminPassword,
    addArticle,
    updateArticle,
    deleteArticle,
    addCategory,
    deleteCategory,
    setHomepageContent,
    setAboutContent,
    setAdminPassword,
  } = useSite();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<Article | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [confirmDeleteCategory, setConfirmDeleteCategory] = useState<string | null>(null);
  const [draftHome, setDraftHome] = useState(homepageContent);
  const [draftAbout, setDraftAbout] = useState(aboutContent);
  const [homeImageError, setHomeImageError] = useState(false);

  // Change password state
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  const updateDraft = (field: keyof Article, value: string) => {
    setDraft((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === adminPassword) {
      setIsAuthenticated(true);
      if (articles.length > 0) {
        setEditingId(articles[0].id);
        setDraft({ ...articles[0] });
      }
      toast.success('Admin session unlocked');
      return;
    }
    toast.error('Invalid password');
  };

  const handleSelectArticle = (article: Article) => {
    setEditingId(article.id);
    setDraft({ ...article });
    setConfirmDeleteId(null);
  };

  const handleAddArticle = () => {
    const blank = createBlankArticle(categories);
    addArticle(blank);
    setEditingId(blank.id);
    setDraft({ ...blank });
    setConfirmDeleteId(null);
    toast.success('New draft article created');
  };

  const handleSaveArticle = () => {
    if (!draft) return;

    if (!draft.title.trim()) {
      toast.error('Article title is required');
      return;
    }
    if (!draft.category || draft.category === 'All') {
      toast.error('Please select a valid category');
      return;
    }

    const isNew = !articles.find((a) => a.id === draft.id);
    if (isNew) {
      addArticle(draft);
    } else {
      updateArticle(draft);
    }
    toast.success('Article saved');
  };

  const handleRequestDelete = (id: number) => {
    setConfirmDeleteId(id);
  };

  const handleConfirmDelete = (id: number) => {
    deleteArticle(id);
    setConfirmDeleteId(null);
    if (editingId === id) {
      const remaining = articles.filter((a) => a.id !== id);
      if (remaining.length > 0) {
        setEditingId(remaining[0].id);
        setDraft({ ...remaining[0] });
      } else {
        setEditingId(null);
        setDraft(null);
      }
    }
    toast.success('Article deleted');
  };

  const handleCancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const handleAddCategory = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = newCategory.trim();
    if (!trimmed || categories.includes(trimmed)) return;
    addCategory(trimmed);
    setNewCategory('');
    toast.success('Category added');
  };

  const handleRequestDeleteCategory = (category: string) => {
    setConfirmDeleteCategory(category);
  };

  const handleConfirmDeleteCategory = (category: string) => {
    const inUse = articles.some((a) => a.category === category);
    if (inUse) {
      toast.error(`"${category}" is in use by one or more articles and cannot be deleted`);
      setConfirmDeleteCategory(null);
      return;
    }
    deleteCategory(category);
    setConfirmDeleteCategory(null);
    toast.success(`Category "${category}" deleted`);
  };

  const handleCancelDeleteCategory = () => {
    setConfirmDeleteCategory(null);
  };

  const handleSaveHomepage = () => {
    setHomepageContent(draftHome);
    toast.success('Homepage content updated');
  };

  const handleSaveAbout = () => {
    setAboutContent(draftAbout);
    toast.success('About page updated');
  };

  const handleChangePassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentPw !== adminPassword) {
      toast.error('Current password is incorrect');
      return;
    }
    if (newPw.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    if (newPw !== confirmPw) {
      toast.error('New passwords do not match');
      return;
    }
    setAdminPassword(newPw);
    setCurrentPw('');
    setNewPw('');
    setConfirmPw('');
    toast.success('Password updated successfully');
  };

  if (!isAuthenticated) {
    return (
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-md px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[2rem] border border-border/80 bg-card p-8 shadow-sm"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-full border border-accent/30 bg-accent/10 p-3 text-primary">
                <LockKeyhole className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-heading text-2xl text-primary">Secure admin login</h2>
                <p className="text-sm text-foreground/65">Access the content management interface</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="admin-password" className="text-sm font-medium text-foreground/80">
                  Password
                </label>
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter admin password"
                  className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-accent/50"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                Sign in
              </button>
            </form>

            <p className="mt-5 text-xs leading-6 text-foreground/55">
              Demo access uses a local password gate for the interface preview.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-12 py-12 sm:py-16">
      <section>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-[2rem] border border-border/80 bg-card p-8 shadow-sm">
            <h2 className="font-heading text-3xl text-primary">Content management</h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-foreground/72">
              Manage article details, homepage text, About page content, image links, category structure,
              and YouTube embeds from one focused workspace.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.95fr_1.25fr] lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[2rem] border border-border/80 bg-card p-8 shadow-sm"
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-heading text-2xl text-primary">Articles</h3>
                <p className="mt-1 text-sm text-foreground/65">
                  {articles.length} article{articles.length !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddArticle}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                <PlusCircle className="h-4 w-4" />
                Add article
              </button>
            </div>

            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {articles.map((article) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}
                  >
                    {confirmDeleteId === article.id ? (
                      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
                        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground/80">
                          <AlertTriangle className="h-4 w-4 text-destructive" />
                          Delete this article?
                        </div>
                        <p className="mb-4 line-clamp-1 text-sm font-medium text-primary">
                          {article.title || 'Untitled article'}
                        </p>
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => handleConfirmDelete(article.id)}
                            className="rounded-full bg-destructive px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-destructive/40"
                          >
                            Yes, delete
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelDelete}
                            className="rounded-full border border-border/80 px-4 py-2 text-xs font-semibold text-foreground/70 transition-all duration-200 hover:border-primary/30 hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`group flex items-start justify-between gap-3 rounded-2xl border p-5 transition-all duration-300 ${
                          article.id === editingId
                            ? 'border-primary/30 bg-accent/50 shadow-sm'
                            : 'border-border/80 bg-background hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => handleSelectArticle(article)}
                          className="min-w-0 flex-1 text-left focus:outline-none"
                        >
                          <p className="truncate font-heading text-base text-primary">
                            {article.title || 'Untitled article'}
                          </p>
                          <p className="mt-1 text-xs text-foreground/55">{article.category}</p>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRequestDelete(article.id)}
                          aria-label={`Delete ${article.title || 'article'}`}
                          className="shrink-0 rounded-full p-2 text-foreground/40 transition-all duration-200 hover:bg-destructive/10 hover:text-destructive focus:outline-none focus:ring-2 focus:ring-destructive/30"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {articles.length === 0 && (
                <div className="rounded-2xl border border-dashed border-border/80 p-8 text-center">
                  <p className="text-sm text-foreground/55">No articles yet. Add one to get started.</p>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="space-y-8"
          >
            <div className="rounded-[2rem] border border-border/80 bg-card p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <PencilLine className="h-5 w-5 text-primary" />
                <h3 className="font-heading text-2xl text-primary">Edit article</h3>
              </div>

              {draft ? (
                <div className="grid gap-5">
                  <div className="space-y-2">
                    <label htmlFor="article-title" className="text-sm font-medium text-foreground/80">
                      Article title <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="article-title"
                      value={draft.title}
                      onChange={(event) => updateDraft('title', event.target.value)}
                      placeholder="Enter article title"
                      className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-accent/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="article-excerpt" className="text-sm font-medium text-foreground/80">
                      Excerpt
                    </label>
                    <input
                      id="article-excerpt"
                      value={draft.excerpt}
                      onChange={(event) => updateDraft('excerpt', event.target.value)}
                      placeholder="Short summary shown on article cards"
                      className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-accent/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="article-category" className="text-sm font-medium text-foreground/80">
                      Category <span className="text-destructive">*</span>
                    </label>
                    <select
                      id="article-category"
                      value={draft.category}
                      onChange={(event) => updateDraft('category', event.target.value)}
                      className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-accent/50"
                    >
                      {categories
                        .filter((item) => item !== 'All')
                        .map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="article-image"
                      className="flex items-center gap-2 text-sm font-medium text-foreground/80"
                    >
                      <ImagePlus className="h-4 w-4" />
                      Image URL
                    </label>
                    <input
                      id="article-image"
                      value={draft.imageUrl}
                      onChange={(event) => updateDraft('imageUrl', event.target.value)}
                      placeholder="Paste image URL"
                      className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-accent/50"
                    />
                    {draft.imageUrl && (
                      <img
                        src={draft.imageUrl}
                        alt="Article preview"
                        width={640}
                        height={360}
                        className="h-48 w-full rounded-2xl object-cover"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="640" height="360"%3E%3Crect fill="%23e5e7eb" width="640" height="360"/%3E%3C/svg%3E';
                        }}
                      />
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="article-content"
                      className="flex items-center gap-2 text-sm font-medium text-foreground/80"
                    >
                      <Type className="h-4 w-4" />
                      Article content
                    </label>
                    <textarea
                      id="article-content"
                      rows={8}
                      value={draft.content}
                      onChange={(event) => updateDraft('content', event.target.value)}
                      placeholder="Write your article content here"
                      className="w-full rounded-2xl border border-border/80 bg-background px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-accent/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="article-video" className="text-sm font-medium text-foreground/80">
                      YouTube link
                    </label>
                    <input
                      id="article-video"
                      value={draft.youtubeUrl}
                      onChange={(event) => updateDraft('youtubeUrl', event.target.value)}
                      placeholder="Paste YouTube URL"
                      className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-accent/50"
                    />
                    {draft.youtubeUrl ? <VideoPreview url={draft.youtubeUrl} /> : null}
                  </div>

                  <button
                    type="button"
                    onClick={handleSaveArticle}
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-accent/50"
                  >
                    <Save className="h-4 w-4" />
                    Save article
                  </button>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-border/80 p-10 text-center">
                  <p className="text-sm text-foreground/55">
                    Select an article from the list or add a new one to start editing.
                  </p>
                </div>
              )}
            </div>

            <div className="grid gap-8 xl:grid-cols-2">
              <div className="rounded-[2rem] border border-border/80 bg-card p-8 shadow-sm">
                <h3 className="font-heading text-2xl text-primary">Edit homepage</h3>
                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="home-title" className="text-sm font-medium text-foreground/80">
                      Homepage heading
                    </label>
                    <input
                      id="home-title"
                      value={draftHome.heroTitle}
                      onChange={(event) =>
                        setDraftHome((prev) => ({ ...prev, heroTitle: event.target.value }))
                      }
                      className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-accent/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="home-text" className="text-sm font-medium text-foreground/80">
                      Homepage intro text
                    </label>
                    <textarea
                      id="home-text"
                      rows={5}
                      value={draftHome.heroText}
                      onChange={(event) =>
                        setDraftHome((prev) => ({ ...prev, heroText: event.target.value }))
                      }
                      className="w-full rounded-2xl border border-border/80 bg-background px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-accent/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="home-image"
                      className="flex items-center gap-2 text-sm font-medium text-foreground/80"
                    >
                      <ImagePlus className="h-4 w-4" />
                      Homepage image URL
                    </label>
                    <input
                      id="home-image"
                      value={draftHome.heroImageUrl}
                      onChange={(event) =>
                        setDraftHome((prev) => ({ ...prev, heroImageUrl: event.target.value }))
                      }
                      placeholder="Paste image URL for the homepage hero"
                      className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-accent/50"
                    />
                    {draftHome.heroImageUrl && !homeImageError && (
                      <img
                        src={draftHome.heroImageUrl}
                        alt="Homepage hero preview"
                        width={640}
                        height={360}
                        className="h-40 w-full rounded-2xl object-cover"
                        onError={() => setHomeImageError(true)}
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveHomepage}
                    className="rounded-full border border-primary/20 px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:scale-105 hover:border-primary/40 hover:bg-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/50"
                  >
                    Save homepage content
                  </button>
                </div>
              </div>

              <div className="rounded-[2rem] border border-border/80 bg-card p-8 shadow-sm">
                <h3 className="font-heading text-2xl text-primary">Edit About page</h3>
                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="about-title" className="text-sm font-medium text-foreground/80">
                      About title
                    </label>
                    <input
                      id="about-title"
                      value={draftAbout.title}
                      onChange={(event) =>
                        setDraftAbout((prev) => ({ ...prev, title: event.target.value }))
                      }
                      className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-accent/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="about-text" className="text-sm font-medium text-foreground/80">
                      About content
                    </label>
                    <textarea
                      id="about-text"
                      rows={5}
                      value={draftAbout.content}
                      onChange={(event) =>
                        setDraftAbout((prev) => ({ ...prev, content: event.target.value }))
                      }
                      className="w-full rounded-2xl border border-border/80 bg-background px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-accent/50"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveAbout}
                    className="rounded-full border border-primary/20 px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:scale-105 hover:border-primary/40 hover:bg-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/50"
                  >
                    Save About page
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border/80 bg-card p-8 shadow-sm">
              <h3 className="font-heading text-2xl text-primary">Categories</h3>
              <form onSubmit={handleAddCategory} className="mt-6 flex flex-col gap-4 sm:flex-row">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(event) => setNewCategory(event.target.value)}
                  placeholder="Add new category"
                  className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-accent/50"
                />
                <button
                  type="submit"
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-accent/50"
                >
                  Add category
                </button>
              </form>

              <div className="mt-6 flex flex-wrap gap-3">
                <AnimatePresence initial={false}>
                  {categories
                    .filter((category) => category !== 'All')
                    .map((category) => (
                      <motion.div
                        key={category}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.18 }}
                      >
                        {confirmDeleteCategory === category ? (
                          <div className="flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/5 px-4 py-2">
                            <span className="text-xs font-medium text-foreground/70">Delete "{category}"?</span>
                            <button
                              type="button"
                              onClick={() => handleConfirmDeleteCategory(category)}
                              className="rounded-full bg-destructive px-3 py-1 text-xs font-semibold text-white transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-destructive/40"
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              onClick={handleCancelDeleteCategory}
                              className="rounded-full border border-border/80 px-3 py-1 text-xs font-semibold text-foreground/70 transition-all duration-200 hover:border-primary/30 hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent/40 px-4 py-2 text-sm font-medium text-primary">
                            {category}
                            <button
                              type="button"
                              onClick={() => handleRequestDeleteCategory(category)}
                              aria-label={`Delete category ${category}`}
                              className="rounded-full p-0.5 text-primary/50 transition-all duration-200 hover:bg-destructive/15 hover:text-destructive focus:outline-none focus:ring-2 focus:ring-destructive/30"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </span>
                        )}
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border/80 bg-card p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <span className="rounded-full border border-accent/30 bg-accent/10 p-3 text-primary">
                  <KeyRound className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-heading text-2xl text-primary">Change password</h3>
                  <p className="text-sm text-foreground/65">Update your admin login password</p>
                </div>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="current-pw" className="text-sm font-medium text-foreground/80">
                    Current password
                  </label>
                  <div className="relative">
                    <input
                      id="current-pw"
                      type={showCurrentPw ? 'text' : 'password'}
                      value={currentPw}
                      onChange={(e) => setCurrentPw(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 pr-12 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-accent/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPw((v) => !v)}
                      aria-label={showCurrentPw ? 'Hide password' : 'Show password'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-foreground/45 transition-colors duration-200 hover:text-primary focus:outline-none"
                    >
                      {showCurrentPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="new-pw" className="text-sm font-medium text-foreground/80">
                    New password <span className="text-foreground/45 font-normal">(min. 6 characters)</span>
                  </label>
                  <div className="relative">
                    <input
                      id="new-pw"
                      type={showNewPw ? 'text' : 'password'}
                      value={newPw}
                      onChange={(e) => setNewPw(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 pr-12 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-accent/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPw((v) => !v)}
                      aria-label={showNewPw ? 'Hide password' : 'Show password'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-foreground/45 transition-colors duration-200 hover:text-primary focus:outline-none"
                    >
                      {showNewPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirm-pw" className="text-sm font-medium text-foreground/80">
                    Confirm new password
                  </label>
                  <div className="relative">
                    <input
                      id="confirm-pw"
                      type={showConfirmPw ? 'text' : 'password'}
                      value={confirmPw}
                      onChange={(e) => setConfirmPw(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 pr-12 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-accent/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPw((v) => !v)}
                      aria-label={showConfirmPw ? 'Hide password' : 'Show password'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-foreground/45 transition-colors duration-200 hover:text-primary focus:outline-none"
                    >
                      {showConfirmPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-accent/50"
                >
                  <KeyRound className="h-4 w-4" />
                  Update password
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}