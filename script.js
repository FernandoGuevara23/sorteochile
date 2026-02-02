document.addEventListener('DOMContentLoaded', () => {
    createModal();
    initApp();
});

let selectedTickets = new Set();

// Obtener el número de boletos vendidos
function getSoldCount() {
    return Object.keys(CONFIG.soldTickets).length;
}

// Verificar si un boleto está vendido
function isSold(number) {
    return CONFIG.soldTickets.hasOwnProperty(number);
}

// Obtener información del comprador
function getBuyerInfo(number) {
    return CONFIG.soldTickets[number] || null;
}

// Obtener detalles personalizados del boleto
function getTicketDetails(number) {
    return CONFIG.ticketDetails ? CONFIG.ticketDetails[number] : null;
}

// Crear el modal para mostrar información del comprador
function createModal() {
    const modal = document.createElement('div');
    modal.id = 'buyer-modal';
    modal.className = 'buyer-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <span class="modal-ticket-number"></span>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="modal-icon">🎫</div>
                <h3 class="modal-title">Boleto Ocupado</h3>
                <p class="modal-buyer-name"></p>
                <p class="modal-message">¡Este número ya tiene dueño!</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary modal-action">Elegir otro número</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Cerrar modal al hacer clic fuera o en el botón de cerrar
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-close') || e.target.classList.contains('modal-action')) {
            closeModal();
        }
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function openModal(number, buyerInfo) {
    const modal = document.getElementById('buyer-modal');
    const ticketNumber = modal.querySelector('.modal-ticket-number');
    const buyerName = modal.querySelector('.modal-buyer-name');
    const details = getTicketDetails(number);

    ticketNumber.textContent = `#${number}`;

    if (details && details.emoji) {
        ticketNumber.innerHTML = `${details.emoji} #${number}`;
    }

    if (buyerInfo && buyerInfo.nombre) {
        buyerName.innerHTML = `<strong>Comprado por:</strong> ${buyerInfo.nombre}`;
    } else {
        buyerName.innerHTML = `<strong>Estado:</strong> Apartado`;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('buyer-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function initApp() {
    // 1. Set background
    const bg = document.getElementById('bg-image');
    if (bg) bg.style.backgroundImage = `url('${CONFIG.backgroundImage}')`;

    // 2. Set Hero Data
    document.getElementById('sold-count').textContent = getSoldCount();
    document.getElementById('total-tickets').textContent = CONFIG.totalTickets;
    document.getElementById('price-per-ticket').textContent = CONFIG.ticketPriceText;

    // 3. Set Bio Data
    document.getElementById('about-img').src = CONFIG.aboutMe.image;
    document.getElementById('about-title').textContent = CONFIG.aboutMe.title;
    document.getElementById('about-desc').textContent = CONFIG.aboutMe.description;

    // 4. Update Progress Bar
    const soldCount = getSoldCount();
    const progress = (soldCount / CONFIG.totalTickets) * 100;
    document.documentElement.style.setProperty('--progress', `${progress}%`);
    document.getElementById('progress-text').textContent = `${Math.round(progress)}% completado`;

    // 5. Inject Prizes
    const prizesGrid = document.getElementById('prizes-grid');
    CONFIG.prizes.forEach((prize, index) => {
        const card = document.createElement('div');
        card.className = 'prize-card';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', index * 100);
        card.innerHTML = `
            <div class="prize-image" style="background-image: url('${prize.image}')"></div>
            <div class="prize-info">
                <h3>${prize.name}</h3>
                <p>${prize.description}</p>
            </div>
        `;
        prizesGrid.appendChild(card);
    });

    // 6. Generate Tickets Grid with personalization
    const ticketsGrid = document.getElementById('tickets-grid');
    for (let i = 1; i <= CONFIG.totalTickets; i++) {
        const ticket = document.createElement('div');
        const ticketIsSold = isSold(i);
        const details = getTicketDetails(i);

        // Build class list
        let classes = ['ticket'];
        if (ticketIsSold) classes.push('sold');
        if (details && details.lucky) classes.push('lucky');
        ticket.className = classes.join(' ');

        // Build ticket content
        let content = '';
        if (details && details.emoji) {
            content = `<span class="ticket-emoji">${details.emoji}</span><span class="ticket-num">${i}</span>`;
            if (details.label && !ticketIsSold) {
                content += `<span class="ticket-label">${details.label}</span>`;
            }
        } else {
            content = `<span class="ticket-num">${i}</span>`;
        }
        ticket.innerHTML = content;

        // Add custom styles if defined
        if (details && details.color) {
            ticket.style.setProperty('--ticket-custom-color', details.color);
        }

        if (!ticketIsSold) {
            ticket.addEventListener('click', () => toggleTicket(ticket, i));
        } else {
            const buyerInfo = getBuyerInfo(i);
            ticket.addEventListener('click', () => openModal(i, buyerInfo));
            ticket.title = buyerInfo && buyerInfo.nombre
                ? `Comprado por: ${buyerInfo.nombre}`
                : "Este número ya fue vendido";
        }

        ticketsGrid.appendChild(ticket);
    }

    // 7. Draw Info
    document.getElementById('draw-date-text').textContent = CONFIG.drawDate;
    document.getElementById('draw-link').href = CONFIG.liveDrawLink;

    // 8. Promo Info
    document.getElementById('qr-image').src = CONFIG.qrImage;
    document.getElementById('page-url').value = CONFIG.pageUrl;

    // 9. Initialize Animations
    AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-out-quad'
    });

    // 10. WhatsApp Initial Update
    updateSelectionSummary();
}

function copyLink() {
    const copyText = document.getElementById("page-url");
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(copyText.value);

    const btn = document.querySelector('.btn-copy');
    const originalText = btn.textContent;
    btn.textContent = "¡Copiado!";
    btn.style.background = "#10b981";

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "";
    }, 2000);
}

function toggleTicket(element, number) {
    if (selectedTickets.has(number)) {
        selectedTickets.delete(number);
        element.classList.remove('selected');
    } else {
        selectedTickets.add(number);
        element.classList.add('selected');
    }
    updateSelectionSummary();
}

function updateSelectionSummary() {
    const count = selectedTickets.size;
    const totalPrice = count * CONFIG.ticketPriceValue;

    document.getElementById('selected-count').textContent = count;
    document.getElementById('total-price').textContent = `$${totalPrice.toLocaleString()} MXN`;

    const whatsappBtn = document.getElementById('whatsapp-btn');
    const buyerForm = document.getElementById('buyer-form');

    if (count > 0) {
        whatsappBtn.style.display = 'block';
        buyerForm.style.display = 'flex';

        whatsappBtn.onclick = () => {
            const name = document.getElementById('buyer-name').value.trim();
            const phone = document.getElementById('buyer-phone').value.trim();

            if (!name || !phone) {
                alert("Por favor, ingresa tu nombre y teléfono para apartar los boletos.");
                return;
            }

            const numbers = Array.from(selectedTickets).sort((a, b) => a - b).join(', ');
            let messageText = `${CONFIG.whatsappMessage}${numbers}.`;
            messageText += `\nTotal: $${totalPrice.toLocaleString()} MXN`;
            messageText += `\n\nMis datos:`;
            messageText += `\nNombre: ${name}`;
            messageText += `\nTeléfono: ${phone}`;

            const message = encodeURIComponent(messageText);
            window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${message}`, '_blank');
        };
    } else {
        whatsappBtn.style.display = 'none';
        buyerForm.style.display = 'none';
    }
}
