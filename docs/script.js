console.log("Bem-vindo à ITALY LUMI HOUSE!");

const roomRates = {
    oliveiras: 195,
    jardim: 220,
    lumi: 310,
    terraco: 350,
    familia: 420,
    villa: 480
};

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    const entrada = contactForm.querySelector("#entrada");
    const saida = contactForm.querySelector("#saida");
    const quarto = contactForm.querySelector("#quarto");
    const hospedes = contactForm.querySelector("#hospedes");
    const experiencia = contactForm.querySelector("#experiencia");
    const pagamento = contactForm.querySelector("#pagamento");
    const parcelamento = contactForm.querySelector("#parcelamento");
    const resumo = contactForm.querySelector("#resumo-estimado");

    function formatEuro(value) {
        return new Intl.NumberFormat("pt-PT", {
            style: "currency",
            currency: "EUR"
        }).format(value);
    }

    function getNights() {
        if (!entrada.value || !saida.value) return 0;
        const [inYear, inMonth, inDay] = entrada.value.split("-").map(Number);
        const [outYear, outMonth, outDay] = saida.value.split("-").map(Number);
        const checkIn = Date.UTC(inYear, inMonth - 1, inDay);
        const checkOut = Date.UTC(outYear, outMonth - 1, outDay);
        return Math.round((checkOut - checkIn) / 86400000);
    }

    function updateEstimate() {
        if (!entrada || !saida || !quarto || !resumo) return;

        const selectedRoom = quarto.selectedOptions[0];
        const availability = selectedRoom.dataset.status || "Consultar disponibilidade";
        const statusClass = availability === "Indisponivel"
            ? "unavailable"
            : availability === "Ultimos quartos"
                ? "limited"
                : "";
        const nights = getNights();

        if (!entrada.value || !saida.value) {
            resumo.innerHTML = `<p class="availability-status ${statusClass}">${availability}</p><p>Selecione entrada e saída para calcular o valor estimado.</p>`;
            return;
        }

        if (nights <= 0) {
            resumo.innerHTML = `<p class="availability-status ${statusClass}">${availability}</p><p>A saída deve ser pelo menos um dia depois da entrada.</p>`;
            return;
        }

        const roomTotal = (roomRates[quarto.value] || 0) * nights;
        const guestCount = hospedes ? Number.parseInt(hospedes.value, 10) || 1 : 1;
        const selectedExperience = experiencia && experiencia.selectedOptions[0];
        const experiencePrice = selectedExperience
            ? Number(selectedExperience.dataset.price) || 0
            : 0;
        const experienceTotal = selectedExperience && selectedExperience.value === "piquenique"
            ? experiencePrice
            : experiencePrice * guestCount;
        const total = roomTotal + experienceTotal;

        const isCredit = pagamento && pagamento.value === "credito";
        if (parcelamento) parcelamento.disabled = !isCredit;
        const installments = isCredit && parcelamento ? Number(parcelamento.value) || 1 : 1;
        const downPayment = installments > 1 ? total * 0.2 : 0;
        const balance = total - downPayment;
        const paymentText = installments > 1
            ? `Entrada ${formatEuro(downPayment)} + ${installments}x ${formatEuro(balance / installments)}`
            : isCredit
                ? "Pagamento integral no cartão de crédito"
                : "Pagamento no cartão de débito";

        resumo.innerHTML = `
            <div class="estimate-grid">
                <div class="estimate-row"><span>Disponibilidade</span><strong class="availability-status ${statusClass}">${availability}</strong></div>
                <div class="estimate-row"><span>Estadia</span><strong>${nights} noite${nights === 1 ? "" : "s"}</strong></div>
                <div class="estimate-row"><span>Quarto</span><strong>${formatEuro(roomTotal)}</strong></div>
                <div class="estimate-row"><span>Experiências</span><strong>${formatEuro(experienceTotal)}</strong></div>
                <div class="estimate-row estimate-total"><span>Valor estimado</span><strong>${formatEuro(total)}</strong></div>
                <div class="estimate-row"><span>Pagamento</span><strong>${paymentText}</strong></div>
            </div>
        `;
    }

    if (entrada && saida) {
        const today = new Date();
        const toIsoDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        };

        entrada.min = toIsoDate(today);
        saida.min = toIsoDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1));

        const updateExitMinimum = () => {
            if (entrada.value) {
                const [year, month, day] = entrada.value.split("-").map(Number);
                saida.min = toIsoDate(new Date(year, month - 1, day + 1));
                if (saida.value && getNights() <= 0) saida.value = "";
            }
            updateEstimate();
        };

        entrada.addEventListener("input", updateExitMinimum);
        entrada.addEventListener("change", updateExitMinimum);
        saida.addEventListener("input", updateEstimate);
        saida.addEventListener("change", updateEstimate);
    }

    [quarto, hospedes, experiencia, pagamento, parcelamento].forEach((field) => {
        if (field) field.addEventListener("change", updateEstimate);
    });

    updateEstimate();

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const selectedRoom = quarto && quarto.selectedOptions[0];
        const button = contactForm.querySelector("button");

        if (selectedRoom && selectedRoom.dataset.status === "Indisponivel") {
            button.textContent = "Escolha outro quarto";
            button.disabled = true;
            setTimeout(function () {
                button.textContent = "Enviar pedido";
                button.disabled = false;
            }, 3000);
            return;
        }

        button.textContent = "Pedido enviado";
        button.disabled = true;
        setTimeout(function () {
            contactForm.reset();
            if (parcelamento) parcelamento.disabled = true;
            updateEstimate();
            button.textContent = "Enviar pedido";
            button.disabled = false;
        }, 3000);
    });
}
