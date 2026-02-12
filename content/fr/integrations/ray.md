---
app_id: ray
app_uuid: bae260a0-91be-4dc4-9767-61f072f82d76
assets:
  dashboards:
    Ray Overview Dashboard: assets/dashboards/overview_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ray.process.open_fds
      metadata_path: metadata.csv
      prefix: ray.
    process_signatures:
    - ray.util.client.server
    - gcs_server
    - raylet
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10393
    source_type_name: Ray
  monitors:
    High CPU Utilization on Ray.io node: assets/monitors/cpu_utilization.json
    High Memory Usage: assets/monitors/mem_utilization.json
    High Number of Failed Tasks on Ray.io Node: assets/monitors/failed_task.json
    Low GPU Utilization low on Ray.io Node: assets/monitors/gpu_utilization.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- ai/ml
- log collection
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ray/README.md
display_on_public_website: true
draft: false
git_integration_title: ray
integration_id: ray
integration_title: Ray
integration_version: 2.2.0
is_public: true
manifest_version: 2.0.0
name: ray
public_title: Ray
short_description: Surveiller l'état et les performances de Ray
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::AI/ML
  - Category::Log Collection
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Surveiller l'état et les performances de Ray
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Ray
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Présentation

Ce check surveille [Ray][1] via l'Agent Datadog. Ray est un framework de calcul unifié open source qui facilite la mise à l'échelle des charges de travail AI et Python, allant de l'apprentissage par renforcement au deep learning, à l'optimisation et au déploiement de modèles.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à des environnements conteneurisés.

### Installation

À partir de la version 7.49.0 de l'Agent, le check Ray est inclus dans le package de l'[Agent Datadog][3]. Aucune installation supplémentaire n'est requise sur votre serveur.

**AVERTISSEMENT** : ce check utilise [OpenMetrics][4] pour collecter des métriques à partir du point de terminaison OpenMetrics que Ray peut exposer, ce qui nécessite Python 3.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

##### Collecte de métriques

1. Modifiez le fichier `ray.d/conf.yaml`, dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent, pour commencer à collecter les données de performance de Ray. Consultez [l'exemple de fichier de configuration][1] pour découvrir toutes les options disponibles.

    Cet exemple illustre la configuration :

    ```yaml
    init_config:
      ...
    instances:
      - openmetrics_endpoint: http://<RAY_ADDRESS>:8080
    ```

2. [Redémarrez l'Agent][2] après avoir modifié la configuration.

[1]: https://github.com/DataDog/integrations-core/blob/master/ray/datadog_checks/ray/data/conf.yaml.example
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

#### Docker

##### Collecte de métriques

Cet exemple montre la configuration sous forme d'étiquette Docker dans le fichier `docker-compose.yml`. Consultez [l'exemple de fichier de configuration][1] pour découvrir toutes les options disponibles.

```yaml
labels:
  com.datadoghq.ad.checks: '{"ray":{"instances":[{"openmetrics_endpoint":"http://%%host%%:8080"}]}}'
```

[1]: https://github.com/DataDog/integrations-core/blob/master/ray/datadog_checks/ray/data/conf.yaml.example
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

##### Collecte de métriques

Cet exemple montre la configuration sous forme d'annotations Kubernetes sur vos pods Ray. Consultez [l'exemple de fichier de configuration][1] pour découvrir toutes les options disponibles.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/ray.checks: |-
      {
        "ray": {
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8080"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'ray'
# (...)
```

[1]: https://github.com/DataDog/integrations-core/blob/master/ray/datadog_checks/ray/data/conf.yaml.example
{{% /tab %}}
{{< /tabs >}}

Les métriques Ray sont disponibles via l'nedpoint OpenMetrics. De plus, Ray vous permet [d'exporter des métriques personnalisées au niveau de l'application][5]. Vous pouvez configurer l'intégration Ray pour collecter ces métriques à l'aide de l'option `extra_metrics`. Toutes les métriques Ray, y compris vos métriques personnalisées, utilisent le préfixe `ray.`.

**Remarque :** les métriques personnalisées Ray sont considérées comme des métriques standard dans Datadog.

Cet exemple montre une configuration utilisant l'option `extra_metrics` :

```yaml
init_config:
  ...
instances:
  - openmetrics_endpoint: http://<RAY_ADDRESS>:8080
    # Also collect your own Ray metrics
    extra_metrics:
      - my_custom_ray_metric
```

Vous trouverez plus d'informations sur la configuration de cette option dans le [l'exemple de fichier de configuration `ray.d/conf.yaml`][6].

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `ray` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "ray" >}}


### Événements

L'intégration Ray ne comprend aucun événement.

### Checks de service
{{< get-service-checks-from-git "ray" >}}


### Logs

L'intégration Ray peut collecter les logs du service Ray et les transmettre à Datadog.

{{< tabs >}}
{{% tab "Host" %}}

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Décommentez et modifiez le bloc de configuration des logs dans votre fichier `ray.d/conf.yaml`. Voici un exemple :

   ```yaml
   logs:
     - type: file
       path: /tmp/ray/session_latest/logs/dashboard.log
       source: ray
       service: ray
     - type: file
       path: /tmp/ray/session_latest/logs/gcs_server.out
       source: ray
       service: ray
   ```

{{% /tab %}}
{{% tab "Kubernetes" %}}

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs Kubernetes][1].

Ensuite, définissez les intégrations de logs sous forme d'annotations de pod. Cette configuration peut également être effectuée à l'aide d'un fichier, d'une configmap ou d'un key-value store. Pour en savoir plus, consultez la section de configuration de [Collecte de logs Kubernetes][2].


**Versions 1 et 2 des annotations**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: ray
  annotations:
    ad.datadoghq.com/apache.logs: '[{"source":"ray","service":"ray"}]'
spec:
  containers:
    - name: ray
```

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/log/#setup
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/#configuration
{{% /tab %}}
{{< /tabs >}}

Pour en savoir plus sur la configuration des logs avec Ray et sur l'ensemble des fichiers de logs, consultez la [documentation officielle de Ray][8].

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].


[1]: https://www.ray.io/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/fr/integrations/openmetrics/
[5]: https://docs.ray.io/en/latest/ray-observability/user-guides/add-app-metrics.html
[6]: https://github.com/DataDog/integrations-core/blob/master/ray/datadog_checks/ray/data/conf.yaml.example#L59-L105
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.ray.io/en/latest/ray-observability/user-guides/configure-logging.html
[9]: https://docs.datadoghq.com/fr/help/