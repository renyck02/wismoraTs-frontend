
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { coursesData } from '@/data/coursesData';
import { CheckCircle, Lock, Plus, Minus, RefreshCw, X, Code, Database, Smartphone, Brain, Shield, Palette, Server, Wind, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const iconMap = {
    Code, Database, Smartphone, Brain, Shield, Palette, Server, Wind, GitBranch
};

const CourseNode = ({ course, isCompleted, isUnlocked, onSelect }) => {
  const IconComponent = iconMap[course.icon] || Code;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      onClick={() => isUnlocked && onSelect(course)}
      className={cn(
        'relative w-48 h-28 p-3 rounded-lg shadow-lg transition-all duration-300 flex flex-col justify-between',
        isCompleted
          ? 'bg-green-500/10 border-2 border-green-500'
          : !isUnlocked
          ? 'bg-secondary/50 border border-border cursor-not-allowed'
          : 'bg-card border border-border cursor-pointer',
        isUnlocked ? 'hover:scale-105 hover:shadow-xl hover:border-primary' : ''
      )}
    >
      <div className="flex items-start justify-between">
        <h3 className="text-sm font-bold text-foreground leading-tight pr-1">{course.title}</h3>
        {IconComponent && <IconComponent className={cn('w-5 h-5 flex-shrink-0', isCompleted ? 'text-green-500' : 'text-muted-foreground')} />}
      </div>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-xs text-muted-foreground">{course.level}</span>
        {isCompleted ? (
          <CheckCircle className="w-5 h-5 text-green-500" />
        ) : !isUnlocked && (
          <Lock className="w-5 h-5 text-muted-foreground" />
        )}
      </div>
    </motion.div>
  );
};

