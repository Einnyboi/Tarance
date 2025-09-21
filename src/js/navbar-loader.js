document.addEventListener('DOMContentLoaded', () => {
    const navbarPlaceholder = document.getElementById('navbar');
    if (!navbarPlaceholder) return;

    fetch('navbar.html')
        .then(res => res.text())
        .then(data => {
            navbarPlaceholder.innerHTML = data;

            const productsBtn = document.getElementById('products-btn');
            const productsDropdown = document.getElementById('products-dropdown-content');

            if (productsBtn) {
                productsBtn.addEventListener('click', (event) => {
                    event.stopPropagation();
                    const wasActive = productsBtn.classList.contains('active');
                    closeAllDropdowns();
                    // Re-toggle if it wasn't the one being closed
                    if (!wasActive) {
                        productsDropdown.classList.toggle('show');
                        productsBtn.classList.toggle('active'); // Toggle active class on the button
                    }
                });
            }

            const userNav = document.getElementById('user-nav');
            const homeLink = document.getElementById('home-link');
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

            if (isLoggedIn) {
                // ... (innerHTML for logged in user remains the same) ...
                userNav.innerHTML = `
                    <div class="dropdown">
                        <button id="account-btn" class="dropdown-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        </button>
                        <div id="dropdown-content" class="dropdown-content">
                            <a href="account.html">Hi, ${JSON.parse(localStorage.getItem('currentUser')).fullName.split(' ')[0]}</a>
                            <a href="home.html">Home</a>
                            <a href="history.html">History</a>
                            <a href="#" id="logout-btn">Logout</a>
                        </div>
                    </div>`;

                homeLink.href = 'home.html';
                
                const accountBtn = document.getElementById('account-btn');
                const accountDropdown = document.getElementById('dropdown-content');

                if (accountBtn) {
                    accountBtn.addEventListener('click', (event) => {
                        event.stopPropagation();
                        const wasActive = accountBtn.classList.contains('active');
                        closeAllDropdowns();
                        if (!wasActive) {
                            accountDropdown.classList.toggle('show');
                            accountBtn.classList.toggle('active'); // Toggle active class on the button
                        }
                    });
                }

                document.getElementById('logout-btn').addEventListener('click', (e) => {
                    e.preventDefault();
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('currentUser');
                    window.location.href = 'index.html';
                });

            } else {
                userNav.innerHTML = `
                    <a href="login.html">Login</a>
                    <a href="signup.html">Sign Up</a>`;
                homeLink.href = 'index.html';
            }

            function closeAllDropdowns() {
                const allDropdowns = document.querySelectorAll('.dropdown-content, .nav-dropdown-content');
                allDropdowns.forEach(dropdown => dropdown.classList.remove('show'));
                
                // Also remove the 'active' class from all buttons
                const allButtons = document.querySelectorAll('.dropdown-btn, .nav-dropdown-btn');
                allButtons.forEach(button => button.classList.remove('active'));
            }
            
            window.addEventListener('click', (event) => {
                if (!event.target.closest('.dropdown-btn, .nav-dropdown-btn')) {
                    closeAllDropdowns();
                }
            });
        });
});