(function () {
  const reviews = document.querySelectorAll('.reviews__item')
  const review = document.querySelector('.review')
  
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

  const reviewSelected = document.querySelector('.reviews__item--selected')
  fillReview(getDataFromReview(reviewSelected))
}) ()