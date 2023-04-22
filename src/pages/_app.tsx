import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MeetingProvider } from "@/context/meetingContext";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MeetingProvider>
        <Component {...pageProps} />
      </MeetingProvider>
    </>
  );
}
