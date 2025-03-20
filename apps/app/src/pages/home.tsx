import { CreateEventDialog } from "@/components/create-event-dialog";
import { EventSkeleton } from "@/components/event-skeleton";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { useCalendar } from "@/hooks/use-calendar";
import { format } from "date-fns";
import { CalendarIcon, ClockIcon, Map, MapIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const { removeTokens } = useAuth();
  const { getCalendarEvents } = useCalendar();
  const { isLoading, data, isError } = getCalendarEvents;
  const navigate = useNavigate();

  if (isLoading) {
    return <EventSkeleton />;
  }

  if (isError) {
    removeTokens();
    navigate("/auth/login");
    return null;
  }

  if (data) {
    const { events } = data.data.data;

    return (
      <div className="max-w-[1100px] mx-auto p-6">
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-semibold">Calendar Events</h1>
        </div>
        <div className="mb-8 flex justify-center">
          <CreateEventDialog />
        </div>

        <div className="flex flex-col gap-4">
          {events.map((event) => (
            <Card
              key={event.id}
              className="p-4 transition-shadow hover:shadow-md"
            >
              <h2 className="text-xl font-medium text-primary">
                {event.summary}
              </h2>

              {event.description && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {event.description}
                </p>
              )}

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon className="h-4 w-4" />
                  <span>
                    {format(new Date(event.start.dateTime), "MMM d, yyyy")}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <ClockIcon className="h-4 w-4" />
                  <span>
                    {format(new Date(event.start.dateTime), "h:mm a")} -{" "}
                    {format(new Date(event.end.dateTime), "h:mm a")}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Map className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return <EventSkeleton />;
};
