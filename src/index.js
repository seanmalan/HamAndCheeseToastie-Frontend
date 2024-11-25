import React from "react";
import ReactDOM from "react-dom/client"; // Ensure you're using the correct ReactDOM package
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { AuthProvider } from "./Context/AuthContext";

// Get the root element
const rootElement = document.getElementById("root");

// Check if rootElement exists to avoid runtime errors
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);

    root.render(
        <React.StrictMode>
            <AuthProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AuthProvider>
        </React.StrictMode>
    );
} else {
    console.error("Root element not found. Ensure you have a <div id='root'></div> in your HTML.");
}
