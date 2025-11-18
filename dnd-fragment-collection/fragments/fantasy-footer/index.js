
// Initialize footer functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeFooter();
});

function initializeFooter() {
  const footer = document.querySelector('.fantasy-footer');
  if (!footer) return;

  // Add scroll-to-top functionality
  addScrollToTop();
  
  // Enhance social link interactions
  enhanceSocialLinks();
  
  // Add hover effects for links
  enhanceFooterLinks();
  
  // Initialize any dynamic content
  initializeDynamicContent();
}

function addScrollToTop() {
  const guild = document.querySelector('.fantasy-footer .guild-emblem');
  if (!guild) return;

  guild.style.cursor = 'pointer';
  guild.title = 'Return to the top of the realm';
  
  guild.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Add a magical effect
    this.style.transform = 'scale(1.1) rotate(360deg)';
    setTimeout(() => {
      this.style.transform = '';
    }, 600);
  });
}

function enhanceSocialLinks() {
  const socialLinks = document.querySelectorAll('.fantasy-footer .social-link');
  
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      // Add magical glow effect
      this.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.6), 0 6px 20px rgba(212, 175, 55, 0.3)';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.boxShadow = '';
    });
    
    // Add click analytics or special effects
    link.addEventListener('click', function(e) {
      const platform = this.getAttribute('title');
      if (platform) {
        console.log(`Guild member joining via ${platform}`);
      }
      
      // Add sparkle effect on click
      createSparkleEffect(this);
    });
  });
}

function enhanceFooterLinks() {
  const footerLinks = document.querySelectorAll('.fantasy-footer .footer-link');
  
  footerLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      // Add subtle icon animation
      const icon = this.querySelector('i');
      if (icon) {
        icon.style.transform = 'scale(1.1)';
        icon.style.transition = 'transform 0.3s ease';
      }
    });
    
    link.addEventListener('mouseleave', function() {
      const icon = this.querySelector('i');
      if (icon) {
        icon.style.transform = '';
      }
    });
  });
}

function initializeDynamicContent() {
  // Update copyright year automatically
  const copyrightYear = document.querySelector('.fantasy-footer .copyright');
  if (copyrightYear) {
    const currentYear = new Date().getFullYear();
    copyrightYear.innerHTML = copyrightYear.innerHTML.replace('[#copyright_year]', currentYear);
  }
  
  // Add dynamic realm time if desired
  updateRealmTime();
}

function updateRealmTime() {
  const realmInfo = document.querySelector('.fantasy-footer .realm-info');
  if (!realmInfo) return;

  // Add a subtle timestamp for the realm
  const now = new Date();
  const hours = now.getHours();
  let timeOfDay = '';
  
  if (hours >= 5 && hours < 12) {
    timeOfDay = 'Dawn';
  } else if (hours >= 12 && hours < 17) {
    timeOfDay = 'Midday';
  } else if (hours >= 17 && hours < 21) {
    timeOfDay = 'Dusk';
  } else {
    timeOfDay = 'Night';
  }
  
  // Optionally add realm time to footer
  const timeElement = document.createElement('div');
  timeElement.className = 'realm-time';
  timeElement.style.cssText = 'font-size: 0.8rem; color: #6B5B47; margin-top: 0.5rem; font-style: italic;';
  timeElement.textContent = `Current realm time: ${timeOfDay}`;
  
  // Uncomment to add realm time
  // realmInfo.parentNode.appendChild(timeElement);
}

function createSparkleEffect(element) {
  const sparkle = document.createElement('div');
  sparkle.innerHTML = '✨';
  sparkle.style.cssText = `
    position: absolute;
    pointer-events: none;
    font-size: 12px;
    color: #D4AF37;
    z-index: 1000;
    animation: sparkle 1s ease-out forwards;
  `;
  
  // Add sparkle animation CSS if not already added
  if (!document.getElementById('sparkle-animation')) {
    const style = document.createElement('style');
    style.id = 'sparkle-animation';
    style.textContent = `
      @keyframes sparkle {
        0% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        100% {
          opacity: 0;
          transform: translateY(-20px) scale(1.5);
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  const rect = element.getBoundingClientRect();
  sparkle.style.left = (rect.left + rect.width / 2) + 'px';
  sparkle.style.top = rect.top + 'px';
  
  document.body.appendChild(sparkle);
  
  setTimeout(() => {
    if (sparkle.parentNode) {
      sparkle.parentNode.removeChild(sparkle);
    }
  }, 1000);
}

// Export for potential external use
window.FantasyFooter = {
  init: initializeFooter,
  addSparkle: createSparkleEffect
};
