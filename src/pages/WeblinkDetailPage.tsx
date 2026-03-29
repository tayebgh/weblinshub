import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { WebLink, Category } from '../types';
import { Button } from '../components/ui/Button';
import { ExternalLink, Eye, Calendar, Tag, Share2, ArrowLeft, Bookmark } from 'lucide-react';
import { useAuth } from '../AuthContext';
import ReactMarkdown from 'react-markdown';

export const WeblinkDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [weblink, setWeblink] = React.useState<WebLink | null>(null);
  const [category, setCategory] = React.useState<Category | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { user } = useAuth();

  React.useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const q = query(collection(db, 'weblinks'), where('slug', '==', slug));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const data = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as WebLink;
          setWeblink(data);
          
          // Increment views
          await updateDoc(doc(db, 'weblinks', data.id), { views: increment(1) });

          // Fetch category
          const catDoc = await getDoc(doc(db, 'categories', data.categoryId));
          if (catDoc.exists()) {
            setCategory({ id: catDoc.id, ...catDoc.data() } as Category);
          }
        }
      } catch (error) {
        console.error('Error fetching weblink:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <div className="container mx-auto px-4 py-20 text-center">Loading...</div>;
  if (!weblink) return <div className="container mx-auto px-4 py-20 text-center">Weblink not found.</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Directory
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-muted border flex items-center justify-center overflow-hidden">
              {weblink.favicon ? (
                <img src={weblink.favicon} alt={weblink.siteName} className="w-16 h-16" />
              ) : (
                <div className="text-4xl font-bold text-primary">{weblink.siteName[0]}</div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-4xl font-display font-bold">{weblink.siteName}</h1>
                {weblink.verified && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-bold rounded-full uppercase">Verified</span>
                )}
              </div>
              <p className="text-xl text-muted-foreground">{weblink.shortDescription}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" /> {weblink.views.toLocaleString()} views
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" /> Added {new Date(weblink.createdAt?.toDate()).toLocaleDateString()}
                </span>
                {category && (
                  <Link to={`/categories/${category.slug}`} className="flex items-center gap-1.5 hover:text-primary">
                    <Tag className="w-4 h-4" /> {category.name}
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="aspect-video w-full rounded-2xl overflow-hidden border bg-muted">
            {weblink.thumbnail ? (
              <img src={weblink.thumbnail} alt={weblink.siteName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">No preview available</div>
            )}
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-display font-bold mb-4">About this Website</h2>
            <div className="markdown-body">
              <ReactMarkdown>{weblink.fullDescription}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="p-6 bg-muted/50 rounded-2xl border space-y-6">
            <Button className="w-full h-14 text-lg gap-2" onClick={() => window.open(weblink.url, '_blank')}>
              Visit Website <ExternalLink className="w-5 h-5" />
            </Button>
            
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="gap-2">
                <Bookmark className="w-4 h-4" /> Bookmark
              </Button>
              <Button variant="outline" className="gap-2">
                <Share2 className="w-4 h-4" /> Share
              </Button>
            </div>
          </div>

          <div className="p-6 bg-background border rounded-2xl space-y-4">
            <h3 className="font-bold text-lg">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {weblink.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-muted rounded-full text-xs font-medium hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 bg-background border rounded-2xl space-y-4">
            <h3 className="font-bold text-lg">SEO Information</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Meta Title</p>
                <p className="font-medium">{weblink.metaTitle || weblink.siteName}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Meta Description</p>
                <p className="font-medium">{weblink.metaDescription || weblink.shortDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
