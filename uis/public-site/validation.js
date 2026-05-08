"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("leadForm");
  if (!form) {
    return;
  }

  const errorClasses = ["border-red-500", "focus:ring-red-500"];

  const fields = {
    companyName: {
      element: document.getElementById("companyName"),
      error: document.getElementById("companyNameError")
    },
    contactPerson: {
      element: document.getElementById("contactPerson"),
      error: document.getElementById("contactPersonError")
    },
    corporateEmail: {
      element: document.getElementById("corporateEmail"),
      error: document.getElementById("corporateEmailError")
    },
    phone: {
      element: document.getElementById("phone"),
      error: document.getElementById("phoneError")
    },
    companyWebsite: {
      element: document.getElementById("companyWebsite"),
      error: document.getElementById("companyWebsiteError")
    },
    operationCountry: {
      element: document.getElementById("operationCountry"),
      error: document.getElementById("operationCountryError")
    },
    productType: {
      element: document.getElementById("productType"),
      error: document.getElementById("productTypeError")
    },
    monthlyVolume: {
      element: document.getElementById("monthlyVolume"),
      error: document.getElementById("monthlyVolumeError")
    },
    comments: {
      element: document.getElementById("comments"),
      error: document.getElementById("commentsError")
    },
    privacyPolicy: {
      element: document.getElementById("privacyPolicy"),
      error: document.getElementById("privacyPolicyError")
    }
  };

  const services = Array.from(form.querySelectorAll('input[name="services"]'));
  const current3pl = Array.from(form.querySelectorAll('input[name="current3pl"]'));
  const servicesError = document.getElementById("servicesError");
  const current3plError = document.getElementById("current3plError");
  const commentsCounter = document.getElementById("commentsCounter");
  const volumeWarning = document.getElementById("volumeWarning");
  const successMessage = document.getElementById("successMessage");

  function setElementInvalidState(element, isInvalid) {
    if (!element) {
      return;
    }

    element.setAttribute("aria-invalid", isInvalid ? "true" : "false");
    if (isInvalid) {
      errorClasses.forEach(function (cls) {
        element.classList.add(cls);
      });
    } else {
      errorClasses.forEach(function (cls) {
        element.classList.remove(cls);
      });
    }
  }

  function setFieldError(fieldKey, message) {
    const field = fields[fieldKey];
    if (!field) {
      return;
    }

    if (field.error) {
      field.error.textContent = message;
    }
    setElementInvalidState(field.element, message !== "");
  }

  function setGroupError(elements, errorElement, message) {
    if (errorElement) {
      errorElement.textContent = message;
    }

    elements.forEach(function (element) {
      setElementInvalidState(element, message !== "");
    });
  }

  function getTrimmedValue(fieldKey) {
    const field = fields[fieldKey];
    return field && field.element ? field.element.value.trim() : "";
  }

  function validateCompanyName() {
    const value = getTrimmedValue("companyName");
    const message = value.length >= 2 ? "" : "El nombre de la empresa debe tener al menos 2 caracteres";
    setFieldError("companyName", message);
    return message;
  }

  function validateContactPerson() {
    const value = getTrimmedValue("contactPerson");
    const words = value.split(/\s+/).filter(function (word) {
      return word.length > 0;
    });
    const message = words.length >= 2 ? "" : "Ingresa nombre y apellido del contacto";
    setFieldError("contactPerson", message);
    return message;
  }

  function validateCorporateEmail() {
    const value = getTrimmedValue("corporateEmail");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const message = emailRegex.test(value) ? "" : "Ingresa un email corporativo válido (ejemplo: nombre@empresa.com)";
    setFieldError("corporateEmail", message);
    return message;
  }

  function validatePhone() {
    const value = getTrimmedValue("phone");
    const phoneRegex = /^\+[0-9][0-9\s-]*$/;
    const message = phoneRegex.test(value) ? "" : "El teléfono debe incluir código de país (ejemplo: +1 213 555 0147)";
    setFieldError("phone", message);
    return message;
  }

  function validateCompanyWebsite() {
    const value = getTrimmedValue("companyWebsite");
    const message = value === "" || /^https?:\/\/.+/i.test(value) ? "" : "Si incluyes sitio web, debe ser una URL válida";
    setFieldError("companyWebsite", message);
    return message;
  }

  function validateOperationCountry() {
    const value = getTrimmedValue("operationCountry");
    const message = value !== "" ? "" : "Selecciona el país de operación principal";
    setFieldError("operationCountry", message);
    return message;
  }

  function validateProductType() {
    const value = getTrimmedValue("productType");
    const message = value !== "" ? "" : "Selecciona el tipo de producto que manejas";
    setFieldError("productType", message);
    return message;
  }

  function validateMonthlyVolume() {
    const value = getTrimmedValue("monthlyVolume");
    const message = value !== "" ? "" : "Selecciona el volumen mensual estimado";
    setFieldError("monthlyVolume", message);
    return message;
  }

  function validateServices() {
    const selected = services.some(function (checkbox) {
      return checkbox.checked;
    });
    const message = selected ? "" : "Selecciona al menos un servicio de interés";
    setGroupError(services, servicesError, message);
    return message;
  }

  function validateCurrent3pl() {
    const selected = current3pl.some(function (radio) {
      return radio.checked;
    });
    const message = selected ? "" : "Indica si actualmente trabajas con otro proveedor logístico";
    setGroupError(current3pl, current3plError, message);
    return message;
  }

  function validateComments() {
    const value = fields.comments.element.value;
    const remaining = 500 - value.length;
    const message = remaining >= 0 ? "" : "Los comentarios no pueden exceder 500 caracteres (quedan " + String(remaining) + ")";
    setFieldError("comments", message);
    return message;
  }

  function validatePrivacyPolicy() {
    const checked = fields.privacyPolicy.element.checked;
    const message = checked ? "" : "Debes aceptar la política de privacidad para continuar";
    setFieldError("privacyPolicy", message);
    return message;
  }

  function updateCommentsCounter() {
    if (!commentsCounter) {
      return;
    }

    const currentLength = fields.comments.element.value.length;
    const remaining = 500 - currentLength;
    commentsCounter.textContent = String(remaining) + " caracteres disponibles";
  }

  function updateVolumeWarning() {
    if (!volumeWarning) {
      return;
    }

    const monthlyValue = getTrimmedValue("monthlyVolume");
    const productValue = getTrimmedValue("productType");

    if (monthlyValue === "0-100" && productValue !== "") {
      volumeWarning.textContent = "Para volúmenes menores a 100 envíos mensuales, nuestros servicios podrían no ser la solución más eficiente. ¿Seguro que quieres continuar?";
      volumeWarning.classList.remove("hidden");
      return;
    }

    volumeWarning.textContent = "";
    volumeWarning.classList.add("hidden");
  }

  function hideSuccessMessage() {
    if (successMessage) {
      successMessage.classList.add("hidden");
    }
  }

  function showSuccessMessage() {
    if (!successMessage) {
      return;
    }

    successMessage.classList.remove("hidden");
    successMessage.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function clearAllErrors() {
    Object.keys(fields).forEach(function (key) {
      setFieldError(key, "");
    });
    setGroupError(services, servicesError, "");
    setGroupError(current3pl, current3plError, "");
  }

  function validateAll() {
    const validations = [
      { key: "companyName", fn: validateCompanyName, focus: fields.companyName.element },
      { key: "contactPerson", fn: validateContactPerson, focus: fields.contactPerson.element },
      { key: "corporateEmail", fn: validateCorporateEmail, focus: fields.corporateEmail.element },
      { key: "phone", fn: validatePhone, focus: fields.phone.element },
      { key: "companyWebsite", fn: validateCompanyWebsite, focus: fields.companyWebsite.element },
      { key: "operationCountry", fn: validateOperationCountry, focus: fields.operationCountry.element },
      { key: "productType", fn: validateProductType, focus: fields.productType.element },
      { key: "monthlyVolume", fn: validateMonthlyVolume, focus: fields.monthlyVolume.element },
      { key: "services", fn: validateServices, focus: services[0] || null },
      { key: "current3pl", fn: validateCurrent3pl, focus: current3pl[0] || null },
      { key: "comments", fn: validateComments, focus: fields.comments.element },
      { key: "privacyPolicy", fn: validatePrivacyPolicy, focus: fields.privacyPolicy.element }
    ];

    let firstErrorElement = null;
    let hasError = false;

    validations.forEach(function (validation) {
      const message = validation.fn();
      if (message !== "" && !firstErrorElement) {
        firstErrorElement = validation.focus;
      }
      if (message !== "") {
        hasError = true;
      }
    });

    updateVolumeWarning();

    return {
      hasError: hasError,
      firstErrorElement: firstErrorElement
    };
  }

  fields.companyName.element.addEventListener("input", function () {
    hideSuccessMessage();
    validateCompanyName();
  });
  fields.contactPerson.element.addEventListener("input", function () {
    hideSuccessMessage();
    validateContactPerson();
  });
  fields.corporateEmail.element.addEventListener("input", function () {
    hideSuccessMessage();
    validateCorporateEmail();
  });
  fields.phone.element.addEventListener("input", function () {
    hideSuccessMessage();
    validatePhone();
  });
  fields.companyWebsite.element.addEventListener("input", function () {
    hideSuccessMessage();
    validateCompanyWebsite();
  });
  fields.comments.element.addEventListener("input", function () {
    hideSuccessMessage();
    updateCommentsCounter();
    validateComments();
  });

  fields.operationCountry.element.addEventListener("change", function () {
    hideSuccessMessage();
    validateOperationCountry();
  });
  fields.productType.element.addEventListener("change", function () {
    hideSuccessMessage();
    validateProductType();
    updateVolumeWarning();
  });
  fields.monthlyVolume.element.addEventListener("change", function () {
    hideSuccessMessage();
    validateMonthlyVolume();
    updateVolumeWarning();
  });
  fields.privacyPolicy.element.addEventListener("change", function () {
    hideSuccessMessage();
    validatePrivacyPolicy();
  });

  services.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      hideSuccessMessage();
      validateServices();
    });
  });

  current3pl.forEach(function (radio) {
    radio.addEventListener("change", function () {
      hideSuccessMessage();
      validateCurrent3pl();
    });
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

    clearAllErrors();
    showSuccessMessage();
  });

  form.addEventListener("reset", function () {
    setTimeout(function () {
      clearAllErrors();
      hideSuccessMessage();
      if (volumeWarning) {
        volumeWarning.textContent = "";
        volumeWarning.classList.add("hidden");
      }
      if (commentsCounter) {
        commentsCounter.textContent = "500 caracteres disponibles";
      }
    }, 0);
  });

  updateCommentsCounter();
  updateVolumeWarning();
});
