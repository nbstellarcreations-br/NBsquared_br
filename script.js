// ======================
// MOBILE MENU TOGGLE
// ======================
function toggleMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  mobileMenu.style.display = mobileMenu.style.display === "block" ? "none" : "block";
}

function closeMenu() {
  document.getElementById("mobile-menu").style.display = "none";
}

// ======================
// COOKIE CONSENT LOGIC
// ======================
const cookieBanner = document.getElementById('cookie-banner');
const managePreferencesButton = document.getElementById('customise');
const acceptAllButton = document.getElementById('accept-all');
const acceptAllButtonInModal = document.getElementById("preference-accept-all");
const savePreferencesButton = document.getElementById('save-preferences');
const preferenceModal = document.getElementById('preference-modal');

function applyConsent(consent) {
  gtag('consent', 'update', consent);
  localStorage.setItem('consentMode', JSON.stringify(consent));

  if (consent.analytics_storage === 'granted') {
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-CN32FTXPEP';
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
          gtag('js', new Date());
          gtag('config', 'G-CN32FTXPEP');
      };
  }
}

function acceptAllCookies() {
  const consent = {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      personalization_storage: 'granted',
      functionality_storage: 'granted',
      security_storage: 'granted'
  };
  applyConsent(consent);
  localStorage.setItem('cookieConsentGiven', 'true');
  cookieBanner.style.display = 'none';
  preferenceModal.style.display = 'none';
}

function saveCustomPreferences() {
  const consent = {
      ad_storage: document.getElementById('targeting').checked ? 'granted' : 'denied',
      analytics_storage: document.getElementById('performance').checked ? 'granted' : 'denied',
      personalization_storage: 'denied',
      functionality_storage: document.getElementById('functional').checked ? 'granted' : 'denied',
      security_storage: 'granted'
  };
  applyConsent(consent);
  localStorage.setItem('cookieConsentGiven', 'true');
  preferenceModal.style.display = 'none';
  cookieBanner.style.display = 'none';
}

function showCookieBanner() {
  cookieBanner.style.display = 'flex';
}

function showPreferenceModal() {
  preferenceModal.style.display = 'flex';
  cookieBanner.style.display = 'none';
}

function hidePreferenceModal() {
  preferenceModal.style.display = 'none';
}

// ✅ Load preferences and control banner after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const savedConsent = localStorage.getItem('consentMode');
  const consentGiven = localStorage.getItem('cookieConsentGiven') === 'true';

  if (savedConsent && consentGiven) {
      applyConsent(JSON.parse(savedConsent));
      cookieBanner.style.display = 'none';
  } else {
      showCookieBanner();
  }
});

// Event Listeners
managePreferencesButton.addEventListener('click', showPreferenceModal);
acceptAllButton.addEventListener('click', acceptAllCookies);
acceptAllButtonInModal.addEventListener("click", acceptAllCookies);
savePreferencesButton.addEventListener('click', saveCustomPreferences);

// ======================
// POPUP FUNCTIONALITY
// ======================
const popup = document.getElementById('custom-popup');
const popupClose = document.getElementById('popup-close');

// Show popup only once per session
document.addEventListener('DOMContentLoaded', () => {
  const popupShown = sessionStorage.getItem('popupShown');

  if (!popupShown) {
    popup.classList.remove('hidden');
    sessionStorage.setItem('popupShown', 'true');
  }
});

// Close popup on 'X' click
popupClose.addEventListener('click', () => {
  popup.classList.add('hidden');
});

// Close popup if clicking outside the popup content
popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.classList.add('hidden');
  }
});