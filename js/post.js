document.addEventListener('DOMContentLoaded', function() {
  // Initialize post creation functionality
  initPostCreation();
});

function initPostCreation() {
  // DOM elements
  const postContent = document.getElementById('post-content');
  const charCounter = document.getElementById('char-counter');
  const publishBtn = document.getElementById('publish-post');
  const backBtn = document.getElementById('back-button');
  const uploadTrigger = document.getElementById('upload-trigger');
  const mediaInput = document.getElementById('media-upload-input');
  const mediaPreview = document.getElementById('media-preview');
  const privacySetting = document.getElementById('privacy-setting');
  const mediaCount = document.querySelector('.media-count');
  
  // Current state
  let mediaFiles = [];
  
  // Character count update
  if (postContent && charCounter) {
    postContent.addEventListener('input', function() {
      const length = this.value.length;
      charCounter.textContent = length;
      
      // Update character counter style
      if (length > 190) {
        charCounter.classList.add('warning');
      } else {
        charCounter.classList.remove('warning');
      }
      
      // Enable/disable publish button
      updatePublishButton();
    });
  }
  
  // Back button functionality
  if (backBtn) {
    backBtn.addEventListener('click', function() {
      // Check if there's content to avoid losing data
      if (postContent.value.trim() !== '' || mediaFiles.length > 0) {
        if (confirm('Are you sure you want to discard this post?')) {
          load('home');
        }
      } else {
        load('home');
      }
    });
  }
  
  // Media upload functionality
  if (uploadTrigger && mediaInput) {
    uploadTrigger.addEventListener('click', function() {
      mediaInput.click();
    });
    
    mediaInput.addEventListener('change', function(e) {
      handleMediaUpload(e.target.files);
    });
  }
  
  // Publish post
  if (publishBtn) {
    publishBtn.addEventListener('click', function() {
      publishPost();
    });
  }
  
  // Formatting tools
  const toolBtns = document.querySelectorAll('.tool-btn');
  toolBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const tool = this.dataset.tool;
      applyFormattingTool(tool);
    });
  });
  
  // Handle media upload
  function handleMediaUpload(files) {
    if (files.length === 0) return;
    
    // Check if we exceed the limit
    if (mediaFiles.length + files.length > 8) {
      alert('You can only upload up to 8 files');
      return;
    }
    
    // Process each file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Check file type and size
      if (!validateFile(file)) continue;
      
      // Add to our files array
      mediaFiles.push(file);
      
      // Create preview
      createMediaPreview(file);
    }
    
    // Update media count
    updateMediaCount();
    
    // Enable/disable publish button
    updatePublishButton();
    
    // Clear the input to allow uploading the same file again
    mediaInput.value = '';
  }
  
  // Validate file
  function validateFile(file) {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const validVideoTypes = ['video/mp4', 'video/quicktime'];
    
    // Check if file type is valid
    if (!validImageTypes.includes(file.type) && !validVideoTypes.includes(file.type)) {
      alert(`File type not supported: ${file.type}`);
      return false;
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size too large. Maximum size is 10MB');
      return false;
    }
    
    return true;
  }
  
  // Create media preview
  function createMediaPreview(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
      const mediaItem = document.createElement('div');
      mediaItem.className = 'media-item';
      
      if (file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = 'Uploaded media';
        mediaItem.appendChild(img);
      } else if (file.type.startsWith('video/')) {
        const video = document.createElement('video');
        video.src = e.target.result;
        video.controls = true;
        mediaItem.appendChild(video);
      }
      
      // Add remove button
      const removeBtn = document.createElement('button');
      removeBtn.className = 'remove-media';
      removeBtn.innerHTML = '<i class="fas fa-times"></i>';
      removeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        removeMediaFile(file, mediaItem);
      });
      
      mediaItem.appendChild(removeBtn);
      mediaPreview.insertBefore(mediaItem, uploadTrigger);
    };
    
    reader.readAsDataURL(file);
  }
  
  // Remove media file
  function removeMediaFile(file, mediaElement) {
    // Remove from array
    mediaFiles = mediaFiles.filter(f => f !== file);
    
    // Remove from DOM
    mediaElement.remove();
    
    // Update media count
    updateMediaCount();
    
    // Enable/disable publish button
    updatePublishButton();
  }
  
  // Update media count display
  function updateMediaCount() {
    if (mediaCount) {
      mediaCount.textContent = `(${mediaFiles.length}/8)`;
    }
  }
  
  // Update publish button state
  function updatePublishButton() {
    if (publishBtn) {
      const hasContent = postContent.value.trim() !== '' || mediaFiles.length > 0;
      publishBtn.disabled = !hasContent;
    }
  }
  
  // Apply formatting tool
  function applyFormattingTool(tool) {
    if (!postContent) return;
    
    const start = postContent.selectionStart;
    const end = postContent.selectionEnd;
    const selectedText = postContent.value.substring(start, end);
    
    let newText = '';
    
    switch(tool) {
      case 'bold':
        newText = `**${selectedText}**`;
        break;
      case 'italic':
        newText = `_${selectedText}_`;
        break;
      case 'emoji':
        // In a real app, this would open an emoji picker
        newText = `${selectedText} 😊`;
        break;
      default:
        return;
    }
    
    // Replace selected text with formatted text
    postContent.value = postContent.value.substring(0, start) + 
                       newText + 
                       postContent.value.substring(end);
    
    // Set cursor position after the inserted text
    postContent.selectionStart = start + newText.length;
    postContent.selectionEnd = start + newText.length;
    
    // Focus back on the textarea
    postContent.focus();
    
    // Trigger input event to update character count
    const event = new Event('input', { bubbles: true });
    postContent.dispatchEvent(event);
  }
  
  // Publish post
  function publishPost() {
    const content = postContent.value.trim();
    const privacy = privacySetting.value;
    
    // Validate post
    if (content === '' && mediaFiles.length === 0) {
      alert('Please add some content to your post');
      return;
    }
    
    // Disable publish button during upload
    publishBtn.disabled = true;
    publishBtn.textContent = 'Publishing...';
    
    // In a real app, this would upload to Firebase
    console.log('Publishing post:', {
      content,
      privacy,
      mediaCount: mediaFiles.length
    });
    
    // Simulate upload process
    setTimeout(() => {
      alert('Post published successfully!');
      
      // Return to home page
      load('home');
    }, 1500);
  }
}
