import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const CategoriesChart = ({ data, type }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Map data for labels and datasets
    const labels = data.map((item) => (item.categoryName));
    const currentValues = data.map((item) => item.productCount);

    // Create a new chart instance
    chartInstance.current = new Chart(ctx, {
      type: type || 'bar', // Set the chart type from the prop, defaulting to 'bar'
      data: {
        labels,
        datasets: [
          {
            label: 'Current Stock Levels',
            data: currentValues,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
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
              text: 'Category Name',
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


export default CategoriesChart