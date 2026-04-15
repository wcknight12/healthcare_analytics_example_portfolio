export const pipelineStages = [
  {
    id: 1,
    name: "EXTRACT",
    duration: "8m 32s",
    color: "bg-blue-500",
    borderColor: "border-blue-500",
    textColor: "text-blue-600",
    bgLight: "bg-blue-50",
    icon: "⬇️",
    description: "Connects to Epic EHR via HL7 interface, pulls from claims clearinghouse API, and extracts provider directory from Active Directory.",
    details: [
      "Epic EHR via HL7 interface",
      "Claims clearinghouse API",
      "Provider directory (LDAP)",
    ],
    output: "2.4M patients · 8.7M encounters · 15.2M diagnosis codes",
  },
  {
    id: 2,
    name: "VALIDATE",
    duration: "4m 18s",
    color: "bg-yellow-500",
    borderColor: "border-yellow-500",
    textColor: "text-yellow-600",
    bgLight: "bg-yellow-50",
    icon: "✅",
    description: "Schema validation, null checks on required fields, referential integrity checks, and duplicate detection.",
    details: [
      "Schema validation (100% pass)",
      "Null checks (99.8% complete)",
      "Referential integrity (99.97%)",
      "Duplicate detection & flagging",
    ],
    output: "Quality score: 99.8% · FK integrity: 99.97%",
  },
  {
    id: 3,
    name: "TRANSFORM",
    duration: "12m 45s",
    color: "bg-purple-500",
    borderColor: "border-purple-500",
    textColor: "text-purple-600",
    bgLight: "bg-purple-50",
    icon: "⚙️",
    description: "Date standardization, patient age calculation, length of stay computation, ICD-10 mapping, readmission flag generation.",
    details: [
      "Date standardization to ISO 8601",
      "Patient age from DOB",
      "Length of stay computation",
      "ICD-10 → clinical category mapping",
      "30-day readmission flag generation",
      "Provider quality metric aggregation",
    ],
    output: "8.7M records normalized and enriched",
  },
  {
    id: 4,
    name: "LOAD",
    duration: "6m 53s",
    color: "bg-green-500",
    borderColor: "border-green-500",
    textColor: "text-green-600",
    bgLight: "bg-green-50",
    icon: "📤",
    description: "Loads to Snowflake data warehouse, creates fact and dimension tables, refreshes materialized views, and updates dbt incremental models.",
    details: [
      "Snowflake data warehouse",
      "Fact and dimension tables",
      "Materialized views refresh",
      "dbt incremental models",
    ],
    output: "Star schema loaded · dbt models updated",
  },
  {
    id: 5,
    name: "MONITOR",
    duration: "2m 12s",
    color: "bg-red-500",
    borderColor: "border-red-500",
    textColor: "text-red-600",
    bgLight: "bg-red-50",
    icon: "📊",
    description: "Row count validation, data freshness checks, completeness scoring, and automated Slack alerting.",
    details: [
      "Row count validation",
      "Data freshness checks",
      "Completeness scoring",
      "Automated Slack alerting",
    ],
    output: "99.9% uptime · All checks passed",
  },
];

