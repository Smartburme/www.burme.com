document.addEventListener('DOMContentLoaded', function() {
  // Initialize settings page functionality
  loadUserSettings();
  setupSettingEventListeners();
});

function loadUserSettings() {
  // This would load user settings from Firebase or local storage
  console.log("Loading user settings...");
  
  // Simulate loading settings
  setTimeout(() => {
    // Set dark mode toggle based on user preference
    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    document.getElementById('dark-mode-toggle').checked = darkModeEnabled;
    
    // Set language selection based on user preference
    const userLanguage = localStorage.getItem('language') || 'my';
    document.getElementById('language-select').value = userLanguage;
    
    // Set age visibility based on user preference
    const ageVisible = localStorage.getItem('ageVisible') !== 'false'; // Default to true
    const toggleAgeBtn = document.getElementById('toggle-age');
    if (toggleAgeBtn) {
      toggleAgeBtn.textContent = ageVisible ? 'Hide' : 'Show';
      const ageDisplay = document.querySelector('.age-display .visibility');
      if (ageDisplay) {
        ageDisplay.textContent = ageVisible ? '(Visible to friends)' : '(Hidden)';
        ageDisplay.style.color = ageVisible ? 'var(--success)' : 'var(--gray)';
      }
    }
    
    console.log("User settings loaded");
  }, 500);
}

function setupSettingEventListeners() {
  // Dark mode toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('change', function() {
      toggleDarkMode(this.checked);
    });
  }
  
  // Language selection
  const languageSelect = document.getElementById('language-select');
  if (languageSelect) {
    languageSelect.addEventListener('change', function() {
      changeLanguage(this.value);
    });
  }
  
  // Age visibility toggle
  const toggleAgeBtn = document.getElementById('toggle-age');
  if (toggleAgeBtn) {
    toggleAgeBtn.addEventListener('click', function() {
      toggleAgeVisibility();
    });
  }
  
  // Logout button
  const logoutBtn = document.querySelector('.btn.warning');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      logout();
    });
  }
}

function toggleDarkMode(enabled) {
  console.log(`Dark mode ${enabled ? 'enabled' : 'disabled'}`);
  localStorage.setItem('darkMode', enabled);
  
  if (enabled) {
    document.documentElement.style.setProperty('--light', '#212529');
    document.documentElement.style.setProperty('--dark', '#f8f9fa');
    document.body.style.backgroundColor = '#121212';
    document.body.style.color = '#f8f9fa';
  } else {
    document.documentElement.style.setProperty('--light', '#f8f9fa');
    document.documentElement.style.setProperty('--dark', '#212529');
    document.body.style.backgroundColor = '#f5f5f5';
    document.body.style.color = '#212529';
  }
}

function changeLanguage(language) {
  console.log(`Language changed to: ${language}`);
  localStorage.setItem('language', language);
  
  // This would update the app's language
  alert(`Language changed to ${language}. App will refresh.`);
  // window.location.reload(); // In a real app, you would refresh to apply language changes
}

function toggleAgeVisibility() {
  const currentlyVisible = localStorage.getItem('ageVisible') !== 'false';
  const newVisibility = !currentlyVisible;
  
  localStorage.setItem('ageVisible', newVisibility);
  
  const toggleAgeBtn = document.getElementById('toggle-age');
  if (toggleAgeBtn) {
    toggleAgeBtn.textContent = newVisibility ? 'Hide' : 'Show';
    const ageDisplay = document.querySelector('.age-display .visibility');
    if (ageDisplay) {
      ageDisplay.textContent = newVisibility ? '(Visible to friends)' : '(Hidden)';
      ageDisplay.style.color = newVisibility ? 'var(--success)' : 'var(--gray)';
    }
  }
  
  console.log(`Age visibility ${newVisibility ? 'enabled' : 'disabled'}`);
}

function logout() {
  console.log("Logging out...");
  // This would handle the logout process
  alert("Logout functionality would go here");
}