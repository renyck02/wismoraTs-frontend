import React from 'react';

export const newsArticles = [
  { 
    id: 1, 
    title: "OpenAI lanza GPT-4 Turbo con capacidades multimodales mejoradas", 
    excerpt: "La nueva versión del modelo de lenguaje incluye mejor comprensión de imágenes y un contexto más amplio para conversaciones más naturales.", 
    fullContent: "La última iteración de la familia de modelos de lenguaje de OpenAI, GPT-4 Turbo, promete revolucionar aún más la interacción humano-computadora. Sus capacidades multimodales avanzadas permiten no solo procesar y generar texto con una fluidez y coherencia asombrosas, sino también interpretar y reaccionar a imágenes de una manera mucho más sofisticada. Esto abre la puerta a aplicaciones innovadoras en áreas como la descripción de contenido visual, la asistencia en diseño gráfico y la creación de experiencias de usuario más inmersivas. Además, el modelo ha sido entrenado con un contexto de ventana significativamente ampliado, permitiendo conversaciones más largas y coherentes sin perder el hilo o la relevancia. La optimización del rendimiento y la eficiencia también son puntos clave, haciendo que GPT-4 Turbo sea más accesible y versátil para desarrolladores y empresas de todos los tamaños. Se espera que esta actualización impulse una nueva ola de innovación en aplicaciones basadas en IA, desde asistentes virtuales más inteligentes hasta herramientas de creación de contenido altamente personalizadas.",
    category: "ai", 
    author: "News Team", 
    date: "2024-06-18", 
    readTime: "5 min", 
    image: "https://images.unsplash.com/photo-1683701844845-114d77be00ef", 
    featured: true 
  },
  { 
    id: 2, 
    title: "React 19 Beta: Nuevas características que cambiarán el desarrollo", 
    excerpt: "Descubre las nuevas funcionalidades de React 19 incluyendo Server Components mejorados y el nuevo compilador React.", 
    fullContent: "La comunidad de desarrolladores de React está en ebullición con el lanzamiento de la versión beta de React 19. Esta actualización trae consigo una serie de características y optimizaciones diseñadas para simplificar el desarrollo de aplicaciones web complejas y mejorar significativamente el rendimiento. Uno de los puntos más destacados son las mejoras en los Server Components, que ahora ofrecen una integración más profunda y eficiente con el entorno del servidor, permitiendo a los desarrolladores enviar menos JavaScript al cliente y lograr tiempos de carga iniciales más rápidos. Otro avance crucial es el nuevo compilador de React, diseñado para optimizar el rendimiento de las actualizaciones de la UI, reduciendo re-renderizados innecesarios y mejorando la experiencia del usuario final. Además, se esperan mejoras en la gestión de estados y en las herramientas de depuración, haciendo que el proceso de desarrollo sea más intuitivo y menos propenso a errores. Estas innovaciones solidifican la posición de React como una de las bibliotecas de JavaScript más potentes y relevantes para la construcción de interfaces de usuario modernas y escalables.",
    category: "web", 
    author: "María González", 
    date: "2024-06-17", 
    readTime: "7 min", 
    image: "https://images.unsplash.com/photo-1635251595512-dc52146d5ae8", 
    featured: false 
  },
  { 
    id: 3, 
    title: "Flutter 3.22: Rendimiento optimizado para aplicaciones móviles", 
    excerpt: "Google presenta mejoras significativas en el rendimiento y nuevas herramientas de desarrollo para Flutter.", 
    fullContent: "Flutter, el popular UI toolkit de Google para construir aplicaciones nativas multiplataforma, ha lanzado su versión 3.22 con un enfoque primordial en la optimización del rendimiento. Esta actualización incorpora un motor de renderizado Vulkan/Metal más eficiente, lo que se traduce en animaciones más fluidas y una respuesta más rápida en dispositivos móviles iOS y Android. Además, se han introducido nuevas herramientas de depuración y perfiles de rendimiento que facilitan a los desarrolladores identificar y resolver cuellos de botella en sus aplicaciones. La interoperabilidad con componentes nativos ha sido mejorada, permitiendo una integración más sencilla con funcionalidades específicas de cada plataforma. Con esta versión, Flutter busca consolidarse como la opción preferida para equipos que buscan entregar experiencias de usuario de alta calidad en múltiples plataformas con un único código base, acelerando el ciclo de desarrollo y reduciendo la complejidad.",
    category: "mobile", 
    author: "Carlos Ruiz", 
    date: "2024-06-16", 
    readTime: "4 min", 
    image: "https://images.unsplash.com/photo-1595872018818-97555653a011", 
    featured: false 
  },
  { 
    id: 4, 
    title: "GitHub Copilot X: IA que revoluciona la programación", 
    excerpt: "La nueva versión de GitHub Copilot integra GPT-4 para ofrecer asistencia de programación más inteligente y contextual.", 
    fullContent: "GitHub Copilot X representa la próxima generación de asistentes de codificación impulsados por inteligencia artificial, elevando la barra en lo que los desarrolladores pueden esperar de sus herramientas. Integrando el potente modelo GPT-4, esta versión va más allá de la simple autocompletación de código. Ahora ofrece sugerencias de código más precisas y contextuales, puede generar pruebas unitarias, e incluso explicar fragmentos de código complejos en lenguaje natural. Copilot X se integra directamente en el flujo de trabajo del desarrollador a través de IDEs populares, lo que permite una asistencia en tiempo real que se adapta al estilo y las necesidades de cada programador. La promesa es reducir drásticamente el tiempo de desarrollo, minimizar los errores y permitir a los ingenieros centrarse en la lógica de negocio y la innovación. Esta herramienta no solo acelera la escritura de código, sino que también actúa como un mentor inteligente, ayudando a los desarrolladores a aprender y adoptar nuevas tecnologías más rápidamente.",
    category: "ai", 
    author: "Ana Martínez", 
    date: "2024-06-15", 
    readTime: "6 min", 
    image: "https://images.unsplash.com/photo-1579624647385-d8118029c1b3", 
    featured: false 
  },
  { 
    id: 5, 
    title: "Next.js 14: App Router y mejoras en el rendimiento", 
    excerpt: "Vercel anuncia Next.js 14 con mejoras significativas en el App Router y optimizaciones de rendimiento para aplicaciones web.", 
    fullContent: "El framework de React para aplicaciones web full-stack, Next.js, ha lanzado su versión 14, consolidando su posición como líder en el desarrollo web moderno. La principal novedad es la madurez y estabilidad del App Router, que ahora permite a los desarrolladores construir aplicaciones con rutas de archivos, Server Components y Streaming de forma nativa. Esto se traduce en una mayor flexibilidad y un rendimiento superior, ya que gran parte del trabajo de renderizado puede realizarse en el servidor, reduciendo la cantidad de JavaScript enviada al cliente. Además, Next.js 14 introduce optimizaciones en el compilador y en el manejo de paquetes, lo que resulta en tiempos de construcción más rápidos y una menor huella de la aplicación. Estas mejoras no solo benefician a los desarrolladores al agilizar el proceso de creación, sino que también ofrecen una experiencia de usuario final más fluida y rápida, con cargas instantáneas y navegación sin interrupciones.",
    category: "web", 
    author: "Roberto Silva", 
    date: "2024-06-14", 
    readTime: "5 min", 
    image: "https://images.unsplash.com/photo-1617260527318-977463f25b2d", 
    featured: false 
  },
  { 
    id: 6, 
    title: "Apple Vision Pro: El futuro de las aplicaciones espaciales", 
    excerpt: "Exploramos las nuevas oportunidades de desarrollo para la plataforma de realidad mixta de Apple.", 
    fullContent: "El Apple Vision Pro no es solo un dispositivo de realidad mixta, sino una plataforma completamente nueva que promete redefinir la interacción con la computación. Con su sistema operativo visionOS, Apple está sentando las bases para una nueva era de aplicaciones espaciales que fusionan el mundo digital con el físico de una manera sin precedentes. Los desarrolladores tienen ahora la oportunidad de crear experiencias inmersivas que van más allá de las pantallas tradicionales, utilizando el seguimiento ocular, el control gestual y la conciencia espacial. La calidad de renderizado y la baja latencia de Vision Pro abren un abanico de posibilidades para aplicaciones en campos como la educación, el entretenimiento, la colaboración profesional y el diseño 3D. Este dispositivo no solo representa un avance tecnológico, sino también un cambio de paradigma en la forma en que los usuarios interactúan con la información y el contenido digital, marcando el comienzo de un ecosistema de aplicaciones espaciales innovador.",
    category: "mobile", 
    author: "Laura Fernández", 
    date: "2024-06-13", 
    readTime: "8 min", 
    image: "https://images.unsplash.com/photo-1517430816045-df436b772620", 
    featured: false 
  }
];