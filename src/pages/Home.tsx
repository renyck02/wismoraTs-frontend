import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowRight, BookOpen, Users, Trophy, Star, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {

  useEffect(() => {


    const fetchData = async () => {


      console.log("ola");
      const res = await fetch("http://localhost:8000/test");
      const data = await res.json();
      console.log(data);
    };

    fetchData();
  }, []);



  const features = [
    {
      icon: BookOpen,
      title: "Cursos Especializados",
      description: "Aprende con expertos de la industria en tecnologías de vanguardia"
    },
    {
      icon: Users,
      title: "Comunidad Activa",
      description: "Conecta con miles de estudiantes y profesionales tech"
    },
    {
      icon: Trophy,
      title: "Certificaciones",
      description: "Obtén certificados reconocidos por la industria"
    }
  ];

  const popularCourses = [
    {
      id: 1,
      title: "Desarrollo Web Full Stack",
      instructor: "María González",
      rating: 4.9,
      students: 2340,
      image: "Desarrollador trabajando en múltiples pantallas con código",
      category: "Desarrollo Web"
    },
    {
      id: 2,
      title: "Inteligencia Artificial y Machine Learning",
      instructor: "Dr. Carlos Ruiz",
      rating: 4.8,
      students: 1890,
      image: "Visualización de redes neuronales y algoritmos de IA",
      category: "IA & ML"
    },
    {
      id: 3,
      title: "Desarrollo de Apps Móviles",
      instructor: "Ana Martínez",
      rating: 4.7,
      students: 1560,
      image: "Diseño de interfaces móviles en smartphone",
      category: "Móvil"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Wismora - La mejor academia de tecnología online</title>
        <meta name="description" content="Aprende tecnología con los mejores cursos online. Desarrollo web, IA, apps móviles y más. Únete a nuestra comunidad en Wismora." />
      </Helmet>

      <div className="pt-16">
        <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-background -z-10">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                Domina la
                <br />
                <span className="gradient-text">Tecnología</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Aprende las habilidades más demandadas del mercado tech con cursos prácticos, 
                proyectos reales y una comunidad que te apoya en cada paso.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/cursos">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-4 hover-glow">
                    Explorar Cursos
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                
                <Link to="/registro">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                    <Play className="mr-2 w-5 h-5" />
                    Comenzar Gratis
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-secondary/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                ¿Por qué elegir <span className="gradient-text">Wismora</span>?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Ofrecemos la mejor experiencia de aprendizaje con metodologías innovadoras
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="bg-card rounded-2xl p-8 text-center card-hover border border-border"
                  >
                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-card-foreground mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Cursos <span className="gradient-text">Populares</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Los cursos más demandados por nuestra comunidad de estudiantes
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {popularCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bg-card rounded-2xl overflow-hidden card-hover border border-border"
                >
                  <div className="h-48 bg-muted flex items-center justify-center">
                    <img  alt={course.image} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1635251595512-dc52146d5ae8" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {course.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-muted-foreground">{course.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-card-foreground mb-2">{course.title}</h3>
                    <p className="text-muted-foreground mb-4">Por {course.instructor}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{course.students.toLocaleString()} estudiantes</span>
                      <Link to={`/curso/${course.id}`}>
                        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                          Ver Curso
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/cursos">
                <Button size="lg" variant="outline">
                  Ver Todos los Cursos
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                ¿Listo para transformar tu <span className="gradient-text">carrera</span>?
              </h2>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Únete a miles de estudiantes que ya están construyendo su futuro en tecnología
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/registro">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-4 hover-glow">
                    Comenzar Ahora
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                
                <Link to="/foro">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                    Explorar Comunidad
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;