
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ArrowLeft, Plus, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { coursesData } from '@/data/coursesData';
import QuestionEditor from '@/components/admin/QuestionEditor';

const EditExam = () => {
    const { courseId, examId } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [exam, setExam] = useState(null);
    const [courseTitle, setCourseTitle] = useState('');

    useEffect(() => {
        const course = coursesData.find(c => c.id.toString() === courseId);
        if (course) {
            setCourseTitle(course.title);
            const currentExam = course.content.exams.find(e => e.id.toString() === examId);
            if (currentExam) {
                setExam(JSON.parse(JSON.stringify(currentExam)));
            } else {
                toast({ title: "Error", description: "Examen no encontrado.", variant: "destructive" });
                navigate(`/admin/cursos/editar/${courseId}`);
            }
        } else {
            toast({ title: "Error", description: "Curso no encontrado.", variant: "destructive" });
            navigate('/admin/cursos');
        }
    }, [courseId, examId, navigate, toast]);

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(exam.questions);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setExam(prev => ({ ...prev, questions: items }));
    };

    const updateQuestion = (id, field, value) => {
        setExam(prev => ({
            ...prev,
            questions: prev.questions.map(q => q.id === id ? { ...q, [field]: value } : q)
        }));
    };

    const addQuestion = () => {
        const newQuestion = {
            id: `q-${Date.now()}`,
            question: '',
            options: ['', ''],
            correctAnswer: 0
        };
        setExam(prev => ({ ...prev, questions: [...prev.questions, newQuestion] }));
    };

    const removeQuestion = (id) => {
        setExam(prev => ({ ...prev, questions: prev.questions.filter(q => q.id !== id) }));
    };

    const addOption = (questionId) => {
        setExam(prev => ({
            ...prev,
            questions: prev.questions.map(q => 
                q.id === questionId ? { ...q, options: [...q.options, ''] } : q
            )
        }));
    };

    const updateOption = (questionId, optionIndex, value) => {
        setExam(prev => ({
            ...prev,
            questions: prev.questions.map(q => 
                q.id === questionId 
                ? { ...q, options: q.options.map((opt, i) => i === optionIndex ? value : opt) } 
                : q
            )
        }));
    };
    
    const removeOption = (questionId, optionIndex) => {
        setExam(prev => ({
            ...prev,
            questions: prev.questions.map(q =>
                q.id === questionId
                ? { ...q, options: q.options.filter((_, i) => i !== optionIndex) }
                : q
            )
        }));
    };
    
    const setCorrectAnswer = (questionId, optionIndex) => {
        setExam(prev => ({
            ...prev,
            questions: prev.questions.map(q =>
                q.id === questionId ? { ...q, correctAnswer: optionIndex } : q
            )
        }));
    };

    const handleSave = () => {
        toast({
            title: "¡Examen guardado!",
            description: `Los cambios en "${exam.title}" han sido guardados (simulación).`
        });
        navigate(`/admin/cursos/editar/${courseId}`);
    };

    if (!exam) {
        return <div className="flex justify-center items-center h-screen">Cargando editor de examen...</div>;
    }

    return (
        <>
            <Helmet>
                <title>Editar Examen: {exam.title} - Admin</title>
            </Helmet>
            <div className="mb-8">
                <Button variant="ghost" onClick={() => navigate(`/admin/cursos/editar/${courseId}`)} className="mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Volver a {courseTitle}
                </Button>
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold text-foreground">{exam.title}</h1>
                        <p className="text-muted-foreground mt-1">Edita las preguntas y respuestas de tu examen.</p>
                    </div>
                     <Button onClick={addQuestion}>
                        <Plus className="mr-2 h-4 w-4" /> Añadir Pregunta
                    </Button>
                </div>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="questions">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {exam.questions.length > 0 ? (
                                exam.questions.map((question, index) => (
                                    <QuestionEditor
                                        key={question.id}
                                        question={question}
                                        index={index}
                                        updateQuestion={updateQuestion}
                                        removeQuestion={removeQuestion}
                                        addOption={addOption}
                                        updateOption={updateOption}
                                        removeOption={removeOption}
                                        setCorrectAnswer={setCorrectAnswer}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-16 px-6 bg-card rounded-2xl border border-dashed">
                                    <h3 className="text-xl font-semibold">Este examen aún no tiene preguntas</h3>
                                    <p className="text-muted-foreground mt-2 mb-4">¡Añade la primera pregunta para empezar a construir tu examen!</p>
                                    <Button onClick={addQuestion}>
                                        <Plus className="mr-2 h-4 w-4" /> Añadir Pregunta
                                    </Button>
                                </div>
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            
            {exam.questions.length > 0 && (
                 <div className="mt-8 flex justify-end space-x-4">
                    <Button variant="outline" onClick={() => navigate(`/admin/cursos/editar/${courseId}`)}>Cancelar</Button>
                    <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Guardar Cambios</Button>
                </div>
            )}
        </>
    );
};

export default EditExam;
