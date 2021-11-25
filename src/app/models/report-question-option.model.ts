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

  followup_question?: ReportQuestion;
  selected?: boolean;
}