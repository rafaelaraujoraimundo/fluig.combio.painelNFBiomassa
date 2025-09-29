import { Component, OnInit } from '@angular/core';
import { FluigService } from './services/fluig.service';
import { PoSearchFilterMode } from '@po-ui/ng-components';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  filterType: PoSearchFilterMode = PoSearchFilterMode.contains;
  // Array de itens para exibição na tabela
  public items: any[] = [];
  // Array de colunas (definindo as propriedades e os rótulos da tabela)
  public columns: any[] = [];
  // Boolean para controlar o overlay de carregamento
  public bLoading: boolean = false;

  constructor(private fluigService: FluigService) {}

  ngOnInit(): void {
    // Configura as colunas da tabela
    this.setColumns();
    // Carrega os dados do dataset assim que o componente inicializa
    this.loadData();
  }

  /**
   * Define as colunas da tabela, mapeando as chaves do dataset para rótulos amigáveis.
   */
  setColumns(): void {
    this.columns = [
      { property: 'tipo_doc', label: 'Tipo Documento' },
      { property: 'cod_lotacao', label: 'Código Lotação' },
      { property: 'desc_lotacao', label: 'Descrição Lotação' },
      { property: 'aprovador_datasul', label: 'Aprovador Datasul' },
      { property: 'validacao', label: 'Validação' },
      { property: 'ate_10_mil', label: 'Até 10 Mil' },
      { property: 'ate_100_mil', label: 'Até 100 Mil' },
      { property: 'ate_1_milhao', label: 'Até 1 Milhão' },
      { property: 'acima_1_milhao', label: 'Acima de 1 Milhão' }
    ];
  }

  /**
   * Realiza a chamada ao dataset "ds_painel_mla" e popula o array de itens.
   */
  loadData(): void {
    this.bLoading = false;
    // Chamada ao serviço que retorna os dados do dataset.
    // Caso seja necessário passar parâmetros, eles podem ser informados no objeto abaixo.
    this.fluigService.getDataset('ds_painel_mla')
      .subscribe(
        (data: any) => {
          // Verifica se os dados retornados possuem o formato esperado
          if (data && data.content && data.content.values) {
            this.items = data.content.values;
          } else {
            this.items = [];
          }
          this.bLoading = true;
        },
        error => {
          console.error('Erro ao carregar os dados do dataset:', error);
          this.bLoading = true;
        }
      );
  }

  /**
   * Método para exportar os dados exibidos para Excel.
   * Implemente aqui a lógica utilizando, por exemplo, a biblioteca exceljs ou outra de sua preferência.
   */
  exportToExcel(): void {
    // Exemplo: A implementação pode variar conforme a biblioteca adotada.
    console.log("Exportação para Excel não implementada.");
  }

    // ======================================================================
  //  TABELA 1: Faixas de Valores Pedidos de Compras Padrão
  // ======================================================================
  public columnsPadrao = [
    { property: 'faixa',         label: 'Faixas'        },
    { property: 'valorInicial',  label: 'Valor Inicial' },
    { property: 'valorFinal',    label: 'Valor Final'   },
    { property: 'aprovacao',     label: 'Aprovação'     }
  ];

  public itemsPadrao = [
    { faixa: 'SC',                valorInicial: 'R$ 0,01',        valorFinal: 'R$ 9.999,99',   aprovacao: 'Gestor/Super./Coord.' },
    { faixa: 'PC Faixa 0 fluig',  valorInicial: 'R$ 0,01',        valorFinal: 'R$ 1.000,00',   aprovacao: 'Supervisor ADM'       },
    { faixa: 'PC Faixa 1',        valorInicial: 'R$ 1.000,01',    valorFinal: 'R$ 10.000,00',  aprovacao: 'Coordenador'              },
    { faixa: 'PC Faixa 2',        valorInicial: 'R$ 10.000,01',   valorFinal: 'R$ 100.000,00', aprovacao: 'Gerente'              },
    { faixa: 'PC Faixa 3',        valorInicial: 'R$ 100.000,01',  valorFinal: 'R$ 999.999,99', aprovacao: 'Diretor'        },
    { faixa: 'PC Faixa 4',        valorInicial: 'R$ 1.000.000,00',valorFinal: 'em diante',     aprovacao: 'CFO + C-Level'      }
  ];

  // ======================================================================
  //  TABELA 2: Faixas de Valores Pedidos de Compras Biomassa (exc. Manutenção)
  // ======================================================================
  public columnsBiomassa = [
    { property: 'faixa',         label: 'Faixas'        },
    { property: 'valorInicial',  label: 'Valor Inicial' },
    { property: 'valorFinal',    label: 'Valor Final'   },
    { property: 'aprovacao',     label: 'Aprovação'     }
  ];

  public itemsBiomassa = [
    { faixa: 'SC',                valorInicial: 'R$ 0,01',        valorFinal: 'R$ 9.999,99',   aprovacao: 'Gerente de Unidade'    },
    { faixa: 'PC Faixa 0 fluig',  valorInicial: 'R$ 0,01',        valorFinal: 'R$ 1.000,00',   aprovacao: 'Supervisor ADM'        },
    { faixa: 'PC Faixa 1',        valorInicial: 'R$ 1.000,01',    valorFinal: 'R$ 10.000,00',  aprovacao: 'Coordenador'           },
    { faixa: 'PC Faixa 2',        valorInicial: 'R$ 10.000,01',   valorFinal: 'R$ 100.000,00', aprovacao: 'Gerente'               },
    { faixa: 'PC Faixa 3',        valorInicial: 'R$ 100.000,01',  valorFinal: 'R$ 999.999,99', aprovacao: 'Diretor'               },
    { faixa: 'PC Faixa 4',        valorInicial: 'R$ 1.000.000,00',valorFinal: 'em diante',     aprovacao: 'CFO + C-Level'         }
  ];

}
