import { ReportFeedback } from './report-feedback.model';
import { ReportQuestion } from "./report-question.model";

export interface ReportQuestionOption {
  id: number;
  report_question_id: number;
  name: string;
  description: string;
  sort_order: number;
  display_icon: string;
  display_color: string;
  is_yes_no: number;
  emotion?: string;

  followup_question?: ReportQuestion;
  feedback?: ReportFeedback[];
  selected?: boolean;
}