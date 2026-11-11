import { prisma } from "../prisma";

interface CreateTaskBody {
  titulo: string;
}

type UpdateTaskBody = Partial<CreateTaskBody>;

export class TaskService {
  async create(userId: string, data: CreateTaskBody) {
    const validatedData = createTaskSchema.parse(data);

    const task = await prisma.task.create({
      data: {
        ...validatedData,
        userId,
      },
    });

    return task;
  }

  async list(userId: string) {
    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    return tasks;
  }

  async findById(id: number, userId: string) {
    const task = await prisma.task.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!task) {
      throw new Error("Task não encontrada");
    }

    return task;
  }

  async update(id: number, userId: string, data: UpdateTaskBody) {
    await this.findById(id, userId);

    const validatedData = updateTaskSchema.parse(data);

    const updatedTask = await prisma.task.update({
      where: {
        id,
      },
      data: validatedData,
    });

    return updatedTask;
  }

  async delete(id: number, userId: string) {
    await this.findById(id, userId);

    await prisma.task.delete({
      where: {
        id,
      },
    });
  }
}


