const countdownScreen = document.getElementById("countdownScreen");
const surpriseScreen = document.getElementById("surpriseScreen");
const openNowButton = document.getElementById("openNowButton");
const mailButton = document.getElementById("mailButton");
const messageCard = document.getElementById("birthdayMessage");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const now = new Date();
const previewMode = new URLSearchParams(window.location.search).get("preview") === "1";
let unlockDate = new Date(now.getFullYear(), 5, 2, 0, 0, 0);

if (now > unlockDate && now.getMonth() > 5) {
  unlockDate = new Date(now.getFullYear() + 1, 5, 2, 0, 0, 0);
}

function pad(value) {
  return String(value).padStart(2, "0");
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

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "k") {
    event.preventDefault();
    revealSurprise();
  }
});

mailButton.addEventListener("click", () => {
  const isOpen = mailButton.classList.toggle("open");
  mailButton.setAttribute("aria-expanded", String(isOpen));
  messageCard.classList.toggle("show", isOpen);
});

updateCountdown();
setInterval(updateCountdown, 1000);
