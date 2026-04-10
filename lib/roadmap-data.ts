export type CareerGoal =
  | "data-science"
  | "machine-learning"
  | "web-development"
  | "cloud-computing"
  | "cybersecurity"

export type SkillLevel = "beginner" | "intermediate"

export interface RoadmapStep {
  id: string
  title: string
  description: string
  duration: string
  week: number
  resources: string[]
}

export interface CareerRoadmap {
  title: string
  description: string
  color: string
  icon: string
  steps: RoadmapStep[]
}

export const CAREER_GOALS: Record<CareerGoal, { label: string; icon: string; description: string; color: string }> = {
  "data-science": {
    label: "Data Science",
    icon: "BarChart2",
    description: "Master data analysis, statistics, and visualization",
    color: "oklch(0.72 0.18 195)",
  },
  "machine-learning": {
    label: "Machine Learning",
    icon: "Brain",
    description: "Build intelligent models and neural networks",
    color: "oklch(0.65 0.20 280)",
  },
  "web-development": {
    label: "Web Development",
    icon: "Code2",
    description: "Create modern web apps from frontend to backend",
    color: "oklch(0.72 0.18 145)",
  },
  "cloud-computing": {
    label: "Cloud Computing",
    icon: "Cloud",
    description: "Deploy scalable infrastructure in the cloud",
    color: "oklch(0.75 0.16 60)",
  },
  cybersecurity: {
    label: "Cybersecurity",
    icon: "Shield",
    description: "Protect systems and master ethical hacking",
    color: "oklch(0.65 0.22 15)",
  },
}

