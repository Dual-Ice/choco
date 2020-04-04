(function () {
  const right = document.querySelector('.arrow--right')
  const left = document.querySelector('.arrow--left')
  const barsList = document.querySelector('.bars__list')

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
}) ()