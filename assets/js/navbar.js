document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("main-nav");
    const navInner = document.getElementById("nav-inner");
    const dashboardBtn = document.getElementById("dashboard-btn");
  
    function onScroll() {
      if (window.scrollY > 50) {
        navInner.classList.add("bg-white", "shadow-md", "text-black");
        navInner.classList.remove("bg-transparent", "text-white");

        dashboardBtn.classList.add("bg-primary-50", "text-white", "border-primary-50", "hover:bg-primary-40");
        dashboardBtn.classList.remove("bg-white", "text-black", "border-white");
      } else {
        navInner.classList.add("bg-transparent", "text-white");
        navInner.classList.remove("bg-white", "shadow-md", "text-black");

        dashboardBtn.classList.add("bg-white", "text-black", "border-white", "hover:text-black");
        dashboardBtn.classList.remove("bg-primary-50", "text-white", "border-primary-50");
      }
    }
  
    // Force transparent state on initial load
    navInner.classList.add("bg-transparent", "text-white");
    navInner.classList.remove("bg-white", "shadow-md", "text-black");
  
    onScroll(); // Check scroll on load
    window.addEventListener("scroll", onScroll);
  });
  