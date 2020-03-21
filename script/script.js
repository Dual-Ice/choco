const hamburger = document.querySelector('.hamburger-menu__icon')
const nav = document.querySelector('.nav')
const hamburgerClose = document.querySelector('.hamburger-menu__close')
const heroButton = document.querySelector('.hero__button a.btn')
const memberName = document.querySelectorAll('.member__name')
const menuElementTitles = document.querySelectorAll('.menu__element-title')

hamburger.addEventListener('click', (event) => {
  event.preventDefault()
  nav.classList.add('nav--hamburger-visible')
  document.body.classList.add('body--menu-openned')
})

hamburgerClose.addEventListener('click', (event) => {
  event.preventDefault()
  nav.classList.remove('nav--hamburger-visible') 
  document.body.classList.remove('body--menu-openned')
})

heroButton.addEventListener('mouseover', () => {
  heroButton.classList.add('btn--green')
})

heroButton.addEventListener('mouseout', () => {
  heroButton.classList.remove('btn--green')
})

memberName.forEach(memberName => {
  memberName.addEventListener('click', (event) => {
    event.preventDefault()
    const member = memberName.parentElement.parentElement

    if (member.classList.contains('member--desc-shown')) {
      member.classList.remove('member--desc-shown')
    } else {
      const memberDescShown = document.querySelector('.member--desc-shown')
      if (memberDescShown && !member.isEqualNode(memberDescShown)) {
        memberDescShown.classList.remove('member--desc-shown') 
      }
      member.classList.add('member--desc-shown')
    }
  })
})

menuElementTitles.forEach(element => {
  element.addEventListener('click', (event) => {
    event.preventDefault()
    const menuElement = element.parentElement
    const close = menuElement.querySelector('.menu__element-close')

    close.addEventListener('click', (event) => {
      event.preventDefault()
      menuElement.classList.remove('menu__element--openned')
    })

    if (menuElement.classList.contains('menu__element--openned')) {
      menuElement.classList.remove('menu__element--openned')
    } else {
      const openedMenuElement = document.querySelector('.menu__element--openned')
      if (openedMenuElement && !menuElement.isEqualNode(openedMenuElement)) {
        openedMenuElement.classList.remove('menu__element--openned') 
      }
      menuElement.classList.add('menu__element--openned')
    }
  })
})

