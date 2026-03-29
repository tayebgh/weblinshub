import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Bookmark, ExternalLink } from 'lucide-react';
import { WebLink } from '../../types';
import { Button } from '../ui/Button';
import { useAuth } from '../../AuthContext';
import { doc, setDoc, deleteDoc, collection, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

interface WeblinkCardProps {
  weblink: WebLink;
  categoryName?: string;
}

export const WeblinkCard: React.FC<WeblinkCardProps> = ({ weblink, categoryName }) => {
  const { user } = useAuth();
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      const checkBookmark = async () => {
        const q = query(
          collection(db, 'bookmarks'),
          where('userId', '==', user.id),
          where('weblinkId', '==', weblink.id)
        );
        const snapshot = await getDocs(q);
        setIsBookmarked(!snapshot.empty);
      };
      checkBookmark();
    }
  }, [user, weblink.id]);

  const toggleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return alert('Please login to bookmark');

    if (isBookmarked) {
      const q = query(
        collection(db, 'bookmarks'),
        where('userId', '==', user.id),
        where('weblinkId', '==', weblink.id)
      );
      const snapshot = await getDocs(q);
      snapshot.forEach(async (d) => await deleteDoc(doc(db, 'bookmarks', d.id)));
      setIsBookmarked(false);
    } else {
      await setDoc(doc(collection(db, 'bookmarks')), {
        userId: user.id,
        weblinkId: weblink.id,
        createdAt: serverTimestamp(),
      });
      setIsBookmarked(true);
    }
  };

  return (
    <div className="group bg-background border rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden border">
              {weblink.favicon ? (
                <img src={weblink.favicon} alt={weblink.siteName} className="w-6 h-6" />
              ) : (
                <div className="text-primary font-bold">{weblink.siteName[0]}</div>
              )}
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                {weblink.siteName}
              </h3>
              {categoryName && (
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {categoryName}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={toggleBookmark}
            className={`p-2 rounded-full transition-colors ${
              isBookmarked ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
          {weblink.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {weblink.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-1 bg-muted text-[10px] font-bold rounded uppercase text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Eye className="w-4 h-4" />
            <span>{weblink.views.toLocaleString()}</span>
          </div>
          <Link to={`/links/${weblink.slug}`}>
            <Button size="sm" variant="ghost" className="h-8 px-3 text-xs gap-1.5">
              Details <ExternalLink className="w-3 h-3" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
