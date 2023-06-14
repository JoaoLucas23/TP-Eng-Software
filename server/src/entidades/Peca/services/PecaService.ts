import { Peca, PecaProps } from "../models/Peca";

class PecaService {
    async criaPeca(body: PecaProps) {
        if (body.categoria != 'peca1' && body.categoria != 'peca2' && body.categoria != 'peca3') {
            throw new Error('Categoria inexistente');
        }
        const novaPeca = {
            nome: body.nome,
            categoria: body.categoria,
            tamanho: body.tamanho, 
            peso: body.peso, 
            fabricante: body.fabricante,
            preco: body.preco
        }
        await Peca.create(novaPeca);
    }

    async editaPeca(idPeca: number, body: PecaProps) {
        const peca = await this.buscaPeca(idPeca);
        await peca.update(body);
    }

    async deletaPeca(idPeca: number) {
        const peca = await this.buscaPeca(idPeca);
        await peca.destroy();
    }

    async buscaPeca(idPeca: number) {
        const peca = await Peca.findByPk(idPeca);
        if (!peca) throw new Error('Peca não encontrado');
        return peca;
    }

    async buscaPecaPorNome(nomePeca: string) {
        const peca = await Peca.findOne({where: {nome: nomePeca}});
        if (!peca) throw new Error('Peca não encontrado');
        return peca;
    }

    async alocaPeca(idPeca: number, quantidade: number) {
        const peca = await this.buscaPeca(idPeca);
        const quantidade_peca = peca.quantidade_disponivel!;
        if (quantidade_peca >= quantidade) {
            let novaQuantidade = quantidade_peca - quantidade;
            let novaPeca = {
                nome: peca.nome,
                categoria: peca.categoria,
                tamanho: peca.tamanho,
                peso: peca.peso,
                fabricante: peca.fabricante,
                preco: peca.preco,
                quantidade_disponivel: novaQuantidade
            }
            return this.editaPeca(peca.id!, novaPeca);
        }
        else {
            throw new Error('Quantidade nao disponivel');
        }
    }

    async adicionaPeca(nomePeca: string, quantidade: number) {
        const peca = await this.buscaPecaPorNome(nomePeca);
        const quantidade_peca : number = peca.quantidade_disponivel!;
        let novaQuantidade = quantidade_peca + quantidade;
        return this.editaPeca(peca.id!, { ...peca, quantidade_disponivel: novaQuantidade});
    }

    async retornaTodasPecas() {
        const pecas = await Peca.findAll();
        return pecas;
    }
}

export default new PecaService();