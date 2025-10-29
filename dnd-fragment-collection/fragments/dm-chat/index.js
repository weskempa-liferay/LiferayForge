// DM Chat Interactive Features
(function() {
  //'use strict';

  // Chat state management
  let chatHistory = [];
  let isWaitingForResponse = false;
  let selectedCharacterId = null;

  // Initialize chat functionality
  function initDMChat() {
    const dmChat = document.querySelector('.dm-chat');
    if (!dmChat) return;

    const chatInput = dmChat.querySelector('#dm-chat-input');
    const sendButton = dmChat.querySelector('#dm-send-button');
    const chatLog = dmChat.querySelector('#dm-chat-log');
    const loadingIndicator = dmChat.querySelector('#dm-loading');
    const charCount = dmChat.querySelector('#char-count');
    const characterSelect = dmChat.querySelector('#character-select');
    
    if (!chatInput || !sendButton || !chatLog) return;

    // Load user's characters
    loadUserCharacters();

    // Character selection handler
    if (characterSelect) {
      characterSelect.addEventListener('change', function() {
        selectedCharacterId = this.value ? parseInt(this.value) : null;
        console.log('Selected character ID:', selectedCharacterId);
      });
    }

    // Input character counting
    chatInput.addEventListener('input', function() {
      const count = this.value.length;
      if (charCount) {
        charCount.textContent = count;
        charCount.style.color = count > 450 ? '#ff6b6b' : '#8B6F47';
      }
    });

    // Send message on button click
    sendButton.addEventListener('click', function() {
      sendMessage();
    });

    // Send message on Enter key
    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    // Quick action buttons
    const quickButtons = dmChat.querySelectorAll('.quick-btn');
    quickButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const question = this.getAttribute('data-question');
        if (question && chatInput) {
          chatInput.value = question;
          chatInput.focus();
        }
      });
    });

    // Chat actions
    const clearButton = dmChat.querySelector('#clear-chat');
    const exportButton = dmChat.querySelector('#export-chat');
    
    if (clearButton) {
      clearButton.addEventListener('click', clearChat);
    }
    
    if (exportButton) {
      exportButton.addEventListener('click', exportChat);
    }

    // Send message function
    function sendMessage() {
      const message = chatInput.value.trim();
      if (!message || isWaitingForResponse) return;

      // Check if character is selected
      if (!selectedCharacterId) {
        alert('Please select a character before sending a message.');
        return;
      }

      let playerMessage = Liferay.Util.fetch('/o/c/playeractions', {
        method: 'POST',
        headers: {
                                        'Content-Type': 'application/json' 
        },
        body: JSON.stringify(
          {
            "r_userToPlayerAction_userId": Liferay.ThemeDisplay.getUserId(),
            "message": message,
            "characterID": selectedCharacterId
          }
        ),
      }).then(response => response.json())
        .then(data => {
          console.log(data)
          getDMResponse(data);
        })
        .catch(error => {
          console.error('Error fetching DM response:', error);
        });

      // Clear input
      chatInput.value = '';
      if (charCount) charCount.textContent = '0';
      
      //Show loading and get AI response
      showLoading(true);

      // Add user message to chat
      addMessageToChat('user', message);
    }

    // Add message to chat display
    function addMessageToChat(sender, message, timestamp = null) {
      const messageTime = timestamp || new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      
      const messageElement = document.createElement('div');
      messageElement.className = `message ${sender}-message`;
      
      const avatar = sender === 'dm' ? '🧙‍♂️' : '⚔️';
      const senderName = sender === 'dm' ? 'Dungeon Master' : 'You';
      
      messageElement.innerHTML = `
        <div class="message-avatar">
          <span class="avatar-icon">${avatar}</span>
        </div>
        <div class="message-content">
          <div class="message-header">
            <span class="sender-name">${senderName}</span>
            <span class="message-time">${messageTime}</span>
          </div>
          <div class="message-text">${escapeHtml(message)}</div>
        </div>
      `;
      
      chatLog.appendChild(messageElement);
      scrollToBottom();
      
      // Store in history
      chatHistory.push({
        sender: sender,
        message: message,
        timestamp: messageTime
      });
    }

    // Get AI DM response
    
    async function getDMResponse(userMessage) {
      isWaitingForResponse = true;
      updateSendButton();
      
      try {
        // This is where OpenAI integration would be implemented
        // For now, we'll simulate an AI response
        //const response = await simulateDMResponse(userMessage);
          
        let responseCheck = setInterval(() => {
          Liferay.Util.fetch('/o/c/playeractions/'+userMessage.id, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json' 
              }
            }
          ).then(response => response.json())
          .then(data => {

            if(data.response && data.response.trim() !== "") {
                clearInterval(responseCheck);
                showLoading(false);
                addMessageToChat('dm', data.response.trim(), new Date(data.dateModified).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                }));
                isWaitingForResponse = false;
                updateSendButton();
              }
            }

          )
          .catch(error => {
            console.error('Error fetching DM response:', error);
            clearInterval(responseCheck);
            showLoading(false);
            addMessageToChat('dm', "Apologies, adventurer. I seem to be having trouble accessing my magical knowledge at the moment. Please try your question again.");
            isWaitingForResponse = false;
            updateSendButton();
          });
            
        }, 3000); // Check every 3 seconds

        /*
        setTimeout(() => {
          showLoading(false);
          addMessageToChat('dm', response);
          isWaitingForResponse = false;
          updateSendButton();
        }, 1500 + Math.random() * 2000); // Simulate thinking time
        */
        
      } catch (error) {
        console.error('Error getting DM response:', error);
        showLoading(false);
        addMessageToChat('dm', "Apologies, adventurer. I seem to be having trouble accessing my magical knowledge at the moment. Please try your question again.");
        isWaitingForResponse = false;
        updateSendButton();
      }
    }
    

    // Simulate AI DM response (placeholder for OpenAI integration)
    /*
    async function simulateDMResponse(userMessage) {
      const responses = {
        rules: [
          "According to D&D 5e rules, you can move up to your speed and take one action on your turn. Actions include Attack, Cast a Spell, Dash, Disengage, Dodge, Help, Hide, Ready, Search, or Use an Object.",
          "Remember that opportunity attacks occur when you move out of an enemy's reach without taking the Disengage action first.",
          "For ability checks, you roll a d20 and add your relevant ability modifier plus your proficiency bonus if you're proficient in that skill."
        ],
        lore: [
          "The Forgotten Realms is a vast world filled with ancient magic and forgotten kingdoms. The city of Waterdeep stands as a beacon of civilization on the Sword Coast.",
          "Dragons in D&D are categorized by color and type - chromatic dragons tend to be evil while metallic dragons are typically good. Each has unique breath weapons and abilities.",
          "The Weave is the source of all magic in the Realms, overseen by Mystra, the goddess of magic. When spellcasters use magic, they tap into this mystical force."
        ],
        advice: [
          "Consider your party's composition when making decisions. A balanced approach often works best, but sometimes bold action is required.",
          "Don't forget to use your character's unique abilities and background features - they often provide creative solutions to problems.",
          "Remember that D&D is about collaborative storytelling. The most memorable moments often come from unexpected character interactions and creative problem-solving."
        ],
        default: [
          "That's an interesting question, adventurer. Could you provide more specific details so I can give you the most helpful guidance?",
          "Let me consult my magical tomes... Could you elaborate on your situation or question?",
          "As your DM, I want to help you have the best adventure possible. What specific aspect would you like me to address?"
        ]
      };

      const message = userMessage.toLowerCase();
      let responseArray = responses.default;
      
      if (message.includes('rule') || message.includes('mechanic') || message.includes('how do')) {
        responseArray = responses.rules;
      } else if (message.includes('lore') || message.includes('story') || message.includes('world') || message.includes('history')) {
        responseArray = responses.lore;
      } else if (message.includes('advice') || message.includes('help') || message.includes('should') || message.includes('what if')) {
        responseArray = responses.advice;
      }
      
      return responseArray[Math.floor(Math.random() * responseArray.length)];
    }
  */

    // Show/hide loading indicator
    function showLoading(show) {
      if (loadingIndicator) {
        loadingIndicator.style.display = show ? 'block' : 'none';
      }
    }

    // Update send button state
    function updateSendButton() {
      sendButton.disabled = isWaitingForResponse;
      sendButton.style.opacity = isWaitingForResponse ? '0.6' : '1';
    }

    // Scroll chat to bottom
    function scrollToBottom() {
      chatLog.scrollTop = chatLog.scrollHeight;
    }

    // Clear chat history
    function clearChat() {
      if (confirm('Are you sure you want to clear the chat history?')) {
        chatHistory = [];
        
        // Keep only the welcome message
        const welcomeMessage = chatLog.querySelector('.welcome-message');
        chatLog.innerHTML = '';
        if (welcomeMessage) {
          chatLog.appendChild(welcomeMessage);
        }
      }
    }

    // Export chat history
    function exportChat() {
      if (chatHistory.length === 0) {
        alert('No chat history to export.');
        return;
      }
      
      const chatText = chatHistory.map(entry => 
        `[${entry.timestamp}] ${entry.sender === 'dm' ? 'DM' : 'Player'}: ${entry.message}`
      ).join('\n');
      
      const blob = new Blob([chatText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dm-chat-log-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    // Utility function to escape HTML
    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    // Status indicator management
    function updateStatus(online = true) {
      const statusIndicator = dmChat.querySelector('.status-indicator');
      const statusText = dmChat.querySelector('.status-text');
      
      if (statusIndicator && statusText) {
        statusIndicator.className = `status-indicator ${online ? 'online' : 'offline'}`;
        statusText.textContent = online ? 'DM Available' : 'DM Offline';
      }
    }

    // Load user's characters from Liferay Objects
    async function loadUserCharacters() {
      try {
        // Fetch characters for the current user
        const response = await Liferay.Util.fetch('/o/c/characters?filter=r_userToCharacter_userId eq ' + Liferay.ThemeDisplay.getUserId(), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        const data = await response.json();
        
        if (characterSelect && data.items && data.items.length > 0) {
          // Clear loading message
          characterSelect.innerHTML = '';
          
          // Add placeholder option
          const placeholderOption = document.createElement('option');
          placeholderOption.value = '';
          placeholderOption.textContent = 'Select a character...';
          characterSelect.appendChild(placeholderOption);
          
          // Add character options
          data.items.forEach(character => {
            const option = document.createElement('option');
            option.value = character.id;
            option.textContent = `${character.name || 'Unnamed Character'} (Level ${character.level || 1})`;
            characterSelect.appendChild(option);
          });
          
          // Auto-select first character if only one exists
          if (data.items.length === 1) {
            characterSelect.value = data.items[0].id;
            selectedCharacterId = data.items[0].id;
          }
        } else {
          // No characters found
          if (characterSelect) {
            characterSelect.innerHTML = '<option value="">No characters found</option>';
          }
        }
      } catch (error) {
        console.error('Error loading characters:', error);
        // Fallback to sample characters for development/testing
        if (characterSelect) {
          characterSelect.innerHTML = `
            <option value="">Select a character...</option>
            <option value="1">Thorin Ironforge (Level 5)</option>
            <option value="2">Lyra Moonwhisper (Level 3)</option>
            <option value="3">Grog the Mighty (Level 7)</option>
          `;
        }
      }
    }

    // Initialize with online status
    updateStatus(true);
  }

  // Add enhanced chat styles
  function addChatStyles() {
    if (document.querySelector('#dm-chat-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'dm-chat-styles';
    style.textContent = `
      .dm-chat {
        position: relative;
        overflow: visible;
      }
      
      .dm-chat .chat-input:focus {
        box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
      }
      
      .dm-chat .send-button:hover .send-icon {
        animation: bounce 0.5s ease-in-out;
      }
      
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
      }
      
      .dm-chat .message {
        animation: messageSlide 0.3s ease-out;
      }
      
      @keyframes messageSlide {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .dm-chat .quick-btn:active {
        transform: scale(0.95);
      }
      
      .dm-chat .action-btn:active {
        transform: scale(0.95);
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize all chat features
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      addChatStyles();
      initDMChat();
    });
  } else {
    addChatStyles();
    initDMChat();
  }
})();