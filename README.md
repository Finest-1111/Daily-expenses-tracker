# Neo Daily Ledger Dashboard

A modern dashboard for tracking daily milk and newspaper expenses with real-time calculations and monthly ledger management.

---

## Features

- Real-time milk expense calculation
- Real-time newspaper expense calculation
- Automatic total daily billing
- Dynamic ledger history
- Monthly delivery statistics
- Interactive milk type selection
- Enable/Disable delivery toggles
- Modern dark themed UI

---

## Expense Calculation Logic

### Milk Expense
```javascript
milkCost = quantity × rate
```

Example:
```javascript
2L × ₹70 = ₹140
```

---

### Newspaper Expense
```javascript
paperCost = daily newspaper rate
```

Example:
```javascript
₹6.50
```

---

### Total Expense
```javascript
totalCost = milkCost + paperCost
```

Example:
```javascript
₹140 + ₹6.50 = ₹146.50
```

---

## Core Functions

### updateLiveSummary()
Calculates:
- Milk cost
- Newspaper cost
- Total expense

Updates values instantly in the dashboard UI.

---

### renderLedgerAndStats()
Handles:
- Ledger table rendering
- Monthly statistics updates
- Total billing calculations

---

### initializeEvents()
Registers:
- Input listeners
- Toggle interactions
- Save button actions
- Reset actions

---

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript

---

## How It Works

1. User enters milk quantity and rate
2. User enters newspaper details
3. System calculates expenses instantly
4. Clicking **Save Daily Entry** stores the record
5. Ledger and monthly statistics update automatically

---

## Monthly Statistics

Tracks:
- Total milk delivery days
- Total newspaper delivery days
- Combined monthly billing amount

---

## Browser Support

- Chrome
- Edge
- Firefox
- Safari
- Brave

---

## Future Improvements

- LocalStorage support
- PDF invoice generation
- Cloud synchronization
- Graph analytics
- Mobile app support

---