import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Register = () => {
  const [formData, setFormData] = useState({ name: '',username:'', email: '',phone:'', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8000/sanctum/csrf-cookie', {
      credentials: 'include',
    });



    const xsrf = decodeURIComponent(
        document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/)?.[1] ?? ''
    );
    const res = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': xsrf,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      }),
    });


    const data = await res.json();
    if(data.ok){
      toast({ title: "¡Registro exitoso!", description: "Has creado tu cuenta correctamente" });
      Cookies.set('auth_token', data.token, {
        expires: 30,
        secure: import.meta.env.PROD,
        sameSite: 'lax',
      });
    } else {
      toast({ title: "Datos incorrectos", description: data.error, variant: "destructive" });
    }
    console.log(data);
  };

  return (
    <>
      <Helmet>
        <title>Registrarse - Wismora</title>
        <meta name="description" content="Únete a Wismora y comienza tu viaje en el mundo de la tecnología. Accede a cursos, comunidad y recursos exclusivos." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center">
                <UserPlus className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Únete a <span className="gradient-text">Wismora</span></h1>
            <p className="text-muted-foreground">Comienza tu viaje en el mundo de la tecnología</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="bg-card border border-border rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Nombre completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Tu nombre completo" />
                </div>
              </div>

              <div>

                <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">Nombre de usuario</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input id="username" name="username" type="text" required value={formData.username} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Con este nombre te visualizaran los demas" />
                </div>
              </div>


              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="tu@email.com" />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">Telefono</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input id="phone" name="phone" type="phone"  value={formData.phone} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="6671..." />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input id="password" name="password" type={showPassword ? 'text' : 'password'} required value={formData.password} onChange={handleChange} className="w-full pl-10 pr-12 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"><Eye className="w-5 h-5" /></button>
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">Confirmar contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} required value={formData.confirmPassword} onChange={handleChange} className="w-full pl-10 pr-12 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="••••••••" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"><Eye className="w-5 h-5" /></button>
                </div>
              </div>
              <div className="flex items-center">
                <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 text-primary focus:ring-primary border-muted-foreground rounded" />
                <label htmlFor="terms" className="ml-2 block text-sm text-foreground">Acepto los <button type="button"  className="text-primary hover:text-primary/80">términos y condiciones</button></label>
              </div>
              <Button type="submit" disabled={isLoading} className="w-full text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? ( <div className="flex items-center justify-center"><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>Creando cuenta...</div> ) : 'Crear Cuenta'}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-muted-foreground">¿Ya tienes cuenta? <Link to="/login" className="text-primary hover:text-primary/80 font-medium">Inicia sesión</Link></p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-center">
            <p className="text-muted-foreground text-sm">Al registrarte, aceptas nuestros <button className="text-primary hover:text-primary/80">Términos de Servicio</button> y <button className="text-primary hover:text-primary/80">Política de Privacidad</button></p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Register;