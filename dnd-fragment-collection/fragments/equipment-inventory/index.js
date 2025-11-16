/**
 * Equipment & Inventory Fragment - Interactive Features
 * D&D-themed equipment management with inventory tracking, weapon stats, and magic items
 */


const equipmentContainer = fragmentElement.querySelector('.equipment-inventory');


// Initialize all interactive features
const cleanupFunctions = [];

initializeEquippedItems();
initializePlayerInventoryDisplay();
initializeInventoryManagement();
initializeCurrencyTracking();
initializeWeaponStats();
initializeMagicItems();
initializeActionButtons();
applyConfiguration();

/**
 * Setup equipped items interactions
 */
function initializeEquippedItems() {
    const equipmentSlots = equipmentContainer.querySelectorAll('.equipment-slot');
    
    equipmentSlots.forEach(slot => {
        const clickHandler = function() {
            showEquipmentDetails(this);
        };
        
        const hoverHandler = function() {
            showEquipmentTooltip(this);
        };
        
        const leaveHandler = function() {
            hideTooltips();
        };
        
        slot.addEventListener('click', clickHandler);
        slot.addEventListener('mouseenter', hoverHandler);
        slot.addEventListener('mouseleave', leaveHandler);
        
        slot.title = 'Click to view equipment details';
        
        cleanupFunctions.push(() => {
            slot.removeEventListener('click', clickHandler);
            slot.removeEventListener('mouseenter', hoverHandler);
            slot.removeEventListener('mouseleave', leaveHandler);
        });
    });
}

    /**
 * Setup inventory management interactions
 */
function initializePlayerInventoryDisplay() {

    const inventoryItems = equipmentContainer.querySelectorAll('.individual-inventory-item');

    inventoryItems.forEach(item => {
        let typeValue = item.querySelector('.item-type').querySelector('span').innerHTML.trim();
        item.classList.add(typeValue);
    });
}

/**
 * Setup inventory management interactions
 */
function initializeInventoryManagement() {
    const inventoryItems = equipmentContainer.querySelectorAll('.inventory-item');
    const emptySlots = equipmentContainer.querySelectorAll('.inventory-slot.empty');
    const sortButton = equipmentContainer.querySelector('.sort-button');
    
    // Inventory item interactions
    inventoryItems.forEach(item => {
        const clickHandler = function() {
            showItemDetails(this);
        };
        
        const hoverHandler = function() {
            showItemTooltip(this);
        };
        
        const leaveHandler = function() {
            hideTooltips();
        };
        
        item.addEventListener('click', clickHandler);
        item.addEventListener('mouseenter', hoverHandler);
        item.addEventListener('mouseleave', leaveHandler);
        
        item.title = 'Click to view item details';
        
        cleanupFunctions.push(() => {
            item.removeEventListener('click', clickHandler);
            item.removeEventListener('mouseenter', hoverHandler);
            item.removeEventListener('mouseleave', leaveHandler);
        });
    });
    
    // Empty slot interactions
    emptySlots.forEach(slot => {
        const clickHandler = function() {
            showAddItemDialog();
        };
        
        slot.addEventListener('click', clickHandler);
        slot.title = 'Click to add new item';
        
        cleanupFunctions.push(() => {
            slot.removeEventListener('click', clickHandler);
        });
    });
    
    // Sort button
    if (sortButton) {
        const sortHandler = function() {
            sortInventory();
        };
        
        sortButton.addEventListener('click', sortHandler);
        
        cleanupFunctions.push(() => {
            sortButton.removeEventListener('click', sortHandler);
        });
    }
    
    // Update weight tracker
    updateWeightTracker();
}

/**
 * Setup currency tracking interactions
 */
function initializeCurrencyTracking() {
    const currencyItems = equipmentContainer.querySelectorAll('.currency-item');
    
    currencyItems.forEach(currency => {
        const clickHandler = function() {
            showCurrencyManager(this);
        };
        
        const hoverHandler = function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.3)';
        };
        
        const leaveHandler = function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        };
        
        currency.addEventListener('click', clickHandler);
        currency.addEventListener('mouseenter', hoverHandler);
        currency.addEventListener('mouseleave', leaveHandler);
        
        currency.title = 'Click to manage currency';
        
        cleanupFunctions.push(() => {
            currency.removeEventListener('click', clickHandler);
            currency.removeEventListener('mouseenter', hoverHandler);
            currency.removeEventListener('mouseleave', leaveHandler);
        });
    });
}

/**
 * Setup weapon statistics interactions
 */
