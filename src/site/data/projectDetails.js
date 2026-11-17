/**
 * Extra detail layered on top of the Supabase `projects` rows, keyed by the
 * row's title (lower-cased). Supabase stays the source of truth for which
 * projects exist, their images and links; anything here only adds depth
 * (features, how it works, corrected stacks) gathered from each repo's
 * README / package.json. Projects added from /admin still show up without
 * an entry here — they just render with the Supabase fields alone.
 *
 * `order` sets the running order on the page; unlisted projects follow,
 * newest first.
 */
export const projectDetails = {
  fusion: {
    order: 1,
    arch: ['Text prompt', 'LLM scene plan', 'React / Remotion scenes', 'Multi-track timeline editor', 'Editable video'],
    award: '2nd of 500+ teams',
    event: 'Interswitch × Enyata Buildathon',
    summary: 'Describe a product video in plain English and get back a fully editable video.',
    overview:
      'You describe the video you want and Fusion generates each scene as a React component rendered with Remotion, so every word, colour and timing stays editable after generation. We built it in four days and demoed it live at Interswitch HQ.',
    features: [
      'Prompt-to-video generation, one React/Remotion component per scene',
      'Multi-track timeline editor for reordering, trimming and retiming scenes',
      "Brand extraction: paste a URL and pull in that brand's logo, colours and assets",
      'Scenes stay as code, so nothing is locked into a rendered file',
    ],
    how: [
      'An LLM turns the prompt into a scene plan, and each scene is emitted as a typed React component.',
      'Remotion renders the components on a shared timeline, which the editor reads and writes.',
      'A Node.js service scrapes the brand URL and feeds the extracted assets into generation.',
    ],
    demoLabel: 'Watch demo',
  },
  campor: {
    order: 4,
    award: 'Live product',
    event: 'Co-founder · Frontend lead',
    summary: "The marketplace students at Redeemer's University use to buy and sell from each other.",
    overview:
      'Campor is a live campus marketplace. Students list goods and services, find them through instant search, chat with sellers in real time and pay through Paystack. I co-founded it, lead the frontend and make a lot of the product and onboarding decisions.',
    features: [
      'Listings for both goods and services, with image uploads through Cloudinary',
      'Instant search with Algolia autocomplete, query suggestions and recent searches',
      'Real-time buyer–seller messaging over Socket.IO',
      'Checkout and payments through Paystack',
      'Bulk data export (xlsx) and product analytics on Vercel',
    ],
    how: [
      'React + Vite frontend talking to an Express API, with Prisma over PostgreSQL.',
      'Listings are mirrored to an Algolia index so search stays fast as inventory grows.',
      'A Socket.IO channel per conversation delivers messages without polling.',
    ],
  },
  seeforme: {
    order: 2,
    arch: ['Phone camera', 'Socket.IO frame stream', 'Flask + YOLO v11', 'Groq LLM phrasing', 'Spoken with Web Speech API'],
    award: '2nd place',
    event: 'DATICAN AI in Medicine',
    summary: 'An AI assistant that describes the world out loud for people who are blind or visually impaired.',
    overview:
      'SeeForMe streams a live camera feed to a custom-trained YOLO v11 model, turns what it detects into short spoken directions, and can describe any photo in detail. It also includes colour-blindness simulation tools and full voice and keyboard navigation.',
    features: [
      'Real-time navigation guidance, e.g. “turn slightly right to avoid the obstacle”',
      'Snap & Describe: detailed spoken descriptions of any photo',
      'Colour-blindness simulation for Protanopia, Deuteranopia, Tritanopia and Achromatopsia',
      'Hands-free voice commands plus keyboard-only navigation',
    ],
    how: [
      'The browser streams frames to a Flask backend over Socket.IO.',
      'YOLO v11 (Ultralytics + OpenCV) detects objects, and an LLM on Groq turns detections into one actionable instruction.',
      'The instruction comes back over the socket and is spoken with the Web Speech API.',
    ],
    stack: ['React', 'Vite', 'Tailwind CSS', 'Python', 'Flask', 'Flask-SocketIO', 'YOLO v11', 'OpenCV', 'Groq', 'Gemini API', 'Web Speech API'],
    demoLabel: 'Watch demo',
  },
  'runacos web design hackathon': {
    order: 5,
    title: 'RUNACOS Platform',
    award: '1st place',
    event: 'RUNACOSS Web Design Contest',
    summary: "The full platform for the Computer Science association at Redeemer's University.",
    overview:
      'More than a website: students and alumni read news, register for events and browse an alumni directory with career stories. Faults can be reported and tracked, and an admin dashboard manages all of it.',
    features: ['News and event registration', 'Alumni directory with career stories', 'Fault reporting and tracking system', 'Admin dashboard for all content'],
    how: [
      'React + TypeScript frontend with TanStack Query for server state and caching.',
      'Express API with Prisma over PostgreSQL (Supabase), and media stored on Cloudinary.',
      'Page and scroll animation with Framer Motion and GSAP.',
    ],
  },
  'gcg3 community platform': {
    order: 6,
    title: 'GCG3 Platform',
    award: 'Client',
    event: 'GCG3',
    summary: 'A headless-CMS website for a community organisation that runs events and talent programmes.',
    overview:
      "GCG3's team keeps writing in WordPress, while the public site is a fast Next.js front end. Upcoming events are pulled in live, with filters and a page for each event.",
    features: [
      'Headless WordPress: content managed in WP, rendered by Next.js',
      'Live event listings with filters and detail pages',
      'Animated, responsive layouts with Framer Motion',
    ],
    how: ['Next.js 14 fetches posts and events from the WordPress REST API.', 'Deployed on Vercel.'],
  },
  'kingdom scholars academy website': {
    order: 7,
    title: 'Kingdom Scholars Academy',
    award: 'Client',
    event: 'Kingdom Scholars Academy',
    overview:
      'Parents can read about the school, check fees and apply for admission online. Staff publish news articles, each with its own page, alongside a gallery, a staff directory and testimonials.',
    how: ['Next.js with Supabase for data.', 'Transactional email through Resend.'],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Resend', 'Framer Motion'],
  },
  'arbitrum token app': {
    order: 8,
    title: 'Token Management Hub',
    award: 'Bounty winner',
    event: 'Arbitrum Builders Bounty',
    summary: 'Mint, transfer and approve ERC-20 tokens on Arbitrum Sepolia from one interface.',
    overview:
      'A web3 app that brings the common token operations into one tab-based interface, with wallet connection and live transaction feedback.',
    features: [
      'Wallet connection through RainbowKit',
      'ERC-20 minting, transfers and approval management',
      'Live balances and real-time transaction status',
      'Clear error and success states for every on-chain action',
    ],
    how: [
      'Next.js app using Wagmi hooks and Ethers.js to read from and write to the token contract.',
      'Deployed against the Arbitrum Sepolia testnet.',
    ],
    stack: ['Next.js', 'React', 'Wagmi', 'RainbowKit', 'Ethers.js', 'Tailwind CSS', 'Arbitrum Sepolia'],
  },
  'recipe recommender': {
    order: 3,
    arch: ['Ingredients + diet', 'React UI', 'Node.js API', 'Gemini', 'Recipes you can cook'],
    award: '10th place',
    event: 'StackUp September Coding Challenge',
    summary: "Tell it what's in your kitchen and it suggests recipes you can actually make.",
    overview:
      'You enter your ingredients and any dietary restrictions, and an AI model generates recipes that fit. Built full-stack with Fadehan Daniel.',
    features: ['Recipe generation from the ingredients you have', 'Dietary preferences and restrictions', 'Containerised backend for one-command setup'],
    how: ['A Node.js backend handles requests and calls the Gemini API.', 'React frontend for preferences and results, with Docker Compose for local setup.'],
    stack: ['React', 'Tailwind CSS', 'Node.js', 'Gemini API', 'Docker'],
    demoLabel: 'Watch demo',
  },
  'event ticketing generator': {
    order: 9,
    title: 'Conference Ticket Generator',
    award: 'Personal',
    event: 'Side project',
    overview:
      'A multi-step registration flow that validates your details, uploads your avatar to Cloudinary and generates a personalised ticket.',
    features: ['Multi-step form with validation', 'Avatar upload to Cloudinary', 'Generated, personalised ticket'],
    how: ['React + React Router with Tailwind CSS v4.'],
    stack: ['React', 'React Router', 'Tailwind CSS', 'Cloudinary'],
  },
  'chart capstone limited website': {
    order: 10,
    title: 'Chart Capstone Limited',
    award: 'Client',
    event: 'Chart Capstone Limited',
    summary: 'Corporate website for a company in oil and gas, agriculture and solid minerals.',
    overview: "A responsive corporate site presenting the company's three divisions, services and contact channels.",
    features: ['Division and service pages', 'Responsive, fast-loading layout'],
    how: ['React with Tailwind CSS.'],
  },
};
