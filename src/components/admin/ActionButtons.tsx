
import React from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ActionButtons = ({ onCancel, onSave }) => (
    <div className="mt-8 flex justify-end space-x-4">
        <Button variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button onClick={onSave}><Save className="mr-2 h-4 w-4" /> Guardar Cambios</Button>
    </div>
);

export default ActionButtons;
