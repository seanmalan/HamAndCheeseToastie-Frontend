import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ProductsChart = ({ data, type }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Map data for labels and datasets
    const labels = data.map((item) => item.productName);
    const currentValues = data.map((item) => item.currentStockLevel);
    const minimumValues = data.map((item) => item.minimumStockLevel);

    // Determine the background color based on stock levels
    const currentColors = currentValues.map((current, index) => {
      return current < minimumValues[index] + 10 ? 'rgba(255, 206, 86, 0.2)' : 'rgba(75, 192, 192, 0.2)';
    });

    const borderColors = currentValues.map((current, index) => {
      return current < minimumValues[index] + 10 ? 'rgba(255, 206, 86, 1)' : 'rgba(75, 192, 192, 1)';
    });

    // Create a new chart instance
    chartInstance.current = new Chart(ctx, {
      type: type || 'bar', // Set the chart type from the prop, defaulting to 'bar'
      data: {
        labels,
        datasets: [
          {
            label: 'Current Stock Levels',
            data: currentValues,
            backgroundColor: currentColors, // Use the determined colors
            borderColor: borderColors, // Use the determined border colors
            borderWidth: 1,
            fill: true,
          },
          {
            label: 'Minimum Stock Levels',
            data: minimumValues,
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
              text: 'Product Name',
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
              text: 'Stock Level',
            },
          },
        },
      },
    });
  }, [data, type]); // Depend on both `data` and `type` so the chart updates when they change

  return <canvas ref={chartRef} width="400" height="200"></canvas>;
};

export default ProductsChart;
