// Scroll reveals, the header border and the closing star. All three use
// IntersectionObserver, so nothing runs on scroll events. Without JavaScript,
// or without IntersectionObserver, everything is simply shown as-is.
(function () {
  var root = document.documentElement;

  if (!('IntersectionObserver' in window)) {
    root.classList.remove('js');
    return;
  }

  var reveal = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      reveal.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(function (el) { reveal.observe(el); });

  var star = document.querySelector('.star');
  if (star) {
    var ignite = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      star.classList.add('is-lit');
      ignite.disconnect();
    }, { threshold: 0.6 });
    ignite.observe(star);
  }

  // The header gains its border once the page has moved off the very top.
  var header = document.querySelector('.site-header');
  var sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:8px;pointer-events:none;';
  document.body.prepend(sentinel);
  new IntersectionObserver(function (entries) {
    header.classList.toggle('is-scrolled', !entries[0].isIntersecting);
  }).observe(sentinel);
})();
