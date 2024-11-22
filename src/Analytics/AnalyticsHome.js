import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LineChart from "./Components/LineChart";
import CategoriesChart from "./Components/CategoriesChart";
import ProductsChart from "./Components/ProductsChart";
import "./AnalyticsHome.css";

function AnalyticsHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const apiUrl = process.env.REACT_APP_API_URL;

  const [chartType, setChartType] = useState("line");
  const [selectedDataset, setSelectedDataset] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [chartData, setChartData] = useState([]);
  const chartTypes = ["line", "bar", "pie", "polarArea", "doughnut"];
  const periods = ["week", "fortnight", "month", "year"];

  const getQueryParam = (param) => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get(param);
  };

  useEffect(() => {
    const initialDataset = getQueryParam("dataset");
    if (initialDataset) {
      setSelectedDataset(initialDataset);
      fetchChartData(initialDataset, selectedPeriod);
    }
  }, [selectedPeriod, selectedDataset]);

  const fetchChartData = (dataset, period) => {
    fetch(`${apiUrl}/Analytics/data?dataset=${dataset}&period=${period}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setChartData(data);
      })
      .catch((error) =>
        console.error(`Error fetching ${dataset} data:`, error)
      );
  };

  const handleDatasetChange = (e) => {
    const dataset = e.target.value;
    setSelectedDataset(dataset);
    navigate(`?dataset=${dataset}`);
    fetchChartData(dataset, selectedPeriod);
  };

  const handlePeriodChange = (e) => {
    const period = e.target.value;
    setSelectedPeriod(period);
    fetchChartData(selectedDataset, period);
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
            <option value="Product">Products</option>
          </select>
        </label>

        <label>
          Select Period:
          <select value={selectedPeriod} onChange={handlePeriodChange}>
            {periods.map((period) => (
              <option key={period} value={period}>
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </option>
            ))}
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

      {selectedDataset === "Transaction" && (
        <LineChart data={chartData} type={chartType} />
      )}
      {selectedDataset === "Category" && (
        <CategoriesChart data={chartData} type={chartType} />
      )}
      {selectedDataset === "Product" && (
        <ProductsChart data={chartData} type={chartType} />
      )}
    </div>
  );
}

export default AnalyticsHome;