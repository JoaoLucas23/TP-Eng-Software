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

export default rotasFuncionario;