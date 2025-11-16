/**
 * Character Header Fragment - Interactive Features
 * D&D-themed character display with level progression and visual effects
 */

(function() {

let cleanupFunctions = [];

// Find the actual character header element
const characterHeader = document.querySelector('.character-header');
if (!characterHeader) {
    console.warn('Character header element not found');
    return;
}

// Apply configuration options (configuration would come from Liferay if needed)
const configuration = {};
applyConfiguration(characterHeader, configuration);

// Load character image based on attributes
addCharacterImage(characterHeader);

// Initialize interactive features
const cleanup1 = setupProgressAnimation(characterHeader);
const cleanup2 = setupPortraitEffects(characterHeader);
const cleanup3 = setupButtonInteractions(characterHeader);
const cleanup4 = setupLevelIndicatorEffects(characterHeader);
const cleanup5 = setupResponsiveHandling(characterHeader);

cleanupFunctions.push(cleanup1, cleanup2, cleanup3, cleanup4, cleanup5);

/**
 * Load character image based on sex, race, and class attributes
 */
function addCharacterImage(header) {
    const characterDef = header.querySelector('.character-subtitle');
    if (!characterDef) return;
    
    const sexElement = characterDef.querySelector('.character-class.sex');
    const raceElement = characterDef.querySelector('.character-class.race');
    const classElement = characterDef.querySelector('.character-class.class');
    
    if (!sexElement || !raceElement || !classElement) return;
    
    let sex = sexElement.textContent.trim().toLowerCase();
    let race = raceElement.textContent.trim().toLowerCase();
    let playerclass = classElement.textContent.trim().toLowerCase();
    
    // Map class aliases
    if (playerclass == 'mage') playerclass = 'wizard';
    if (playerclass == 'sorcerer') playerclass = 'wizard';
    if (playerclass == 'warrior') playerclass = 'fighter';
    if (playerclass == 'thief') playerclass = 'rouge';
    
    // Map race aliases
    if (race == 'half-elf') race = 'elf';
    if (race == "high elf"){ race = "elf" }
    
    const imageName = race + '-' + playerclass + '-' + sex;
    console.log('Loading character image:', imageName);
    
    const characterImg = header.querySelector('.portrait-frame img');
    if (characterImg) {
        characterImg.src = '/documents/d/global/' + imageName + '?download=true';
    }
}

function applyConfiguration(headerElement, config) {
    // Show/hide level progress
    if (config.showLevelProgress === false) {
        const progressSection = headerElement.querySelector('.level-progress-section');
        if (progressSection) progressSection.style.display = 'none';
    }
    
    // Show/hide action buttons
    if (config.showDetailButtons === false) {
        const actionButtons = headerElement.querySelector('.action-buttons');
        if (actionButtons) actionButtons.style.display = 'none';
    }
    
    // Show/hide character story
    if (config.showCharacterStory === false) {
        const characterStory = headerElement.querySelector('.character-story');
        if (characterStory) characterStory.style.display = 'none';
    }
    
    // Apply compact mode to the character header element
    if (config.compactMode === true) {
        headerElement.classList.add('compact-mode');
    }
    
    // Apply theme to the character header element
    if (config.headerTheme && config.headerTheme !== 'classic') {
        headerElement.classList.add(`theme-${config.headerTheme}`);
    }
}

/**
 * Animate the experience progress bar on page load
 */
function setupProgressAnimation(header) {
    const progressBar = header.querySelector('.progress-fill');
    if (!progressBar) return () => {};
    
    // Store the target width from inline style
    const targetWidth = progressBar.style.width || '0%';
    
    // Start from 0 and animate to target
    progressBar.style.width = '0%';
    
    const animationTimeout = setTimeout(() => {
        progressBar.style.width = targetWidth;
    }, 500);
    
    // Add click handler to show XP details
    const progressSection = header.querySelector('.level-progress-section');
    const clickHandler = function() {
        showXPDetails(header);
    };
    
    if (progressSection) {
        progressSection.addEventListener('click', clickHandler);
        progressSection.style.cursor = 'pointer';
        progressSection.title = 'Click to view experience details';
    }
    
    // Return cleanup function
    return function cleanup() {
        clearTimeout(animationTimeout);
        if (progressSection) {
            progressSection.removeEventListener('click', clickHandler);
        }
    };
}

/**
 * Add hover effects and click interactions for the portrait
 */
function setupPortraitEffects(header) {
    const portraitFrame = header.querySelector('.portrait-frame');
    if (!portraitFrame) return () => {};
    
    const mouseEnterHandler = function() {
        this.style.boxShadow = `
            0 0 30px rgba(212, 175, 55, 0.6),
            inset 0 2px 4px rgba(0, 0, 0, 0.3)
        `;
    };
    
    const mouseLeaveHandler = function() {
        this.style.boxShadow = `
            0 0 20px rgba(212, 175, 55, 0.4),
            inset 0 2px 4px rgba(0, 0, 0, 0.3)
        `;
    };
    
    const clickHandler = function() {
        enlargePortrait(header);
    };
    
    // Add hover glow effect
    portraitFrame.addEventListener('mouseenter', mouseEnterHandler);
    portraitFrame.addEventListener('mouseleave', mouseLeaveHandler);
    
    // Add click handler for portrait enlargement
    portraitFrame.addEventListener('click', clickHandler);
    
    portraitFrame.style.cursor = 'pointer';
    portraitFrame.title = 'Click to enlarge portrait';
    
    // Return cleanup function
    return function cleanup() {
        portraitFrame.removeEventListener('mouseenter', mouseEnterHandler);
        portraitFrame.removeEventListener('mouseleave', mouseLeaveHandler);
        portraitFrame.removeEventListener('click', clickHandler);
    };
}

/**
 * Setup button interactions with enhanced visual feedback
 */
function setupButtonInteractions(header) {
    const buttons = header.querySelectorAll('.fantasy-btn');
    const buttonHandlers = [];
    
    buttons.forEach(button => {
        const clickHandler = function(e) {
            // Create ripple effect
            createRippleEffect(this, e);
            
            // Add temporary glow
            this.style.boxShadow = '0 4px 20px rgba(255, 215, 0, 0.6)';
            const glowTimeout = setTimeout(() => {
                this.style.boxShadow = '';
            }, 200);
        };
        
        const mouseEnterHandler = function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        };
        
        const mouseLeaveHandler = function() {
            this.style.transform = 'translateY(0) scale(1)';
        };
        
        // Add sound effect simulation (visual feedback)
        button.addEventListener('click', clickHandler);
        
        // Enhanced hover effects
        button.addEventListener('mouseenter', mouseEnterHandler);
        button.addEventListener('mouseleave', mouseLeaveHandler);
        
        // Store handlers for cleanup
        buttonHandlers.push({
            element: button,
            handlers: { clickHandler, mouseEnterHandler, mouseLeaveHandler }
        });
    });
    
    // Return cleanup function
    return function cleanup() {
        buttonHandlers.forEach(({ element, handlers }) => {
            element.removeEventListener('click', handlers.clickHandler);
            element.removeEventListener('mouseenter', handlers.mouseEnterHandler);
            element.removeEventListener('mouseleave', handlers.mouseLeaveHandler);
        });
    };
}

/**
 * Add interactive effects to the level indicator
 */
function setupLevelIndicatorEffects(header) {
    const levelIndicator = header.querySelector('.level-indicator');
    if (!levelIndicator) return () => {};
    
    const mouseEnterHandler = function() {
        this.style.animation = 'levelPulse 1s ease-in-out infinite';
    };
    
    const mouseLeaveHandler = function() {
        this.style.animation = '';
    };
    
    const clickHandler = function() {
        showLevelDetails(header);
    };
    
    // Add pulse animation on hover
    levelIndicator.addEventListener('mouseenter', mouseEnterHandler);
    levelIndicator.addEventListener('mouseleave', mouseLeaveHandler);
    
    // Add click handler to show level progression details
    levelIndicator.addEventListener('click', clickHandler);
    
    levelIndicator.style.cursor = 'pointer';
    levelIndicator.title = 'Click to view level progression';
    
    // Add CSS animation dynamically
    if (!document.querySelector('#character-header-animations')) {
        const style = document.createElement('style');
        style.id = 'character-header-animations';
        style.textContent = `
            @keyframes levelPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 215, 0, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Return cleanup function
    return function cleanup() {
        levelIndicator.removeEventListener('mouseenter', mouseEnterHandler);
        levelIndicator.removeEventListener('mouseleave', mouseLeaveHandler);
        levelIndicator.removeEventListener('click', clickHandler);
    };
}

/**
 * Handle responsive behavior and mobile interactions
 */
function setupResponsiveHandling(header) {
    const touchHandlers = [];
    
    // Handle touch devices
    if ('ontouchstart' in window) {
        header.classList.add('touch-device');
        
        // Add touch feedback for mobile
        const touchElements = header.querySelectorAll(
            '.portrait-frame, .level-indicator, .level-progress-section'
        );
        
        touchElements.forEach(element => {
            const touchStartHandler = function() {
                this.style.opacity = '0.8';
            };
            
            const touchEndHandler = function() {
                this.style.opacity = '1';
            };
            
            element.addEventListener('touchstart', touchStartHandler);
            element.addEventListener('touchend', touchEndHandler);
            
            touchHandlers.push({
                element,
                touchStartHandler,
                touchEndHandler
            });
        });
    }
    
    // Handle window resize for responsive adjustments
    const resizeHandler = debounce(() => {
        adjustResponsiveLayout(header);
    }, 250);
    
    window.addEventListener('resize', resizeHandler);
    
    // Return cleanup function
    return function cleanup() {
        touchHandlers.forEach(({ element, touchStartHandler, touchEndHandler }) => {
            element.removeEventListener('touchstart', touchStartHandler);
            element.removeEventListener('touchend', touchEndHandler);
        });
        window.removeEventListener('resize', resizeHandler);
    };
}

/**
 * Show detailed XP breakdown in a tooltip or modal
 */
function showXPDetails(header) {
    const xpText = header.querySelector('.xp-values');
    if (!xpText) return;
    
    // Create tooltip with XP breakdown
    const tooltip = createTooltip(`
        <div class="xp-breakdown">
            <h4>Experience Breakdown</h4>
            <div class="xp-item">Current Level: 15</div>
            <div class="xp-item">Next Level: 16</div>
            <div class="xp-item">XP to Next: 15,000</div>
            <div class="xp-item">Total Sessions: 47</div>
        </div>
    `);
    
    showTooltip(tooltip, xpText);
}

/**
 * Show level progression details
 */
function showLevelDetails(header) {
    const levelValue = header.querySelector('.level-value');
    if (!levelValue) return;
    
    const tooltip = createTooltip(`
        <div class="level-breakdown">
            <h4>Level Progression</h4>
            <div class="level-item">Proficiency Bonus: +5</div>
            <div class="level-item">Hit Die: d10</div>
            <div class="level-item">Next Feature: 17th Level</div>
            <div class="level-item">Spell Slots: 4/3/3/3/2/1/1/1</div>
        </div>
    `);
    
    showTooltip(tooltip, levelValue);
}

/**
 * Enlarge character portrait in overlay
 */
function enlargePortrait(header) {
    const portraitImg = header.querySelector('.portrait-frame img');
    if (!portraitImg) return;
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'portrait-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: pointer;
    `;
    
    const enlargedImg = portraitImg.cloneNode(true);
    enlargedImg.style.cssText = `
        max-width: 80vw;
        max-height: 80vh;
        border: 4px solid #D4AF37;
        border-radius: 8px;
        box-shadow: 0 0 50px rgba(212, 175, 55, 0.8);
    `;
    
    overlay.appendChild(enlargedImg);
    document.body.appendChild(overlay);
    
    // Close on click
    overlay.addEventListener('click', function() {
        document.body.removeChild(overlay);
    });
    
    // Close on escape key
    const escapeHandler = function(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(overlay);
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

/**
 * Create ripple effect on button click
 */
function createRippleEffect(button, event) {
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        button.removeChild(ripple);
    }, 600);
}

/**
 * Create tooltip element
 */
function createTooltip(content) {
    const tooltip = document.createElement('div');
    tooltip.className = 'character-tooltip';
    tooltip.innerHTML = content;
    tooltip.style.cssText = `
        position: absolute;
        background: linear-gradient(135deg, #2a1f1a, #1a0f0a);
        border: 2px solid #D4AF37;
        border-radius: 8px;
        padding: 1rem;
        color: #DEB887;
        font-family: 'Crimson Text', serif;
        font-size: 0.9rem;
        z-index: 1000;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
        min-width: 200px;
        max-width: 300px;
    `;
    
    return tooltip;
}

/**
 * Show tooltip near target element
 */
function showTooltip(tooltip, target) {
    document.body.appendChild(tooltip);
    
    const targetRect = target.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    // Position tooltip
    let left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
    let top = targetRect.top - tooltipRect.height - 10;
    
    // Adjust if tooltip goes off screen
    if (left < 10) left = 10;
    if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10;
    }
    if (top < 10) {
        top = targetRect.bottom + 10;
    }
    
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
    
    // Auto-hide after 5 seconds or on click outside
    const hideTooltip = () => {
        if (document.body.contains(tooltip)) {
            document.body.removeChild(tooltip);
        }
    };
    
    setTimeout(hideTooltip, 5000);
    
    document.addEventListener('click', function clickHandler(e) {
        if (!tooltip.contains(e.target)) {
            hideTooltip();
            document.removeEventListener('click', clickHandler);
        }
    });
}

/**
 * Adjust layout for responsive behavior
 */
function adjustResponsiveLayout(header) {
    const width = window.innerWidth;
    
    if (width <= 768) {
        header.classList.add('mobile-layout');
    } else {
        header.classList.remove('mobile-layout');
    }
}

/**
 * Debounce utility function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

})(); // End of fragment wrapper function