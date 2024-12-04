---
categories:
- azure
- cloud
- data stores
dependencies: []
description: Surveillez des métriques clés de Stockage Table Azure.
doc_link: https://docs.datadoghq.com/integrations/azure_table_storage/
draft: false
git_integration_title: azure_table_storage
has_logo: true
integration_id: azure-table-storage
integration_title: Stockage Table Microsoft Azure
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_table_storage
public_title: Intégration Datadog/Stockage Table Azure Microsoft
short_description: Surveillez des métriques clés de Stockage Table Azure.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Stockage Table Azure est un magasin de paires valeurs/clés NoSQL qui vous permet d'effectuer un développement rapide à l'aide de volumineux jeux de données semi-structurés.

Recueillez des métriques de Stockage Table Azure pour :

- Visualiser les performances de votre stockage de tables
- Corréler les performances de votre stockage de tables avec vos applications

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_table_storage" >}}


### Aide

L'intégration Stockage Table Azure n'inclut aucun événement.

### Aide

L'intégration Stockage Table Azure n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_table_storage/azure_table_storage_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/