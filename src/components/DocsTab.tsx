import { techStack } from "../data/portfolioData";

const talkingPoints = [
  {
    q: '"Tell me about a complex data pipeline you\'ve built"',
    a: 'I designed an end-to-end healthcare ETL pipeline processing 8.7M encounters daily through 5 distinct stages: Extract, Validate, Transform, Load, and Monitor. The pipeline integrates data from Epic EHR via HL7, claims clearinghouse APIs, and LDAP directories. I implemented comprehensive data quality checks achieving 99.8% completeness and used dbt for the transformation layer with incremental models. The system includes automated alerting and has maintained 99.9% uptime.',
  },
  {
    q: '"How do you ensure data quality?"',
    a: 'I implement multi-layered validation: schema checks at ingestion, null validation on required fields, referential integrity checks between tables, and duplicate detection. I use Great Expectations for automated profiling and validation suites. For healthcare data specifically, I validate ICD-10 code formats, ensure date ranges are logical (admission before discharge), and flag statistical anomalies using z-scores. All metrics are monitored with 99.8% completeness as the target.',
  },
  {
    q: '"Describe a complex SQL query you\'ve written"',
    a: 'One of my most complex queries is the 30-day readmission analysis with patient cohorts. It uses multiple CTEs: one for patient demographics with age grouping, another for encounter sequencing using LEAD window functions, and a third for calculating readmission flags. The query joins across 3 tables, handles NULL discharge dates properly, and segments results by age group and insurance type. It demonstrates CTEs, window functions, self-joins, and statistical aggregations — all while maintaining sub-5-second performance on 8.7M records.',
  },
];

const skills = [
  "ETL Pipeline Design",
  "SQL Mastery",
  "Data Modeling",
  "Data Quality Engineering",
  "Healthcare Domain Knowledge (HL7, ICD-10, FHIR, HEDIS)",
  "Python Development",
  "dbt Development",
  "Performance Tuning",
  "CI/CD",
  "Technical Documentation",
  "Healthcare Analytics",
  "Regulatory Compliance (HIPAA)",
];

function TechSection({
  title,
  items,
}: {
  title: string;
  items: { name: string; purpose: string }[];
}) {
  return (
    <div>
      <h4 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">
        {title}
      </h4>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.name} className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5 text-xs">✓</span>
            <div>
              <span className="font-medium text-sm text-gray-800">{item.name}</span>
              <span className="text-xs text-gray-500"> — {item.purpose}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DocsTab() {
  return (
    <div className="space-y-8">
      {/* Skills */}
      <section>
        <h3 className="text-lg font-bold text-gray-800 mb-4">🎓 Skills Demonstrated</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span
              key={s}
              className="bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-3 py-1 text-xs font-medium"
            >
              ✅ {s}
            </span>
          ))}
        </div>
      </section>

      {/* Tech stack */}
      <section>
        <h3 className="text-lg font-bold text-gray-800 mb-4">🛠️ Technology Stack</h3>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <TechSection title="Data Engineering" items={techStack.dataEngineering} />
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <TechSection title="Data Warehouse" items={techStack.warehouse} />
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <TechSection title="Analytics & BI" items={techStack.analytics} />
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <TechSection title="Infrastructure" items={techStack.infrastructure} />
          </div>
        </div>
      </section>

      {/* Interview talking points */}
      <section>
        <h3 className="text-lg font-bold text-gray-800 mb-4">📝 Interview Talking Points</h3>
        <div className="space-y-4">
          {talkingPoints.map((tp) => (
            <div key={tp.q} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <p className="font-semibold text-gray-700 text-sm mb-2 italic">{tp.q}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{tp.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Project structure */}
      <section>
        <h3 className="text-lg font-bold text-gray-800 mb-4">📂 Project Structure</h3>
        <div className="bg-gray-900 rounded-xl p-5 overflow-x-auto">
          <pre className="text-green-400 text-xs leading-relaxed font-mono">{`healthcare-data-pipeline/
│
├── airflow/                    # Orchestration
│   ├── dags/
│   │   ├── extract_ehr_data.py
│   │   ├── transform_clinical_data.py
│   │   └── load_analytics_warehouse.py
│   ├── plugins/
│   └── config/
│
├── dbt/                        # Transformation layer
│   ├── models/
│   │   ├── staging/           # Raw data cleanup
│   │   ├── intermediate/      # Business logic
│   │   └── marts/             # Final analytics tables
│   ├── tests/                 # Data quality tests
│   └── macros/
│
├── sql/                        # SQL analytics
│   ├── analytics/             # Production queries
│   ├── quality_checks/        # Validation scripts
│   └── stored_procedures/
│
├── data_quality/
│   ├── great_expectations/    # Validation suites
│   │   ├── expectations/
│   │   └── checkpoints/
│   └── profiling/
│
├── docs/                      # Documentation
│   ├── architecture.md
│   ├── data_dictionary.md
│   ├── runbook.md
│   └── erd_diagram.png
│
├── tests/                     # Unit & integration tests
│   ├── unit/
│   └── integration/
│
└── README.md`}</pre>
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

      {/* Contact */}
      <section>
        <h3 className="text-lg font-bold text-gray-800 mb-4">📬 Contact</h3>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-gray-800 text-sm mb-1">William C. Knight</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Healthcare Data Engineer · ETL · SQL · Snowflake · dbt · Airflow
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.linkedin.com/in/wcknight12"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg px-4 py-2 transition-colors"
            >
              🔗 LinkedIn
            </a>
            <a
              href="https://github.com/wcknight12"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white text-xs font-semibold rounded-lg px-4 py-2 transition-colors"
            >
              🐙 GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
