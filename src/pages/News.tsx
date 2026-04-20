import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Calendar, Clock, User, ExternalLink, TrendingUp, Zap, Cpu, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { newsArticles } from '@/data/newsData';

const News = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredNews, setFilteredNews] = useState([]);

  const categories = [
    { id: 'all', name: 'Todas', icon: TrendingUp },
    { id: 'ai', name: 'Inteligencia Artificial', icon: Cpu },
    { id: 'web', name: 'Desarrollo Web', icon: Zap },
    { id: 'mobile', name: 'Móvil', icon: Smartphone }
  ];

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredNews(newsArticles);
    } else {
      setFilteredNews(newsArticles.filter(article => article.category === selectedCategory));
    }
  }, [selectedCategory]);

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

  const featuredArticle = newsArticles.find(article => article.featured);
  const regularArticles = filteredNews.filter(article => !article.featured || selectedCategory !== 'all');

  return (
    <>
      <Helmet>
        <title>Noticias de Tecnología - Wismora</title>
        <meta name="description" content="Mantente al día con las últimas noticias y tendencias del mundo de la tecnología. IA, desarrollo web, apps móviles y más." />
      </Helmet>

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">Noticias <span className="gradient-text">Tech</span></h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Mantente al día con las últimas tendencias y novedades del mundo tecnológico</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-200 ${selectedCategory === category.id ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-accent'}`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              );
            })}
          </motion.div>

          {selectedCategory === 'all' && featuredArticle && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="mb-16">
              <div className="bg-card border border-border rounded-3xl overflow-hidden card-hover">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="h-64 lg:h-auto bg-muted"><img alt={featuredArticle.image} className="w-full h-full object-cover" src={featuredArticle.image} /></div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="px-3 py-1 bg-red-500/10 text-red-500 dark:text-red-400 rounded-full text-sm font-medium">Destacado</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(featuredArticle.category)}`}>{categories.find(c => c.id === featuredArticle.category)?.name}</span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-card-foreground mb-4 leading-tight">{featuredArticle.title}</h2>
                    <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{featuredArticle.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-muted-foreground text-sm">
                        <div className="flex items-center space-x-1"><User className="w-4 h-4" /><span>{featuredArticle.author}</span></div>
                        <div className="flex items-center space-x-1"><Calendar className="w-4 h-4" /><span>{formatDate(featuredArticle.date)}</span></div>
                        <div className="flex items-center space-x-1"><Clock className="w-4 h-4" /><span>{featuredArticle.readTime}</span></div>
                      </div>
                      <Link to={`/noticias/${featuredArticle.id}`}>
                        <Button><ExternalLink className="w-4 h-4 mr-2" />Leer Más</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article, index) => (
              <motion.article key={article.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }} className="bg-card border border-border rounded-2xl overflow-hidden card-hover">
                <div className="h-48 bg-muted"><img alt={article.image} className="w-full h-full object-cover" src={article.image} /></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>{categories.find(c => c.id === article.category)?.name}</span>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-3 line-clamp-2 leading-tight">{article.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-muted-foreground text-xs">
                      <div className="flex items-center space-x-1"><User className="w-3 h-3" /><span>{article.author}</span></div>
                      <div className="flex items-center space-x-1"><Calendar className="w-3 h-3" /><span>{formatDate(article.date)}</span></div>
                    </div>
                    <Link to={`/noticias/${article.id}`}>
                      <Button size="sm" variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10">Leer<ExternalLink className="w-3 h-3 ml-1" /></Button>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-center py-16">
              <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">No hay noticias en esta categoría</h3>
              <p className="text-muted-foreground mb-6">Intenta seleccionar una categoría diferente</p>
              <Button onClick={() => setSelectedCategory('all')} variant="outline">Ver Todas las Noticias</Button>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mt-20">
            <div className="bg-card border border-border rounded-3xl p-8 lg:p-12 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">¿No quieres perderte ninguna <span className="gradient-text">noticia</span>?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Suscríbete a nuestro newsletter y recibe las últimas noticias tech directamente en tu inbox</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input type="email" placeholder="tu@email.com" className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                <Button className="px-8">Suscribirse</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default News;