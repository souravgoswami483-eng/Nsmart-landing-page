/* ============================================================
   SCRIPT.JS – N Smart Landing Page
============================================================ */
document.addEventListener('DOMContentLoaded', () => {

    /* ── 1. NAVBAR SCROLL & ACTIVE LINK ── */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateNavbar() {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    }
    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();

    /* ── 2. HAMBURGER MENU ── */
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        const open = navMenu.classList.toggle('open');
        const bars = hamburger.querySelectorAll('span');
        if (open) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            bars[1].style.opacity   = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
        }
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            hamburger.querySelectorAll('span').forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
        });
    });

    // Close menu on outside click
    document.addEventListener('click', e => {
        if (!navbar.contains(e.target)) {
            navMenu.classList.remove('open');
            hamburger.querySelectorAll('span').forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
        }
    });

    /* ── 3. HERO PARTICLES ── */
    const particleContainer = document.getElementById('particles');
    if (particleContainer) {
        for (let i = 0; i < 40; i++) {
            const p = document.createElement('div');
            p.classList.add('particle');
            const size = Math.random() * 5 + 2;
            p.style.cssText = `
                width:${size}px; height:${size}px;
                left:${Math.random()*100}%;
                animation-delay:${Math.random()*14}s;
                animation-duration:${Math.random()*10+8}s;
                opacity:${Math.random()*0.5+0.15};
            `;
            particleContainer.appendChild(p);
        }
    }

    /* ── 4. ANIMATED COUNTERS ── */
    function animateCounter(el) {
        const target   = parseInt(el.dataset.target, 10);
        const duration = 2200;
        const start    = performance.now();
        function update(now) {
            const p = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            const v = ease * target;
            if (target >= 100000)      el.textContent = Math.floor(v/1000) + 'K+';
            else if (target >= 1000)   el.textContent = (v/1000).toFixed(0) + 'K+';
            else                       el.textContent = Math.floor(v) + '+';
            if (p < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                entry.target.dataset.counted = '1';
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.6 }).observe && document.querySelectorAll('.stat-num[data-target]').forEach(el => {
        new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.counted) {
                    entry.target.dataset.counted = '1';
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.6 }).observe(el);
    });

    /* ── 5. FADE-UP ON SCROLL ── */
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('visible'); fadeObserver.unobserve(entry.target); }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

    document.querySelectorAll(
        '.category-card, .course-card, .topper-card, .resource-card, ' +
        '.why-stat-card, .why-feature, .contact-card, .feature-item, ' +
        '.app-feature, .city-card, .store-btn'
    ).forEach((el, i) => {
        el.classList.add('fade-up');
        el.style.transitionDelay = `${(i % 4) * 0.08}s`;
        fadeObserver.observe(el);
    });

    /* ── 6. SECTION HEADER STAGGER ── */
    new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            ['.section-tag', '.section-title', '.section-subtitle'].forEach((sel, i) => {
                const el = entry.target.querySelector(sel);
                if (!el) return;
                el.style.cssText = 'opacity:0;transform:translateY(20px)';
                setTimeout(() => {
                    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    el.style.opacity = '1'; el.style.transform = 'none';
                }, i * 130);
            });
        });
    }, { threshold: 0.25 }).observe && document.querySelectorAll('.section-header').forEach(h => {
        new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                ['.section-tag', '.section-title', '.section-subtitle'].forEach((sel, i) => {
                    const el = entry.target.querySelector(sel);
                    if (!el) return;
                    el.style.cssText = 'opacity:0;transform:translateY(20px)';
                    setTimeout(() => {
                        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        el.style.opacity = '1'; el.style.transform = 'none';
                    }, i * 130);
                });
            });
        }, { threshold: 0.25 }).observe(h);
    });

    /* ── 7. HERO ENTRANCE ── */
    ['.hero-badge', '.hero-title', '.hero-subtitle', '.hero-ctas', '.hero-form-wrap'].forEach((sel, i) => {
        const el = document.querySelector(sel);
        if (!el) return;
        el.style.opacity = '0';
        el.style.transform = 'translateY(28px)';
        setTimeout(() => {
            el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
            el.style.opacity = '1'; el.style.transform = 'none';
        }, 200 + i * 120);
    });

    /* ── 8. SCROLL TO TOP ── */
    const scrollTopBtn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    /* ── 9. ENQUIRY FORM SUBMIT ── */
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name  = document.getElementById('fName').value.trim();
            const phone = document.getElementById('fPhone').value.trim();
            const exam  = document.getElementById('fExam').value;
            const cls   = document.getElementById('fClass').value;
            if (!name || !phone || !exam || !cls) {
                showFormMsg('⚠️ Please fill in all fields.', 'error');
                return;
            }
            if (!/^[\d\s+\-()]{7,15}$/.test(phone)) {
                showFormMsg('📞 Please enter a valid phone number.', 'error');
                return;
            }
            const btn = document.getElementById('formSubmitBtn');
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            btn.disabled = true;
            setTimeout(() => {
                showFormMsg('✅ Thank you! Our counsellor will call you shortly.', 'success');
                enquiryForm.reset();
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit & Get Callback';
                btn.disabled = false;
            }, 1500);
        });
    }

    function showFormMsg(msg, type) {
        let el = document.getElementById('formMsg');
        if (!el) {
            el = document.createElement('div');
            el.id = 'formMsg';
            enquiryForm.after(el);
        }
        el.textContent = msg;
        el.style.cssText = `
            margin-top:12px; padding:10px 14px; border-radius:10px; font-size:0.88rem;
            font-weight:600; text-align:center;
            background:${type==='success' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.12)'};
            border:1px solid ${type==='success' ? 'rgba(16,185,129,0.35)' : 'rgba(239,68,68,0.35)'};
            color:${type==='success' ? '#10b981' : '#ef4444'};
        `;
        setTimeout(() => el.remove(), 5000);
    }

    /* ── 10. RIPPLE ON BUTTONS ── */
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = '@keyframes rippleAnim { to { transform: scale(2.5); opacity: 0; } }';
    document.head.appendChild(rippleStyle);

    document.querySelectorAll('.btn, .card-btn, .store-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect   = this.getBoundingClientRect();
            const size   = Math.max(rect.width, rect.height);
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position:absolute; width:${size}px; height:${size}px; border-radius:50%;
                background:rgba(255,255,255,0.2); transform:scale(0); pointer-events:none; z-index:10;
                left:${e.clientX-rect.left-size/2}px; top:${e.clientY-rect.top-size/2}px;
                animation:rippleAnim 0.65s ease-out forwards;
            `;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 700);
        });
    });

    /* ── 11. SMOOTH SCROLL FOR ANCHORS ── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        });
    });

    /* ── 12. CITY CARD MOUSE PARALLAX ── */
    document.querySelectorAll('.city-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width  - 0.5;
            const y = (e.clientY - rect.top)  / rect.height - 0.5;
            card.style.transform = `perspective(800px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-6px) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

});
