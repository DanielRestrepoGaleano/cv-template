'use strict';

/* ── UI Labels (bilingual, not user-editable) ──────────────────────────────── */
const uiLabels = {
  es: {
    secciones: {
      detalles: 'Detalles',
      enlaces: 'Enlaces',
      habilidades: 'Habilidades',
      perfil: 'Perfil Profesional',
      experiencia: 'Experiencia Laboral / Proyectos',
      educacion: 'Educación',
      certificaciones: 'Cursos y Certificaciones'
    },
    form: {
      titulo: 'Editar CV',
      nombre: 'Nombre Completo',
      profesion: 'Profesión / Cargo',
      secContacto: 'Contacto',
      direccion: 'Dirección',
      telefono: 'Teléfono',
      emailLbl: 'Correo Electrónico',
      secEnlaces: 'Enlaces',
      etiqueta: 'Texto',
      url: 'URL',
      agregarEnlace: '+ Agregar Enlace',
      secPerfil: 'Perfil Profesional',
      secExp: 'Experiencia',
      cargo: 'Cargo | Empresa',
      ubicacion: 'Ubicación',
      periodo: 'Período',
      descripcion: 'Descripción',
      logros: 'Logros (uno por línea)',
      agregarExp: '+ Agregar Experiencia',
      secEdu: 'Educación',
      titulo_edu: 'Título / Grado',
      institucion: 'Institución',
      agregarEdu: '+ Agregar Educación',
      secSkills: 'Habilidades',
      categoria: 'Categoría',
      tecnologias: 'Tecnologías / Habilidades',
      agregarSkill: '+ Agregar Habilidad',
      secCerts: 'Cursos y Certificaciones',
      agregarCert: '+ Agregar Certificación',
      eliminar: '×'
    },
    botones: {
      mostrarEditor: '◀ Editor',
      ocultarEditor: '▶ Vista',
      lang: '🌐 ES → EN',
      pdf: '📄 Descargar PDF',
      word: '📝 Descargar Word',
      reset: '↺ Restablecer'
    },
    confirmarReset: '¿Restablecer todos los datos de ejemplo? Se perderán los cambios no guardados.',
    addressCvLbl: 'DIRECCIÓN',
    emailCvLbl: 'CORREO ELECTRÓNICO',
    ai: {
      import: {
        button: '🤖 Importar CV con IA',
        title: '🤖 Importar CV con IA',
        closeAria: 'Cerrar',
        privacyNotice: '🔒 Privacidad: Tu API key NUNCA se almacena en ningún lugar. Solo existe en la memoria del navegador durante el proceso y se borra automáticamente al terminar o al cerrar esta ventana. Tu CV se envía directamente al proveedor de IA que selecciones; no pasa por ningún servidor intermediario.',
        fileLabel: '📄 Archivo CV (PDF o DOCX — máx. 10 MB)',
        providerLabel: '🤖 Proveedor de IA',
        modelLabel: '🧠 Nombre del modelo',
        modelPlaceholder: 'gpt-4o-mini, gpt-4o, claude-3-5-haiku…',
        apiKeyLabel: '🔑 API Key',
        apiKeyNote: '(no se guarda — solo en memoria durante la importación)',
        apiKeyToggle: 'Mostrar/ocultar key',
        importButton: '🚀 Importar CV',
        cancelButton: 'Cancelar',
        emptyFile: 'Ningún archivo seleccionado',
        status: {
          validating: '⏳ Validando archivo…',
          extracting: '📄 Extrayendo texto del archivo…',
          sending: '🤖 Enviando al modelo de IA… (puede tardar unos segundos)',
          processing: '🔄 Procesando respuesta…',
          success: '✅ ¡CV importado correctamente! Revisa y ajusta los campos según sea necesario.',
          fileRequired: 'Selecciona un archivo PDF o DOCX.',
          modelRequired: 'Ingresa el nombre del modelo.',
          apiKeyRequired: 'Ingresa tu API Key.'
        }
      },
      chat: {
        button: '💬 Chat IA',
        title: '💬 Chat sobre tu CV',
        subtitle: 'Pregunta por fortalezas, mejoras, huecos o enfoque.',
        settingsTitle: '⚙️ Configuración del Chat',
        settingsSave: 'Guardar Configuración',
        settingsCancel: 'Cancelar',
        privacyNotice: '🔒 Privacidad: Tu API key NO se guarda en localStorage ni en servidores. Solo vive en la memoria de esta sesión activa.',
        help: 'Este chat lee el CV visible en la página. Configura aquí tu modelo y API Key para poder conversar.',
        providerLabel: '🤖 Proveedor de IA',
        modelLabel: '🧠 Nombre del modelo',
        modelPlaceholder: 'gpt-4o-mini, gpt-4o, claude-3-5-haiku…',
        apiKeyLabel: '🔑 API Key',
        apiKeyNote: '(solo en memoria mientras la pestaña esté abierta)',
        apiKeyToggle: 'Mostrar/ocultar key',
        clearButton: 'Limpiar',
        sendButton: 'Enviar',
        closeAria: 'Cerrar chat',
        settingsAria: 'Configuración del chat',
        placeholder: 'Escribe tu pregunta sobre el CV…',
        emptyState: 'Haz una pregunta para empezar. Por ejemplo: ¿Qué mejorarías en mi perfil profesional?',
        welcome: 'Puedo ayudarte a revisar y comentar el CV mostrado en la página. No haré cambios en el documento; solo responderé con sugerencias, observaciones y mejoras.',
        status: {
          ready: 'La IA está lista para responder sobre tu CV.',
          sending: 'Pensando en tu CV…',
          error: 'No se pudo responder.'
        },
        validation: {
          empty: 'Escribe un mensaje para continuar.',
          tooLong: 'El mensaje es demasiado largo. Resume tu pregunta e inténtalo de nuevo.',
          modelRequired: 'Ingresa el nombre del modelo en la configuración.',
          apiKeyRequired: 'Por favor, configura tu API Key en las opciones (⚙️).',
          providerRequired: 'Selecciona un proveedor de IA.'
        }
      }
    }
  },

  en: {
    secciones: {
      detalles: 'Details',
      enlaces: 'Links',
      habilidades: 'Skills',
      perfil: 'Professional Profile',
      experiencia: 'Work Experience / Projects',
      educacion: 'Education',
      certificaciones: 'Courses & Certifications'
    },
    form: {
      titulo: 'Edit CV',
      nombre: 'Full Name',
      profesion: 'Profession / Role',
      secContacto: 'Contact',
      direccion: 'Address',
      telefono: 'Phone',
      emailLbl: 'Email',
      secEnlaces: 'Links',
      etiqueta: 'Label',
      url: 'URL',
      agregarEnlace: '+ Add Link',
      secPerfil: 'Professional Profile',
      secExp: 'Experience',
      cargo: 'Role | Company',
      ubicacion: 'Location',
      periodo: 'Period',
      descripcion: 'Description',
      logros: 'Achievements (one per line)',
      agregarExp: '+ Add Experience',
      secEdu: 'Education',
      titulo_edu: 'Degree / Title',
      institucion: 'Institution',
      agregarEdu: '+ Add Education',
      secSkills: 'Skills',
      categoria: 'Category',
      tecnologias: 'Technologies / Skills',
      agregarSkill: '+ Add Skill',
      secCerts: 'Courses & Certifications',
      agregarCert: '+ Add Certification',
      eliminar: '×'
    },
    botones: {
      mostrarEditor: '◀ Editor',
      ocultarEditor: '▶ Preview',
      lang: '🌐 EN → ES',
      pdf: '📄 Download PDF',
      word: '📝 Download Word',
      reset: '↺ Reset'
    },
    confirmarReset: 'Reset all data to example defaults? Unsaved changes will be lost.',
    addressCvLbl: 'ADDRESS',
    emailCvLbl: 'EMAIL',
    ai: {
      import: {
        button: '🤖 Import CV with AI',
        title: '🤖 Import CV with AI',
        closeAria: 'Close',
        privacyNotice: '🔒 Privacy: Your API key is NEVER stored anywhere. It only exists in browser memory during the process and is automatically cleared when finished or when you close this window. Your CV is sent directly to the AI provider you choose; it does not go through any intermediate server.',
        fileLabel: '📄 CV file (PDF or DOCX — max. 10 MB)',
        providerLabel: '🤖 AI provider',
        modelLabel: '🧠 Model name',
        modelPlaceholder: 'gpt-4o-mini, gpt-4o, claude-3-5-haiku…',
        apiKeyLabel: '🔑 API Key',
        apiKeyNote: '(not saved — memory only during import)',
        apiKeyToggle: 'Show/hide key',
        importButton: '🚀 Import CV',
        cancelButton: 'Cancel',
        emptyFile: 'No file selected',
        status: {
          validating: '⏳ Validating file…',
          extracting: '📄 Extracting text from file…',
          sending: '🤖 Sending to the AI model… (this may take a few seconds)',
          processing: '🔄 Processing response…',
          success: '✅ CV imported successfully! Review and adjust fields as needed.',
          fileRequired: 'Select a PDF or DOCX file.',
          modelRequired: 'Enter the model name.',
          apiKeyRequired: 'Enter your API Key.'
        }
      },
      chat: {
        button: '💬 AI Chat',
        title: '💬 Chat about your CV',
        subtitle: 'Ask about strengths, improvements, gaps or focus.',
        settingsTitle: '⚙️ Chat Settings',
        settingsSave: 'Save Settings',
        settingsCancel: 'Cancel',
        privacyNotice: '🔒 Privacy: Your API key is NOT saved to localStorage or any server. It only lives in memory during this active session.',
        help: 'This chat reads the CV visible on the page. Configure your model and API Key here to start chatting.',
        providerLabel: '🤖 AI provider',
        modelLabel: '🧠 Model name',
        modelPlaceholder: 'gpt-4o-mini, gpt-4o, claude-3-5-haiku…',
        apiKeyLabel: '🔑 API Key',
        apiKeyNote: '(memory only while the tab stays open)',
        apiKeyToggle: 'Show/hide key',
        clearButton: 'Clear',
        sendButton: 'Send',
        closeAria: 'Close chat',
        settingsAria: 'Chat settings',
        placeholder: 'Write your question about the CV…',
        emptyState: 'Ask a question to start. For example: What would you improve in my professional summary?',
        welcome: 'I can help you review and comment on the CV shown on this page. I will not make changes to the document; I will only answer with suggestions, observations and improvements.',
        status: {
          ready: 'The AI is ready to answer about your CV.',
          sending: 'Thinking about your CV…',
          error: 'I could not answer.'
        },
        validation: {
          empty: 'Write a message to continue.',
          tooLong: 'Your message is too long. Please shorten your question and try again.',
          modelRequired: 'Enter the model name in settings.',
          apiKeyRequired: 'Please set your API Key in the settings (⚙️).',
          providerRequired: 'Select an AI provider.'
        }
      }
    }
  }
};

/* ── Default CV Data ─────────────────────────────────────────────────────────── */
const defaultCVData = {
  es: {
    nombre: 'TU NOMBRE APELLIDO',
    profesion: 'TU PROFESIÓN / CARGO',
    contacto: {
      direccion: 'Tu Ciudad\nTu País',
      telefono: '+00 123 456 7890',
      email: 'tu.correo@ejemplo.com'
    },
    links: [
      { label: 'GitHub', url: 'https://github.com/tu-usuario' },
      { label: 'LinkedIn', url: 'https://linkedin.com/in/tu-perfil' },
      { label: 'Portafolio Web', url: 'https://tu-portafolio.com' }
    ],
    perfil: 'Escribe aquí un breve resumen de tu perfil profesional. Menciona tus años de experiencia, tu área de especialización y lo que puedes aportar a una empresa. Escribe de 3 a 5 líneas destacando tus principales fortalezas, tecnologías que dominas y el tipo de soluciones que te apasiona construir.',
    experiencia: [
      {
        cargo: 'Tu Cargo | Nombre de la Empresa o Proyecto',
        ubicacion: 'Ciudad',
        fecha: 'Mes Año — Presente',
        descripcion: 'Descripción corta del objetivo principal de tu cargo o proyecto.',
        logros: [
          'Logro importante 1 (usa verbos de acción y métricas si es posible).',
          'Logro importante 2 o responsabilidad técnica destacada.',
          'Estado o impacto final del proyecto en la empresa.'
        ]
      },
      {
        cargo: 'Tu Cargo Anterior | Empresa 2',
        ubicacion: '',
        fecha: 'Mes Año — Mes Año',
        descripcion: 'Descripción de tu rol en este lugar.',
        logros: ['Tecnología implementada o problema resuelto para el cliente.']
      },
      {
        cargo: 'Proyecto Personal Destacado | Nombre del Proyecto',
        ubicacion: '',
        fecha: '',
        descripcion: 'Aplicación web o sistema desarrollado por iniciativa propia.',
        logros: [
          'Arquitectura utilizada y problema que resuelve.',
          'Enlace o métrica de uso actual.'
        ]
      }
    ],
    educacion: [
      {
        titulo: 'Título Universitario / Grado',
        institucion: 'Nombre de la Institución o Universidad, Ciudad',
        fecha: 'Año de Graduación'
      },
      {
        titulo: 'Título Técnico o Anterior',
        institucion: 'Nombre de la Institución',
        fecha: 'Año Inicio – Año Fin'
      }
    ],
    habilidades: [
      { categoria: 'Categoría 1', tecnologias: 'Tecnología 1, Tecnología 2, Tecnología 3.' },
      { categoria: 'Categoría 2', tecnologias: 'Herramienta 1, Herramienta 2, Herramienta 3.' },
      { categoria: 'Categoría 3', tecnologias: 'Habilidad 1, Habilidad 2, Habilidad 3.' },
      { categoria: 'Habilidades Blandas', tecnologias: 'Trabajo en Equipo, Liderazgo, Resolución de Problemas.' }
    ],
    certificaciones: [
      'Nombre del Curso o Certificación 1, Entidad (Mes Año)',
      'Nombre del Curso o Certificación 2, Entidad (Mes Año)',
      'Certificación Importante (En curso)'
    ],
    sectionConfig: {
      detalles: { visible: true, titulo: '' },
      enlaces: { visible: true, titulo: '' },
      habilidades: { visible: true, titulo: '' },
      perfil: { visible: true, titulo: '' },
      experiencia: { visible: true, titulo: '' },
      educacion: { visible: true, titulo: '' },
      certificaciones: { visible: true, titulo: '' }
    }
  },

  en: {
    nombre: 'YOUR FULL NAME',
    profesion: 'YOUR PROFESSION / ROLE',
    contacto: {
      direccion: 'Your City\nYour Country',
      telefono: '+00 123 456 7890',
      email: 'your.email@example.com'
    },
    links: [
      { label: 'GitHub', url: 'https://github.com/your-username' },
      { label: 'LinkedIn', url: 'https://linkedin.com/in/your-profile' },
      { label: 'Portfolio', url: 'https://your-portfolio.com' }
    ],
    perfil: 'Write a brief summary of your professional profile here. Mention your years of experience, area of specialization, and what you can bring to a company. Write 3 to 5 lines highlighting your main strengths, technologies you master, and the types of solutions you are passionate about building.',
    experiencia: [
      {
        cargo: 'Your Role | Company Name or Project',
        ubicacion: 'City',
        fecha: 'Month Year — Present',
        descripcion: 'Short description of the main objective of your role or project.',
        logros: [
          'Major achievement 1 (use action verbs and metrics when possible).',
          'Major achievement 2 or notable technical responsibility.',
          'Final status or impact of the project on the company.'
        ]
      },
      {
        cargo: 'Previous Role | Company 2',
        ubicacion: '',
        fecha: 'Month Year — Month Year',
        descripcion: 'Description of your role here.',
        logros: ['Technology implemented or problem solved for the client.']
      },
      {
        cargo: 'Featured Personal Project | Project Name',
        ubicacion: '',
        fecha: '',
        descripcion: 'Web application or system developed on personal initiative.',
        logros: [
          'Architecture used and problem it solves.',
          'Link or current usage metric.'
        ]
      }
    ],
    educacion: [
      {
        titulo: "University Degree / Bachelor's",
        institucion: 'Institution or University Name, City',
        fecha: 'Graduation Year'
      },
      {
        titulo: 'Technical or Previous Degree',
        institucion: 'Institution Name',
        fecha: 'Start Year – End Year'
      }
    ],
    habilidades: [
      { categoria: 'Category 1', tecnologias: 'Technology 1, Technology 2, Technology 3.' },
      { categoria: 'Category 2', tecnologias: 'Tool 1, Tool 2, Tool 3.' },
      { categoria: 'Category 3', tecnologias: 'Skill 1, Skill 2, Skill 3.' },
      { categoria: 'Soft Skills', tecnologias: 'Teamwork, Leadership, Problem Solving.' }
    ],
    certificaciones: [
      'Course or Certification 1, Institution (Month Year)',
      'Course or Certification 2, Institution (Month Year)',
      'Important Certification (In progress)'
    ],
    sectionConfig: {
      detalles: { visible: true, titulo: '' },
      enlaces: { visible: true, titulo: '' },
      habilidades: { visible: true, titulo: '' },
      perfil: { visible: true, titulo: '' },
      experiencia: { visible: true, titulo: '' },
      educacion: { visible: true, titulo: '' },
      certificaciones: { visible: true, titulo: '' }
    }
  }
};