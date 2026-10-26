(function () {
  'use strict';
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('navLinks');
  var links = nav.querySelectorAll('a');

  function setMenu(open) {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  btn.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  links.forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  document.getElementById('year').textContent = new Date().getFullYear();

  // Highlight the current section in the menu
  var sections = document.querySelectorAll('main section[id]');
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });

    // Fade in project and job cards once
    var items = document.querySelectorAll('.project, .job');
    var reveal = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { el.classList.add('reveal'); reveal.observe(el); });
  }
  // Copy email / phone
  var msg = document.getElementById('copyMsg');
  document.querySelectorAll('.copy').forEach(function (b) {
    b.addEventListener('click', function () {
      var text = b.getAttribute('data-copy');
      function done(ok) {
        msg.textContent = ok ? 'Copied: ' + text : 'Copy failed. Please select and copy it manually.';
        setTimeout(function () { msg.textContent = ''; }, 2500);
      }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
      } else {
        var t = document.createElement('textarea');
        t.value = text; t.style.position = 'fixed'; t.style.opacity = '0';
        document.body.appendChild(t); t.select();
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(t); done(ok);
      }
    });
  });
  // Back-to-top button
  var toTop = document.getElementById('toTop');
  function onScroll() { toTop.classList.toggle('show', window.scrollY > 600); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();