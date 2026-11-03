import type { Task } from "@/types/task";

type TaskListProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
};

export default function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-gray-500">
        Nenhuma tarefa cadastrada.
      </p>
    );
  }

  return (
    <section className="divide-y divide-gray-200 flex flex-col gap-4">
      {tasks.map((task) => (
        <article
          key={task.id}
          className="flex items-center justify-between gap-4 py-4 px-4 rounded-2xl border border-gray-200"
        >
          <div className="min-w-0">
            <h2 className="font-medium text-gray-800">{task.titulo}</h2>

            {task.descricao && (
              <p className="mt-1 text-sm text-gray-500">{task.descricao}</p>
            )}

            <p className="mt-2 text-xs text-gray-400">
              Criada em:{" "}
              {new Date(task.dataCriacao).toLocaleDateString("pt-BR")}
            </p>

            <div className="mt-2 flex gap-3">
              <button
                onClick={() => onEdit(task)}
                className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                Editar
              </button>

              <button
                onClick={() => onDelete(task.id)}
                className="text-sm text-red-600 hover:text-red-800 cursor-pointer"
              >
                Excluir
              </button>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
