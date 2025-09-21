// File: src/js/checkout.js (Corrected)

window.addEventListener('DOMContentLoaded', () => {
    // 1. Get the single data object from localStorage
    const checkoutDetailsString = localStorage.getItem('insuranceCheckoutDetails');
    
    // 2. Parse the JSON string back into an object
    const checkoutDetails = JSON.parse(checkoutDetailsString);

    const productNameEl = document.getElementById('product-name');
    const premiumDisplayEl = document.getElementById('premium-display');

    // 3. Check if the main object exists
    if (checkoutDetails && checkoutDetails.monthlyPremium) {
        // 4. Get the details FROM the object's properties
        const formattedPremium = parseFloat(checkoutDetails.monthlyPremium).toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        });
        productNameEl.textContent = checkoutDetails.productName;
        premiumDisplayEl.textContent = formattedPremium;
    } else {
        productNameEl.textContent = 'Produk Tidak Ditemukan';
        premiumDisplayEl.textContent = 'Rp 0';
        // Disable the pay button if there's no product
        document.getElementById('pay-button').disabled = true;
    }
});


document.getElementById('pay-button').addEventListener('click', () => {
    // 1. Get current user and product details (using the new method)
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const checkoutDetailsString = localStorage.getItem('insuranceCheckoutDetails');
    const checkoutDetails = JSON.parse(checkoutDetailsString);

    if (!currentUser) {
        alert('Anda harus login untuk melanjutkan pembayaran.');
        window.location.href = 'login.html';
        return;
    }

    // Check if checkout details exist
    if (!checkoutDetails) {
        alert('Detail produk tidak ditemukan. Silakan hitung premi Anda kembali.');
        window.location.href = 'car-insurance.html'; // Redirect to the form
        return;
    }

    // 2. Create a new purchase record using details from the object
    const newPurchase = {
        productName: checkoutDetails.productName,
        purchaseDate: new Date().toISOString(),
        price: parseFloat(checkoutDetails.monthlyPremium),
        status: 'Lunas',
        // Optional: include more details for the history page
        details: {
            brand: checkoutDetails.brand,
            type: checkoutDetails.type,
            year: checkoutDetails.year
        }
    };

    // 3. Get/update purchase history (this part remains the same)
    const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || {};
    const userHistory = purchaseHistory[currentUser.email] || [];
    userHistory.push(newPurchase);
    purchaseHistory[currentUser.email] = userHistory;
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));
    
    // 8. IMPORTANT: Clean up the checkout data after purchase
    localStorage.removeItem('insuranceCheckoutDetails');

    // 9. Redirect to the history page
    alert('Pembayaran berhasil!');
    window.location.href = 'history.html';
});