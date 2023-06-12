import { Router } from "express";
import OrcamentoService from "../services/OrcamentoService";

const rotasOrcamento: Router = Router();

rotasOrcamento.post('/criaOrcamento',
    async (req, res, next) => {
        try {
            const nomeCliente : string = req.body.nomeCliente;
            await OrcamentoService.criaOrcamento(nomeCliente, req.body);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
);

rotasOrcamento.put('/editaOrcamento/:idOrcamento',
    async (req, res, next) => {
        try {
            const idOrcamento : number = Number(req.params.idOrcamento);
            await OrcamentoService.editaOrcamento(idOrcamento, req.body);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
);

rotasOrcamento.delete('/deletaOrcamento/:idOrcamento',
    async (req, res, next) => {
        try {
            const idOrcamento : number = Number(req.params.idOrcamento);
            await OrcamentoService.deletaOrcamento(idOrcamento);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
);

rotasOrcamento.get('/buscaOrcamento/:idOrcamento',
    async (req, res, next) => {
        try {
            const idOrcamento : number = Number(req.params.idOrcamento);
            const orcamento = await OrcamentoService.buscaOrcamento(idOrcamento);
            res.status(200).json(orcamento);
        } catch (error) {
            next(error);
        }
    }
);

rotasOrcamento.get('/buscaOrcamentoPorCliente/',
    async (req, res, next) => {
        try {
            const nomeCliente : string = req.body.nomeCliente;
            const orcamento = await OrcamentoService.buscaOrcamentoPorCliente(nomeCliente);
            res.status(200).json(orcamento);
        } catch (error) {
            next(error);
        }
    }
);

rotasOrcamento.get('/retornaTodosOrcamentos',
    async (req, res, next) => {
        try {
            const orcamentos = await OrcamentoService.retornaTodosOrcamentos();
            res.status(200).json(orcamentos);
        } catch (error) {
            next(error);
        }
    }
);

export default rotasOrcamento;