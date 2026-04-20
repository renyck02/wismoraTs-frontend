
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EditCourseHeader = ({ title, navigate }) => (
    <div className="flex items-center mb-8">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/cursos')} className="mr-4">
            <ArrowLeft />
        </Button>
        <div>
            <h1 className="text-4xl font-bold text-foreground">Editar Curso</h1>
            <p className="text-muted-foreground mt-1">{title}</p>
        </div>
    </div>
);

export default EditCourseHeader;
