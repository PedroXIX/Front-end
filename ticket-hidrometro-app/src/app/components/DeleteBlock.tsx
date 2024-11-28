import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { TicketService } from "../service/TicketService";
import axios from "axios";

interface DeleteBlockProps {
  id: number; 
  onDelete: (id: number) => void;
}

const DeleteBlock: React.FC<DeleteBlockProps> = ({ id}) => {
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await TicketService.deleteTicket(id);
      console.log("Ticket deletado:", response.data);
      alert("Ticket removido com sucesso!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Erro ao criar ticket:", error.response?.data);
      } else {
        console.error("Erro desconhecido:", error);
      }
    }
  };

  return (
    <button onClick={handleDelete}>
      <FontAwesomeIcon
        icon={faX}
        className="text-red-400 hover:cursor-pointer hover:text-red-200"
      />
    </button>
  );
};

export default DeleteBlock;
