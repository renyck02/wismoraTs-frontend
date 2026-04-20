import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import PostCard from '@/components/forum/PostCard';
import CreatePost from '@/components/forum/CreatePost';
import ForumFilters from '@/components/forum/ForumFilters';

const Forum = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const initialPosts = [
    { id: 1, author: "María González", avatar: "MG", content: "¡Acabo de terminar mi primer proyecto con React! 🎉 Ha sido un viaje increíble aprendiendo hooks, context API y todo el ecosistema. ¿Algún consejo para optimizar el rendimiento?", category: "projects", timestamp: "2024-06-20T10:30:00Z", likes: 24, comments: 8, liked: false, image: "Proyecto React con componentes y código en pantalla" },
    { id: 2, author: "Carlos Ruiz", avatar: "CR", content: "¿Alguien más está experimentando con GPT-4 para generar código? Los resultados son impresionantes, pero me pregunto cuáles son las mejores prácticas para integrarlo en el flujo de desarrollo.", category: "general", timestamp: "2024-06-20T09:15:00Z", likes: 18, comments: 12, liked: true, image: null },
    { id: 3, author: "Ana Martínez", avatar: "AM", content: "Necesito ayuda con Flutter 🙏 Estoy tratando de implementar navegación entre pantallas pero me encuentro con errores de contexto. ¿Alguien ha pasado por esto?", category: "help", timestamp: "2024-06-20T08:45:00Z", likes: 7, comments: 15, liked: false, image: null },
    { id: 4, author: "Roberto Silva", avatar: "RS", content: "Compartiendo mi experiencia migrando de JavaScript a TypeScript en un proyecto grande. Los beneficios son enormes pero el proceso inicial puede ser abrumador. ¡Vale la pena cada minuto invertido!", category: "general", timestamp: "2024-06-19T16:20:00Z", likes: 31, comments: 6, liked: false, image: "Código TypeScript con tipos y interfaces en editor" },
    { id: 5, author: "Laura Fernández", avatar: "LF", content: "¡Mi app de gestión de tareas ya está en la App Store! 📱 Después de 6 meses de desarrollo con React Native, finalmente está disponible. Gracias a toda la comunidad por el apoyo.", category: "projects", timestamp: "2024-06-19T14:10:00Z", likes: 45, comments: 20, liked: true, image: "App móvil de gestión de tareas en smartphone" }
  ];

  useEffect(() => {
    const savedPosts = localStorage.getItem('forumPosts');
    setPosts(savedPosts ? JSON.parse(savedPosts) : initialPosts);
  }, []);

  const handleCreatePost = (newPostContent) => {
    const user = localStorage.getItem('user');
    if (!user) {
      toast({ title: "Inicia sesión requerida", description: "Debes iniciar sesión para crear publicaciones", variant: "destructive" });
      return;
    }
    const userData = JSON.parse(user);
    const post = { id: Date.now(), author: userData.name, avatar: userData.name.split(' ').map(n => n[0]).join(''), content: newPostContent, category: "general", timestamp: new Date().toISOString(), likes: 0, comments: 0, liked: false, image: null };
    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('forumPosts', JSON.stringify(updatedPosts));
    toast({ title: "¡Publicación creada!", description: "Tu publicación se ha compartido con la comunidad" });
  };

  const handleLike = (postId) => {
    if (!localStorage.getItem('user')) {
      toast({ title: "Inicia sesión requerida", description: "Debes iniciar sesión para dar like", variant: "destructive" });
      return;
    }
    const updatedPosts = posts.map(post => post.id === postId ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post);
    setPosts(updatedPosts);
    localStorage.setItem('forumPosts', JSON.stringify(updatedPosts));
  };
  
  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem('forumPosts', JSON.stringify(updatedPosts));
    toast({
      title: "Publicación eliminada",
      description: "Tu publicación ha sido eliminada correctamente.",
    });
  };

  const handleCommentOrShare = () => {
    toast({ title: "🚧 Esta funcionalidad no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀" });
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchTerm === '' || post.content.toLowerCase().includes(searchTerm.toLowerCase()) || post.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Foro de la Comunidad - Wismora</title>
        <meta name="description" content="Conecta con otros estudiantes y profesionales tech. Comparte proyectos, resuelve dudas y participa en discusiones." />
      </Helmet>

      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">Foro <span className="gradient-text">Comunidad</span></h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Conecta, comparte y aprende junto a miles de desarrolladores y estudiantes tech</p>
          </motion.div>

          <ForumFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <CreatePost onCreatePost={handleCreatePost} />

          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} onLike={handleLike} onComment={handleCommentOrShare} onShare={handleCommentOrShare} onDelete={handleDeletePost} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">No hay publicaciones</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || selectedCategory !== 'all' ? 'Intenta ajustar tus filtros de búsqueda' : 'Sé el primero en compartir algo'}
              </p>
              {(searchTerm || selectedCategory !== 'all') && (
                <Button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }} variant="outline">Limpiar Filtros</Button>
              )}
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="mt-16">
            <div className="bg-card border border-border rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Nuestra <span className="gradient-text">Comunidad</span></h2>
              <div className="grid grid-cols-3 gap-8">
                <div><div className="text-3xl font-bold text-foreground mb-2">12.5K</div><div className="text-muted-foreground">Miembros</div></div>
                <div><div className="text-3xl font-bold text-foreground mb-2">3.2K</div><div className="text-muted-foreground">Publicaciones</div></div>
                <div><div className="text-3xl font-bold text-foreground mb-2">8.7K</div><div className="text-muted-foreground">Respuestas</div></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Forum;