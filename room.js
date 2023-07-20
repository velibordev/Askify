"use strict";
let profile_icon = document.querySelector("#profile_icon");
let profile = document.querySelector("#profile");
let add_file_icon = document.querySelector("#add_file_icon");
let add_post_div = document.querySelector("#add_post_div");
let content_div = document.querySelector("#content_div");
let log_out = document.querySelector("#log_out");
let all_posts = document.querySelector("#all_posts");
let username_of_profile = document.getElementById('username_of_profile');
profile_icon.addEventListener("click", () => {
    profile.style.display = "block";
    add_post_div.style.display = "none";
    content_div.style.display = "none";
});
add_file_icon.addEventListener("click", () => {
    add_post_div.style.display = "block";
    profile.style.display = "none";
    content_div.style.display = "none";
});
log_out.addEventListener("click", () => {
    window.location.href = "index.html";
});
all_posts.addEventListener("click", () => {
    content_div.style.display = "block";
    profile.style.display = "none";
    add_post_div.style.display = "none";
});
let x = document.cookie;
username_of_profile.innerText = x.split('=')[1];
