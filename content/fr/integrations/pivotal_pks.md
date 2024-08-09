---
app_id: pivotal-pks
app_uuid: e8a08b96-bbca-4907-8cc8-b7c3abf2f443
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10034
    source_type_name: Pivotal PKS
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- containers
- kubernetes
- log collection
- network
- orchestration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/pivotal_pks/README.md
display_on_public_website: true
draft: false
git_integration_title: pivotal_pks
integration_id: pivotal-pks
integration_title: Pivotal Container Service
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: pivotal_pks
public_title: Pivotal Container Service
short_description: Offre Kubernetes pour entreprises proposée par Pivotal.
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::Log Collection
  - Category::Network
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Offre Kubernetes pour entreprises proposée par Pivotal.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Pivotal Container Service
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Présentation

L'intégration surveille les clusters [Pivotal Container Service][1].

## Formule et utilisation

Puisque la plateforme Datadog s'intègre déjà à Kubernetes, elle peut tout de suite surveiller le service Pivotal Kubernetes Service (PKS). Vous pouvez utiliser le [carré Datadog Cluster Monitoring][2] conjointement avec cette intégration pour surveiller votre cluster.

Installez l'Agent Datadog sur chaque VM ne correspondant pas à un worker dans votre environnement PKS. Si vous n'avez pas installé le service Pivotal Application Service (PAS) dans vos environnements, sélectionnez la section `Resource Config` du carré, puis définissez le paramètre `instances` de `datadog-firehose-nozzle` sur `0`.

### Collecte de métriques

La surveillance de PKS nécessite la configuration de l'intégration Datadog pour [Kubernetes][3].

### APM

_Disponible à partir des versions > 6.0 de l'Agent_

La configuration est identique à celle de Kubernetes. Pour lancer la collecte des logs depuis tous vos conteneurs, utilisez les [variables d'environnement][4] de l'Agent Datadog.

Vous pouvez également tirer parti des DaemonSets pour [déployer automatiquement l'Agent Datadog sur l'ensemble de vos nœuds][5].

Suivez les [étapes de collecte de logs de conteneur][6] pour en savoir plus sur ces variables d'environnement et découvrir les options de configuration avancées.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][7].

[1]: https://pivotal.io/platform/pivotal-container-service
[2]: https://network.pivotal.io/products/datadog
[3]: https://docs.datadoghq.com/fr/integrations/kubernetes/
[4]: https://docs.datadoghq.com/fr/agent/basic_agent_usage/kubernetes/#log-collection-setup
[5]: https://docs.datadoghq.com/fr/agent/basic_agent_usage/kubernetes/#container-installation
[6]: https://docs.datadoghq.com/fr/logs/log_collection/docker/#option-2-container-installation
[7]: https://docs.datadoghq.com/fr/help/