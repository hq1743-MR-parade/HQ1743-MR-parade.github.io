const functions = window.MR_FUNCTIONS;
const slug = document.body.dataset.function;
const index = functions.findIndex((item) => item.slug === slug);
const item = functions[index];

if (!item) {
  window.location.replace("/");
} else {
  const number = String(index + 1).padStart(2, "0");
  const previous = functions[(index - 1 + functions.length) % functions.length];
  const next = functions[(index + 1) % functions.length];
  document.title = `${item.title} | MR Battalion Functions`;
  document.querySelector("[data-index]").textContent = `${number} / 12`;
  document.querySelector("[data-title]").textContent = item.title;
  document.querySelector("[data-subtitle]").textContent = item.subtitle;
  document.querySelector("[data-why]").textContent = item.why;
  document.querySelector("[data-copy]").innerHTML = item.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("");
  document.querySelectorAll("[data-animation]").forEach((image) => {
    image.src = `/media/function-${number}.webp?v=9`;
    image.alt = `${item.title}: animated three-part visual`;
  });
  const previousLink = document.querySelector("[data-previous]");
  previousLink.href = `/functions/${previous.slug}/`;
  previousLink.setAttribute("aria-label", `Previous function: ${previous.title}`);
  const nextLink = document.querySelector("[data-next]");
  nextLink.href = `/functions/${next.slug}/`;
  nextLink.setAttribute("aria-label", `Next function: ${next.title}`);
}

const viewer = document.querySelector("[data-viewer]");
const openViewer = document.querySelector("[data-open-viewer]");
const closeViewer = document.querySelector("[data-close-viewer]");

function showViewer() {
  viewer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  if (viewer.requestFullscreen) viewer.requestFullscreen().catch(() => {});
  closeViewer.focus();
}

function hideViewer() {
  viewer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  openViewer.focus();
}

openViewer.addEventListener("click", showViewer);
closeViewer.addEventListener("click", hideViewer);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && viewer.getAttribute("aria-hidden") === "false") hideViewer();
  if (event.key === "ArrowLeft") document.querySelector("[data-previous]").click();
  if (event.key === "ArrowRight") document.querySelector("[data-next]").click();
});
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement && viewer.getAttribute("aria-hidden") === "false") {
    viewer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
});
