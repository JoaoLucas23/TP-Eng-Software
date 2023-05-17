import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
 
dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
  }));

import rotasFuncionario from '../entidades/Funcionario/controllers/rotas';
import rotasCliente from '../entidades/Cliente/controllers/rotas';
import rotasOrcamento from '../entidades/Orcamento/controllers/rotas';
import rotasServico from '../entidades/Servico/controllers/rotas';

app.use('/api/funcionario',rotasFuncionario);
app.use('/api/cliente',rotasCliente);
app.use('/api/orcamento',rotasOrcamento);
app.use('/api/servico',rotasServico);

export {app};
