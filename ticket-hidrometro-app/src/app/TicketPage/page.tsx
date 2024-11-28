"use client";

import React, { useState, useEffect } from "react";
import TicketCard from "../components/TicketCard";
import { Ticket, TicketService } from "../service/TicketService";
import axios from "axios";

const Page = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // Função para ordenar os tickets, colocando os abertos primeiro
  const sortTickets = (tickets: Ticket[]) => {
    return tickets.sort((a, b) => {
      if (a.status === b.status) return 0;
      return a.status ? 1 : -1; // 'false' (aberto) vem antes de 'true' (fechado)
    });
  };

  // Fetch dos tickets
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await TicketService.getTickets();
        console.log("Response: ", response.data);
        const sortedTickets = sortTickets(response.data); // Ordena os tickets
        setTickets(sortedTickets); // Atualiza o estado com os tickets ordenados
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("Erro de Axios:", error.message);
        } else {
          console.error("Erro ao buscar os tickets:", error);
        }
      }
    };

    fetchTickets();
  }, []);

  // Função de exclusão do ticket
  const handleDelete = async (id: number) => {
    try {
      // Fazendo a exclusão no backend
      await TicketService.deleteTicket(id);
      
      // Após excluir, refazer a busca dos tickets para garantir que a lista está atualizada
      const response = await TicketService.getTickets();
      const sortedTickets = sortTickets(response.data); // Ordena novamente
      setTickets(sortedTickets); // Atualiza o estado com a nova lista de tickets
      alert("Ticket removido com sucesso!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Erro ao excluir ticket:", error.message);
      } else {
        console.error("Erro desconhecido:", error);
      }
    }
  };

  return (
    <div className="p-5">
      <div className="lg:grid grid-cols-2 xl:grid-cols-4 gap-4 bg-img">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            id={ticket.id} // Identificador único
            titulo={ticket.titulo}
            status={ticket.status}
            categoria={ticket.categoria}
            prioridade={ticket.prioridade}
            descricao={ticket.descricao}
            dataCriacao={ticket.dataCriacao}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
