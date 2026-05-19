// ============================================================
// 📦 PORTFOLIO DATA — Single source of truth
// All text content lives here. Components just read from this.
// To update anything → edit here only.
// ============================================================

export const person = {
  name:        "Muhammad Usman Javeed",
  initials:    "MUJ",
  title:       "Machine Learning Researcher & Data Scientist",
  affiliation: "COMSATS University of Islamabad, Sahiwal",
  department:  "Department of Computer Science",
  email:       "usman.javeed@cuisahiwal.edu.pk",
  scholar:     "https://scholar.google.com/citations?user=j8SPSQEAAAAJ&hl=en",
  researchgate: "#",   // add when available
  linkedin:    "#",    // add when available

  // Typewriter effect in hero cycles through these
  roles: [
    "Machine Learning Researcher",
    "Data Scientist",
    "Deep Learning Engineer",
    "Computer Vision Expert",
    "NLP Researcher",
  ],

  bio: `I am a Machine Learning Researcher at COMSATS University Islamabad, 
  Sahiwal Campus, specializing in deep learning, computer vision, and 
  data-driven solutions for real-world challenges. My work spans medical 
  image analysis, cybersecurity, natural language processing, and 
  predictive modeling — with 158+ citations across international journals.`,

  address: "COMSATS University Islamabad, Sahiwal Campus, Sahiwal, Punjab, Pakistan",
}

// ── Hero Stats (animated counters) ────────────────────────
export const stats = [
  { label: "Citations",     value: 158, suffix: "+" },
  { label: "Publications",  value: 8,   suffix: "+" },
  { label: "Research Areas",value: 3,   suffix: "+" },
  { label: "Institutions",  value: 7,   suffix: "+" },
]

// ── Publications ───────────────────────────────────────────
// tags are used for the filter buttons in Publications section
export const publications = [
  {
    id: 1,
    title:
      "Phishing Website URL Detection Using a Hybrid Machine Learning Approach",
    journal:
      "Journal of Computing & Biomedical Informatics, Vol. 9, No. 01",
    authors:
      "Muhammad Usman Javeed, Shafqat Maria Aslam, Hafiza Ayesha Sadiqa, Ali Raza, Muhammad Munawar Iqbal, Misbah Akram",
    year: 2025,
    tags: ["Machine Learning", "Cybersecurity", "URL Detection"],
    url: "#",  // add DOI link when available
  },
  {
    id: 2,
    title:
      "Deep Transfer Learning for COVID-19 Screening: Benchmarking ResNet50, VGG16, and GoogleNet on Chest X-Ray Images",
    journal:
      "International Journal of Advanced Computing & Emerging Technologies (IJACET)",
    authors:
      "Muhammad Nauman, Sunil Ashraf, Muhammad Usman Javeed, Shafqat Maria Aslam, Usman Farooq, Ali Raza, Saifullah",
    year: 2025,
    tags: ["Deep Learning", "Medical AI", "Transfer Learning", "COVID-19"],
    url: "#",
  },
  {
    id: 3,
    title:
      "Deep Learning in Hematology: Automated Counting of Blood Cells Using YOLOv5 Object Detection",
    journal:
      "IJACET, Vol. 1, No. 3",
    authors:
      "Muhammad Usman Javeed, Muhammad Nauman, Shiza Aslam, Shafqat Maria Aslam, Mirza Mumtaz Zahoor, Zeeshan Raza, Misbah Akram",
    year: 2025,
    tags: ["Deep Learning", "Medical AI", "Object Detection", "YOLOv5"],
    url: "#",
  },
  {
    id: 4,
    title:
      "An Evaluation of Machine Learning Classifiers for Nominal Weather Humidity Prediction",
    journal:
      "IJACET, Vol. 1, No. 4",
    authors:
      "Muhammad Usman Javeed, Mahrukh Jaffar, Uzair Saleem, Shafqat Maria Aslam, Muhammad Aleem, Saifullah",
    year: 2025,
    tags: ["Machine Learning", "Data Science", "Prediction"],
    url: "#",
  },
  {
    id: 5,
    title:
      "Intelligent Image Gallery System Using Deep Learning for Automated Fruit and Vegetable Classification",
    journal:
      "IJACET, Vol. 1, No. 3",
    authors:
      "Ali Raza, Muhammad Usman Javeed, Mudassar Afnaan Arshad, Wasim Akram, Shafqat Maria Aslam, Ghumza Ejaz, Aqsa Shoukat, Adnan Shaukat",
    year: 2025,
    tags: ["Deep Learning", "Computer Vision", "Image Classification"],
    url: "#",
  },
  {
    id: 6,
    title:
      "AI-Powered Sentiment Analysis for Social Media Opinion Mining: A Hybrid NLP and Machine Learning Approach",
    journal:
      "IJACET, Vol. 1, No. 5",
    authors:
      "Ali Raza, Mubeen Javed, Shafqat Maria Aslam, Muhammad Usman Javeed, et al.",
    year: 2025,
    tags: ["NLP", "Machine Learning", "Sentiment Analysis"],
    url: "#",
  },
  {
    id: 7,
    title:
      "A Machine Learning-Based Framework for Pre-Deployment Prediction of Mobile Application Success",
    journal:
      "International Journal of Advanced Computing & Emerging Technologies (IJACET)",
    authors:
      "Muhammad Usman Javeed et al.",
    year: 2025,
    tags: ["Machine Learning", "Prediction", "Data Science"],
    url: "#",
  },
  {
    id: 8,
    title:
      "Impacts of Cloudburst Events on Biodiversity in Pakistan's Northern Areas and Development of a Machine Learning Model for Cloudburst Prediction",
    journal:
      "IJACET, Vol. 1, No. 4",
    authors:
      "Saifullah, Muhammad Usman Javeed, Amina Ayub, Mirza Mumtaz Zahoor, Zeeshan Raza, Shafqat Maria Aslam, Waheed Yousuf Ramay",
    year: 2025,
    tags: ["Machine Learning", "Prediction", "Environmental Science"],
    url: "#",
  },
]

