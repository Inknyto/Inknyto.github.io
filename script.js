document.addEventListener("DOMContentLoaded", function() {
    // Select form and result table elements
    const priceForm = document.getElementById("priceForm");
    const resultTable = document.getElementById("resultTable");

    priceForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get the duration from the form input
        const durationInput = document.getElementById("duration");
        const duration = parseInt(durationInput.value);

        // Check if the input is a valid number
        if (isNaN(duration)) {
            alert("Please enter a valid duration.");
            return;
        }

        // Call the function to calculate the price
        const { price, durationExtras } = calculatePrice(duration);

        // Display the result in the HTML table
        displayResult(duration, price, durationExtras);
    });

    // Function to calculate the price
    function calculatePrice(duration) {
        const minDuration = 3;
        const maxDuration = 10;
        const minPrice = 8;
        const maxPrice = 18;
        const extras = { 'early_delivery': 0.001 };

        if (minDuration <= duration && duration <= maxDuration) {
            const mappedPrice = maxPrice - (duration - minDuration) * (maxPrice - minPrice) / (maxDuration - minDuration);
            const priceRange = maxPrice - minPrice;
            const durationRange = maxDuration - minDuration;

            const durationExtras = {};
            for (const extra in extras) {
                const modifier = extras[extra];
                const extraPrice = (minPrice + (duration - minDuration) * (maxPrice - minPrice) / (maxDuration - minDuration)) * modifier;
                durationExtras[extra] = extraPrice * 9000;
            }

            return { price: mappedPrice * 1000, durationExtras };
        }

        return { price: null, durationExtras: null };
    }

    // Function to display the result in the HTML table
    function displayResult(duration, price, durationExtras) {
        const newRow = resultTable.insertRow(-1);

        if (duration >= 4 && duration <= 9) {
            newRow.insertCell(0).textContent = `Duration : ${duration} months`;
            newRow.insertCell(1).textContent = price ? Math.floor(price) : "N/A";
            newRow.insertCell(2).textContent = price ? `${Math.floor(price / (duration * 2))} per sprint for ${duration * 2} sprints` : "N/A";
            newRow.insertCell(3).textContent = durationExtras ? JSON.stringify(durationExtras) : "N/A";
            newRow.insertCell(4).textContent = price ? Math.floor(price / (duration * 30)) : "N/A";
        } else {
            alert(`Cette durée est impossible: ${duration} mois`)
        }
    }
});
