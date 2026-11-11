import { z } from "zod";

export const createTaskSchema = z.object({
  titulo: z.string().min(1, "Informe o título"),
});

export const updateTaskSchema = createTaskSchema.partial();

export type CreateTaskBody = z.infer<typeof createTaskSchema>;
export type UpdateTaskBody = z.infer<typeof updateTaskSchema>;