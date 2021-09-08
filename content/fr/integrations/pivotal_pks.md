---
assets:
  dashboards: {}
  logs: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - containers
  - orchestration
  - log collection
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/pivotal_pks/README.md
display_name: "Pivotal\_PKS"
draft: false
git_integration_title: pivotal_pks
guid: b0090603-01c8-4ad9-8f9a-4f3700bf065b
integration_id: pivotal-pks
integration_title: Pivotal Container Service
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
name: pivotal_pks
public_title: Intégration Datadog/Pivotal Container Service
short_description: Offre Kubernetes pour entreprises proposée par Pivotal.
support: core
supported_os:
  - linux
  - mac_os
---
## Présentation

L'intégration surveille les clusters [Pivotal Container Service][1].

## Configuration

Étant donné que Datadog s'intègre déjà à Kubernetes, la plateforme est prête pour la surveillance de PKS.

### Collecte de métriques

La surveillance de PKS nécessite la configuration de l'intégration Datadog pour [Kubernetes][2].

### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La configuration est identique à celle de Kubernetes. 
Pour lancer la collecte des logs depuis tous vos conteneurs, utilisez les [variables d'environnement][3] de votre Agent Datadog.

Vous pouvez également tirer parti des DaemonSets pour [déployer automatiquement l'Agent Datadog sur l'ensemble de vos nœuds][4]. 

Suivez les [étapes de collecte de logs de conteneur][5] pour en savoir plus sur ces variables d'environnement et découvrir les options de configuration avancées.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://pivotal.io/platform/pivotal-container-service
[2]: https://docs.datadoghq.com/fr/integrations/kubernetes/
[3]: https://docs.datadoghq.com/fr/agent/basic_agent_usage/kubernetes/#log-collection-setup
[4]: https://docs.datadoghq.com/fr/agent/basic_agent_usage/kubernetes/#container-installation
[5]: https://docs.datadoghq.com/fr/logs/log_collection/docker/#option-2-container-installation
[6]: https://docs.datadoghq.com/fr/help/