export const datasets = [
  {
    id: "patients",
    name: "patients",
    records: "2.4M",
    description: "Demographics, insurance, contact information",
    icon: "👤",
    color: "text-blue-600",
    fields: [
      { name: "patient_id", type: "VARCHAR(36)", pk: true, description: "Unique patient identifier (UUID)" },
      { name: "first_name", type: "VARCHAR(50)", pk: false, description: "Patient first name" },
      { name: "last_name", type: "VARCHAR(50)", pk: false, description: "Patient last name" },
      { name: "date_of_birth", type: "DATE", pk: false, description: "Patient date of birth" },
      { name: "gender", type: "VARCHAR(10)", pk: false, description: "Patient gender" },
      { name: "insurance_type", type: "VARCHAR(30)", pk: false, description: "Insurance category (Medicare, Medicaid, Commercial, Self-Pay)" },
      { name: "zip_code", type: "VARCHAR(10)", pk: false, description: "Patient residential zip code" },
      { name: "created_at", type: "TIMESTAMP", pk: false, description: "Record creation timestamp" },
      { name: "updated_at", type: "TIMESTAMP", pk: false, description: "Last update timestamp" },
    ],
    standards: ["HL7 v2.x", "FHIR R4"],
  },
  {
    id: "encounters",
    name: "encounters",
    records: "8.7M",
    description: "Hospital visits across all care settings",
    icon: "🏥",
    color: "text-green-600",
    fields: [
      { name: "encounter_id", type: "VARCHAR(36)", pk: true, description: "Unique encounter identifier" },
      { name: "patient_id", type: "VARCHAR(36)", pk: false, description: "FK → patients.patient_id" },
      { name: "provider_id", type: "VARCHAR(36)", pk: false, description: "FK → providers.provider_id" },
      { name: "encounter_type", type: "VARCHAR(30)", pk: false, description: "Inpatient, Outpatient, Emergency, Telehealth" },
      { name: "admission_date", type: "DATE", pk: false, description: "Date of admission" },
      { name: "discharge_date", type: "DATE", pk: false, description: "Date of discharge (NULL if inpatient)" },
      { name: "length_of_stay", type: "INTEGER", pk: false, description: "Computed LOS in days" },
      { name: "total_cost", type: "DECIMAL(12,2)", pk: false, description: "Total encounter cost in USD" },
      { name: "readmission_flag", type: "BOOLEAN", pk: false, description: "30-day readmission indicator" },
    ],
    standards: ["HL7 v2.x", "ICD-10"],
  },
  {
    id: "diagnoses",
    name: "diagnoses",
    records: "15.2M",
    description: "ICD-10 diagnosis codes linked to encounters",
    icon: "🩺",
    color: "text-purple-600",
    fields: [
      { name: "diagnosis_id", type: "VARCHAR(36)", pk: true, description: "Unique diagnosis record identifier" },
      { name: "encounter_id", type: "VARCHAR(36)", pk: false, description: "FK → encounters.encounter_id" },
      { name: "icd10_code", type: "VARCHAR(10)", pk: false, description: "ICD-10 diagnosis code (e.g., J18.9)" },
      { name: "description", type: "VARCHAR(255)", pk: false, description: "Human-readable diagnosis description" },
      { name: "clinical_category", type: "VARCHAR(50)", pk: false, description: "Mapped clinical category" },
      { name: "diagnosis_seq", type: "INTEGER", pk: false, description: "Diagnosis sequence (1 = primary)" },
      { name: "is_principal", type: "BOOLEAN", pk: false, description: "Principal diagnosis indicator" },
    ],
    standards: ["ICD-10"],
  },
  {
    id: "medications",
    name: "medications",
    records: "12.8M",
    description: "Prescriptions with NDC codes and dosages",
    icon: "💊",
    color: "text-orange-600",
    fields: [
      { name: "medication_id", type: "VARCHAR(36)", pk: true, description: "Unique medication record identifier" },
      { name: "patient_id", type: "VARCHAR(36)", pk: false, description: "FK → patients.patient_id" },
      { name: "encounter_id", type: "VARCHAR(36)", pk: false, description: "FK → encounters.encounter_id" },
      { name: "ndc_code", type: "VARCHAR(11)", pk: false, description: "National Drug Code" },
      { name: "drug_name", type: "VARCHAR(100)", pk: false, description: "Medication name" },
      { name: "dosage", type: "VARCHAR(50)", pk: false, description: "Dosage and unit" },
      { name: "days_supply", type: "INTEGER", pk: false, description: "Days supply prescribed" },
      { name: "prescriber_id", type: "VARCHAR(36)", pk: false, description: "FK → providers.provider_id" },
      { name: "fill_date", type: "DATE", pk: false, description: "Prescription fill date" },
    ],
    standards: ["NDC"],
  },
  {
    id: "providers",
    name: "providers",
    records: "45K",
    description: "Physicians, nurses, specialists with NPI numbers",
    icon: "👨‍⚕️",
    color: "text-teal-600",
    fields: [
      { name: "provider_id", type: "VARCHAR(36)", pk: true, description: "Unique provider identifier" },
      { name: "npi_number", type: "VARCHAR(10)", pk: false, description: "National Provider Identifier" },
      { name: "first_name", type: "VARCHAR(50)", pk: false, description: "Provider first name" },
      { name: "last_name", type: "VARCHAR(50)", pk: false, description: "Provider last name" },
      { name: "specialty", type: "VARCHAR(100)", pk: false, description: "Medical specialty" },
      { name: "facility", type: "VARCHAR(150)", pk: false, description: "Primary facility" },
      { name: "quality_score", type: "DECIMAL(5,2)", pk: false, description: "Composite quality score (0-100)" },
    ],
    standards: ["NPI"],
  },
  {
    id: "claims",
    name: "claims",
    records: "9.1M",
    description: "Insurance claims and billing information",
    icon: "📋",
    color: "text-red-600",
    fields: [
      { name: "claim_id", type: "VARCHAR(36)", pk: true, description: "Unique claim identifier" },
      { name: "encounter_id", type: "VARCHAR(36)", pk: false, description: "FK → encounters.encounter_id" },
      { name: "patient_id", type: "VARCHAR(36)", pk: false, description: "FK → patients.patient_id" },
      { name: "claim_date", type: "DATE", pk: false, description: "Date claim was submitted" },
      { name: "billed_amount", type: "DECIMAL(12,2)", pk: false, description: "Total billed amount" },
      { name: "allowed_amount", type: "DECIMAL(12,2)", pk: false, description: "Insurance allowed amount" },
      { name: "paid_amount", type: "DECIMAL(12,2)", pk: false, description: "Amount actually paid" },
      { name: "denial_reason", type: "VARCHAR(100)", pk: false, description: "Denial reason code (NULL if paid)" },
      { name: "claim_status", type: "VARCHAR(20)", pk: false, description: "Paid, Denied, Pending, Appealed" },
    ],
    standards: ["HL7 v2.x"],
  },
];

