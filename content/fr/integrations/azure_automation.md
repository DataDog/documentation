---
categories:
- automation
- azure
- cloud
dependencies: []
description: Surveillez des métriques clés d'Azure Automation.
doc_link: https://docs.datadoghq.com/integrations/azure_automation/
draft: false
git_integration_title: azure_automation
has_logo: true
integration_id: azure-automation
integration_title: Microsoft Azure Automation
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_automation
public_title: Intégration Datadog/Microsoft Azure Automation
short_description: Surveillez des métriques clés d'Azure Automation.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Azure Automation offre un service d'automatisation et de configuration cloud permettant une gestion cohérente de vos environnements Azure et non-Azure.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques d'Azure Automation.

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_automation" >}}


### Aide

L'intégration Azure Automation n'inclut aucun événement.

### Aide

L'intégration Azure Automation n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_automation/azure_automation_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/