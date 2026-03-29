import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { WeblinkDetailPage } from './pages/WeblinkDetailPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostDetailPage } from './pages/BlogPostDetailPage';
import { SubmitLinkPage } from './pages/SubmitLinkPage';
import { NewBlogPostPage } from './pages/admin/NewBlogPostPage';
import { seedDatabase } from './seed';
import { Toaster } from 'sonner';

function App() {
  React.useEffect(() => {
    seedDatabase();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/links/:slug" element={<WeblinkDetailPage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostDetailPage />} />
              <Route path="/submit-link" element={<SubmitLinkPage />} />
              <Route path="/admin/new-post" element={<NewBlogPostPage />} />
              {/* Add other routes as needed */}
              <Route path="*" element={<div className="container mx-auto px-4 py-20 text-center">Page under construction</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="top-center" richColors />
      </Router>
    </AuthProvider>
  );
}

export default App;
