import { asyncHandler } from "../middlewares/async-handler";
import { createEvent, listEvents } from "../services/calendar.service";
import { ErrorResponse } from "../utils/error-response";

export const listCalendarEvents = asyncHandler(async (req, res, next) => {
  const { access_token, refresh_token, expiry_date } = req.query;

  if (!access_token || !refresh_token || !expiry_date) {
    return next(
      new ErrorResponse({
        message: "Access token, refresh token and expiry date are required",
        statusCode: 400,
      })
    );
  }

  const events = await listEvents({
    access_token: access_token as string,
    refresh_token: refresh_token as string,
    expiry_date: parseInt(expiry_date as string),
  });

  return res.respond({ data: { events }, statusCode: 200 });
});

export const createCalendarEvent = asyncHandler(async (req, res, next) => {
  const { access_token, refresh_token, expiry_date, event } = req.body;

  console.log(event);

  if (!access_token || !refresh_token || !expiry_date || !event) {
    return next(
      new ErrorResponse({
        message:
          "Access token, refresh token, event and expiry date are required",
        statusCode: 400,
      })
    );
  }

  const startDate = new Date(event.start.dateTime);
  const endDate = new Date(event.end.dateTime);

  if (endDate <= startDate) {
    return next(
      new ErrorResponse({
        message: "End date must be after start date",
        statusCode: 400,
      })
    );
  }

  const createdEvent = await createEvent({
    access_token: access_token,
    refresh_token: refresh_token,
    expiry_date: expiry_date,
    event: event,
  });

  return res.respond({ data: { createdEvent }, statusCode: 200 });
});
