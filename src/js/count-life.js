// count-life.js

document.getElementById('life-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // 1. Get values from the form
    const dob = new Date(document.getElementById('dob').value);
    const t = parseFloat(document.getElementById('sum-insured').value); // 't' = Besaran Pertanggungan

    // 2. Calculate age (u)
    // This logic correctly accounts for the birth month and day.
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    // 3. Determine the premium rate (m) based on the new criteria
    let m = 0;
    if (age <= 30) {
        m = 0.002;
    } else if (age <= 50) { 
        m = 0.004; 
    } else {
        m = 0.01;
    }
    
    // 4. Calculate the monthly premium using the correct formula: m * t
    const monthlyPremium = m * t;

    // 5. Save the final price to localStorage for the checkout page
    const checkoutData = {
        productName: 'Asuransi Jiwa',
        monthlyPremium: monthlyPremium,
        annualPremium: monthlyPremium * 12,
        details: {
            age: age,
            sumInsured: t
        }
    };
    localStorage.setItem('insuranceCheckoutDetails', JSON.stringify(checkoutData));


    // 6. Display the result on the page
    const resultDiv = document.getElementById('result');
    const formattedPremium = monthlyPremium.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    });

    resultDiv.innerHTML = `
        <h3>Estimasi Premi Bulanan Anda:</h3>
        <h2 class="price">${formattedPremium}</h2>
        <p class="note">Premi dihitung berdasarkan usia dan jumlah pertanggungan yang dipilih.</p>
        <a href="checkout.html" class="btn-secondary" style="margin-top: 16px;">Checkout</a>
    `;
    resultDiv.style.display = 'block';
});
