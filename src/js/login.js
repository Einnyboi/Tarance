document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(validUser));
        
        alert('Login berhasil!');
        // Redirect to a members-only home page
        window.location.href = 'home.html'; 
    } else {
        errorMessage.textContent = 'Email atau password salah.';
        errorMessage.style.display = 'block';
    }
});