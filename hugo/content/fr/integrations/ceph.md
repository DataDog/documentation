---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    ceph: assets/dashboards/overview.json
  logs:
    source: ceph
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    ceph_processes: assets/saved_views/ceph_processes.json
  service_checks: assets/service_checks.json
categories:
  - data store
  - os & system
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/ceph/README.md'
display_name: Ceph
draft: false
git_integration_title: ceph
guid: 8a60c34f-ecde-4269-bcae-636e6cbce98f
integration_id: ceph
integration_title: Ceph
is_public: true
custom_kind: integration
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
short_description: Recueillez des métriques de performance sur des pools individuels et surveillez le statut global du cluster.
support: core
supported_os:
  - linux
  - mac_os
---
![Dashboard Ceph][1]

## Présentation

Activez l'intégration Datadog/Ceph pour :

- Surveiller l'utilisation du disque pour l'ensemble des pools de stockage
- Recevoir des checks de service en cas de problème
- Surveiller les métriques de performance des E/S

## Configuration

### Installation

Le check Ceph est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs Ceph.

### Configuration

Modifiez le fichier `ceph.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3].
Consultez le [fichier d'exemple ceph.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles :

```yaml
init_config:

instances:
  - ceph_cmd: /chemin/vers/votre/ceph # valeur par défaut : /usr/bin/ceph
    use_sudo: true # uniquement si le binaire ceph doit utiliser sudo sur vos nœuds
```

Si vous avez activé `use_sudo`, ajoutez une ligne semblable à ce qui suit dans votre fichier `sudoers` : 

```text
dd-agent ALL=(ALL) NOPASSWD:/chemin/vers/votre/ceph
```

#### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Modifiez ensuite `ceph.d/conf.yaml` en supprimant la mise en commentaire des lignes `logs` en bas du fichier. Mettez à jour la ligne `path` en indiquant le bon chemin vers vos fichiers de log Ceph.

   ```yaml
   logs:
     - type: file
       path: /var/log/ceph/*.log
       source: ceph
       service: "<APPLICATION_NAME>"
   ```

3. [Redémarrez l'Agent][5].

### Validation

[Lancez la sous-commande `status` de l'Agent][6] et cherchez `ceph` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "ceph" >}}


**Remarque** : si vous exécutez Ceph Luminous ou une version ultérieure, la métrique `ceph.osd.pct_used` ne s'affichera pas.

### Événements

Le check Cepth n'inclut aucun événement.

### Checks de service

**ceph.overall_status** :<br>
L'Agent Datadog envoie un check de service pour chaque check de santé de host de Ceph.

En plus de ce check de service, le check Ceph recueille également une liste configurable de checks de santé pour Ceph Luminous et les versions ultérieures. Par défaut, ces checks correspondent à :

**ceph.osd_down** :<br>
Renvoie `OK` si vos OSD sont tous pleins, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

**ceph.osd_orphan** :<br>
Renvoie `OK` s'il n'y a aucun OSD orphelin, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

**ceph.osd_full** :<br>
Renvoie `OK` si vos OSD ne sont pas pleins, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

**ceph.osd_nearfull** :<br>
Renvoie `OK` si vos OSD sont loin d'être pleins, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

**ceph.pool_full** :<br>
Renvoie `OK` si vos pools n'ont pas atteint leur quota, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

**ceph.pool_near_full** :<br>
Renvoie `OK` si vos pools n'ont pas atteint leur quota, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

**ceph.pg_availability** :<br>
Renvoie `OK` si l'ensemble des données sont disponibles, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

**ceph.pg_degraded** :<br>
Renvoie `OK` en cas de redondance complète des données, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

**ceph.pg_degraded_full** :<br>
Renvoie `OK` s'il y a suffisamment d'espace dans le cluster pour la redondance des données, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

**ceph.pg_damaged** :<br>
Renvoie `OK` s'il n'y a pas d'incohérence après le nettoyage des données, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

**ceph.pg_not_scrubbed** :<br>
Renvoie `OK` si les PG ont été nettoyés récemment, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

**ceph.pg_not_deep_scrubbed** :<br>
Renvoie `OK` si les PG ont été nettoyés en profondeur récemment, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

**ceph.cache_pool_near_full** :<br>
Renvoie `OK` si les pools de cache sont loin d'être pleins, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

**ceph.too_few_pgs** :<br>
Renvoie `OK` si le nombre de PG est supérieur au seuil minimum, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

**ceph.too_many_pgs** :<br>
Renvoie `OK` si le nombre de PG est inférieur au seuil maximal, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

**ceph.object_unfound** :<br>
Renvoie `OK` si tous les objets peuvent être trouvés, renvoie`WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

**ceph.request_slow** :<br>
Renvoie `OK` si les requêtes possèdent un délai normal de traitement, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

**ceph.request_stuck** :<br>
Renvoie `OK` si les requêtes possèdent un délai normal de traitement, renvoie `WARNING` si la gravité est `HEALTH_WARN` ou renvoie `CRITICAL` pour les autres cas.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin

- [Surveillance de Ceph : des statuts de nœud aux performances dans l'ensemble du cluster][9]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/ceph/images/ceph_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/ceph/datadog_checks/ceph/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/ceph/metadata.csv
[8]: https://docs.datadoghq.com/fr/help/
[9]: https://www.datadoghq.com/blog/monitor-ceph-datadog