function initializeWeaponStats() {
    const weaponItems = equipmentContainer.querySelectorAll('.weapon-stat-item');
    const weaponActionBtns = equipmentContainer.querySelectorAll('.weapon-action-btn');
    
    weaponItems.forEach(weapon => {
        const hoverHandler = function() {
            this.style.transform = 'translateY(-2px) scale(1.01)';
        };
        
        const leaveHandler = function() {
            this.style.transform = '';
        };
        
        weapon.addEventListener('mouseenter', hoverHandler);
        weapon.addEventListener('mouseleave', leaveHandler);
        
        cleanupFunctions.push(() => {
            weapon.removeEventListener('mouseenter', hoverHandler);
            weapon.removeEventListener('mouseleave', leaveHandler);
        });
    });
    
    weaponActionBtns.forEach(btn => {
        const clickHandler = function(e) {
            e.stopPropagation();
            rollWeaponAttack(this);
        };
        
        btn.addEventListener('click', clickHandler);
        
        cleanupFunctions.push(() => {
            btn.removeEventListener('click', clickHandler);
        });
    });
}

/**
 * Setup magic items interactions
 */
function initializeMagicItems() {
    const magicItems = equipmentContainer.querySelectorAll('.magic-item');
    const magicItemBtns = equipmentContainer.querySelectorAll('.magic-item-btn');
    
    magicItems.forEach(item => {
        const hoverHandler = function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.3)';
        };
        
        const leaveHandler = function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        };
        
        item.addEventListener('mouseenter', hoverHandler);
        item.addEventListener('mouseleave', leaveHandler);
        
        cleanupFunctions.push(() => {
            item.removeEventListener('mouseenter', hoverHandler);
            item.removeEventListener('mouseleave', leaveHandler);
        });
    });
    
    magicItemBtns.forEach(btn => {
        const clickHandler = function(e) {
            e.stopPropagation();
            showMagicItemDetails(this);
        };
        
        btn.addEventListener('click', clickHandler);
        
        cleanupFunctions.push(() => {
            btn.removeEventListener('click', clickHandler);
        });
    });
}

/**
 * Setup action button interactions
 */
function initializeActionButtons() {
    const manageInventoryBtn = equipmentContainer.querySelector('.manage-inventory');
    const calculateValueBtn = equipmentContainer.querySelector('.calculate-value');
    
    if (manageInventoryBtn) {
        const manageHandler = function(e) {
            e.preventDefault();
            showInventoryManager();
        };
        
        manageInventoryBtn.addEventListener('click', manageHandler);
        
        cleanupFunctions.push(() => {
            manageInventoryBtn.removeEventListener('click', manageHandler);
        });
    }
    
    if (calculateValueBtn) {
        const calculateHandler = function(e) {
            e.preventDefault();
            calculateTotalValue();
        };
        
        calculateValueBtn.addEventListener('click', calculateHandler);
        
        cleanupFunctions.push(() => {
            calculateValueBtn.removeEventListener('click', calculateHandler);
        });
    }
}

/**
 * Show equipment details modal
 */
function showEquipmentDetails(equipmentSlot) {
    const slotLabel = equipmentSlot.querySelector('.slot-label').textContent;
    const itemName = equipmentSlot.querySelector('.item-name').textContent;
    const itemStats = equipmentSlot.querySelector('.item-stats').textContent;
    const itemProperties = equipmentSlot.querySelector('.item-properties').textContent;
    
    const overlay = createOverlay();
    const modal = document.createElement('div');
    modal.className = 'equipment-details-modal';
    modal.innerHTML = `
        <div class="equipment-details-content">
            <h3>${itemName}</h3>
            <div class="equipment-slot-info">
                <span class="detail-label">Slot:</span>
                <span class="detail-value">${slotLabel}</span>
            </div>
            <div class="equipment-stats">
                <div class="stat-row">
                    <span class="stat-label">Stats:</span>
                    <span class="stat-value">${itemStats}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Properties:</span>
                    <span class="stat-value">${itemProperties}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Description:</span>
                    <span class="stat-value">${getItemDescription(itemName)}</span>
                </div>
            </div>
            <div class="equipment-actions-modal">
                <button class="fantasy-btn btn-secondary unequip-btn">Unequip</button>
                <button class="fantasy-btn btn-primary close-modal">Close</button>
            </div>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    setupModalHandlers(overlay);
    setupEquipmentModalHandlers(modal);
}

/**
 * Show item details modal
 */
function showItemDetails(inventoryItem) {
    const itemName = inventoryItem.querySelector('.item-name').textContent;
    const itemType = getItemTypeFromClasses(inventoryItem.classList);
    
    const overlay = createOverlay();
    const modal = document.createElement('div');
    modal.className = 'item-details-modal';
    modal.innerHTML = `
        <div class="item-details-content">
            <h3>${itemName}</h3>
            <div class="item-info-grid">
                <div class="info-row">
                    <span class="info-label">Type:</span>
                    <span class="info-value">${itemType}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Weight:</span>
                    <span class="info-value">${getItemWeight(itemName)}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Value:</span>
                    <span class="info-value">${getItemValue(itemName)}</span>
                </div>
                <div class="info-row description">
                    <span class="info-label">Description:</span>
                    <span class="info-value">${getItemDescription(itemName)}</span>
                </div>
            </div>
            <div class="item-actions-modal">
                <button class="fantasy-btn btn-secondary equip-btn">Equip</button>
                <button class="fantasy-btn btn-secondary drop-btn">Drop</button>
                <button class="fantasy-btn btn-primary close-modal">Close</button>
            </div>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    setupModalHandlers(overlay);
    setupItemModalHandlers(modal, itemName);
}

