(function() {
  const hamburger = document.querySelector('.hamburger-menu__icon')
  const nav = document.querySelector('.nav')
  const hamburgerClose = document.querySelector('.hamburger-menu__close')
  const heroButton = document.querySelector('.hero__button a.btn')
  const memberName = document.querySelectorAll('.member__name')
  const menuElementTitles = document.querySelectorAll('.menu__element-title')
  const reviews = document.querySelectorAll('.reviews__item')
  const review = document.querySelector('.review')
  const right = document.querySelector('.arrow--right')
  const left = document.querySelector('.arrow--left')
  const barsList = document.querySelector('.bars__list')
  const sections = document.querySelectorAll('.section')

  const form = document.querySelector('.order__form')
  const submitButton = document.querySelector('#submit-btn')

  function switchScroll () {
    document.body.classList.toggle('body--menu-openned')
  }

  hamburger.addEventListener('click', (event) => {
    event.preventDefault()
    nav.classList.add('nav--hamburger-visible')
    switchScroll()
  })

  hamburgerClose.addEventListener('click', (event) => {
    event.preventDefault()
    nav.classList.remove('nav--hamburger-visible') 
    switchScroll()
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

  function fillReview (reviewData) {
    const avatar = review.querySelector('.review__avatar-img')
    const title = review.querySelector('.review__title')
    const text = review.querySelector('.review__text')
    const user = review.querySelector('.review__user')

    avatar.src = reviewData.avatar
    title.textContent = reviewData.title
    user.textContent = reviewData.user
    text.innerHTML = reviewData.text
  }

  function getDataFromReview (reviewItem) {
    return {
      avatar: reviewItem.querySelector('.reviews__item-img').src,
      title: reviewItem.querySelector('.reviews__item-title').textContent,
      text: reviewItem.querySelector('.reviews__item-text').innerHTML,
      user: reviewItem.querySelector('.reviews__item-user').textContent
    }
  }

  reviews.forEach(review => {
    review.addEventListener('click', function (e) {
      e.preventDefault()
      let lastActive = document.querySelector('.reviews__item--selected')
      lastActive.classList.remove("reviews__item--selected")

      lastActive = review
      lastActive.classList.add("reviews__item--selected")

      const reviewItem = getDataFromReview(review)
      fillReview(reviewItem)
    })
  })

  function loop(event, direction) {
    event.preventDefault();
    if (direction === "right") {
      barsList.appendChild(barsList.firstElementChild);
    } else {
      barsList.insertBefore(barsList.lastElementChild, barsList.firstElementChild);
    }
  }

  right.addEventListener('click', function (e) {
    loop(e, 'right')
  })

  left.addEventListener('click', function (e) {
    loop(e, 'left')
  })


  const template = document.querySelector("#modalTemplate").innerHTML;
  const modal = createModal(template);

  function createModal(template) {
    const fragment = document.createElement('div');

    fragment.innerHTML = template;

    const modalElement = fragment.querySelector(".modal");
    const contentElement = fragment.querySelector(".modal__content-text");
    const closeElement = fragment.querySelector("#modal__close");
    
    modalElement.addEventListener("click", e => {
      if (e.target === modalElement) {
        closeElement.click(e);
      }
    });
    closeElement.addEventListener("click", (e) => {
      e.preventDefault()
      document.body.removeChild(modalElement);
      switchScroll()
    });

    return {
      open() {
        document.body.appendChild(modalElement);
        switchScroll()
      },
      close() {
        closeElement.click();
      },
      setContent(content) {
        contentElement.innerHTML = content;
      }
    };
  }

  submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    const sendData = {
      name: form.elements.name.value,
      phone: form.elements.phone.value,
      comment: form.elements.comment.value,
      to: "example@mail.com"
    }

    const request = new XMLHttpRequest()
    request.responseType = 'json'
    request.open('POST', 'https://webdev-api.loftschool.com/sendmail')
    let formData = new FormData()
    for (item in sendData) {
      formData.append(item, sendData[item])
    }
    request.send(formData)
    request.addEventListener('load', () => {
      const textContent = request.response.status 
        ? "Сообщение отправлено"
        : "Сообщение не отправлeно, повторите отправку позже"

      modal.open();
      modal.setContent(textContent); 
    })
  })

  const fixedMenu = document.querySelector('.fixed-menu')
  sections.forEach(() => {
    const item = document.createElement('li');
    item.classList.add('fixed-menu__item');
    const link = document.createElement('a');
    link.classList.add('fixed-menu__link');
    link.href="#";
    item.appendChild(link);
    fixedMenu.appendChild(item);
  })

  const reviewSelected = document.querySelector('.reviews__item--selected')
  fillReview(getDataFromReview(reviewSelected))
  
  ymaps.ready(function () {
    var myMap = new ymaps.Map("map", {
      center: [55.74368256307244,37.61706034861679],
      controls: ['zoomControl', 'searchControl'],
      zoom: 14
    })

    const chocoMarker = ymaps.templateLayoutFactory.createClass(
      '<svg class="map__marker">'+
        '<use xlink:href="images/icons/sprite.svg#marker" />'+
      '</svg>'
    )

    const emptyHint = {
      hintContent: '',
      balloonContent: ''
    }

    const icon = {
      iconLayout: chocoMarker
    }

    const cords = [
      [55.75530088809163,37.620462216918966],
      [55.74958897919116,37.60424021679689],
      [55.75888250412392,37.58226756054687],
      [55.74261737607743,37.58046511608888]
    ]

    cords.forEach(cord => {
      myMap.geoObjects
        .add(new ymaps.Placemark(
          cord,
          emptyHint,
          icon
        ))
    })

    myMap.behaviors.disable('scrollZoom') 
    }
  );
}) ()