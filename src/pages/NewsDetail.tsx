import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { newsArticles } from '@/data/newsData.ts';

const NewsDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const foundArticle = newsArticles.find(a => a.id === parseInt(id));
    setArticle(foundArticle);
  }, [id]);

  if (!article) {
    return (
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">Noticia no encontrada</h1>
          <Link to="/noticias"><Button className="mt-4">Volver a Noticias</Button></Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'ai': return 'bg-purple-500/10 text-purple-500 dark:text-purple-400';
      case 'web': return 'bg-blue-500/10 text-blue-500 dark:text-blue-400';
      case 'mobile': return 'bg-green-500/10 text-green-500 dark:text-green-400';
      default: return 'bg-gray-500/10 text-gray-500 dark:text-gray-400';
    }
  };

  const categories = [
    { id: 'all', name: 'Todas' },
    { id: 'ai', name: 'Inteligencia Artificial' },
    { id: 'web', name: 'Desarrollo Web' },
    { id: 'mobile', name: 'Móvil' }
  ];

  return (
    <>
      <Helmet>
        <title>{article.title} - Wismora Noticias</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>

      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-8">
            <Link to="/noticias">
              <Button variant="ghost"><ArrowLeft className="w-4 h-4 mr-2" />Volver a Noticias</Button>
            </Link>
          </motion.div>

          <motion.article initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="bg-card border border-border rounded-3xl overflow-hidden p-8 lg:p-10">
            <div className="flex items-center space-x-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
                {categories.find(c => c.id === article.category)?.name}
              </span>
              {article.featured && (
                <span className="px-3 py-1 bg-red-500/10 text-red-500 dark:text-red-400 rounded-full text-sm font-medium">Destacado</span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">{article.title}</h1>

            <div className="flex items-center space-x-6 text-muted-foreground text-sm mb-8">
              <div className="flex items-center space-x-1"><User className="w-4 h-4" /><span>{article.author}</span></div>
              <div className="flex items-center space-x-1"><Calendar className="w-4 h-4" /><span>{formatDate(article.date)}</span></div>
              <div className="flex items-center space-x-1"><Clock className="w-4 h-4" /><span>{article.readTime}</span></div>
            </div>

            <div className="mb-8 rounded-xl overflow-hidden">
              <img alt={article.title} className="w-full h-auto object-cover" src={article.image} />
            </div>

            <div className="prose dark:prose-invert prose-lg max-w-none text-muted-foreground">
              <p>{article.fullContent}</p>
              {/* You can add more paragraphs or sections for longer articles here */}
            </div>
          </motion.article>
        </div>
      </div>
    </>
  );
};

export default NewsDetail;