/**
 * Show currency manager modal
 */
function showCurrencyManager(currencyItem) {
    const currencyType = getCurrencyTypeFromClasses(currencyItem.classList);
    const currentAmount = currencyItem.querySelector('.currency-amount').textContent;
    
    const overlay = createOverlay();
    const modal = document.createElement('div');
    modal.className = 'currency-manager-modal';
    modal.innerHTML = `
        <div class="currency-manager-content">
            <h3>Manage ${currencyType}</h3>
            <div class="currency-controls">
                <div class="current-amount">
                    <span class="amount-label">Current Amount:</span>
                    <span class="amount-value">${currentAmount}</span>
                </div>
                <div class="amount-input-group">
                    <label>Add/Remove Amount:</label>
                    <input type="number" class="amount-input" placeholder="Enter amount" />
                </div>
                <div class="currency-quick-actions">
                    <button class="quick-btn add-100" data-amount="100">+100</button>
                    <button class="quick-btn add-50" data-amount="50">+50</button>
                    <button class="quick-btn add-10" data-amount="10">+10</button>
                    <button class="quick-btn remove-10" data-amount="-10">-10</button>
                </div>
            </div>
            <div class="currency-actions-modal">
                <button class="fantasy-btn btn-primary apply-changes">Apply Changes</button>
                <button class="fantasy-btn btn-secondary close-modal">Cancel</button>
            </div>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    setupModalHandlers(overlay);
    setupCurrencyModalHandlers(modal, currencyItem);
}

/**
 * Roll weapon attack with dice
 */
function rollWeaponAttack(actionBtn) {
    const weaponItem = actionBtn.closest('.weapon-stat-item');
    const weaponName = weaponItem.querySelector('.weapon-name').textContent;
    const attackBonus = weaponItem.querySelector('.stat-value').textContent;
    
    // Roll attack
    const attackRoll = Math.floor(Math.random() * 20) + 1;
    const raw = attackBonus.trim();
    const n = parseInt(raw.replace(/[+\-]/g, '')) || 0;
    const modifierValue = raw.includes('-') ? -n : n;
    const attackTotal = attackRoll + modifierValue;
    
    // Roll damage if attack hits (assume AC 15 for demo)
    let damageInfo = '';
    if (attackTotal >= 15) {
        const damageRoll = rollDamage(weaponName);
        damageInfo = `<div class="damage-info">Damage: ${damageRoll}</div>`;
    }
    
    showAttackResult(weaponName, attackRoll, attackBonus, attackTotal, damageInfo);
    
    // Add visual feedback
    actionBtn.style.animation = 'weaponAttack 0.6s ease-in-out';
    setTimeout(() => {
        actionBtn.style.animation = '';
    }, 600);
}

/**
 * Show magic item details modal
 */
function showMagicItemDetails(detailsBtn) {
    const magicItem = detailsBtn.closest('.magic-item');
    const itemName = magicItem.querySelector('.magic-item-name').textContent;
    const itemRarity = magicItem.querySelector('.magic-item-rarity').textContent;
    const itemDescription = magicItem.querySelector('.magic-item-description').textContent;
    
    const overlay = createOverlay();
    const modal = document.createElement('div');
    modal.className = 'magic-item-details-modal';
    modal.innerHTML = `
        <div class="magic-item-details-content">
            <h3>${itemName}</h3>
            <div class="magic-item-header">
                <span class="rarity-badge ${itemRarity.toLowerCase()}">${itemRarity}</span>
                <span class="item-type">Wondrous Item</span>
            </div>
            <div class="magic-item-description-full">
                <p>${itemDescription}</p>
                <div class="item-mechanics">
                    <h4>Mechanical Effects:</h4>
                    <p>${getMagicItemMechanics(itemName)}</p>
                </div>
                <div class="item-lore">
                    <h4>Lore:</h4>
                    <p>${getMagicItemLore(itemName)}</p>
                </div>
            </div>
            <div class="magic-item-actions-modal">
                <button class="fantasy-btn btn-secondary identify-btn">Identify</button>
                <button class="fantasy-btn btn-primary close-modal">Close</button>
            </div>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    setupModalHandlers(overlay);
}