// ── Filter tags (auto-generated from publications above) ───
// Used to build the filter buttons — no need to edit manually
export const publicationFilters = [
  "All",
  ...new Set(publications.flatMap((p) => p.tags)),
]
// Result → ["All", "Machine Learning", "Cybersecurity", "Deep Learning", ...]

// ── Skills ─────────────────────────────────────────────────
// level = percentage for the animated progress bar
export const skills = [
  { name: "Python",                  level: 95, category: "Programming" },
  { name: "Scikit-learn",            level: 92, category: "ML Frameworks" },
  { name: "TensorFlow / Keras",      level: 90, category: "Deep Learning" },
  { name: "Data Visualization",      level: 88, category: "Data Science" },
  { name: "PyTorch",                 level: 85, category: "Deep Learning" },
  { name: "YOLOv5 / Object Detection",level: 85, category: "Deep Learning" },
  { name: "NLP / Transformers",      level: 82, category: "ML Frameworks" },
  { name: "SQL / Databases",         level: 80, category: "Data Science" },
]

// ── Research Interests ─────────────────────────────────────
export const interests = [
  {
    icon:  "🧠",
    title: "Machine Learning",
    desc:  "Supervised & unsupervised algorithms for classification, regression, and clustering tasks.",
  },
  {
    icon:  "🔬",
    title: "Deep Learning",
    desc:  "CNNs, transfer learning, and custom neural architectures for complex pattern recognition.",
  },
  {
    icon:  "📊",
    title: "Data Science",
    desc:  "Statistical analysis, feature engineering, and data visualization pipelines.",
  },
  {
    icon:  "👁️",
    title: "Computer Vision",
    desc:  "Object detection, image classification, and medical image analysis.",
  },
  {
    icon:  "💬",
    title: "NLP",
    desc:  "Sentiment analysis, opinion mining, and transformer-based text processing.",
  },
  {
    icon:  "🏥",
    title: "Medical AI",
    desc:  "Automated diagnosis, hematology cell counting, and COVID-19 screening.",
  },
  {
    icon:  "🛡️",
    title: "Cybersecurity AI",
    desc:  "Phishing URL detection and ML-based threat classification.",
  },
  {
    icon:  "📈",
    title: "Predictive Analytics",
    desc:  "Weather modeling, environmental prediction, and behavioral forecasting.",
  },
]

// ── Collaborators ──────────────────────────────────────────
export const collaborators = [
  {
    name:        "Dr. Muhammad Farhan",
    institution: "COMSATS University Islamabad, Sahiwal",
    country:     "Pakistan",
    flag:        "🇵🇰",
  },
  {
    name:        "Muhammad Azhar (PhD)",
    institution: "Hong Kong Shue Yan University",
    country:     "Hong Kong",
    flag:        "🇭🇰",
  },
  {
    name:        "Muhammad Aleem",
    institution: "Universiti Malaysia Pahang (UMPSA)",
    country:     "Malaysia",
    flag:        "🇲🇾",
  },
  {
    name:        "Dr. Muhammad Munwar Iqbal",
    institution: "UET Taxila",
    country:     "Pakistan",
    flag:        "🇵🇰",
  },
  {
    name:        "Misbah Akram",
    institution: "Minhaj University Lahore",
    country:     "Pakistan",
    flag:        "🇵🇰",
  },
  {
    name:        "Mirza Mumtaz Zahoor",
    institution: "Ibadat International University, Islamabad",
    country:     "Pakistan",
    flag:        "🇵🇰",
  },
  {
    name:        "Shafqat Maria Aslam",
    institution: "Shaanxi Normal University",
    country:     "China",
    flag:        "🇨🇳",
  },
]

// ── Google Scholar Stats ───────────────────────────────────
export const scholarStats = {
  citations:  158,
  hIndex:     "—",    // update when known
  i10Index:   "—",    // update when known
  since:      2024,
  profileUrl: "https://scholar.google.com/citations?user=j8SPSQEAAAAJ&hl=en",
}