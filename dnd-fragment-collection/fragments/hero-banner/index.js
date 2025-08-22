// Hero Banner Interactive Features
(function() {
  'use strict';

  // Parallax effect for hero background
  function initParallax() {
    const heroSection = document.querySelector('.hero-banner');
    const heroBackground = heroSection?.querySelector('.hero-background img');
    
    if (!heroBackground) return;

    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      heroBackground.style.transform = `translate3d(0, ${rate}px, 0)`;
    });
  }

  // Magical sparkle effect
  function createSparkles() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    function createSparkle() {
      const sparkle = document.createElement('div');
      sparkle.className = 'magical-sparkle';
      sparkle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: #D4AF37;
        border-radius: 50%;
        pointer-events: none;
        animation: sparkleAnimation 2s linear infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        box-shadow: 0 0 10px #D4AF37;
      `;
      
      heroContent.appendChild(sparkle);
      
      setTimeout(() => {
        sparkle.remove();
      }, 2000);
    }

    // Create sparkles periodically
    setInterval(createSparkle, 800);
  }

  // Add sparkle animation CSS
  function addSparkleStyles() {
    if (document.querySelector('#sparkle-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'sparkle-styles';
    style.textContent = `
      @keyframes sparkleAnimation {
        0% {
          opacity: 0;
          transform: scale(0) rotate(0deg);
        }
        50% {
          opacity: 1;
          transform: scale(1) rotate(180deg);
        }
        100% {
          opacity: 0;
          transform: scale(0) rotate(360deg);
        }
      }
      
      .hero-content {
        position: relative;
        overflow: visible;
      }
    `;
    document.head.appendChild(style);
  }

  // Button hover effects
  function enhanceButtons() {
    const buttons = document.querySelectorAll('.fantasy-btn');
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', function() {
        this.style.animation = 'buttonGlow 0.3s ease-in-out';
      });
      
      button.addEventListener('mouseleave', function() {
        this.style.animation = '';
      });
    });

    // Add button glow animation CSS
    if (!document.querySelector('#button-styles')) {
      const style = document.createElement('style');
      style.id = 'button-styles';
      style.textContent = `
        @keyframes buttonGlow {
          0% { box-shadow: 0 0 5px rgba(212, 175, 55, 0.3); }
          50% { box-shadow: 0 0 25px rgba(212, 175, 55, 0.6); }
          100% { box-shadow: 0 0 15px rgba(212, 175, 55, 0.4); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Initialize all effects when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      addSparkleStyles();
      initParallax();
      createSparkles();
      enhanceButtons();
    });
  } else {
    addSparkleStyles();
    initParallax();
    createSparkles();
    enhanceButtons();
  }
})();