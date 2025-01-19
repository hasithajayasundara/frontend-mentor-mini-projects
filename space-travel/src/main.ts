const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const primaryNavigation = document.querySelector('.primary-navigation');

mobileNavToggle?.addEventListener('click', () => {
  const ariaExpanded = mobileNavToggle.getAttribute('aria-expanded');
  if (ariaExpanded === 'false') {
    mobileNavToggle.setAttribute('aria-expanded', 'true');
    primaryNavigation?.setAttribute('data-visible', 'true');
  } else {
    mobileNavToggle.setAttribute('aria-expanded', 'false');
    primaryNavigation?.setAttribute('data-visible', 'false');
  }
});
