import React from 'react';

export const coursesData = [
  {
    id: 10,
    title: "Fundamentos de la Web",
    category: "web",
    level: "Principiante",
    icon: "GitBranch",
    prerequisites: [],
    position: { x: 50, y: 250 },
    description: "HTML, CSS y JavaScript: los pilares de la web.",
    instructor: "Equipo Wismora",
    rating: 4.8,
    students: 5210,
    duration: "6 semanas",
    price: "$99",
    content: {
      videos: [
        { id: "module-html", module: "Módulo 1: HTML", lessons: [{ id: "html-intro", title: "Introducción a HTML", duration: "12:30", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }, { id: "html-tags", title: "Etiquetas y Atributos", duration: "18:45", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" }] },
        { id: "module-css", module: "Módulo 2: CSS", lessons: [{ id: "css-basics", title: "Fundamentos de CSS", duration: "22:10", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }, { id: "css-flexgrid", title: "Flexbox y Grid", duration: "35:00", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" }] },
        { id: "module-js", module: "Módulo 3: JavaScript", lessons: [{ id: "js-vars", title: "Variables y Tipos de Datos", duration: "25:15", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" }, { id: "js-functions", title: "Funciones y Eventos", duration: "30:00", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" }] },
      ],
      documents: [{ id: 'doc-1', title: "Guía de referencia HTML", type: "PDF" }, { id: 'doc-2', title: "Cheat Sheet de CSS", type: "PDF" }],
      exams: [{ 
        id: 'fund-final',
        title: "Examen Final de Fundamentos", 
        questions: [
            { id: 1, question: "¿Qué etiqueta HTML se usa para el texto más importante?", options: ["<h1>", "<p>", "<div>", "<header>"], correctAnswer: 0 },
            { id: 2, question: "¿Qué propiedad CSS se usa para cambiar el color de fondo?", options: ["color", "background-color", "font-color", "bgcolor"], correctAnswer: 1 },
            { id: 3, question: "¿Cómo se declara una variable en JavaScript?", options: ["var, let, const", "variable", "v", "def"], correctAnswer: 0 }
        ] 
      }],
    }
  },
  {
    id: 1,
    title: "Desarrollo Frontend con React",
    category: "web",
    level: "Intermedio",
    icon: "Code",
    prerequisites: [10],
    position: { x: 350, y: 125 },
    description: "Crea interfaces de usuario interactivas y modernas.",
    instructor: "María González",
    rating: 4.9,
    students: 2340,
    duration: "12 semanas",
    price: "$299",
    content: {
      videos: [
        { id: "module-react-intro", module: "Módulo 1: Introducción a React", lessons: [{ id: "react-intro", title: "Qué es React y por qué usarlo", duration: "15:00", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }, { id: "react-components", title: "Componentes y Props", duration: "25:30", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" }] },
        { id: "module-react-hooks", module: "Módulo 2: Hooks", lessons: [{ id: "react-hooks-state", title: "useState y useEffect", duration: "30:10", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }, { id: "react-hooks-context", title: "useContext y useReducer", duration: "28:40", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" }] },
        { id: "module-react-router", module: "Módulo 3: React Router", lessons: [{ id: "react-router", title: "Rutas dinámicas", duration: "22:00", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" }] },
      ],
      documents: [{ id: 'doc-3', title: "Guía de Hooks de React", type: "PDF" }, { id: 'doc-4', title: "Ejemplos de código", type: "ZIP" }],
      exams: [
        { 
          id: 'react-basic',
          title: "Examen de React Básico", 
          questions: [
            { id: 1, question: "¿Qué es JSX?", options: ["Una extensión de JavaScript", "Una base de datos", "Un lenguaje de estilos", "Una función de React"], correctAnswer: 0 },
            { id: 2, question: "¿Qué hook se usa para manejar el estado en un componente funcional?", options: ["useEffect", "useState", "useContext", "useReducer"], correctAnswer: 1 },
            { id: 3, question: "¿Cómo se pasan datos de un componente padre a un hijo?", options: ["A través de state", "A través de context", "A través de props", "No es posible"], correctAnswer: 2 }
          ] 
        },
        { id: 'react-final', title: "Proyecto Final", questions: [] }
      ],
    }
  },
  {
    id: 7,
    title: "Backend con Node.js y Express",
    category: "web",
    level: "Intermedio",
    icon: "Server",
    prerequisites: [10],
    position: { x: 350, y: 375 },
    description: "Construye APIs robustas y escalables.",
    instructor: "Patricia López",
    rating: 4.7,
    students: 1432,
    duration: "10 semanas",
    price: "$279",
    content: {
      videos: [
        { id: "module-node-fund", module: "Módulo 1: Fundamentos de Node.js", lessons: [{ id: "node-eventloop", title: "El event loop", duration: "20:00", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }] },
        { id: "module-node-express", module: "Módulo 2: Express.js", lessons: [{ id: "express-routes", title: "Rutas y Middlewares", duration: "35:15", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" }] },
      ],
      documents: [{ id: 'doc-5', title: "Guía de Express.js", type: "PDF" }],
      exams: [{ id: 'node-exam', title: "Examen de Node.js", questions: [] }],
    }
  },
  {
    id: 11,
    title: "Full Stack con Next.js",
    category: "web",
    level: "Avanzado",
    icon: "Code",
    prerequisites: [1],
    position: { x: 650, y: 0 },
    description: "Desarrollo web moderno con renderizado en servidor.",
    instructor: "María González",
    rating: 4.9,
    students: 1120,
    duration: "8 semanas",
    price: "$349",
    content: {
      videos: [],
      documents: [],
      exams: [],
    }
  },
  {
    id: 12,
    title: "Estilismo con TailwindCSS",
    category: "web",
    level: "Intermedio",
    icon: "Wind",
    prerequisites: [1],
    position: { x: 650, y: 250 },
    description: "Diseño rápido y eficiente con utility-first CSS.",
    instructor: "Ana Martínez",
    rating: 4.8,
    students: 1980,
    duration: "4 semanas",
    price: "$149",
    content: {
      videos: [],
      documents: [],
      exams: [],
    }
  },
  {
    id: 13,
    title: "Bases de Datos con PostgreSQL",
    category: "data",
    level: "Intermedio",
    icon: "Database",
    prerequisites: [7],
    position: { x: 650, y: 500 },
    description: "Domina las bases de datos relacionales.",
    instructor: "Roberto Silva",
    rating: 4.7,
    students: 950,
    duration: "8 semanas",
    price: "$249",
    content: {
      videos: [],
      documents: [],
      exams: [],
    }
  },
  {
    id: 2,
    title: "Inteligencia Artificial y ML",
    category: "ai",
    level: "Avanzado",
    icon: "Brain",
    prerequisites: [13],
    position: { x: 950, y: 375 },
    description: "Domina los algoritmos de IA más utilizados.",
    instructor: "Dr. Carlos Ruiz",
    rating: 4.8,
    students: 1890,
    duration: "16 semanas",
    price: "$399",
    content: {
      videos: [],
      documents: [],
      exams: [],
    }
  },
  {
    id: 9,
    title: "Deep Learning con TensorFlow",
    category: "ai",
    level: "Avanzado",
    icon: "Brain",
    prerequisites: [2],
    position: { x: 1250, y: 375 },
    description: "Domina las técnicas más avanzadas de deep learning.",
    instructor: "Dr. Elena Vargas",
    rating: 4.9,
    students: 756,
    duration: "20 semanas",
    price: "$499",
    content: {
      videos: [],
      documents: [],
      exams: [],
    }
  },
  {
    id: 3,
    title: "Apps Móviles con React Native",
    category: "mobile",
    level: "Intermedio",
    icon: "Smartphone",
    prerequisites: [1],
    position: { x: 950, y: 125 },
    description: "Crea apps nativas para iOS y Android.",
    instructor: "Ana Martínez",
    rating: 4.7,
    students: 1560,
    duration: "10 semanas",
    price: "$249",
    content: {
      videos: [],
      documents: [],
      exams: [],
    }
  },
  {
    id: 6,
    title: "UI/UX Design",
    category: "design",
    level: "Principiante",
    icon: "Palette",
    prerequisites: [],
    position: { x: 50, y: 0 },
    description: "Diseña experiencias digitales que enamoren.",
    instructor: "Diego Morales",
    rating: 4.5,
    students: 1876,
    duration: "8 semanas",
    price: "$199",
    content: {
      videos: [],
      documents: [],
      exams: [],
    }
  },
  {
    id: 5,
    title: "Ciberseguridad Ética",
    category: "security",
    level: "Avanzado",
    icon: "Shield",
    prerequisites: [7],
    position: { x: 950, y: 625 },
    description: "Aprende a proteger sistemas y realizar auditorías.",
    instructor: "Laura Fernández",
    rating: 4.8,
    students: 987,
    duration: "18 semanas",
    price: "$449",
    content: {
      videos: [],
      documents: [],
      exams: [],
    }
  },
];
