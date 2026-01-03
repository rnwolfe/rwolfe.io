import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Ryan Wolfe",
  initials: "RW",
  url: "https://www.linkedin.com/in/rnwolfe",
  location: "Washington, DC",
  locationLink: "https://www.google.com/maps/place/Washington,+DC",
  description:
    "Staff Software Engineer at Google. Founder and CEO of Good Spirits Cocktails.",
  summary:
    "I'm a passionate problem solver with a broad background across software engineering, cybersecurity, networking, and military experience. Most recently, my programmability stack has centered around Python and the modern web stack including JavaScript/TypeScript, Node.js, Express, Angular, Ionic, MongoDB, and more. My GitHub shows some public work, though much of my deeper work is private for my employer. This includes full-stack development with Node.js/Express APIs, Angular SPAs, iOS and Android apps with Ionic, microservice architectures on Kubernetes, and worker-style services using message queues to balance JavaScript and Python tasks.\n\nCertifications: CCIE #56911 Security (v5), Cisco Certified DevNet Professional, CCNP R/S, Palo Alto Networks CNSE, CompTIA A+, Network+, Security+.",
  avatarUrl: "/me.png",
  skills: [
    "Python",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Express",
    "Angular",
    "Ionic",
    "MongoDB",
    "Kubernetes",
    "Automation",
    "DevOps",
    "DevSecOps",
    "Network Security",
    "Cisco",
    "Palo Alto Networks",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "",
    tel: "",
    social: {
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/rnwolfe",
        icon: Icons.linkedin,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "Google",
      href: "https://www.google.com",
      badges: [],
      location: "Washington, DC",
      title: "Staff Software Engineer",
      logoUrl: "/google.svg",
      fallbackText: "G",
      start: "Jun 2022",
      end: "Present",
      description:
        "Progression: Senior Network Engineer | 06/2022 - 04/2024 -> Staff Network Engineer | 04/2024 - 04/2025 -> Staff Software Engineer | 01/2025 - Present. Focused on networking, security, and automation for Google Distributed Cloud.",
    },
    {
      company: "Good Spirits Cocktails",
      href: "#",
      badges: [],
      location: "Washington, DC",
      title: "Founder & CEO",
      logoUrl: "",
      fallbackText: "GS",
      start: "Sep 2020",
      end: "Present",
      description:
        "Launched in May 2023, Good Spirits Cocktails is a spirits-based ready-to-drink cocktail company focused on quality, consistency, and going beyond the classics.",
    },
    {
      company: "Iron Bow Technologies",
      href: "https://www.ironbow.com",
      badges: [],
      location: "Washington, DC Metro Area",
      title: "Technical Director, Programmability and Automation",
      logoUrl: "",
      fallbackText: "IB",
      start: "Jun 2018",
      end: "Jun 2022",
      description:
        "Led automation and programmability solutions, supported DevOps and DevSecOps initiatives, and built a MEAN-stack content management platform with microservices on AWS. Developed Python automation tooling, npm modules, browser extensions, and chatbots for network and security workflows.",
    },
    {
      company: "Force 3",
      href: "#",
      badges: [],
      location: "Crofton, MD",
      title: "Solutions Delivery, Security Practice",
      logoUrl: "",
      fallbackText: "F3",
      start: "Apr 2013",
      end: "Jun 2018",
      description:
        "Progression: Systems Engineer II | 04/2013 - 06/2015 -> Technical Consultant | 07/2015 - 06/2016 -> Solutions Delivery Team Lead, Security & Enterprise Networks | 06/2016 - 06/2018. Delivered next-generation security solutions and specialized in Cisco ISE and enterprise security architectures.",
    },
    {
      company: "United States Marine Corps",
      href: "#",
      badges: [],
      location: "Jacksonville, NC",
      title: "Assistant Data Chief",
      logoUrl: "/usmc.svg",
      fallbackText: "USMC",
      start: "Jul 2008",
      end: "Apr 2013",
      description:
        "Led enterprise IT operations, help desk support, and large-scale network upgrades across multi-site environments.",
    },
    {
      company: "Freelance",
      href: "#",
      badges: [],
      location: "Remote",
      title: "Web Developer",
      logoUrl: "",
      fallbackText: "FR",
      start: "Jan 2005",
      end: "Dec 2009",
      description:
        "Built websites for clients using HTML, CSS, JavaScript, PHP, and MySQL.",
    },
    {
      company: "Lafayette Parish School Systems",
      href: "#",
      badges: [],
      location: "Lafayette, LA",
      title: "Information Technology Technician",
      logoUrl: "",
      fallbackText: "LP",
      start: "May 2005",
      end: "Aug 2007",
      description:
        "Help desk support for 47 schools, maintaining and deploying thousands of end-user devices.",
    },
  ],
  education: [
    {
      school: "Industry Certifications",
      href: "#",
      degree:
        "CCIE #56911 Security (v5), Cisco Certified DevNet Professional, CCNP R/S, Palo Alto Networks CNSE, CompTIA A+, Network+, Security+",
      logoUrl: "/me.png",
      start: "2008",
      end: "Present",
    },
  ],
  projects: [
    {
      title: "Good Spirits Cocktails",
      href: "#",
      dates: "May 2023 - Present",
      active: true,
      description:
        "A spirits-based ready-to-drink cocktail company focused on quality, consistency, and going beyond the classics.",
      technologies: ["Brand", "Operations", "Product"],
      image: "",
      video: "",
    },
    {
      title: "Automation & Programmability Platform",
      href: "#",
      dates: "2018 - 2022",
      active: false,
      description:
        "Built a MEAN-stack content management platform with API-first microservices, message queues, and mobile apps, deployed on AWS.",
      technologies: ["MEAN Stack", "AWS", "Microservices", "Python"],
      image: "",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "Good Spirits Cocktails Launch",
      dates: "May 2023",
      location: "Washington, DC",
      description:
        "Launched a ready-to-drink cocktail brand built around consistency and classic profiles.",
    },
    {
      title: "Google Distributed Cloud",
      dates: "Jun 2022 - Apr 2025",
      location: "Reston, VA",
      description:
        "Supported networking, security, and automation initiatives for the Google Distributed Cloud team.",
    },
    {
      title: "USMC Enterprise IT Leadership",
      dates: "2008 - 2013",
      location: "Jacksonville, NC",
      description:
        "Led large-scale IT operations, network upgrades, and support for thousands of users.",
    },
  ],
} as const;
