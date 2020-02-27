---
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés de l'extension Diagnostics Azure.
doc_link: 'https://docs.datadoghq.com/integrations/azure_diagnostic_extension/'
git_integration_title: azure_diagnostic_extension
has_logo: true
integration_title: Extension Diagnostics Azure
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_diagnostic_extension
public_title: Intégration Datadog/Extension Diagnostics Azure
short_description: Surveillez des métriques clés de l'extension Diagnostics Azure.
version: '1.0'
---
## Présentation

L'extension Diagnostics Azure permet à un utilisateur de surveiller la santé d'une machine virtuelle en cours d'exécution sur Microsoft Azure.

L'intégration Datadog/Azure peut recueillir des métriques depuis l'extension Diagnostics Azure, mais nous vous [conseillons][5] d’[installer l'Agent Datadog sur vos machines virtuelles][4].

## Implémentation

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_diagnostic_extension" >}}


### Événements

L'intégration de l'extension Diagnostics Azure n'inclut aucun événement.

### Checks de service

L'intégration de l'extension Diagnostics Azure n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_diagnostic_extension/azure_analysis_services_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/
[4]: https://docs.datadoghq.com/fr/integrations/azure/#agent-installation
[5]: https://www.datadoghq.com/blog/dont-fear-the-agent/