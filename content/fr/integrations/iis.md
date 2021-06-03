---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    IIS-Overview: assets/dashboards/iis_overview.json
    iis: assets/dashboards/iis_dashboard.json
  logs:
    source: iis
  metrics_metadata: metadata.csv
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
  service_checks: assets/service_checks.json
categories:
  - web
  - log collection
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/iis/README.md'
display_name: IIS
draft: false
git_integration_title: iis
guid: 6ad932f0-8816-467a-8860-72af44d4f3ba
integration_id: iis
integration_title: IIS
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: iis.
metric_to_check: iis.uptime
name: iis
public_title: Intégration Datadog/IIS
short_description: Surveillez des métriques globales ou par site ainsi que le statut de disponibilité de chaque site.
support: core
supported_os:
  - windows
---
![Graphique IIS][1]

## Présentation

Recueillez les métriques IIS agrégées par site ou sur l'ensemble vos sites. Le check de l'Agent IIS recueille des métriques sur les connexions actives, les octets envoyés et reçus, le nombre de requêtes par méthode HTTP, et plus encore. Il envoie également un check de service pour chaque site, pour vous informer de sa disponibilité.

## Configuration

### Installation

Le check IIS est fourni avec l'Agent. Pour commencer à recueillir vos logs et métriques IIS, [installez l'Agent][2] sur vos serveurs IIS.

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `iis.d/conf.yaml` dans le [dossier `conf.d` de l'Agent][3] à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos données de site IIS. Consultez le [fichier d'exemple iis.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6] pour commencer à envoyer vos métriques IIS à Datadog.

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

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `iis` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "iis" >}}


### Événements

Le check IIS n'inclut aucun événement.

### Checks de service

**iis.site_up** :<br>
L'Agent envoie ce check de service pour chaque site configuré dans `iis.yaml`. Cela renvoie `CRITICAL` si l'uptime du site est égal à zéro. SI ce n'est pas le cas, cela renvoie `OK`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/iis/images/iisgraph.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/basic_agent_usage/windows/#agent-check-directory-structure
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/iis/datadog_checks/iis/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/iis/metadata.csv
[9]: https://docs.datadoghq.com/fr/help/