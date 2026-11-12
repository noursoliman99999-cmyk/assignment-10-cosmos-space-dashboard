const NASA_API_URL = "https://api.nasa.gov/planetary/apod";
const LAUNCHES_API_URL =
  "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=10&mode=detailed";
const NASA_API_KEY = "DEMO_KEY";
const MIN_APOD_DATE = "1995-06-16";
const FALLBACK_IMAGE = "./assets/images/placeholder.webp";
const STORAGE_KEYS = {
  launchFavorites: "cosmos-launch-favorites",
  planetFavorites: "cosmos-planet-favorites",
  launchReminders: "cosmos-launch-reminders"
};

const planetData = {
  mercury: {
    name: "Mercury",
    distance: "57.9M km",
    radius: "2,440 km",
    mass: "3.30 × 10²³ kg",
    density: "5.43 g/cm³",
    orbitalPeriod: "88 days",
    rotation: "58.6 days",
    moons: "0",
    gravity: "3.7 m/s²",
    discoverer: "Known since antiquity",
    discoveryDate: "Ancient",
    bodyType: "Terrestrial",
    volume: "6.08 × 10¹⁰ km³",
    perihelion: "46.0M km",
    aphelion: "69.8M km",
    eccentricity: "0.2056",
    inclination: "7.00°",
    axialTilt: "0.03°",
    temperature: "167°C",
    escape: "4.3 km/s",
    description:
      "Mercury is the smallest planet in our solar system and the closest to the Sun. Its heavily cratered surface records billions of years of impacts.",
    facts: [
      "The smallest planet in the solar system",
      "A year lasts only 88 Earth days",
      "Has extreme day-to-night temperature changes",
      "Has no natural moons"
    ]
  },
  venus: {
    name: "Venus",
    distance: "108.2M km",
    radius: "6,052 km",
    mass: "4.87 × 10²⁴ kg",
    density: "5.24 g/cm³",
    orbitalPeriod: "224.7 days",
    rotation: "243 days",
    moons: "0",
    gravity: "8.9 m/s²",
    discoverer: "Known since antiquity",
    discoveryDate: "Ancient",
    bodyType: "Terrestrial",
    volume: "9.28 × 10¹¹ km³",
    perihelion: "107.5M km",
    aphelion: "108.9M km",
    eccentricity: "0.0068",
    inclination: "3.39°",
    axialTilt: "177.36°",
    temperature: "464°C",
    escape: "10.4 km/s",
    description:
      "Venus is the second planet from the Sun. Its thick atmosphere traps heat, making it the hottest planet in the solar system.",
    facts: [
      "The hottest planet in our solar system",
      "Rotates in the opposite direction to most planets",
      "Its clouds contain sulfuric acid",
      "A day is longer than its year"
    ]
  },
  earth: {
    name: "Earth",
    distance: "149.6M km",
    radius: "6,371 km",
    mass: "5.97 × 10²⁴ kg",
    density: "5.51 g/cm³",
    orbitalPeriod: "365.25 days",
    rotation: "24 hours",
    moons: "1",
    gravity: "9.8 m/s²",
    discoverer: "Known since antiquity",
    discoveryDate: "Ancient",
    bodyType: "Terrestrial",
    volume: "1.08 × 10¹² km³",
    perihelion: "147.1M km",
    aphelion: "152.1M km",
    eccentricity: "0.0167",
    inclination: "0.00°",
    axialTilt: "23.44°",
    temperature: "15°C",
    escape: "11.2 km/s",
    description:
      "Earth is the third planet from the Sun and the only known world to support life. Liquid water covers about 71% of its surface.",
    facts: [
      "The only known planet with liquid water on its surface",
      "Its atmosphere contains about 78% nitrogen",
      "Its magnetic field helps shield it from solar wind",
      "Formed about 4.54 billion years ago"
    ]
  },
  mars: {
    name: "Mars",
    distance: "227.9M km",
    radius: "3,390 km",
    mass: "6.42 × 10²³ kg",
    density: "3.93 g/cm³",
    orbitalPeriod: "687 days",
    rotation: "24.6 hours",
    moons: "2",
    gravity: "3.7 m/s²",
    discoverer: "Known since antiquity",
    discoveryDate: "Ancient",
    bodyType: "Terrestrial",
    volume: "1.63 × 10¹¹ km³",
    perihelion: "206.6M km",
    aphelion: "249.2M km",
    eccentricity: "0.0934",
    inclination: "1.85°",
    axialTilt: "25.19°",
    temperature: "-65°C",
    escape: "5.0 km/s",
    description:
      "Mars is a cold desert world with a thin atmosphere. Its surface features ancient river valleys, volcanoes, and polar ice caps.",
    facts: [
      "Home to Olympus Mons, the largest volcano in the solar system",
      "Has two small moons, Phobos and Deimos",
      "A Martian day is about 24.6 hours",
      "Robotic rovers are exploring its surface"
    ]
  },
  jupiter: {
    name: "Jupiter",
    distance: "778.6M km",
    radius: "69,911 km",
    mass: "1.90 × 10²⁷ kg",
    density: "1.33 g/cm³",
    orbitalPeriod: "11.9 years",
    rotation: "9.9 hours",
    moons: "95",
    gravity: "24.8 m/s²",
    discoverer: "Known since antiquity",
    discoveryDate: "Ancient",
    bodyType: "Gas Giant",
    volume: "1.43 × 10¹⁵ km³",
    perihelion: "740.5M km",
    aphelion: "816.6M km",
    eccentricity: "0.0489",
    inclination: "1.30°",
    axialTilt: "3.13°",
    temperature: "-110°C",
    escape: "59.5 km/s",
    description:
      "Jupiter is the largest planet in the solar system. Its Great Red Spot is a giant storm that has persisted for centuries.",
    facts: [
      "The largest planet in the solar system",
      "Its Great Red Spot is a long-lived giant storm",
      "Has a faint ring system",
      "Its moon Ganymede is larger than Mercury"
    ]
  },
  saturn: {
    name: "Saturn",
    distance: "1.43B km",
    radius: "58,232 km",
    mass: "5.68 × 10²⁶ kg",
    density: "0.69 g/cm³",
    orbitalPeriod: "29.5 years",
    rotation: "10.7 hours",
    moons: "146",
    gravity: "10.4 m/s²",
    discoverer: "Known since antiquity",
    discoveryDate: "Ancient",
    bodyType: "Gas Giant",
    volume: "8.27 × 10¹⁴ km³",
    perihelion: "1.35B km",
    aphelion: "1.51B km",
    eccentricity: "0.0565",
    inclination: "2.49°",
    axialTilt: "26.73°",
    temperature: "-140°C",
    escape: "35.5 km/s",
    description:
      "Saturn is a gas giant best known for its broad, bright rings made mostly of ice and rocky debris.",
    facts: [
      "Its rings are made mostly of ice and rock",
      "The least dense planet in the solar system",
      "Has a hexagon-shaped jet stream at its north pole",
      "Its moon Titan has lakes of liquid methane"
    ]
  },
  uranus: {
    name: "Uranus",
    distance: "2.87B km",
    radius: "25,362 km",
    mass: "8.68 × 10²⁵ kg",
    density: "1.27 g/cm³",
    orbitalPeriod: "84 years",
    rotation: "17.2 hours",
    moons: "28",
    gravity: "8.7 m/s²",
    discoverer: "William Herschel",
    discoveryDate: "1781",
    bodyType: "Ice Giant",
    volume: "6.83 × 10¹³ km³",
    perihelion: "2.74B km",
    aphelion: "3.00B km",
    eccentricity: "0.0463",
    inclination: "0.77°",
    axialTilt: "97.77°",
    temperature: "-195°C",
    escape: "21.3 km/s",
    description:
      "Uranus is an ice giant with a blue-green atmosphere. It rotates on its side, likely because of an ancient collision.",
    facts: [
      "Rotates almost completely on its side",
      "Was the first planet discovered with a telescope",
      "Its blue-green color comes from atmospheric methane",
      "Has a faint system of rings"
    ]
  },
  neptune: {
    name: "Neptune",
    distance: "4.50B km",
    radius: "24,622 km",
    mass: "1.02 × 10²⁶ kg",
    density: "1.64 g/cm³",
    orbitalPeriod: "165 years",
    rotation: "16.1 hours",
    moons: "16",
    gravity: "11.2 m/s²",
    discoverer: "Johann Galle",
    discoveryDate: "1846",
    bodyType: "Ice Giant",
    volume: "6.25 × 10¹³ km³",
    perihelion: "4.45B km",
    aphelion: "4.55B km",
    eccentricity: "0.0095",
    inclination: "1.77°",
    axialTilt: "28.32°",
    temperature: "-200°C",
    escape: "23.5 km/s",
    description:
      "Neptune is a distant, cold ice giant with supersonic winds. It was discovered through mathematical predictions before it was observed.",
    facts: [
      "The most distant planet from the Sun",
      "Has the fastest winds in the solar system",
      "Takes about 165 Earth years to orbit the Sun",
      "Its largest moon, Triton, orbits backward"
    ]
  }
};

