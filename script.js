const SHOWREEL_MODE = "placeholder";

const SHOWREEL_YOUTUBE_ID = "";

const IS_LOCAL =
  location.hostname === "localhost" ||
  location.hostname === "127.0.0.1" ||
  location.protocol === "file:";

const PROJECT_CATEGORIES = [
  {
    title: "Sit Down videos",
    description: "3 videos",
    items: [
      {
        title: "Sit Down Video 01",
        type: "youtube",
        youtubeId: "LV8aFig1EV8",
      },
      {
        title: "Sit Down Video 02",
        type: "youtube",
        youtubeId: "X4SHhiyoEXo",
      },
      {
        title: "Sit Down Video 03",
        type: "youtube",
        youtubeId: "x6m9WJ1LUJs",
      },
    ],
  },
  {
    title: "Podcast",
    description: "2 videos",
    items: [
      {
        title: "Podcast Video 01",
        type: "video",
        src: "assets/videos/podcast-01.mp4",
      },
      {
        title: "Podcast Video 02",
        type: "video",
        src: "assets/videos/podcast-02.mp4",
      },
    ],
  },
  {
    title: "Gaming Videos",
    description: "2 videos",
    items: [
      {
        title: "Gaming Video 01",
        type: "video",
        src: "assets/videos/gaming-01.mp4",
      },
      {
        title: "Gaming Video 02",
        type: "video",
        src: "assets/videos/gaming-02.mp4",
      },
    ],
  },
  {
    title: "Reel (music sync)",
    description: "3 videos",
    items: [
      {
        title: "Reel Music Sync 01",
        type: "video",
        src: "assets/videos/reel-music-01.mp4",
        aspect: "9/16",
      },
      {
        title: "Reel Music Sync 02",
        type: "video",
        src: "assets/videos/reel-music-02.mp4",
        aspect: "9/16",
      },
      {
        title: "Reel Music Sync 03",
        type: "video",
        src: "assets/videos/reel-music-03.mp4",
        aspect: "9/16",
      },
    ],
  },
  {
    title: "Reel (B-roll, animation and Ai)",
    description: "5 videos",
    items: [
      {
        title: "Reel B-roll 01",
        type: "video",
        src: "assets/videos/reel-broll-01.mp4",
        aspect: "9/16",
        mime: "video/mp4",
      },
      {
        title: "Reel B-roll 02",
        type: "video",
        src: "assets/videos/reel-broll-02.mp4",
        aspect: "9/16",
        mime: "video/mp4",
      },
      {
        title: "Reel B-roll 03",
        type: "video",
        src: "assets/videos/reel-broll-03.mp4",
        aspect: "9/16",
        mime: "video/mp4",
      },
      {
        title: "Reel B-roll 04",
        type: "video",
        src: "assets/videos/reel-broll-04.mp4",
        aspect: "9/16",
        mime: "video/mp4",
      },
      {
        title: "Reel B-roll 05",
        type: "video",
        src: "assets/videos/reel-broll-05.mp4",
        aspect: "9/16",
        mime: "video/mp4",
      },
    ],
  },
];

const EXPERIENCE_ITEMS = [
  {
    title: "Founder and CEO — Zero To Law",
    description: "Founded and leading Zero To Law.",
  },
  {
    title: "Senior Video Editor — Offtrackmedia",
    description: "Sep 2024 to Dec 2025.",
  },
  {
    title: "Content Executive — Inquest (Bit Size News Media)",
    description: "1 year.",
  },
  {
    title: "Part-time Video Editor — Genio",
    description: "6 months.",
  },
  {
    title: "Freelance Video Editor",
    description: "3 years.",
  },
  {
    title: "Through the Travellers View",
    description: "Led post-production for the YouTube channel.",
  },
];

const SERVICES = [
  { icon: "YT", title: "YouTube Video Editing", copy: "Long-form edits with clean pacing and retention-focused cuts." },
  { icon: "RS", title: "Social Media Reels / Shorts", copy: "Fast, scroll-stopping vertical edits optimized for engagement." },
  { icon: "DC", title: "Documentary Editing", copy: "Narrative structure, interviews, and b-roll sequencing with emotional clarity." },
  { icon: "CG", title: "Color Grading", copy: "Refined tonal balancing and cinematic color mood shaping." },
  { icon: "MG", title: "Motion Graphics", copy: "Minimal titles, transitions, and graphic accents that elevate storytelling." },
];

const SOCIAL_LINKS = {
  youtube: "https://youtube.com/",
  instagram: "https://instagram.com/",
  linkedin: "https://linkedin.com/",
};

function setupYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

function renderShowreel() {
  if (SHOWREEL_MODE !== "youtube" || !SHOWREEL_YOUTUBE_ID) {
    return;
  }

  const shell = document.getElementById("showreel-shell");
  if (!shell) {
    return;
  }

  shell.innerHTML = `
    <div class="video-embed-wrap">
      <iframe
        src="https://www.youtube.com/embed/${SHOWREEL_YOUTUBE_ID}?rel=0&modestbranding=1"
        title="Showreel"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  `;

  const embedWrap = shell.querySelector(".video-embed-wrap");
  if (embedWrap) {
    embedWrap.style.width = "100%";
    embedWrap.style.aspectRatio = "16 / 9";
  }

  const iframe = shell.querySelector("iframe");
  if (iframe) {
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "0";
  }
}

function renderProjects() {
  const container = document.getElementById("projects-categories");
  if (!container) {
    return;
  }

  container.innerHTML = "";

  const getYouTubeId = (value) => {
    if (!value) {
      return "";
    }
    if (value.length === 11 && !value.includes("http")) {
      return value;
    }
    const match = String(value).match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
    );
    return match ? match[1] : "";
  };

  const hasItems = PROJECT_CATEGORIES.some((category) => category.items && category.items.length);
  if (!PROJECT_CATEGORIES.length || !hasItems) {
    const empty = document.createElement("div");
    empty.className = "projects-empty";
    empty.innerHTML =
      "Showreel cards are ready. Add items in <code>PROJECT_CATEGORIES</code> inside <code>script.js</code>.";
    container.append(empty);
    return;
  }

  PROJECT_CATEGORIES.forEach((category) => {
    const section = document.createElement("div");
    section.className = "projects-category";

    const head = document.createElement("div");
    head.className = "category-head";
    head.innerHTML = `
      <h3>${category.title}</h3>
      <p>${category.description || ""}</p>
    `;

    const trackShell = document.createElement("div");
    trackShell.className = "track-shell";

    const track = document.createElement("div");
    track.className = "projects-track";
    const isPortrait = category.items.every((item) => item.aspect === "9/16");
    track.dataset.layout = isPortrait ? "portrait" : "landscape";

    category.items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "project-card";
      if (item.aspect === "9/16") {
        card.classList.add("is-vertical");
      }
      card.dataset.aspect = item.aspect || "16/9";

      const youtubeId = getYouTubeId(item.youtubeId || item.youtubeUrl || "");
      if (item.type === "youtube" && youtubeId) {
        card.innerHTML = `
          <div class="video-frame">
            <iframe
              src="https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&playsinline=1"
              data-base="https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&playsinline=1"
              title="${item.title}"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
          <div class="project-meta">
            <h3>${item.title}</h3>
            <p>${category.title}</p>
          </div>
        `;
      } else if (item.type === "video") {
        const mime = item.mime || "video/mp4";
        const isLocalVideo = item.src && item.src.startsWith("assets/videos/");
        if (!IS_LOCAL && isLocalVideo) {
          card.innerHTML = `
            <div class="video-frame is-placeholder">
              <div class="placeholder-label">
                <span>Preview available on request</span>
                <small>Watch locally for full quality</small>
              </div>
            </div>
            <div class="project-meta">
              <h3>${item.title}</h3>
              <p>${category.title}</p>
            </div>
          `;
        } else {
          card.innerHTML = `
            <div class="video-frame">
              <video controls preload="metadata" playsinline muted loop>
                <source src="${item.src}" type="${mime}" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div class="project-meta">
              <h3>${item.title}</h3>
              <p>${category.title}</p>
            </div>
          `;
        }
      } else {
        card.innerHTML = `
          <div class="video-frame">
            <img src="${item.thumbnail}" alt="${item.title} thumbnail" loading="lazy" />
          </div>
          <div class="project-meta">
            <h3>${item.title}</h3>
            <p>${category.title}</p>
          </div>
        `;
      }

      track.append(card);
    });

    trackShell.append(track);

    if (category.items.length > 1) {
      const indicator = document.createElement("div");
      indicator.className = "scroll-indicator";
      indicator.textContent = "Scroll >";
      trackShell.append(indicator);
    }

    section.append(head, trackShell);
    container.append(section);
  });
}

function renderServices() {
  const grid = document.getElementById("services-grid");
  if (!grid) {
    return;
  }

  SERVICES.forEach((service) => {
    const card = document.createElement("article");
    card.className = "service-card";
    card.innerHTML = `
      <div class="service-icon" aria-hidden="true">${service.icon}</div>
      <h3>${service.title}</h3>
      <p>${service.copy}</p>
    `;
    grid.append(card);
  });
}


