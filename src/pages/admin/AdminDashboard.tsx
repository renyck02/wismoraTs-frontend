import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Users, BookOpen, DollarSign, BarChart } from 'lucide-react';

const StatCard = ({ icon, title, value, change, color }) => {
  const Icon = icon;
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-card p-6 rounded-2xl border border-border shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-muted-foreground">{title}</h3>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}/10`}>
          <Icon className={`w-6 h-6 text-${color}`} />
        </div>
      </div>
      <p className="text-4xl font-bold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{change}</p>
    </motion.div>
  );
};

const AdminDashboard = () => {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Wismora</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground mb-8">Bienvenido al panel de administración de Wismora.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={Users} title="Total de Usuarios" value="12,345" change="+5% este mes" color="primary" />
          <StatCard icon={BookOpen} title="Cursos Activos" value="42" change="+2 nuevos" color="green-500" />
          <StatCard icon={DollarSign} title="Ingresos (Mes)" value="$8,450" change="+12% vs mes anterior" color="blue-500" />
          <StatCard icon={BarChart} title="Nuevas Inscripciones" value="312" change="-3% vs mes anterior" color="yellow-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card p-6 rounded-2xl border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">Actividad Reciente</h3>
            <ul className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <li key={i} className="flex items-center justify-between text-sm">
                  <p><span className="font-semibold text-foreground">Usuario {i+1}</span> se ha inscrito en <span className="text-primary">Curso de React</span>.</p>
                  <span className="text-muted-foreground">{i*2+1} min ago</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card p-6 rounded-2xl border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">Cursos Populares</h3>
            <ul className="space-y-3">
              <li><p className="text-sm font-medium">Desarrollo Web Full Stack</p></li>
              <li><p className="text-sm font-medium">Inteligencia Artificial y ML</p></li>
              <li><p className="text-sm font-medium">Diseño UI/UX</p></li>
            </ul>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AdminDashboard;