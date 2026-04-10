import React, { createContext, useContext, useState } from 'react';

export type Article = {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  youtubeUrl: string;
  createdAt: string;
  updatedAt: string;
};

type HomepageContent = {
  heroTitle: string;
  heroText: string;
  heroImageUrl: string;
};

type AboutContent = {
  title: string;
  content: string;
};

type SiteContextType = {
  articles: Article[];
  categories: string[];
  homepageContent: HomepageContent;
  aboutContent: AboutContent;
  adminPassword: string;
  addArticle: (article: Article) => void;
  updateArticle: (article: Article) => void;
  deleteArticle: (id: number) => void;
  addCategory: (category: string) => void;
  deleteCategory: (category: string) => void;
  setHomepageContent: React.Dispatch<React.SetStateAction<HomepageContent>>;
  setAboutContent: React.Dispatch<React.SetStateAction<AboutContent>>;
  setAdminPassword: React.Dispatch<React.SetStateAction<string>>;
};

const defaultArticles: Article[] = [
  {
    id: 1,
    title: 'How to Learn Faster by Teaching Others',
    content:
      'Teaching is one of the clearest ways to understand what you know and where your gaps remain. Sharing takeaways in small, structured ways can turn passive reading into active understanding and create learning loops that scale naturally.',
    excerpt:
      'Teaching is one of the clearest ways to understand what you know and where your gaps remain.',
    category: 'Learning',
    imageUrl:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=3Km4jM-v5uI',
    createdAt: '2026-03-18T00:00:00.000Z',
    updatedAt: '2026-03-18T00:00:00.000Z',
  },
  {
    id: 2,
    title: 'Simple Systems for Better Creative Consistency',
    content:
      'Creative work improves when the process is repeatable. Build routines that reduce friction, shorten setup time, and make it easier to begin before inspiration arrives. Consistency often comes from design, not motivation.',
    excerpt:
      'Creative work improves when the process is repeatable. Build routines that reduce friction.',
    category: 'Creativity',
    imageUrl:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    youtubeUrl: '',
    createdAt: '2026-03-10T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z',
  },
  {
    id: 3,
    title: 'Why Small Communities Create Stronger Knowledge',
    content:
      'Smaller spaces often encourage clearer exchange. People contribute more freely when discussion feels human, specific, and grounded in practical experience. That creates better learning archives over time.',
    excerpt:
      'Smaller spaces often encourage clearer exchange. People contribute more freely when discussion feels human.',
    category: 'Community',
    imageUrl:
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80',
    youtubeUrl: '',
    createdAt: '2026-03-04T00:00:00.000Z',
    updatedAt: '2026-03-04T00:00:00.000Z',
  },
  {
    id: 4,
    title: 'The Value of Writing Before You Feel Ready',
    content:
      'Waiting for certainty can slow the work that creates certainty. Publishing drafts, reflections, and structured notes can reveal your ideas more clearly than private perfection ever will.',
    excerpt:
      'Waiting for certainty can slow the work that creates certainty.',
    category: 'Career',
    imageUrl:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    youtubeUrl: '',
    createdAt: '2026-02-26T00:00:00.000Z',
    updatedAt: '2026-02-26T00:00:00.000Z',
  },
];

const defaultCategories = ['All', 'Learning', 'Creativity', 'Community', 'Career'];

const defaultHomepageContent: HomepageContent = {
  heroTitle: 'A quiet place for practical reading',
  heroText:
    'Skills Swap Meet is a minimalist publishing site built for readers who want thoughtful articles, simple navigation, and a clean experience across every screen size.',
  heroImageUrl:
    'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80',
};

const defaultAboutContent: AboutContent = {
  title: 'About Skills Swap Meet',
  content:
    'Skills Swap Meet is a publishing platform for clear writing, useful stories, and practical ideas. It is designed to make article discovery feel effortless while giving editors a focused workspace for managing homepage copy, About page content, categories, images, and embedded media.',
};

const SiteContext = createContext<SiteContextType | null>(null);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [articles, setArticles] = useState<Article[]>(defaultArticles);
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [homepageContent, setHomepageContent] = useState<HomepageContent>(defaultHomepageContent);
  const [aboutContent, setAboutContent] = useState<AboutContent>(defaultAboutContent);
  const [adminPassword, setAdminPassword] = useState<string>('admin123');

  const addArticle = (article: Article) => {
    setArticles((prev) => [article, ...prev]);
  };

  const updateArticle = (updated: Article) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === updated.id ? { ...updated, updatedAt: new Date().toISOString() } : a))
    );
  };

  const deleteArticle = (id: number) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const addCategory = (category: string) => {
    setCategories((prev) => [...prev, category]);
  };

  const deleteCategory = (category: string) => {
    setCategories((prev) => prev.filter((c) => c !== category));
  };

  return (
    <SiteContext.Provider
      value={{
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
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite(): SiteContextType {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used within SiteProvider');
  return ctx;
}