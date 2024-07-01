---
aliases:
- /fr/getting_started/prometheus
- /fr/getting_started/integrations/prometheus
- /fr/agent/openmetrics
- /fr/agent/prometheus
- /fr/agent/kubernetes/prometheus
further_reading:
- link: /agent/kubernetes/log/
  tag: Documentation
  text: Recueillir les logs de votre application
- link: /agent/kubernetes/apm/
  tag: Documentation
  text: Recueillir les traces de vos applications
- link: /agent/kubernetes/integrations/
  tag: Documentation
  text: Recueillir automatiquement les métriques et les logs de vos applications
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limiter la collecte de données à un sous-ensemble de conteneurs
- link: /agent/kubernetes/tag/
  tag: Documentation
  text: Attribuer des tags à toutes les données envoyées par un conteneur
- link: /integrations/guide/prometheus-metrics/
  tag: Documentation
  text: Mappage de métriques Prometheus avec des métriques Datadog
title: Collecte de métriques Prometheus et OpenMetrics avec Kubernetes
---

Recueillez vos métriques Prometheus et OpenMetrics exposées à partir de votre application exécutée dans Kubernetes à l'aide de l'Agent Datadog et de l'intégration [Datadog/OpenMetrics][1] ou [Datadog/Prometheus][2].

## Présentation

Depuis la version 6.5.0, l'Agent inclut des checks [OpenMetrics][3] et [Prometheus][4] capables de scraper les endpoints Prometheus. Nous vous conseillons d'utiliser le check OpenMetrics du fait de son efficacité accrue et de sa prise en charge complète du format texte Prometheus. Pour en savoir plus sur l'utilisation avancée de l'interface `OpenMetricsCheck` et le développement d'un check custom, consultez la section [Outils de développement][5]. N'utilisez le check Prometheus que lorsque l'endpoint de métriques ne prend pas en charge un format texte.

Cette page décrit les principes d'utilisation de base de ces checks. Ils vous permettent de scraper des métriques custom à partir d'endpoints Prometheus.

Pour obtenir une explication sur le mappage de métriques Prometheus et OpenMetrics avec des métriques Datadog, consultez le [guide dédié][6].

## Configuration

### Installation

