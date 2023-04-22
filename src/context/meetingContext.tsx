import { createContext, useContext, useState, useEffect } from "react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";

import { getMeetings, createMeeting } from "../backend/backend";
import {
  IMeetingContextData,
  IMeetingProvider,
  IMeetingData,
  IOnAddMeeting,
} from "@/interfaces/meeting.interface";

const MeetingContext = createContext({} as IMeetingContextData);

export function MeetingProvider({ children }: IMeetingProvider) {
  const [meetings, setMeeting] = useState<IMeetingData[]>([]);
  const [loading, setLoading] = useState(false);
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  let selectedDayMeetings = meetings.filter((meeting) =>
    isSameDay(parseISO(meeting.inicio), selectedDay)
  );
  useEffect(() => {
    setLoading(true);
    getMeetings({
      primeiroDiaMes: firstDayCurrentMonth,
      ultimoDiaMes: endOfMonth(firstDayCurrentMonth),
    })
      .then((value) => (setMeeting(value), setLoading(false)))
      .catch(()=>setLoading(false));
  }, [currentMonth, firstDayCurrentMonth]);

  function onAddMeeting(data: IOnAddMeeting) {
    createMeeting(data);

    setMeeting((state) => [...state, data]);
  }

  return (
    <MeetingContext.Provider
      value={{
        meetings,
        onAddMeeting,
        selectedDayMeetings,
        previousMonth,
        nextMonth,
        firstDayCurrentMonth,
        selectedDay,
        setSelectedDay,
        loading,
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
}

export const useMeeting = () => useContext(MeetingContext);
