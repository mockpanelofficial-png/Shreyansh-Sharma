import { config } from "@/lib/config";

export const site = {
  name: config.name,
  initials: "SS",
  photo: "/profile-photo.jpg",
  pronouns: "He/Him",
  eyebrow: "Pre-clinical MBBS · Research enthusiast",
  tagline: "Pre-clinical MBBS student · Preventive healthcare · AI",
  lede: "Pre-clinical MBBS student (NEET 2026 AIR 19202, 99.8%ile in Physics). Exploring how predictive models, genetics and personalised plans can shift India from reactive treatment to true prevention.",
  email: config.email,
  linkedin: config.linkedin,
  location: "Varanasi, Uttar Pradesh, India",
  school: "St. Xavier's Senior Secondary School, Varanasi",
  resumeUrl: config.resumePath,
  quote:
    "The best medicine is the one that prevents the disease from ever appearing.",
  quoteAttr: "— Shreyansh Sharma",
  contactHeading: "Let’s talk healthcare, AI or medical education",
  contactLede:
    "Fellow students, researchers, clinicians and builders working on preventive health — I would like to hear from you.",
  footer: "A living portfolio for the future of Indian healthcare.",
  profileHeading: "From entrance ranks to systems thinking.",
  profileLede:
    "A medical student who believes the best care is the one that prevents disease before it starts. Combining clinical education with AI, genetics and public-health awareness to design better systems for India.",
  skillsTitle: "What I bring to the table",
  skillsSub: "Core strengths",
  roles: [
    "Pre-clinical MBBS student",
    "Research enthusiast",
    "Preventive medicine advocate",
    "Healthcare systems thinker",
    "NEET mentor",
    "Content creator",
  ],
  ticker: [
    "NEET 2026 AIR 19202",
    "99.8%ile Physics",
    "Preventive over reactive care",
    "AI + pathology data",
    "ABHA clinical summaries",
    "First Step mentorship",
    "Biotechnology & genetics",
    "Healthcare education for India",
    "Varanasi",
  ],
  stats: [
    { value: "19202", prefix: "AIR ", suffix: "", label: "NEET UG 2026" },
    { value: "99.8", prefix: "", suffix: "%ile", label: "Physics" },
    { value: "248", prefix: "", suffix: "", label: "Followers" },
  ],
  interests: [
    "Preventive healthcare",
    "Precision medicine",
    "Biotechnology",
    "Genetics",
    "Artificial intelligence",
    "Healthcare education",
    "ABHA & digital health",
    "Content creation",
    "NEET mentorship",
  ],
};

export const education = [
  {
    when: "2026 — Present",
    title: "Pre-clinical MBBS",
    place: "Medical college · India",
    text: "Building anatomy, physiology and pathology while thinking at the level of health systems, prevention and digital records.",
  },
  {
    when: "Jun 2022 – Mar 2024",
    title: "St. Xavier’s Senior Secondary School",
    place: "Varanasi · Science — Biology · 78.67%",
    text: "Senior secondary years that carried the NEET discipline, olympiad mindset and the decision to practise medicine.",
  },
  {
    when: "Apr 2012 – May 2022",
    title: "St. Joseph’s Convent School",
    place: "Varanasi · Elementary education · 92.7%",
    text: "Quizzing, vocal music and two dozen olympiad medals, quiz prizes and excellence badges across a decade of schooling.",
  },
];

export const clinicalFocus = [
  {
    id: "anatomy",
    title: "Anatomy",
    tag: "Structure",
    text: "Gross and regional anatomy as the map for later clinical reasoning — how every vessel, nerve and organ sits before you ever see a patient.",
    icon: "bone" as const,
  },
  {
    id: "physiology",
    title: "Physiology",
    tag: "Function",
    text: "How systems stay in balance. Blood pressure, glucose, sleep and movement — and how a sedentary, high-screen life quietly breaks that balance.",
    icon: "pulse" as const,
  },
  {
    id: "biochem",
    title: "Biochemistry",
    tag: "Molecules",
    text: "The molecular layer of disease and of labs. Why a lipid panel, HbA1c or enzyme marker is not a number — it is a story of pathways.",
    icon: "flask" as const,
  },
  {
    id: "pathology",
    title: "Pathology",
    tag: "Data",
    text: "The data layer for predictive models and early flags. Tissue, blood and reports that could warn of hypertension or diabetes before symptoms.",
    icon: "scope" as const,
  },
  {
    id: "genetics",
    title: "Genetics",
    tag: "Precision",
    text: "Inheritance, risk and personalised plans. The thread that ties biotechnology to precision medicine in an Indian clinic, not only a paper.",
    icon: "dna" as const,
  },
  {
    id: "community",
    title: "Community health",
    tag: "Systems",
    text: "Tier 1 and 2 lifestyle risk versus Tier 3 education and access. Prevention has to be designed for the street the patient actually lives on.",
    icon: "users" as const,
  },
  {
    id: "histology",
    title: "Histology",
    tag: "Tissue",
    text: "What cells look like when they are well, and when they are not. The first visual language of pathology and of later diagnostics.",
    icon: "layers" as const,
  },
  {
    id: "digital",
    title: "Digital health",
    tag: "ABHA + AI",
    text: "Ayushman Bharat records, clinical summaries and ethical datasets. Continuity of care when a patient changes doctors — and fuel for safer models.",
    icon: "shield" as const,
  },
];

