---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: nagios
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    nagios_processes: assets/saved_views/nagios_processes.json
  service_checks: assets/service_checks.json
categories:
- monitoring
- notification
- log collection
creates_events: true
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/nagios/README.md
display_name: Nagios
draft: false
git_integration_title: nagios
guid: f7629918-751c-4a05-87e7-0e3de34e51e7
integration_id: nagios
integration_title: Nagios
integration_version: 1.11.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: nagios.
metric_to_check: nagios.host.rta
name: nagios
process_signatures:
- nagios
public_title: Intégration Datadog/Nagios
short_description: Envoyez des bagotements de service, des alertes de host et plus
  encore à votre flux d'événement Datadog.
support: core
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Envoyez des événements depuis votre infrastructure surveillée par Nagios à Datadog afin de créer des alertes enrichies et de corréler facilement les événements de Nagios avec les métriques de votre infrastructure surveillée par Datadog.

Ce check surveille les logs de votre serveur Nagios et envoie des événements sur les éléments suivants à votre flux d'événements Datadog :

- Bagottements de service
- Changements d'état de host
- Checks de service passifs
- Downtimes de hosts et de services

Ce check peut également envoyer des données de performance Nagios à Datadog sous la forme de métriques. 

## Configuration

### Installation

Le check Nagios est inclus avec le package de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos serveurs Nagios.

### Procédure à suivre

Suivez les instructions ci-dessous pour configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour la configuration dans un environnement conteneurisé.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `nagios.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Consultez le [fichier d'exemple nagios.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][3] pour commencer à envoyer vos événements et vos métriques de données de performance Nagios (facultatif) à Datadog.

**Remarque** : le check Nagios peut potentiellement générer des [métriques custom][4], ce qui peut avoir une incidence sur votre [facture][5].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/nagios/datadog_checks/nagios/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/fr/developers/metrics/custom_metrics/
[5]: https://docs.datadoghq.com/fr/account_management/billing/custom_metrics/
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                        |
| -------------------- | -------------------------------------------- |
| `<NOM_INTÉGRATION>` | `nagios`                                     |
| `<CONFIG_INIT>`      | vide ou `{}`                                |
| `<CONFIG_INSTANCE>`  | `{"nagios_conf": "/etc/nagios3/nagios.cfg"}` |

**Remarque** : l'Agent conteneurisé devrait pouvoir accéder au fichier `/etc/nagios3/nagios.cfg` pour activer l'intégration Datadog/Nagios.

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][2] et cherchez `nagios` dans la section Checks.

## Données collectées

### Métriques

Avec la configuration par défaut, le check Nagios ne recueille aucune métrique. Cependant, si vous définissez `collect_host_performance_data` et/ou `collect_service_performance_data` sur `True`, le check surveille les données de performance Nagios et les transmet sous forme de métriques gauge à Datadog.

### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
    logs_enabled: true
    ```

2. Ajoutez ce bloc de configuration à votre fichier `nagios.d/conf.yaml` pour commencer à recueillir vos logs Nagios :

    ```yaml
    logs:
      - type: file
        path: /opt/nagios/var/log/nagios.log
        source: nagios
    ```

    Modifiez la valeur du paramètre `path` en fonction de votre environnement. Reportez-vous à la valeur `log_file` dans votre fichier de configuration Nagios. Consultez le [fichier d'exemple nagios.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][4].

### Événements

Le check surveille le log d'événements Nagios en recherchant les lignes de log contenant ces chaînes. Il génère ainsi un événement pour chaque ligne :

- SERVICE FLAPPING ALERT
- ACKNOWLEDGE_SVC_PROBLEM
- SERVICE ALERT
- HOST ALERT
- ACKNOWLEDGE_HOST_PROBLEM
- SERVICE NOTIFICATION
- HOST DOWNTIME ALERT
- PROCESS_SERVICE_CHECK_RESULT
- SERVICE DOWNTIME ALERT

### Checks de service

Le check Nagios n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

## Pour aller plus loin

- [Comprendre vos alertes Nagios avec Datadog][6]


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[3]: https://github.com/DataDog/integrations-core/blob/master/nagios/datadog_checks/nagios/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/help/
[6]: https://www.datadoghq.com/blog/nagios-monitoring