const LearningPath = () => {
  const [completedCourses, setCompletedCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    // Simulating fetching user's completed courses
    const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    setCompletedCourses(enrolled.map(c => c.id));
  }, []);
  
  const courseMap = useMemo(() => new Map(coursesData.map(c => [c.id, c])), []);
  
  const positionedCourses = useMemo(() => coursesData.filter(c => c.position && c.position.x !== undefined && c.position.y !== undefined), []);

  const lines = useMemo(() => {
    const linesArr = [];
    positionedCourses.forEach(course => {
      if (course.prerequisites) {
        course.prerequisites.forEach(prereqId => {
          const prereqCourse = courseMap.get(prereqId);
          if (prereqCourse && prereqCourse.position) {
            linesArr.push({
              from: prereqCourse,
              to: course,
              id: `${prereqId}-${course.id}`
            });
          }
        });
      }
    });
    return linesArr;
  }, [positionedCourses, courseMap]);

  const isCourseUnlocked = (course) => {
    if (!course.prerequisites || course.prerequisites.length === 0) {
      return true;
    }
    return course.prerequisites.every(prereqId => completedCourses.includes(prereqId));
  };
  
  const NODE_WIDTH = 192; // w-48
  const NODE_HEIGHT = 112; // h-28
  const HORIZONTAL_SPACING = 150;
  const VERTICAL_SPACING = 100;

  const gridWidth = positionedCourses.length > 0 ? Math.max(...positionedCourses.map(c => c.position.x)) + NODE_WIDTH + HORIZONTAL_SPACING : 1000;
  const gridHeight = positionedCourses.length > 0 ? Math.max(...positionedCourses.map(c => c.position.y)) + NODE_HEIGHT + VERTICAL_SPACING : 800;
  
  return (
    <>
      <Helmet>
        <title>Ruta de Aprendizaje - Wismora</title>
        <meta name="description" content="Visualiza tu ruta de aprendizaje en Wismora. Sigue la secuencia de cursos para convertirte en un experto en tecnología." />
      </Helmet>
      <div className="pt-24 pb-12 h-[calc(100vh-80px)] md:h-screen flex flex-col bg-grid-pattern">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 px-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Tu <span className="gradient-text">Ruta de Aprendizaje</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explora nuestro currículo, completa cursos y desbloquea nuevas habilidades.
          </p>
        </motion.div>

        <div className="flex-grow flex relative overflow-hidden bg-background/80 backdrop-blur-sm border-t">
          <div className="w-full h-full">
            <TransformWrapper
              initialScale={0.8}
              minScale={0.2}
              maxScale={2}
              centerOnInit
              limitToBounds={false}
              wheel={{ step: 0.1 }}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  <div className="absolute top-4 right-4 z-10 flex space-x-2">
                    <Button size="icon" variant="outline" onClick={() => zoomIn(0.2)}><Plus className="w-4 h-4" /></Button>
                    <Button size="icon" variant="outline" onClick={() => zoomOut(0.2)}><Minus className="w-4 h-4" /></Button>
                    <Button size="icon" variant="outline" onClick={() => resetTransform()}><RefreshCw className="w-4 h-4" /></Button>
                  </div>
                  <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
                    <div
                      className="relative"
                      style={{
                        width: gridWidth,
                        height: gridHeight,
                      }}
                    >
                      <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 0 }}>
                        <defs>
                          <marker
                            id="arrowhead"
                            markerWidth="10"
                            markerHeight="7"
                            refX="0"
                            refY="3.5"
                            orient="auto"
                          >
                            <polygon points="0 0, 10 3.5, 0 7" className="fill-current text-border" />
                          </marker>
                           <marker
                            id="arrowhead-unlocked"
                            markerWidth="10"
                            markerHeight="7"
                            refX="0"
                            refY="3.5"
                            orient="auto"
                          >
                            <polygon points="0 0, 10 3.5, 0 7" className="fill-current text-primary" />
                          </marker>
                        </defs>
                        {lines.map(line => {
                          const fromX = line.from.position.x + NODE_WIDTH;
                          const fromY = line.from.position.y + NODE_HEIGHT / 2;
                          const toX = line.to.position.x;
                          const toY = line.to.position.y + NODE_HEIGHT / 2;
                          const unlocked = isCourseUnlocked(line.to);
                          return (
                            <path
                              key={line.id}
                              d={`M ${fromX} ${fromY} C ${fromX + HORIZONTAL_SPACING / 2} ${fromY}, ${toX - HORIZONTAL_SPACING / 2} ${toY}, ${toX} ${toY}`}
                              strokeWidth="2"
                              className={`transition-all duration-500 ${unlocked ? 'stroke-primary' : 'stroke-border'}`}
                              fill="none"
                              markerEnd={unlocked ? "url(#arrowhead-unlocked)" : "url(#arrowhead)"}
                            />
                          );
                        })}
                      </svg>
                      {positionedCourses.map(course => (
                        <div
                          key={course.id}
                          className="absolute"
                          style={{
                            left: `${course.position.x}px`,
                            top: `${course.position.y}px`,
                            zIndex: 1,
                          }}
                        >
                          <CourseNode
                            course={course}
                            isCompleted={completedCourses.includes(course.id)}
                            isUnlocked={isCourseUnlocked(course)}
                            onSelect={setSelectedCourse}
                          />
                        </div>
                      ))}
                    </div>
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
          </div>
          
          <AnimatePresence>
          {selectedCourse && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute top-0 right-0 h-full w-96 bg-card border-l border-border shadow-2xl z-20 p-6 flex flex-col"
            >
                <>
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-foreground pr-4">{selectedCourse.title}</h2>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedCourse(null)} className="flex-shrink-0">
                      <X className="w-5 h-5"/>
                    </Button>
                  </div>
                  <p className="text-muted-foreground mb-4 flex-grow-0">{selectedCourse.description}</p>
                  <div className="text-sm text-muted-foreground mb-4 space-y-1">
                    <p><strong>Instructor:</strong> {selectedCourse.instructor}</p>
                    <p><strong>Duración:</strong> {selectedCourse.duration}</p>
                  </div>
                  <div className="mb-4 flex-grow overflow-y-auto">
                    <h4 className="font-semibold text-foreground mb-2">Requisitos:</h4>
                    {selectedCourse.prerequisites && selectedCourse.prerequisites.length > 0 ? (
                      <ul className="space-y-2">
                        {selectedCourse.prerequisites.map(id => {
                          const prereq = courseMap.get(id);
                          const isMet = completedCourses.includes(id);
                          return prereq ? (
                            <li key={id} className="flex items-center text-sm">
                              {isMet ? <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> : <Lock className="w-4 h-4 mr-2 text-muted-foreground" />}
                              <span className={cn(isMet ? 'text-foreground' : 'text-muted-foreground')}>{prereq.title}</span>
                            </li>
                          ) : null;
                        })}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">Ninguno</p>
                    )}
                  </div>
                  <div className="mt-auto pt-4 border-t">
                    <Link to={`/curso/${selectedCourse.id}`}>
                      <Button className="w-full" disabled={!isCourseUnlocked(selectedCourse)}>
                        {isCourseUnlocked(selectedCourse) ? "Ir al Curso" : "Curso Bloqueado"}
                      </Button>
                    </Link>
                  </div>
                </>
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default LearningPath;
