import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactPlayerModule from 'react-player';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Play } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { coursesData } from '@/data/coursesData';

const ReactPlayer = (ReactPlayerModule as any).default ?? ReactPlayerModule;

type Lesson = {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
};

type CourseModule = {
  id?: string;
  module: string;
  lessons: Lesson[];
};

type Course = {
  id: number;
  title: string;
  content: {
    videos: CourseModule[];
  };
};

const CoursePlayer = () => {
  const { id, lessonId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    if (!id || !lessonId) {
      navigate('/cursos');
      return;
    }

    const foundCourse = coursesData.find((c: any) => c.id === Number(id)) as Course | undefined;

    if (!foundCourse) {
      navigate('/cursos');
      return;
    }

    let foundLesson: Lesson | null = null;

    for (const module of foundCourse.content.videos) {
      const lesson = module.lessons.find((l) => String(l.id) === String(lessonId));

      if (lesson) {
        foundLesson = lesson;
        break;
      }
    }

    if (!foundLesson) {
      navigate(`/curso/${foundCourse.id}`);
      return;
    }

    setCourse(foundCourse);
    setCurrentLesson(foundLesson);
  }, [id, lessonId, navigate]);

  if (!course || !currentLesson) {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-background text-foreground">
          Cargando...
        </div>
    );
  }

  return (
      <>
        <Helmet>
          <title>{`Viendo: ${currentLesson.title} - ${course.title}`}</title>
          <meta
              name="description"
              content={`Clase del curso ${course.title}: ${currentLesson.title}`}
          />
        </Helmet>

        <div className="flex h-screen bg-background text-foreground">
          <main className="flex-1 flex flex-col h-screen">
            <header className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center">
                <Link to={`/curso/${course.id}`}>
                  <Button variant="ghost" size="icon">
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                </Link>

                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">
                    Curso: {course.title}
                  </p>
                  <h1 className="text-lg font-bold text-foreground">
                    {currentLesson.title}
                  </h1>
                </div>
              </div>

              <Button>
                Marcar como completada
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            </header>

            <div className="flex-1 bg-black flex items-center justify-center">
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full flex items-center justify-center"
              >
                {currentLesson.videoUrl ? (
                    <ReactPlayer
                        url={currentLesson.videoUrl}
                        width="100%"
                        height="100%"
                        controls
                        playing={false}
                        config={{
                          file: {
                            attributes: {
                              controlsList: 'nodownload',
                            },
                          },
                        }}
                    />
                ) : (
                    <div className="text-center text-white p-6">
                      <p className="text-xl font-semibold mb-2">
                        Esta lección no tiene video
                      </p>
                      <p className="text-white/70">
                        Puedes revisar el contenido escrito o los recursos de la lección.
                      </p>
                    </div>
                )}
              </motion.div>
            </div>
          </main>

          <aside className="w-80 border-l border-border h-screen overflow-y-auto bg-background">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Contenido del Curso</h2>

              <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                {course.content.videos.map((module, index) => (
                    <AccordionItem value={`item-${index}`} key={module.id ?? index}>
                      <AccordionTrigger className="text-md font-semibold">
                        {module.module}
                      </AccordionTrigger>

                      <AccordionContent>
                        <ul className="space-y-1">
                          {module.lessons.map((lesson) => (
                              <li key={lesson.id}>
                                <Link
                                    to={`/curso/${course.id}/leccion/${lesson.id}`}
                                    className={`flex items-center p-2 rounded-md transition-colors ${
                                        String(lesson.id) === String(lessonId)
                                            ? 'bg-primary/10 text-primary'
                                            : 'hover:bg-accent'
                                    }`}
                                >
                                  <Play className="w-4 h-4 mr-3 shrink-0" />

                                  <span className="flex-1 text-sm">
                              {lesson.title}
                            </span>

                                  <span className="text-xs text-muted-foreground ml-2">
                              {lesson.duration}
                            </span>
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