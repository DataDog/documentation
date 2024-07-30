---
app_id: nn-sdwan
app_uuid: 8ff5c833-1498-4e63-9ef2-8deecf444d09
assets:
  dashboards:
    Netnology SD-WAN Overview: assets/dashboards/nn_sdwan_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - nn_sdwan.device_control_status
      - nn_sdwan.app_aware_routing.latency
      metadata_path: metadata.csv
      prefix: nn_sdwan.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Netnology SD-WAN
  monitors:
    High Latency Monitor: assets/monitors/high-latency-monitor.json
    Packet Loss Monitor: assets/monitors/packet-loss-monitor.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Netnology
  sales_email: info@netnology.io
  support_email: info@netnology.io
categories:
- network
- notification
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/nn_sdwan/README.md
display_on_public_website: true
draft: false
git_integration_title: nn_sdwan
integration_id: nn-sdwan
integration_title: Netnology Cisco SD-WAN
integration_version: 1.0.1
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: nn_sdwan
public_title: Netnology Cisco SD-WAN
short_description: Exportateur de métriques pour les contrôleurs Cisco SD-WAN
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Network
  - Category::Notification
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Exportateur de métriques pour les contrôleurs Cisco SD-WAN
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Netnology Cisco SD-WAN
---



## Présentation

Ce check surveille les contrôleurs Cisco SD-WAN via l'Agent Datadog. Il repose sur la plateforme SD-WAN fournie par [Netnology][1]. Il permet aux utilisateurs de surveiller l'intégrité du réseau et les performances de plusieurs contrôleurs Cisco SD-WAN à la fois. Les données recueillies servent ensuite à remplir des dashboards agrégés et à envoyer des notifications pour les alertes et monitors définis.

À l'heure actuelle, seuls les périphériques Cisco vManage sont pris en charge en tant que cibles de contrôleur SD-WAN.

## Configuration

L'intégration Netnology Cisco SD-WAN n'est pas incluse avec le package de l'[Agent Datadog][2] : vous devez donc l'installer manuellement.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check sur votre host. Consultez la section [Utiliser les intégrations de la communauté][3] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ``` bash
   datadog-agent integration install -t nn_sdwan==1.0.1
   ```

2. Configurez votre intégration comme une [intégration][4] de base.

### Configuration

1. Modifiez le fichier `nn_sdwan.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Cisco SD-WAN. Consultez le [fichier d'exemple nn_sdwan.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `nn_sdwan` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "nn_sdwan" >}}


### Événements

L'intégration Netnology Cisco SD-WAN n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "nn_sdwan" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].


[1]: https://netnology.io
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/fr/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/nn_sdwan/datadog_checks/nn_sdwan/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/nn_sdwan/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/nn_sdwan/assets/service_checks.json
[10]: https://docs.datadoghq.com/fr/help/