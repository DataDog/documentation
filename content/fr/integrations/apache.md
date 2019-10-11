---
aliases:
  - /fr/integrations/faq/issues-with-apache-integration/
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/apache/README.md'
description: 'Surveillez le nombre de requêtes par seconde, les octets traités, les threads de travail, la durée de fonctionnement et plus encore. more.'
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
short_description: 'Surveillez le nombre de requêtes par seconde, les octets traités, les threads de travail, la durée de fonctionnement et plus encore. and more.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard Apache][1]

## Présentation

Le check Apache surveille le nombre de requêtes par seconde, les octets traités, les threads de travail, la durée de fonctionnement des services et plus encore.

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check Apache est fourni avec l'Agent. Pour commencer à recueillir vos logs et métriques Apache, vous devez suivre les étapes suivantes :

1. [Installez l'Agent][3] sur vos serveurs Apache.

2. Installez `mod_status` sur vos serveurs Apache et activez `ExtendedStatus`.

### Configuration

1. Modifiez le fichier `apache.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos [métriques](#collecte-de-metriques) et [logs](#collecte-de-logs) Apache.
  Consultez le [fichier d'exemple apache.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

#### Collecte de métriques

1. Ajoutez ce bloc de configuration à votre fichier `apache.d/conf.yaml` pour commencer à recueillir vos [métriques Apache](#metriques) :

        init_config:

        instances:
          - apache_status_url: http://example.com/server-status?auto
          #  username: example_user # if apache_status_url needs HTTP basic auth
          #  password: example_password
          #  tls_verify: false # if you need to enable TLS cert validation, i.e. for self-signed certs

   Modifiez la valeur du paramètre `apache_status_url` et configurez-la pour votre environnement.
    Consultez le [fichier d'exemple apache.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2.  [Redémarrez l'Agent][6].

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

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
            sourcecategory: http_web_access
            service: apache

          - type: file
            path: /var/log/apache2/error.log
            source: apache
            sourcecategory: http_web_access
            service: apache
    ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.
    Consultez le [fichier d'exemple apache.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande status de l'Agent][8] et cherchez `apache` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "apache" >}}


### Événements
Le check Apache n'inclut aucun événement.

### Checks de service

**apache.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à l'URL `apache_status_url` configurée. Si ce n'est pas le cas, renvoie OK.

## Dépannage

### URL de statut Apache
Si vous rencontrez des difficultés avec votre intégration Apache, il est fort probable que l'Agent ne soit pas en mesure d'accéder à votre URL de statut Apache. Tentez d'exécuter curl pour la `apache_status_url` spécifiée dans [votre fichier `apache.d/conf.yaml`][5] (indiquez vos identifiants de connexion le cas échéant).

* [Problèmes liés au certificat SSL Apache][10]

## Pour aller plus loin
Documentation, liens et articles supplémentaires utiles :

* [Déployer et configurer Datadog avec CloudFormation][11]
* [Surveiller les performances du serveur Web Apache][12]
* [Comment recueillir des métriques de performance Apache][13]
* [Comment surveiller un serveur Web Apache avec Datadog][14]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/apache/images/apache_dashboard.png
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/apache/metadata.csv
[10]: https://docs.datadoghq.com/fr/integrations/faq/apache-ssl-certificate-issues
[11]: https://www.datadoghq.com/blog/deploying-datadog-with-cloudformation
[12]: https://www.datadoghq.com/blog/monitoring-apache-web-server-performance
[13]: https://www.datadoghq.com/blog/collect-apache-performance-metrics
[14]: https://www.datadoghq.com/blog/monitor-apache-web-server-datadog


{{< get-dependencies >}}