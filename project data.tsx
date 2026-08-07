export type ModelStat = {
  name: string;
  short: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  best?: boolean;
  note: string;
};

export const models: ModelStat[] = [
  {
    name: "Logistic Regression",
    short: "LogReg",
    accuracy: 88.4,
    precision: 86.1,
    recall: 84.7,
    f1: 85.4,
    note: "Interpretable linear baseline with calibrated probabilities.",
  },
  {
    name: "Decision Tree",
    short: "Tree",
    accuracy: 90.2,
    precision: 88.9,
    recall: 87.3,
    f1: 88.1,
    note: "Transparent rule paths, useful for compliance explanations.",
  },
  {
    name: "Random Forest",
    short: "Forest",
    accuracy: 94.1,
    precision: 93.2,
    recall: 92.5,
    f1: 92.8,
    note: "Bagged ensemble that stabilises variance across applicant segments.",
  },
  {
    name: "XGBoost",
    short: "XGBoost",
    accuracy: 96.3,
    precision: 95.7,
    recall: 95.1,
    f1: 95.4,
    best: true,
    note: "Gradient boosted trees — deployed to IBM Watson Machine Learning.",
  },
];

export const architectureLayers = [
  {
    id: "user",
    title: "User Layer",
    icon: "Users",
    summary: "Credit analysts, compliance officers and customers access the system through any browser.",
    details: [
      "Credit analyst workstation and customer self-service access",
      "Responsive browser UI — desktop, tablet and mobile",
      "Role-aware entry points for screening vs. eligibility checks",
    ],
  },
  {
    id: "presentation",
    title: "Presentation Layer",
    icon: "LayoutDashboard",
    summary: "Web UI with dashboard, multi-step applicant form, results and prediction history.",
    details: [
      "Home dashboard with approval statistics",
      "Applicant input form with inline validation",
      "Prediction result cards and historical records",
    ],
  },
  {
    id: "application",
    title: "Application Layer",
    icon: "Server",
    summary: "Flask backend handles routing, validation, encoding and model inference orchestration.",
    details: [
      "URL routing and request handling",
      "Form validation and schema enforcement",
      "Scaling & encoding, model load from joblib/pickle",
      "Prediction generation and response rendering",
    ],
  },
  {
    id: "ml",
    title: "Machine Learning Layer",
    icon: "BrainCircuit",
    summary: "Four classifiers trained, evaluated and compared — best model promoted to production.",
    details: [
      "Logistic Regression, Random Forest, XGBoost, Decision Tree",
      "Evaluation on accuracy, precision, recall and F1-score",
      "Best model selection and preprocessing object persistence",
    ],
  },
  {
    id: "data",
    title: "Data Layer",
    icon: "Database",
    summary: "Raw applicant records flow through cleaning, feature engineering and train/test split.",
    details: [
      "Applicant details, credit history, payment history, demographics",
      "Cleaning, merging and missing-value handling",
      "Multi-class payment status converted to binary risk labels",
      "80/20 train-test split into the processed dataset",
    ],
  },
  {
    id: "deployment",
    title: "Deployment Layer",
    icon: "CloudCog",
    summary: "Local build pushed to GitHub, deployed on IBM Cloud with Watson ML and Object Storage.",
    details: [
      "Local development and testing",
      "GitHub repository as source of truth",
      "IBM Cloud application hosting",
      "Watson Machine Learning scoring endpoint",
      "Cloud Object Storage for model artifacts",
    ],
  },
] as const;

export const workflowSteps = [
  { title: "User enters details", desc: "Applicant profile captured through the multi-step form." },
  { title: "Flask validates", desc: "Server-side schema validation rejects malformed input." },
  { title: "Data preprocessing", desc: "Scaling and encoding applied with the saved preprocessing object." },
  { title: "Model prediction", desc: "XGBoost scoring endpoint returns probability of approval." },
  { title: "Approval / Rejection", desc: "Threshold applied and decision explained by feature weights." },
  { title: "Result displayed", desc: "Confidence, gauge and recommendations rendered to the user." },
];

export const deploymentStages = [
  { title: "Local Development", desc: "Notebook training, Flask app build and local testing.", icon: "Laptop" },
  { title: "GitHub", desc: "Version-controlled source code and CI checks.", icon: "Github" },
  { title: "IBM Cloud", desc: "Application runtime provisioning and hosting.", icon: "Cloud" },
  { title: "Watson Machine Learning", desc: "Model deployment space with a REST scoring endpoint.", icon: "BrainCircuit" },
  { title: "Cloud Object Storage", desc: "model.pkl, scaler.pkl and encoder.pkl artifacts.", icon: "Database" },
  { title: "Live Application", desc: "Public URL serving real-time approval predictions.", icon: "Globe" },
] as const;

export const techStack = [
  "Python",
  "Flask",
  "IBM Watson",
  "Scikit Learn",
  "Pandas",
  "NumPy",
  "HTML",
  "CSS",
  "Bootstrap",
  "JavaScript",
  "GitHub",
  "IBM Cloud",
];

export const overviewCards = [
  {
    title: "Flask Backend",
    icon: "Server",
    desc: "Lightweight Python service handling routing, validation and inference orchestration.",
  },
  {
    title: "IBM Watson",
    icon: "Cloud",
    desc: "Watson Machine Learning hosts the promoted model behind a managed scoring endpoint.",
  },
  {
    title: "Machine Learning",
    icon: "BrainCircuit",
    desc: "Four classifiers trained and benchmarked; XGBoost wins at 96.3% accuracy.",
  },
  {
    title: "Credit Risk Analysis",
    icon: "ShieldCheck",
    desc: "Payment status codes engineered into binary risk labels for clear eligibility calls.",
  },
  {
    title: "Cloud Deployment",
    icon: "CloudCog",
    desc: "GitHub to IBM Cloud pipeline with Object Storage for versioned model artifacts.",
  },
] as const;
