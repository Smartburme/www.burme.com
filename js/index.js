// Enhanced router with loading states and transitions
const routes = {
  home: { 
    url: "pages/home.html", 
    title: "Home - Burme Chat",
    description: "Welcome to Burme Chat - Connect with friends and join groups"
  },
  friends: { 
    url: "pages/friends.html", 
    title: "Friends - Burme Chat",
    description: "Manage your friends and conversations"
  },
  group: { 
    url: "pages/group.html", 
    title: "Groups - Burme Chat",
    description: "Join and participate in group conversations"
  },
  setting: { 
    url: "pages/setting.html", 
    title: "Settings - Burme Chat",
    description: "Customize your Burme Chat experience"
  },
  'new-chat': {
    url: "pages/post.html",
    title: "New Chat - Burme Chat",
    description: "Start a new conversation"
  }
};

// DOM elements
const appView = document.getElementById('app-view');
const navButtons = document.querySelectorAll('.nav-btn');

// Set active navigation button
function setActiveNav(route) {
  navButtons.forEach(btn => {
    if (btn.dataset.route === route) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Update page metadata
function updatePageMetadata(routeInfo) {
  document.title = routeInfo.title;
  
  // Update or create meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    document.head.appendChild(metaDescription);
  }
  metaDescription.content = routeInfo.description;
}

// Show loading state
function showLoading() {
  appView.classList.add('loading');
  appView.innerHTML = `
    <div class="loader">
      <div class="loader-dot"></div>
      <div class="loader-dot"></div>
      <div class="loader-dot"></div>
    </div>
  `;
}

// Load route content
async function load(route) {
  const routeInfo = routes[route] || routes.home;
  
  // Update active nav
  setActiveNav(route);
  
  // Update page metadata
  updatePageMetadata(routeInfo);
  
  // Show loading state
  showLoading();
  
  try {
    // Simulate network delay for demo purposes
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const res = await fetch(routeInfo.url);
    
    if (!res.ok) {
      throw new Error(`Failed to load ${routeInfo.url}: ${res.status} ${res.statusText}`);
    }
    
    const html = await res.text();
    appView.innerHTML = html;
    appView.classList.remove('loading');
    
    // Update URL hash
    window.location.hash = route;
    
    // Load appropriate CSS
    loadCSS(route);
    
    // Load appropriate JS
    loadJS(route);
    
  } catch (error) {
    console.error('Error loading route:', error);
    appView.innerHTML = `
      <div class="page-placeholder">
        <i class="fas fa-exclamation-triangle"></i>
        <h2>Loading Error</h2>
        <p>Sorry, we couldn't load the requested page. Please check your connection and try again.</p>
        <button class="btn primary" style="margin-top: 15px;" onclick="load('${route}')">Retry</button>
      </div>
    `;
    appView.classList.remove('loading');
  }
}

// Load CSS for the route
function loadCSS(route) {
  // Remove any previously added style sheets
  const existingStyle = document.getElementById(`style-${route}`);
  if (existingStyle) {
    existingStyle.remove();
  }
  
  // Add new style sheet
  const link = document.createElement('link');
  link.id = `style-${route}`;
  link.rel = 'stylesheet';
  link.href = `css/${route}.css`;
  document.head.appendChild(link);
}

// Load JS for the route
function loadJS(route) {
  // Remove any previously added scripts
  const existingScript = document.getElementById(`script-${route}`);
  if (existingScript) {
    existingScript.remove();
  }
  
  // Add new script
  const script = document.createElement('script');
  script.id = `script-${route}`;
  script.src = `js/${route}.js`;
  document.body.appendChild(script);
}

// Add click event listeners to navigation buttons
function setupNavigation() {
  // Bottom nav buttons
  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      load(button.dataset.route);
    });
  });
  
  // Floating action button
  document.querySelector('.float3d').addEventListener('click', () => {
    load('new-chat');
  });
}

// Handle hash change
window.addEventListener('hashchange', () => {
  const route = window.location.hash.replace('#', '');
  if (routes[route]) {
    load(route);
  }
});

// Initialize the application
function init() {
  setupNavigation();
  
  // Load initial route
  const initialRoute = window.location.hash.replace('#', '') || 'home';
  load(initialRoute);
}

// Start the app when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}