const apodDateInput = document.getElementById("apod-date-input");
const apodLoading = document.getElementById("apod-loading");
const apodImage = document.getElementById("apod-image");
const apodImageContainer = document.getElementById("apod-image-container");
const launchesGrid = document.getElementById("launches-grid");
const featuredLaunch = document.getElementById("featured-launch");
const launchById = new Map();
const launchFavorites = readStoredSet(STORAGE_KEYS.launchFavorites);
const planetFavorites = readStoredSet(STORAGE_KEYS.planetFavorites);
const launchReminders = readStoredSet(STORAGE_KEYS.launchReminders);

function readStoredSet(key) {
  try {
    const stored = JSON.parse(localStorage.getItem(key) || "[]");
    if (!Array.isArray(stored)) throw new Error("Saved value is not a list.");
    return new Set(stored.filter((value) => typeof value === "string"));
  } catch (error) {
    console.error(`Could not read ${key} from local storage.`, error);
    return new Set();
  }
}

function saveStoredSet(key, values) {
  try {
    localStorage.setItem(key, JSON.stringify(Array.from(values)));
  } catch (error) {
    console.error(`Could not save ${key} to local storage.`, error);
    showToast("Your browser could not save this preference.");
  }
}

function showToast(message) {
  let toast = document.getElementById("cosmos-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "cosmos-toast";
    toast.className =
      "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-xl border border-slate-600 bg-slate-800 px-5 py-3 text-sm text-white shadow-xl";
    toast.setAttribute("role", "status");
    document.body.append(toast);
  }
  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.hidden = true;
  }, 3500);
}

