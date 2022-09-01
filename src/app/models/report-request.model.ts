import { ReportQuestion } from "./report-question.model";

export interface ReportRequest {
  id: string,
  client_id: string,
  report_type_id: number,
  report_request_schedule_id: string,
  date_created: string,
  date_scheduled: string,
  date_shown: string,
  show_followups: number,
  person_id: string,
  version: string,
  date_updated: string,
  date_deleted?: string,
  time?: number
  remind_again_times: number,
  remind_again_minutes: number,
  remind_later: number,
  reminder_shown_times: number,
  description: string;

  report_question: ReportQuestion[];
}
