import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});


export interface Ticket {
  id: string;
  descricao: string;
}

export class TicketService {
  static async getTickets() {
    return await axiosInstance.get('/tickets');
  }

  static async postTicket(data: {title: FormDataEntryValue | null, description: FormDataEntryValue | null, priority: FormDataEntryValue | null, progress: FormDataEntryValue | null, status: FormDataEntryValue | null, category: FormDataEntryValue | null}) {
    return await axiosInstance.post('/tickets', JSON.stringify(data));
  }
}
