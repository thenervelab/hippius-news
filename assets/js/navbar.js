document.addEventListener("DOMContentLoaded", () => {
  const navInner = document.getElementById("nav-inner");
  const dashboardBtn = document.getElementById("dashboard-btn");
  const menuBtn = document.getElementById("mobile-menu-button");
  const menuDialog = document.getElementById("mobile-menu-dialog");
  const menuClose = document.getElementById("mobile-menu-close");
  const pageType = document.body.dataset.page;

  if (!navInner || !dashboardBtn || !menuBtn) return;

  // Mobile menu toggle
  if (menuBtn && menuDialog && menuClose) {
    menuBtn.addEventListener("click", () => {
      menuDialog.classList.remove("hidden");
    });
    menuClose.addEventListener("click", () => {
      menuDialog.classList.add("hidden");
    });
  }

  const getResponsiveMarginTop = () => {
    if (window.matchMedia("(max-width: 640px)").matches) {
      return "0rem";
    } else if (window.matchMedia("(max-width: 768px)").matches) {
      return "1rem";
    } else if (window.matchMedia("(max-width: 1024px)").matches) {
      return "0rem";
    } else {
      return "3rem"; // default for large screens
    }
  };

  const applyScrolledStyles = () => {
    navInner.classList.add("bg-white", "shadow-md", "text-black", "mt-0");
    navInner.classList.remove("bg-transparent", "text-white", "lg:mt-12");

    navInner.style.setProperty("background-color", "#fff", "important");
    navInner.style.setProperty("color", "#000", "important");
    navInner.style.setProperty("margin-top", "0", "important");

    dashboardBtn.style.setProperty("background-color", "#3366FF", "important");
    dashboardBtn.style.setProperty("color", "#fff", "important");
    dashboardBtn.style.setProperty("border-color", "#3366FF", "important");

    dashboardBtn.onmouseenter = () => {
      dashboardBtn.style.setProperty("background-color", "#1f51be", "important");
      dashboardBtn.style.setProperty("color", "#fff", "important");
    };
    dashboardBtn.onmouseleave = () => {
      dashboardBtn.style.setProperty("background-color", "#3366FF", "important");
      dashboardBtn.style.setProperty("color", "#fff", "important");
    };

    menuBtn.style.setProperty("background-color", "#3366FF", "important");
    menuBtn.style.setProperty("color", "#fff", "important");
    menuBtn.style.setProperty("border-color", "#3366FF", "important");

    menuBtn.onmouseenter = () => {
      menuBtn.style.setProperty("background-color", "#1f51be", "important");
      menuBtn.style.setProperty("color", "#fff", "important");
    };
    menuBtn.onmouseleave = () => {
      menuBtn.style.setProperty("background-color", "#3366FF", "important");
      menuBtn.style.setProperty("color", "#fff", "important");
    };
  };

  const applyTransparentStyles = () => {
    navInner.classList.remove("bg-white", "shadow-md", "text-black", "mt-0");
    navInner.classList.add("bg-transparent", "text-white", "lg:mt-12");

    const responsiveMargin = getResponsiveMarginTop();
    navInner.style.setProperty("background-color", "transparent", "important");
    navInner.style.setProperty("color", "#fff", "important");
    navInner.style.setProperty("margin-top", responsiveMargin, "important");

    dashboardBtn.style.setProperty("background-color", "#fff", "important");
    dashboardBtn.style.setProperty("color", "#000", "important");
    dashboardBtn.style.setProperty("border-color", "#fff", "important");

    dashboardBtn.onmouseenter = () => {
      dashboardBtn.style.setProperty("background-color", "#e3e3e3", "important");
      dashboardBtn.style.setProperty("color", "#000", "important");
    };
    dashboardBtn.onmouseleave = () => {
      dashboardBtn.style.setProperty("background-color", "#fff", "important");
      dashboardBtn.style.setProperty("color", "#000", "important");
    };

    menuBtn.style.setProperty("background-color", "#fff", "important");
    menuBtn.style.setProperty("color", "#000", "important");
    menuBtn.style.setProperty("border-color", "#fff", "important");

    menuBtn.onmouseenter = () => {
      menuBtn.style.setProperty("background-color", "#e3e3e3", "important");
      menuBtn.style.setProperty("color", "#000", "important");
    };
    menuBtn.onmouseleave = () => {
      menuBtn.style.setProperty("background-color", "#fff", "important");
      menuBtn.style.setProperty("color", "#000", "important");
    };
  };




  if (pageType === "home") {
    const onScroll = () => {
      if (window.scrollY > 50) {
        applyScrolledStyles();
      } else {
        applyTransparentStyles();
      }
    };

    // Initial check
    setTimeout(() => {
      navInner.style.transition = "all 0.3s ease";
      onScroll();
      window.addEventListener("scroll", onScroll);

      // Listen for window resize to re-apply responsive styles
      window.addEventListener("resize", () => {
        if (window.scrollY <= 50) {
          applyTransparentStyles();
        } else {
          applyScrolledStyles();
        }
      });
    }, 0);
  } else {
    applyScrolledStyles();
  }
});
