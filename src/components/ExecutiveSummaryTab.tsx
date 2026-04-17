const highlights = [
  { icon: "🏥", value: "8.7M", label: "Encounters / Day", color: "text-blue-600" },
  { icon: "👤", value: "2.4M", label: "Unique Patients", color: "text-green-600" },
  { icon: "✅", value: "99.8%", label: "Data Quality Score", color: "text-purple-600" },
  { icon: "⚡", value: "99.9%", label: "Pipeline Uptime", color: "text-orange-600" },
  { icon: "⏱️", value: "34m 40s", label: "End-to-End Runtime", color: "text-teal-600" },
  { icon: "💰", value: "$4,821", label: "Avg Cost / Encounter", color: "text-red-600" },
];

const findings = [
  {
    id: 1,
    category: "Readmission Risk",
    categoryColor: "bg-red-100 text-red-700",
    icon: "🔴",
    title: "14.2% 30-Day Readmission Rate — Above Benchmark",
    detail:
      "Readmission rate of 14.2% exceeds the national CMS benchmark of 12.5% by 1.7 percentage points. Analysis of cohort data reveals that patients aged 65+ with Medicaid coverage account for 38% of readmissions despite comprising only 22% of the patient population. Pneumonia (J18.9) and heart failure (I50.x) are the top two principal diagnoses associated with readmission events.",
    recommendation:
      "Implement targeted discharge planning and 72-hour follow-up call protocols for high-risk cohorts (65+, Medicaid, Cardiovascular/Respiratory diagnoses).",
    impact: "High",
  },
  {
    id: 2,
    category: "Cost Efficiency",
    categoryColor: "bg-orange-100 text-orange-700",
    icon: "🟠",
    title: "Inpatient Costs 3.4× Higher Than Outpatient — Shift-of-Care Opportunity",
    detail:
      "Average inpatient encounter cost is $9,847 versus $2,891 for outpatient and $1,203 for telehealth visits. Telehealth utilization has grown 34% year-over-year but still represents only 8% of total encounter volume. Emergency department visits that resulted in same-day discharge averaged $1,847 — a population that may be appropriate for urgent care redirection.",
    recommendation:
      "Expand telehealth capacity and introduce ED-to-urgent-care diversion pathways for low-acuity presentations to reduce cost per episode.",
    impact: "High",
  },
  {
    id: 3,
    category: "Data Quality",
    categoryColor: "bg-yellow-100 text-yellow-700",
    icon: "🟡",
    title: "0.2% Record Incompleteness Concentrated in Provider Directory",
    detail:
      "Overall data completeness is 99.8%, meeting the target SLA. However, 67% of incomplete records are attributed to missing NPI numbers in the providers table, primarily for contract staff added in Q3. Referential integrity between encounters and providers sits at 99.97%, with 2,610 orphaned encounter records identified.",
    recommendation:
      "Add a mandatory NPI validation gate at provider onboarding and schedule a one-time remediation sprint for orphaned encounter records.",
    impact: "Medium",
  },
  {
    id: 4,
    category: "Population Health",
    categoryColor: "bg-blue-100 text-blue-700",
    icon: "🔵",
    title: "Chronic Disease Burden — Cardiovascular & Diabetes Lead Diagnosis Volume",
    detail:
      "Cardiovascular conditions (ICD-10 I-codes) represent 28% of all principal diagnoses, followed by endocrine/metabolic disorders including Type 2 diabetes (E11.x) at 19%. Patients with co-occurring cardiovascular disease and diabetes have an average of 4.2 encounters per year versus 1.8 for the general population, driving disproportionate cost and resource utilization.",
    recommendation:
      "Develop HEDIS-aligned chronic disease management programs targeting dual-diagnosis patients to reduce encounter frequency and total cost of care.",
    impact: "High",
  },
  {
    id: 5,
    category: "Pipeline Performance",
    categoryColor: "bg-green-100 text-green-700",
    icon: "🟢",
    title: "Pipeline Meets SLA — Transform Stage Accounts for 37% of Runtime",
    detail:
      "The full ETL cycle completes in 34 minutes 40 seconds, well within the 60-minute operational SLA. The Transform stage (12m 45s) dominates runtime due to ICD-10 mapping, readmission flag generation, and provider quality metric aggregation across 8.7M records. All five monitoring checks pass consistently, with zero data freshness violations in the trailing 90 days.",
    recommendation:
      "Parallelize the ICD-10 mapping and readmission logic within the Transform stage to reduce runtime by an estimated 4–6 minutes and create headroom for data volume growth.",
    impact: "Low",
  },
  {
    id: 6,
    category: "HEDIS Compliance",
    categoryColor: "bg-purple-100 text-purple-700",
    icon: "🟣",
    title: "HEDIS Measure Gaps Identified in Preventive Care Compliance",
    detail:
      "Analysis of preventive care encounter data indicates that colorectal cancer screening compliance (HEDIS COL) is at 62% against a 75% benchmark. Annual diabetes HbA1c testing (HEDIS HBD) shows 71% compliance. Both measures trail commercial-plan peers by more than 8 percentage points and represent STAR rating risk for Medicare Advantage populations.",
    recommendation:
      "Automate HEDIS gap lists and integrate outreach workflows into the patient engagement system to close screening gaps before the measurement year closes.",
    impact: "Medium",
  },
];

