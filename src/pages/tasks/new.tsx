import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import TaskForm from "@/components/TaskForm";
import type { TaskFormData } from "@/components/TaskForm";

export default function NewTaskPage() {
  const router = useRouter();
  const utils = trpc.useUtils();

  const createTask = trpc.task.create.useMutation({
    onSuccess: async () => {
      await utils.task.getAll.invalidate();
      router.push("/");
    },
  });

  function handleSubmit(data: TaskFormData) {
    createTask.mutate(data);
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Nova tarefa</h1>

        <p className="mt-1 text-sm text-gray-500">
          Preencha as informações para cadastrar uma nova tarefa.
        </p>
      </header>

      {createTask.error && (
        <p className="mb-4 text-sm text-red-500">
          Erro ao criar tarefa: {createTask.error.message}
        </p>
      )}

      <TaskForm onSubmit={handleSubmit} isLoading={createTask.isPending} />

      <button
        type="button"
        onClick={() => router.push("/")}
        className="mt-4 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
      >
        Voltar para tarefas
      </button>
    </main>
  );
}
