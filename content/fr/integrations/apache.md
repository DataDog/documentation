---
aliases:
  - /fr/integrations/faq/issues-with-apache-integration/
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    apache: assets/dashboards/apache_dashboard.json
  logs:
    source: apache
  metrics_metadata: metadata.csv
  monitors:
    '[Apache] Low number of idle workers': assets/recommended_monitors/apache_low_idle_workers.json
    '[Apache] resource utilization': assets/recommended_monitors/high_keep_alive_and_cpu.json
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    apache_processes: assets/saved_views/apache_processes.json
    bot_errors: assets/saved_views/bot_errors.json
    status_code_overview: assets/saved_views/status_code_overview.json
  service_checks: assets/service_checks.json
categories:
  - web
  - log collection
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/apache/README.md'
description: 'Surveillez le nombre de requêtes par seconde, les octets traités, les threads worker, le temps de disponibilité et plus encore.'
display_name: Apache
draft: false
git_integration_title: apache
guid: cb2b4a06-4ede-465e-9478-a45f8b32058a
integration_id: apache
integration_title: Apache
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: apache.
metric_to_check: apache.performance.busy_workers
name: Apache
process_signatures:
  - httpd
  - apache
  - apache2
public_title: Intégration Datadog/Apache
short_description: 'Surveillez le nombre de requêtes par seconde, les octets traités, les threads worker, le temps de disponibilité et plus encore.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard Apache][1]

## Présentation

Le check Apache surveille le nombre de requêtes par seconde, les octets traités, les threads de travail, la durée de fonctionnement des services et plus encore.

## Configuration

### Installation

Le check Apache est fourni avec l'Agent. Pour commencer à recueillir vos logs et métriques Apache, vous devez suivre les étapes suivantes :

1. [Installez l'Agent][2] sur vos serveurs Apache.

2. Installez `mod_status` sur vos serveurs Apache et activez `ExtendedStatus`.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `apache.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1] pour commencer à recueillir vos métriques Apache. Consultez le [fichier d'exemple apache.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   init_config:

   instances:
     ## @param apache_status_url - string - required
     ## Status url of your Apache server.
     #
     - apache_status_url: http://localhost/server-status?auto
   ```

2. [Redémarrez l'Agent][3].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `apache.d/conf.yaml` pour commencer à recueillir vos logs Apache :

   ```yaml
   logs:
     - type: file
       path: /var/log/apache2/access.log
       source: apache
       service: apache

     - type: file
       path: /var/log/apache2/error.log
       source: apache
       service: apache
   ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Consultez le [fichier d'exemple apache.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][3].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                                         |
| -------------------- | ------------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `apache`                                                      |
| `<CONFIG_INIT>`      | vide ou `{}`                                                 |
| `<CONFIG_INSTANCE>`  | `{"apache_status_url": "http://%%host%%/server-status?auto"}` |

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][2].

| Paramètre      | Valeur                                               |
| -------------- | --------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "apache", "service": "<NOM_SERVICE>"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][3] et cherchez `apache` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "apache" >}}


### Événements

Le check Apache n'inclut aucun événement.

### Checks de service

**apache.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à l'URL `apache_status_url` configurée. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

### URL de statut Apache

Si vous rencontrez des difficultés avec votre intégration Apache, il est fort probable que l'Agent ne soit pas en mesure d'accéder à votre URL de statut Apache. Tentez de faire un curl sur l'URL `apache_status_url` spécifiée dans [votre fichier `apache.d/conf.yaml`][4] (indiquez vos identifiants de connexion le cas échéant).

- [Problèmes liés au certificat SSL Apache][5]

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Déployer et configurer Datadog avec CloudFormation][6]
- [Surveiller les performances du serveur Web Apache][7]
- [Comment recueillir des métriques de performance Apache][8]
- [Comment surveiller un serveur Web Apache avec Datadog][9]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/apache/images/apache_dashboard.png
[2]: https://docs.datadoghq.com/fr/agent/
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/integrations/faq/apache-ssl-certificate-issues/
[6]: https://www.datadoghq.com/blog/deploying-datadog-with-cloudformation
[7]: https://www.datadoghq.com/blog/monitoring-apache-web-server-performance
[8]: https://www.datadoghq.com/blog/collect-apache-performance-metrics
[9]: https://www.datadoghq.com/blog/monitor-apache-web-server-datadog