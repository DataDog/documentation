---
app_id: system
app_uuid: 17477b56-4487-4b00-8820-70c6f64ae3c6
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: system.inodes.total
      metadata_path: metadata.csv
      prefix: system.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Linux proc extras
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/linux_proc_extras/README.md
display_on_public_website: true
draft: false
git_integration_title: linux_proc_extras
integration_id: system
integration_title: Linux Proc Extras
integration_version: 2.5.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: linux_proc_extras
public_title: Linux Proc Extras
short_description: Visualiser et surveiller les états de linux_proc_extras.
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::OS & System
  configuration: README.md#Setup
  description: Visualiser et surveiller les états de linux_proc_extras.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Linux Proc Extras
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Présentation

Recueillez des métriques du service linux_proc_extras en temps réel pour :

- Visualiser et surveiller les états de linux_proc_extras
- Être informé des failovers et des événements de linux_proc_extras.

## Formule et utilisation

### Installation

Le check Linux_proc_extras est inclus avec le package de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos serveurs.

### Dépannage de la solution Browser

1. Modifiez le fichier `linux_proc_extras.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2]. Consultez le [fichier d'exemple linux_proc_extras.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][4].

### Validation

[Lancez la sous-commande status de l'Agent][5] et cherchez `linux_proc_extras` dans la section Checks.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "linux_proc_extras" >}}


### Aide

Le check Linux Proc Extras n'inclut aucun événement.

### Aide

Le check Linux Proc Extras n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][7].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/linux_proc_extras/datadog_checks/linux_proc_extras/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/linux_proc_extras/metadata.csv
[7]: https://docs.datadoghq.com/fr/help/