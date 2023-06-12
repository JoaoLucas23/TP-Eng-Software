import { Cliente } from "../../Cliente/models/Cliente";
import { Orcamento, OrcamentoProps } from "../models/Orcamento";
import OrcamentoService from "./OrcamentoService";
import { Funcionario } from "../../Funcionario/models/Funcionario";
import { Servico } from "../../Servico/models/Servico";

jest.mock('../models/Orcamento', () => ({
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

  jest.mock('../../Funcionario/models/Funcionario', () => ({
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
      sync: jest.fn(),
    },
  }));
  
  
  describe('create', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    });
  
    test('método recebe um objeto com as informações do usuário => chama o create com os dados corretos', async () => {
      const mockBodyOrcamento = {
        valor: 10.0,
        dataInicio: '2021-10-10',
        dataFim: '2021-10-10',
        tipoServico: 'Reparo',
        descricao: 'Teste',
        id_cliente: 1,
      } as OrcamentoProps;
  
      (Orcamento.create as jest.MockedFunction<typeof Orcamento.create>).mockResolvedValue({});
      
      (Cliente.findOne as any).mockResolvedValue({id:1});
      await OrcamentoService.criaOrcamento("Nome", mockBodyOrcamento);
  
      expect(Orcamento.create).toHaveBeenCalledWith(mockBodyOrcamento);
      expect(Orcamento.create).toHaveBeenCalledTimes(1);
    });   
  });





