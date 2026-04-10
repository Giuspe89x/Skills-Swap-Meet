import React, { Suspense, lazy, ReactNode } from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SiteProvider } from './src/context/SiteContext';

const Home = lazy(() => import('./src/pages/Home.tsx'));
const Articles = lazy(() => 
  import('./src/pages/Articles.tsx').catch(() => ({
    default: () => (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="rounded-3xl border border-border/80 bg-card px-6 py-4 text-sm text-foreground/70 shadow-sm">
          Unable to load articles. Please refresh the page.
        </div>
      </div>
    ),
  }))
);
const About = lazy(() => import('./src/pages/About.tsx'));
const Admin = lazy(() => import('./src/pages/Admin.tsx'));
const NotFound = lazy(() => import('./src/pages/NotFound.tsx'));

class ErrorBoundary extends React.Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Error boundary caught:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background px-6">
          <div className="rounded-3xl border border-border/80 bg-card px-6 py-4 text-sm text-foreground/70 shadow-sm">
            Something went wrong. Please refresh the page.
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Theme appearance="inherit" radius="large" scaling="100%">
        <SiteProvider>
          <Router>
            <main className="min-h-screen font-body">
              <Suspense
                fallback={
                  <div className="flex min-h-screen items-center justify-center bg-background px-6">
                    <div className="rounded-3xl border border-border/80 bg-card px-6 py-4 text-sm text-foreground/70 shadow-sm">
                      Loading content...
                    </div>
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/articles" element={<Articles />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <ToastContainer position="top-right" autoClose={3000} newestOnTop closeOnClick pauseOnHover />
            </main>
          </Router>
        </SiteProvider>
      </Theme>
    </ErrorBoundary>
  );
};

export default App;