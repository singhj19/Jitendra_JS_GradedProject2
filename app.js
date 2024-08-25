// app.js
// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     // Hardcoded username and password for simplicity
//     const storedUsername = 'user123';
//     const storedPassword = 'pass123';

//     if (username === storedUsername && password === storedPassword) {
//         localStorage.setItem('isLoggedIn', true);
//         window.location.href = 'resume.html'; // Redirect to the resume page
//     } else {
//         alert('Invalid username/password');
//     }
// });

// // Prevent the user from navigating back to the login page if already logged in
// if (localStorage.getItem('isLoggedIn')) {
//     window.location.href = 'resume.html';
// }



// login.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // For demo purposes, use hardcoded credentials
            if (username === 'user' && password === 'password') {
                localStorage.setItem('loggedIn', true);
                window.location.href = "resume.html";
                // redirectTo('resume.html');
            } else {
                errorMessage.textContent = 'Invalid username/password';
            }
        });
    }
});
