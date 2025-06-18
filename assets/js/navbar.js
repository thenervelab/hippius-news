// navbar.js

document.addEventListener("DOMContentLoaded", () => {
  const navInner = document.getElementById("nav-inner");
  const navOuter = document.getElementById("nav-outer");
  const navLinks = document.getElementById("nav-links"); // guard added
  const dashboardBtn = document.getElementById("dashboard-btn");
  const dashboardInnerBtn = document.getElementById("dashboard-inner-btn");
  const menuBtn = document.getElementById("mobile-menu-button");
  const menuDialog = document.getElementById("mobile-menu-dialog");
  const menuClose = document.getElementById("mobile-menu-close");
  const joinNetwork = document.getElementById("join-network"); // guard added
  const pageType = document.body.dataset.page;

  // if any of these core elements is missing, bail out
  if (!navInner || !navOuter || !dashboardBtn || !menuBtn) return;

  // Only toggle the mobile menu if all three exist
  if (menuBtn && menuDialog && menuClose) {
    // helper to open the menu and lock page scroll
    const openMenu = () => {
      menuDialog.classList.remove("hidden");
      // lock scroll
      document.body.style.overflow = "hidden";
    };

    // helper to close the menu and restore scroll
    const closeMenu = () => {
      menuDialog.classList.add("hidden");
      document.body.style.overflow = "";
    };

    menuBtn.addEventListener("click", openMenu);
    menuClose.addEventListener("click", closeMenu);

    menuDialog.addEventListener("click", (e) => {
      if (e.target === menuDialog) {
        closeMenu();
      }
    });
  }
  function colorArrToRgba(arr) {
    return `rgba(${arr[0]},${arr[1]},${arr[2]},${arr[3]})`;
  }

  function drawBackgroundGrid(canvas, majorCell, minorCell) {
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // ----- Calculate Offsets -----
    const nFull = Math.floor(height / majorCell.cellDim);
    const remain = height - nFull * majorCell.cellDim;
    const offset = remain / 2;

    // ----- Draw Minor Horizontal Lines (full coverage) -----
    ctx.strokeStyle = colorArrToRgba(minorCell.lineColor);
    ctx.lineWidth = minorCell.lineWidth > 0 ? minorCell.lineWidth : 1; // Ensure visible
    // Start at offset, end at height - offset
    for (
      let y = offset;
      y <= height - offset + 0.1; // +0.1 to ensure last line is drawn due to float math
      y += minorCell.cellDim
    ) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // ----- Draw Major Horizontal Lines (centered) -----
    ctx.strokeStyle = colorArrToRgba(majorCell.lineColor);
    ctx.lineWidth = majorCell.lineWidth > 1 ? majorCell.lineWidth : 1.5;
    for (let i = 0; i <= nFull; i++) {
      const y = offset + i * majorCell.cellDim;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // ----- Draw Minor Vertical Lines (as before) -----
    ctx.strokeStyle = colorArrToRgba(minorCell.lineColor);
    ctx.lineWidth = minorCell.lineWidth > 0 ? minorCell.lineWidth : 1;
    for (let x = 0; x <= width; x += minorCell.cellDim) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // ----- Draw Major Vertical Lines (as before) -----
    ctx.strokeStyle = colorArrToRgba(majorCell.lineColor);
    ctx.lineWidth = majorCell.lineWidth > 1 ? majorCell.lineWidth : 1.5;
    for (let x = 0; x <= width; x += majorCell.cellDim) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
  }

  const majorCell = {
    lineColor: [234, 239, 249, 1],
    lineWidth: 2,
    cellDim: 42,
  };
  const minorCell = {
    lineColor: [247, 249, 253, 1],
    lineWidth: 2,
    cellDim: 4.2,
  };

  function applyGridBackgroundToNav() {
    let gridCanvas = document.getElementById("headerGridBg");
    if (!gridCanvas) {
      gridCanvas = document.createElement("canvas");
      gridCanvas.id = "headerGridBg";
      gridCanvas.width = 1200;
      gridCanvas.height = 120;
      gridCanvas.style.display = "none";
      document.body.appendChild(gridCanvas);
    }
    drawBackgroundGrid(gridCanvas, majorCell, minorCell);
    const bgDataUrl = gridCanvas.toDataURL("image/png");

    const navInner = document.getElementById("nav-inner");
    if (navInner) {
      navInner.style.setProperty(
        "background-image",
        `url('${bgDataUrl}')`,
        "important"
      );
      navInner.style.setProperty("background-repeat", "repeat-x", "important");
      navInner.style.setProperty("background-size", "auto 100%", "important");
      navInner.style.setProperty(
        "background-position",
        "left center",
        "important"
      );
      navInner.style.setProperty("border-radius", "6px", "important");
      
      // (Optional) you can set the background-color to white or your desired value
      // navInner.style.setProperty("background-color", "#fff", "important");
    }
  }

  function removeGridBackgroundFromNav() {
    const navInner = document.getElementById("nav-inner");
    if (navInner) {
      navInner.style.removeProperty("background-image");
      navInner.style.removeProperty("background-repeat");
      navInner.style.removeProperty("background-size");
      navInner.style.removeProperty("background-position");
      navInner.style.removeProperty("border");
      // navInner.style.removeProperty("background-color"); // optional
    }
  }

  const getResponsiveMarginTop = () => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      return "0rem";
    } else if (window.matchMedia("(max-width: 1024px)").matches) {
      return "0.5rem";
    }
    return "2.5rem";
  };

  function applyScrolledStyles() {
    navInner.classList.add(
      "bg-grey-100",
      "lg:shadow-md",
      "text-grey-10",
      "mt-0",
      "animate-in"
    );
    navInner.classList.remove("bg-transparent", "text-grey-100", "lg:mt-12");

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) {
      // navInner.style.setProperty(
      //   "background-image",
      //   "url('/images/header-bg.svg')",
      //   "important"
      // );
      navInner.style.setProperty("border", "1px solid rgb(var(--grey-80) / 1)", "important")
      navInner.style.setProperty("background-size", "auto 100%", "important");
      navInner.style.setProperty("background-repeat", "repeat-x", "important");
      navInner.style.setProperty(
        "background-position",
        "left center",
        "important"
      );
    } else {
      navInner.style.removeProperty("background-image");
      navInner.style.removeProperty("background-size");
      navInner.style.removeProperty("background-position");
      navInner.style.removeProperty("border")
    }
    if (isDesktop) {
      applyGridBackgroundToNav();
    }

    // fallback/background colors for different breakpoints
    navOuter.style.setProperty(
      "background-color",
      window.matchMedia("(max-width: 1024px)").matches
        ? "rgb(var(--primary-50) / 1)"
        : "transparent",
      "important"
    );
    navInner.style.setProperty(
      "background-color",
      window.matchMedia("(max-width: 1024px)").matches
        ? "transparent"
        : "rgb(var(--grey-100) / 1)",
      "important"
    );
    navInner.style.setProperty(
      "color",
      window.matchMedia("(max-width: 1024px)").matches
        ? "rgb(var(--grey-100) / 1)"
        : "rgb(var(--grey-10) / 1)",
      "important"
    );
    navInner.style.setProperty(
      "margin-top",
      window.matchMedia("(max-width: 640px)").matches
        ? "0"
        : window.matchMedia("(max-width: 768px)").matches
        ? "1rem"
        : "0",
      "important"
    );

    // only style these if they actually exist
    if (navLinks) {
      navLinks.style.setProperty(
        "color",
        window.matchMedia("(max-width: 1024px)").matches
          ? "rgb(var(--grey-100) / 1)"
          : "rgb(var(--grey-40) / 1)",
        "important"
      );
      navLinks.style.setProperty(
        "font-weight",
        window.matchMedia("(max-width: 1024px)").matches ? "500" : "400",
        "important"
      );
    }
    if (joinNetwork) {
      joinNetwork.style.setProperty(
        "font-weight",
        window.matchMedia("(max-width: 1024px)").matches ? "600" : "500",
        "important"
      );
    }

    dashboardBtn.style.setProperty(
      "background-color",
      "rgb(var(--primary-50) / 1)",
      "important"
    );
    dashboardBtn.style.setProperty(
      "color",
      "rgb(var(--grey-100) / 1)",
      "important"
    );
    dashboardBtn.style.setProperty(
      "border-color",
      "rgb(var(--primary-50) / 1)",
      "important"
    );
    dashboardBtn.onmouseenter = () => {
      dashboardBtn.style.setProperty(
        "background-color",
        "rgb(var(--primary-40) / 1)",
        "important"
      );
    };
    dashboardBtn.onmouseleave = () => {
      dashboardBtn.style.setProperty(
        "background-color",
        "rgb(var(--primary-50) / 1)",
        "important"
      );
    };
    if (dashboardInnerBtn) {
      dashboardInnerBtn.style.setProperty(
        "background-color",
        "rgb(var(--primary-50) / 1)",
        "important"
      );
      dashboardInnerBtn.style.setProperty(
        "color",
        "rgb(var(--grey-100) / 1)",
        "important"
      );
      dashboardInnerBtn.style.setProperty(
        "border",
        "1px solid #1F51BE",
        "important"
      );
    }
    document.querySelectorAll(".nav-link.active").forEach((link) => {
      link.style.removeProperty("border-bottom");
      link.classList.add("border-b", "border-primary-50");
    });
  }

  function applyTransparentStyles() {
    navInner.classList.remove(
      "bg-grey-100",
      "lg:shadow-md",
      "text-grey-10",
      "mt-0",
      "animate-in"
    );
    navInner.classList.add("bg-transparent", "text-grey-100", "lg:mt-12");

    navInner.style.removeProperty("background-image");
    navInner.style.removeProperty("background-size");
    navInner.style.removeProperty("background-position");

    const mtop = getResponsiveMarginTop();
    navInner.style.setProperty("background-color", "transparent", "important");
    navInner.style.setProperty(
      "color",
      "rgb(var(--grey-100) / 1)",
      "important"
    );
    navInner.style.setProperty("margin-top", mtop, "important");
    removeGridBackgroundFromNav();

    if (navLinks) {
      // reset nav-links to transparent state
      navLinks.style.setProperty(
        "color",
        "rgb(var(--grey-100) / 1)",
        "important"
      );
      navLinks.style.setProperty("font-weight", "400", "important");
    }
    if (joinNetwork) {
      joinNetwork.style.setProperty("font-weight", "500", "important");
    }

    if (dashboardInnerBtn) {
      dashboardInnerBtn.style.setProperty(
        "background-color",
        "rgb(var(--grey-100) / 1)",
        "important"
      );
      dashboardInnerBtn.style.setProperty(
        "border",
        "1px solid rgb(var(--grey-100) / 1)",
        "important"
      );
      dashboardInnerBtn.style.setProperty(
        "color",
        "rgb(var(--grey-10) / 1)",
        "important"
      );
    }

    dashboardBtn.style.setProperty(
      "background-color",
      "rgb(var(--grey-100) / 1)",
      "important"
    );
    dashboardBtn.style.setProperty(
      "color",
      "rgb(var(--grey-10) / 1)",
      "important"
    );
    dashboardBtn.style.setProperty(
      "border-color",
      "rgb(var(--grey-100) / 1)",
      "important"
    );
    dashboardBtn.onmouseenter = () => {
      dashboardBtn.style.setProperty(
        "background-color",
        "rgb(var(--grey-80) / 1)",
        "important"
      );
      dashboardBtn.style.setProperty(
        "color",
        "rgb(var(--grey-10) / 1)",
        "important"
      );
    };
    dashboardBtn.onmouseleave = () => {
      dashboardBtn.style.setProperty(
        "background-color",
        "rgb(var(--grey-100) / 1)",
        "important"
      );
      dashboardBtn.style.setProperty(
        "color",
        "rgb(var(--grey-10) / 1)",
        "important"
      );
    };
    document.querySelectorAll(".nav-link.active").forEach((link) => {
      link.style.setProperty(
        "border-bottom",
        "1px solid rgb(var(--grey-100) / 1)",
        "important"
      );
    });
  }

  if (pageType === "home") {
    const onScroll = () => {
      if (window.scrollY > 50) {
        applyScrolledStyles();
      } else {
        applyTransparentStyles();
      }
    };

    // run once, then wire up scroll & resize
    setTimeout(() => {
      navInner.style.transition = "all 0.3s ease";
      onScroll();
      window.addEventListener("scroll", onScroll);
      window.addEventListener("resize", onScroll);
    }, 0);
  } else {
    // non-home pages: always scrolled
    applyScrolledStyles();
    window.addEventListener("resize", applyScrolledStyles);
  }

  // highlight your “active” nav-link
  const current = window.location.pathname.replace(/\/$/, "") || "/";
  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.origin !== window.location.origin) return;
    const hrefPath = link.pathname.replace(/\/$/, "") || "/";
    if (hrefPath === current) {
      link.classList.add("active");
    }
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    // skip any link that isn’t pointing to this exact origin
    if (link.origin !== window.location.origin) return;

    // now strip trailing slash and compare
    const hrefPath = link.pathname.replace(/\/$/, "") || "/";
    if (hrefPath === current) {
      link.classList.add("active");
    }
  });

  // —— Now handle MOBILE links:
  // give them all a class in HTML: e.g. <a class="mobile-nav-link" …>
  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    // only internal links
    if (link.origin !== window.location.origin) return;
    const hrefPath = link.pathname.replace(/\/$/, "") || "/";
    if (hrefPath === current) {
      // add your active color
      link.classList.add("text-primary-50");
      // prepend the SVG icon
      link.insertAdjacentHTML(
        "afterbegin",
        `
          <div class="relative w-6 h-6 ">
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="absolute inset-0 w-full h-full"
  >
    <g clip-path="url(#clip0)">
      <rect width="40" height="40" fill="white" stroke="text-primary-80" stroke-width="0.4"/>
      <path d="M0 0L40 40" stroke="rgb(var(--primary-80) / 1)" stroke-width="0.4"/>
      <path d="M0 40L40 0" stroke="rgb(var(--primary-80) / 1)" stroke-width="0.4"/>
      <path d="M20 0V40" stroke="rgb(var(--primary-80) / 1)" stroke-width="0.4"/>
      <path d="M0 20H40" stroke="rgb(var(--primary-80) / 1)" stroke-width="0.4"/>
      <rect x="2.5" y="7.5" width="35" height="25" rx="1" stroke="rgb(var(--primary-80) / 1)" stroke-width="0.4"/>
      <rect x="5" y="5" width="30" height="30" rx="1" stroke="rgb(var(--primary-80) / 1)" stroke-width="0.4"/>
      <rect x="7.5" y="37.5" width="35" height="25" rx="1" transform="rotate(-90 7.5 37.5)" stroke="rgb(var(--primary-80) / 1)" stroke-width="0.4"/>
      <circle cx="20" cy="20" r="17.5" stroke="rgb(var(--primary-80) / 1)" stroke-width="0.4"/>
      <circle cx="20" cy="20" r="7.5" stroke="rgb(var(--primary-80) / 1)" stroke-width="0.4"/>
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="40" height="40" fill="white"/>
      </clipPath>
    </defs>
  </svg>

  <!-- Overlay SVG: centered, smaller -->
  <div class="absolute transform top-1/2 left-1/2 
            translate-x-[-50%] -translate-y-1/2 
           w-4 h-4 border rounded-full 
           border-primary-50 p-[2px]">
    <svg
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="text-primary-50"
  >
    <path
      d="M10.12 3.95337L14.1667 8.00004L10.12 12.0467"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.83331 8H14.0533"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
    </div>
  
</div>
        `
      );
    }
  });
});
