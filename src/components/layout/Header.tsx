import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, LogIn, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../AuthContext';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const { user, firebaseUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);
  const location = useLocation();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const login = () => signInWithPopup(auth, new GoogleAuthProvider());
  const logout = () => signOut(auth);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/categories' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
  ];

  const isAdmin = user?.role === 'admin';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 items-center h-16">
          {/* Column 1: Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">W</div>
            <span className="font-display font-bold text-xl hidden sm:inline-block">WebLinks Hub</span>
          </Link>

          {/* Column 2: Nav */}
          <nav className="hidden lg:flex justify-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {firebaseUser && (
              <Link
                to="/submit-link"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/submit-link' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Submit Link
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/admin/new-post"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/admin/new-post' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                New Post
              </Link>
            )}
          </nav>

          {/* Column 3: Actions */}
          <div className="flex items-center justify-end gap-2 sm:gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {firebaseUser ? (
              <div className="flex items-center gap-3">
                <Link to="/bookmarks" className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-primary">
                  Bookmarks
                </Link>
                <div className="relative group">
                  <img
                    src={firebaseUser.photoURL || ''}
                    alt={firebaseUser.displayName || ''}
                    className="w-8 h-8 rounded-full cursor-pointer border"
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <div className="p-3 border-b">
                      <p className="text-sm font-medium truncate">{firebaseUser.displayName}</p>
                      <p className="text-xs text-muted-foreground truncate">{firebaseUser.email}</p>
                      {isAdmin && <p className="text-[10px] font-bold uppercase tracking-wider text-primary mt-1">Admin</p>}
                    </div>
                    <Link to="/bookmarks" className="block p-3 text-sm hover:bg-muted sm:hidden">Bookmarks</Link>
                    <Link to="/submit-link" className="block p-3 text-sm hover:bg-muted lg:hidden">Submit Link</Link>
                    {isAdmin && <Link to="/admin/new-post" className="block p-3 text-sm hover:bg-muted lg:hidden">New Post</Link>}
                    <button
                      onClick={logout}
                      className="w-full text-left p-3 text-sm text-red-500 hover:bg-muted rounded-b-lg"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Button onClick={login} size="sm" className="gap-2">
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Button>
            )}

            <button
              className="lg:hidden p-2 rounded-lg hover:bg-muted"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t bg-background p-4 space-y-4 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="block text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {firebaseUser && (
            <>
              <Link
                to="/bookmarks"
                className="block text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Bookmarks
              </Link>
              <Link
                to="/submit-link"
                className="block text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Submit Link
              </Link>
            </>
          )}
          {isAdmin && (
            <Link
              to="/admin/new-post"
              className="block text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              New Post
            </Link>
          )}
        </div>
      )}
    </header>
  );
};
