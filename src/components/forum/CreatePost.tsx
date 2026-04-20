import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CreatePost = ({ onCreatePost }) => {
  const [newPost, setNewPost] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const avatar = user ? user.name.split(' ').map(n => n[0]).join('') : '?';

  const handleSubmit = () => {
    if (newPost.trim()) {
      onCreatePost(newPost);
      setNewPost('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border rounded-2xl p-6 mb-8"
    >
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0">
          <span className="font-bold">{avatar}</span>
        </div>
        <div className="flex-1">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="¿Qué quieres compartir con la comunidad?"
            className="w-full p-4 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows="3"
          />
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              {newPost.length}/500
            </div>
            <Button onClick={handleSubmit} disabled={!newPost.trim() || !user}>
              <Plus className="w-4 h-4 mr-2" />
              Publicar
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CreatePost;