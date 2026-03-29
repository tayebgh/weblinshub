import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { BlogPost } from '../types';
import { ArrowLeft, Calendar, Eye, Share2, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const BlogPostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = React.useState<BlogPost | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const q = query(collection(db, 'blogPosts'), where('slug', '==', slug));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const data = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as BlogPost;
          setPost(data);
          // Increment views
          await updateDoc(doc(db, 'blogPosts', data.id), { views: increment(1) });
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) return <div className="container mx-auto px-4 py-20 text-center">Loading article...</div>;
  if (!post) return <div className="container mx-auto px-4 py-20 text-center">Article not found.</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <div className="space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-y py-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> {new Date(post.createdAt?.toDate()).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" /> {post.views.toLocaleString()} views
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> 5 min read
            </span>
            <button className="ml-auto flex items-center gap-1.5 hover:text-primary transition-colors">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>

        <div className="aspect-video w-full rounded-3xl overflow-hidden border mb-12">
          <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="markdown-body">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};
