(function () {
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Navigation ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('siteNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Index overlay (meeting navigation) ---------- */
  var indexToggle = document.getElementById('indexToggle');
  var indexOverlay = document.getElementById('indexOverlay');
  var indexClose = document.getElementById('indexClose');
  if (indexToggle && indexOverlay) {
    var openIndex = function (e) {
      if (e) e.preventDefault();
      indexOverlay.classList.add('is-open');
      indexOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };
    var closeIndex = function () {
      indexOverlay.classList.remove('is-open');
      indexOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
    indexToggle.addEventListener('click', openIndex);
    if (indexClose) indexClose.addEventListener('click', closeIndex);
    indexOverlay.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeIndex); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && indexOverlay.classList.contains('is-open')) closeIndex();
    });
  }

  /* ---------- Header: transparent on hero → compact on scroll ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var updateHeader = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  /* ---------- Topography motif — Collection 01 only ---------- */
  var TOPO_SVG =
    '<svg viewBox="0 0 600 440" preserveAspectRatio="xMidYMid meet">' +
    '<path class="topo-line" d="M40,360 C90,300 120,220 100,160 C85,115 120,70 190,55 ' +
    'C260,40 300,80 340,70 C390,58 430,90 460,140 C490,190 470,250 500,300 ' +
    'C520,335 500,380 450,395 C380,415 300,400 230,410 C150,422 70,410 40,360 Z"/>' +
    '<path class="topo-line" d="M90,340 C120,290 140,230 125,180 C115,145 140,110 195,100 ' +
    'C250,90 280,120 315,112 C355,103 385,128 405,165 C425,202 410,245 430,280 ' +
    'C445,305 430,335 395,345 C345,360 285,350 235,358 C180,366 120,378 90,340 Z"/>' +
    '<path class="topo-line topo-line--accent" d="M140,320 C160,280 175,235 165,195 ' +
    'C158,168 175,142 215,135 C255,128 275,150 300,144 C330,137 350,155 365,182 ' +
    'C380,208 370,238 385,262 C395,280 385,300 360,308 C325,318 285,312 250,317 ' +
    'C210,323 165,332 140,320 Z"/>' +
    '<path class="topo-line" d="M190,295 C202,268 210,235 204,208 C199,190 210,172 235,168 ' +
    'C260,164 273,178 290,174 C310,169 323,182 332,200 C341,218 334,238 343,254 ' +
    'C350,266 343,280 325,285 C302,291 275,287 252,290 C226,294 200,301 190,295 Z"/>' +
    '</svg>';
  document.querySelectorAll('.topo').forEach(function (el) { el.innerHTML = TOPO_SVG; });

  /* ---------- Scroll coordinate (archive vocabulary) ---------- */
  var coord = document.getElementById('coord');
  if (coord) {
    var updateCoord = function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var pos = max > 0 ? Math.round((doc.scrollTop || window.pageYOffset) / max * 1240) : 0;
      coord.textContent = 'Y ' + String(pos).padStart(4, '0');
    };
    updateCoord();
    window.addEventListener('scroll', updateCoord, { passive: true });
    window.addEventListener('resize', updateCoord);
  }

  /* ---------- Reveal on scroll (mask/clip-path — "révéler") ---------- */
  if (!reducedMotion && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    document.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });

    document.querySelectorAll('.assembly').forEach(function (list) {
      var items = list.querySelectorAll('li');
      var listObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            items.forEach(function (li, i) {
              setTimeout(function () { li.classList.add('is-visible'); }, i * 130);
            });
            listObserver.unobserve(list);
          }
        });
      }, { threshold: 0.4 });
      listObserver.observe(list);
    });
  } else {
    document.querySelectorAll('.reveal, .assembly li').forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Fragment → Signature assembly (V3.3) ---------- */
  if (!reducedMotion && 'IntersectionObserver' in window) {
    var fragObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-assembled');
          fragObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.fragment-signature').forEach(function (el) { fragObserver.observe(el); });
  } else {
    document.querySelectorAll('.fragment-signature').forEach(function (el) { el.classList.add('is-assembled'); });
  }

  /* ---------- Capability constellation hover (V3.3) ---------- */
  document.querySelectorAll('.constellation').forEach(function (cst) {
    var items = cst.querySelectorAll('.constellation-item');
    items.forEach(function (item) {
      item.addEventListener('mouseenter', function () {
        var tag = item.getAttribute('data-tag');
        cst.classList.add('is-hovering');
        items.forEach(function (i) {
          if (i === item || (tag && i.getAttribute('data-connects') && i.getAttribute('data-connects').split(' ').indexOf(tag) !== -1)) {
            i.classList.add('is-active');
          }
        });
      });
      item.addEventListener('mouseleave', function () {
        cst.classList.remove('is-hovering');
        items.forEach(function (i) { i.classList.remove('is-active'); });
      });
    });
  });

  /* ---------- Collection 01 proprietary interaction ---------- */
  document.querySelectorAll('[data-proof]').forEach(function (proof) {
    var frames = Array.prototype.slice.call(proof.querySelectorAll('.proof-frame'));
    var dots = Array.prototype.slice.call(proof.querySelectorAll('.proof-dot'));
    if (!frames.length) return;

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        frames[i].scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      });
    });

    if (reducedMotion || !('IntersectionObserver' in window)) return;
    proof.classList.add('is-enhanced');

    var setActive = function (index) {
      dots.forEach(function (dot, i) {
        var active = i === index;
        dot.classList.toggle('is-active', active);
        if (active) dot.setAttribute('aria-current', 'step');
        else dot.removeAttribute('aria-current');
      });
    };
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(frames.indexOf(entry.target));
      });
    }, { threshold: 0.5 });
    frames.forEach(function (frame) { observer.observe(frame); });
  });

  /* ---------- Custom cursor — desktop hover-capable only, discreet ------- */
  if (!reducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var cursor = document.createElement('div');
    cursor.className = 'cursor-dot';
    cursor.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cursor);

    window.addEventListener('mousemove', function (e) {
      cursor.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
    }, { passive: true });

    document.querySelectorAll('[data-cursor]').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursor.textContent = el.getAttribute('data-cursor');
        cursor.classList.add('is-active');
      });
      el.addEventListener('mouseleave', function () {
        cursor.classList.remove('is-active');
      });
    });
  }
})();