const impactColor: Record<string, string> = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

export default function ExecutiveSummaryTab() {
  return (
    <div className="space-y-8">
      {/* Overview */}
      <section>
        <h3 className="text-lg font-bold text-gray-800 mb-2">📋 Executive Summary</h3>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-sm text-gray-700 leading-relaxed space-y-3">
          <p>
            This portfolio presents a production-representative healthcare data pipeline processing{" "}
            <strong>8.7 million encounter records per day</strong> from three upstream source systems
            (Epic EHR via HL7, claims clearinghouse API, and LDAP provider directory) through a
            five-stage ETL architecture into a Snowflake star-schema data warehouse.
          </p>
          <p>
            The pipeline achieves a <strong>99.8% data quality score</strong> and{" "}
            <strong>99.9% operational uptime</strong>, processing the full extract-to-monitor cycle
            in under 35 minutes. Advanced SQL analytics surface actionable clinical and operational
            insights across readmission risk, cost efficiency, population health, and HEDIS
            compliance dimensions.
          </p>
          <p>
            All data is synthetic and generated for educational purposes. The analytical findings
            below are derived from that synthetic dataset and are intended to demonstrate healthcare
            domain expertise and data engineering capability.
          </p>
        </div>
      </section>

      {/* KPI highlights */}
      <section>
        <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Portfolio at a Glance</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {highlights.map((h) => (
            <div
              key={h.label}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center"
            >
              <div className="text-2xl mb-1">{h.icon}</div>
              <div className={`text-xl font-bold ${h.color}`}>{h.value}</div>
              <div className="text-xs text-gray-500 mt-1 leading-tight">{h.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Findings */}
      <section>
        <h3 className="text-lg font-bold text-gray-800 mb-4">🔍 Key Findings</h3>
        <div className="space-y-4">
          {findings.map((f) => (
            <div
              key={f.id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-3"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-lg">{f.icon}</span>
                <span
                  className={`text-xs font-semibold rounded-full px-2 py-0.5 ${f.categoryColor}`}
                >
                  {f.category}
                </span>
                <span
                  className={`text-xs font-semibold rounded-full px-2 py-0.5 ${impactColor[f.impact]}`}
                >
                  {f.impact} Impact
                </span>
              </div>
              <p className="font-semibold text-gray-800 text-sm">{f.title}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{f.detail}</p>
              <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
                <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                  Recommendation:{" "}
                </span>
                <span className="text-xs text-blue-800 leading-relaxed">{f.recommendation}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Data disclaimer */}
      <section className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <p className="text-sm font-semibold text-amber-800 mb-1">⚠️ Data Disclaimer</p>
        <p className="text-xs text-amber-700 leading-relaxed">
          All data presented in this application is synthetic and generated for demonstration
          purposes only. No real patient information, clinical records, or healthcare data has been
          used. This portfolio demonstrates technical capabilities and healthcare domain knowledge
          while maintaining complete data privacy and HIPAA compliance principles.
        </p>
      </section>
    </div>
  );
}
