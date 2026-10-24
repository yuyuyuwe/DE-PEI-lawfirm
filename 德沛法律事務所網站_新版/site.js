/* 申請 LINE 官方帳號後，把加好友網址貼在這裡（例：https://lin.ee/xxxxxxx），LINE 按鈕就會出現 */
var LINE_URL = "";
(function(){
  document.documentElement.classList.add('js');
  document.querySelectorAll('[data-line]').forEach(function(el){ if(LINE_URL){ el.href = LINE_URL; el.hidden = false; } else { el.hidden = true; } });
  var hd = document.getElementById('banner');
  function onScroll(){ if(hd) hd.classList.toggle('solid', window.scrollY > 40); }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  var btn = document.getElementById('menu-btn'), sheet = document.getElementById('drawer');
  if(btn && sheet){
    btn.addEventListener('click', function(){
      var open = sheet.hidden;
      if(open){ sheet.hidden = false; requestAnimationFrame(function(){ document.body.classList.add('sheet-open'); }); }
      else { document.body.classList.remove('sheet-open'); setTimeout(function(){ sheet.hidden = true; }, 300); }
      btn.setAttribute('aria-expanded', String(open));
      btn.querySelector('.lbl').textContent = open ? '關閉' : '選單';
    });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && !sheet.hidden) btn.click(); });
  }
  /* 進場：區塊捲入畫面時淡入（只作用在首屏以下的元素，首屏內容一開始就完整顯示） */
  if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    var els = document.querySelectorAll('.intro-in, .person-in, .p-list li, .matters li, .n-list li, .cta-in');
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function(el){ if(el.getBoundingClientRect().top > window.innerHeight){ el.classList.add('pre'); io.observe(el); } });
  }
  requestAnimationFrame(function(){ document.body.classList.add('is-loaded'); });
  document.querySelectorAll('.copy').forEach(function(b){
    b.addEventListener('click', function(){
      var t = b.getAttribute('data-copy'), old = b.textContent;
      function done(){ b.textContent = '已複製'; setTimeout(function(){ b.textContent = old; }, 1600); }
      function fallback(){ var el = document.getElementById(b.getAttribute('data-target')); if(!el) return; var r = document.createRange(); r.selectNodeContents(el); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = '已選取，請按複製'; }
      try { navigator.clipboard.writeText(t).then(done, fallback); } catch(e){ fallback(); }
    });
  });
})();
