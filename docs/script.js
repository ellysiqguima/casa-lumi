document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
});

document.querySelectorAll(".optional-brand-image").forEach((image) => {
    const showImage = () => {
        image.hidden = false;
    };

    image.addEventListener("load", showImage);
    image.addEventListener("error", () => {
        image.hidden = true;
    }, { once: true });

    if (image.complete && image.naturalWidth > 0) showImage();
});

document.querySelectorAll("img[data-fallback]").forEach((image) => {
    const showFallback = () => {
        if (image.dataset.fallback && image.src !== image.dataset.fallback) {
            image.src = image.dataset.fallback;
        }
    };

    image.addEventListener("error", showFallback, { once: true });
    if (image.complete && image.naturalWidth === 0) showFallback();
});

document.querySelectorAll("[data-image-gallery]").forEach((gallery) => {
    const mainImage = gallery.querySelector("[data-gallery-image]");
    const thumbnails = [...gallery.querySelectorAll("[data-gallery-thumbnail]")];
    const counter = gallery.querySelector("[data-gallery-counter]");
    let activeIndex = 0;

    if (!mainImage || thumbnails.length === 0) return;

    function showImage(index) {
        activeIndex = (index + thumbnails.length) % thumbnails.length;
        const activeThumbnail = thumbnails[activeIndex];
        mainImage.src = activeThumbnail.dataset.src;
        mainImage.alt = activeThumbnail.dataset.alt || "Apartamento Deluxe";
        counter.textContent = `${activeIndex + 1} / ${thumbnails.length}`;

        thumbnails.forEach((thumbnail, thumbnailIndex) => {
            const isActive = thumbnailIndex === activeIndex;
            thumbnail.classList.toggle("is-active", isActive);
            if (isActive) thumbnail.setAttribute("aria-current", "true");
            else thumbnail.removeAttribute("aria-current");
        });
    }

    gallery.querySelector("[data-gallery-prev]")?.addEventListener("click", () => {
        showImage(activeIndex - 1);
    });
    gallery.querySelector("[data-gallery-next]")?.addEventListener("click", () => {
        showImage(activeIndex + 1);
    });
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", () => showImage(index));
    });

    gallery.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") showImage(activeIndex - 1);
        if (event.key === "ArrowRight") showImage(activeIndex + 1);
    });

    showImage(0);
});

