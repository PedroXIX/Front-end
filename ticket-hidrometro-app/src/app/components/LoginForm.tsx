"use client";

import { useState } from "react";
import { LoginService } from "../service/LoginService";
import axios from "axios";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      senha: formData.get("senha"),
    };
    console.log("Data: ", data);

    try {
      const response = await LoginService.login(data);
      console.log("Response: ", response.data);
      // Redireciona para a página de tickets
      window.location.href = "/TicketPage";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Erro de Axios:", error.message);
        console.log("Dados da resposta:", error.response?.data);
        setError(error.response?.data?.message);
      } else {
        console.error("Erro desconhecido:", error);
        setError("Erro desconhecido ao fazer login.");
      }
    }
  }

  return (
    <form
      onSubmit={login}
      className="bg-white p-12 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-2"
    >
      <h2 className="font-bold text-xl text-blue-700 mb-3">Faça seu Login</h2>
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="input input-primary w-full"
      />
      <input
        name="senha"
        type="password"
        placeholder="Senha"
        className="input input-primary w-full"
      />
      <button className="btn btn-primary w-full">Login</button>
      {error && <div className="text-red-500 mt-3">{error}</div>}
    </form>
  );
}
