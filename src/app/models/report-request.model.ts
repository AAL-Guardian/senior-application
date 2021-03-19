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

  report_question: ReportQuestion[];
}
