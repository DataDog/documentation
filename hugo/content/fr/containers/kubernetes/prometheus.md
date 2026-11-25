---
aliases:
- /fr/getting_started/prometheus
- /fr/getting_started/integrations/prometheus
- /fr/agent/openmetrics
- /fr/agent/prometheus
- /fr/agent/kubernetes/prometheus
description: Collectez les métriques Prometheus et OpenMetrics à partir des workloads
  Kubernetes en utilisant le Datadog Agent avec Autodiscovery
further_reading:
- link: /agent/kubernetes/log/
  tag: Documentation
  text: Recueillir les logs de votre application
- link: /agent/kubernetes/apm/
  tag: Documentation
  text: Recueillir les traces de votre application
- link: /agent/kubernetes/integrations/
  tag: Documentation
  text: Recueillez automatiquement les métriques et les logs de vos applications
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limitez la collecte de données à un sous-ensemble de conteneurs
- link: /agent/kubernetes/tag/
  tag: Documentation
  text: Attribuez des tags à toutes les données envoyées par un conteneur
- link: /integrations/guide/prometheus-metrics/
  tag: Documentation
  text: Mappage des métriques Prometheus vers les métriques Datadog
- link: https://www.datadoghq.com/blog/migrate-to-gateway-api/
  tag: Blog
  text: 'Ingress NGINX est en fin de vie (EOL) : un guide pratique pour migrer vers
    Kubernetes Gateway API'
- link: https://www.datadoghq.com/blog/kubernetes-operator-performance
  tag: Blog
  text: Surveillez vos opérateurs Kubernetes pour assurer le bon fonctionnement de
    vos applications.
title: Collecte de métriques Prometheus et OpenMetrics sur Kubernetes
---
## Présentation {#overview}

Collectez vos métriques Prometheus et OpenMetrics exposées depuis votre application s'exécutant dans Kubernetes en utilisant le Datadog Agent et les intégrations [OpenMetrics][1] ou [Prometheus][2]. Par défaut, toutes les métriques récupérées par le check Prometheus générique sont considérées comme des Custom Metrics.

À partir de la version 6.5.0, l'Agent inclut des checks [OpenMetrics][3] et [Prometheus][4] capables de scraper des endpoints Prometheus. Pour une utilisation plus avancée de l'interface `OpenMetricsCheck`, y compris l'écriture d'un check personnalisé, consultez la section [Developer Tools][5].

Cette page explique l'utilisation de base de ces checks, qui vous permettent de scraper des Custom Metrics à partir d'endpoints Prometheus. Pour une explication sur la façon dont les métriques Prometheus et OpenMetrics sont mappées vers les métriques Datadog, consultez le guide [Mapping Prometheus Metrics to Datadog Metrics][6].

**Note** : Datadog recommande d'utiliser le check OpenMetrics car il est plus efficace et prend entièrement en charge le format texte Prometheus. Utilisez le check Prometheus uniquement lorsque l'endpoint de métriques ne prend pas en charge un format texte.

## Configuration {#setup}

### Installation {#installation}

[Déployez le Datadog Agent dans votre cluster Kubernetes][7]. Les checks OpenMetrics et Prometheus sont inclus dans le package [Datadog Agent][8], vous n'avez donc rien d'autre à installer sur vos conteneurs ou vos hôtes.

### Configuration {#configuration}

Configurez votre check OpenMetrics ou Prometheus en utilisant l'Autodiscovery. Utilisez des annotations de pod ou des ressources personnalisées `DatadogInstrumentation`.

{{< tabs >}}
{{% tab "Annotations (AD v2)" %}}

**Note :** Les annotations AD v2 ont été introduites dans la version 7.36 du Datadog Agent pour simplifier la configuration des intégrations. Pour les versions précédentes du Datadog Agent, utilisez les annotations AD v1.

```yaml
# (...)
metadata:
  #(...)
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: |
      {
        "openmetrics": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:%%port%%/<PROMETHEUS_ENDPOINT> ",
              "namespace": "<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>",
              "metrics": [{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}]
            }
          ]
        }
      }

spec:
  containers:
    - name: '<CONTAINER_NAME>'
```

{{% /tab %}}
{{% tab "Annotations (AD v1)" %}}

