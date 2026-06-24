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

const drivers = [
  {
    name: "Marek Kowalski",
    initials: "MK",
    car: "Toyota Prius",
    plate: "WX 4821E",
    rating: "4.9"
  },
  {
    name: "Anna Zielińska",
    initials: "AZ",
    car: "Hyundai Ioniq",
    plate: "WE 0912H",
    rating: "4.8"
  },
  {
    name: "Piotr Wiśniewski",
    initials: "PW",
    car: "Kia Niro",
    plate: "WA 7365K",
    rating: "5.0"
  }
];

const contacts = [
  {
    name: "Anna Zielińska",
    phone: "48500111222"
  },
  {
    name: "Michał Nowak",
    phone: "48500333444"
  },
  {
    name: "Ola Wiśniewska",
    phone: "48500555666"
  }
];

const historyRides = [
  {
    id: "ride-1",
    route: "Centrum -> Mokotów",
    type: "Eko Taxi",
    price: 34,
    points: 12,
    date: "dzisiaj"
  },
  {
    id: "ride-2",
    route: "Wola -> Praga",
    type: "Green Saver",
    price: 29,
    points: 18,
    date: "wczoraj"
  },
  {
    id: "ride-3",
    route: "Śródmieście -> Ursynów",
    type: "Comfort Eco",
    price: 46,
    points: 15,
    date: "pn."
  }
];

let basePoints = 72;
let selectedRide = null;
let rewardMode = "eco";
let activeRide = null;
let selectedHistoryRide = historyRides[0];

const appLoader = document.getElementById("appLoader");
const screen = document.getElementById("screen");
const checkRideBtn = document.getElementById("checkRideBtn");
const rideOptionsSection = document.getElementById("rideOptionsSection");
const summarySection = document.getElementById("summarySection");
const safetySection = document.getElementById("safetySection");
const rideOptions = document.querySelectorAll(".ride-option");
const orderBtn = document.getElementById("orderBtn");
const successModal = document.getElementById("successModal");
const viewCurrentRideBtn = document.getElementById("viewCurrentRideBtn");
const closeSuccessBtn = document.getElementById("closeSuccessBtn");

const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");
const locateBtn = document.getElementById("locateBtn");
const locationStatus = document.getElementById("locationStatus");
const rideTimeMode = document.getElementById("rideTimeMode");
const scheduleWrap = document.getElementById("scheduleWrap");
const scheduleTime = document.getElementById("scheduleTime");

const summaryType = document.getElementById("summaryType");
const summaryRoute = document.getElementById("summaryRoute");
const summaryPrice = document.getElementById("summaryPrice");
const summarySchedule = document.getElementById("summarySchedule");
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

const activeRideShortcut = document.getElementById("activeRideShortcut");
const activeRideShortcutText = document.getElementById("activeRideShortcutText");
const goToActiveRideBtn = document.getElementById("goToActiveRideBtn");
const currentEmptyCard = document.getElementById("currentEmptyCard");
const currentRideCard = document.getElementById("currentRideCard");
const currentOrderBtn = document.getElementById("currentOrderBtn");
const currentStatusBanner = document.getElementById("currentStatusBanner");
const currentDriverAvatar = document.getElementById("currentDriverAvatar");
const currentDriverName = document.getElementById("currentDriverName");
const currentDriverMeta = document.getElementById("currentDriverMeta");
const currentEta = document.getElementById("currentEta");
const currentStatus = document.getElementById("currentStatus");
const currentRoute = document.getElementById("currentRoute");
const currentRideType = document.getElementById("currentRideType");
const currentSchedule = document.getElementById("currentSchedule");
const currentCost = document.getElementById("currentCost");
const cancelRideBtn = document.getElementById("cancelRideBtn");
const cancelStatus = document.getElementById("cancelStatus");

const historyModal = document.getElementById("historyModal");
const historyTitle = document.getElementById("historyTitle");
const historyRoute = document.getElementById("historyRoute");
const historyRideType = document.getElementById("historyRideType");
const historyDate = document.getElementById("historyDate");
const historyPrice = document.getElementById("historyPrice");
const historyPoints = document.getElementById("historyPoints");
const contactSelect = document.getElementById("contactSelect");
const splitMessagePreview = document.getElementById("splitMessagePreview");
const shareSplitBtn = document.getElementById("shareSplitBtn");
const whatsappSplitBtn = document.getElementById("whatsappSplitBtn");
const closeHistoryBtn = document.getElementById("closeHistoryBtn");
const historyShareStatus = document.getElementById("historyShareStatus");

