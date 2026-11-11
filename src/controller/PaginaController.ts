import { Request, Response } from "express";
import PaginaService from "../service/PaginaService";

class PaginaController {
  async criar(req: Request, res: Response) {
    try {
      const { titulo, conteudo, categoriaId } = req.body;
      const pagina = await PaginaService.criar(
        { titulo, conteudo, categoriaId },
        (req as any).usuario.id
      );
      return res.status(201).json(pagina);
    } catch (erro: any) {
      return res.status(erro.status || 500).json({ erro: erro.message });
    }
  }
}

export default new PaginaController();

