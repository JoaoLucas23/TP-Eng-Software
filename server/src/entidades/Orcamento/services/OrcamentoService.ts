import { ClienteInstance } from "../../Cliente/models/Cliente";
import ClienteService from "../../Cliente/services/ClienteService";
import ServicoService from "../../Servico/services/ServicoService";
import { Orcamento, OrcamentoProps } from "../models/Orcamento";

class OrcamentoService {
    async criaOrcamento(nomeCliente: string,body: OrcamentoProps) {
        const cliente: ClienteInstance = await ClienteService.buscaClientePorNome(nomeCliente);
        const novoOrcamento = {
            valor: body.valor,
            dataInicio: body.dataInicio,
            dataFim: body.dataFim,
            tipoServico: body.tipoServico,
            descricao: body.descricao,
            id_cliente: cliente?.id,
        }
        await Orcamento.create(novoOrcamento);
    }
    
    async editaOrcamento(idOrcamento: number, body: OrcamentoProps) {
        const orcamento = await this.buscaOrcamento(idOrcamento);
        await orcamento.update(body);
    }

    async deletaOrcamento(idOrcamento: number) {
        const orcamento = await this.buscaOrcamento(idOrcamento);
        await orcamento.destroy();
    }

    async buscaOrcamento(idOrcamento: number) {
        const orcamento = await Orcamento.findByPk(idOrcamento);
        if (!orcamento) throw new Error('Orçamento não encontrado');
        return orcamento;
    }

    async buscaOrcamentoPorCliente(nomeCliente: string) {
        const cliente = await ClienteService.buscaClientePorNome(nomeCliente);
        const orcamento = await Orcamento.findOne({where: {id_cliente: cliente.id}});
        if (!orcamento) throw new Error('Orçamento não encontrado');
        return orcamento;
    }

    async retornaTodosOrcamentos() {
        const orcamentos = await Orcamento.findAll();
        return orcamentos;
    }

    async aprovaOrcamento(idOrcamento: number) {
        const orcamento = await this.buscaOrcamento(idOrcamento);
        await orcamento.update({aprovado: true});
        await ServicoService.criaServico(idOrcamento);
    }

}

export default new OrcamentoService();