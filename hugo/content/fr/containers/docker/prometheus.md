---
aliases:
- /fr/agent/docker/prometheus
description: Collectez des métriques Prometheus et OpenMetrics à partir d'applications
  Docker conteneurisées à l'aide du Datadog Agent
further_reading:
- link: /agent/docker/log/
  tag: Documentation
  text: Recueillir les logs de votre application
- link: /agent/docker/apm/
  tag: Documentation
  text: Recueillir les traces de votre application
- link: /agent/docker/integrations/
  tag: Documentation
  text: Recueillez automatiquement les métriques et les logs de vos applications
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limitez la collecte de données à un sous-ensemble de conteneurs
- link: /agent/docker/tag/
  tag: Documentation
  text: Attribuez des tags à toutes les données envoyées par un conteneur
title: Collecte de métriques Prometheus et OpenMetrics Docker
---
Collectez vos métriques Prometheus et OpenMetrics exposées depuis votre application s'exécutant dans vos conteneurs à l'aide du Datadog Agent et des intégrations [Datadog-OpenMetrics][1] ou [Datadog-Prometheus][2].

## Présentation {#overview}

À partir de la version 6.5.0, l'Agent inclut des checks [OpenMetrics][3] et [Prometheus][4] capables de scraper des endpoints Prometheus. Datadog recommande d'utiliser le check OpenMetrics car il est plus efficace et prend entièrement en charge le format texte Prometheus. Pour une utilisation plus avancée de l'interface `OpenMetricsCheck`, y compris pour écrire un check personnalisé, consultez la section [Developer Tools][5]. Utilisez le check Prometheus uniquement lorsque l'endpoint de métriques ne prend pas en charge un format texte.

Cette page explique l'utilisation de base de ces checks et vous permet d'importer dans Datadog toutes vos métriques Prometheus exposées.

Les commandes CLI sur cette page sont destinées au runtime Docker. Remplacez `docker` par `nerdctl` pour le runtime containerd, ou `podman` pour le runtime Podman.

## Configuration {#setup}

### Installation {#installation}

Lancez l'Agent Docker à côté de vos autres conteneurs en remplaçant `<DATADOG_API_KEY>` par la clé d'API de votre organisation dans la commande ci-dessous :

{{< tabs >}}
{{% tab "Standard" %}}

```shell
docker run -d --cgroupns host \
    --pid host \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY="<DATADOG_API_KEY>" \
    -e DD_SITE="<YOUR_DATADOG_SITE>" \
    registry.datadoghq.com/agent:latest
```

{{% /tab %}}
{{% tab "Amazon Linux version < 2" %}}

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY="<DATADOG_API_KEY>" \
    -e DD_SITE="<YOUR_DATADOG_SITE>" \
    registry.datadoghq.com/agent:latest
```

{{% /tab %}}
{{% tab "Windows" %}}

```shell
docker run -d -e DD_API_KEY="<DATADOG_API_KEY>" \
    -e DD_SITE="<YOUR_DATADOG_SITE>" \
    registry.datadoghq.com/agent:latest
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : votre site Datadog est {{< region-param key="dd_site" code="true" >}}.

### Configuration {#configuration}

L'Agent détecte s'il s'exécute sur Docker et recherche automatiquement les labels Datadog-OpenMetrics parmi tous les labels des conteneurs. Pour Autodiscovery, les labels doivent ressembler aux exemples suivants, selon le type de fichier :

{{< tabs >}}
{{% tab "Dockerfile" %}}

```conf
LABEL "com.datadoghq.ad.check_names"='["openmetrics"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"openmetrics_endpoint":"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>","namespace":"<NAMESPACE>","metrics":[{"<METRIC_TO_FETCH>": "<NEW_METRIC_NAME>"}]}]'
```

#### Exemple avec plusieurs endpoints {#multiple-endpoints-example}

