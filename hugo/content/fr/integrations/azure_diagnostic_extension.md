---
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés de l'extension Diagnostics Azure.
doc_link: https://docs.datadoghq.com/integrations/azure_diagnostic_extension/
draft: false
git_integration_title: azure_diagnostic_extension
has_logo: true
integration_id: ''
integration_title: Extension Diagnostics Azure
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_diagnostic_extension
public_title: Intégration Datadog/Extension Diagnostics Azure
short_description: Surveillez des métriques clés de l'extension Diagnostics Azure.
version: '1.0'
---
## Présentation

L'extension Diagnostics Azure permet à un utilisateur de surveiller la santé d'une machine virtuelle en cours d'exécution sur Microsoft Azure.

L'intégration Datadog/Azure peut recueillir des métriques depuis l'extension Diagnostics Azure, mais nous vous [conseillons][1] d’[installer l'Agent Datadog sur vos machines virtuelles][2].

## Implémentation

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][3]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_diagnostic_extension" >}}


### Événements

L'intégration de l'extension Diagnostics Azure n'inclut aucun événement.

### Checks de service

L'intégration de l'extension Diagnostics Azure n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://www.datadoghq.com/blog/dont-fear-the-agent/
[2]: https://docs.datadoghq.com/fr/integrations/azure/#agent-installation
[3]: https://docs.datadoghq.com/fr/integrations/azure/
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_diagnostic_extension/azure_analysis_services_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/