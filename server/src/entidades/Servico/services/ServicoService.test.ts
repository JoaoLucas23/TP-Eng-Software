import { Funcionario } from "../../Funcionario/models/Funcionario";
import { Orcamento } from "../../Orcamento/models/Orcamento";
import { Servico, ServicoProps } from "../models/Servico";
import ServicoService from "./ServicoService";
import { Cliente } from "../../Cliente/models/Cliente";
import { Peca } from "../../Peca/models/Peca";
import { PecaServico } from "../../PecaServico/models/PecaServico";

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
  
jest.mock('../../PecaServico/models/PecaServico', () => ({
  PecaServico: {
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

  describe('edit', () => {
    test('método recebe um objeto com as informações do usuário => chama o update com os dados corretos', async () => {
      const mockBodyServico = {
        id_funcionario: 1,
        id_orcamento: 1,
        status: 'Em andamento',
      } as ServicoProps;

      const servicoInstance = {
        update: jest.fn(),
      };

      (Servico.findByPk as any).mockResolvedValue(servicoInstance);
      
      await ServicoService.editaServico(1, mockBodyServico);
  
      expect(Servico.findByPk).toHaveBeenCalledWith(1);
      expect(servicoInstance.update).toHaveBeenCalledWith(mockBodyServico);
    }
  )});

  describe('delete', () => {
    test('método recebe um id => chama o destroy com os dados corretos', async () => {

      const idCliente = 1;

      const servicoInstance = {
        destroy: jest.fn(),
      };
      
      (Servico.findByPk as any).mockResolvedValue(servicoInstance);

      await ServicoService.deletaServico(idCliente);
  
      expect(Servico.findByPk).toHaveBeenCalledWith(idCliente);
      expect(servicoInstance.destroy).toHaveBeenCalled();
    }
  )}
  );

  describe('find', () => {
    test('método recebe um id => chama o findByPk com os dados corretos', async () => {

      (Servico.findByPk as any).mockResolvedValue({});
      
      await ServicoService.buscaServico(1);
  
      expect(Servico.findByPk).toHaveBeenCalledWith(1);
    }
  )}
  );

  describe('findAll', () => {
    test('método recebe um id => chama o findAll com os dados corretos', async () => {
      const servicos = [
        {
          id: 1,
          id_funcionario: 1,
          id_orcamento: 1,
          status: 'Aguardando início',
        },
        {
          id: 2,
          id_funcionario: 2,
          id_orcamento: 2,
          status: 'Em andamento',
        },
      ];

      (Servico.findAll as any).mockResolvedValue(servicos);

      const result = await ServicoService.retornaTodosServicos();

      expect(result).toEqual(servicos);
    }
  )}
  );

  describe('findByFuncionario', () => {
    test('método recebe um nome de funcionario => chama o findAll com os dados corretos', async () => {
      const servico = {
        id: 1,
        id_funcionario: 1,
        id_orcamento: 1,
        status: 'Aguardando início',
      };

      (Funcionario.findOne as any).mockResolvedValue({id: 1});
      (Servico.findAll as any).mockResolvedValue(servico);

      const result = await ServicoService.retornaServicosPorFuncionario('Nome');

      expect(result).toEqual(servico);
      expect(Servico.findAll).toHaveBeenCalledWith({where: {id_funcionario: 1}});
    }
  )}
  );

  describe('findByCliente', () => {
    test('método recebe um nome de cliente => chama o findAll com os dados corretos', async () => {
      const servico = {
        id: 1,
        id_funcionario: 1,
        id_orcamento: 1,
        status: 'Aguardando início',
      };

      (Cliente.findOne as any).mockResolvedValue({id: 1});
      (Orcamento.findOne as any).mockResolvedValue({id: 1});
      (Servico.findOne as any).mockResolvedValue(servico);

      const result = await ServicoService.retornaServicosPorCliente('Nome');

      expect(result).toEqual(servico);
      expect(Servico.findOne).toHaveBeenCalledWith({where: {id_orcamento: 1}});
    }
  )}
  );

  describe('findByStatus', () => {
    test('método recebe um status => chama o findAll com os dados corretos', async () => {
      const servicos = [
        {
          id: 1,
          id_funcionario: 1,
          id_orcamento: 1,
          status: 'Aguardando início',
        },
        {
          id: 2,
          id_funcionario: 2,
          id_orcamento: 2,
          status: 'Em andamento',
        },
      ];

      (Servico.findAll as any).mockResolvedValue(servicos);

      const result = await ServicoService.retornaServicosPorStatus('Aguardando início');

      expect(result).toEqual(servicos);
      expect(Servico.findAll).toHaveBeenCalledWith({where: {status: 'Aguardando início'}});
    }
  )}
  );

