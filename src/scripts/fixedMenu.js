(function () {
  const fixedMenu = document.querySelector('.fixed-menu')
  const sections = document.querySelectorAll('.section')

  sections.forEach((section, index) => {
    const item = document.createElement('li');
    item.classList.add('fixed-menu__item');
    const link = document.createElement('a');
    link.classList.add('fixed-menu__link');
    link.href="#";
    link.setAttribute('data-scroll-to', index)
    item.appendChild(link);
    fixedMenu.appendChild(item);
  })

  document.querySelector('.fixed-menu__item').classList.add('active')
}) ()