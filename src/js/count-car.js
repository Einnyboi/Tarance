document.getElementById('car-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from reloading the page

    // 1. Get all values from the form inputs
    const carData = {
        brand: document.getElementById('merk-mobil').value,
        type: document.getElementById('jenis-mobil').value,
        year: parseInt(document.getElementById('tahun-mobil').value),
        price: parseFloat(document.getElementById('harga-mobil').value),
        domicile: document.getElementById('domisili').value,
        engineNumber: document.getElementById('nomor-mesin').value,
        frameNumber: document.getElementById('nomor-mobil').value,
        driverDob: document.getElementById('dob-pengemudi').value,
        ownerName: document.getElementById('nama-pemilik').value
    };

    // 2. New Premium Calculation Logic
    const currentYear = new Date().getFullYear();
    const carAge = currentYear - carData.year;
    let annualPremium = 0;
    const carPrice = carData.price;

    if (carAge >= 0 && carAge <= 3) {
        annualPremium = 0.025 * carPrice;
    } else if (carAge > 3 && carAge <= 5) {
        if (carPrice < 200000000) {
            annualPremium = 0.04 * carPrice;
        } else {
            annualPremium = 0.03 * carPrice;
        }
    } else { // carAge > 5
        annualPremium = 0.05 * carPrice;
    }

    // --- CHANGES START HERE ---

    // 3. Calculate the monthly premium
    const monthlyPremium = annualPremium / 12;

    // 4. Save data to Local Storage for the checkout page
    const checkoutData = {
        ...carData,
        productName: 'Asuransi Mobil',
        annualPremium: annualPremium,
        monthlyPremium: monthlyPremium // Both are still saved
    };
    localStorage.setItem('insuranceCheckoutDetails', JSON.stringify(checkoutData));

    // 5. Display the result and the Checkout button
    const resultDiv = document.getElementById('result');
    
    // CHANGE: Format the MONTHLY premium for display, not the annual one
    const formattedPremium = monthlyPremium.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    });

    resultDiv.innerHTML = `
        <h3>Estimasi Premi Bulanan Anda:</h3>
        <h2 class="price">${formattedPremium}</h2>
        <p class="note">Harga ini adalah estimasi berdasarkan data yang Anda masukkan.</p>
        <a href="checkout.html" class="btn btn-primary" style="margin-top: 16px;">Go to Checkout</a>
    `;
    resultDiv.style.display = 'block';

    // --- CHANGES END HERE ---
});