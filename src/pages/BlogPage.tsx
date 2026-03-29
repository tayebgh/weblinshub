import React from 'react';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { BlogPost } from '../types';
import { Link } from 'react-router-dom';
import { Calendar, Eye, ArrowRight } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(
          collection(db, 'blogPosts'),
          where('published', '==', true),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost)));
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div className="container mx-auto px-4 py-20 text-center">Loading articles...</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">WebLinks Blog</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Insights, tips, and curated lists of the best websites and tools on the internet.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post.id} to={`/blog/${post.slug}`} className="group flex flex-col bg-background border rounded-2xl overflow-hidden hover:shadow-xl transition-all">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {new Date(post.createdAt?.toDate()).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" /> {post.views.toLocaleString()}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h2>
              <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                Read Article <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20 bg-muted/50 rounded-2xl border-2 border-dashed">
          <p className="text-muted-foreground">No articles published yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
};
