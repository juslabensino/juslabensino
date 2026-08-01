(() => {
  const button = document.querySelector('[data-jl-menu-button]');
  const menu = document.querySelector('[data-jl-menu]');
  if (!button || !menu) return;

  button.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(isOpen));
  });

  menu.addEventListener('click', event => {
    if (event.target.closest('a')) {
      menu.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
    }
  });
})();
