import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { appRouter } from "@/server/routers/_app";
import TaskList from "@/components/TaskList";

import { ClipLoader } from "react-spinners";

import type { Task } from "@/types/task";
import type { GetServerSideProps } from "next";

type TaskPageData = Omit<Task, "dataCriacao"> & {
  dataCriacao: string;
};

type HomeProps = {
  initialTasks: TaskPageData[];
};

export default function Home({ initialTasks }: HomeProps) {
  const router = useRouter();
  const utils = trpc.useUtils();

  const tasks = trpc.task.getAll.useQuery(undefined, {
    initialData: initialTasks,
  });

  const deleteTask = trpc.task.delete.useMutation({
    onSuccess: () => {
      utils.task.getAll.invalidate();
    },
  });

  function handleEditTask(task: Task) {
    router.push(`/tasks/${task.id}/edit`);
  }

  function handleDeleteTask(id: string) {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir esta tarefa?",
    );

    if (confirmed) {
      deleteTask.mutate({ id });
    }
  }

  if (tasks.isLoading) {
    return (
      <div className="flex justify-center py-10">
        <ClipLoader color={"#000"} size={150} aria-label="Loading" />
      </div>
    );
  }

  if (tasks.error) {
    return <p className="p-6 text-red-500">Erro ao carregar tarefas.</p>;
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Minhas tarefas</h1>

        <button
          onClick={() => router.push("/tasks/new")}
          className="rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 cursor-pointer"
        >
          Nova tarefa
        </button>
      </header>

      {deleteTask.error && (
        <p className="mb-4 text-sm text-red-500">
          Erro ao excluir tarefa: {deleteTask.error.message}
        </p>
      )}

      <TaskList
        tasks={tasks.data.map((task) => ({
          ...task,
          dataCriacao: new Date(task.dataCriacao),
        }))}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const caller = appRouter.createCaller({});
  const tasks = await caller.task.getAll();

  return {
    props: {
      initialTasks: tasks.map((task) => ({
        ...task,
        dataCriacao: task.dataCriacao.toISOString(),
      })),
    },
  };
};
