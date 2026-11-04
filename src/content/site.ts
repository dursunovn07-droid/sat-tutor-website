/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONTENT — edit everything about the website from this one file.
 *
 *  Anything wrapped in [square brackets] or marked `PLACEHOLDER` is sample
 *  content and should be replaced with real information before launch.
 *  Scores, testimonials and statistics below are illustrative only.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  /** Brand */
  brand: "Carter",            // PLACEHOLDER — wordmark shown in the nav
  brandSuffix: "SAT Studio",  // PLACEHOLDER
  url: "https://www.example.com", // PLACEHOLDER — production URL (used for SEO)

  tutor: {
    name: "Alex Carter",       // PLACEHOLDER
    firstName: "Alex",         // PLACEHOLDER
    title: "Private SAT Tutor & Strategist",
    initials: "AC",
    /**
     * Put a portrait in /public/images (e.g. /images/portrait.jpg) and set the
     * path here. Leave `null` to show the designed placeholder.
     */
    portrait: null as string | null,
    heroScore: 1540,           // PLACEHOLDER — headline score in the hero
  },

  contact: {
    email: "hello@example.com",   // PLACEHOLDER
    phone: "+1 (000) 000-0000",   // PLACEHOLDER
    location: "Online worldwide · [City] in person", // PLACEHOLDER
    hours: "Mon–Sat · 9:00–20:00",                  // PLACEHOLDER
  },

  social: [
    { label: "Instagram", href: "https://instagram.com/", icon: "instagram" }, // PLACEHOLDER
    { label: "LinkedIn", href: "https://linkedin.com/", icon: "linkedin" },    // PLACEHOLDER
    { label: "YouTube", href: "https://youtube.com/", icon: "youtube" },       // PLACEHOLDER
  ],
} as const;

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "SAT Programs", href: "#programs" },
  { label: "Results", href: "#results" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
] as const;

export const heroCards = [
  // PLACEHOLDER figures
  { kicker: "Avg. improvement", value: "+210", note: "points" },
  { kicker: "Math section", value: "790", note: "student best" },
  { kicker: "Free consultation", value: "30 min", note: "no obligation" },
] as const;

/** The eight official Digital SAT skill domains (scrolling marquee). */
export const domains = [
  "Algebra",
  "Advanced Math",
  "Problem-Solving & Data Analysis",
  "Geometry & Trigonometry",
  "Craft & Structure",
  "Information & Ideas",
  "Standard English Conventions",
  "Expression of Ideas",
] as const;

export const about = {
  intro:
    "I help ambitious students turn a test that feels unpredictable into one that feels familiar — with a clear plan, honest feedback and strategies that hold up under pressure.",
  body: [
    "[Write a short personal introduction here — how you started tutoring, who you work with and what makes your approach different.]",
    "Every program begins with understanding the student, not the test. We find the specific question types costing points, rebuild the fundamentals behind them, and practise until the right approach becomes instinct.",
  ],
  philosophy:
    "A great score is never luck. It is the visible result of clarity, consistency and confidence — built one session at a time.",
  credentials: [
    { label: "Education", value: "[Degree], [University]" },          // PLACEHOLDER
    { label: "Personal SAT score", value: "[0000] / 1600" },          // PLACEHOLDER
    { label: "Experience", value: "[0]+ years of SAT instruction" },  // PLACEHOLDER
    { label: "Certifications", value: "[Certification or training]" }, // PLACEHOLDER
  ],
  /** PLACEHOLDER numbers — replace with your real figures. */
  stats: [
    { value: 8, suffix: "+", label: "Years teaching" },
    { value: 300, suffix: "+", label: "Students guided" },
    { value: 4000, suffix: "+", label: "Hours of sessions" },
    { value: 92, suffix: "%", label: "Reached target score" },
  ],
} as const;

export const process = [
  {
    step: "01",
    title: "Diagnostic Assessment",
    text: "A full-length, timed Digital SAT diagnostic and a one-on-one review to map strengths, gaps and test-day habits.",
    detail: "Week 1",
  },
  {
    step: "02",
    title: "Personalized Study Plan",
    text: "A week-by-week roadmap built around your target score, test date and schedule — with clear milestones.",
    detail: "Week 1–2",
  },
  {
    step: "03",
    title: "Focused SAT Preparation",
    text: "Targeted sessions on the exact skill domains costing you points, plus proven strategies for pacing and accuracy.",
    detail: "Core phase",
  },
  {
    step: "04",
    title: "Mock Exams & Progress Tracking",
    text: "Regular adaptive practice tests, detailed error logs and progress reports so you always know where you stand.",
    detail: "Every 2–3 weeks",
  },
  {
    step: "05",
    title: "Final SAT Success",
    text: "A calm, rehearsed test-day routine and final review sprint — so you walk in prepared and walk out proud.",
    detail: "Test day",
  },
] as const;

