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

const rideStatuses = [
  "Szukamy kierowcy",
  "Kierowca jedzie",
  "Kierowca czeka",
  "W trasie",
  "Zakończony"
];

const promos = {
  EKO10: {
    label: "EKO10",
    type: "percent",
    value: 10
  },
  GREEN5: {
    label: "GREEN5",
    type: "amount",
    value: 5
  },
  WELCOME15: {
    label: "WELCOME15",
    type: "percent",
    value: 15
  }
};

let basePoints = 72;
let selectedRide = null;
let rewardMode = "eco";
let activeRide = null;
let selectedHistoryRide = historyRides[0];
let activePromo = null;
let scheduledRides = [];
let completedRideForRating = null;
let selectedRating = 5;

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
const paymentSelect = document.getElementById("paymentSelect");
const promoCode = document.getElementById("promoCode");
const applyPromoBtn = document.getElementById("applyPromoBtn");
const promoStatus = document.getElementById("promoStatus");

const summaryType = document.getElementById("summaryType");
const summaryRoute = document.getElementById("summaryRoute");
const summaryPrice = document.getElementById("summaryPrice");
const summaryDiscountRow = document.getElementById("summaryDiscountRow");
const summaryDiscount = document.getElementById("summaryDiscount");
const summaryFinalPrice = document.getElementById("summaryFinalPrice");
const summaryPayment = document.getElementById("summaryPayment");
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
const currentPayment = document.getElementById("currentPayment");
const rideStatusTrack = document.getElementById("rideStatusTrack");
const chatStatus = document.getElementById("chatStatus");
const advanceStatusBtn = document.getElementById("advanceStatusBtn");
const finishRideBtn = document.getElementById("finishRideBtn");
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
const historyList = document.getElementById("historyList");
const scheduledRidesCard = document.getElementById("scheduledRidesCard");
const scheduledRidesList = document.getElementById("scheduledRidesList");
const addressBook = document.querySelector(".address-book");
const newPlaceName = document.getElementById("newPlaceName");
const newPlaceAddress = document.getElementById("newPlaceAddress");
const savePlaceBtn = document.getElementById("savePlaceBtn");
const savePlaceStatus = document.getElementById("savePlaceStatus");
const finishModal = document.getElementById("finishModal");
const finishSummary = document.getElementById("finishSummary");
const ratingStars = document.getElementById("ratingStars");
const ratingComment = document.getElementById("ratingComment");
const saveRatingBtn = document.getElementById("saveRatingBtn");

const navItems = document.querySelectorAll(".nav-item");
const currentNavItem = document.querySelector('[data-page="pageCurrent"]');
const pages = document.querySelectorAll(".page");
const switches = document.querySelectorAll(".switch");
const quickPlaceButtons = document.querySelectorAll(".place-chip");
const chatButtons = document.querySelectorAll(".chat-chip");

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

function getDiscountAmount(price = selectedRide?.price || 0) {
  if (!activePromo) return 0;

  if (activePromo.type === "percent") {
    return Math.round(price * activePromo.value) / 100;
  }

  return Math.min(activePromo.value, price);
}

function getFinalPrice(price = selectedRide?.price || 0) {
  return Math.max(price - getDiscountAmount(price), 0);
}

function updatePriceSummary() {
  if (!selectedRide) return;

  const discount = getDiscountAmount(selectedRide.price);
  const finalPrice = getFinalPrice(selectedRide.price);

  summaryPrice.textContent = formatPrice(selectedRide.price);
  summaryFinalPrice.textContent = formatPrice(finalPrice);
  summaryPayment.textContent = paymentSelect.value;
  summaryDiscountRow.classList.toggle("hidden", discount <= 0);
  summaryDiscount.textContent = `-${formatPrice(discount)}`;
}

function applyPromoCode() {
  const code = promoCode.value.trim().toUpperCase();

  if (!code) {
    activePromo = null;
    promoStatus.textContent = "";
    promoStatus.classList.remove("success", "error");
    updatePriceSummary();
    return;
  }

  if (!promos[code]) {
    activePromo = null;
    promoStatus.textContent = "Nie znaleziono takiego kuponu.";
    promoStatus.classList.add("error");
    promoStatus.classList.remove("success");
    updatePriceSummary();
    return;
  }

  activePromo = promos[code];
  promoStatus.textContent = `Kupon ${code} aktywny.`;
  promoStatus.classList.add("success");
  promoStatus.classList.remove("error");
  updatePriceSummary();
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
  summaryPoints.textContent = `${selectedRide.points} pkt`;

  updateSummaryRoute();
  updatePriceSummary();
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
  const statusIndex = isScheduled ? 0 : 1;

  activeRide = {
    id: Date.now(),
    ride,
    driver,
    route: getRouteLabel(),
    from: fromInput.value,
    to: toInput.value,
    price: ride.price,
    finalPrice: getFinalPrice(ride.price),
    discount: getDiscountAmount(ride.price),
    promo: activePromo?.label || "",
    payment: paymentSelect.value,
    scheduleLabel,
    eta: isScheduled ? "O zaplanowanej godzinie" : `${ride.time} min`,
    statusIndex,
    status: rideStatuses[statusIndex],
    banner: isScheduled ? "Przejazd zaplanowany" : "Kierowca jedzie po Ciebie",
    isScheduled,
    canCancel: true
  };
}

