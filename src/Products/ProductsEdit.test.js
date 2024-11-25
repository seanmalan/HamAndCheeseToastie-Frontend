import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import ProductsEdit from "./ProductsEdit";

// Mock fetch API
global.fetch = jest.fn();

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: "1" }),
}));

describe("ProductsEdit Component", () => {
    const mockProduct = {
        id: 1,
        name: "Test Product",
        price: "100",
        description: "Test Description",
        brandName: "Test Brand",
        weight: "1kg",
        categoryName: "Test Category",
        currentStockLevel: "50",
        minimumStockLevel: "10",
        wholesalePrice: "80",
        eaN13Barcode: "1234567890123",
        imagePath: "test-image.jpg",
    };

    const renderComponent = (authContextValue) => {
        render(
            <AuthContext.Provider value={authContextValue}>
                <BrowserRouter>
                    <ProductsEdit />
                </BrowserRouter>
            </AuthContext.Provider>
        );
    };

    beforeEach(() => {
        fetch.mockImplementation((url) => {
            if (url.includes("/product/1")) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(mockProduct),
                });
            }
            return Promise.reject("Fetch failed");
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders loading state initially", () => {
        renderComponent({ isAuthenticated: true, user: { role: 1 } });
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test("renders product details when data is fetched successfully", async () => {
        renderComponent({ isAuthenticated: true, user: { role: 1 } });

        await waitFor(() => {
            expect(screen.getByDisplayValue(mockProduct.name)).toBeInTheDocument();
            expect(screen.getByDisplayValue(mockProduct.price)).toBeInTheDocument();
        });

        expect(screen.getByAltText(mockProduct.name)).toHaveAttribute(
            "src",
            expect.stringContaining(mockProduct.imagePath)
        );
    });

    test("shows an error message if fetching product details fails", async () => {
        fetch.mockImplementationOnce(() => Promise.reject("Fetch failed"));

        renderComponent({ isAuthenticated: true, user: { role: 1 } });

        await waitFor(() => {
            expect(screen.getByText(/error/i)).toBeInTheDocument();
        });
    });

    test("handles form input changes", async () => {
        renderComponent({ isAuthenticated: true, user: { role: 1 } });

        await waitFor(() => {
            expect(screen.getByDisplayValue(mockProduct.name)).toBeInTheDocument();
        });

        const nameInput = screen.getByLabelText(/product name:/i);
        fireEvent.change(nameInput, { target: { value: "Updated Product Name" } });

        expect(nameInput).toHaveValue("Updated Product Name");
    });

    test("submits updated product details", async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({ ok: true }));

        renderComponent({ isAuthenticated: true, user: { role: 1 } });

        await waitFor(() => {
            expect(screen.getByDisplayValue(mockProduct.name)).toBeInTheDocument();
        });

        const submitButton = screen.getByText(/update product/i);
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining("/product/1"),
                expect.objectContaining({
                    method: "PUT",
                })
            );
            expect(mockNavigate).toHaveBeenCalledWith("/");
        });
    });

    test("conditionally renders price field for authorized roles", async () => {
        renderComponent({ isAuthenticated: true, user: { role: 1 } });

        await waitFor(() => {
            expect(screen.getByLabelText(/price:/i)).toBeInTheDocument();
        });

        renderComponent({ isAuthenticated: true, user: { role: 3 } });

        await waitFor(() => {
            expect(screen.queryByLabelText(/price:/i)).not.toBeInTheDocument();
        });
    });
});
