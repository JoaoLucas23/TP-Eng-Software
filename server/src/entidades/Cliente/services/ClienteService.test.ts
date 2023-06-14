import { Cliente, ClienteProps } from '../models/Cliente';
import ClienteService from './ClienteService';
import { Orcamento, OrcamentoInstance, OrcamentoProps } from '../../Orcamento/models/Orcamento';
import { Servico } from '../../Servico/models/Servico';
import { Funcionario } from '../../Funcionario/models/Funcionario';
import { PecaServico } from '../../PecaServico/models/PecaServico';
import OrcamentoService from '../../Orcamento/services/OrcamentoService';

jest.mock('../models/Cliente', () => ({
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
  
    test('método recebe um objeto com as informações do cliente => chama o create com os dados corretos', async () => {
      const mockBodyCliente = {
        nome: 'Teste',
        data_nascimento: '2021-06-15',
        email: 'email@email.com',
        senha: '123456',
        cpf: '12345678910',
        telefone: '12345678910'
      } as ClienteProps;
  
      (Cliente.create as any).mockResolvedValue({});
      
      await ClienteService.criaCliente(mockBodyCliente);
  
      expect(Cliente.create).toHaveBeenCalledWith(mockBodyCliente);
      expect(Cliente.create).toHaveBeenCalledTimes(1);
    });  
 
  });

  describe('editaCliente', () => {
    test('should update the client with the given ID', async () => {
      // Arrange
      const idCliente = 1;
      const body = {
        nome: 'Testee',
        email: 'novo@email.com',
        data_nascimento: '2021-06-15',
        senha: '123456',
        cpf: '12345678910',
        telefone: '12345678910'
      };

      const clienteInstance = {
        update: jest.fn(),
      };

      (Cliente.findByPk as any).mockResolvedValue(clienteInstance);

      await ClienteService.editaCliente(idCliente, body);

      expect(Cliente.findByPk).toHaveBeenCalledWith(idCliente);
      expect(clienteInstance.update).toHaveBeenCalledWith(body);
    });
  });

  describe('deletaCliente', () => {
    test('should delete the client with the given ID', async () => {
      const idCliente = 1;

      const clienteInstance = {
        destroy: jest.fn(),
      };

      (Cliente.findByPk as any).mockResolvedValue(clienteInstance);

      await ClienteService.deletaCliente(idCliente);

      expect(Cliente.findByPk).toHaveBeenCalledWith(idCliente);
      expect(clienteInstance.destroy).toHaveBeenCalled();
    });
  });

  describe('buscaCliente', () => {
    test('should return the client with the given ID', async () => {
      const idCliente = 1;

      const clienteInstance = {
        id: 1,
        nome: 'Teste',
        data_nascimento: '2021-06-15',
        email: 'email@email.com',
        senha: '123456',
        cpf: '12345678910',
        telefone: '12345678910'
      } as ClienteProps;

      (Cliente.findByPk as any).mockResolvedValue(clienteInstance);

      const cliente = await ClienteService.buscaCliente(idCliente);

      expect(Cliente.findByPk).toHaveBeenCalledWith(idCliente);
      expect(cliente).toEqual(clienteInstance);
    });
  });

  describe('buscaClientePorNome', () => {
    test('should return the client with the given name', async () => {
      const nome = 'Teste';

      const clienteInstance = {
        id: 1,
        nome: 'Teste',
        data_nascimento: '2021-06-15',
        email: 'email@email.com',
        senha: 'senha',
        cpf: '123456789',
        telefone: '123456789'
      } as ClienteProps;

      (Cliente.findOne as any).mockResolvedValue(clienteInstance);

      const cliente = await ClienteService.buscaClientePorNome(nome);

      expect(Cliente.findOne).toHaveBeenCalledWith({where: {nome: nome}});
      expect(cliente).toEqual(clienteInstance);
    });
  });

  describe('retornaTodosClientes', () => {
    test('should return all clients', async () => {
      const clientesInstance = [{
        id: 1,
        nome: 'Teste',
        data_nascimento: '2021-06-15',
        email: 'email',
        senha: 'senha',
        cpf: '123456789',
        telefone: '123456789'
      },
      {
        id: 2,
        nome: 'Teste2',
        data_nascimento: '2021-06-15',
        email: 'email2',
        senha: 'senha2',
        cpf: '123456789',
        telefone: '123456789'
      }
    ] as ClienteProps[];

      (Cliente.findAll as any).mockResolvedValue(clientesInstance);

      const clientes = await ClienteService.retornaTodosClientes();

      expect(Cliente.findAll).toHaveBeenCalled();
      expect(clientes).toEqual(clientesInstance);
    }
    );
  });

  describe('aprovaOrcamento', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    });

    test('should approve the budget with the given client ID', async () => {

        const cliente = {
          id: 1,
          nome: 'Cliente 1',
          email: 'email@email.com',
          senha: 'senha',
          telefone: '999999999',
          cpf: '12345678910'
        };

        const orcamento = {
          valor: 10.0,
          dataInicio: '2021-10-10',
          dataFim: '2021-10-10',
          tipoServico: 'Reparo',
          descricao: 'Teste',
          nome_peca: 'Peca 1',
          quantidade_peca: 5,
          id_cliente: 1
        };

        (Cliente.findByPk as any).mockResolvedValue(cliente);
        (Cliente.findOne as any).mockResolvedValue(cliente);
        (Orcamento.findOne as any).mockResolvedValue(orcamento);
        OrcamentoService.aprovaOrcamento = jest.fn().mockImplementation();

        await ClienteService.aprovaOrcamento(cliente.id);

        expect(Cliente.findByPk).toHaveBeenCalledWith(1);
        expect(Cliente.findOne).toHaveBeenCalledWith({where: {nome: "Cliente 1"}});
        expect(OrcamentoService.aprovaOrcamento).toBeCalledTimes(1);
    }
    );
  });
