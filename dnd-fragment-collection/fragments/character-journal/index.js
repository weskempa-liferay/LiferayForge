/**
 * Character Journal Fragment - Interactive Features
 * D&D-themed character journal with backstory, personality, goals, sessions, and relationships
 */

//'use strict';

const journalContainer = fragmentElement.querySelector('.character-journal');
if (!journalContainer) {
    console.warn('Character journal container not found');
}

// Initialize all interactive features
const cleanupFunctions = [];

initializeBackstory();
initializePersonality();
initializeGoals();
initializeSessionNotes();
initializeRelationships();
initializeActionButtons();
applyConfiguration();

/**
 * Setup backstory interactions
 */
function initializeBackstory() {
        const expandBackstoryBtn = journalContainer.querySelector('.expand-backstory-btn');
        const backstoryDetails = journalContainer.querySelector('.backstory-details');
        
        if (expandBackstoryBtn && backstoryDetails) {
            let isExpanded = false;
            
            const expandHandler = function() {
                isExpanded = !isExpanded;
                
                if (isExpanded) {
                    backstoryDetails.style.display = 'flex';
                    backstoryDetails.style.animation = 'sessionExpand 0.3s ease-in-out';
                    this.textContent = 'Show Less';
                } else {
                    backstoryDetails.style.display = 'none';
                    this.textContent = 'Read More';
                }
            };
            
            expandBackstoryBtn.addEventListener('click', expandHandler);
            
            cleanupFunctions.push(() => {
                expandBackstoryBtn.removeEventListener('click', expandHandler);
            });
        }
    }
    
    /**
     * Setup personality trait interactions
     */
    function initializePersonality() {
        const personalityItems = journalContainer.querySelectorAll('.trait-item, .ideal-item, .bond-item, .flaw-item');
        
        personalityItems.forEach(item => {
            const clickHandler = function() {
                showPersonalityDetails(this);
            };
            
            const hoverHandler = function() {
                this.style.transform = 'translateX(8px) scale(1.02)';
                this.style.boxShadow = '0 2px 8px rgba(222, 184, 135, 0.3)';
            };
            
            const leaveHandler = function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            };
            
            item.addEventListener('click', clickHandler);
            item.addEventListener('mouseenter', hoverHandler);
            item.addEventListener('mouseleave', leaveHandler);
            
            item.title = 'Click to view details and edit';
            
            cleanupFunctions.push(() => {
                item.removeEventListener('click', clickHandler);
                item.removeEventListener('mouseenter', hoverHandler);
                item.removeEventListener('mouseleave', leaveHandler);
            });
        });
    }
    
    /**
     * Setup goals interactions
     */
    function initializeGoals() {
        const goalItems = journalContainer.querySelectorAll('.goal-item');
        
        goalItems.forEach(goal => {
            const clickHandler = function() {
                showGoalDetails(this);
            };
            
            const hoverHandler = function() {
                this.style.transform = 'translateY(-3px) scale(1.01)';
                this.style.boxShadow = '0 4px 15px rgba(222, 184, 135, 0.3)';
            };
            
            const leaveHandler = function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            };
            
            goal.addEventListener('click', clickHandler);
            goal.addEventListener('mouseenter', hoverHandler);
            goal.addEventListener('mouseleave', leaveHandler);
            
            goal.title = 'Click to update progress and details';
            
            cleanupFunctions.push(() => {
                goal.removeEventListener('click', clickHandler);
                goal.removeEventListener('mouseenter', hoverHandler);
                goal.removeEventListener('mouseleave', leaveHandler);
            });
        });
    }
    
    /**
     * Setup session notes interactions
     */
    function initializeSessionNotes() {
        const addSessionBtn = journalContainer.querySelector('.add-session-btn');
        const sessionFilterSelect = journalContainer.querySelector('.session-filter-select');
        const sessionEntries = journalContainer.querySelectorAll('.session-entry');
        const expandSessionBtns = journalContainer.querySelectorAll('.expand-session-btn');
        
        // Add session button
        if (addSessionBtn) {
            const addHandler = function() {
                showAddSessionDialog();
            };
            
            addSessionBtn.addEventListener('click', addHandler);
            
            cleanupFunctions.push(() => {
                addSessionBtn.removeEventListener('click', addHandler);
            });
        }
        
        // Session filter
        if (sessionFilterSelect) {
            const filterHandler = function() {
                filterSessions(this.value);
            };
            
            sessionFilterSelect.addEventListener('change', filterHandler);
            
            cleanupFunctions.push(() => {
                sessionFilterSelect.removeEventListener('change', filterHandler);
            });
        }
        
        // Session entry interactions
        sessionEntries.forEach(session => {
            const clickHandler = function() {
                showSessionDetails(this);
            };
            
            session.addEventListener('click', clickHandler);
            session.title = 'Click to view full session details';
            
            cleanupFunctions.push(() => {
                session.removeEventListener('click', clickHandler);
            });
        });
        
        // Expand session buttons
        expandSessionBtns.forEach(btn => {
            const expandHandler = function(e) {
                e.stopPropagation();
                toggleSessionDetails(this);
            };
            
            btn.addEventListener('click', expandHandler);
            
            cleanupFunctions.push(() => {
                btn.removeEventListener('click', expandHandler);
            });
        });
    }
    
    /**
     * Setup relationship interactions
     */
    function initializeRelationships() {
        const relationshipItems = journalContainer.querySelectorAll('.relationship-item');
        const relationshipDetailsBtns = journalContainer.querySelectorAll('.relationship-details-btn');
        
        // Relationship item interactions
        relationshipItems.forEach(item => {
            const clickHandler = function() {
                showRelationshipOverview(this);
            };
            
            const hoverHandler = function() {
                this.style.transform = 'translateY(-3px) scale(1.01)';
                this.style.boxShadow = '0 4px 15px rgba(222, 184, 135, 0.3)';
            };
            
            const leaveHandler = function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            };
            
            item.addEventListener('click', clickHandler);
            item.addEventListener('mouseenter', hoverHandler);
            item.addEventListener('mouseleave', leaveHandler);
            
            item.title = 'Click to view relationship overview';
            
            cleanupFunctions.push(() => {
                item.removeEventListener('click', clickHandler);
                item.removeEventListener('mouseenter', hoverHandler);
                item.removeEventListener('mouseleave', leaveHandler);
            });
        });
        
        // Relationship details buttons
        relationshipDetailsBtns.forEach(btn => {
            const detailsHandler = function(e) {
                e.stopPropagation();
                showRelationshipDetails(this);
            };
            
            btn.addEventListener('click', detailsHandler);
            
            cleanupFunctions.push(() => {
                btn.removeEventListener('click', detailsHandler);
            });
        });
    }
    
    /**
     * Setup action button interactions
     */
    function initializeActionButtons() {
        const editJournalBtn = journalContainer.querySelector('.edit-journal');
        const exportJournalBtn = journalContainer.querySelector('.export-journal');
        
        if (editJournalBtn) {
            const editHandler = function(e) {
                e.preventDefault();
                showJournalEditor();
            };
            
            editJournalBtn.addEventListener('click', editHandler);
            
            cleanupFunctions.push(() => {
                editJournalBtn.removeEventListener('click', editHandler);
            });
        }
        
        if (exportJournalBtn) {
            const exportHandler = function(e) {
                e.preventDefault();
                showExportOptions();
            };
            
            exportJournalBtn.addEventListener('click', exportHandler);
            
            cleanupFunctions.push(() => {
                exportJournalBtn.removeEventListener('click', exportHandler);
            });
        }
    }
    
    /**
     * Utility Functions
     */
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(3px);
        `;
        return overlay;
    }
    
    function setupModalHandlers(overlay) {
        const closeBtn = overlay.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                if (overlay.parentNode) {
                    document.body.removeChild(overlay);
                }
            });
        }
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                if (overlay.parentNode) {
                    document.body.removeChild(overlay);
                }
            }
        });
    }
    
    function getPersonalityType(element) {
        if (element.classList.contains('trait-item')) return 'Trait';
        if (element.classList.contains('ideal-item')) return 'Ideal';
        if (element.classList.contains('bond-item')) return 'Bond';
        if (element.classList.contains('flaw-item')) return 'Flaw';
        return 'Personality Item';
    }
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#32CD32' : type === 'error' ? '#DC143C' : '#DEB887'};
            color: ${type === 'success' ? '#1a0f0f' : '#FFF'};
            border-radius: 6px;
            z-index: 10001;
            font-family: 'Crimson Text', serif;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.3s ease-in-out;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease-in-out';
                setTimeout(() => {
                    if (notification.parentNode) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 3000);
    }
    
    function sanitizeInput(input) {
        if (typeof input !== 'string') return '';
        return input.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                   .replace(/<[^>]*>/g, '')
                   .trim();
    }
    
    function getCurrentDate() {
        return new Date().toISOString().split('T')[0];
    }
    
    function getNextSessionNumber() {
        const sessions = journalContainer.querySelectorAll('.session-entry .session-number');
        let maxNumber = 0;
        sessions.forEach(session => {
            const number = parseInt(session.textContent.replace('Session #', '')) || 0;
            if (number > maxNumber) maxNumber = number;
        });
        return maxNumber + 1;
    }
    
    /**
     * Show personality trait details
     */
    function showPersonalityDetails(personalityItem) {
        const text = personalityItem.textContent.trim();
        const type = getPersonalityType(personalityItem);
        
        const overlay = createOverlay();
        const modal = document.createElement('div');
        modal.className = 'personality-details-modal';
        modal.innerHTML = `
            <div class="personality-details-content">
                <h3>${type} Details</h3>
                <div class="personality-form">
                    <div class="form-group">
                        <label>Description:</label>
                        <textarea class="personality-text" rows="3">${text}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Notes:</label>
                        <textarea class="personality-notes" rows="2" placeholder="Add personal notes about this ${type.toLowerCase()}..."></textarea>
                    </div>
                    <div class="form-group">
                        <label>Influence Level:</label>
                        <select class="influence-select">
                            <option value="low">Low - Rarely affects decisions</option>
                            <option value="medium" selected>Medium - Sometimes influences actions</option>
                            <option value="high">High - Strongly drives behavior</option>
                        </select>
                    </div>
                </div>
                <div class="personality-details-actions">
                    <button class="fantasy-btn btn-primary save-personality">Save Changes</button>
                    <button class="fantasy-btn btn-secondary close-modal">Cancel</button>
                </div>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        setupModalHandlers(overlay);
        
        const saveBtn = modal.querySelector('.save-personality');
        saveBtn.addEventListener('click', function() {
            const newText = sanitizeInput(modal.querySelector('.personality-text').value);
            if (newText) {
                personalityItem.textContent = newText;
                showNotification(`${type} updated successfully`, 'success');
            }
            if (overlay.parentNode) {
                document.body.removeChild(overlay);
            }
        });
    }
    
    /**
     * Show goal details and progress
     */
    function showGoalDetails(goalItem) {
        const goalText = goalItem.querySelector('.goal-text').textContent.trim();
        const progressText = goalItem.querySelector('.progress-text').textContent;
        const currentProgress = parseInt(progressText.replace('%', '')) || 0;
        
        const overlay = createOverlay();
        const modal = document.createElement('div');
        modal.className = 'goal-details-modal';
        modal.innerHTML = `
            <div class="goal-details-content">
                <h3>Goal Management</h3>
                <div class="goal-form">
                    <div class="form-group">
                        <label>Goal Description:</label>
                        <textarea class="goal-text" rows="3">${goalText}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Progress: <span class="progress-display">${currentProgress}%</span></label>
                        <input type="range" class="progress-slider" min="0" max="100" value="${currentProgress}" />
                    </div>
                    <div class="form-group">
                        <label>Target Date:</label>
                        <input type="date" class="target-date" />
                    </div>
                    <div class="form-group">
                        <label>Notes:</label>
                        <textarea class="goal-notes" rows="3" placeholder="Add progress notes, obstacles, next steps..."></textarea>
                    </div>
                </div>
                <div class="goal-details-actions">
                    <button class="fantasy-btn btn-primary save-goal">Update Goal</button>
                    <button class="fantasy-btn btn-secondary close-modal">Cancel</button>
                </div>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        setupModalHandlers(overlay);
        setupGoalModalHandlers(modal, goalItem);
    }
    
    /**
     * Setup goal modal handlers
     */
    function setupGoalModalHandlers(modal, goalItem) {
        const progressSlider = modal.querySelector('.progress-slider');
        const progressDisplay = modal.querySelector('.progress-display');
        const saveBtn = modal.querySelector('.save-goal');
        
        // Update progress display when slider changes
        if (progressSlider && progressDisplay) {
            progressSlider.addEventListener('input', function() {
                progressDisplay.textContent = this.value + '%';
            });
        }
        
        // Save goal changes
        if (saveBtn) {
            saveBtn.addEventListener('click', function() {
                const newText = sanitizeInput(modal.querySelector('.goal-text').value);
                const newProgress = parseInt(progressSlider.value);
                const targetDate = modal.querySelector('.target-date').value;
                const notes = sanitizeInput(modal.querySelector('.goal-notes').value);
                
                if (newText) {
                    // Update goal text
                    const goalTextElement = goalItem.querySelector('.goal-text');
                    if (goalTextElement) {
                        goalTextElement.textContent = newText;
                    }
                    
                    // Update progress bar and text
                    const progressFill = goalItem.querySelector('.progress-fill');
                    const progressText = goalItem.querySelector('.progress-text');
                    if (progressFill && progressText) {
                        progressFill.style.width = newProgress + '%';
                        progressText.textContent = newProgress + '%';
                        
                        // Add animation class
                        progressFill.parentElement.classList.add('progress-updating');
                        setTimeout(() => {
                            progressFill.parentElement.classList.remove('progress-updating');
                        }, 500);
                    }
                    
                    // Store additional data (in real app, would save to backend)
                    goalItem.dataset.targetDate = targetDate;
                    goalItem.dataset.notes = notes;
                    
                    showNotification('Goal updated successfully!', 'success');
                } else {
                    showNotification('Goal description is required', 'error');
                }
                
                const overlay = modal.closest('.modal-overlay');
                if (overlay && overlay.parentNode) {
                    document.body.removeChild(overlay);
                }
            });
        }
    }
    
    /**
     * Show add session dialog
     */
    function showAddSessionDialog() {
        const overlay = createOverlay();
        const modal = document.createElement('div');
        modal.className = 'add-session-modal';
        modal.innerHTML = `
            <div class="add-session-content">
                <h3>Add New Session</h3>
                <div class="session-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Session Number:</label>
                            <input type="number" class="session-number" value="${getNextSessionNumber()}" />
                        </div>
                        <div class="form-group">
                            <label>Date:</label>
                            <input type="date" class="session-date" value="${getCurrentDate()}" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Location:</label>
                        <input type="text" class="session-location" placeholder="Where did the session take place?" />
                    </div>
                    <div class="form-group">
                        <label>Tags:</label>
                        <div class="tag-checkboxes">
                            <label><input type="checkbox" value="important" /> Important</label>
                            <label><input type="checkbox" value="combat" /> Combat</label>
                            <label><input type="checkbox" value="social" /> Social</label>
                            <label><input type="checkbox" value="investigation" /> Investigation</label>
                            <label><input type="checkbox" value="family" /> Family</label>
                            <label><input type="checkbox" value="downtime" /> Downtime</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Session Summary:</label>
                        <textarea class="session-summary" rows="4" placeholder="Describe what happened in this session..."></textarea>
                    </div>
                    <div class="form-group">
                        <label>XP Gained:</label>
                        <input type="number" class="session-xp" placeholder="0" />
                    </div>
                </div>
                <div class="add-session-actions">
                    <button class="fantasy-btn btn-primary save-session">Add Session</button>
                    <button class="fantasy-btn btn-secondary close-modal">Cancel</button>
                </div>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        setupModalHandlers(overlay);
        setupAddSessionHandlers(modal);
    }
    
    /**
     * Show session details modal
     */
    function showSessionDetails(sessionEntry) {
        const sessionNumber = sessionEntry.querySelector('.session-number').textContent.trim();
        const sessionDate = sessionEntry.querySelector('.session-date').textContent.trim();
        const sessionLocation = sessionEntry.querySelector('.session-location').textContent.trim();
        const sessionSummary = sessionEntry.querySelector('.session-summary').textContent.trim();
        const sessionTags = Array.from(sessionEntry.querySelectorAll('.session-tag')).map(tag => tag.textContent.trim());
        
        const overlay = createOverlay();
        const modal = document.createElement('div');
        modal.className = 'session-details-modal';
        modal.innerHTML = `
            <div class="session-details-content">
                <h3>Session Details - ${sessionNumber}</h3>
                <div class="session-details-tabs">
                    <button class="tab-btn active" data-tab="overview">Overview</button>
                    <button class="tab-btn" data-tab="edit">Edit</button>
                    <button class="tab-btn" data-tab="notes">Notes</button>
                </div>
                <div class="session-details-body">
                    <div class="tab-content active" data-tab="overview">
                        <div class="session-info-grid">
                            <div class="info-item">
                                <label>Date:</label>
                                <span>${sessionDate}</span>
                            </div>
                            <div class="info-item">
                                <label>Location:</label>
                                <span>${sessionLocation}</span>
                            </div>
                            <div class="info-item">
                                <label>Tags:</label>
                                <span>${sessionTags.join(', ')}</span>
                            </div>
                        </div>
                        <div class="session-summary-display">
                            <h4>Summary:</h4>
                            <p>${sessionSummary}</p>
                        </div>
                    </div>
                    <div class="tab-content" data-tab="edit">
                        <div class="form-group">
                            <label>Summary:</label>
                            <textarea class="edit-summary" rows="5">${sessionSummary}</textarea>
                        </div>
                        <div class="form-group">
                            <label>Location:</label>
                            <input type="text" class="edit-location" value="${sessionLocation}" />
                        </div>
                    </div>
                    <div class="tab-content" data-tab="notes">
                        <textarea class="session-notes" rows="8" placeholder="Add additional notes about this session..."></textarea>
                    </div>
                </div>
                <div class="session-details-actions">
                    <button class="fantasy-btn btn-primary save-session-changes">Save Changes</button>
                    <button class="fantasy-btn btn-danger delete-session">Delete Session</button>
                    <button class="fantasy-btn btn-secondary close-modal">Close</button>
                </div>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        setupModalHandlers(overlay);
        setupSessionDetailsHandlers(modal, sessionEntry);
    }
    
    /**
     * Setup add session modal handlers
     */
    function setupAddSessionHandlers(modal) {
        const saveBtn = modal.querySelector('.save-session');
        const tagCheckboxes = modal.querySelectorAll('.tag-checkboxes input[type="checkbox"]');
        
        saveBtn.addEventListener('click', function() {
            const sessionNumber = modal.querySelector('.session-number').value;
            const sessionDate = modal.querySelector('.session-date').value;
            const sessionLocation = sanitizeInput(modal.querySelector('.session-location').value);
            const sessionSummary = sanitizeInput(modal.querySelector('.session-summary').value);
            const sessionXp = modal.querySelector('.session-xp').value || '0';
            
            // Get selected tags
            const selectedTags = [];
            tagCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    selectedTags.push(checkbox.value);
                }
            });
            
            if (!sessionSummary.trim()) {
                showNotification('Session summary is required', 'error');
                return;
            }
            
            // Create new session entry
            const sessionList = journalContainer.querySelector('.session-list');
            const newSession = createSessionEntry({
                number: sessionNumber,
                date: sessionDate,
                location: sessionLocation,
                summary: sessionSummary,
                tags: selectedTags,
                xp: sessionXp
            });
            
            sessionList.insertBefore(newSession, sessionList.firstChild);
            
            // Reinitialize session interactions for the new entry
            initializeNewSessionEntry(newSession);
            
            showNotification(`Session #${sessionNumber} added successfully!`, 'success');
            
            const overlay = modal.closest('.modal-overlay');
            if (overlay && overlay.parentNode) {
                document.body.removeChild(overlay);
            }
        });
    }
    
    /**
     * Create new session entry HTML
     */
    function createSessionEntry(sessionData) {
        const session = document.createElement('div');
        session.className = 'session-entry';
        if (sessionData.tags.includes('important')) {
            session.classList.add('important');
        }
        
        const tagsHtml = sessionData.tags.map(tag => 
            `<span class="session-tag ${tag}">${tag.charAt(0).toUpperCase() + tag.slice(1)}</span>`
        ).join('');
        
        session.innerHTML = `
            <div class="session-header">
                <div class="session-info">
                    <span class="session-number">Session #${sessionData.number}</span>
                    <span class="session-date">${sessionData.date}</span>
                    <span class="session-location">${sessionData.location}</span>
                </div>
                <div class="session-tags">
                    ${tagsHtml}
                </div>
            </div>
            <div class="session-content">
                <div class="session-summary">${sessionData.summary}</div>
                <div class="session-details">
                    <div class="session-detail">
                        <span class="detail-label">XP Gained:</span>
                        <span class="detail-value">${sessionData.xp} XP</span>
                    </div>
                </div>
            </div>
            <button class="expand-session-btn" title="Expand Session Details">⬇️</button>
        `;
        
        return session;
    }
    
    /**
     * Initialize interactions for a new session entry
     */
    function initializeNewSessionEntry(sessionEntry) {
        const clickHandler = function() {
            showSessionDetails(this);
        };
        
        const expandBtn = sessionEntry.querySelector('.expand-session-btn');
        const expandHandler = function(e) {
            e.stopPropagation();
            toggleSessionDetails(this);
        };
        
        sessionEntry.addEventListener('click', clickHandler);
        if (expandBtn) {
            expandBtn.addEventListener('click', expandHandler);
        }
        
        sessionEntry.title = 'Click to view full session details';
        
        cleanupFunctions.push(() => {
            sessionEntry.removeEventListener('click', clickHandler);
            if (expandBtn) {
                expandBtn.removeEventListener('click', expandHandler);
            }
        });
    }
    
    /**
     * Toggle session details expansion
     */
    function toggleSessionDetails(expandBtn) {
        const sessionEntry = expandBtn.closest('.session-entry');
        const sessionDetails = sessionEntry.querySelector('.session-details');
        
        if (sessionDetails.style.display === 'flex' || sessionDetails.classList.contains('expanded')) {
            sessionDetails.style.display = 'none';
            sessionDetails.classList.remove('expanded');
            expandBtn.textContent = '⬇️';
            expandBtn.title = 'Expand Session Details';
        } else {
            sessionDetails.style.display = 'flex';
            sessionDetails.classList.add('expanded');
            sessionDetails.style.animation = 'sessionExpand 0.3s ease-in-out';
            expandBtn.textContent = '⬆️';
            expandBtn.title = 'Collapse Session Details';
        }
    }
    
    /**
     * Filter sessions based on selected criteria
     */
    function filterSessions(filterValue) {
        const sessionEntries = journalContainer.querySelectorAll('.session-entry');
        
        sessionEntries.forEach(session => {
            let shouldShow = true;
            
            switch (filterValue) {
                case 'recent':
                    const allSessions = Array.from(sessionEntries);
                    const sessionIndex = allSessions.indexOf(session);
                    shouldShow = sessionIndex < 5;
                    break;
                case 'important':
                    shouldShow = session.classList.contains('important') || 
                                session.querySelector('.session-tag.important');
                    break;
                case 'all':
                default:
                    shouldShow = true;
                    break;
            }
            
            if (shouldShow) {
                session.style.display = 'block';
                session.style.animation = 'sessionExpand 0.3s ease-in-out';
            } else {
                session.style.display = 'none';
            }
        });
        
        showNotification(`Showing ${filterValue === 'all' ? 'all' : filterValue} sessions`, 'info');
    }
    
    /**
     * Show relationship overview
     */
    function showRelationshipOverview(relationshipItem) {
        const name = relationshipItem.querySelector('.relationship-name').textContent;
        const note = relationshipItem.querySelector('.relationship-note').textContent;
        
        const overlay = createOverlay();
        const modal = document.createElement('div');
        modal.className = 'relationship-overview-modal';
        modal.innerHTML = `
            <div class="relationship-details-content">
                <h3>${name} - Relationship Overview</h3>
                <div class="relationship-overview">
                    <p><strong>Current Note:</strong></p>
                    <p>${note}</p>
                    <div class="relationship-actions">
                        <button class="fantasy-btn btn-primary edit-relationship">Edit Details</button>
                        <button class="fantasy-btn btn-secondary view-history">View History</button>
                        <button class="fantasy-btn btn-secondary close-modal">Close</button>
                    </div>
                </div>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        setupModalHandlers(overlay);
        
        // Setup edit button
        const editBtn = modal.querySelector('.edit-relationship');
        editBtn.addEventListener('click', () => {
            document.body.removeChild(overlay);
            showRelationshipDetails(relationshipItem.querySelector('.relationship-details-btn'));
        });
    }
    
    /**
     * Show relationship details
     */
    function showRelationshipDetails(detailsBtn) {
        const relationshipItem = detailsBtn.closest('.relationship-item');
        const name = relationshipItem.querySelector('.relationship-name').textContent;
        const role = relationshipItem.querySelector('.relationship-role').textContent;
        const status = relationshipItem.querySelector('.status-value').textContent;
        const note = relationshipItem.querySelector('.relationship-note').textContent;
        
        const overlay = createOverlay();
        const modal = document.createElement('div');
        modal.className = 'relationship-details-modal';
        modal.innerHTML = `
            <div class="relationship-details-content">
                <h3>${name}</h3>
                <div class="relationship-form">
                    <div class="form-group">
                        <label>Role/Occupation:</label>
                        <input type="text" class="relationship-role-input" value="${role}" />
                    </div>
                    <div class="form-group">
                        <label>Relationship Status:</label>
                        <select class="relationship-status-select">
                            <option value="ally" ${status.toLowerCase() === 'ally' || status.toLowerCase().includes('ally') ? 'selected' : ''}>Ally</option>
                            <option value="friend" ${status.toLowerCase().includes('friend') ? 'selected' : ''}>Friend</option>
                            <option value="mentor" ${status.toLowerCase() === 'mentor' ? 'selected' : ''}>Mentor</option>
                            <option value="enemy" ${status.toLowerCase() === 'enemy' ? 'selected' : ''}>Enemy</option>
                            <option value="family" ${status.toLowerCase() === 'family' ? 'selected' : ''}>Family</option>
                            <option value="neutral" ${status.toLowerCase() === 'neutral' ? 'selected' : ''}>Neutral</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Relationship Notes:</label>
                        <textarea class="relationship-note-input" rows="4">${note}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Trust Level:</label>
                        <input type="range" class="trust-slider" min="1" max="10" value="5" />
                        <span class="trust-display">5/10</span>
                    </div>
                    <div class="form-group">
                        <label>Last Interaction:</label>
                        <input type="date" class="last-interaction" />
                    </div>
                </div>
                <div class="relationship-details-actions">
                    <button class="fantasy-btn btn-primary save-relationship">Update Relationship</button>
                    <button class="fantasy-btn btn-secondary close-modal">Close</button>
                </div>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        setupModalHandlers(overlay);
        setupRelationshipDetailsHandlers(modal, relationshipItem);
    }
    
    /**
     * Show journal editor
     */
    function showJournalEditor() {
        const overlay = createOverlay();
        const modal = document.createElement('div');
        modal.className = 'journal-editor-modal';
        modal.innerHTML = `
            <div class="journal-editor-content">
                <h3>Journal Editor</h3>
                <div class="editor-tabs">
                    <button class="tab-btn active" data-tab="quick">Quick Edit</button>
                    <button class="tab-btn" data-tab="backstory">Backstory</button>
                    <button class="tab-btn" data-tab="personality">Personality</button>
                    <button class="tab-btn" data-tab="goals">Goals</button>
                </div>
                <div class="editor-body">
                    <div class="tab-content active" data-tab="quick">
                        <div class="quick-edit-content">
                            <p>Choose a section to edit, or use the other tabs for detailed editing.</p>
                            <div class="quick-actions">
                                <button class="quick-btn fantasy-btn btn-secondary">Add New Goal</button>
                                <button class="quick-btn fantasy-btn btn-secondary">Add Personality Trait</button>
                                <button class="quick-btn fantasy-btn btn-secondary">Update Backstory</button>
                            </div>
                        </div>
                    </div>
                    <div class="tab-content" data-tab="backstory">
                        <div class="backstory-edit">
                            <textarea class="backstory-editor" rows="8" placeholder="Write your character's backstory..."></textarea>
                        </div>
                    </div>
                    <div class="tab-content" data-tab="personality">
                        <div class="personality-edit">
                            <p>Edit personality traits, ideals, bonds, and flaws.</p>
                        </div>
                    </div>
                    <div class="tab-content" data-tab="goals">
                        <div class="goals-edit">
                            <p>Manage short-term and long-term goals.</p>
                        </div>
                    </div>
                </div>
                <div class="journal-editor-actions">
                    <button class="fantasy-btn btn-primary save-journal">Save All Changes</button>
                    <button class="fantasy-btn btn-secondary close-modal">Close</button>
                </div>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        setupModalHandlers(overlay);
        setupJournalEditorHandlers(modal);
    }
    
    /**
     * Show export options
     */
    function showExportOptions() {
        const overlay = createOverlay();
        const modal = document.createElement('div');
        modal.className = 'export-options-modal';
        modal.innerHTML = `
            <div class="export-options-content">
                <h3>Export Journal</h3>
                <div class="export-options">
                    <div class="export-option">
                        <input type="radio" name="export-format" value="pdf" id="export-pdf" checked />
                        <label for="export-pdf">PDF Document</label>
                        <p>Complete character journal as a formatted PDF</p>
                    </div>
                    <div class="export-option">
                        <input type="radio" name="export-format" value="json" id="export-json" />
                        <label for="export-json">JSON Data</label>
                        <p>Raw data for importing into other applications</p>
                    </div>
                    <div class="export-option">
                        <input type="radio" name="export-format" value="text" id="export-text" />
                        <label for="export-text">Plain Text</label>
                        <p>Simple text format for easy sharing</p>
                    </div>
                </div>
                <div class="export-sections">
                    <h4>Sections to Include:</h4>
                    <div class="section-checkboxes">
                        <label><input type="checkbox" value="backstory" checked /> Backstory</label>
                        <label><input type="checkbox" value="personality" checked /> Personality</label>
                        <label><input type="checkbox" value="goals" checked /> Goals</label>
                        <label><input type="checkbox" value="sessions" checked /> Session Notes</label>
                        <label><input type="checkbox" value="relationships" checked /> Relationships</label>
                    </div>
                </div>
                <div class="export-options-actions">
                    <button class="fantasy-btn btn-primary export-journal">Export</button>
                    <button class="fantasy-btn btn-secondary close-modal">Cancel</button>
                </div>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        setupModalHandlers(overlay);
        
        const exportBtn = modal.querySelector('.export-journal');
        exportBtn.addEventListener('click', function() {
            performExport(modal);
            document.body.removeChild(overlay);
        });
    }
    
    /**
     * Apply configuration settings
     */
    function applyConfiguration() {
        if (!configuration) return;
        
        // Apply theme classes
        if (configuration.journalTheme && configuration.journalTheme !== 'classic') {
            journalContainer.classList.add(`theme-${configuration.journalTheme}`);
        }
        
        // Apply compact mode
        if (configuration.compactMode) {
            journalContainer.classList.add('compact-mode');
        }
        
        // Hide/show sections based on configuration
        if (configuration.showBackstory === false) {
            const section = journalContainer.querySelector('.backstory-section');
            if (section) section.style.display = 'none';
        }
        
        if (configuration.showPersonality === false) {
            const section = journalContainer.querySelector('.personality-section');
            if (section) section.style.display = 'none';
        }
        
        if (configuration.showGoals === false) {
            const section = journalContainer.querySelector('.goals-section');
            if (section) section.style.display = 'none';
        }
        
        if (configuration.showSessionNotes === false) {
            const section = journalContainer.querySelector('.session-notes-section');
            if (section) section.style.display = 'none';
        }
        
        if (configuration.showRelationships === false) {
            const section = journalContainer.querySelector('.relationships-section');
            if (section) section.style.display = 'none';
        }
    }
    
    function setupSessionDetailsHandlers(modal, sessionEntry) {
        const tabs = modal.querySelectorAll('.tab-btn');
        const contents = modal.querySelectorAll('.tab-content');
        const saveBtn = modal.querySelector('.save-session-changes');
        const deleteBtn = modal.querySelector('.delete-session');
        
        // Tab switching functionality
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetTab = this.dataset.tab;
                
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                
                this.classList.add('active');
                modal.querySelector(`[data-tab="${targetTab}"].tab-content`).classList.add('active');
            });
        });
        
        // Save changes functionality
        if (saveBtn) {
            saveBtn.addEventListener('click', function() {
                const newSummary = sanitizeInput(modal.querySelector('.edit-summary').value);
                const newLocation = sanitizeInput(modal.querySelector('.edit-location').value);
                const newNotes = sanitizeInput(modal.querySelector('.session-notes').value);
                
                if (newSummary) {
                    // Update session entry in DOM
                    const summaryElement = sessionEntry.querySelector('.session-summary');
                    const locationElement = sessionEntry.querySelector('.session-location');
                    
                    if (summaryElement) summaryElement.textContent = newSummary;
                    if (locationElement) locationElement.textContent = newLocation;
                    
                    // Store notes data
                    sessionEntry.dataset.notes = newNotes;
                    
                    showNotification('Session updated successfully!', 'success');
                    
                    const overlay = modal.closest('.modal-overlay');
                    if (overlay && overlay.parentNode) {
                        document.body.removeChild(overlay);
                    }
                } else {
                    showNotification('Session summary is required', 'error');
                }
            });
        }
        
        // Delete session functionality
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function() {
                if (confirm('Are you sure you want to delete this session? This action cannot be undone.')) {
                    sessionEntry.remove();
                    showNotification('Session deleted successfully', 'success');
                    
                    const overlay = modal.closest('.modal-overlay');
                    if (overlay && overlay.parentNode) {
                        document.body.removeChild(overlay);
                    }
                }
            });
        }
    }
    
    function setupRelationshipDetailsHandlers(modal, relationshipItem) {
        const trustSlider = modal.querySelector('.trust-slider');
        const trustDisplay = modal.querySelector('.trust-display');
        const saveBtn = modal.querySelector('.save-relationship');
        
        // Update trust display when slider changes
        if (trustSlider && trustDisplay) {
            trustSlider.addEventListener('input', function() {
                trustDisplay.textContent = this.value + '/10';
            });
        }
        
        // Save relationship changes
        if (saveBtn) {
            saveBtn.addEventListener('click', function() {
                const role = sanitizeInput(modal.querySelector('.relationship-role-input').value);
                const status = modal.querySelector('.relationship-status-select').value;
                const note = sanitizeInput(modal.querySelector('.relationship-note-input').value);
                const trust = trustSlider ? trustSlider.value : '5';
                const lastInteraction = modal.querySelector('.last-interaction').value;
                
                if (role && note) {
                    // Update the relationship item
                    const roleElement = relationshipItem.querySelector('.relationship-role');
                    const statusElement = relationshipItem.querySelector('.status-value');
                    const noteElement = relationshipItem.querySelector('.relationship-note');
                    
                    if (roleElement) roleElement.textContent = role;
                    if (statusElement) {
                        statusElement.textContent = status.charAt(0).toUpperCase() + status.slice(1);
                        statusElement.className = `status-value ${status}`;
                    }
                    if (noteElement) noteElement.textContent = note;
                    
                    // Update relationship item border color based on status
                    relationshipItem.className = relationshipItem.className.replace(/\b(ally|mentor|enemy|family|neutral)\b/g, '');
                    relationshipItem.classList.add(status);
                    
                    // Store additional data
                    relationshipItem.dataset.trust = trust;
                    relationshipItem.dataset.lastInteraction = lastInteraction;
                    
                    showNotification('Relationship updated successfully!', 'success');
                } else {
                    showNotification('Role and notes are required', 'error');
                }
                
                const overlay = modal.closest('.modal-overlay');
                if (overlay && overlay.parentNode) {
                    document.body.removeChild(overlay);
                }
            });
        }
    }
    
    function setupJournalEditorHandlers(modal) {
        const tabs = modal.querySelectorAll('.tab-btn');
        const contents = modal.querySelectorAll('.tab-content');
        const saveBtn = modal.querySelector('.save-journal');
        const quickBtns = modal.querySelectorAll('.quick-btn');
        
        // Tab switching functionality
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetTab = this.dataset.tab;
                
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                
                this.classList.add('active');
                modal.querySelector(`[data-tab="${targetTab}"].tab-content`).classList.add('active');
            });
        });
        
        // Quick action buttons
        quickBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.textContent.toLowerCase();
                if (action.includes('goal')) {
                    showNotification('Goal creation form would open here', 'info');
                } else if (action.includes('trait')) {
                    showNotification('Personality trait form would open here', 'info');
                } else if (action.includes('backstory')) {
                    showNotification('Backstory editor would open here', 'info');
                }
            });
        });
        
        // Save all changes
        if (saveBtn) {
            saveBtn.addEventListener('click', function() {
                const backstoryText = modal.querySelector('.backstory-editor').value;
                
                // In a real implementation, this would update the actual journal sections
                if (backstoryText && backstoryText.trim()) {
                    // Update the actual backstory section
                    const backstorySummary = journalContainer.querySelector('.backstory-text');
                    if (backstorySummary) {
                        backstorySummary.textContent = backstoryText.trim();
                    }
                }
                
                showNotification('Journal changes saved successfully!', 'success');
                
                const overlay = modal.closest('.modal-overlay');
                if (overlay && overlay.parentNode) {
                    document.body.removeChild(overlay);
                }
            });
        }
    }
    
    function performExport(modal) {
        const format = modal.querySelector('input[name="export-format"]:checked').value;
        const sections = Array.from(modal.querySelectorAll('.section-checkboxes input:checked')).map(cb => cb.value);
        
        showNotification(`Exporting journal as ${format.toUpperCase()} with ${sections.length} sections`, 'success');
        
        // In a real implementation, this would generate and download the file
        setTimeout(() => {
            showNotification('Export completed! Check your downloads.', 'success');
        }, 2000);
    }
    
    // Add CSS animations if not already present
    if (!document.querySelector('#character-journal-animations')) {
        const style = document.createElement('style');
        style.id = 'character-journal-animations';
        style.textContent = `
            .personality-details-content, .goal-details-content, .add-session-content,
            .session-details-content, .relationship-details-content, .journal-editor-content,
            .export-options-content {
                background: linear-gradient(135deg, #2d1b1b, #1a0f0f);
                border: 3px solid #DEB887;
                border-radius: 12px;
                padding: 2rem;
                color: #F5DEB3;
                font-family: 'Crimson Text', serif;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
                max-width: 90vw;
                max-height: 90vh;
                overflow-y: auto;
            }
            
            .personality-details-content h3, .goal-details-content h3,
            .add-session-content h3, .session-details-content h3,
            .relationship-details-content h3, .journal-editor-content h3,
            .export-options-content h3 {
                color: #DEB887;
                font-family: 'Cinzel', serif;
                margin-bottom: 1rem;
                text-align: center;
            }
            
            .form-group {
                margin-bottom: 1rem;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                font-family: 'Cinzel', serif;
                color: #DEB887;
                font-weight: bold;
            }
            
            .form-group input, .form-group textarea, .form-group select {
                width: 100%;
                padding: 0.75rem;
                background: rgba(45, 27, 27, 0.6);
                border: 1px solid #CD853F;
                border-radius: 4px;
                color: #F5DEB3;
                font-family: 'Crimson Text', serif;
                font-size: 0.9rem;
            }
            
            .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }
            
            .character-journal .tab-btn {
                background: rgba(45, 27, 27, 0.6);
                border: 1px solid #CD853F;
                color: #F5DEB3;
                padding: 0.5rem 1rem;
                cursor: pointer;
                border-radius: 4px 4px 0 0;
            }
            
            .character-journal .tab-btn.active {
                background: rgba(222, 184, 135, 0.2);
                border-color: #DEB887;
                color: #DEB887;
            }
            
            .character-journal .tab-content {
                display: none;
                padding: 1rem;
                border: 1px solid #CD853F;
                border-top: none;
                background: rgba(45, 27, 27, 0.4);
            }
            
            .character-journal .tab-content.active {
                display: block;
            }
        `;
        document.head.appendChild(style);
    }
}