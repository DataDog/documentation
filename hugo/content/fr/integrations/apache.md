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
- https://github.com/DataDog/integrations-core/blob/master/apache/README.md
description: Surveillez le nombre de requêtes par seconde, les octets traités, les
  threads worker, le temps de disponibilité et plus encore.
display_name: Apache
draft: false
git_integration_title: apache
guid: cb2b4a06-4ede-465e-9478-a45f8b32058a
integration_id: apache
integration_title: Apache
integration_version: 4.1.0
is_public: true
custom_kind: integration
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
short_description: Surveillez le nombre de requêtes par seconde, les octets traités,
  les threads worker, le temps de disponibilité et plus encore.
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

Le check Apache est fourni avec l'[Agent Datadog][2]. Pour commencer à recueillir vos logs et métriques Apache, vous devez suivre les étapes suivantes :

1. [Installez l'Agent][3] sur vos serveurs Apache.

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

2. Ajoutez le bloc de configuration suivant à votre fichier `apache.d/conf.yaml` pour commencer à recueillir vos logs Apache. Modifiez les valeurs `path` et `service` en fonction de votre environnement :

   ```yaml
   logs:
     - type: file
       path: /path/to/your/apache/access.log
       source: apache
       service: apache
       sourcecategory: http_web_access

     - type: file
       path: /path/to/your/apache/error.log
       source: apache
       service: apache
       sourcecategory: http_web_error
   ```

    Consultez le [fichier d'exemple apache.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][3].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

#### Docker

Pour configurer ce check lorsque l'Agent est exécuté sur un conteneur :

##### Collecte de métriques

Définissez des [modèles d'intégration Autodiscovery][1] en tant qu'étiquettes Docker sur votre conteneur d'application :

```yaml
LABEL "com.datadoghq.ad.check_names"='["apache"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"apache_status_url": "http://%%host%%/server-status?auto"}]'
```

##### Collecte de logs


La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Docker][2].

Définissez ensuite des [intégrations de logs][5] en tant qu'étiquettes Docker :

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source": "apache", "service": "<NOM_SERVICE>"}]'
```

[1]: https://docs.datadoghq.com/fr/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/fr/agent/docker/log/?tab=containerinstallation#installation
[3]: https://docs.datadoghq.com/fr/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

Pour configurer ce check lorsque l'Agent est exécuté sur Kubernetes :

##### Collecte de métriques

Définissez des [modèles d'intégration Autodiscovery][1] en tant qu'annotations de pod sur votre conteneur d'application. Cette configuration peut également être réalisée avec [un fichier, une configmap ou une paire key/value][2].

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.check_names: '["apache"]'
    ad.datadoghq.com/apache.init_configs: '[{}]'
    ad.datadoghq.com/apache.instances: |
      [
        {
          "apache_status_url": "http://%%host%%/server-status?auto"
        }
      ]
spec:
  containers:
    - name: apache
```

##### Collecte de logs


La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][3].

Définissez ensuite des [intégrations de logs][4] en tant qu'annotations de pod. Cette configuration peut également être réalisée avec [un fichier, une configmap ou une paire key/value][5].

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.logs: '[{"source":"apache","service":"<NOM_SERVICE>"}]'
spec:
  containers:
    - name: apache
```


[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/?tab=kubernetes
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/fr/agent/kubernetes/log/?tab=containerinstallation#setup
[4]: https://docs.datadoghq.com/fr/agent/docker/log/?tab=containerinstallation#log-integrations
[5]: https://docs.datadoghq.com/fr/agent/kubernetes/log/?tab=daemonset#configuration
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

Pour configurer ce check lorsque l'Agent est exécuté sur ECS :

##### Collecte de métriques

Définissez des [modèles d'intégration Autodiscovery][1] en tant qu'étiquettes Docker sur votre conteneur d'application :

```json
{
  "containerDefinitions": [{
    "name": "apache",
    "image": "apache:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"apache\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"apache_status_url\": \"http://%%host%%/server-status?auto\"}]"
    }
  }]
}
```

##### Collecte de logs


La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs Amazon ECS][2].

Définissez ensuite des [intégrations de logs][5] en tant qu'étiquettes Docker :

```json
{
  "containerDefinitions": [{
    "name": "apache",
    "image": "apache:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"apache\",\"service\":\"<VOTRE_APPLICATION>\"}]"
    }
  }]
}
```

[1]: https://docs.datadoghq.com/fr/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/fr/agent/amazon_ecs/logs/?tab=linux
[3]: https://docs.datadoghq.com/fr/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][4] et cherchez `apache` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "apache" >}}


### Événements

Le check Apache n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "apache" >}}


## Dépannage

### URL de statut Apache

Si vous rencontrez des difficultés avec votre intégration Apache, il est fort probable que l'Agent ne soit pas en mesure d'accéder à votre URL de statut Apache. Tentez d'exécuter curl pour la `apache_status_url` spécifiée dans [votre fichier `apache.d/conf.yaml`][5] (indiquez vos identifiants de connexion le cas échéant).

- [Problèmes liés au certificat SSL Apache][6]

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Déployer et configurer Datadog avec CloudFormation][7]
- [Surveiller les performances du serveur Web Apache][8]
- [Comment recueillir des métriques de performance Apache][9]
- [Comment surveiller un serveur Web Apache avec Datadog][10]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/apache/images/apache_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/integrations/faq/apache-ssl-certificate-issues/
[7]: https://www.datadoghq.com/blog/deploying-datadog-with-cloudformation
[8]: https://www.datadoghq.com/blog/monitoring-apache-web-server-performance
[9]: https://www.datadoghq.com/blog/collect-apache-performance-metrics
[10]: https://www.datadoghq.com/blog/monitor-apache-web-server-datadog