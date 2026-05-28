const countdownScreen = document.getElementById("countdownScreen");
const surpriseScreen = document.getElementById("surpriseScreen");
const openNowButton = document.getElementById("openNowButton");
const surpriseWord = document.getElementById("surpriseWord");
const mailButton = document.getElementById("envelope");
const mailIntro = document.getElementById("mailIntro");
const scrapbook = document.getElementById("scrapbook");
const openMailButton = document.getElementById("openMailButton");
const closeMailButton = document.getElementById("closeMailButton");
const giftBox = document.getElementById("giftBox");
const giftReveal = document.getElementById("giftReveal");
const flowerFinale = document.getElementById("flowerFinale");
const flowerFrame = document.getElementById("flowerFrame");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const photoSlots = document.querySelectorAll(".random-photo");

const memoryImages = [
  "images/1.png",
  "images/2.png",
  "images/3.png",
  "images/4.png",
  "images/5.png",
  "images/6.png",
  "images/7.png",
  "images/8.png",
  "images/9.png",
  "images/10.png",
  "images/11.png",
  "images/12.png",
  "images/13.png",
  "images/14.png",
  "images/15.png"
];

const now = new Date();
const previewMode = new URLSearchParams(window.location.search).get("preview") === "1";
let unlockDate = new Date(now.getFullYear(), 5, 2, 0, 0, 0);

if (now > unlockDate && now.getMonth() > 5) {
  unlockDate = new Date(now.getFullYear() + 1, 5, 2, 0, 0, 0);
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function shuffle(items) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

function placeRandomPhotos() {
  const shuffledImages = shuffle(memoryImages);

  photoSlots.forEach((slot, index) => {
    slot.src = shuffledImages[index % shuffledImages.length];
  });
}

function revealSurprise() {
  countdownScreen.classList.add("hidden");
  surpriseScreen.classList.remove("hidden");
}

function updateCountdown() {
  const distance = unlockDate.getTime() - Date.now();

  if (distance <= 0 || previewMode) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    openNowButton.classList.remove("hidden");
    openNowButton.textContent = previewMode ? "Preview your surprise" : "Open your surprise";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
}

openNowButton.addEventListener("click", revealSurprise);

surpriseWord.addEventListener("click", () => {
  if (window.matchMedia("(max-width: 760px)").matches) {
    revealSurprise();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "k") {
    event.preventDefault();
    revealSurprise();
  }
});

function openMail() {
  mailButton.classList.add("open");
  mailButton.classList.remove("close");
  mailButton.setAttribute("aria-expanded", "true");
}

function closeMail() {
  mailButton.classList.add("close");
  mailButton.classList.remove("open");
  mailButton.setAttribute("aria-expanded", "false");
}

mailButton.addEventListener("click", openMail);
mailButton.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openMail();
  }
});
openMailButton.addEventListener("click", openMail);
closeMailButton.addEventListener("click", closeMail);

giftBox.addEventListener("click", () => {
  giftReveal.classList.add("hidden");
  flowerFinale.classList.remove("hidden");

  if (!flowerFrame.src) {
    flowerFrame.src = flowerFrame.dataset.src;
  }
});

updateCountdown();
placeRandomPhotos();
setInterval(updateCountdown, 1000);
