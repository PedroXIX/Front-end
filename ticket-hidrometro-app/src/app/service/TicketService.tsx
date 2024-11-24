import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});


export interface Ticket {
  id: number;
  titulo: string;
  status: string;
  categoria: string;
  prioridade: number;
  descricao: string;
  clienteId: number;
  funcionarioId: number;
  dataCriacao: string;
}

export class TicketService {
  static async getTickets() {
    return await axiosInstance.get('/tickets');
  }

  static async postTicket(data: {titulo: FormDataEntryValue | null, descricao: FormDataEntryValue | null, 
    prioridade: number, status: FormDataEntryValue | null, categoria: FormDataEntryValue | null}) {
    return await axiosInstance.post('/tickets', JSON.stringify(data));
  }
}
