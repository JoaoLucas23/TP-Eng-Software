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
