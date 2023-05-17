import { Router } from "express";
import FuncionarioService from "../services/FuncionarioService";

const rotasFuncionario: Router = Router();

rotasFuncionario.post('/criaFuncionario',
    async (req, res, next) => {
        try {
            await FuncionarioService.criaFuncionario(req.body);
            res.status(204)
        } catch (error) {
            next(error);
        }
    }
);

rotasFuncionario.put('/editaFuncionario/:idFuncionario',
    async (req, res, next) => {
        try {
            const idFuncionario : number = Number(req.params.idFuncionario);
            await FuncionarioService.editaFuncionario(idFuncionario, req.body);
            res.status(204)
        } catch (error) {
            next(error);
        }
    }
);

rotasFuncionario.delete('/deletaFuncionario/:idFuncionario',
    async (req, res, next) => {
        try {
            const idFuncionario : number = Number(req.params.idFuncionario);
            await FuncionarioService.deletaFuncionario(idFuncionario);
            res.status(204)
        } catch (error) {
            next(error);
        }
    }
);

rotasFuncionario.get('/buscaFuncionario/:idFuncionario',
    async (req, res, next) => {
        try {
            const idFuncionario : number = Number(req.params.idFuncionario);
            const funcionario = await FuncionarioService.buscaFuncionario(idFuncionario);
            res.status(200).json(funcionario);
        } catch (error) {
            next(error);
        }
    }
);

rotasFuncionario.get('/retornaTodosFuncionarios',
    async (req, res, next) => {
        try {
            const funcionarios = await FuncionarioService.retornaTodosFuncionarios();
            res.status(200).json(funcionarios);
        } catch (error) {
            next(error);
        }
    }
);

rotasFuncionario.get('/retornaFuncionariosPorCargo/',
    async (req, res, next) => {
        try {
            const cargo : string = req.body.cargo;
            const funcionarios = await FuncionarioService.retornaFuncionariosPorCargo(cargo);
            res.status(200).json(funcionarios);
        } catch (error) {
            next(error);
        }
    }
);

rotasFuncionario.get('/retornaFuncionariosPorNome/',
    async (req, res, next) => {
        try {
            const nome : string = req.body.nomeFuncionario;
            const funcionario = await FuncionarioService.retornaFuncionariosPorNome(nome);
            res.status(200).json(funcionario);
        } catch (error) {
            next(error);
        }
    }
);

rotasFuncionario.get('/retornaFuncionariosDisponiveis/',
    async (req, res, next) => {
        try {
            const cargo : string = req.body.cargo;
            const funcionarios = await FuncionarioService.retornaFuncionariosDisponiveisPorCargo(cargo);
            res.status(200).json(funcionarios);
        } catch (error) {
            next(error);
        }
    }
);

export default rotasFuncionario;