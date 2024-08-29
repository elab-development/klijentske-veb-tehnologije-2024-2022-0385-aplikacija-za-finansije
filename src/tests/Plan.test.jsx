import { describe, expect, vi, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Plan, { CompletedPlan } from "../components/Plan"; 
import "@testing-library/jest-dom";

describe("Plan", () => {
    const mockHandleAddToPlan = vi.fn();
    const mockAddTransaction = vi.fn();

    it("renders Plan with correct title and progress", () => {
        render(
            <Plan
                id={1}
                title="Savings Goal"
                value={50}
                max={100}
                handleAddToPlan={mockHandleAddToPlan}
                addTransaction={mockAddTransaction}
            />
        );

        expect(screen.getByText("Savings Goal")).toBeInTheDocument();
        expect(screen.getByText("50%")).toBeInTheDocument();
    });

    it("renders CompletedPlan with 100% progress", () => {
        render(
            <CompletedPlan
                id={2}
                title="Completed Goal"
                value={100}
                max={100}
            />
        );

        expect(screen.getByText("Completed Goal")).toBeInTheDocument();
        expect(screen.getByText("100%")).toBeInTheDocument();
    });
});
