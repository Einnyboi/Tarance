// File: src/js/count-life.js

document.getElementById('life-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // 1. Get all values from the form
    const fullName = document.getElementById('full-name').value;
    const dob = new Date(document.getElementById('dob').value);
    const sumInsured = parseFloat(document.getElementById('sum-insured').value);

    // 2. Life Premium Calculation Logic
    const baseRate = 0.001; // Base rate is 0.1% of the sum insured
    let ageMultiplier = 1.0;

    // Calculate age
    const age = new Date().getFullYear() - dob.getFullYear();
    if (age >= 30 && age <= 45) {
        ageMultiplier = 1.5;
    } else if (age > 45) {
        ageMultiplier = 2.5;
    }
    
    const annualPremium = (sumInsured * baseRate) * ageMultiplier;
    const monthlyPremium = annualPremium / 12;

    // 3. Save data to Local Storage in the correct format
    const checkoutData = {
        fullName: fullName,
        productName: 'Asuransi Jiwa',
        annualPremium: annualPremium,
        monthlyPremium: monthlyPremium,
        details: {
            age: age,
            sumInsured: sumInsured.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })
        }
    };
    localStorage.setItem('insuranceCheckoutDetails', JSON.stringify(checkoutData));

    // 4. Display the result and the Checkout button
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
        <a href="checkout.html" class="btn btn-primary" style="margin-top: 16px;">Go to Checkout</a>
    `;
    resultDiv.style.display = 'block';
});