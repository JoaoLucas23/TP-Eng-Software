import { Router } from "express";
import PecaService from "../services/PecaService";

const rotasPeca: Router = Router();

rotasPeca.post('/criaPeca',
    async (req, res, next) => {
        try {
            await PecaService.criaPeca(req.body);
            res.status(204)
        } catch (error) {
            next(error);
        }
    }
);

rotasPeca.put('/editaPeca/:idPeca', 
    async (req, res, next) => {
        try {
            const idPeca : number = Number(req.params.idPeca);
            await PecaService.editaPeca(idPeca, req.body);
            res.status(204);
        } catch (error) {
            next(error);
        }
    }
);

rotasPeca.delete('/deletaPeca/:idPeca',
    async (req, res, next) => {
        try {
            const idPeca : number = Number(req.params.idPeca);
            await PecaService.deletaPeca(idPeca);
            res.status(204);
        } catch (error) {
            next(error);
        }
    }
);

rotasPeca.get('/buscaPeca/:idPeca',
    async (req, res, next) => {
        try {
            const idPeca : number = Number(req.params.idPeca);
            const peca = await PecaService.buscaPeca(idPeca);
            res.status(200).json(peca);
        } catch (error) {
            next(error);
        }
    }
);

rotasPeca.get('/buscaPecaPorNome/:nomePeca',
    async (req, res, next) => {
        try {
            const nomePeca : string = req.params.nomePeca;
            const peca = await PecaService.buscaPecaPorNome(nomePeca);
            res.status(200).json(peca);
        } catch (error) {
            next(error);
        }
    }
);

rotasPeca.put('/alocaPeca/:nomePeca',
    async (req, res, next) => {
        try {
            const nomePeca : string = req.params.nomePeca;
            const quantidade : number = req.body.quantidade;
            await PecaService.alocaPeca(nomePeca, quantidade);
            res.status(204);
        } catch (error) {
            next(error);
        }
    }
);

rotasPeca.put('/adicionaPeca/:nomePeca',
    async (req, res, next) => {
        try {
            const nomePeca : string = req.params.nomePeca;
            const quantidade : number = req.body.quantidade;
            await PecaService.adicionaPeca(nomePeca, quantidade);
            res.status(204);
        } catch (error) {
            next(error);
        }
    }
);

export default rotasPeca;