//graphic-item과 step과 쌍을 맞춰서 보여줄것
//전역변수 사용 회피를 위해 즉시실행 익명함수 생성
;(() => {
  const graphics = document.querySelectorAll('.graphic-item')
  const steps = document.querySelectorAll('.step')
  let currentGraphic = graphics[0]

  steps.forEach((step, i) => {
    step.dataset.index = i
  })

  window.addEventListener('scroll', () => {
    let BoundingTop
    steps.forEach(step => {
      BoundingTop = step.getBoundingClientRect().top

      if (
        BoundingTop > window.innerHeight * 0.1 &&
        BoundingTop < window.innerHeight * 0.8
      ) {
        // console.log(step.dataset.index, step.getBoundingClientRect().top)
        if (currentGraphic) {
          currentGraphic.classList.remove('visible')
        }
        currentGraphic = graphics[step.dataset.index]
        currentGraphic.classList.add('visible')
      }
    })
  })
})()
