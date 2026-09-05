type Lang = 'kr' | 'jp';

const STORAGE_KEY = 'profile-lang';

function getSavedLang(): Lang {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === 'jp' ? 'jp' : 'kr';
}

function applyLang(lang: Lang): void {
  const nodes = document.querySelectorAll<HTMLElement>('[data-kr][data-jp]');
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
    if (el) el.textContent = nextLabel;
  });

  localStorage.setItem(STORAGE_KEY, lang);
}

function initLangToggle(): void {
  let current: Lang = getSavedLang();
  applyLang(current);

  const toggle = () => {
    current = current === 'kr' ? 'jp' : 'kr';
    applyLang(current);
  };

  ['lang-toggle', 'lang-toggle-mobile', 'lang-toggle-footer'].forEach((id) => {
    document.getElementById(id)?.addEventListener('click', toggle);
  });
}

function initMobileMenu(): void {
  const menuBtn = document.getElementById('menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!menuBtn || !menu) return;

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

function initScrollSpy(): void {
  const sections = document.querySelectorAll<HTMLElement>('main section[id]');
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link');

  const setActive = (id: string) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', isActive);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

function initScrollReveal(): void {
  const revealEls = document.querySelectorAll<HTMLElement>('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

function init(): void {
  initLangToggle();
  initMobileMenu();
  initScrollSpy();
  initScrollReveal();
}

document.addEventListener('DOMContentLoaded', init);
