---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    riak: assets/dashboards/riak_dashboard.json
  logs:
    source: riak
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- data store
- log collection
- autodiscovery
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/riak/README.md
display_name: Riak
draft: false
git_integration_title: riak
guid: e1ed642c-8a15-420c-954b-6fb894905956
integration_id: riak
integration_title: Riak
integration_version: 3.1.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: riak.
metric_to_check: riak.memory_processes
name: riak
public_title: Intégration Datadog/Riak
short_description: Suivez les métriques de performance node, vnode et ring de RiakKV
  ou RiakTS.
support: core
supported_os:
- linux
- mac_os
- windows
---



![Graphique Riak][1]

## Présentation

Ce check vous permet de suivre les métriques de performance node, vnode et ring de RiakKV ou RiakTS.

## Configuration

### Installation

Le check Riak est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs Riak.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `riak.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Consultez le [fichier d'exemple riak.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles :

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## Riak stats url to connect to.
     #
     - url: http://127.0.0.1:8098/stats
   ```

2. [Redémarrez l'Agent][3] pour commencer à envoyer des métriques Riak à Datadog.

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `riak.d/conf.yaml` pour commencer à recueillir vos logs Riak :

   ```yaml
     logs:
       - type: file
         path: /var/log/riak/console.log
         source: riak
         service: "<SERVICE_NAME>"

       - type: file
         path: /var/log/riak/error.log
         source: riak
         service: "<SERVICE_NAME>"
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: \d{4}\-\d{2}\-\d{2}

       - type: file
         path: /var/log/riak/crash.log
         source: riak
         service: "<SERVICE_NAME>"
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: \d{4}\-\d{2}\-\d{2}
   ```

3. [Redémarrez l'Agent][3].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/riak/datadog_checks/riak/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                  |
| -------------------- | -------------------------------------- |
| `<NOM_INTÉGRATION>` | `riak`                                 |
| `<CONFIG_INIT>`      | vide ou `{}`                          |
| `<CONFIG_INSTANCE>`  | `{"url":"http://%%host%%:8098/stats"}` |

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][2].

| Paramètre      | Valeur                                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<CONFIG_LOG>` | `{"source": "riak", "service": "riak", "log_processing_rules": {"type": "multi_line", "name": "new_log_Start_with_date", "pattern": "\d{4}\-\d{2}\-\d{2}"}}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][3] et cherchez `riak` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "riak" >}}


### Événements

Le check Riak n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "riak" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].



[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/riak/images/riak_graph.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/fr/help/