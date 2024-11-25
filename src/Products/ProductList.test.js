import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProductList from "./ProductList";

jest.mock("../Components/NotFound", () => () => <div>No Products Found</div>);

describe("ProductList Component", () => {
    const mockApiUrl = "http://mock-api.com";

    beforeEach(() => {
        process.env.REACT_APP_API_URL = mockApiUrl;
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test("renders loading state initially", () => {
        fetch.mockImplementation(() => new Promise(() => {}));
        render(
            <BrowserRouter>
                <ProductList />
            </BrowserRouter>
        );
        expect(screen.getAllByText(/Loading.../i).length).toBeGreaterThan(0);
    });

    test("renders products and categories after fetch", async () => {
        const mockProducts = [
            { id: 1, name: "Product 1", price: 10.99, categoryName: "Category 1", imagePath: "image1.jpg" },
            { id: 2, name: "Product 2", price: 15.49, categoryName: "Category 2", imagePath: null },
        ];
        const mockCategories = [{ id: 1, name: "Category 1" }, { id: 2, name: "Category 2" }];

        fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValue(mockProducts),
        });
        fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValue(mockCategories),
        });

        render(
            <BrowserRouter>
                <ProductList />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Products On Record")).toBeInTheDocument();
            expect(screen.getByText("Product 1")).toBeInTheDocument();
            expect(screen.getByText("Product 2")).toBeInTheDocument();
            expect(screen.getByText("Category 1")).toBeInTheDocument();
        });
    });

    test("filters products by category", async () => {
        const mockProducts = [
            { id: 1, name: "Product 1", price: 10.99, categoryName: "Category 1", imagePath: "image1.jpg" },
            { id: 2, name: "Product 2", price: 15.49, categoryName: "Category 2", imagePath: null },
        ];
        const mockCategories = [{ id: 1, name: "Category 1" }, { id: 2, name: "Category 2" }];

        fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValue(mockProducts),
        });
        fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValue(mockCategories),
        });

        render(
            <BrowserRouter>
                <ProductList />
            </BrowserRouter>
        );

        await waitFor(() => screen.getByText("Products On Record"));

        const categorySelect = screen.getByRole("combobox");
        fireEvent.change(categorySelect, { target: { value: "Category 1" } });

        expect(screen.getByText("Product 1")).toBeInTheDocument();
        expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
    });

    test("filters products by search query", async () => {
        const mockProducts = [
            { id: 1, name: "Product 1", price: 10.99, categoryName: "Category 1", imagePath: "image1.jpg" },
            { id: 2, name: "Product 2", price: 15.49, categoryName: "Category 2", imagePath: null },
        ];
        const mockCategories = [{ id: 1, name: "Category 1" }, { id: 2, name: "Category 2" }];

        fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValue(mockProducts),
        });
        fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValue(mockCategories),
        });

        render(
            <BrowserRouter>
                <ProductList />
            </BrowserRouter>
        );

        await waitFor(() => screen.getByText("Products On Record"));

        const searchInput = screen.getByPlaceholderText("Search products...");
        fireEvent.change(searchInput, { target: { value: "Product 2" } });

        expect(screen.getByText("Product 2")).toBeInTheDocument();
        expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
    });

    test("handles errors gracefully", async () => {
        fetch.mockRejectedValue(new Error("Network Error"));

        render(
            <BrowserRouter>
                <ProductList />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Error/i)).toBeInTheDocument();
        });
    });
});
