
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const data = [
  { name: 'Ene', Usuarios: 400, Ingresos: 2400 },
  { name: 'Feb', Usuarios: 300, Ingresos: 1398 },
  { name: 'Mar', Usuarios: 200, Ingresos: 9800 },
  { name: 'Abr', Usuarios: 278, Ingresos: 3908 },
  { name: 'May', Usuarios: 189, Ingresos: 4800 },
  { name: 'Jun', Usuarios: 239, Ingresos: 3800 },
  { name: 'Jul', Usuarios: 349, Ingresos: 4300 },
];

const barData = [
  { name: 'React', Inscritos: 450 },
  { name: 'Node.js', Inscritos: 320 },
  { name: 'UI/UX', Inscritos: 280 },
  { name: 'AI/ML', Inscritos: 210 },
  { name: 'Ciberseguridad', Inscritos: 150 },
];

const ChartCard = ({ title, children }) => (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
        <h3 className="text-xl font-semibold text-foreground mb-4">{title}</h3>
        <div style={{ width: '100%', height: 300 }}>
            {children}
        </div>
    </div>
);

const Analytics = () => {
  return (
    <>
      <Helmet>
        <title>Analíticas - Admin</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground">Analíticas</h1>
            <p className="text-muted-foreground mt-1">Visualiza el rendimiento de la plataforma.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Crecimiento de Usuarios e Ingresos">
                <ResponsiveContainer>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                        <Legend />
                        <Line type="monotone" dataKey="Usuarios" stroke="hsl(var(--primary))" strokeWidth={2} />
                        <Line type="monotone" dataKey="Ingresos" stroke="hsl(var(--destructive))" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Inscripciones por Curso">
                <ResponsiveContainer>
                    <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                        <Legend />
                        <Bar dataKey="Inscritos" fill="hsl(var(--primary))" />
                    </BarChart>
                </ResponsiveContainer>
            </ChartCard>
        </div>
      </motion.div>
    </>
  );
};

export default Analytics;
