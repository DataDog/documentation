---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - caching
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/squid/README.md'
display_name: Squid
git_integration_title: squid
guid: e7d4b233-b32a-46f9-8cb2-c582ee8fd251
integration_id: squid
integration_title: Squid
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: squid.
metric_to_check: squid.cachemgr.cpu_time
name: squid
public_title: Intégration Datadog/Squid
short_description: Surveillez les métriques de vos serveurs squid-cache avec Datadog
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller les métriques [Squid][1] issues du Cache Manager avec l'Agent Datadog.

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check Squid de l'Agent est inclus avec l'[Agent Datadog][2]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Modifiez le fichier `squid.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3]. Consultez le [fichier d'exemple squid.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][5].

### Validation

[Lancez la sous-commande `status` de l'Agent][6] et cherchez `squid` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "squid" >}}


### Événements

Le check Squid n'inclut aucun événement.

### Checks de service

**squid.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à Squid pour recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][7].




{{< get-dependencies >}}
[1]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/squid/datadog_checks/squid/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/fr/help
