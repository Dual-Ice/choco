$(function () {
  function countSlidePostion (slideIndex) {
    return slideIndex * -100
  }

  function resetActiveClass (items, itemIndex) {
    items
      .eq(itemIndex)
      .addClass('active')
      .siblings()
      .removeClass('active')
  }

  function goToSlide (container, items, slideIndex) {
    const list = container.find('.slider__list') 

    const position = countSlidePostion(slideIndex)
    resetActiveClass(items, slideIndex)

    list.css({
      transform: `translateX(${position}%)`
    })
  }

  $('.arrow').on('click', function (e) {
    e.preventDefault()
    const $this = $(this),
      container = $this.closest('.slider'),
      items = container.find('.slider__item'),
      activeSlide = items.filter('.active')

    let existedItem, edgeItem, reqItem

    if ($this.hasClass('arrow--right')) {
      existedItem = activeSlide.next()
      edgeItem = items.first()
    }

    if ($this.hasClass('arrow--left')) {
      existedItem = activeSlide.prev()
      edgeItem = items.last()
    }

    reqItem = existedItem.length 
      ? existedItem.index()
      : edgeItem.index()
    goToSlide(container, items, reqItem)
  })

  $('body').on('click', '.slider__dot-item', function (e) {
    e.preventDefault()
    const $this = $(this),
      container = $this.closest('.slider'),
      items = container.find('.slider__item'), 
      index = $this.index(),
      dots = container.find('.slider__dot-item')

    goToSlide(container, items, index)
    resetActiveClass(dots, index)
  })

  function generateSliderDots() {
    $('.slider__item', '.reviews__list').each(function () {
      let dot = $('<li>', {
        attr: {
          class: 'slider__dot-item'
        }
      })

      let avatarItem = $('<a>', {
        attr: {
          href: '#',
          class: 'review__avatar review__avatar--circle'
        }
      })

      let avatarImg = $('<img>', {
        attr: {
          class: 'review__avatar-img',
          src: $(this).find('.review__avatar-img').attr('src')
        }
      })

      avatarItem.append(avatarImg)
      dot.append(avatarItem)
      $('.slider__dots').append(dot)
    })
    $('.slider__dot-item').first().addClass('active')
  }

  generateSliderDots()

})