/**
 * Show inventory manager modal
 */
function showInventoryManager() {
    const overlay = createOverlay();
    const modal = document.createElement('div');
    modal.className = 'inventory-manager-modal';
    modal.innerHTML = `
        <div class="inventory-manager-content">
            <h3>Inventory Management</h3>
            <div class="inventory-tabs">
                <button class="tab-btn active" data-tab="organize">Organize</button>
                <button class="tab-btn" data-tab="bulk">Bulk Actions</button>
                <button class="tab-btn" data-tab="settings">Settings</button>
            </div>
            <div class="inventory-manager-body">
                <div class="tab-content active" data-tab="organize">
                    <div class="organize-controls">
                        <button class="organize-btn fantasy-btn btn-secondary">Sort by Type</button>
                        <button class="organize-btn fantasy-btn btn-secondary">Sort by Weight</button>
                        <button class="organize-btn fantasy-btn btn-secondary">Sort by Value</button>
                        <button class="organize-btn fantasy-btn btn-secondary">Sort Alphabetically</button>
                    </div>
                </div>
                <div class="tab-content" data-tab="bulk">
                    <div class="bulk-controls">
                        <button class="bulk-btn fantasy-btn btn-secondary">Drop All Consumables</button>
                        <button class="bulk-btn fantasy-btn btn-secondary">Sell All Misc Items</button>
                        <button class="bulk-btn fantasy-btn btn-secondary">Auto-Sort</button>
                    </div>
                </div>
                <div class="tab-content" data-tab="settings">
                    <div class="settings-controls">
                        <label>
                            <input type="checkbox" /> Auto-pickup valuable items
                        </label>
                        <label>
                            <input type="checkbox" /> Show item values
                        </label>
                        <label>
                            <input type="checkbox" /> Highlight magical items
                        </label>
                    </div>
                </div>
            </div>
            <div class="inventory-manager-actions">
                <button class="fantasy-btn btn-primary save-settings">Save Settings</button>
                <button class="fantasy-btn btn-secondary close-modal">Close</button>
            </div>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    setupModalHandlers(overlay);
    setupInventoryManagerHandlers(modal);
}

/**
 * Calculate total inventory value
 */
function calculateTotalValue() {
    const inventoryItems = equipmentContainer.querySelectorAll('.inventory-item');
    const equippedItems = equipmentContainer.querySelectorAll('.equipped-item');
    const currencyAmounts = equipmentContainer.querySelectorAll('.currency-amount');
    
    let totalValue = 0;
    
    // Calculate currency value in gold
    const platinum = parseInt(currencyAmounts[0]?.textContent || 0) * 10;
    const gold = parseInt(currencyAmounts[1]?.textContent || 0);
    const silver = parseInt(currencyAmounts[2]?.textContent || 0) / 10;
    const copper = parseInt(currencyAmounts[3]?.textContent || 0) / 100;
    
    totalValue += platinum + gold + silver + copper;
    
    // Calculate item values
    inventoryItems.forEach(item => {
        const itemName = item.querySelector('.item-name').textContent;
        const itemValue = parseItemValue(getItemValue(itemName));
        totalValue += itemValue;
    });
    
    equippedItems.forEach(item => {
        const itemName = item.querySelector('.item-name').textContent;
        const itemValue = parseItemValue(getItemValue(itemName));
        totalValue += itemValue;
    });
    
    showValueCalculationResult(totalValue);
}

/**
 * Sort inventory items
 */
function sortInventory() {
    const inventoryGrid = equipmentContainer.querySelector('.inventory-grid');
    const items = Array.from(inventoryGrid.querySelectorAll('.inventory-item'));
    
    // Sort by type, then by name
    items.sort((a, b) => {
        const typeA = getItemTypeFromClasses(a.classList);
        const typeB = getItemTypeFromClasses(b.classList);
        
        if (typeA !== typeB) {
            return typeA.localeCompare(typeB);
        }
        
        const nameA = a.querySelector('.item-name').textContent;
        const nameB = b.querySelector('.item-name').textContent;
        return nameA.localeCompare(nameB);
    });
    
    // Re-append sorted items
    items.forEach(item => {
        inventoryGrid.appendChild(item);
    });
    
    showNotification('Inventory sorted by type and name', 'success');
}

/**
 * Update weight tracker display
 */
function updateWeightTracker() {
    const currentWeight = equipmentContainer.querySelector('.weight-current');
    const maxWeight = equipmentContainer.querySelector('.weight-max');
    const weightFill = equipmentContainer.querySelector('.weight-fill');
    
    if (!currentWeight || !maxWeight || !weightFill) return;
    
    const current = parseInt(currentWeight.textContent) || 0;
    const max = parseInt(maxWeight.textContent) || 1;
    const percentage = Math.max(0, Math.min(100, (current / max) * 100));
    
    weightFill.style.width = percentage + '%';
    
    // Change color based on weight percentage
    if (percentage > 90) {
        weightFill.style.background = 'linear-gradient(90deg, #DC143C 0%, #FF0000 100%)';
    } else if (percentage > 75) {
        weightFill.style.background = 'linear-gradient(90deg, #FF8C00 0%, #FFA500 100%)';
    } else if (percentage > 50) {
        weightFill.style.background = 'linear-gradient(90deg, #FFD700 0%, #FFFF00 100%)';
    } else {
        weightFill.style.background = 'linear-gradient(90deg, #32CD32 0%, #90EE90 100%)';
    }
}

/**
 * Apply configuration settings
 */
function applyConfiguration() {
    if (!configuration) return;
    
    // Apply theme classes
    if (configuration.inventoryTheme && configuration.inventoryTheme !== 'classic') {
        equipmentContainer.classList.add(`theme-${configuration.inventoryTheme}`);
    }
    
    // Apply compact mode
    if (configuration.compactMode) {
        equipmentContainer.classList.add('compact-mode');
    }
    
    // Hide/show sections based on configuration
    if (configuration.showEquippedItems === false) {
        const section = equipmentContainer.querySelector('.equipped-section');
        if (section) section.style.display = 'none';
    }
    
    if (configuration.showInventory === false) {
        const section = equipmentContainer.querySelector('.inventory-section');
        if (section) section.style.display = 'none';
    }
    
    if (configuration.showCurrency === false) {
        const section = equipmentContainer.querySelector('.currency-section');
        if (section) section.style.display = 'none';
    }
    
    if (configuration.showWeaponStats === false) {
        const section = equipmentContainer.querySelector('.weapon-stats-section');
        if (section) section.style.display = 'none';
    }
    
    if (configuration.showMagicItems === false) {
        const section = equipmentContainer.querySelector('.magic-items-section');
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

function setupEquipmentModalHandlers(modal) {
    const unequipBtn = modal.querySelector('.unequip-btn');
    if (unequipBtn) {
        unequipBtn.addEventListener('click', function() {
            showNotification('Item unequipped', 'success');
            document.body.removeChild(modal.closest('.equipment-details-modal').parentElement);
        });
    }
}

function setupItemModalHandlers(modal, itemName) {
    const equipBtn = modal.querySelector('.equip-btn');
    const dropBtn = modal.querySelector('.drop-btn');
    
    if (equipBtn) {
        equipBtn.addEventListener('click', function() {
            showNotification(`${itemName} equipped`, 'success');
            document.body.removeChild(modal.closest('.item-details-modal').parentElement);
        });
    }
    
    if (dropBtn) {
        dropBtn.addEventListener('click', function() {
            showNotification(`${itemName} dropped`, 'warning');
            document.body.removeChild(modal.closest('.item-details-modal').parentElement);
        });
    }
}

function setupCurrencyModalHandlers(modal, currencyItem) {
    const amountInput = modal.querySelector('.amount-input');
    const quickBtns = modal.querySelectorAll('.quick-btn');
    const applyBtn = modal.querySelector('.apply-changes');
    
    quickBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const amount = parseInt(this.dataset.amount);
            amountInput.value = amount;
        });
    });
    
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            const changeAmount = parseInt(amountInput.value) || 0;
            const currentAmountElement = currencyItem.querySelector('.currency-amount');
            const currentAmount = parseInt(currentAmountElement.textContent) || 0;
            const newAmount = Math.max(0, currentAmount + changeAmount);
            
            currentAmountElement.textContent = newAmount.toLocaleString();
            showNotification('Currency updated', 'success');
            document.body.removeChild(modal.closest('.currency-manager-modal').parentElement);
        });
    }
}

function setupInventoryManagerHandlers(modal) {
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

function showEquipmentTooltip(equipmentSlot) {
    const itemName = equipmentSlot.querySelector('.item-name').textContent;
    const itemStats = equipmentSlot.querySelector('.item-stats').textContent;
    const itemProperties = equipmentSlot.querySelector('.item-properties').textContent;
    
    const tooltip = createTooltip(`
        <div class="equipment-tooltip">
            <h4>${itemName}</h4>
            <div class="tooltip-stat">Stats: ${itemStats}</div>
            <div class="tooltip-stat">Properties: ${itemProperties}</div>
            <div class="tooltip-hint">Click for detailed information</div>
        </div>
    `);
    
    showTooltip(tooltip, equipmentSlot);
}

function showItemTooltip(inventoryItem) {
    const itemName = inventoryItem.querySelector('.item-name').textContent;
    const itemType = getItemTypeFromClasses(inventoryItem.classList);
    
    const tooltip = createTooltip(`
        <div class="item-tooltip">
            <h4>${itemName}</h4>
            <div class="tooltip-stat">Type: ${itemType}</div>
            <div class="tooltip-stat">Value: ${getItemValue(itemName)}</div>
            <div class="tooltip-hint">Click for detailed information</div>
        </div>
    `);
    
    showTooltip(tooltip, inventoryItem);
}

function createTooltip(content) {
    const tooltip = document.createElement('div');
    tooltip.className = 'equipment-tooltip';
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
    document.querySelectorAll('.equipment-tooltip').forEach(tooltip => {
        if (document.body.contains(tooltip)) {
            document.body.removeChild(tooltip);
        }
    });
}

function showAttackResult(weaponName, attackRoll, attackBonus, attackTotal, damageInfo) {
    const overlay = createOverlay();
    const result = document.createElement('div');
    result.className = 'attack-result';
    result.innerHTML = `
        <div class="attack-result-content">
            <h3>${weaponName} Attack</h3>
            <div class="attack-display">
                <div class="attack-icon">⚔️</div>
                <div class="attack-breakdown">
                    <div class="attack-roll">d20: ${attackRoll}</div>
                    <div class="attack-modifier">${attackBonus}</div>
                    <div class="attack-total">Total: ${attackTotal}</div>
                </div>
            </div>
            ${damageInfo}
            <div class="attack-interpretation">
                ${getAttackInterpretation(attackRoll, attackTotal)}
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

function showValueCalculationResult(totalValue) {
    const overlay = createOverlay();
    const result = document.createElement('div');
    result.className = 'value-calculation-result';
    result.innerHTML = `
        <div class="value-calculation-content">
            <h3>Total Inventory Value</h3>
            <div class="value-display">
                <div class="value-icon">💰</div>
                <div class="value-amount">${Math.round(totalValue).toLocaleString()} gp</div>
            </div>
            <div class="value-breakdown">
                <div class="breakdown-item">Equipment Value: ${Math.round(totalValue * 0.7).toLocaleString()} gp</div>
                <div class="breakdown-item">Currency Value: ${Math.round(totalValue * 0.3).toLocaleString()} gp</div>
            </div>
            <button class="fantasy-btn btn-primary close-result">Close</button>
        </div>
    `;
    
    overlay.appendChild(result);
    document.body.appendChild(overlay);
    
    // Auto close after 5 seconds or on click
    const closeHandler = () => {
        if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
        }
    };
    
    result.querySelector('.close-result').addEventListener('click', closeHandler);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeHandler();
    });
    
    setTimeout(closeHandler, 5000);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #2a1f1a, #1a0f0a);
        border: 2px solid ${type === 'warning' ? '#FFA500' : type === 'success' ? '#32CD32' : '#D4AF37'};
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

