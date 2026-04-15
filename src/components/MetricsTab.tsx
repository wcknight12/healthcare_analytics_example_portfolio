import { useState } from "react";
import { metrics } from "../data/portfolioData";

export default function MetricsTab() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const active = metrics.find((m) => m.id === selectedMetric);

  const handleCopy = () => {
    if (active) {
      navigator.clipboard.writeText(active.sql);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500">
        Click any metric card to view the underlying SQL query.
      </p>

      {/* KPI grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelectedMetric(selectedMetric === m.id ? null : m.id)}
            className={`text-left rounded-xl border p-5 transition-all shadow-sm hover:shadow-md ${
              selectedMetric === m.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{m.icon}</span>
              <span className={`text-xs font-semibold rounded-full px-2 py-0.5 ${m.categoryColor}`}>
                {m.category}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-1">{m.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-800">{m.value}</span>
              <span
                className={`text-sm font-semibold ${
                  m.trendPositive ? "text-green-600" : "text-red-500"
                }`}
              >
                {m.trend}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{m.benchmark}</p>
            <p className="text-xs text-blue-500 mt-2 font-medium">
              {selectedMetric === m.id ? "▲ Hide SQL" : "▼ View SQL"}
            </p>
          </button>
        ))}
      </div>

      {/* SQL panel */}
      {active && (
        <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-700">
            <div>
              <span className="text-white font-semibold text-sm">{active.label}</span>
              <span className="text-gray-400 text-xs ml-2">— SQL Query</span>
            </div>
            <button
              onClick={handleCopy}
              className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded px-3 py-1 transition-colors"
            >
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <div className="p-5 overflow-x-auto">
            <pre className="text-green-400 text-xs leading-relaxed font-mono">{active.sql}</pre>
          </div>
          <div className="border-t border-gray-700 px-5 py-3 bg-gray-800">
            <p className="text-xs text-gray-400">{active.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
