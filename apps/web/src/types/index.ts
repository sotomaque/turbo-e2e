// TODO: double check this, i dont think we get back a data object
export interface LoginMutationResponse extends Response {
  data?: {
    access: string;
    refresh: string;
  };
}

export interface MeQueryResponse extends Response {
  data?: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
}

export interface ParsedResumeResponse {
  id: number;
  thumbnail: string;
  candidate: number;
  file: string;
  resume_data: ResumeData;
  parse_error: unknown;
  label: string;
  coach: number;
  original: number;
}

export interface ResumeListResponse extends Response {
  data?: {
    count: number;
    next: string | null;
    previous: string | null;
    results: ParsedResumeResponse[] | null;
  };
}

export type ResumeData = {
  skills: string[];
  education: EducationInfo[];
  objective?: string | null;
  profile_info: ProfileInfo;
  certifications: CertificationInfo[];
  work_experience: WorkExperienceInfo[];
};

export type EducationInfo = {
  gpa?: string | number | null;
  degree?: string | null;
  subject?: string | null;
  location?: string | null;
  institution?: string | null;
  graduation_date?: string | null;
  presently_enrolled?: boolean | null;
};

export type ProfileInfo = {
  email?: string | null;
  location?: PersonalInfoLocaiton | null;
  full_name?: string | null;
  last_name?: string | null;
  first_name?: string | null;
  linkedin_url?: string | null;
  phone_number?: string | null;
  github_main_page_url?: string | null;
  portfolio_website_url?: string | null;
};

export type PersonalInfoLocaiton = {
  city?: string | null;
  state?: string | null;
  country?: string | null;
  zip_code?: string | number | null;
};

export type CertificationInfo = {
  date?: string | null;
  name?: string | null;
  organization?: string | null;
};

export type WorkExperienceInfo = {
  company?: string | null;
  end_date?: string | null;
  location?: string | null;
  job_title?: string | null;
  start_date?: string | null;
  job_summary?: string | null;
  presently_working_here?: boolean | null;
};
