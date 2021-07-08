---
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - network
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/ntp/README.md'
display_name: NTP
draft: false
git_integration_title: ntp
guid: 9d105f8c-7fd3-48d7-a5d1-1cc386ec0367
integration_id: ntp
integration_title: NTP
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ntp.
metric_to_check: ntp.offset
name: ntp
public_title: Intégration Datadog/NTP
short_description: Recevez des alertes lorsque vos hosts se désynchronisent du serveur NTP de votre choix.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

L'intégration Network Time Protocol (NTP) est activée par défaut et signale les décalages temporels avec un serveur NTP toutes les 15 minutes. Lorsque l'Agent local est décalé de plus de 15 secondes par rapport au service Datadog et aux autres hosts surveillés, vous risquez de rencontrer les problèmes suivants :

- Déclencheurs d'alertes non valides
- Retards de métriques
- Intervalles vides dans les graphiques de métriques

Par défaut, le check détecte le fournisseur de cloud sur lequel l'Agent est exécuté, et utilise le serveur NTP privé de ce fournisseur, le cas échéant. Si aucun fournisseur de cloud n'est détecté, l'Agent utilise par défaut les serveurs NTP ci-dessous :

- `0.datadog.pool.ntp.org`
- `1.datadog.pool.ntp.org`
- `2.datadog.pool.ntp.org`
- `3.datadog.pool.ntp.org`

## Configuration

### Installation

Le check NTP est inclus avec le package de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos serveurs.

### Configuration

L'Agent active le check NTP par défaut. Si toutefois vous souhaitez le configurer vous-même, modifiez le fichier `ntp.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2]. Consultez le [fichier d'exemple ntp.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

**Remarque** : si vous modifiez le fichier de configuration du check Datadog/NTP, [redémarrez l'Agent][4] pour prendre en compte le changement de configuration.

### Validation

[Lancez la sous-commande `status` de l'Agent][5] et cherchez `ntp` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "ntp" >}}


### Événements

Le check NTP n'inclut aucun événement.

### Checks de service

**ntp.in_sync** :<br>
Renvoie `CRITICAL` si le décalage avec NTP est supérieur au seuil indiqué dans `ntp.yaml`. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][7].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/ntp.d/conf.yaml.default
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/ntp/metadata.csv
[7]: https://docs.datadoghq.com/fr/help/