```yaml
# (...)
metadata:
  #(...)
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.check_names: |
      ["openmetrics"]
    ad.datadoghq.com/<CONTAINER_NAME>.init_configs: |
      [{}]
    ad.datadoghq.com/<CONTAINER_NAME>.instances: |
      [
        {
          "openmetrics_endpoint": "http://%%host%%:%%port%%/<PROMETHEUS_ENDPOINT> ",
          "namespace": "<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>",
          "metrics": [{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}]
        }
      ]
spec:
  containers:
    - name: '<CONTAINER_NAME>'
```

{{% /tab %}}
{{% tab "CRD DatadogInstrumentation" %}}

Utilisez une ressource personnalisée `DatadogInstrumentation` pour configurer un check OpenMetrics sans ajouter d'annotations de pod. Pour plus d'informations, consultez [Configure Autodiscovery with DatadogInstrumentation CRD][17].

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: example-cr
  namespace: <WORKLOAD_NAMESPACE>
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: <WORKLOAD_NAME>
  config:
    checks:
      - integration: openmetrics
        containerName: <CONTAINER_NAME>
        instances:
          - openmetrics_endpoint: "http://%%host%%:%%port%%/<PROMETHEUS_ENDPOINT>"
            namespace: "<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>"
            metrics:
              - "<METRIC_TO_FETCH>": "<NEW_METRIC_NAME>"
