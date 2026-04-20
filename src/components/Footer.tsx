import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="bg-card border-t border-border py-12 mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center space-x-2 mb-4">
            <img src="" alt="Wismora Logo" className="h-8 w-auto mix-blend-multiply dark:mix-blend-screen dark:invert" />
            <span className="text-2xl font-bold text-foreground">Wismora</span>
          </Link>
          <p className="text-muted-foreground leading-relaxed">
            Tu plataforma líder para el aprendizaje de tecnología.
            Transforma tu futuro con nuestros cursos y comunidad.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Enlaces Rápidos</h3>
          <ul className="space-y-2">
            <li><Link to="/cursos" className="text-muted-foreground hover:text-primary transition-colors">Cursos</Link></li>
            <li><Link to="/ruta-de-aprendizaje" className="text-muted-foreground hover:text-primary transition-colors">Ruta de Aprendizaje</Link></li>
            <li><Link to="/noticias" className="text-muted-foreground hover:text-primary transition-colors">Noticias</Link></li>
            <li><Link to="/foro" className="text-muted-foreground hover:text-primary transition-colors">Foro</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Contacto</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-primary" />
              <span>info@wismora.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-primary" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-primary mt-1" />
              <span>123 Calle Tech, Ciudad Futuro, País Digital</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
        <span>&copy; {currentYear} Wismora. Todos los derechos reservados.</span>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-primary transition-colors" aria-label="Facebook"><Facebook className="w-5 h-5" /></a>
          <a href="#" className="hover:text-primary transition-colors" aria-label="Twitter"><Twitter className="w-5 h-5" /></a>
          <a href="#" className="hover:text-primary transition-colors" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
          <a href="#" className="hover:text-primary transition-colors" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;