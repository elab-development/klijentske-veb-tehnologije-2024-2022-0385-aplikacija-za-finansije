import { Container } from "@mui/material";
import "./Finances.css";
import { useState, useEffect } from "react";
import MyChart from "../components/LineChart";
import MyTable from "../components/MyTable";
import { v4 as uuidv4 } from "uuid";

// eslint-disable-next-line react/prop-types
export default function Finances({ transactions, addTransaction }) {
    const [inputAmount, setInputAmount] = useState("");
    const [inputDescription, setInputDescription] = useState("");

    const [isIncome, setIsIncome] = useState(""); // State for radio button
    const [month, setMonth] = useState(new Date().getMonth() + 1);

    const handleSelectChange = (event) => {
        setMonth(Number(event.target.value));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!isIncome || !inputAmount) {
            alert("Please fill in all fields.");
            return;
        }

        const newTransaction = {
            id: uuidv4(),
            isIncome: isIncome === "1",
            amount: parseFloat(inputAmount),
            date: new Date(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate(),
            description:
                inputDescription || (isIncome === "1" ? "Income" : "Expense"),
        };

        setInputAmount("");
        setInputDescription("");

        setIsIncome("");

        addTransaction(newTransaction);
        console.log("New transaction added");
        console.log(transactions);
    };

    useEffect(() => {
        console.log("Transaciton updated");
        console.log(transactions);
    }, [transactions]);
	
    return (
        <>
            <Container>
                <div className="containerFinances">
                    <div className="graphAndSelecter">
                        <div className="selectMonth">
                            <label htmlFor="months">Choose a month:</label>
                            <select
                                id="months"
                                className="dropDown"
                                onChange={handleSelectChange}
                                value={month}
                            >
                                <option value=""></option>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
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

                        <div className="myChart">
                            <MyChart
                                transactions={transactions}
                                selectedMonth={month}
                            />
                        </div>
                    </div>

                    <form className="newForm" onSubmit={handleSubmit}>
                        <div className="descAndradioAndamount">
                            <div className="radioAndamount">
                                <div className="newRadio">
                                    <input
                                        type="radio"
                                        id="radioIncome"
                                        name="radio"
                                        value="1"
                                        checked={isIncome === "1"} // Bind checked to state
                                        onChange={(e) =>
                                            setIsIncome(e.target.value)
                                        }
                                    />
                                    <label htmlFor="radioIncome">Income</label>

                                    <input
                                        type="radio"
                                        name="radio"
                                        id="radioExpense"
                                        value="2"
                                        checked={isIncome === "2"} // Bind checked to state
                                        onChange={(e) =>
                                            setIsIncome(e.target.value)
                                        }
                                    />
                                    <label htmlFor="radioExpense">
                                        Expense
                                    </label>
                                </div>

                                <input
                                    className="newAmount"
                                    placeholder="$"
                                    value={inputAmount}
                                    onChange={(e) =>
                                        setInputAmount(e.target.value)
                                    } // Bind value to state
                                    maxLength={6}
                                />
                            </div>

                            <input
                                className="newDescription"
                                placeholder="Description"
                                value={inputDescription}
                                onChange={(e) =>
                                    setInputDescription(e.target.value)
                                } // Bind value to state
                                maxLength={30}
                            />
                        </div>

                        <button className="newSubmit" type="submit">
                            Add Record
                        </button>
                    </form>

                    {/* Table */}
                    <MyTable transactions={transactions} />
                </div>
            </Container>
        </>
    );
}
