// --- Evento que se ejecuta cuando el contenido del HTML está completamente cargado ---
document.addEventListener('DOMContentLoaded', () => {

    // --- Definición de los Datos de la Malla Curricular ---
    // Cada ramo es un objeto con id, nombre, créditos, semestre y requisitos.
    const ramosData = [
        // Semestre 1
        { id: 'filosofia', nombre: 'Filosofía', creditos: 5, semestre: 1, requisitos: [] },
        { id: 'psicologia', nombre: 'Psicología', creditos: 5, semestre: 1, requisitos: [] },
        { id: 'metodos-investigacion', nombre: 'Métodos de la Investigación Social', creditos: 5, semestre: 1, requisitos: [] },
        { id: 'historia-social', nombre: 'Historia Social de Chile', creditos: 5, semestre: 1, requisitos: [] },
        { id: 'psicobiologia', nombre: 'Psicobiología', creditos: 5, semestre: 1, requisitos: [] },
        { id: 'transversal-facso-1', nombre: 'Curso Transversal FACSO I', creditos: 2, semestre: 1, requisitos: [] },
        { id: 'ingles-1', nombre: 'Inglés I', creditos: 3, semestre: 1, requisitos: [] },

        // Semestre 2
        { id: 'epistemologia', nombre: 'Epistemología de las Ciencias Sociales', creditos: 5, semestre: 2, requisitos: ['filosofia'] },
        { id: 'psicologia-personalidad', nombre: 'Psicología de la Personalidad', creditos: 5, semestre: 2, requisitos: [] },
        { id: 'procesos-psicologicos', nombre: 'Procesos Psicológicos Básicos', creditos: 5, semestre: 2, requisitos: ['psicologia'] },
        { id: 'estadistica-1', nombre: 'Estadística I', creditos: 5, semestre: 2, requisitos: [] },
        { id: 'procesos-aprendizaje', nombre: 'Procesos Básicos de Aprendizaje', creditos: 5, semestre: 2, requisitos: [] },
        { id: 'cfg-1', nombre: 'CFG', creditos: 2, semestre: 2, requisitos: [] },
        { id: 'ingles-2', nombre: 'Inglés II', creditos: 3, semestre: 2, requisitos: ['ingles-1'] },
        
        // Semestre 3
        { id: 'teorias-sistemas', nombre: 'Teorías y Sistemas Psicológicos', creditos: 4, semestre: 3, requisitos: [] },
        { id: 'psicopatologia', nombre: 'Psicopatología', creditos: 4, semestre: 3, requisitos: ['psicologia-personalidad'] },
        { id: 'desarrollo-1', nombre: 'Psicología del Desarrollo I', creditos: 5, semestre: 3, requisitos: [] },
        { id: 'estadistica-2', nombre: 'Estadística II', creditos: 4, semestre: 3, requisitos: ['estadistica-1'] },
        { id: 'psicologia-social-1', nombre: 'Psicología Social I', creditos: 4, semestre: 3, requisitos: [] },
        { id: 'neurofisiologia', nombre: 'Neurofisiología', creditos: 4, semestre: 3, requisitos: ['psicobiologia'] },
        { id: 'transversal-facso-2', nombre: 'Curso Transversal FACSO II', creditos: 2, semestre: 3, requisitos: [] },
        { id: 'ingles-3', nombre: 'Inglés III', creditos: 3, semestre: 3, requisitos: ['ingles-2'] },

        // Semestre 4
        { id: 'evaluacion-psicologica', nombre: 'Introducción a la Evaluación Psicológica', creditos: 5, semestre: 4, requisitos: [] },
        { id: 'psiquiatria', nombre: 'Psiquiatría', creditos: 4, semestre: 4, requisitos: ['psicopatologia'] },
        { id: 'desarrollo-2', nombre: 'Psicología del Desarrollo II', creditos: 4, semestre: 4, requisitos: ['desarrollo-1'] },
        { id: 'metodologia-cualitativa', nombre: 'Metodología Cualitativa', creditos: 4, semestre: 4, requisitos: [] },
        { id: 'psicologia-social-2', nombre: 'Psicología Social II', creditos: 4, semestre: 4, requisitos: ['psicologia-social-1'] },
        { id: 'neurociencia-cognitiva', nombre: 'Neurociencia Cognitiva', creditos: 4, semestre: 4, requisitos: ['neurofisiologia'] },
        { id: 'artistico-deportivo', nombre: 'Curso Artístico/Deportivo', creditos: 2, semestre: 4, requisitos: [] },
        { id: 'ingles-4', nombre: 'Inglés IV', creditos: 3, semestre: 4, requisitos: ['ingles-3'] },
        
        // Semestre 5
        { id: 'psico-trabajo', nombre: 'Psicología del Trabajo y las Organizaciones', creditos: 6, semestre: 5, requisitos: ['psicologia-social-1'] },
        { id: 'psico-clinica', nombre: 'Psicología Clínica', creditos: 6, semestre: 5, requisitos: ['psiquiatria'] },
        { id: 'psico-educacional', nombre: 'Psicología Educacional', creditos: 6, semestre: 5, requisitos: ['desarrollo-2'] },
        { id: 'psico-juridica', nombre: 'Psicología Jurídica', creditos: 6, semestre: 5, requisitos: ['evaluacion-psicologica'] },
        { id: 'psico-comunitaria', nombre: 'Psicología Comunitaria', creditos: 6, semestre: 5, requisitos: ['psicologia-social-2'] },
        
        // Semestre 6
        { id: 'opt-laboral', nombre: 'Curso Optativo Laboral', creditos: 6, semestre: 6, requisitos: [] },
        { id: 'opt-comunitaria', nombre: 'Curso Optativo Comunitaria/Social', creditos: 6, semestre: 6, requisitos: [] },
        { id: 'opt-juridica', nombre: 'Curso Optativo Jurídica', creditos: 6, semestre: 6, requisitos: [] },
        { id: 'opt-clinica', nombre: 'Curso Optativo Clínica', creditos: 6, semestre: 6, requisitos: [] },
        { id: 'opt-educacional', nombre: 'Curso Optativo Educacional', creditos: 6, semestre: 6, requisitos: [] },
        { id: 'transversal-facso-3', nombre: 'Curso Transversal FACSO III', creditos: 4, semestre: 6, requisitos: [] },

        // Semestre 7
        { id: 'seminario-grado-1', nombre: 'Seminario de Grado I', creditos: 6, semestre: 7, requisitos: [] },
        { id: 'opt-1-sem7', nombre: 'Curso Optativo I', creditos: 6, semestre: 7, requisitos: [] },
        { id: 'opt-2-sem7', nombre: 'Curso Optativo II', creditos: 6, semestre: 7, requisitos: [] },
        { id: 'opt-3-sem7', nombre: 'Curso Optativo III', creditos: 6, semestre: 7, requisitos: [] },
        { id: 'opt-4-sem7', nombre: 'Curso Optativo IV', creditos: 6, semestre: 7, requisitos: [] },

        // Semestre 8
        { id: 'seminario-grado-2', nombre: 'Seminario de Grado II', creditos: 8, semestre: 8, requisitos: ['seminario-grado-1'] },
        { id: 'opt-1-sem8', nombre: 'Curso Optativo I', creditos: 8, semestre: 8, requisitos: [] },
        { id: 'opt-2-sem8', nombre: 'Curso Optativo II', creditos: 8, semestre: 8, requisitos: [] },
        { id: 'opt-3-sem8', nombre: 'Curso Optativo III', creditos: 6, semestre: 8, requisitos: [] },

        // Semestre 9
        { id: 'practica-1', nombre: 'Práctica Profesional I', creditos: 14, semestre: 9, requisitos: [] },
        { id: 'seminario-practica-1', nombre: 'Seminario de Práctica I', creditos: 4, semestre: 9, requisitos: [] },
        { id: 'formacion-profesional-1', nombre: 'Curso de Formación Profesional', creditos: 12, semestre: 9, requisitos: [] },

        // Semestre 10
        { id: 'practica-2', nombre: 'Práctica Profesional II', creditos: 14, semestre: 10, requisitos: [] },
        { id: 'seminario-practica-2', nombre: 'Seminario de Práctica II', creditos: 4, semestre: 10, requisitos: [] },
        { id: 'formacion-profesional-2', nombre: 'Cursos de Formación Profesional', creditos: 12, semestre: 10, requisitos: [] },
    ];

    // --- Referencias a elementos del DOM ---
    const mallaContainer = document.getElementById('malla-curricular');
    const creditosTotalesEl = document.getElementById('creditos-totales');
    const reiniciarBtn = document.getElementById('reiniciar-progreso');

    // --- Cargar el estado de los ramos aprobados desde el localStorage ---
    let aprobados = JSON.parse(localStorage.getItem('ramosAprobados')) || [];

    // --- Función para obtener el nombre de un ramo por su ID ---
    const getNombreRamoPorId = (id) => {
        const ramo = ramosData.find(r => r.id === id);
        return ramo ? ramo.nombre : 'Desconocido';
    };
    
    // --- Función para generar la malla dinámicamente ---
    function generarMalla() {
        // Limpiar el contenedor antes de generar
        mallaContainer.innerHTML = '';
        const maxSemestre = Math.max(...ramosData.map(r => r.semestre));

        for (let i = 1; i <= maxSemestre; i++) {
            // Crear contenedor para el semestre
            const semestreDiv = document.createElement('div');
            semestreDiv.className = 'semestre';
            semestreDiv.id = `semestre-${i}`;
            
            const semestreTitle = document.createElement('h2');
            semestreTitle.textContent = `Semestre ${i}`;
            semestreDiv.appendChild(semestreTitle);

            const ramoList = document.createElement('ul');
            
            // Filtrar ramos por semestre
            ramosData.filter(ramo => ramo.semestre === i).forEach(ramo => {
                const ramoLi = document.createElement('li');
                ramoLi.className = 'ramo';
                ramoLi.dataset.id = ramo.id;
                ramoLi.dataset.creditos = ramo.creditos;
                ramoLi.dataset.requisitos = JSON.stringify(ramo.requisitos);

                ramoLi.innerHTML = `
                    <span class="nombre">${ramo.nombre}</span>
                    <span class="creditos">${ramo.creditos} SCT</span>
                `;
                ramoList.appendChild(ramoLi);
            });

            semestreDiv.appendChild(ramoList);
            mallaContainer.appendChild(semestreDiv);
        }
    }

    // --- Función para actualizar el estado visual de todos los ramos ---
    function actualizarVisualizacionRamos() {
        const todosLosRamos = document.querySelectorAll('.ramo');
        aprobados = JSON.parse(localStorage.getItem('ramosAprobados')) || [];

        todosLosRamos.forEach(ramoEl => {
            const id = ramoEl.dataset.id;
            const requisitos = JSON.parse(ramoEl.dataset.requisitos);
            
            // Verificar si los requisitos están cumplidos
            const requisitosCumplidos = requisitos.every(reqId => aprobados.includes(reqId));

            ramoEl.classList.remove('aprobado', 'bloqueado');

            if (aprobados.includes(id)) {
                ramoEl.classList.add('aprobado');
            } else if (!requisitosCumplidos) {
                ramoEl.classList.add('bloqueado');
            }
        });
        
        calcularCreditos();
    }
    
    // --- Función para calcular y mostrar los créditos totales ---
    function calcularCreditos() {
        let total = 0;
        aprobados.forEach(id => {
            const ramoData = ramosData.find(r => r.id === id);
            if (ramoData) {
                total += ramoData.creditos;
            }
        });
        creditosTotalesEl.textContent = total;
    }

    // --- Función para guardar el estado en localStorage ---
    function guardarEstado() {
        localStorage.setItem('ramosAprobados', JSON.stringify(aprobados));
    }

    // --- Manejador de clics en los ramos ---
    mallaContainer.addEventListener('click', (e) => {
        const ramoEl = e.target.closest('.ramo');
        if (!ramoEl) return; // Si no se hizo clic en un ramo, no hacer nada

        const id = ramoEl.dataset.id;
        
        // Si el ramo está bloqueado, mostrar alerta
        if (ramoEl.classList.contains('bloqueado')) {
            const requisitos = JSON.parse(ramoEl.dataset.requisitos);
            const faltantes = requisitos.filter(reqId => !aprobados.includes(reqId));
            const nombresFaltantes = faltantes.map(getNombreRamoPorId).join(', ');
            alert(`Ramo bloqueado. Debes aprobar primero: ${nombresFaltantes}.`);
            return;
        }

        // Alternar el estado de aprobación
        if (aprobados.includes(id)) {
            // Si ya estaba aprobado, quitarlo (desaprobar)
            aprobados = aprobados.filter(ap => ap !== id);
        } else {
            // Si no estaba aprobado, agregarlo
            aprobados.push(id);
        }
        
        guardarEstado();
        actualizarVisualizacionRamos(); // Re-evaluar todos los ramos
    });

    // --- Manejador del botón de reinicio ---
    reiniciarBtn.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres borrar todo tu progreso? Esta acción no se puede deshacer.')) {
            localStorage.removeItem('ramosAprobados');
            aprobados = [];
            actualizarVisualizacionRamos();
        }
    });

    // --- Inicialización de la aplicación ---
    generarMalla();
    actualizarVisualizacionRamos();
});
