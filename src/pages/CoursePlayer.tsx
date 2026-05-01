import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactPlayerModule from 'react-player';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle,
  Circle,
  Download,
  FileText,
  MessageCircle,
  Play,
  Sparkles,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
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
  level?: string;
  description?: string;
  content: {
    videos: CourseModule[];
    documents?: any[];
    exams?: any[];
  };
};

const CoursePlayer = () => {
  const { id, lessonId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [activeTab, setActiveTab] = useState<'contenido' | 'notas' | 'recursos' | 'preguntas'>('contenido');

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

  const flatLessons = useMemo(() => {
    if (!course) return [];

    return course.content.videos.flatMap((module) =>
        module.lessons.map((lesson) => ({
          ...lesson,
          moduleName: module.module,
        }))
    );
  }, [course]);

  if (!course || !currentLesson) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
          Cargando...
        </div>
    );
  }

  const currentIndex = flatLessons.findIndex(
      (lesson) => String(lesson.id) === String(currentLesson.id)
  );

  const totalLessons = flatLessons.length || 1;
  const progress = Math.round(((currentIndex + 1) / totalLessons) * 100);

  return (
      <>
        <Helmet>
          <title>{`Viendo: ${currentLesson.title} - ${course.title}`}</title>
          <meta
              name="description"
              content={`Clase del curso ${course.title}: ${currentLesson.title}`}
          />
        </Helmet>

        <div className="min-h-screen bg-background text-foreground">
          <div className="mx-auto max-w-[1500px] px-4 py-6">

            {/* HEADER */}
            <header className="mb-6 flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-4">
                <Link to={`/curso/${course.id}`}>
                  <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>

                <div>
                  <p className="text-sm text-muted-foreground">
                    {course.title} / Lección
                  </p>
                  <h1 className="text-xl font-bold">
                    {currentLesson.title}
                  </h1>
                </div>
              </div>

              <Button className="bg-foreground text-background hover:bg-foreground/90">
                <CheckCircle className="mr-2 h-4 w-4" />
                Marcar como completada
              </Button>
            </header>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">

              {/* CONTENIDO PRINCIPAL */}
              <main className="min-w-0">

                <motion.section
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                >
                  {/* VIDEO */}
                  <div className="p-4">
                    <div className="overflow-hidden rounded-xl border border-border bg-black">
                      <div className="aspect-video">
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
                            <div className="flex h-full items-center justify-center text-center text-white">
                              <div>
                                <Play className="mx-auto mb-3 h-12 w-12" />
                                <p className="text-lg font-semibold">
                                  Esta lección no tiene video
                                </p>
                                <p className="text-sm text-white/70">
                                  Puedes revisar el contenido escrito.
                                </p>
                              </div>
                            </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* TABS */}
                  <div className="border-b border-border px-4">
                    <div className="flex gap-6">
                      {[
                        { key: 'contenido', label: 'Contenido' },
                        { key: 'notas', label: 'Notas' },
                        { key: 'recursos', label: 'Recursos' },
                        { key: 'preguntas', label: 'Preguntas' },
                      ].map((tab) => (
                          <button
                              key={tab.key}
                              onClick={() => setActiveTab(tab.key as any)}
                              className={`relative py-4 text-sm font-medium transition ${
                                  activeTab === tab.key
                                      ? 'text-foreground'
                                      : 'text-muted-foreground hover:text-foreground'
                              }`}
                          >
                            {tab.label}

                            {activeTab === tab.key && (
                                <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-foreground" />
                            )}
                          </button>
                      ))}
                    </div>
                  </div>

                  {/* CONTENIDO ESCRITO */}
                  <div className="p-6">
                    {activeTab === 'contenido' && (
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl font-bold">
                              ¿Qué aprenderás en esta lección?
                            </h2>

                            <p className="mt-3 leading-7 text-muted-foreground">
                              En esta lección estudiarás <strong>{currentLesson.title}</strong> dentro
                              del curso <strong>{course.title}</strong>. La idea es que puedas ver el
                              video, repasar la explicación escrita y reforzar el tema con recursos o preguntas.
                            </p>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-xl border border-border p-4">
                              <h3 className="font-semibold">Fase de comprensión</h3>
                              <p className="mt-2 text-sm text-muted-foreground">
                                Primero entenderás el concepto principal de la lección.
                              </p>
                            </div>

                            <div className="rounded-xl border border-border p-4">
                              <h3 className="font-semibold">Fase práctica</h3>
                              <p className="mt-2 text-sm text-muted-foreground">
                                Después podrás aplicar lo aprendido con ejemplos y ejercicios.
                              </p>
                            </div>
                          </div>

                          <div className="rounded-xl border border-border bg-muted/40 p-5">
                            <div className="flex gap-3">
                              <Sparkles className="mt-1 h-5 w-5" />
                              <div>
                                <h3 className="font-bold">Idea clave</h3>
                                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                  Wismora combina video, texto y guía paso a paso para que el estudiante
                                  no solo consuma contenido, sino que realmente comprenda el tema.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h2 className="text-xl font-bold">Resumen de la lección</h2>
                            <p className="mt-2 leading-7 text-muted-foreground">
                              Esta sección funcionará como una versión escrita del video. Aquí se podrá
                              explicar el tema de forma directa, con ejemplos, imágenes o fragmentos de código.
                            </p>
                          </div>
                        </div>
                    )}

                    {activeTab === 'notas' && (
                        <div className="rounded-xl border border-border bg-muted/30 p-5">
                          <h2 className="font-bold">Notas personales</h2>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Aquí el estudiante podrá guardar notas sobre la lección.
                          </p>
                        </div>
                    )}

                    {activeTab === 'recursos' && (
                        <div className="space-y-3">
                          {(course.content.documents ?? []).length > 0 ? (
                              course.content.documents?.map((doc: any) => (
                                  <div
                                      key={doc.id}
                                      className="flex items-center justify-between rounded-xl border border-border p-4"
                                  >
                                    <div className="flex items-center gap-3">
                                      <FileText className="h-5 w-5" />
                                      <div>
                                        <p className="font-medium">{doc.title}</p>
                                        <p className="text-xs text-muted-foreground">{doc.type}</p>
                                      </div>
                                    </div>

                                    <Download className="h-5 w-5 text-muted-foreground" />
                                  </div>
                              ))
                          ) : (
                              <p className="text-muted-foreground">
                                No hay recursos disponibles para esta lección.
                              </p>
                          )}
                        </div>
                    )}

                    {activeTab === 'preguntas' && (
                        <div className="rounded-xl border border-border bg-muted/30 p-5">
                          <h2 className="font-bold">Preguntas de la lección</h2>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Aquí se podrán mostrar preguntas frecuentes o dudas respondidas por la IA Tutor.
                          </p>
                        </div>
                    )}
                  </div>
                </motion.section>
              </main>

              {/* SIDEBAR DERECHA */}
              <aside className="space-y-5">

                {/* PROGRESO */}
                <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <h3 className="font-bold">Tu progreso en este curso</h3>

                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-8 border-foreground text-xl font-black">
                      {progress}%
                    </div>

                    <div>
                      <p className="font-semibold">¡Excelente, sigue así!</p>
                      <p className="text-sm text-muted-foreground">
                        {currentIndex + 1} de {totalLessons} lecciones
                      </p>
                    </div>
                  </div>
                </section>

                {/* LECCIONES */}
                <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-bold">Lecciones del curso</h3>
                    <span className="text-sm text-muted-foreground">
                    {currentIndex + 1} / {totalLessons}
                  </span>
                  </div>

                  <div className="space-y-4">
                    {course.content.videos.map((module, moduleIndex) => (
                        <div key={module.id ?? moduleIndex}>
                          <p className="mb-2 text-sm font-semibold">
                            {module.module}
                          </p>

                          <div className="space-y-1">
                            {module.lessons.map((lesson) => {
                              const isActive = String(lesson.id) === String(currentLesson.id);
                              const lessonPosition = flatLessons.findIndex(
                                  (item) => String(item.id) === String(lesson.id)
                              );
                              const isDone = lessonPosition < currentIndex;

                              return (
                                  <Link
                                      key={lesson.id}
                                      to={`/curso/${course.id}/leccion/${lesson.id}`}
                                      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                                          isActive
                                              ? 'bg-foreground text-background'
                                              : 'hover:bg-muted'
                                      }`}
                                  >
                                    {isActive ? (
                                        <Play className="h-4 w-4 fill-current" />
                                    ) : isDone ? (
                                        <CheckCircle className="h-4 w-4" />
                                    ) : (
                                        <Circle className="h-4 w-4 text-muted-foreground" />
                                    )}

                                    <div className="min-w-0 flex-1">
                                      <p className="truncate font-medium">{lesson.title}</p>
                                      <p className={`text-xs ${isActive ? 'text-background/70' : 'text-muted-foreground'}`}>
                                        {lesson.duration}
                                      </p>
                                    </div>
                                  </Link>
                              );
                            })}
                          </div>
                        </div>
                    ))}
                  </div>
                </section>

                {/* RECURSOS */}
                <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <h3 className="mb-4 font-bold">Recursos de la lección</h3>

                  <div className="space-y-3">
                    <ResourceItem title="Diapositivas PDF" />
                    <ResourceItem title="Código de ejemplo" />
                    <ResourceItem title="Resumen de la lección" />
                    <ResourceItem title="Documentación oficial" />
                  </div>
                </section>

                {/* IA */}
                <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <h3 className="font-bold">¿Dudas sobre esta lección?</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Pregunta a la IA Tutor y recibe ayuda personalizada.
                  </p>

                  <Button className="mt-4 w-full bg-foreground text-background hover:bg-foreground/90">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Preguntar a IA Tutor
                  </Button>
                </section>

              </aside>
            </div>
          </div>
        </div>
      </>
  );
};

function ResourceItem({ title }: { title: string }) {
  return (
      <div className="flex items-center justify-between rounded-xl border border-border p-3">
        <div className="flex items-center gap-3">
          <FileText className="h-4 w-4" />
          <span className="text-sm">{title}</span>
        </div>

        <Download className="h-4 w-4 text-muted-foreground" />
      </div>
  );
}

export default CoursePlayer;