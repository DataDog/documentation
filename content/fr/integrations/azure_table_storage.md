---
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés de Stockage Table Azure.
doc_link: 'https://docs.datadoghq.com/integrations/azure_table_storage/'
draft: false
git_integration_title: azure_table_storage
has_logo: true
integration_id: azure-table-storage
integration_title: Stockage Table Microsoft Azure
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_table_storage
public_title: Intégration Datadog/Stockage Table Azure Microsoft
short_description: Surveillez des métriques clés de Stockage Table Azure.
version: '1.0'
---
## Présentation

Stockage Table Azure est un magasin de paires valeurs/clés NoSQL qui vous permet d'effectuer un développement rapide à l'aide de volumineux jeux de données semi-structurés.

Recueillez des métriques de Stockage Table Azure pour :

- Visualiser les performances de votre stockage de tables
- Corréler les performances de votre stockage de tables avec vos applications

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_table_storage" >}}


### Événements

L'intégration Stockage Table Azure n'inclut aucun événement.

### Checks de service

L'intégration Stockage Table Azure n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_table_storage/azure_table_storage_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/