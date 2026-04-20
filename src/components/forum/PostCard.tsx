import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, MoreHorizontal, Clock, Share2, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/components/ui/use-toast';

const PostCard = ({ post, onLike, onComment, onShare, onDelete }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = Math.floor((now - postTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
  };

  const isOwner = currentUser && currentUser.name === post.author;

  return (
    <AlertDialog>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card border border-border rounded-2xl p-6 card-hover"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
              <span className="font-bold text-sm">{post.avatar}</span>
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground">{post.author}</h3>
              <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                <Clock className="w-3 h-3" />
                <span>{formatTimeAgo(post.timestamp)}</span>
              </div>
            </div>
          </div>
          {isOwner && (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-accent">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem className="text-red-500 focus:text-red-500">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Eliminar</span>
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <div className="mb-4">
          <p className="text-foreground/90 leading-relaxed mb-4">{post.content}</p>
          {post.image && (
            <div className="h-64 bg-muted rounded-xl overflow-hidden">
              <img  alt={post.image || 'Forum post image'} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onLike(post.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                post.liked 
                  ? 'text-red-500 bg-red-500/10 hover:bg-red-500/20' 
                  : 'text-muted-foreground hover:text-red-500 hover:bg-red-500/10'
              }`}
            >
              <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
              <span className="font-medium">{post.likes}</span>
            </button>
            
            <button
              onClick={onComment}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-200"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">{post.comments}</span>
            </button>
          </div>
          
          <button
            onClick={onShare}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-green-500 hover:bg-green-500/10 transition-colors duration-200"
          >
            <Share2 className="w-5 h-5" />
            <span className="font-medium hidden sm:inline">Compartir</span>
          </button>
        </div>
      </motion.div>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro de que quieres eliminar esta publicación?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente tu publicación de nuestros servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => onDelete(post.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PostCard;