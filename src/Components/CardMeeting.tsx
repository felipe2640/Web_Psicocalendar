import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Fragment } from "react";

function CardMeeting(meeting: any) {
  let startDateTime = parseISO(meeting.inicio);
  let endDateTime = parseISO(meeting.fim);

  return (
    <>
      <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
        <img
          src={
            "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          }
          alt=""
          className="flex-none w-10 h-10 rounded-full"
        />
        <div className="flex-auto">
          <p className="text-gray-900">Paciente</p>
          <p className="mt-0.5">
            <time dateTime={meeting.inicio}>
              {format(startDateTime, "h:mm a", { locale: ptBR })}
            </time>{" "}
            -{" "}
            <time dateTime={meeting.fim}>{format(endDateTime, "h:mm a")}</time>
          </p>
        </div>
      </li>
    </>
  );
}

export default CardMeeting;
