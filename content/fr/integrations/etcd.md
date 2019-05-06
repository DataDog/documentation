---
categories:
  - orchestration
  - containers
  - configuration & deployment
  - orchestration
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/etcd/README.md'
display_name: etcd
git_integration_title: etcd
guid: a1cfafdb-5d88-4ae1-acdc-6356df755b73
integration_id: etcd
integration_title: etcd
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: etcd.
metric_to_check: etcd.store.watchers
name: etcd
process_signatures:
  - etcd
public_title: Intégration Datadog/etcd
short_description: 'Surveiller des écritures, mises à jour, suppressions, latences entre nœuds et plus encore Etcd metrics.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard etcd][1]

## Présentation

Recueillez des métriques d'etcd pour :

* Surveiller la santé de votre cluster etcd
* Savoir si des configurations de host sont potentiellement désynchronisées
* Corréler les performances d'etcd avec le reste de vos applications

## Implémentation
### Installation

Le check etcd est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur votre ou vos instances etcd.

### Configuration

1. Modifiez le fichier `etcd.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3] pour commencer à recueillir vos données de performance etcd.
    Consultez le [fichier d'exemple etcd.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

    ```yaml
    init_config:

    instances:
        - url: "https://server:port" # API endpoint of your Etcd instance
    ```

2. [Redémarrez l'Agent][5].

### Validation

[Lancez la sous-commande `status` de l'Agent][6] et cherchez `etcd` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "etcd" >}}


Le tag `etcd_state:leader` ou `etcd_state:follower` est appliqué aux métriques etcd, en fonction du statut du nœud. Vous pouvez donc facilement agréger des métriques selon le statut.

### Événements
Le check etcd n'inclut aucun événement.

### Checks de service

`etcd.can_connect` :

Renvoie « Critical » si l'Agent n'est pas capable de recueillir des métriques à partir du endpoint de votre API etcd.

`etcd.healthy` :

Renvoie « Critical » si le nœud d'un membre n'est pas sain. Renvoie « Unknown » si l'Agent n'est pas capable d'atteindre l'endpoint `/health`, ou si le statut de santé est manquant.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin
Pour mieux comprendre comment (ou pourquoi) intégrer etcd à Datadog, lisez notre [article de blog][9] à ce sujet.


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/etcd/images/etcd_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/etcd/datadog_checks/etcd/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/etcd/metadata.csv
[8]: https://docs.datadoghq.com/fr/help
[9]: https://www.datadoghq.com/blog/monitor-etcd-performance


{{< get-dependencies >}}