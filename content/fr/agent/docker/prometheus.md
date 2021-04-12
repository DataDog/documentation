---
title: Collecte de métriques Prometheus et OpenMetrics Docker
kind: documentation
further_reading:
  - link: /agent/docker/log/
    tag: Documentation
    text: Recueillir les logs de votre application
  - link: /agent/docker/apm/
    tag: Documentation
    text: Recueillir les traces de votre application
  - link: /agent/docker/integrations/
    tag: Documentation
    text: Recueillir automatiquement les métriques et les logs de vos applications
  - link: /agent/guide/autodiscovery-management/
    tag: Documentation
    text: Limiter la collecte de données à un seul sous-ensemble de conteneurs
  - link: /agent/docker/tag/
    tag: Documentation
    text: Attribuer des tags à toutes les données émises par un conteneur
---
Recueillez vos métriques Prometheus et OpenMetrics exposées à partir de votre application exécutée dans vos conteneurs à l'aide de l'Agent Datadog et de l'intégration [Datadog/OpenMetrics][1] ou [Datadog/Prometheus][2].

## Présentation

Depuis la version 6.5.0, l'Agent inclut des checks [OpenMetrics][3] et [Prometheus][4] capables de scraper les endpoints Prometheus. Nous vous conseillons d'utiliser le check OpenMetrics du fait de son efficacité accrue et de sa prise en charge complète du format texte Prometheus. Pour en savoir plus sur l'utilisation avancée de l'interface `OpenMetricsCheck` et le développement d'un check custom, consultez la section [Outils de développement][5]. N'utilisez le check Prometheus que lorsque l'endpoint de métriques ne prend pas en charge un format texte.

Cette page décrit les principes d'utilisation de base de ces checks. Ils vous permettent d'importer toutes vos métriques Prometheus exposées dans Datadog.

## Configuration

### Installation

Lancez l'Agent Docker à côté de vos autres conteneurs en remplaçant `<CLÉ_API_DATADOG>` par la clé d'API de votre organisation dans la commande ci-dessous :

{{< tabs >}}
{{% tab "Standard" %}}

```shell
DOCKER_CONTENT_TRUST=1 \
docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY="<CLÉ_API_DATADOG>" \
              -e DD_SITE="<VOTRE_SITE_DATADOG>" \
              gcr.io/datadoghq/agent:latest
```

{{% /tab %}}
{{% tab "Amazon Linux version <2" %}}

```shell
DOCKER_CONTENT_TRUST=1 \
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
DOCKER_CONTENT_TRUST=1 \
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
LABEL "com.datadoghq.ad.instances"='["{\"prometheus_url\":\"http://%%host%%:<PORT_PROMETHEUS>/<ENDPOINT_PROMETHEUS> \",\"namespace\":\"<ESPACENOMMAGE>\",\"metrics\":[{\"<MÉTRIQUE_À_RÉCUPÉRER>\": \"<NOUVEAU_NOM_MÉTRIQUE>\"}]}"]'
```

{{% /tab %}}
{{% tab "docker-compose.yaml" %}}

```yaml
labels:
    com.datadoghq.ad.check_names: '["openmetrics"]'
    com.datadoghq.ad.init_configs: '[{}]'
    com.datadoghq.ad.instances:  >
    [
      "{\
        "prometheus_url\":\"http://%%host%%:<PORT_PROMETHEUS>/<ENDPOINT_PROMETHEUS> \",\"namespace\":\"<ESPACENOMMAGE>\",
        \"metrics\":[{\"<MÉTRIQUE_À_RÉCUPÉRER>\": \"<NOUVEAU_NOM_MÉTRIQUE>\"}]
      }"
    ]
```

{{% /tab %}}
{{% tab "Commande d'exécution du Docker" %}}

```shell
-l com.datadoghq.ad.check_names='["openmetrics"]' -l com.datadoghq.ad.init_configs='[{}]' -l com.datadoghq.ad.instances='["{\"prometheus_url\":\"http://%%host%%:<PORT_PROMETHEUS>/<ENDPOINT_PROMETHEUS> \",\"namespace\":\"<ESPACENOMMAGE>\",\"metrics\":[{\"<MÉTRIQUE_À_RÉCUPÉRER>\": \"<NOUVEAU_NOM_MÉTRIQUE>\"}]}"]'
```

{{% /tab %}}
{{< /tabs >}}

Les placeholders à configurer sont les suivants :

