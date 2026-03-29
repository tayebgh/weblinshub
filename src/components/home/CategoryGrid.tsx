import React from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import { Category } from '../../types';
import * as Icons from 'lucide-react';

export const CategoryGrid: React.FC = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const q = query(collection(db, 'categories'), orderBy('order', 'asc'), limit(12));
        const snapshot = await getDocs(q);
        setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category)));
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div className="h-64 flex items-center justify-center">Loading categories...</div>;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Explore by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our curated directory through specialized categories to find the exact tools and resources you need.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {categories.map((category) => {
            const IconComponent = (Icons as any)[category.icon || 'Folder'] || Icons.Folder;
            return (
              <Link
                key={category.id}
                to={`/categories/${category.slug}`}
                className="group p-6 bg-background border rounded-2xl text-center hover:border-primary hover:shadow-lg transition-all"
              >
                <div 
                  className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-110"
                  style={{ backgroundColor: category.color || '#3b82f6' }}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm mb-1">{category.name}</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                  View Links
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
