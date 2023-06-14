import { Peca } from '../../Peca/models/Peca';
import { PecaServico } from '../models/PecaServico';
import PecaServicoService from './PecaServicoService';
import { Servico } from '../../Servico/models/Servico';

jest.mock('../models/PecaServico', () => ({
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

  describe('retornaPecasPorServico', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
        });
    test('método recebe um objeto com as informações da peça => chama o create com os dados corretos', async () => {
        const mockBodyPeca = [{
            id: 1,
            id_peca: 1,
            id_servico: 1,
            quantidade: 1,
        },
        {
            id: 2,
            id_peca: 2,
            id_servico: 2,
            quantidade: 2,
        }];
    
        (PecaServico.findAll as any).mockResolvedValue(mockBodyPeca[0]);

        const pecaServico = await PecaServicoService.retornaPecasPorServico(1);
    
        expect(PecaServico.findAll).toHaveBeenCalledWith(
          {
            where: {
                id_servico: 1
            },
            include: [
                {
                    model: Peca,
                    attributes: ['nome', 'preco', 'tamanho', 'peso']
                },
                {
                    model: Servico,
                    attributes: ['status']
                }
            ]
        }
        );
        expect(pecaServico).toEqual(mockBodyPeca[0]);
      });
    });

    describe('retorna todas PecasServico', () => {
        beforeEach(() => {
            jest.resetAllMocks();
            jest.clearAllMocks();
            });
        test('método recebe um objeto com as informações da peça => chama o create com os dados corretos', async () => {
            const mockBodyPeca = [{
                id: 1,
                id_peca: 1,
                id_servico: 1,
                quantidade: 1,
            },
            {
                id: 2,
                id_peca: 2,
                id_servico: 2,
                quantidade: 2,
            }];
        
            (PecaServico.findAll as any).mockResolvedValue(mockBodyPeca);
    
            const pecaServico = await PecaServicoService.retornaTodasPecasServico();
        
            expect(PecaServico.findAll).toHaveBeenCalled();
            expect(pecaServico).toEqual(mockBodyPeca);
          });
        });