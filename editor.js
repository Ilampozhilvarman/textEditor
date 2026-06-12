const DATA = Array.from({ length: 100000 }, (_, i) => `Line of code ${i + 1}`);
const LINE_HEIGHT = 30;
const VIEWPORT_HEIGHT = 700;
const BUFFER_ITEMS = 5;
let currentLine = 0
const viewport = document.getElementById('viewport');
const phantom = document.getElementById('phantom');
const contentContainer = document.getElementById('content-container');
phantom.style.height = `${DATA.length * LINE_HEIGHT}px`;
function updateVirtualScroll() {
  const scrollTop = viewport.scrollTop;
  let startIndex = Math.floor(scrollTop / LINE_HEIGHT) - BUFFER_ITEMS;
  let endIndex = Math.ceil((scrollTop + VIEWPORT_HEIGHT) / LINE_HEIGHT) + BUFFER_ITEMS;
  startIndex = Math.max(0, startIndex);
  endIndex = Math.min(DATA.length, endIndex);
  let html = '';
  for (let i = startIndex; i < endIndex; i++) {
    const words = DATA[i].trim().split(/\s+/);
    html += `
      <div contenteditable="true">
        ${DATA[i]}
      </div>
    `;
  }
  const offsetTop = startIndex * LINE_HEIGHT;
  contentContainer.style.transform = `translateY(${offsetTop}px)`;
  contentContainer.innerHTML = html;
}
viewport.addEventListener('scroll', updateVirtualScroll);
contentContainer.addEventListener("keydown", function(ev) {
    if (ev.key === "Enter") {
        ev.preventDefault();
    }
});
updateVirtualScroll();
