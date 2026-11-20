---
app_id: azure-arc
app_uuid: 0afa2450-f495-4e18-bdd7-c1cd43e3aebf
assets:
  dashboards:
    azure_arc: assets/dashboards/azure_arc.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.arc_vm.count
      metadata_path: metadata.csv
      prefix: azure.arc_
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 801
    source_type_name: Arc azur
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- azure
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_arc
integration_id: azure-arc
integration_title: Arc azur
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_arc
public_title: Arc azur
short_description: Surveillez des métriques clés d'Azure Arc.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Surveillez des métriques clés d'Azure Arc.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/azure-arc-integration/
  support: README.md#Support
  title: Arc azur
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

Azure Arc est un pont qui étend la plateforme Azure pour vous permettre de créer des applications et des services exécutables dans des centres de données, en périphérie et dans des environnements multicloud.

Utilisez l'intégration Azure Arc pour :

- Recueillir le statut de connectivité, les tags et d'autres informations sur vos clusters Kubernetes et serveurs Azure Arc
- Pour les serveurs gérés avec Arc et surveillés avec l'Agent Datadog, propager les tags Azure Arc vers le host dans Datadog ainsi que ses métriques et logs associés
- Pour les serveurs gérés avec Arc et surveillés avec l'intégration AWS ou GCP, propager les tags Azure Arc vers le host dans Datadog ainsi que ses métriques cloud et logs associés
- Obtenir instantanément des analyses et des synthèses des données ci-dessus grâce au dashboard prêt à l'emploi pour Azure Arc

Vous pouvez également utiliser l'extension Datadog pour configurer et déployer l'Agent Datadog sur des serveurs Arc. Pour en savoir plus sur cette possibilité, consultez la page [Extension Virtual Machine Datadog][1].

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][2]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure-arc" >}}


### Événements

L'intégration Azure Arc n'inclut aucun événement.

### Checks de service

L'intégration Azure Arc n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

[Monitor votre infrastructure hybride Azure Arc avec Datadog][5]

[1]: https://docs.datadoghq.com/fr/integrations/guide/powershell-command-to-install-azure-datadog-extension/#install-on-azure-arc
[2]: https://docs.datadoghq.com/fr/integrations/azure/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_arc/azure_arc_metadata.csv
[4]: https://docs.datadoghq.com/fr/help/
[5]: https://www.datadoghq.com/blog/azure-arc-integration/