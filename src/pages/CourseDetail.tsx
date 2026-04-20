import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Star, Clock, Users, Play, CheckCircle, Award, Video, FileText, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { coursesData } from '@/data/coursesData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const foundCourse = coursesData.find(c => c.id === parseInt(id));
    setCourse(foundCourse);
    
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    setIsEnrolled(enrolledCourses.includes(parseInt(id)));
  }, [id]);

  const handleEnroll = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      toast({ title: "Inicio de sesión requerido", description: "Debes iniciar sesión para inscribirte en un curso", variant: "destructive" });
      return;
    }

    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    if (!enrolledCourses.includes(parseInt(id))) {
      enrolledCourses.push(parseInt(id));
      localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
      setIsEnrolled(true);
      toast({ title: "¡Inscripción exitosa!", description: "Te has inscrito correctamente en el curso" });
    }
  };

  const handleActionClick = (action) => {

  };
  
  const handlePlayVideo = (lessonId) => {
    navigate(`/curso/${id}/leccion/${lessonId}`);
  };

  const handleStartExam = (examId) => {
    if(!examId || (course.content.exams.find(e => e.id === examId)?.questions.length === 0)){

       return;
    }
    navigate(`/curso/${id}/examen/${examId}`);
  };

  if (!course) {
    return (
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">Curso no encontrado</h1>
          <Link to="/cursos"><Button className="mt-4">Volver a Cursos</Button></Link>
        </div>
      </div>
    );
  }

  const getLevelColor = (level) => {
    switch (level) {
      case 'Principiante': return 'bg-green-500/10 text-green-500 dark:text-green-400';
      case 'Intermedio': return 'bg-yellow-500/10 text-yellow-500 dark:text-yellow-400';
      case 'Avanzado': return 'bg-red-500/10 text-red-500 dark:text-red-400';
      default: return 'bg-gray-500/10 text-gray-500 dark:text-gray-400';
    }
  };

  const CourseContent = () => (
    <div className="bg-card border border-border rounded-2xl p-8 mt-8">
      <h2 className="text-3xl font-bold text-card-foreground mb-6">Contenido del Curso</h2>
      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="videos"><Video className="w-4 h-4 mr-2" />Videos</TabsTrigger>
          <TabsTrigger value="documents"><FileText className="w-4 h-4 mr-2" />Documentos</TabsTrigger>
          <TabsTrigger value="exams"><Edit className="w-4 h-4 mr-2" />Exámenes</TabsTrigger>
        </TabsList>
        <TabsContent value="videos">
          <Accordion type="single" collapsible className="w-full">
            {course.content.videos.map((module, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg font-semibold">{module.module}</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 pl-4">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <li key={lessonIndex} className="flex items-center justify-between text-muted-foreground hover:text-foreground transition-colors cursor-pointer" onClick={() => handlePlayVideo(lesson.id)}>
                        <div className="flex items-center">
                          <Play className="w-4 h-4 mr-3 text-primary" />
                          <span>{lesson.title}</span>
                        </div>
                        <span className="text-sm">{lesson.duration}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
        <TabsContent value="documents">
          <ul className="space-y-3">
            {course.content.documents.map((doc, index) => (
              <li key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-accent transition-colors cursor-pointer" onClick={() => handleActionClick('Descargar documento')}>
                <div className="flex items-center">
                  <FileText className="w-5 h-5 mr-3 text-primary" />
                  <span className="font-medium">{doc.title}</span>
                </div>
                <span className="text-sm px-2 py-1 bg-secondary rounded">{doc.type}</span>
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="exams">
          <ul className="space-y-3">
            {course.content.exams.map((exam, index) => (
              <li key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-accent transition-colors cursor-pointer" onClick={() => handleStartExam(exam.id)}>
                <div className="flex items-center">
                  <Edit className="w-5 h-5 mr-3 text-primary" />
                  <span className="font-medium">{exam.title}</span>
                </div>
                <span className="text-sm">{exam.questions.length > 0 ? `${exam.questions.length} preguntas` : 'Próximamente'}</span>
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{course.title} - Wismora</title>
        <meta name="description" content={course.description} />
      </Helmet>

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-8">
            <Link to="/cursos">
              <Button variant="ghost"><ArrowLeft className="w-4 h-4 mr-2" />Volver a Cursos</Button>
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>{course.level}</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">{course.category}</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{course.title}</h1>
                  <p className="text-xl text-muted-foreground mb-6">{course.description}</p>
                  <div className="flex items-center space-x-6 text-muted-foreground">
                    <div className="flex items-center space-x-1"><Star className="w-5 h-5 text-yellow-400 fill-current" /><span className="font-medium">{course.rating}</span></div>
                    <div className="flex items-center space-x-1"><Users className="w-5 h-5" /><span>{course.students.toLocaleString()} estudiantes</span></div>
                    <div className="flex items-center space-x-1"><Clock className="w-5 h-5" /><span>{course.duration}</span></div>
                  </div>
                </div>

                {isEnrolled ? (
                  <CourseContent />
                ) : (
                  <>
                    <div className="mb-8 h-64 md:h-80 bg-muted rounded-2xl overflow-hidden">
                      <img  alt={course.title} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1635251595512-dc52146d5ae8" />
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-8 mb-8">
                      <h2 className="text-2xl font-bold text-card-foreground mb-4">Acerca del Curso</h2>
                      <p className="text-muted-foreground leading-relaxed">Este es un texto de ejemplo para la descripción larga. Debería ser reemplazado por el contenido real del curso.</p>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-8 mb-8">
                      <h2 className="text-2xl font-bold text-card-foreground mb-6">Lo que Aprenderás</h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[...Array(6)].map((_, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">Habilidad clave #{index + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="sticky top-24">
                <div className="bg-card border border-border rounded-2xl p-8">
                  {!isEnrolled && (
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-foreground mb-2">{course.price}</div>
                      <div className="text-muted-foreground">Acceso de por vida</div>
                    </div>
                  )}

                  {isEnrolled ? (
                    <div className="space-y-4 text-center">
                      <h3 className="text-2xl font-bold text-foreground">¡Ya estás inscrito!</h3>
                      <p className="text-muted-foreground">Empieza a aprender ahora mismo.</p>
                      <div className="flex items-center justify-center space-x-2 text-green-500 pt-2"><CheckCircle className="w-6 h-6" /><span className="font-medium text-lg">Inscrito</span></div>
                    </div>
                  ) : (
                    <Button onClick={handleEnroll} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-3 mb-4">Inscribirse Ahora</Button>
                  )}

                  <div className="space-y-4 pt-6 border-t border-border mt-6">
                    <div className="flex items-center justify-between"><span className="text-muted-foreground">Duración</span><span className="text-foreground font-medium">{course.duration}</span></div>
                    <div className="flex items-center justify-between"><span className="text-muted-foreground">Nivel</span><span className="text-foreground font-medium">{course.level}</span></div>
                    <div className="flex items-center justify-between"><span className="text-muted-foreground">Estudiantes</span><span className="text-foreground font-medium">{course.students.toLocaleString()}</span></div>
                    <div className="flex items-center justify-between"><span className="text-muted-foreground">Certificado</span><Award className="w-5 h-5 text-yellow-400" /></div>
                  </div>

                  <div className="pt-6 border-t border-border mt-6">
                    <h3 className="text-foreground font-semibold mb-3">Incluye:</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center space-x-2"><CheckCircle className="w-4 h-4 text-green-500" /><span>Acceso de por vida</span></li>
                      <li className="flex items-center space-x-2"><CheckCircle className="w-4 h-4 text-green-500" /><span>Certificado de finalización</span></li>
                      <li className="flex items-center space-x-2"><CheckCircle className="w-4 h-4 text-green-500" /><span>Soporte del instructor</span></li>
                      <li className="flex items-center space-x-2"><CheckCircle className="w-4 h-4 text-green-500" /><span>Recursos descargables</span></li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;