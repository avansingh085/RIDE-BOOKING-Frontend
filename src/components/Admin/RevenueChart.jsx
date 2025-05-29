import React, { useMemo, useState, useEffect } from "react";

const timeDurations = {
  "1d": 1,
  "1w": 7,
  "1m": 30,
  "3m": 90,
  "6m": 180,
  "1y": 365,
  "2y": 730,
  "all": Infinity,
};

const RevenueChart = ({ revenueData }) => {
  const [duration, setDuration] = useState("1m");

  // Filter data based on duration
  const filteredData = useMemo(() => {
    const days = timeDurations[duration] ?? Infinity;
    const now = new Date();
    const filtered = revenueData.filter(({ date }) => {
      const d = new Date(date);
      const diffDays = (now - d) / (1000 * 60 * 60 * 24);
      return diffDays <= days;
    });
    // Sort by date ascending for proper graph drawing
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    return filtered;
  }, [duration, revenueData]);

  useEffect(() => {
    console.log("Filtered data:", filteredData);
  }, [filteredData]);

  if (filteredData.length === 0) {
    return (
      <div className="p-4 bg-white rounded shadow text-center">
        No data available for selected duration.
        <br />
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="mt-2 border p-1 rounded"
        >
          {Object.keys(timeDurations).map((key) => (
            <option key={key} value={key}>
              {key === "all" ? "All time" : `Last ${key}`}
            </option>
          ))}
        </select>
      </div>
    );
  }

  const maxY = Math.ceil(Math.max(...filteredData.map((d) => d.value)) / 1000) * 1000 || 10000;

  const points = filteredData.map((point, index) => {
    const x = filteredData.length > 1 ? (index / (filteredData.length - 1)) * 100 : 0;
    const y = 100 - (point.value / maxY) * 100;
    return { x, y, date: point.date, value: point.value };
  });

  // Build path using simple lines to avoid path issues
  let pathD = "";
  points.forEach((pt, i) => {
    if (i === 0) {
      pathD += `M ${pt.x},${pt.y}`;
    } else {
      pathD += ` L ${pt.x},${pt.y}`;
    }
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-6 w-full">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Revenue</h2>

      <div className="mb-4">
        <label htmlFor="duration" className="mr-2 font-medium text-gray-700">
          Select Duration:
        </label>
        <select
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border border-gray-300 rounded p-1"
        >
          {Object.keys(timeDurations).map((key) => (
            <option key={key} value={key}>
              {key === "all" ? "All time" : `Last ${key}`}
            </option>
          ))}
        </select>
      </div>

      <div className="relative h-56 border border-gray-200 rounded">
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ backgroundColor: "#f9fafb" }}
        >
          <defs>
            <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d={pathD}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <path d={`${pathD} L 100,100 L 0,100 Z`} fill="url(#revGradient)" />
        </svg>

        {/* X-axis labels */}
        <div className="absolute bottom-0 w-full flex justify-between px-2 text-xs text-gray-500 select-none">
          {points.map((point, i) => (
            <span
              key={i}
              style={{ position: "absolute", left: `${point.x}%`, transform: "translateX(-50%)" }}
            >
              {new Date(point.date).toLocaleDateString()}
            </span>
          ))}
        </div>

        {/* Y-axis labels */}
        <div
          className="absolute left-0 top-0 bottom-6 flex flex-col justify-between pr-1 text-xs text-gray-400 select-none"
          style={{ fontSize: "0.7rem", width: "30px" }}
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span key={i} style={{ lineHeight: "1.5rem" }}>
              ${(maxY * (5 - i)) / 5}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
