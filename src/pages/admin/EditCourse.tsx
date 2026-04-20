
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { DragDropContext } from 'react-beautiful-dnd';
import { coursesData } from '@/data/coursesData';
import { useToast } from '@/components/ui/use-toast';

import EditCourseHeader from '@/components/admin/EditCourseHeader';
import CourseInfoForm from '@/components/admin/CourseInfoForm';
import VideosManager from '@/components/admin/VideosManager';
import DocumentsManager from '@/components/admin/DocumentsManager';
import ExamsManager from '@/components/admin/ExamsManager';
import ActionButtons from '@/components/admin/ActionButtons';
import EditModals from '@/components/admin/EditModals';

const EditCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [course, setCourse] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    
    const [modalState, setModalState] = useState({
        isAddAlertOpen: false,
        addAlertConfig: { title: '', description: '', onConfirm: () => {} },
        addInputValue: '',
        isEditModalOpen: false,
        editingItem: null,
        editingType: null,
        isDeleteAlertOpen: false,
        itemToDelete: null,
        deleteType: null,
    });

    useEffect(() => {
        setIsMounted(true);
        const courseToEdit = JSON.parse(JSON.stringify(coursesData.find(c => c.id.toString() === id)));
        if (courseToEdit) {
            setCourse(courseToEdit);
        } else {
            toast({ title: "Error", description: "Curso no encontrado.", variant: "destructive" });
            navigate('/admin/cursos');
        }
    }, [id, navigate, toast]);
    
    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const { source, destination, type } = result;

        setCourse(prevCourse => {
            const tempCourse = JSON.parse(JSON.stringify(prevCourse));
            
            if (type === 'modules') {
                const [reorderedItem] = tempCourse.content.videos.splice(source.index, 1);
                tempCourse.content.videos.splice(destination.index, 0, reorderedItem);
            } else if (type === 'lessons') {
                const sourceModuleIndex = tempCourse.content.videos.findIndex(m => m.id === source.droppableId);
                const destModuleIndex = tempCourse.content.videos.findIndex(m => m.id === destination.droppableId);
                if(sourceModuleIndex === -1 || destModuleIndex === -1) return prevCourse;
                
                const sourceModule = tempCourse.content.videos[sourceModuleIndex];
                const destModule = tempCourse.content.videos[destModuleIndex];
                const [movedLesson] = sourceModule.lessons.splice(source.index, 1);
                destModule.lessons.splice(destination.index, 0, movedLesson);
            } else if (type === 'documents') {
                const [reorderedDoc] = tempCourse.content.documents.splice(source.index, 1);
                tempCourse.content.documents.splice(destination.index, 0, reorderedDoc);
            } else if (type === 'exams') {
                const [reorderedExam] = tempCourse.content.exams.splice(source.index, 1);
                tempCourse.content.exams.splice(destination.index, 0, reorderedExam);
            }

            return tempCourse;
        });
    };

    const handleSave = () => {
        toast({ title: "¡Guardado!", description: `El curso "${course.title}" ha sido actualizado (simulación).` });
        navigate('/admin/cursos');
    };
    
    if (!course || !isMounted) return <div className="flex justify-center items-center h-screen">Cargando...</div>;

    return (
        <>
            <Helmet><title>Editar Curso: {course.title} - Admin</title></Helmet>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <EditCourseHeader title={course.title} navigate={navigate} />

                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <div className="space-y-8">
                        <CourseInfoForm course={course} setCourse={setCourse} />
                        <VideosManager course={course} setCourse={setCourse} setModalState={setModalState} />
                        <DocumentsManager course={course} setCourse={setCourse} setModalState={setModalState} />
                        <ExamsManager course={course} setCourse={setCourse} setModalState={setModalState} navigate={navigate} />
                    </div>
                </DragDropContext>

                <ActionButtons onCancel={() => navigate('/admin/cursos')} onSave={handleSave} />
            </motion.div>

            <EditModals course={course} setCourse={setCourse} modalState={modalState} setModalState={setModalState} />
        </>
    );
};

export default EditCourse;
