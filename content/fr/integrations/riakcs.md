---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    riakcs: assets/dashboards/riakcs_dashboard.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    riak-cs_processes: assets/saved_views/riak-cs_processes.json
  service_checks: assets/service_checks.json
categories:
- data store
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/riakcs/README.md
display_name: RiakCS
draft: false
git_integration_title: riakcs
guid: 55ba6b94-8eeb-486b-aa94-6366a044fdf0
integration_id: riak-cs
integration_title: Riak CS
integration_version: 2.9.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: riakcs.
metric_to_check: riakcs.bucket_list_pool.workers
name: riakcs
process_signatures:
- riak-cs start
public_title: Intégration Datadog/Riak CS
short_description: Suivez la fréquence et la latence moyenne des opérations GET, PUT
  et DELETE, ainsi que d'autres opérations.
support: core
supported_os:
- linux
- mac_os
- windows
---



![Dashboard Riak CS][1]

## Présentation

Enregistrez vos métriques Riak CS dans Datadog pour :

- Visualiser les métriques clés de Riak CS
- Corréler les performances de Riak CS avec le reste de vos applications

## Configuration

### Installation

Le check RiakCS est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos nœuds RiakCS.

### Configuration

1. Modifiez le fichier `riakcs.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3]. Consultez le [fichier d'exemple riakcs.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles :

   ```yaml
   init_config:

   instances:
     ## @param access_id - string - required
     ## Enter you RiakCS access key.
     #
     - access_id: "<ACCESS_KEY>"

       ## @param access_secret - string - required
       ## Enter the corresponding RiakCS access secret.
       #
       access_secret: "<ACCESS_SECRET>"
   ```

2. [Redémarrez l'Agent][5].

### Validation

[Lancez la sous-commande `status` de l'Agent][6] et cherchez `riakcs` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "riakcs" >}}
 La plupart des métriques d'API S3 sont incluses, ainsi que des statistiques relatives à la mémoire. Certaines ont été exclues :

- bucket*acl*(get|put)
- object*acl*(get|put)
- bucket*policy*(get|put|delete)
- _in_(one|total)
- _time_error_\*
- \_time_100

Il est possible d'ajouter toutes les métriques exclues ainsi que plus de 1 000 métriques supplémentaires au fichier de configuration `riakcs.d/conf.yaml` à l'aide de la clé `metrics` dans `instance_config`. La valeur de cette clé doit être définie sur une liste de noms de métrique.

Consultez la [liste complète des métriques disponibles][8].

### Événements

Le check RiakCS n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "riakcs" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Surveiller les performances et la disponibilité de Riak CS][11]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/riakcs/images/riakcs_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/riakcs/datadog_checks/riakcs/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/riakcs/metadata.csv
[8]: https://github.com/basho/riak_cs/wiki/Riak-cs-and-stanchion-metrics
[9]: https://github.com/DataDog/integrations-core/blob/master/riakcs/assets/service_checks.json
[10]: https://docs.datadoghq.com/fr/help/
[11]: https://www.datadoghq.com/blog/monitor-riak-cs-performance-and-availability