export const profileCards = [
  {
    id: "pc1",
    title: "Clinical foundation",
    text: "Pre-clinical MBBS student building anatomy, physiology and pathology while staying curious about systems-level care.",
    icon: "book" as const,
  },
  {
    id: "pc2",
    title: "AI & predictive health",
    text: "Exploring models trained on pathological data that can flag future risk of hypertension, diabetes and other chronic conditions.",
    icon: "sparkles" as const,
  },
  {
    id: "pc3",
    title: "Prevention over cure",
    text: "Lifestyle, diet, supplements and regular testing first — medication only when it is truly required.",
    icon: "heart" as const,
  },
  {
    id: "pc4",
    title: "Digital health (ABHA)",
    text: "Ethical AI that turns Ayushman Bharat records into concise clinical summaries for continuity of care.",
    icon: "shield" as const,
  },
  {
    id: "pc5",
    title: "Education & mentorship",
    text: "Free NEET mentorship (First Step) and content that makes healthcare ideas accessible.",
    icon: "users" as const,
  },
  {
    id: "pc6",
    title: "Storytelling",
    text: "Writing on competition culture, attention, and empathy beyond ranks and medals.",
    icon: "pen" as const,
  },
];

export const skills = [
  { label: "Medical fundamentals", pct: 85 },
  { label: "Preventive & precision thinking", pct: 90 },
  { label: "AI in healthcare", pct: 78 },
  { label: "Research & writing", pct: 82 },
  { label: "Health systems awareness", pct: 80 },
  { label: "Mentorship & content", pct: 75 },
];

export const timeline = [
  {
    date: "2026",
    title: "NEET AIR 19202 · MBBS begins",
    text: "All India Rank 19202 in NEET UG 2026 with 99.8%ile in Physics. Began pre-clinical MBBS and launched First Step mentorship.",
  },
  {
    date: "2026",
    title: "Public voice on prevention",
    text: "Essays on preventive vs reactive care, ABHA + AI summaries, and healthcare education for Tier 1–3 India.",
  },
  {
    date: "2024–26",
    title: "The long NEET road",
    text: "522 (AIR ~1,76,000) then 427 amid health issues. A leaked paper and a 581 mock later, the third attempt landed the rank.",
  },
  {
    date: "2012–24",
    title: "St. Joseph’s · St. Xavier’s, Varanasi",
    text: "A decade of quizzing, vocal music and olympiad discipline in Varanasi that made medicine feel inevitable.",
  },
];

export type WorkItem = {
  id: string;
  title: string;
  org: string;
  category: string;
  date: string;
  summary: string;
  description: string;
  featured: boolean;
};

