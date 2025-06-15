document.addEventListener('DOMContentLoaded', () => {
  const tocBtn = document.getElementById('toc-toggle');
  const tocPanel = document.getElementById('toc-panel');
  const tocClose = document.getElementById('toc-close');
  const readProgress = document.querySelectorAll('.read-progress');
  const circleMobile = document.getElementById('progress-circle-mobile');
  const circleDesktop = document.getElementById('progress-circle-desktop');
  const tocLinks = document.querySelectorAll('#toc-panel a');
  const content = document.querySelector('.post__content');

  if (!tocBtn || !tocPanel || !tocClose || !circleMobile||!circleDesktop || !readProgress || !content) return;

  // Toggle TOC
  tocBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (window.matchMedia("(max-width: 768px)").matches){
      tocPanel.classList.toggle('hidden');
    }
  });

  // Close TOC
  tocClose.addEventListener('click', (e) => {
    e.stopPropagation();
    tocPanel.classList.add('hidden');
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!tocPanel.contains(e.target) && !tocBtn.contains(e.target)) {
      tocPanel.classList.add('hidden');
    }
  });

  // === Progress Tracking ===
  function handleScrollProgress() {
    const total = content.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY - content.offsetTop;
    const progress = Math.min(100, Math.max(0, (scrolled / total) * 100));

    // Text update
    readProgress.forEach((element) => {
      element.textContent = `${Math.round(progress)}%`;
    });

    // Circle update
    const radius = 22;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;
    circleMobile.style.strokeDasharray = `${circumference}`;
    circleMobile.style.strokeDashoffset = offset;
    circleDesktop.style.strokeDasharray = `${circumference}`;
    circleDesktop.style.strokeDashoffset = offset;

    // Active TOC
    let current = null;
    tocLinks.forEach(link => {
      const id = decodeURIComponent(link.hash).substring(1);
      const section = document.getElementById(id);
      if (section && section.getBoundingClientRect().top < window.innerHeight * 0.3) {
        current = link;
      }
    });

    tocLinks.forEach(link => link.classList.remove('active'));
    if (current) current.classList.add('active');
  }

  window.addEventListener('scroll', handleScrollProgress);
});
