"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("leadForm");
  if (!form) {
    return;
  }

  const fields = {
    companyName: { element: document.getElementById("companyName"), error: document.getElementById("companyNameError") },
    contactPerson: { element: document.getElementById("contactPerson"), error: document.getElementById("contactPersonError") },
    corporateEmail: { element: document.getElementById("corporateEmail"), error: document.getElementById("corporateEmailError") },
    phone: { element: document.getElementById("phone"), error: document.getElementById("phoneError") },
    companyWebsite: { element: document.getElementById("companyWebsite"), error: document.getElementById("companyWebsiteError") },
    operationCountry: { element: document.getElementById("operationCountry"), error: document.getElementById("operationCountryError") },
    productType: { element: document.getElementById("productType"), error: document.getElementById("productTypeError") },
    monthlyVolume: { element: document.getElementById("monthlyVolume"), error: document.getElementById("monthlyVolumeError") },
    comments: { element: document.getElementById("comments"), error: document.getElementById("commentsError") },
    privacyPolicy: { element: document.getElementById("privacyPolicy"), error: document.getElementById("privacyPolicyError") }
  };

  const services = Array.from(form.querySelectorAll('input[name="services"]'));
  const current3pl = Array.from(form.querySelectorAll('input[name="current3pl"]'));
  const servicesError = document.getElementById("servicesError");
  const current3plError = document.getElementById("current3plError");
  const commentsCounter = document.getElementById("commentsCounter");
  const successMessage = document.getElementById("successMessage");
  const volumeWarning = document.getElementById("volumeWarning");

  function setFieldError(key, message) {
    const field = fields[key];
    if (!field || !field.element || !field.error) {
      return;
    }
    field.error.textContent = message;
    field.element.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function setGroupError(nodes, errorNode, message) {
    if (errorNode) {
      errorNode.textContent = message;
    }
    nodes.forEach(function (node) {
      node.setAttribute("aria-invalid", message ? "true" : "false");
    });
  }

  function valueOf(key) {
    const field = fields[key];
    return field && field.element ? field.element.value.trim() : "";
  }

  function validateCompanyName() {
    const message = valueOf("companyName").length >= 2 ? "" : "El nombre de la empresa debe tener al menos 2 caracteres";
    setFieldError("companyName", message);
    return message;
  }

  function validateContactPerson() {
    const words = valueOf("contactPerson").split(/\s+/).filter(Boolean);
    const message = words.length >= 2 ? "" : "Ingresa nombre y apellido del contacto";
    setFieldError("contactPerson", message);
    return message;
  }

  function validateCorporateEmail() {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valueOf("corporateEmail"));
    const message = ok ? "" : "Ingresa un email corporativo válido (ejemplo: <nombre@empresa.com>)";
    setFieldError("corporateEmail", message);
    return message;
  }

  function validatePhone() {
    const ok = /^\+[0-9][0-9\s-]*$/.test(valueOf("phone"));
    const message = ok ? "" : "El teléfono debe incluir código de país (ejemplo: +1 213 555 0147)";
    setFieldError("phone", message);
    return message;
  }

  function validateCompanyWebsite() {
    const value = valueOf("companyWebsite");
    const message = value === "" || /^https?:\/\/.+/i.test(value) ? "" : "Si incluyes sitio web, debe ser una URL válida";
    setFieldError("companyWebsite", message);
    return message;
  }

  function validateOperationCountry() {
    const message = valueOf("operationCountry") ? "" : "Selecciona el país de operación principal";
    setFieldError("operationCountry", message);
    return message;
  }

  function validateProductType() {
    const message = valueOf("productType") ? "" : "Selecciona el tipo de producto que manejas";
    setFieldError("productType", message);
    return message;
  }

  function validateMonthlyVolume() {
    const message = valueOf("monthlyVolume") ? "" : "Selecciona el volumen mensual estimado";
    setFieldError("monthlyVolume", message);
    return message;
  }

  function validateServices() {
    const selected = services.some(function (item) {
      return item.checked;
    });
    const message = selected ? "" : "Selecciona al menos un servicio de interés";
    setGroupError(services, servicesError, message);
    return message;
  }

  function validateCurrent3pl() {
    const selected = current3pl.some(function (item) {
      return item.checked;
    });
    const message = selected ? "" : "Indica si actualmente trabajas con otro proveedor logístico";
    setGroupError(current3pl, current3plError, message);
    return message;
  }

  function validateComments() {
    const length = fields.comments.element.value.length;
    const remaining = 500 - length;
    const message = remaining >= 0 ? "" : "Los comentarios no pueden exceder 500 caracteres (quedan " + String(remaining) + ")";
    setFieldError("comments", message);
    return message;
  }

  function validatePrivacyPolicy() {
    const message = fields.privacyPolicy.element.checked ? "" : "Debes aceptar la política de privacidad para continuar";
    setFieldError("privacyPolicy", message);
    return message;
  }

  function updateCommentsCounter() {
    const remaining = 500 - fields.comments.element.value.length;
    commentsCounter.textContent = String(remaining) + " caracteres disponibles";
  }

  function updateVolumeWarning() {
    const monthly = valueOf("monthlyVolume");
    const type = valueOf("productType");

    if (monthly === "0-100" && type !== "") {
      volumeWarning.textContent = "Para volúmenes menores a 100 envíos mensuales, nuestros servicios podrían no ser la solución más eficiente. ¿Seguro que quieres continuar?";
      volumeWarning.classList.remove("hidden");
      return;
    }

    volumeWarning.textContent = "";
    volumeWarning.classList.add("hidden");
  }

  function hideSuccessMessage() {
    successMessage.classList.add("hidden");
  }

  function showSuccessMessage() {
    successMessage.classList.remove("hidden");
  }

  function validateAll() {
    const checks = [
      { validate: validateCompanyName, focus: fields.companyName.element },
      { validate: validateContactPerson, focus: fields.contactPerson.element },
      { validate: validateCorporateEmail, focus: fields.corporateEmail.element },
      { validate: validatePhone, focus: fields.phone.element },
      { validate: validateCompanyWebsite, focus: fields.companyWebsite.element },
      { validate: validateOperationCountry, focus: fields.operationCountry.element },
      { validate: validateProductType, focus: fields.productType.element },
      { validate: validateMonthlyVolume, focus: fields.monthlyVolume.element },
      { validate: validateServices, focus: services[0] || null },
      { validate: validateCurrent3pl, focus: current3pl[0] || null },
      { validate: validateComments, focus: fields.comments.element },
      { validate: validatePrivacyPolicy, focus: fields.privacyPolicy.element }
    ];

    let firstErrorElement = null;
    let hasError = false;

    checks.forEach(function (check) {
      const message = check.validate();
      if (message && !firstErrorElement) {
        firstErrorElement = check.focus;
      }
      if (message) {
        hasError = true;
      }
    });

    updateVolumeWarning();

    return { hasError: hasError, firstErrorElement: firstErrorElement };
  }

  fields.companyName.element.addEventListener("input", function () { hideSuccessMessage(); validateCompanyName(); });
  fields.contactPerson.element.addEventListener("input", function () { hideSuccessMessage(); validateContactPerson(); });
  fields.corporateEmail.element.addEventListener("input", function () { hideSuccessMessage(); validateCorporateEmail(); });
  fields.phone.element.addEventListener("input", function () { hideSuccessMessage(); validatePhone(); });
  fields.companyWebsite.element.addEventListener("input", function () { hideSuccessMessage(); validateCompanyWebsite(); });
  fields.operationCountry.element.addEventListener("change", function () { hideSuccessMessage(); validateOperationCountry(); });
  fields.productType.element.addEventListener("change", function () { hideSuccessMessage(); validateProductType(); updateVolumeWarning(); });
  fields.monthlyVolume.element.addEventListener("change", function () { hideSuccessMessage(); validateMonthlyVolume(); updateVolumeWarning(); });
  fields.comments.element.addEventListener("input", function () { hideSuccessMessage(); validateComments(); updateCommentsCounter(); });
  fields.privacyPolicy.element.addEventListener("change", function () { hideSuccessMessage(); validatePrivacyPolicy(); });

  services.forEach(function (item) {
    item.addEventListener("change", function () { hideSuccessMessage(); validateServices(); });
  });

  current3pl.forEach(function (item) {
    item.addEventListener("change", function () { hideSuccessMessage(); validateCurrent3pl(); });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const result = validateAll();

    if (result.hasError) {
      hideSuccessMessage();
      if (result.firstErrorElement) {
        result.firstErrorElement.focus();
      }
      return;
    }

    showSuccessMessage();
  });

  form.addEventListener("reset", function () {
    setTimeout(function () {
      Object.keys(fields).forEach(function (key) {
        setFieldError(key, "");
      });
      setGroupError(services, servicesError, "");
      setGroupError(current3pl, current3plError, "");
      hideSuccessMessage();
      volumeWarning.textContent = "";
      volumeWarning.classList.add("hidden");
      commentsCounter.textContent = "500 caracteres disponibles";
    }, 0);
  });

  updateCommentsCounter();
  updateVolumeWarning();
});
