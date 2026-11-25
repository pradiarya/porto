const menuToggle = document.querySelector(".menu-toggle");
const menuPanel = document.querySelector(".menu-panel");
const menuClose = document.querySelector(".menu-close");

menuToggle.addEventListener("click", () => {
  if (menuPanel.open) {
    menuPanel.close();
    return;
  }

  menuPanel.showModal();
  menuToggle.setAttribute("aria-expanded", "true");
});

menuClose.addEventListener("click", () => menuPanel.close());

menuPanel.addEventListener("click", (event) => {
  if (event.target === menuPanel) menuPanel.close();
  if (event.target.closest("a")) menuPanel.close();
});

menuPanel.addEventListener("close", () => {
  menuToggle.setAttribute("aria-expanded", "false");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuPanel.open) menuPanel.close();
});

const cafeRow = document.querySelector(".cafe-row");
const preview = cafeRow.querySelector(".cafe-preview");
const previewFrame = cafeRow.querySelector(".preview-frame");
const previewLinks = [...cafeRow.querySelectorAll("[data-preview]")];

function showProjectPreview(link = previewLinks[0]) {
  const { preview: url } = link.dataset;

  if (previewFrame.getAttribute("src") !== url) previewFrame.src = url;
  preview.setAttribute("aria-hidden", "false");
  cafeRow.classList.add("is-previewing");
}

function hideProjectPreview() {
  preview.setAttribute("aria-hidden", "true");
  cafeRow.classList.remove("is-previewing");
}

cafeRow.addEventListener("pointerenter", () => showProjectPreview());
cafeRow.addEventListener("pointerleave", hideProjectPreview);
const projectLinkRows = [...document.querySelectorAll(".project-link-row[data-preview]")];

projectLinkRows.forEach((row) => {
  const preview = row.querySelector(".project-preview");
  const previewFrame = row.querySelector(".preview-frame");

  function showPreview() {
    const url = row.dataset.preview;
    if (previewFrame.getAttribute("src") !== url) previewFrame.src = url;
    preview.setAttribute("aria-hidden", "false");
    row.classList.add("is-previewing");
  }

  function hidePreview() {
    preview.setAttribute("aria-hidden", "true");
    row.classList.remove("is-previewing");
  }

  row.addEventListener("pointerenter", showPreview);
  row.addEventListener("pointerleave", hidePreview);
  row.addEventListener("focusin", showPreview);
  row.addEventListener("focusout", (event) => {
    if (!row.contains(event.relatedTarget)) hidePreview();
  });
});

cafeRow.addEventListener("pointerover", (event) => {
  const link = event.target.closest("[data-preview]");
  if (link) showProjectPreview(link);
});
cafeRow.addEventListener("focusin", (event) => {
  const link = event.target.closest("[data-preview]");
  showProjectPreview(link || previewLinks[0]);
});
cafeRow.addEventListener("focusout", (event) => {
  if (!cafeRow.contains(event.relatedTarget)) hideProjectPreview();
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
