// List of months
export const arrayOfMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const initializeMonthlyData = () => arrayOfMonths.map(() => 0);

export function calculateMonthlyData(transactions) {
    const incomeAmount = initializeMonthlyData();
    const expenseAmount = initializeMonthlyData();
    const incomeCount = initializeMonthlyData();
    const expenseCount = initializeMonthlyData();

    let totalIncomeAmount = 0;
    let totalExpenseAmount = 0;

    transactions.forEach(transaction => {
        const monthIndex = transaction.month - 1;
        if (transaction.isIncome) {
            incomeAmount[monthIndex] += transaction.amount;
            incomeCount[monthIndex] += 1;
            totalIncomeAmount += transaction.amount;
        } else {
            expenseAmount[monthIndex] += transaction.amount;
            expenseCount[monthIndex] += 1;
            totalExpenseAmount += transaction.amount;
        }
    });

    const averageIncome = incomeCount.map((count, index) => count > 0 ? incomeAmount[index] / count : 0);
    const averageExpense = expenseCount.map((count, index) => count > 0 ? expenseAmount[index] / count : 0);

    return {
        totalIncomeAmount,
        totalExpenseAmount,
        averageIncome,
        averageExpense
    };
}

const initializeDailyData = (daysInMonth) => Array(daysInMonth).fill(0);

export function calculateDailyData(transactions, month) {
    const daysInMonth = new Date(2024, month, 0).getDate();  // Get the number of days in the given month
    const incomeAmount = initializeDailyData(daysInMonth);
    const expenseAmount = initializeDailyData(daysInMonth);
    const incomeCount = initializeDailyData(daysInMonth);
    const expenseCount = initializeDailyData(daysInMonth);

    transactions.forEach(transaction => {
        if (transaction.month === month) {
            const dayIndex = transaction.day - 1; // Zero-based index for the day
            if (transaction.isIncome) {
                incomeAmount[dayIndex] += transaction.amount;
                incomeCount[dayIndex] += 1;
            } else {
                expenseAmount[dayIndex] += transaction.amount;
                expenseCount[dayIndex] += 1;
            }
        }
    });

    const averageIncome = incomeCount.map((count, index) => count > 0 ? incomeAmount[index] / count : 0);
    const averageExpense = expenseCount.map((count, index) => count > 0 ? expenseAmount[index] / count : 0);

    return {
        dailyIncomeAmount: incomeAmount,
        dailyExpenseAmount: expenseAmount,
        averageIncome,
        averageExpense
    };
}

