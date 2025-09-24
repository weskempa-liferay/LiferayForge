/**
 * Skills & Proficiencies Fragment - Interactive Features
 * D&D-themed skills and proficiencies with skill check rolling and proficiency management
 */

export default function ({ fragmentElement, configuration }) {
    //'use strict';
    
    const skillsContainer = fragmentElement.querySelector('.skills-proficiencies');
    if (!skillsContainer) return () => {};
    
    // Initialize all interactive features
    const cleanupFunctions = [];
    
    initializeSkillRolling();
    initializeToolProficiencies();
    initializeWeaponProficiencies();
    initializeLanguages();
    initializeExpertiseItems();
    initializeActionButtons();
    applyConfiguration();
    
    // Return cleanup function
    return () => {
        cleanupFunctions.forEach(cleanup => cleanup());
    };
    
    /**
     * Setup skill rolling interactions
     */
    function initializeSkillRolling() {
        const skillItems = skillsContainer.querySelectorAll('.skill-item');
        
        skillItems.forEach(skill => {
            const clickHandler = function() {
                rollSkillCheck(this);
            };
            
            const hoverHandler = function() {
                showSkillTooltip(this);
            };
            
            const leaveHandler = function() {
                hideTooltips();
            };
            
            skill.addEventListener('click', clickHandler);
            skill.addEventListener('mouseenter', hoverHandler);
            skill.addEventListener('mouseleave', leaveHandler);
            
            skill.title = 'Click to roll skill check';
            
            cleanupFunctions.push(() => {
                skill.removeEventListener('click', clickHandler);
                skill.removeEventListener('mouseenter', hoverHandler);
                skill.removeEventListener('mouseleave', leaveHandler);
            });
        });
    }
    
    /**
     * Setup tool proficiency interactions
     */
    function initializeToolProficiencies() {
        const toolItems = skillsContainer.querySelectorAll('.proficiency-item');
        
        toolItems.forEach(tool => {
            const clickHandler = function() {
                rollToolCheck(this);
            };
            
            const hoverHandler = function() {
                showToolTooltip(this);
            };
            
            const leaveHandler = function() {
                hideTooltips();
            };
            
            tool.addEventListener('click', clickHandler);
            tool.addEventListener('mouseenter', hoverHandler);
            tool.addEventListener('mouseleave', leaveHandler);
            
            tool.title = 'Click to roll tool check';
            
            cleanupFunctions.push(() => {
                tool.removeEventListener('click', clickHandler);
                tool.removeEventListener('mouseenter', hoverHandler);
                tool.removeEventListener('mouseleave', leaveHandler);
            });
        });
    }
    
    /**
     * Setup weapon proficiency interactions
     */
    function initializeWeaponProficiencies() {
        const weaponTags = skillsContainer.querySelectorAll('.weapon-tag');
        
        weaponTags.forEach(weapon => {
            const clickHandler = function() {
                showWeaponDetails(this);
            };
            
            const hoverHandler = function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            };
            
            const leaveHandler = function() {
                this.style.transform = '';
            };
            
            weapon.addEventListener('click', clickHandler);
            weapon.addEventListener('mouseenter', hoverHandler);
            weapon.addEventListener('mouseleave', leaveHandler);
            
            weapon.title = 'Click to view weapon details';
            
            cleanupFunctions.push(() => {
                weapon.removeEventListener('click', clickHandler);
                weapon.removeEventListener('mouseenter', hoverHandler);
                weapon.removeEventListener('mouseleave', leaveHandler);
            });
        });
    }
    
    /**
     * Setup language interactions
     */
    function initializeLanguages() {
        const languageItems = skillsContainer.querySelectorAll('.language-item');
        
        languageItems.forEach(language => {
            const clickHandler = function() {
                showLanguageDetails(this);
            };
            
            const hoverHandler = function() {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            };
            
            const leaveHandler = function() {
                this.style.transform = '';
            };
            
            language.addEventListener('click', clickHandler);
            language.addEventListener('mouseenter', hoverHandler);
            language.addEventListener('mouseleave', leaveHandler);
            
            language.title = 'Click to view language details';
            
            cleanupFunctions.push(() => {
                language.removeEventListener('click', clickHandler);
                language.removeEventListener('mouseenter', hoverHandler);
                language.removeEventListener('mouseleave', leaveHandler);
            });
        });
    }
    
    /**
     * Setup expertise item interactions
     */
    function initializeExpertiseItems() {
        const expertiseItems = skillsContainer.querySelectorAll('.expertise-item');
        
        expertiseItems.forEach(expertise => {
            const clickHandler = function() {
                showExpertiseDetails(this);
            };
            
            const hoverHandler = function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.3)';
            };
            
            const leaveHandler = function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            };
            
            expertise.addEventListener('click', clickHandler);
            expertise.addEventListener('mouseenter', hoverHandler);
            expertise.addEventListener('mouseleave', leaveHandler);
            
            expertise.title = 'Click to view expertise details';
            
            cleanupFunctions.push(() => {
                expertise.removeEventListener('click', clickHandler);
                expertise.removeEventListener('mouseenter', hoverHandler);
                expertise.removeEventListener('mouseleave', leaveHandler);
            });
        });
    }
    
    /**
     * Setup action button interactions
     */
    function initializeActionButtons() {
        const rollAllBtn = skillsContainer.querySelector('.roll-all-skills');
        const manageProfBtn = skillsContainer.querySelector('.manage-proficiencies');
        
        if (rollAllBtn) {
            const rollAllHandler = function(e) {
                e.preventDefault();
                rollAllProficientSkills();
            };
            
            rollAllBtn.addEventListener('click', rollAllHandler);
            
            cleanupFunctions.push(() => {
                rollAllBtn.removeEventListener('click', rollAllHandler);
            });
        }
        
        if (manageProfBtn) {
            const manageProfHandler = function(e) {
                e.preventDefault();
                showProficiencyManager();
            };
            
            manageProfBtn.addEventListener('click', manageProfHandler);
            
            cleanupFunctions.push(() => {
                manageProfBtn.removeEventListener('click', manageProfHandler);
            });
        }
    }
    
    /**
     * Roll skill check with dice animation
     */
    function rollSkillCheck(skillElement) {
        const skillName = skillElement.querySelector('.skill-name').textContent;
        const skillValue = skillElement.querySelector('.skill-value').textContent;
        const skillAbility = skillElement.querySelector('.skill-ability').textContent.replace(/[()]/g, '');
        const isExpertise = skillElement.querySelector('.proficiency-indicator.expertise');
        
        // Animate the skill item
        skillElement.style.animation = 'skillRoll 0.6s ease-in-out';
        
        setTimeout(() => {
            const roll = Math.floor(Math.random() * 20) + 1;
            const raw = skillValue.trim();
            const n = parseInt(raw.replace(/[+\-]/g, '')) || 0;
            const modifierValue = raw.includes('-') ? -n : n;
            const total = roll + modifierValue;
            
            let rollType = `${skillName} Check`;
            if (isExpertise) {
                rollType += ' (Expertise)';
            }
            
            showDiceResult(rollType, roll, skillValue, total, skillAbility);
            skillElement.style.animation = '';
        }, 300);
    }
    
    /**
     * Roll tool check
     */
    function rollToolCheck(toolElement) {
        const toolName = toolElement.querySelector('.proficiency-name').textContent;
        const toolBonus = toolElement.querySelector('.proficiency-bonus').textContent;
        
        // Animate the tool item
        toolElement.style.animation = 'toolRoll 0.6s ease-in-out';
        
        setTimeout(() => {
            const roll = Math.floor(Math.random() * 20) + 1;
            const raw = toolBonus.trim();
            const n = parseInt(raw.replace(/[+\-]/g, '')) || 0;
            const modifierValue = raw.includes('-') ? -n : n;
            const total = roll + modifierValue;
            
            showDiceResult(`${toolName} Check`, roll, toolBonus, total);
            toolElement.style.animation = '';
        }, 300);
    }
    
    /**
     * Show weapon details modal
     */
    function showWeaponDetails(weaponElement) {
        const weaponName = weaponElement.textContent;
        
        const overlay = createOverlay();
        const modal = document.createElement('div');
        modal.className = 'weapon-details-modal';
        modal.innerHTML = `
            <div class="weapon-details-content">
                <h3>${weaponName}</h3>
                <div class="weapon-stats">
                    <div class="weapon-stat">
                        <span class="stat-label">Damage:</span>
                        <span class="stat-value">${getWeaponDamage(weaponName)}</span>
                    </div>
                    <div class="weapon-stat">
                        <span class="stat-label">Properties:</span>
                        <span class="stat-value">${getWeaponProperties(weaponName)}</span>
                    </div>
                    <div class="weapon-stat">
                        <span class="stat-label">Weight:</span>
                        <span class="stat-value">${getWeaponWeight(weaponName)}</span>
                    </div>
                </div>
                <button class="fantasy-btn btn-primary close-modal">Close</button>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        setupModalHandlers(overlay);
    }
    
    /**
     * Show language details modal
     */
    function showLanguageDetails(languageElement) {
        const languageName = languageElement.querySelector('.language-name').textContent;
        const languageType = languageElement.querySelector('.language-type').textContent;
        
        const overlay = createOverlay();
        const modal = document.createElement('div');
        modal.className = 'language-details-modal';
        modal.innerHTML = `
            <div class="language-details-content">
                <h3>${languageName}</h3>
                <div class="language-info">
                    <div class="language-detail">
                        <span class="detail-label">Fluency Level:</span>
                        <span class="detail-value">${languageType}</span>
                    </div>
                    <div class="language-detail">
                        <span class="detail-label">Script:</span>
                        <span class="detail-value">${getLanguageScript(languageName)}</span>
                    </div>
                    <div class="language-detail">
                        <span class="detail-label">Speakers:</span>
                        <span class="detail-value">${getLanguageSpeakers(languageName)}</span>
                    </div>
                </div>
                <button class="fantasy-btn btn-primary close-modal">Close</button>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        setupModalHandlers(overlay);
    }
    
    /**
     * Show expertise details modal
     */
    function showExpertiseDetails(expertiseElement) {
        const expertiseName = expertiseElement.querySelector('.expertise-name').textContent;
        const expertiseDescription = expertiseElement.querySelector('.expertise-description').textContent;
        
        const overlay = createOverlay();
        const modal = document.createElement('div');
        modal.className = 'expertise-details-modal';
        modal.innerHTML = `
            <div class="expertise-details-content">
                <h3>${expertiseName}</h3>
                <div class="expertise-description-full">
                    <p>${expertiseDescription}</p>
                    <div class="expertise-mechanics">
                        <h4>Game Mechanics:</h4>
                        <p>${getExpertiseMechanics(expertiseName)}</p>
                    </div>
                </div>
                <button class="fantasy-btn btn-primary close-modal">Close</button>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        setupModalHandlers(overlay);
    }
    
    /**
     * Roll all proficient skills
     */
    function rollAllProficientSkills() {
        const proficientSkills = skillsContainer.querySelectorAll('.skill-item.proficient');
        
        if (proficientSkills.length === 0) {
            showNotification('No proficient skills found to roll.', 'warning');
            return;
        }
        
        const results = [];
        proficientSkills.forEach(skill => {
            const skillName = skill.querySelector('.skill-name').textContent;
            const skillValue = skill.querySelector('.skill-value').textContent;
            const roll = Math.floor(Math.random() * 20) + 1;
            const raw = skillValue.trim();
            const n = parseInt(raw.replace(/[+\-]/g, '')) || 0;
            const modifierValue = raw.includes('-') ? -n : n;
            const total = roll + modifierValue;
            
            results.push({
                name: skillName,
                roll: roll,
                modifier: skillValue,
                total: total
            });
        });
        
        showMultipleRollResults(results);
    }
    
    /**
     * Show proficiency manager
     */
    function showProficiencyManager() {
        const overlay = createOverlay();
        const manager = document.createElement('div');
        manager.className = 'proficiency-manager';
        manager.innerHTML = `
            <div class="proficiency-manager-content">
                <h3>Manage Proficiencies</h3>
                <div class="proficiency-tabs">
                    <button class="tab-btn active" data-tab="skills">Skills</button>
                    <button class="tab-btn" data-tab="tools">Tools</button>
                    <button class="tab-btn" data-tab="languages">Languages</button>
                </div>
                <div class="proficiency-manager-body">
                    <div class="tab-content active" data-tab="skills">
                        <p>Toggle proficiency by clicking on skills:</p>
                        <div class="skill-manager-list">
                            ${generateSkillManagerList()}
                        </div>
                    </div>
                    <div class="tab-content" data-tab="tools">
                        <p>Add or remove tool proficiencies:</p>
                        <div class="tool-manager-list">
                            <button class="add-tool-btn fantasy-btn btn-secondary">Add Tool</button>
                        </div>
                    </div>
                    <div class="tab-content" data-tab="languages">
                        <p>Manage known languages:</p>
                        <div class="language-manager-list">
                            <button class="add-language-btn fantasy-btn btn-secondary">Add Language</button>
                        </div>
                    </div>
                </div>
                <div class="manager-actions">
                    <button class="fantasy-btn btn-primary save-proficiencies">Save Changes</button>
                    <button class="fantasy-btn btn-secondary close-modal">Cancel</button>
                </div>
            </div>
        `;
        
        overlay.appendChild(manager);
        document.body.appendChild(overlay);
        
        setupProficiencyManagerHandlers(overlay, manager);
        setupModalHandlers(overlay);
    }
    
    /**
     * Show dice roll result
     */
    function showDiceResult(rollType, diceRoll, modifier, total, ability = '') {
        const overlay = createOverlay();
        const result = document.createElement('div');
        result.className = 'dice-result';
        result.innerHTML = `
            <div class="dice-result-content">
                <h3>${rollType}</h3>
                ${ability ? `<div class="ability-indicator">${ability}</div>` : ''}
                <div class="dice-display">
                    <div class="dice-icon">🎲</div>
                    <div class="dice-breakdown">
                        <div class="dice-roll">${diceRoll}</div>
                        <div class="dice-modifier">${modifier}</div>
                        <div class="dice-total">= ${total}</div>
                    </div>
                </div>
                <div class="roll-interpretation">
                    ${getRollInterpretation(diceRoll, total)}
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
    
    /**
     * Show multiple roll results
     */
    function showMultipleRollResults(results) {
        const overlay = createOverlay();
        const resultContainer = document.createElement('div');
        resultContainer.className = 'multiple-rolls-result';
        
        let resultHtml = `
            <div class="multiple-rolls-content">
                <h3>Proficient Skills Roll Results</h3>
                <div class="results-grid">
        `;
        
        results.forEach(result => {
            resultHtml += `
                <div class="result-item">
                    <div class="result-name">${result.name}</div>
                    <div class="result-dice">🎲 ${result.roll}</div>
                    <div class="result-modifier">${result.modifier}</div>
                    <div class="result-total">${result.total}</div>
                </div>
            `;
        });
        
        resultHtml += `
                </div>
                <button class="fantasy-btn btn-primary close-results">Close</button>
            </div>
        `;
        
        resultContainer.innerHTML = resultHtml;
        overlay.appendChild(resultContainer);
        document.body.appendChild(overlay);
        
        // Setup close handlers
        const closeHandler = () => {
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
        };
        
        resultContainer.querySelector('.close-results').addEventListener('click', closeHandler);
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) closeHandler();
        });
    }
    
    /**
     * Apply configuration settings
     */
    function applyConfiguration() {
        if (!configuration) return;
        
        // Apply theme classes
        if (configuration.skillsTheme && configuration.skillsTheme !== 'classic') {
            skillsContainer.classList.add(`theme-${configuration.skillsTheme}`);
        }
        
        // Apply compact mode
        if (configuration.compactMode) {
            skillsContainer.classList.add('compact-mode');
        }
        
        // Hide/show sections based on configuration
        if (configuration.showCoreSkills === false) {
            const section = skillsContainer.querySelector('.core-skills-section');
            if (section) section.style.display = 'none';
        }
        
        if (configuration.showToolProficiencies === false) {
            const section = skillsContainer.querySelector('.tool-proficiencies-section');
            if (section) section.style.display = 'none';
        }
        
        if (configuration.showWeaponProficiencies === false) {
            const section = skillsContainer.querySelector('.weapon-proficiencies-section');
            if (section) section.style.display = 'none';
        }
        
        if (configuration.showLanguages === false) {
            const section = skillsContainer.querySelector('.languages-section');
            if (section) section.style.display = 'none';
        }
        
        if (configuration.showExpertise === false) {
            const section = skillsContainer.querySelector('.expertise-section');
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
    
    function createTooltip(content) {
        const tooltip = document.createElement('div');
        tooltip.className = 'skills-tooltip';
        tooltip.innerHTML = content;
        tooltip.style.cssText = `
            position: absolute;
            background: linear-gradient(135deg, #2a1f1a, #1a0f0a);
            border: 2px solid #D4AF37;
            border-radius: 8px;
            padding: 1rem;
            color: #DEB887;
            font-family: 'Crimson Text', serif;
            z-index: 1000;
            max-width: 300px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
            pointer-events: none;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.3s ease;
        `;
        return tooltip;
    }
    
    function showTooltip(tooltip, element) {
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        let top = rect.top - tooltipRect.height - 10;
        
        // Ensure tooltip stays within viewport
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        if (top < 10) {
            top = rect.bottom + 10;
        }
        
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
        
        // Animate in
        requestAnimationFrame(() => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(0)';
        });
        
        // Store reference for cleanup
        element._skillsTooltip = tooltip;
    }
    
    function hideTooltips() {
        const tooltips = document.querySelectorAll('.skills-tooltip');
        tooltips.forEach(tooltip => {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateY(10px)';
            setTimeout(() => {
                if (document.body.contains(tooltip)) {
                    document.body.removeChild(tooltip);
                }
            }, 300);
        });
    }
    
    function showSkillTooltip(skillElement) {
        const skillName = skillElement.querySelector('.skill-name').textContent;
        const skillValue = skillElement.querySelector('.skill-value').textContent;
        const skillAbility = skillElement.querySelector('.skill-ability').textContent;
        const isExpertise = skillElement.querySelector('.proficiency-indicator.expertise');
        
        const tooltip = createTooltip(`
            <div class="skill-tooltip">
                <h4>${skillName}</h4>
                <div class="tooltip-stat">Ability: ${skillAbility}</div>
                <div class="tooltip-stat">Modifier: ${skillValue}</div>
                ${isExpertise ? '<div class="tooltip-expertise">Expertise (Double Proficiency)</div>' : ''}
                <div class="tooltip-hint">Click to roll skill check</div>
            </div>
        `);
        
        showTooltip(tooltip, skillElement);
    }
    
    function showToolTooltip(toolElement) {
        const toolName = toolElement.querySelector('.proficiency-name').textContent;
        const toolBonus = toolElement.querySelector('.proficiency-bonus').textContent;
        
        const tooltip = createTooltip(`
            <div class="tool-tooltip">
                <h4>${toolName}</h4>
                <div class="tooltip-stat">Bonus: ${toolBonus}</div>
                <div class="tooltip-hint">Click to roll tool check</div>
            </div>
        `);
        
        showTooltip(tooltip, toolElement);
    }
    
    function setupModalHandlers(overlay) {
        const closeBtn = overlay.querySelector('.close-modal, .close-result, .close-results');
        
        const closeHandler = () => {
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
        };
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeHandler);
        }
        
        // Click outside to close
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeHandler();
            }
        });
        
        // ESC key to close
        const escapeHandler = function(e) {
            if (e.key === 'Escape') {
                closeHandler();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
        
        // Clean up on close
        const originalCloseHandler = closeHandler;
        closeHandler = function() {
            document.removeEventListener('keydown', escapeHandler);
            originalCloseHandler();
        };
        
        return closeHandler;
    }
    
    function setupProficiencyManagerHandlers(overlay, manager) {
        const tabs = manager.querySelectorAll('.tab-btn');
        const tabContents = manager.querySelectorAll('.tab-content');
        const saveBtn = manager.querySelector('.save-proficiencies');
        
        // Tab switching
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.dataset.tab;
                
                // Update active tab
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Update active content
                tabContents.forEach(content => {
                    if (content.dataset.tab === tabName) {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });
        
        // Save functionality
        if (saveBtn) {
            saveBtn.addEventListener('click', function() {
                // Save proficiency changes
                showNotification('Proficiencies updated!', 'success');
                document.body.removeChild(overlay);
            });
        }
    }
    
    function generateSkillManagerList() {
        const skills = ['Athletics', 'Intimidation', 'Perception', 'Religion', 'Acrobatics', 'Animal Handling', 'Arcana', 'Deception', 'History', 'Insight', 'Investigation', 'Medicine'];
        return skills.map(skill => `
            <div class="skill-toggle">
                <span class="skill-name">${skill}</span>
                <button class="toggle-btn" data-skill="${skill}">Toggle</button>
            </div>
        `).join('');
    }
    
    function getWeaponDamage(weaponName) {
        const weaponData = {
            'Dagger': '1d4 piercing',
            'Shortsword': '1d6 piercing',
            'Longsword': '1d8 slashing',
            'Greatsword': '2d6 slashing',
            'Bow': '1d8 piercing',
            'Crossbow': '1d8 piercing'
        };
        return weaponData[weaponName] || '1d6';
    }
    
    function getWeaponProperties(weaponName) {
        const weaponProps = {
            'Dagger': 'Finesse, Light, Thrown',
            'Shortsword': 'Finesse, Light',
            'Longsword': 'Versatile (1d10)',
            'Greatsword': 'Heavy, Two-handed',
            'Bow': 'Ammunition, Two-handed',
            'Crossbow': 'Ammunition, Loading'
        };
        return weaponProps[weaponName] || 'Simple';
    }
    
    function getWeaponWeight(weaponName) {
        const weaponWeights = {
            'Dagger': '1 lb',
            'Shortsword': '2 lbs',
            'Longsword': '3 lbs',
            'Greatsword': '6 lbs',
            'Bow': '2 lbs',
            'Crossbow': '5 lbs'
        };
        return weaponWeights[weaponName] || '1 lb';
    }
    
    function getLanguageScript(languageName) {
        const scripts = {
            'Common': 'Common',
            'Elvish': 'Elvish',
            'Dwarvish': 'Dwarvish',
            'Draconic': 'Draconic',
            'Orcish': 'Dwarvish',
            'Giant': 'Dwarvish'
        };
        return scripts[languageName] || 'Common';
    }
    
    function getLanguageSpeakers(languageName) {
        const speakers = {
            'Common': 'Humans, most races',
            'Elvish': 'Elves, half-elves',
            'Dwarvish': 'Dwarves, gnomes',
            'Draconic': 'Dragons, dragonborn',
            'Orcish': 'Orcs, half-orcs',
            'Giant': 'Giants, goliaths'
        };
        return speakers[languageName] || 'Various races';
    }
    
    function getExpertiseMechanics(expertiseName) {
        const mechanics = {
            'Double Proficiency': 'Add double proficiency bonus to ability checks',
            'Reliable Talent': 'Treat d20 rolls of 9 or lower as 10',
            'Jack of All Trades': 'Add half proficiency bonus to non-proficient checks'
        };
        return mechanics[expertiseName] || 'Special ability with unique mechanics';
    }
    
    function getRollInterpretation(diceRoll, total) {
        let interpretation = '';
        
        if (diceRoll === 1) {
            interpretation = '<span class="critical-fail">💀 Critical Failure!</span>';
        } else if (diceRoll === 20) {
            interpretation = '<span class="critical-success">✨ Critical Success!</span>';
        } else if (total >= 20) {
            interpretation = '<span class="high-success">🎯 Exceptional Success</span>';
        } else if (total >= 15) {
            interpretation = '<span class="success">✓ Success</span>';
        } else if (total >= 10) {
            interpretation = '<span class="partial">~ Partial Success</span>';
        } else {
            interpretation = '<span class="failure">✗ Failure</span>';
        }
        
        return interpretation;
    }
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `skills-notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #2a1f1a, #1a0f0a);
            border: 2px solid #D4AF37;
            border-radius: 8px;
            padding: 1rem 1.5rem;
            color: #DEB887;
            z-index: 10001;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s ease;
        `;
        
        if (type === 'success') {
            notification.style.borderColor = '#32CD32';
            notification.style.color = '#32CD32';
        } else if (type === 'warning') {
            notification.style.borderColor = '#FFA500';
            notification.style.color = '#FFA500';
        } else if (type === 'error') {
            notification.style.borderColor = '#DC143C';
            notification.style.color = '#DC143C';
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        });
        
        // Auto remove
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
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
    
    function setupProficiencyManagerHandlers(overlay, manager) {
        const tabs = manager.querySelectorAll('.tab-btn');
        const contents = manager.querySelectorAll('.tab-content');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetTab = this.dataset.tab;
                
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                
                this.classList.add('active');
                manager.querySelector(`[data-tab="${targetTab}"].tab-content`).classList.add('active');
            });
        });
    }
    
    function showSkillTooltip(skillElement) {
        const skillName = skillElement.querySelector('.skill-name').textContent;
        const skillAbility = skillElement.querySelector('.skill-ability').textContent;
        const skillValue = skillElement.querySelector('.skill-value').textContent;
        const isProficient = skillElement.classList.contains('proficient');
        const isExpertise = skillElement.querySelector('.proficiency-indicator.expertise');
        
        let proficiencyText = 'Not Proficient';
        if (isExpertise) {
            proficiencyText = 'Expertise (Double Proficiency)';
        } else if (isProficient) {
            proficiencyText = 'Proficient';
        }
        
        const tooltip = createTooltip(`
            <div class="skill-tooltip">
                <h4>${skillName} ${skillAbility}</h4>
                <div class="tooltip-stat">Bonus: ${skillValue}</div>
                <div class="tooltip-stat">Status: ${proficiencyText}</div>
                <div class="tooltip-hint">Click to roll skill check</div>
            </div>
        `);
        
        showTooltip(tooltip, skillElement);
    }
    
    function showToolTooltip(toolElement) {
        const toolName = toolElement.querySelector('.proficiency-name').textContent;
        const toolBonus = toolElement.querySelector('.proficiency-bonus').textContent;
        const isProficient = toolElement.classList.contains('proficient');
        
        const tooltip = createTooltip(`
            <div class="tool-tooltip">
                <h4>${toolName}</h4>
                <div class="tooltip-stat">Bonus: ${toolBonus}</div>
                <div class="tooltip-stat">Status: ${isProficient ? 'Proficient' : 'Not Proficient'}</div>
                <div class="tooltip-hint">Click to roll tool check</div>
            </div>
        `);
        
        showTooltip(tooltip, toolElement);
    }
    
    function createTooltip(content) {
        const tooltip = document.createElement('div');
        tooltip.className = 'skills-tooltip';
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
        document.querySelectorAll('.skills-tooltip').forEach(tooltip => {
            if (document.body.contains(tooltip)) {
                document.body.removeChild(tooltip);
            }
        });
    }
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #2a1f1a, #1a0f0a);
            border: 2px solid ${type === 'warning' ? '#FFA500' : '#D4AF37'};
            border-radius: 8px;
            padding: 1rem;
            color: #DEB887;
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
    
    // Data helper functions
    function getWeaponDamage(weaponName) {
        const damages = {
            'Dagger': '1d4 piercing',
            'Javelin': '1d6 piercing',
            'Mace': '1d6 bludgeoning',
            'Quarterstaff': '1d6 bludgeoning',
            'Longsword': '1d8 slashing',
            'Warhammer': '1d8 bludgeoning',
            'Battleaxe': '1d8 slashing',
            'Lance': '1d12 piercing'
        };
        return damages[weaponName] || '1d6';
    }
    
    function getWeaponProperties(weaponName) {
        const properties = {
            'Dagger': 'Finesse, Light, Thrown',
            'Javelin': 'Thrown',
            'Mace': 'Simple',
            'Quarterstaff': 'Versatile',
            'Longsword': 'Versatile',
            'Warhammer': 'Versatile',
            'Battleaxe': 'Versatile',
            'Lance': 'Reach, Special'
        };
        return properties[weaponName] || 'Standard';
    }
    
    function getWeaponWeight(weaponName) {
        const weights = {
            'Dagger': '1 lb.',
            'Javelin': '2 lbs.',
            'Mace': '4 lbs.',
            'Quarterstaff': '4 lbs.',
            'Longsword': '3 lbs.',
            'Warhammer': '2 lbs.',
            'Battleaxe': '4 lbs.',
            'Lance': '6 lbs.'
        };
        return weights[weaponName] || '2 lbs.';
    }
    
    function getLanguageScript(languageName) {
        const scripts = {
            'Common': 'Common Script',
            'Draconic': 'Draconic Script',
            'Celestial': 'Celestial Script',
            'Elvish': 'Elvish Script',
            'Dwarvish': 'Dwarvish Runes'
        };
        return scripts[languageName] || 'Common Script';
    }
    
    function getLanguageSpeakers(languageName) {
        const speakers = {
            'Common': 'Humans, Most Humanoids',
            'Draconic': 'Dragons, Dragonborn, Kobolds',
            'Celestial': 'Angels, Devas, Planetars',
            'Elvish': 'Elves, Half-Elves',
            'Dwarvish': 'Dwarves, Deep Gnomes'
        };
        return speakers[languageName] || 'Various';
    }
    
    function getExpertiseMechanics(expertiseName) {
        const mechanics = {
            'Jack of All Trades': 'Add half your proficiency bonus (rounded down) to any ability check that doesn\'t already include your proficiency bonus.',
            'Reliable Talent': 'Whenever you make an ability check that uses your proficiency bonus, treat a d20 roll of 9 or lower as a 10.',
            'Keen Mind': 'You always know which way is north and the number of hours left before the next sunrise or sunset.'
        };
        return mechanics[expertiseName] || 'Special ability with unique mechanics.';
    }
    
    function getRollInterpretation(diceRoll, total) {
        if (diceRoll === 20) {
            return '<span style="color: #32CD32; font-weight: bold;">Natural 20! Critical Success!</span>';
        } else if (diceRoll === 1) {
            return '<span style="color: #DC143C; font-weight: bold;">Natural 1! Critical Failure!</span>';
        } else if (total >= 20) {
            return '<span style="color: #FFD700;">Exceptional Success!</span>';
        } else if (total >= 15) {
            return '<span style="color: #90EE90;">Great Success!</span>';
        } else if (total >= 10) {
            return '<span style="color: #DEB887;">Moderate Success</span>';
        } else {
            return '<span style="color: #FFA500;">Challenging Result</span>';
        }
    }
    
    function generateSkillManagerList() {
        const skills = [
            'Athletics', 'Acrobatics', 'Animal Handling', 'Arcana', 'Deception',
            'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine',
            'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion',
            'Sleight of Hand', 'Stealth', 'Survival'
        ];
        
        return skills.map(skill => `
            <div class="skill-toggle">
                <input type="checkbox" id="skill-${skill.toLowerCase().replace(/\s+/g, '-')}" />
                <label for="skill-${skill.toLowerCase().replace(/\s+/g, '-')}">${skill}</label>
            </div>
        `).join('');
    }
    
    // Add CSS animations if not already present
    if (!document.querySelector('#skills-proficiencies-animations')) {
        const style = document.createElement('style');
        style.id = 'skills-proficiencies-animations';
        style.textContent = `
            @keyframes skillRoll {
                0%, 100% { transform: scale(1) rotate(0deg); }
                25% { transform: scale(1.05) rotate(-2deg); }
                75% { transform: scale(1.05) rotate(2deg); }
            }
            
            @keyframes toolRoll {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-3px); }
                75% { transform: translateX(3px); }
            }
            
            .dice-result-content, .multiple-rolls-content, 
            .weapon-details-content, .language-details-content, 
            .expertise-details-content, .proficiency-manager-content {
                background: linear-gradient(135deg, #2a1f1a, #1a0f0a);
                border: 3px solid #D4AF37;
                border-radius: 12px;
                padding: 2rem;
                color: #DEB887;
                font-family: 'Crimson Text', serif;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
                max-width: 90vw;
                max-height: 90vh;
                overflow-y: auto;
            }
            
            .dice-result-content h3, .multiple-rolls-content h3,
            .weapon-details-content h3, .language-details-content h3,
            .expertise-details-content h3, .proficiency-manager-content h3 {
                color: #FFD700;
                font-family: 'Cinzel', serif;
                margin-bottom: 1rem;
                text-align: center;
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
            
            .results-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                margin: 1rem 0;
            }
            
            .result-item {
                background: rgba(42, 31, 26, 0.6);
                border: 1px solid #8B4513;
                border-radius: 6px;
                padding: 1rem;
                text-align: center;
            }
            
            .result-name {
                font-weight: bold;
                color: #D4AF37;
                margin-bottom: 0.5rem;
            }
            
            .result-total {
                font-size: 1.2rem;
                font-weight: bold;
                color: #32CD32;
                margin-top: 0.5rem;
            }
        `;
        document.head.appendChild(style);
    }

// Development fallback
if (typeof window !== 'undefined' && !window.SkillsProficienciesFragment) {
    window.SkillsProficienciesFragment = { init: (params) => {
        const defaultExport = arguments.callee.constructor.toString().includes('export default') 
            ? module.exports.default || module.exports 
            : null;
        if (defaultExport) return defaultExport(params);
    }};
}