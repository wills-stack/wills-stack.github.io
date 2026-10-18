/* ==========================================================================
   CONTENT FILE: edit this file to update the whole website.
   You do not need to touch index.html, css/styles.css or js/main.js.

   Rules of thumb
   - Text goes inside quotes "like this". Keep the commas at the end of lines.
   - Leave a link or image as "" (empty) and it is hidden automatically.
   - To hide a whole experience/project/certificate: set  visible: false
   - To add one: copy an existing { ... }, block, paste it below it, edit it.
   ========================================================================== */

window.SITE = {
  /* ---------- Basics ---------- */
  name: "William Kurniawan Tan",
  headline: "Information Systems Undergraduate @ BINUS University",
  tagline: "Bridging Business & Technology.",
  cvPath: "assets/cv/William_Kurniawan_Tan_CV.pdf", // "" hides the Download CV buttons

  /* ---------- Hero ---------- */
  hero: {
    eyebrow: "INFORMATION SYSTEMS UNDERGRADUATE",
    title: "Bridging Business & Technology.",
    text: "I’m an Information Systems undergraduate at BINUS University with a strong interest in ERP, business processes, and technology-driven business solutions.",
    primaryButton: { label: "Explore My Work", href: "#projects" },
    secondaryButton: { label: "Let’s Connect", href: "#contact" },
    tags: [
      "ERP & Business Technology",
      "Business Process Management",
      "Information Systems",
    ],
    // Put your photo in assets/img/ and write its path here, e.g. "assets/img/william.jpg".
    // Use a portrait photo (about 4:5). Leave "" to show the placeholder.
    photo: "",
    photoAlt: "Portrait of William Kurniawan Tan",
    // The four words on the connected-flow graphic next to your photo.
    flow: ["Business", "Process", "Data", "Technology"],
  },

  /* ---------- About ---------- */
  about: {
    title: "About",
    lead: "How I think about business and technology.",
    text: "I am an Information Systems undergraduate at BINUS University with a strong interest in ERP, business processes, and business technology. I enjoy exploring how technology can improve business operations and create effective solutions. My experiences as a Laboratory Assistant, Mentor, Tutor, and student organization member, including coordinating school programs, have strengthened my communication, leadership, teamwork, and problem-solving skills.",
    interestsTitle: "Professional interests",
    interests: [
      "Enterprise Resource Planning (ERP)",
      "Business Process Management",
      "System Analysis",
      "Digital Transformation",
      "Data & Business Analytics",
    ],
    facts: [
      { label: "University", value: "BINUS University" },
      { label: "Program", value: "Information Systems" },
      { label: "GPA", value: "3.77 / 4.00" }, // set value to "" to hide a row
    ],
  },

  /* ---------- Skills ---------- */
  skills: {
    title: "Skills",
    lead: "What I work with, grouped by how I use it.",
    groups: [
      { name: "Communication Skills", items: ["English", "Indonesian", "Hokkien", "Communication", "Teamwork"] },
      { name: "Project Skills", items: ["Business Process", "Figma", "ERP", "Project Coordination"] },
      { name: "Leadership Skills", items: ["Leadership", "Team Coordination", "Event Coordination"] },
      { name: "Computer Skills", items: ["Microsoft Office", "Microsoft Excel", "Power Query", "Power Pivot", "Microsoft PowerPoint"] },
      { name: "Technical Skills", items: ["ERP Systems", "BPMN", "SQL"] },
    ],
  },

  /* ---------- Experience ---------- */
  experience: {
    title: "Experience",
    lead: "Where I have coordinated people, programs, and processes.",
    items: [
      {
        visible: true,
        role: "Business Functional & Sales",
        organization: "Auto repair workshop (bengkel)", // write the workshop name here when you want it shown
        period: "", // e.g. "Jun 2025 – Aug 2025"; "" hides it
        bullets: [
          "Connected customer needs with the workshop’s daily work flow.",
          "Sold services and spare parts and recommended options that fit what customers needed.",
          "Handled the order flow from request and service to billing, and recorded service and transaction data.",
          "Suggested simple, practical improvements to how work was done.",
        ],
      },
      {
        visible: true,
        role: "Program Coordinator, Student Council (OSIS)",
        organization: "SMA Santo Kristoforus 2",
        period: "Jan 2024 – Mar 2024",
        bullets: [
          "Coordinated student activities and worked with team members to plan each program.",
          "Ensured programs were well-organized and successfully executed.",
          "Built communication, teamwork, and leadership skills while managing responsibilities across a team.",
        ],
      },

      /* Your About text mentions these three roles, but I have no details for them yet.
         They are hidden. Fill in the organization, period and bullets, then set visible: true. */
      { visible: false, role: "Laboratory Assistant", organization: "", period: "", bullets: [] },
      { visible: false, role: "Mentor", organization: "", period: "", bullets: [] },
      { visible: false, role: "Tutor", organization: "", period: "", bullets: [] },
    ],
  },

  /* ---------- Projects ---------- */
  projects: {
    title: "Projects",
    lead: "UI/UX case studies, from the problem to a working prototype.",
    items: [
      {
        visible: true,
        id: "printin",
        title: "PrintIN",
        subtitle: "On-demand printing app (UI/UX case study)",
        summary: "A printing app where users upload a document, choose the nearest print shop, and follow the status of their print. The process is kept as short as possible, from ordering to pickup or delivery, so nobody has to wait at the shop.",
        tags: ["UI/UX Design", "Figma", "Interactive prototype"],
        cover: "assets/img/projects/printin-1.webp",
        coverAlt: "PrintIN case study cover poster",
        highlights: [
          "Designed the app flow and interface in Figma, delivered as an interactive prototype.",
          "Users upload a design, choose print specifications, and compare prices across partner print shops, with a nearest-shop recommendation.",
          "Covers in-app payment, real-time production tracking, and pickup or courier delivery.",
        ],
        gallery: [
          { src: "assets/img/projects/printin-1.webp", alt: "PrintIN case study cover poster", caption: "Overview" },
          { src: "assets/img/projects/printin-2.webp", alt: "PrintIN onboarding screens", caption: "Onboarding" },
          { src: "assets/img/projects/printin-3.webp", alt: "PrintIN screens for uploading a file and choosing print options", caption: "Upload and customize" },
          { src: "assets/img/projects/printin-4.webp", alt: "PrintIN screens for comparing print shops and choosing one", caption: "Compare and choose" },
          { src: "assets/img/projects/printin-5.webp", alt: "PrintIN screens for tracking production and pickup or delivery", caption: "Track and receive" },
        ],
        links: [
          {
            label: "View Figma prototype",
            href: "https://www.figma.com/proto/3zKhyILXM6Y1b4mRJPxFEk/PROJECT-PRINT-IN?node-id=1-3554&t=elwfHv9n9rM5Q3Bq-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
          },
        ],
      },
      {
        visible: true,
        id: "hampiness",
        title: "Hampiness",
        subtitle: "Hampers ordering app (UI/UX case study)",
        summary: "A hampers app where users pick packages from curated vendors, schedule the delivery date and time, choose courier or self-pickup, and follow the order status until it arrives.",
        tags: ["UI/UX Design", "Figma"],
        cover: "assets/img/projects/hampiness-1.webp",
        coverAlt: "Hampiness case study poster showing three app screens",
        highlights: [
          "Designed the app flow and interface in Figma for ordering hampers online from curated vendors.",
          "Covers package browsing, delivery scheduling (date, time, address, courier notes), courier or self-pickup options, and order status tracking.",
        ],
        gallery: [
          { src: "assets/img/projects/hampiness-1.webp", alt: "Hampiness case study poster showing the order list, vendor home, and delivery schedule screens", caption: "Overview" },
        ],
        links: [
          // Add the Figma link when it is ready. It stays hidden while href is "".
          { label: "View Figma prototype", href: "" },
        ],
      },
    ],
  },

  /* ---------- Certifications & academic development ---------- */
  certifications: {
    title: "Certifications & Academic Development",
    lead: "Language certification, seminars, and competitions.",
    items: [
      {
        visible: true,
        kind: "Certificate",
        institution: "Beelingua, BINUS University",
        title: "Market Research & Business Communication (V2), CEFR C2.2",
        date: "Jul 2026",
        description: "English certification at CEFR C2.2 level for the Market Research & Business Communication module.",
        image: "", // e.g. "assets/img/certificates/beelingua-c22.jpg"
        imageAlt: "Certificate for Market Research & Business Communication, CEFR C2.2",
      },
      {
        visible: true,
        kind: "Certificate",
        institution: "Beelingua, BINUS University",
        title: "Advanced English (V2), CEFR C2.1",
        date: "Jul 2026",
        description: "English certification at CEFR C2.1 level for the Advanced English module.",
        image: "",
        imageAlt: "Certificate for Advanced English, CEFR C2.1",
      },
      {
        visible: true,
        kind: "Seminar",
        institution: "Institut Français d’Indonésie × Université Paris-Saclay",
        title: "The AI Revolution: Technological Frontiers and Redefining Learning in Higher Education",
        date: "27 Apr 2026",
        description: "International seminar held at BINUS @ Alam Sutera, a collaboration between Institut Français d’Indonésie and Université Paris-Saclay.",
        image: "",
        imageAlt: "Participation certificate for the seminar The AI Revolution",
      },
      {
        visible: true,
        kind: "Competition",
        institution: "HIMSISFO BINUS",
        title: "Semifinalist, BCC Digital Innovation (DIG IN)",
        date: "25 Dec 2025 – 3 Jan 2026",
        description: "Case competition built around a Netflix case. Competed in a team of three among more than 50 participating teams.",
        image: "",
        imageAlt: "Semifinalist certificate for BCC Digital Innovation (DIG IN)",
      },
    ],
  },

  /* ---------- Contact ---------- */
  contact: {
    title: "Let’s Connect.",
    text: "If my profile aligns with what you’re looking for, feel free to get in touch. I’m always open to new opportunities and meaningful collaborations.",
    linkedin: "https://www.linkedin.com/in/william-kurniawan-tan06",
    email: "wktan06@gmail.com",
    github: "", // e.g. "https://github.com/your-username"; "" hides it
  },
};
