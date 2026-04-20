import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Award, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { coursesData } from '@/data/coursesData';

const Exam = () => {
  const { id: courseId, examId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [exam, setExam] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const foundCourse = coursesData.find(c => c.id === parseInt(courseId));
    if (foundCourse) {
      setCourse(foundCourse);
      const foundExam = foundCourse.content.exams.find(e => e.id === examId);
      if (foundExam) {
        setExam(foundExam);
      } else {
        navigate(`/curso/${courseId}`);
      }
    } else {
      navigate('/cursos');
    }
  }, [courseId, examId, navigate]);

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitExam = () => {
    let correctAnswers = 0;
    exam.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correctAnswers++;
      }
    });
    const finalScore = (correctAnswers / exam.questions.length) * 100;
    setScore(finalScore);
    setShowResults(true);
  };

  if (!course || !exam) {
    return <div className="h-screen w-full flex items-center justify-center bg-background">Cargando examen...</div>;
  }

  const currentQuestion = exam.questions[currentQuestionIndex];

  if (showResults) {
    return (
      <>
        <Helmet>
          <title>Resultados del Examen - {exam.title}</title>
        </Helmet>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-accent p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-card rounded-2xl p-8 text-center shadow-2xl"
          >
            <Award className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-foreground mb-4">¡Examen completado!</h1>
            <p className="text-muted-foreground text-lg mb-8">Has finalizado el "{exam.title}".</p>
            <div className="bg-muted p-8 rounded-xl mb-8">
              <p className="text-xl text-muted-foreground mb-2">Tu Puntuación</p>
              <p className={`text-7xl font-bold ${score >= 70 ? 'text-green-500' : 'text-red-500'}`}>{score.toFixed(0)}%</p>
            </div>
            {score >= 70 ? (
              <p className="text-green-500 text-lg mb-8">¡Felicidades! Has aprobado el examen.</p>
            ) : (
              <p className="text-red-500 text-lg mb-8">Sigue estudiando. ¡La próxima vez lo conseguirás!</p>
            )}
            <div className="flex justify-center gap-4">
              <Link to={`/curso/${courseId}`}>
                <Button variant="outline" size="lg">Volver al Curso</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>{exam.title} - Wismora</title>
      </Helmet>
      <div className="min-h-screen flex flex-col bg-background">
        <header className="p-4 border-b border-border flex items-center justify-between">
          <Link to={`/curso/${courseId}`}><Button variant="ghost"><ArrowLeft className="mr-2 h-4 w-4" /> Salir del Examen</Button></Link>
          <div className="text-center">
            <h1 className="text-xl font-bold text-foreground">{exam.title}</h1>
            <p className="text-sm text-muted-foreground">{course.title}</p>
          </div>
          <div className="w-32 text-right font-semibold">
            Pregunta {currentQuestionIndex + 1}/{exam.questions.length}
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-3xl"
            >
              <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                <p className="text-sm text-muted-foreground mb-2">Pregunta {currentQuestionIndex + 1} de {exam.questions.length}</p>
                <h2 className="text-2xl font-bold text-card-foreground mb-8">{currentQuestion.question}</h2>
                
                <div className="space-y-4">
                  {currentQuestion.options.map((option, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        answers[currentQuestion.id] === index
                          ? 'border-primary bg-primary/10 ring-2 ring-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-sm font-bold ${
                        answers[currentQuestion.id] === index ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1 text-card-foreground">{option}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
        
        <footer className="p-4 border-t border-border flex justify-between items-center">
          <Button variant="outline" onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
          </Button>
          
          {currentQuestionIndex === exam.questions.length - 1 ? (
            <Button size="lg" onClick={handleSubmitExam} disabled={Object.keys(answers).length !== exam.questions.length}>
              Finalizar Examen
            </Button>
          ) : (
            <Button onClick={handleNextQuestion}>
              Siguiente <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </footer>
      </div>
    </>
  );
};

export default Exam;