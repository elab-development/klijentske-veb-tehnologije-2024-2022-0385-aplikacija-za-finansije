import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Transaction from "../components/Transaction"; // Adjust the import path as necessary

describe('Transaction Component', () => {
  it('renders transaction details correctly', () => {
    const mockTransaction = {
      isIncome: true,
      amount: 150,
      date: '2024-08-01',
      description: 'Salary'
    };
    
    render(<Transaction transaction={mockTransaction} />);
    
    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('8/1/2024')).toBeInTheDocument();
  });

  it('applies the correct class based on isIncome prop', () => {
    const incomeTransaction = {
      isIncome: true,
      amount: 150,
      date: '2024-08-01',
      description: 'Salary'
    };
    
    const expenseTransaction = {
      isIncome: false,
      amount: 50,
      date: '2024-08-02',
      description: 'Groceries'
    };
    
    const { container: incomeContainer } = render(<Transaction transaction={incomeTransaction} />);
    const { container: expenseContainer } = render(<Transaction transaction={expenseTransaction} />);
    
    expect(incomeContainer.querySelector('.transaction')).toHaveClass('revenue');
    expect(expenseContainer.querySelector('.transaction')).toHaveClass('expense');
  });
});
