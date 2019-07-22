---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/pdh_check/README.md'
display_name: PDH
git_integration_title: pdh_check
guid: D09B3410-00A0-4789-ABD7-7740C3FE211F
integration_id: pdh
integration_title: Check Pdh
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: pdh.
name: pdh_check
public_title: Intégration Datadog/Check Pdh
short_description: Recueillez et représentez graphiquement des counters de performance Windows
support: core
supported_os:
  - windows
---
## Présentation

Recueillez des métriques à partir des counters de performances Windows en temps réel pour :

* Visualiser et surveiller les counters de performance Windows via l'API PDH

## Implémentation
### Installation

Le check PDH est inclus avec le paquet de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos serveurs.

### Configuration

Modifiez le fichier `pdh_check.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2] pour commencer à recueillir vos données de performance Windows. Consultez le [fichier d'exemple pdh_check.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

### Validation

[Lancez la sous-commande `status` de l'Agent][4] et cherchez `pdh_check` dans la section Checks.

## Données collectées
### Métriques
Consultez [metadata.csv][5] pour découvrir la liste complète des métriques fournies par cette intégration.

### Événements
Le check PDH ne comprend aucun événement.

### Checks de service
Le check PDH n'inclut aucun check de service.


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/pdh_check/datadog_checks/pdh_check/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/pdh_check/metadata.csv


{{< get-dependencies >}}