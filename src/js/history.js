// history.js

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || {};
    const tableBody = document.getElementById('history-table-body');
    const noHistoryMessage = document.getElementById('no-history-message');

    if (!currentUser) {
        window.location.href = 'login.html'; // Redirect to login if not logged in
        return;
    }

    const userHistory = purchaseHistory[currentUser.email] || [];

    if (userHistory.length === 0) {
        // Show message if there's no history
        noHistoryMessage.style.display = 'block';
    } else {
        // Populate the table with history data
        userHistory.forEach(purchase => {
            const row = document.createElement('tr');

            // Format date to be more readable
            const purchaseDate = new Date(purchase.purchaseDate).toLocaleDateString('id-ID', {
                day: 'numeric', month: 'long', year: 'numeric'
            });

            // Format price to currency
            const formattedPrice = purchase.price.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            });

            row.innerHTML = `
                <td>${purchase.productName}</td>
                <td>${purchaseDate}</td>
                <td>${formattedPrice}</td>
                <td><span class="status-badge status-lunas">${purchase.status}</span></td>
            `;
            tableBody.appendChild(row);
        });
    }
});