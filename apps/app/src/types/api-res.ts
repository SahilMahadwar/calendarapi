export interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

// Example interface for the OAuth data
export interface OAuthUrlData {
  OAuthUrl: string;
}

export interface GoogleTokenResponse {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  refresh_token_expires_in: number;
  expiry_date: number;
}

export interface CalendarEvent {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  description?: string;
  creator: {
    email: string;
    self: boolean;
  };
  organizer: {
    email: string;
    self: boolean;
  };
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  location: string;
  iCalUID: string;
  sequence: number;
  reminders: {
    useDefault: boolean;
  };
  eventType: string;
}

export interface CalendarEvents {
  events: CalendarEvent[];
}