```

[17]: /fr/containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/

{{% /tab %}}
{{< /tabs >}}

Avec les valeurs d'espace réservé de configuration suivantes :

| Espace réservé                              | Description                                                                                        |
|------------------------------------------|----------------------------------------------------------------------------------------------------|
| `<WORKLOAD_NAMESPACE>`                   | Espace de noms contenant la charge de travail cible et la ressource `DatadogInstrumentation`.             |
| `<WORKLOAD_NAME>`                        | Nom de la charge de travail ciblée par la ressource `DatadogInstrumentation`.                            |
| `<CONTAINER_NAME>`                       | Correspond au nom du conteneur qui expose les métriques.                                        |
| `<PROMETHEUS_ENDPOINT>`                  | Chemin d'URL pour les métriques servies par le conteneur, au format Prometheus.                            |
| `<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>` | Définissez l'espace de noms à préfixer à chaque métrique lors de sa consultation dans Datadog.                               |
| `<METRIC_TO_FETCH>`                      | Clé de métrique Prometheus à récupérer depuis l'endpoint Prometheus.                                 |
| `<NEW_METRIC_NAME>`                      | Transforme la clé de métrique `<METRIC_TO_FETCH>` en `<NEW_METRIC_NAME>` dans Datadog.                   |


La configuration `metrics` est une liste de métriques à récupérer en tant que Custom Metrics. Incluez chaque métrique à récupérer et le nom de métrique souhaité dans Datadog sous forme de paires clé-valeur, par exemple `{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}`. Pour éviter des frais excessifs liés aux Custom Metrics, Datadog recommande de limiter le périmètre afin d'inclure uniquement les métriques dont vous avez besoin. Vous pouvez également fournir une liste de chaînes de noms de métriques, interprétées comme des expressions régulières, pour récupérer les métriques souhaitées avec leurs noms actuels. Si vous souhaitez **toutes** les métriques, utilisez `".*"` plutôt que `"*"`.

**Remarque :** Les expressions régulières peuvent potentiellement envoyer un grand nombre de Custom Metrics.

Pour obtenir une liste complète des paramètres disponibles pour les instances, y compris `namespace` et `metrics`, consultez l'exemple de configuration [openmetrics.d/conf.yaml][9].

**Remarque** : Le check se limite par défaut à 2000 métriques. Spécifiez le paramètre optionnel `max_returned_metrics` pour modifier cette limite.

## Mise en route {#getting-started}

### Collecte simple de métriques (check OpenMetrics) {#simple-metric-collection-openmetrics-check}

1. [Lancez le Datadog Agent][10].

2. Utilisez l'[exemple de déploiement Prometheus `prometheus.yaml`][11] pour lancer un déploiement Prometheus avec la configuration d'Autodiscovery sur le pod :
   {{< tabs >}}
   {{% tab "Kubernetes (AD v2)" %}}

   **Note :** Les annotations AD v2 ont été introduites dans la version 7.36 du Datadog Agent pour simplifier la configuration des intégrations. Pour les versions précédentes du Datadog Agent, utilisez les annotations AD v1.

   ```yaml
     # (...)
    spec:
      template:
        metadata:
          annotations:
            ad.datadoghq.com/prometheus-example.checks: |
              {
                "openmetrics": {
                  "instances": [
                    {
                      "openmetrics_endpoint": "http://%%host%%:%%port%%/metrics",
                      "namespace": "documentation_example_kubernetes",
                      "metrics": [
                          {"promhttp_metric_handler_requests": "handler.requests"},
                          {"promhttp_metric_handler_requests_in_flight": "handler.requests.in_flight"},
                          "go_memory.*"
                        ]
                    }
                  ]
                }
              }
        spec:
          containers:
          - name: prometheus-example
          # (...)
   ```
   {{% /tab %}}
   {{% tab "Kubernetes (AD v1)" %}}

   ```yaml
     # (...)
    spec:
      template:
        metadata:
          annotations:
            ad.datadoghq.com/prometheus-example.check_names: |
              ["openmetrics"]
            ad.datadoghq.com/prometheus-example.init_configs: |
              [{}]
            ad.datadoghq.com/prometheus-example.instances: |
              [
                {
                  "openmetrics_endpoint": "http://%%host%%:%%port%%/metrics",
                  "namespace": "documentation_example_kubernetes",
                  "metrics": [
                    {"promhttp_metric_handler_requests": "handler.requests"},
                    {"promhttp_metric_handler_requests_in_flight": "handler.requests.in_flight"},
                    "go_memory.*"
                  ]
                }
              ]
        spec:
          containers:
          - name: prometheus-example
          # (...)
   ```

   {{% /tab %}}
   {{% tab "CRD DatadogInstrumentation" %}}

   <div class="alert alert-info">

   Cette configuration nécessite Datadog Agent et Cluster Agent v7.82 ou version ultérieure. Activez le contrôleur avec Datadog Operator v1.29+ ou Datadog Helm chart v3.236.0+. Pour obtenir des instructions de configuration, consultez [Configure Autodiscovery with DatadogInstrumentation CRD][17].

   </div>

  Le fichier `prometheus.yaml` d'exemple définit le même check qu'une annotation de pod. Supprimez cette annotation car les annotations sont prioritaires sur les ressources `DatadogInstrumentation`. Enregistrez la ressource suivante sous `prometheus-instrumentation.yaml` :

   ```yaml
   apiVersion: datadoghq.com/v1alpha1
   kind: DatadogInstrumentation
   metadata:
     name: prometheus-example
     namespace: <WORKLOAD_NAMESPACE>
   spec:
     targetRef:
       apiVersion: apps/v1
       kind: Deployment
       name: prometheus-example
     config:
       checks:
         - integration: openmetrics
           containerName: prometheus-example
           instances:
             - openmetrics_endpoint: "http://%%host%%:%%port%%/metrics"
               namespace: "documentation_example_kubernetes"
               metrics:
                 - promhttp_metric_handler_requests: "handler.requests"
                 - promhttp_metric_handler_requests_in_flight: "handler.requests.in_flight"
                 - "go_memory.*"
   ```

   [17]: /containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/

   {{% /tab %}}
   {{< /tabs >}}

     Command to create the Prometheus Deployment:

    ```shell
    kubectl create -f prometheus.yaml
    ```

   Si vous utilisez une ressource `DatadogInstrumentation`, appliquez-la après avoir créé le Deployment :

    

```shell
    kubectl apply -f prometheus-instrumentation.yaml
    ```

3. Accédez à votre page [Fleet Automation][16] et filtrez par l'intégration `openmetrics` pour afficher des informations détaillées sur le statut de vos checks.

4. Accédez à votre page [Metrics Catalog][12] pour voir les métriques collectées à partir de cet exemple de pod. Cette configuration collectera les métriques `promhttp_metric_handler_requests` et `promhttp_metric_handler_requests_in_flight`, ainsi que toutes les métriques exposées commençant par `go_memory`.

    {{< img src="integrations/guide/prometheus_kubernetes/openmetrics_v2_collected_metric_kubernetes.png" alt="Métrique Prometheus collectée sur Kubernetes">}}

## Collecte de métriques avec des annotations Prometheus (check Prometheus) {#metric-collection-with-prometheus-annotations-prometheus-check}

Avec Prometheus Autodiscovery, le Datadog Agent est capable de détecter les annotations Prometheus natives (par exemple : `prometheus.io/scrape`, `prometheus.io/path`, `prometheus.io/port`) et de planifier automatiquement des checks OpenMetrics pour collecter des métriques Prometheus dans Kubernetes.

**Remarque** : Datadog recommande d'utiliser le check OpenMetrics car il est plus efficace et prend entièrement en charge le format texte Prometheus. Utilisez le check Prometheus uniquement lorsque l'endpoint de métriques ne prend pas en charge un format texte.

### Prérequis {#requirements}

- Datadog Agent v7.27+ ou v6.27+ (pour les checks de pod)
- Datadog Cluster Agent v1.11+ (pour les checks de service et d'endpoint)

### Configuration {#configuration-1}

Il est recommandé de vérifier d'abord quels pods et services possèdent l'annotation `prometheus.io/scrape=true` avant d'activer cette fonctionnalité. Cela peut être effectué avec les commandes suivantes :

```shell
kubectl get pods -o=jsonpath='{.items[?(@.metadata.annotations.prometheus\.io/scrape=="true")].metadata.name}' --all-namespaces

