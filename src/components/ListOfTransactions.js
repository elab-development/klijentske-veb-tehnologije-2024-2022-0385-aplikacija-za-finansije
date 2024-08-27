const listOfTransactions = [];
const numTransactions = 500;
let i = 0;

for (; i < numTransactions; i++) {
    listOfTransactions.push({
        id: i + 1,
        isIncome: Math.random() > 0.5, 
        amount: Math.floor(Math.random() * 1500) + 500,
        date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1), 
        month: (new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)).getMonth() + 1,
        day: (new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)).getDate(),
        description: Math.random() > 0.5 ? "Income" : "Expense" 
    });
}

let totalIncome = 0;
let totalSpending = 0;

listOfTransactions.forEach((element) => {
    element.isIncome? totalIncome += element.amount : totalSpending += element.amount;
})

const totalBalance = totalIncome - totalSpending;

export default listOfTransactions;
export {totalBalance, totalIncome, totalSpending};