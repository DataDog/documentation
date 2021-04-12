---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: kyototycoon
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/kyototycoon/README.md'
display_name: Kyoto Tycoon
draft: false
git_integration_title: kyototycoon
guid: 2661668b-d804-4c8d-96a7-8019525add8c
integration_id: kyoto-tycoon
integration_title: Kyoto Tycoon
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

## Configuration

### Installation

Le check KyotoTycoon est inclus avec le package de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos serveurs Kyoto Tycoon.

### Configuration

1. Modifiez le fichier `kyototycoon.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2]. Consultez le [fichier d'exemple kyototycoon.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles :

   ```yaml
   init_config:

   instances:
     ## @param report_url - string - required
     ## The report URL should be a URL to the Kyoto Tycoon "report" RPC endpoint.
     #
     - report_url: http://localhost:1978/rpc/report
   ```

2. [Redémarrez l'Agent][4].

##### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
    logs_enabled: true
    ```

2. Ajoutez ce bloc de configuration à votre fichier `kyototycoon.d/conf.yaml` pour commencer à recueillir vos logs Kyoto Tycoon :

    ```yaml
    logs:
      - type: file
        path: /var/data/ktserver.log
        source: kyototycoon
    ```

    Modifiez la valeur du paramètre `path` en fonction de votre environnement. Consultez le [fichier d'exemple kyototycoon.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][4].

### Validation

[Lancez la sous-commande `status` de l'Agent][5] et cherchez `kyototycoon` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "kyototycoon" >}}


### Événements

Le check Kyoto Tycoon n'inclut aucun événement.

### Checks de service

**kyototycoon.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à Kyoto Tycoon pour recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][7].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/metadata.csv
[7]: https://docs.datadoghq.com/fr/help/