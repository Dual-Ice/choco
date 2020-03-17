const hamburger = document.querySelector('.hamburger-menu__icon')
const nav = document.querySelector('.nav')
const hamburgerClose = document.querySelector('.hamburger-menu__close')
const heroButton = document.querySelector('.hero__button a.btn')

hamburger.addEventListener('click', (event) => {
  event.preventDefault()
  nav.classList.add('nav--hamburger-visible') 
})

hamburgerClose.addEventListener('click', (event) => {
  event.preventDefault()
  nav.classList.remove('nav--hamburger-visible') 
})

heroButton.addEventListener('mouseover', () => {
  heroButton.classList.add('btn--green')
})

heroButton.addEventListener('mouseout', () => {
  heroButton.classList.remove('btn--green')
})