import { useState } from "react";
import ExecutiveSummaryTab from "./components/ExecutiveSummaryTab";
import PipelineTab from "./components/PipelineTab";
import DatasetsTab from "./components/DatasetsTab";
import MetricsTab from "./components/MetricsTab";
import SqlTab from "./components/SqlTab";
import DocsTab from "./components/DocsTab";

const TABS = [
  { id: "summary", label: "📋 Executive Summary" },
  { id: "pipeline", label: "🚀 Pipeline" },
  { id: "datasets", label: "🗄️ Datasets" },
  { id: "metrics", label: "📈 Metrics" },
  { id: "sql", label: "💻 SQL" },
  { id: "docs", label: "📝 Docs" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("summary");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                🏥 Healthcare Data Pipeline Portfolio
              </h1>
              <p className="text-xs text-gray-500">Published by William C. Knight</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <img src="https://img.shields.io/badge/pipeline-success-brightgreen" alt="pipeline" className="h-5" />
              <img src="https://img.shields.io/badge/data%20quality-99.8%25-blue" alt="data quality" className="h-5" />
              <img src="https://img.shields.io/badge/records-8.7M%2Fday-orange" alt="records" className="h-5" />
              <img src="https://img.shields.io/badge/domain-healthcare-red" alt="domain" className="h-5" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="bg-white/20 rounded-full text-xs px-3 py-1">✅ End-to-end ETL · 8.7M records/day</span>
            <span className="bg-white/20 rounded-full text-xs px-3 py-1">✅ HL7 · ICD-10 · FHIR · HEDIS</span>
            <span className="bg-white/20 rounded-full text-xs px-3 py-1">✅ 99.8% data quality</span>
            <span className="bg-white/20 rounded-full text-xs px-3 py-1">✅ Advanced SQL analytics</span>
          </div>
          <p className="text-blue-100 text-sm max-w-3xl leading-relaxed">
            A comprehensive data engineering portfolio showcasing enterprise-grade ETL architecture,
            healthcare domain expertise, and advanced SQL analytics. All data is synthetic and
            generated for educational purposes.
          </p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="bg-white border-b border-gray-200 sticky top-[73px] z-10">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex gap-0 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === "summary" && <ExecutiveSummaryTab />}
        {activeTab === "pipeline" && <PipelineTab />}
        {activeTab === "datasets" && <DatasetsTab />}
        {activeTab === "metrics" && <MetricsTab />}
        {activeTab === "sql" && <SqlTab />}
        {activeTab === "docs" && <DocsTab />}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
          <span>© {new Date().getFullYear()} William C. Knight — Healthcare Data Engineering Portfolio</span>
          <span className="text-xs">
            Built with React · TypeScript · Tailwind CSS
          </span>
        </div>
      </footer>
    </div>
  );
}
