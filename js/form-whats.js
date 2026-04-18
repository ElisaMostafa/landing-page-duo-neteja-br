document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-contato");

    if (!form) {
        console.error("Formulário não encontrado");
        return;
    }

    const nomeInput = document.getElementById("nombre");
    const telefoneInput = document.getElementById("telefono");
    const mensagemInput = document.getElementById("mensaje");
    const servicoSelect = document.getElementById("servicio");
    const btn = form.querySelector(".form-submit");

    // =========================
    // LIMITES DE DÍGITOS POR PAÍS
    // =========================

    const phoneLimits = {
        es: 9,   // Espanha
        br: 11,  // Brasil (com DDD)
        pt: 9,   // Portugal
        fr: 10,  // França
        de: 11,  // Alemanha
        it: 10,  // Itália
        gb: 10,  // Reino Unido
        us: 10,  // EUA
        ar: 10,  // Argentina
        mx: 10,  // México
        co: 10,  // Colômbia
        cl: 9,   // Chile
        pe: 9,   // Peru
        uy: 8,   // Uruguai
    };

    const DEFAULT_LIMIT = 15;

    function applyPhoneLimit(itiInstance) {
        const iso2 = itiInstance.getSelectedCountryData().iso2 || "";
        const limit = phoneLimits[iso2] ?? DEFAULT_LIMIT;
        telefoneInput.maxLength = limit;
        if (telefoneInput.value.length > limit) {
            telefoneInput.value = telefoneInput.value.slice(0, limit);
        }
    }

    // =========================
    // INTL TEL INPUT
    // =========================

    let iti;

    if (typeof window.intlTelInput !== "undefined") {
        iti = window.intlTelInput(telefoneInput, {
            initialCountry: "es",
            preferredCountries: ["es"],
            separateDialCode: true,
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js"
        });

        applyPhoneLimit(iti);

        telefoneInput.addEventListener("countrychange", () => {
            applyPhoneLimit(iti);
        });
    } else {
        console.warn("intl-tel-input não carregou");
        telefoneInput.maxLength = DEFAULT_LIMIT;
    }

    // =========================
    // NOME (somente letras)
    // =========================

    nomeInput.addEventListener("input", () => {
        let value = nomeInput.value.replace(/[^A-Za-zÀ-ÿ\s]/g, "").slice(0, 20);
        nomeInput.value = value;
    });

    // =========================
    // MENSAGEM
    // =========================

    mensagemInput.addEventListener("input", () => {
        let value = mensagemInput.value.replace(/[<>]/g, "").slice(0, 300);
        mensagemInput.value = value;
    });

    // =========================
    // TELEFONE (somente números)
    // =========================

    telefoneInput.addEventListener("input", () => {
        telefoneInput.value = telefoneInput.value.replace(/\D/g, "");
    });

    // =========================
    // SUBMIT
    // =========================

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = nomeInput.value.trim();
        const mensagem = mensagemInput.value.trim();
        const servicoTexto = servicoSelect.options[servicoSelect.selectedIndex]?.text;

        let telefoneCompleto = "";
        let telefoneValido = false;

        if (iti) {
            telefoneCompleto = iti.getNumber();
            telefoneValido = iti.isValidNumber();
        } else {
            telefoneCompleto = telefoneInput.value.trim();
            telefoneValido = telefoneCompleto.length > 0;
        }

        if (!nome || !telefoneCompleto || !servicoSelect.value) {
            alert("Por favor, completa los campos obligatorios.");
            return;
        }

        if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nome)) {
            alert("Nombre inválido.");
            return;
        }

        if (!telefoneValido) {
            alert("Teléfono inválido.");
            return;
        }

        if (mensagem.length > 300) {
            alert("Mensaje demasiado largo.");
            return;
        }

        const texto = `Hola, me gustaría solicitar un servicio:

Nombre: ${nome}
Teléfono: ${telefoneCompleto}
Servicio: ${servicoTexto}
Mensaje: ${mensagem || "No informado"}`;

        const numero = "+34691836955";
        const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

        btn.disabled = true;
        btn.textContent = "Redirigiendo...";

        window.open(url, "_blank");

        setTimeout(() => {
            btn.disabled = false;
            btn.textContent = "Enviar mensaje";
            form.reset();
            if (iti) iti.setCountry("es");
        }, 2000);
    });
});