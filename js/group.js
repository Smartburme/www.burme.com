document.addEventListener('DOMContentLoaded', function() {
  // Initialize group page functionality
  const createGroupBtn = document.getElementById('create-group');
  
  if (createGroupBtn) {
    createGroupBtn.addEventListener('click', function() {
      createNewGroup();
    });
  }
  
  const float3dGroup = document.querySelector('.float3d-group');
  if (float3dGroup) {
    float3dGroup.addEventListener('click', function() {
      showGroupActions();
    });
  }
  
  setupGroupChatButtons();
  loadGroups();
});

function setupGroupChatButtons() {
  const chatBtns = document.querySelectorAll('.chat-btn');
  chatBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const groupItem = this.closest('.group-item');
      const groupName = groupItem.querySelector('h3').textContent;
      openGroupChat(groupName);
    });
  });
}

function loadGroups() {
  console.log("Loading groups...");
  // This would be replaced with actual Firebase code
}

function createNewGroup() {
  console.log("Creating new group...");
  // This would open a group creation dialog
  alert("Create new group functionality would go here");
}

function showGroupActions() {
  console.log("Showing group actions...");
  // This would show a menu of group actions
  alert("Group actions menu would appear here");
}

function openGroupChat(groupName) {
  console.log(`Opening group chat: ${groupName}`);
  // This would open a group chat interface
  alert(`Opening group chat: ${groupName}`);
}