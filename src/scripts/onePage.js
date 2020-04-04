(function () {
  const sections = $('.section');
  const display = $('.maincontent');

  let scrollBlock = false;
  const agent = new MobileDetect(window.navigator.userAgent)
  const isMobile = agent.mobile()

  function countSectionPostion (sectionIndex) {
    return sectionIndex * -100
  }

  function goToSection (sectionIndex) {
    if (scrollBlock) return

    const position = countSectionPostion(sectionIndex);
    resetActiveClass(sections, sectionIndex)
    scrollBlock = true;

    display.css({
      transform: `translateY(${position}%)`
    })

    $(display).on('transitionend', () => {
      resetActiveClass($(".fixed-menu__item"), sectionIndex);
      scrollBlock = false;
    })
  }

  function resetActiveClass (items, itemIndex) {
    items
      .eq(itemIndex)
      .addClass('active')
      .siblings()
      .removeClass('active')
  }

  function scrollSection () {
    const activeSection = sections.filter('.active')
    const nextSection = activeSection.next()
    const prevSection = activeSection.prev()

    return {
      next() {
        if (nextSection.length) {
          goToSection(nextSection.index())
        }
      },
      prev() {
        if (prevSection.length) {
          goToSection(prevSection.index())
        }
      }
    }
  }

  $(window).on('wheel', (e) => {
    const deltaY = e.originalEvent.deltaY;
    const scroller = scrollSection()

    if (deltaY > 0) {
      scroller.next()
    }
    if (deltaY < 0) {
      scroller.prev()
    }
  })

  $(document).on('keydown', (e) => {
    const tagName = e.target.tagName.toLowerCase()
    const focusInInputs = ['input', 'textarea'].includes(tagName)
    const scroller = scrollSection()

    if (focusInInputs) return

    switch (e.keyCode) {
      case 38:
        scroller.next()
        break;
      case 40:
        scroller.prev()
        break; 
    }
  })

  $('[data-scroll-to]').on('click', (e) => {
    e.preventDefault()
    
    const $this = $(e.currentTarget);
    const target = $this.attr('data-scroll-to')
    if ($this.hasClass('nav__link')) {
      $('nav').removeClass('nav--hamburger-visible')
      document.body.classList.toggle('body--menu-openned')
    }

    goToSection(target)
  })

  if (isMobile) {
    $('body').swipe({
      swipe: (event, direction) => {
        let swipeDirection 
        const scroller = scrollSection()
        
        if (direction === 'up') swipeDirection = 'next'
        if (direction === 'down') swipeDirection = 'prev'
  
        scroller[swipeDirection]()
      }
    })
  }
}) ()