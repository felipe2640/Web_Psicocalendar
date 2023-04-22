import { Dialog, Transition } from "@headlessui/react";
import { FormEvent, Fragment, useState } from "react";
import { Icon } from "@iconify/react";
import { areIntervalsOverlapping, format, add } from "date-fns";
import { ptBR } from "date-fns/locale";

import { useMeeting } from "@/context/meetingContext";
import { Buttons } from "./Button";
import { TextInput } from "./TextInput";
import { IOnAddMeeting } from "@/interfaces/meeting.interface";

export default function FormMeeting() {
  let [isOpen, setIsOpen] = useState(false);
  const inicialData: IOnAddMeeting = {
    email: "",
    nome: "",
    telefone: "",
    inicio: "",
    fim: "",
  };
  let [data, setData] = useState<IOnAddMeeting>(inicialData);
  const [loading, setLoading] = useState(false);
  const [sucess, setSucess] = useState(false);
  const { onAddMeeting, selectedDay, meetings } = useMeeting();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    data = {
      ...data,
      inicio: new Date(
        `${format(selectedDay, "yyyy-MM-dd")}T${data.inicio}`
      ).toISOString(),
      fim: add(
        new Date(`${format(selectedDay, "yyyy-MM-dd")}T${data.inicio}`),
        { minutes: 60 }
      ).toISOString(),
    };
    console.log(data);

    try {
      const dateInArray = meetings.some((meeting: any) =>
        areIntervalsOverlapping(
          { start: new Date(meeting.inicio), end: new Date(meeting.fim) },
          { start: new Date(data.inicio), end: new Date(data.fim) }
        )
      );
      console.log(dateInArray);
      if (dateInArray) {
        console.log("Já tem agendamento");
        closeModal();
        setData(inicialData);
      }
      await onAddMeeting(data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
      >
        <span className="sr-only">Nova marcação</span>
        <Icon
          icon="ic:baseline-plus"
          className="w-6 h-6"
          color="black"
          aria-hidden="true"
        />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Agendamento para{" "}
                    <time
                      dateTime={format(selectedDay, "yyyy-MM-dd", {
                        locale: ptBR,
                      })}
                    >
                      {format(selectedDay, "dd MMMM 'de' yyy", {
                        locale: ptBR,
                      })}
                    </time>
                  </Dialog.Title>
                  <form
                    className="max-w-xl lg:max-w-lg"
                    id="Consultoria"
                    onSubmit={submit}
                  >
                    <div className="mt-6 flex flex-col max-w-md ">
                      <label htmlFor="Nome" className="">
                        <TextInput.Root className="">
                          <TextInput.Input
                            placeholder={`Digite a Nome`}
                            value={data.nome}
                            required
                            onChange={(evt: any) =>
                              setData({ ...data, nome: evt.target.value })
                            }
                          />
                        </TextInput.Root>
                      </label>
                      <label htmlFor="Email" className="">
                        <TextInput.Root className="">
                          <TextInput.Input
                            placeholder={`Digite seu E-mail`}
                            value={data.inicio}
                            type="time"
                            required
                            onChange={(evt: any) =>
                              setData({ ...data, inicio: evt.target.value })
                            }
                          />
                        </TextInput.Root>
                      </label>
                      <label htmlFor="Email" className="">
                        <TextInput.Root className="">
                          <TextInput.Input
                            placeholder={`Digite seu E-mail`}
                            value={data.email}
                            type="email"
                            required
                            onChange={(evt: any) =>
                              setData({ ...data, email: evt.target.value })
                            }
                          />
                        </TextInput.Root>
                      </label>

                      <label
                        htmlFor="Telefone"
                        className="flex max-w-md gap-x-4"
                      >
                        <TextInput.Root className="">
                          <TextInput.Input
                            placeholder={`Digite seu telefone`}
                            value={data.telefone}
                            required
                            onChange={(evt: any) =>
                              setData({ ...data, telefone: evt.target.value })
                            }
                          />
                        </TextInput.Root>
                      </label>
                    </div>

                    <Buttons.Submit>
                      {loading ? (
                        <>
                          <Buttons.Icon
                            icon="icomoon-free:spinner2"
                            className="animate-spin h-5 w-5 mx-2 cursor-progress"
                            color="white"
                          />
                          <Buttons.Text text="Processando..." />
                        </>
                      ) : (
                        <>
                          <Buttons.Text text="Agendar" />
                          <Buttons.Icon
                            icon="ic:round-arrow-right-alt"
                            className=" h-8 w-8 "
                            color="black"
                          />
                        </>
                      )}
                    </Buttons.Submit>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
