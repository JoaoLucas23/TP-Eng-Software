import { Router } from "express";
import ClienteService from "../services/ClienteService";

const rotasCliente: Router = Router();

rotasCliente.post('/criaCliente',
    async (req, res, next) => {
        try {
            await ClienteService.criaCliente(req.body);
            res.status(204)
        } catch (error) {
            next(error);
        }
    }
);

rotasCliente.put('/editaCliente/:idCliente',
    async (req, res, next) => {
        try {
            await ClienteService.editaCliente(Number(req.params.idCliente), req.body);
            res.status(204)
        } catch (error) {
            next(error);
        }
    }
);

rotasCliente.delete('/deletaCliente/:idCliente',
    async (req, res, next) => { 
        try {
            const idCliente : number = Number(req.params.idCliente);
            await ClienteService.deletaCliente(idCliente);
            res.status(204)
        } catch (error) {
            next(error);
        }
    }
);

rotasCliente.get('/buscaCliente/:idCliente',
    async (req, res, next) => {
        try {
            const idCliente : number = Number(req.params.idCliente);
            const cliente = await ClienteService.buscaCliente(idCliente);
            res.status(200).json(cliente);
        } catch (error) {
            next(error);
        }
    }
);

rotasCliente.get('/buscaClientePorNome/:nome',
    async (req, res, next) => {
        try {   
            const nome : string = req.params.nome;
            const cliente = await ClienteService.buscaClientePorNome(nome);
            res.status(200).json(cliente);
        } catch (error) {
            next(error);
        }
    }
);

rotasCliente.get('/buscaClientePorEmail/:email',
    async (req, res, next) => {
        try {   
            const email : string = req.params.email;
            const cliente = await ClienteService.buscaClientePorEmail(email);
            res.status(200).json(cliente);
        } catch (error) {
            next(error);
        }
    }
);

rotasCliente.get('/retornaTodosClientes',
    async (req, res, next) => {
        try {
            const clientes = await ClienteService.retornaTodosClientes();
            res.status(200).json(clientes);
        } catch (error) {
            next(error);
        }
    }
);

export default rotasCliente;