//graphic-item과 step과 쌍을 맞춰서 보여줄것
//전역변수 사용 회피를 위해 즉시실행 익명함수 생성
;(() => {
  const graphics = document.querySelectorAll('.graphic-item')
  const steps = document.querySelectorAll('.step')
  let currentGraphic = graphics[0]

  const io = new IntersectionObserver((entries, observer) => {
    ioIndex = entries[0].target.dataset.index * 1
    console.log(ioIndex)
  })
  visibleGraphic()

  //io, dataset 세팅
  steps.forEach((step, i) => {
    io.observe(step)
    step.dataset.index = i
  })

  //동작 함수
  function visibleGraphic() {
    currentGraphic.classList.add('visible')
  }
  function invisibleGraphic() {
    currentGraphic.classList.remove('visible')
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
        invisibleGraphic()
        currentGraphic = graphics[step.dataset.index]
        visibleGraphic()
      }
    }
  })
})()
