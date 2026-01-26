import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyArpjA7oxqiJD4YyCDmMxhL5LpdBUvxyfQ",
    authDomain: "mini-crossword-a1649.firebaseapp.com",
    projectId: "mini-crossword-a1649",
    storageBucket: "mini-crossword-a1649.firebasestorage.app",
    messagingSenderId: "661167541092",
    appId: "1:661167541092:web:c17757b6d1dddede3ac871",
    measurementId: "G-SN8LGRHSH8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// DOM Elements
const loginBtn = document.getElementById('hub-google-login');
const userDisplay = document.getElementById('hub-user-display');
const userNameEl = document.getElementById('hub-username');
const userAvatarEl = document.getElementById('hub-avatar');
const signOutBtn = document.getElementById('hub-sign-out');

// Auth Logic
loginBtn.addEventListener('click', async () => {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch (error) {
        console.error("Login failed", error);
    }
});

signOutBtn.addEventListener('click', async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Sign out failed", error);
    }
});

// Auth State Observer
onAuthStateChanged(auth, (user) => {
    if (user) {
        loginBtn.classList.add('hidden');
        userDisplay.classList.remove('hidden');
        userNameEl.textContent = user.displayName;
        userAvatarEl.src = user.photoURL;
    } else {
        loginBtn.classList.remove('hidden');
        userDisplay.classList.add('hidden');
    }
});