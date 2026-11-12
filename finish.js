// Mash Restoration finishing behaviours: fast, high-detail 3D viewer and progressive reveal.
(() => {
  const modelFrame = document.getElementById("model-frame");
  const modelButtons = [
    document.getElementById("load-raptor-model"),
    document.getElementById("model-load-button")
  ].filter(Boolean);

  let sketchfabApiLoading;
  const loadSketchfabApi = () => {
    if (window.Sketchfab) return Promise.resolve();
    if (sketchfabApiLoading) return sketchfabApiLoading;
    sketchfabApiLoading = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js";
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
    return sketchfabApiLoading;
  };

  const loadModel = async () => {
    if (!modelFrame || modelFrame.dataset.loaded === "true") return;
    modelFrame.dataset.loaded = "true";
    modelFrame.classList.add("model-loading");
    const placeholder = document.getElementById("model-placeholder");
    const status = document.createElement("div");
    status.className = "model-loading-status";
    status.setAttribute("role", "status");
    status.textContent = "Preparing the high-detail 3D model…";
    modelFrame.appendChild(status);

    const iframe = document.createElement("iframe");
    iframe.title = "Interactive 3D Ford F-150 Raptor model";
    iframe.allow = "autoplay; fullscreen; xr-spatial-tracking";
    iframe.allowFullscreen = true;
    iframe.loading = "eager";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.setAttribute("allow", "autoplay; fullscreen; xr-spatial-tracking");
    modelFrame.insertBefore(iframe, status);
    if (placeholder) placeholder.remove();

    try {
      await loadSketchfabApi();
      const client = new window.Sketchfab(iframe);
      client.init("0ed826c3da6d48ed880915bf8b4d6185", {
        autostart: 1,
        camera: 0,
        preload: 0,
        max_texture_size: 4096,
        ui_infos: 0,
        ui_watermark: 0,
        ui_theme: "dark",
        dnt: 1,
        success: api => {
          api.start(() => {
            api.addEventListener("viewerready", () => {
              status.textContent = "Finishing high-definition textures…";
              api.setTextureQuality("hd", error => {
                if (!error) {
                  modelFrame.classList.remove("model-loading");
                  modelFrame.classList.add("model-ready");
                  status.remove();
                } else {
                  status.textContent = "3D model ready — loading standard textures.";
                  window.setTimeout(() => status.remove(), 2400);
                  modelFrame.classList.remove("model-loading");
                }
              });
            });
            api.addEventListener("textureLoadProgress", progress => {
              if (progress >= 1 && modelFrame.classList.contains("model-ready")) status.remove();
            });
          });
        },
        error: () => {
          status.textContent = "The 3D viewer could not start. Please try again.";
          modelFrame.dataset.loaded = "false";
          modelFrame.classList.remove("model-loading");
        }
      });
    } catch (error) {
      // Lightweight iframe fallback if the Viewer API script is unavailable.
      iframe.src = "https://sketchfab.com/models/0ed826c3da6d48ed880915bf8b4d6185/embed?autostart=1&camera=0&preload=0&max_texture_size=4096&ui_infos=0&ui_watermark=0&ui_theme=dark&dnt=1";
      status.textContent = "Loading interactive 3D model…";
      iframe.addEventListener("load", () => {
        modelFrame.classList.remove("model-loading");
        status.remove();
      }, { once: true });
    }
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
