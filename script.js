// script.js - Malla Curricular Interactiva con Requisitos y Créditos

const malla = {
  "Semestre 1": [
    { nombre: "Filosofía", sct: 5 },
    { nombre: "Psicología", sct: 5 },
    { nombre: "Métodos de la Investigación  Social", sct: 5 },
    { nombre: "Historia Social de Chile", sct: 5 },
    { nombre: "Psicobiología", sct: 5 },
    { nombre: "Curso Transversal FACSO I", sct: 2 },
    { nombre: "Inglés I", sct: 3 }
  ],
  "Semestre 2": [
    { nombre: "Epistemología de las Ciencias Sociales", sct: 5, req: ["Filosofía"] },
    { nombre: "Psicología de la Personalidad", sct: 5 },
    { nombre: "Procesos Psicológicos Básicos", sct: 5, req: ["Psicología"] },
    { nombre: "Estadística I", sct: 5 },
    { nombre: "Procesos Básicos de Aprendizaje", sct: 5 },
    { nombre: "CFG", sct: 2 },
    { nombre: "Inglés II", sct: 3, req: ["Inglés I"] }
  ],
  "Semestre 3": [
    { nombre: "Teorías y Sistemas Psicológicos", sct: 4 },
    { nombre: "Psicopatología", sct: 4, req: ["Psicología de la Personalidad"] },
    { nombre: "Psicología del Desarrollo I", sct: 5 },
    { nombre: "Estadística II", sct: 4, req: ["Estadística I"] },
    { nombre: "Psicología Social I", sct: 4 },
    { nombre: "Neurofisiología", sct: 4, req: ["Psicobiología"] },
    { nombre: "Curso Transversal FACSO II", sct: 2 },
    { nombre: "Inglés III", sct: 3, req: ["Inglés II"] }
  ],
  "Semestre 4": [
    { nombre: "Introducción a la Evaluación Psicológica", sct: 5 },
    { nombre: "Psiquiatría", sct: 4, req: ["Psicopatología"] },
    { nombre: "Psicología del Desarrollo II", sct: 4, req: ["Psicología del Desarrollo I"] },
    { nombre: "Metodología Cualitativa", sct: 4 },
    { nombre: "Psicología Social II", sct: 4, req: ["Psicología Social I"] },
    { nombre: "Neurociencia Cognitiva", sct: 4, req: ["Neurofisiología"] },
    { nombre: "Curso Artístico/Deportivo", sct: 2 },
    { nombre: "Inglés IV", sct: 3, req: ["Inglés III"] }
  ],
  "Semestre 5": [
    { nombre: "Psicología del Trabajo y las Organizaciones", sct: 6, req: ["Psicología Social I"] },
    { nombre: "Psicología Clínica", sct: 6, req: ["Psiquiatría"] },
    { nombre: "Psicología Educacional", sct: 6, req: ["Psicología del Desarrollo II"] },
    { nombre: "Psicología Jurídica", sct: 6, req: ["Introducción a la Evaluación Psicológica"] },
    { nombre: "Psicología Comunitaria", sct: 6, req: ["Psicología Social II"] }
  ],
  "Semestre 6": [
    { nombre: "Curso Optativo Laboral", sct: 6 },
    { nombre: "Curso Optativo Comunitaria/Social", sct: 6 },
    { nombre: "Curso Optativo Jurídica", sct: 6 },
    { nombre: "Curso Optativo Clínica", sct: 6 },
    { nombre: "Curso Optativo Educacional", sct: 6 },
    { nombre: "Curso Transversal FACSO III", sct: 4 }
  ],
  "Semestre 7": [
    { nombre: "Seminario de Grado I", sct: 6 },
    { nombre: "Curso Optativo I", sct: 6 },
    { nombre: "Curso Optativo II", sct: 6 },
    { nombre: "Curso Optativo III", sct: 6 },
    { nombre: "Curso Optativo IV", sct: 6 }
  ],
  "Semestre 8": [
    { nombre: "Seminario de Grado II", sct: 8, req: ["Seminario de Grado I"] },
    { nombre: "Curso Optativo I", sct: 8 },
    { nombre: "Curso Optativo II", sct: 8 },
    { nombre: "Curso Optativo III", sct: 6 }
  ],
  "Semestre 9": [
    { nombre: "Práctica Profesional I", sct: 14 },
    { nombre: "Seminario de Práctica I", sct: 4 },
    { nombre: "Curso de Formación Profesional", sct: 12 }
  ],
  "Semestre 10": [
    { nombre: "Práctica Profesional II", sct: 14 },
    { nombre: "Seminario de Práctica II", sct: 4 },
    { nombre: "Cursos de Formación Profesional", sct: 12 }
  ]
};

const aprobados = new Set(JSON.parse(localStorage.getItem('ramosAprobados') || '[]'));

function renderMalla() {
  const container = document.getElementById("malla-container");
  container.innerHTML = "";

  for (const [semestre, ramos] of Object.entries(malla)) {
    const col = document.createElement("div");
    col.className = "semestre";
    col.innerHTML = `<h2>${semestre}</h2>`;

    for (const ramo of ramos) {
      const div = document.createElement("div");
      div.className = "ramo";
      div.textContent = `${ramo.nombre} (${ramo.sct} SCT)`;

      if (aprobados.has(ramo.nombre)) div.classList.add("aprobado");

      const requisitos = ramo.req || [];
      const bloqueado = requisitos.some(req => !aprobados.has(req));

      if (bloqueado && !aprobados.has(ramo.nombre)) div.classList.add("bloqueado");

      div.addEventListener("click", () => {
        if (div.classList.contains("bloqueado")) {
          mostrarModal(`No puedes aprobar este ramo. Debes aprobar: ${requisitos.filter(r => !aprobados.has(r)).join(", ")}`);
          return;
        }

        if (div.classList.contains("aprobado")) {
          div.classList.remove("aprobado");
          aprobados.delete(ramo.nombre);
        } else {
          div.classList.add("aprobado");
          aprobados.add(ramo.nombre);
        }

        localStorage.setItem('ramosAprobados', JSON.stringify([...aprobados]));
        renderMalla();
        actualizarCreditos();
      });

      col.appendChild(div);
    }

    container.appendChild(col);
  }
}

function actualizarCreditos() {
  const total = [...aprobados].reduce((sum, nombre) => {
    for (const lista of Object.values(malla)) {
      const ramo = lista.find(r => r.nombre === nombre);
      if (ramo) return sum + ramo.sct;
    }
    return sum;
  }, 0);
  document.getElementById("creditos").textContent = `Créditos Aprobados: ${total} SCT 💜`;
}

function mostrarModal(mensaje) {
  document.getElementById("modalMensaje").textContent = mensaje;
  document.getElementById("modal").style.display = "flex";
}

document.getElementById("closeModal").onclick = () => {
  document.getElementById("modal").style.display = "none";
};

window.onclick = (e) => {
  if (e.target.id === "modal") {
    document.getElementById("modal").style.display = "none";
  }
};

renderMalla();
actualizarCreditos();
