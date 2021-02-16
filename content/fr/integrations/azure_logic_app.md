---
categories:
  - cloud
  - configuration & deployment
  - network
  - azure
ddtype: crawler
dependencies: []
description: 'Surveillez les workflows de déclenchement, la latence des actions, les actions échouées, et plus encore.'
doc_link: 'https://docs.datadoghq.com/integrations/azure_logic_app/'
draft: false
git_integration_title: azure_logic_app
has_logo: true
integration_title: Microsoft Azure Logic App
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_logic_app
public_title: Intégration Datadog/Microsoft Azure Logic App
short_description: 'Surveillez les workflows de déclenchement, la latence des actions, les actions échouées, et plus encore.'
version: '1.0'
---
## Présentation

Logic App permet aux développeurs de concevoir des workflows structurant la finalité via un déclencheur et une série d'étapes.

Recueillez des métriques d'Azure Logic App pour :

- Visualiser les performances de vos workflows Logic App
- Corréler les performances de vos workflows Logic App avec vos applications

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_logic_app" >}}


### Événements

L'intégration Azure Logic App n'inclut aucun événement.

### Checks de service

L'intégration Azure Logic App n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_logic_app/azure_logic_app_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/