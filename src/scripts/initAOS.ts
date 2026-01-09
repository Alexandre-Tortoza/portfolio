import AOS from 'aos'

const initAOS = () => {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50,
  })
}

// Inicializa na primeira carga
initAOS()

// Re-inicializa após navegação com View Transitions
document.addEventListener('astro:page-load', () => {
  initAOS()
  AOS.refreshHard()
})
