import { Cliente } from "../../Cliente/models/Cliente";
import { Orcamento, OrcamentoInstance, OrcamentoProps } from "../models/Orcamento";
import OrcamentoService from "./OrcamentoService";
import { Funcionario } from "../../Funcionario/models/Funcionario";
import { Servico } from "../../Servico/models/Servico";
import { PecaServico } from "../../PecaServico/models/PecaServico";
import { Peca } from "../../Peca/models/Peca";
import ServicoService from "../../Servico/services/ServicoService";

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
      const mockBodyOrcamento = {
        dataInicio: '2021-10-10',
        dataFim: '2021-10-10',
        tipoServico: 'Reparo',
        descricao: 'Teste',
        quantidade_peca: 5,
        nome_peca: 'Peca 1',
        id_cliente: 1,
      } as OrcamentoProps;

      const mockOrcamento = {
        dataInicio: '2021-10-10',
        dataFim: '2021-10-10',
        tipoServico: 'Reparo',
        descricao: 'Teste',
        quantidade_peca: 5,
        nome_peca: 'Peca 1',
        id_cliente: 1,
        valor: 12.5
      } as OrcamentoProps;
  
      (Peca.findOne as any).mockResolvedValue({quantidade_disponivel: 10, preco: 2.5});
      (Orcamento.create as jest.MockedFunction<typeof Orcamento.create>).mockResolvedValue({});
      
      (Cliente.findOne as any).mockResolvedValue({id:1});
      await OrcamentoService.criaOrcamento("Nome", "Peca 1", 5, mockBodyOrcamento);
  
      expect(Orcamento.create).toHaveBeenCalledWith(mockOrcamento);
      expect(Orcamento.create).toHaveBeenCalledTimes(1);
    });   
  });

  describe('edit', () => {
    test('método recebe um id e um objeto com as informações do usuário => chama o update com os dados corretos', async () => {
      const idOrcamento = 1;
        const body = {
          valor: 10.0,
          dataInicio: '2021-10-10',
          dataFim: '2021-10-10',
          tipoServico: 'Reparo',
          descricao: 'Teste',
          nome_peca: 'Peca 1',
          quantidade_peca: 5,
          id_cliente: 1,
        };

        const orcamentoInstance = {
          update: jest.fn(),
        };

        (Orcamento.findByPk as any).mockResolvedValue(orcamentoInstance);

        await OrcamentoService.editaOrcamento(idOrcamento, body);

        expect(Orcamento.findByPk).toHaveBeenCalledWith(idOrcamento);
        expect(orcamentoInstance.update).toHaveBeenCalledWith(body);
    });
  });

    describe('delete', () => {
      test('método recebe um id => chama o destroy com os dados corretos', async () => {  
      const idOrcamento = 1;

      const orcamentoInstance = {
        destroy: jest.fn(),
      };

      (Orcamento.findByPk as any).mockResolvedValue(orcamentoInstance);

      await OrcamentoService.deletaOrcamento(idOrcamento);

      expect(Orcamento.findByPk).toHaveBeenCalledWith(idOrcamento);
      expect(orcamentoInstance.destroy).toHaveBeenCalled();
    });
  });

    describe('get', () => {
      test('método recebe um id => chama o findByPk com os dados corretos', async () => {
      const idOrcamento = 1;

      const orcamentoInstance = {
        findByPk: jest.fn(),
      };

      (Orcamento.findByPk as any).mockResolvedValue(orcamentoInstance);

      await OrcamentoService.buscaOrcamento(idOrcamento);

      expect(Orcamento.findByPk).toHaveBeenCalledWith(idOrcamento);
    });
  });

    describe('getAll', () => {
      test('método recebe um id => chama o findByPk com os dados corretos', async () => {
      const orcamentos = [
        {
          id: 1,
          valor: 10.0,
          dataInicio: '2021-10-10',
          dataFim: '2021-10-10',
          tipoServico: 'Reparo',
          descricao: 'Teste',
          id_cliente: 1,
        },
        {
          id: 2,
          valor: 10.0,
          dataInicio: '2021-10-10',
          dataFim: '2021-10-10',
          tipoServico: 'Reparo',
          descricao: 'Teste',
          id_cliente: 1,
        },
      ];

      (Orcamento.findAll as any).mockResolvedValue(orcamentos);

      const result = await OrcamentoService.retornaTodosOrcamentos();

      expect(result).toEqual(orcamentos);
    });
  });
  
    describe('approve', () => {
      test('método recebe um id => chama o findByPk com os dados corretos', async () => {
      const idOrcamento = 1;

      const orcamentoInstance = {
        valor: 10.0,
        dataInicio: '2021-10-10',
        dataFim: '2021-10-10',
        tipoServico: 'Reparo',
        descricao: 'Teste',
        nome_peca: 'Peca 1',
        quantidade_peca: 5,
        id_cliente: 1,
      } as OrcamentoInstance;

      ServicoService.criaServico = jest.fn().mockImplementation();
      (Orcamento.findByPk as any).mockResolvedValue(orcamentoInstance);
      orcamentoInstance.update = jest.fn().mockImplementation();

      await OrcamentoService.aprovaOrcamento(idOrcamento);

      expect(Orcamento.findByPk).toHaveBeenCalledWith(idOrcamento);
      expect(orcamentoInstance.update).toHaveBeenCalledWith({aprovado: true});
    });
  });

