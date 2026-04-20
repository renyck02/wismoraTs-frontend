import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { usersData } from '@/data/usersData.ts';

const InputField = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-muted-foreground mb-1">{label}</label>
        <input id={id} className="w-full px-4 py-2 bg-background border border-border rounded-lg" {...props} />
    </div>
);

const SelectField = ({ label, id, children, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-muted-foreground mb-1">{label}</label>
        <select id={id} className="w-full px-4 py-2 bg-background border border-border rounded-lg" {...props}>
            {children}
        </select>
    </div>
);

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userToEdit = usersData.find(u => u.id.toString() === id);
        if (userToEdit) {
            setUser(userToEdit);
        } else {
            toast({ title: "Error", description: "Usuario no encontrado.", variant: "destructive" });
            navigate('/admin/usuarios');
        }
    }, [id, navigate, toast]);

    if (!user) return <div>Cargando...</div>;

    const handleSave = () => {
        toast({
            title: "¡Guardado!",
            description: `El usuario "${user.name}" ha sido actualizado (simulación).`,
        });
        navigate('/admin/usuarios');
    };

    return (
        <>
            <Helmet>
                <title>Editar Usuario: {user.name} - Admin</title>
            </Helmet>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center mb-8">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/admin/usuarios')} className="mr-4">
                        <ArrowLeft />
                    </Button>
                    <div>
                        <h1 className="text-4xl font-bold text-foreground">Editar Usuario</h1>
                        <p className="text-muted-foreground mt-1">{user.name}</p>
                    </div>
                </div>

                <div className="bg-card p-6 rounded-2xl border border-border">
                    <div className="space-y-4">
                        <InputField label="Nombre Completo" id="name" defaultValue={user.name} />
                        <InputField label="Correo Electrónico" id="email" type="email" defaultValue={user.email} />
                        <SelectField label="Rol" id="role" defaultValue={user.role}>
                            <option>Estudiante</option>
                            <option>Admin</option>
                        </SelectField>
                    </div>
                </div>

                <div className="mt-8 flex justify-end space-x-4">
                    <Button variant="outline" onClick={() => navigate('/admin/usuarios')}>Cancelar</Button>
                    <Button onClick={handleSave}>
                        <Save className="mr-2 h-4 w-4" /> Guardar Cambios
                    </Button>
                </div>
            </motion.div>
        </>
    );
};

export default EditUser;