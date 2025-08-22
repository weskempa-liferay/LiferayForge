// Character Card Interactive Features
(function() {
  'use strict';

  // Animate stats on hover
  function initStatAnimations() {
    const characterCards = document.querySelectorAll('.character-card');
    
    characterCards.forEach(card => {
      const statValues = card.querySelectorAll('.stat-value');
      
      card.addEventListener('mouseenter', function() {
        statValues.forEach((stat, index) => {
          const currentValue = parseInt(stat.textContent) || 0;
          const targetValue = currentValue;
          let startValue = Math.max(0, targetValue - 20);
          
          // Animate number counting up
          const duration = 500;
          const startTime = Date.now();
          
          function updateValue() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);
            
            const currentAnimValue = Math.round(startValue + (targetValue - startValue) * easedProgress);
            stat.textContent = currentAnimValue;
            
            if (progress < 1) {
              requestAnimationFrame(updateValue);
            } else {
              stat.textContent = targetValue;
            }
          }
          
          setTimeout(() => updateValue(), index * 100);
        });
      });
      
      card.addEventListener('mouseleave', function() {
        // Reset to original values (they should already be correct)
        statValues.forEach(stat => {
          // Values are maintained by the animation end state
        });
      });
    });
  }

  // Easing function for smooth animation
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  // Add floating particles effect
  function initParticleEffect() {
    const characterCards = document.querySelectorAll('.character-card');
    
    characterCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        createParticles(this);
      });
    });
  }

  function createParticles(card) {
    const particleCount = 5;
    
    for (let i = 0; i < particleCount; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        particle.className = 'card-particle';
        particle.style.cssText = `
          position: absolute;
          width: 4px;
          height: 4px;
          background: #D4AF37;
          border-radius: 50%;
          pointer-events: none;
          z-index: 10;
          box-shadow: 0 0 6px #D4AF37;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation: floatParticle 2s ease-out forwards;
        `;
        
        card.appendChild(particle);
        
        setTimeout(() => {
          particle.remove();
        }, 2000);
      }, i * 200);
    }
  }

  // Portrait glow effect
  function initPortraitGlow() {
    const portraits = document.querySelectorAll('.character-portrait');
    
    portraits.forEach(portrait => {
      const img = portrait.querySelector('img');
      
      portrait.addEventListener('mouseenter', function() {
        img.style.boxShadow = '0 0 25px rgba(212, 175, 55, 0.8)';
        img.style.transform = 'scale(1.05)';
      });
      
      portrait.addEventListener('mouseleave', function() {
        img.style.boxShadow = '';
        img.style.transform = 'scale(1)';
      });
    });
  }

  // Add required CSS animations
  function addAnimationStyles() {
    if (document.querySelector('#character-card-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'character-card-styles';
    style.textContent = `
      @keyframes floatParticle {
        0% {
          opacity: 0;
          transform: translateY(0) scale(0);
        }
        20% {
          opacity: 1;
          transform: translateY(-10px) scale(1);
        }
        80% {
          opacity: 1;
          transform: translateY(-40px) scale(1);
        }
        100% {
          opacity: 0;
          transform: translateY(-60px) scale(0);
        }
      }
      
      .character-portrait img {
        transition: all 0.3s ease;
      }
      
      .stat-value {
        transition: color 0.3s ease;
      }
      
      .character-card:hover .stat-value {
        color: #FFD700;
      }
      
      .ability {
        transition: all 0.3s ease;
      }
      
      .character-card:hover .ability {
        color: #D4AF37;
        padding-left: 1rem;
      }
      
      .character-card {
        position: relative;
        overflow: visible;
      }
    `;
    document.head.appendChild(style);
  }

  // Ability hover effects
  function initAbilityEffects() {
    const abilities = document.querySelectorAll('.ability');
    
    abilities.forEach((ability, index) => {
      ability.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(212, 175, 55, 0.1)';
        this.style.borderRadius = '4px';
        this.style.padding = '0.5rem 1rem';
        this.style.margin = '0.25rem -1rem';
      });
      
      ability.addEventListener('mouseleave', function() {
        this.style.background = '';
        this.style.borderRadius = '';
        this.style.padding = '0.5rem 0';
        this.style.margin = '';
      });
    });
  }

  // Initialize all effects
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      addAnimationStyles();
      initStatAnimations();
      initParticleEffect();
      initPortraitGlow();
      initAbilityEffects();
    });
  } else {
    addAnimationStyles();
    initStatAnimations();
    initParticleEffect();
    initPortraitGlow();
    initAbilityEffects();
  }
})();