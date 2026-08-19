(function () {
  let ready = false;
  let opened = false;

  // Aktif setelah 10 detik
  setTimeout(function () {
    ready = true;
  }, 10000);

  function openLinkOnce() {
    if (!ready || opened) return;

    opened = true;
    window.open('https://alwaysmulticulturallanding.com/wwr6tt02n?key=2de7878c4f21466fe87ee61b98ea81f3', '_blank', 'noopener');
  }

  // Desktop
  document.addEventListener('click', openLinkOnce);

  // Mobile
  document.addEventListener('touchstart', openLinkOnce, { passive: true });
})();
