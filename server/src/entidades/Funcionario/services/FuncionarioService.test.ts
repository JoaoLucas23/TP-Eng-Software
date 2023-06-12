import { Funcionario, FuncionarioProps } from "../models/Funcionario";
import FuncionarioService from "./FuncionarioService";

jest.mock('../models/Funcionario', () => ({
    Funcionario: {
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
      findByPk: jest.fn(),
      findAll: jest.fn(),
      hasMany: jest.fn(),
      belongsToMany: jest.fn(),
      hasOne: jest.fn(),
      belongsTo: jest.fn(),
    },
  }));

  jest.mock('../../Cliente/models/Cliente', () => ({
    Cliente: {
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
      findByPk: jest.fn(),
      findAll: jest.fn(),
      hasMany: jest.fn(),
      belongsToMany: jest.fn(),
      hasOne: jest.fn(),
      belongsTo: jest.fn(),
      sync: jest.fn(),
    },
  }));

  jest.mock('../../Servico/models/Servico', () => ({
    Servico: {
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
      findByPk: jest.fn(),
      findAll: jest.fn(),
      hasMany: jest.fn(),
      belongsToMany: jest.fn(),
      hasOne: jest.fn(),
      belongsTo: jest.fn(),
      sync: jest.fn(),
    },
  }));

  jest.mock('../../Orcamento/models/Orcamento', () => ({
    Orcamento: {
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
      findByPk: jest.fn(),
      findAll: jest.fn(),
      hasMany: jest.fn(),
      belongsToMany: jest.fn(),
      hasOne: jest.fn(),
      belongsTo: jest.fn(),
      sync: jest.fn(),
    },
  }));

  describe('criaFuncinario', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    });
  
    test('método recebe um objeto com as informações do Funcinario => chama o criaFuncinario com os dados corretos', async () => {
      const mockBodyFuncionario = {
        nome: "Teste",
        data_nascimento: "2021-05-05",
        foto: "teste.jpg",
        cargo: "Mecânico",
        matricula: "123456"
      } as FuncionarioProps;
      
  
      (Funcionario.create as jest.MockedFunction<typeof Funcionario.create>).mockResolvedValue({});
      
      await FuncionarioService.criaFuncionario(mockBodyFuncionario);
  
      expect(Funcionario.create).toHaveBeenCalledWith(mockBodyFuncionario);
      expect(Funcionario.create).toHaveBeenCalledTimes(1) ;
    });

  });

  describe('editaFuncionario', () => {
    test('should update the Funcionario with the given ID', async () => {
      const idFuncionario = 1;
      const body = {
        nome: "Teste",
        data_nascimento: "2021-05-05",
        foto: "teste.jpg",
        cargo: "Mecânico",
        matricula: "123456"
      };

      const funcionarioInstance = {
        update: jest.fn(),
      };

      (Funcionario.findByPk as any).mockResolvedValue(funcionarioInstance);

      await FuncionarioService.editaFuncionario(idFuncionario, body);

      expect(Funcionario.findByPk).toHaveBeenCalledWith(idFuncionario);
      expect(funcionarioInstance.update).toHaveBeenCalledWith(body);
    });
  });

  describe('deletaFuncionario', () => {
    test('should delete the Funcionario with the given ID', async () => {
      const idFuncionario = 1;

      const funcionarioInstance = {
        destroy: jest.fn(),
      };

      (Funcionario.findByPk as any).mockResolvedValue(funcionarioInstance);

      await FuncionarioService.deletaFuncionario(idFuncionario);

      expect(Funcionario.findByPk).toHaveBeenCalledWith(idFuncionario);
      expect(funcionarioInstance.destroy).toHaveBeenCalled();
    });
  }
  );

  describe('buscaFuncionario', () => {
    test('should return the Funcionario with the given ID', async () => {
      const idFuncionario = 1;

      const funcionarioInstance = {
        id: 1,
        nome: "Teste",
        data_nascimento: "2021-05-05",
        foto: "teste.jpg",
        cargo: "Mecânico",
        matricula: "123456"
      } as FuncionarioProps;

      (Funcionario.findByPk as any).mockResolvedValue(funcionarioInstance);

      const cliente = await FuncionarioService.buscaFuncionario(idFuncionario);

      expect(Funcionario.findByPk).toHaveBeenCalledWith(idFuncionario);
      expect(cliente).toEqual(funcionarioInstance);
    });
  }
  );

  describe('buscaFuncionarios', () => {
    test('should return all Funcionarios', async () => {
      const funcionarioInstance = [{
        id: 1,
        nome: "Teste",
        data_nascimento: "2021-05-05",
        foto: "teste.jpg",
        cargo: "Mecânico",
        matricula: "123456"
      },
    {
      id: 2,
      nome: "Teste2",
      data_nascimento: "2021-05-05",
      foto: "teste2.jpg",
      cargo: "Mecânico",
      matricula: "123456"
    }] as FuncionarioProps[];

      (Funcionario.findAll as any).mockResolvedValue(funcionarioInstance);

      const funcionarios = await FuncionarioService.retornaTodosFuncionarios();

      expect(Funcionario.findAll).toHaveBeenCalled();
      expect(funcionarios).toEqual(funcionarioInstance);
    }
    );
  }
  );

  describe('buscaFuncionarioPorNome', () => {
    test('should return the Funcionario with the given matricula', async () => {
      const nome = "Teste";

      const funcionarioInstance = {
        id: 1,
        nome: "Teste",
        data_nascimento: "2021-05-05",
        foto: "teste.jpg",
        cargo: "Mecânico",
        matricula: "123456"
      } as FuncionarioProps;

      (Funcionario.findOne as any).mockResolvedValue(funcionarioInstance);

      const funcionario = await FuncionarioService.retornaFuncionarioPorNome(nome);

      expect(Funcionario.findOne).toHaveBeenCalledWith({where: {nome: nome}});
      expect(funcionario).toEqual(funcionarioInstance);
    }
    );
  }
  );

  describe('buscaFuncionariosPorCargo', () => {
    test('should return the Funcionario with the given cargo', async () => {
      const cargo = "Mecânico";

      const funcionarioInstance = [{
        id: 1,
        nome: "Teste",
        data_nascimento: "2021-05-05",
        foto: "teste.jpg",
        cargo: "Mecânico",
        matricula: "123456"
      },
    {
      id: 2,
      nome: "Teste2",
      data_nascimento: "2021-05-05",
      foto: "teste2.jpg",
      cargo: "Mecânico",
      matricula: "123456"
    }] as FuncionarioProps[];

      (Funcionario.findAll as any).mockResolvedValue(funcionarioInstance);

      const funcionarios = await FuncionarioService.retornaFuncionariosPorCargo(cargo);

      expect(Funcionario.findAll).toHaveBeenCalledWith({where: {cargo: cargo}});
      expect(funcionarios).toEqual(funcionarioInstance);
    }
    );
  }
  );

  describe('buscaFuncionarioDisponivel', () => {
    test('should return the Funcionario with the given cargo', async () => {
      const funcionarioInstance = {
        id: 1,
        nome: "Teste",
        data_nascimento: "2021-05-05",
        foto: "teste.jpg",
        cargo: "Mecânico",
        matricula: "123456"
      } as FuncionarioProps;

      (Funcionario.findOne as any).mockResolvedValue(funcionarioInstance);

      const funcionario = await FuncionarioService.retornaFuncionarioDisponivel();

      expect(Funcionario.findOne).toHaveBeenCalledWith({where: {cargo: 'Mecânico', disponivel: true}});
      expect(funcionario).toEqual(funcionarioInstance);
    }
    );
  }
  );

  describe('buscaFuncionariosDisponiveisPorCargo', () => {
    test('should return the Funcionario with the given cargo', async () => {
      const cargo = "Mecânico";

      const funcionarioInstance = [{
        id: 1,
        nome: "Teste",
        data_nascimento: "2021-05-05",
        foto: "teste.jpg",
        cargo: "Mecânico",
        matricula: "123456"
      },
    {
      id: 2,
      nome: "Teste2",
      data_nascimento: "2021-05-05",
      foto: "teste2.jpg",
      cargo: "Mecânico",
      matricula: "123456"
    }] as FuncionarioProps[];

      (Funcionario.findAll as any).mockResolvedValue(funcionarioInstance);

      const funcionarios = await FuncionarioService.retornaFuncionariosDisponiveisPorCargo(cargo);

      expect(Funcionario.findAll).toHaveBeenCalledWith({where: {cargo: cargo, disponivel: true}});
      expect(funcionarios).toEqual(funcionarioInstance);
    }
    );
  }
  );
