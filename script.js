/* =========================================
   BOBO BIRTHDAY WEBSITE
========================================= */

let currentPage = 0;
const pages = document.querySelectorAll(".page");
const music = document.getElementById("birthdayMusic");

/* =========================================
   PAGE NAVIGATION
========================================= */

function nextPage() {
  if (currentPage < pages.length - 1) {
    pages[currentPage].classList.remove("active");
    currentPage++;
    pages[currentPage].classList.add("active");

    createConfetti(35);
    createHearts(5);
    startMusic();
  }
}

/* =========================================
   MUSIC
========================================= */

function startMusic() {
  if (!music) return;
  music.volume = 0.35;
  music.play().catch(() => {
    // Browsers may block autoplay until the user interacts with the page.
    // Since nextPage() only runs after a click, this should work fine.
  });
}

/* =========================================
   PHOTO GALLERY DATA
========================================= */

const photos = [
  { image: "photos/photo1.jpg", title: "A beautiful memory ❤️", description: "One of those moments I'll always remember." },
  { image: "photos/photo2.jpg", title: "Look at us 😂", description: "Some memories are impossible not to smile about." },
  { image: "photos/photo3.jpg", title: "Another special moment ✨", description: "A moment worth keeping forever." },
  { image: "photos/photo4.jpg", title: "Bestie moments 🥹", description: "Good times, good memories and a great friend." },
  { image: "photos/photo5.jpg", title: "This one ❤️", description: "This picture deserves its own little moment." },
  { image: "photos/photo6.jpg", title: "The crazy ones 😂", description: "Because our friendship wouldn't be complete without madness." },
  { image: "photos/photo7.jpg", title: "Another memory 🌸", description: "Another moment that deserves to be remembered." },
  { image: "photos/photo8.jpg", title: "And another one ❤️", description: "Here's to many more memories together." },
];

let currentPhoto = 0;

/* =========================================
   SHOW PHOTO
========================================= */

function showPhoto(index, direction = "next") {
  if (index < 0 || index >= photos.length) return;

  currentPhoto = index;

  const image = document.getElementById("gallery-image");
  const title = document.getElementById("photo-title");
  const description = document.getElementById("photo-description");
  const number = document.getElementById("photo-number");
  const viewer = document.querySelector(".photo-viewer");

  viewer.classList.remove("slide-left", "slide-right");
  void viewer.offsetWidth; // restart animation

  viewer.classList.add(direction === "next" ? "slide-left" : "slide-right");

  image.src = photos[index].image;
  image.alt = photos[index].title;
  title.textContent = photos[index].title;
  description.textContent = photos[index].description;
  number.textContent = `${index + 1} / ${photos.length}`;

  document.querySelectorAll(".thumbnail").forEach((thumbnail, i) => {
    thumbnail.classList.toggle("active", i === index);
  });

  const progress = document.getElementById("gallery-progress-bar");
  progress.style.width = `${((index + 1) / photos.length) * 100}%`;
}

function nextPhoto() {
  const next = (currentPhoto + 1) % photos.length;
  showPhoto(next, "next");

  if (next === photos.length - 1) {
    createConfetti(25);
  }
}

function previousPhoto() {
  const previous = (currentPhoto - 1 + photos.length) % photos.length;
  showPhoto(previous, "previous");
}

/* =========================================
   KEYBOARD CONTROLS (gallery)
========================================= */

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") nextPhoto();
  if (event.key === "ArrowLeft") previousPhoto();
});

/* =========================================
   SWIPE CONTROLS (gallery)
========================================= */

const galleryViewer = document.querySelector(".photo-viewer");
let touchStartX = 0;
let touchEndX = 0;

if (galleryViewer) {
  galleryViewer.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].screenX;
    },
    { passive: true }
  );

  galleryViewer.addEventListener(
    "touchend",
    (event) => {
      touchEndX = event.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true }
  );
}

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;
  if (swipeDistance < -50) nextPhoto();
  if (swipeDistance > 50) previousPhoto();
}

/* =========================================
   CONFETTI
========================================= */

function createConfetti(amount = 50) {
  const container = document.getElementById("confetti-container");
  const colors = ["#ef4164", "#ffc928", "#54b9e8", "#72c56b", "#9c54d6", "#ff8b3d"];

  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("div");
    piece.classList.add("confetti");

    piece.style.left = Math.random() * 100 + "%";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = 2 + Math.random() * 3 + "s";
    piece.style.animationDelay = Math.random() * 1.5 + "s";
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;

    container.appendChild(piece);

    setTimeout(() => piece.remove(), 6000);
  }
}

/* =========================================
   FLOATING HEARTS
========================================= */

function createHearts(amount = 5) {
  const container = document.getElementById("hearts-container");

  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = Math.random() > 0.5 ? "❤️" : "💖";

    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDuration = 4 + Math.random() * 3 + "s";
    heart.style.fontSize = 15 + Math.random() * 25 + "px";

    container.appendChild(heart);

    setTimeout(() => heart.remove(), 7000);
  }
}

/* =========================================
   FINAL CELEBRATION
========================================= */

function celebrate() {
  createConfetti(200);
  createHearts(30);

  const button = document.querySelector(".birthday-button");
  button.innerHTML = "🎉 HAPPY BIRTHDAY BOBO!!! 🎉";

  if (navigator.vibrate) {
    navigator.vibrate([100, 50, 100, 50, 200]);
  }
}

/* =========================================
   AMBIENT EFFECTS
========================================= */

setInterval(() => createHearts(1), 1800);
setTimeout(() => createConfetti(30), 800);
