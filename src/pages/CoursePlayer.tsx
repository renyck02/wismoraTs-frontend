import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player/lazy';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { coursesData } from '@/data/coursesData';

const CoursePlayer = () => {
  const { id, lessonId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);

  useEffect(() => {
    const foundCourse = coursesData.find(c => c.id === parseInt(id));
    if (foundCourse) {
      setCourse(foundCourse);
      let foundLesson = null;
      for (const module of foundCourse.content.videos) {
        foundLesson = module.lessons.find(l => l.id === lessonId);
        if (foundLesson) break;
      }
      if (foundLesson) {
        setCurrentLesson(foundLesson);
      } else {
        navigate(`/curso/${id}`);
      }
    } else {
      navigate('/cursos');
    }
  }, [id, lessonId, navigate]);

  if (!course || !currentLesson) {
    return <div className="h-screen w-full flex items-center justify-center bg-background">Cargando...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{`Viendo: ${currentLesson.title} - ${course.title}`}</title>
        <meta name="description" content={`Clase en video del curso ${course.title}: ${currentLesson.title}`} />
      </Helmet>

      <div className="flex h-screen bg-background text-foreground">
        <main className="flex-1 flex flex-col h-screen">
          <header className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center">
              <Link to={`/curso/${id}`}>
                <Button variant="ghost" size="icon"><ArrowLeft /></Button>
              </Link>
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Curso: {course.title}</p>
                <h1 className="text-lg font-bold text-foreground">{currentLesson.title}</h1>
              </div>
            </div>
            <Button>Marcar como completada <CheckCircle className="w-4 h-4 ml-2" /></Button>
          </header>
          
          <div className="flex-1 bg-black flex items-center justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="w-full h-full">
              <ReactPlayer
                url={currentLesson.videoUrl}
                width="100%"
                height="100%"
                controls
                playing
                config={{
                  file: {
                    attributes: {
                      controlsList: 'nodownload'
                    }
                  }
                }}
              />
            </motion.div>
          </div>
        </main>
        
        <aside className="w-80 border-l border-border h-screen overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Contenido del Curso</h2>
            <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
              {course.content.videos.map((module, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-md font-semibold">{module.module}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-1">
                      {module.lessons.map((lesson) => (
                        <li key={lesson.id}>
                           <Link
                            to={`/curso/${course.id}/leccion/${lesson.id}`}
                            className={`flex items-center p-2 rounded-md transition-colors ${lesson.id === lessonId ? 'bg-primary/10 text-primary' : 'hover:bg-accent'}`}
                           >
                            <Play className="w-4 h-4 mr-3" />
                            <span className="flex-1 text-sm">{lesson.title}</span>
                            <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </aside>
      </div>
    </>
  );
};

export default CoursePlayer;