document.getElementById("generate-btn").addEventListener("click", function () {
    // Capturar valores del formulario
    const name = document.getElementById("name").value;
    const title = document.getElementById("title").value;
    const contact = document.getElementById("contact").value;
    const summary = document.getElementById("summary").value;
    const experience = document.getElementById("experience").value;
    const education = document.getElementById("education").value;
    const skills = document.getElementById("skills").value;
  
    // Guardar datos en LocalStorage
    localStorage.setItem("curriculum-name", name);
    localStorage.setItem("curriculum-title", title);
    localStorage.setItem("curriculum-contact", contact);
    localStorage.setItem("curriculum-summary", summary);
    localStorage.setItem("curriculum-experience", experience);
    localStorage.setItem("curriculum-education", education);
    localStorage.setItem("curriculum-skills", skills);
  
    // Redirigir al archivo curriculum.html
    window.location.href = "curriculum.html";
  });
  
  // En curriculum.html, cargar datos desde LocalStorage
  if (window.location.pathname.includes("curriculum.html")) {
    document.getElementById("curriculum-name").textContent = localStorage.getItem("curriculum-name") || "Nombre Completo";
    document.getElementById("curriculum-title").textContent = localStorage.getItem("curriculum-title") || "Título Profesional";
    document.getElementById("curriculum-contact").textContent = localStorage.getItem("curriculum-contact") || "Contacto";
    document.getElementById("curriculum-summary").textContent = localStorage.getItem("curriculum-summary") || "Aquí aparecerá el resumen.";
    document.getElementById("curriculum-experience").textContent = localStorage.getItem("curriculum-experience") || "Aquí aparecerá la experiencia laboral.";
    document.getElementById("curriculum-education").textContent = localStorage.getItem("curriculum-education") || "Aquí aparecerá la formación académica.";
    document.getElementById("curriculum-skills").textContent = localStorage.getItem("curriculum-skills") || "Aquí aparecerán las habilidades.";
  }
  