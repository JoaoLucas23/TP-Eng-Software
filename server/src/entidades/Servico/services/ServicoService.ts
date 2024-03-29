import { ClienteInstance } from "../../Cliente/models/Cliente";
import ClienteService from "../../Cliente/services/ClienteService";
import { Funcionario } from "../../Funcionario/models/Funcionario";
import FuncionarioService from "../../Funcionario/services/FuncionarioService";
import { Orcamento } from "../../Orcamento/models/Orcamento";
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
        await FuncionarioService.alocaFuncionario(funcionario.id!);
        const servico = await Servico.create(novoServico);

        await this.alocaPecaServico(servico.id!, orcamento.nome_peca, orcamento.quantidade_peca)
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
        const servico = await Servico.findOne(
            {
                attributes: ['id', 'status'],
                where: {
                    id_orcamento: orcamento.id
                },
                include: [
                    {
                        model: Orcamento,
                        attributes: ['valor', 'dataInicio', 'dataFim', 'tipoServico', 'descricao', 'aprovado'],
                    },
                    {
                        model: Funcionario,
                        attributes: ['nome', 'foto', 'cargo']
                    }
                ]
            }
        );
        return servico;
    }

    async retornaServicosPorStatus(status: string) {
        const servicos = await Servico.findAll({where: {status: status}});
        return servicos;
    }

    async alocaPecaServico(idServico: number, nomePeca: string, quantidade: number) {
        const servico = await this.buscaServico(idServico);
        const peca = await PecaService.buscaPecaPorNome(nomePeca);
        const pecaServico = {
            id_peca: peca.id!,
            id_servico: servico.id!,
            quantidade: quantidade
        }
        await PecaServico.create(pecaServico);
    }
}

export default new ServicoService();