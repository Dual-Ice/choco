(function () {
  const memberName = document.querySelectorAll('.member__name')

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
}) ()