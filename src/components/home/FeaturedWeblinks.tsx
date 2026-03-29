import React from 'react';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import { WebLink, Category } from '../../types';
import { WeblinkCard } from '../weblink/WeblinkCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const FeaturedWeblinks: React.FC = () => {
  const [weblinks, setWeblinks] = React.useState<(WebLink & { categoryName?: string })[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const q = query(
          collection(db, 'weblinks'),
          where('featured', '==', true),
          limit(8)
        );
        const snapshot = await getDocs(q);
        const links = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WebLink));
        
        // Fetch categories for names
        const categoryMap: Record<string, string> = {};
        const catsSnap = await getDocs(collection(db, 'categories'));
        catsSnap.forEach(doc => {
          categoryMap[doc.id] = doc.data().name;
        });

        setWeblinks(links.map(l => ({ ...l, categoryName: categoryMap[l.categoryId] })));
      } catch (error) {
        console.error('Error fetching featured links:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  if (loading) return <div className="h-64 flex items-center justify-center">Loading featured...</div>;
  if (weblinks.length === 0) return null;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-display font-bold">Featured Resources</h2>
            <p className="text-muted-foreground">Hand-picked websites that we highly recommend.</p>
          </div>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="pb-12"
        >
          {weblinks.map((link) => (
            <SwiperSlide key={link.id}>
              <WeblinkCard weblink={link} categoryName={link.categoryName} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
