import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { User, Mail, Calendar, BookOpen, Trophy, Settings, Edit, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const coursesData = [
    { id: 1, title: "Desarrollo Web Full Stack con React y Node.js", progress: 75, instructor: "María González", image: "Desarrollador trabajando con React y Node.js" },
    { id: 2, title: "Inteligencia Artificial y Machine Learning", progress: 45, instructor: "Dr. Carlos Ruiz", image: "Visualización de algoritmos de machine learning" },
    { id: 3, title: "Desarrollo de Apps Móviles con React Native", progress: 90, instructor: "Ana Martínez", image: "Desarrollo de aplicaciones móviles" }
  ];

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setEditForm({ name: parsedUser.name, email: parsedUser.email });

    const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    const userCourses = coursesData.filter(course => enrolled.includes(course.id));
    setEnrolledCourses(userCourses);
  }, [navigate]);

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    const updatedUser = { ...user, name: editForm.name, email: editForm.email };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setUser(updatedUser);
    setIsEditing(false);
    toast({ title: "Perfil actualizado", description: "Tus datos han sido guardados correctamente" });
  };

  const handleCancel = () => {
    setEditForm({ name: user.name, email: user.email });
    setIsEditing(false);
  };

  const handleContinueCourse = (courseId) => {

  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (!user) {
    return <div className="pt-24 pb-12 text-center text-foreground">Cargando perfil...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Mi Perfil - Wismora</title>
        <meta name="description" content="Gestiona tu perfil, revisa tu progreso en los cursos y actualiza tu información personal en Wismora." />
      </Helmet>

      <div className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">Mi <span className="gradient-text">Perfil</span></h1>
            <p className="text-xl text-muted-foreground">Gestiona tu información y revisa tu progreso</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="bg-card border border-border rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-2xl">{user.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  {isEditing ? (
                    <div className="space-y-4">
                      <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground text-center focus:outline-none focus:ring-2 focus:ring-primary" />
                      <input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground text-center focus:outline-none focus:ring-2 focus:ring-primary" />
                      <div className="flex space-x-2">
                        <Button onClick={handleSave} size="sm" className="flex-1"><Save className="w-4 h-4 mr-2" />Guardar</Button>
                        <Button onClick={handleCancel} variant="outline" size="sm" className="flex-1"><X className="w-4 h-4 mr-2" />Cancelar</Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-2xl font-bold text-card-foreground mb-2">{user.name}</h2>
                      <p className="text-muted-foreground mb-4">{user.email}</p>
                      <Button onClick={handleEdit} variant="outline" size="sm"><Edit className="w-4 h-4 mr-2" />Editar Perfil</Button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-foreground"><Calendar className="w-5 h-5 text-primary" /><div><p className="text-sm text-muted-foreground">Miembro desde</p><p className="font-medium">{formatDate(user.joinDate)}</p></div></div>
                  <div className="flex items-center space-x-3 text-foreground"><BookOpen className="w-5 h-5 text-green-500" /><div><p className="text-sm text-muted-foreground">Cursos inscritos</p><p className="font-medium">{enrolledCourses.length}</p></div></div>
                  <div className="flex items-center space-x-3 text-foreground"><Trophy className="w-5 h-5 text-yellow-400" /><div><p className="text-sm text-muted-foreground">Certificados</p><p className="font-medium">{enrolledCourses.filter(c => c.progress === 100).length}</p></div></div>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <Button  variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground"><Settings className="w-5 h-5 mr-3" />Configuración</Button>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="space-y-8">
                <div className="bg-card border border-border rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-card-foreground mb-6">Mis Cursos</h3>
                  {enrolledCourses.length > 0 ? (
                    <div className="space-y-6">
                      {enrolledCourses.map((course) => (
                        <div key={course.id} className="border border-border rounded-xl p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1"><h4 className="text-lg font-semibold text-card-foreground mb-2">{course.title}</h4><p className="text-muted-foreground text-sm">Por {course.instructor}</p></div>
                            <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0"><img  alt={course.image} className="w-full h-full object-cover rounded-lg" src="https://images.unsplash.com/photo-1635251595512-dc52146d5ae8" /></div>
                          </div>
                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-2"><span className="text-sm text-muted-foreground">Progreso</span><span className="text-sm font-medium text-foreground">{course.progress}%</span></div>
                            <div className="w-full bg-secondary rounded-full h-2"><div className="bg-primary h-2 rounded-full" style={{ width: `${course.progress}%` }}></div></div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-muted-foreground">{course.progress === 100 ? <span className="text-green-500 font-medium">✓ Completado</span> : <span>En progreso</span>}</div>
                            <Button onClick={() => handleContinueCourse(course.id)} size="sm">{course.progress === 100 ? 'Revisar' : 'Continuar'}</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h4 className="text-xl font-semibold text-foreground mb-2">No tienes cursos inscritos</h4>
                      <p className="text-muted-foreground mb-6">Explora nuestro catálogo y comienza tu aprendizaje</p>
                      <Button onClick={() => navigate('/cursos')}>Explorar Cursos</Button>
                    </div>
                  )}
                </div>

                <div className="bg-card border border-border rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-card-foreground mb-6">Logros</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-4 p-4 bg-secondary rounded-lg">
                      <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center"><BookOpen className="w-6 h-6" /></div>
                      <div><h4 className="font-semibold text-foreground">Primer Curso</h4><p className="text-sm text-muted-foreground">Te inscribiste en tu primer curso</p></div>
                    </div>
                    {enrolledCourses.some(c => c.progress >= 50) && (
                      <div className="flex items-center space-x-4 p-4 bg-secondary rounded-lg">
                        <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center"><Trophy className="w-6 h-6" /></div>
                        <div><h4 className="font-semibold text-foreground">Medio Camino</h4><p className="text-sm text-muted-foreground">Completaste el 50% de un curso</p></div>
                      </div>
                    )}
                    {enrolledCourses.some(c => c.progress === 100) && (
                      <div className="flex items-center space-x-4 p-4 bg-secondary rounded-lg">
                        <div className="w-12 h-12 bg-yellow-500/10 text-yellow-500 rounded-full flex items-center justify-center"><Trophy className="w-6 h-6" /></div>
                        <div><h4 className="font-semibold text-foreground">Graduado</h4><p className="text-sm text-muted-foreground">Completaste tu primer curso</p></div>
                      </div>
                    )}
                    {enrolledCourses.length === 0 && (
                      <div className="col-span-2 text-center py-8">
                        <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-muted-foreground">Los logros aparecerán aquí</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;