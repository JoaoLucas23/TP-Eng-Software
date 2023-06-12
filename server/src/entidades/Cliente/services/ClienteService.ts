import { Orcamento } from "../../Orcamento/models/Orcamento";
import OrcamentoService from "../../Orcamento/services/OrcamentoService";
import { Cliente, ClienteProps } from "../models/Cliente";

class ClienteService {
    async criaCliente(body: ClienteProps) {
        const novoCliente = {
            nome: body.nome,
            data_nascimento: body.data_nascimento,
            email: body.email,
            senha: body.senha,
            cpf: body.cpf,
            telefone: body.telefone
        }
        await Cliente.create(novoCliente);
    }

    async editaCliente(idCliente: number, body: ClienteProps) {
        const cliente = await this.buscaCliente(idCliente);
        await cliente.update(body);
    }

    async deletaCliente(idCliente: number) {
        const cliente = await this.buscaCliente(idCliente);
        await cliente.destroy();
    }

    async buscaCliente(idCliente: number) {
        const cliente = await Cliente.findByPk(idCliente);
        if (!cliente) throw new Error('Cliente não encontrado');
        return cliente;
    }

    async buscaClientePorNome(nome: string) {
        const cliente = await Cliente.findOne({where: {nome: nome}});
        if (!cliente) throw new Error('Cliente não encontrado');
        return cliente;
    }

    async retornaTodosClientes() {
        const clientes = await Cliente.findAll();
        return clientes;
    }

    async aprovaOrcamento(idCliente: number) {
        const cliente = await this.buscaCliente(idCliente);
        const orcamento = await OrcamentoService.buscaOrcamentoPorCliente(cliente.nome);
        if (orcamento) await OrcamentoService.aprovaOrcamento(orcamento.id!); 
        else throw new Error('Orçamento não encontrado');
    }
    
}

export default new ClienteService();