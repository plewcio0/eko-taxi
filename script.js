const rides = {
  "Eko Taxi": {
    name: "Eko Taxi",
    price: 34,
    time: 6,
    points: 12,
    discount: 1,
    message: "Ten przejazd doda punkty. W profilu zdecydujesz, czy przeznaczysz je na drzewa, czy zniżki."
  },
  "Green Saver": {
    name: "Green Saver",
    price: 27,
    time: 11,
    points: 18,
    discount: 2,
    message: "Tańszy wybór i więcej punktów. Możesz je przeznaczyć na drzewa albo zniżkę."
  },
  "Comfort Eco": {
    name: "Comfort Eco",
    price: 45,
    time: 4,
    points: 15,
    discount: 1.5,
    message: "Komfortowy przejazd autem hybrydowym lub elektrycznym. Punkty wykorzystasz po swojemu."
  }
};

let basePoints = 72;
let selectedRide = null;
let rewardMode = "eco";

const screen = document.getElementById("screen");
const checkRideBtn = document.getElementById("checkRideBtn");
const rideOptionsSection = document.getElementById("rideOptionsSection");
const summarySection = document.getElementById("summarySection");
const safetySection = document.getElementById("safetySection");
const rideOptions = document.querySelectorAll(".ride-option");
const orderBtn = document.getElementById("orderBtn");
const resetBtn = document.getElementById("resetBtn");
const successModal = document.getElementById("successModal");

const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");

const summaryType = document.getElementById("summaryType");
const summaryRoute = document.getElementById("summaryRoute");
const summaryPrice = document.getElementById("summaryPrice");
const summaryTime = document.getElementById("summaryTime");
const summaryPoints = document.getElementById("summaryPoints");
const ecoMessage = document.getElementById("ecoMessage");

const profilePoints = document.getElementById("profilePoints");
const profileProgressText = document.getElementById("profileProgressText");
const profileProgressFill = document.getElementById("profileProgressFill");
const summaryProgressText = document.getElementById("summaryProgressText");
const summaryProgressFill = document.getElementById("summaryProgressFill");

const userPoints = document.getElementById("userPoints");
const discountValue = document.getElementById("discountValue");
const homeDiscountValue = document.getElementById("homeDiscountValue");
const treeMissing = document.getElementById("treeMissing");
const profileTreeProgressText = document.getElementById("profileTreeProgressText");
const profileTreeProgressFill = document.getElementById("profileTreeProgressFill");

const rewardChoices = document.querySelectorAll(".reward-choice");
const rewardMessage = document.getElementById("rewardMessage");
const rewardSelect = document.getElementById("rewardSelect");
const settingsRewardMessage = document.getElementById("settingsRewardMessage");

const successText = document.getElementById("successText");
const successIcon = document.getElementById("successIcon");

const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");
const switches = document.querySelectorAll(".switch");

function calculateDiscount(points) {
  return Math.floor(points / 10);
}

function updateProgress(pointsToAdd = 0) {
  const summaryTotal = Math.min(basePoints + pointsToAdd, 100);
  const currentDiscount = calculateDiscount(basePoints);

  profilePoints.textContent = basePoints;
  profileProgressText.textContent = `${basePoints} / 100`;
  profileProgressFill.style.width = `${basePoints}%`;

  userPoints.textContent = basePoints;
  discountValue.textContent = `${currentDiscount} zł`;
  homeDiscountValue.textContent = `${currentDiscount} zł`;
  treeMissing.textContent = `${100 - basePoints} pkt`;
  profileTreeProgressText.textContent = `${basePoints} / 100`;
  profileTreeProgressFill.style.width = `${basePoints}%`;

  summaryProgressText.textContent = `${summaryTotal} / 100`;
  summaryProgressFill.style.width = `${summaryTotal}%`;
}