kubectl get services -o=jsonpath='{.items[?(@.metadata.annotations.prometheus\.io/scrape=="true")].metadata.name}' --all-namespaces
```

Une fois la fonctionnalité de scraping Prometheus activée, le Datadog Agent collecte des Custom Metrics à partir de ces ressources. Si vous ne souhaitez pas collecter les Custom Metrics de ces ressources, vous pouvez supprimer cette annotation ou mettre à jour les règles d'Autodiscovery comme décrit dans la [section de configuration avancée](#advanced-configuration).

**Remarque** : L'activation de cette fonctionnalité sans configuration avancée peut entraîner une augmentation significative du nombre de Custom Metrics, ce qui peut avoir des conséquences sur la facturation. Consultez la [section de configuration avancée](#advanced-configuration) pour savoir comment collecter uniquement les métriques d'un sous-ensemble de conteneurs/pods/services.

#### Configuration de base {#basic-configuration}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Mettez à jour votre configuration du Datadog Operator pour inclure ce qui suit :

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    prometheusScrape:
      enabled: true
      enableServiceEndpoints: true
{{< /code-block >}}

{{% k8s-operator-redeploy %}}

{{% /tab %}}
{{% tab "Helm" %}}

Mettez à jour votre configuration Helm pour inclure ce qui suit :

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  # (...)
  prometheusScrape:
    enabled: true
    serviceEndpoints: true
  # (...)
{{< /code-block >}}

{{% k8s-helm-redeploy %}}

{{% /tab %}}
{{% tab "Manuel (DaemonSet)" %}}

Dans votre manifeste DaemonSet pour l'Agent `daemonset.yaml`, ajoutez les variables d'environnement suivantes pour le conteneur de l'Agent :

```yaml
- name: DD_PROMETHEUS_SCRAPE_ENABLED
  value: "true"
- name: DD_PROMETHEUS_SCRAPE_VERSION
  value: "2"
```
Si le Cluster Agent est activé, dans son manifeste `cluster-agent-deployment.yaml`, ajoutez les variables d'environnement suivantes pour le conteneur du Cluster Agent :

```yaml
- name: DD_PROMETHEUS_SCRAPE_ENABLED
  value: "true"
- name: DD_PROMETHEUS_SCRAPE_SERVICE_ENDPOINTS
  value: "true"
