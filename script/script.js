const hamburger = document.querySelector('.hamburger-menu__icon')
const nav = document.querySelector('.nav')
const hamburgerClose = document.querySelector('.hamburger-menu__close')

hamburger.addEventListener('click', (event) => {
  event.preventDefault()
  nav.classList.add('nav--hamburger-visible') 
})

hamburgerClose.addEventListener('click', (event) => {
  event.preventDefault()
  nav.classList.remove('nav--hamburger-visible') 
})