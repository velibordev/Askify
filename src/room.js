// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { doc, getDocs, setDoc } from "firebase/firestore";

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
function deleteAllCookies() {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
}
log_out.addEventListener("click", () => {
    deleteAllCookies();
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
const targetDate = new Date('2023-08-01');
querySnapshot.forEach((doc) => {
    const userData = doc.data();
    if (userData.username === username_of_profile.textContent) {
        created_at.innerText = userData.date;
        const dateParts = userData.date.split('.');
        const userDate = new Date(`${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`);

        if (userDate.getTime() < targetDate.getTime()) {
            og_badge.style.display = 'flex';
        } else {
            og_badge.style.display = 'none';
        }
    }
});

// sent to question to firestore
send_question.addEventListener('click', () => {
    if (post_question.value != '' && post_question.value.length > 20) {
        let post_message = document.getElementById('post_message')
        const postRef = collection(db, "posts");
        const data = {
            creator: username_of_profile.innerText,
            date: today,
            question: post_question.value,
        }
        // addDoc(postRef, data)
        const postId = post_question.value;
        setDoc(doc(postRef, postId), data);
        post_question.value = ''
        confetti()
        post_message.innerText = 'Posted successfully, refreshing in couple of seconds.'
        setTimeout(function reload() {
            window.location.reload()
        }, 2000)
    } else if (post_question.value == '') {
        let post_message = document.getElementById('post_message')
        post_message.innerText = 'You must enter a question.'
    } else {
        let post_message = document.getElementById('post_message')
        post_message.innerText = 'Your question must be at least 20 characters long.'
    }

})
const postRef = collection(db, "posts");
const postSnapshot = await getDocs(postRef);
postSnapshot.forEach((doc) => {
    const postData = doc.data();
    const content_div = document.createElement('div')
    const div_header = document.createElement('div')
    const up_vote_div = document.createElement('div')
    const down_vote_div = document.createElement('div')
    const div_header_creator = document.createElement('p')
    const div_header_date = document.createElement('p')
    const q_div = document.createElement('div')
    const q_div_h2 = document.createElement('h2')
    const c_div = document.createElement('div')
    const post_footer = document.createElement('div')
    const post_image_up = document.createElement('img')
    post_image_up.style.width = '50px'
    post_image_up.src = 'assets/up-arrow.png'
    const post_image_down = document.createElement('img')
    post_image_down.style.width = '50px'
    post_image_down.src = 'assets/up-arrow.png'
    post_image_down.style.transform = 'rotate(180deg)'
    const post_image_report = document.createElement('img')
    up_vote_div.appendChild(post_image_up)
    down_vote_div.appendChild(post_image_down)
    post_image_report.style.width = '30px'
    post_image_report.src = 'assets/image(18).png'
    post_footer.appendChild(up_vote_div)
    post_footer.appendChild(down_vote_div)
    post_footer.appendChild(post_image_report)

    post_footer.setAttribute('id', 'post_footer');
    c_div.setAttribute('id', 'c_div');
    const post_comment_input = document.createElement('input')
    const post_comment_button = document.createElement('button')
    post_comment_input.placeholder = 'Your comment'
    post_comment_button.innerText = 'Post'
    const post_comment = document.createElement('div')
    post_comment.setAttribute('id', 'post_comment')
    post_comment.appendChild(post_comment_input)
    post_comment.appendChild(post_comment_button)
    const comments = document.createElement('div')
    comments.setAttribute('id', 'comments')
    c_div.appendChild(post_comment)
    c_div.appendChild(comments)
    q_div_h2.innerText = postData.question
    q_div.appendChild(q_div_h2)
    q_div.setAttribute('id', 'q_div');
    div_header_creator.innerText = postData.creator
    div_header_date.innerText = postData.date
    div_header.appendChild(div_header_creator)
    div_header.appendChild(div_header_date)
    content_div.setAttribute('id', 'content_div');
    div_header.setAttribute('id', 'div_header');
    content_div.appendChild(div_header)
    content_div.appendChild(q_div)
    content_div.appendChild(c_div)
    content_div.appendChild(post_footer)
    some_wrap.appendChild(content_div)
});