function showAddItemDialog() {
    const overlay = createOverlay();
    const dialog = document.createElement('div');
    dialog.className = 'add-item-dialog';
    dialog.innerHTML = `
        <div class="add-item-content">
            <h3>Add New Item</h3>
            <div class="add-item-form">
                <div class="form-group">
                    <label>Item Name:</label>
                    <input type="text" class="item-name-input" placeholder="Enter item name" />
                </div>
                <div class="form-group">
                    <label>Item Type:</label>
                    <select class="item-type-select">
                        <option value="weapon">Weapon</option>
                        <option value="consumable">Consumable</option>
                        <option value="tool">Tool</option>
                        <option value="misc">Misc</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Weight (lbs):</label>
                    <input type="number" class="item-weight-input" placeholder="0" min="0" step="0.1" />
                </div>
            </div>
            <div class="add-item-actions">
                <button class="fantasy-btn btn-primary add-item-confirm">Add Item</button>
                <button class="fantasy-btn btn-secondary close-modal">Cancel</button>
            </div>
        </div>
    `;
    
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    
    setupModalHandlers(overlay);
    
    const confirmBtn = dialog.querySelector('.add-item-confirm');
    confirmBtn.addEventListener('click', function() {
        const itemName = dialog.querySelector('.item-name-input').value;
        if (itemName.trim()) {
            showNotification(`${itemName} added to inventory`, 'success');
        }
        document.body.removeChild(overlay);
    });
}

