(function () {
  const menuElementTitles = document.querySelectorAll('.menu__element-title')

  function switchScroll () {
    document.body.classList.toggle('body--menu-openned')
  }
  
  menuElementTitles.forEach(element => {
    element.addEventListener('click', (event) => {
      event.preventDefault()
      const menuElement = element.parentElement
      let close

      if (window.innerWidth <= 480) {
        const section = document.querySelector('.menu')
        const overlay = document.createElement('div')
        overlay.classList.add('overlay')
        overlay.innerHTML = menuElement.innerHTML
        overlay.classList.add('menu__element--openned')
        overlay.classList.add(menuElement.classList[2])
        section.append(overlay)
        close = overlay.querySelector('.menu__element-close')
        switchScroll()
        close.addEventListener('click', (event) => {
          event.preventDefault()
          section.removeChild(overlay)
          switchScroll()
        })
        return
      }

      close = menuElement.querySelector('.menu__element-close')
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
}) ()