import { Router } from "express";
import PecaServicoService from "../services/PecaServicoService";

const rotasPecasServico: Router = Router();

rotasPecasServico.get('/retornaPecasPorServico/:idServico',
    async (req, res, next) => {
        try {
            const idServico : number = Number(req.params.idServico);
            const pecas = await PecaServicoService.retornaPecasPorServico(idServico);
            res.status(200).json(pecas);
        } catch (error) {
            next(error);
        }
    }
);

rotasPecasServico.get('/retornaTodasPecasServico',
    async (req, res, next) => {
        try {
            const pecas = await PecaServicoService.retornaTodasPecasServico();
            res.status(200).json(pecas);
        } catch (error) {
            next(error);
        }
    }
);

export default rotasPecasServico;