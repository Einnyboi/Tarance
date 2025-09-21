//count-health.js

document.getElementById('health-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // 1. Get all values from the form
    const fullName = document.getElementById('full-name').value;
    const dob = new Date(document.getElementById('dob').value);
    const isSmoker = parseInt(document.getElementById('smoker').value);
    const hasHypertension = parseInt(document.getElementById('hypertension').value);
    const hasDiabetes = parseInt(document.getElementById('diabetes').value);

    // 2. Health Premium Calculation Logic
    const basePremium = 3000000; // Base annual premium of Rp 3,000,000
    let riskFactor = 1.0;

    // Calculate age
    const age = new Date().getFullYear() - dob.getFullYear();
    if (age >= 30 && age <= 50) {
        riskFactor += 0.2;
    } else if (age > 50) {
        riskFactor += 0.5;
    }

    // Add risk for health conditions
    if (isSmoker) riskFactor += 0.3;
    if (hasHypertension) riskFactor += 0.25;
    if (hasDiabetes) riskFactor += 0.25;

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