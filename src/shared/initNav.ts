export function initNav(navId: string) {
  const nav = document.querySelector(`nav.${navId}`) as HTMLElement | null;
  const maxScroll = 1000;
  let rafId: number | null = null;

  function updateNav() {
    if (!nav) return;

    if (window.scrollY > 0) {
      nav.classList.add("scrolling");

      const scrollProgress = Math.min(window.scrollY / maxScroll, 1);
      const easeProgress = 1 - Math.pow(1 - scrollProgress, 4);

      const minWidth = 528;
      const maxWidth = window.innerWidth * 0.8;
      const currentWidth = maxWidth - (maxWidth - minWidth) * easeProgress;

      if (window.innerWidth >= 768) {
        nav.style.setProperty("width", `${currentWidth}px`);
      }
    } else {
      nav.classList.remove("scrolling");
      nav.style.setProperty("width", "80%");
    }
    rafId = null;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updateNav);
      }
    },
    { passive: true }
  );

  document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const url = new URL(target.href);
      const targetId = url.hash.substring(1);

      if (targetId) {
        e.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // highlight active section (language-aware)
  document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a[href*='#']");
    const observerOptions = { threshold: 0.6 };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove("active"));
          const id = entry.target.getAttribute("id");
          const activeLink = document.querySelector(`nav a[href$="#${id}"]`);
          if (activeLink) {
            activeLink.classList.add("active");
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => observer.observe(section));
  });

}
