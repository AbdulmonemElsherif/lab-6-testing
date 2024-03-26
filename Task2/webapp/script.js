document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Here you would typically send a request to the server to verify credentials.
    // For simplicity, let's assume the correct username is "tomsmith" and the password is "SuperSecretPassword!"
    if (username === "tomsmith" && password === "SuperSecretPassword!") {
        // If login is successful, show success message and redirect.
        document.getElementById("flash").innerText = "Login successful!";
        document.getElementById("flash").className = "flash success";
        setTimeout(function () {
            window.location.href = "home.html";
        }, 1000); // Redirect after 1 second
    } else {
        // If login fails, show error message.
        document.getElementById("flash").innerText = "Your username or password is incorrect.";
        document.getElementById("flash").className = "flash error";
        console.log('invalid credentials');
    }
});
