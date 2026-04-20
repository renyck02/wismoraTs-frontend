
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, Trash2, Edit2, GripVertical, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DocumentsManager = ({ course, setModalState }) => {

    const handleAddDocument = () => {
        const newDocument = { id: `doc-${Date.now()}`, title: "Nuevo Documento", type: "PDF" };
        openEditModal(newDocument, 'document', true);
    };
    
    const openEditModal = (item, type, isNew = false) => {
        setModalState(prev => ({ ...prev, isEditModalOpen: true, editingItem: { ...item, isNew }, editingType: type }));
    };

    const openDeleteAlert = (item, type) => {
        setModalState(prev => ({ ...prev, isDeleteAlertOpen: true, itemToDelete: item, deleteType: type }));
    };

    return (
        <div className="bg-card p-6 rounded-2xl border border-border">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Documentos</h2>
                <Button variant="outline" size="sm" onClick={handleAddDocument}>
                    <Plus className="mr-2 h-4 w-4" /> Añadir Documento
                </Button>
            </div>
            <Droppable droppableId="documents" type="documents">
                {(provided) => (
                    <ul className="space-y-2" {...provided.droppableProps} ref={provided.innerRef}>
                        {course.content.documents.map((doc, index) => (
                            <Draggable key={doc.id} draggableId={doc.id} index={index}>
                                {(providedDrag) => (
                                    <li 
                                        ref={providedDrag.innerRef} 
                                        {...providedDrag.draggableProps} 
                                        {...providedDrag.dragHandleProps}
                                        className="flex items-center justify-between p-3 bg-background rounded-lg border"
                                    >
                                        <div className="flex items-center">
                                            <GripVertical className="h-5 w-5 mr-3 text-muted-foreground cursor-grab" />
                                            <FileText className="h-5 w-5 mr-3 text-primary" />
                                            <span className="font-medium">{doc.title}</span>
                                            <span className="text-sm text-muted-foreground ml-2">({doc.type})</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Button variant="ghost" size="icon" onClick={() => openEditModal(doc, 'document')}>
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => openDeleteAlert(doc, 'document')}>
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

export default DocumentsManager;
