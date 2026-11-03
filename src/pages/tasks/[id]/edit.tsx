import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import TaskForm from "@/components/TaskForm";
import type { TaskFormData } from "@/components/TaskForm";
import { ClipLoader } from "react-spinners";

export default function EditTaskPage() {
  const router = useRouter();
  const { id } = router.query;

  const utils = trpc.useUtils();

  const task = trpc.task.getById.useQuery(
    { id: typeof id === "string" ? id : "" },
    {
      enabled: typeof id === "string",
      retry: false,
    },
  );

  const updateTask = trpc.task.update.useMutation({
    onSuccess: async () => {
      await utils.task.getAll.invalidate();
      router.push("/");
    },
  });

  function handleSubmit(data: TaskFormData) {
    if (typeof id !== "string") return;

    updateTask.mutate({
      id,
      ...data,
    });
  }

  if (!router.isReady || task.isLoading) {
    <div className="flex justify-center py-10">
      <ClipLoader color={"#000"} size={150} aria-label="Loading" />
    </div>;
  }

  if (task.error) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <p className="text-red-500">
          Não foi possível carregar a tarefa: {task.error.message}
        </p>

        <button
          onClick={() => router.push("/")}
          className="mt-4 text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
        >
          Voltar para tarefas
        </button>
      </main>
    );
  }

  if (!task.data) return null;

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Editar tarefa</h1>

        <p className="mt-1 text-sm text-gray-500">
          Atualize as informações da tarefa.
        </p>
      </header>

      {updateTask.error && (
        <p className="mb-4 text-sm text-red-500">
          Erro ao atualizar tarefa: {updateTask.error.message}
        </p>
      )}

      <TaskForm
        initialData={{
          ...task.data,
          dataCriacao: new Date(task.data.dataCriacao),
        }}
        onSubmit={handleSubmit}
        isLoading={updateTask.isPending}
      />

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
