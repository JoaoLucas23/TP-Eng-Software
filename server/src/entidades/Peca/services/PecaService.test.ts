import { Peca } from '../models/Peca';
import { PecaProps } from '../models/Peca';
import PecaService from './PecaService';
import { PecaServico } from '../../PecaServico/models/PecaServico';

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

    describe('editaPeca', () => {
      test('should update the client with the given ID', async () => {
        const idPeca = 1;
        const body = {
          nome: "Peça",
          categoria: "peca1",
          tamanho: 10, 
          peso: 10, 
          fabricante: "fabricante",
          preco: 110
        };
  
        const pecaInstance = {
          update: jest.fn(),
        };
  
        (Peca.findByPk as any).mockResolvedValue(pecaInstance);
  
        await PecaService.editaPeca(idPeca, body);
  
        expect(Peca.findByPk).toHaveBeenCalledWith(idPeca);
        expect(pecaInstance.update).toHaveBeenCalledWith(body);
      });
    });

  describe('deletaPeca', () => {
    test('should delete the client with the given ID', async () => {
    const idPeca = 1;

    const pecaInstance = {
      destroy: jest.fn(),
    };

    (Peca.findByPk as any).mockResolvedValue(pecaInstance);

    await PecaService.deletaPeca(idPeca);

    expect(Peca.findByPk).toHaveBeenCalledWith(idPeca);
    expect(pecaInstance.destroy).toHaveBeenCalled();
    });
  });

  describe('buscaPeca', () => {
    test('should return the peca with the given ID', async () => {
      const idPeca = 1;
      const pecaInstance = {
        id: 1,
        nome: "Peça",
        categoria: "peca1",
        tamanho: 10,
        peso: 10,
        fabricante: "fabricante",
        preco: 110
      } as PecaProps;

      (Peca.findByPk as any).mockResolvedValue(pecaInstance);

      const peca = await PecaService.buscaPeca(idPeca);

      expect(Peca.findByPk).toHaveBeenCalledWith(idPeca);
      expect(peca).toEqual(pecaInstance);
    }
    );
  });

  
  describe('buscaPecaPeloNome', () => {
    test('should return the peca with the given name', async () => {
      const nome = 'peca1';

      const pecaInstance = {
        id: 1,
        nome: "Peça",
        categoria: "peca1",
        tamanho: 10,
        peso: 10,
        fabricante: "fabricante",
        preco: 110
      } as PecaProps;

      (Peca.findOne as any).mockResolvedValue(pecaInstance);

      const cliente = await PecaService.buscaPecaPorNome(nome);

      expect(Peca.findOne).toHaveBeenCalledWith({where: {nome: nome}});
      expect(cliente).toEqual(pecaInstance);
    }
    );
  });

  /*describe('alocaPeca', () => {
    test('should remove the amount of peca', async () => {
      const quantidade = 2;

      const pecaInstance = {
        id: 1,
        nome: "Teste",
        categoria: "peca1",
        tamanho: 10,
        peso: 10,
        fabricante: "fabricante",
        preco: 110,
        quantidade_disponivel: 10
      } as PecaProps;

      const pecaInstance2 = {
        id: 1,
        nome: "Teste",
        categoria: "peca1",
        tamanho: 10,
        peso: 10,
        fabricante: "fabricante",
        preco: 110,
        quantidade_disponivel: 8
      } as PecaProps;

      const pecaInstance3 = {
        update: jest.fn(),
      };

      (Peca.findByPk as any).mockResolvedValue(pecaInstance);

      await PecaService.alocaPeca(1, quantidade);

      expect(pecaInstance3.update).toBeCalledWith({ ...pecaInstance2, quantidade_disponivel: 8});
    }
    );
    test('should return error of quantity', async () => {
      const nome = 'peca1';
      const quantidade = 15;

      await expect(PecaService.alocaPeca(nome, quantidade)).rejects.toThrowError(new Error('Quantidade nao disponivel'));
    }
    );
  }
  );

  describe('adicionaPeca', () => {
    test('should add the amount of peca', async () => {
      const nome = 'peca1';
      const quantidade = 1;

      const pecaInstance = {
        id: 1,
        nome: "Peça",
        categoria: "peca1",
        tamanho: 10,
        peso: 10,
        fabricante: "fabricante",
        preco: 110,
        quantidade_disponivel: 10
      } as PecaProps;

      const pecaInstance2 = {
        id: 1,
        nome: "Peça",
        categoria: "peca1",
        tamanho: 10,
        peso: 10,
        fabricante: "fabricante",
        preco: 110,
        quantidade_disponivel: 11
      };

      (Peca.findOne as any).mockResolvedValue(pecaInstance);
      (Peca.update as any).mockResolvedValue(pecaInstance2);

      const peca = await PecaService.adicionaPeca(nome, quantidade);

      expect(Peca.findOne).toHaveBeenCalledWith({where: {nome: nome}});
      expect(peca).toEqual(pecaInstance2);
    }
    );
  }
  );*/