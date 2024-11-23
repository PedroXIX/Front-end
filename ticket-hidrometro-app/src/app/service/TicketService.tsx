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
}