// Data helper functions
function getItemDescription(itemName) {
    const descriptions = {
        'Dragonbane Longsword +2': 'A magical longsword imbued with draconic energy, dealing extra damage to dragons.',
        'Shield of Faith +1': 'A blessed shield that provides divine protection to its wielder.',
        'Plate Mail of Resilience': 'Heavy armor crafted with magical reinforcement, providing exceptional protection.',
        'Ring of Protection': 'A magical ring that creates a protective barrier around the wearer.',
        'Cloak of Elvenkind': 'A mystical cloak woven by elves, granting supernatural stealth abilities.',
        'Boots of Speed': 'Enchanted boots that allow the wearer to move with incredible swiftness.',
        'Potion of Healing': 'A magical elixir that restores health when consumed.',
        'Composite Longbow': 'A well-crafted bow designed for long-range accuracy and power.',
        'Thieves\' Tools': 'A set of specialized tools for picking locks and disabling traps.',
        'Scroll of Fireball': 'A magical scroll containing the Fireball spell.',
        'Ruby (500gp)': 'A precious gemstone of exceptional quality and value.',
        'Everburning Torch': 'A magical torch that burns eternally without consuming fuel.',
        'Rations': 'Preserved food suitable for long journeys.',
        'Spellbook': 'A bound tome containing arcane knowledge and spell formulas.'
    };
    return descriptions[itemName] || 'A valuable item with unknown properties.';
}

