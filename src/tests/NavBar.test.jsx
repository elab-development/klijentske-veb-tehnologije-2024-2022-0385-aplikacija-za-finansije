import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar"; 

describe("Navbar Component", () => {
    const renderNavbar = () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Navbar />
            </MemoryRouter>
        );
    };

    it("renders all navigation links correctly", () => {
        renderNavbar();

        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Finances")).toBeInTheDocument();
        expect(screen.getByText("Planning")).toBeInTheDocument();
    });

    it("applies the active class to the current route", () => {
        renderNavbar();
        expect(screen.getByText("Dashboard")).toHaveClass("active");
    });
});
