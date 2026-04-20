import React from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, MessageSquare, Users, Plus } from 'lucide-react';

const categories = [
  { id: 'all', name: 'Todo', icon: TrendingUp },
  { id: 'general', name: 'General', icon: MessageSquare },
  { id: 'help', name: 'Ayuda', icon: Users },
  { id: 'projects', name: 'Proyectos', icon: Plus }
];

const ForumFilters = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar en el foro..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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
  );
};

export default ForumFilters;