import { v4 as uuidv4 } from "uuid";

// eslint-disable-next-line react/prop-types
export default function Plan({ id, title, value, max, handleAddToPlan, addTransaction }) {
    return (
        <div className={`plan plan${id}`}>
            <div className="planHeader">
                <label 
                    htmlFor={`goalLabel goal${id}`}
                    className="goalLabel"
                >
                    {title}
                </label>
                <div className="inputToPlan">
                    <input 
                        type="number" 
                        className="inputPlan"
                        placeholder="$"
                    />
                    <button
                        className="buttonPlus"
                        onClick={() => {
                            const inputElement = document.querySelector(`.plan${id} .inputPlan`);
                            const inputValue = Number(inputElement.value);
                            handleAddToPlan(id, inputValue);

                            const newTransaction = {
                                id: uuidv4(),
                                isIncome: false, 
                                amount: parseFloat(inputValue.value), 
                                date: new Date(),
                                month: new Date().getMonth() + 1,
                                day: new Date().getDate(),
                                description: "Goal Expense"
                            }
    
                            addTransaction(newTransaction)


                            inputElement.value = "";
                        }}
                    >
                        +
                    </button>
                </div>
            </div>
            <div className="progress-bar-container">
                <div
                    className="progress-bar"
                    style={{ width: `${(value / max) * 100}%` }}
                >
                    <span className="progress-text">
                        {Math.round((value / max) * 100)}%
                    </span>
                </div>
            </div>
        </div>
    )
}

// eslint-disable-next-line react/prop-types
export function CompletedPlan({ id, title, value, max }) {
    return (
        <div className={`plan planCompleted plan${id}`}>
            <div className="planHeader">
                <label 
                    htmlFor={`goalLabel goal${id}`}
                    className="goalLabel"
                >
                    {title}
                </label>
                
            </div>
            <div className="progress-bar-container">
                <div
                    className="progress-bar"
                    style={{ width: `${(value / max) * 100}%` }}
                >
                    <span className="progress-text">
                        100%
                    </span>
                </div>
            </div>
        </div>
    )
}