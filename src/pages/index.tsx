import Calendar from "@/Components/Calendar";
import ListaMeeting from "@/Components/ListaMeeting";

export default function Home() {
  return (
    <div className="pt-16">
      <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <Calendar />
          <ListaMeeting />
        </div>
      </div>
    </div>
  );
}
