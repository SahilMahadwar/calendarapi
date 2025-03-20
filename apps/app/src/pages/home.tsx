import { CreateEventDialog } from "@/components/create-event-dialog";
import { useAuth } from "@/hooks/use-auth";
import { useCalendar } from "@/hooks/use-calendar";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const { removeTokens } = useAuth();
  const { getCalendarEvents } = useCalendar();

  const { isLoading, data, isError, isSuccess } = getCalendarEvents;

  const navigate = useNavigate();

  if (isLoading) {
    <div>Loading...</div>;
  }

  if (isError) {
    removeTokens();
    navigate("/auth/login");
  }

  if (data) {
    const { events } = data.data.data;

    return (
      <div>
        <CreateEventDialog />
        {events.map((event) => (
          <div key={event.id}>
            <h1>{event.summary}</h1>
            <h1>{event.created}</h1>
            <h1>{event.description}</h1>
            <h1>{event.end.dateTime}</h1>
            <h1>{event.end.timeZone}</h1>
            <h1>{event.start.dateTime}</h1>
            <h1>{event.start.timeZone}</h1>
          </div>
        ))}
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </div>
    );
  }

  return <div>Loading...</div>;
};