function showStatus(target, id, message, isError) {
  let status = document.getElementById(id);
  if (!status) {
    status = document.createElement("p");
    status.id = id;
    status.setAttribute("role", "status");
    target.append(status);
  }
  status.className = isError
    ? "mb-4 text-sm text-amber-300"
    : "mb-4 text-sm text-slate-400";
  status.textContent = message;
}

function removeStatus(id) {
  const status = document.getElementById(id);
  if (status) status.remove();
}

async function fetchJson(url) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`Request failed (${response.status}).`);
    return await response.json();
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function localDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDate(value, options) {
  if (!value) return "Date not announced";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date not announced";
  return new Intl.DateTimeFormat(
    undefined,
    options || { year: "numeric", month: "long", day: "numeric" }
  ).format(date);
}

function escapeHtml(value) {
  const entities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };
  return String(value || "").replace(/[&<>"']/g, (character) => entities[character]);
}

async function loadApod(date) {
  const dateLabel = document.getElementById("apod-date");
  apodLoading.hidden = false;
  dateLabel.textContent = `Astronomy Picture of the Day - ${formatDate(
    `${date}T00:00:00`
  )}`;
  removeStatus("apod-status");

  try {
    const params = new URLSearchParams({ api_key: NASA_API_KEY, date });
    const apod = await fetchJson(`${NASA_API_URL}?${params.toString()}`);

    document.getElementById("apod-title").textContent =
      apod.title || "Astronomy Picture of the Day";
    document.getElementById("apod-date-detail").textContent = apod.date || date;
    document.getElementById("apod-explanation").textContent =
      apod.explanation || "No description is available for this image.";
    document.getElementById("apod-copyright").textContent = apod.copyright
      ? `© ${apod.copyright}`
      : "Image credit: NASA";
    document.getElementById("apod-date-info").textContent = apod.date || date;
    document.getElementById("apod-media-type").textContent =
      apod.media_type === "video" ? "Video" : "Image";
    dateLabel.textContent = `Astronomy Picture of the Day - ${formatDate(
      `${apod.date || date}T00:00:00`
    )}`;

    const videoLink = document.getElementById("apod-video-link");
    if (videoLink) videoLink.remove();
    if (apod.media_type === "video") {
      apodImage.hidden = true;
      const link = document.createElement("a");
      link.id = "apod-video-link";
      link.href = apod.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.className =
        "absolute inset-0 flex items-center justify-center bg-slate-900 text-center text-lg font-semibold text-blue-300";
      link.textContent = "Open today's NASA video";
      apodImageContainer.append(link);
    } else {
      apodImage.hidden = false;
      apodImage.dataset.fallbackUsed = "false";
      apodImage.src = apod.url || FALLBACK_IMAGE;
      apodImage.alt = apod.title || "Astronomy Picture of the Day";
    }
    document.getElementById("apod-full-resolution-btn").dataset.imageUrl =
      apod.hdurl || apod.url || "";
  } catch (error) {
    console.error("Could not load NASA's Astronomy Picture of the Day.", error);
    showStatus(
      dateLabel.parentElement,
      "apod-status",
      "NASA's image could not be loaded. Check your connection or try another date.",
      true
    );
  } finally {
    apodLoading.hidden = true;
  }
}

function setActiveSection(sectionId) {
  const sections = document.querySelectorAll(".app-section");
  const isValidSection = Array.from(sections).some(
    (section) => section.id === sectionId
  );
  const activeSectionId = isValidSection ? sectionId : "today-in-space";

  sections.forEach((section) => {
    section.hidden = section.id !== activeSectionId;
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    const active = link.dataset.section === activeSectionId;
    link.classList.toggle("bg-blue-500/10", active);
    link.classList.toggle("text-blue-400", active);
    link.classList.toggle("text-slate-300", !active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setSidebarOpen(isOpen) {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("sidebar-open", isOpen);
  const overlay = document.getElementById("sidebar-overlay");
  if (overlay) overlay.hidden = !isOpen;
  document
    .getElementById("sidebar-toggle")
    .setAttribute("aria-expanded", String(isOpen));
}

function selectPlanet(id, shouldScroll) {
  const planet = planetData[id];
  if (!planet) return;

  const fields = {
    "planet-detail-name": planet.name,
    "planet-detail-description": planet.description,
    "planet-distance": planet.distance,
    "planet-radius": planet.radius,
    "planet-mass": planet.mass,
    "planet-density": planet.density,
    "planet-orbital-period": planet.orbitalPeriod,
    "planet-rotation": planet.rotation,
    "planet-moons": planet.moons,
    "planet-gravity": planet.gravity,
    "planet-discoverer": planet.discoverer,
    "planet-discovery-date": planet.discoveryDate,
    "planet-body-type": planet.bodyType,
    "planet-volume": planet.volume,
    "planet-perihelion": planet.perihelion,
    "planet-aphelion": planet.aphelion,
    "planet-eccentricity": planet.eccentricity,
    "planet-inclination": planet.inclination,
    "planet-axial-tilt": planet.axialTilt,
    "planet-temp": planet.temperature,
    "planet-escape": planet.escape
  };
  Object.entries(fields).forEach(([fieldId, value]) => {
    document.getElementById(fieldId).textContent = value;
  });

  const image = document.getElementById("planet-detail-image");
  image.src = `./assets/images/${id}.png`;
  image.alt = planet.name;
  document.getElementById("planet-facts").innerHTML = planet.facts
    .map(
      (fact) =>
        `<li class="flex items-start"><i class="fas fa-check text-green-400 mt-1 mr-2"></i><span class="text-slate-300">${escapeHtml(
          fact
        )}</span></li>`
    )
    .join("");

  document.querySelectorAll(".planet-card").forEach((card) => {
    card.classList.toggle("ring-2", card.dataset.planetId === id);
    card.classList.toggle("ring-blue-400", card.dataset.planetId === id);
    card.setAttribute("aria-pressed", String(card.dataset.planetId === id));
  });
  const favoriteButton = document.getElementById("planet-favorite-btn");
  favoriteButton.dataset.planetId = id;
  updatePlanetFavoriteButton();
  document.getElementById("planet-learn-more-btn").dataset.planetId = id;

  if (shouldScroll) {
    document
      .getElementById("planet-detail-name")
      .scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function updatePlanetFavoriteButton() {
  const button = document.getElementById("planet-favorite-btn");
  const isFavorite = planetFavorites.has(button.dataset.planetId);
  button.setAttribute("aria-pressed", String(isFavorite));
  button.setAttribute(
    "aria-label",
    isFavorite ? "Remove planet from favorites" : "Add planet to favorites"
  );
  button.innerHTML = `<i class="${isFavorite ? "fas" : "far"} fa-heart ${
    isFavorite ? "text-pink-400" : ""
  }"></i>`;
}

function getLaunchDetails(launch) {
  const pad = launch.pad || {};
  const location = pad.location || {};
  const provider = launch.launch_service_provider || {};
  const configuration =
    launch.rocket && launch.rocket.configuration
      ? launch.rocket.configuration
      : {};
  const launchDate = launch.net || launch.window_start;
  return {
    id: launch._cosmosId,
    name: launch.name || "Untitled mission",
    provider: provider.name || "Provider not announced",
    vehicle: configuration.full_name || "Vehicle not announced",
    location: location.name || pad.name || "Location not announced",
    country: location.country ? location.country.name : "Country not announced",
    date: launchDate,
    dateLabel: formatDate(launchDate, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
      timeZoneName: "short"
    }),
    status:
      launch.status && (launch.status.abbrev || launch.status.name)
        ? launch.status.abbrev || launch.status.name
        : "TBD",
    description:
      (launch.mission && launch.mission.description) ||
      "Mission details have not been announced yet.",
    image: launch.image || "./assets/images/launch-placeholder.png",
    url: launch.url || ""
  };
}

function setLaunchFavoriteButton(button, id) {
  const isFavorite = launchFavorites.has(id);
  button.dataset.favoriteLaunch = id;
  button.setAttribute("aria-pressed", String(isFavorite));
  button.setAttribute(
    "aria-label",
    isFavorite ? "Remove launch from favorites" : "Add launch to favorites"
  );
  button.innerHTML = `<i class="${isFavorite ? "fas" : "far"} fa-heart ${
    isFavorite ? "text-pink-400" : ""
  }"></i>`;
}

function renderLaunchCard(launch) {
  const details = getLaunchDetails(launch);
  return `<article class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group">
    <div class="relative h-48 bg-slate-900/50 flex items-center justify-center">
      <img src="${escapeHtml(details.image)}" alt="${escapeHtml(
    details.name
  )}" class="w-full h-full object-cover" onerror="this.onerror=null;this.src='./assets/images/launch-placeholder.png';">
      <span class="absolute top-3 right-3 px-3 py-1 bg-blue-500/90 text-white rounded-full text-xs font-semibold">${escapeHtml(
        details.status
      )}</span>
    </div>
    <div class="p-5">
      <h4 class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">${escapeHtml(
        details.name
      )}</h4>
      <p class="text-sm text-slate-400 flex items-center gap-2 mb-4"><i class="fas fa-building text-xs"></i>${escapeHtml(
        details.provider
      )}</p>
      <div class="space-y-2 mb-4 text-sm">
        <p class="flex items-center gap-2"><i class="fas fa-calendar text-slate-500 w-4"></i><span class="text-slate-300">${escapeHtml(
          details.dateLabel
        )}</span></p>
        <p class="flex items-center gap-2"><i class="fas fa-rocket text-slate-500 w-4"></i><span class="text-slate-300">${escapeHtml(
          details.vehicle
        )}</span></p>
        <p class="flex items-center gap-2"><i class="fas fa-map-marker-alt text-slate-500 w-4"></i><span class="text-slate-300 line-clamp-1">${escapeHtml(
          details.location
        )}</span></p>
      </div>
      <div class="flex items-center gap-2 pt-4 border-t border-slate-700">
        <button type="button" data-launch-details="${escapeHtml(
          details.id
        )}" class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold">Details</button>
        <button type="button" data-favorite-launch="${escapeHtml(
          details.id
        )}" aria-pressed="false" class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"><i class="far fa-heart"></i></button>
      </div>
    </div>
  </article>`;
}

function renderFeaturedLaunch(launch) {
  const details = getLaunchDetails(launch);
  const launchDate = details.date ? new Date(details.date).getTime() : NaN;
  const daysUntil = Number.isNaN(launchDate)
    ? "—"
    : Math.max(0, Math.ceil((launchDate - Date.now()) / 86400000));
  return `<div class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all">
    <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-5 md:p-8">
      <div class="flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-3 mb-4"><span class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold"><i class="fas fa-star mr-2"></i>Featured Launch</span><span class="px-4 py-1.5 bg-green-500/20 text-green-300 rounded-full text-sm font-semibold">${escapeHtml(
            details.status
          )}</span></div>
          <h3 class="text-2xl md:text-3xl font-bold mb-3 leading-tight">${escapeHtml(
            details.name
          )}</h3>
          <div class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"><span><i class="fas fa-building mr-2"></i>${escapeHtml(
            details.provider
          )}</span><span><i class="fas fa-rocket mr-2"></i>${escapeHtml(
    details.vehicle
  )}</span></div>
          <div class="inline-flex items-center gap-3 px-6 py-3 bg-blue-500/10 rounded-xl mb-6"><i class="fas fa-clock text-2xl text-blue-400"></i><div><p class="text-2xl font-bold text-blue-400">${daysUntil}</p><p class="text-xs text-slate-400">Days Until Launch</p></div></div>
          <div class="grid sm:grid-cols-2 gap-4 mb-6">
            <div class="bg-slate-900/50 rounded-xl p-4"><p class="text-xs text-slate-400 mb-1"><i class="fas fa-calendar mr-2"></i>Launch Date</p><p class="font-semibold">${escapeHtml(
              details.dateLabel
            )}</p></div>
            <div class="bg-slate-900/50 rounded-xl p-4"><p class="text-xs text-slate-400 mb-1"><i class="fas fa-map-marker-alt mr-2"></i>Location</p><p class="font-semibold text-sm">${escapeHtml(
              details.location
            )}</p></div>
            <div class="bg-slate-900/50 rounded-xl p-4"><p class="text-xs text-slate-400 mb-1"><i class="fas fa-globe mr-2"></i>Country</p><p class="font-semibold">${escapeHtml(
              details.country
            )}</p></div>
          </div>
          <p class="text-slate-300 leading-relaxed mb-6">${escapeHtml(
            details.description
          )}</p>
        </div>
        <div class="flex flex-col md:flex-row gap-3">
          <button type="button" data-launch-details="${escapeHtml(
            details.id
          )}" class="flex-1 px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold"><i class="fas fa-info-circle mr-2"></i>View Full Details</button>
          <button type="button" data-favorite-launch="${escapeHtml(
            details.id
          )}" aria-pressed="false" class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"><i class="far fa-heart"></i></button>
          <button type="button" data-remind-launch="${escapeHtml(
            details.id
          )}" aria-pressed="false" aria-label="Set launch reminder" class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"><i class="fas fa-bell"></i></button>
        </div>
      </div>
      <div class="relative min-h-[280px] lg:min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50">
        <img src="${escapeHtml(details.image)}" alt="${escapeHtml(
    details.name
  )}" class="absolute inset-0 w-full h-full object-cover" onerror="this.onerror=null;this.src='./assets/images/launch-placeholder.png';">
        <div class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"></div>
      </div>
    </div>
  </div>`;
}

function initializeStaticLaunches() {
  Array.from(launchesGrid.children).forEach((card, index) => {
    const title = card.querySelector("h4");
    const slug = (title ? title.textContent : "launch")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");
    const id = `sample-${index}-${slug}`;
    card.dataset.launchId = id;
    const buttons = card.querySelectorAll("button");
    if (buttons[0]) {
      buttons[0].type = "button";
      buttons[0].dataset.launchDetails = id;
    }
    if (buttons[1]) setLaunchFavoriteButton(buttons[1], id);
  });

  const featuredDetailsButton = featuredLaunch.querySelector("button");
  if (featuredDetailsButton) {
    featuredDetailsButton.type = "button";
    featuredDetailsButton.dataset.launchDetails = "sample-featured";
  }
  const featuredButtons = featuredLaunch.querySelectorAll(".icons button");
  if (featuredButtons[0]) {
    setLaunchFavoriteButton(featuredButtons[0], "sample-featured");
  }
  if (featuredButtons[1]) {
    featuredButtons[1].type = "button";
    featuredButtons[1].dataset.remindLaunch = "sample-featured";
    featuredButtons[1].setAttribute("aria-label", "Set launch reminder");
  }
}

function openLaunchDetails(id, card) {
  const launch = launchById.get(id);
  const details = launch
    ? getLaunchDetails(launch)
    : {
        name: card.querySelector("h3, h4")?.textContent.trim() || "Upcoming launch",
        provider: "",
        vehicle: "",
        location: "",
        country: "",
        dateLabel: "",
        status: "TBD",
        description: card.innerText,
        url: ""
      };

  let dialog = document.getElementById("launch-details-dialog");
  if (!dialog) {
    dialog = document.createElement("dialog");
    dialog.id = "launch-details-dialog";
    dialog.className =
      "max-h-[90vh] w-[min(42rem,calc(100%-2rem))] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white shadow-2xl backdrop:bg-black/70";
    document.body.append(dialog);
  }
  dialog.innerHTML = `<div class="flex items-start justify-between gap-4"><div><p class="mb-2 text-sm text-blue-300">${escapeHtml(
    details.provider
  )}</p><h2 class="text-2xl font-bold">${escapeHtml(
    details.name
  )}</h2></div><button type="button" data-close-dialog class="rounded-lg bg-slate-700 px-3 py-2" aria-label="Close dialog"><i class="fas fa-times"></i></button></div>
    <div class="mt-6 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
      <p><span class="text-slate-400">Vehicle:</span> ${escapeHtml(
        details.vehicle
      )}</p><p><span class="text-slate-400">Status:</span> ${escapeHtml(
    details.status
  )}</p><p><span class="text-slate-400">Launch:</span> ${escapeHtml(
    details.dateLabel || "Date not announced"
  )}</p><p><span class="text-slate-400">Location:</span> ${escapeHtml(
    details.location
  )}</p><p><span class="text-slate-400">Country:</span> ${escapeHtml(
    details.country || "Not announced"
  )}</p>
    </div><p class="mt-6 leading-relaxed text-slate-300">${escapeHtml(
      details.description
    )}</p>${
      details.url
        ? `<a class="mt-6 inline-block text-blue-300 underline" href="${escapeHtml(
            details.url
          )}" target="_blank" rel="noopener noreferrer">More mission information</a>`
        : ""
    }`;
  if (!dialog.open) dialog.showModal();
}

function updateLaunchFavoriteButtons(id) {
  document
    .querySelectorAll(`[data-favorite-launch="${CSS.escape(id)}"]`)
    .forEach((button) => setLaunchFavoriteButton(button, id));
}

function scheduleReminder(id) {
  const launch = launchById.get(id);
  if (!launch || !launch.net) return;
  const reminderAt = new Date(launch.net).getTime() - 15 * 60 * 1000;
  if (Number.isNaN(reminderAt) || reminderAt <= Date.now()) return;

  const delay = Math.min(reminderAt - Date.now(), 2147480000);
  window.setTimeout(() => {
    if (!launchReminders.has(id)) return;
    if (reminderAt - Date.now() > 1000) {
      scheduleReminder(id);
      return;
    }
    const details = getLaunchDetails(launch);
    new Notification(`Upcoming launch: ${details.name}`, {
      body: `Scheduled in about 15 minutes. ${details.provider}`
    });
    launchReminders.delete(id);
    saveStoredSet(STORAGE_KEYS.launchReminders, launchReminders);
  }, delay);
}

async function toggleLaunchReminder(id, button) {
  if (!("Notification" in window)) {
    showToast("This browser does not support launch notifications.");
    return;
  }
  if (Notification.permission === "denied") {
    showToast("Notifications are blocked in this browser's settings.");
    return;
  }

  const permission =
    Notification.permission === "granted"
      ? "granted"
      : await Notification.requestPermission();
  if (permission !== "granted") {
    showToast("Allow notifications to set a launch reminder.");
    return;
  }
  if (launchReminders.has(id)) {
    launchReminders.delete(id);
    button.setAttribute("aria-pressed", "false");
    saveStoredSet(STORAGE_KEYS.launchReminders, launchReminders);
    showToast("Launch reminder removed.");
    return;
  }

  launchReminders.add(id);
  button.setAttribute("aria-pressed", "true");
  saveStoredSet(STORAGE_KEYS.launchReminders, launchReminders);
  scheduleReminder(id);
  showToast("Reminder saved. Keep this page open to receive it.");
}

async function loadLaunches() {
  showStatus(
    launchesGrid.parentElement,
    "launches-status",
    "Loading upcoming launches…",
    false
  );
  try {
    const data = await fetchJson(LAUNCHES_API_URL);
    const launches = Array.isArray(data.results) ? data.results : [];
    if (launches.length === 0) throw new Error("No upcoming launches were returned.");

    launchById.clear();
    launches.forEach((launch, index) => {
      launch._cosmosId = String(launch.id || launch.url || `launch-${index}`);
      launchById.set(launch._cosmosId, launch);
    });
    featuredLaunch.innerHTML = renderFeaturedLaunch(launches[0]);
    launchesGrid.innerHTML = launches.slice(1).map(renderLaunchCard).join("");
    document.getElementById("launches-count").textContent = `${launches.length} Launches`;
    document.getElementById("launches-count-mobile").textContent = String(
      launches.length
    );

    document
      .querySelectorAll("[data-favorite-launch]")
      .forEach((button) =>
        setLaunchFavoriteButton(button, button.dataset.favoriteLaunch)
      );
    document.querySelectorAll("[data-remind-launch]").forEach((button) => {
      const id = button.dataset.remindLaunch;
      button.setAttribute("aria-pressed", String(launchReminders.has(id)));
      if (launchReminders.has(id)) scheduleReminder(id);
    });
    removeStatus("launches-status");
  } catch (error) {
    console.error("Could not load upcoming launches.", error);
    showStatus(
      launchesGrid.parentElement,
      "launches-status",
      "Live launch data is unavailable. Showing the sample launches instead.",
      true
    );
    initializeStaticLaunches();
  }
}

function initializeControls() {
  const today = localDateString(new Date());
  const dateLabel = document.querySelector(".date-input-wrapper span");
  apodDateInput.min = MIN_APOD_DATE;
  apodDateInput.max = today;
  apodDateInput.value = today;
  if (dateLabel) {
    dateLabel.textContent = formatDate(`${today}T00:00:00`, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      if (!document.getElementById(link.dataset.section)) return;
      if (window.location.hash === `#${link.dataset.section}`) {
        setActiveSection(link.dataset.section);
      } else {
        window.location.hash = link.dataset.section;
      }
      setSidebarOpen(false);
    });
  });
  window.addEventListener("hashchange", () => {
    setActiveSection(window.location.hash.slice(1));
  });

  const loadSelectedDate = () => {
    const date = apodDateInput.value;
    if (!date) {
      showToast("Choose a date first.");
      return;
    }
    if (date < MIN_APOD_DATE || date > today) {
      showToast("Choose a date between June 16, 1995 and today.");
      return;
    }
    if (dateLabel) {
      dateLabel.textContent = formatDate(`${date}T00:00:00`, {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    }
    loadApod(date);
  };
  document
    .getElementById("load-date-btn")
    .addEventListener("click", loadSelectedDate);
  apodDateInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") loadSelectedDate();
  });
  document.getElementById("today-apod-btn").addEventListener("click", () => {
    apodDateInput.value = today;
    if (dateLabel) {
      dateLabel.textContent = formatDate(`${today}T00:00:00`, {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    }
    loadApod(today);
  });

  document
    .getElementById("apod-full-resolution-btn")
    .addEventListener("click", () => {
      const url = document.getElementById("apod-full-resolution-btn").dataset
        .imageUrl;
      if (url) window.open(url, "_blank", "noopener,noreferrer");
      else showToast("The full-resolution image is not available.");
    });

  document.querySelectorAll(".planet-card").forEach((card) => {
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.addEventListener("click", () => selectPlanet(card.dataset.planetId, true));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectPlanet(card.dataset.planetId, true);
      }
    });
  });
  document
    .getElementById("planet-favorite-btn")
    .addEventListener("click", () => {
      const button = document.getElementById("planet-favorite-btn");
      const id = button.dataset.planetId;
      if (planetFavorites.has(id)) planetFavorites.delete(id);
      else planetFavorites.add(id);
      saveStoredSet(STORAGE_KEYS.planetFavorites, planetFavorites);
      updatePlanetFavoriteButton();
      showToast(
        planetFavorites.has(id)
          ? `${planetData[id].name} added to favorites.`
          : `${planetData[id].name} removed from favorites.`
      );
    });
  document
    .getElementById("planet-learn-more-btn")
    .addEventListener("click", () => {
      const id = document.getElementById("planet-learn-more-btn").dataset.planetId;
      window.open(
        `https://science.nasa.gov/solar-system/planets/${id}/`,
        "_blank",
        "noopener,noreferrer"
      );
    });

  const sidebarToggle = document.getElementById("sidebar-toggle");
  sidebarToggle.setAttribute("aria-expanded", "false");
  sidebarToggle.setAttribute("aria-label", "Open navigation menu");
  sidebarToggle.addEventListener("click", () => {
    setSidebarOpen(
      !document.getElementById("sidebar").classList.contains("sidebar-open")
    );
  });
  const overlay = document.createElement("button");
  overlay.id = "sidebar-overlay";
  overlay.type = "button";
  overlay.setAttribute("aria-label", "Close navigation menu");
  overlay.hidden = true;
  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    zIndex: "45",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  });
  overlay.addEventListener("click", () => setSidebarOpen(false));
  document.body.append(overlay);

  document.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    if (button.dataset.favoriteLaunch) {
      const id = button.dataset.favoriteLaunch;
      if (launchFavorites.has(id)) launchFavorites.delete(id);
      else launchFavorites.add(id);
      saveStoredSet(STORAGE_KEYS.launchFavorites, launchFavorites);
      updateLaunchFavoriteButtons(id);
      showToast(
        launchFavorites.has(id)
          ? "Launch added to favorites."
          : "Launch removed from favorites."
      );
    } else if (button.dataset.launchDetails) {
      openLaunchDetails(
        button.dataset.launchDetails,
        button.closest("article, #featured-launch")
      );
    } else if (button.dataset.remindLaunch) {
      toggleLaunchReminder(button.dataset.remindLaunch, button);
    } else if (button.hasAttribute("data-close-dialog")) {
      document.getElementById("launch-details-dialog").close();
    }
  });

  apodImage.addEventListener("error", () => {
    if (apodImage.dataset.fallbackUsed === "true") return;
    apodImage.dataset.fallbackUsed = "true";
    apodImage.src = FALLBACK_IMAGE;
    showToast("The image could not be displayed; showing a placeholder.");
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) setSidebarOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setSidebarOpen(false);
  });
}


initializeControls();
initializeStaticLaunches();
if (!window.location.hash) {
  window.history.replaceState(null, "", "#today-in-space");
}
setActiveSection(window.location.hash.slice(1));
selectPlanet("earth", false);
loadApod(apodDateInput.value);
loadLaunches();