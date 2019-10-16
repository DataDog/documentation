---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/kyototycoon/README.md'
display_name: "Kyoto\_Tycoon"
git_integration_title: kyototycoon
guid: 2661668b-d804-4c8d-96a7-8019525add8c
integration_id: kyoto-tycoon
integration_title: "Kyoto\_Tycoon"
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: kyototycoon.
metric_to_check: kyototycoon.records
name: kyototycoon
process_signatures:
  - ktserver
public_title: "Intégration Datadog/Kyoto\_Tycoon"
short_description: 'Surveillez les opérations get, set et delete et mesurez le délai de réplication.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Le check KyotoTycoon de l'Agent surveille les opérations get, set et delete et vous permet de mesurer le délai de réplication.

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check KyotoTycoon est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs Kyoto Tycoon.

### Configuration

1. Modifiez le fichier `kyototycoon.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3].
    Consultez le [fichier d'exemple kyototycoon.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles :

    ```yaml
    init_config:

    instances:
        #  Each instance needs a report URL.
        #  name, and optionally tags keys. The report URL should
        #  be a URL to the Kyoto Tycoon "report" RPC endpoint.
        #
        #  Complete example:
        #
        - report_url: http://localhost:1978/rpc/report
        #   name: my_kyoto_instance
        #   tags:
        #     foo: bar
        #     baz: bat
    ```

2. [Redémarrez l'Agent][5] pour commencer à envoyer vos métriques Kong à Datadog.


### Validation

[Lancez la sous-commande `status` de l'Agent][6] et cherchez `kyototycoon` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "kyototycoon" >}}


### Événements
Le check Kyoto Tycoon n'inclut aucun événement.

### Checks de service

`kyototycoon.can_connect` :

Renvoie CRITICAL si l'Agent ne parvient pas à se connecter à Kyoto Tycoon pour recueillir des métriques. Si ce n'est pas le cas, renvoie OK.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/metadata.csv
[8]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}