```

{{% /tab %}}
{{< /tabs >}}

Cela indique au Datadog Agent de détecter les pods qui possèdent des annotations Prometheus natives et de générer les vérifications OpenMetrics correspondantes.

Cela indique également au Datadog Cluster Agent (s'il est activé) de détecter les services qui possèdent des annotations Prometheus natives et de générer les vérifications OpenMetrics correspondantes.

- `prometheus.io/scrape=true`: Requis.
- `prometheus.io/path`: Facultatif, par défaut `/metrics`.
- `prometheus.io/port` : Facultatif, par défaut `%%port%%`, une [variable de modèle][13] qui est remplacée par le port du conteneur/service.

Cette configuration génère une vérification qui collecte toutes les métriques exposées en utilisant la configuration par défaut de l'[intégration OpenMetrics][1].

#### Configuration avancée {#advanced-configuration}

Vous pouvez configurer davantage la collecte de métriques (au-delà des annotations Prometheus natives) avec le champ `additionalConfigs`.

##### Configurations de vérification OpenMetrics supplémentaires {#additional-openmetrics-check-configurations}

Utilisez `additionalConfigs.configurations` pour définir des configurations de vérification OpenMetrics supplémentaires. Consultez la [liste des paramètres OpenMetrics pris en charge][15] que vous pouvez transmettre dans `additionalConfigs`.

##### Règles d'Autodiscovery personnalisées {#custom-autodiscovery-rules}

Utilisez `additionalConfigs.autodiscovery` pour définir des règles d'Autodiscovery personnalisées. Ces règles peuvent être basées sur des noms de conteneurs, des annotations Kubernetes ou les deux.

`additionalConfigs.autodiscovery.kubernetes_container_names`
: Une liste de noms de conteneurs à cibler, au format d'expression régulière.

`additionalConfigs.autodiscovery.kubernetes_annotations`
: Deux tables de correspondance d'annotations (`include` et `exclude`) permettant de définir des règles de découverte.

  Par défaut :
  ```yaml
  include:
     prometheus.io/scrape: "true"
  exclude:
     prometheus.io/scrape: "false"
  ```

Si `kubernetes_container_names` et `kubernetes_annotations` sont tous deux définis, la logique **ET** est utilisée (les deux règles doivent correspondre).

##### Exemples {#examples}

La configuration suivante cible un conteneur nommé `my-app` s'exécutant dans un pod avec l'annotation `app=my-app`. La configuration de la vérification OpenMetrics est personnalisée pour activer l'option `send_distribution_buckets` et définir un délai d'expiration personnalisé de 5 secondes.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Mettez à jour votre configuration du Datadog Operator pour inclure ce qui suit :

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    prometheusScrape:
      enabled: true
      enableServiceEndpoints: true
      additionalConfigs: |-
        - autodiscovery:
            kubernetes_container_names:
              - my-app
            kubernetes_annotations:
              include:
                app: my-app
          configurations:
            - timeout: 5
              send_distribution_buckets: true
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  # (...)
  prometheusScrape:
    enabled: true
    serviceEndpoints: true
    additionalConfigs:
      - autodiscovery:
          kubernetes_container_names:
            - my-app
          kubernetes_annotations:
            include:
              app: my-app
        configurations:
          - timeout: 5
            send_distribution_buckets: true

{{< /code-block >}}
{{% /tab %}}
{{% tab "Manuel (DaemonSet)" %}}

Pour DaemonSet, la configuration avancée est définie dans la variable d'environnement `DD_PROMETHEUS_SCRAPE_CHECKS`, et non dans un champ `additionalConfigs`.

```yaml
- name: DD_PROMETHEUS_SCRAPE_ENABLED
  value: "true"
- name: DD_PROMETHEUS_SCRAPE_CHECKS
  value: "[{\"autodiscovery\":{\"kubernetes_annotations\":{\"include\":{\"app\":\"my-app\"}},\"kubernetes_container_names\":[\"my-app\"]},\"configurations\":[{\"send_distribution_buckets\":true,\"timeout\":5}]}]"
- name: DD_PROMETHEUS_SCRAPE_VERSION
  value: "2"
```


[1]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[2]: https://github.com/DataDog/datadog-agent/blob/main/comp/core/autodiscovery/common/types/prometheus.go#L99-L123
{{% /tab %}}
{{< /tabs >}}

## De l'intégration personnalisée à l'intégration officielle {#from-custom-to-official-integration}

Par défaut, toutes les métriques récupérées par le check Prometheus générique sont considérées comme des Custom Metrics. Si vous surveillez un logiciel standard et pensez qu'il mérite une intégration officielle, n'hésitez pas à [contribuer][5] !

Les intégrations officielles disposent de leurs propres répertoires dédiés. Il existe un mécanisme d'instance par défaut dans le check générique pour coder en dur la configuration par défaut et les métadonnées des métriques. Par exemple, consultez l'intégration [kube-proxy][14].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/openmetrics/
[2]: /fr/integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /fr/extend/custom_checks/prometheus/
[6]: /fr/integrations/guide/prometheus-metrics
[7]: /fr/agent/kubernetes/#installation
[8]: /fr/getting_started/tagging/
[9]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[10]: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
[11]: /fr/resources/yaml/prometheus.yaml
[12]: https://app.datadoghq.com/metric/catalog
[13]: /fr/agent/faq/template_variables/
[14]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy
[15]: https://github.com/DataDog/datadog-agent/blob/main/comp/core/autodiscovery/common/types/prometheus.go#L57-L123
[16]: https://app.datadoghq.com/fleet?query=integration:openmetrics