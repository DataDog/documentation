---
app_id: unifi-console
app_uuid: 224a050d-7ed3-4e7a-ada6-410f61393fc0
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: unifi.device.status
      metadata_path: metadata.csv
      prefix: unifi.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10298
    source_type_name: Unifi Console
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Communauté
  sales_email: antonin.bruneau@gmail.com
  support_email: antonin.bruneau@gmail.com
categories: []
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/unifi_console/README.md
display_on_public_website: true
draft: false
git_integration_title: unifi_console
integration_id: unifi-console
integration_title: Unifi Console
integration_version: 1.2.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: unifi_console
public_title: Unifi Console
short_description: Ce check recueille des métriques à partir du contrôleur Unifi.
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
  configuration: README.md#Setup
  description: Ce check recueille des métriques à partir du contrôleur Unifi.
  media: []
  overview: README.md#Overview
  support: README.md#Troubleshooting
  title: Unifi Console
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Présentation

Ce check permet de surveiller [Unifi Console][1] avec l'Agent Datadog.

## Formule et utilisation

Le check Unifi n'est pas inclus avec le package de l'[Agent Datadog][2] : vous devez donc l'installer.

### Liste des infrastructures

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Unifi sur votre host. Consultez la section [Utiliser les intégrations de la communauté][3] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   sudo -u dd-agent -- datadog-agent integration install -t datadog-unifi_console==1.2.0
   ```

2. Configurez votre intégration comme une [intégration][4] de base.

### Dépannage de la solution Browser

1. Modifiez le fichier `unifi_console.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Unifi. Consultez le [fichier d'exemple unifi_console.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `unifi_console` dans la section Checks.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "unifi_console" >}}


### Aide

L'intégration Unifi Console n'inclut aucun événement.

### Aide
{{< get-service-checks-from-git "unifi_console" >}}



## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][10].


[1]: https://ui.com/consoles
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/fr/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/unifi_console/datadog_checks/unifi_console/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/unifi_console/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/unifi_console/assets/service_checks.json
[10]: https://docs.datadoghq.com/fr/help/