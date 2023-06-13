import { PecaServico } from "../models/PecaServico";


class PecaServicoService {
    async retornaPecasPorServico(idServico: number) {
        const pecas = await PecaServico.findAll({where: {id_servico: idServico}});
        return pecas;
    }

    async retornaTodasPecasServico() {
        const pecas = await PecaServico.findAll();
        return pecas;
    }
}

export default new PecaServicoService();