import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://back-end-9wcx.onrender.com/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

export class LoginService {
  static async login(data: { email: FormDataEntryValue | null; senha: FormDataEntryValue | null; }) {
    return await axiosInstance.post('/login', JSON.stringify(data));
  }
}
