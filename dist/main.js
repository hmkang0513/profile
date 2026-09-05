"use strict";
const STORAGE_KEY = 'profile-lang';
function getSavedLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'jp' ? 'jp' : 'kr';
}
function applyLang(lang) {
    const nodes = document.querySelectorAll('[data-kr][data-jp]');
    nodes.forEach((el) => {
        const text = lang === 'kr' ? el.dataset.kr : el.dataset.jp;
        if (text !== undefined) {
            el.textContent = text;
        }
    });
    document.documentElement.lang = lang === 'kr' ? 'ko' : 'ja';
    document.documentElement.classList.toggle('jp', lang === 'jp');
    const nextLabel = lang === 'kr' ? 'JP' : 'KR';
    ['lang-toggle-label', 'lang-toggle-label-mobile', 'lang-toggle-label-footer'].forEach((id) => {
        const el = document.getElementById(id);
        if (el)
            el.textContent = nextLabel;
    });
    localStorage.setItem(STORAGE_KEY, lang);
}
function initLangToggle() {
    let current = getSavedLang();
    applyLang(current);
    const toggle = () => {
        current = current === 'kr' ? 'jp' : 'kr';
        applyLang(current);
    };
    ['lang-toggle', 'lang-toggle-mobile', 'lang-toggle-footer'].forEach((id) => {
        var _a;
        (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.addEventListener('click', toggle);
    });
}
function initMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!menuBtn || !menu)
        return;
    menuBtn.addEventListener('click', () => {
        const isOpen = !menu.classList.contains('hidden');
        menu.classList.toggle('hidden');
        menuBtn.setAttribute('aria-expanded', String(!isOpen));
    });
    menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });
}
function initScrollSpy() {
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const setActive = (id) => {
        navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('active', isActive);
        });
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setActive(entry.target.id);
            }
        });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    sections.forEach((section) => observer.observe(section));
}
function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => observer.observe(el));
}
function init() {
    initLangToggle();
    initMobileMenu();
    initScrollSpy();
    initScrollReveal();
}
document.addEventListener('DOMContentLoaded', init);