function renderStatusTrack() {
  rideStatusTrack.innerHTML = rideStatuses.map((status, index) => {
    const state = index < activeRide.statusIndex ? "done" : index === activeRide.statusIndex ? "active" : "";
    return `<span class="${state}">${status}</span>`;
  }).join("");
}

function syncActiveRideStatus() {
  activeRide.status = rideStatuses[activeRide.statusIndex];
  activeRide.canCancel = activeRide.statusIndex < 3;

  if (activeRide.statusIndex === 0) {
    activeRide.banner = "Szukamy kierowcy";
    activeRide.eta = "Za chwilę";
  } else if (activeRide.statusIndex === 1) {
    activeRide.banner = "Kierowca jedzie po Ciebie";
    activeRide.eta = `${activeRide.ride.time} min`;
  } else if (activeRide.statusIndex === 2) {
    activeRide.banner = "Kierowca czeka pod adresem";
    activeRide.eta = "Już jest";
  } else if (activeRide.statusIndex === 3) {
    activeRide.banner = "Jesteś w trasie";
    activeRide.eta = "W trasie";
  } else {
    activeRide.banner = "Przejazd zakończony";
    activeRide.eta = "Zakończono";
  }
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

  syncActiveRideStatus();
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
  currentCost.textContent = activeRide.discount > 0
    ? `${formatPrice(activeRide.finalPrice)} (${activeRide.promo})`
    : formatPrice(activeRide.finalPrice);
  currentPayment.textContent = activeRide.payment;
  renderStatusTrack();
  cancelRideBtn.classList.toggle("hidden", !activeRide.canCancel);
  advanceStatusBtn.classList.toggle("hidden", activeRide.statusIndex >= rideStatuses.length - 2);
  finishRideBtn.classList.toggle("hidden", activeRide.statusIndex < 3);
  setCancelStatus(activeRide.canCancel ? "Możesz anulować, dopóki kierowca Cię nie odebrał." : "");
}

function renderScheduledRides() {
  scheduledRidesCard.classList.toggle("hidden", scheduledRides.length === 0);
  scheduledRidesList.innerHTML = scheduledRides.map(ride => `
    <div class="scheduled-item" data-scheduled-id="${ride.id}">
      <div>
        <strong>${ride.route}</strong>
        <small>${ride.ride.name} • ${ride.scheduleLabel} • ${formatPrice(ride.finalPrice)}</small>
      </div>
      <div class="scheduled-actions">
        <button class="mini-btn" type="button" data-action="start">Start test</button>
        <button class="mini-btn" type="button" data-action="edit">+15 min</button>
        <button class="mini-btn danger-mini" type="button" data-action="cancel">Anuluj</button>
      </div>
    </div>
  `).join("");
}

function addScheduledRide() {
  createActiveRide();
  scheduledRides.unshift({ ...activeRide, id: Date.now() });
  activeRide = null;
  renderScheduledRides();
  updateCurrentRideView();
}

function handleScheduledAction(item, action) {
  const rideId = Number(item.dataset.scheduledId);
  const ride = scheduledRides.find(entry => entry.id === rideId);

  if (!ride) return;

  if (action === "cancel") {
    scheduledRides = scheduledRides.filter(entry => entry.id !== rideId);
    renderScheduledRides();
    return;
  }

  if (action === "edit") {
    ride.scheduleLabel = `${ride.scheduleLabel} +15 min`;
    renderScheduledRides();
    return;
  }

  activeRide = {
    ...ride,
    statusIndex: 1,
    isScheduled: false,
    scheduleLabel: "Teraz",
    eta: `${ride.ride.time} min`,
    banner: "Kierowca jedzie po Ciebie"
  };
  scheduledRides = scheduledRides.filter(entry => entry.id !== rideId);
  renderScheduledRides();
  updateCurrentRideView();
  changePage("pageCurrent");
}

