// File: src/js/count-health.js

document.getElementById('health-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // 1. Get all values from the form
    const fullName = document.getElementById('full-name').value;
    const dob = new Date(document.getElementById('dob').value);
    const isSmoker = parseInt(document.getElementById('smoker').value); // 0 for No, 1 for Yes
    const hasHypertension = parseInt(document.getElementById('hypertension').value);
    const hasDiabetes = parseInt(document.getElementById('diabetes').value);

    // 2. Health Premium Calculation Logic
    const basePremium = 3000000; // Base annual premium of Rp 3,000,000
    let riskFactor = 1.0;

    // Calculate age
    const age = new Date().getFullYear() - dob.getFullYear();
    if (age >= 30 && age <= 50) {
        riskFactor += 0.2; // 20% increase for ages 30-50
    } else if (age > 50) {
        riskFactor += 0.5; // 50% increase for ages >50
    }

    // Add risk for health conditions
    if (isSmoker) riskFactor += 0.3; // 30% increase for smokers
    if (hasHypertension) riskFactor += 0.25; // 25% increase for hypertension
    if (hasDiabetes) riskFactor += 0.25; // 25% increase for diabetes

    const annualPremium = basePremium * riskFactor;
    const monthlyPremium = annualPremium / 12;

    // 3. Save data to Local Storage in the correct format
    const checkoutData = {
        fullName: fullName,
        productName: 'Asuransi Kesehatan',
        annualPremium: annualPremium,
        monthlyPremium: monthlyPremium,
        details: {
            age: age,
            isSmoker: isSmoker ? 'Yes' : 'No'
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
        <p class="note">Premi dihitung berdasarkan usia dan kondisi kesehatan Anda.</p>
        <a href="checkout.html" class="btn btn-primary" style="margin-top: 16px;">Go to Checkout</a>
    `;
    resultDiv.style.display = 'block';
});