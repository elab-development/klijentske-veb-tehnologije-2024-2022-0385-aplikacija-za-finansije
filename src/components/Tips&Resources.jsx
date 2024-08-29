import { Component } from "react";
import "./Tips&Resources.css";

class TipsResources extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tips: [
                {
                    text: "Save at least 20% of your income.",
                    link: "https://www.investopedia.com/articles/personal-finance/010516/how-save-20-percent-your-income.asp",
                },
                {
                    text: "Invest in a diversified portfolio.",
                    link: "https://www.nerdwallet.com/article/investing/diversified-portfolio",
                },
                {
                    text: "Track your spending regularly.",
                    link: "https://www.moneyunder30.com/best-budgeting-apps",
                },
                {
                    text: "Set financial goals and stick to them.",
                    link: "https://www.thebalance.com/how-to-set-financial-goals-1289586",
                },
                {
                    text: "Use budgeting apps to manage finances.",
                    link: "https://www.nerdwallet.com/best/banking/budget-apps",
                },
                {
                    text: "Pay off high-interest debt first.",
                    link: "https://www.investopedia.com/articles/personal-finance/120415/should-you-pay-highestinterest-rate-debt-first.asp",
                },
                {
                    text: "Build an emergency fund covering 3-6 months of expenses.",
                    link: "https://www.thebalance.com/emergency-fund-how-and-why-you-need-one-1289587",
                },
                {
                    text: "Review your credit report annually.",
                    link: "https://www.consumerfinance.gov/ask-cfpb/how-do-i-get-a-copy-of-my-credit-report-en-5/",
                },
                {
                    text: "Consider contributing to a retirement account.",
                    link: "https://www.investopedia.com/terms/r/retirementaccount.asp",
                },
                {
                    text: "Understand the power of compound interest.",
                    link: "https://www.investopedia.com/terms/c/compoundinterest.asp",
                },
                {
                    text: "Regularly review and adjust your budget.",
                    link: "https://www.investopedia.com/how-to-create-a-budget-using-the-50-20-30-rule-5188160",
                },
            ],
            currentTipIndex: 0, 
            timerDuration: 5000,
            userSelected: false,
        };

        this.timer = null;
    }

    componentDidMount() {
        this.startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    startTimer = () => {
        this.timer = setInterval(this.nextTip, this.state.timerDuration);
    };

    resetTimer = () => {
        clearInterval(this.timer);
        this.startTimer();
    };

    nextTip = () => {
        this.setState((prevState) => {
            const nextIndex =
                (prevState.currentTipIndex + 1) % prevState.tips.length;
            return {
                currentTipIndex: nextIndex,
                timerDuration: 5000, // Reset to default duration after user selection
                userSelected: false,
            };
        });
        this.resetTimer();
    };

    handleSelection = (event) => {
        const selectedTipIndex = parseInt(event.target.value);
        this.setState({
            currentTipIndex: selectedTipIndex,
            timerDuration: 10000, // Increase timer after user selection
            userSelected: true,
        });
        this.resetTimer();
    };

    render() {
        const { tips, currentTipIndex } = this.state;
        const currentTip = tips[currentTipIndex];

        return (

			// maybe make it toggleable to it's not as distracting as it is now
			// maybe the toggle button could be a little lightbolb or something like that
            <div className="tips-resources">
                <h2>Tips & Resources</h2>
                <p>
                    {currentTip.text}
                    <a
                        href={currentTip.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn more
                    </a>
                </p>
                <div className="tips-resources-dropdown">
                    <label>Select a tip: </label>
                    <select
                        className="tipsSourceSelect"
                        onChange={this.handleSelection}
                        value={currentTipIndex}
                    >
                        {tips.map((tip, index) => (
                            <option key={index} value={index}>{`Tip ${
                                index + 1
                            }`}</option>
                        ))}
                    </select>
                </div>
            </div>
        );
    }
}

export default TipsResources;
