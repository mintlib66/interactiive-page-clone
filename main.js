//전역변수 사용 회피를 위해 즉시실행 익명함수 생성
;(() => {
  //변수들
  const graphics = document.querySelectorAll('.graphic-item')
  const steps = document.querySelectorAll('.step')
  let currentGraphic = graphics[0]
  let ioIndex

  const io = new IntersectionObserver((entries, observer) => {
    ioIndex = entries[0].target.dataset.index * 1
  })

  const actions = {
    birdFlies(key) {
      if (key) {
        document.querySelector(
          '[data-index="2"] .bird'
        ).style.transform = `translateX(${window.innerWidth}px)`
      } else {
        document.querySelector(
          '[data-index="2"] .bird'
        ).style.transform = `translateX(-100%)`
      }
    },
    birdFlies2(key) {
      if (key) {
        document.querySelector(
          '[data-index="5"] .bird'
        ).style.transform = `translate(${window.innerWidth}px, ${
          window.innerHeight * -0.7
        }px)`
      } else {
        document.querySelector(
          '[data-index="5"] .bird'
        ).style.transform = `translate(0, 0)`
      }
    },
  }

  //io, dataset 세팅
  steps.forEach((step, i) => {
    io.observe(step)
    step.dataset.index = i
    graphics[i].dataset.index = i
  })

  //동작 함수
  function visibleGraphic(action) {
    currentGraphic.classList.add('visible')
    if (action) {
      actions[action](true)
    }
  }
  function invisibleGraphic(action) {
    currentGraphic.classList.remove('visible')
    if (action) {
      actions[action](false)
    }
  }

  //스크롤 이벤트
  window.addEventListener('scroll', () => {
    let step
    let BoundingTop

    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      step = steps[i]
      if (!step) {
        continue
      }
      BoundingTop = step.getBoundingClientRect().top

      if (
        BoundingTop > window.innerHeight * 0.1 &&
        BoundingTop < window.innerHeight * 0.8
      ) {
        invisibleGraphic(currentGraphic.dataset.action)
        currentGraphic = graphics[step.dataset.index]
        visibleGraphic(currentGraphic.dataset.action)
      }
    }
  })

  //초기화
  window.addEventListener('load', () => {
    setTimeout(() => scrollTo(0, 0), 100)
  })
  visibleGraphic(currentGraphic.dataset.action)
})()
