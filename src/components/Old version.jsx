import { useState, useEffect } from "react";
import { Container, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
// import MyChart from "../components/LineChart";
import Transaction from "../components/Transaction";
import "./Dashboard.css";
import MyBarChart from "../components/BarChart";


// eslint-disable-next-line react/prop-types
export default function Dashboard({ transactions, addTransaction }) {
    const [income, setIncome] = useState(0);
    const [spent, setSpent] = useState(0);
    const [balance, setBalance] = useState(0);

    // Dialog state
    const [open, setOpen] = useState(false);
    const [dialogType, setDialogType] = useState('add'); // 'add' or 'subtract'
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState(''); // New state for description

    // Chart
    const [month, setMonth] = useState(new Date().getMonth() + 1);

    // Calculate balance
    useEffect(() => {
        setBalance(income - spent);
    }, [income, spent]);

    // Handlers for Dialog
    const handleOpen = (type) => {
        setDialogType(type);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setAmount('');
        setDescription(''); // Clear description
    };

    const handleSubmit = () => {
        const value = Number(amount);
        const newTransaction = {
            // eslint-disable-next-line react/prop-types
            id: transactions.length + 1,
            isIncome: dialogType === 'add',
            amount: value,
            date: new Date(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate(),
            description: description || (dialogType === 'add' ? "Income" : "Expense"), // Use input description if available
        };

        if (dialogType === 'add') {
            setIncome((prev) => prev + value);
        } else if (dialogType === 'subtract') {
            setSpent((prev) => prev + value);
        }

        addTransaction(newTransaction);
        handleClose();
    };

    const handleSelectChange = (event) => {
        console.log("Dashboard number" + month)
        if (!(event.target.value <= 12 ||  event.target.value >= 1)){
            const date = new Date()
            const currentMonth = date.getMonth();
            setMonth(currentMonth)
        }
        else setMonth(Number(event.target.value));
        console.log("Dashboard number" + month)
    }

    return (
        <>
            <Container
                sx={{
                    overflow: "hidden"
                }}
            >
                <h1>Welcome back, 👋!</h1>
                <fieldset>
                    <legend>
                        Dashboard
                    </legend>

                    <div className="container">

                        {/* income spent and balance stuff */}

                        <div className="total">
                            <div className="income">
                                <div>Total income: <span>{income}$</span></div>
                                <button
                                    onClick={() => handleOpen('add')}
                                    className="buttonIncome"
                                >
                                    ADD INCOME
                                </button>
                            </div>

                            <div className="spent">
                                <div>Total spending: <span>{spent}$</span></div>
                                <button
                                    className="buttonSpent"
                                    onClick={() => handleOpen('subtract')}
                                >
                                    ADD EXPENSE
                                </button>
                            </div>

                            <div className="balance">
                                <div>Total balance: <span>{balance}$</span></div>
                            </div>
                        </div>

                        {/* about the graph stuff */}

                        <div className="selectMonth">

                            <label htmlFor="months">Choose a month:</label>
                            <select 
                                id="months" 
                                className="dropDown" 
                                onChange={handleSelectChange}
                            >
                                <option value=""></option>
                                <option value="1">Januray</option>
                                <option value="2">February</option>
                                <option value="3">March </option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>

                        </div>
                        
                        <div className="graph">
                            {/* <MyChart selectedMonth={month}/> */}
                            <MyBarChart/>
                        </div>
                    </div>
                </fieldset>

                <div className="transactionsList" id="expenses">
                  
                    <label htmlFor="expenses">Recent Spending</label>
                    <div className="wrapperList">
                        {/* eslint-disable-next-line react/prop-types */}
                        {transactions.map((transaction) => (
                            <Transaction key={transaction.id} transaction={transaction} />
                        ))}
                    </div>

                </div>

                <Dialog open={open} onClose={handleClose} 
                    sx={{
                        ".MuiDialog-container": "orange",
                    }}>
                    <DialogTitle>{dialogType === 'add' ? 'Add Income' : 'Add Expense'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Amount"
                            type="number"
                            fullWidth
                            variant="standard"
                            inputProps={{ maxLength: 10}}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={description}
                            inputProps={{ maxLength: 15}}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    );
}
