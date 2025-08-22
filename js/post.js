document.addEventListener('DOMContentLoaded', function() {
  // Initialize post creation functionality
  setupPostEditor();
});

function setupPostEditor() {
  const textarea = document.querySelector('.post-editor textarea');
  const charCount = document.querySelector('.char-count');
  const uploadInput = document.getElementById('image-upload-input');
  const uploadPlaceholder = document.querySelector('.upload-placeholder');
  const imagePreview = document.querySelector('.image-preview');
  const publishBtn = document.getElementById('publish-post');
  
  // Character count update
  if (textarea && charCount) {
    textarea.addEventListener('input', function() {
      const length = this.value.length;
      charCount.textContent = `${length}/200`;
      
      if (length > 190) {
        charCount.style.color = 'var(--warning)';
      } else {
        charCount.style.color = 'var(--gray)';
      }
    });
  }
  
  // Image upload functionality
  if (uploadPlaceholder && uploadInput) {
    uploadPlaceholder.addEventListener('click', function() {
      uploadInput.click();
    });
    
    uploadInput.addEventListener('change', function(e) {
      handleImageUpload(e.target.files);
    });
  }
  
  // Publish post
  if (publishBtn) {
    publishBtn.addEventListener('click', function() {
      publishPost();
    });
  }
}

function handleImageUpload(files) {
  console.log(`${files.length} images selected`);
  // This would handle image upload and preview
  alert(`Would upload ${files.length} images`);
}

function publishPost() {
  const textarea = document.querySelector('.post-editor textarea');
  const content = textarea ? textarea.value : '';
  
  console.log("Publishing post:", content);
  // This would publish the post to Firebase
  alert("Post published successfully!");
  
  // Return to home page
  load('home');
}