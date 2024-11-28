import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://back-end-9wcx.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Ticket {
  id: number;
  titulo: string;
  status: boolean;
  categoria: string;
  prioridade: number;
  descricao: string;
  clienteId: number;
  funcionarioId: number;
  dataCriacao: string;
  onDelete?: (id: number) => void;
}

export class TicketService {
  static async getTickets() {
    return await axiosInstance.get('/tickets');
  }

  static async postTicket(data: {titulo: FormDataEntryValue | null, descricao: FormDataEntryValue | null, 
    prioridade: number, status: boolean, categoria: FormDataEntryValue | null}) {
    return await axiosInstance.post('/tickets', JSON.stringify(data));
  }

  static async updateTicket({
    id,
    ...dataWithoutId
  }: {
    id: number;
    titulo: FormDataEntryValue | null;
    descricao: FormDataEntryValue | null;
    status: boolean;
  }) {
    return await axiosInstance.patch(`/tickets/${id}`, JSON.stringify(dataWithoutId));
  }

  static async deleteTicket(id:number) {
    return await axiosInstance.delete(`/tickets/${id}`);
  }
}