const ROADMAPS: Record<CareerGoal, Record<SkillLevel, RoadmapStep[]>> = {
  "web-development": {
    beginner: [
      { id: "wd-b-1", title: "HTML Fundamentals", description: "Semantic HTML, forms, accessibility basics", duration: "1 week", week: 1, resources: ["MDN Web Docs", "freeCodeCamp"] },
      { id: "wd-b-2", title: "CSS & Styling", description: "Box model, flexbox, grid, responsive design", duration: "2 weeks", week: 2, resources: ["CSS Tricks", "Flexbox Froggy"] },
      { id: "wd-b-3", title: "JavaScript Basics", description: "Variables, functions, DOM manipulation, events", duration: "3 weeks", week: 4, resources: ["javascript.info", "Eloquent JavaScript"] },
      { id: "wd-b-4", title: "Git & Version Control", description: "Git basics, GitHub, branching, pull requests", duration: "1 week", week: 7, resources: ["Pro Git Book", "GitHub Docs"] },
      { id: "wd-b-5", title: "React Fundamentals", description: "Components, hooks, state management, JSX", duration: "3 weeks", week: 8, resources: ["React Docs", "Scrimba React"] },
      { id: "wd-b-6", title: "Node.js & Express", description: "REST APIs, middleware, authentication basics", duration: "2 weeks", week: 11, resources: ["Node.js Docs", "The Odin Project"] },
      { id: "wd-b-7", title: "Databases", description: "SQL basics, MongoDB, connecting to apps", duration: "2 weeks", week: 13, resources: ["SQLBolt", "MongoDB University"] },
      { id: "wd-b-8", title: "Capstone Project", description: "Build a full-stack web app end-to-end", duration: "2 weeks", week: 15, resources: ["Personal Portfolio", "GitHub"] },
    ],
    intermediate: [
      { id: "wd-i-1", title: "Advanced React", description: "Context, Redux, performance optimization, testing", duration: "2 weeks", week: 1, resources: ["React Advanced Patterns", "Epic React"] },
      { id: "wd-i-2", title: "TypeScript", description: "Types, generics, decorators, strict mode", duration: "1 week", week: 3, resources: ["TypeScript Handbook", "Total TypeScript"] },
      { id: "wd-i-3", title: "Next.js & SSR", description: "Server-side rendering, API routes, deployment", duration: "2 weeks", week: 4, resources: ["Next.js Docs", "Vercel Platform"] },
      { id: "wd-i-4", title: "Testing", description: "Jest, RTL, Cypress E2E, TDD practices", duration: "2 weeks", week: 6, resources: ["Testing Library", "Cypress Docs"] },
      { id: "wd-i-5", title: "DevOps Basics", description: "Docker, CI/CD, cloud deployment, monitoring", duration: "2 weeks", week: 8, resources: ["Docker Docs", "GitHub Actions"] },
      { id: "wd-i-6", title: "System Design", description: "Scalability, caching, load balancing, microservices", duration: "2 weeks", week: 10, resources: ["System Design Primer", "ByteByteGo"] },
    ],
  },
  "data-science": {
    beginner: [
      { id: "ds-b-1", title: "Python Basics", description: "Variables, loops, functions, OOP fundamentals", duration: "2 weeks", week: 1, resources: ["Python.org Docs", "Automate the Boring Stuff"] },
      { id: "ds-b-2", title: "Statistics & Math", description: "Probability, distributions, hypothesis testing", duration: "2 weeks", week: 3, resources: ["Khan Academy Stats", "StatQuest YouTube"] },
      { id: "ds-b-3", title: "NumPy & Pandas", description: "Arrays, DataFrames, data manipulation, cleaning", duration: "2 weeks", week: 5, resources: ["Pandas Docs", "Kaggle Learn"] },
      { id: "ds-b-4", title: "Data Visualization", description: "Matplotlib, Seaborn, Plotly dashboards", duration: "1 week", week: 7, resources: ["Matplotlib Gallery", "Seaborn Docs"] },
      { id: "ds-b-5", title: "Machine Learning Intro", description: "Scikit-learn, regression, classification basics", duration: "3 weeks", week: 8, resources: ["Scikit-learn Docs", "Hands-on ML Book"] },
      { id: "ds-b-6", title: "SQL for Data Science", description: "Querying, joins, window functions, aggregations", duration: "1 week", week: 11, resources: ["Mode SQL Tutorial", "SQLZoo"] },
      { id: "ds-b-7", title: "Capstone Project", description: "End-to-end data science project on real dataset", duration: "2 weeks", week: 12, resources: ["Kaggle Datasets", "UCI Repository"] },
    ],
    intermediate: [
      { id: "ds-i-1", title: "Advanced Pandas", description: "MultiIndex, merge strategies, performance tricks", duration: "1 week", week: 1, resources: ["Pandas Advanced Docs", "Effective Pandas"] },
      { id: "ds-i-2", title: "Feature Engineering", description: "Encoding, scaling, feature selection, pipelines", duration: "2 weeks", week: 2, resources: ["Feature Engineering Book", "Kaggle FE Course"] },
      { id: "ds-i-3", title: "Advanced ML", description: "Ensemble methods, XGBoost, hyperparameter tuning", duration: "2 weeks", week: 4, resources: ["XGBoost Docs", "Optuna Library"] },
      { id: "ds-i-4", title: "Deep Learning Intro", description: "Neural networks, TensorFlow/PyTorch basics", duration: "3 weeks", week: 6, resources: ["fast.ai", "Deep Learning Specialization"] },
      { id: "ds-i-5", title: "MLOps", description: "Model deployment, monitoring, MLflow, Docker", duration: "2 weeks", week: 9, resources: ["MLflow Docs", "Weights & Biases"] },
      { id: "ds-i-6", title: "Capstone Project", description: "Build and deploy an end-to-end ML pipeline", duration: "2 weeks", week: 11, resources: ["Kaggle Competitions", "Hugging Face"] },
    ],
  },
  "machine-learning": {
    beginner: [
      { id: "ml-b-1", title: "Python & Math Prerequisites", description: "Python, linear algebra, calculus for ML", duration: "2 weeks", week: 1, resources: ["3Blue1Brown Linear Algebra", "NumPy Docs"] },
      { id: "ml-b-2", title: "Supervised Learning", description: "Linear & logistic regression, decision trees", duration: "2 weeks", week: 3, resources: ["Andrew Ng ML Course", "Scikit-learn"] },
      { id: "ml-b-3", title: "Unsupervised Learning", description: "K-means, PCA, anomaly detection", duration: "1 week", week: 5, resources: ["Coursera ML Specialization", "Scikit-learn"] },
      { id: "ml-b-4", title: "Neural Networks Basics", description: "Perceptrons, backprop, activation functions", duration: "2 weeks", week: 6, resources: ["Deep Learning Book", "3Blue1Brown NN"] },
      { id: "ml-b-5", title: "TensorFlow/PyTorch", description: "Building and training your first models", duration: "3 weeks", week: 8, resources: ["TensorFlow Tutorials", "PyTorch Docs"] },
      { id: "ml-b-6", title: "Computer Vision Basics", description: "CNNs, image classification, object detection", duration: "2 weeks", week: 11, resources: ["fast.ai CV Course", "Papers with Code"] },
      { id: "ml-b-7", title: "NLP Basics", description: "Text preprocessing, embeddings, sentiment analysis", duration: "2 weeks", week: 13, resources: ["Hugging Face NLP Course", "spaCy Docs"] },
      { id: "ml-b-8", title: "Capstone Project", description: "Train and evaluate an ML model on a real problem", duration: "1 week", week: 15, resources: ["Kaggle Competitions", "Hugging Face Spaces"] },
    ],
    intermediate: [
      { id: "ml-i-1", title: "Advanced Deep Learning", description: "Transformers, attention mechanisms, BERT/GPT", duration: "3 weeks", week: 1, resources: ["Attention is All You Need Paper", "Hugging Face"] },
      { id: "ml-i-2", title: "Reinforcement Learning", description: "Q-learning, policy gradients, OpenAI Gym", duration: "3 weeks", week: 4, resources: ["Spinning Up RL", "Deep RL Course"] },
      { id: "ml-i-3", title: "MLOps & Production", description: "Serving models, A/B testing, drift detection", duration: "2 weeks", week: 7, resources: ["MLflow", "BentoML"] },
      { id: "ml-i-4", title: "Research Paper Reading", description: "State-of-the-art techniques and implementations", duration: "2 weeks", week: 9, resources: ["arXiv", "Papers with Code"] },
      { id: "ml-i-5", title: "Capstone Research Project", description: "Replicate or extend a recent ML research paper", duration: "2 weeks", week: 11, resources: ["Hugging Face Hub", "Wandb"] },
    ],
  },
  "cloud-computing": {
    beginner: [
      { id: "cc-b-1", title: "Cloud Fundamentals", description: "IaaS, PaaS, SaaS concepts, cloud providers overview", duration: "1 week", week: 1, resources: ["AWS Cloud Practitioner", "Google Cloud Fundamentals"] },
      { id: "cc-b-2", title: "Linux & Networking", description: "CLI, file system, TCP/IP, DNS, HTTP basics", duration: "2 weeks", week: 2, resources: ["Linux Journey", "Networking Zine"] },
      { id: "cc-b-3", title: "AWS Core Services", description: "EC2, S3, RDS, IAM, VPC fundamentals", duration: "3 weeks", week: 4, resources: ["AWS Free Tier", "A Cloud Guru"] },
      { id: "cc-b-4", title: "Containers & Docker", description: "Docker images, containers, Compose, registries", duration: "2 weeks", week: 7, resources: ["Docker Docs", "Play with Docker"] },
      { id: "cc-b-5", title: "Infrastructure as Code", description: "Terraform basics, CloudFormation introduction", duration: "2 weeks", week: 9, resources: ["Terraform Docs", "HashiCorp Learn"] },
      { id: "cc-b-6", title: "Cloud Security Basics", description: "IAM policies, encryption, compliance basics", duration: "1 week", week: 11, resources: ["AWS Security Docs", "OWASP Cloud Security"] },
      { id: "cc-b-7", title: "Capstone: Deploy App", description: "Deploy a full app using AWS services", duration: "2 weeks", week: 12, resources: ["AWS Architecture Blog", "Serverless Framework"] },
    ],
    intermediate: [
      { id: "cc-i-1", title: "Kubernetes", description: "Pods, deployments, services, Helm charts", duration: "3 weeks", week: 1, resources: ["Kubernetes Docs", "CKA Study Guide"] },
      { id: "cc-i-2", title: "Advanced Networking", description: "VPN, Direct Connect, CDN, load balancers", duration: "2 weeks", week: 4, resources: ["AWS Networking Docs", "Cloud Network Design"] },
      { id: "cc-i-3", title: "CI/CD Pipelines", description: "GitHub Actions, Jenkins, ArgoCD, GitOps", duration: "2 weeks", week: 6, resources: ["GitHub Actions Docs", "ArgoCD Docs"] },
      { id: "cc-i-4", title: "Observability", description: "Logging, metrics, tracing, alerting at scale", duration: "2 weeks", week: 8, resources: ["Datadog Docs", "OpenTelemetry"] },
      { id: "cc-i-5", title: "Cloud Architecture", description: "Well-Architected Framework, multi-region, disaster recovery", duration: "2 weeks", week: 10, resources: ["AWS Well-Architected", "Cloud Design Patterns"] },
    ],
  },
  cybersecurity: {
    beginner: [
      { id: "cs-b-1", title: "Networking Fundamentals", description: "OSI model, protocols, firewalls, packet analysis", duration: "2 weeks", week: 1, resources: ["Cisco NetAcad", "Wireshark Tutorial"] },
      { id: "cs-b-2", title: "Linux & Bash", description: "CLI proficiency, scripting, permissions, processes", duration: "2 weeks", week: 3, resources: ["OverTheWire Bandit", "TryHackMe Linux"] },
      { id: "cs-b-3", title: "Security Fundamentals", description: "CIA triad, cryptography basics, authentication", duration: "1 week", week: 5, resources: ["Security+ Study Guide", "Cybrary"] },
      { id: "cs-b-4", title: "Web Security", description: "OWASP Top 10, XSS, SQLi, CSRF, Burp Suite", duration: "2 weeks", week: 6, resources: ["OWASP WebGoat", "PortSwigger Academy"] },
      { id: "cs-b-5", title: "Ethical Hacking Basics", description: "Reconnaissance, scanning, exploitation fundamentals", duration: "3 weeks", week: 8, resources: ["TryHackMe", "Hack The Box"] },
      { id: "cs-b-6", title: "Digital Forensics", description: "Evidence collection, log analysis, incident response", duration: "2 weeks", week: 11, resources: ["Blue Team Labs", "SANS Free Resources"] },
      { id: "cs-b-7", title: "Capstone CTF", description: "Complete a Capture the Flag challenge", duration: "1 week", week: 13, resources: ["CTFtime.org", "PicoCTF"] },
    ],
    intermediate: [
      { id: "cs-i-1", title: "Advanced Pentesting", description: "Post-exploitation, pivoting, privilege escalation", duration: "3 weeks", week: 1, resources: ["Offensive Security PEN-200", "HackTheBox Pro"] },
      { id: "cs-i-2", title: "Malware Analysis", description: "Static & dynamic analysis, reverse engineering basics", duration: "2 weeks", week: 4, resources: ["ANY.RUN", "Flare-VM"] },
      { id: "cs-i-3", title: "Cloud Security", description: "AWS/Azure security, container security, CSPM", duration: "2 weeks", week: 6, resources: ["CloudGoat", "AWS Security Specialty"] },
      { id: "cs-i-4", title: "Red Team Operations", description: "C2 frameworks, lateral movement, evasion techniques", duration: "3 weeks", week: 8, resources: ["Cobalt Strike Docs", "Red Team Development"] },
      { id: "cs-i-5", title: "Bug Bounty & Reporting", description: "Responsible disclosure, CVE writing, HackerOne", duration: "2 weeks", week: 11, resources: ["HackerOne", "Bugcrowd"] },
    ],
  },
}

export function getRoadmap(goal: CareerGoal, level: SkillLevel): RoadmapStep[] {
  return ROADMAPS[goal]?.[level] ?? []
}

export function getWeeklyPlan(steps: RoadmapStep[]): Record<number, RoadmapStep[]> {
  const plan: Record<number, RoadmapStep[]> = {}
  steps.forEach((step) => {
    if (!plan[step.week]) plan[step.week] = []
    plan[step.week].push(step)
  })
  return plan
}
