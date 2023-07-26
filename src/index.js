// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// firebase config end

let close_div = document.querySelector("#close_div");
let register = document.querySelector(".register");
let container = document.querySelector(".container");
let create_account_link = document.querySelector("#create_account_link");
close_div.addEventListener("click", () => {
    register.style.display = "none";
    container.style.display = "flex";
});
create_account_link.addEventListener("click", () => {
    container.style.display = "none";
    register.style.display = "flex";
});
let real_name = document.getElementById("real_name");
let surname = document.getElementById("surname");
let username = document.getElementById("username");
let password = document.getElementById("password");
let create_account_button = document.getElementById("create_account_button");
let isNameValidated = false;
let isSurnameValidated = false;
let isUsernameValidated = false;
let isPasswordValidated = false;
let error_messages = document.getElementsByClassName("error_messages");
let remove_error = document.getElementsByClassName('remove_error')
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
today = dd + '.' + mm + '.' + yyyy + '.';

let erorrs = [
    "You must enter a name.",
    "Name can't contain special characters.",
    "You must enter a surname.",
    "Surname can't contain special characters.",
    "You must enter a username.",
    "Username must be at least 3 characters long.",
    "Username can't be longer than 15 characters.",
    "Username is already taken.",
    "You must enter a password.",
    "Password must be at least 8 characters long.",
];
let name_regex = (/^[A-Za-z]+$/);
create_account_button === null || create_account_button === void 0 ? void 0 : create_account_button.addEventListener('click', () => {
    for (let i = 0; i < error_messages.length; i++) {
        if (real_name.value == '') {
            error_messages[0].innerText = erorrs[0];
            error_messages[0].style.visibility = 'visible';
        } else if (!name_regex.test(real_name.value)) {
            error_messages[0].innerText = erorrs[1];
            error_messages[0].style.visibility = 'visible';
        } else {
            isNameValidated = true;
            error_messages[0].style.visibility = 'hidden';
        }
        if (surname.value == '') {
            error_messages[1].innerText = erorrs[2];
            error_messages[1].style.visibility = 'visible';
        } else if (!name_regex.test(surname.value)) {
            error_messages[1].innerText = erorrs[3];
            error_messages[1].style.visibility = 'visible';
        } else {
            isSurnameValidated = true;
            error_messages[1].style.visibility = 'hidden';
        }
        if (username.value == '') {
            error_messages[2].innerText = erorrs[4];
            error_messages[2].style.visibility = 'visible';
        } else if (username.value.length < 3) {
            error_messages[2].innerText = erorrs[5];
            error_messages[2].style.visibility = 'visible';
        } else if (username.value.length > 15) {
            error_messages[2].innerText = erorrs[6];
            error_messages[2].style.visibility = 'visible';
        } else {
            isUsernameValidated = true;
            error_messages[2].style.visibility = 'hidden';
        }
        if (password.value == '') {
            error_messages[3].innerText = erorrs[8];
            error_messages[3].style.visibility = 'visible';
        } else if (password.value.length < 8) {
            error_messages[3].innerText = erorrs[9];
            error_messages[3].style.visibility = 'visible';
        } else {
            isPasswordValidated = true;
            error_messages[3].style.visibility = 'hidden';
        }
        const userRef = collection(db, "users");
        if (isNameValidated == true && isSurnameValidated == true && isPasswordValidated == true && isUsernameValidated == true) {

            const data = {
                name: real_name.value,
                surname: surname.value,
                username: username.value,
                password: password.value,
                date: today
            }
            addDoc(userRef, data)
            setTimeout(function redirect() {
                window.location.href = 'room.html'
            }, 2000)

        }
    }
    document.cookie = `username=${username.value}`;
});
for (let i = 0; i < remove_error.length; i++) {
    remove_error[i].addEventListener('click', () => {
        error_messages[i].style.visibility = 'hidden'
    })
}