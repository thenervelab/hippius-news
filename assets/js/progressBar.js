document.addEventListener('DOMContentLoaded', () => {
  const tocBtn = document.getElementById('toc-toggle');
  const tocPanel = document.getElementById('toc-panel');
  const tocClose = document.getElementById('toc-close');
  const readProgress = document.getElementById('read-progress');
  const circle = document.getElementById('progress-circle');
  const tocLinks = document.querySelectorAll('#toc-panel a');
  const content = document.querySelector('.post__content');

  if (!tocBtn || !tocPanel || !tocClose || !circle || !readProgress || !content) return;

  // Toggle TOC
  tocBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    tocPanel.classList.toggle('hidden');
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
    readProgress.innerText = `${Math.round(progress)}%`;

    // Circle update
    const radius = 22;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;
    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = offset;

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
