---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Exchange Server Overview: assets/dashboards/overview.json
  logs:
    source: exchange-server
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/exchange_server/README.md'
display_name: "Exchange\_Server"
draft: false
git_integration_title: exchange_server
guid: 7bc177b0-b07d-4a83-921f-9cd8deef039b
integration_id: exchange-server
integration_title: "Microsoft\_Exchange\_Server"
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: exchange.
metric_to_check: exchange.processor.cpu_user
name: exchange_server
public_title: "Intégration Datadog/Microsoft\_Exchange\_Server"
short_description: "Recueillez et représentez graphiquement des métriques de Microsoft Exchange\_Server."
support: core
supported_os:
  - windows
---
## Présentation

Recueillez des métriques de Microsoft Exchange Server pour :

- Visualiser et surveiller les performances d'Exchange Server

## Configuration

### Installation

Le check Exchange est inclus avec le package de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos serveurs.

### Configuration

1. Modifiez le fichier `exchange_server.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2] pour commencer à recueillir vos données de performance Exchange Server.

2. [Redémarrez l'Agent][3].

### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `exchange_server.d/conf.yaml` pour commencer à recueillir vos logs Exchange Server :

   ```yaml
   logs:
     - type: file
       path: "C:\\Program Files\\Microsoft\\Exchange Server\\V15\\TransportRoles\\Logs\\CommonDiagnosticsLog\\*"
       source: exchange-server
     - type: file
       path: "C:\\Program Files\\Microsoft\\Exchange Server\\V15\\TransportRoles\\Logs\\ThrottlingService\\*"
       source: exchange-server
     - type: file
       path: "C:\\Program Files\\Microsoft\\Exchange Server\\V15\\TransportRoles\\Logs\\Hub\\Connectivity\\*"
       source: exchange-server
   ```
    *Remarque* : actuellement, les logs CommonDiagnosticsLog, ThrottlingService et Connectivity sont les seuls logs pris en charge
    du fait qu'Exchange Server génère de nombreux types de logs différents.
    Si vous souhaitez que d'autres types de logs soient pris en charge, contactez l'assistance.

   Modifiez la valeur du paramètre `path` et configurez-la pour votre environnement.
   Consultez le [fichier d'exemple exchange_server.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][3].


### Validation

[Lancez la sous-commande status de l'Agent][5] et cherchez `exchange_server` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "exchange_server" >}}


### Événements

Le check Exchange Server n'inclut aucun événement.

### Checks de service

Le check Exchange Server n'inclut aucun check de service.

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/integrations-core/blob/master/exchange_server/datadog_checks/exchange_server/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/exchange_server/metadata.csv