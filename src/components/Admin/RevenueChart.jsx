import React, { useMemo } from "react";

const RevenueChart = ({ revenueData }) => {
  const maxY = useMemo(() => {
    const max = Math.max(...revenueData.map((d) => d.value));
    return Math.ceil(max / 1000) * 1000 || 10000;
  }, [revenueData]);

  const points = revenueData.map((point, index) => {
    const x = (index / (revenueData.length - 1)) * 100;
    const y = 100 - (point.value / maxY) * 100;
    return { x, y };
  });

  const pathD = points.reduce((acc, point, index, arr) => {
    if (index === 0) return `M ${point.x},${point.y}`;
    const prev = arr[index - 1];
    const cx = (prev.x + point.x) / 2;
    return acc + ` Q ${prev.x},${prev.y} ${cx},${(prev.y + point.y) / 2}`;
  }, "");

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-6 w-full">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Revenue</h2>
      <div className="relative h-56">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d={pathD}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            className="animate-[draw_2s_ease-out_forwards]"
          />
          <defs>
            <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`${pathD} L 100,100 L 0,100 Z`}
            fill="url(#revGradient)"
            className="animate-[grow_2s_ease-out_forwards]"
          />
        </svg>
        {/* X-axis labels */}
        <div className="absolute bottom-0 w-full flex justify-between px-2 text-xs text-gray-500">
          {revenueData.map((point) => (
            <span key={point.date}>{point.date}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
