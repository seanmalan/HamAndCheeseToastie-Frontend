// NZDateFormatter.js
import React from 'react';

function NZDateFormatter({ date, length }) {
  if (!date) return null; // Return null if no date is provided

  if (length === 'short') {
    const formattedDate = new Intl.DateTimeFormat('en-NZ', {
      timeZone: 'Pacific/Auckland',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));

    return <span>{formattedDate}</span>;
  } else if (length === 'long') {
    const formattedDate = new Intl.DateTimeFormat('en-NZ', {
      timeZone: 'Pacific/Auckland',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(date));

    return <span>{formattedDate}</span>;
  }
}

export default NZDateFormatter;