const languageTranslations = {
    it: {
        "Sobre": "Chi siamo", "Quartos": "Camere", "Comodidades": "Servizi", "Contactos": "Contatti", "Contactar": "Contattaci",
        "Consultar disponibilidade": "Verifica disponibilita", "Conhecer a estadia": "Scopri la struttura", "Ver acomodações": "Vedi alloggi",
        "Ver comodidades": "Vedi i servizi", "Explore": "Esplora", "Encontre-nos": "Dove siamo", "A casa": "La casa",
        "Conforto e hospitalidade no coração de Lecce, Itália.": "Comfort e ospitalita nel cuore di Lecce, Italia.",
        "Morada": "Indirizzo", "Telefone": "Telefono", "Email": "Email", "Reservas": "Prenotazioni",
        "Dinheiro": "Contanti", "Pagamentos e animais": "Pagamenti e animali",
        "Não são admitidos animais de estimação.": "Non sono ammessi animali domestici.",
        "CAVOUR LUXURY ROOMS | LECCE, ITÁLIA": "CAVOUR LUXURY ROOMS | LECCE, ITALIA",
        "Um lugar especial para descobrir Lecce.": "Un luogo speciale per scoprire Lecce.",
        "Conforto para famílias, pequeno-almoço incluído e a hospitalidade do Salento.": "Comfort per famiglie, prima colazione inclusa e ospitalita nel Salento.",
        "CAVOUR LUXURY ROOMS | SALENTO": "CAVOUR LUXURY ROOMS | SALENTO",
        "Uma estadia confortável para aproveitar cada momento.": "Un soggiorno confortevole per vivere ogni momento.",
        "Em Lecce, no coração do Salento": "A Lecce, nel cuore del Salento",
        "Espaço para descansar, juntos.": "Spazio per riposare, insieme.",
        "O Apartamento Deluxe acomoda até 2 adultos e 2 crianças. O Quarto Queen Deluxe recebe até 3 pessoas e oferece vista para a cidade.": "L'Appartamento Deluxe ospita fino a 2 adulti e 2 bambini. La Camera Queen Deluxe ospita fino a 3 persone e offre vista sulla citta.",
        "Ambos contam com ar condicionado, casa de banho privativa, televisão de ecrã plano e Wi-Fi gratuito. O pequeno-almoço está incluído.": "Entrambi dispongono di aria condizionata, bagno privato, TV a schermo piatto e Wi-Fi gratuito. La prima colazione e inclusa.",
        "Lecce | História e identidade": "Lecce | Storia e identita",
        "Uma Joia Barroca no Coração do Salento": "Un gioiello barocco nel cuore del Salento",
        "Acomodações": "Alloggi", "Escolha a estadia ideal": "Scegli il soggiorno ideale", "Apartamento Deluxe": "Appartamento Deluxe", "Quarto Queen Deluxe": "Camera Queen Deluxe",
        "Tudo para uma estadia tranquila": "Tutto per un soggiorno tranquillo", "Pequeno-almoço incluído": "Prima colazione inclusa",
        "Comece o dia com o pequeno-almoço incluído na estadia.": "Inizia la giornata con la prima colazione inclusa nel soggiorno.",
        "Conforto e conveniência": "Comfort e comodita", "Ar condicionado, Wi-Fi gratuito, estacionamento e jardim.": "Aria condizionata, Wi-Fi gratuito, parcheggio e giardino.",
        "Para toda a família": "Per tutta la famiglia", "Quartos familiares e opções para diferentes tamanhos de grupo.": "Camere familiari e opzioni per gruppi di diverse dimensioni.",
        "Antes de chegar": "Prima dell'arrivo", "Perguntas frequentes": "Domande frequenti",
        "Que tipo de quarto posso reservar em Cavour Luxury Rooms?": "Che tipo di camera posso prenotare al Cavour Luxury Rooms?",
        "As opções de quarto em Cavour Luxury Rooms incluem:": "Le opzioni disponibili al Cavour Luxury Rooms includono:",
        "- Duplo": "- Matrimoniale",
        "- Apartamento": "- Appartamento",
        "Quais são os horários de check-in e check-out em Cavour Luxury Rooms?": "Quali sono gli orari di check-in e check-out al Cavour Luxury Rooms?",
        "Em Cavour Luxury Rooms, o check-in é a partir das 15:00 até as 21:00 e o check-out das 07:00 até às 10:00.": "Al Cavour Luxury Rooms, il check-in e dalle 15:00 alle 21:00 e il check-out dalle 07:00 alle 10:00.",
        "Quanto custa hospedar-se em Cavour Luxury Rooms?": "Quanto costa soggiornare al Cavour Luxury Rooms?",
        "Os valores em Cavour Luxury Rooms podem variar de acordo com os parâmetros da sua estadia": "Le tariffe al Cavour Luxury Rooms possono variare in base ai parametri del soggiorno",
        "(ex.: as datas que seleciona, as condições do hotel, entre outros). Insira as suas datas e consulte os valores.": "(ad es. le date selezionate, le condizioni dell'hotel e altro). Inserisci le date e consulta le tariffe.",
        "A que distância fica Cavour Luxury Rooms do centro de Lecce?": "Quanto dista il Cavour Luxury Rooms dal centro di Lecce?",
        "Cavour Luxury Rooms está localizado a 300 metros do centro de Lecce.": "Il Cavour Luxury Rooms si trova a 300 metri dal centro di Lecce.",
        "O alojamento tem estacionamento?": "La struttura dispone di parcheggio?",
        "Sim, há estacionamento disponível para os hóspedes.": "Si, e disponibile un parcheggio per gli ospiti.",
        "Informações importantes": "Informazioni importanti", "Regras essenciais": "Regole essenziali",
        "Cancelamento e pré-pagamento": "Cancellazione e pagamento anticipato", "Crianças e camas": "Bambini e letti",
        "Idade para check-in": "Eta per il check-in", "Não há restrições de idade para fazer check-in.": "Non ci sono limiti di eta per effettuare il check-in.",
        "Fumo, festas e repouso": "Fumo, feste e riposo", "Avaliação dos hóspedes": "Valutazione degli ospiti",
        "Uma classificação de destaque.": "Una valutazione eccellente.", "Nota no Booking.com": "Valutazione su Booking.com",
        "A CASA": "LA CASA", "Conforto e hospitalidade em Lecce.": "Comfort e ospitalita a Lecce.",
        "Uma estadia que acolhe toda a família": "Un soggiorno che accoglie tutta la famiglia",
        "Pequeno-almoço": "Prima colazione", "Estacionamento": "Parcheggio", "Em família": "In famiglia",
        "DUAS ACOMODAÇÕES": "DUE ALLOGGI", "Espaço para descansar e sentir-se em casa.": "Spazio per riposare e sentirsi a casa.",
        "Escolha a opção ideal para o seu grupo": "Scegli l'opzione ideale per il tuo gruppo",
        "CONFORTO INCLUÍDO": "COMFORT INCLUSO", "Os detalhes que tornam a estadia mais simples.": "I dettagli che rendono il soggiorno piu semplice.",
        "Comodidades do alojamento": "Servizi della struttura", "Conforto para aproveitar Lecce com tranquilidade.": "Comfort per godersi Lecce in tutta tranquillita.",
        "Estacionamento e jardim": "Parcheggio e giardino", "Conforto em todos os quartos": "Comfort in tutte le camere",
        "Incluído": "Incluso", "Gratuito": "Gratuito", "Contactar o alojamento": "Contatta la struttura",
        "CONTACTOS": "CONTATTI", "Estamos à sua disposição.": "Siamo a vostra disposizione.",
        "Planeie a sua visita diretamente com a propriedade.": "Organizza la tua visita direttamente con la struttura.",
        "Para consultar preços e disponibilidade, utilize o telefone ou email do alojamento.": "Per consultare prezzi e disponibilita, usa il telefono o l'email della struttura.",
        "Abrir morada no mapa": "Apri l'indirizzo sulla mappa",
        "Acomodações | Cavour Luxury Rooms, Lecce": "Alloggi | Cavour Luxury Rooms, Lecce",
        "A casa | Cavour Luxury Rooms, Lecce": "La casa | Cavour Luxury Rooms, Lecce",
        "Comodidades | Cavour Luxury Rooms, Lecce": "Servizi | Cavour Luxury Rooms, Lecce",
        "Contactos | Cavour Luxury Rooms, Lecce": "Contatti | Cavour Luxury Rooms, Lecce"
    },
    en: {
        "Sobre": "About", "Quartos": "Rooms", "Comodidades": "Amenities", "Contactos": "Contact", "Contactar": "Contact us",
        "Consultar disponibilidade": "Check availability", "Conhecer a estadia": "Discover the stay", "Ver acomodações": "View rooms",
        "Ver comodidades": "View amenities", "Explore": "Explore", "Encontre-nos": "Find us", "A casa": "The house",
        "Conforto e hospitalidade no coração de Lecce, Itália.": "Comfort and hospitality in the heart of Lecce, Italy.",
        "Morada": "Address", "Telefone": "Phone", "Email": "Email", "Reservas": "Reservations",
        "Dinheiro": "Cash", "Pagamentos e animais": "Payments and pets",
        "Não são admitidos animais de estimação.": "Pets are not allowed.",
        "CAVOUR LUXURY ROOMS | LECCE, ITÁLIA": "CAVOUR LUXURY ROOMS | LECCE, ITALY",
        "Um lugar especial para descobrir Lecce.": "A special place to discover Lecce.",
        "Conforto para famílias, pequeno-almoço incluído e a hospitalidade do Salento.": "Comfort for families, breakfast included and the hospitality of Salento.",
        "CAVOUR LUXURY ROOMS | SALENTO": "CAVOUR LUXURY ROOMS | SALENTO",
        "Uma estadia confortável para aproveitar cada momento.": "A comfortable stay to enjoy every moment.",
        "Em Lecce, no coração do Salento": "In Lecce, in the heart of Salento",
        "Espaço para descansar, juntos.": "Space to rest, together.",
        "O Apartamento Deluxe acomoda até 2 adultos e 2 crianças. O Quarto Queen Deluxe recebe até 3 pessoas e oferece vista para a cidade.": "The Deluxe Apartment accommodates up to 2 adults and 2 children. The Deluxe Queen Room accommodates up to 3 people and has a city view.",
        "Ambos contam com ar condicionado, casa de banho privativa, televisão de ecrã plano e Wi-Fi gratuito. O pequeno-almoço está incluído.": "Both have air conditioning, a private bathroom, flat-screen TV and free Wi-Fi. Breakfast is included.",
        "Lecce | História e identidade": "Lecce | History and identity", "Uma Joia Barroca no Coração do Salento": "A Baroque Gem in the Heart of Salento",
        "Acomodações": "Rooms", "Escolha a estadia ideal": "Choose the ideal stay", "Apartamento Deluxe": "Deluxe Apartment", "Quarto Queen Deluxe": "Deluxe Queen Room",
        "Tudo para uma estadia tranquila": "Everything for a relaxing stay", "Pequeno-almoço incluído": "Breakfast included",
        "Comece o dia com o pequeno-almoço incluído na estadia.": "Start the day with breakfast included in your stay.",
        "Conforto e conveniência": "Comfort and convenience", "Ar condicionado, Wi-Fi gratuito, estacionamento e jardim.": "Air conditioning, free Wi-Fi, parking and garden.",
        "Para toda a família": "For the whole family", "Quartos familiares e opções para diferentes tamanhos de grupo.": "Family rooms and options for different group sizes.",
        "Antes de chegar": "Before arrival", "Perguntas frequentes": "Frequently asked questions",
        "Que tipo de quarto posso reservar em Cavour Luxury Rooms?": "What type of room can I book at Cavour Luxury Rooms?",
        "As opções de quarto em Cavour Luxury Rooms incluem:": "The room options at Cavour Luxury Rooms include:",
        "- Duplo": "- Double",
        "- Apartamento": "- Apartment",
        "Quais são os horários de check-in e check-out em Cavour Luxury Rooms?": "What are the check-in and check-out times at Cavour Luxury Rooms?",
        "Em Cavour Luxury Rooms, o check-in é a partir das 15:00 até as 21:00 e o check-out das 07:00 até às 10:00.": "At Cavour Luxury Rooms, check-in is from 15:00 to 21:00 and check-out is from 07:00 to 10:00.",
        "Quanto custa hospedar-se em Cavour Luxury Rooms?": "How much does it cost to stay at Cavour Luxury Rooms?",
        "Os valores em Cavour Luxury Rooms podem variar de acordo com os parâmetros da sua estadia": "Rates at Cavour Luxury Rooms may vary according to your stay parameters",
        "(ex.: as datas que seleciona, as condições do hotel, entre outros). Insira as suas datas e consulte os valores.": "(e.g. the dates you select, hotel conditions and other factors). Enter your dates to view the rates.",
        "A que distância fica Cavour Luxury Rooms do centro de Lecce?": "How far is Cavour Luxury Rooms from Lecce city centre?",
        "Cavour Luxury Rooms está localizado a 300 metros do centro de Lecce.": "Cavour Luxury Rooms is located 300 metres from Lecce city centre.",
        "O alojamento tem estacionamento?": "Does the property have parking?",
        "Sim, há estacionamento disponível para os hóspedes.": "Yes, parking is available for guests.",
        "Informações importantes": "Important information", "Regras essenciais": "Essential rules",
        "Cancelamento e pré-pagamento": "Cancellation and prepayment", "Crianças e camas": "Children and beds",
        "Idade para check-in": "Check-in age", "Não há restrições de idade para fazer check-in.": "There are no age restrictions for check-in.",
        "Fumo, festas e repouso": "Smoking, parties and quiet hours", "Avaliação dos hóspedes": "Guest rating",
        "Uma classificação de destaque.": "An outstanding rating.", "Nota no Booking.com": "Booking.com rating",
        "A CASA": "THE HOUSE", "Conforto e hospitalidade em Lecce.": "Comfort and hospitality in Lecce.",
        "Uma estadia que acolhe toda a família": "A stay that welcomes the whole family",
        "Pequeno-almoço": "Breakfast", "Estacionamento": "Parking", "Em família": "For families",
        "DUAS ACOMODAÇÕES": "TWO ACCOMMODATIONS", "Espaço para descansar e sentir-se em casa.": "Space to rest and feel at home.",
        "Escolha a opção ideal para o seu grupo": "Choose the ideal option for your group",
        "CONFORTO INCLUÍDO": "COMFORT INCLUDED", "Os detalhes que tornam a estadia mais simples.": "The details that make your stay easier.",
        "Comodidades do alojamento": "Property amenities", "Conforto para aproveitar Lecce com tranquilidade.": "Comfort to enjoy Lecce in complete tranquility.",
        "Estacionamento e jardim": "Parking and garden", "Conforto em todos os quartos": "Comfort in every room",
        "Incluído": "Included", "Gratuito": "Free", "Contactar o alojamento": "Contact the property",
        "CONTACTOS": "CONTACT", "Estamos à sua disposição.": "We are at your disposal.",
        "Planeie a sua visita diretamente com a propriedade.": "Plan your visit directly with the property.",
        "Para consultar preços e disponibilidade, utilize o telefone ou email do alojamento.": "For prices and availability, please use the property's phone or email.",
        "Abrir morada no mapa": "Open address in map",
        "Acomodações | Cavour Luxury Rooms, Lecce": "Rooms | Cavour Luxury Rooms, Lecce",
        "A casa | Cavour Luxury Rooms, Lecce": "The house | Cavour Luxury Rooms, Lecce",
        "Comodidades | Cavour Luxury Rooms, Lecce": "Amenities | Cavour Luxury Rooms, Lecce",
        "Contactos | Cavour Luxury Rooms, Lecce": "Contact | Cavour Luxury Rooms, Lecce"
    },
    es: {
        "Sobre": "Sobre nosotros", "Quartos": "Habitaciones", "Comodidades": "Servicios", "Contactos": "Contactos", "Contactar": "Contactar",
        "Consultar disponibilidade": "Consultar disponibilidad", "Conhecer a estadia": "Conocer la estancia", "Ver acomodações": "Ver alojamientos",
        "Ver comodidades": "Ver servicios", "Explore": "Explorar", "Encontre-nos": "Encuentranos", "A casa": "La casa",
        "Conforto e hospitalidade no coração de Lecce, Itália.": "Comodidad y hospitalidad en el corazón de Lecce, Italia.",
        "Morada": "Direccion", "Telefone": "Telefono", "Email": "Correo electronico", "Reservas": "Reservas",
        "Dinheiro": "Dinero", "Pagamentos e animais": "Pagos y animales",
        "Não são admitidos animais de estimação.": "No se admiten animales.",
        "CAVOUR LUXURY ROOMS | LECCE, ITÁLIA": "CAVOUR LUXURY ROOMS | LECCE, ITALIA",
        "Um lugar especial para descobrir Lecce.": "Un lugar especial para descubrir Lecce.",
        "Conforto para famílias, pequeno-almoço incluído e a hospitalidade do Salento.": "Comodidad para familias, desayuno incluido y hospitalidad del Salento.",
        "CAVOUR LUXURY ROOMS | SALENTO": "CAVOUR LUXURY ROOMS | SALENTO",
        "Uma estadia confortável para aproveitar cada momento.": "Una estancia comoda para disfrutar cada momento.",
        "Em Lecce, no coração do Salento": "En Lecce, en el corazón del Salento",
        "Espaço para descansar, juntos.": "Espacio para descansar, juntos.",
        "O Apartamento Deluxe acomoda até 2 adultos e 2 crianças. O Quarto Queen Deluxe recebe até 3 pessoas e oferece vista para a cidade.": "El Apartamento Deluxe ofrece alojamiento para hasta 2 adultos y 2 niños. La Habitación Queen Deluxe admite hasta 3 personas y ofrece vistas a la ciudad.",
        "Ambos contam com ar condicionado, casa de banho privativa, televisão de ecrã plano e Wi-Fi gratuito. O pequeno-almoço está incluído.": "Ambos cuentan con aire acondicionado, baño privado, television de pantalla plana y Wi-Fi gratuito. El desayuno esta incluido.",
        "Lecce | História e identidade": "Lecce | Historia e identidad", "Uma Joia Barroca no Coração do Salento": "Una joya barroca en el corazón del Salento",
        "Acomodações": "Alojamientos", "Escolha a estadia ideal": "Elija la estancia ideal", "Apartamento Deluxe": "Apartamento Deluxe", "Quarto Queen Deluxe": "Habitacion Queen Deluxe",
        "Tudo para uma estadia tranquila": "Todo para una estancia tranquila", "Pequeno-almoço incluído": "Desayuno incluido",
        "Comece o dia com o pequeno-almoço incluído na estadia.": "Empiece el dia con el desayuno incluido en la estancia.",
        "Conforto e conveniência": "Comodidad y conveniencia", "Ar condicionado, Wi-Fi gratuito, estacionamento e jardim.": "Aire acondicionado, Wi-Fi gratuito, aparcamiento y jardin.",
        "Para toda a família": "Para toda la familia", "Quartos familiares e opções para diferentes tamanhos de grupo.": "Habitaciones familiares y opciones para grupos de distintos tamanos.",
        "Antes de chegar": "Antes de llegar", "Perguntas frequentes": "Preguntas frecuentes",
        "Que tipo de quarto posso reservar em Cavour Luxury Rooms?": "¿Qué tipo de habitación puedo reservar en Cavour Luxury Rooms?",
        "As opções de quarto em Cavour Luxury Rooms incluem:": "Las opciones de habitación en Cavour Luxury Rooms incluyen:",
        "- Duplo": "- Doble",
        "- Apartamento": "- Apartamento",
        "Quais são os horários de check-in e check-out em Cavour Luxury Rooms?": "¿Cuáles son los horarios de entrada y salida en Cavour Luxury Rooms?",
        "Em Cavour Luxury Rooms, o check-in é a partir das 15:00 até as 21:00 e o check-out das 07:00 até às 10:00.": "En Cavour Luxury Rooms, la entrada es desde las 15:00 hasta las 21:00 y la salida desde las 07:00 hasta las 10:00.",
        "Quanto custa hospedar-se em Cavour Luxury Rooms?": "¿Cuánto cuesta alojarse en Cavour Luxury Rooms?",
        "Os valores em Cavour Luxury Rooms podem variar de acordo com os parâmetros da sua estadia": "Las tarifas de Cavour Luxury Rooms pueden variar según los parámetros de su estancia",
        "(ex.: as datas que seleciona, as condições do hotel, entre outros). Insira as suas datas e consulte os valores.": "(por ejemplo, las fechas seleccionadas, las condiciones del hotel y otros factores). Introduzca sus fechas y consulte las tarifas.",
        "A que distância fica Cavour Luxury Rooms do centro de Lecce?": "¿A qué distancia está Cavour Luxury Rooms del centro de Lecce?",
        "Cavour Luxury Rooms está localizado a 300 metros do centro de Lecce.": "Cavour Luxury Rooms está situado a 300 metros del centro de Lecce.",
        "O alojamento tem estacionamento?": "¿El alojamiento dispone de aparcamiento?",
        "Sim, há estacionamento disponível para os hóspedes.": "Sí, hay aparcamiento disponible para los huéspedes.",
        "Informações importantes": "Informacion importante", "Regras essenciais": "Normas esenciales",
        "Cancelamento e pré-pagamento": "Cancelacion y prepago", "Crianças e camas": "Niños y camas",
        "Idade para check-in": "Edad para el check-in", "Não há restrições de idade para fazer check-in.": "No hay restricciones de edad para realizar el check-in.",
        "Fumo, festas e repouso": "Fumar, fiestas y descanso", "Avaliação dos hóspedes": "Valoracion de los huespedes",
        "Uma classificação de destaque.": "Una valoración destacada.", "Nota no Booking.com": "Puntuacion en Booking.com",
        "A CASA": "LA CASA", "Conforto e hospitalidade em Lecce.": "Comodidad y hospitalidad en Lecce.",
        "Uma estadia que acolhe toda a família": "Una estancia que da la bienvenida a toda la familia",
        "Pequeno-almoço": "Desayuno", "Estacionamento": "Aparcamiento", "Em família": "En familia",
        "DUAS ACOMODAÇÕES": "DOS ALOJAMIENTOS", "Espaço para descansar e sentir-se em casa.": "Espacio para descansar y sentirse como en casa.",
        "Escolha a opção ideal para o seu grupo": "Elija la opcion ideal para su grupo",
        "CONFORTO INCLUÍDO": "COMODIDAD INCLUIDA", "Os detalhes que tornam a estadia mais simples.": "Los detalles que hacen la estancia mas sencilla.",
        "Comodidades do alojamento": "Servicios del alojamiento", "Conforto para aproveitar Lecce com tranquilidade.": "Comodidad para disfrutar Lecce con tranquilidad.",
        "Estacionamento e jardim": "Aparcamiento y jardin", "Conforto em todos os quartos": "Comodidad en todas las habitaciones",
        "Incluído": "Incluido", "Gratuito": "Gratis", "Contactar o alojamento": "Contactar con el alojamiento",
        "CONTACTOS": "CONTACTOS", "Estamos à sua disposição.": "Estamos a su disposicion.",
        "Planeie a sua visita diretamente com a propriedade.": "Planifique su visita directamente con el alojamiento.",
        "Para consultar preços e disponibilidade, utilize o telefone ou email do alojamento.": "Para consultar precios y disponibilidad, utilice el telefono o el correo del alojamiento.",
        "Abrir morada no mapa": "Abrir direccion en el mapa",
        "Acomodações | Cavour Luxury Rooms, Lecce": "Alojamientos | Cavour Luxury Rooms, Lecce",
        "A casa | Cavour Luxury Rooms, Lecce": "La casa | Cavour Luxury Rooms, Lecce",
        "Comodidades | Cavour Luxury Rooms, Lecce": "Servicios | Cavour Luxury Rooms, Lecce",
        "Contactos | Cavour Luxury Rooms, Lecce": "Contactos | Cavour Luxury Rooms, Lecce"
    }
};

