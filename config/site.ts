export const siteConfig = {
  // Trainer info
  trainerName: "Kaustubh",
  shortBrandName: "Kaustubh",
  whatsappNumber: "918920862931",
  email: "astrokalki.sos@gmail.com",
  instagram: "https://www.instagram.com/lokhandekaustubh/",
  youtube: "https://youtube.com/@kalki_7?si=zW6DubVcW7O9xlg9",
  city: "Delhi",

  // SEO
  siteName: "Kaustubh | Personal Trainer & Bodybuilding Coach",
  siteDescription:
    "Personal training online & in-person. Build strength, lose fat, stay consistent. Certified coach with 8+ years experience.",
  siteLogo: "/images/portrait-moody-lighting.jpg",

  // Hero
  hero: {
    preheading: "NOW BOOKING LIMITED ONLINE SLOTS",
    heading: "Build the body.\nReset the nervous system.\nKeep the discipline.",
    subheading:
      "Online coaching that combines strength training, nutrition, weekly assessment, and somatic reset — in 15 live sessions that fit your real life.",
    ctaText: "Book Free 15-Min Strategy Call",
    secondaryCtaText: "See Coaching Paths",
    trustStats: [
      { value: "8+", label: "Years coaching" },
      { value: "450+", label: "Clients trained" },
      { value: "4.9", label: "Avg rating" },
    ],
  },

  // Certifications & Credibility
  certifications: [
    { label: "Functional Strength Certification", icon: "⚡" },
    { label: "Competitive Bodybuilding Experience", icon: "🏆" },
    { label: "Precision Nutrition L1", icon: "🍽️" },
    { label: "Advanced Movement Coaching", icon: "💪" },
  ],

  certificateContext:
    "Built credentials through practice and real client results, not theory alone.",

  // Intent-Based CTAs
  intentCtaOptions: [
    {
      id: "1-to-1",
      label: "I want 1:1 coaching",
      message:
        "Hi Kaustubh, I want 1:1 coaching. My goal is ___ and my current challenge is ___.",
    },
    {
      id: "fat-loss",
      label: "I want fat loss coaching",
      message:
        "Hi Kaustubh, I want fat loss coaching. My age is ___ and I can train ___ days/week.",
    },
    {
      id: "group",
      label: "I want small-group coaching",
      message:
        "Hi Kaustubh, I'm interested in group coaching. Please tell me more.",
    },
    {
      id: "unsure",
      label: "Help me choose the right plan",
      message:
        "Hi Kaustubh, I'm not sure which program fits me best. Can you guide me?",
    },
  ],

  // Who This Is For
  whoThisIsFor: {
    for: [
      "You want structure, accountability, and realistic nutrition.",
      "You've struggled with consistency more than information.",
      "You can commit to 15 sessions and weekly check-ins.",
      "You want a coach who adjusts, not forces protocols.",
    ],
    notFor: [
      "You want instant results in 7 days.",
      "You won't follow tracking or check-ins.",
      "You only want a generic PDF workout.",
      "You're looking for the cheapest option available.",
    ],
  },

  // What Happens After
  whatHappensAfter: [
    {
      step: "1",
      title: "Send 'Hi' on WhatsApp",
      description:
        "Reach out with any intro — no script needed. I'll respond usually within 15–30 mins.",
    },
    {
      step: "2",
      title: "I ask 3 quick questions",
      description:
        "Goal, schedule, and what's blocked you before. Takes 5 mins to answer.",
    },
    {
      step: "3",
      title: "I suggest the right path",
      description:
        "Based on your answers, I'll recommend the best program for you — or tell you honestly if it's not a fit right now.",
    },
  ],

  // Message If Section
  messageIfSection: {
    title: "Message me on WhatsApp if…",
    triggers: [
      "You've started and stopped multiple times",
      "You need accountability more than motivation",
      "You want fat loss without extreme dieting",
      "You want a coach to actually monitor your progress",
      "You want a realistic plan for job + family + stress",
    ],
    cta: "Send 'START' on WhatsApp",
  },

  // Hero Trust Line
  heroTrustLine:
    "Custom diet, weekly assessments, form correction, and WhatsApp accountability included.",

  // About
  about: {
    label: "ABOUT",
    heading: "Coaching that actually fits your life.",
    paragraphs: [
      "Most fitness plans fail because they ignore reality. You're not a college student with unlimited time. You have a job, a life, real constraints. Yet every trainer pushes the same cookie-cutter program, expects you to follow an extreme diet, and wonders why you quit after 6 weeks.",
      "Here's what I do differently: I build a system around your week, not around some Instagram fantasy. Nutrition that doesn't require meal prep Sundays. Training that fits your schedule. Accountability that doesn't feel like punishment. And the measurement to know it's actually working. That consistency compounds. Over months, it builds a completely different body and a different relationship with discipline itself.",
    ],
    pullQuote:
      "Discipline beats motivation. My job is to make discipline easier than quitting.",
  },

  // Programs
  programs: [
    {
      id: "deep-reset",
      badge: "EXCLUSIVE 1:1",
      name: "K7 DEEP RESET™",
      shortName: "Deep Reset",
      tagline: "Decode your patterns. Rebuild your body. Reset your mind.",
      description:
        "A 1:1 transformation mentorship for people stuck in burnout, inconsistency, yo-yo dieting, or low self-belief. This is your most personalised path.",
      price: "₹9,999",
      oldPrice: null,
      priceNote: "15 sessions · 60 min each",
      duration: "6–8 weeks",
      sessions: "15 live sessions",
      format: "1:1 online coaching",
      bestFor: "Anyone stuck in yo-yo cycles, burnout, low discipline, or needing private support",
      spots: "Only 4 slots/month",
      urgency: "Once a slot is taken, you move to the next intake window.",
      cta: "Book 1:1 Reset",
      ctaText:
        "Hi Kaustubh, I want to apply for the K7 Deep Reset 1:1 coaching.",
      includes: [
        "Fully customised training plan for home or gym",
        "Custom diet chart updated every 2 weeks",
        "Weekly assessment: weight, inches, photos, strength and performance tracking",
        "WhatsApp support for accountability, form checks, and doubts",
        "Monthly somatic / emotional reset circles included",
      ],
      bullets: [
        "Every session is mapped to your exact goal and current capacity",
        "Food you can actually follow in real Indian daily life",
        "We track, adjust, and course-correct every single week",
        "Best if you want privacy, structure, and zero guesswork",
      ],
      accent: "lime",
      popular: false,
    },
    {
      id: "fat-loss-energy",
      badge: "MOST POPULAR",
      name: "FAT LOSS & ENERGY CREW™",
      shortName: "Fat Loss Crew",
      tagline: "Break the yo-yo cycle, lose inches and feel alive again — without starving.",
      description:
        "A small-group fat loss sprint for busy professionals who need structure, accountability, and high energy without extreme diets or endless cardio.",
      price: "₹3,999",
      oldPrice: null,
      priceNote: "per person · 2–3 people per batch",
      duration: "6–8 weeks",
      sessions: "15 live sessions",
      format: "Small group online coaching",
      bestFor: "Busy professionals 25–45 dealing with fat gain, inconsistency, and low energy",
      spots: "3 spots per batch",
      urgency: "Next batch opens soon. Once full, waitlist only.",
      cta: "Join Fat Loss Crew",
      ctaText:
        "Hi Kaustubh, I want to join the Fat Loss & Energy Crew batch.",
      includes: [
        "Progressive fat loss plan using smart circuits + strength work",
        "Minimal equipment option: dumbbells, bands, and mat",
        "Custom fat loss diet chart for each participant",
        "Weekly weigh-in, inch tracking, and performance tests",
        "Community energy challenges + monthly emotional reset class",
      ],
      bullets: [
        "No boring cardio marathons — just smart, effective sessions",
        "Each member still gets personalised food and progression",
        "Same weekly slot for consistency and momentum",
        "Best if you want accountability plus the push of a small crew",
      ],
      accent: "orange",
      popular: true,
    },
    {
      id: "strength-hormone",
      badge: "FOR 28+",
      name: "STRENGTH & HORMONE REBOOT™",
      shortName: "Hormone Reboot",
      tagline: "Rebuild strength, reset sleep, and balance your body's signals.",
      description:
        "A structured small-group program for men and women 28+ dealing with fatigue, stress, hormonal shifts, poor recovery, and falling consistency.",
      price: "₹3,999",
      oldPrice: null,
      priceNote: "per person · 2–3 people per batch",
      duration: "6–8 weeks",
      sessions: "15 live sessions",
      format: "Small group online coaching",
      bestFor: "Men & women 28+ dealing with burnout, low strength, poor sleep, and stress load",
      spots: "3 spots per batch",
      urgency: "Limited seats because technique attention is high.",
      cta: "Join Hormone Reboot",
      ctaText:
        "Hi Kaustubh, I want to join the Strength & Hormone Reboot batch.",
      includes: [
        "Progressive strength + mobility plan with joint-friendly training",
        "Hormone-supportive lifestyle blueprint: sleep, sunlight, walking, stress rituals",
        "Custom diet chart focused on protein, stable energy, and recovery",
        "Weekly check-ins for sleep, mood, energy, recovery, and performance",
        "Monthly somatic resilience class with breathwork and nervous system reset",
      ],
      bullets: [
        "Designed for high-stress real life, not athlete fantasy routines",
        "Focus on strength, sleep, recovery, and stable energy",
        "Supportive for people feeling age, stress, or hormonal shifts in the body",
        "Best if you want strength without burning yourself out more",
      ],
      accent: "cyan",
      popular: false,
    },
  ],

  sharedProgramIncludes: [
    "15 live online sessions of 60 minutes each",
    "Weekly assessment & feedback: measurements, photos, and performance tracking",
    "Custom diet chart with regular adjustments",
    "WhatsApp support for doubts, accountability, and form review",
    "Access to K7 Inner Circle community challenges",
    "1–2 complimentary somatic / emotional reset classes every month",
  ],

  // Transformations
  transformations: [
    {
      image: "/images/krish-transformation.jpg",
      highlight: "45 Days",
      name: "Krish",
      age: 26,
      result: "Extreme Muscle Definition",
      timeline: "Day 1 → Day 45",
      story: "Complete body transformation with incredible muscle gain and vascularity. Went from a basic gym routine to a structured program and saw dramatic results.",
    },
    {
      image: "/images/anurag-transformation.jpg",
      highlight: "37 Days",
      name: "Anurag",
      age: 24,
      result: "Back Muscle Development",
      timeline: "1-SEP-21 → 8-OCT-21",
      story: "Significant muscle tone and definition improvement in just over a month. Focused training and consistent nutrition delivered visible back development.",
    },
    {
      image: "/images/raj-transformation.jpg",
      highlight: "2 Months",
      name: "Raj S.",
      age: 28,
      result: "−8 kg, Lean & Cut",
      timeline: "Before → After",
      story: "Perfect balance of weight loss and muscle retention for a shredded look. Sustainable approach that built lasting habits, not just short-term results.",
    },
  ],

  // Stats
  stats: [
    { value: 450, label: "CLIENTS COACHED", suffix: "+" },
    { value: 3200, label: "KILOS LOST", suffix: "" },
    { value: 8, label: "YEARS OF COACHING", suffix: "+" },
    { value: "4.9", label: "5-STAR REVIEWS", suffix: "" },
  ],

  // Testimonials
  testimonials: [
    {
      quote:
        "I'd tried 4 trainers before Kaustubh. He's the first one who actually adjusted to my schedule instead of the other way around. Down 11 kg and finally pain-free.",
      name: "Madhav",
      meta: "Online client · 9 months",
    },
    {
      quote:
        "Squat went from 60 to 140 kg. More than the numbers though — I show up to work with energy I haven't had since college.",
      name: "Vishakha",
      meta: "1:1 client · 1 year",
    },
    {
      quote:
        "The group keeps me honest. Kaustubh's programming is intense but smart. First time I've stuck with anything fitness past two months.",
      name: "Upendra",
      meta: "Bootcamp · 6 months",
    },
  ],

  // Process
  process: [
    {
      step: "01",
      title: "Free strategy call",
      copy: "15 minutes. We talk goals, your real schedule, and what's blocked you before.",
    },
    {
      step: "02",
      title: "Assessment + intake scale",
      copy: "Movement quality check. Lifestyle audit. Your plan gets built around actual capacity.",
    },
    {
      step: "03",
      title: "15-session execution plan",
      copy: "Live training with form coaching. Custom diet. Weekly somatic resets included.",
    },
    {
      step: "04",
      title: "Weekly review + diet adjustment",
      copy: "Every week we measure, track and adjust. No guesswork, just momentum.",
    },
  ],

  // FAQ
  faq: [
    {
      question: "I'm a complete beginner. Is this for me?",
      answer:
        "Absolutely. I work with complete beginners all the time. In fact, I prefer it because there are no bad habits to unlearn. We'll start slow, build movement quality first, and progress from there. The process is the same — it's just customized to your fitness level.",
    },
    {
      question: "How is online coaching different from a YouTube plan?",
      answer:
        "YouTube is free but impersonal. A good online coach writes a plan for YOU, not 100,000 people. I'll adjust your training based on your equipment, injuries, schedule and feedback. Plus you get weekly check-ins, video form reviews, and accountability. It's completely different.",
    },
    {
      question: "What equipment do I need for online coaching?",
      answer:
        "Depends on your goals. For fat loss, minimal. For strength, basic dumbbells and a pull-up bar is ideal but we can adapt. First consult, we'll talk about what you have and build from there.",
    },
    {
      question: "Do you handle nutrition?",
      answer:
        "Yes. I'm not a dietitian, but I'll give you a framework that works. No extreme cutting or weird protocols. Just alignment with your training goals and your actual life.",
    },
    {
      question: "What does it cost?",
      answer:
        "Depends on the program. 1:1 in-person is premium, online is mid-tier, group is the best value. I'll share exact pricing after your free consult once I understand your goal.",
    },
    {
      question: "What if it's not working for me?",
      answer:
        "We adjust. If something isn't working after 2–3 weeks, we change it. My job is to find what sticks for you, not force a protocol. Flexibility is part of the system.",
    },
  ],

  // Final CTA
  finalCta: {
    label: "YOUR MOVE",
    heading: "Stop scrolling.\nStart training.",
    subheading:
      "Free 15-minute WhatsApp consult. No pressure, no sales pitch — just an honest look at what'll actually work for you.",
    ctaText: "Book my free consult",
    secondaryCtaText: "Email instead",
    whatsappMessage: "Hi Kaustubh, I'd like to book my free 15-min consult.",
  },

  // Footer
  footer: {
    statement:
      "Personal training online that fits real life. Build strength, lose fat, stay consistent — with a coach who actually shows up.",
    closing: "Built for people who actually want to change.",
  },

  // Floating WhatsApp
  floatingWhatsapp: {
    label: "Chat on WhatsApp",
    message: "Hi Kaustubh, I'd like to know more about your coaching.",
  },
};
