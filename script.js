// --- Core Application State Structure ---
let appState = {
    history: [
        { date: 'May 28', milk: 'Cow Milk 2L', paper: 'TOI', total: 146.50, countsMilk: true, countsPaper: true },
        { date: 'May 27', milk: 'Buffalo 1.5L', paper: 'HT', total: 133.00, countsMilk: true, countsPaper: true }
    ],
    selectedMilkType: 'Cow Milk'
};

// --- DOM References ---
const milkToggle = document.getElementById('milk-toggle');
const milkOptions = document.querySelectorAll('.option');
const milkQtyInput = document.getElementById('milk-qty');
const milkRateInput = document.getElementById('milk-rate');

const paperToggle = document.getElementById('paper-toggle');
const paperNameInput = document.getElementById('paper-name');
const paperRateInput = document.getElementById('paper-rate');

const liveMilkCost = document.getElementById('live-milk-cost');
const livePaperCost = document.getElementById('live-paper-cost');
const liveTotalCost = document.getElementById('live-total-cost');

const ledgerRows = document.getElementById('ledger-rows');
const saveEntryBtn = document.getElementById('save-entry');

const statMilkCount = document.getElementById('stat-milk-count');
const statPaperCount = document.getElementById('stat-paper-count');
const statTotalBilling = document.getElementById('stat-total-billing');

// --- Calculation Functions ---
function updateLiveSummary() {
    let milkCost = 0;
    let paperCost = 0;

    // Evaluate Milk Toggles and Inputs
    if (milkToggle.checked) {
        document.querySelectorAll('#milk-section .input').forEach(el => el.disabled = false);
        milkOptions.forEach(el => el.classList.remove('disabled'));
        const qty = parseFloat(milkQtyInput.value) || 0;
        const rate = parseFloat(milkRateInput.value) || 0;
        milkCost = qty * rate;
    } else {
        document.querySelectorAll('#milk-section .input').forEach(el => el.disabled = true);
        milkOptions.forEach(el => el.classList.add('disabled'));
    }

    // Evaluate Newspaper Toggles and Inputs
    if (paperToggle.checked) {
        document.querySelectorAll('#paper-section .input').forEach(el => el.disabled = false);
        paperCost = parseFloat(paperRateInput.value) || 0;
    } else {
        document.querySelectorAll('#paper-section .input').forEach(el => el.disabled = true);
    }

    const totalCost = milkCost + paperCost;

    // Render Metrics Directly to UI Elements
    liveMilkCost.innerText = `₹${milkCost.toFixed(2)}`;
    livePaperCost.innerText = `₹${paperCost.toFixed(2)}`;
    liveTotalCost.innerText = `₹${totalCost.toFixed(2)}`;
}

// --- Dynamic Ledger Renderer ---
function renderLedgerAndStats() {
    ledgerRows.innerHTML = '';
    let milkDeliveryCount = 0;
    let paperDeliveryCount = 0;
    let combinedBillSum = 0;

    appState.history.forEach(entry => {
        if(entry.countsMilk) milkDeliveryCount++;
        if(entry.countsPaper) paperDeliveryCount++;
        combinedBillSum += entry.total;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.date}</td>
            <td>${entry.milk}</td>
            <td>${entry.paper}</td>
            <td class="green">₹${entry.total.toFixed(2)}</td>
        `;
        ledgerRows.appendChild(row);
    });

    // Update Bottom Overview Scoreboard
    statMilkCount.innerText = milkDeliveryCount;
    statPaperCount.innerText = paperDeliveryCount;
    statTotalBilling.innerText = `₹${combinedBillSum.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

// --- Action Listeners & Operational Pipeline ---
function initializeEvents() {
    // Register active layout reactive state changes
    [milkQtyInput, milkRateInput, paperRateInput, milkToggle, paperToggle].forEach(element => {
        element.addEventListener('input', updateLiveSummary);
    });

    // Handle interactive Type Pill Selection
    milkOptions.forEach(option => {
        option.addEventListener('click', () => {
            if (milkToggle.checked) {
                milkOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                appState.selectedMilkType = option.getAttribute('data-type');
                milkRateInput.value = option.getAttribute('data-price');
                updateLiveSummary();
            }
        });
    });

    // Action execution on clicking Save Entry Button
    saveEntryBtn.addEventListener('click', () => {
        const today = new Date();
        const dateString = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        const isMilkDelivered = milkToggle.checked;
        const isPaperDelivered = paperToggle.checked;

        if (!isMilkDelivered && !isPaperDelivered) {
            alert("Please activate at least one item setup configuration before logging details.");
            return;
        }

        const qty = parseFloat(milkQtyInput.value) || 0;
        const milkText = isMilkDelivered ? `${appState.selectedMilkType} ${qty}L` : 'None';
        const paperText = isPaperDelivered ? (paperNameInput.value.trim() || 'Paper') : 'None';

        const milkCost = isMilkDelivered ? (qty * (parseFloat(milkRateInput.value) || 0)) : 0;
        const paperCost = isPaperDelivered ? (parseFloat(paperRateInput.value) || 0) : 0;
        const total = milkCost + paperCost;

        // Push values to application historical array timeline
        appState.history.unshift({
            date: dateString,
            milk: milkText,
            paper: paperText,
            total: total,
            countsMilk: isMilkDelivered,
            countsPaper: isPaperDelivered
        });

        renderLedgerAndStats();
        
        // Save Complete visual success feedback logic
        saveEntryBtn.innerText = "✓ Saved Successfully";
        saveEntryBtn.style.background = "#10b981";
        setTimeout(() => {
            saveEntryBtn.innerText = "Save Daily Entry";
            saveEntryBtn.style.background = "";
        }, 1500);
    });

    // Reset Engine Setup
    document.getElementById('btn-reset').addEventListener('click', () => {
        if(confirm("Are you sure you want to clear your billing data collection for this month?")) {
            appState.history = [];
            renderLedgerAndStats();
        }
    });

    // Placeholder interaction layout mapping for generation pipeline
    document.getElementById('btn-invoice').addEventListener('click', () => {
        alert("Generating dynamic PDF engine context... Your statement overview file summary is preparing downloading structures.");
    });
}

// --- App Entry Run Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Establish Live System Calendar Timestamps
    const today = new Date();
    document.getElementById('day').innerText = today.toLocaleDateString('en-US', { weekday: 'long' });
    document.getElementById('date').innerText = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    // 2. Initialize application configurations
    initializeEvents();
    updateLiveSummary();
    renderLedgerAndStats();
});