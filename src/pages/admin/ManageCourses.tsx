
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { coursesData as initialCourses } from '@/data/coursesData';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ManageCourses = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseToDelete, setCourseToDelete] = useState(null);
  const navigate = useNavigate();

  const handleDeleteClick = (course) => {
    setCourseToDelete(course);
  };

  const confirmDelete = () => {
    if (courseToDelete) {
      const newCourses = courses.filter(c => c.id !== courseToDelete.id);
      // This is a simulation. In a real app, you would find a way to persist this.
      // For now, we update the original array to reflect changes across navigations.
      initialCourses.splice(initialCourses.findIndex(c => c.id === courseToDelete.id), 1);
      setCourses(newCourses);
      toast.success(`El curso "${courseToDelete.title}" ha sido eliminado.`);
      setCourseToDelete(null);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Gestionar Cursos - Admin</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Gestionar Cursos</h1>
            <p className="text-muted-foreground mt-1">Añade, edita o elimina cursos de la plataforma.</p>
          </div>
          <Button onClick={() => navigate('/admin/cursos/nuevo')}>
            <Plus className="mr-2 h-4 w-4" /> Añadir Curso
          </Button>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border">
          <div className="flex items-center mb-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar cursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary/30">
                <tr>
                  <th scope="col" className="px-6 py-3">Título del Curso</th>
                  <th scope="col" className="px-6 py-3">Categoría</th>
                  <th scope="col" className="px-6 py-3">Instructor</th>
                  <th scope="col" className="px-6 py-3">Estudiantes</th>
                  <th scope="col" className="px-6 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="border-b border-border hover:bg-secondary/50">
                    <th scope="row" className="px-6 py-4 font-medium text-foreground whitespace-nowrap">{course.title}</th>
                    <td className="px-6 py-4">{course.category}</td>
                    <td className="px-6 py-4">{course.instructor}</td>
                    <td className="px-6 py-4">{course.students.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Link to={`/admin/cursos/editar/${course.id}`}>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteClick(course)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
      
      <AlertDialog open={!!courseToDelete} onOpenChange={() => setCourseToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente el curso "{courseToDelete?.title}"
              y todos sus datos asociados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCourseToDelete(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={confirmDelete}
            >
              Sí, eliminar curso
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ManageCourses;
