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
}

export default new FuncionarioService();