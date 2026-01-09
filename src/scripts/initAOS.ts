import AOS from 'aos'

const initAOS = () => {
  AOS.init({
    once: true,
    duration: 800,
    offset: 80,
    easing: 'ease-out-cubic'
  })
}

document.addEventListener('astro:page-load', initAOS)
document.addEventListener('astro:after-swap', () => {
  initAOS()
  AOS.refreshHard()
})
