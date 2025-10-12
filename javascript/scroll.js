let scrollPos = 0;
let targetScroll = 0;
const speed = 0.08;

function smoothScroll() {
  scrollPos += (targetScroll - scrollPos) * speed;
  window.scrollTo(0, scrollPos);
  requestAnimationFrame(smoothScroll);
}

window.addEventListener("wheel", (e) => {
  e.preventDefault();
  targetScroll += e.deltaY;
  targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));
}, { passive: false });

smoothScroll();