function updateRewardMode(mode) {
  rewardMode = mode;

  rewardChoices.forEach(choice => {
    const isActive = choice.dataset.reward === mode;
    choice.classList.toggle("active", isActive);
    choice.querySelector("span").textContent = isActive ? "Wybrane" : "Wybierz";
  });

  rewardSelect.value = mode;

  if (mode === "eco") {
    rewardMessage.textContent = "Aktualnie Twoje punkty pomagają sadzić drzewa.";
    rewardMessage.classList.remove("discount-message");

    settingsRewardMessage.textContent = "Obecnie punkty wspierają sadzenie drzew. Możesz to zmienić w każdej chwili.";
    settingsRewardMessage.classList.remove("discount-message");
  } else {
    rewardMessage.textContent = "Aktualnie Twoje punkty zbierają się na zniżki na kolejne przejazdy.";
    rewardMessage.classList.add("discount-message");

    settingsRewardMessage.textContent = "Obecnie punkty zbierają się na zniżki. Możesz wrócić do sadzenia drzew w każdej chwili.";
    settingsRewardMessage.classList.add("discount-message");
  }

  updateSummaryMessage();
}

function updateSummaryMessage() {
  if (!selectedRide) return;

  if (rewardMode === "eco") {
    ecoMessage.textContent = `${selectedRide.message} Aktualnie punkty wspierają sadzenie drzew.`;
    ecoMessage.classList.remove("discount-message");
  } else {
    ecoMessage.textContent = `Ten przejazd da Ci ${selectedRide.points} punktów, czyli około ${selectedRide.discount} zł zniżki na kolejny przejazd.`;
    ecoMessage.classList.add("discount-message");
  }
}

function showRideOptions() {
  rideOptionsSection.classList.remove("hidden");

  setTimeout(() => {
    rideOptionsSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 80);
}

function selectRide(type) {
  selectedRide = rides[type];

  rideOptions.forEach(option => {
    option.classList.toggle("active", option.dataset.type === type);
  });

  const route = `${fromInput.value} → ${toInput.value}`;

  summaryType.textContent = selectedRide.name;
  summaryRoute.textContent = route;
  summaryPrice.textContent = `${selectedRide.price} zł`;
  summaryTime.textContent = `${selectedRide.time} min`;
  summaryPoints.textContent = `${selectedRide.points} pkt`;

  updateProgress(selectedRide.points);
  updateSummaryMessage();

  summarySection.classList.remove("hidden");
  safetySection.classList.remove("hidden");

  setTimeout(() => {
    summarySection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 80);
}

function orderRide() {
  if (!selectedRide) {
    selectRide("Eko Taxi");
  }

  if (rewardMode === "eco") {
    successIcon.textContent = "🌳";
    successText.innerHTML = `
      Kierowca będzie za ${selectedRide.time} minut.<br />
      Zdobywasz ${selectedRide.points} punktów.<br />
      Punkty wspierają sadzenie drzew.
    `;
  } else {
    successIcon.textContent = "💸";
    successText.innerHTML = `
      Kierowca będzie za ${selectedRide.time} minut.<br />
      Zdobywasz ${selectedRide.points} punktów.<br />
      To około ${selectedRide.discount} zł zniżki na kolejny przejazd.
    `;
  }

  successModal.classList.add("show");
}

function resetApp() {
  selectedRide = null;
  successModal.classList.remove("show");

  rideOptionsSection.classList.add("hidden");
  summarySection.classList.add("hidden");
  safetySection.classList.add("hidden");

  rideOptions.forEach(option => option.classList.remove("active"));

  fromInput.value = "Warszawa, Centrum";
  toInput.value = "Mokotów";

  updateProgress(0);
  changePage("pageHome");
}

function changePage(pageId) {
  pages.forEach(page => {
    page.classList.toggle("active", page.id === pageId);
  });

  navItems.forEach(item => {
    item.classList.toggle("active", item.dataset.page === pageId);
  });

  screen.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

checkRideBtn.addEventListener("click", showRideOptions);

rideOptions.forEach(option => {
  option.addEventListener("click", () => {
    selectRide(option.dataset.type);
  });
});

orderBtn.addEventListener("click", orderRide);
resetBtn.addEventListener("click", resetApp);

navItems.forEach(item => {
  item.addEventListener("click", () => {
    changePage(item.dataset.page);
  });
});

switches.forEach(switchItem => {
  switchItem.addEventListener("click", () => {
    switchItem.classList.toggle("active");
  });
});

rewardChoices.forEach(choice => {
  choice.addEventListener("click", () => {
    updateRewardMode(choice.dataset.reward);
  });
});

rewardSelect.addEventListener("change", () => {
  updateRewardMode(rewardSelect.value);
});

updateProgress(0);
updateRewardMode("eco");
