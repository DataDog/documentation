---
categories:
- cloud
- configuration & deployment
- network
- azure
dependencies: []
description: Surveillez les workflows de déclenchement, la latence des actions, les
  actions échouées, et plus encore.
doc_link: https://docs.datadoghq.com/integrations/azure_logic_app/
draft: false
git_integration_title: azure_logic_app
has_logo: true
integration_id: azure-logic-app
integration_title: Microsoft Azure Logic App
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_logic_app
public_title: Intégration Datadog/Microsoft Azure Logic App
short_description: Surveillez les workflows de déclenchement, la latence des actions,
  les actions échouées, et plus encore.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Logic App permet aux développeurs de concevoir des workflows structurant une finalité via un déclencheur et une série d'étapes.

Recueillez des métriques d'Azure Logic App pour :

- Visualiser les performances de vos workflows Logic App
- Corréler les performances de vos workflows Logic App avec vos applications

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_logic_app" >}}


### Aide

L'intégration Azure Logic App n'inclut aucun événement.

### Aide

L'intégration Azure Logic App n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_logic_app/azure_logic_app_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/