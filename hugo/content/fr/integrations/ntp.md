---
app_id: ntp
app_uuid: 399b74d9-ece5-4517-ae16-c05cac6911b2
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: ntp.offset
      metadata_path: metadata.csv
      prefix: ntp.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: NTP
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- web
- network
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ntp/README.md
display_on_public_website: true
draft: false
git_integration_title: ntp
integration_id: ntp
integration_title: NTP
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: ntp
public_title: NTP
short_description: Recevez des alertes lorsque vos hosts se désynchronisent du serveur
  NTP de votre choix.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Web
  - Category::Network
  configuration: README.md#Setup
  description: Recevez des alertes lorsque vos hosts se désynchronisent du serveur
    NTP de votre choix.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: NTP
---



## Présentation

L'intégration Network Time Protocol (NTP) est activée par défaut et transmet les décalages temporels avec un serveur NTP toutes les 15 minutes. Lorsque l'Agent local est décalé de plus de 15 secondes par rapport au service Datadog et aux autres hosts surveillés, vous risquez de rencontrer les problèmes suivants :

- Déclencheurs d'alertes non valides
- Retards de métriques
- Intervalles vides dans les graphiques de métriques

Par défaut, le check détecte le fournisseur de cloud sur lequel l'Agent est exécuté, et utilise le serveur NTP privé de ce fournisseur, le cas échéant. Si aucun fournisseur de cloud n'est détecté, l'Agent utilise par défaut les serveurs NTP ci-dessous :

- `0.datadog.pool.ntp.org`
- `1.datadog.pool.ntp.org`
- `2.datadog.pool.ntp.org`
- `3.datadog.pool.ntp.org`

**Remarque** : les requêtes NTP ne prennent par en charge les paramètres de proxy.

## Configuration

### Installation

Le check NTP est inclus avec le package de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos serveurs.

### Configuration

L'Agent active le check NTP par défaut. Pour configurer vous-même le check, modifiez le fichier `ntp.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2]. Consultez le [fichier d'exemple ntp.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

**Remarque** : si vous modifiez le fichier de configuration du check Datadog/NTP, [redémarrez l'Agent][4] pour prendre en compte le changement de configuration.

### Validation

[Lancez la sous-commande `status` de l'Agent][5] et cherchez `ntp` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "ntp" >}}


### Événements

Le check NTP n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "ntp" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/ntp.d/conf.yaml.default
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/ntp/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/ntp/assets/service_checks.json
[8]: https://docs.datadoghq.com/fr/help/