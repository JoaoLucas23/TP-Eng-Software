import { Funcionario, FuncionarioProps } from "../models/Funcionario";

class FuncionarioService {
    async criaFuncionario(body: FuncionarioProps) {
        const novoFuncionario = {
            nome: body.nome,
            data_nascimento: body.data_nascimento,
            foto: body.foto,
            cargo: body.cargo,
            matricula: body.matricula
        }
        await Funcionario.create(novoFuncionario);
    }

    async editaFuncionario(idFuncionario: number, body: FuncionarioProps) {
        const funcionario = await this.buscaFuncionario(idFuncionario);
        await funcionario.update(body);
    }

    async deletaFuncionario(idFuncionario: number) {
        const funcionario = await this.buscaFuncionario(idFuncionario);
        await funcionario.destroy();
    }

    async buscaFuncionario(idFuncionario: number) {
        const funcionario = await Funcionario.findByPk(idFuncionario);
        if (!funcionario) throw new Error('Funcionario não encontrado');
        return funcionario;
    }

    async retornaTodosFuncionarios() {
        const funcionarios = await Funcionario.findAll();
        return funcionarios;
    }

    async retornaFuncionariosPorCargo(cargo: string) {
        const funcionarios = await Funcionario.findAll({where: {cargo: cargo}});
        return funcionarios;
    }

    async retornaFuncionariosPorNome(nome: string) {
        const funcionario = await Funcionario.findOne({where: {nome: nome}});
        return funcionario;
    }

    async retornaFuncionariosDisponiveisPorCargo(cargo: string) {
        const funcionarios = await Funcionario.findAll({where: {cargo: cargo, disponivel: true}});
        return funcionarios;
    }

}

export default new FuncionarioService();