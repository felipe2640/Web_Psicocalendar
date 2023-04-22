import { IMeetingData, IOnAddMeeting } from "../interfaces/meeting.interface";

export const configBackend = process.env.NEXT_PUBLIC_DB_HOST;

export function getMeetings(date: any): Promise<IMeetingData[]> {
  return fetch(`${configBackend}/calendar`, {
    credentials: "include",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(date),
  })
    .then(handleResponse)
    .then((response) => response.items);
}

export function createMeeting(data: IOnAddMeeting): Promise<IMeetingData> {
  return fetch(`${configBackend}/calendar`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .then((response) => response[0]);
}

function handleResponse(resp: Response) {
  if (resp.ok) {
    return resp.json();
  } else {
    throw resp.statusText;
  }
}