export const programs = [
  {
    id: "foundation",
    name: "SAT Foundation",
    tagline: "Build the core.",
    description:
      "For students beginning their SAT journey who want to master the fundamentals and learn how the Digital SAT really works.",
    price: "[Price]",           // PLACEHOLDER
    priceNote: "per month",     // PLACEHOLDER
    duration: "[8] weeks · [1] session / week", // PLACEHOLDER
    features: [
      "Full diagnostic assessment",
      "Core Math & Reading/Writing fundamentals",
      "Digital SAT format & question strategy",
      "Curated weekly practice sets",
      "Monthly progress report",
    ],
    featured: false,
  },
  {
    id: "intensive",
    name: "SAT Intensive",
    tagline: "Accelerate your score.",
    description:
      "A structured, high-momentum program for students with a test date in sight and a clear score goal to reach.",
    price: "[Price]",           // PLACEHOLDER
    priceNote: "per month",     // PLACEHOLDER
    duration: "[10] weeks · [2] sessions / week", // PLACEHOLDER
    features: [
      "Everything in Foundation",
      "Personalized week-by-week study plan",
      "Bi-weekly full-length mock exams",
      "Detailed error-log analysis",
      "Pacing & test-day strategy coaching",
      "Message support between sessions",
    ],
    featured: true,
  },
  {
    id: "mentorship",
    name: "SAT Private Mentorship",
    tagline: "Aim for the top 1%.",
    description:
      "Fully bespoke, high-touch mentorship for students targeting elite scores — with flexible scheduling and direct access.",
    price: "[Price]",           // PLACEHOLDER
    priceNote: "per month",     // PLACEHOLDER
    duration: "Flexible · tailored schedule", // PLACEHOLDER
    features: [
      "Everything in Intensive",
      "Unlimited scheduling flexibility",
      "Advanced 750+ section strategies",
      "Priority messaging & weekly check-ins",
      "Parent progress meetings",
      "Final-week test-day rehearsal",
    ],
    featured: false,
  },
] as const;

/** PLACEHOLDER results — replace with real (and permission-cleared) student data. */
export const results = {
  stats: [
    { value: 210, prefix: "+", suffix: "", label: "Average point increase", note: "sample" },
    { value: 94, prefix: "", suffix: "%", label: "Students improved 100+ pts", note: "sample" },
    { value: 1500, prefix: "", suffix: "+", label: "Top student score band", note: "sample" },
  ],
  improvements: [
    { name: "Student A.", before: 1210, after: 1450, weeks: 10 },
    { name: "Student B.", before: 1330, after: 1530, weeks: 12 },
    { name: "Student C.", before: 1080, after: 1340, weeks: 14 },
    { name: "Student D.", before: 1400, after: 1560, weeks: 8 },
  ],
  /** Mock-exam progression for the line chart (sample data). */
  progression: [1180, 1240, 1290, 1330, 1380, 1420, 1470, 1510],
  stories: [
    {
      title: "From 1210 to 1450",
      text: "[Short story: the challenge, what changed, and the result. Replace with a real student success story.]",
      tag: "+240 points",
    },
    {
      title: "Math 620 → 780",
      text: "[Short story: describe how targeted practice in a weak domain transformed the section score.]",
      tag: "+160 Math",
    },
    {
      title: "Test anxiety, solved",
      text: "[Short story: how a calm test-day routine helped a student perform at their true level.]",
      tag: "Confidence",
    },
  ],
} as const;

/** PLACEHOLDER testimonials — replace with real quotes (with permission). */
export const testimonials = [
  {
    name: "[Student Name]",
    meta: "Class of [Year]",
    score: 1550,
    gain: "+220",
    quote:
      "Every session had a purpose. I finally understood why I was missing questions — and how to stop. My score jumped more than I thought possible.",
  },
  {
    name: "[Student Name]",
    meta: "Class of [Year]",
    score: 1490,
    gain: "+260",
    quote:
      "The study plan made everything feel manageable. I always knew exactly what to work on next.",
  },
  {
    name: "[Parent Name]",
    meta: "Parent of a student",
    score: 1520,
    gain: "+190",
    quote:
      "Clear communication, honest progress updates and a tutor who genuinely cared. Worth every minute.",
  },
  {
    name: "[Student Name]",
    meta: "Class of [Year]",
    score: 1570,
    gain: "+150",
    quote:
      "The mock exams and error logs were a game-changer. Test day felt like just another practice run.",
  },
  {
    name: "[Student Name]",
    meta: "Class of [Year]",
    score: 1460,
    gain: "+280",
    quote:
      "I used to dread Reading & Writing. Now it's my strongest section. The strategies actually work.",
  },
  {
    name: "[Student Name]",
    meta: "Class of [Year]",
    score: 1530,
    gain: "+200",
    quote:
      "Calm, patient and incredibly sharp. I walked into the test confident for the first time.",
  },
] as const;

export const faqs = [
  {
    q: "How do I know which program is right for me?",
    a: "Start with the free consultation. We'll discuss your goals, timeline and current level, and I'll recommend the program — or a custom mix — that fits best. There's no obligation.",
  },
  {
    q: "Do you teach the new Digital SAT?",
    a: "Yes. All preparation is built around the current adaptive Digital SAT format, including its two-module structure, timing and the built-in Desmos calculator.",
  },
  {
    q: "Are sessions online or in person?",
    a: "Sessions are available online worldwide, with in-person options in [City]. Online sessions use a shared digital whiteboard and are just as interactive. (Edit to match your offering.)",
  },
  {
    q: "How many points can I expect to improve?",
    a: "Every student is different, and no honest tutor can guarantee a specific number. Improvement depends on your starting point, consistency and time until test day — your diagnostic gives us a realistic target.",
  },
  {
    q: "How far in advance should I start preparing?",
    a: "Ideally 3–6 months before your test date. That said, focused intensive plans can still make a meaningful difference in a shorter window.",
  },
  {
    q: "What does the free consultation include?",
    a: "A 30-minute call to understand your goals, review any previous scores, answer your questions and outline a recommended preparation plan.",
  },
] as const;
