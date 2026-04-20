
import React from 'react';
import { useToast } from '@/components/ui/use-toast';
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';

const EditModals = ({ course, setCourse, modalState, setModalState }) => {
    const { toast } = useToast();
    const {
        isAddAlertOpen, addAlertConfig, addInputValue,
        isEditModalOpen, editingItem, editingType,
        isDeleteAlertOpen, itemToDelete, deleteType
    } = modalState;

    const handleUpdateItem = () => {
        const { isNew, ...itemData } = editingItem;
        if (isNew) {
            if (editingType === 'document') {
                setCourse(prev => ({ ...prev, content: { ...prev.content, documents: [...prev.content.documents, itemData] }}));
                toast({ title: "Documento añadido", description: `Se ha añadido "${itemData.title}".` });
            } else if (editingType === 'exam') {
                setCourse(prev => ({ ...prev, content: { ...prev.content, exams: [...prev.content.exams, itemData] }}));
                toast({ title: "Examen añadido", description: `Se ha añadido "${itemData.title}".` });
            }
        } else {
            setCourse(prev => {
                let updatedContent = { ...prev.content };
                if (editingType === 'module') {
                    updatedContent.videos = prev.content.videos.map(module => module.id === itemData.id ? { ...module, module: itemData.module } : module);
                } else if (editingType === 'lesson') {
                    updatedContent.videos = prev.content.videos.map(module => ({
                        ...module, lessons: module.lessons.map(lesson => lesson.id === itemData.id ? itemData : lesson)
                    }));
                } else if (editingType === 'document') {
                    updatedContent.documents = prev.content.documents.map(doc => doc.id === itemData.id ? itemData : doc);
                } else if (editingType === 'exam') {
                    updatedContent.exams = prev.content.exams.map(exam => exam.id === itemData.id ? itemData : exam);
                }
                return { ...prev, content: updatedContent };
            });
            toast({ title: "Elemento actualizado", description: "Los cambios han sido guardados." });
        }
        setModalState(prev => ({ ...prev, isEditModalOpen: false, editingItem: null }));
    };

    const handleDeleteItem = () => {
        setCourse(prev => {
            let updatedContent = { ...prev.content };
            let itemName = itemToDelete.module || itemToDelete.title;

            if (deleteType === 'module') {
                updatedContent.videos = prev.content.videos.filter(module => module.id !== itemToDelete.id);
            } else if (deleteType === 'lesson') {
                updatedContent.videos = prev.content.videos.map(module => ({
                    ...module, lessons: module.lessons.filter(lesson => lesson.id !== itemToDelete.id)
                }));
            } else if (deleteType === 'document') {
                updatedContent.documents = prev.content.documents.filter(doc => doc.id !== itemToDelete.id);
            } else if (deleteType === 'exam') {
                updatedContent.exams = prev.content.exams.filter(exam => exam.id !== itemToDelete.id);
            }
            toast({ title: "Elemento eliminado", description: `Se ha eliminado "${itemName}".`, variant: "destructive" });
            return { ...prev, content: updatedContent };
        });
        setModalState(prev => ({ ...prev, isDeleteAlertOpen: false, itemToDelete: null }));
    };

    const renderEditModalContent = () => {
        if (!editingItem) return null;
        if (editingType === 'module' || editingType === 'lesson') {
            return (
                <div className="space-y-4 py-4">
                    <div className="space-y-1"><label htmlFor="edit-title">Título</label><Input id="edit-title" value={editingType === 'module' ? editingItem.module : editingItem.title} onChange={(e) => setModalState(prev => ({...prev, editingItem: {...prev.editingItem, [editingType === 'module' ? 'module' : 'title']: e.target.value}}))}/></div>
                    {editingType === 'lesson' && (<>
                        <div className="space-y-1"><label htmlFor="edit-duration">Duración</label><Input id="edit-duration" value={editingItem.duration} onChange={(e) => setModalState(prev => ({...prev, editingItem: {...prev.editingItem, duration: e.target.value}}))}/></div>
                        <div className="space-y-1"><label htmlFor="edit-url">URL del Video</label><Input id="edit-url" value={editingItem.videoUrl} onChange={(e) => setModalState(prev => ({...prev, editingItem: {...prev.editingItem, videoUrl: e.target.value}}))}/></div>
                    </>)}
                </div>
            )
        }
        if (editingType === 'document') {
            return (
                <div className="space-y-4 py-4">
                     <div className="space-y-1"><label htmlFor="edit-doc-title">Título del Documento</label><Input id="edit-doc-title" value={editingItem.title} onChange={(e) => setModalState(prev => ({...prev, editingItem: {...prev.editingItem, title: e.target.value}}))}/></div>
                     <div className="space-y-1"><label htmlFor="edit-doc-type">Tipo de Archivo</label><Input id="edit-doc-type" value={editingItem.type} onChange={(e) => setModalState(prev => ({...prev, editingItem: {...prev.editingItem, type: e.target.value}}))}/></div>
                </div>
            )
        }
        if (editingType === 'exam') {
            return (
                <div className="space-y-4 py-4">
                     <div className="space-y-1"><label htmlFor="edit-exam-title">Título del Examen</label><Input id="edit-exam-title" value={editingItem.title} onChange={(e) => setModalState(prev => ({...prev, editingItem: {...prev.editingItem, title: e.target.value}}))}/></div>
                </div>
            )
        }
        return null;
    }

    const getEditModalTitle = () => {
        if (!editingType) return "";
        let noun;
        switch(editingType) {
            case 'module': noun = 'Módulo'; break;
            case 'lesson': noun = 'Lección'; break;
            case 'document': noun = 'Documento'; break;
            case 'exam': noun = 'Examen'; break;
            default: noun = 'Elemento';
        }
        return (editingItem?.isNew ? 'Añadir Nuevo' : 'Editar') + ` ${noun}`;
    }
    
    const closeAddAlert = () => setModalState(prev => ({ ...prev, isAddAlertOpen: false, addInputValue: ''}));
    const confirmAdd = () => {
        addAlertConfig.onConfirm(addInputValue);
        closeAddAlert();
    };

    return (
        <>
            <AlertDialog open={isAddAlertOpen} onOpenChange={(isOpen) => !isOpen && closeAddAlert()}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{addAlertConfig.title}</AlertDialogTitle>
                        <AlertDialogDescription>{addAlertConfig.description}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <Input value={addInputValue} onChange={(e) => setModalState(prev => ({...prev, addInputValue: e.target.value}))} placeholder="Escribe aquí..." onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); confirmAdd(); }}}/>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={closeAddAlert}>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmAdd}>Añadir</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            
            <Dialog open={isEditModalOpen} onOpenChange={(isOpen) => !isOpen && setModalState(prev => ({...prev, isEditModalOpen: false}))}>
                <DialogContent>
                    <DialogHeader><DialogTitle>{getEditModalTitle()}</DialogTitle></DialogHeader>
                    {renderEditModalContent()}
                    <DialogFooter>
                        <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
                        <Button onClick={handleUpdateItem}>Guardar Cambios</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            
            <AlertDialog open={isDeleteAlertOpen} onOpenChange={(isOpen) => !isOpen && setModalState(prev => ({...prev, isDeleteAlertOpen: false}))}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>Esta acción no se puede deshacer. Esto eliminará permanentemente "{itemToDelete?.module || itemToDelete?.title}".</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={handleDeleteItem}>Eliminar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default EditModals;
