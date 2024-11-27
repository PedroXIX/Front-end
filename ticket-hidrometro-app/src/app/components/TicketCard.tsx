import { useState } from "react";
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
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal
  const [formData, setFormData] = useState({
    titulo,
    descricao,
    prioridade,
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      // Simulação de uma chamada para a API para atualizar o ticket
      console.log("Atualizando ticket com os dados:", formData);
      closeModal();
    } catch (error) {
      console.error("Erro ao atualizar o ticket:", error);
    }
  };

  return (
    <>
      <div
        className="flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2"
        onDoubleClick={openModal}
      >
        <div className="flex mb-3">
          <PriorityDisplay prioridade={prioridade} />
          <div className="ml-auto">
            <DeleteBlock />
          </div>
        </div>
        <h4>{titulo}</h4>
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-page rounded-md shadow-lg p-6 w-full max-w-md">
            <div className="flex mr-auto mb-3">
              <DeleteBlock />
            </div>
            <h2 className="text-lg font-bold mb-3">Editar Ticket</h2>
            <div className="form-control">
              <label className="label">Título</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">Descrição</label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                className="textarea textarea-bordered"
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">Prioridade</label>
              <input
                type="number"
                name="prioridade"
                value={formData.prioridade}
                onChange={handleChange}
                className="input input-bordered"
              />
            </div>
            <div className="form-control justify-end gap-2 p-1">
              {/* <div className="flex justify-end gap-2 p-3"> */}
              <button className="btn btn-primary" onClick={handleUpdate}>
                Salvar
              </button>
              <button className="btn btn-secondary" onClick={closeModal}>
                Cancelar
              </button>
              {/* </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TicketCard;
