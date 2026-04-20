import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User, BookOpen, Newspaper, MessageSquare, Home, LogIn, UserPlus, GitMerge, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ThemeToggle from '@/components/ThemeToggle';
import { useAdmin } from '@/contexts/AdminContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  const { isAdmin } = useAdmin();

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente",
    });
  };

  const navItems = [
    { name: 'Inicio', path: '/', icon: Home },
    { name: 'Cursos', path: '/cursos', icon: BookOpen },
    { name: 'Ruta de Aprendizaje', path: '/ruta-de-aprendizaje', icon: GitMerge },
    { name: 'Noticias', path: '/noticias', icon: Newspaper },
    { name: 'Foro', path: '/foro', icon: MessageSquare },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center space-x-2">
              <img src="" alt="Wismora Logo" className="h-8 w-auto mix-blend-multiply dark:mix-blend-screen dark:invert" />
              <span className="text-xl font-bold text-foreground">Wismora</span>
            </Link>
          </motion.div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${
                      location.pathname === item.path
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <ThemeToggle />
            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="destructive" size="sm">
                      <ShieldCheck className="w-4 h-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Link to="/perfil">
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Perfil
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    <LogIn className="w-4 h-4 mr-2" />
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/registro">
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Registrarse
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
             <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-border"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center space-x-3 ${
                    location.pathname === item.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            <div className="border-t border-border pt-4 mt-2">
              {isLoggedIn ? (
                <div className="space-y-2">
                  {isAdmin && (
                     <Link
                      to="/admin"
                      className="block px-3 py-2 rounded-md text-base font-medium text-destructive hover:bg-destructive/10 flex items-center space-x-3"
                      onClick={() => setIsOpen(false)}
                    >
                      <ShieldCheck className="w-5 h-5" />
                      <span>Admin Panel</span>
                    </Link>
                  )}
                  <Link
                    to="/perfil"
                    className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground flex items-center space-x-3"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>Perfil</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground flex items-center space-x-3"
                    onClick={() => setIsOpen(false)}
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Iniciar Sesión</span>
                  </Link>
                  <Link
                    to="/registro"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-primary text-primary-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    <UserPlus className="w-5 h-5 mr-3" />
                    <span>Registrarse</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;