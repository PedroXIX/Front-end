import { Ticket } from "../service/TicketService";
import DeleteBlock from "./DeleteBlock";
import PriorityDisplay from "./PriorityDisplay";
import StatusDisplay from "./StatusDisplay";

// Função para converter a data para o fuso horário brasileiro (GMT-3)
const convertToBrazilTime = (dateString: string) => {
  const date = new Date(dateString);

  // Ajusta o horário para o fuso horário de São Paulo (UTC-3)
  const spTime = new Date(date.getTime() - 3 * 60 * 60 * 1000); // Subtrai 3 horas (fuso horário de São Paulo)

  return spTime.toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo", // Define o fuso horário de São Paulo (Brasil)
    hour12: false, // Exibe no formato de 24 horas
  });
};

const TicketCard: React.FC<
  Pick<
    Ticket,
    | "id"
    | "titulo"
    | "status"
    | "categoria"
    | "prioridade"
    | "descricao"
    | "dataCriacao"
  >
> = ({ id, titulo, status, categoria, prioridade, descricao, dataCriacao }) => {
  const brasilTime = convertToBrazilTime(dataCriacao);

  return (
    <div className="flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2">
      <div className="flex mb-3">
        <PriorityDisplay prioridade={prioridade} />
        <div className="ml-auto">
          <DeleteBlock />
        </div>
      </div>
      <h4> {titulo}</h4>
      <hr className="h-px border-0 bg-page mb-2" />
      <p className="whitespace-pre-wrap">{descricao}</p>
      <div className="flex-grow"></div>
      <div className="flex mt-2">
        <div className="flex flex-col">
          <p className="text-xs my-1">{brasilTime}</p>
        </div>
        <div className="ml-auto flex items-end">
          <StatusDisplay status={status} />
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
