import { Cliente, ClienteProps } from '../models/Cliente';
import ClienteService from './ClienteService';
import { Orcamento, OrcamentoInstance, OrcamentoProps } from '../../Orcamento/models/Orcamento';
import { Servico } from '../../Servico/models/Servico';
import { Funcionario } from '../../Funcionario/models/Funcionario';
import { PecaServico } from '../../PecaServico/models/PecaServico';

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
  
      (Cliente.create as jest.MockedFunction<typeof Cliente.create>).mockResolvedValue({});
      
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
    test('should approve the budget with the given client ID', async () => {
      
      const idCliente = 1;

      const clienteInstance = {
        id: 1,
        nome: 'Teste',
        data_nascimento: '2021-06-15',
        email: 'email',
        senha: 'senha',
        cpf: '123456789',
        telefone: '123456789'
      } as ClienteProps;

      const orcamentoInstance = {
        id: 1,
        valor: 100,
        dataInicio: '2021-06-15',
        dataFim: '2021-06-16',
        tipoServico: 'Tipo',
        descricao: 'Descrição',
        id_cliente: 1,
        aprovado: false
      } as OrcamentoProps;

      const OrcamentoInstance = {
        update: jest.fn(),
      };

      (Funcionario.findOne as any).mockResolvedValue({id: 1});
      (Cliente.findByPk as any).mockResolvedValue(clienteInstance);
      (Orcamento.findOne as any).mockResolvedValue(orcamentoInstance);
      (Orcamento.findByPk as any).mockResolvedValue(OrcamentoInstance);

      await ClienteService.aprovaOrcamento(idCliente);

      expect(Cliente.findByPk).toHaveBeenCalledWith(idCliente);
      expect(Orcamento.findOne).toHaveBeenCalledWith({where: {id_cliente: clienteInstance.id}});
      expect(OrcamentoInstance.update).toBeCalledWith({aprovado: true});
    }
    );
  });
