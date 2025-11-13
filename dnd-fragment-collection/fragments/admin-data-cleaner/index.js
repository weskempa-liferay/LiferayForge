// Admin Data Cleaner - Clear test data from Liferay Objects
(function() {
  
  // Collections to clear in order
  const COLLECTIONS = [
    { name: 'quests', endpoint: '/o/c/quests/', statusId: 'status-quests', label: 'Quests' },
    { name: 'inventoryitems', endpoint: '/o/c/inventoryitems/', statusId: 'status-inventory', label: 'Inventory Items' },
    { name: 'playeractions', endpoint: '/o/c/playeractions/', statusId: 'status-actions', label: 'Player Actions' },
    { name: 'characters', endpoint: '/o/c/characters/', statusId: 'status-characters', label: 'Characters' }
  ];
  
  // Initialize
  function init() {
    const clearBtn = document.getElementById('clear-all-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', handleClearAll);
    }
  }
  
  // Main handler for clearing all data
  async function handleClearAll() {
    const confirmed = confirm(
      '⚠️ WARNING: This will permanently delete ALL test data from the system!\n\n' +
      'This includes:\n' +
      '• All Quests\n' +
      '• All Inventory Items\n' +
      '• All Player Actions (DM Chat logs)\n' +
      '• All Characters\n\n' +
      'This action cannot be undone. Are you sure?'
    );
    
    if (!confirmed) return;
    
    // Double confirmation
    const doubleConfirm = confirm('Are you ABSOLUTELY sure? This is your last chance to cancel.');
    if (!doubleConfirm) return;
    
    const clearBtn = document.getElementById('clear-all-btn');
    const progressInfo = document.getElementById('progress-info');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    // Disable button and show progress
    clearBtn.disabled = true;
    progressInfo.style.display = 'block';
    
    let completedCount = 0;
    const totalCount = COLLECTIONS.length;
    
    try {
      for (const collection of COLLECTIONS) {
        updateStatus(collection.statusId, 'processing', 'Processing...');
        progressText.textContent = `Clearing ${collection.label}...`;
        
        try {
          await clearCollection(collection);
          updateStatus(collection.statusId, 'complete', 'Cleared ✓');
          completedCount++;
        } catch (error) {
          console.error(`Error clearing ${collection.name}:`, error);
          updateStatus(collection.statusId, 'error', 'Error ✗');
        }
        
        // Update progress bar
        const progress = (completedCount / totalCount) * 100;
        progressFill.style.width = `${progress}%`;
      }
      
      progressText.textContent = 'All data cleared successfully!';
      alert('✓ All test data has been cleared from the system.');
      
      // Reset after 3 seconds
      setTimeout(() => {
        resetUI();
      }, 3000);
      
    } catch (error) {
      console.error('Error during data clearing:', error);
      progressText.textContent = 'Error occurred during clearing';
      alert('⚠️ An error occurred. Check console for details.');
      clearBtn.disabled = false;
    }
  }
  
  // Clear a single collection
  async function clearCollection(collection) {
    // Step 1: Fetch all IDs
    const response = await Liferay.Util.fetch(
      `${collection.endpoint}?fields=id&pageSize=100`,
      {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${collection.name}: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      console.log(`No items to delete in ${collection.name}`);
      return;
    }
    
    // Step 2: Prepare batch delete payload
    const deletePayload = data.items.map(item => ({ id: item.id }));
    
    // Step 3: Batch delete
    const deleteResponse = await Liferay.Util.fetch(
      `${collection.endpoint}batch`,
      {
        method: 'DELETE',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(deletePayload)
      }
    );
    
    if (!deleteResponse.ok) {
      throw new Error(`Failed to delete ${collection.name}: ${deleteResponse.status}`);
    }
    
    console.log(`Successfully cleared ${deletePayload.length} items from ${collection.name}`);
  }
  
  // Update collection status display
  function updateStatus(statusId, statusClass, text) {
    const statusElement = document.getElementById(statusId);
    if (statusElement) {
      statusElement.className = `collection-status ${statusClass}`;
      statusElement.textContent = text;
    }
  }
  
  // Reset UI to initial state
  function resetUI() {
    COLLECTIONS.forEach(collection => {
      updateStatus(collection.statusId, '', 'Ready');
    });
    
    const clearBtn = document.getElementById('clear-all-btn');
    const progressInfo = document.getElementById('progress-info');
    const progressFill = document.getElementById('progress-fill');
    
    if (clearBtn) clearBtn.disabled = false;
    if (progressInfo) progressInfo.style.display = 'none';
    if (progressFill) progressFill.style.width = '0%';
  }
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();
