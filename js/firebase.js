// Firebase configuration and initialization
// Note: Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Authentication state observer
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    console.log("User is signed in:", user.uid);
    updateUIForUser(user);
  } else {
    // User is signed out
    console.log("User is signed out");
    updateUIForSignedOut();
  }
});

// Update UI for authenticated user
function updateUIForUser(user) {
  // Update user avatar with user's initial
  const userAvatar = document.querySelector('.user-avatar');
  if (userAvatar && user.displayName) {
    userAvatar.textContent = user.displayName.charAt(0).toUpperCase();
  }
  
  // Load user-specific data
  loadUserData(user.uid);
}

// Update UI for signed out user
function updateUIForSignedOut() {
  // Redirect to login page or show login UI
  console.log("User is signed out, redirecting to login...");
  // In a real app, you would redirect to a login page
}

// Load user data from Firestore
function loadUserData(userId) {
  db.collection("users").doc(userId).get()
    .then((doc) => {
      if (doc.exists) {
        const userData = doc.data();
        console.log("User data:", userData);
        // Update UI with user data
      } else {
        console.log("No user data found");
      }
    })
    .catch((error) => {
      console.log("Error getting user data:", error);
    });
}

// Save user data to Firestore
function saveUserData(userId, data) {
  db.collection("users").doc(userId).set(data, { merge: true })
    .then(() => {
      console.log("User data successfully saved");
    })
    .catch((error) => {
      console.error("Error saving user data: ", error);
    });
}

// Upload file to Firebase Storage
function uploadFile(file, path) {
  const storageRef = storage.ref();
  const fileRef = storageRef.child(path);
  
  return fileRef.put(file).then((snapshot) => {
    console.log('File uploaded successfully');
    return snapshot.ref.getDownloadURL();
  });
}

// Example function to create a new post
function createPost(userId, content, images = [], privacy = 'public') {
  const postData = {
    userId,
    content,
    images,
    privacy,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    likes: 0,
    comments: 0
  };
  
  return db.collection("posts").add(postData);
}

// Example function to get posts
function getPosts(limit = 10) {
  return db.collection("posts")
    .orderBy("timestamp", "desc")
    .limit(limit)
    .get();
}

// Export Firebase services for use in other modules
window.firebaseServices = {
  auth,
  db,
  storage,
  createPost,
  getPosts,
  uploadFile,
  saveUserData
};