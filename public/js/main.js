const dday = () => {
  const dayText = document.querySelector(`.header_day`)

  var targetDate = new Date('2023-12-31')
  var today = new Date(Date.now() + 9 * 60 * 60 * 1000)
  var timeDiff = targetDate.getTime() - today.getTime()
  var dDay = Math.ceil(timeDiff / (1000 * 3600 * 24))

  var anniversaryDate = new Date('2022-10-09')
  var timeDiff = today.getTime() - anniversaryDate.getTime() + 1000 * 3600 * 24
  var days = Math.floor(timeDiff / (1000 * 3600 * 24))
  dayText.innerHTML = `&#x2661; ${days}일`
}

const toggle = () => {
  const chefValue = document.querySelector(`#chefNickname`)
  const chefType = document.querySelector(`#chefType`)
  var toggle = document.getElementById('container')
  var toggleContainer = document.getElementById('toggle-container')
  var toggleNumber
  if (toggle) {
    toggle.addEventListener('click', function () {
      toggleNumber = !toggleNumber
      if (toggleNumber) {
        toggleContainer.style.clipPath = 'inset(0 0 0 50%)'
        toggleContainer.style.backgroundColor = 'dodgerblue'
        chefType.setAttribute('value', '1')
        chefValue.setAttribute('value', '용섭')
      } else {
        toggleContainer.style.clipPath = 'inset(0 50% 0 0)'
        toggleContainer.style.backgroundColor = '#D74046'
        chefType.setAttribute('value', '0')
        chefValue.setAttribute('value', '진주')
      }
    })
  }
}

function init() {
  dday()
  toggle()
}

init()
