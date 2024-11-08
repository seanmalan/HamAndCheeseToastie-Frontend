import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const LineChart = ({ data, type }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Map data for labels and datasets
    const labels = data.map((item) => new Date(item.date).toLocaleDateString('en-NZ'));
    const inflowValues = data.map((item) => item.totalInflow);
    const outflowValues = data.map((item) => item.totalOutflow);

    // Create a new chart instance
    chartInstance.current = new Chart(ctx, {
      type: type || 'line', // Set the chart type from the prop, defaulting to 'line'
      data: {
        labels,
        datasets: [
          {
            label: 'Total Inflow ($)',
            data: inflowValues,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: true,
          },
          {
            label: 'Total Outflow ($)',
            data: outflowValues,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
            },
            ticks: {
              maxRotation: 45,
              minRotation: 45,
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount ($)',
            },
          },
        },
      },
    });
  }, [data, type]); // Depend on both `data` and `type` so the chart updates when they change

  return <canvas ref={chartRef} width="400" height="200"></canvas>;
};

export default LineChart;