```conf
LABEL "com.datadoghq.ad.check_names"='["openmetrics","openmetrics"]'
LABEL "com.datadoghq.ad.init_configs"='[{},{}]'
LABEL "com.datadoghq.ad.instances"='[{"openmetrics_endpoint":"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>","namespace":"<NAMESPACE>","metrics":[{"<METRIC_TO_FETCH>": "<NEW_METRIC_NAME>"}]}, {"openmetrics_endpoint":"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>","namespace":"<NAMESPACE>","metrics":[{"<METRIC_TO_FETCH>": "<NEW_METRIC_NAME>"}]}]'
```

{{% /tab %}}
{{% tab "docker-compose.yaml" %}}

```yaml
labels:
  com.datadoghq.ad.check_names: '["openmetrics"]'
  com.datadoghq.ad.init_configs: '[{}]'
  com.datadoghq.ad.instances: |
    [
      {
        "openmetrics_endpoint": "http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>",
        "namespace": "<NAMESPACE>",
        "metrics": [
          {"<METRIC_TO_FETCH>": "<NEW_METRIC_NAME>"}
        ]
      }
    ]
```

**Exemple avec plusieurs endpoints** :

```yaml
labels:
  com.datadoghq.ad.check_names: '["openmetrics", "openmetrics"]'
  com.datadoghq.ad.init_configs: '[{},{}]'
  com.datadoghq.ad.instances: |
    [
      {
        "openmetrics_endpoint": "http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>",
        "namespace": "<NAMESPACE>",
        "metrics": [
          {"<METRIC_TO_FETCH>": "<NEW_METRIC_NAME>"}
        ]
      },
      {
        "openmetrics_endpoint": "http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>",
        "namespace": "<NAMESPACE>",
        "metrics": [
          {"<METRIC_TO_FETCH>": "<NEW_METRIC_NAME>"}
        ]
      }
    ]
```

{{% /tab %}}
{{% tab "Commande Docker run" %}}

```shell
# single metric
-l com.datadoghq.ad.check_names='["openmetrics"]' -l com.datadoghq.ad.init_configs='[{}]' -l com.datadoghq.ad.instances="[{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>\",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}]"
```

**Exemples de formatage de métriques dans `com.datadoghq.ad.instances`**

```shell
# multiple metrics
-l com.datadoghq.ad.instances="[{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>\",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}, {\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}]"
```

```shell
# all metrics of a base type
-l com.datadoghq.ad.instances="[{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>\",\"namespace\":\"<NAMESPACE>\",\"metrics\":[\"<METRIC_BASE_TO_FETCH>.*\"]}]"
```

```shell
# all metrics
-l com.datadoghq.ad.instances="[{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>\",\"namespace\":\"<NAMESPACE>\",\"metrics\":[\".*\"]}]"
```

**Exemple avec plusieurs endpoints** :

```shell
-l com.datadoghq.ad.check_names='["openmetrics", "openmetrics"]' -l com.datadoghq.ad.init_configs='[{},{}]' -l com.datadoghq.ad.instances='["{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}", "{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}"]'
```

{{% /tab %}}
{{< /tabs >}}

Avec les valeurs suivantes pour les espaces réservés de la configuration :

| Espace réservé             | Description                                                                                                                               |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `<PROMETHEUS_PORT>`     | Port auquel se connecter pour accéder à l'endpoint Prometheus. Vous pouvez également utiliser la [variable de modèle d'Autodiscovery][6] `%%port%%`. |
| `<PROMETHEUS_ENDPOINT>` | Chemin d'URL pour les métriques servies par le conteneur, au format Prometheus.                                                                   |
| `<NAMESPACE>`           | Définissez l'espace de noms à ajouter en préfixe à chaque métrique lorsqu'elle est affichée dans Datadog.                                                                      |
| `<METRIC_TO_FETCH>`     | Clé de métrique Prometheus à récupérer depuis l'endpoint Prometheus.                                                                        |
| `<NEW_METRIC_NAME>`     | Transforme la clé de métrique `<METRIC_TO_FETCH>` en `<NEW_METRIC_NAME>` dans Datadog.                                                          |


