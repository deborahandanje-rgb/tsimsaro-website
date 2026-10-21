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

  // Keep the current page visibly highlighted in the navigation.
  const currentPage = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".main-nav a[href]").forEach(link => {
    const targetPage = link.getAttribute("href").split("/").pop().split("?")[0].toLowerCase();
    if (targetPage === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });

  // Make in-page links scroll smoothly when supported by the browser.
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      }
    });
  });

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
    messageField.value = product
      ? "Hello Tsimsaro, I would like to enquire about ordering " + product + ". Please share availability and delivery details."
      : "Hello Tsimsaro, I would like to enquire about " + service + ". Please share the next steps.";
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
      const businessWhatsApp = "254716695147";
      const text = [
        "Hello Tsimsaro Investment Limited,",
        "Name: " + name,
        "Phone: " + phone,
        email ? "Email: " + email : "",
        "Enquiry: " + interest,
        "Message: " + message
      ].filter(Boolean).join("\n");
      const whatsappUrl = "https://wa.me/" + businessWhatsApp + "?text=" + encodeURIComponent(text);
      const newWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      if (newWindow) {
        status.textContent = "WhatsApp has opened with your enquiry. Please press Send in WhatsApp to complete your message.";
      } else {
        status.textContent = "If WhatsApp did not open automatically, use the WhatsApp link in the contact details and send your enquiry.";
        window.location.href = whatsappUrl;
      }
    });
  }
});