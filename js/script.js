document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
    }));
  }

  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const params = new URLSearchParams(window.location.search);
  const product = params.get("product");
  const service = params.get("service");
  const productField = document.querySelector("#product-service");
  const messageField = document.querySelector("#message");
  if (productField && product) productField.value = product;
  if (productField && service) productField.value = service;
  if (messageField && (product || service)) {
    messageField.value = product ? "Hello Tsimsaro, I would like to enquire about ordering " + product + ". Please share availability and delivery details." : "Hello Tsimsaro, I would like to enquire about " + service + ". Please share the next steps.";
  }

  const form = document.querySelector("#enquiry-form");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const data = new FormData(form);
      const name = (data.get("name") || "").toString().trim();
      const phone = (data.get("phone") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const interest = (data.get("interest") || "General enquiry").toString();
      const message = (data.get("message") || "").toString().trim();
      const status = document.querySelector("#form-status");
      const businessWhatsApp = ""; // Add Tsimsaro's WhatsApp number here, digits only, with country code (e.g. 2547XXXXXXXX).
      if (!businessWhatsApp) {
        status.textContent = "Your message is ready, but online sending is not configured yet. Please add Tsimsaro's WhatsApp number in js/script.js or connect a form service before publishing.";
        return;
      }
      const text = [
        "Hello Tsimsaro Investment Limited,",
        "Name: " + name,
        "Phone: " + phone,
        email ? "Email: " + email : "",
        "Enquiry: " + interest,
        "Message: " + message
      ].filter(Boolean).join("\n");
      window.open("https://wa.me/" + businessWhatsApp + "?text=" + encodeURIComponent(text), "_blank", "noopener,noreferrer");
      status.textContent = "WhatsApp has opened with your enquiry. Please send the message there to complete your request.";
    });
  }
});