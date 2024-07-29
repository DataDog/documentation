---
app_id: sendmail
app_uuid: 8169d145-8d1f-4bb8-a4de-a0aa9aa84c0b
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: sendmail.queue.size
      metadata_path: metadata.csv
      prefix: sendmail.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10204
    source_type_name: Sendmail
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Communauté
  sales_email: david.bouchare@datadoghq.com
  support_email: david.bouchare@datadoghq.com
categories:
- metrics
- network
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/sendmail/README.md
display_on_public_website: true
draft: false
git_integration_title: sendmail
integration_id: sendmail
integration_title: Sendmail
integration_version: 1.0.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: sendmail
public_title: Sendmail
short_description: Intégration Sendmail pour surveiller les files d'attente d'e-mails
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Network
  - Supported OS::Linux
  configuration: README.md#Setup
  description: Intégration Sendmail pour surveiller les files d'attente d'e-mails
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Sendmail
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Présentation

Ce check permet de surveiller [Sendmail][1] avec l'Agent Datadog.

## Formule et utilisation

Le check Sendmail n'est pas inclus avec le package de l'[Agent Datadog][2] : vous devez donc l'installer.

### Liste des infrastructures

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Sendmail sur votre host. Consultez la section [Utiliser les intégrations de la communauté][3] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-sendmail==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][4] de base.

### Dépannage de la solution Browser

1. Modifiez le fichier `sendmail.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Sendmail. Consultez le [fichier d'exemple sendmail.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `sendmail` dans la section Checks.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "sendmail" >}}


### Aide

Sendmail n'inclut aucun événement.

### Aide
{{< get-service-checks-from-git "sendmail" >}}


## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][10].


[1]: https://www.proofpoint.com/us/open-source-email-solution
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/fr/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/sendmail/datadog_checks/sendmail/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/sendmail/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/sendmail/assets/service_checks.json
[10]: https://docs.datadoghq.com/fr/help/