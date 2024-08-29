import "./App.css";
import Dashboard from "./pages/Dashboard";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Finances from "./pages/Finances";
import listOfTransactions, {
    totalBalance,
    totalIncome,
    totalSpending,
} from "./components/ListOfTransactions";
import { MantineProvider } from "@mantine/core";
import Planning from "./pages/Planning";
import Navbar from "./components/NavBar";
import TipsResources from "./components/Tips&Resources";

function App() {
    const [transactions, setTransactions] = useState(listOfTransactions);

    const [balance, setBalance] = useState(totalBalance);
    const [income, setIncome] = useState(totalIncome);
    const [spent, setSpent] = useState(totalSpending);

    const addTransaction = (newTransaction) => {
        setTransactions([...transactions, newTransaction]);

        if (newTransaction.isIncome) {
            setIncome((prev) => prev + newTransaction.amount);
        } else {
            setSpent((prev) => prev + newTransaction.amount);
        }

        console.log("Parent");
        console.log(transactions);
    };

    useEffect(() => {
        setBalance(income - spent);
    }, [income, spent]);

    return (
        <>
            <MantineProvider>
                <Router>
                    <Navbar />

                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Dashboard
                                    transactions={transactions}
                                    addTransaction={addTransaction}
                                    income={income}
                                    spent={spent}
                                    balance={balance}
                                />
                            }
                        />

                        <Route
                            path="finances"
                            element={
                                <Finances
                                    transactions={transactions}
                                    addTransaction={addTransaction}
                                />
                            }
                        />

                        <Route
                            path="planning"
                            element={
                                <Planning addTransaction={addTransaction} />
                            }
                        />
                    </Routes>

                    <TipsResources />
                </Router>
            </MantineProvider>
        </>
    );
}

export default App;
