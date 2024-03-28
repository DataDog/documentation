---
aliases:
- /fr/agent/docker/prometheus
further_reading:
- link: /agent/docker/log/
  tag: Documentation
  text: Recueillir les logs de votre application
- link: /agent/docker/apm/
  tag: Documentation
  text: Recueillir les traces de vos applications
- link: /agent/docker/integrations/
  tag: Documentation
  text: Recueillir automatiquement les métriques et les logs de vos applications
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limiter la collecte de données à un sous-ensemble de conteneurs
- link: /agent/docker/tag/
  tag: Documentation
  text: Attribuer des tags à toutes les données envoyées par un conteneur
kind: documentation
title: Collecte de métriques Prometheus et OpenMetrics Docker
---

Recueillez vos métriques Prometheus et OpenMetrics exposées à partir de votre application exécutée dans vos conteneurs à l'aide de l'Agent Datadog et de l'intégration [Datadog/OpenMetrics][1] ou [Datadog/Prometheus][2].

## Présentation

Depuis la version 6.5.0, l'Agent inclut des checks [OpenMetrics][3] et [Prometheus][4] capables de scraper les endpoints Prometheus. Nous vous conseillons d'utiliser le check OpenMetrics du fait de son efficacité accrue et de sa prise en charge complète du format texte Prometheus. Pour en savoir plus sur l'utilisation avancée de l'interface `OpenMetricsCheck` et le développement d'un check custom, consultez la section [Outils de développement][5]. N'utilisez le check Prometheus que lorsque l'endpoint de métriques ne prend pas en charge un format texte.

Cette page décrit les principes d'utilisation de base de ces checks. Ils vous permettent d'importer toutes vos métriques Prometheus exposées dans Datadog.

Les commandes CLI sur cette page servent au runtime Docker. Remplacez `docker` par `nerdctl` pour le runtime containerd, ou `podman` pour le runtime Podman.

## Configuration

### Installation

Lancez l'Agent Docker à côté de vos autres conteneurs en remplaçant `<CLÉ_API_DATADOG>` par la clé d'API de votre organisation dans la commande ci-dessous :

{{< tabs >}}
{{% tab "Intégration standard" %}}

```shell
docker run -d --cgroupns host \
    --pid host \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY="<DATADOG_API_KEY>" \
    -e DD_SITE="<YOUR_DATADOG_SITE>" \
    gcr.io/datadoghq/agent:latest
```

{{% /tab %}}
{{% tab "Version < 2 d'Amazon Linux" %}}

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY="<CLÉ_API_DATADOG>" \
    -e DD_SITE="<VOTRE_SITE_DATADOG>" \
    gcr.io/datadoghq/agent:latest
```

{{% /tab %}}
{{% tab "Windows" %}}

```shell
docker run -d -e DD_API_KEY="<CLÉ_API_DATADOG>" \
    -e DD_SITE="<VOTRE_SITE_DATADOG>" \
    gcr.io/datadoghq/agent:latest
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : votre site Datadog est {{< region-param key="dd_site" code="true" >}}.

### Configuration

L'Agent détecte s'il est exécuté sur Docker et recherche automatiquement des étiquettes Datadog/OpenMetrics parmi l'ensemble des étiquettes de conteneurs. Autodiscovery s'attend à ce que les étiquettes ressemblent à ces exemples, selon le type de fichier :

{{< tabs >}}
{{% tab "Dockerfile" %}}

```conf
LABEL "com.datadoghq.ad.check_names"='["openmetrics"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='["{\"openmetrics_endpoint\":\"http://%%host%%:<PORT_PROMETHEUS>/<ENDPOINT_PROMETHEUS> \",\"namespace\":\"<ESPACENOMMAGE>\",\"metrics\":[{\"<MÉTRIQUE_À_RÉCUPÉRER>\": \"<NOUVEAU_NOM_MÉTRIQUE>\"}]}"]'
```

#### Plusieurs exemples dʼendpoints

```conf
LABEL "com.datadoghq.ad.check_names"='["openmetrics","openmetrics"]'
LABEL "com.datadoghq.ad.init_configs"='[{},{}]'
LABEL "com.datadoghq.ad.instances"='["{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}", "{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}"]'
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
        "openmetrics_endpoint": "http://%%host%%:<PORT_PROMETHEUS>/<ENDPOINT_PROMETHEUS>",
        "namespace": "<ESPACENOMMAGE>",
        "metrics": [
          {"<MÉTRIQUE_À_RÉCUPÉRER>": "<NOUVEAU_NOM_MÉTRIQUE>"}
        ]
      }
    ]
```

**Plusieurs exemples dʼendpoints** :

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
{{% tab "Commande d'exécution du Docker" %}}

```shell
# une seule métrique
-l com.datadoghq.ad.check_names='["openmetrics"]' -l com.datadoghq.ad.init_configs='[{}]' -l com.datadoghq.ad.instances="[{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>\",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}]"
```

**Exemples de formats de métriques dans `com.datadoghq.ad.instances`**

```shell
# plusieurs métriques
-l com.datadoghq.ad.instances="[{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>\",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}, {\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}]"
```

```shell
# toutes les métriques dʼun type de base
-l com.datadoghq.ad.instances="[{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>\",\"namespace\":\"<NAMESPACE>\",\"metrics\":[\"<METRIC_BASE_TO_FETCH>.*\"]}]"
```

```shell
# toutes les métriques
-l com.datadoghq.ad.instances="[{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT>\",\"namespace\":\"<NAMESPACE>\",\"metrics\":[\".*\"]}]"
```