export const metrics = [
  {
    id: "readmission",
    category: "Clinical Quality",
    categoryColor: "bg-blue-100 text-blue-800",
    label: "30-Day Readmission Rate",
    value: "8.2%",
    trend: "↓ 1.3%",
    trendPositive: true,
    benchmark: "Industry benchmark: <10%",
    icon: "🔄",
    description: "Tracks patients readmitted within 30 days of discharge. Below industry benchmark indicates strong care coordination.",
    sql: `WITH readmissions AS (
  SELECT 
    e1.patient_id,
    e1.encounter_id   AS index_encounter,
    e1.discharge_date AS index_discharge,
    e2.encounter_id   AS readmit_encounter,
    e2.admission_date AS readmit_date,
    DATEDIFF(day, e1.discharge_date, e2.admission_date) AS days_to_readmit
  FROM encounters e1
  JOIN encounters e2 
    ON  e1.patient_id = e2.patient_id
    AND e2.admission_date > e1.discharge_date
    AND DATEDIFF(day, e1.discharge_date, e2.admission_date) <= 30
  WHERE e1.encounter_type = 'Inpatient'
    AND e1.discharge_date IS NOT NULL
)
SELECT 
  COUNT(DISTINCT r.index_encounter)  AS readmissions,
  COUNT(DISTINCT e.encounter_id)     AS total_discharges,
  ROUND(
    100.0 * COUNT(DISTINCT r.index_encounter)
          / NULLIF(COUNT(DISTINCT e.encounter_id), 0),
    2
  ) AS readmission_rate
FROM encounters e
LEFT JOIN readmissions r ON e.encounter_id = r.index_encounter
WHERE e.encounter_type = 'Inpatient'
  AND e.discharge_date >= DATEADD(month, -3, CURRENT_DATE);`,
  },
  {
    id: "los",
    category: "Clinical Quality",
    categoryColor: "bg-blue-100 text-blue-800",
    label: "Avg Length of Stay",
    value: "4.2 days",
    trend: "↓ 0.5 days",
    trendPositive: true,
    benchmark: "Segmented by encounter type",
    icon: "🛏️",
    description: "Average inpatient length of stay. Used for capacity planning and efficiency monitoring.",
    sql: `SELECT
  encounter_type,
  d.clinical_category,
  COUNT(e.encounter_id)              AS encounter_count,
  ROUND(AVG(e.length_of_stay), 1)   AS avg_los_days,
  ROUND(MIN(e.length_of_stay), 1)   AS min_los_days,
  ROUND(MAX(e.length_of_stay), 1)   AS max_los_days,
  ROUND(PERCENTILE_CONT(0.5)
    WITHIN GROUP (ORDER BY e.length_of_stay), 1) AS median_los_days
FROM encounters e
JOIN diagnoses d
  ON e.encounter_id = d.encounter_id
 AND d.is_principal = TRUE
WHERE e.encounter_type = 'Inpatient'
  AND e.discharge_date >= DATEADD(month, -3, CURRENT_DATE)
GROUP BY 1, 2
ORDER BY avg_los_days DESC;`,
  },
  {
    id: "quality",
    category: "Clinical Quality",
    categoryColor: "bg-blue-100 text-blue-800",
    label: "Quality Score",
    value: "92.4",
    trend: "↑ 1.8 pts",
    trendPositive: true,
    benchmark: "Composite HEDIS measure",
    icon: "⭐",
    description: "Composite HEDIS quality measure including medication adherence and blood pressure control.",
    sql: `WITH provider_metrics AS (
  SELECT
    p.provider_id,
    p.first_name || ' ' || p.last_name AS provider_name,
    p.specialty,
    COUNT(e.encounter_id)               AS encounter_count,
    ROUND(AVG(e.total_cost), 2)         AS avg_cost_per_encounter,
    ROUND(AVG(e.length_of_stay), 1)     AS avg_los,
    SUM(CASE WHEN e.readmission_flag THEN 1 ELSE 0 END) AS readmissions,
    ROUND(100.0 * SUM(CASE WHEN e.readmission_flag THEN 1 ELSE 0 END)
      / NULLIF(COUNT(e.encounter_id), 0), 2) AS readmission_rate
  FROM providers p
  JOIN encounters e ON p.provider_id = e.provider_id
  WHERE e.admission_date >= DATEADD(month, -12, CURRENT_DATE)
  GROUP BY 1, 2, 3
),
peer_benchmarks AS (
  SELECT
    specialty,
    AVG(avg_cost_per_encounter) AS peer_avg_cost,
    STDDEV(avg_cost_per_encounter) AS peer_stddev_cost,
    AVG(readmission_rate) AS peer_avg_readmission
  FROM provider_metrics
  GROUP BY specialty
)
SELECT
  pm.*,
  pb.peer_avg_cost,
  ROUND((pm.avg_cost_per_encounter - pb.peer_avg_cost)
    / NULLIF(pb.peer_stddev_cost, 0), 2) AS cost_z_score,
  ROUND(100 - (pm.readmission_rate * 5) 
    - ((pm.avg_cost_per_encounter - pb.peer_avg_cost) / NULLIF(pb.peer_avg_cost, 0) * 10), 1)
    AS quality_score
FROM provider_metrics pm
JOIN peer_benchmarks pb ON pm.specialty = pb.specialty
ORDER BY quality_score DESC;`,
  },
  {
    id: "cost",
    category: "Financial",
    categoryColor: "bg-green-100 text-green-800",
    label: "Cost per Encounter",
    value: "$2,847",
    trend: "↑ 2.1%",
    trendPositive: false,
    benchmark: "Tracks by specialty & diagnosis",
    icon: "💰",
    description: "Average cost per encounter segmented by specialty and diagnosis. Z-score analysis identifies cost outliers.",
    sql: `WITH encounter_costs AS (
  SELECT
    e.encounter_id,
    e.encounter_type,
    e.total_cost,
    p.specialty,
    d.clinical_category,
    AVG(e.total_cost) OVER (PARTITION BY p.specialty) AS specialty_avg_cost,
    STDDEV(e.total_cost) OVER (PARTITION BY p.specialty) AS specialty_stddev_cost
  FROM encounters e
  JOIN providers p ON e.provider_id = p.provider_id
  JOIN diagnoses d
    ON e.encounter_id = d.encounter_id
   AND d.is_principal = TRUE
  WHERE e.admission_date >= DATEADD(month, -3, CURRENT_DATE)
)
SELECT
  specialty,
  clinical_category,
  COUNT(*)                                 AS encounter_count,
  ROUND(AVG(total_cost), 2)               AS avg_cost,
  ROUND(MIN(total_cost), 2)               AS min_cost,
  ROUND(MAX(total_cost), 2)               AS max_cost,
  COUNT(CASE WHEN (total_cost - specialty_avg_cost)
    / NULLIF(specialty_stddev_cost, 0) > 2 THEN 1 END) AS high_cost_outliers
FROM encounter_costs
GROUP BY 1, 2
ORDER BY avg_cost DESC;`,
  },
  {
    id: "denial",
    category: "Financial",
    categoryColor: "bg-green-100 text-green-800",
    label: "Claim Denial Rate",
    value: "6.8%",
    trend: "↓ 0.9%",
    trendPositive: true,
    benchmark: "Target: <5%",
    icon: "📄",
    description: "First-pass claim acceptance rate. Tracks denial reasons to guide process improvement.",
    sql: `SELECT
  COALESCE(c.denial_reason, 'Paid / Not Denied') AS denial_reason,
  c.claim_status,
  COUNT(c.claim_id)                              AS claim_count,
  ROUND(SUM(c.billed_amount), 2)                AS total_billed,
  ROUND(SUM(c.paid_amount), 2)                  AS total_paid,
  ROUND(100.0 * COUNT(c.claim_id)
    / SUM(COUNT(c.claim_id)) OVER (), 2)        AS pct_of_claims,
  ROUND(
    100.0 * SUM(CASE WHEN c.claim_status = 'Denied' THEN 1 ELSE 0 END)
    / NULLIF(COUNT(c.claim_id), 0), 2
  ) AS denial_rate
FROM claims c
WHERE c.claim_date >= DATEADD(month, -3, CURRENT_DATE)
GROUP BY 1, 2
ORDER BY claim_count DESC;`,
  },
  {
    id: "volume",
    category: "Operations",
    categoryColor: "bg-orange-100 text-orange-800",
    label: "Patient Volume",
    value: "12,458/mo",
    trend: "↑ 5.7%",
    trendPositive: true,
    benchmark: "Across all service lines",
    icon: "👥",
    description: "Monthly unique patient volume across service lines. Supports staffing and resource allocation decisions.",
    sql: `SELECT
  DATE_TRUNC('month', e.admission_date) AS month,
  e.encounter_type,
  p.specialty                           AS service_line,
  COUNT(DISTINCT e.patient_id)          AS unique_patients,
  COUNT(e.encounter_id)                 AS total_encounters,
  LAG(COUNT(DISTINCT e.patient_id))
    OVER (PARTITION BY e.encounter_type, p.specialty
          ORDER BY DATE_TRUNC('month', e.admission_date)) AS prior_month_patients,
  ROUND(100.0 * (COUNT(DISTINCT e.patient_id)
    - LAG(COUNT(DISTINCT e.patient_id))
        OVER (PARTITION BY e.encounter_type, p.specialty
              ORDER BY DATE_TRUNC('month', e.admission_date)))
    / NULLIF(LAG(COUNT(DISTINCT e.patient_id))
        OVER (PARTITION BY e.encounter_type, p.specialty
              ORDER BY DATE_TRUNC('month', e.admission_date)), 0), 1)
    AS mom_growth_pct
FROM encounters e
JOIN providers p ON e.provider_id = p.provider_id
WHERE e.admission_date >= DATEADD(month, -6, CURRENT_DATE)
GROUP BY 1, 2, 3
ORDER BY 1 DESC, unique_patients DESC;`,
  },
];

