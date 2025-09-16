/**
 * Combat Statistics Fragment - Interactive Features
 * D&D-themed combat stats with dice rolling, HP management, and ability score interactions
 */

export default function ({ fragmentElement, configuration }) {
    'use strict';
    
    const combatStats = fragmentElement.querySelector('.combat-stats');
    if (!combatStats) return () => {};
    
    // Initialize all interactive features
    const cleanupFunctions = [];
    
    initializeAbilityScores();
    initializeHitPointsManagement();
    initializeDeathSaves();
    initializeSavingThrows();
    initializeStatCards();
    initializeActionButtons();
    applyConfiguration();
    
    // Return cleanup function
    return () => {
        cleanupFunctions.forEach(cleanup => cleanup());
    };
    
    /**
     * Setup ability score interactions with dice rolling
     */
    function initializeAbilityScores() {
        const abilityScores = combatStats.querySelectorAll('.ability-score');
        
        abilityScores.forEach(ability => {
            const clickHandler = function() {
                rollAbilityCheck(this);
            };
            
            const hoverHandler = function() {
                showAbilityTooltip(this);
            };
            
            const leaveHandler = function() {
                hideTooltips();
            };
            
            ability.addEventListener('click', clickHandler);
            ability.addEventListener('mouseenter', hoverHandler);
            ability.addEventListener('mouseleave', leaveHandler);
            
            ability.style.cursor = 'pointer';
            ability.title = 'Click to roll ability check';
            
            cleanupFunctions.push(() => {
                ability.removeEventListener('click', clickHandler);
                ability.removeEventListener('mouseenter', hoverHandler);
                ability.removeEventListener('mouseleave', leaveHandler);
            });
        });
    }
    
    /**
     * Setup hit points management with visual feedback
     */
    function initializeHitPointsManagement() {
        const hpCard = combatStats.querySelector('.hit-points');
        const hpBar = combatStats.querySelector('.hp-fill');
        const currentHpElement = combatStats.querySelector('.current-hp');
        const maxHpElement = combatStats.querySelector('.max-hp');
        
        if (!hpCard || !hpBar) return;
        
        // Update HP bar based on current values
        updateHPBar();
        
        // Add click handler for HP management
        const hpClickHandler = function() {
            showHPManager();
        };
        
        hpCard.addEventListener('click', hpClickHandler);
        hpCard.style.cursor = 'pointer';
        hpCard.title = 'Click to manage hit points';
        
        cleanupFunctions.push(() => {
            hpCard.removeEventListener('click', hpClickHandler);
        });
        
        function updateHPBar() {
            if (!currentHpElement || !maxHpElement || !hpBar) return;
            
            const current = parseInt(currentHpElement.textContent) || 0;
            const max = parseInt(maxHpElement.textContent) || 1;
            const percentage = Math.max(0, Math.min(100, (current / max) * 100));
            
            hpBar.style.width = percentage + '%';
            
            // Change color based on HP percentage
            if (percentage > 75) {
                hpBar.style.background = 'linear-gradient(90deg, #32CD32 0%, #90EE90 100%)';
            } else if (percentage > 50) {
                hpBar.style.background = 'linear-gradient(90deg, #FFD700 0%, #FFFF00 100%)';
            } else if (percentage > 25) {
                hpBar.style.background = 'linear-gradient(90deg, #FFA500 0%, #FF8C00 100%)';
            } else {
                hpBar.style.background = 'linear-gradient(90deg, #DC143C 0%, #FF6347 100%)';
            }
        }
        
        function showHPManager() {
            const overlay = createOverlay();
            const manager = document.createElement('div');
            manager.className = 'hp-manager';
            manager.innerHTML = `
                <div class="hp-manager-content">
                    <h3>Manage Hit Points</h3>
                    <div class="hp-controls">
                        <div class="hp-input-group">
                            <label>Current HP</label>
                            <input type="number" class="hp-input current" value="${currentHpElement?.textContent || 0}" min="0">
                        </div>
                        <div class="hp-input-group">
                            <label>Max HP</label>
                            <input type="number" class="hp-input max" value="${maxHpElement?.textContent || 0}" min="1">
                        </div>
                    </div>
                    <div class="hp-quick-actions">
                        <button class="hp-btn heal">Heal</button>
                        <button class="hp-btn damage">Damage</button>
                        <button class="hp-btn temp-hp">Temp HP</button>
                    </div>
                    <div class="hp-actions">
                        <button class="fantasy-btn btn-primary save-hp">Save Changes</button>
                        <button class="fantasy-btn btn-secondary cancel-hp">Cancel</button>
                    </div>
                </div>
            `;
            
            overlay.appendChild(manager);
            document.body.appendChild(overlay);
            
            // Setup HP manager interactions
            setupHPManagerHandlers(overlay, manager);
        }
        
        function setupHPManagerHandlers(overlay, manager) {
            const saveBtn = manager.querySelector('.save-hp');
            const cancelBtn = manager.querySelector('.cancel-hp');
            const currentInput = manager.querySelector('.hp-input.current');
            const maxInput = manager.querySelector('.hp-input.max');
            const healBtn = manager.querySelector('.hp-btn.heal');
            const damageBtn = manager.querySelector('.hp-btn.damage');
            const tempHpBtn = manager.querySelector('.hp-btn.temp-hp');
            
            const saveHandler = function() {
                if (currentHpElement) currentHpElement.textContent = currentInput.value;
                if (maxHpElement) maxHpElement.textContent = maxInput.value;
                updateHPBar();
                document.body.removeChild(overlay);
            };
            
            const cancelHandler = function() {
                document.body.removeChild(overlay);
            };
            
            // Quick action handlers
            const healHandler = function() {
                const amount = prompt('Enter healing amount:', '1') || '0';
                const healValue = parseInt(amount);
                if (healValue > 0) {
                    const current = parseInt(currentInput.value) || 0;
                    const max = parseInt(maxInput.value) || 1;
                    currentInput.value = Math.min(current + healValue, max);
                    
                    // Visual feedback
                    this.style.transform = 'scale(1.1)';
                    this.style.boxShadow = '0 0 20px rgba(50, 205, 50, 0.6)';
                    setTimeout(() => {
                        this.style.transform = '';
                        this.style.boxShadow = '';
                    }, 300);
                }
            };
            
            const damageHandler = function() {
                const amount = prompt('Enter damage amount:', '1') || '0';
                const damageValue = parseInt(amount);
                if (damageValue > 0) {
                    const current = parseInt(currentInput.value) || 0;
                    currentInput.value = Math.max(current - damageValue, 0);
                    
                    // Visual feedback
                    this.style.transform = 'scale(1.1)';
                    this.style.boxShadow = '0 0 20px rgba(220, 20, 60, 0.6)';
                    setTimeout(() => {
                        this.style.transform = '';
                        this.style.boxShadow = '';
                    }, 300);
                }
            };
            
            const tempHpHandler = function() {
                const amount = prompt('Enter temporary HP amount:', '5') || '0';
                const tempValue = parseInt(amount);
                if (tempValue > 0) {
                    const current = parseInt(currentInput.value) || 0;
                    const max = parseInt(maxInput.value) || 1;
                    // Temp HP allows going over max
                    currentInput.value = current + tempValue;
                    
                    // Visual feedback
                    this.style.transform = 'scale(1.1)';
                    this.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.6)';
                    setTimeout(() => {
                        this.style.transform = '';
                        this.style.boxShadow = '';
                    }, 300);
                    
                    // Show temp HP indicator
                    const tempIndicator = document.createElement('div');
                    tempIndicator.textContent = `+${tempValue} Temp HP`;
                    tempIndicator.style.cssText = `
                        position: absolute;
                        top: -2rem;
                        left: 50%;
                        transform: translateX(-50%);
                        background: rgba(255, 215, 0, 0.2);
                        border: 1px solid #FFD700;
                        border-radius: 4px;
                        padding: 0.25rem 0.5rem;
                        font-size: 0.8rem;
                        color: #FFD700;
                        pointer-events: none;
                        animation: fadeInOut 2s ease-in-out;
                    `;
                    this.style.position = 'relative';
                    this.appendChild(tempIndicator);
                    setTimeout(() => {
                        if (this.contains(tempIndicator)) {
                            this.removeChild(tempIndicator);
                        }
                    }, 2000);
                }
            };
            
            // Attach event listeners
            saveBtn.addEventListener('click', saveHandler);
            cancelBtn.addEventListener('click', cancelHandler);
            healBtn.addEventListener('click', healHandler);
            damageBtn.addEventListener('click', damageHandler);
            tempHpBtn.addEventListener('click', tempHpHandler);
            
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) cancelHandler();
            });
            
            // Keyboard support
            document.addEventListener('keydown', function escapeHandler(e) {
                if (e.key === 'Escape') {
                    cancelHandler();
                    document.removeEventListener('keydown', escapeHandler);
                }
            });
        }
    }
    
    /**
     * Setup death saves tracking
     */
    function initializeDeathSaves() {
        const deathDots = combatStats.querySelectorAll('.death-dot');
        
        deathDots.forEach(dot => {
            const clickHandler = function() {
                toggleDeathSave(this);
            };
            
            dot.addEventListener('click', clickHandler);
            dot.style.cursor = 'pointer';
            
            cleanupFunctions.push(() => {
                dot.removeEventListener('click', clickHandler);
            });
        });
        
        function toggleDeathSave(dot) {
            if (dot.classList.contains('filled')) {
                dot.classList.remove('filled');
                dot.textContent = '○';
            } else {
                dot.classList.add('filled');
                dot.textContent = '●';
            }
            
            // Add visual feedback
            dot.style.transform = 'scale(1.3)';
            setTimeout(() => {
                dot.style.transform = '';
            }, 200);
        }
    }
    
    /**
     * Setup saving throw interactions
     */
    function initializeSavingThrows() {
        const saveItems = combatStats.querySelectorAll('.save-item');
        
        saveItems.forEach(save => {
            const clickHandler = function() {
                rollSavingThrow(this);
            };
            
            save.addEventListener('click', clickHandler);
            save.style.cursor = 'pointer';
            save.title = 'Click to roll saving throw';
            
            cleanupFunctions.push(() => {
                save.removeEventListener('click', clickHandler);
            });
        });
    }
    
    /**
     * Setup stat card hover effects
     */
    function initializeStatCards() {
        const statCards = combatStats.querySelectorAll('.stat-card');
        
        statCards.forEach(card => {
            const mouseenterHandler = function() {
                this.style.transform = 'translateY(-4px) scale(1.02)';
            };
            
            const mouseleaveHandler = function() {
                this.style.transform = 'translateY(-2px)';
            };
            
            card.addEventListener('mouseenter', mouseenterHandler);
            card.addEventListener('mouseleave', mouseleaveHandler);
            
            cleanupFunctions.push(() => {
                card.removeEventListener('mouseenter', mouseenterHandler);
                card.removeEventListener('mouseleave', mouseleaveHandler);
            });
        });
    }
    
    /**
     * Setup action button interactions
     */
    function initializeActionButtons() {
        const rollInitiativeBtn = combatStats.querySelector('.roll-initiative');
        const manageHpBtn = combatStats.querySelector('.manage-hp');
        
        if (rollInitiativeBtn) {
            const initiativeHandler = function(e) {
                e.preventDefault();
                rollInitiative();
            };
            
            rollInitiativeBtn.addEventListener('click', initiativeHandler);
            
            cleanupFunctions.push(() => {
                rollInitiativeBtn.removeEventListener('click', initiativeHandler);
            });
        }
        
        if (manageHpBtn) {
            const hpManagerHandler = function(e) {
                e.preventDefault();
                const hpCard = combatStats.querySelector('.hit-points');
                if (hpCard) hpCard.click();
            };
            
            manageHpBtn.addEventListener('click', hpManagerHandler);
            
            cleanupFunctions.push(() => {
                manageHpBtn.removeEventListener('click', hpManagerHandler);
            });
        }
    }
    
    /**
     * Roll ability check with animation and result display
     */
    function rollAbilityCheck(abilityElement) {
        const abilityName = abilityElement.querySelector('.ability-name').textContent;
        const modifier = abilityElement.querySelector('.ability-modifier').textContent;
        
        // Animate the ability score
        abilityElement.style.animation = 'abilityRoll 0.6s ease-in-out';
        
        setTimeout(() => {
            const roll = Math.floor(Math.random() * 20) + 1;
            const modifierValue = parseInt(modifier.replace('+', '').replace('-', '')) || 0;
            const total = roll + (modifier.includes('-') ? -modifierValue : modifierValue);
            
            showDiceResult(`${abilityName} Check`, roll, modifier, total);
            abilityElement.style.animation = '';
        }, 300);
    }
    
    /**
     * Roll saving throw
     */
    function rollSavingThrow(saveElement) {
        const saveName = saveElement.querySelector('.save-name').textContent;
        const saveValue = saveElement.querySelector('.save-value').textContent;
        
        // Animate the save item
        saveElement.style.animation = 'saveRoll 0.6s ease-in-out';
        
        setTimeout(() => {
            const roll = Math.floor(Math.random() * 20) + 1;
            const modifierValue = parseInt(saveValue.replace('+', '').replace('-', '')) || 0;
            const total = roll + (saveValue.includes('-') ? -modifierValue : modifierValue);
            
            showDiceResult(`${saveName} Save`, roll, saveValue, total);
            saveElement.style.animation = '';
        }, 300);
    }
    
    /**
     * Roll initiative
     */
    function rollInitiative() {
        const initiativeElement = combatStats.querySelector('.initiative .stat-value');
        const initiativeModifier = initiativeElement?.textContent || '+0';
        
        const roll = Math.floor(Math.random() * 20) + 1;
        const raw = initiativeModifier.trim();
        const n = parseInt(raw.replace(/[+\-]/g, '')) || 0;
        const modifierValue = raw.includes('-') ? -n : n;
        const total = roll + modifierValue;
        
        showDiceResult('Initiative', roll, initiativeModifier, total);
        
        // Add visual feedback
        const initiativeCard = combatStats.querySelector('.initiative');
        if (initiativeCard) {
            initiativeCard.style.boxShadow = '0 0 25px rgba(255, 215, 0, 0.8)';
            setTimeout(() => {
                initiativeCard.style.boxShadow = '';
            }, 1000);
        }
    }
    
    /**
     * Show dice roll result
     */
    function showDiceResult(rollType, diceRoll, modifier, total) {
        const resultOverlay = createOverlay();
        const result = document.createElement('div');
        result.className = 'dice-result';
        result.innerHTML = `
            <div class="dice-result-content">
                <h3>${rollType}</h3>
                <div class="dice-display">
                    <div class="dice-icon">🎲</div>
                    <div class="dice-breakdown">
                        <div class="dice-roll">${diceRoll}</div>
                        <div class="dice-modifier">${modifier}</div>
                        <div class="dice-total">= ${total}</div>
                    </div>
                </div>
                <button class="fantasy-btn btn-primary close-result">Close</button>
            </div>
        `;
        
        resultOverlay.appendChild(result);
        document.body.appendChild(resultOverlay);
        
        // Auto close after 3 seconds or on click
        const closeHandler = () => {
            if (document.body.contains(resultOverlay)) {
                document.body.removeChild(resultOverlay);
            }
        };
        
        result.querySelector('.close-result').addEventListener('click', closeHandler);
        resultOverlay.addEventListener('click', function(e) {
            if (e.target === resultOverlay) closeHandler();
        });
        
        setTimeout(closeHandler, 3000);
    }
    
    /**
     * Show ability score tooltip
     */
    function showAbilityTooltip(abilityElement) {
        const abilityName = abilityElement.querySelector('.ability-name').textContent;
        const abilityValue = abilityElement.querySelector('.ability-value').textContent;
        const modifier = abilityElement.querySelector('.ability-modifier').textContent;
        
        const tooltip = createTooltip(`
            <div class="ability-tooltip">
                <h4>${getAbilityFullName(abilityName)}</h4>
                <div class="tooltip-stat">Score: ${abilityValue}</div>
                <div class="tooltip-stat">Modifier: ${modifier}</div>
                <div class="tooltip-hint">Click to roll ability check</div>
            </div>
        `);
        
        showTooltip(tooltip, abilityElement);
    }
    
    /**
     * Apply configuration settings
     */
    function applyConfiguration() {
        if (!configuration) return;
        
        // Apply theme classes
        if (configuration.statsTheme && configuration.statsTheme !== 'classic') {
            combatStats.classList.add(`theme-${configuration.statsTheme}`);
        }
        
        // Apply compact mode
        if (configuration.compactMode) {
            combatStats.classList.add('compact-mode');
        }
        
        // Hide/show sections based on configuration
        if (configuration.showAbilityScores === false) {
            const section = combatStats.querySelector('.ability-scores-section');
            if (section) section.style.display = 'none';
        }
        
        if (configuration.showSavingThrows === false) {
            const section = combatStats.querySelector('.saving-throws-section');
            if (section) section.style.display = 'none';
        }
        
        if (configuration.showDeathSaves === false) {
            const section = combatStats.querySelector('.death-saves-section');
            if (section) section.style.display = 'none';
        }
        
        if (configuration.showResistances === false) {
            const section = combatStats.querySelector('.resistances-section');
            if (section) section.style.display = 'none';
        }
        
        // Apply default values when configuration is incomplete
        if (configuration.showAbilityScores !== false) {
            const section = combatStats.querySelector('.ability-scores-section');
            if (section) section.style.display = '';
        }
        
        if (configuration.showSavingThrows !== false) {
            const section = combatStats.querySelector('.saving-throws-section');
            if (section) section.style.display = '';
        }
        
        if (configuration.showDeathSaves !== false) {
            const section = combatStats.querySelector('.death-saves-section');
            if (section) section.style.display = '';
        }
        
        if (configuration.showResistances !== false) {
            const section = combatStats.querySelector('.resistances-section');
            if (section) section.style.display = '';
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
    
    function createTooltip(content) {
        const tooltip = document.createElement('div');
        tooltip.className = 'combat-tooltip';
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
        document.querySelectorAll('.combat-tooltip').forEach(tooltip => {
            if (document.body.contains(tooltip)) {
                document.body.removeChild(tooltip);
            }
        });
    }
    
    function getAbilityFullName(shortName) {
        const names = {
            'STR': 'Strength',
            'DEX': 'Dexterity', 
            'CON': 'Constitution',
            'INT': 'Intelligence',
            'WIS': 'Wisdom',
            'CHA': 'Charisma'
        };
        return names[shortName] || shortName;
    }
    
    // Add CSS animations if not already present
    if (!document.querySelector('#combat-stats-animations')) {
        const style = document.createElement('style');
        style.id = 'combat-stats-animations';
        style.textContent = `
            @keyframes abilityRoll {
                0%, 100% { transform: scale(1) rotate(0deg); }
                25% { transform: scale(1.1) rotate(-5deg); }
                75% { transform: scale(1.1) rotate(5deg); }
            }
            
            @keyframes saveRoll {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
            
            .dice-result-content {
                background: linear-gradient(135deg, #2a1f1a, #1a0f0a);
                border: 3px solid #D4AF37;
                border-radius: 12px;
                padding: 2rem;
                text-align: center;
                color: #DEB887;
                font-family: 'Crimson Text', serif;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
            }
            
            .dice-result-content h3 {
                color: #FFD700;
                font-family: 'Cinzel', serif;
                margin-bottom: 1rem;
            }
            
            .dice-display {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                margin: 1.5rem 0;
            }
            
            .dice-icon {
                font-size: 3rem;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            
            .dice-breakdown {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
            }
            
            .dice-roll {
                font-size: 2rem;
                font-weight: bold;
                color: #FFD700;
            }
            
            .dice-modifier {
                font-size: 1.2rem;
                color: #D4AF37;
            }
            
            .dice-total {
                font-size: 1.5rem;
                font-weight: bold;
                color: #32CD32;
                border-top: 2px solid #8B4513;
                padding-top: 0.5rem;
            }
            
            .hp-manager-content {
                background: linear-gradient(135deg, #2a1f1a, #1a0f0a);
                border: 3px solid #D4AF37;
                border-radius: 12px;
                padding: 2rem;
                color: #DEB887;
                font-family: 'Crimson Text', serif;
                min-width: 400px;
            }
            
            .hp-controls {
                display: flex;
                gap: 1rem;
                margin: 1rem 0;
            }
            
            .hp-input-group {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .hp-input {
                padding: 0.5rem;
                border: 2px solid #8B4513;
                border-radius: 4px;
                background: rgba(42, 31, 26, 0.8);
                color: #DEB887;
                font-family: 'Crimson Text', serif;
                font-size: 1rem;
            }
            
            .hp-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
                margin-top: 1.5rem;
            }
        `;
        document.head.appendChild(style);
    }
}

// Development fallback
if (typeof window !== 'undefined' && !window.CombatStatsFragment) {
    window.CombatStatsFragment = { init: (params) => {
        const defaultExport = arguments.callee.constructor.toString().includes('export default') 
            ? module.exports.default || module.exports 
            : null;
        if (defaultExport) return defaultExport(params);
    }};
}