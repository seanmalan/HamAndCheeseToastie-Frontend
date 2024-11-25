import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import { AuthContext } from '../Context/AuthContext';
import {act} from "react";

describe('Header', () => {
    const renderWithRouter = (ui, { route = '/' } = {}) => {
        window.history.pushState({}, 'Test page', route);
        return render(ui, { wrapper: Router });
    };

    test('renders the correct title', () => {
        const mockAuthContext = {
            isAuthenticated: false,
            user: null,
            logout: jest.fn(),
        };

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <Router>
                    <Header />
                </Router>
            </AuthContext.Provider>
        );

        const title = screen.getByText('Inventar');
        expect(title).toBeInTheDocument();
    });


    test('renders login link when not authenticated', () => {
        const mockAuthContext = {
            isAuthenticated: false,
            user: null,
            logout: jest.fn(),
        };

        renderWithRouter(
            <AuthContext.Provider value={mockAuthContext}>
                <Header />
            </AuthContext.Provider>
        );

        const loginLink = screen.getByText('Login');
        expect(loginLink).toBeInTheDocument();
    });

    test('renders user profile and logout button when authenticated', () => {
        const mockAuthContext = {
            isAuthenticated: true,
            user: { id: 1, username: 'testuser' },
            logout: jest.fn(),
        };

        renderWithRouter(
            <AuthContext.Provider value={mockAuthContext}>
                <Header />
            </AuthContext.Provider>
        );

        const userProfile = screen.getByText('testuser');
        const logoutButton = screen.getByText('Logout');
        expect(userProfile).toBeInTheDocument();
        expect(logoutButton).toBeInTheDocument();
    });

    test('calls logout when logout button is clicked', () => {
        const mockLogout = jest.fn();
        const mockAuthContext = {
            isAuthenticated: true,
            user: { id: 1, username: 'testuser' },
            logout: mockLogout,
        };

        renderWithRouter(
            <AuthContext.Provider value={mockAuthContext}>
                <Header />
            </AuthContext.Provider>
        );

        const logoutButton = screen.getByText('Logout');
        logoutButton.click();
        expect(mockLogout).toHaveBeenCalledTimes(1);
    });



});