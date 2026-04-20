
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { Code, Database, Smartphone, Brain, Shield, Palette, Wind, GitBranch } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import CourseInfoForm from '@/components/admin/CourseInfoForm';
import { coursesData } from '@/data/coursesData';

const iconMap = {
    Code, Database, Smartphone, Brain, Shield, Palette, Wind, GitBranch
};

const CreateCourse = () => {
    const navigate = useNavigate();
    const [course, setCourse] = useState({
        title: '',
        category: '',
        level: 'Principiante',
        instructor: '',
        duration: '',
        price: '',
        description: '',
        icon: 'Code',
        prerequisites: [],
        position: { x: 0, y: 0 },
        rating: 0,
        students: 0,
        content: {
            videos: [],
            documents: [],
            exams: [],
        },
    });

    const handleSave = () => {
        if (!course.title || !course.category || !course.instructor) {
            toast.error('Por favor, completa los campos obligatorios: Título, Categoría e Instructor.');
            return;
        }

        const newCourse = {
            ...course,
            id: Date.now(),
            icon: iconMap[course.icon] || Code,
        };
        
        coursesData.push(newCourse);
        
        toast.success(`¡Curso "${course.title}" creado con éxito!`);
        navigate('/admin/cursos');
    };

    return (
        <>
            <Helmet><title>Añadir Nuevo Curso - Admin</title></Helmet>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="flex items-center mb-8">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/admin/cursos')} className="mr-4">
                        <ArrowLeft />
                    </Button>
                    <div>
                        <h1 className="text-4xl font-bold text-foreground">Añadir Nuevo Curso</h1>
                        <p className="text-muted-foreground mt-1">Completa los detalles para crear un nuevo curso.</p>
                    </div>
                </div>

                <div className="space-y-8">
                    <CourseInfoForm course={course} setCourse={setCourse} />
                </div>
                
                <div className="mt-8 flex justify-end space-x-4">
                    <Button variant="outline" onClick={() => navigate('/admin/cursos')}>Cancelar</Button>
                    <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Guardar Curso</Button>
                </div>
            </motion.div>
        </>
    );
};

export default CreateCourse;
