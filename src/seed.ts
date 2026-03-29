import React from 'react';
import { collection, getDocs, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';

export const seedDatabase = async () => {
  try {
    const categoriesSnap = await getDocs(collection(db, 'categories'));
    if (!categoriesSnap.empty) return; // Already seeded
  } catch (error) {
    // If we can't read categories, we probably can't seed either
    console.warn('Could not check categories for seeding:', error);
    return;
  }

  console.log('Seeding database...');

  const categories = [
    { name: 'Social Media', slug: 'social', icon: 'Share2', color: '#3b82f6', order: 1 },
    { name: 'Tools & Productivity', slug: 'tools', icon: 'Wrench', color: '#10b981', order: 2 },
    { name: 'Development', slug: 'dev', icon: 'Code', color: '#6366f1', order: 3 },
    { name: 'Design', slug: 'design', icon: 'Palette', color: '#f59e0b', order: 4 },
    { name: 'AI & ML', slug: 'ai', icon: 'Cpu', color: '#8b5cf6', order: 5 },
    { name: 'News & Media', slug: 'news', icon: 'Newspaper', color: '#ef4444', order: 6 },
    { name: 'Finance', slug: 'finance', icon: 'Wallet', color: '#059669', order: 7 },
    { name: 'Education', slug: 'education', icon: 'BookOpen', color: '#d97706', order: 8 },
    { name: 'Entertainment', slug: 'entertainment', icon: 'Play', color: '#dc2626', order: 9 },
  ];

  const categoryIds: Record<string, string> = {};

  try {
    for (const cat of categories) {
      const docRef = await addDoc(collection(db, 'categories'), {
        ...cat,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      categoryIds[cat.slug] = docRef.id;
    }

    const weblinks = [
      {
        siteName: 'GitHub',
        url: 'https://github.com',
        slug: 'github',
        shortDescription: 'The world\'s leading AI-powered developer platform.',
        fullDescription: 'GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and features, and connect with 50M+ developers.',
        favicon: 'https://github.com/favicon.ico',
        thumbnail: 'https://picsum.photos/seed/github/1200/630',
        tags: ['dev', 'git', 'collaboration'],
        categoryId: categoryIds['dev'],
        views: 1500,
        featured: true,
        verified: true,
      },
      {
        siteName: 'Figma',
        url: 'https://figma.com',
        slug: 'figma',
        shortDescription: 'The collaborative interface design tool.',
        fullDescription: 'Figma is the leading collaborative design tool for building meaningful products. Seamlessly design, prototype, develop, and collect feedback in a single platform.',
        favicon: 'https://www.figma.com/favicon.ico',
        thumbnail: 'https://picsum.photos/seed/figma/1200/630',
        tags: ['design', 'ui', 'ux'],
        categoryId: categoryIds['design'],
        views: 1200,
        featured: true,
        verified: true,
      },
      {
        siteName: 'ChatGPT',
        url: 'https://chat.openai.com',
        slug: 'chatgpt',
        shortDescription: 'AI chatbot by OpenAI.',
        fullDescription: 'ChatGPT is a sibling model to InstructGPT, which is trained to follow an instruction in a prompt and provide a detailed response.',
        favicon: 'https://openai.com/favicon.ico',
        thumbnail: 'https://picsum.photos/seed/chatgpt/1200/630',
        tags: ['ai', 'chatbot', 'productivity'],
        categoryId: categoryIds['ai'],
        views: 5000,
        featured: true,
        verified: true,
      },
      {
        siteName: 'Notion',
        url: 'https://notion.so',
        slug: 'notion',
        shortDescription: 'The all-in-one workspace for your notes, tasks, wikis, and databases.',
        fullDescription: 'Notion is a single space where you can think, write, and plan. Capture thoughts, manage projects, or even run an entire company — and do it exactly the way you want.',
        favicon: 'https://www.notion.so/favicon.ico',
        thumbnail: 'https://picsum.photos/seed/notion/1200/630',
        tags: ['productivity', 'notes', 'collaboration'],
        categoryId: categoryIds['tools'],
        views: 3000,
        featured: true,
        verified: true,
      },
      {
        siteName: 'Stack Overflow',
        url: 'https://stackoverflow.com',
        slug: 'stackoverflow',
        shortDescription: 'The largest online community for programmers.',
        fullDescription: 'Stack Overflow is a question and answer site for professional and enthusiast programmers. It features questions and answers on a wide range of topics in computer programming.',
        favicon: 'https://stackoverflow.com/favicon.ico',
        thumbnail: 'https://picsum.photos/seed/stackoverflow/1200/630',
        tags: ['dev', 'q&a', 'community'],
        categoryId: categoryIds['dev'],
        views: 4500,
        featured: false,
        verified: true,
      },
      {
        siteName: 'Canva',
        url: 'https://canva.com',
        slug: 'canva',
        shortDescription: 'Free Design Tool: Presentations, Video, Social Media.',
        fullDescription: 'Canva makes it easy to create professional designs and share or print them. From social media posts to presentations, Canva has everything you need to create amazing designs.',
        favicon: 'https://www.canva.com/favicon.ico',
        thumbnail: 'https://picsum.photos/seed/canva/1200/630',
        tags: ['design', 'graphics', 'social'],
        categoryId: categoryIds['design'],
        views: 2800,
        featured: false,
        verified: true,
      },
      {
        siteName: 'Coursera',
        url: 'https://coursera.org',
        slug: 'coursera',
        shortDescription: 'Learn without limits.',
        fullDescription: 'Build skills with courses, certificates, and degrees online from world-class universities and companies.',
        favicon: 'https://www.coursera.org/favicon.ico',
        thumbnail: 'https://picsum.photos/seed/coursera/1200/630',
        tags: ['education', 'online-learning', 'skills'],
        categoryId: categoryIds['education'],
        views: 1800,
        featured: true,
        verified: true,
      },
      {
        siteName: 'Netflix',
        url: 'https://netflix.com',
        slug: 'netflix',
        shortDescription: 'Watch TV Shows Online, Watch Movies Online.',
        fullDescription: 'Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.',
        favicon: 'https://www.netflix.com/favicon.ico',
        thumbnail: 'https://picsum.photos/seed/netflix/1200/630',
        tags: ['entertainment', 'movies', 'streaming'],
        categoryId: categoryIds['entertainment'],
        views: 6000,
        featured: true,
        verified: true,
      },
      {
        siteName: 'Robinhood',
        url: 'https://robinhood.com',
        slug: 'robinhood',
        shortDescription: 'Investing for Everyone.',
        fullDescription: 'Robinhood is a financial services company that offers commission-free trades of stocks and exchange-traded funds via a mobile app.',
        favicon: 'https://robinhood.com/favicon.ico',
        thumbnail: 'https://picsum.photos/seed/robinhood/1200/630',
        tags: ['finance', 'investing', 'stocks'],
        categoryId: categoryIds['finance'],
        views: 2200,
        featured: false,
        verified: true,
      },
    ];

    for (const link of weblinks) {
      await addDoc(collection(db, 'weblinks'), {
        ...link,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    const blogPosts = [
      {
        title: 'Top 10 Productivity Tools for Developers in 2026',
        slug: 'top-10-productivity-tools-2026',
        excerpt: 'Discover the latest tools that are helping developers stay focused and efficient in an increasingly complex landscape.',
        content: '## Productivity is Key\n\nIn the fast-paced world of software development, staying productive is more important than ever. Here are our top picks for 2026...\n\n1. **Notion AI**: For documentation and planning.\n2. **GitHub Copilot**: For AI-assisted coding.\n3. **Linear**: For project management.\n\nStay tuned for more!',
        thumbnail: 'https://picsum.photos/seed/productivity/1200/630',
        authorId: 'system',
        published: true,
        views: 450,
      },
      {
        title: 'The Rise of AI-Powered Design Tools',
        slug: 'rise-of-ai-design-tools',
        excerpt: 'How artificial intelligence is transforming the way we design user interfaces and experiences.',
        content: '## Design Meets AI\n\nDesigners are now using AI to automate repetitive tasks and generate creative ideas. Tools like Figma and Adobe are leading the way with integrated AI features...',
        thumbnail: 'https://picsum.photos/seed/design-ai/1200/630',
        authorId: 'system',
        published: true,
        views: 320,
      },
      {
        title: 'Why Open Source Matters More Than Ever',
        slug: 'why-open-source-matters',
        excerpt: 'Exploring the impact of open source software on modern technology and community collaboration.',
        content: '## The Power of Community\n\nOpen source is the backbone of the internet. From Linux to React, community-driven projects have shaped the digital world we live in today...',
        thumbnail: 'https://picsum.photos/seed/opensource/1200/630',
        authorId: 'system',
        published: true,
        views: 280,
      },
      {
        title: 'Mastering Remote Work in 2026',
        slug: 'mastering-remote-work-2026',
        excerpt: 'Tips and strategies for staying productive and connected while working from anywhere in the world.',
        content: '## Remote Work is Here to Stay\n\nAs more companies adopt remote-first policies, learning how to manage your time and environment is crucial for success...',
        thumbnail: 'https://picsum.photos/seed/remotework/1200/630',
        authorId: 'system',
        published: true,
        views: 510,
      },
      {
        title: 'The Future of Web Development: Trends to Watch',
        slug: 'future-of-web-development-trends',
        excerpt: 'From WebAssembly to Edge Computing, explore the technologies defining the next era of the web.',
        content: '## The Next Era of the Web\n\nWeb development is evolving at a breakneck pace. In 2026, we are seeing a massive shift towards edge computing and decentralized architectures...',
        thumbnail: 'https://picsum.photos/seed/webdev/1200/630',
        authorId: 'system',
        published: true,
        views: 890,
      },
      {
        title: 'React 19: New Features and Best Practices',
        slug: 'react-19-new-features',
        excerpt: 'A deep dive into the latest version of React and how to leverage its new capabilities for better performance.',
        content: '## React 19 is Here\n\nWith the release of React 19, developers have access to powerful new hooks and server components that simplify state management and improve SEO...',
        thumbnail: 'https://picsum.photos/seed/react/1200/630',
        authorId: 'system',
        published: true,
        views: 1200,
      },
      {
        title: 'Web Accessibility: Why It Matters in 2026',
        slug: 'web-accessibility-importance',
        excerpt: 'Ensuring your website is accessible to everyone is not just a legal requirement, it\'s a moral imperative.',
        content: '## Inclusive Design\n\nAccessibility should never be an afterthought. In this post, we discuss the latest WCAG guidelines and how to implement them in your projects...',
        thumbnail: 'https://picsum.photos/seed/accessibility/1200/630',
        authorId: 'system',
        published: true,
        views: 420,
      },
      {
        title: 'Building Scalable Apps with Firebase and React',
        slug: 'building-scalable-apps-firebase-react',
        excerpt: 'Learn how to combine the power of Firebase and React to build real-time, scalable applications.',
        content: '## Real-time Power\n\nFirebase provides a suite of tools that make it easy to build and scale applications. When paired with React, you can create seamless user experiences...',
        thumbnail: 'https://picsum.photos/seed/firebase/1200/630',
        authorId: 'system',
        published: true,
        views: 750,
      },
      {
        title: 'A Guide to Modern CSS: Flexbox to Container Queries',
        slug: 'guide-to-modern-css',
        excerpt: 'Master the latest CSS features to create responsive and beautiful layouts with less code.',
        content: '## CSS is More Powerful Than Ever\n\nGone are the days of complex floats. With Grid, Flexbox, and now Container Queries, CSS has become a layout powerhouse...',
        thumbnail: 'https://picsum.photos/seed/css/1200/630',
        authorId: 'system',
        published: true,
        views: 630,
      },
      {
        title: 'Why TypeScript is Essential for Large Projects',
        slug: 'why-typescript-is-essential',
        excerpt: 'Discover how TypeScript can help you catch bugs early and improve developer productivity in large codebases.',
        content: '## Type Safety Matters\n\nTypeScript adds a layer of safety to your JavaScript code, making it easier to refactor and maintain as your project grows...',
        thumbnail: 'https://picsum.photos/seed/typescript/1200/630',
        authorId: 'system',
        published: true,
        views: 940,
      },
      {
        title: 'The Evolution of SEO: Strategies for 2026',
        slug: 'evolution-of-seo-2026',
        excerpt: 'Stay ahead of the curve with the latest SEO strategies that focus on user intent and AI-driven search.',
        content: '## SEO in the Age of AI\n\nSearch engines are getting smarter. To rank well in 2026, you need to focus on high-quality content that truly answers user questions...',
        thumbnail: 'https://picsum.photos/seed/seo/1200/630',
        authorId: 'system',
        published: true,
        views: 1100,
      },
      {
        title: 'Cybersecurity for Developers: Protecting Your Apps',
        slug: 'cybersecurity-for-developers',
        excerpt: 'Essential security practices every web developer should know to protect their applications and user data.',
        content: '## Security First\n\nFrom SQL injection to XSS, web applications are under constant threat. Learn how to secure your code and infrastructure...',
        thumbnail: 'https://picsum.photos/seed/security/1200/630',
        authorId: 'system',
        published: true,
        views: 580,
      },
      {
        title: 'The Rise of Low-Code and No-Code Platforms',
        slug: 'rise-of-low-code-no-code',
        excerpt: 'How low-code and no-code platforms are democratizing software development and accelerating innovation.',
        content: '## Development for Everyone\n\nYou don\'t always need to write code to build a great product. Low-code platforms are empowering non-developers to create powerful tools...',
        thumbnail: 'https://picsum.photos/seed/lowcode/1200/630',
        authorId: 'system',
        published: true,
        views: 470,
      },
      {
        title: 'Optimizing Web Performance: Faster Load Times',
        slug: 'optimizing-web-performance',
        excerpt: 'Tips and techniques for improving your website\'s performance and providing a better user experience.',
        content: '## Speed is a Feature\n\nUsers expect websites to load instantly. Learn how to optimize your images, minify your code, and leverage caching for lightning-fast speeds...',
        thumbnail: 'https://picsum.photos/seed/performance/1200/630',
        authorId: 'system',
        published: true,
        views: 820,
      },
      {
        title: 'Sustainable Web Design: Reducing Carbon Footprint',
        slug: 'sustainable-web-design',
        excerpt: 'How to build eco-friendly websites that are good for the planet and your users.',
        content: '## Green Web Design\n\nThe internet has a significant environmental impact. Discover how you can reduce your digital carbon footprint through sustainable design practices...',
        thumbnail: 'https://picsum.photos/seed/sustainability/1200/630',
        authorId: 'system',
        published: true,
        views: 310,
      }
    ];

    for (const post of blogPosts) {
      await addDoc(collection(db, 'blogPosts'), {
        ...post,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'seeding');
  }
};
