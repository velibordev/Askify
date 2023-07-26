// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { doc, getDocs } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBuIrMg8b4nBFb4P22cqMH3fEyPP6cIWF4",
    authDomain: "justask-ea1d5.firebaseapp.com",
    projectId: "justask-ea1d5",
    storageBucket: "justask-ea1d5.appspot.com",
    messagingSenderId: "826264706778",
    appId: "1:826264706778:web:ffbbe51f355ffda2250fe3"
};
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
today = dd + '.' + mm + '.' + yyyy + '.';
let profile_icon = document.querySelector("#profile_icon");
let profile = document.querySelector("#profile");
let add_file_icon = document.querySelector("#add_file_icon");
let add_post_div = document.querySelector("#add_post_div");
let some_wrap = document.querySelector(".some_wrap");
let log_out = document.querySelector("#log_out");
let all_posts = document.querySelector("#all_posts");
let username_of_profile = document.getElementById('username_of_profile');
let send_question = document.getElementById('send_question')
let post_question = document.getElementById('post_question')
profile_icon.addEventListener("click", () => {
    profile.style.display = "block";
    add_post_div.style.display = "none";
    some_wrap.style.display = "none";
});
add_file_icon.addEventListener("click", () => {
    add_post_div.style.display = "block";
    profile.style.display = "none";
    some_wrap.style.display = "none";
});
log_out.addEventListener("click", () => {
    window.location.href = "index.html";
});
all_posts.addEventListener("click", () => {
    some_wrap.style.display = "flex";
    profile.style.display = "none";
    add_post_div.style.display = "none";
});
let x = document.cookie;
username_of_profile.innerText = x.split('=')[1];

// get user data
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const userRef = collection(db, "users");
const querySnapshot = await getDocs(userRef);
const created_at = document.getElementById('created_at')
querySnapshot.forEach((doc) => {
    const userData = doc.data();
    if (userData.username === username_of_profile.textContent) {
        created_at.innerText = userData.date;
    }
});

// sent to question to firestore
send_question.addEventListener('click', () => {
    const postRef = collection(db, "posts");
    const data = {
        creator: username_of_profile.innerText,
        date: today,
        question: post_question.value,
    }
    addDoc(postRef, data)
})
const postRef = collection(db, "posts");
const postSnapshot = await getDocs(postRef);
postSnapshot.forEach((doc) => {
    console.log("Document data:", doc.data());
});
