let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const currencyUnit = {
  "ONE HUNDRED": 100.0,
  "TWENTY": 20.0,
  "TEN": 10.0,
  "FIVE": 5.0,
  "ONE": 1.0,
  "QUARTER": 0.25,
  "DIME": 0.1,
  "NICKEL": 0.05,
  "PENNY": 0.01
};

document.getElementById('price').textContent = price;

function updateDrawerDisplay() {
    const drawerDisplay = document.getElementById('drawer-display');
    drawerDisplay.innerHTML = cid.map(([currency, amount]) => `
        <div class="drawer-item">
            <div>${currency}</div>
            <div>$${amount.toFixed(2)}</div>
        </div>
    `).join('');
}

function formatChange(changeArr, status) {
    return changeArr
        .filter(([, amount]) => amount > 0) // Only show denominations with amount > 0
        .map(([currency, amount]) => `${currency}: $${amount}`)
        .join(' ');
}

function checkCashRegister(price, cash, cid) {
    let change = cash - price;
    let totalCid = cid.reduce((acc, curr) => acc + curr[1], 0);
    totalCid = Math.round(totalCid * 100) / 100; // Fix floating point precision
    change = Math.round(change * 100) / 100; // Fix floating point precision
    
    if (totalCid < change) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
    
    if (totalCid === change) {
        return { status: "CLOSED", change: cid };
    }
    
    const changeArray = [];
    const reversedCid = [...cid].reverse();

    for (let elem of reversedCid) {
        let curr = elem[0];
        let currSum = elem[1];
        let amount = 0;
        
        while (change >= currencyUnit[curr] && currSum > 0) {
            amount += currencyUnit[curr];
            change = Math.round((change - currencyUnit[curr]) * 100) / 100;
            currSum -= currencyUnit[curr];
        }
        
        if (amount !== 0) {
            changeArray.push([curr, amount]);
        }
    }
    
    if (change > 0) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
    
    return { status: "OPEN", change: changeArray };
}

document.getElementById('purchase-btn').addEventListener('click', function() {
    const cashInput = document.getElementById('cash');
    const changeDueDisplay = document.getElementById('change-due');
    const cash = parseFloat(cashInput.value);

    changeDueDisplay.className = '';

    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    if (cash === price) {
        changeDueDisplay.textContent = "No change due - customer paid with exact cash";
        return;
    }

    const result = checkCashRegister(price, cash, [...cid]);
    
    if (result.status === "INSUFFICIENT_FUNDS") {
        changeDueDisplay.className = 'status-insufficient';
        changeDueDisplay.textContent = "Status: INSUFFICIENT_FUNDS";
    } else if (result.status === "CLOSED") {
        changeDueDisplay.className = 'status-closed';
        changeDueDisplay.textContent = `Status: CLOSED ${formatChange(result.change, "CLOSED")}`;
    } else {
        changeDueDisplay.className = 'status-open';
        changeDueDisplay.textContent = `Status: OPEN ${formatChange(result.change, "OPEN")}`;
    }

    updateDrawerDisplay();
});

// Initialize drawer display
updateDrawerDisplay();
