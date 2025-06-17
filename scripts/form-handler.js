import { uploadCV, saveCandidate } from './database.js';

/**
 * Maneja el envío del formulario
 * @param {Event} event - Evento de envío del formulario
 */
const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Mostrar estado de carga
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    
    try {
        // Subir CV
        const cvFile = formData.get('cv');
        const cvUrl = await uploadCV(cvFile);
        
        // Preparar datos para la base de datos
        const candidateData = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            habilidades: formData.get('habilidades').split(',').map(s => s.trim()),
            experiencia: parseInt(formData.get('experiencia')),
            idiomas: formData.get('idiomas').split(',').map(s => s.trim()),
            pais: formData.get('pais'),
            cv_pdf_url: cvUrl,
            fecha_subida: new Date().toISOString()
        };
        
        // Guardar en base de datos
        await saveCandidate(candidateData);
        
        // Mostrar confirmación
        document.getElementById('registration-form').classList.add('hidden');
        document.getElementById('confirmation').classList.remove('hidden');
        
        // Resetear formulario
        form.reset();
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Hubo un error al enviar tu aplicación. Por favor intenta nuevamente.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar Aplicación';
    }
};

/**
 * Inicializa los manejadores de eventos del formulario
 */
const initFormHandlers = () => {
    const form = document.getElementById('candidateForm');
    const showFormBtn = document.getElementById('showFormBtn');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    if (showFormBtn) {
        showFormBtn.addEventListener('click', () => {
            document.getElementById('hero').classList.add('hidden');
            document.getElementById('registration-form').classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
};

export { initFormHandlers };