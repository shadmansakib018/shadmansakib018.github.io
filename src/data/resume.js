export const personal = {
  name: 'Shadman Sakib',
  email: 'shadmansakib018@gmail.com',
  phone: '+1 417-423-6593',
  github: 'https://github.com/shadmansakib018',
  linkedin: 'https://linkedin.com/in/shadman-sakib07',
  roles: [
    'Software Engineer',
    'AI/ML Researcher',
    'Full-Stack Developer',
  ],
  tagline: 'An enthusiastic learner who channels curiosity into software engineering and AI/ML research.',
}

export const experience = [
  {
    company: 'Missouri State University',
    location: 'Springfield, MO',
    role: 'Graduate Research & Teaching Assistant',
    period: 'Aug 2023 – Present',
    bullets: [
      'Built an RL-driven cloud scheduling system integrating CloudSim (Java) with PyTorch DDQN models via a Flask API, enabling dynamic VM allocation based on real-time resource states.',
      'Engineered a cross-language training pipeline (Java → Python) to simulate workloads and iteratively train scheduling policies for distributed systems.',
      'Led weekly Data Structures & Algorithms labs for 60+ students, improving understanding of algorithm design, debugging, and time complexity.',
    ],
    tags: ['PyTorch', 'DDQN', 'Flask', 'Java', 'CloudSim', 'Python'],
  },
  {
    company: 'Girmairi',
    location: 'Remote (US-based startup)',
    role: 'Software Engineer',
    period: 'Sept 2021 – Feb 2025',
    bullets: [
      'Developed a full-stack dealership management platform using Next.js, Node.js, Express, and MongoDB, enabling inventory management and AI-driven vehicle descriptions.',
      'Built a cross-platform mobile application from scratch using React Native and Expo, integrating camera, file storage, and real-time push notifications via Firebase Cloud Messaging. Deployed to App Store and Google Play.',
      'Designed and implemented a CI/CD pipeline using AWS CodePipeline and CodeBuild, reducing deployment cycles from manual releases to automated builds (~15–20 min).',
      'Deployed production infrastructure using AWS S3, CloudFront CDN, Route53, and Elastic Beanstalk (EC2), securing traffic with TLS and AWS WAF.',
    ],
    tags: ['Next.js', 'Node.js', 'MongoDB', 'React Native', 'AWS', 'Firebase', 'CI/CD'],
  },
]

export const education = [
  {
    school: 'Missouri State University',
    location: 'Springfield, MO',
    degree: 'M.S. Computer Science',
    extra: 'Data Science Certification',
    gpa: '3.80 / 4.00',
    period: 'Aug 2023 – Dec 2025',
  },
  {
    school: 'BRAC University',
    location: 'Dhaka, Bangladesh',
    degree: 'B.S. Computer Science & Engineering',
    extra: '',
    gpa: '3.82 / 4.00',
    period: 'Jan 2017 – Dec 2020',
  },
]

export const projects = [
  {
    title: 'Conversational AI App',
    description:
      'Full-stack ChatGPT-like application with persistent sessions, chat history, and real-time streaming responses.',
    bullets: [
      'Frontend built with Vue.js and Pinia for reactive state management.',
      'Backend using Node.js/Express (TypeScript) with Neon PostgreSQL for user session & chat history storage.',
    ],
    tags: ['Vue.js', 'Pinia', 'Node.js', 'TypeScript', 'PostgreSQL', 'Neon'],
    icon: 'ai',
  },
  {
    title: 'Gesture-Based Navigation Interface',
    description:
      'A real-time hand gesture recognition system that lets users control UI through natural hand movements.',
    bullets: [
      'Used OpenCV and MediaPipe to detect and interpret 21-landmark hand skeletons in real time.',
      'Mapped gestures to navigation events, enabling touchless UI control.',
    ],
    tags: ['Python', 'OpenCV', 'MediaPipe', 'Computer Vision'],
    icon: 'gesture',
  },
  {
    title: 'RL Cloud Scheduler',
    description:
      'Research prototype for adaptive VM allocation in cloud environments using reinforcement learning.',
    bullets: [
      'Integrated CloudSim (Java) simulator with a PyTorch DDQN agent via a Flask REST bridge.',
      'Achieved significant improvements in resource utilization vs. round-robin baseline.',
    ],
    tags: ['PyTorch', 'DDQN', 'Java', 'CloudSim', 'Flask', 'Python'],
    icon: 'cloud',
  },
]

export const publications = [
  {
    title: 'Reinforcement Learning Based Adaptive Task Scheduling in Cloud Environments',
    venue: 'IEEE ICCT 2025',
    year: 2025,
    badge: 'IEEE',
    link: 'https://ieeexplore.ieee.org/abstract/document/11374147'
  },
  {
    title: 'Dynamic Load Balancing in Cloud Infrastructure for Energy Efficiency',
    venue: 'IEEE Cloud Summit 2025',
    year: 2025,
    badge: 'IEEE',
    link: 'https://ieeexplore.ieee.org/abstract/document/11108127'
  },
  {
    title: 'ML & NLP-Based Mental Illness Classification',
    venue: 'Springer ICICTD 2022',
    year: 2022,
    badge: 'Springer',
    link:'https://link.springer.com/chapter/10.1007/978-981-19-7528-8_7'
  },
]

export const skills = {
  Languages: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'SQL', 'HTML5', 'CSS3'],
  Frameworks: ['React.js', 'Next.js', 'Node.js', 'Express', 'Vue.js', 'Django', 'Flask', 'React Native', 'TailwindCSS'],
  'Databases & Tools': ['PostgreSQL', 'MySQL', 'MongoDB', 'GraphQL', 'Git', 'Docker', 'Figma'],
  'Cloud & DevOps': ['AWS EC2', 'S3', 'CloudFront', 'CodePipeline', 'Route53', 'Jenkins', 'Docker'],
  'AI / ML': ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'PowerBI'],
}
