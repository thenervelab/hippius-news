document.addEventListener("DOMContentLoaded", () => {
  const tocBtn = document.getElementById("toc-toggle");
  const tocPanel = document.getElementById("toc-panel");
  const tocClose = document.getElementById("toc-close");
  const readProgress = document.querySelectorAll(".read-progress");
  const circleMobile = document.getElementById("progress-circle-mobile");
  const circleDesktop = document.getElementById("progress-circle-desktop");
  const content = document.querySelector(".post__content");

  if (
    !tocBtn ||
    !tocPanel ||
    !tocClose ||
    !circleMobile ||
    !circleDesktop ||
    !readProgress ||
    !content
  )
    return;

  let lastActiveTocLink = null;
  const sections = Array.from(
    document.querySelectorAll(".single-article-section")
  );
  if (window.innerWidth < 768) {
    sections.forEach((s, idx) => {
      s.classList.remove("opacity-0");
      setTimeout(() => {
        s.classList.add("animate-fade-in-from-b-0.7");
      }, idx * 120);
    });
  } else if (sections.length) {
    let animatedIndexes = new Set();
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => sections.indexOf(a.target) - sections.indexOf(b.target)
          )
          .forEach((entry, idx) => {
            const sectionIdx = sections.indexOf(entry.target);
            if (!animatedIndexes.has(sectionIdx)) {
              setTimeout(() => {
                entry.target.classList.remove("opacity-0");
                entry.target.classList.add("animate-fade-in-from-b-0.7");
                observer.unobserve(entry.target);
              }, idx * 120);
              animatedIndexes.add(sectionIdx);
            }
          });
      },
      { threshold: 0.1 }
    );
    sections.forEach((section) => observer.observe(section));
  }

  function getActiveScrollContainer() {
    const scrollContainer = document.getElementById("main-scroll-area");
    if (
      scrollContainer &&
      scrollContainer.offsetParent !== null &&
      scrollContainer.scrollHeight > scrollContainer.clientHeight
    ) {
      return scrollContainer;
    }
    return window;
  }

  const headings = Array.from(
    document.querySelectorAll(
      "#content-area h1, #content-area h2, #content-area h3, #content-area h4, #content-area h5, #content-area h6"
    )
  );
  if (!headings.length) return;

  function getTocLinks() {
    return Array.from(document.querySelectorAll('.toc-list a[href^="#"]'));
  }

  function cleanToc() {
    getTocLinks().forEach((link) => {
      link.classList.remove("toc-link-active");
      const indicator = link.querySelector(".toc-active-indicator");
      if (indicator) indicator.remove();
      link.classList.remove("relative");
      link.classList.remove("active");
    });
  }

  function addIndicator(link) {
    link.classList.add("relative");
    const indicator = document.createElement("span");
    indicator.className = "toc-active-indicator";
    link.prepend(indicator);
  }

  // Main scroll-based highlight logic
  function highlightToc() {
    const scrollContainer = getActiveScrollContainer();
    let foundId = null;
    let maxVisibleTop = -Infinity;
    let containerRect =
      scrollContainer === window
        ? { top: 0 }
        : scrollContainer.getBoundingClientRect();

    for (let i = 0; i < headings.length; i++) {
      let rect = headings[i].getBoundingClientRect();
      let relativeTop = rect.top - containerRect.top;
      let relativeBottom = rect.bottom - containerRect.top;
      let containerHeight =
        scrollContainer === window
          ? window.innerHeight
          : scrollContainer.clientHeight;
      if (relativeBottom > 0 && relativeTop < containerHeight) {
        if (relativeTop > maxVisibleTop) {
          maxVisibleTop = relativeTop;
          foundId = headings[i].id;
        }
      }
    }

    if (foundId) {
      cleanToc();
      getTocLinks().forEach((link) => {
        const hrefId = decodeURIComponent(
          link.getAttribute("href").replace("#", "")
        );
        if (hrefId && foundId && hrefId === foundId) {
          link.classList.add("toc-link-active");
          addIndicator(link);
          link.classList.add("active");
          lastActiveTocLink = link;
        }
      });
    } else if (!lastActiveTocLink && headings.length > 0) {
      // Only when NOTHING has ever been highlighted (first load, e.g. opening TOC on mobile)
      const firstId = headings[0].id;
      getTocLinks().forEach((link) => {
        const hrefId = decodeURIComponent(
          link.getAttribute("href").replace("#", "")
        );
        if (hrefId === firstId) {
          link.classList.add("toc-link-active");
          addIndicator(link);
          link.classList.add("active");
          lastActiveTocLink = link;
        }
      });
    }
    // else, do nothing: last active remains highlighted
  }

  // Listen to scroll on BOTH window and main-scroll-area, always update!
  function setupScrollListener() {
    // Remove old listeners
    window.removeEventListener("scroll", highlightToc);
    const scrollContainer = document.getElementById("main-scroll-area");
    if (scrollContainer) {
      scrollContainer.removeEventListener("scroll", highlightToc);
    }

    // Attach to both, highlightToc will use the correct context
    window.addEventListener("scroll", highlightToc, { passive: true });
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", highlightToc, {
        passive: true,
      });
    }
    window.addEventListener("resize", highlightToc, { passive: true });
    highlightToc();
  }

  setupScrollListener();

  // ==== Fix: Highlight the target heading when clicking TOC ====
  function highlightTocLinkById(id) {
    cleanToc();
    getTocLinks().forEach((link) => {
      const hrefId = decodeURIComponent(
        link.getAttribute("href").replace("#", "")
      );
      if (hrefId === id) {
        link.classList.add("toc-link-active");
        addIndicator(link);
        link.classList.add("active");
      }
    });
  }

  function syncHighlightAfterJump(e) {
    // Only TOC internal links
    if (this.hash && this.getAttribute("href").startsWith("#")) {
      const id = this.getAttribute("href").replace("#", "");
      setTimeout(() => {
        highlightTocLinkById(id);
      }, 10);
    }
  }
  getTocLinks().forEach((link) => {
    link.addEventListener("click", syncHighlightAfterJump);
  });

  // Optional: also update on hashchange (back/forward navigation)
  window.addEventListener("hashchange", () => {
    const id = window.location.hash.replace("#", "");
    highlightTocLinkById(id);
  });

  // Toggle TOC
  // Toggle TOC
  tocBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (window.matchMedia("(max-width: 768px)").matches) {
      tocPanel.classList.toggle("hidden");
      // Highlight the current section immediately when TOC opens
      setTimeout(() => {
        highlightToc();
      }, 10); // Allow a brief delay for the panel to render
    }
  });

  // Close TOC
  tocClose.addEventListener("click", (e) => {
    e.stopPropagation();
    tocPanel.classList.add("hidden");
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!tocPanel.contains(e.target) && !tocBtn.contains(e.target)) {
      tocPanel.classList.add("hidden");
    }
  });

  // Function to get current scroll container
  function getScrollContainer() {
    let scrollContainer = window;
    let parent = content && content.parentElement;
    while (parent && parent !== document.body) {
      const overflowY = getComputedStyle(parent).overflowY;
      if (
        (overflowY === "auto" || overflowY === "scroll") &&
        parent.scrollHeight > parent.clientHeight
      ) {
        scrollContainer = parent;
        break;
      }
      parent = parent.parentElement;
    }
    return scrollContainer;
  }

  let scrollContainer = getScrollContainer();

  function handleScrollProgress() {
    let scrolled, total;
    if (scrollContainer === window) {
      const rect = content.getBoundingClientRect();
      const start = rect.top + window.scrollY;
      scrolled = window.scrollY - start;
      total = content.scrollHeight - window.innerHeight;
    } else {
      scrolled = scrollContainer.scrollTop;
      total = content.scrollHeight - scrollContainer.clientHeight;
    }
    if (total < 10) total = 10;

    let progress = Math.min(100, Math.max(0, (scrolled / total) * 100));
    readProgress.forEach((element) => {
      element.textContent = `${Math.round(progress)}%`;
    });

    // Circle update
    const radius = 22;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;
    if (circleMobile) {
      circleMobile.style.strokeDasharray = `${circumference}`;
      circleMobile.style.strokeDashoffset = offset;
    }
    if (circleDesktop) {
      circleDesktop.style.strokeDasharray = `${circumference}`;
      circleDesktop.style.strokeDashoffset = offset;
    }
  }

  let lastContainer = scrollContainer;

  function attachScrollListener() {
    // Remove previous listener
    if (lastContainer === window) {
      window.removeEventListener("scroll", handleScrollProgress);
    } else {
      lastContainer.removeEventListener("scroll", handleScrollProgress);
    }
    // Attach to current
    if (scrollContainer === window) {
      window.addEventListener("scroll", handleScrollProgress, {
        passive: true,
      });
    } else {
      scrollContainer.addEventListener("scroll", handleScrollProgress, {
        passive: true,
      });
    }
    lastContainer = scrollContainer;
    handleScrollProgress();
  }

  // Initial attach
  attachScrollListener();

  // Re-attach on resize (for responsive changes)
  window.addEventListener("resize", () => {
    scrollContainer = getScrollContainer();
    attachScrollListener();
  });

  // Also call once in case layout shifts after initial load
  setTimeout(handleScrollProgress, 300);
});
