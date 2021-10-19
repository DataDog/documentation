---
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Azure Functions.
doc_link: 'https://docs.datadoghq.com/integrations/azure_functions/'
draft: false
git_integration_title: azure_functions
has_logo: true
integration_id: ''
integration_title: Microsoft Azure Functions
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_functions
public_title: "Intégration Datadog/Microsoft\_Azure Functions"
short_description: Surveillez des métriques clés d'Azure Functions.
version: '1.0'
---
## Présentation

Azure Functions est une plateforme de calcul sans serveur basée sur les événements qui peut aussi résoudre des problèmes d’orchestration complexes. Créez et débuguez localement sans configuration supplémentaire, procédez au déploiement et opérez à l’échelle dans le cloud, et intégrez des services à l’aide de déclencheurs et de liaisons.

Recueillez des métriques d'Azure Functions pour :

- Visualiser les performances et l'utilisation de vos fonctions
- Corréler les performances de vos fonctions Azure avec vos autres applications

## Implémentation

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_functions" >}}


### Événements

L'intégration Azure Functions n'inclut aucun événement.

### Checks de service

L'intégration Azure Functions n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_functions/azure_functions_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/