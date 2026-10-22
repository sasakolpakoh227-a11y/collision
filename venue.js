/* Collision: пары слов сталкиваются при прокрутке; часы и подсказка, подают ли сейчас завтрак */
(function () {
  var ps = document.querySelectorAll('.pr2');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('hit'); io.unobserve(e.target); } }); }, { threshold: .25 });
    ps.forEach(function (p) { io.observe(p); });
  } else ps.forEach(function (p) { p.classList.add('hit'); });
  var c = document.querySelector('[data-bclock]'), s = document.querySelector('[data-bsay]');
  function tick() {
    if (!c) return;
    var d = new Date(Date.now() + 3 * 3600e3), h = d.getUTCHours(), m = d.getUTCMinutes(), we = d.getUTCDay() === 0 || d.getUTCDay() === 6;
    var t = h + m / 60, o = we ? 10 : 8;
    c.textContent = (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
    s.textContent = t >= o && t < 21.5 ? 'Сейчас завтрак подают. Ещё ' + Math.floor((21.5 - t)) + ' ч ' + Math.round(((21.5 - t) % 1) * 60) + ' мин.'
      : t < o ? 'Откроемся в ' + o + ':00 и сразу начнём с завтрака.' : 'Завтраки на сегодня закончились, до 22:00 кофе и десерты.';
  }
  tick(); setInterval(tick, 30000);
})();
