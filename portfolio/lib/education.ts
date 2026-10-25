export type Education = {
  id: string;
  institution: string;
  program: string;
  level: string;
  dates: string;
  status: string;
  logo: string;
  logoAlt: string;
  logoSource: string;
};

export const education: Education[] = [
  {
    id: "feu-institute-of-technology",
    institution: "FEU Institute of Technology",
    program:
      "Bachelor of Science in Computer Science with Specialization in Software Engineering",
    level: "College / Undergraduate",
    dates: "2023–Present",
    status: "Currently studying",
    logo: "/images/schools/feu-institute-of-technology.png",
    logoAlt: "Official FEU Institute of Technology seal",
    logoSource: "https://www.feutech.edu.ph/images/Tech_Logo.png",
  },
  {
    id: "university-of-the-east-caloocan",
    institution: "University of the East – Caloocan",
    program: "Information and Communications Technology (ICT)",
    level: "Senior High School",
    dates: "2021–2023",
    status: "Completed",
    logo: "/images/schools/university-of-the-east.jpg",
    logoAlt: "University of the East official institutional seal",
    logoSource:
      "https://upload.wikimedia.org/wikipedia/en/6/68/UE_SEAL.jpg",
  },
];
