// Mash Restoration finishing behaviours: lazy 3D viewer and progressive reveal.
(() => {
  const modelFrame = document.getElementById("model-frame");
  const modelButtons = [
    document.getElementById("load-raptor-model"),
    document.getElementById("model-load-button")
  ].filter(Boolean);
  const loadModel = () => {
    if (!modelFrame || modelFrame.dataset.loaded === "true") return;
    modelFrame.dataset.loaded = "true";
    const placeholder = document.getElementById("model-placeholder");
    const iframe = document.createElement("iframe");
    iframe.title = "Interactive 3D Ford F-150 Raptor model";
    iframe.src = "https://sketchfab.com/models/0ed826c3da6d48ed880915bf8b4d6185/embed?autostart=1&ui_infos=0&ui_watermark=0&ui_theme=dark";
    iframe.allow = "autoplay; fullscreen; xr-spatial-tracking";
    iframe.allowFullscreen = true;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    modelFrame.replaceChildren(iframe);
    if (placeholder) placeholder.remove();
  };
  modelButtons.forEach(button => button.addEventListener("click", loadModel));

  const reveal = document.querySelectorAll(".section-wrap,.service-card,.case-card,.step,.quote-panel,.contact-grid,.detail-photo");
  reveal.forEach((element,index) => {
    if (!element.hasAttribute("data-reveal")) element.setAttribute("data-reveal","");
    if (element.classList.contains("service-card") || element.classList.contains("case-card")) {
      element.setAttribute("data-reveal-delay", String((index % 3) + 1));
    }
  });
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:0.12, rootMargin:"0px 0px -32px 0px"});
    document.querySelectorAll("[data-reveal]").forEach(element => observer.observe(element));
  } else {
    document.querySelectorAll("[data-reveal]").forEach(element => element.classList.add("is-visible"));
  }
})();
