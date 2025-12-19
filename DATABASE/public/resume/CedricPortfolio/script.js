import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCXpaV1WTVSi4_0WvjmUehuEtIVoz0SP5M",
  authDomain: "emberstudio-f434a.firebaseapp.com",
  projectId: "emberstudio-f434a",
  storageBucket: "emberstudio-f434a.firebasestorage.app",
  messagingSenderId: "1073426265450",
  appId: "1:1073426265450:web:713d6e2035e9b009fd6113",
  measurementId: "G-EPS9CK6J57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


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
