"use strict";
let profile_icon = document.querySelector("#profile_icon");
let profile = document.querySelector("#profile");
let add_file_icon = document.querySelector("#add_file_icon");
let add_post_div = document.querySelector("#add_post_div");
let some_wrap = document.querySelector(".some_wrap");
let log_out = document.querySelector("#log_out");
let all_posts = document.querySelector("#all_posts");
let username_of_profile = document.getElementById('username_of_profile');
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
