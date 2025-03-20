export interface CalendarEventInput {
  location: string;
  summary: string;
  description: string;
  start: {
    dateTime: string;
    // timeZone: string;
  };
  end: {
    dateTime: string;
    // timeZone: string;
  };
}
