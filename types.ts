
export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  companyName: string;
  datesLocation: string;
  responsibilities: string; // Stored as a single string with newlines
}

export interface Education {
  id: string;
  degreeTitle: string;
  institutionName: string;
  datesLocation: string;
}

export interface Certification {
  id: string;
  name: string;
}

export interface Skills {
  technical: string; // Comma-separated
  soft: string; // Comma-separated
}

export interface CVData {
  name: string;
  professionalTitle: string;
  contact: ContactInfo;
  summary: string;
  skills: Skills;
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
}