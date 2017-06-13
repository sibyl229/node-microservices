import GeneExpressionWidget from './widgets/GeneExpressionWidget';

export default {
  gene: {
    id: 'gene',
    widgets: [
      {
        id: 'overview'
      },
      {
        id: 'expression',
        render: GeneExpressionWidget
      },
      {
        id: 'external_links'
      },
      {
        id: 'gene_ontology'
      },
      {
        id: 'history'
      },
      {
        id: 'homology'
      },
      {
        id: 'interactions'
      },
      {
        id: 'mapping_data'
      },
      {
        id: 'location'
      },
      {
        id: 'phenotypes'
      },
      {
        id: 'phenotype_graph'
      },
      {
        id: 'reagent'
      },
      {
        id: 'references'
      },
      {
        id: 'sequences'
      },
      {
        id: 'feature'
      },
      {
        id: 'human_diseases'
      }
    ]
  }
}
