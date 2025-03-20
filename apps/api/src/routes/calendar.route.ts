import express from "express";
import { validate } from "express-validation";

import {
  createCalendarEvent,
  listCalendarEvents,
} from "../controllers/calendar.controller";

export const calendarRouter = express.Router();

calendarRouter
  .route("/events")
  .get(listCalendarEvents)
  .post(createCalendarEvent);
