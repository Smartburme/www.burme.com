document.addEventListener('DOMContentLoaded', function() {
  // Initialize friends page functionality
  setupTabs();
  setupFriendActions();
  loadFriends();
});

function setupTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Load content for this tab
      const tab = this.dataset.tab;
      loadFriends(tab);
    });
  });
}

function setupFriendActions() {
  // Chat button functionality
  const chatBtns = document.querySelectorAll('.chat-btn');
  chatBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const friendItem = this.closest('.friend-item');
      const friendName = friendItem.querySelector('h3').textContent;
      openChat(friendName);
    });
  });
  
  // Call button functionality
  const callBtns = document.querySelectorAll('.call-btn');
  callBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const friendItem = this.closest('.friend-item');
      const friendName = friendItem.querySelector('h3').textContent;
      startVoiceCall(friendName);
    });
  });
}

function loadFriends(tab = 'all') {
  console.log(`Loading friends for tab: ${tab}`);
  // This would be replaced with actual Firebase code
}

function openChat(friendName) {
  console.log(`Opening chat with ${friendName}`);
  // This would open a chat interface
  alert(`Opening chat with ${friendName}`);
}

function startVoiceCall(friendName) {
  console.log(`Starting voice call with ${friendName}`);
  // This would initiate a voice call
  alert(`Starting voice call with ${friendName}`);
}