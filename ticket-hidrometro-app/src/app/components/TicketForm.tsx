"use client";

import React, { useState } from "react";
import axios from "axios";
import { TicketService } from "../service/TicketService";

const TicketForm = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    prioridade: 1,
    status: false,
    categoria: "Hardware Problem",
    clienteId: 1,
    funcionarioId: 1
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "status" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await TicketService.postTicket(formData);
      console.log("Ticket criado:", response.data);
      alert("Ticket criado com sucesso!");
      // Opcional: redirecionar ou resetar o formulário
      setFormData({
        titulo: "",
        descricao: "",
        prioridade: 1,
        status: false,
        categoria: "Hardware Problem",
        clienteId:1,
        funcionarioId:1
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Erro ao criar ticket:", error.response?.data);
        setError(error.response?.data?.message || "Erro desconhecido.");
      } else {
        console.error("Erro desconhecido:", error);
        setError("Erro desconhecido ao criar ticket.");
      }
    }
  };

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>Crie Seu Ticket</h3>
        {error && <div className="text-red-500 mb-3">{error}</div>}
        <label>Título</label>
        <input
          id="titulo"
          name="titulo"
          type="text"
          onChange={handleChange}
          required
          value={formData.titulo}
        />

        <label>Status</label>
        <select name="status"  value={formData.status.toString()} onChange={handleChange}>
          <option value="false">Aberto</option>
          <option value="true">Solucionado</option>
        </select>

        <label>Categoria</label>
        <select
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
        >
          <option value="Hardware Problem">Problema de Hardware</option>
          <option value="Software Problem">Problema de Software</option>
          <option value="Hydrometer Problem">Hidrômetro</option>
        </select>

        <label>Descrição</label>
        <textarea
          id="descricao"
          name="descricao"
          onChange={handleChange}
          required
          value={formData.descricao}
          rows={5}
        />

        <label>Prioridade</label>
        <div>
          <input
            id="prioridade-1"
            name="prioridade"
            type="radio"
            value={1}
            onChange={handleChange}
            checked={formData.prioridade == 1}
          />
          <label>1</label>
          <input
            id="prioridade-2"
            name="prioridade"
            type="radio"
            value={2}
            onChange={handleChange}
            checked={formData.prioridade == 2}
          />
          <label>2</label>
          <input
            id="prioridade-3"
            name="prioridade"
            type="radio"
            value={3}
            onChange={handleChange}
            checked={formData.prioridade == 3}
          />
          <label>3</label>
          <input
            id="prioridade-4"
            name="prioridade"
            type="radio"
            value={4}
            onChange={handleChange}
            checked={formData.prioridade == 4}
          />
          <label>4</label>
          <input
            id="prioridade-5"
            name="prioridade"
            type="radio"
            value={5}
            onChange={handleChange}
            checked={formData.prioridade == 5}
          />
          <label>5</label>
        </div>

        <label>Identificador cliente</label>
        <input
          id="clientId"
          name="clientId"
          type="text"
          onChange={handleChange}
          required
          value={formData.clienteId}
        />

<label>Identificador funcionário</label>
        <input
          id="funcionarioId"
          name="funcionarioId"
          type="text"
          onChange={handleChange}
          required
          value={formData.funcionarioId}
        />

        <button type="submit" className="btn">
          Criar Ticket
        </button>
      </form>
    </div>
  );
};

export default TicketForm;