function getItemValue(itemName) {
    const values = {
        'Dragonbane Longsword +2': '8,000 gp',
        'Shield of Faith +1': '2,000 gp',
        'Plate Mail of Resilience': '5,000 gp',
        'Ring of Protection': '3,500 gp',
        'Cloak of Elvenkind': '1,200 gp',
        'Boots of Speed': '4,000 gp',
        'Potion of Healing': '50 gp',
        'Composite Longbow': '100 gp',
        'Thieves\' Tools': '25 gp',
        'Scroll of Fireball': '150 gp',
        'Ruby (500gp)': '500 gp',
        'Everburning Torch': '110 gp',
        'Rations': '2 gp',
        'Spellbook': '50 gp'
    };
    return values[itemName] || '10 gp';
}

function getItemWeight(itemName) {
    const weights = {
        'Potion of Healing': '0.5 lbs',
        'Composite Longbow': '2 lbs',
        'Thieves\' Tools': '1 lb',
        'Scroll of Fireball': '0 lbs',
        'Ruby (500gp)': '0 lbs',
        'Everburning Torch': '1 lb',
        'Rations': '2 lbs',
        'Spellbook': '3 lbs'
    };
    return weights[itemName] || '1 lb';
}

function getItemTypeFromClasses(classList) {
    if (classList.contains('weapon')) return 'Weapon';
    if (classList.contains('consumable')) return 'Consumable';
    if (classList.contains('tool')) return 'Tool';
    if (classList.contains('misc')) return 'Miscellaneous';
    return 'Item';
}

function getCurrencyTypeFromClasses(classList) {
    if (classList.contains('platinum')) return 'Platinum';
    if (classList.contains('gold')) return 'Gold';
    if (classList.contains('silver')) return 'Silver';
    if (classList.contains('copper')) return 'Copper';
    return 'Currency';
}

function getMagicItemMechanics(itemName) {
    const mechanics = {
        'Ring of Protection': 'Requires attunement. While wearing this ring, you gain a +1 bonus to AC and saving throws.',
        'Cloak of Elvenkind': 'Requires attunement. While wearing this cloak with its hood up, Wisdom (Perception) checks made to see you have disadvantage, and you have advantage on Dexterity (Stealth) checks.',
        'Boots of Speed': 'Requires attunement. As a bonus action, you can click the boot\'s heels together. If you do, the boots double your walking speed, and any creature that makes an opportunity attack against you has disadvantage on the attack roll. This effect lasts for 10 minutes and can\'t be used again until you finish a long rest.'
    };
    return mechanics[itemName] || 'Special magical properties with unique mechanical effects.';
}

