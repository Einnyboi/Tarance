// dashboard.js

document.addEventListener('DOMContentLoaded', function() {
    
    // In a real application, you would fetch this data after a user logs in.
    // We'll simulate it here with two examples.
    
    // --- SIMULATION 1: User WITH an active policy ---
    const userData = {
        isPolicyActive: true,
        policy: {
            name: "Premium Health Shield",
            dueDate: "October 30, 2025"
        }
    };

    // --- SIMULATION 2: User WITHOUT an active policy ---
    /*
    const userData = {
        isPolicyActive: false,
        policy: null
    };
    */


    // Get the HTML elements we need to update
    const activeView = document.getElementById('policy-active-view');
    const inactiveView = document.getElementById('policy-inactive-view');

    if (userData.isPolicyActive) {
        // Show the active policy view
        activeView.style.display = 'block';
        inactiveView.style.display = 'none';

        // Update the details on the page
        const policyNameEl = activeView.querySelector('.policy-name');
        const dueDateEl = activeView.querySelector('.due-date');
        
        policyNameEl.textContent = userData.policy.name;
        dueDateEl.textContent = userData.policy.dueDate;

    } else {
        // Show the inactive policy view
        activeView.style.display = 'none';
        inactiveView.style.display = 'block';
    }
});