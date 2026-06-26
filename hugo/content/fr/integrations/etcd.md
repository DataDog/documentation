---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Etcd Overview: assets/dashboards/etcd_overview.json
    etcd-Screenboard: assets/dashboards/etcd_2_overview.json
  logs:
    source: etcd
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    etcd_overview: assets/saved_views/etcd_overview.json
    etcd_processes: assets/saved_views/etcd_processes.json
  service_checks: assets/service_checks.json
categories:
  - orchestration
  - containers
  - configuration & deployment
  - autodiscovery
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/etcd/README.md'
display_name: etcd
draft: false
git_integration_title: etcd
guid: a1cfafdb-5d88-4ae1-acdc-6356df755b73
integration_id: etcd
integration_title: etcd
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: etcd.
metric_to_check:
  - etcd.store.watchers
  - etcd.server.has_leader
name: etcd
process_signatures:
  - etcd
public_title: Intégration Datadog/etcd
short_description: 'Surveillez des métriques etcd sur les écritures, les mises à jour, les suppressions, les latences entre nœuds, et plus encore.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard etcd][1]

## Présentation

Recueillez des métriques d'etcd pour :

- Surveiller la santé de votre cluster etcd
- Savoir si des configurations de host sont potentiellement désynchronisées
- Corréler les performances d'etcd avec le reste de vos applications

## Configuration

### Installation

Le check Etcd est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos instances etcd.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `etcd.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1] pour commencer à recueillir vos données de performance Etcd. Consultez le [fichier d'exemple etcd.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.
2. [Redémarrez l'Agent][3].

##### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
    logs_enabled: true
    ```

2. Supprimez la mise en commentaire du bloc de configuration suivant en bas de votre fichier `etcd.d/conf.yaml`, puis modifiez-le :

    ```yaml
    logs:
      - type: file
        path: "<LOG_FILE_PATH>"
        source: etcd
        service: "<SERVICE_NAME>"
    ```

    Modifiez les valeurs des paramètres `path` et `service` en fonction de votre environnement. Consultez le [fichier d'exemple etcd.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][3].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/etcd/datadog_checks/etcd/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                                |
| -------------------- | ---------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `etcd`                                               |
| `<CONFIG_INIT>`      | vide ou `{}`                                        |
| `<CONFIG_INSTANCE>`  | `{"prometheus_url": "http://%%host%%:2379/metrics"}` |

##### Collecte de logs

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][2].

| Paramètre      | Valeur                                             |
| -------------- | ------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "etcd", "service": "<NOM_SERVICE>"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande `status` de l'Agent][3] et cherchez `etcd` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "etcd" >}}


Le tag `etcd_state:leader` ou `etcd_state:follower` est appliqué aux métriques etcd, en fonction du statut du nœud. Vous pouvez donc facilement agréger des métriques selon le statut.

### Événements

Le check etcd n'inclut aucun événement.

### Checks de service

**etcd.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à recueillir des métriques à partir du endpoint de votre API etcd.

**etcd.healthy** :<br>
Renvoie `CRITICAL` si le nœud d'un membre n'est pas sain. Renvoie 'Unknown' si l'Agent ne parvient pas à atteindre l'endpoint `/health`, ou si le statut de santé est manquant.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

Pour mieux comprendre comment (ou pourquoi) intégrer Etcd à Datadog, lisez notre [article de blog][5] à ce sujet.


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/etcd/images/etcd_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/fr/help/
[5]: https://www.datadoghq.com/blog/monitor-etcd-performance