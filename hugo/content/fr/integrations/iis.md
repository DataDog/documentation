---
app_id: iis
app_uuid: 4620121f-b5ca-4b9c-aca2-c69bf18bc362
assets:
  dashboards:
    IIS-Overview: assets/dashboards/iis_overview.json
    iis: assets/dashboards/iis_dashboard.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: iis.uptime
      metadata_path: metadata.csv
      prefix: iis.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: IIS
  logs:
    source: iis
  monitors:
    '[IIS] Anomalous amount of requests for site: {{site.name}}': assets/monitors/req.json
    '[IIS] Increase of locked error per second for site: {{site.name}}': assets/monitors/lock.json
    '[IIS] Increase of not found error per second for site: {{site.name}}': assets/monitors/err.json
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    bot_errors: assets/saved_views/bot_errors.json
    response_time_overview: assets/saved_views/response_time.json
    status_code_overview: assets/saved_views/status_code_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/iis/README.md
display_on_public_website: true
draft: false
git_integration_title: iis
integration_id: iis
integration_title: IIS
integration_version: 2.19.1
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: iis
public_title: IIS
short_description: Surveillez des métriques globales ou par site ainsi que le statut
  de disponibilité de chaque site.
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Supported OS::Windows
  configuration: README.md#Setup
  description: Surveillez des métriques globales ou par site ainsi que le statut de
    disponibilité de chaque site.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: IIS
---



![Graphique IIS][1]

## Présentation

Recueillez les métriques IIS agrégées par site ou sur l'ensemble vos sites. Le check de l'Agent IIS recueille des métriques sur les connexions actives, les octets envoyés et reçus, le nombre de requêtes par méthode HTTP, et plus encore. Il envoie également un check de service pour chaque site, pour vous informer de sa disponibilité.

## Implémentation

### Installation

Le check IIS est fourni avec l'Agent. Pour commencer à recueillir vos logs et métriques IIS, [installez l'Agent][2] sur vos serveurs IIS.

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `iis.d/conf.yaml` dans le [dossier `conf.d` de l'Agent][3] à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos données de site IIS. Consultez le [fichier d'exemple iis.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6] pour commencer à envoyer vos métriques IIS à Datadog.

**Remarque** : les versions 2.14.0+ de ce check sont basées sur une nouvelle implémentation pour la collecte de métriques qui nécessite d'utiliser Python 3. Pour les hosts ne pouvant pas utiliser Python 3, ou si vous souhaitez utiliser une ancienne version de ce check, consultez [cette configuration][7].

##### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `iis.d/conf.yaml` pour commencer à recueillir vos logs IIS :

   ```yaml
   logs:
     - type: file
       path: C:\inetpub\logs\LogFiles\W3SVC1\u_ex*
       service: myservice
       source: iis
   ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Consultez le [fichier d'exemple iis.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][6].

**Remarque** : assurez-vous que l'utilisateur `datadog-agent` bénéficie d'un accès en lecture seule, afin de pouvoir suivre les fichiers de log dont vous souhaitez recueillir les données. Consultez la rubrique [Problèmes d'autorisation lors du suivi de fichiers de log][8] pour en savoir plus.


### Validation

[Lancez la sous-commande status de l'Agent][9] et cherchez `iis` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "iis" >}}


### Événements

Le check IIS n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "iis" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][12].


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/iis/images/iisgraph.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/fr/agent/basic_agent_usage/windows/#agent-check-directory-structure
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/iis/datadog_checks/iis/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://github.com/DataDog/integrations-core/blob/7.33.x/iis/datadog_checks/iis/data/conf.yaml.example
[8]: https://docs.datadoghq.com/fr/logs/guide/log-collection-troubleshooting-guide/#permission-issues-tailing-log-files
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/iis/metadata.csv
[11]: https://github.com/DataDog/integrations-core/blob/master/iis/assets/service_checks.json
[12]: https://docs.datadoghq.com/fr/help/