const navItems = document.querySelectorAll(".nav-item");
const currentNavItem = document.querySelector('[data-page="pageCurrent"]');
const pages = document.querySelectorAll(".page");
const switches = document.querySelectorAll(".switch");
const quickPlaceButtons = document.querySelectorAll(".place-chip");
const addressButtons = document.querySelectorAll(".place-item .mini-btn");
const historyItems = document.querySelectorAll(".history-item");

function hideAppLoader() {
  if (!appLoader || appLoader.classList.contains("hide")) return;

  appLoader.classList.add("hide");

  appLoader.addEventListener("transitionend", () => {
    appLoader.remove();
  }, { once: true });
}

function calculateDiscount(points) {
  return Math.floor(points / 10);
}

function formatPrice(value) {
  const hasCents = Math.round(value * 100) % 100 !== 0;
  const amount = value.toLocaleString("pl-PL", {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: hasCents ? 2 : 0
  });

  return `${amount} zł`;
}

function setLocationStatus(message, type = "") {
  locationStatus.textContent = message;
  locationStatus.classList.toggle("success", type === "success");
  locationStatus.classList.toggle("error", type === "error");
}

function setCancelStatus(message, type = "") {
  cancelStatus.textContent = message;
  cancelStatus.classList.toggle("success", type === "success");
  cancelStatus.classList.toggle("error", type === "error");
}

function setDefaultScheduleTime() {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 45);

  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  const value = local.toISOString().slice(0, 16);

  scheduleTime.min = value;
  if (!scheduleTime.value) {
    scheduleTime.value = value;
  }
}

function formatScheduleLabel() {
  if (rideTimeMode.value === "now") {
    return "Teraz";
  }

  if (!scheduleTime.value) {
    return "Wybierz termin";
  }

  return new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(scheduleTime.value));
}

function getRouteLabel() {
  return `${fromInput.value} -> ${toInput.value}`;
}

function updateSummaryRoute() {
  if (!selectedRide) return;

  summaryRoute.textContent = getRouteLabel();
  if (activeRide) {
    currentRoute.textContent = activeRide.route;
  }
}

function updateScheduleSummary() {
  const isLater = rideTimeMode.value === "later";

  scheduleWrap.classList.toggle("hidden", !isLater);
  if (isLater) {
    setDefaultScheduleTime();
  }

  if (selectedRide) {
    summarySchedule.textContent = formatScheduleLabel();
    summaryTime.textContent = isLater ? "Rezerwacja" : `${selectedRide.time} min`;
  }
}

function useBrowserLocation() {
  if (!window.isSecureContext) {
    setLocationStatus("Lokalizacja wymaga uruchomienia przez localhost albo HTTPS.", "error");
    return;
  }

  if (!("geolocation" in navigator)) {
    setLocationStatus("Ta przeglądarka nie obsługuje lokalizacji.", "error");
    return;
  }

  locateBtn.disabled = true;
  locateBtn.textContent = "...";
  setLocationStatus("Czekam na zgodę przeglądarki...");

  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude, accuracy } = position.coords;
      const lat = latitude.toFixed(5);
      const lng = longitude.toFixed(5);
      const roundedAccuracy = Math.round(accuracy);

      fromInput.value = `Moja lokalizacja (${lat}, ${lng})`;
      setLocationStatus(`Lokalizacja pobrana, dokładność około ${roundedAccuracy} m.`, "success");
      updateSummaryRoute();

      locateBtn.disabled = false;
      locateBtn.textContent = "GPS";
    },
    error => {
      let message = "Nie udało się pobrać lokalizacji.";

      if (error.code === error.PERMISSION_DENIED) {
        message = "Brak zgody na lokalizację. Możesz wpisać adres ręcznie.";
      } else if (error.code === error.POSITION_UNAVAILABLE) {
        message = "Lokalizacja jest teraz niedostępna.";
      } else if (error.code === error.TIMEOUT) {
        message = "Pobieranie lokalizacji trwało zbyt długo.";
      }

      setLocationStatus(message, "error");
      locateBtn.disabled = false;
      locateBtn.textContent = "GPS";
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    }
  );
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
    ecoMessage.textContent = `Ten przejazd da Ci ${selectedRide.points} punktów, czyli około ${formatPrice(selectedRide.discount)} zniżki na kolejny przejazd.`;
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

  summaryType.textContent = selectedRide.name;
  summaryPrice.textContent = formatPrice(selectedRide.price);
  summaryPoints.textContent = `${selectedRide.points} pkt`;

  updateSummaryRoute();
  updateScheduleSummary();
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

