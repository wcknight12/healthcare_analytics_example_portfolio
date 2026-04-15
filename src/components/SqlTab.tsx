import { useState } from "react";
import { sqlQueries } from "../data/portfolioData";

const categories = ["All", "Clinical", "Financial", "Operations"];

export default function SqlTab() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = sqlQueries.filter((q) => {
    const matchesCategory = selectedCategory === "All" || q.category === selectedCategory;
    const term = search.toLowerCase();
    const matchesSearch =
      !term ||
      q.title.toLowerCase().includes(term) ||
      q.description.toLowerCase().includes(term) ||
      q.sql.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (q: (typeof sqlQueries)[0]) => {
    navigator.clipboard.writeText(q.sql);
    setCopiedId(q.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Search + category filters */}
      <div className="space-y-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search queries by title, description, or SQL keyword…"
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
          Beginner — Basic aggregations &amp; JOINs
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
          Intermediate — Window functions &amp; subqueries
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
          Advanced — CTEs, statistical analysis, cohorts
        </span>
      </div>

      {/* Query cards */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">
            No queries match your search. Try a different keyword or category.
          </div>
        )}
        {filtered.map((q) => (
          <div
            key={q.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
          >
            {/* Card header */}
            <button
              className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-semibold rounded-full px-2 py-0.5 ${q.complexityColor}`}
                >
                  {q.complexity}
                </span>
                <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">
                  {q.category}
                </span>
                <span className="font-semibold text-gray-800 text-sm">{q.title}</span>
              </div>
              <span className="text-gray-400 text-xs">{expandedId === q.id ? "▲" : "▼"}</span>
            </button>

            {/* Expanded content */}
            {expandedId === q.id && (
              <div>
                <div className="px-5 pb-3 text-sm text-gray-500">{q.description}</div>
                <div className="bg-gray-900">
                  <div className="flex justify-end px-4 py-2 border-b border-gray-700">
                    <button
                      onClick={() => handleCopy(q)}
                      className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded px-3 py-1 transition-colors"
                    >
                      {copiedId === q.id ? "✓ Copied!" : "Copy SQL"}
                    </button>
                  </div>
                  <div className="p-5 overflow-x-auto">
                    <pre className="text-green-400 text-xs leading-relaxed font-mono">
                      {q.sql}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