| Placeholder                              | Description                                                                                                                                                                                                    |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<PORT_PROMETHEUS>`                      | Le port auquel se connecter afin d'accéder à l'endpoint Prometheus.                                                                                                                                                 |
| `<ENDPOINT_PROMETHEUS>`                  | L'URL pour les métriques traitées par le conteneur, au format Prometheus.                                                                                                                                             |
| `<ESPACENOMMAGE>` | L'espace de nommage spécifié ici sera ajouté comme préfixe à chaque métrique lors de son affichage dans Datadog.                                                                                                                                           |
| `<MÉTRIQUE_À_RÉCUPÉRER>`                      | La clé de la métrique Prometheus à récupérer à partir de l'endpoint Prometheus.                                                                                                                                             |
| `<NOUVEAU_NOM_MÉTRIQUE>`                      | Lorsque ce paramètre facultatif est défini, la clé de métrique `<MÉTRIQUE_À_RÉCUPÉRER>` est remplacée par le `<NOUVEAU_NOM_MÉTRIQUE>` dans Datadog. Si vous choisissez de ne pas utiliser cette option, passez une liste de chaînes plutôt que des paires `key:value`. |

**Remarque** : consultez le fichier d'exemple [openmetrics.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles.

## Débuter

### Collecte de métriques simple

Pour commencer à recueillir des métriques exposées par un déploiement Prometheus exécuté dans un conteneur, suivez les étapes ci-dessous :

1. Lancez l'Agent Datadog :
    {{< tabs >}}
    {{% tab "Configuration standard" %}}

```shell
DOCKER_CONTENT_TRUST=1 \
docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY="<CLÉ_API_DATADOG>" \
              gcr.io/datadoghq/agent:latest
```
    {{% /tab %}}
    {{% tab "Windows" %}}

```shell
DOCKER_CONTENT_TRUST=1 \
docker run -d -e DD_API_KEY="<CLÉ_API_DATADOG>" \
              gcr.io/datadoghq/agent:latest \
              -v \\.\pipe\docker_engine:\\.\pipe\docker_engine
```
    {{% /tab %}}
    {{< /tabs >}}

2. Pour lancer Prometheus dans un conteneur, exécutez : `docker run -p 9090:9090 prom/prometheus`. Pour demander à l'Agent d'interroger ce conteneur à l'aide du check OpenMetrics, ajoutez la configuration suivante :

    ```shell
    -l com.datadoghq.ad.check_names='["openmetrics"]' -l com.datadoghq.ad.init_configs='[{}]' -l com.datadoghq.ad.instances='[  {"prometheus_url":"http://%%host%%:%%port%%/metrics","namespace":"documentation_example_docker","metrics":[ {"promhttp_metric_handler_requests_total": "prometheus.handler.requests.total"}]}]'
    ```

     Pour lancer le conteneur Prometheus avec les annotations nécessaires au bon fonctionnement d'Autodiscovery, exécutez :

    ```shell
    docker run -p 9090:9090 -l com.datadoghq.ad.check_names='["openmetrics"]' -l com.datadoghq.ad.init_configs='[{}]' -l com. datadoghq.ad.instances='[{"prometheus_url":"http://%%host%%:%%port%%/metrics","namespace":"documentation_example_docker",  "metrics":[{"promhttp_metric_handler_requests_total": "prometheus.handler.requests.total"}]}]' prom/prometheus
    ```

3. Accédez à votre [page Metric summary][7] pour visualiser les métriques recueillies : `prometheus_target_interval_length_seconds*`.

    {{< img src="integrations/guide/prometheus_docker/prometheus_collected_metric_docker.png" alt="Métriques Prometheus recueillies Docker">}}

## Proposer une intégration personnalisée comme intégration officielle

Par défaut, toutes les métriques récupérées par le check Prometheus générique sont considérées comme des métriques custom. Si vous surveillez un logiciel prêt à l'emploi et que vous pensez qu'il mérite une intégration officielle, n'hésitez pas à apporter votre [contribution][5] !

Les intégrations officielles utilisent des répertoires dédiés. Le check générique intègre un système de création d'instances qui se charge de coder en dur la configuration par défaut et les métadonnées des métriques. Reportez-vous au référentiel sur l'intégration [kube-proxy][8] pour obtenir un exemple.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/openmetrics/
[2]: /fr/integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /fr/developers/prometheus/
[6]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[7]: https://app.datadoghq.com/metric/summary
[8]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy