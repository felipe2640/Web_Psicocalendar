import React from "react";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parseISO,
} from "date-fns";
import { Icon } from "@iconify/react";
import { useMeeting } from "@/context/meetingContext";
import { ptBR } from "date-fns/locale";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Calendar() {
  const {
    meetings,
    selectedDay,
    previousMonth,
    nextMonth,
    firstDayCurrentMonth,
    setSelectedDay,
    loading,
  } = useMeeting();

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  return (
    <>
      <div className="md:pr-14">
        <div className="flex items-center">
          <h2 className="flex-auto font-semibold text-gray-900 capitalize">
            {format(firstDayCurrentMonth, "MMMM yyyy", { locale: ptBR })}
          </h2>
          {loading ? (
            <Icon
              icon="icomoon-free:spinner8"
              className="animate-spin h-5 w-5 mr-3"
            />
          ) : (
            ""
          )}

          <button
            type="button"
            onClick={previousMonth}
            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Mês anterior</span>
            <Icon
              icon="ic:twotone-chevron-left"
              className="w-5 h-5"
              aria-hidden="true"
            />
          </button>
          <button
            onClick={nextMonth}
            type="button"
            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Proximo mês</span>
            <Icon
              icon="ic:twotone-chevron-right"
              className="w-5 h-5"
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
          <div>D</div>
          <div>S</div>
          <div>T</div>
          <div>Q</div>
          <div>Q</div>
          <div>S</div>
          <div>S</div>
        </div>
        <div className="grid grid-cols-7 mt-2 text-sm">
          {days.map((day, dayIdx) => (
            <div
              key={day.toString()}
              className={classNames(
                dayIdx === 0 && colStartClasses[getDay(day)],
                "py-1.5"
              )}
            >
              <button
                type="button"
                onClick={() => setSelectedDay(day)}
                className={classNames(
                  isEqual(day, selectedDay) && "text-white",
                  !isEqual(day, selectedDay) && isToday(day) && "text-red-500",
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    isSameMonth(day, firstDayCurrentMonth) &&
                    "text-gray-900",
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    !isSameMonth(day, firstDayCurrentMonth) &&
                    "text-gray-400",
                  isEqual(day, selectedDay) && isToday(day) && "bg-red-500",
                  isEqual(day, selectedDay) && !isToday(day) && "bg-gray-900",
                  !isEqual(day, selectedDay) && "hover:bg-gray-200",
                  (isEqual(day, selectedDay) || isToday(day)) &&
                    "font-semibold",
                  "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                )}
              >
                <time dateTime={format(day, "yyyy-MM-dd")}>
                  {format(day, "d", { locale: ptBR })}
                </time>
              </button>

              <div className="w-1 h-1 mx-auto mt-1">
                {meetings.some((meeting) =>
                  isSameDay(parseISO(meeting.inicio), day)
                ) && <div className="w-1 h-1 rounded-full bg-sky-500"></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
