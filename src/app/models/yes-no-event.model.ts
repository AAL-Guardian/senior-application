import { CloudEvent } from "./cloud-event.model";

export interface YesNoEvent extends CloudEvent{
  event: 'answer-detected';
  data: {
    answer: boolean
  };
}