export const work: WorkItem[] = [
  {
    id: "neet",
    title: "NEET UG 2026 — AIR 19202",
    org: "National Testing Agency",
    category: "Awards",
    date: "2026",
    featured: true,
    summary:
      "All India Rank 19202 in NEET UG 2026 with 99.8%ile in Physics, qualifying for MBBS after a four-year journey.",
    description:
      "I scored 522 in NEET 2024 (AIR ~1,76,000) — the first major academic setback of my life. A second attempt landed 427 (AIR ~1,46,000) after health issues cut into syllabus and revision. A May mock of 581, a leaked paper, and a third shot later, everything aligned. I dedicate this to my parents, who raised an engineer and a doctor. Pre-clinical MBBS is the next chapter.",
  },
  {
    id: "preventive",
    title: "Preventive healthcare & precision medicine",
    org: "Thought leadership",
    category: "Writing",
    date: "2026",
    featured: true,
    summary:
      "How predictive AI on pathological data, biannual testing and personalised plans can stop hypertension and diabetes before they start.",
    description:
      "Increasing screen time and decreasing movement amplify chronic disease. Reactive care leans on prescription drugs after symptoms appear. Regular tests plus models trained on pathological data can flag future risk. Doctors then co-design unique plans — diet, lifestyle, supplements, minimal medication. Education on regular testing is as important as the model itself. We visit clinics only when we feel discomfort. Prevention asks us to test before we hurt.",
  },
  {
    id: "reactive",
    title: "Preventive vs reactive healthcare",
    org: "Systems essay",
    category: "Writing",
    date: "2026",
    featured: true,
    summary:
      "Science and economics of prevention for Tier 1–3 India — cheaper for patients, higher retention for doctors, better quality of life.",
    description:
      "For sedentary, screen-driven Tier 1 and 2 India, hypertension and diabetes are widespread. In Tier 3 and rural India the issue is nutrition education and access, not inactivity. Lifestyle change helps cities; education helps villages. Prevention is easier on the pocket than operation bills. For doctors it raises ethical retention because quality of life improves. AI can flag who needs personalised reactive care most — a win-win when one clinician cannot personalise for everyone.",
  },
  {
    id: "abha",
    title: "ABHA + AI clinical summary",
    org: "Healthcare systems",
    category: "Projects",
    date: "2026",
    featured: true,
    summary:
      "An AI layer that extracts doctor-ready summaries from Ayushman Bharat Health Account records when patients change clinicians.",
    description:
      "ABHA is a unique 14-digit health ID storing prescriptions, labs, diet charts and directions. When patients switch doctors, history is often restarted from zero. A concise brief at appointment time would save the patient time, let the new doctor provide better care, and organise ethical datasets for medical AI.",
  },
  {
    id: "mentorship",
    title: "First Step — NEET mentorship",
    org: "Telegram community",
    category: "Leadership",
    date: "Sep 2026 – Present",
    featured: true,
    summary:
      "A free mentorship program sharing strategies to maximise NEET scores while protecting mental health.",
    description:
      "Having been a NEETard, I understand the pressure. First Step is a free Telegram community where I share high-yield methods, time management and mental-health conservation. Focus: score maximum marks while saving time. People management and time management sit at the centre of the work.",
  },
  {
    id: "research-interest",
    title: "Healthcare + AI + genetics",
    org: "Ongoing",
    category: "Research",
    date: "2026–",
    featured: true,
    summary:
      "The intersection of biotechnology, genetics, predictive models and preventive systems in the Indian context.",
    description:
      "Predictive AI on pathological data can shift the system from reactive treatment to prevention. Ethical ABHA use, personalised medicine and scalable education for rural India are the three threads I want to keep pulling through MBBS.",
  },
  {
    id: "content",
    title: "Healthcare content creation",
    org: "Instagram & LinkedIn",
    category: "Media",
    date: "2026",
    featured: false,
    summary:
      "Documenting medical student life, preventive ideas, AI in medicine and personal growth — including a first Instagram reel.",
    description:
      "Treated as a long-term hobby and learning journey. First reel posted as a small, meaningful milestone. A short video project in Varanasi taught more about storytelling in 24 hours than a month of posting — delayed by heavy rains, continued anyway.",
  },
  {
    id: "empathy",
    title: "Competition, empathy & attention",
    org: "Essays",
    category: "Writing",
    date: "2026",
    featured: false,
    summary:
      "On why “healthy competition” outside academic spaces is a myth, and what olympiad medals never taught: empathy and storytelling.",
    description:
      "Two dozen olympiad medals, quiz prizes and excellence badges instil competition. I no longer believe there is healthy competition outside professional or academic spaces. A month after NEET results I realised we are not competing against each other — we are here to experience life as it flows through us. What people like me lack is true empathy, interpersonal skill and the ability to look beyond material achievement.",
  },
  {
    id: "social",
    title: "Social media is not a tool",
    org: "Essay",
    category: "Writing",
    date: "2026",
    featured: false,
    summary:
      "A 20-year-old medical student’s note on reels, attention span, and Tristan Harris’s argument that a smartphone does not wait in the corner like a hammer.",
    description:
      "The urge to share everything online pulls us out of the moment. Reels become ice-breakers; notification anticipation becomes anxiety. JEE and NEET need intense focus and the ability to switch topics. The way out is to regulate social media. A tool sits in the corner and waits. A smartphone invites you, constantly. It is up to you whether it uses you.",
  },
  {
    id: "itsozay",
    title: "It’s ozay! — Itsozay Blogspot",
    org: "St. Joseph’s Convent School, Varanasi",
    category: "Writing",
    date: "School years",
    featured: false,
    summary:
      "An article on the problems faced by women in India — advertising, web content writing and early public voice.",
    description:
      "School-era writing on Itsozay Blogspot. The piece looked at problems faced by women in India and was my first sustained attempt at public writing beyond exams.",
  },
  {
    id: "helpage",
    title: "Fundraising volunteer — HelpAge India",
    org: "HelpAge India",
    category: "Volunteering",
    date: "School years",
    featured: false,
    summary:
      "Volunteered twice at school for HelpAge India’s social-service fundraising programme.",
    description:
      "Two school campaigns raising funds for HelpAge India, working with elders’ welfare as a first contact with organised social service.",
  },
  {
    id: "olympiads",
    title: "Olympiads, quizzes & vocal music",
    org: "St. Joseph’s Convent School",
    category: "Awards",
    date: "2012–2022",
    featured: false,
    summary:
      "Over two dozen olympiad medals, quiz prizes and excellence badges, plus vocal music and quizzing as school societies.",
    description:
      "A decade of academic drive that later had to be unlearned in one respect: life is not a contest of medals. The same discipline, though, is what carried the NEET years.",
  },
];

export const categories = ["All", ...Array.from(new Set(work.map((w) => w.category)))];
