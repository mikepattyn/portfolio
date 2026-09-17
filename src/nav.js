import { t } from './locale.js';

const MQ = '(max-width: 800px)';

export function initNav() {
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.site-nav__toggle');
  const menu = document.getElementById('site-nav-menu');
  if (!nav || !toggle || !menu) return;

  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', t(open ? 'nav.closeMenu' : 'nav.openMenu'));
    toggle.setAttribute('data-i18n-aria', open ? 'nav.closeMenu' : 'nav.openMenu');
  };

  const close = () => setOpen(false);

  toggle.addEventListener('click', () => {
    setOpen(!nav.classList.contains('is-open'));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', close);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const wasOpen = nav.classList.contains('is-open');
    close();
    if (wasOpen) toggle.focus();
  });

  const media = window.matchMedia(MQ);
  const onBreakpoint = () => {
    if (!media.matches) close();
  };
  if (media.addEventListener) {
    media.addEventListener('change', onBreakpoint);
  } else {
    media.addListener(onBreakpoint);
  }
}
