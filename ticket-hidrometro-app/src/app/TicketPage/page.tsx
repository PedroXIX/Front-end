"use client";

import React, { useState, useEffect } from "react";
import TicketCard from "../components/TicketCard";
import { Ticket, TicketService } from "../service/TicketService";
import axios from "axios";

const Page = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  // Fetch dos tickets
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await TicketService.getTickets();
        console.log("Response: ", response.data); // Chamada ao serviço
        setTickets(response.data); // Assume que o retorno é um array de tickets
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("Erro de Axios:", error.message);
          console.log("Dados da resposta:", error.response?.data);
        } else {
          console.error("Erro ao buscar os tickets:", error);
        }
      }
    };

    fetchTickets();
  }, []);

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
            dataCriacao={ticket.dataCriacao}// Propriedade personalizada // Outra propriedade
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
