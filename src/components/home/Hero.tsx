import React from 'react';
import { motion } from 'motion/react';
import { Search, ArrowRight, Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/40 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
            Discover the Best <br />
            <span className="text-primary">Websites</span> on the Internet
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Curated collection of useful websites, tools, and resources categorized for easy discovery. Find exactly what you need in seconds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search websites, tools..."
              className="w-full h-12 pl-10 pr-4 rounded-lg border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button size="lg" className="gap-2 w-full sm:w-auto">
              Browse Links <ArrowRight className="w-5 h-5" />
            </Button>
            <Link to="/submit-link" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="gap-2 w-full">
                <Plus className="w-5 h-5" /> Submit Link
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all"
        >
          {/* Mock Brand Logos */}
          <div className="font-bold text-2xl">Productivity</div>
          <div className="font-bold text-2xl">Design</div>
          <div className="font-bold text-2xl">AI Tools</div>
          <div className="font-bold text-2xl">Dev Resources</div>
        </motion.div>
      </div>
    </section>
  );
};
