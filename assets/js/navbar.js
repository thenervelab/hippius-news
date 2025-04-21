  document.addEventListener("DOMContentLoaded", () => {
    const navInner = document.getElementById("nav-inner");
    const navOuter = document.getElementById("nav-outer");
    const dashboardBtn = document.getElementById("dashboard-btn");
    const menuBtn = document.getElementById('mobile-menu-button');
    const menuDialog = document.getElementById('mobile-menu-dialog');
    const menuClose = document.getElementById('mobile-menu-close');
    const pageType = document.body.dataset.page; // 'home' or 'internal'

    if (!navInner || !dashboardBtn || !menuBtn) {
      console.error("Nav elements not found");
      return;
    }

    // Mobile menu toggle
    if (menuBtn && menuDialog && menuClose) {
      menuBtn.addEventListener('click', () => {
        menuDialog.classList.remove('hidden');
      });

      menuClose.addEventListener('click', () => {
        menuDialog.classList.add('hidden');
      });
    }

    const applyScrolledStyles = () => {

      navInner.classList.add("bg-white", "shadow-md", "text-black", "mt-0");
      navInner.classList.remove("bg-transparent", "text-white", "mt-12");

      dashboardBtn.classList.remove("bg-white", "text-black", "border-white", "hover:text-black", "hover:bg-[#e3e3e3]");
      dashboardBtn.classList.add("bg-primary-50", "text-white", "border-primary-50", "hover:bg-primary-40", "hover:text-white");

      menuBtn.classList.add("bg-primary-50", "text-white", "hover:bg-primary-40");
      menuBtn.classList.remove("bg-white", "text-black", "border-white");
    };

    const applyTransparentStyles = () => {
      navInner.classList.remove("bg-white", "shadow-md", "text-black", "mt-0");
      navInner.classList.add("bg-transparent", "text-white", "mt-12");

      dashboardBtn.classList.remove("bg-primary-50", "text-white", "border-primary-50", "hover:bg-primary-40", "hover:text-white");
      dashboardBtn.classList.add("bg-white", "text-black", "border-white", "hover:bg-[#e3e3e3]", "hover:text-black");

      menuBtn.classList.add("bg-white", "text-black", "border-white");
      menuBtn.classList.remove("bg-primary-50", "text-white");
    };

    if (pageType === "home") {
      // Scroll-based style for home
      const onScroll = () => {
        if (window.scrollY > 50) {
          applyScrolledStyles();
        } else {
          applyTransparentStyles();
        }
      };

      onScroll(); // Initial check
      window.addEventListener("scroll", onScroll);
    } else {
      // Always show scrolled styles on internal pages
      applyScrolledStyles();
    }
  });