---
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/exchange_server/README.md'
display_name: "Exchange\_Server"
git_integration_title: exchange_server
guid: 7bc177b0-b07d-4a83-921f-9cd8deef039b
integration_id: exchange-server
integration_title: "Microsoft\_Exchange\_Server"
is_public: true
kind: integration
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

* Visualiser et surveiller les performances d'Exchange Server

## Implémentation
### Installation

Le check Exchange est inclus avec le paquet de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos serveurs.

### Configuration

1. Modifiez le fichier `exchange_server.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2] pour commencer à recueillir vos données de performance Exchange Server.
  ```yaml
  init_config:

  instances:
    # "." means the current host
    - host: .
    #
    #   The additional metrics is a list of additional counters to collect.  The
    #   list is formatted as follows:
    #   ['<counterset name>', <counter instance name>, '<counter name>', <metric name>, <metric type>]
    #
    #   <counterset name>  is the name of the PDH Counter Set (the name of the counter)
    #   <counter instance name> is the specific counter instance to collect, for example
    #           "Default Web Site".  Specify 'none' For all instances of the counter.
    #   <counter name> is the individual counter to report
    #   <metric name> is the name you want to show up in Datadog
    #   <metric type> is from the standard choices for all agent checks, such as gauge,
    #       rate, histogram or counter
    #
    #   additional_metrics:
    #     - - MSExchange Content Filter Agent
    #       - none
    #       - Messages that Bypassed Scanning
    #       - exchange.content_filter.bypassed_messages
    #       - gauge
  ```

2. [Redémarrez l'Agent][3].

### Validation

[Lancez la sous-commande `status` de l'Agent][4] et cherchez `exchange_server` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "exchange_server" >}}


### Événements
Le check Exchange Server n'inclut aucun événement.

### Checks de service
Le check Exchange Server n'inclut aucun check de service.


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/exchange_server/metadata.csv


{{< get-dependencies >}}