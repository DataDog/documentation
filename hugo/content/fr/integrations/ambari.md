---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Ambari base dashboard: assets/dashboards/base_dashboard.json
  logs:
    source: ambari
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- processing
- log collection
- autodiscovery
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ambari/README.md
display_name: Ambari
draft: false
git_integration_title: ambari
guid: 4f518f2c-cfa7-4763-ac33-b1c8846eb738
integration_id: ambari
integration_title: Ambari
integration_version: 3.1.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ambari.
metric_to_check: ambari.cpu.cpu_user
name: ambari
public_title: Intégration Datadog/Ambari
short_description: Recueillez des métriques par host ou par service pour tous vos
  clusters gérés avec Ambari
support: core
supported_os:
- linux
- mac_os
---



## Présentation

Ce check permet de surveiller [Ambari][1] avec l'Agent Datadog.

## Configuration

### Installation

Le check Ambari est inclus avec le package de l'[Agent Datadog][2]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `ambari.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Ambari. Consultez le [fichier d'exemple ambari.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## The URL of the Ambari Server, include http:// or https://
     #
     - url: localhost
   ```

2. [Redémarrez l'Agent][2].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
    logs_enabled: true
    ```

2. Modifiez votre fichier `ambari.d/conf.yaml` en supprimant la mise en commentaire des lignes `logs` en bas du fichier. Mettez à jour la ligne `path` en indiquant le bon chemin vers vos fichiers de log Ambari.

    ```yaml
      logs:
        - type: file
          path: /var/log/ambari-server/ambari-alerts.log
          source: ambari
          service: ambari
          log_processing_rules:
              - type: multi_line
                name: new_log_start_with_date
                # 2019-04-22 15:47:00,999
                pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
      ...
    ```

3. [Redémarrez l'Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/ambari/datadog_checks/ambari/data/conf.yaml.example
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                        |
| -------------------- | ---------------------------- |
| `<NOM_INTÉGRATION>` | `ambari`                     |
| `<CONFIG_INIT>`      | vide ou `{}`                |
| `<CONFIG_INSTANCE>`  | `{"url": "http://%%host%%"}` |

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs Kubernetes][2].

| Paramètre      | Valeur                                                                                                                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "ambari", "service": "<NOM_SERVICE>", "log_processing_rules":{"type":"multi_line","name":"new_log_start_with_date","pattern":"\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])"}}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][3] et cherchez `ambari` dans la section Checks.

## Données collectées

Cette intégration recueille les métriques système suivantes pour chaque host de chaque cluster :

- boottime
- cpu
- disque
- mémoire
- chargement
- réseau
- processus

Si la collecte de métriques de service est activée avec `collect_service_metrics`, cette intégration recueille les métriques présentant des en-têtes figurant dans la liste d'inclusion pour chaque composant de service inclus.

### Métriques
{{< get-metrics-from-git "ambari" >}}


### Événements

Ambari n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "ambari" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].



[1]: https://ambari.apache.org
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/fr/help/