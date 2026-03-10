/* ============================================================
   ESCUELA PRIMARIA JUANA SALTITOPA
   Premium Global JavaScript — v2
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

    /* ── Navbar scroll ── */
    const nav = document.querySelector('.nav');
    if (nav) {
        const check = () => nav.classList.toggle('is-scrolled', window.scrollY > 50);
        window.addEventListener('scroll', check, { passive: true });
        check();
    }

    /* ── Mobile menu ── */
    const toggle = document.querySelector('.nav__toggle');
    const drawer = document.querySelector('.nav__drawer');
    const backdrop = document.querySelector('.nav__backdrop');

    function openMenu() {
        toggle?.classList.add('is-open');
        drawer?.classList.add('is-open');
        backdrop?.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
        toggle?.classList.remove('is-open');
        drawer?.classList.remove('is-open');
        backdrop?.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    toggle?.addEventListener('click', () => {
        toggle.classList.contains('is-open') ? closeMenu() : openMenu();
    });
    backdrop?.addEventListener('click', closeMenu);
    drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

    /* ── Scroll-reveal (IntersectionObserver) ── */
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length) {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('is-visible');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
        reveals.forEach(el => obs.observe(el));
    }

    /* ── Animated counters ── */
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length) {
        const cobs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                const el = e.target;
                const end = +el.dataset.count;
                const suffix = el.dataset.suffix || '';
                const dur = 2200;
                const t0 = performance.now();
                (function tick(now) {
                    const p = Math.min((now - t0) / dur, 1);
                    const eased = 1 - Math.pow(1 - p, 3);
                    el.textContent = Math.floor(eased * end).toLocaleString() + suffix;
                    if (p < 1) requestAnimationFrame(tick);
                    else el.textContent = end.toLocaleString() + suffix;
                })(t0);
                cobs.unobserve(el);
            });
        }, { threshold: 0.4 });
        counters.forEach(el => cobs.observe(el));
    }

    /* ── Accordion ── */
    document.querySelectorAll('.accordion__trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.accordion__item');
            const panel = item.querySelector('.accordion__panel');
            const wasOpen = item.classList.contains('is-active');

            // close all siblings
            item.closest('.accordion')?.querySelectorAll('.accordion__item').forEach(si => {
                si.classList.remove('is-active');
                const sp = si.querySelector('.accordion__panel');
                if (sp) sp.style.maxHeight = '0';
            });

            if (!wasOpen && panel) {
                item.classList.add('is-active');
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        });
    });

    /* ── Carousel ── */
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const track = carousel.querySelector('.carousel__track');
        const slides = carousel.querySelectorAll('.carousel__slide');
        const dots = carousel.querySelectorAll('.carousel__dot');
        const prev = carousel.querySelector('.carousel__prev');
        const next = carousel.querySelector('.carousel__next');
        let cur = 0;
        const total = slides.length;

        function go(i) {
            cur = ((i % total) + total) % total;
            track.style.transform = `translateX(-${cur * 100}%)`;
            dots.forEach((d, j) => d.classList.toggle('is-active', j === cur));
        }

        prev?.addEventListener('click', () => go(cur - 1));
        next?.addEventListener('click', () => go(cur + 1));
        dots.forEach((d, i) => d.addEventListener('click', () => go(i)));

        let auto = setInterval(() => go(cur + 1), 6000);
        carousel.addEventListener('mouseenter', () => clearInterval(auto));
        carousel.addEventListener('mouseleave', () => {
            auto = setInterval(() => go(cur + 1), 6000);
        });
    }

    /* ── Smooth anchor scroll ── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href');
            if (id.length > 1) {
                const t = document.querySelector(id);
                if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
            }
        });
    });

});