const textNodes = [];
const originalTextNodes = new WeakMap();
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (walker.nextNode()) {
    const text = walker.currentNode;
    if (!text.textContent.trim()) continue;
    if (text.parentElement?.closest("script, style, option")) continue;
    textNodes.push(text);
    originalTextNodes.set(text, text.textContent.trim());
}

function applyLanguage(language) {
    const translations = languageTranslations[language] || {};
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const original = element.dataset.i18n;
        element.textContent = language === "pt" ? original : (translations[original] || original);
    });

    textNodes.forEach((text) => {
        const original = originalTextNodes.get(text);
        text.textContent = language === "pt" ? original : (translations[original] || original);
    });

    document.documentElement.lang = language;
    const titleOriginal = document.title;
    const titleKey = document.querySelector("body")?.dataset.originalTitle;
    if (!titleKey) document.querySelector("body").dataset.originalTitle = titleOriginal;
    const originalTitle = document.querySelector("body").dataset.originalTitle;
    document.title = language === "pt" ? originalTitle : (translations[originalTitle] || originalTitle);

    const languageSelect = document.querySelector("#language-select");
    if (languageSelect) {
        languageSelect.value = language;
        languageSelect.setAttribute("aria-label", {
            pt: "Selecionar idioma", it: "Seleziona lingua", en: "Select language", es: "Seleccionar idioma"
        }[language]);
    }
}

const languageSelect = document.querySelector("#language-select");
if (languageSelect) {
    const validLanguages = ["pt", "it", "en", "es"];
    const savedLanguage = localStorage.getItem("cavour-language");
    const browserLanguage = document.documentElement.lang || "pt";
    const initialLanguage = validLanguages.includes(savedLanguage) ? savedLanguage : browserLanguage;

    applyLanguage(initialLanguage);
    languageSelect.addEventListener("change", (event) => {
        const language = event.target.value;
        if (!validLanguages.includes(language)) return;
        localStorage.setItem("cavour-language", language);
        applyLanguage(language);
    });
}
