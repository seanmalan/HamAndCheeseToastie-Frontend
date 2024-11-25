import { render, screen } from '@testing-library/react';
import NZDateFormatter from './DateFormat';

describe('NZDateFormatter', () => {
    test('renders the correct short date format when length is "short"', () => {
        // Provide an explicit date for consistency
        const testDate = '2024-11-25T00:00:00Z';

        render(<NZDateFormatter date={testDate} length="short" />);

        // Format expected output based on en-NZ locale
        const expectedOutput = new Intl.DateTimeFormat('en-NZ', {
            timeZone: 'Pacific/Auckland',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }).format(new Date(testDate));

        const formattedDate = screen.getByText(expectedOutput);
        expect(formattedDate).toBeInTheDocument();
    });

    it('renders the correct long date format when length is "long"', () => {
        const testDate = '2024-11-25T12:00:00Z'; // ISO string (UTC)

        render(<NZDateFormatter date={testDate} length="long" />);

        // Assuming the formatted date will look like: "25 November 2024, 12:00:00"
        const formattedDate = screen.getByText('26 November 2024 at 01:00:00 am');
        expect(formattedDate).toBeInTheDocument();
    });

    it('returns null when no date is provided', () => {
        render(<NZDateFormatter date={null} length="short" />);
        const formattedDate = screen.queryByText(/./); // No text should be present
        expect(formattedDate).not.toBeInTheDocument();
    });

    it('handles invalid date gracefully', () => {
        render(<NZDateFormatter date="invalid-date" length="short" />);
        const formattedDate = screen.queryByText(/./); // No text should be present
        expect(formattedDate).not.toBeInTheDocument();
    });

    it('correctly formats date in Pacific/Auckland timezone', () => {
        // Use a known UTC time and test if it converts correctly
        const testDate = '2024-11-25T00:00:00Z'; // UTC midnight
        render(<NZDateFormatter date={testDate} length="long" />);

        // Pacific/Auckland is UTC+13 during daylight savings, so expected time is 13:00:00
        const formattedDate = screen.getByText('25 November 2024, 01:00:00 PM');
        expect(formattedDate).toBeInTheDocument();
    });

    it('correctly renders short format for edge cases (e.g., leap years)', () => {
        const testDate = '2024-02-29T12:00:00Z'; // Leap year date
        render(<NZDateFormatter date={testDate} length="short" />);
        const formattedDate = screen.getByText('1 Mar 2024');
        expect(formattedDate).toBeInTheDocument();
    });
});
