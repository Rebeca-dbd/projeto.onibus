import { prisma } from "../prisma";

class PaginaService {
  async criar(
    dados: { titulo: string; conteudo: string; categoriaId?: string },
    usuarioId: string
  ) {
    return prisma.pagina.create({
      data: { ...dados, autorId: usuarioId },
    });
  }
}

export default new PaginaService();
