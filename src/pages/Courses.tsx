import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Search, Star, Clock, Users, BookOpen, Code, Database, Smartphone, Brain, Shield, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { coursesData } from '@/data/coursesData';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredCourses, setFilteredCourses] = useState([]);

  const categories = [
    { id: 'all', name: 'Todos', icon: BookOpen },
    { id: 'web', name: 'Desarrollo Web', icon: Code },
    { id: 'mobile', name: 'Apps Móviles', icon: Smartphone },
    { id: 'ai', name: 'IA & Machine Learning', icon: Brain },
    { id: 'data', name: 'Data Science', icon: Database },
    { id: 'security', name: 'Ciberseguridad', icon: Shield },
    { id: 'design', name: 'UI/UX Design', icon: Palette }
  ];

  useEffect(() => {
    let filtered = coursesData;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCourses(filtered);
  }, [searchTerm, selectedCategory]);

  const getLevelColor = (level) => {
    switch (level) {
      case 'Principiante': return 'bg-green-500/10 text-green-500 dark:text-green-400';
      case 'Intermedio': return 'bg-yellow-500/10 text-yellow-500 dark:text-yellow-400';
      case 'Avanzado': return 'bg-red-500/10 text-red-500 dark:text-red-400';
      default: return 'bg-gray-500/10 text-gray-500 dark:text-gray-400';
    }
  };

  return (
    <>
      <Helmet>
        <title>Cursos de Tecnología - Wismora</title>
        <meta name="description" content="Explora nuestra amplia selección de cursos de tecnología. Desarrollo web, IA, apps móviles, data science y más." />
      </Helmet>

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Explora Nuestros <span className="gradient-text">Cursos</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Descubre cursos diseñados por expertos para llevarte al siguiente nivel profesional
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar cursos, instructores o tecnologías..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-accent'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <p className="text-muted-foreground">
              Mostrando {filteredCourses.length} curso{filteredCourses.length !== 1 ? 's' : ''}
              {selectedCategory !== 'all' && ` en ${categories.find(c => c.id === selectedCategory)?.name}`}
              {searchTerm && ` para "${searchTerm}"`}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-card rounded-2xl overflow-hidden card-hover border border-border"
              >
                <div className="h-48 bg-muted flex items-center justify-center">
                  <img  alt={course.title} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1635251595512-dc52146d5ae8" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-muted-foreground">{course.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-card-foreground mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-muted-foreground mb-3">Por {course.instructor}</p>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{course.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-foreground">{course.price}</span>
                    <Link to={`/curso/${course.id}`}>
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Ver Curso
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">No se encontraron cursos</h3>
              <p className="text-muted-foreground mb-6">
                Intenta ajustar tus filtros o términos de búsqueda
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                variant="outline"
              >
                Limpiar Filtros
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default Courses;