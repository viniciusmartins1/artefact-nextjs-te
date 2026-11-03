import { useState } from "react";
import type { Task } from "@/types/task";

export type TaskFormData = {
  titulo: string;
  descricao?: string;
};

type TaskFormProps = {
  initialData?: Task;
  onSubmit: (data: TaskFormData) => void;
  isLoading?: boolean;
};

export default function TaskForm({
  initialData,
  onSubmit,
  isLoading = false,
}: TaskFormProps) {
  const [titulo, setTitulo] = useState(initialData?.titulo ?? "");
  const [descricao, setDescricao] = useState(initialData?.descricao ?? "");

  function handleSubmit() {
    onSubmit({
      titulo: titulo.trim(),
      descricao: descricao.trim() || undefined,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-md border border-gray-200 p-4"
    >
      <div>
        <label
          htmlFor="title"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Título
        </label>

        <input
          id="title"
          type="text"
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
          required
          disabled={isLoading}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          placeholder="Digite o título da tarefa"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Descrição
        </label>

        <textarea
          id="description"
          rows={3}
          value={descricao}
          placeholder="Digite uma descrição (opcional)"
          disabled={isLoading}
          onChange={(event) => setDescricao(event.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading || !titulo.trim()}
          className="rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 cursor-pointer disabled:opacity-50"
        >
          {isLoading
            ? "Salvando..."
            : initialData
              ? "Atualizar tarefa"
              : "Criar tarefa"}
        </button>
      </div>
    </form>
  );
}