function orderRide() {
  if (!selectedRide) {
    selectRide("Eko Taxi");
  }

  if (rideTimeMode.value === "later" && !scheduleTime.value) {
    setDefaultScheduleTime();
  }

  if (rideTimeMode.value === "later") {
    addScheduledRide();
    successIcon.textContent = "OK";
    successText.innerHTML = `
      Przejazd zaplanowany na ${formatScheduleLabel()}.<br />
      Płatność: ${paymentSelect.value}.<br />
      Znajdziesz go na górze ekranu głównego.
    `;
    viewCurrentRideBtn.textContent = "Wróć do głównej";
    successModal.classList.add("show");
    return;
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
  viewCurrentRideBtn.textContent = "Zobacz przejazd";
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

function advanceRideStatus() {
  if (!activeRide) return;

  activeRide.statusIndex = Math.min(activeRide.statusIndex + 1, 3);
  updateCurrentRideView();
}

function addCompletedRideToHistory(ride) {
  historyRides.unshift({
    id: `ride-${Date.now()}`,
    route: ride.route,
    type: ride.ride.name,
    price: ride.finalPrice,
    originalPrice: ride.price,
    points: ride.ride.points,
    date: "przed chwilą",
    driver: ride.driver.name,
    payment: ride.payment,
    rating: null,
    comment: ""
  });
  renderHistory();
}

function finishRide() {
  if (!activeRide) return;

  activeRide.statusIndex = 4;
  syncActiveRideStatus();
  completedRideForRating = { ...activeRide };
  addCompletedRideToHistory(activeRide);
  finishSummary.textContent = `Przejazd ${activeRide.route} zakończony. Zapłacono ${formatPrice(activeRide.finalPrice)} i zdobyto ${activeRide.ride.points} pkt.`;
  activeRide = null;
  updateCurrentRideView();
  finishModal.classList.add("show");
  changePage("pageProfile");
}

function sendQuickMessage(message) {
  chatStatus.textContent = `Wysłano do kierowcy: "${message}"`;
  chatStatus.classList.add("success");
  chatStatus.classList.remove("error");
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

function renderHistory() {
  historyList.innerHTML = historyRides.map(ride => `
    <button class="history-item" type="button" data-history-id="${ride.id}">
      <div>
        <strong>${ride.route}</strong>
        <small>${ride.type} - ${formatPrice(ride.price)} - ${ride.points} pkt${ride.rating ? ` - ${ride.rating}★` : ""}</small>
      </div>
      <span>${ride.date}</span>
    </button>
  `).join("");
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

function updateRatingStars() {
  ratingStars.querySelectorAll("button").forEach(button => {
    button.classList.toggle("active", Number(button.dataset.rating) <= selectedRating);
  });
}

function saveRating() {
  if (!completedRideForRating) {
    finishModal.classList.remove("show");
    return;
  }

  const latestRide = historyRides[0];
  latestRide.rating = selectedRating;
  latestRide.comment = ratingComment.value.trim();
  renderHistory();
  finishModal.classList.remove("show");
  ratingComment.value = "";
}

function saveNewPlace() {
  const name = newPlaceName.value.trim();
  const address = newPlaceAddress.value.trim();

  if (!name || !address) {
    savePlaceStatus.textContent = "Podaj nazwę i adres miejsca.";
    savePlaceStatus.classList.add("error");
    savePlaceStatus.classList.remove("success");
    return;
  }

  const item = document.createElement("div");
  item.className = "place-item";
  item.dataset.address = address;
  item.innerHTML = `
    <div><strong>📍 ${name}</strong><small>${address}</small></div>
    <div class="place-actions">
      <button class="mini-btn" type="button" data-use="from">Start</button>
      <button class="mini-btn" type="button" data-use="to">Cel</button>
    </div>
  `;
  addressBook.appendChild(item);
  newPlaceName.value = "";
  newPlaceAddress.value = "";
  savePlaceStatus.textContent = "Miejsce zapisane w książce adresowej.";
  savePlaceStatus.classList.add("success");
  savePlaceStatus.classList.remove("error");
}

function bindEvents() {
  locateBtn.addEventListener("click", useBrowserLocation);
  fromInput.addEventListener("input", updateSummaryRoute);
  toInput.addEventListener("input", updateSummaryRoute);

  paymentSelect.addEventListener("change", updatePriceSummary);
  applyPromoBtn.addEventListener("click", applyPromoCode);
  promoCode.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      applyPromoCode();
    }
  });

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
    changePage(activeRide ? "pageCurrent" : "pageHome");
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
  advanceStatusBtn.addEventListener("click", advanceRideStatus);
  finishRideBtn.addEventListener("click", finishRide);

  chatButtons.forEach(button => {
    button.addEventListener("click", () => {
      sendQuickMessage(button.dataset.message);
    });
  });

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

  addressBook.addEventListener("click", event => {
    const button = event.target.closest(".mini-btn");
    if (!button) return;

    const item = button.closest(".place-item");
    useSavedAddress(item.dataset.address, button.dataset.use);
  });

  historyList.addEventListener("click", event => {
    const item = event.target.closest(".history-item");
    if (!item) return;

    openHistoryRide(item.dataset.historyId);
  });

  scheduledRidesList.addEventListener("click", event => {
    const button = event.target.closest(".mini-btn");
    const item = event.target.closest(".scheduled-item");
    if (!button || !item) return;

    handleScheduledAction(item, button.dataset.action);
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

  savePlaceBtn.addEventListener("click", saveNewPlace);

  ratingStars.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;

    selectedRating = Number(button.dataset.rating);
    updateRatingStars();
  });

  saveRatingBtn.addEventListener("click", saveRating);
}

setDefaultScheduleTime();
updateProgress(0);
updateRewardMode("eco");
updateScheduleSummary();
updateCurrentRideView();
renderHistory();
renderScheduledRides();
updateRatingStars();
bindEvents();

window.addEventListener("load", () => {
  setTimeout(hideAppLoader, 850);
});

setTimeout(hideAppLoader, 2400);
