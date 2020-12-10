export interface Question {
  question: string;
  audioUrl: string;
  answers: string[];
  language: 'it' | 'en' | 'fr' | 'nl'
}