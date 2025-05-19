const apiUrl = 'https://ticketapi-z161.onrender.com/api/Incidents'; 

function getAllIncidents() {
    return fetch(`${apiUrl}`)
        .then(response => {
            if (!response.ok) throw new Error('Error al obtener incidentes');
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
            showToast('Error al cargar incidentes', 'error');
            return [];
        });
}

function getIncidentById(id) {
    return fetch(`${apiUrl}/${id}`)
        .then(response => {
            if (!response.ok) throw new Error('Error al obtener incidente');
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
            showToast('Error al cargar el incidente', 'error');
            return null;
        });
}

function createIncident(data) {
    return fetch(`${apiUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) throw new Error('Error al crear incidente');
        return response.json();
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('Error al crear incidente', 'error');
        return null;
    });
}

function updateIncidentStatus(id, status) {
    return fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
    })
    .then(response => {
        if (!response.ok) throw new Error('Error al actualizar incidente');
        return response.json();
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('Error al actualizar incidente', 'error');
        return null;
    });
}

function deleteIncident(id) {
    return fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) throw new Error('Error al eliminar incidente');
        return true;
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('Error al eliminar incidente', 'error');
        return false;
    });
}

// Variables globales
let incidents = [];
let currentFilter = 'all';

// Función principal para inicializar la aplicación
function initApp() {
    createHeader();
    createMainContainer();
    createForm();
    createIncidentsList();
    createModal();
    createToast();
    
    // Cargar incidentes al iniciar
    loadIncidents();
}

// Crear header con estilos
function createHeader() {
    const header = document.createElement('header');
    header.style.background = 'linear-gradient(135deg, #6e8efb, #a777e3)';
    header.style.color = 'white';
    header.style.padding = '20px';
    header.style.borderRadius = '8px';
    header.style.marginBottom = '20px';
    header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    header.style.textAlign = 'center';
    
    const title = document.createElement('h1');
    title.textContent = 'Sistema de Gestión de Incidentes';
    title.style.fontSize = '28px';
    title.style.fontWeight = '700';
    
    header.appendChild(title);
    
    const container = document.createElement('div');
    container.style.maxWidth = '1200px';
    container.style.margin = '0 auto';
    container.style.padding = '20px';
    container.appendChild(header);
    
    document.body.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.backgroundColor = '#f5f7fa';
    document.body.style.color = '#333';
    document.body.appendChild(container);
}

// Crear contenedor principal
function createMainContainer() {
    const mainContent = document.createElement('main');
    mainContent.id = 'main-content';
    mainContent.style.display = 'grid';
    mainContent.style.gridTemplateColumns = '1fr 2fr';
    mainContent.style.gap = '20px';
    
    // Media query para responsive design
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    function handleScreenChange(e) {
        if (e.matches) {
            mainContent.style.gridTemplateColumns = '1fr';
        } else {
            mainContent.style.gridTemplateColumns = '1fr 2fr';
        }
    }
    
    mediaQuery.addListener(handleScreenChange);
    handleScreenChange(mediaQuery);
    
    const container = document.body.querySelector('div');
    container.appendChild(mainContent);
}

// Crear formulario de incidentes
function createForm() {
    const formSection = document.createElement('section');
    formSection.style.backgroundColor = 'white';
    formSection.style.borderRadius = '8px';
    formSection.style.padding = '20px';
    formSection.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
    
    const formTitle = document.createElement('h2');
    formTitle.textContent = 'Nuevo Incidente';
    formTitle.style.color = '#4a5568';
    formTitle.style.marginBottom = '20px';
    formTitle.style.paddingBottom = '10px';
    formTitle.style.borderBottom = '2px solid #edf2f7';
    
    const form = document.createElement('form');
    form.id = 'incident-form';
    
    // Campo: Reporte
    const reportGroup = document.createElement('div');
    reportGroup.style.marginBottom = '15px';
    
    const reportLabel = document.createElement('label');
    reportLabel.htmlFor = 'report';
    reportLabel.textContent = 'Reporte:';
    reportLabel.style.display = 'block';
    reportLabel.style.marginBottom = '5px';
    reportLabel.style.fontWeight = '600';
    reportLabel.style.color = '#4a5568';
    
    const reportInput = document.createElement('input');
    reportInput.type = 'text';
    reportInput.id = 'report';
    reportInput.required = true;
    reportInput.style.width = '100%';
    reportInput.style.padding = '10px';
    reportInput.style.border = '1px solid #e2e8f0';
    reportInput.style.borderRadius = '4px';
    reportInput.style.fontSize = '16px';
    
    reportGroup.appendChild(reportLabel);
    reportGroup.appendChild(reportInput);
    
    // Campo: Descripción
    const descGroup = document.createElement('div');
    descGroup.style.marginBottom = '15px';
    
    const descLabel = document.createElement('label');
    descLabel.htmlFor = 'description';
    descLabel.textContent = 'Descripción:';
    descLabel.style.display = 'block';
    descLabel.style.marginBottom = '5px';
    descLabel.style.fontWeight = '600';
    descLabel.style.color = '#4a5568';
    
    const descInput = document.createElement('textarea');
    descInput.id = 'description';
    descInput.required = true;
    descInput.style.width = '100%';
    descInput.style.padding = '10px';
    descInput.style.border = '1px solid #e2e8f0';
    descInput.style.borderRadius = '4px';
    descInput.style.fontSize = '16px';
    descInput.style.minHeight = '120px';
    descInput.style.resize = 'vertical';
    
    descGroup.appendChild(descLabel);
    descGroup.appendChild(descInput);
    
    // Botón de envío
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Crear Incidente';
    submitBtn.style.width = '100%';
    submitBtn.style.backgroundColor = '#6e8efb';
    submitBtn.style.color = 'white';
    submitBtn.style.border = 'none';
    submitBtn.style.padding = '10px 20px';
    submitBtn.style.borderRadius = '4px';
    submitBtn.style.cursor = 'pointer';
    submitBtn.style.fontSize = '16px';
    submitBtn.style.fontWeight = '600';
    submitBtn.style.marginTop = '10px';
    submitBtn.style.transition = 'background-color 0.3s';
    
    submitBtn.addEventListener('mouseover', () => {
        submitBtn.style.backgroundColor = '#5a7ef7';
    });
    
    submitBtn.addEventListener('mouseout', () => {
        submitBtn.style.backgroundColor = '#6e8efb';
    });
    
    // Añadir elementos al formulario
    form.appendChild(reportGroup);
    form.appendChild(descGroup);
    form.appendChild(submitBtn);
    
    // Añadir evento de envío
    form.addEventListener('submit', handleFormSubmit);
    
    // Añadir elementos a la sección
    formSection.appendChild(formTitle);
    formSection.appendChild(form);
    
    // Añadir sección al contenedor principal
    const mainContent = document.getElementById('main-content');
    mainContent.appendChild(formSection);
}

// Crear sección de listado de incidentes
function createIncidentsList() {
    const incidentsSection = document.createElement('section');
    incidentsSection.style.backgroundColor = 'white';
    incidentsSection.style.borderRadius = '8px';
    incidentsSection.style.padding = '20px';
    incidentsSection.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
    
    const incidentsTitle = document.createElement('h2');
    incidentsTitle.textContent = 'Listado de Incidentes';
    incidentsTitle.style.color = '#4a5568';
    incidentsTitle.style.marginBottom = '20px';
    incidentsTitle.style.paddingBottom = '10px';
    incidentsTitle.style.borderBottom = '2px solid #edf2f7';
    
    // Filtros
    const filtersDiv = document.createElement('div');
    filtersDiv.style.display = 'flex';
    filtersDiv.style.gap = '10px';
    filtersDiv.style.marginBottom = '20px';
    filtersDiv.style.flexWrap = 'wrap';
    
    const filterOptions = [
        { text: 'Todos', value: 'all' },
        { text: 'Pendientes', value: 'pendiente' },
        { text: 'En Proceso', value: 'en proceso' },
        { text: 'Resueltos', value: 'resuelto' }
    ];
    
    filterOptions.forEach(option => {
        const filterBtn = document.createElement('button');
        filterBtn.textContent = option.text;
        filterBtn.dataset.filter = option.value;
        filterBtn.style.backgroundColor = option.value === 'all' ? '#6e8efb' : '#e2e8f0';
        filterBtn.style.color = option.value === 'all' ? 'white' : '#4a5568';
        filterBtn.style.border = 'none';
        filterBtn.style.padding = '10px 20px';
        filterBtn.style.borderRadius = '4px';
        filterBtn.style.cursor = 'pointer';
        filterBtn.style.fontSize = '16px';
        filterBtn.style.transition = 'background-color 0.3s';
        
        filterBtn.addEventListener('click', () => {
            currentFilter = option.value;
            
            // Actualizar estilo de los botones
            document.querySelectorAll('[data-filter]').forEach(btn => {
                btn.style.backgroundColor = '#e2e8f0';
                btn.style.color = '#4a5568';
            });
            
            filterBtn.style.backgroundColor = '#6e8efb';
            filterBtn.style.color = 'white';
            
            renderIncidents();
        });
        
        filtersDiv.appendChild(filterBtn);
    });
    
    // Contenedor para la lista de incidentes
    const incidentsList = document.createElement('div');
    incidentsList.id = 'incidents-list';
    
    // Añadir elementos a la sección
    incidentsSection.appendChild(incidentsTitle);
    incidentsSection.appendChild(filtersDiv);
    incidentsSection.appendChild(incidentsList);
    
    // Añadir sección al contenedor principal
    const mainContent = document.getElementById('main-content');
    mainContent.appendChild(incidentsSection);
}

// Crear modal para actualizar estados
function createModal() {
    const modal = document.createElement('div');
    modal.id = 'update-modal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.zIndex = '1000';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'white';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '8px';
    modalContent.style.width = '100%';
    modalContent.style.maxWidth = '500px';
    modalContent.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    modalContent.style.position = 'relative';
    
    const closeBtn = document.createElement('span');
    closeBtn.textContent = '×';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '15px';
    closeBtn.style.right = '15px';
    closeBtn.style.fontSize = '24px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.color = '#718096';
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Actualizar Estado';
    modalTitle.style.color = '#4a5568';
    modalTitle.style.marginBottom = '20px';
    modalTitle.style.paddingBottom = '10px';
    modalTitle.style.borderBottom = '2px solid #edf2f7';
    
    const updateForm = document.createElement('form');
    updateForm.id = 'update-form';
    
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.id = 'update-id';
    
    const statusGroup = document.createElement('div');
    statusGroup.style.marginBottom = '15px';
    
    const statusLabel = document.createElement('label');
    statusLabel.htmlFor = 'status';
    statusLabel.textContent = 'Estado:';
    statusLabel.style.display = 'block';
    statusLabel.style.marginBottom = '5px';
    statusLabel.style.fontWeight = '600';
    statusLabel.style.color = '#4a5568';
    
    const statusSelect = document.createElement('select');
    statusSelect.id = 'status';
    statusSelect.style.width = '100%';
    statusSelect.style.padding = '10px';
    statusSelect.style.border = '1px solid #e2e8f0';
    statusSelect.style.borderRadius = '4px';
    statusSelect.style.fontSize = '16px';
    
    const statusOptions = ['pendiente', 'en proceso', 'resuelto'];
    statusOptions.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option.charAt(0).toUpperCase() + option.slice(1);
        statusSelect.appendChild(opt);
    });
    
    const updateBtn = document.createElement('button');
    updateBtn.type = 'submit';
    updateBtn.textContent = 'Actualizar';
    updateBtn.style.width = '100%';
    updateBtn.style.backgroundColor = '#6e8efb';
    updateBtn.style.color = 'white';
    updateBtn.style.border = 'none';
    updateBtn.style.padding = '10px 20px';
    updateBtn.style.borderRadius = '4px';
    updateBtn.style.cursor = 'pointer';
    updateBtn.style.fontSize = '16px';
    updateBtn.style.fontWeight = '600';
    updateBtn.style.marginTop = '10px';
    
    statusGroup.appendChild(statusLabel);
    statusGroup.appendChild(statusSelect);
    
    updateForm.appendChild(hiddenInput);
    updateForm.appendChild(statusGroup);
    updateForm.appendChild(updateBtn);
    
    // Añadir evento al formulario
    updateForm.addEventListener('submit', handleUpdateSubmit);
    
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(updateForm);
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

// Crear toast para notificaciones
function createToast() {
    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.padding = '15px 20px';
    toast.style.borderRadius = '4px';
    toast.style.color = 'white';
    toast.style.fontWeight = '600';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    toast.style.zIndex = '1001';
    
    document.body.appendChild(toast);
}

// Mostrar notificación toast
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.backgroundColor = type === 'success' ? '#48bb78' : '#f56565';
    toast.style.opacity = '1';
    
    setTimeout(() => {
        toast.style.opacity = '0';
    }, 3000);
}

// Cargar incidentes desde la API
function loadIncidents() {
    const incidentsList = document.getElementById('incidents-list');
    
    // Mostrar cargando
    const loading = document.createElement('div');
    loading.style.display = 'flex';
    loading.style.justifyContent = 'center';
    loading.style.padding = '20px';
    
    const spinner = document.createElement('div');
    spinner.style.border = '4px solid #f3f3f3';
    spinner.style.borderTop = '4px solid #6e8efb';
    spinner.style.borderRadius = '50%';
    spinner.style.width = '40px';
    spinner.style.height = '40px';
    spinner.style.animation = 'spin 1s linear infinite';
    
    // Definir la animación con JavaScript
    const keyframes = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = keyframes;
    document.head.appendChild(styleSheet);
    
    loading.appendChild(spinner);
    incidentsList.innerHTML = '';
    incidentsList.appendChild(loading);
    
    // Cargar incidentes
    getAllIncidents()
        .then(data => {
            incidents = data;
            renderIncidents();
        });
}

// Renderizar incidentes según el filtro actual
function renderIncidents() {
    const incidentsList = document.getElementById('incidents-list');
    incidentsList.innerHTML = '';
    
    const filteredIncidents = currentFilter === 'all' 
        ? incidents 
        : incidents.filter(incident => incident.status === currentFilter);
    
    if (filteredIncidents.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.style.textAlign = 'center';
        emptyState.style.padding = '40px 20px';
        emptyState.style.color = '#718096';
        
        const emptyIcon = document.createElement('div');
        emptyIcon.textContent = '📋';
        emptyIcon.style.fontSize = '48px';
        emptyIcon.style.marginBottom = '10px';
        
        const emptyText = document.createElement('p');
        emptyText.textContent = `No hay incidentes ${currentFilter !== 'all' ? `con estado "${currentFilter}"` : ''}`;
        
        emptyState.appendChild(emptyIcon);
        emptyState.appendChild(emptyText);
        incidentsList.appendChild(emptyState);
        return;
    }
    
    filteredIncidents.forEach(incident => {
        const incidentCard = createIncidentCard(incident);
        incidentsList.appendChild(incidentCard);
    });
}

// Crear tarjeta de incidente
function createIncidentCard(incident) {
    const card = document.createElement('div');
    card.style.backgroundColor = 'white';
    card.style.borderRadius = '6px';
    card.style.padding = '15px';
    card.style.marginBottom = '15px';
    card.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.05)';
    card.style.position = 'relative';
    card.style.transition = 'transform 0.2s';
    
    // Borde izquierdo según el estado
    let borderColor;
    switch(incident.status) {
        case 'pendiente':
            borderColor = '#f56565';
            break;
        case 'en proceso':
            borderColor = '#ed8936';
            break;
        case 'resuelto':
            borderColor = '#48bb78';
            break;
        default:
            borderColor = '#cbd5e0';
    }
    
    card.style.borderLeft = `5px solid ${borderColor}`;
    
    // Efecto hover
    card.addEventListener('mouseover', () => {
        card.style.transform = 'translateY(-2px)';
        card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseout', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.05)';
    });
    
    // Estado
    const status = document.createElement('div');   
    status.textContent = incident.status;
    status.style.position = 'absolute';
    status.style.top = '15px';
    status.style.right = '15px';
    status.style.padding = '5px 10px';
    status.style.borderRadius = '20px';
    status.style.fontSize = '12px';
    status.style.fontWeight = '600';
    status.style.textTransform = 'uppercase';
    
    // Color de estado
    let statusBgColor, statusTextColor;
    switch(incident.status) {
        case 'pendiente':
            statusBgColor = '#fed7d7';
            statusTextColor = '#c53030';
            break;
        case 'en proceso':
            statusBgColor = '#feebc8';
            statusTextColor = '#c05621';
            break;
        case 'resuelto':
            statusBgColor = '#c6f6d5';
            statusTextColor = '#2f855a';
            break;
    }
    
    status.style.backgroundColor = statusBgColor;
    status.style.color = statusTextColor;
    
    // Titulo
    const title = document.createElement('h3');
    title.textContent = incident.report;
    title.style.fontWeight = '700';
    title.style.marginBottom = '8px';
    title.style.paddingRight = '80px';
    title.style.color = '#2d3748';
    
    // Descripción
    const description = document.createElement('p');
    description.textContent = incident.description;
    description.style.color = '#4a5568';
    description.style.marginBottom = '15px';
    description.style.lineHeight = '1.5';
    
    // Fecha
    const date = new Date(incident.created_at);
    const formattedDate = date.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const dateElement = document.createElement('div');
    dateElement.textContent = `Creado: ${formattedDate}`;
    dateElement.style.color = '#718096';
    dateElement.style.fontSize = '12px';
    
    // Acciones
    const actions = document.createElement('div');
    actions.style.display = 'flex';
    actions.style.gap = '8px';
    actions.style.marginTop = '15px';
    
    // Botón de editar
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Actualizar Estado';
    editBtn.style.backgroundColor = '#4299e1';
    editBtn.style.color = 'white';
    editBtn.style.border = 'none';
    editBtn.style.padding = '8px 16px';
    editBtn.style.borderRadius = '4px';
    editBtn.style.cursor = 'pointer';
    editBtn.style.fontSize = '14px';
    
    editBtn.addEventListener('mouseover', () => {
        editBtn.style.backgroundColor = '#3182ce';
    });
    
    editBtn.addEventListener('mouseout', () => {
        editBtn.style.backgroundColor = '#4299e1';
    });
    
    editBtn.addEventListener('click', () => {
        openUpdateModal(incident.id);
    });
    
    // Botón de eliminar
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.style.backgroundColor = '#f56565';
    deleteBtn.style.color = 'white';
    deleteBtn.style.border = 'none';
    deleteBtn.style.padding = '8px 16px';
    deleteBtn.style.borderRadius = '4px';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.fontSize = '14px';
    
    deleteBtn.addEventListener('mouseover', () => {
        deleteBtn.style.backgroundColor = '#e53e3e';
    });
    
    deleteBtn.addEventListener('mouseout', () => {
        deleteBtn.style.backgroundColor = '#f56565';
    });
    
    deleteBtn.addEventListener('click', () => {
        confirmDelete(incident.id);
    });
    
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    
    // Añadir elementos a la tarjeta
    card.appendChild(status);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(dateElement);
    card.appendChild(actions);
    
    return card;
}

// Manejar envío del formulario de creación
function handleFormSubmit(event) {
    event.preventDefault();
    
    const reportInput = document.getElementById('report');
    const descriptionInput = document.getElementById('description');
    
    const newIncident = {
        report: reportInput.value,
        description: descriptionInput.value,
        status: 'pendiente'
    };
    
    createIncident(newIncident)
        .then(response => {
            if (response) {
                showToast('Incidente creado con éxito', 'success');
                reportInput.value = '';
                descriptionInput.value = '';
                loadIncidents();
            }
        });
}

// Abrir modal para actualizar estado
function openUpdateModal(id) {
    const modal = document.getElementById('update-modal');
    const updateIdInput = document.getElementById('update-id');
    const statusSelect = document.getElementById('status');
    
    // Encontrar el incidente actual
    const incident = incidents.find(inc => inc.id === parseInt(id));
    if (incident) {
        updateIdInput.value = id;
        statusSelect.value = incident.status;
        
        modal.style.display = 'flex';
    }
}

// Manejar envío del formulario de actualización
function handleUpdateSubmit(event) {
    event.preventDefault();
    
    const id = document.getElementById('update-id').value;
    const status = document.getElementById('status').value;
    
    updateIncidentStatus(id, status)
        .then(response => {
            if (response) {
                document.getElementById('update-modal').style.display = 'none';
                showToast('Estado actualizado con éxito', 'success');
                loadIncidents();
            }
        });
}

// Confirmar eliminación de incidente
function confirmDelete(id) {
    if (confirm('¿Estás seguro de eliminar este incidente? Esta acción no se puede deshacer.')) {
        deleteIncident(id)
            .then(success => {
                if (success) {
                    showToast('Incidente eliminado con éxito', 'success');
                    loadIncidents();
                }
            });
    }
}

// Escape HTML para prevenir XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Iniciar la aplicación cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initApp);