---
categories:
  - data store
  - os & system
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/ceph/README.md'
display_name: Ceph
git_integration_title: ceph
guid: 8a60c34f-ecde-4269-bcae-636e6cbce98f
integration_id: ceph
integration_title: Ceph
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ceph.
metric_to_check: ceph.write_bytes_sec
name: ceph
process_signatures:
  - ceph-mon
  - ceph-mgr
  - ceph-osd
public_title: Intégration Datadog/Ceph
short_description: Recueillez des métriques de performance sur des pools individuels et surveillez le statut global du cluster. status.
support: core
supported_os:
  - linux
  - mac_os
---
![dashboard Ceph][1]

## Présentation

Activez l'intégration Datadog/Ceph pour :

  * Surveiller l'utilisation du disque pour l'ensemble des pools de stockage
  * Recevoir des checks de service en cas de problème
  * Surveiller les métriques de performance des E/S

## Implémentation
### Installation

Le check Ceph est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs Cepth.

### Configuration

Modifiez le fichier `ceph.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3].
Consultez le [fichier d'exemple ceph.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles :

```yaml
init_config:

instances:
  - ceph_cmd: /chemin/vers/votre/ceph # valeur par défaut ; /usr/bin/ceph
    use_sudo: true               # uniquement si le binaire ceph doit sudo sur votre nœuds
```

Si vous avez activé `use_sudo`, ajoutez une ligne semblable à ce qui suit dans votre fichier `sudoers` : 

```
dd-agent ALL=(ALL) NOPASSWD:/chemin/vers/votre/ceph
```

### Validation

[Lancez la sous-commande `status` de l'Agent][5] et cherchez `ceph` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "ceph" >}}


Remarque : si vous exécutez Ceph Luminous ou une version ultérieure, la métrique `ceph.osd.pct_used` ne s'affichera pas.

### Événements
Le check Cepth n'inclut aucun événement.

### Checks de service

* `ceph.overall_status` : l'Agent Datadog envoie un check de service pour chaque check de santé de host de Ceph.

Outre ce check de service, le check Ceph recueille également une liste configurable de checks de santé pour Ceph Luminous et les versions ultérieures. Par défaut, ces checks correspondent à :

* `ceph.osd_down` : renvoie `OK` si vos OSD sont tous pleins, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

* `ceph.osd_orphan` : renvoie `OK` s'il n'y a aucun OSD orphelin, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

* `ceph.osd_full` : renvoie `OK` si vos OSD ne sont pas pleins, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

* `ceph.osd_nearfull` : renvoie `OK` si vos OSD sont loin d'être pleins, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

* `ceph.pool_full` : renvoie `OK` si vos pools n'ont pas atteint leur quota, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

* `ceph.pool_near_full` : renvoie `OK` si vos pools sont loin d'atteindre leur quota, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

* `ceph.pg_availability` : renvoie `OK` si l'ensemble des données sont disponibles, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

* `ceph.pg_degraded` : renvoie `OK` en cas de redondance complète des données, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

* `ceph.pg_degraded_full` : renvoie `OK` s'il y a suffisamment d'espace dans le cluster pour la redondance des données, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

* `ceph.pg_damaged` : renvoie `OK` s'il n'y a pas d'incohérence après le nettoyage des données, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

* `ceph.pg_not_scrubbed` : renvoie `OK` si les PG ont été nettoyés récemment, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

* `ceph.pg_not_deep_scrubbed` : renvoie `OK` si les PG ont été nettoyés en profondeur récemment, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

* `ceph.cache_pool_near_full` : renvoie `OK` si les pools de cache sont loin d'être pleins, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

* `ceph.too_few_pgs` : renvoie `OK` si le nombre de PG est supérieur au seuil minimum, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

* `ceph.too_many_pgs` : renvoie `OK` si le nombre de PG est inférieur au seuil maximal, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

* `ceph.object_unfound` : renvoie `OK` si tous les objets peuvent être trouvés, renvoie`WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

* `ceph.request_slow` : renvoie `OK` si les requêtes possèdent un délai normal de traitement, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

* `ceph.request_stuck` : renvoie `OK` si les requêtes possèdent un délai normal de traitement, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][7].

## Pour aller plus loin

* [Surveillance de Ceph : des statuts de nœud aux performances dans l'ensemble du cluster][8] (en anglais)


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/ceph/images/ceph_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/ceph/datadog_checks/ceph/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/ceph/metadata.csv
[7]: https://docs.datadoghq.com/fr/help
[8]: https://www.datadoghq.com/blog/monitor-ceph-datadog


{{< get-dependencies >}}