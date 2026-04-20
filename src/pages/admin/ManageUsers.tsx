import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Users, Search, Plus, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { usersData } from '@/data/usersData';

const ManageUsers = () => {
    const { toast } = useToast();

    const handleAction = () => {

    };
    
    const users = usersData;

    return (
        <>
            <Helmet>
                <title>Gestionar Usuarios - Admin</title>
            </Helmet>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-foreground">Gestionar Usuarios</h1>
                        <p className="text-muted-foreground mt-1">Administra los usuarios de la plataforma.</p>
                    </div>
                    <Button onClick={handleAction}>
                        <Plus className="mr-2 h-4 w-4" /> Añadir Usuario
                    </Button>
                </div>
                
                 <div className="bg-card p-6 rounded-2xl border border-border">
                    <div className="flex items-center mb-4">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Buscar usuarios por nombre o email..."
                                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg"
                                onChange={handleAction}
                            />
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-muted-foreground uppercase bg-secondary">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Nombre</th>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Rol</th>
                                    <th scope="col" className="px-6 py-3">Miembro desde</th>
                                    <th scope="col" className="px-6 py-3 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-b border-border hover:bg-secondary/50">
                                        <td className="px-6 py-4 font-medium text-foreground">{user.name}</td>
                                        <td className="px-6 py-4">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'Admin' ? 'bg-destructive/20 text-destructive' : 'bg-primary/20 text-primary'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{user.joined}</td>
                                        <td className="px-6 py-4 text-right">
                                            <Link to={`/admin/usuarios/editar/${user.id}`}>
                                                <Button variant="ghost" size="icon">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </motion.div>
        </>
    );
};

export default ManageUsers;