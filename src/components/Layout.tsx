import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Sparkles, Instagram, Linkedin, Mail } from 'lucide-react';

type LayoutProps = {
  children: React.ReactNode;
};

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Articles', to: '/articles' },
  { label: 'About', to: '/about' },
  { label: 'Admin', to: '/admin' },
];

const linkBase =
  'text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-md';
const linkActive = 'text-primary after:w-full';
const linkInactive = 'text-foreground/70 hover:text-primary';

export default function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? 'border-border/80 bg-background/95 shadow-sm backdrop-blur-md'
            : 'border-transparent bg-background/70 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <NavLink
            to="/"
            className="flex items-center gap-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
            aria-label="Skills Swap Meet home"
          >
            <span className="rounded-full border border-accent/30 bg-accent/10 p-2 text-primary">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="font-heading text-xl tracking-tight text-primary">Skills Swap Meet</span>
          </NavLink>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `${linkBase} relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 ${
                    isActive ? linkActive : `${linkInactive} after:w-0 hover:after:w-full`
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:block">
            <NavLink
              to="/admin"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              Manage Content
            </NavLink>
          </div>

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="rounded-lg border border-border/60 bg-card p-2 text-foreground transition-all duration-300 hover:border-primary/30 hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div
          id="mobile-menu"
          className={`border-t border-border/60 bg-background/95 backdrop-blur-md transition-all duration-300 md:hidden ${
            mobileOpen ? 'pointer-events-auto max-h-96 opacity-100' : 'pointer-events-none max-h-0 overflow-hidden opacity-0'
          }`}
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                    isActive
                      ? 'bg-accent text-primary'
                      : 'text-foreground/80 hover:bg-accent/60 hover:text-primary'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-border/80 bg-secondary/45">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-accent/30 bg-accent/10 p-2 text-primary">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="font-heading text-xl text-primary">Skills Swap Meet</span>
            </div>
            <p className="max-w-sm text-sm leading-7 text-foreground/70">
              A calm, focused publishing space for sharing practical ideas, fresh perspectives, and useful stories.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="rounded-full border border-border/80 bg-background p-3 text-foreground/70 transition-all duration-300 hover:scale-105 hover:border-primary/30 hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="rounded-full border border-border/80 bg-background p-3 text-foreground/70 transition-all duration-300 hover:scale-105 hover:border-primary/30 hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:editor@skillsswapmeet.com"
                aria-label="Email"
                className="rounded-full border border-border/80 bg-background p-3 text-foreground/70 transition-all duration-300 hover:scale-105 hover:border-primary/30 hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h2 className="font-heading text-base text-primary">Product</h2>
            <ul className="mt-4 space-y-3 text-sm text-foreground/70">
              <li>
                <NavLink to="/" className="transition-colors duration-300 hover:text-primary">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/articles" className="transition-colors duration-300 hover:text-primary">
                  Articles
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin" className="transition-colors duration-300 hover:text-primary">
                  Admin
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-base text-primary">Company</h2>
            <ul className="mt-4 space-y-3 text-sm text-foreground/70">
              <li>
                <NavLink to="/about" className="transition-colors duration-300 hover:text-primary">
                  About
                </NavLink>
              </li>
              <li>
                <a href="mailto:editor@skillsswapmeet.com" className="transition-colors duration-300 hover:text-primary">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-base text-primary">Legal</h2>
            <ul className="mt-4 space-y-3 text-sm text-foreground/70">
              <li>
                <a href="#" className="transition-colors duration-300 hover:text-primary">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors duration-300 hover:text-primary">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/80">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-sm text-foreground/60 md:flex-row md:items-center md:justify-between lg:px-8">
            <p>© 2026 Skills Swap Meet. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="transition-colors duration-300 hover:text-primary">
                Terms
              </a>
              <a href="#" className="transition-colors duration-300 hover:text-primary">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}