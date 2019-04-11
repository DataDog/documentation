---
categories:
  - web
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/apache/README.md'
description: 'Surveillez le nombre de requêtes par seconde, les octets traités, les threads de travail, la disponibilité et plus encore. more.'
display_name: Apache
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
short_description: 'Surveillez le nombre de requêtes par seconde, les octets traités, les threads de travail, la disponibilité et plus encore. and more.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard Apache][1]

## Présentation

Le check Apache surveille le nombre de requêtes par seconde, les octets traités, les threads de travail, la disponibilité des services et plus encore.

## Implémentation
### Installation

Le check Apache est fourni avec l'Agent. Pour commencer à recueillir vos logs et métriques Apache, vous devez suivre les étapes suivantes :

1. [Installez l'Agent][2] sur vos serveurs Apache.

2. Installez `mod_status` sur vos serveurs Apache et activez `ExtendedStatus`.

### Configuration

1. Modifiez le fichier `apache.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3] pour commencer à recueillir vos [métriques](#collecte-de-metriques) et [logs](#collecte-de-logs) Apache.
  Consultez le [fichier d'exemple apache.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][5].

#### Collecte de métriques

1. Ajoutez ce bloc de configuration à votre fichier `apache.d/conf.yaml` pour commencer à recueillir vos [métriques Apache](#metriques) :

        init_config:

        instances:
          - apache_status_url: http://example.com/server-status?auto
          #  apache_user: example_user # if apache_status_url needs HTTP basic auth
          #  apache_password: example_password
          #  disable_ssl_validation: true # if you need to disable SSL cert validation, i.e. for self-signed certs

   Modifiez la valeur du paramètre `apache_status_url` et configurez-la pour votre environnement.
    Consultez le [fichier d'exemple apache.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

2.  [Redémarrez l'Agent][5].

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. La collecte des logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
    logs_enabled: true
    ```

2. Ajoutez ce bloc de configuration à votre fichier `apache.d/conf.yaml` pour commencer à recueillir vos logs Apache :

    ```yaml
      logs:
          - type: file
            path: /var/log/apache2/access.log
            source: apache
            sourcecategory: http_web_access
            service: apache

          - type: file
            path: /var/log/apache2/error.log
            source: apache
            sourcecategory: http_web_access
            service: apache
    ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.
    Consultez le [fichier d'exemple apache.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][5].

**Pour en savoir plus sur la collecte de logs, consultez [la documentation relative aux logs][6].**

### Validation

[Lancez la sous-commande status de l'Agent][5] et cherchez `apache` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "apache" >}}


### Événements
Le check Apache n'inclut aucun événement.

### Checks de service

**apache.can_connect** :  
Renvoie CRITICAL si l'Agent n'est pas capable de se connecter à l'URL `apache_status_url` configurée. Si ce n'est pas le cas, renvoie OK.

## Dépannage

* [Problèmes liés à l'intégration Apache][9]
* [Problèmes liés au certificat SSL Apache][10]

## Pour aller plus loin
Documentation, liens et articles supplémentaires utiles :

* [Déployer et configurer Datadog avec CloudFormation][11]
* [Surveiller les performances du serveur Web Apache][12]
* [Comment recueillir des métriques de performance Apache][13]
* [Comment surveiller un serveur Web Apache avec Datadog][14]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/apache/images/apache_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/faq/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#start-stop-restart-the-agent
[6]: https://docs.datadoghq.com/fr/logs
[7]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/apache/metadata.csv
[9]: https://docs.datadoghq.com/fr/integrations/faq/issues-with-apache-integration
[10]: https://docs.datadoghq.com/fr/integrations/faq/apache-ssl-certificate-issues
[11]: https://www.datadoghq.com/blog/deploying-datadog-with-cloudformation
[12]: https://www.datadoghq.com/blog/monitoring-apache-web-server-performance
[13]: https://www.datadoghq.com/blog/collect-apache-performance-metrics
[14]: https://www.datadoghq.com/blog/monitor-apache-web-server-datadog


{{< get-dependencies >}}