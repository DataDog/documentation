---
aliases:
- /fr/getting_started/prometheus
- /fr/getting_started/integrations/prometheus
- /fr/agent/openmetrics
- /fr/agent/prometheus
- /fr/agent/kubernetes/prometheus
description: Collectez Prometheus et OpenMetrics à partir des charges de travail Kubernetes
  en utilisant l'Agent Datadog avec Autodiscovery
further_reading:
- link: https://www.datadoghq.com/blog/kubernetes-operator-performance
  tag: Blog
  text: Surveillez vos opérateurs Kubernetes pour maintenir le bon fonctionnement
    des applications
- link: /agent/kubernetes/log/
  tag: Documentation
  text: Recueillir les logs de votre application
- link: /agent/kubernetes/apm/
  tag: Documentation
  text: Recueillir les traces de votre application
- link: /agent/kubernetes/integrations/
  tag: Documentation
  text: Recueillir automatiquement les métriques et les logs de vos applications
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limitez la collecte de données à un sous-ensemble de conteneurs
- link: /agent/kubernetes/tag/
  tag: Documentation
  text: Attribuez des tags à toutes les données envoyées par un conteneur
- link: /integrations/guide/prometheus-metrics/
  tag: Documentation
  text: Mappage de métriques Prometheus avec des métriques Datadog
title: Collecte de métriques Prometheus et OpenMetrics avec Kubernetes
---
## Aperçu {#overview}

Collectez vos métriques Prometheus et OpenMetrics exposées depuis votre application s'exécutant à l'intérieur de Kubernetes en utilisant l'Agent Datadog et les intégrations [OpenMetrics][1] ou [Prometheus][2]. Par défaut, toutes les métriques récupérées par la vérification générique de Prometheus sont considérées comme des métriques personnalisées.

À partir de la version 6.5.0, l'Agent inclut des vérifications [OpenMetrics][3] et [Prometheus][4] capables de récupérer les points de terminaison Prometheus. Pour une utilisation plus avancée de l'interface `OpenMetricsCheck`, y compris l'écriture d'une vérification personnalisée, consultez la section [Outils de développement][5].

Cette page décrit les principes d'utilisation de base de ces checks. Ils vous permettent de scraper des métriques custom à partir d'endpoints Prometheus. Pour obtenir une explication sur le mappage de métriques Prometheus et OpenMetrics avec des métriques Datadog, consultez le [guide dédié][6].

**Remarque** : Datadog recommande d'utiliser la vérification OpenMetrics car elle est plus efficace et prend entièrement en charge le format texte de Prometheus. Utilisez la vérification Prometheus uniquement lorsque le point de terminaison des métriques ne prend pas en charge un format texte.

## Configuration {#setup}

### Installation {#installation}

