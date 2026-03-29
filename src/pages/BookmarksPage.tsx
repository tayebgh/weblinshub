import React from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../AuthContext';
import { WebLink } from '../types';
import { WeblinkCard } from '../components/weblink/WeblinkCard';
import { Bookmark, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BookmarksPage: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [bookmarks, setBookmarks] = React.useState<WebLink[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const q = query(collection(db, 'bookmarks'), where('userId', '==', user.id));
        const snapshot = await getDocs(q);
        const weblinkIds = snapshot.docs.map(doc => doc.data().weblinkId);
        
        if (weblinkIds.length > 0) {
          // Firestore 'in' query is limited to 10 items, but we'll just fetch all for now or chunk it
          // For simplicity in this demo, we fetch individually or use a loop
          const links: WebLink[] = [];
          for (const id of weblinkIds) {
            const linkDoc = await getDocs(query(collection(db, 'weblinks'), where('id', '==', id)));
            if (!linkDoc.empty) {
              links.push({ id: linkDoc.docs[0].id, ...linkDoc.docs[0].data() } as WebLink);
            }
          }
          setBookmarks(links);
        }
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchBookmarks();
    }
  }, [user, authLoading]);

  if (authLoading || loading) return <div className="container mx-auto px-4 py-20 text-center">Loading bookmarks...</div>;

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-32 text-center space-y-6">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
          <Bookmark className="w-10 h-10 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-display font-bold">Your Bookmarks</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Please login to view and manage your bookmarked websites.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">Your Bookmarks</h1>
          <p className="text-muted-foreground">Websites you've saved for later.</p>
        </div>
        <div className="text-sm font-medium bg-primary/10 text-primary px-4 py-2 rounded-full">
          {bookmarks.length} Saved Links
        </div>
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-32 bg-muted/30 rounded-3xl border-2 border-dashed">
          <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
          <p className="text-xl font-medium text-muted-foreground mb-6">You haven't bookmarked any websites yet.</p>
          <Link to="/" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
            Explore Directory <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bookmarks.map((link) => (
            <WeblinkCard key={link.id} weblink={link} />
          ))}
        </div>
      )}
    </div>
  );
};
