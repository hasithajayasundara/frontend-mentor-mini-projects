const primaryHeader = document.querySelector('.primary-header');
const navToggle = document.querySelector('.mobile-nav-toggle');
const primaryNav = document.querySelector('.primary-navigation');

navToggle?.addEventListener('click', () => {
  if(primaryNav?.hasAttribute('data-visible')){
    navToggle.setAttribute('aria-expanded', String(false));
  }else{
    navToggle.setAttribute('aria-expanded', String(true));
  }
  primaryNav?.toggleAttribute('data-visible');
  primaryHeader?.toggleAttribute('data-overlay');
});
