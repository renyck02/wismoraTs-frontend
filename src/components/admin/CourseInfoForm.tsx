
import React from 'react';
import { Input } from '@/components/ui/input';

const CourseInfoForm = ({ course, setCourse }) => {
    const handleInputChange = (e) => setCourse({ ...course, [e.target.id]: e.target.value });

    return (
        <div className="bg-card p-6 rounded-2xl border border-border">
            <h2 className="text-2xl font-semibold mb-4">Información General</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label htmlFor="title" className="text-sm font-medium">Título del Curso</label>
                    <Input id="title" value={course.title} onChange={handleInputChange} />
                </div>
                <div className="space-y-1">
                    <label htmlFor="category" className="text-sm font-medium">Categoría</label>
                    <Input id="category" value={course.category} onChange={handleInputChange} />
                </div>
                <div className="space-y-1">
                    <label htmlFor="instructor" className="text-sm font-medium">Instructor</label>
                    <Input id="instructor" value={course.instructor} onChange={handleInputChange} />
                </div>
                <div className="space-y-1">
                    <label htmlFor="level" className="text-sm font-medium">Nivel</label>
                    <Input id="level" value={course.level} onChange={handleInputChange} />
                </div>
                <div className="space-y-1">
                    <label htmlFor="duration" className="text-sm font-medium">Duración</label>
                    <Input id="duration" value={course.duration} onChange={handleInputChange} />
                </div>
                <div className="space-y-1">
                    <label htmlFor="price" className="text-sm font-medium">Precio</label>
                    <Input id="price" value={course.price} onChange={handleInputChange} />
                </div>
                <div className="md:col-span-2 space-y-1">
                    <label htmlFor="description" className="text-sm font-medium">Descripción</label>
                    <textarea id="description" rows="4" className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm" value={course.description} onChange={handleInputChange}></textarea>
                </div>
            </div>
        </div>
    );
};

export default CourseInfoForm;
