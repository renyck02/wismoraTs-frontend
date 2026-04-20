import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { coursesData as allCoursesData } from '@/data/coursesData.ts';
import { Save, Code, Database, Smartphone, Brain, Shield, Palette, Server, Wind, GitBranch, Trash2, Link2, Link2Off, GripVertical, MousePointer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import Xarrow, { Xwrapper, useXarrow } from 'react-xarrows';

const iconMap = {
    Code, Database, Smartphone, Brain, Shield, Palette, Server, Wind, GitBranch
};

const CourseNode = ({ course, onPositionChange, selected, onNodeClick, connecting, onConnectClick }) => {
    const Icon = iconMap[course.icon] || Code;
    const nodeRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const offset = useRef({ x: 0, y: 0 });
    const updateXarrow = useXarrow();

    const handleMouseDown = (e) => {
        if (connecting.isConnecting) return;
        setIsDragging(true);
        const node = nodeRef.current;
        const rect = node.getBoundingClientRect();
        const parentRect = node.parentElement.getBoundingClientRect();
        offset.current = {
            x: e.clientX - rect.left + parentRect.left,
            y: e.clientY - rect.top + parentRect.top,
        };
        e.preventDefault();
        e.stopPropagation();
    };

    const handleMouseMove = useCallback((e) => {
        if (!isDragging) return;
        const newX = e.clientX - offset.current.x;
        const newY = e.clientY - offset.current.y;
        onPositionChange(course.id, { x: newX, y: newY });
        updateXarrow();
    }, [isDragging, onPositionChange, course.id, updateXarrow]);

    const handleMouseUp = () => setIsDragging(false);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleMouseMove]);

    const isConnectable = connecting.isConnecting && connecting.from !== course.id;
    const isSourceNode = connecting.isConnecting && connecting.from === course.id;

    return (
        <div
            id={`course-node-${course.id}`}
            ref={nodeRef}
            className="absolute"
            style={{ left: course.position.x, top: course.position.y }}
            onMouseDown={handleMouseDown}
            onClick={(e) => {
                e.stopPropagation();
                onNodeClick(course);
            }}
        >
            <div
                className={`relative w-52 h-24 p-3 rounded-lg shadow-lg border-2 transition-all duration-200
                    ${isDragging ? 'cursor-grabbing shadow-2xl scale-105 z-10' : 'cursor-grab'}
                    ${selected === course.id ? 'border-primary shadow-primary/30' : 'border-border'}
                    ${isConnectable ? 'cursor-crosshair border-blue-500 hover:bg-blue-500/10' : ''}
                    ${isSourceNode ? 'border-green-500 bg-green-500/10' : ''}
                    bg-card`}
            >
                <div className="flex flex-col justify-between h-full">
                    <div className="flex items-start justify-between">
                        <h3 className="text-sm font-bold text-foreground leading-tight pr-2">{course.title}</h3>
                        <Icon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    </div>
                    <span className="text-xs text-muted-foreground">{course.level}</span>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onConnectClick(course.id);
                    }}
                    className="absolute -right-3 -top-3 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/80 transition-transform hover:scale-110"
                    title="Crear conexión"
                >
                    <Link2 className="w-3 h-3" />
                </button>
            </div>
        </div>
    );
};

