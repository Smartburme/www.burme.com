// Animation utilities for the app
class Animations {
  static fadeIn(element, duration = 300) {
    element.style.opacity = 0;
    element.style.display = 'block';
    
    let start = null;
    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const opacity = Math.min(progress / duration, 1);
      element.style.opacity = opacity;
      
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    }
    
    window.requestAnimationFrame(step);
  }
  
  static fadeOut(element, duration = 300) {
    let start = null;
    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const opacity = Math.max(1 - progress / duration, 0);
      element.style.opacity = opacity;
      
      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        element.style.display = 'none';
      }
    }
    
    window.requestAnimationFrame(step);
  }
  
  static slideIn(element, duration = 300) {
    element.style.transform = 'translateY(100%)';
    element.style.display = 'block';
    
    let start = null;
    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const translateY = Math.max(100 - (progress / duration) * 100, 0);
      element.style.transform = `translateY(${translateY}%)`;
      
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    }
    
    window.requestAnimationFrame(step);
  }
  
  static slideOut(element, duration = 300) {
    let start = null;
    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const translateY = Math.min((progress / duration) * 100, 100);
      element.style.transform = `translateY(${translateY}%)`;
      
      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        element.style.display = 'none';
        element.style.transform = 'translateY(0)';
      }
    }
    
    window.requestAnimationFrame(step);
  }
  
  static bounce(element, intensity = 10) {
    element.style.transform = 'scale(1)';
    
    let scale = 1;
    let direction = -1;
    
    function step() {
      scale += 0.1 * direction;
      
      if (scale <= 0.9) direction = 1;
      if (scale >= 1) {
        element.style.transform = 'scale(1)';
        return;
      }
      
      element.style.transform = `scale(${scale})`;
      requestAnimationFrame(step);
    }
    
    requestAnimationFrame(step);
  }
}

// Add animation to navigation buttons
document.addEventListener('DOMContentLoaded', function() {
  const navButtons = document.querySelectorAll('.nav-btn');
  
  navButtons.forEach(button => {
    button.addEventListener('click', function() {
      Animations.bounce(this);
    });
  });
  
  // Add animation to floating action button
  const floatButton = document.querySelector('.float3d');
  if (floatButton) {
    floatButton.addEventListener('click', function() {
      Animations.bounce(this);
    });
  }
});