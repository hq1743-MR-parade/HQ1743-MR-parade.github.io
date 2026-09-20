const grid = document.querySelector("[data-function-grid]");
window.MR_FUNCTIONS.forEach((item, index) => {
  const link = document.createElement("a");
  link.className = "function-card";
  link.href = `/functions/${item.slug}/`;
  link.innerHTML = `
    <span class="card-number">${String(index + 1).padStart(2, "0")}</span>
    <img class="card-visual" src="/media/function-${String(index + 1).padStart(2, "0")}-poster.jpg" alt="" width="1280" height="240" loading="lazy" decoding="async">
    <h2 class="card-title">${item.title}</h2>
    <p class="card-subtitle">${item.subtitle}</p>
    <span class="card-arrow" aria-hidden="true">›</span>`;
  grid.appendChild(link);
});
