"use client";

import React, { useState, useEffect, useCallback } from "react";
import TicketCard from "../components/TicketCard";
import { Ticket, TicketService } from "../service/TicketService";
import axios from "axios";

const Page = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isPolling] = useState(true); // Estado para controlar o polling

  // Função para ordenar os tickets
  const sortTickets = useCallback((tickets: Ticket[]) => {
    return tickets.sort((a, b) => {
      if (a.status === b.status) return 0;
      return a.status ? 1 : -1; // 'false' (aberto) vem antes de 'true' (fechado)
    });
  }, []);

  // Função memoizada para buscar tickets
  const fetchTickets = useCallback(async () => {
    try {
      const response = await TicketService.getTickets();
      const sortedTickets = sortTickets(response.data); // Ordena os tickets
      setTickets(sortedTickets); // Atualiza o estado com os tickets ordenados
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Erro de Axios:", error.message);
      } else {
        console.error("Erro ao buscar os tickets:", error);
      }
    }
  }, [sortTickets]); // Inclui dependência de `sortTickets`

  // Implementação do Long Polling
  useEffect(() => {
    if (!isPolling) return;

    let pollingTimeout: NodeJS.Timeout;

    const startPolling = async () => {
      await fetchTickets(); // Busca os dados do servidor
      pollingTimeout = setTimeout(startPolling, 1000); // Requisita novamente após 1 segundo
    };

    startPolling();

    return () => clearTimeout(pollingTimeout); // Limpa o polling ao desmontar o componente
  }, [isPolling, fetchTickets]); // Inclui `fetchTickets` e `isPolling` como dependências

  // Função para excluir um ticket
  const handleDelete = async (id: number) => {
    try {
      await TicketService.deleteTicket(id); // Remove no backend
      await fetchTickets(); // Atualiza a lista imediatamente após exclusão
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
            id={ticket.id}
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