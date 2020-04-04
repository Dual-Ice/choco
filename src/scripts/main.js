(function() {
  const hamburger = document.querySelector('.hamburger-menu__icon')
  const nav = document.querySelector('.nav')
  const hamburgerClose = document.querySelector('.hamburger-menu__close')
  const heroButton = document.querySelector('.hero__button a.btn')
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

    const randomInt = Math.ceil(Math.random() * 10)
    const address = randomInt > 5
    ? 'https://webdev-api.loftschool.com/sendmail'
    : 'https://webdev-api.loftschool.com/sendmail/fail'
    
    const request = new XMLHttpRequest()
    request.responseType = 'json'
    request.open('POST', address)
    let formData = new FormData()
    for (item in sendData) {
      formData.append(item, sendData[item])
    }
    request.send(formData)
    request.addEventListener('load', () => {
      let textContent
      if (request.response.status) {
        textContent = "Сообщение отправлено"
        form.reset()
      } else {
        textContent = "Сообщение не отправлeно, повторите отправку позже"
      }

      modal.open();
      modal.setContent(textContent); 
    })
  })
}) ()