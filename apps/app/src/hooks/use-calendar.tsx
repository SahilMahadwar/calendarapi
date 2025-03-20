import { axiosApiInstance } from "@/libs/axios-api-Instance";
import { queryClient } from "@/libs/react-query/query-client";
import {
  ApiResponse,
  CalendarEvent,
  CalendarEvents,
  GoogleTokenResponse,
} from "@/types/api-res";
import { CalendarEventInput } from "@/types/common";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "./use-auth";
import { useToast } from "./use-toast";

export const useCalendar = () => {
  const { getTokens } = useAuth();

  const { access_token, expiry_date, refresh_token } = getTokens();

  const { toast } = useToast();

  const getCalendarEvents = useQuery({
    queryFn: async () => {
      return axiosApiInstance.get<ApiResponse<CalendarEvents>>(
        `/calendar/events?access_token=${access_token}&refresh_token=${refresh_token}&expiry_date=${expiry_date}`
      );
    },

    queryKey: ["calendar"],
  });

  const createCalendarEvent = useMutation({
    mutationFn: async (event: CalendarEventInput) => {
      return axiosApiInstance.post<ApiResponse<CalendarEventInput>>(
        "/calendar/events",
        {
          access_token,
          refresh_token,
          expiry_date,
          event: event,
        }
      );
    },
    onSuccess: ({ data }) => {
      toast({
        title: "Scheduled: Catch up ",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });

      queryClient.invalidateQueries({
        queryKey: ["calendar"],
      });
    },
  });

  return { getCalendarEvents, createCalendarEvent };
};
