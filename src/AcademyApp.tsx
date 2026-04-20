import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Courses from '@/pages/Courses';
import CourseDetail from '@/pages/CourseDetail';
import CoursePlayer from '@/pages/CoursePlayer';
import Exam from '@/pages/Exam';
import LearningPath from '@/pages/LearningPath';
import News from '@/pages/News';
import NewsDetail from '@/pages/NewsDetail';
import Forum from '@/pages/Forum';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Profile from '@/pages/Profile';
import Footer from '@/components/Footer';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import ManageCourses from '@/pages/admin/ManageCourses';
import CreateCourse from '@/pages/admin/CreateCourse';
import EditCourse from '@/pages/admin/EditCourse';
import ManageUsers from '@/pages/admin/ManageUsers';
import EditUser from '@/pages/admin/EditUser';
import Analytics from '@/pages/admin/Analytics';
import EditExam from '@/pages/admin/EditExam';
import ManageLearningPath from '@/pages/admin/ManageLearningPath';
import { useAdmin } from '@/contexts/AdminContext';

const AppContent = () => {
  const location = useLocation();
  const { isAdmin } = useAdmin();
  
  const isPlayerOrExam = location.pathname.includes('/leccion/') || location.pathname.includes('/examen/');
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdmin && isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="cursos" element={<ManageCourses />} />
          <Route path="cursos/nuevo" element={<CreateCourse />} />
          <Route path="cursos/editar/:id" element={<EditCourse />} />
          <Route path="cursos/editar/:courseId/examen/:examId" element={<EditExam />} />
          <Route path="ruta-aprendizaje" element={<ManageLearningPath />} />
          <Route path="usuarios" element={<ManageUsers />} />
          <Route path="usuarios/editar/:id" element={<EditUser />} />
          <Route path="analiticas" element={<Analytics />} />
        </Route>
      </Routes>
    );
  }

  return (
    <>
      <Helmet>
        <title>Wismora - Tu Academia de Tecnología</title>
        <meta name="description" content="La mejor academia online para aprender tecnología. Cursos, noticias y comunidad tech en Wismora." />
      </Helmet>
      
      {!isPlayerOrExam && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cursos" element={<Courses />} />
        <Route path="/curso/:id" element={<CourseDetail />} />
        <Route path="/curso/:id/leccion/:lessonId" element={<CoursePlayer />} />
        <Route path="/curso/:id/examen/:examId" element={<Exam />} />
        <Route path="/ruta-de-aprendizaje" element={<LearningPath />} />
        <Route path="/noticias" element={<News />} />
        <Route path="/noticias/:id" element={<NewsDetail />} />
        <Route path="/foro" element={<Forum />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/perfil" element={<Profile />} />
        
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
      
      {!isPlayerOrExam && <Footer />}
      <Toaster />
    </>
  );
}

function AcademyApp() {
  return <AppContent />;
}

export default AcademyApp;