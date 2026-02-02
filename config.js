/**
 * CONFIGURACIÓN DE LA RIFA - FER-CHILA
 * Fernando, edita los valores de este archivo para actualizar tu página.
 */

const CONFIG = {
    // Nombre de la rifa y del usuario
    raffleName: "Inter-Fer",
    userName: "Fernando",

    // Información del viaje
    tripDestination: "Chile",

    // Sobre Mí (Bio)
    aboutMe: {
        title: "Hola, soy Fernando",
        description: "Estudio Sistemas de Información en la Universidad de Guanajuato y siempre he soñado con conocer Chile. Gracias a esta rifa, estoy más cerca de lograr mi intercambio académico para aprender de su cultura y gente. ¡Tu apoyo significa el mundo para mí!",
        image: "WhatsApp Image 2026-01-16 at 2.29.39 PM.jpeg" // Placeholder de persona
    },

    // Configuración de boletos
    totalTickets: 100, // Total de boletos disponibles
    ticketPriceValue: 200, // Precio numérico para cálculos
    ticketPriceText: "$200 MXN", // Texto que se mostrará

    // Números ya vendidos con información del comprador
    // Formato: { numero: { nombre: "Nombre", telefono: "opcional" } }
    // Ejemplo: { 1: { nombre: "Juan Pérez" }, 15: { nombre: "María García", telefono: "5512345678" } }
    soldTickets: {
    },

    // Personalización de boletos (opcional)
    // Puedes agregar detalles especiales a ciertos números para hacerlos más atractivos
    // Opciones: emoji, color (hex), label (texto corto), lucky (true/false para destacar)


    // Fecha y link del sorteo
    drawDate: "Domingo 01 de Marzo, 2026",
    liveDrawLink: "https://www.facebook.com/alejandro.guevara.624855/", // Link a tu live de IG/FB/YT

    // WhatsApp para contacto (incluye código de país, ej: 56912345678)
    whatsappNumber: "4623279187",
    whatsappMessage: "¡Hola Fernando! Me gustaría apartar estos números para la rifa: ",

    // Promoción (URL de tu página una vez la subas y QR)
    pageUrl: "sorteochilefernando.vercel.app",
    qrImage: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://sorteochilefernando.vercel.app",

    // Imagen de fondo (puedes poner un link a una foto tuya en Chile o un paisaje)
    backgroundImage: "https://images.unsplash.com/photo-1516108317508-6788f6a160e6?q=80&w=2000",

    // Lista de premios
    prizes: [
        {
            name: "Primer Premio: Moto- minicross",
            description: "Minicross dos tiempos completamente nueva.",
            image: "85c68164-d2c4-4287-8c30-c2e007d9c415.jpg"
        },
        {
            name: "Segundo Premio: Estereo Samsung MX-F850/ZX-1200W",
            description: "Equipo Samsung donde podras reprocuir tu música favorita y disfrutar con las luces led.",
            image: "WhatsApp Image 2026-01-25 at 9.36.32 PM.jpeg"
        },
        {
            name: "Tercer Premio: Pack Sorpresa",
            description: "Un set de perfume sorpresa.",
            image: "Captura de pantalla 2026-01-25 214256.png"
        }
    ]
};
