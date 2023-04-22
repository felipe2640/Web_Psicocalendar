import React, { useState } from "react";
import { format } from "date-fns";
import CardMeeting from "./CardMeeting";
import { useMeeting } from "@/context/meetingContext";
import { ptBR } from "date-fns/locale";

import FormMeeting from "./FormMeeting";

type Props = {};

export default function ListaMeeting({}: Props) {
  const { selectedDay, selectedDayMeetings } = useMeeting();
  
  return (
    <section className="mt-12 md:mt-0 md:pl-14">
      <div className="flex items-center">
        <h2 className="font-semibold text-gray-900">
          Agendamentos para{" "}
          <time dateTime={format(selectedDay, "yyyy-MM-dd", { locale: ptBR })}>
            {format(selectedDay, "dd MMMM 'de' yyy", { locale: ptBR })}
          </time>
        </h2>
        <FormMeeting/>
      </div>
      <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
        {selectedDayMeetings.length > 0 ? (
          selectedDayMeetings.map((meeting: any) => (
            <CardMeeting meeting={meeting} key={meeting.id} />
          ))
        ) : (
          <p>Nenhum agendamento para hoje</p>
        )}
      </ol>
    </section>
  );
}