function pickDriver() {
  const index = Math.floor(Math.random() * drivers.length);
  return drivers[index];
}

function createActiveRide() {
  const ride = selectedRide || rides["Eko Taxi"];
  const driver = pickDriver();
  const isScheduled = rideTimeMode.value === "later";
  const scheduleLabel = formatScheduleLabel();

  activeRide = {
    id: Date.now(),
    ride,
    driver,
    route: getRouteLabel(),
    from: fromInput.value,
    to: toInput.value,
    price: ride.price,
    scheduleLabel,
    eta: isScheduled ? "O zaplanowanej godzinie" : `${ride.time} min`,
    status: isScheduled ? "Zaplanowany" : "W drodze po Ciebie",
    banner: isScheduled ? "Przejazd zaplanowany" : "Kierowca jedzie po Ciebie",
    isScheduled,
    canCancel: true
  };
}

function updateCurrentRideView() {
  const hasRide = Boolean(activeRide);

  currentNavItem.classList.toggle("hidden", !hasRide);
  activeRideShortcut.classList.toggle("hidden", !hasRide);
  currentEmptyCard.classList.toggle("hidden", hasRide);
  currentRideCard.classList.toggle("hidden", !hasRide);

  if (!activeRide) {
    if (document.getElementById("pageCurrent").classList.contains("active")) {
      changePage("pageHome");
    }
    return;
  }

  activeRideShortcutText.textContent = `${activeRide.driver.name} • ${activeRide.eta} • ${activeRide.route}`;
  currentStatusBanner.textContent = activeRide.banner;
  currentDriverAvatar.textContent = activeRide.driver.initials;
  currentDriverName.textContent = activeRide.driver.name;
  currentDriverMeta.textContent = `${activeRide.driver.car} - ${activeRide.driver.plate} - ${activeRide.driver.rating}`;
  currentEta.textContent = activeRide.eta;
  currentStatus.textContent = activeRide.status;
  currentRoute.textContent = activeRide.route;
  currentRideType.textContent = activeRide.ride.name;
  currentSchedule.textContent = activeRide.scheduleLabel;
  currentCost.textContent = formatPrice(activeRide.price);
  cancelRideBtn.classList.toggle("hidden", !activeRide.canCancel);
  setCancelStatus(activeRide.canCancel ? "Możesz anulować, dopóki kierowca Cię nie odebrał." : "");
}

function orderRide() {
  if (!selectedRide) {
    selectRide("Eko Taxi");
  }

  if (rideTimeMode.value === "later" && !scheduleTime.value) {
    setDefaultScheduleTime();
  }

  createActiveRide();
  updateCurrentRideView();

  const driverLine = `${activeRide.driver.name}, ${activeRide.driver.car} (${activeRide.driver.plate})`;
  const timeLine = activeRide.isScheduled
    ? `Termin: ${activeRide.scheduleLabel}.`
    : `Kierowca będzie za ${activeRide.ride.time} min.`;
  const pointsLine = rewardMode === "eco"
    ? `Zdobywasz ${activeRide.ride.points} punktów na sadzenie drzew.`
    : `Zdobywasz ${activeRide.ride.points} punktów, około ${formatPrice(activeRide.ride.discount)} zniżki.`;

  successIcon.textContent = "OK";
  successText.innerHTML = `
    ${timeLine}<br />
    Przyjedzie: ${driverLine}.<br />
    ${pointsLine}
  `;

  successModal.classList.add("show");
}

function cancelRide() {
  if (!activeRide) return;

  if (!activeRide.canCancel) {
    setCancelStatus("Nie można anulować po odebraniu pasażera.", "error");
    return;
  }

  const cancelledRoute = activeRide.route;
  activeRide = null;
  updateCurrentRideView();
  setCancelStatus("");
  currentEmptyCard.querySelector(".small-note").textContent = `Anulowano przejazd: ${cancelledRoute}. Możesz zamówić kolejny.`;
}

