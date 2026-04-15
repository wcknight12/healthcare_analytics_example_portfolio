import { useState } from "react";
import { datasets } from "../data/portfolioData";

export default function DatasetsTab() {
  const [selected, setSelected] = useState(datasets[0].id);

  const dataset = datasets.find((d) => d.id === selected)!;

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {datasets.map((d) => (
          <button
            key={d.id}
            onClick={() => setSelected(d.id)}
            className={`rounded-xl p-3 text-left border transition-all ${
              selected === d.id
                ? "border-blue-500 bg-blue-50 shadow-md"
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
            }`}
          >
            <div className="text-2xl mb-1">{d.icon}</div>
            <div className={`font-semibold text-sm ${d.color}`}>{d.name}</div>
            <div className="text-xs text-gray-500 font-medium">{d.records} records</div>
          </button>
        ))}
      </div>

      {/* Detail panel */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-3">
          <span className="text-2xl">{dataset.icon}</span>
          <div>
            <h3 className={`font-bold text-lg ${dataset.color}`}>{dataset.name}</h3>
            <p className="text-sm text-gray-500">{dataset.description} · {dataset.records} records</p>
          </div>
          <div className="ml-auto flex gap-2">
            {dataset.standards.map((s) => (
              <span
                key={s}
                className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 font-medium"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
                <th className="px-4 py-3 text-left font-semibold">Field Name</th>
                <th className="px-4 py-3 text-left font-semibold">Type</th>
                <th className="px-4 py-3 text-left font-semibold">Key</th>
                <th className="px-4 py-3 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {dataset.fields.map((f) => (
                <tr key={f.name} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono font-medium text-gray-800">{f.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-purple-600">{f.type}</td>
                  <td className="px-4 py-3">
                    {f.pk && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 rounded px-1.5 py-0.5 font-semibold">
                        PK
                      </span>
                    )}
                    {!f.pk && f.description.includes("FK →") && (
                      <span className="text-xs bg-blue-100 text-blue-700 rounded px-1.5 py-0.5 font-semibold">
                        FK
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{f.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ERD overview */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-700 mb-4">Entity Relationships</h3>
        <div className="flex flex-wrap gap-4 items-center justify-center text-sm font-mono">
          <div className="bg-blue-100 text-blue-800 rounded-lg px-4 py-2 font-semibold">PATIENTS</div>
          <span className="text-gray-500">1 ──▶ M</span>
          <div className="bg-green-100 text-green-800 rounded-lg px-4 py-2 font-semibold">ENCOUNTERS</div>
          <span className="text-gray-500">1 ──▶ M</span>
          <div className="bg-purple-100 text-purple-800 rounded-lg px-4 py-2 font-semibold">DIAGNOSES</div>
        </div>
        <div className="flex flex-wrap gap-4 items-center justify-center text-sm font-mono mt-4">
          <div className="bg-teal-100 text-teal-800 rounded-lg px-4 py-2 font-semibold">PROVIDERS</div>
          <span className="text-gray-500">1 ──▶ M</span>
          <div className="bg-green-100 text-green-800 rounded-lg px-4 py-2 font-semibold">ENCOUNTERS</div>
          <span className="text-gray-500">·</span>
          <div className="bg-orange-100 text-orange-800 rounded-lg px-4 py-2 font-semibold">MEDICATIONS</div>
          <span className="text-gray-500">·</span>
          <div className="bg-red-100 text-red-800 rounded-lg px-4 py-2 font-semibold">CLAIMS</div>
        </div>
      </div>
    </div>
  );
}
