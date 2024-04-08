export function disableScroll() {
  document.body.style.overflow = 'hidden';
}

export function enableScroll() {
  document.body.style.overflow = 'unset';
}

export function scrollToTop(isSmooth = false) {
  window.scrollTo({ top: 0, behavior: isSmooth ? 'smooth' : 'instant' });
}
