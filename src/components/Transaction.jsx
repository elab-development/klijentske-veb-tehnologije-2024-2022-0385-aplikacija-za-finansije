import "./Transaction.css"
import PropTypes from "prop-types";

export default function Transaction({ transaction }) {
  const { isIncome, amount, date, description } = transaction;
  
  return (
      <div className={`transaction ${isIncome ? "revenue" : "expense"}`}>
        <div className="amount">{isIncome ? "+" : "-"}${amount}</div>
        <div className="description">{description}</div>
        <div className="date">{new Date(date).toLocaleDateString()}</div>
      </div>
  );
}

Transaction.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isIncome: PropTypes.bool.isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    month: PropTypes.number.isRequired,
    day: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

// Transaction 

{ /*
  id: transactions.length + 1,
  isIncome: dialogType === 'add',
  amount: value,
  date: new Date(),
  month: new Date().getMonth() + 1,
  day: new Date().getDate(),
  description: description || (dialogType === 'add' ? "Income" : "Expense")  
*/}


// Delete later!!!

{/*
  const transactions = [
    { date: '2024-01-15', amount: 100 },
    { date: '2024-01-20', amount: 150 },
    { date: '2024-02-10', amount: 200 },
    { date: '2024-02-25', amount: 250 },
    { date: '2024-03-05', amount: 300 },
];

// Function to calculate average for a specific month

const calculateMonthlyAverage = (transactions, month) => {
    // Filter transactions for the specific month
    const filteredTransactions = transactions.filter(transaction =>
        new Date(transaction.date).getMonth() + 1 === month
    );

    // Calculate the total amount for that month
    const totalAmount = filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

    // Calculate and return the average
    return filteredTransactions.length > 0 ? totalAmount / filteredTransactions.length : 0;
};

console.log(calculateMonthlyAverage(transactions, 2)); // Output: 225 (for February)

*/}

// import React, { useMemo } from 'react';

// const TransactionComponent = ({ transactions, month }) => {
//     // Calculate average using useMemo to prevent unnecessary recalculations
//     const average = useMemo(() => {
//         return calculateMonthlyAverage(transactions, month);
//     }, [transactions, month]); // Dependencies: Recompute only if transactions or month changes

//     return (
//         <div>
//             <h2>Average for month {month}: {average}</h2>
//         </div>
//     );
// };

// export default TransactionComponent;import React, { useMemo } from 'react';

// const TransactionComponent = ({ transactions, month }) => {
//     // Calculate average using useMemo to prevent unnecessary recalculations
//     const average = useMemo(() => {
//         return calculateMonthlyAverage(transactions, month);
//     }, [transactions, month]); // Dependencies: Recompute only if transactions or month changes

//     return (
//         <div>
//             <h2>Average for month {month}: {average}</h2>
//         </div>
//     );
// };

// export default TransactionComponent;