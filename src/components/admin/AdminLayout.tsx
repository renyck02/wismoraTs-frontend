import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Book, Users, BarChart, LogOut, Home, Menu, X, GitBranch } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Gestionar Cursos', path: '/admin/cursos', icon: Book },
  { name: 'Ruta de Aprendizaje', path: '/admin/ruta-aprendizaje', icon: GitBranch },
  { name: 'Gestionar Usuarios', path: '/admin/usuarios', icon: Users },
  { name: 'Analíticas', path: '/admin/analiticas', icon: BarChart },
];

const SidebarContent = ({ onLinkClick }) => {
  const location = useLocation();
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 mb-8 text-center">
        <Link to="/" className="flex items-center justify-center space-x-2">
          <img src="" alt="Wismora Logo" className="h-8 w-auto mix-blend-multiply dark:mix-blend-screen dark:invert" />
          <span className="text-xl font-bold">Wismora Admin</span>
        </Link>
      </div>
      <nav className="flex-1">
        <ul>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={onLinkClick}
                  className={`flex items-center space-x-3 p-3 my-1 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-auto">
         <Link to="/" onClick={onLinkClick} className="flex items-center space-x-3 p-3 my-1 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
          <Home className="w-5 h-5" />
          <span className="font-medium">Volver al Sitio</span>
        </Link>
        <button className="flex items-center space-x-3 p-3 my-1 w-full text-left rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

const AdminLayout = () => {
  const { isAdmin } = useAdmin();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarOpen(false);
    }
  }, [location]);

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' },
  };

  return (
    <div className="flex h-screen bg-secondary/50 overflow-hidden">
      <aside className="w-64 bg-card text-card-foreground p-4 flex-col border-r border-border hidden lg:flex">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-64 bg-card text-card-foreground p-4 flex flex-col z-50 lg:hidden"
            >
              <SidebarContent onLinkClick={() => setSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      
      <div className="flex-1 flex flex-col">
        <header className="lg:hidden flex items-center justify-between p-4 bg-card border-b border-border sticky top-0 z-30">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
          <Link to="/" className="flex items-center space-x-2">
            <img src="" alt="Wismora Logo" className="h-7 w-auto mix-blend-multiply dark:mix-blend-screen dark:invert" />
            <span className="text-lg font-bold">Admin</span>
          </Link>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;