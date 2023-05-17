import { ClienteInstance } from "../../Cliente/models/Cliente";
import ClienteService from "../../Cliente/services/ClienteService";
import FuncionarioService from "../../Funcionario/services/FuncionarioService";
import OrcamentoService from "../../Orcamento/services/OrcamentoService";
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

    async retornaServicosPorFuncionario(idFuncionario: number) {
        const servicos = await Servico.findAll({where: {id_funcionario: idFuncionario}});
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

}

export default new ServicoService();