La configuration `metrics` est une liste de métriques à récupérer en tant que Custom Metrics. Incluez chaque métrique à récupérer et le nom de métrique souhaité dans Datadog sous forme de paires clé-valeur, par exemple `{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}`. Vous pouvez également fournir une liste de chaînes de noms de métriques, interprétées comme des expressions régulières, pour récupérer les métriques souhaitées avec leurs noms actuels. **Remarque :** Les expressions régulières peuvent potentiellement envoyer un grand nombre de Custom Metrics.

Pour obtenir la liste complète des paramètres disponibles pour les instances, y compris `namespace` et `metrics`, consultez l'exemple de configuration [openmetrics.d/conf.yaml][7].

## Mise en route {#getting-started}

### Collecte simple de métriques {#simple-metric-collection}

Pour commencer à collecter les métriques exposées par Prometheus s'exécutant dans un conteneur, suivez ces étapes :

1. Lancez le Datadog Agent :
    {{< tabs >}}
    {{% tab "Standard" %}}

```shell
docker run -d --cgroupns host \
    --pid host \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY="<DATADOG_API_KEY>" \
    registry.datadoghq.com/agent:latest
```
    {{% /tab %}}
    {{% tab "Windows" %}}

```shell
docker run -d -e DD_API_KEY="<DATADOG_API_KEY>" \
    registry.datadoghq.com/agent:latest \
    -v \\.\pipe\docker_engine:\\.\pipe\docker_engine
```
    {{% /tab %}}
    {{< /tabs >}}

2. Lancez un conteneur Prometheus exposant des exemples de métriques que l'Agent doit collecter, avec les labels d'Autodiscovery pour le check OpenMetrics.

    Les labels suivants permettront à l'Agent de collecter les métriques `promhttp_metric_handler_requests`, `promhttp_metric_handler_requests_in_flight` et toutes les métriques exposées commençant par `go_memory`.

    ```yaml
    labels:
      com.datadoghq.ad.check_names: '["openmetrics"]'
      com.datadoghq.ad.init_configs: '[{}]'
      com.datadoghq.ad.instances:  |
        [
          {
            "openmetrics_endpoint": "http://%%host%%:%%port%%/metrics",
            "namespace": "documentation_example_docker",
            "metrics": [
              {"promhttp_metric_handler_requests": "handler.requests"},
              {"promhttp_metric_handler_requests_in_flight": "handler.requests.in_flight"},
              "go_memory.*"
            ]
          }
        ]
    ```
    To launch an example Prometheus container with these labels you can run:

    ```shell
    docker run -d -l com.datadoghq.ad.check_names='["openmetrics"]' -l com.datadoghq.ad.init_configs='[{}]' -l com.datadoghq.ad.instances='[{"openmetrics_endpoint":"http://%%host%%:%%port%%/metrics","namespace":"documentation_example_docker","metrics":[{"promhttp_metric_handler_requests":"handler.requests"},{"promhttp_metric_handler_requests_in_flight":"handler.requests.in_flight"},"go_memory.*"]}]' prom/prometheus
    ```

3. Accédez à votre page [Metrics Catalog][8] pour consulter les métriques collectées :

    {{< img src="integrations/guide/prometheus_docker/openmetrics_v2_collected_metric_docker.png" alt="Métrique Prometheus collectée dans Docker">}}

## De l'intégration personnalisée à l'intégration officielle {#from-custom-to-official-integration}

Par défaut, toutes les métriques récupérées par le check Prometheus générique sont considérées comme des Custom Metrics. Si vous surveillez un logiciel standard et pensez qu'il mérite une intégration officielle, n'hésitez pas à [contribuer][5] !

Les intégrations officielles disposent de leurs propres répertoires dédiés. Le check générique dispose d'un mécanisme d'instance par défaut qui permet de coder en dur la configuration par défaut et les métadonnées des métriques. Par exemple, consultez l'intégration [kube-proxy][9].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/openmetrics/
[2]: /fr/integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /fr/extend/custom_checks/prometheus/
[6]: https://docs.datadoghq.com/fr/agent/guide/template_variables/
[7]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[8]: https://app.datadoghq.com/metric/catalog
[9]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy