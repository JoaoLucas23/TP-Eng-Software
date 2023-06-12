import { Peca } from '../models/Peca';
import { PecaProps } from '../models/Peca';
import PecaService from './PecaService';


jest.mock('../models/Peca', () => ({
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
  
    test('método recebe um objeto com as informações da peça => chama o create com os dados corretos', async () => {
      const mockBodyPeca = {
        nome: 'Teste',
        categoria: 'peca1',
        tamanho: 10.0,
        peso: 2.0,
        fabricante: 'Teste',
        preco: 10.0,
      } as PecaProps;
  
      (Peca.create as jest.MockedFunction<typeof Peca.create>).mockResolvedValue({});
      
      await PecaService.criaPeca(mockBodyPeca);
  
      expect(Peca.create).toHaveBeenCalledWith(mockBodyPeca);
      expect(Peca.create).toHaveBeenCalledTimes(1) ;
    });
  
    test('método recebe uma peça com categoria inexistente => retorna um erro', async () => {
      const mockBodyPeca = {
        nome: 'Teste',
        categoria: 'peca10',
        tamanho: 10.0,
        peso: 2.0,
        fabricante: 'Teste',
        preco: 10.0,
      } as PecaProps;
  
      await expect(PecaService.criaPeca(mockBodyPeca)).rejects.toThrowError(new Error('Categoria inexistente'));
    });
  
  });