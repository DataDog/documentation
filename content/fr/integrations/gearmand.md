---
aliases:
- /fr/integrations/gearman
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    gearman: assets/dashboards/gearman_dashboard.json
  logs:
    source: gearman
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    gearman_processes: assets/saved_views/gearman_processes.json
  service_checks: assets/service_checks.json
categories:
- processing
- autodiscovery
- log collection
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/gearmand/README.md
display_name: Gearman
draft: false
git_integration_title: gearmand
guid: bdd65394-92ff-4d51-bbe3-ba732663fdb2
integration_id: gearman
integration_title: Gearman
integration_version: 2.3.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: gearman.
metric_to_check: gearman.unique_tasks
name: gearmand
process_signatures:
- gearmand
- gearman
public_title: Intégration Datadog/Gearman
short_description: Surveillez le nombre de jobs en attente ou en cours d'exécution,
  que ce soit par tâche ou au total.
support: core
supported_os:
- linux
- mac_os
---



## Présentation

Recueillez des métriques de Gearman pour :

- Visualiser les performances de Gearman
- Savoir le nombre de tâches en attente ou en exécution
- Corréler les performances de Gearman avec le reste de vos applications

## Configuration

### Installation

Le check Gearman est inclus avec le paquet de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos serveurs de jobs Gearman.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `gearmand.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1] pour commencer à recueillir vos données de performance Gearman. Consultez le [fichier d'exemple gearmand.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   init_config:

   instances:
     - server: localhost
       port: 4730
   ```

2. [Redémarrez l'Agent][3].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/gearmand/datadog_checks/gearmand/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                  |
| -------------------- | -------------------------------------- |
| `<NOM_INTÉGRATION>` | `gearmand`                             |
| `<CONFIG_INIT>`      | vide ou `{}`                          |
| `<CONFIG_INSTANCE>`  | `{"server":"%%host%%", "port":"4730"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
    logs_enabled: true
    ```

2. Ajoutez ce bloc de configuration à votre fichier `gearmand.d/conf.yaml` pour commencer à recueillir vos logs Gearman :

    ```yaml
    logs:
      - type: file
        path: /var/log/gearmand.log
        source: gearman
    ```

   Modifiez la valeur du paramètre `path` en fonction de votre environnement. Consultez le [fichier d'exemple gearmand.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][3].

Consultez la section [Collecte de logs Kubernetes][4] pour découvrir comment configurer l'Agent afin de recueillir des logs dans des environnements Kubernetes.

### Validation

[Lancez la sous-commande `status` de l'Agent][5] et cherchez `gearmand` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "gearmand" >}}


### Événements

Le check Gearman n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "gearmand" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-core/blob/master/gearmand/datadog_checks/gearmand/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/fr/help/