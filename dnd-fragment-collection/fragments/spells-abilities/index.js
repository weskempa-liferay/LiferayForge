/**
 * Spells & Abilities Fragment - Interactive Features
 * D&D-themed spell management with slot tracking, spell casting, and class features
 */

export default function ({ fragmentElement, configuration }) {
    'use strict';
    
    const spellsContainer = fragmentElement.querySelector('.spells-abilities');
    if (!spellsContainer) return () => {};
    
    // Initialize all interactive features
    const cleanupFunctions = [];
    
    initializeSpellSlots();
    initializeSpellCards();
    initializeClassFeatures();
    initializeRestTracking();
    initializeActionButtons();
    applyConfiguration();
    
    // Return cleanup function
    return () => {
        cleanupFunctions.forEach(cleanup => cleanup());
    };
    
    /**
     * Setup spell slot interactions
     */
    function initializeSpellSlots() {
        const spellSlots = spellsContainer.querySelectorAll('.slot');
        
        spellSlots.forEach(slot => {
            const clickHandler = function() {
                toggleSpellSlot(this);
            };
            
            const hoverHandler = function() {
                this.style.transform = 'scale(1.1)';
                this.style.boxShadow = '0 0 15px rgba(135, 206, 235, 0.7)';
            };
            
            const leaveHandler = function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            };
            
            slot.addEventListener('click', clickHandler);
            slot.addEventListener('mouseenter', hoverHandler);
            slot.addEventListener('mouseleave', leaveHandler);
            
            cleanupFunctions.push(() => {
                slot.removeEventListener('click', clickHandler);
                slot.removeEventListener('mouseenter', hoverHandler);
                slot.removeEventListener('mouseleave', leaveHandler);
            });
        });
    }
    
    /**
     * Setup spell card interactions
     */
    function initializeSpellCards() {
        const spellCards = spellsContainer.querySelectorAll('.spell-card');
        const spellCastBtns = spellsContainer.querySelectorAll('.spell-cast-btn');
        
        // Spell card hover effects
        spellCards.forEach(card => {
            const hoverHandler = function() {
                showSpellTooltip(this);
            };
            
            const leaveHandler = function() {
                hideTooltips();
            };
            
            const clickHandler = function() {
                showSpellDetails(this);
            };
            
            card.addEventListener('mouseenter', hoverHandler);
            card.addEventListener('mouseleave', leaveHandler);
            card.addEventListener('click', clickHandler);
            
            cleanupFunctions.push(() => {
                card.removeEventListener('mouseenter', hoverHandler);
                card.removeEventListener('mouseleave', leaveHandler);
                card.removeEventListener('click', clickHandler);
            });
        });
        
        // Spell cast button interactions
        spellCastBtns.forEach(btn => {
            const clickHandler = function(e) {
                e.stopPropagation();
                castSpell(this);
            };
            
            btn.addEventListener('click', clickHandler);
            
            cleanupFunctions.push(() => {
                btn.removeEventListener('click', clickHandler);
            });
        });
    }
    
    /**
     * Setup class feature interactions
     */
    function initializeClassFeatures() {
        const featureCards = spellsContainer.querySelectorAll('.feature-card');
        const featureUseBtns = spellsContainer.querySelectorAll('.feature-use-btn');
        
        // Feature card hover effects
        featureCards.forEach(card => {
            const hoverHandler = function() {
                showFeatureTooltip(this);
            };
            
            const leaveHandler = function() {
                hideTooltips();
            };
            
            card.addEventListener('mouseenter', hoverHandler);
            card.addEventListener('mouseleave', leaveHandler);
            
            cleanupFunctions.push(() => {
                card.removeEventListener('mouseenter', hoverHandler);
                card.removeEventListener('mouseleave', leaveHandler);
            });
        });
        
        // Feature use button interactions
        featureUseBtns.forEach(btn => {
            const clickHandler = function(e) {
                e.stopPropagation();
                useFeature(this);
            };
            
            btn.addEventListener('click', clickHandler);
            
            cleanupFunctions.push(() => {
                btn.removeEventListener('click', clickHandler);
            });
        });
    }
    
    /**
     * Setup rest tracking interactions
     */
    function initializeRestTracking() {
        const shortRestBtn = spellsContainer.querySelector('.short-rest-btn');
        const longRestBtn = spellsContainer.querySelector('.long-rest-btn');
        
        if (shortRestBtn) {
            const shortRestHandler = function(e) {
                e.preventDefault();
                takeShortRest();
            };
            
            shortRestBtn.addEventListener('click', shortRestHandler);
            
            cleanupFunctions.push(() => {
                shortRestBtn.removeEventListener('click', shortRestHandler);
            });
        }
        
        if (longRestBtn) {
            const longRestHandler = function(e) {
                e.preventDefault();
                takeLongRest();
            };
            
            longRestBtn.addEventListener('click', longRestHandler);
            
            cleanupFunctions.push(() => {
                longRestBtn.removeEventListener('click', longRestHandler);
            });
        }
    }
    
    /**
     * Setup action button interactions
     */
    function initializeActionButtons() {
        const manageSpellsBtn = spellsContainer.querySelector('.manage-spells');
        const spellTrackerBtn = spellsContainer.querySelector('.spell-tracker');
        
        if (manageSpellsBtn) {
            const manageHandler = function(e) {
                e.preventDefault();
                showSpellManager();
            };
            
            manageSpellsBtn.addEventListener('click', manageHandler);
            
            cleanupFunctions.push(() => {
                manageSpellsBtn.removeEventListener('click', manageHandler);
            });
        }
        
        if (spellTrackerBtn) {
            const trackerHandler = function(e) {
                e.preventDefault();
                showSpellTracker();
            };
            
            spellTrackerBtn.addEventListener('click', trackerHandler);
            
            cleanupFunctions.push(() => {
                spellTrackerBtn.removeEventListener('click', trackerHandler);
            });
        }
    }
    
    /**
     * Toggle spell slot availability
     */
    function toggleSpellSlot(slot) {
        const isAvailable = slot.classList.contains('available');
        
        if (isAvailable) {
            slot.classList.remove('available');
            slot.classList.add('used');
            slot.style.animation = 'slotUse 0.6s ease-in-out';
            showNotification('Spell slot expended', 'warning');
        } else {
            slot.classList.remove('used');
            slot.classList.add('available');
            slot.style.animation = 'restComplete 1s ease-in-out';
            showNotification('Spell slot recovered', 'success');
        }
        
        setTimeout(() => {
            slot.style.animation = '';
        }, 1000);
        
        updateSpellSlotCounts();
    }
    
    /**
     * Cast a spell with visual feedback
     */
    function castSpell(castBtn) {
        const spellCard = castBtn.closest('.spell-card');
        const spellName = spellCard.querySelector('.spell-name').textContent;
        const spellLevel = getSpellLevel(spellCard);
        
        // Check if spell slot is available (for leveled spells)
        if (spellLevel > 0) {
            const hasAvailableSlot = checkSpellSlotAvailability(spellLevel);
            if (!hasAvailableSlot) {
                showNotification(`No ${getSpellLevelName(spellLevel)} spell slots available`, 'error');
                return;
            }
        }
        
        // Animate spell casting
        castBtn.style.animation = 'spellCast 0.8s ease-in-out';
        spellCard.classList.add('spell-casting');
        
        // Show spell casting result
        setTimeout(() => {
            showSpellCastResult(spellName, spellLevel);
            
            // Consume spell slot if not a cantrip
            if (spellLevel > 0) {
                consumeSpellSlot(spellLevel);
            }
            
            castBtn.style.animation = '';
            spellCard.classList.remove('spell-casting');
        }, 800);
    }
    
    /**
     * Use a class feature
     */
    function useFeature(useBtn) {
        const featureCard = useBtn.closest('.feature-card');
        const featureName = featureCard.querySelector('.feature-name').textContent;
        const isLimitedUse = featureCard.classList.contains('limited-use');
        
        if (isLimitedUse) {
            const usesElement = featureCard.querySelector('.uses-current');
            const maxElement = featureCard.querySelector('.uses-max');
            
            if (usesElement && maxElement) {
                const currentUses = parseInt(usesElement.textContent) || 0;
                const maxUses = parseInt(maxElement.textContent) || 1;
                
                if (currentUses >= maxUses) {
                    showNotification(`${featureName} has no remaining uses`, 'error');
                    return;
                }
                
                // Increment usage
                usesElement.textContent = currentUses + 1;
            }
        }
        
        // Animate feature activation
        useBtn.style.animation = 'featureActivate 0.5s ease-in-out';
        featureCard.classList.add('feature-activating');
        
        setTimeout(() => {
            showFeatureActivationResult(featureName);
            useBtn.style.animation = '';
            featureCard.classList.remove('feature-activating');
        }, 500);
    }
    
    /**
     * Take a short rest
     */
    function takeShortRest() {
        const overlay = createOverlay();
        const modal = document.createElement('div');
        modal.className = 'rest-modal';
        modal.innerHTML = `
            <div class="rest-content">
                <h3>Short Rest</h3>
                <div class="rest-info">
                    <p>Taking a 1-hour short rest allows you to:</p>
                    <ul>
                        <li>Spend hit dice to recover hit points</li>
                        <li>Recover certain class features</li>
                        <li>Use Arcane Recovery (if available)</li>
                    </ul>
                </div>
                <div class="rest-actions">
                    <button class="fantasy-btn btn-primary confirm-rest">Confirm Rest</button>
                    <button class="fantasy-btn btn-secondary close-modal">Cancel</button>
                </div>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        setupModalHandlers(overlay);
        
        const confirmBtn = modal.querySelector('.confirm-rest');
        confirmBtn.addEventListener('click', function() {
            performShortRest();
            document.body.removeChild(overlay);
        });
    }
    
    /**
     * Take a long rest
     */
    function takeLongRest() {
        const overlay = createOverlay();
        const modal = document.createElement('div');
        modal.className = 'rest-modal';
        modal.innerHTML = `
            <div class="rest-content">
                <h3>Long Rest</h3>
                <div class="rest-info">
                    <p>Taking an 8-hour long rest allows you to:</p>
                    <ul>
                        <li>Restore all spell slots</li>
                        <li>Recover all hit points</li>
                        <li>Reset all class features</li>
                        <li>Prepare new spells</li>
                    </ul>
                </div>
                <div class="rest-actions">
                    <button class="fantasy-btn btn-primary confirm-rest">Confirm Rest</button>
                    <button class="fantasy-btn btn-secondary close-modal">Cancel</button>
                </div>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        setupModalHandlers(overlay);
        
        const confirmBtn = modal.querySelector('.confirm-rest');
        confirmBtn.addEventListener('click', function() {
            performLongRest();
            document.body.removeChild(overlay);
        });
    }
    
    /**
     * Show spell manager interface
     */
    function showSpellManager() {
        const overlay = createOverlay();
        const modal = document.createElement('div');
        modal.className = 'spell-manager-modal';
        modal.innerHTML = `
            <div class="spell-manager-content">
                <h3>Spell Management</h3>
                <div class="spell-tabs">
                    <button class="tab-btn active" data-tab="prepare">Prepare Spells</button>
                    <button class="tab-btn" data-tab="learn">Learn New Spells</button>
                    <button class="tab-btn" data-tab="notes">Spell Notes</button>
                </div>
                <div class="spell-manager-body">
                    <div class="tab-content active" data-tab="prepare">
                        <div class="prepare-content">
                            <p>Manage your prepared spells for the day.</p>
                            <div class="prepared-count">
                                <span>Prepared: 6 / 8</span>
                            </div>
                            <div class="spell-preparation-list">
                                <div class="prep-spell-item">
                                    <span>Shield</span>
                                    <button class="unprepare-btn">Remove</button>
                                </div>
                                <div class="prep-spell-item">
                                    <span>Magic Missile</span>
                                    <button class="unprepare-btn">Remove</button>
                                </div>
                                <div class="prep-spell-item">
                                    <span>Fireball</span>
                                    <button class="unprepare-btn">Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-content" data-tab="learn">
                        <div class="learn-content">
                            <p>Add new spells to your spellbook.</p>
                            <div class="available-spells">
                                <div class="available-spell-item">
                                    <span>Counterspell</span>
                                    <button class="learn-btn">Learn</button>
                                </div>
                                <div class="available-spell-item">
                                    <span>Haste</span>
                                    <button class="learn-btn">Learn</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-content" data-tab="notes">
                        <div class="notes-content">
                            <p>Keep notes about your spells and their effects.</p>
                            <textarea class="spell-notes" placeholder="Enter your spell notes here..."></textarea>
                        </div>
                    </div>
                </div>
                <div class="spell-manager-actions">
                    <button class="fantasy-btn btn-primary save-changes">Save Changes</button>
                    <button class="fantasy-btn btn-secondary close-modal">Close</button>
                </div>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        setupModalHandlers(overlay);
        setupSpellManagerHandlers(modal);
    }
    
    /**
     * Show spell tracker interface
     */
    function showSpellTracker() {
        const overlay = createOverlay();
        const modal = document.createElement('div');
        modal.className = 'spell-tracker-modal';
        modal.innerHTML = `
            <div class="spell-tracker-content">
                <h3>Spell Usage Tracker</h3>
                <div class="tracker-info">
                    <div class="tracker-stats">
                        <div class="stat-item">
                            <span class="stat-label">Spells Cast Today:</span>
                            <span class="stat-value">8</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Slots Remaining:</span>
                            <span class="stat-value">6</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Most Used Spell:</span>
                            <span class="stat-value">Fire Bolt</span>
                        </div>
                    </div>
                    <div class="usage-history">
                        <h4>Recent Spell Usage</h4>
                        <div class="usage-list">
                            <div class="usage-item">
                                <span class="usage-spell">Fireball</span>
                                <span class="usage-time">2 minutes ago</span>
                            </div>
                            <div class="usage-item">
                                <span class="usage-spell">Shield</span>
                                <span class="usage-time">5 minutes ago</span>
                            </div>
                            <div class="usage-item">
                                <span class="usage-spell">Fire Bolt</span>
                                <span class="usage-time">7 minutes ago</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tracker-actions">
                    <button class="fantasy-btn btn-secondary reset-tracker">Reset Tracker</button>
                    <button class="fantasy-btn btn-primary close-modal">Close</button>
                </div>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        setupModalHandlers(overlay);
    }
    
    /**
     * Show spell details modal
     */
    function showSpellDetails(spellCard) {
        const spellName = spellCard.querySelector('.spell-name').textContent;
        const spellSchool = spellCard.querySelector('.spell-school').textContent;
        const castingTime = spellCard.querySelector('.spell-casting-time').textContent;
        const spellLevel = getSpellLevel(spellCard);
        
        const overlay = createOverlay();
        const modal = document.createElement('div');
        modal.className = 'spell-details-modal';
        modal.innerHTML = `
            <div class="spell-details-content">
                <h3>${spellName}</h3>
                <div class="spell-header">
                    <span class="level-badge level-${spellLevel}">${getSpellLevelName(spellLevel)}</span>
                    <span class="school-badge">${spellSchool}</span>
                </div>
                <div class="spell-stats">
                    <div class="stat-row">
                        <span class="stat-label">Casting Time:</span>
                        <span class="stat-value">${castingTime}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Range:</span>
                        <span class="stat-value">${getSpellRange(spellName)}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Duration:</span>
                        <span class="stat-value">${getSpellDuration(spellName)}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Components:</span>
                        <span class="stat-value">${getSpellComponents(spellName)}</span>
                    </div>
                </div>
                <div class="spell-description">
                    <h4>Description:</h4>
                    <p>${getSpellDescription(spellName)}</p>
                </div>
                <div class="spell-details-actions">
                    <button class="fantasy-btn btn-primary cast-spell-detail">Cast Spell</button>
                    <button class="fantasy-btn btn-secondary close-modal">Close</button>
                </div>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        setupModalHandlers(overlay);
        
        const castBtn = modal.querySelector('.cast-spell-detail');
        castBtn.addEventListener('click', function() {
            castSpellFromDetails(spellName, spellLevel);
            document.body.removeChild(overlay);
        });
    }
    
    /**
     * Apply configuration settings
     */
    function applyConfiguration() {
        if (!configuration) return;
        
        // Apply theme classes
        if (configuration.spellsTheme && configuration.spellsTheme !== 'classic') {
            spellsContainer.classList.add(`theme-${configuration.spellsTheme}`);
        }
        
        // Apply compact mode
        if (configuration.compactMode) {
            spellsContainer.classList.add('compact-mode');
        }
        
        // Hide/show sections based on configuration
        if (configuration.showSpellSlots === false) {
            const section = spellsContainer.querySelector('.spell-slots-section');
            if (section) section.style.display = 'none';
        }
        
        if (configuration.showSpellcastingInfo === false) {
            const section = spellsContainer.querySelector('.spellcasting-info-section');
            if (section) section.style.display = 'none';
        }
        
        if (configuration.showKnownSpells === false) {
            const section = spellsContainer.querySelector('.known-spells-section');
            if (section) section.style.display = 'none';
        }
        
        if (configuration.showClassFeatures === false) {
            const section = spellsContainer.querySelector('.class-features-section');
            if (section) section.style.display = 'none';
        }
        
        if (configuration.showRestTracking === false) {
            const section = spellsContainer.querySelector('.rest-tracking-section');
            if (section) section.style.display = 'none';
        }
    }
    
    /**
     * Utility functions
     */
    function createOverlay() {
        const overlay = document.createElement('div');
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
        return overlay;
    }
    
    function setupModalHandlers(overlay) {
        const closeBtn = overlay.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(overlay);
            });
        }
        
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
        
        // ESC key handler
        const escHandler = function(e) {
            if (e.key === 'Escape') {
                if (document.body.contains(overlay)) {
                    document.body.removeChild(overlay);
                }
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }
    
    function setupSpellManagerHandlers(modal) {
        const tabs = modal.querySelectorAll('.tab-btn');
        const contents = modal.querySelectorAll('.tab-content');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetTab = this.dataset.tab;
                
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                
                this.classList.add('active');
                modal.querySelector(`[data-tab="${targetTab}"].tab-content`).classList.add('active');
            });
        });
    }
    
    function showSpellTooltip(spellCard) {
        const spellName = spellCard.querySelector('.spell-name').textContent;
        const spellSchool = spellCard.querySelector('.spell-school').textContent;
        const castingTime = spellCard.querySelector('.spell-casting-time').textContent;
        
        const tooltip = createTooltip(`
            <div class="spell-tooltip">
                <h4>${spellName}</h4>
                <div class="tooltip-stat">School: ${spellSchool}</div>
                <div class="tooltip-stat">Casting Time: ${castingTime}</div>
                <div class="tooltip-hint">Click for detailed information</div>
            </div>
        `);
        
        showTooltip(tooltip, spellCard);
    }
    
    function showFeatureTooltip(featureCard) {
        const featureName = featureCard.querySelector('.feature-name').textContent;
        const featureDescription = featureCard.querySelector('.feature-description').textContent;
        
        const tooltip = createTooltip(`
            <div class="feature-tooltip">
                <h4>${featureName}</h4>
                <div class="tooltip-description">${featureDescription}</div>
                <div class="tooltip-hint">Click to use feature</div>
            </div>
        `);
        
        showTooltip(tooltip, featureCard);
    }
    
    function createTooltip(content) {
        const tooltip = document.createElement('div');
        tooltip.className = 'spells-tooltip';
        tooltip.innerHTML = content;
        tooltip.style.cssText = `
            position: absolute;
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            border: 2px solid #87CEEB;
            border-radius: 8px;
            padding: 1rem;
            color: #B0C4DE;
            font-family: 'Crimson Text', serif;
            font-size: 0.9rem;
            z-index: 1000;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
            min-width: 200px;
            max-width: 300px;
            pointer-events: none;
        `;
        return tooltip;
    }
    
    function showTooltip(tooltip, target) {
        document.body.appendChild(tooltip);
        
        const targetRect = target.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
        let top = targetRect.top - tooltipRect.height - 10;
        
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        if (top < 10) {
            top = targetRect.bottom + 10;
        }
        
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
        
        setTimeout(() => {
            if (document.body.contains(tooltip)) {
                document.body.removeChild(tooltip);
            }
        }, 2000);
    }
    
    function hideTooltips() {
        document.querySelectorAll('.spells-tooltip').forEach(tooltip => {
            if (document.body.contains(tooltip)) {
                document.body.removeChild(tooltip);
            }
        });
    }
    
    function showSpellCastResult(spellName, spellLevel) {
        const overlay = createOverlay();
        const result = document.createElement('div');
        result.className = 'spell-cast-result';
        result.innerHTML = `
            <div class="spell-cast-content">
                <h3>${spellName} Cast!</h3>
                <div class="cast-display">
                    <div class="cast-icon">${getSpellIcon(spellName)}</div>
                    <div class="cast-info">
                        <div class="cast-level">${getSpellLevelName(spellLevel)}</div>
                        <div class="cast-effect">${getSpellEffect(spellName)}</div>
                    </div>
                </div>
                <div class="cast-results">
                    ${getSpellDamageRoll(spellName)}
                </div>
                <button class="fantasy-btn btn-primary close-result">Close</button>
            </div>
        `;
        
        overlay.appendChild(result);
        document.body.appendChild(overlay);
        
        // Auto close after 4 seconds or on click
        const closeHandler = () => {
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
        };
        
        result.querySelector('.close-result').addEventListener('click', closeHandler);
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) closeHandler();
        });
        
        setTimeout(closeHandler, 4000);
    }
    
    function showFeatureActivationResult(featureName) {
        showNotification(`${featureName} activated!`, 'success');
    }
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            border: 2px solid ${type === 'error' ? '#DC143C' : type === 'warning' ? '#FFA500' : type === 'success' ? '#32CD32' : '#87CEEB'};
            border-radius: 8px;
            padding: 1rem;
            color: #B0C4DE;
            font-family: 'Crimson Text', serif;
            z-index: 10001;
            max-width: 300px;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }
    
    function getSpellLevel(spellCard) {
        if (spellCard.classList.contains('cantrip')) return 0;
        if (spellCard.classList.contains('level-1')) return 1;
        if (spellCard.classList.contains('level-2')) return 2;
        if (spellCard.classList.contains('level-3')) return 3;
        if (spellCard.classList.contains('level-4')) return 4;
        return 0;
    }
    
    function getSpellLevelName(level) {
        if (level === 0) return 'Cantrip';
        if (level === 1) return '1st Level';
        if (level === 2) return '2nd Level';
        if (level === 3) return '3rd Level';
        if (level === 4) return '4th Level';
        return `${level}th Level`;
    }
    
    function checkSpellSlotAvailability(level) {
        const levelGroups = spellsContainer.querySelectorAll('.spell-level-group');
        for (let group of levelGroups) {
            const levelNumber = group.querySelector('.spell-level-number');
            if (levelNumber && parseInt(levelNumber.textContent) === level) {
                const availableSlots = group.querySelectorAll('.slot.available');
                return availableSlots.length > 0;
            }
        }
        return false;
    }
    
    function consumeSpellSlot(level) {
        const levelGroups = spellsContainer.querySelectorAll('.spell-level-group');
        for (let group of levelGroups) {
            const levelNumber = group.querySelector('.spell-level-number');
            if (levelNumber && parseInt(levelNumber.textContent) === level) {
                const availableSlot = group.querySelector('.slot.available');
                if (availableSlot) {
                    availableSlot.classList.remove('available');
                    availableSlot.classList.add('used');
                    availableSlot.style.animation = 'slotUse 0.6s ease-in-out';
                    setTimeout(() => availableSlot.style.animation = '', 600);
                }
                break;
            }
        }
        updateSpellSlotCounts();
    }
    
    function updateSpellSlotCounts() {
        const levelGroups = spellsContainer.querySelectorAll('.spell-level-group');
        levelGroups.forEach(group => {
            const slotCount = group.querySelector('.slot-count');
            if (slotCount) {
                const availableSlots = group.querySelectorAll('.slot.available').length;
                const totalSlots = group.querySelectorAll('.slot').length;
                slotCount.textContent = `${availableSlots}/${totalSlots} slots`;
            }
        });
    }
    
    function performShortRest() {
        // Reset some class features
        const featureCards = spellsContainer.querySelectorAll('.feature-card.limited-use');
        featureCards.forEach(card => {
            const featureName = card.querySelector('.feature-name').textContent;
            if (featureName === 'Arcane Recovery') {
                const usesElement = card.querySelector('.uses-current');
                if (usesElement) {
                    usesElement.textContent = '0';
                }
            }
        });
        
        showNotification('Short rest completed! Some abilities recovered.', 'success');
    }
    
    function performLongRest() {
        // Restore all spell slots
        const allSlots = spellsContainer.querySelectorAll('.slot');
        allSlots.forEach(slot => {
            slot.classList.remove('used');
            slot.classList.add('available');
            slot.style.animation = 'restComplete 1s ease-in-out';
        });
        
        // Reset all class features
        const featureCards = spellsContainer.querySelectorAll('.feature-card.limited-use');
        featureCards.forEach(card => {
            const usesElement = card.querySelector('.uses-current');
            if (usesElement) {
                usesElement.textContent = '0';
            }
        });
        
        updateSpellSlotCounts();
        
        setTimeout(() => {
            allSlots.forEach(slot => slot.style.animation = '');
        }, 1000);
        
        showNotification('Long rest completed! All abilities and spell slots restored.', 'success');
    }
    
    function castSpellFromDetails(spellName, spellLevel) {
        if (spellLevel > 0) {
            const hasAvailableSlot = checkSpellSlotAvailability(spellLevel);
            if (!hasAvailableSlot) {
                showNotification(`No ${getSpellLevelName(spellLevel)} spell slots available`, 'error');
                return;
            }
            consumeSpellSlot(spellLevel);
        }
        
        showSpellCastResult(spellName, spellLevel);
    }
    
    // Data helper functions
    function getSpellRange(spellName) {
        const ranges = {
            'Fire Bolt': '120 feet',
            'Light': 'Touch',
            'Mage Hand': '30 feet',
            'Eldritch Blast': '120 feet',
            'Shield': 'Self',
            'Magic Missile': '120 feet',
            'Disguise Self': 'Self',
            'Invisibility': 'Touch',
            'Web': '60 feet',
            'Fireball': '150 feet',
            'Lightning Bolt': 'Self (100-foot line)'
        };
        return ranges[spellName] || '30 feet';
    }
    
    function getSpellDuration(spellName) {
        const durations = {
            'Fire Bolt': 'Instantaneous',
            'Light': '1 hour',
            'Mage Hand': '1 minute',
            'Eldritch Blast': 'Instantaneous',
            'Shield': '1 round',
            'Magic Missile': 'Instantaneous',
            'Disguise Self': '1 hour',
            'Invisibility': '1 hour',
            'Web': '1 hour',
            'Fireball': 'Instantaneous',
            'Lightning Bolt': 'Instantaneous'
        };
        return durations[spellName] || '1 minute';
    }
    
    function getSpellComponents(spellName) {
        const components = {
            'Fire Bolt': 'V, S',
            'Light': 'V, M',
            'Mage Hand': 'V, S',
            'Eldritch Blast': 'V, S',
            'Shield': 'V, S',
            'Magic Missile': 'V, S',
            'Disguise Self': 'V, S',
            'Invisibility': 'V, S, M',
            'Web': 'V, S, M',
            'Fireball': 'V, S, M',
            'Lightning Bolt': 'V, S, M'
        };
        return components[spellName] || 'V, S';
    }
    
    function getSpellDescription(spellName) {
        const descriptions = {
            'Fire Bolt': 'You hurl a mote of fire at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 fire damage.',
            'Light': 'You touch one object that is no larger than 10 feet in any dimension. Until the spell ends, the object sheds bright light in a 20-foot radius.',
            'Mage Hand': 'A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration or until you dismiss it as an action.',
            'Eldritch Blast': 'A beam of crackling energy streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 force damage.',
            'Shield': 'An invisible barrier of magical force appears and protects you. Until the start of your next turn, you have a +5 bonus to AC.',
            'Magic Missile': 'You create three glowing darts of magical force. Each dart hits a creature of your choice that you can see within range. A dart deals 1d4 + 1 force damage.',
            'Disguise Self': 'You make yourself—including your clothing, armor, weapons, and other belongings on your person—look different until the spell ends.',
            'Invisibility': 'A creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target\'s person.',
            'Web': 'You conjure a mass of thick, sticky webbing at a point of your choice within range. The webs fill a 20-foot cube from that point for the duration.',
            'Fireball': 'A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame.',
            'Lightning Bolt': 'A stroke of lightning forming a line 100 feet long and 5 feet wide blasts out from you in a direction you choose.'
        };
        return descriptions[spellName] || 'A powerful magical effect with various applications.';
    }
    
    function getSpellIcon(spellName) {
        const icons = {
            'Fire Bolt': '🔥',
            'Light': '💡',
            'Mage Hand': '🌪️',
            'Eldritch Blast': '🎯',
            'Shield': '🛡️',
            'Magic Missile': '💼',
            'Disguise Self': '👤',
            'Invisibility': '👁️',
            'Web': '🕸️',
            'Fireball': '🔥',
            'Lightning Bolt': '⚡'
        };
        return icons[spellName] || '✨';
    }
    
    function getSpellEffect(spellName) {
        const effects = {
            'Fire Bolt': 'Ranged spell attack for fire damage',
            'Light': 'Illuminates object with magical light',
            'Mage Hand': 'Creates a spectral hand to manipulate objects',
            'Eldritch Blast': 'Ranged spell attack for force damage',
            'Shield': 'Grants +5 AC bonus until next turn',
            'Magic Missile': 'Three automatic hits for force damage',
            'Disguise Self': 'Changes your appearance',
            'Invisibility': 'Makes target invisible',
            'Web': 'Creates restraining webbing',
            'Fireball': 'Area explosion for fire damage',
            'Lightning Bolt': 'Line attack for lightning damage'
        };
        return effects[spellName] || 'Magical effect';
    }
    
    function getSpellDamageRoll(spellName) {
        const damages = {
            'Fire Bolt': () => `Damage: ${Math.floor(Math.random() * 10) + 1} fire damage`,
            'Eldritch Blast': () => `Damage: ${Math.floor(Math.random() * 10) + 1} force damage`,
            'Magic Missile': () => {
                const dart1 = Math.floor(Math.random() * 4) + 2;
                const dart2 = Math.floor(Math.random() * 4) + 2;
                const dart3 = Math.floor(Math.random() * 4) + 2;
                return `Damage: ${dart1 + dart2 + dart3} force damage (${dart1}+${dart2}+${dart3})`;
            },
            'Fireball': () => {
                let total = 0;
                for (let i = 0; i < 8; i++) {
                    total += Math.floor(Math.random() * 6) + 1;
                }
                return `Damage: ${total} fire damage (8d6)`;
            },
            'Lightning Bolt': () => {
                let total = 0;
                for (let i = 0; i < 8; i++) {
                    total += Math.floor(Math.random() * 6) + 1;
                }
                return `Damage: ${total} lightning damage (8d6)`;
            }
        };
        
        const rollFn = damages[spellName];
        if (rollFn) {
            return rollFn();
        }
        return 'Effect applied successfully';
    }
    
    // Add CSS animations if not already present
    if (!document.querySelector('#spells-abilities-animations')) {
        const style = document.createElement('style');
        style.id = 'spells-abilities-animations';
        style.textContent = `
            .rest-content, .spell-manager-content, .spell-tracker-content, .spell-details-content, .spell-cast-content {
                background: linear-gradient(135deg, #1a1a2e, #16213e);
                border: 3px solid #87CEEB;
                border-radius: 12px;
                padding: 2rem;
                color: #B0C4DE;
                font-family: 'Crimson Text', serif;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
                max-width: 90vw;
                max-height: 90vh;
                overflow-y: auto;
            }
            
            .rest-content h3, .spell-manager-content h3, .spell-tracker-content h3, 
            .spell-details-content h3, .spell-cast-content h3 {
                color: #87CEEB;
                font-family: 'Cinzel', serif;
                margin-bottom: 1rem;
                text-align: center;
            }
            
            .cast-display {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                margin: 1.5rem 0;
            }
            
            .cast-icon {
                font-size: 3rem;
                animation: bounce 2s infinite;
            }
            
            .cast-info {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
            }
            
            .cast-level {
                font-size: 1.2rem;
                font-weight: bold;
                color: #FFD700;
            }
            
            .cast-effect {
                font-size: 1rem;
                color: #87CEEB;
                text-align: center;
            }
            
            .cast-results {
                font-size: 1.1rem;
                font-weight: bold;
                color: #32CD32;
                text-align: center;
                margin: 1rem 0;
                padding: 1rem;
                background: rgba(74, 144, 226, 0.1);
                border: 1px solid #4A90E2;
                border-radius: 6px;
            }
            
            .spells-abilities .tab-btn {
                background: rgba(26, 26, 46, 0.6);
                border: 1px solid #4A90E2;
                color: #B0C4DE;
                padding: 0.5rem 1rem;
                cursor: pointer;
                border-radius: 4px 4px 0 0;
            }
            
            .spells-abilities .tab-btn.active {
                background: rgba(135, 206, 235, 0.2);
                border-color: #87CEEB;
                color: #87CEEB;
            }
            
            .spells-abilities .tab-content {
                display: none;
                padding: 1rem;
                border: 1px solid #4A90E2;
                border-top: none;
                background: rgba(26, 26, 46, 0.4);
            }
            
            .spells-abilities .tab-content.active {
                display: block;
            }
            
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-10px); }
                60% { transform: translateY(-5px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Development fallback
if (typeof window !== 'undefined' && !window.SpellsAbilitiesFragment) {
    window.SpellsAbilitiesFragment = { init: (params) => {
        const defaultExport = arguments.callee.constructor.toString().includes('export default') 
            ? module.exports.default || module.exports 
            : null;
        if (defaultExport) return defaultExport(params);
    }};
}