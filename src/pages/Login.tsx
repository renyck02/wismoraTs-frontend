import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === formData.email && u.password === formData.password);

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        toast({ title: "¡Bienvenido de vuelta!", description: "Has iniciado sesión correctamente" });
        navigate('/');
      } else {
        toast({ title: "Error de autenticación", description: "Email o contraseña incorrectos", variant: "destructive" });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Iniciar Sesión - Wismora</title>
        <meta name="description" content="Inicia sesión en Wismora para acceder a tus cursos y conectar con la comunidad tech." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center">
                <LogIn className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Bienvenido de <span className="gradient-text">vuelta</span></h1>
            <p className="text-muted-foreground">Inicia sesión para continuar tu aprendizaje</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="bg-card border border-border rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="tu@email.com" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input id="password" name="password" type={showPassword ? 'text' : 'password'} required value={formData.password} onChange={handleChange} className="w-full pl-10 pr-12 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-muted-foreground rounded" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-foreground">Recordarme</label>
                </div>
                <button type="button"  className="text-sm text-primary hover:text-primary/80">¿Olvidaste tu contraseña?</button>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                    Iniciando sesión...
                  </div>
                ) : 'Iniciar Sesión'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                ¿No tienes cuenta?{' '}
                <Link to="/registro" className="text-primary hover:text-primary/80 font-medium">Regístrate aquí</Link>
              </p>
            </div>
            
            <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-primary text-sm font-medium mb-2">Credenciales de prueba:</p>
              <p className="text-primary/80 text-xs">Email: demo@wismora.com</p>
              <p className="text-primary/80 text-xs">Contraseña: demo123</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-center">
            <p className="text-muted-foreground text-sm">
              Al iniciar sesión, aceptas nuestros{' '}
              <button onClick={() => className="text-primary hover:text-primary/80">Términos de Servicio</button>{' '}y{' '}
              <button onClick={() =>  className="text-primary hover:text-primary/80">Política de Privacidad</button>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Login;