function renderSocialLinks() {
  const holder = document.getElementById("social-links");
  if (!holder) {
    return;
  }

  const links = [
    { key: "youtube", label: "YouTube", symbol: "YT" },
    { key: "instagram", label: "Instagram", symbol: "IG" },
    { key: "linkedin", label: "LinkedIn", symbol: "IN" },
  ];

  links.forEach(({ key, label, symbol }) => {
    const a = document.createElement("a");
    a.href = SOCIAL_LINKS[key];
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", label);
    a.textContent = symbol;
    holder.append(a);
  });
}

function setupRevealAnimations() {
  const revealNodes = document.querySelectorAll(".reveal");
  if (!revealNodes.length) {
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -10% 0px" }
  );

  revealNodes.forEach((node, idx) => {
    node.style.transitionDelay = `${Math.min(idx * 90, 380)}ms`;
    observer.observe(node);
  });
}

function setupParallax() {
  const items = document.querySelectorAll("[data-parallax]");
  if (!items.length) {
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    return;
  }

  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    items.forEach((item) => {
      const factor = Number(item.getAttribute("data-parallax")) || 0.05;
      const movement = Math.max(-55, Math.min(55, y * factor));
      item.style.transform = `translate3d(0, ${movement}px, 0)`;
    });
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );

  update();
}

function setupScrollColorDrift() {
  const waves = document.querySelectorAll(".color-wave");
  if (!waves.length) {
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    return;
  }

  let ticking = false;

  const update = () => {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.max(0, Math.min(1, window.scrollY / maxScroll));

    waves.forEach((wave) => {
      const speed = Number(wave.getAttribute("data-scroll-speed")) || 0.12;
      const driftRange = window.innerWidth * speed;
      const shiftX = -driftRange + progress * driftRange * 2;
      wave.style.setProperty("--scroll-shift", `${shiftX.toFixed(2)}px`);
    });

    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );

  window.addEventListener(
    "resize",
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );

  update();
}

function setupProjectHorizontalScroll() {
  const tracks = document.querySelectorAll(".projects-track");
  if (!tracks.length || window.matchMedia("(max-width: 860px)").matches) {
    return;
  }

  tracks.forEach((track) => {
    track.addEventListener(
      "wheel",
      (event) => {
        if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
          return;
        }
        event.preventDefault();
        track.scrollLeft += event.deltaY;
      },
      { passive: false }
    );
  });
}


function setupActiveVideoOnCenter() {
  const tracks = document.querySelectorAll(".projects-track");
  if (!tracks.length) {
    return;
  }

  let ticking = false;

  const updateTrack = (track) => {
    const cards = Array.from(track.querySelectorAll(".project-card"));
    if (!cards.length) {
      return;
    }

    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;

    let closestCard = null;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(cardCenter - trackCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestCard = card;
      }
    });

    cards.forEach((card) => {
      const isActive = card === closestCard;
      card.classList.toggle("is-active", isActive);

      const video = card.querySelector("video");
      const iframe = card.querySelector("iframe");

      if (video) {
        if (isActive) {
          const playPromise = video.play();
          if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(() => {});
          }
        } else {
          video.pause();
        }
      }

      if (iframe) {
        const base = iframe.dataset.base || iframe.getAttribute("src") || "";
        if (!base) {
          return;
        }
        const autoplaySrc = base.includes("autoplay=1") ? base : `${base}&autoplay=1&mute=1`;
        if (isActive) {
          if (iframe.getAttribute("src") !== autoplaySrc) {
            iframe.setAttribute("src", autoplaySrc);
          }
        } else if (iframe.getAttribute("src") !== base) {
          iframe.setAttribute("src", base);
        }
      }
    });
  };

  const update = () => {
    tracks.forEach(updateTrack);
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  tracks.forEach((track) => {
    track.addEventListener("scroll", onScroll, { passive: true });
  });

  update();
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");
  if (!form || !feedback) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      feedback.textContent = "Please fill in all fields before submitting.";
      return;
    }

    const whatsappNumber = "8801884396040";
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(body)}`;

    feedback.textContent = "Opening WhatsApp with your message...";
    window.location.href = whatsappUrl;
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("js-reveal");
  setupYear();
  renderShowreel();
  renderProjects();
  renderServices();
  renderSocialLinks();
  setupRevealAnimations();
  setupParallax();
  setupScrollColorDrift();
  setupProjectHorizontalScroll();
  setupActiveVideoOnCenter();
  setupContactForm();
});