export const sqlQueries = [
  {
    id: "top-diagnoses",
    title: "Top 10 Diagnoses by Volume",
    complexity: "Beginner",
    complexityColor: "bg-green-100 text-green-800",
    category: "Clinical",
    description: "Basic aggregation with JOIN to find the most frequent diagnoses across all encounters.",
    sql: `SELECT
  d.icd10_code,
  d.description,
  d.clinical_category,
  COUNT(*)          AS diagnosis_count,
  COUNT(DISTINCT d.encounter_id) AS encounter_count
FROM diagnoses d
JOIN encounters e ON d.encounter_id = e.encounter_id
WHERE e.admission_date >= DATEADD(month, -3, CURRENT_DATE)
GROUP BY 1, 2, 3
ORDER BY diagnosis_count DESC
LIMIT 10;`,
  },
  {
    id: "revenue-by-specialty",
    title: "Revenue Analysis by Provider Specialty",
    complexity: "Intermediate",
    complexityColor: "bg-yellow-100 text-yellow-800",
    category: "Financial",
    description: "Multi-table JOIN with window functions to analyze revenue performance by specialty with collection rates.",
    sql: `SELECT
  prov.specialty,
  COUNT(DISTINCT e.encounter_id)    AS encounter_count,
  COUNT(DISTINCT e.patient_id)      AS unique_patients,
  ROUND(SUM(c.billed_amount), 2)   AS total_billed,
  ROUND(SUM(c.paid_amount), 2)     AS total_collected,
  ROUND(
    100.0 * SUM(c.paid_amount)
    / NULLIF(SUM(c.billed_amount), 0), 1
  )                                AS collection_rate_pct,
  RANK() OVER (
    ORDER BY SUM(c.paid_amount) DESC
  )                                AS revenue_rank
FROM providers prov
JOIN encounters e  ON prov.provider_id = e.provider_id
JOIN claims c      ON e.encounter_id   = c.encounter_id
WHERE e.admission_date >= DATEADD(month, -12, CURRENT_DATE)
  AND c.claim_status IN ('Paid', 'Partial')
GROUP BY 1
ORDER BY total_collected DESC;`,
  },
  {
    id: "readmission-cohort",
    title: "30-Day Readmission Analysis with Patient Cohorts",
    complexity: "Advanced",
    complexityColor: "bg-red-100 text-red-800",
    category: "Clinical",
    description: "Complex CTEs with self-join, window functions, and cohort analysis segmented by age group and insurance type.",
    sql: `WITH patient_demographics AS (
  SELECT
    patient_id,
    DATEDIFF(year, date_of_birth, CURRENT_DATE)  AS age,
    CASE
      WHEN DATEDIFF(year, date_of_birth, CURRENT_DATE) < 18  THEN 'Pediatric'
      WHEN DATEDIFF(year, date_of_birth, CURRENT_DATE) < 65  THEN 'Adult'
      ELSE 'Senior'
    END                                           AS age_group,
    insurance_type
  FROM patients
),
encounter_sequence AS (
  SELECT
    e.encounter_id,
    e.patient_id,
    e.admission_date,
    e.discharge_date,
    e.encounter_type,
    LEAD(e.admission_date)
      OVER (PARTITION BY e.patient_id ORDER BY e.admission_date) AS next_admission,
    LEAD(e.encounter_id)
      OVER (PARTITION BY e.patient_id ORDER BY e.admission_date) AS next_encounter_id
  FROM encounters e
  WHERE e.encounter_type = 'Inpatient'
    AND e.discharge_date IS NOT NULL
),
readmission_flags AS (
  SELECT
    es.*,
    CASE
      WHEN DATEDIFF(day, es.discharge_date, es.next_admission) <= 30
       AND es.next_admission IS NOT NULL
      THEN 1 ELSE 0
    END AS is_readmitted
  FROM encounter_sequence es
)
SELECT
  pd.age_group,
  pd.insurance_type,
  COUNT(rf.encounter_id)             AS total_discharges,
  SUM(rf.is_readmitted)              AS readmissions,
  ROUND(
    100.0 * SUM(rf.is_readmitted)
    / NULLIF(COUNT(rf.encounter_id), 0), 2
  )                                  AS readmission_rate_pct,
  ROUND(AVG(CASE WHEN rf.is_readmitted = 1
    THEN DATEDIFF(day, rf.discharge_date, rf.next_admission)
  END), 1)                           AS avg_days_to_readmit
FROM readmission_flags rf
JOIN patient_demographics pd ON rf.patient_id = pd.patient_id
WHERE rf.discharge_date >= DATEADD(month, -12, CURRENT_DATE)
GROUP BY 1, 2
ORDER BY readmission_rate_pct DESC;`,
  },
  {
    id: "medication-adherence",
    title: "Medication Adherence (PDC) Tracking",
    complexity: "Advanced",
    complexityColor: "bg-red-100 text-red-800",
    category: "Clinical",
    description: "Proportion of Days Covered calculation — a standard pharmacy quality metric used in HEDIS measures.",
    sql: `WITH observation_windows AS (
  SELECT
    patient_id,
    MIN(fill_date)                          AS window_start,
    DATEADD(day, 365, MIN(fill_date))       AS window_end
  FROM medications
  WHERE fill_date >= DATEADD(year, -2, CURRENT_DATE)
  GROUP BY patient_id
),
medication_days AS (
  SELECT
    m.patient_id,
    m.drug_name,
    m.fill_date,
    m.days_supply,
    LEAST(
      DATEADD(day, m.days_supply, m.fill_date),
      ow.window_end
    )                                       AS coverage_end,
    ow.window_start,
    ow.window_end,
    DATEDIFF(day, ow.window_start, ow.window_end) AS window_length
  FROM medications m
  JOIN observation_windows ow ON m.patient_id = ow.patient_id
  WHERE m.fill_date BETWEEN ow.window_start AND ow.window_end
)
SELECT
  patient_id,
  drug_name,
  COUNT(DISTINCT fill_date)               AS fill_count,
  SUM(days_supply)                        AS total_days_supplied,
  MAX(window_length)                      AS observation_days,
  ROUND(
    100.0 * LEAST(SUM(days_supply), MAX(window_length))
    / NULLIF(MAX(window_length), 0), 1
  )                                       AS pdc_pct,
  CASE
    WHEN ROUND(
      100.0 * LEAST(SUM(days_supply), MAX(window_length))
      / NULLIF(MAX(window_length), 0), 1
    ) >= 80 THEN 'Adherent'
    ELSE 'Non-Adherent'
  END                                     AS adherence_status
FROM medication_days
GROUP BY 1, 2
ORDER BY pdc_pct DESC;`,
  },
  {
    id: "provider-efficiency",
    title: "Provider Efficiency Dashboard with Peer Benchmarking",
    complexity: "Advanced",
    complexityColor: "bg-red-100 text-red-800",
    category: "Operations",
    description: "Z-score analysis, peer benchmarks, and composite quality scoring for provider performance dashboards.",
    sql: `WITH provider_stats AS (
  SELECT
    p.provider_id,
    p.first_name || ' ' || p.last_name AS provider_name,
    p.specialty,
    COUNT(e.encounter_id)               AS encounter_count,
    ROUND(AVG(e.total_cost), 2)         AS avg_cost,
    ROUND(AVG(e.length_of_stay), 1)     AS avg_los,
    ROUND(
      100.0 * SUM(CASE WHEN e.readmission_flag THEN 1 ELSE 0 END)
      / NULLIF(COUNT(e.encounter_id), 0), 2
    )                                   AS readmission_rate,
    ROUND(AVG(p.quality_score), 1)      AS quality_score
  FROM providers p
  JOIN encounters e ON p.provider_id = e.provider_id
  WHERE e.admission_date >= DATEADD(month, -12, CURRENT_DATE)
  GROUP BY 1, 2, 3
),
peer_benchmarks AS (
  SELECT
    specialty,
    AVG(avg_cost)        AS peer_avg_cost,
    STDDEV(avg_cost)     AS peer_stddev_cost,
    AVG(avg_los)         AS peer_avg_los,
    AVG(readmission_rate) AS peer_avg_readmission,
    AVG(quality_score)   AS peer_avg_quality
  FROM provider_stats
  GROUP BY specialty
)
SELECT
  ps.provider_name,
  ps.specialty,
  ps.encounter_count,
  ps.avg_cost,
  ps.avg_los,
  ps.readmission_rate,
  ps.quality_score,
  pb.peer_avg_cost,
  ROUND(
    (ps.avg_cost - pb.peer_avg_cost)
    / NULLIF(pb.peer_stddev_cost, 0), 2
  )                                     AS cost_z_score,
  ROUND(ps.readmission_rate - pb.peer_avg_readmission, 2) AS readmission_vs_peers,
  ROUND(ps.quality_score - pb.peer_avg_quality, 1)        AS quality_vs_peers,
  RANK() OVER (
    PARTITION BY ps.specialty
    ORDER BY ps.quality_score DESC
  )                                     AS specialty_rank
FROM provider_stats ps
JOIN peer_benchmarks pb ON ps.specialty = pb.specialty
ORDER BY cost_z_score DESC;`,
  },
  {
    id: "high-cost-detection",
    title: "High-Cost Encounter Detection (Statistical)",
    complexity: "Advanced",
    complexityColor: "bg-red-100 text-red-800",
    category: "Financial",
    description: "Uses z-scores and standard deviation to flag statistical outliers in encounter costs.",
    sql: `WITH cost_statistics AS (
  SELECT
    encounter_type,
    AVG(total_cost)    AS mean_cost,
    STDDEV(total_cost) AS stddev_cost,
    PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY total_cost) AS p25,
    PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY total_cost) AS p50,
    PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY total_cost) AS p75,
    PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY total_cost)
      - PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY total_cost) AS iqr
  FROM encounters
  WHERE admission_date >= DATEADD(month, -12, CURRENT_DATE)
  GROUP BY encounter_type
),
flagged_encounters AS (
  SELECT
    e.encounter_id,
    e.patient_id,
    e.encounter_type,
    e.total_cost,
    e.admission_date,
    cs.mean_cost,
    cs.stddev_cost,
    cs.p75 + (1.5 * cs.iqr) AS iqr_upper_fence,
    ROUND(
      (e.total_cost - cs.mean_cost)
      / NULLIF(cs.stddev_cost, 0), 2
    )                         AS cost_z_score,
    CASE
      WHEN (e.total_cost - cs.mean_cost)
           / NULLIF(cs.stddev_cost, 0) > 3 THEN 'Extreme Outlier (>3σ)'
      WHEN (e.total_cost - cs.mean_cost)
           / NULLIF(cs.stddev_cost, 0) > 2 THEN 'High Outlier (>2σ)'
      ELSE 'Normal'
    END                       AS outlier_classification
  FROM encounters e
  JOIN cost_statistics cs ON e.encounter_type = cs.encounter_type
  WHERE e.admission_date >= DATEADD(month, -12, CURRENT_DATE)
)
SELECT
  outlier_classification,
  encounter_type,
  COUNT(*)                                    AS encounter_count,
  ROUND(AVG(total_cost), 2)                  AS avg_cost,
  ROUND(SUM(total_cost), 2)                  AS total_cost,
  ROUND(AVG(cost_z_score), 2)               AS avg_z_score
FROM flagged_encounters
WHERE outlier_classification != 'Normal'
GROUP BY 1, 2
ORDER BY avg_z_score DESC;`,
  },
];

