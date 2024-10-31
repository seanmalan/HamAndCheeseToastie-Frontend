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

    console.log(data);

    const labels = data.map((item) => item.label);
    const values = data.map((item) => item.value);

    chartInstance.current = new Chart(ctx, {
      type,
      data: {
        labels,
        datasets: [
          {
            label: 'Dataset',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [data, type]);

  return <canvas ref={chartRef} width="400" height="200"></canvas>;
};

export default LineChart;
