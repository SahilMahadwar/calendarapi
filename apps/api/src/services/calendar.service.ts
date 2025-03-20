import { google } from "googleapis";
import { googleConfig } from "../config/google";
import { CalendarEvent } from "../types/calendar";

const oauth2Client = new google.auth.OAuth2({
  clientId: googleConfig.CLIENT_ID,
  clientSecret: googleConfig.CLIENT_SECRET,
  redirectUri: googleConfig.REDIRECT_URL,
});

const calendar = google.calendar({ version: "v3", auth: oauth2Client });

export const listEvents = async ({
  access_token,
  refresh_token,
  expiry_date,
}: {
  access_token: string;
  refresh_token: string;
  expiry_date: number;
}) => {
  oauth2Client.setCredentials({
    access_token: access_token,
    expiry_date: expiry_date,
    refresh_token: refresh_token,
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const calendarList = await calendar.events.list({
    calendarId: "primary",
    timeMin: today.toISOString(),
    maxResults: 1000,
    singleEvents: true,
    orderBy: "startTime",
  });

  return calendarList.data.items;
};

export const createEvent = async ({
  access_token,
  refresh_token,
  expiry_date,
  event,
}: {
  access_token: string;
  refresh_token: string;
  expiry_date: number;
  event: CalendarEvent;
}) => {
  oauth2Client.setCredentials({
    access_token: access_token,
    expiry_date: expiry_date,
    refresh_token: refresh_token,
  });

  const calendarList = await calendar.events.insert({
    calendarId: "primary",
    requestBody: {
      location: event.location,
      summary: event.summary,
      description: event.description,
      start: {
        dateTime: new Date(event.start.dateTime).toISOString(),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: new Date(event.end.dateTime).toISOString(),
        timeZone: "Asia/Kolkata",
      },
    },
  });

  return calendarList.data;
};
