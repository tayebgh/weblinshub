import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted py-12 mt-20 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">W</div>
              <span className="font-display font-bold text-xl">WebLinks Hub</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover and share the best websites across all categories. Curated collection of useful websites, tools, and resources.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/categories" className="hover:text-primary transition-colors">Categories</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Popular Categories */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Popular Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/categories/tools" className="hover:text-primary transition-colors">Tools & Productivity</Link></li>
              <li><Link to="/categories/dev" className="hover:text-primary transition-colors">Development & Tech</Link></li>
              <li><Link to="/categories/design" className="hover:text-primary transition-colors">Design & Creative</Link></li>
              <li><Link to="/categories/ai" className="hover:text-primary transition-colors">AI & Machine Learning</Link></li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Connect</h3>
            <div className="flex gap-4 mb-6">
              <a href="#" className="p-2 bg-background rounded-full hover:text-primary transition-colors border shadow-sm">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-background rounded-full hover:text-primary transition-colors border shadow-sm">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-background rounded-full hover:text-primary transition-colors border shadow-sm">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-background rounded-full hover:text-primary transition-colors border shadow-sm">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for weekly updates.
            </p>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {currentYear} WebLinks Hub. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
