import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LineChart from "./Components/LineChart";
import "./AnalyticsHome.css";

function AnalyticsHome() {
  const navigate = useNavigate();
  const location = useLocation();

  const [chartType, setChartType] = useState("line");
  const [selectedDataset, setSelectedDataset] = useState("");
  const [chartData, setChartData] = useState([]);
  const chartTypes = ["line", "bar", "pie", "polarArea", "doughnut"];

  // Function to get query parameter from the URL
  const getQueryParam = (param) => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get(param);
  };

  useEffect(() => {
    // On initial load, check if there's a dataset type in the URL
    const initialDataset = getQueryParam("dataset");
    if (initialDataset) {
      setSelectedDataset(initialDataset);
      fetchChartData(initialDataset);
    }
  }, []);

  // Fetch chart data based on selected dataset
  const fetchChartData = (dataset) => {
    fetch(`https://localhost:7276/api/${dataset}`)
      .then((response) => {
        setChartData(response.data);
      })
      .catch((error) =>
        console.error(`Error fetching ${dataset} data:`, error)
      );
  };

  // Handler for dataset selection change
  const handleDatasetChange = (e) => {
    const dataset = e.target.value;
    setSelectedDataset(dataset);

    // Update the URL with the selected dataset as a query parameter
    navigate(`?dataset=${dataset}`);

    // Fetch the new data based on the selected dataset
    fetchChartData(dataset);
  };

  return (
    <div className="analytics-home">
      <h1>Analytics Dashboard</h1>

      <div className="controls">
        <label>
          Select Data:
          <select value={selectedDataset} onChange={handleDatasetChange}>
            <option value="" disabled>
              Select a dataset
            </option>
            <option value="Transaction">Transactions</option>
            <option value="Category">Categories</option>
            <option value="product">Products</option>
          </select>
        </label>

        <label>
          Chart Type:
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            {chartTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </label>
      </div>

      {selectedDataset && <LineChart data={chartData} type={chartType} />}
    </div>
  );
}

export default AnalyticsHome;
