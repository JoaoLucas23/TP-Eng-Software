import { Funcionario } from "../../Funcionario/models/Funcionario";
import { Orcamento } from "../../Orcamento/models/Orcamento";
import { Servico, ServicoProps } from "../models/Servico";
import ServicoService from "./ServicoService";
import { Cliente } from "../../Cliente/models/Cliente";
import { Peca } from "../../Peca/models/Peca";

jest.mock('../models/Servico.ts', () => ({
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

  
jest.mock('../../Peca/models/Peca', () => ({
  Peca: {
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
  

  describe('create', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    });
  
    test('método recebe um objeto com as informações do usuário => chama o create com os dados corretos', async () => {
      const mockBodyServico = {
        id_funcionario: 1,
        id_orcamento: 1,
        status: 'Aguardando início',
      } as ServicoProps;

      (Funcionario.findOne as any).mockResolvedValue({id: 1});
      (Orcamento.findByPk as any).mockResolvedValue({id: 1});
  
      (Servico.create as jest.MockedFunction<typeof Servico.create>).mockResolvedValue({});
      
      await ServicoService.criaServico(1);
  
      expect(Servico.create).toHaveBeenCalledWith(mockBodyServico);
      expect(Servico.create).toHaveBeenCalledTimes(1);
    });   
  });
