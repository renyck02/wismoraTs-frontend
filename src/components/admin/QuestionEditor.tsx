
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GripVertical, Plus, Trash2, CheckCircle } from 'lucide-react';

const QuestionEditor = ({ question, index, updateQuestion, removeQuestion, addOption, updateOption, removeOption, setCorrectAnswer }) => {
    return (
        <Draggable draggableId={question.id.toString()} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`p-6 rounded-2xl border bg-card mb-6 transition-shadow ${snapshot.isDragging ? 'shadow-2xl' : 'shadow-md'}`}
                >
                    <div className="flex items-start mb-4">
                        <div {...provided.dragHandleProps} className="p-2 cursor-grab">
                            <GripVertical className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex-grow ml-2">
                            <label className="text-sm font-medium text-muted-foreground">Pregunta {index + 1}</label>
                            <Input
                                value={question.question}
                                onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                                placeholder="Escribe tu pregunta aquí..."
                                className="text-lg font-semibold !mt-1"
                            />
                        </div>
                        <Button variant="ghost" size="icon" className="ml-4 text-destructive hover:text-destructive" onClick={() => removeQuestion(question.id)}>
                            <Trash2 className="h-5 w-5" />
                        </Button>
                    </div>

                    <div className="space-y-3 pl-12">
                        <label className="text-sm font-medium text-muted-foreground">Opciones de respuesta</label>
                        {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center space-x-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setCorrectAnswer(question.id, optionIndex)}
                                    className={`rounded-full ${question.correctAnswer === optionIndex ? 'text-green-500' : 'text-muted-foreground'}`}
                                >
                                    <CheckCircle className={`h-6 w-6 ${question.correctAnswer === optionIndex ? 'fill-current' : ''}`} />
                                </Button>
                                <Input
                                    value={option}
                                    onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                                    placeholder={`Opción ${optionIndex + 1}`}
                                />
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => removeOption(question.id, optionIndex)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                         <Button variant="outline" size="sm" onClick={() => addOption(question.id)}>
                            <Plus className="mr-2 h-4 w-4" /> Añadir Opción
                        </Button>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default QuestionEditor;
