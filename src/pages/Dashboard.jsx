import { useState } from "react";
import { Container, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import Transaction from "../components/Transaction";
import "./Dashboard.css";
import MyBarChart from "../components/BarChart";
import { v4 as uuidv4 } from "uuid"


// eslint-disable-next-line react/prop-types
export default function Dashboard({ transactions, addTransaction, income, spent, balance }) {

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState(''); 

    // Dialog state
    const [open, setOpen] = useState(false);
    const [dialogType, setDialogType] = useState('add');

    // Handlers for Dialog
    const handleOpen = (type) => {
        setDialogType(type);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setAmount('');
        setDescription('');
    };

    const handleSubmit = () => {
        const value = Number(amount);
        const newTransaction = {
            id: uuidv4(),
            isIncome: dialogType === 'add',
            amount: value,
            date: new Date(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate(),
            description: description || (dialogType === 'add' ? "Income" : "Expense"),
        };

        addTransaction(newTransaction);
        handleClose();
    };

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
                        <div className="graph">
                            <MyBarChart transactions={transactions} />
                        </div>
                    </div>
                </fieldset>

                <div className="transactionsList" id="expenses">
                    <label htmlFor="expenses">Recent Spending</label>
                    <div className="wrapperList">
                        {
                        transactions
                        // eslint-disable-next-line react/prop-types
                        .slice()
                        .reverse()
                        .map((transaction) => (
                            <Transaction key={transaction.id} transaction={transaction} />
                        ))}
                    </div>
                </div>

                {/* here it is  */}

                <Dialog open={open} onClose={handleClose}>
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
