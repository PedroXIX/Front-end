"use client"

import { useRouter } from "next/navigation";
import React, { useState } from 'react';

const TicketForm = () => {

  const handleChange = (e: { target: { value: any; name: any; }; }) => {
    const value = e.target.value
    const name = e.target.name
  
    setFormData((prevState) => ({
        ...prevState,
        [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("enviado");
  }
  
  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "não iniciado",
    category: "Hardware Problem"
  };

  const [formData, setFormData] = useState(startingTicketData);
  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>Crie Seu Ticket</h3>
        <label>Título</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />

        <label>Descrição</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows={5}
        />

        <label>Categoria</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Hardware Problem">Problema de Hardware</option>
          <option value="Software Problem">Problema de Software</option>
          <option value="Hydrometer Problem">Hidrômetro</option>
        </select>

        <label>Prioridade</label>
        <div>
          <input
            id="priority-1"
            name="priority"
            type="radio"
            value={1}
            onChange={handleChange}
            checked={formData.priority == 1}
          />
          <label>1</label>
          <input
            id="priority-2"
            name="priority"
            type="radio"
            value={2}
            onChange={handleChange}
            checked={formData.priority == 2}
          />
          <label>2</label>
          <input
            id="priority-3"
            name="priority"
            type="radio"
            value={3}
            onChange={handleChange}
            checked={formData.priority == 3}
          />
          <label>3</label>
          <input
            id="priority-4"
            name="priority"
            type="radio"
            value={4}
            onChange={handleChange}
            checked={formData.priority == 4}
          />
          <label>4</label>
          <input
            id="priority-5"
            name="priority"
            type="radio"
            value={5}
            onChange={handleChange}
            checked={formData.priority == 5}
          />
          <label>5</label>
        </div>
        <label>Progresso</label>
        <input
          type="range"
          id="progress"
          name="progress"
          min="0"
          max="100"
          value={formData.progress}
          onChange={handleChange}
        />
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="não iniciado">Não Iniciado</option>
          <option value="iniciado">Iniciado</option>
          <option value="solucionado">Solucionado</option>
        </select>
        <input type="submit" className="btn" value="Criar Ticket"/>
      </form>
    </div>
  );
}

export default TicketForm