function changePage(pageId) {
  if (pageId === "pageCurrent" && !activeRide) {
    pageId = "pageHome";
  }

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

function useSavedAddress(address, target) {
  if (target === "from") {
    fromInput.value = address;
    setLocationStatus("Ustawiono zapisane miejsce jako start.", "success");
  } else {
    toInput.value = address;
  }

  updateSummaryRoute();
  changePage("pageHome");
}

function getSelectedContact() {
  return contacts[Number.parseInt(contactSelect.value, 10)] || contacts[0];
}

function getHistorySplitAmount() {
  return selectedHistoryRide.price / 2;
}

function buildSplitMessage() {
  const contact = getSelectedContact();
  const amount = formatPrice(getHistorySplitAmount());

  return `Hej ${contact.name}! Zwróć mi ${amount} za przejazd ${selectedHistoryRide.route} (${selectedHistoryRide.type}, ${selectedHistoryRide.date}).`;
}

function setHistoryShareStatus(message, type = "") {
  historyShareStatus.textContent = message;
  historyShareStatus.classList.toggle("success", type === "success");
  historyShareStatus.classList.toggle("error", type === "error");
}

function updateHistorySplitPreview() {
  splitMessagePreview.textContent = buildSplitMessage();
  setHistoryShareStatus("");
}

function openHistoryRide(rideId) {
  selectedHistoryRide = historyRides.find(ride => ride.id === rideId) || historyRides[0];

  historyTitle.textContent = `Szczegóły: ${selectedHistoryRide.route}`;
  historyRoute.textContent = selectedHistoryRide.route;
  historyRideType.textContent = selectedHistoryRide.type;
  historyDate.textContent = selectedHistoryRide.date;
  historyPrice.textContent = formatPrice(selectedHistoryRide.price);
  historyPoints.textContent = `${selectedHistoryRide.points} pkt`;

  updateHistorySplitPreview();
  historyModal.classList.add("show");
}

async function shareHistorySplit() {
  const text = buildSplitMessage();

  if (navigator.share) {
    await navigator.share({
      title: "Podział kosztu przejazdu EkoTaxi",
      text
    });
    setHistoryShareStatus("Wiadomość gotowa do wysłania.", "success");
    return;
  }

  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
    setHistoryShareStatus("Brak systemowego udostępniania. Skopiowano tekst wiadomości.", "success");
    return;
  }

  setHistoryShareStatus("Skopiuj treść wiadomości z pola powyżej.", "error");
}

function openWhatsappSplit() {
  const contact = getSelectedContact();
  const text = encodeURIComponent(buildSplitMessage());
  const href = contact.phone
    ? `https://wa.me/${contact.phone}?text=${text}`
    : `https://wa.me/?text=${text}`;

  window.open(href, "_blank", "noopener");
}

function bindEvents() {
  locateBtn.addEventListener("click", useBrowserLocation);
  fromInput.addEventListener("input", updateSummaryRoute);
  toInput.addEventListener("input", updateSummaryRoute);

  rideTimeMode.addEventListener("change", updateScheduleSummary);
  scheduleTime.addEventListener("change", updateScheduleSummary);

  checkRideBtn.addEventListener("click", showRideOptions);

  rideOptions.forEach(option => {
    option.addEventListener("click", () => {
      selectRide(option.dataset.type);
    });
  });

  orderBtn.addEventListener("click", orderRide);

  viewCurrentRideBtn.addEventListener("click", () => {
    successModal.classList.remove("show");
    changePage("pageCurrent");
  });

  closeSuccessBtn.addEventListener("click", () => {
    successModal.classList.remove("show");
  });

  goToActiveRideBtn.addEventListener("click", () => {
    changePage("pageCurrent");
  });

  currentOrderBtn.addEventListener("click", () => {
    changePage("pageHome");
  });

  cancelRideBtn.addEventListener("click", cancelRide);

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

  quickPlaceButtons.forEach(button => {
    button.addEventListener("click", () => {
      useSavedAddress(button.dataset.address, button.dataset.target);
    });
  });

  addressButtons.forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".place-item");
      useSavedAddress(item.dataset.address, button.dataset.use);
    });
  });

  historyItems.forEach(item => {
    item.addEventListener("click", () => {
      openHistoryRide(item.dataset.historyId);
    });
  });

  contactSelect.addEventListener("change", updateHistorySplitPreview);
  shareSplitBtn.addEventListener("click", () => {
    shareHistorySplit().catch(() => {
      setHistoryShareStatus("Nie udało się udostępnić wiadomości.", "error");
    });
  });
  whatsappSplitBtn.addEventListener("click", openWhatsappSplit);
  closeHistoryBtn.addEventListener("click", () => {
    historyModal.classList.remove("show");
  });
}

setDefaultScheduleTime();
updateProgress(0);
updateRewardMode("eco");
updateScheduleSummary();
updateCurrentRideView();
bindEvents();

window.addEventListener("load", () => {
  setTimeout(hideAppLoader, 850);
});

setTimeout(hideAppLoader, 2400);