export const techStack = {
  dataEngineering: [
    { name: "Apache Airflow", purpose: "DAG scheduling, dependency management" },
    { name: "Python (pandas, SQLAlchemy)", purpose: "Data processing and automation" },
    { name: "dbt", purpose: "Incremental models, tests, documentation" },
    { name: "Great Expectations", purpose: "Automated validation and profiling" },
    { name: "Git + GitHub Actions", purpose: "Version control and CI/CD" },
  ],
  warehouse: [
    { name: "Snowflake", purpose: "Cloud data warehouse platform" },
    { name: "Star Schema", purpose: "Fact and dimension table architecture" },
    { name: "Materialized Views", purpose: "Pre-aggregated query optimization" },
    { name: "Row-Level Security", purpose: "Column encryption and access control" },
  ],
  analytics: [
    { name: "Tableau / Looker", purpose: "Business intelligence and visualization" },
    { name: "Advanced SQL", purpose: "CTEs, window functions, statistical methods" },
    { name: "Jupyter Notebooks", purpose: "Ad-hoc Python analysis" },
  ],
  infrastructure: [
    { name: "Docker", purpose: "Containerization" },
    { name: "GitHub Actions", purpose: "CI/CD pipeline" },
    { name: "Prometheus + Grafana", purpose: "Monitoring and alerting" },
    { name: "Slack Integration", purpose: "Automated pipeline alerting" },
  ],
};