[Déployez l'Agent Datadog dans votre cluster Kubernetes][7]. Les checks OpenMetrics et Prometheus sont inclus dans le paquet de l'[Agent Datadog][8] : vous n'avez donc rien d'autre à installer sur vos conteneurs ou vos hosts.

### Configuration

Configurez votre check OpenMetrics ou Prometheus à l'aide de la fonctionnalité Autodiscovery, en appliquant les `annotations` suivantes à votre **pod** exposant les métriques OpenMetrics/Prometheus :

{{< tabs >}}
{{% tab "Kubernetes (AD v2)" %}}

**Remarque :** les annotations AD v2 ont été ajoutées dans l'Agent Datadog 7.36 afin de simplifier la configuration de l'intégration. Pour les versions précédentes de l'Agent Datadog, utilisez les annotations AD v1.

```yaml
# (...)
metadata:
  #(...)
  annotations:
    ad.datadoghq.com/<IDENTIFICATEUR_CONTENEUR>.checks: |
      {
        "openmetrics": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:%%port%%/<ENDPOINT_PROMETHEUS> ",
              "namespace": "<PRÉFIXE_ESPACENOMMAGE_MÉTRIQUES_POUR_DATADOG>",
              "metrics": [{"<MÉTRIQUES_À_RÉCUPÉRER>":"<NOUVEAU_NOM_MÉTRIQUE>"}]
            }
          ]
        }
      }

spec:
  containers:
    - name: '<IDENTIFICATEUR_CONTENEUR>'
```

{{% /tab %}}
{{% tab "Kubernetes (AD v1)" %}}

```yaml
# (...)
metadata:
  #(...)
  annotations:
    ad.datadoghq.com/<IDENTIFICATEUR_CONTENEUR>.check_names: |
      ["openmetrics"]
    ad.datadoghq.com/<IDENTIFICATEUR_CONTENEUR>.init_configs: |
      [{}]
    ad.datadoghq.com/<IDENTIFICATEUR_CONTENEUR>.instances: |
      [
        {
          "openmetrics_endpoint": "http://%%host%%:%%port%%/<ENDPOINT_PROMETHEUS> ",
          "namespace": "<PRÉFIXE_ESPACENOMMAGE_MÉTRIQUES_POUR_DATADOG>",
          "metrics": [{"<MÉTRIQUES_À_RÉCUPÉRER>":"<NOUVEAU_NOM_MÉTRIQUE>"}]
        }
      ]
spec:
  containers:
    - name: '<IDENTIFICATEUR_CONTENEUR>'
```

{{% /tab %}}
{{< /tabs >}}

Les placeholders à configurer sont les suivants :

| Placeholder                              | Description                                                                                        |
|------------------------------------------|----------------------------------------------------------------------------------------------------|
| `<IDENTIFICATEUR_CONTENEUR>`                 | L'identificateur utilisé dans les `annotations` doit correspondre au `name` du conteneur exposant les métriques. |
| `<ENDPOINT_PROMETHEUS>`                  | Le chemin d'URL pour les métriques traitées par le conteneur, au format Prometheus.                            |
| `<PRÉFIXE_ESPACENOMMAGE_MÉTRIQUES_POUR_DATADOG>` | L'espace de nommage spécifié ici sera ajouté comme préfixe à chaque métrique lors de son affichage dans Datadog.                               |
| `<MÉTRIQUE_À_RÉCUPÉRER>`                      | La clé de la métrique Prometheus à récupérer à partir de l'endpoint Prometheus.                                 |
| `<NOUVEAU_NOM_MÉTRIQUE>`                      | Remplace la clé de métrique `<MÉTRIQUE_À_RÉCUPÉRER>` par le `<NOUVEAU_NOM_MÉTRIQUE>` dans Datadog.                   |


Le paramètre `metrics` correspond à la liste des métriques à récupérer sous forme de métriques custom. Ajoutez chaque métrique à récupérer et le nom de métrique souhaité dans Datadog sous la forme de paires key/value : `{"<MÉTRIQUE_À_RÉCUPÉRER>":"<NOUVEAU_NOM_MÉTRIQUE>"}`. Il est également possible de fournir une liste de noms de métriques sous forme de chaînes, qui seront interprétées en tant qu'expressions régulières, afin de récupérer les métriques de votre choix avec leur nom actuel. Si vous souhaitez récupérer **toutes** les métriques, utilisez `"*"` au lieu de `".*"`.

**Remarque** : les expressions régulières peuvent entraîner l'envoi d'un volume important de métriques custom.

Pour obtenir la liste complète des paramètres disponibles pour les instances, notamment `namespace` et `metrics`, consultez l'[exemple de configuration openmetrics.d/conf.yaml][9].

## Prise en main

### Collecte de métriques simple

1. [Lancez l'Agent Datadog][10].

2. Utilisez le [fichier `prometheus.yaml` de Prometheus][11] pour lancer un exemple de déploiement Prometheus qui comporte la configuration Autodiscovery sur le pod :
   {{< tabs >}}
   {{% tab "Kubernetes (AD v2)" %}}

   **Remarque :** Annotations AD v2 a été ajouté dans l'Agent Datadog 7.36 afin de simplifier la configuration de l'intégration. Pour les versions précédentes de l'Agent Datadog, utilisez Annotations AD v1.

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
   {{< /tabs >}}
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

   {{< /tabs >}}
   {{< /tabs >}}

     Commande pour créer le déploiement Prometheus :

    ```shell
    kubectl create -f prometheus.yaml
    ```

3. Accédez à votre page [Metric summary][12] pour visualiser les métriques recueillies à partir de cet exemple de pod. Cette configuration recueillera les métriques `promhttp_metric_handler_requests`, `promhttp_metric_handler_requests_in_flight`, ainsi que toutes les métriques commençant par `go_memory` qui sont exposées.

    {{< img src="integrations/guide/prometheus_kubernetes/openmetrics_v2_collected_metric_kubernetes.png" alt="Métriques Prometheus recueillies Kubernetes">}}

## Collecte de métriques avec des annotations Prometheus

Grâce à la fonctionnalité Autodiscovery Prometheus, l'Agent Datadog peut détecter les annotations Prometheus natives (comme `prometheus.io/scrape`, `prometheus.io/path` ou `prometheus.io/port`) et planifier automatiquement des checks OpenMetrics de façon à recueillir des métriques Prometheus dans Kubernetes.

### Prérequis

- Agent Datadog v7.27+ ou v6.27+ (pour les checks de pod)
- Agent de cluster Datadog v1.11+ (pour les checks de service et d'endpoint)

### Configuration

Il est conseillé de commencer par vérifier quels pods et services contiennent l'annotation `prometheus.io/scrape=true` avant d'activer cette fonctionnalité. Pour ce faire, utilisez les commandes suivantes :

```shell
kubectl get pods -o=jsonpath='{.items[?(@.metadata.annotations.prometheus\.io/scrape=="true")].metadata.name}' --all-namespaces

kubectl get services -o=jsonpath='{.items[?(@.metadata.annotations.prometheus\.io/scrape=="true")].metadata.name}' --all-namespaces
```

Une fois la fonctionnalité Prometheus Scrape activée, l'Agent Datadog recueille des métriques custom à partir de ces ressources. Si vous ne souhaitez pas recueillir de métriques custom à partir de ces ressources, vous pouvez supprimer cette annotation ou mettre à jour les règles Autodiscovery comme décrit dans la section [Configuration avancée](#configuration-avancee).

#### Configuration de base

{{< tabs >}}
{{% tab "Helm" %}}

Ajoutez ce qui suit dans votre fichier `values.yaml` Helm :

```yaml
datadog:
  # (...)
  prometheusScrape:
    enabled: true
    serviceEndpoints: true
  # (...)
```
{{% /tab %}}
{{% tab "DaemonSet" %}}

Dans votre manifeste DaemonSet pour l'Agent, `daemonset.yaml`, ajoutez les variables d'environnement suivantes pour le conteneur de l'Agent :
```yaml
- name: DD_PROMETHEUS_SCRAPE_ENABLED
  value: "true"
- name: DD_PROMETHEUS_SCRAPE_VERSION
  value: "2"
```
Si l'Agent de cluster est activé, à l'intérieur de son manifeste `cluster-agent-deployment.yaml`, ajoutez les variables d'environnement suivantes pour le conteneur de l'Agent de cluster :
```yaml
- name: DD_PROMETHEUS_SCRAPE_ENABLED
  value: "true"
- name: DD_PROMETHEUS_SCRAPE_SERVICE_ENDPOINTS
  value: "true" 
```

{{% /tab %}}
{{< /tabs >}}

Grâce à ces lignes, l'Agent Datadog détecte les pods qui possèdent des annotations Prometheus natives et génère les checks OpenMetrics correspondants.

En outre, lorsqu'il est activé, l'Agent de cluster Datadog détecte également les services qui possèdent des annotations Prometheus natives et génère les checks OpenMetrics correspondants.

- `prometheus.io/scrape=true` : requis.
- `prometheus.io/path` : facultatif (valeur par défaut : `/metrics`).
- `prometheus.io/port` : facultatif (valeur par défaut : `%%port%%`). [Template variable][13] remplacée par le port du conteneur ou service.

Ces paramètres permettent de générer un check qui recueille toutes les métriques exposées, en se basant sur la configuration par défaut de l'[intégration OpenMetrics][1].

#### Configuration avancée

{{< tabs >}}
{{% tab "Helm" %}}

Vous pouvez définir des configurations de check OpenMetrics avancées ou des règles Autodiscovery personnalisées qui diffèrent des annotations Prometheus natives. Pour ce faire, utilisez le champ de configuration `additionalConfigs` du fichier `values.yaml`.

`additionalConfigs` liste les structures contenant des configurations de check OpenMetrics et des règles Autodiscovery.

Chaque [champ de configuration][1] pris en charge par le check OpenMetrics peut être transmis dans la liste des configurations.

La configuration Autodiscovery peut reposer sur des noms de conteneur, des annotations Kubernetes ou un mélange des deux. Si vous définissez `kubernetes_container_names` et `kubernetes_annotations`, une logique d'addition (AND) s'applique, à savoir que les deux règles doivent être respectées.

`kubernetes_container_names` liste les noms de conteneur à cibler. Le wildcard `*` peut être utilisé.

`kubernetes_annotations` contient deux maps d'annotations permettant de définir les règles de découverte : `include` et `exclude`.

**Remarque** : dans la configuration de l'Agent Datadog, `kubernetes_annotations` a par défaut la valeur suivante : 

```yaml
kubernetes_annotations:
  include:
     prometheus.io/scrape: "true"
  exclude:
     prometheus.io/scrape: "false"
```

**Exemple :**

Dans l'exemple ci-dessous, nous définissons une configuration avancée ciblant un conteneur `my-app`, qui exécute un pod contenant l'annotation `app=my-app`. Nous personnalisons également la configuration du check OpenMetrics, en activant l'option `send_distribution_buckets` et en définissant un délai d'expiration personnalisé de cinq secondes.

```yaml
datadog:
  # (...)
  prometheusScrape:
    enabled: true
    serviceEndpoints: true
    additionalConfigs:
      -
        configurations:
        - timeout: 5
          send_distribution_buckets: true
        autodiscovery:
          kubernetes_container_names:
            - my-app
          kubernetes_annotations:
            include:
              app: my-app
```


[1]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
{{% /tab %}}
{{% tab "DaemonSet" %}}

Vous pouvez définir des configurations de check OpenMetrics avancées ou des règles Autodiscovery personnalisées qui diffèrent des annotations Prometheus natives. Pour ce faire, utilisez la variable d'environnement `DD_PROMETHEUS_SCRAPE_CHECKS` dans les manifestes de l'Agent et de l'Agent de cluster.

`DD_PROMETHEUS_SCRAPE_CHECKS` liste les structures contenant des configurations de check OpenMetrics et des règles Autodiscovery.

Chaque [champ de configuration][1] pris en charge par le check OpenMetrics peut être transmis dans la liste des configurations.

La configuration Autodiscovery peut reposer sur des noms de conteneur, des annotations Kubernetes ou un mélange des deux. Si vous définissez `kubernetes_container_names` et `kubernetes_annotations`, une logique d'addition (AND) s'applique, à savoir que les deux règles doivent être respectées.

`kubernetes_container_names` liste les noms de conteneur à cibler. Le wildcard `*` peut être utilisé.

`kubernetes_annotations` contient deux maps d'annotations permettant de définir les règles de découverte : `include` et `exclude`.

**Remarque** : dans la configuration de l'Agent Datadog, `kubernetes_annotations` a par défaut la valeur suivante : 

```yaml
- name: DD_PROMETHEUS_SCRAPE_CHECKS
  value: "[{\"autodiscovery\":{\"kubernetes_annotations\":{\"exclude\":{\"prometheus.io/scrape\":\"false\"},\"include\":{\"prometheus.io/scrape\":\"true\"}}}}]"
```

**Exemple :**

Dans l'exemple ci-dessous, nous définissons une configuration avancée ciblant un conteneur `my-app`, qui exécute un pod contenant l'annotation `app=my-app`. Nous personnalisons également la configuration du check OpenMetrics, en activant l'option `send_distribution_buckets` et en définissant un délai d'expiration personnalisé de cinq secondes.

```yaml
- name: DD_PROMETHEUS_SCRAPE_ENABLED
  value: "true"
- name: DD_PROMETHEUS_SCRAPE_CHECKS
  value: "[{\"autodiscovery\":{\"kubernetes_annotations\":{\"include\":{\"app\":\"my-app\"}},\"kubernetes_container_names\":[\"my-app\"]},\"configurations\":[{\"send_distribution_buckets\":true,\"timeout\":5}]}]"
- name: DD_PROMETHEUS_SCRAPE_VERSION
  value: "2"
```


[1]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
{{% /tab %}}
{{< /tabs >}}

## Proposer une intégration personnalisée comme intégration officielle

Par défaut, toutes les métriques récupérées par le check Prometheus générique sont considérées comme des métriques custom. Si vous surveillez un logiciel prêt à l'emploi et que vous pensez qu'il mérite une intégration officielle, n'hésitez pas à apporter votre [contribution][5] !

Les intégrations officielles utilisent des répertoires dédiés. Le check générique intègre un système de création d'instances qui se charge de coder en dur la configuration par défaut et les métadonnées des métriques. Reportez-vous au référentiel sur l'intégration [kube-proxy][14] pour obtenir un exemple.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/openmetrics/
[2]: /fr/integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /fr/developers/custom_checks/prometheus/
[6]: /fr/integrations/guide/prometheus-metrics
[7]: /fr/agent/kubernetes/#installation
[8]: /fr/getting_started/tagging/
[9]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[10]: https://app.datadoghq.com/account/settings#agent/kubernetes
[11]: /resources/yaml/prometheus.yaml
[12]: https://app.datadoghq.com/metric/summary
[13]: /fr/agent/faq/template_variables/
[14]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy