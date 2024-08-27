import { useState } from "react";
import { Container } from "@mui/material";
import "./Planning.css";
import listOfPlans from "../components/ListOfPlans";
import Plan, { CompletedPlan } from "../components/Plan";
import { v4 as uuidv4 } from "uuid";

// eslint-disable-next-line react/prop-types
export default function Planning( { addTransaction } ) {
    const [plans, setPlans] = useState(listOfPlans);

    const handleAddToPlan = (id, amount) => {
        setPlans(plans.map(plan => 
            plan.id === id 
                ? { ...plan, value: plan.value + amount } 
                : plan
        ));
    };

    const activePlans = plans.filter(plan => plan.value < plan.max);
    const completedPlans = plans.filter(plan => plan.value >= plan.max);

    return (
        <Container>
            <div className="containerPlanning">

                <div className="planningTitle">
                    Planning
                </div>
                <div className="activeGoals">
                    Active Goals
                </div>

                <form 
                    className="addPlan"
                    onSubmit={(event) => {
                        event.preventDefault();

                        const inputAmount = document.querySelector(".planAmount");
                        const inputTitle = document.querySelector(".planTitle");

                        const newPlan = {
                            id: plans.length + 1,
                            title: inputTitle.value,
                            value: 0,
                            max: Number(inputAmount.value)
                        };

                        setPlans([...plans, newPlan]);


                        const newTransaction = {
                            id: uuidv4(),
                            isIncome: false, 
                            amount: parseFloat(inputAmount.value), 
                            date: new Date(),
                            month: new Date().getMonth() + 1,
                            day: new Date().getDate(),
                            description: "New goal: " + inputTitle.value
                        }

                        addTransaction(newTransaction)

                        inputAmount.value = "";
                        inputTitle.value = "";
                    }}
                >   
                    <div className="amountAndButton">
                        <input 
                            className="planAmount"
                            type="number" 
                            placeholder="$"
                            maxLength={7}
                        />
                        <button
                            className="btnPlan"
                            type="submit"
                        >
                            Add Plan
                        </button>
                    </div>
                    <input 
                        className="planTitle"
                        type="text" 
                        placeholder="Title"
                        maxLength={30}
                    />   

                    <div className="completedGoalsConatiner">
                        
                        {completedPlans.length > 0 && (
                            <div className="completedGoals">
                                <h3>Completed Goals</h3>
                                <div className="listOfCompletedPlans">
                                    {completedPlans
                                    .slice()
                                    .reverse()
                                    .map((element) => 
                                        <CompletedPlan 
                                            key={element.id}
                                            id={element.id} 
                                            title={element.title} 
                                            value={element.value}
                                            max={element.max}
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </form>

                <div className="listOfPlans">
                    {activePlans
                    .slice()
                    .reverse()
                    .map((element) => 
                        <Plan 
                            key={element.id}
                            id={element.id} 
                            title={element.title} 
                            value={element.value}
                            max={element.max}
                            handleAddToPlan={handleAddToPlan}
                            addTransaction={addTransaction}
                        />
                    )}
                </div>

                
            </div>
        </Container>
    );
}