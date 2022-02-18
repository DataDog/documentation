---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - Collaboration
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/sendmail/README.md
display_name: Sendmail
draft: false
git_integration_title: sendmail
guid: 4d4f72c7-c8c5-4e7a-b281-32c2d462c7c8
integration_id: sendmail
integration_title: Sendmail
integration_version: 1.0.0
is_public: true
kind: integration
maintainer: david.bouchare@datadoghq.com
manifest_version: 1.0.0
metric_prefix: sendmail.
metric_to_check: sendmail.queue.size
name: sendmail
public_title: Intégration Datadog/Sendmail
short_description: Intégration Sendmail pour surveiller les files d'attente d'e-mails
support: contrib
supported_os:
  - linux
---
## Présentation

Ce check permet de surveiller [Sendmail][1] avec l'Agent Datadog.

## Configuration

Le check Sendmail n'est pas inclus avec le package de l'[Agent Datadog][2] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Sendmail sur votre host. Consultez la section [Utiliser les intégrations de la communauté][3] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-sendmail==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][4] de base.

### Configuration

1. Modifiez le fichier `sendmail.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Sendmail. Consultez le [fichier d'exemple sendmail.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `sendmail` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "sendmail" >}}


### Événements

Sendmail n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "sendmail" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].


[1]: https://www.proofpoint.com/us/open-source-email-solution
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/fr/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/sendmail/datadog_checks/sendmail/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/sendmail/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/sendmail/assets/service_checks.json
[10]: https://docs.datadoghq.com/fr/help/