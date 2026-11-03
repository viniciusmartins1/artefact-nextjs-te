import { randomUUID } from "crypto";
import { procedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import type { Task } from "../../types/task";

const tasks: Task[] = [];

export const taskRouter = router({
  getAll: procedure.query(() => {
    return tasks;
  }),
  getById: procedure.input(z.object({ id: z.string() })).query(({ input }) => {
    const task = tasks.find((task) => task.id === input.id);

    if (!task) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Tarefa não encontrada.",
      });
    }

    return task;
  }),
  create: procedure
    .input(
      z.object({
        titulo: z.string().trim().min(1, "O título é obrigatório."),
        descricao: z.string().optional(),
      }),
    )
    .mutation(({ input }) => {
      const newTask: Task = {
        id: randomUUID(),
        titulo: input.titulo,
        descricao: input.descricao,
        dataCriacao: new Date(),
      };

      tasks.push(newTask);

      return newTask;
    }),
  update: procedure
    .input(
      z.object({
        id: z.string(),
        titulo: z.string().trim().min(1, "O título é obrigatório."),
        descricao: z.string().optional(),
      }),
    )
    .mutation(({ input }) => {
      const taskIndex = tasks.findIndex((task) => task.id === input.id);

      if (taskIndex === -1) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tarefa não encontrada.",
        });
      }

      const updatedTask: Task = {
        ...tasks[taskIndex],
        titulo: input.titulo,
        descricao: input.descricao,
      };

      tasks[taskIndex] = updatedTask;

      return updatedTask;
    }),
  delete: procedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      const taskIndex = tasks.findIndex((task) => task.id === input.id);

      if (taskIndex === -1) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tarefa não encontrada.",
        });
      }

      tasks.splice(taskIndex, 1);

      return { success: true };
    }),
});
