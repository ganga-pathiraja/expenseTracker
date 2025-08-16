const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseList = document.getElementById('expense-list');
const totalAmountDisplay = document.getElementById('total-amount');

let expenses = [];


window.onload = () => {
  const savedExpenses = localStorage.getItem('expenses');
  if (savedExpenses) {
    expenses = JSON.parse(savedExpenses);
    renderExpenses();
  }
};

expenseForm.addEventListener('submit', e => {
  e.preventDefault();
  addExpense();
});

function addExpense() {
  const name = expenseNameInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value);

  if (name === '' || isNaN(amount) || amount <= 0) {
    alert('Please enter a valid expense name and amount.');
    return;
  }

  const expense = {
    id: Date.now(),
    name,
    amount
  };

  expenses.push(expense);
  saveExpenses();
  renderExpenses();

  expenseNameInput.value = '';
  expenseAmountInput.value = '';
}

function renderExpenses() {
  expenseList.innerHTML = '';

  let total = 0;
  expenses.forEach(expense => {
    total += expense.amount;

    const li = document.createElement('li');
    li.innerHTML = `
      <span>${expense.name}</span>
      <span>${expense.amount.toFixed(2)} LKR 
        <button onclick="deleteExpense(${expense.id})" title="Delete">&times;</button>
      </span>
    `;
    expenseList.appendChild(li);
  });

  totalAmountDisplay.textContent = total.toFixed(2);
}

function deleteExpense(id) {
  expenses = expenses.filter(expense => expense.id !== id);
  saveExpenses();
  renderExpenses();
}

function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}
