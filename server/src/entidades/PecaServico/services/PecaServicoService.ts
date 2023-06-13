import { Peca } from "../../Peca/models/Peca";
import { Servico } from "../../Servico/models/Servico";
import { PecaServico } from "../models/PecaServico";


class PecaServicoService {
    async retornaPecasPorServico(idServico: number) {
        const pecas = await PecaServico.findAll(
            {
                where: {
                    id_servico: idServico
                },
                include: [
                    {
                        model: Peca,
                        attributes: ['nome', 'preco', 'tamanho', 'peso']
                    },
                    {
                        model: Servico,
                        attributes: ['status']
                    }
                ]
            }
        );
        return pecas;
    }

    async retornaTodasPecasServico() {
        const pecas = await PecaServico.findAll({
            include: [
                {
                    model: Peca,
                    attributes: ['nome', 'preco', 'tamanho', 'peso']
                },
                {
                    model: Servico,
                    attributes: ['status']
                }
            ]
        });
        return pecas;
    }
}

export default new PecaServicoService();