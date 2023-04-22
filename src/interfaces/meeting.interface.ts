import { ReactNode } from "react";

export interface IMeetingProvider {
  children: ReactNode;
}

export interface IMeetingData {
  id?: number;
  inicio: string;
  fim: string;
}

export interface IOnAddMeeting extends IMeetingData {
  nome: any;
  telefone: string;
  email: string;
}

export interface IMeetingContextData {
  meetings: IMeetingData[];
  previousMonth: () => void;
  nextMonth: () => void;
  firstDayCurrentMonth: any;
  selectedDay: any;
  setSelectedDay: any;
  selectedDayMeetings: any;
  loading: any;
  onAddMeeting: ({ nome, telefone, email, inicio, fim }: IOnAddMeeting) => void;
}

// export interface IMeetingsIndex extends IMeetingData {
//   onDeleteMeeting: (id: number) => void;
// }
