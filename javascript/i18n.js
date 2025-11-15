// Simple i18n implementation
let currentLocale = 'pt-BR';
let translations = {};

// Function to load translations
async function loadTranslations() {
  try {
    const [ptBR, en] = await Promise.all([
      fetch('./locales/pt-BR.json').then(res => res.json()),
      fetch('./locales/en.json').then(res => res.json())
    ]);

    translations = {
      'pt-BR': ptBR,
      'en': en
    };

    // Get locale from localStorage or use default
    currentLocale = localStorage.getItem('locale') || 'pt-BR';

    return true;
  } catch (error) {
    console.error('Error loading translations:', error);
    return false;
  }
}

// Function to get nested translation value
function getTranslation(key) {
  const keys = key.split('.');
  let value = translations[currentLocale];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }

  return value || key;
}

// Function to translate all elements with data-i18n attribute
function translatePage() {
  // Update HTML lang attribute
  document.documentElement.lang = currentLocale;

  // Translate all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = getTranslation(key);

    if (translation && translation !== key) {
      element.innerHTML = translation;
    }
  });

  // Translate elements with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    const translation = getTranslation(key);

    if (translation && translation !== key) {
      element.placeholder = translation;
    }
  });

  // Translate elements with data-i18n-title
  document.querySelectorAll('[data-i18n-title]').forEach(element => {
    const key = element.getAttribute('data-i18n-title');
    const translation = getTranslation(key);

    if (translation && translation !== key) {
      element.title = translation;
    }
  });

  // Translate elements with data-i18n-aria-label
  document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
    const key = element.getAttribute('data-i18n-aria-label');
    const translation = getTranslation(key);

    if (translation && translation !== key) {
      element.setAttribute('aria-label', translation);
    }
  });

  // Translate elements with data-i18n-alt
  document.querySelectorAll('[data-i18n-alt]').forEach(element => {
    const key = element.getAttribute('data-i18n-alt');
    const translation = getTranslation(key);

    if (translation && translation !== key) {
      element.setAttribute('alt', translation);
    }
  });

  // Update language toggle button text
  updateLanguageButton();
}

// Function to update language button text
function updateLanguageButton() {
  const langButtons = [
    document.getElementById('language-toggle'),
    document.getElementById('language-toggle-mobile')
  ];

  langButtons.forEach(langButton => {
    if (langButton) {
      const langText = langButton.querySelector('.language-text');
      if (langText) {
        langText.textContent = currentLocale === 'pt-BR' ? 'PT-BR' : 'EN';
      }
    }
  });
}

// Function to toggle language
function toggleLanguage() {
  const newLocale = currentLocale === 'pt-BR' ? 'en' : 'pt-BR';
  currentLocale = newLocale;
  localStorage.setItem('locale', newLocale);
  translatePage();
}

// Initialize i18n when DOM is ready
async function initI18n() {
  const loaded = await loadTranslations();

  if (loaded) {
    translatePage();

    // Add event listener to language toggle buttons (desktop and mobile)
    const langButtons = [
      document.getElementById('language-toggle'),
      document.getElementById('language-toggle-mobile')
    ];

    langButtons.forEach(langButton => {
      if (langButton) {
        langButton.addEventListener('click', toggleLanguage);
      }
    });
  }
}

// Auto-initialize when script loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initI18n);
} else {
  initI18n();
}

// Export for use in other scripts
export { translatePage, toggleLanguage };
