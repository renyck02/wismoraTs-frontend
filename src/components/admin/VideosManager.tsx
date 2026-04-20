
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, Trash2, Edit2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from '@/components/ui/use-toast';

const VideosManager = ({ course, setCourse, setModalState }) => {
    const { toast } = useToast();
    
    const handleAddModule = () => {
        setModalState(prev => ({
            ...prev,
            isAddAlertOpen: true,
            addAlertConfig: {
                title: "Añadir Nuevo Módulo",
                description: "Introduce el nombre para el nuevo módulo de videos.",
                onConfirm: (inputValue) => {
                    if (!inputValue) return;
                    const newModule = { id: `module-${Date.now()}`, module: inputValue, lessons: [] };
                    setCourse(prev => ({ ...prev, content: { ...prev.content, videos: [...prev.content.videos, newModule] } }));
                    toast({ title: "Módulo añadido", description: `Se ha añadido "${inputValue}".` });
                }
            }
        }));
    };

    const handleAddLesson = (moduleId) => {
        const module = course.content.videos.find(m => m.id === moduleId);
        setModalState(prev => ({
            ...prev,
            isAddAlertOpen: true,
            addAlertConfig: {
                title: `Añadir Lección a "${module.module}"`,
                description: "Introduce el título para la nueva lección.",
                onConfirm: (inputValue) => {
                    if (!inputValue) return;
                    const newLesson = { id: `lesson-${Date.now()}`, title: inputValue, duration: "00:00", videoUrl: "" };
                    setCourse(prevCourse => {
                        const updatedVideos = prevCourse.content.videos.map(m => m.id === moduleId ? { ...m, lessons: [...m.lessons, newLesson] } : m);
                        return { ...prevCourse, content: { ...prevCourse.content, videos: updatedVideos }};
                    });
                    toast({ title: "Lección añadida", description: `Se ha añadido "${inputValue}".` });
                }
            }
        }));
    };

    const openEditModal = (item, type) => {
        setModalState(prev => ({ ...prev, isEditModalOpen: true, editingItem: { ...item }, editingType: type }));
    };

    const openDeleteAlert = (item, type) => {
        setModalState(prev => ({ ...prev, isDeleteAlertOpen: true, itemToDelete: item, deleteType: type }));
    };
    
    return (
        <div className="bg-card p-6 rounded-2xl border border-border">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Videos</h2>
                <Button variant="outline" size="sm" onClick={handleAddModule}><Plus className="mr-2 h-4 w-4" /> Añadir Módulo</Button>
            </div>
            <Droppable droppableId="all-modules" direction="vertical" type="modules">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        <Accordion type="multiple" className="w-full">
                            {course.content.videos.map((module, index) => (
                                <Draggable key={module.id} draggableId={module.id} index={index}>
                                    {(providedDrag) => (
                                        <div ref={providedDrag.innerRef} {...providedDrag.draggableProps}>
                                            <AccordionItem value={module.id} className="bg-background rounded-lg mb-2 border">
                                                <AccordionTrigger className="text-lg font-semibold hover:no-underline px-4">
                                                    <div className="flex items-center justify-between w-full">
                                                        <div className="flex items-center" {...providedDrag.dragHandleProps}>
                                                            <GripVertical className="h-5 w-5 mr-3 text-muted-foreground" />
                                                            {module.module}
                                                        </div>
                                                        <div className="flex items-center space-x-1 mr-2" onClick={e => e.stopPropagation()}>
                                                            <Button variant="ghost" size="icon" onClick={() => openEditModal(module, 'module')}><Edit2 className="h-4 w-4" /></Button>
                                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => openDeleteAlert(module, 'module')}><Trash2 className="h-4 w-4" /></Button>
                                                        </div>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="px-4 pb-4">
                                                    <Droppable droppableId={module.id} type="lessons">
                                                        {(providedDrop) => (
                                                            <ul className="space-y-2" ref={providedDrop.innerRef} {...providedDrop.droppableProps}>
                                                                {module.lessons.map((lesson, lessonIndex) => (
                                                                    <Draggable key={lesson.id} draggableId={lesson.id} index={lessonIndex}>
                                                                        {(providedLessonDrag) => (
                                                                            <li ref={providedLessonDrag.innerRef} {...providedLessonDrag.draggableProps} {...providedLessonDrag.dragHandleProps} className="flex items-center justify-between p-2 bg-secondary/30 rounded-md">
                                                                                <div className="flex items-center">
                                                                                    <GripVertical className="h-5 w-5 mr-2 text-muted-foreground cursor-grab" />
                                                                                    <span>{lesson.title} - ({lesson.duration})</span>
                                                                                </div>
                                                                                <div className="flex items-center space-x-1">
                                                                                    <Button variant="ghost" size="icon" onClick={() => openEditModal(lesson, 'lesson')}><Edit2 className="h-4 w-4" /></Button>
                                                                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => openDeleteAlert(lesson, 'lesson')}><Trash2 className="h-4 w-4" /></Button>
                                                                                </div>
                                                                            </li>
                                                                        )}
                                                                    </Draggable>
                                                                ))}
                                                                {providedDrop.placeholder}
                                                            </ul>
                                                        )}
                                                    </Droppable>
                                                    <Button variant="link" size="sm" className="mt-2" onClick={() => handleAddLesson(module.id)}><Plus className="mr-1 h-3 w-3" /> Añadir Lección</Button>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </Accordion>
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default VideosManager;