**Plusieurs exemples dʼendpoints** :

```shell
-l com.datadoghq.ad.check_names='["openmetrics", "openmetrics"]' -l com.datadoghq.ad.init_configs='[{},{}]' -l com.datadoghq.ad.instances='["{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}", "{\"openmetrics_endpoint\":\"http://%%host%%:<PROMETHEUS_PORT>/<PROMETHEUS_ENDPOINT> \",\"namespace\":\"<NAMESPACE>\",\"metrics\":[{\"<METRIC_TO_FETCH>\": \"<NEW_METRIC_NAME>\"}]}"]'
```

{{% /tab %}}
{{< /tabs >}}

Les placeholders à configurer sont les suivants :

| Placeholder             | Description                                                                                                                               |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `<PORT_PROMETHEUS>`     | Le port auquel se connecter pour accéder à l'endpoint Prometheus. Il est possible d'utiliser à la place de ce placeholder la [template variable Autodiscovery][6] `%%port%%`. |
| `<ENDPOINT_PROMETHEUS>` | Le chemin d'URL pour les métriques traitées par le conteneur, au format Prometheus.                                                                   |
| `<ESPACENOMMAGE>`           | L'espace de nommage spécifié ici sera ajouté comme préfixe à chaque métrique lors de son affichage dans Datadog.                                                                      |
| `<MÉTRIQUE_À_RÉCUPÉRER>`     | La clé de la métrique Prometheus à récupérer à partir de l'endpoint Prometheus.                                                                        |
| `<NOUVEAU_NOM_MÉTRIQUE>`     | Remplace la clé de métrique `<MÉTRIQUE_À_RÉCUPÉRER>` par le `<NOUVEAU_NOM_MÉTRIQUE>` dans Datadog.                                                          |


Le paramètre `metrics` correspond à la liste des métriques à récupérer sous la forme de métriques custom. Ajoutez chaque métrique à récupérer et le nom de métrique souhaité dans Datadog sous la forme de paires key/value : `{"<MÉTRIQUE_À_RÉCUPÉRER>":"<NOUVEAU_NOM_MÉTRIQUE>"}`. Il est également possible de fournir une liste de noms de métriques sous forme de chaînes, qui seront interprétées en tant qu'expressions régulières, afin de récupérer les métriques de votre choix avec leur nom actuel. **Remarque** : les expressions régulières sont susceptibles d'envoyer un volume important de métriques custom.

Pour obtenir la liste complète des paramètres disponibles pour les instances, notamment `namespace` et `metrics`, consultez l'[exemple de configuration openmetrics.d/conf.yaml][7].

## Prise en main

### Collecte de métriques simple

Pour commencer à recueillir des métriques exposées par un déploiement Prometheus exécuté dans un conteneur, suivez les étapes ci-dessous :

1. Lancez l'Agent Datadog :
    {{< tabs >}}
    {{% tab "Configuration standard" %}}

```shell
docker run -d --cgroupns host \
    --pid host \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY="<DATADOG_API_KEY>" \
    gcr.io/datadoghq/agent:latest
```
    {{% /tab %}}
    {{% tab "Windows" %}}

```shell
docker run -d -e DD_API_KEY="<CLÉ_API_DATADOG>" \
    gcr.io/datadoghq/agent:latest \
    -v \\.\pipe\docker_engine:\\.\pipe\docker_engine
```
    {{% /tab %}}
    {{< /tabs >}}

2. Lancez un conteneur Prometheus exposant les exemples de métriques que l'Agent doit recueillir avec les étiquettes Autodiscovery pour le check OpenMetrics.

    Les étiquettes suivantes indiquent à l'Agent de recueillir les métriques `promhttp_metric_handler_requests` et `promhttp_metric_handler_requests_in_flight`, ainsi que toutes les métriques commençant par `go_memory` qui sont exposées.

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
    Pour lancer un exemple de conteneur Prometheus avec ces étiquettes, vous pouvez exécuter ce qui suit :

    ```shell
    docker run -d -l com.datadoghq.ad.check_names='["openmetrics"]' -l com.datadoghq.ad.init_configs='[{}]' -l com.datadoghq.ad.instances='[{"openmetrics_endpoint":"http://%%host%%:%%port%%/metrics","namespace":"documentation_example_docker","metrics":[{"promhttp_metric_handler_requests":"handler.requests"},{"promhttp_metric_handler_requests_in_flight":"handler.requests.in_flight"},"go_memory.*"]}]' prom/prometheus
    ```

3. Accédez à votre page [Metric summary][8] pour visualiser les métriques recueillies :

    {{< img src="integrations/guide/prometheus_docker/openmetrics_v2_collected_metric_docker.png" alt="Métrique Prometheus recueillie Docker">}}

## Proposer une intégration personnalisée comme intégration officielle

Par défaut, toutes les métriques récupérées par le check Prometheus générique sont considérées comme des métriques custom. Si vous surveillez un logiciel prêt à l'emploi et que vous pensez qu'il mérite une intégration officielle, n'hésitez pas à apporter votre [contribution][5] !

Les intégrations officielles utilisent des répertoires dédiés. Le check générique intègre un système de création d'instances qui se charge de coder en dur la configuration par défaut et les métadonnées des métriques. Reportez-vous au référentiel sur l'intégration [kube-proxy][9] pour obtenir un exemple.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/openmetrics/
[2]: /fr/integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /fr/developers/custom_checks/prometheus/
[6]: https://docs.datadoghq.com/fr/agent/guide/template_variables/
[7]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[8]: https://app.datadoghq.com/metric/summary
[9]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy