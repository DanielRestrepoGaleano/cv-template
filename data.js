'use strict';

/* ── UI Labels (bilingual, not user-editable) ──────────────────────────────── */
const uiLabels = {
  es: {
    secciones: {
      detalles:        'Detalles',
      enlaces:         'Enlaces',
      habilidades:     'Habilidades',
      perfil:          'Perfil Profesional',
      experiencia:     'Experiencia Laboral / Proyectos',
      educacion:       'Educación',
      certificaciones: 'Cursos y Certificaciones'
    },
    form: {
      titulo:        'Editar CV',
      nombre:        'Nombre Completo',
      profesion:     'Profesión / Cargo',
      secContacto:   'Contacto',
      direccion:     'Dirección',
      telefono:      'Teléfono',
      emailLbl:      'Correo Electrónico',
      secEnlaces:    'Enlaces',
      etiqueta:      'Texto',
      url:           'URL',
      agregarEnlace: '+ Agregar Enlace',
      secPerfil:     'Perfil Profesional',
      secExp:        'Experiencia',
      cargo:         'Cargo | Empresa',
      ubicacion:     'Ubicación',
      periodo:       'Período',
      descripcion:   'Descripción',
      logros:        'Logros (uno por línea)',
      agregarExp:    '+ Agregar Experiencia',
      secEdu:        'Educación',
      titulo_edu:    'Título / Grado',
      institucion:   'Institución',
      agregarEdu:    '+ Agregar Educación',
      secSkills:     'Habilidades',
      categoria:     'Categoría',
      tecnologias:   'Tecnologías / Habilidades',
      agregarSkill:  '+ Agregar Habilidad',
      secCerts:      'Cursos y Certificaciones',
      agregarCert:   '+ Agregar Certificación',
      eliminar:      '×'
    },
    botones: {
      mostrarEditor: '◀ Editor',
      ocultarEditor: '▶ Vista',
      lang:          '🌐 ES → EN',
      pdf:           '📄 Descargar PDF',
      word:          '📝 Descargar Word',
      reset:         '↺ Restablecer'
    },
    confirmarReset: '¿Restablecer todos los datos de ejemplo? Se perderán los cambios no guardados.',
    addressCvLbl: 'DIRECCIÓN',
    emailCvLbl: 'CORREO ELECTRÓNICO'
  },

  en: {
    secciones: {
      detalles:        'Details',
      enlaces:         'Links',
      habilidades:     'Skills',
      perfil:          'Professional Profile',
      experiencia:     'Work Experience / Projects',
      educacion:       'Education',
      certificaciones: 'Courses & Certifications'
    },
    form: {
      titulo:        'Edit CV',
      nombre:        'Full Name',
      profesion:     'Profession / Role',
      secContacto:   'Contact',
      direccion:     'Address',
      telefono:      'Phone',
      emailLbl:      'Email',
      secEnlaces:    'Links',
      etiqueta:      'Label',
      url:           'URL',
      agregarEnlace: '+ Add Link',
      secPerfil:     'Professional Profile',
      secExp:        'Experience',
      cargo:         'Role | Company',
      ubicacion:     'Location',
      periodo:       'Period',
      descripcion:   'Description',
      logros:        'Achievements (one per line)',
      agregarExp:    '+ Add Experience',
      secEdu:        'Education',
      titulo_edu:    'Degree / Title',
      institucion:   'Institution',
      agregarEdu:    '+ Add Education',
      secSkills:     'Skills',
      categoria:     'Category',
      tecnologias:   'Technologies / Skills',
      agregarSkill:  '+ Add Skill',
      secCerts:      'Courses & Certifications',
      agregarCert:   '+ Add Certification',
      eliminar:      '×'
    },
    botones: {
      mostrarEditor: '◀ Editor',
      ocultarEditor: '▶ Preview',
      lang:          '🌐 EN → ES',
      pdf:           '📄 Download PDF',
      word:          '📝 Download Word',
      reset:         '↺ Reset'
    },
    confirmarReset: 'Reset all data to example defaults? Unsaved changes will be lost.',
    addressCvLbl: 'ADDRESS',
    emailCvLbl: 'EMAIL'
  }
};

/* ── Default CV Data ─────────────────────────────────────────────────────────── */
const defaultCVData = {
  es: {
    nombre:    'TU NOMBRE APELLIDO',
    profesion: 'TU PROFESIÓN / CARGO',
    contacto: {
      direccion: 'Tu Ciudad\nTu País',
      telefono:  '+00 123 456 7890',
      email:     'tu.correo@ejemplo.com'
    },
    links: [
      { label: 'GitHub',         url: 'https://github.com/tu-usuario' },
      { label: 'LinkedIn',       url: 'https://linkedin.com/in/tu-perfil' },
      { label: 'Portafolio Web', url: 'https://tu-portafolio.com' }
    ],
    perfil: 'Escribe aquí un breve resumen de tu perfil profesional. Menciona tus años de experiencia, tu área de especialización y lo que puedes aportar a una empresa. Escribe de 3 a 5 líneas destacando tus principales fortalezas, tecnologías que dominas y el tipo de soluciones que te apasiona construir.',
    experiencia: [
      {
        cargo:       'Tu Cargo | Nombre de la Empresa o Proyecto',
        ubicacion:   'Ciudad',
        fecha:       'Mes Año — Presente',
        descripcion: 'Descripción corta del objetivo principal de tu cargo o proyecto.',
        logros: [
          'Logro importante 1 (usa verbos de acción y métricas si es posible).',
          'Logro importante 2 o responsabilidad técnica destacada.',
          'Estado o impacto final del proyecto en la empresa.'
        ]
      },
      {
        cargo:       'Tu Cargo Anterior | Empresa 2',
        ubicacion:   '',
        fecha:       'Mes Año — Mes Año',
        descripcion: 'Descripción de tu rol en este lugar.',
        logros: ['Tecnología implementada o problema resuelto para el cliente.']
      },
      {
        cargo:       'Proyecto Personal Destacado | Nombre del Proyecto',
        ubicacion:   '',
        fecha:       '',
        descripcion: 'Aplicación web o sistema desarrollado por iniciativa propia.',
        logros: [
          'Arquitectura utilizada y problema que resuelve.',
          'Enlace o métrica de uso actual.'
        ]
      }
    ],
    educacion: [
      {
        titulo:      'Título Universitario / Grado',
        institucion: 'Nombre de la Institución o Universidad, Ciudad',
        fecha:       'Año de Graduación'
      },
      {
        titulo:      'Título Técnico o Anterior',
        institucion: 'Nombre de la Institución',
        fecha:       'Año Inicio – Año Fin'
      }
    ],
    habilidades: [
      { categoria: 'Categoría 1',        tecnologias: 'Tecnología 1, Tecnología 2, Tecnología 3.' },
      { categoria: 'Categoría 2',        tecnologias: 'Herramienta 1, Herramienta 2, Herramienta 3.' },
      { categoria: 'Categoría 3',        tecnologias: 'Habilidad 1, Habilidad 2, Habilidad 3.' },
      { categoria: 'Habilidades Blandas',tecnologias: 'Trabajo en Equipo, Liderazgo, Resolución de Problemas.' }
    ],
    certificaciones: [
      'Nombre del Curso o Certificación 1, Entidad (Mes Año)',
      'Nombre del Curso o Certificación 2, Entidad (Mes Año)',
      'Certificación Importante (En curso)'
    ],
    sectionConfig: {
      detalles:        { visible: true, titulo: '' },
      enlaces:         { visible: true, titulo: '' },
      habilidades:     { visible: true, titulo: '' },
      perfil:          { visible: true, titulo: '' },
      experiencia:     { visible: true, titulo: '' },
      educacion:       { visible: true, titulo: '' },
      certificaciones: { visible: true, titulo: '' }
    }
  },

  en: {
    nombre:    'YOUR FULL NAME',
    profesion: 'YOUR PROFESSION / ROLE',
    contacto: {
      direccion: 'Your City\nYour Country',
      telefono:  '+00 123 456 7890',
      email:     'your.email@example.com'
    },
    links: [
      { label: 'GitHub',    url: 'https://github.com/your-username' },
      { label: 'LinkedIn',  url: 'https://linkedin.com/in/your-profile' },
      { label: 'Portfolio', url: 'https://your-portfolio.com' }
    ],
    perfil: 'Write a brief summary of your professional profile here. Mention your years of experience, area of specialization, and what you can bring to a company. Write 3 to 5 lines highlighting your main strengths, technologies you master, and the types of solutions you are passionate about building.',
    experiencia: [
      {
        cargo:       'Your Role | Company Name or Project',
        ubicacion:   'City',
        fecha:       'Month Year — Present',
        descripcion: 'Short description of the main objective of your role or project.',
        logros: [
          'Major achievement 1 (use action verbs and metrics when possible).',
          'Major achievement 2 or notable technical responsibility.',
          'Final status or impact of the project on the company.'
        ]
      },
      {
        cargo:       'Previous Role | Company 2',
        ubicacion:   '',
        fecha:       'Month Year — Month Year',
        descripcion: 'Description of your role here.',
        logros: ['Technology implemented or problem solved for the client.']
      },
      {
        cargo:       'Featured Personal Project | Project Name',
        ubicacion:   '',
        fecha:       '',
        descripcion: 'Web application or system developed on personal initiative.',
        logros: [
          'Architecture used and problem it solves.',
          'Link or current usage metric.'
        ]
      }
    ],
    educacion: [
      {
        titulo:      "University Degree / Bachelor's",
        institucion: 'Institution or University Name, City',
        fecha:       'Graduation Year'
      },
      {
        titulo:      'Technical or Previous Degree',
        institucion: 'Institution Name',
        fecha:       'Start Year – End Year'
      }
    ],
    habilidades: [
      { categoria: 'Category 1',  tecnologias: 'Technology 1, Technology 2, Technology 3.' },
      { categoria: 'Category 2',  tecnologias: 'Tool 1, Tool 2, Tool 3.' },
      { categoria: 'Category 3',  tecnologias: 'Skill 1, Skill 2, Skill 3.' },
      { categoria: 'Soft Skills', tecnologias: 'Teamwork, Leadership, Problem Solving.' }
    ],
    certificaciones: [
      'Course or Certification 1, Institution (Month Year)',
      'Course or Certification 2, Institution (Month Year)',
      'Important Certification (In progress)'
    ],
    sectionConfig: {
      detalles:        { visible: true, titulo: '' },
      enlaces:         { visible: true, titulo: '' },
      habilidades:     { visible: true, titulo: '' },
      perfil:          { visible: true, titulo: '' },
      experiencia:     { visible: true, titulo: '' },
      educacion:       { visible: true, titulo: '' },
      certificaciones: { visible: true, titulo: '' }
    }
  }
};
