import { ClienteInstance } from "../../Cliente/models/Cliente";
import ClienteService from "../../Cliente/services/ClienteService";
import FuncionarioService from "../../Funcionario/services/FuncionarioService";
import OrcamentoService from "../../Orcamento/services/OrcamentoService";
import PecaService from "../../Peca/services/PecaService";
import { PecaServico } from "../../PecaServico/models/PecaServico";
import { Servico, ServicoProps } from "../models/Servico";

class ServicoService {
    async criaServico(idOrcamento: number) {
        const orcamento = await OrcamentoService.buscaOrcamento(idOrcamento);
        const funcionario = await FuncionarioService.retornaFuncionarioDisponivel();
        const novoServico = {
            id_funcionario: funcionario.id,
            id_orcamento: orcamento.id,
            status: 'Aguardando início'
        }
        await Servico.create(novoServico);
    }

    async editaServico(idServico: number, body: ServicoProps) {
        const servico = await this.buscaServico(idServico);
        await servico.update(body);
    }

    async deletaServico(idServico: number) {
        const servico = await this.buscaServico(idServico);
        await servico.destroy();
    }

    async buscaServico(idServico: number) {
        const servico = await Servico.findByPk(idServico);
        if (!servico) throw new Error('Serviço não encontrado');
        return servico;
    }

    async retornaTodosServicos() {
        const servicos = await Servico.findAll();
        return servicos;
    }

    async retornaServicosPorFuncionario(nomeFuncionario: string) {
        const funcionario = await FuncionarioService.retornaFuncionarioPorNome(nomeFuncionario);
        const servicos = await Servico.findAll({where: {id_funcionario: funcionario.id}});
        return servicos;
    }

    async retornaServicosPorCliente(nomeCliente: string) {
        const cliente = await ClienteService.buscaClientePorNome(nomeCliente);
        const orcamento = await OrcamentoService.buscaOrcamentoPorCliente(cliente.nome);
        const servico = await Servico.findOne({where: {id_orcamento: orcamento.id}});
        return servico;
    }

    async retornaServicosPorStatus(status: string) {
        const servicos = await Servico.findAll({where: {status: status}});
        return servicos;
    }

    async alocaPecaServico(idServico: number, nomePeca: string, quantidade: number) {
        const servico = await this.buscaServico(idServico);
        console.log("Servico ok aqui");
        const peca = await PecaService.buscaPecaPorNome(nomePeca);
        console.log("Peca ok aqui");
        await PecaService.alocaPeca(peca.id!, quantidade);
        const pecaServico = {
            id_peca: peca.id,
            id_servico: servico.id,
            quantidade: quantidade
        }
        await PecaServico.create(pecaServico);
    }
}

export default new ServicoService();