document.addEventListener('DOMContentLoaded', function() {
  // Initialize home page functionality
  const createPostBtn = document.getElementById('create-post');
  
  if (createPostBtn) {
    createPostBtn.addEventListener('click', function() {
      load('new-chat');
    });
  }
  
  // Load posts from Firebase (pseudo-code)
  loadPosts();
});

function loadPosts() {
  // This would be replaced with actual Firebase code
  console.log("Loading posts...");
  
  // Simulate loading posts
  setTimeout(() => {
    console.log("Posts loaded");
  }, 1000);
}