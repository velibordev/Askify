"use strict";
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
let name_regex = /^[A-Za-zČčĆćĐđŠšŽžĐđ]+$/;
create_account_button === null || create_account_button === void 0 ? void 0 : create_account_button.addEventListener('click', () => {
    for (let i = 0; i < error_messages.length; i++) {
        if (real_name.value == '') {
            error_messages[0].innerText = erorrs[0];
            error_messages[0].style.visibility = 'visible';
        }
        else if (!name_regex.test(real_name.value)) {
            error_messages[0].innerText = erorrs[1];
            error_messages[0].style.visibility = 'visible';
        }
        else {
            isNameValidated = true;
            error_messages[0].style.visibility = 'hidden';
        }
        if (surname.value == '') {
            error_messages[1].innerText = erorrs[2];
            error_messages[1].style.visibility = 'visible';
        }
        else if (!name_regex.test(surname.value)) {
            error_messages[1].innerText = erorrs[3];
            error_messages[1].style.visibility = 'visible';
        }
        else {
            isSurnameValidated = true;
            error_messages[1].style.visibility = 'hidden';
        }
        if (username.value == '') {
            error_messages[2].innerText = erorrs[4];
            error_messages[2].style.visibility = 'visible';
        }
        else if (username.value.length < 3) {
            error_messages[2].innerText = erorrs[5];
            error_messages[2].style.visibility = 'visible';
        }
        else if (username.value.length > 15) {
            error_messages[2].innerText = erorrs[6];
            error_messages[2].style.visibility = 'visible';
        }
        else {
            isUsernameValidated = true;
            error_messages[2].style.visibility = 'hidden';
        }
        if (password.value == '') {
            error_messages[3].innerText = erorrs[8];
            error_messages[3].style.visibility = 'visible';
        }
        else if (password.value.length < 8) {
            error_messages[3].innerText = erorrs[9];
            error_messages[3].style.visibility = 'visible';
        }
        else {
            isPasswordValidated = true;
            error_messages[3].style.visibility = 'hidden';
        }
        if (isNameValidated == true && isSurnameValidated == true && isPasswordValidated == true && isUsernameValidated == true) {
            window.location.href = 'room.html';
        }
    }
    document.cookie = `username=${username.value}`;
});
for (let i = 0; i < remove_error.length; i++) {
    remove_error[i].addEventListener('click', () => {
        error_messages[i].style.visibility = 'hidden'
    })
}
