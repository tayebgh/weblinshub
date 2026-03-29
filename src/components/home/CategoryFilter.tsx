import React from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { Category } from '../../types';
import { cn } from '../../lib/utils';

interface CategoryFilterProps {
  onSelect: (slug: string | null) => void;
  selectedSlug: string | null;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ onSelect, selectedSlug }) => {
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      const q = query(collection(db, 'categories'), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category)));
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
          selectedSlug === null 
            ? "bg-primary text-white shadow-md" 
            : "bg-muted text-muted-foreground hover:bg-muted/80"
        )}
      >
        All Links
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.slug)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
            selectedSlug === category.slug 
              ? "bg-primary text-white shadow-md" 
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
