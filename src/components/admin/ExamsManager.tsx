
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, Trash2, Edit2, GripVertical, FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ExamsManager = ({ course, setCourse, setModalState, navigate }) => {

    const handleAddExam = () => {
        const newExam = { id: `exam-${Date.now()}`, title: "Nuevo Examen", questions: [] };
        openEditModal(newExam, 'exam', true);
    };

    const openEditModal = (item, type, isNew = false) => {
        setModalState(prev => ({ ...prev, isEditModalOpen: true, editingItem: { ...item, isNew }, editingType: type }));
    };

    const openDeleteAlert = (item, type) => {
        setModalState(prev => ({ ...prev, isDeleteAlertOpen: true, itemToDelete: item, deleteType: type }));
    };

    const handleEditExamContent = (examId) => {
        navigate(`/admin/cursos/editar/${course.id}/examen/${examId}`);
    };

    return (
        <div className="bg-card p-6 rounded-2xl border border-border">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Exámenes</h2>
                <Button variant="outline" size="sm" onClick={handleAddExam}>
                    <Plus className="mr-2 h-4 w-4" /> Añadir Examen
                </Button>
            </div>
            <Droppable droppableId="exams" type="exams">
                {(provided) => (
                    <ul className="space-y-2" {...provided.droppableProps} ref={provided.innerRef}>
                        {course.content.exams.map((exam, index) => (
                            <Draggable key={exam.id} draggableId={exam.id} index={index}>
                                {(providedDrag) => (
                                    <li 
                                        ref={providedDrag.innerRef} 
                                        {...providedDrag.draggableProps} 
                                        {...providedDrag.dragHandleProps}
                                        className="flex items-center justify-between p-3 bg-background rounded-lg border"
                                    >
                                        <div className="flex items-center">
                                            <GripVertical className="h-5 w-5 mr-3 text-muted-foreground cursor-grab" />
                                            <FileQuestion className="h-5 w-5 mr-3 text-primary" />
                                            <span className="font-medium">{exam.title}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Button variant="ghost" size="sm" onClick={() => handleEditExamContent(exam.id)}>
                                                <Edit2 className="h-4 w-4 mr-2" /> Editar Preguntas
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => openEditModal(exam, 'exam')}>
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => openDeleteAlert(exam, 'exam')}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </div>
    );
};

export default ExamsManager;
