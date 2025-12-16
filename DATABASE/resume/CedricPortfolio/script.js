const typedText = document.querySelector(".typed-text");
const words = ["Photography","Photo Editing","Video Editing"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const word = words[wordIndex];
  typedText.textContent = word.substring(0, charIndex);

  if (!isDeleting && charIndex < word.length) {
    charIndex++;
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(type, isDeleting ? 80 : 150);
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, 300);
});

// Lightbox Functionality
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".popup-image").forEach((img) => {
  img.addEventListener("click", () => {
    lightbox.style.display = "block";
    lightboxImg.src = img.src;
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target == lightbox) {
    lightbox.style.display = "none";
  }
});
