import { Cliente, ClienteProps } from '../models/Cliente';
import ClienteService from './ClienteService';
import { Orcamento } from '../../Orcamento/models/Orcamento';
import { Servico } from '../../Servico/models/Servico';
import { Funcionario } from '../../Funcionario/models/Funcionario';

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