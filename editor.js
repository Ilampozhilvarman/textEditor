// 1. Mock Data (100,000 items)
const DATA = Array.from({ length: 100000 }, (_, i) => `Line of code ${i + 1}`);

// 2. Configuration Parameters
const LINE_HEIGHT = 30; // Height of each row in pixels
const VIEWPORT_HEIGHT = 700; // Height of the visible window
const BUFFER_ITEMS = 5; // Extra rows to render above/below to prevent flashing

// 3. DOM Elements
const viewport = document.getElementById('viewport');
const phantom = document.getElementById('phantom');
const contentContainer = document.getElementById('content-container');

// 4. Set the height of the fake scroll area
phantom.style.height = `${DATA.length * LINE_HEIGHT}px`;

// 5. The core virtualization function
function updateVirtualScroll() {
  const scrollTop = viewport.scrollTop;

  // Calculate index range currently visible
  let startIndex = Math.floor(scrollTop / LINE_HEIGHT) - BUFFER_ITEMS;
  let endIndex = Math.ceil((scrollTop + VIEWPORT_HEIGHT) / LINE_HEIGHT) + BUFFER_ITEMS;

  // Keep indices within valid array bounds
  startIndex = Math.max(0, startIndex);
  endIndex = Math.min(DATA.length, endIndex);

  // Generate HTML for only the visible slice
  let html = '';
  for (let i = startIndex; i < endIndex; i++) {
    html += `
      <div style="height: ${LINE_HEIGHT}px; line-height: ${LINE_HEIGHT}px; border-bottom: 1px solid #eee; padding-left: 10px;">
        ${DATA[i]}
      </div>
    `;
  }

  // Push the visible rows down so they align with the current scroll position
  const offsetTop = startIndex * LINE_HEIGHT;
  contentContainer.style.transform = `translateY(${offsetTop}px)`;
  
  // Inject the rows into the DOM
  contentContainer.innerHTML = html;
}

// 6. Listen to scroll events and run the initial render
viewport.addEventListener('scroll', updateVirtualScroll);
updateVirtualScroll();
