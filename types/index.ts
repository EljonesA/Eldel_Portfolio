export type Unit = {
  _id?: string;
  code: string;
  name: string;
  description: string;
  grade: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  term?: string;
}

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
}