const InspectorPanel = ({ course, courses, setCourses, setSelected }) => {
    if (!course) {
        return (
            <div className="p-4 text-center">
                <h3 className="font-semibold">Panel de Inspector</h3>
                <p className="text-sm text-muted-foreground">Selecciona un curso del lienzo para ver sus detalles y editar sus conexiones.</p>
            </div>
        );
    }

    const handleTitleChange = (e) => {
        setCourses(prev => prev.map(c => c.id === course.id ? { ...c, title: e.target.value } : c));
    };

    const removePrerequisite = (prereqId) => {
        setCourses(prev => prev.map(c =>
            c.id === course.id
                ? { ...c, prerequisites: c.prerequisites.filter(id => id !== prereqId) }
                : c
        ));
        toast.error(`Conexión eliminada.`);
    };
    
    const removeNode = () => {
        setCourses(prev => prev.filter(c => c.id !== course.id).map(c => ({
            ...c,
            prerequisites: c.prerequisites.filter(pId => pId !== course.id)
        })));
        setSelected(null);
        toast.success(`Curso "${course.title}" eliminado del lienzo.`);
    };

    const prerequisites = course.prerequisites.map(pId => courses.find(c => c.id === pId)).filter(Boolean);

    return (
        <div className="p-4 space-y-4">
            <h3 className="font-semibold border-b pb-2">Editando: {course.title}</h3>
            <div className="space-y-1">
                <label htmlFor="node-title" className="text-sm font-medium">Título del Curso</label>
                <Input id="node-title" value={course.title} onChange={handleTitleChange} />
            </div>
            <div className="space-y-2">
                <h4 className="text-sm font-medium">Prerrequisitos ({prerequisites.length})</h4>
                {prerequisites.length > 0 ? (
                    <ul className="space-y-2">
                        {prerequisites.map(prereq => (
                            <li key={prereq.id} className="flex items-center justify-between bg-secondary p-2 rounded-md">
                                <span className="text-sm">{prereq.title}</span>
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removePrerequisite(prereq.id)}>
                                    <Link2Off className="w-4 h-4 text-destructive" />
                                </Button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-muted-foreground">Este curso no tiene prerrequisitos.</p>
                )}
            </div>
            <Button variant="destructive" className="w-full" onClick={removeNode}>
                <Trash2 className="mr-2 h-4 w-4" /> Eliminar del Lienzo
            </Button>
        </div>
    );
};

const CoursesPanel = ({ onDragStart }) => {
    return (
        <div className="p-4">
            <h3 className="font-semibold border-b pb-2 mb-4">Cursos Disponibles</h3>
            <p className="text-sm text-muted-foreground mb-4">Arrastra un curso al lienzo para añadirlo a la ruta de aprendizaje.</p>
            <ul className="space-y-2">
                {allCoursesData.map(course => (
                    <li
                        key={course.id}
                        draggable
                        onDragStart={(e) => onDragStart(e, course)}
                        className="flex items-center p-2 rounded-md bg-secondary hover:bg-accent cursor-grab"
                    >
                        <GripVertical className="w-5 h-5 text-muted-foreground mr-2" />
                        <span className="text-sm font-medium">{course.title}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const ManageLearningPath = () => {
    const [coursesOnCanvas, setCoursesOnCanvas] = useState(
        JSON.parse(JSON.stringify(allCoursesData.filter(c => c.position.x !== 0 || c.position.y !== 0)))
    );
    const [selectedNodeId, setSelectedNodeId] = useState(null);
    const [connecting, setConnecting] = useState({ isConnecting: false, from: null });
    const [activeTab, setActiveTab] = useState('courses');
    const canvasRef = useRef(null);
    
    useEffect(() => {
        if(selectedNodeId) setActiveTab('inspector');
    }, [selectedNodeId]);

    const handlePositionChange = (courseId, newPosition) => {
        setCoursesOnCanvas(prev =>
            prev.map(c => (c.id === courseId ? { ...c, position: newPosition } : c))
        );
    };

    const handleSave = () => {
        toast.success("¡Ruta de aprendizaje guardada con éxito! (simulación)");
    };

    const handleDragStart = (e, course) => {
        e.dataTransfer.setData('course', JSON.stringify(course));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const courseData = JSON.parse(e.dataTransfer.getData('course'));
        if (coursesOnCanvas.find(c => c.id === courseData.id)) {
            toast.error("Este curso ya está en el lienzo.");
            return;
        }
        
        const canvasBounds = canvasRef.current.getBoundingClientRect();
        const position = {
            x: e.clientX - canvasBounds.left - 100,
            y: e.clientY - canvasBounds.top - 50,
        };

        const newCourseNode = { ...courseData, id: courseData.id, position, prerequisites: [] };
        setCoursesOnCanvas(prev => [...prev, newCourseNode]);
        toast.success(`"${courseData.title}" añadido al lienzo.`);
    };

    const handleDragOver = (e) => e.preventDefault();
    
    const handleNodeClick = (course) => {
        if (connecting.isConnecting && connecting.from !== course.id) {
            setCoursesOnCanvas(prev =>
                prev.map(c => {
                    if (c.id === course.id) {
                        const newPrerequisites = [...c.prerequisites, connecting.from];
                        return { ...c, prerequisites: [...new Set(newPrerequisites)] };
                    }
                    return c;
                })
            );
            const fromNode = coursesOnCanvas.find(c => c.id === connecting.from);
            toast.success(`Conexión creada: ${fromNode.title} -> ${course.title}`);
            setConnecting({ isConnecting: false, from: null });
        } else {
            setSelectedNodeId(course.id);
        }
    };

    const handleConnectClick = (fromId) => {
        setConnecting({ isConnecting: true, from: fromId });
        setSelectedNodeId(null);
    };

    const handleCanvasClick = () => {
        setSelectedNodeId(null);
        if (connecting.isConnecting) {
            setConnecting({ isConnecting: false, from: null });
            toast.error("Creación de conexión cancelada.");
        }
    };

    const selectedCourse = coursesOnCanvas.find(c => c.id === selectedNodeId);

    return (
        <>
            <Helmet><title>Editar Ruta de Aprendizaje - Admin</title></Helmet>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Editor de Ruta de Aprendizaje</h1>
                        <p className="text-muted-foreground mt-1">Arrastra, conecta y edita los cursos visualmente.</p>
                    </div>
                    <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Guardar Cambios</Button>
                </div>

                <div className="flex-grow flex border border-border rounded-lg bg-card overflow-hidden">
                    <aside className="w-80 border-r border-border flex flex-col">
                        <div className="flex border-b">
                            <button onClick={() => setActiveTab('courses')} className={`flex-1 p-3 text-sm font-semibold ${activeTab === 'courses' ? 'bg-accent' : 'hover:bg-accent/50'}`}>Cursos</button>
                            <button onClick={() => setActiveTab('inspector')} className={`flex-1 p-3 text-sm font-semibold ${activeTab === 'inspector' ? 'bg-accent' : 'hover:bg-accent/50'}`}>Inspector</button>
                        </div>
                        <div className="flex-grow overflow-y-auto">
                            {activeTab === 'courses' ? <CoursesPanel onDragStart={handleDragStart} /> : <InspectorPanel course={selectedCourse} courses={coursesOnCanvas} setCourses={setCoursesOnCanvas} setSelected={setSelectedNodeId} />}
                        </div>
                    </aside>

                    <main className="flex-1 relative" ref={canvasRef} onDrop={handleDrop} onDragOver={handleDragOver} onClick={handleCanvasClick}>
                        <Xwrapper>
                            {coursesOnCanvas.map(course => (
                                <CourseNode
                                    key={course.id}
                                    course={course}
                                    onPositionChange={handlePositionChange}
                                    selected={selectedNodeId}
                                    onNodeClick={handleNodeClick}
                                    connecting={connecting}
                                    onConnectClick={handleConnectClick}
                                />
                            ))}
                            {coursesOnCanvas.map(course =>
                                course.prerequisites.map(prereqId => (
                                    <Xarrow
                                        key={`${prereqId}-${course.id}`}
                                        start={`course-node-${prereqId}`}
                                        end={`course-node-${course.id}`}
                                        strokeWidth={2}
                                        color="hsl(var(--primary))"
                                        path="grid"
                                        headSize={5}
                                        startAnchor="right"
                                        endAnchor="left"
                                        showHead={true}
                                        curveness={0.8}
                                    />
                                ))
                            )}
                        </Xwrapper>
                        <AnimatePresence>
                        {connecting.isConnecting && (
                            <motion.div 
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-20 pointer-events-none"
                            >
                                <div className="bg-background p-4 rounded-lg shadow-xl text-center">
                                    <div className="flex items-center justify-center">
                                        <MousePointer className="w-5 h-5 mr-2 animate-pulse text-primary"/>
                                        <div>
                                            <h3 className="font-bold">Modo Conexión</h3>
                                            <p className="text-sm text-muted-foreground">Haz clic en un curso para crear el prerrequisito.</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">(Haz clic en el fondo para cancelar)</p>
                                </div>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </main>
                </div>
            </motion.div>
        </>
    );
};

export default ManageLearningPath;