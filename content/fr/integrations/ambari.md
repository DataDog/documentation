---
assets:
  dashboards:
    Ambari base dashboard: assets/dashboards/base_dashboard.json
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - processing
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/ambari/README.md'
display_name: Ambari
git_integration_title: ambari
guid: 4f518f2c-cfa7-4763-ac33-b1c8846eb738
integration_id: ambari
integration_title: Ambari
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ambari.
metric_to_check: ambari.cpu.cpu_user
name: ambari
public_title: Intégration Datadog/Ambari
short_description: Recueillez des métriques par host ou par service pour tous vos clusters gérés avec Ambari
support: core
supported_os:
  - linux
  - mac_os
---
## Présentation

Ce check permet de surveiller [Ambari][1] avec l'Agent Datadog.

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][9] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check Ambari est inclus avec le paquet de l'[Agent Datadog][2].
Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Modifiez le fichier `ambari.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Ambari. Consultez le [fichier d'exemple ambari.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][4].

#### Collecte de logs

 **Disponible à partir des versions > 6.0 de l'Agent**

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
                pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])  # 2019-04-22 15:47:00,999
      ...
    ```

 3. [Redémarrez l'Agent][4].

### Validation

[Lancez la sous-commande `status` de l'Agent][5] et cherchez `ambari` dans la section Checks.


## Données collectées

Cette intégration recueille les métriques système suivantes pour chaque host de chaque cluster :

* boottime
* cpu
* disk
* memory
* load
* network
* process

Si la collecte de métriques de service est activée avec `collect_service_metrics`, cette intégration recueille les métriques présentant des en-têtes sur liste blanche pour chaque composant de service faisant partie de la liste d'inclusion.

### Métriques
{{< get-metrics-from-git "ambari" >}}


### Checks de service

**ambari.can_connect** :<br>
Renvoie `OK` si le cluster est accessible. Si ce n'est pas le cas, renvoie `CRITICAL`.

**ambari.state** :<br>
Renvoie `OK` si le service est installé ou en cours d'exécution, `WARNING` si le service est en cours d'arrêt ou de désinstallation
ou `CRITICAL` si le service est désinstallé ou arrêté.

### Événements

Ambari ne comprend aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://ambari.apache.org
[2]: https://docs.datadoghq.com/fr/agent
[3]: https://github.com/DataDog/integrations-core/blob/master/ambari/datadog_checks/ambari/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/ambari/datadog_checks/ambari/data/conf.yaml.example
[7]: https://github.com/DataDog/integrations-core/blob/master/ambari/metadata.csv
[8]: https://docs.datadoghq.com/fr/help
[9]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations


{{< get-dependencies >}}