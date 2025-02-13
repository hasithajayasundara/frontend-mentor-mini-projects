import A11YSlider from 'a11y-slider';

const primaryHeader = document.querySelector('.primary-header');
const navToggle = document.querySelector('.mobile-nav-toggle');
const primaryNav = document.querySelector('.primary-navigation');

new A11YSlider(document.querySelector('.slider')!, {
  adaptiveHeight: true,
  dots: false,
  centerMode: true,
  arrows: false,
});

navToggle?.addEventListener('click', () => {
  if (primaryNav?.hasAttribute('data-visible')) {
    navToggle.setAttribute('aria-expanded', String(false));
  } else {
    navToggle.setAttribute('aria-expanded', String(true));
  }
  primaryNav?.toggleAttribute('data-visible');
  primaryHeader?.toggleAttribute('data-overlay');
});
