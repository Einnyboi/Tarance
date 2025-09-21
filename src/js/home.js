document.addEventListener('DOMContentLoaded', () => {
    // Get the current user's data from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Find the placeholder span
    const userNameSpan = document.getElementById('user-name');

    if (currentUser && userNameSpan) {
        // Display the user's first name
        const firstName = currentUser.fullName.split(' ')[0];
        userNameSpan.textContent = firstName;
    } else if (userNameSpan) {
        // Fallback text if no user is logged in
        userNameSpan.textContent = 'Guest';
    }
});