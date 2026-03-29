import React from 'react';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { WebLink, Category } from '../types';
import { Hero } from '../components/home/Hero';
import { FeaturedWeblinks } from '../components/home/FeaturedWeblinks';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { CategoryFilter } from '../components/home/CategoryFilter';
import { LatestBlogPosts } from '../components/home/LatestBlogPosts';
import { WeblinkCard } from '../components/weblink/WeblinkCard';

export const HomePage: React.FC = () => {
  const [weblinks, setWeblinks] = React.useState<WebLink[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchWeblinks = async () => {
      setLoading(true);
      try {
        let q = query(collection(db, 'weblinks'), orderBy('createdAt', 'desc'), limit(20));
        
        if (selectedCategory) {
          // First get category ID
          const catQ = query(collection(db, 'categories'), where('slug', '==', selectedCategory));
          const catSnap = await getDocs(catQ);
          if (!catSnap.empty) {
            const catId = catSnap.docs[0].id;
            q = query(collection(db, 'weblinks'), where('categoryId', '==', catId), orderBy('createdAt', 'desc'), limit(20));
          }
        }
        
        const snapshot = await getDocs(q);
        setWeblinks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WebLink)));
      } catch (error) {
        console.error('Error fetching weblinks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeblinks();
  }, [selectedCategory]);

  return (
    <div className="space-y-0">
      <Hero />
      <FeaturedWeblinks />
      <CategoryGrid />
      <LatestBlogPosts />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-display font-bold mb-2">Latest Discoveries</h2>
              <p className="text-muted-foreground">The newest additions to our curated directory.</p>
            </div>
            <CategoryFilter selectedSlug={selectedCategory} onSelect={setSelectedCategory} />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-64 bg-muted animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {weblinks.map((link) => (
                <WeblinkCard key={link.id} weblink={link} />
              ))}
            </div>
          )}

          {weblinks.length === 0 && !loading && (
            <div className="text-center py-20 bg-muted/50 rounded-2xl border-2 border-dashed">
              <p className="text-muted-foreground">No links found in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
