import { Router } from "express";
import ServicoService from "../services/ServicoService";

const rotasServico: Router = Router();

rotasServico.post('/criaServico/:idOrcamento',
    async (req, res, next) => {
        try {
            const idOrcamento : number = Number(req.params.idOrcamento);
            await ServicoService.criaServico(idOrcamento);
            res.status(204)
        } catch (error) {
            next(error);
        }
    }
);

rotasServico.put('/editaServico/:idServico',
    async (req, res, next) => {
        try {
            const idServico : number = Number(req.params.idServico);
            await ServicoService.editaServico(idServico, req.body);
            res.status(204)
        } catch (error) {
            next(error);
        }
    }
);

rotasServico.delete('/deletaServico/:idServico',
    async (req, res, next) => {
        try {
            const idServico : number = Number(req.params.idServico);
            await ServicoService.deletaServico(idServico);
            res.status(204)
        } catch (error) {
            next(error);
        }
    }
);

rotasServico.get('/buscaServico/:idServico',
    async (req, res, next) => {
        try {
            const idServico : number = Number(req.params.idServico);
            const servico = await ServicoService.buscaServico(idServico);
            res.status(200).json(servico);
        } catch (error) {
            next(error);
        }
    }
);

rotasServico.get('/retornaTodosServicos',
    async (req, res, next) => {
        try {   
            const servicos = await ServicoService.retornaTodosServicos();
            res.status(200).json(servicos);
        } catch (error) {
            next(error);
        }
    }
);

rotasServico.get('/retornaServicosPorFuncionario/',
    async (req, res, next) => {
        try {
            const nomeFuncionario : string = req.body.nomeFuncionario;
            const servicos = await ServicoService.retornaServicosPorFuncionario(nomeFuncionario);
            res.status(200).json(servicos);
        } catch (error) {
            next(error);
        }
    }
);

rotasServico.get('/retornaServicosPorCliente/',
    async (req, res, next) => {
        try {
            const nomeCliente : string = req.body.nomeCliente;
            const servico = await ServicoService.retornaServicosPorCliente(nomeCliente);
            res.status(200).json(servico);
        } catch (error) {
            next(error);
        }
    }
);

rotasServico.get('/retornaServicosPorStatus/',
    async (req, res, next) => {
        try {
            const status : string = req.body.status;
            const servicos = await ServicoService.retornaServicosPorStatus(status);
            res.status(200).json(servicos);
        } catch (error) {
            next(error);
        }
    }
);

export default rotasServico;