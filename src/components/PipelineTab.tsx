import { pipelineStages } from "../data/portfolioData";

export default function PipelineTab() {
  const totalMinutes = pipelineStages.reduce((acc, s) => {
    const [m, sec] = s.duration.split("m ").map((x) => parseFloat(x));
    return acc + m + sec / 60;
  }, 0);
  const mins = Math.floor(totalMinutes);
  const secs = Math.round((totalMinutes - mins) * 60);

  return (
    <div className="space-y-8">
      {/* Runtime summary */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-gray-50 rounded-xl p-4 border border-gray-200">
        <div>
          <p className="text-sm text-gray-500">Total Pipeline Runtime</p>
          <p className="text-2xl font-bold text-gray-800">{mins}m {secs}s</p>
        </div>
        <div className="flex gap-6 text-center">
          <div>
            <p className="text-xs text-gray-500">Records / Day</p>
            <p className="font-bold text-gray-800">8.7M</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Data Quality</p>
            <p className="font-bold text-green-600">99.8%</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">FK Integrity</p>
            <p className="font-bold text-green-600">99.97%</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Uptime</p>
            <p className="font-bold text-green-600">99.9%</p>
          </div>
        </div>
      </div>

      {/* Pipeline flow diagram */}
      <div className="flex flex-wrap items-center gap-1 justify-center">
        {pipelineStages.map((stage, i) => (
          <div key={stage.id} className="flex items-center gap-1">
            <div
              className={`rounded-lg px-4 py-2 text-white font-bold text-sm text-center shadow ${stage.color}`}
              style={{ minWidth: 90 }}
            >
              <div>{stage.name}</div>
              <div className="text-xs font-normal opacity-90">{stage.duration}</div>
            </div>
            {i < pipelineStages.length - 1 && (
              <span className="text-gray-400 font-bold text-lg">→</span>
            )}
          </div>
        ))}
      </div>

      {/* Stage cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pipelineStages.map((stage) => (
          <div
            key={stage.id}
            className={`rounded-xl border-l-4 ${stage.borderColor} bg-white shadow-sm p-5 flex flex-col gap-3`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{stage.icon}</span>
                <span className={`font-bold text-sm ${stage.textColor}`}>
                  Stage {stage.id}: {stage.name}
                </span>
              </div>
              <span className="text-xs bg-gray-100 text-gray-600 rounded px-2 py-0.5">
                {stage.duration}
              </span>
            </div>
            <p className="text-sm text-gray-600">{stage.description}</p>
            <ul className="space-y-1">
              {stage.details.map((d) => (
                <li key={d} className="text-xs text-gray-500 flex gap-1">
                  <span className="text-green-500">✓</span> {d}
                </li>
              ))}
            </ul>
            <div className={`text-xs rounded-lg px-3 py-2 ${stage.bgLight} ${stage.textColor} font-medium`}>
              📤 {stage.output}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