function getMagicItemLore(itemName) {
    const lore = {
        'Ring of Protection': 'Forged by ancient dwarven smiths and blessed by celestial beings, this ring has protected countless heroes throughout the ages.',
        'Cloak of Elvenkind': 'Woven from spider silk and moonbeams by the master weavers of the Feywild, this cloak carries the blessing of the forest spirits.',
        'Boots of Speed': 'Created by a legendary artificer who sought to outrun the wind itself, these boots have carried their wearers across countless battlefields.'
    };
    return lore[itemName] || 'This item has a rich history shrouded in mystery and legend.';
}

function rollDamage(weaponName) {
    const damages = {
        'Dragonbane Longsword +2': () => Math.floor(Math.random() * 8) + 1 + 6,
        'Composite Longbow': () => Math.floor(Math.random() * 8) + 1 + 2
    };
    
    const rollFn = damages[weaponName];
    if (rollFn) {
        return rollFn() + ' damage';
    }
    return '1d6 damage';
}

function parseItemValue(valueString) {
    const match = valueString.match(/(\d+(?:,\d+)*)\s*gp/);
    if (match) {
        return parseInt(match[1].replace(/,/g, ''));
    }
    return 0;
}

function getAttackInterpretation(attackRoll, attackTotal) {
    if (attackRoll === 20) {
        return '<span style="color: #32CD32; font-weight: bold;">Critical Hit! Roll damage twice!</span>';
    } else if (attackRoll === 1) {
        return '<span style="color: #DC143C; font-weight: bold;">Critical Miss! Something went wrong!</span>';
    } else if (attackTotal >= 20) {
        return '<span style="color: #FFD700;">Excellent attack! Likely to hit most targets!</span>';
    } else if (attackTotal >= 15) {
        return '<span style="color: #90EE90;">Good attack! Should hit moderate armor!</span>';
    } else if (attackTotal >= 10) {
        return '<span style="color: #DEB887;">Decent attack against light armor</span>';
    } else {
        return '<span style="color: #FFA500;">Weak attack, unlikely to penetrate armor</span>';
    }
}

// Add CSS animations if not already present
if (!document.querySelector('#equipment-inventory-animations')) {
    const style = document.createElement('style');
    style.id = 'equipment-inventory-animations';
    style.textContent = `
        @keyframes weaponAttack {
            0%, 100% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.1) rotate(-5deg); }
            75% { transform: scale(1.1) rotate(5deg); }
        }
        
        .equipment-details-content, .item-details-content, .currency-manager-content,
        .magic-item-details-content, .inventory-manager-content, .attack-result-content,
        .value-calculation-content, .add-item-content {
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
        
        .equipment-details-content h3, .item-details-content h3,
        .currency-manager-content h3, .magic-item-details-content h3,
        .inventory-manager-content h3, .attack-result-content h3,
        .value-calculation-content h3, .add-item-content h3 {
            color: #FFD700;
            font-family: 'Cinzel', serif;
            margin-bottom: 1rem;
            text-align: center;
        }
        
        .attack-display, .value-display {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin: 1.5rem 0;
        }
        
        .attack-icon, .value-icon {
            font-size: 3rem;
            animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
        
        .attack-breakdown, .value-amount {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
        }
        
        .attack-total, .value-amount {
            font-size: 1.5rem;
            font-weight: bold;
            color: #32CD32;
            border-top: 2px solid #8B4513;
            padding-top: 0.5rem;
        }
        
        .equipment-inventory .tab-btn {
            background: rgba(42, 31, 26, 0.6);
            border: 1px solid #8B4513;
            color: #DEB887;
            padding: 0.5rem 1rem;
            cursor: pointer;
            border-radius: 4px 4px 0 0;
        }
        
        .equipment-inventory .tab-btn.active {
            background: rgba(212, 175, 55, 0.2);
            border-color: #D4AF37;
            color: #FFD700;
        }
        
        .equipment-inventory .tab-content {
            display: none;
            padding: 1rem;
            border: 1px solid #8B4513;
            border-top: none;
            background: rgba(42, 31, 26, 0.4);
        }
        
        .equipment-inventory .tab-content.active {
            display: block;
        }
    `;
    document.head.appendChild(style);
}