[Déployez l'Agent Datadog dans votre cluster Kubernetes][7]. Les vérifications OpenMetrics et Prometheus sont incluses dans le package [Datadog Agent][8], vous n'avez donc pas besoin d'installer quoi que ce soit d'autre sur vos conteneurs ou hôtes.

### Configuration {#configuration}

Configurez votre vérification OpenMetrics ou Prometheus en utilisant Autodiscovery, en appliquant le `annotations` suivant à votre **pod** exposant les métriques OpenMetrics/Prometheus :

{{< tabs >}}
{{% tab "Kubernetes (AD v2)" %}}

**Remarque :** Les annotations AD v2 ont été introduites dans la version 7.36 de l'Agent Datadog pour simplifier la configuration de l'intégration. Pour les versions précédentes de l'Agent Datadog, utilisez les annotations AD v1.

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
{{% tab "Kubernetes (AD v1)" %}}

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
{{< /tabs >}}

Les placeholders à configurer sont les suivants :

| Espace réservé                              | Description                                                                                        |
|------------------------------------------|----------------------------------------------------------------------------------------------------|
| `<CONTAINER_NAME>`                 | Correspond au nom du conteneur qui expose les métriques. |
| `<PROMETHEUS_ENDPOINT>`                  | Chemin URL pour les métriques servies par le conteneur, au format Prometheus.                            |
| `<METRICS_NAMESPACE_PREFIX_FOR_DATADOG>` | Définit l'espace de noms à préfixer à chaque métrique lorsqu'elle est visualisée dans Datadog.                               |
| `<METRIC_TO_FETCH>`                      | Clé des métriques Prometheus à récupérer depuis le point de terminaison Prometheus.                                 |
| `<NEW_METRIC_NAME>`                      | Transforme la clé de métrique `<METRIC_TO_FETCH>` en `<NEW_METRIC_NAME>` dans Datadog.                   |


La configuration `metrics` est une liste de métriques à récupérer en tant que métriques personnalisées. Incluez chaque métrique à récupérer et le nom de métrique souhaité dans Datadog sous forme de paires clé-valeur, par exemple, `{"<METRIC_TO_FETCH>":"<NEW_METRIC_NAME>"}`. Pour éviter des frais excessifs pour les métriques personnalisées, Datadog recommande de limiter la portée aux seules métriques dont vous avez besoin. Vous pouvez alternativement fournir une liste de chaînes de noms de métriques, interprétées comme des expressions régulières, pour apporter les métriques souhaitées avec leurs noms actuels. Si vous souhaitez **toutes** les métriques, utilisez alors `".*"` plutôt que `"*"`.

**Remarque :** Les expressions régulières peuvent potentiellement envoyer beaucoup de métriques personnalisées.

Pour une liste complète des paramètres disponibles pour les instances, y compris `namespace` et `metrics`, consultez le [fichier de configuration d'exemple openmetrics.d/conf.yaml][9].

**Remarque** : La vérification se limite par défaut à 2000 métriques. Spécifiez le paramètre optionnel `max_returned_metrics` pour modifier cette limite.

## Démarrage {#getting-started}

### Collecte simple de métriques (Vérification OpenMetrics) {#simple-metric-collection-openmetrics-check}

1. [Lancez l'Agent Datadog][10].

2. Utilisez le [Prometheus `prometheus.yaml`][11] pour lancer un exemple de déploiement Prometheus avec la configuration d'autodécouverte sur le pod :
   {{< tabs >}}
   {{% tab "Kubernetes (AD v2)" %}}

   **Remarque :** Les annotations AD v2 ont été introduites dans la version 7.36 de l'Agent Datadog pour simplifier la configuration de l'intégration. Pour les versions précédentes de l'Agent Datadog, utilisez les annotations AD v1.

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
   {{< /tabs >}}

     Command to create the Prometheus Deployment:

    ```shell
    kubectl create -f prometheus.yaml
    ```

3. Accédez à votre page [Automatisation de flotte][16] et filtrez pour l'intégration `openmetrics` afin de voir des informations détaillées sur l'état de vos vérifications.

4. Accédez à votre page [Résumé des métriques][12] pour voir les métriques collectées depuis cet exemple de pod. Cette configuration collectera la métrique `promhttp_metric_handler_requests`, `promhttp_metric_handler_requests_in_flight` et toutes les métriques exposées commençant par `go_memory`.

    {{< img src="integrations/guide/prometheus_kubernetes/openmetrics_v2_collected_metric_kubernetes.png" alt="Métrique Prometheus collectée Kubernetes">}}

## Collecte de métriques avec les annotations Prometheus (Vérification Prometheus) {#metric-collection-with-prometheus-annotations-prometheus-check}

Avec l'Autodécouverte Prometheus, l'Agent Datadog est capable de détecter les annotations Prometheus natives (par exemple : `prometheus.io/scrape`, `prometheus.io/path`, `prometheus.io/port`) et de planifier automatiquement des vérifications OpenMetrics pour collecter les métriques Prometheus dans Kubernetes.

**Remarque** : Datadog recommande d'utiliser la vérification OpenMetrics car elle est plus efficace et prend entièrement en charge le format texte de Prometheus. Utilisez la vérification Prometheus uniquement lorsque le point de terminaison des métriques ne prend pas en charge un format texte.

### Exigences {#requirements}

- Agent Datadog v7.27+ ou v6.27+ (pour les vérifications de Pod)
- [Datadog Cluster Agent] v1.11+ (pour les vérifications de service et de point de terminaison)

### Configuration {#configuration-1}

Il est recommandé de vérifier d'abord quels pods et services ont l'annotation `prometheus.io/scrape=true` avant d'activer cette fonctionnalité. Cela peut être fait avec les commandes suivantes :

```shell
kubectl get pods -o=jsonpath='{.items[?(@.metadata.annotations.prometheus\.io/scrape=="true")].metadata.name}' --all-namespaces

kubectl get services -o=jsonpath='{.items[?(@.metadata.annotations.prometheus\.io/scrape=="true")].metadata.name}' --all-namespaces
```

Une fois la fonctionnalité de récupération Prometheus activée, l'Agent Datadog collecte des métriques personnalisées à partir de ces ressources. Si vous ne souhaitez pas collecter les métriques personnalisées de ces ressources, vous pouvez supprimer cette annotation ou mettre à jour les règles d'Autodécouverte comme décrit dans la [section de configuration avancée](#advanced-configuration).

**Remarque** : Activer cette fonctionnalité sans configuration avancée peut entraîner une augmentation significative des métriques personnalisées, ce qui peut avoir des implications sur la facturation. Consultez la [section de configuration avancée](#advanced-configuration) pour apprendre à ne collecter des métriques que d'un sous-ensemble de conteneurs/pods/services.

#### Configuration de base {#basic-configuration}

{{< tabs >}}
{{% tab "Operator Datadog" %}}

Mettez à jour la configuration de votre opérateur Datadog pour inclure ce qui suit :

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

Mettez à jour votre configuration Helm pour inclure ce qui suit :

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
Si le [Datadog Cluster Agent] est activé, dans son manifeste `cluster-agent-deployment.yaml`, ajoutez les variables d'environnement suivantes pour le conteneur du [Datadog Cluster Agent] :

```yaml
- name: DD_PROMETHEUS_SCRAPE_ENABLED
  value: "true"
- name: DD_PROMETHEUS_SCRAPE_SERVICE_ENDPOINTS
  value: "true"
```

{{% /tab %}}
{{< /tabs >}}

Grâce à ces lignes, l'Agent Datadog détecte les pods qui possède des annotations Prometheus natives et génère les checks OpenMetrics correspondants.

En outre, lorsqu'il est activé, l'Agent de cluster Datadog détecte également les services qui possèdent des annotations Prometheus natives et génère les checks OpenMetrics correspondants.

- `prometheus.io/scrape=true`: Requis.
- `prometheus.io/path`: Optionnel, par défaut `/metrics`.
- `prometheus.io/port` : Optionnel, la valeur par défaut est `%%port%%`, une [variable de modèle][13] qui est remplacée par le port du conteneur/service.

Ces paramètres permettent de générer un check qui recueille toutes les métriques exposées, à l'aide de la configuration par défaut de l'[intégration OpenMetrics][1].

#### Configuration avancée {#advanced-configuration}

Vous pouvez configurer davantage la collecte de métriques (au-delà des annotations natives de Prometheus) avec le champ `additionalConfigs`.

##### Configurations de vérification OpenMetrics supplémentaires {#additional-openmetrics-check-configurations}

Utilisez `additionalConfigs.configurations` pour définir des configurations de vérification OpenMetrics supplémentaires. Consultez la [liste des paramètres OpenMetrics pris en charge][15] que vous pouvez passer dans `additionalConfigs`.

##### Règles d'autodécouverte personnalisées {#custom-autodiscovery-rules}

Utilisez `additionalConfigs.autodiscovery` pour définir des règles d'autodécouverte personnalisées. Ces règles peuvent être basées sur des noms de conteneurs, des annotations Kubernetes, ou les deux.

`additionalConfigs.autodiscovery.kubernetes_container_names`
: Une liste de noms de conteneurs à cibler, au format d'expression régulière.

`additionalConfigs.autodiscovery.kubernetes_annotations`
: Deux maps (`include` et `exclude`) d'annotations pour définir des règles de découverte.

  Par défaut :
  ```yaml
  include:
     prometheus.io/scrape: "true"
  exclude:
     prometheus.io/scrape: "false"
  ```

Si `kubernetes_container_names` et `kubernetes_annotations` sont tous deux définis, la logique **ET** est utilisée (les deux règles doivent correspondre).

##### Exemples {#examples}

La configuration suivante cible un conteneur nommé `my-app` s'exécutant dans un pod avec l'annotation `app=my-app`. La configuration de vérification OpenMetrics est personnalisée pour activer l'option `send_distribution_buckets` et définir un délai d'attente personnalisé de 5 secondes.

{{< tabs >}}
{{% tab "Operator Datadog" %}}

Mettez à jour la configuration de votre opérateur Datadog pour inclure ce qui suit :

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

Par défaut, toutes les métriques récupérées par la vérification générique de Prometheus sont considérées comme des métriques personnalisées. Si vous surveillez un logiciel standard et pensez qu'il mérite une intégration officielle, n'hésitez pas à [contribuer][5] !

Les intégrations officielles ont leurs propres répertoires dédiés. Il existe un mécanisme d'instance par défaut dans la vérification générique pour coder en dur la configuration par défaut et les métadonnées des métriques. Par exemple, référez-vous à l'intégration [kube-proxy][14].

## Lectures complémentaires {#further-reading}

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
[12]: https://app.datadoghq.com/metric/summary
[13]: /fr/agent/faq/template_variables/
[14]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy
[15]: https://github.com/DataDog/datadog-agent/blob/main/comp/core/autodiscovery/common/types/prometheus.go#L57-L123
[16]: https://app.datadoghq.com/fleet?query=integration:openmetrics