---
title: Collecte de métriques Prometheus et OpenMetrics avec Kubernetes
kind: documentation
aliases:
  - /fr/getting_started/prometheus
  - /fr/getting_started/integrations/prometheus
  - /fr/agent/openmetrics
  - /fr/agent/prometheus
further_reading:
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
    text: Limiter la collecte de données à un seul sous-ensemble de conteneurs
  - link: /agent/kubernetes/tag/
    tag: Documentation
    text: Attribuer des tags à toutes les données émises par un conteneur
  - link: /integrations/guide/prometheus-metrics/
    tag: Documentation
    text: Mappage de métriques Prometheus avec des métriques Datadog
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

Configurez votre check OpenMetrics ou Prometheus à l'aide de la fonctionnalité Autodiscovery, en appliquant les `annotations` suivantes à votre **pod** OpenMetrics/Prometheus :

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
                "prometheus_url": "http://%%host%%:%%port%%/<ENDPOINT_PROMETHEUS> ",
                "namespace": "<PRÉFIXE_ESPACENOMMAGE_MÉTRIQUES_POUR_DATADOG>",
                "metrics": [{"<MÉTRIQUES_À_RÉCUPÉRER>":"<NOUVEAU_NOM_MÉTRIQUE>"}]
              }
            ]
spec:
    containers:
        - name: '<IDENTIFICATEUR_CONTENEUR>'
```

Les placeholders à configurer sont les suivants :

| Placeholder                              | Description                                                                                                                                                                                                    |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<PORT_PROMETHEUS>`                      | Le port auquel se connecter afin d'accéder à l'endpoint Prometheus.                                                                                                                                                 |
| `<ENDPOINT_PROMETHEUS>`                  | L'URL pour les métriques traitées par le conteneur, au format Prometheus.                                                                                                                                             |
| `<PRÉFIXE_ESPACENOMMAGE_MÉTRIQUES_POUR_DATADOG>` | L'espace de nommage spécifié ici sera ajouté comme préfixe à chaque métrique lors de son affichage dans Datadog.                                                                                                                                           |
| `<MÉTRIQUE_À_RÉCUPÉRER>`                      | La clé de la métrique Prometheus à récupérer à partir de l'endpoint Prometheus.                                                                                                                                             |
| `<NOUVEAU_NOM_MÉTRIQUE>`                      | Lorsque ce paramètre facultatif est défini, la clé de métrique `<MÉTRIQUE_À_RÉCUPÉRER>` est remplacée par le `<NOUVEAU_NOM_MÉTRIQUE>` dans Datadog. Si vous choisissez de ne pas utiliser cette option, passez une liste de chaînes plutôt que des paires `key:value`. |

Pour obtenir la liste complète des paramètres disponibles pour les instances, notamment `namespace` et `metrics`, consultez le tableau dans le [guide de collecte de hosts Prometheus][9].


## Prise en main

### Collecte de métriques simple

1. [Lancez l'Agent Datadog][10].

2. Utilisez le [DaemonSet Prometheus `prometheus.yaml`][11] pour lancer un pod Prometheus qui comporte la configuration Autodiscovery :

    Configuration Autodiscovery :

    ```yaml
     # (...)
    spec:
      replicas: 2
      selector:
        matchLabels:
          app: prometheus
          purpose: example
      template:
        metadata:
          labels:
            app: prometheus
            purpose: example
          annotations:
              ad.datadoghq.com/prometheus-example.check_names: |
                ["openmetrics"]
              ad.datadoghq.com/prometheus-example.init_configs: |
                [{}]
              ad.datadoghq.com/prometheus-example.instances: |
                [
                  {
                    "prometheus_url": "http://%%host%%:%%port%%/metrics",
                    "namespace": "documentation_example_kubernetes",
                    "metrics": [ {"promhttp_metric_handler_requests_total": "prometheus.handler.requests.total"}]
                  }
                ]
      # (...)
    ```

     Commande pour créer le pod Prometheus :

    ```shell
    kubectl create -f prometheus.yaml
    ```

3. Accédez à votre [page Metric summary][12] pour visualiser les métriques recueillies : `prometheus_target_interval_length_seconds*`.

    {{< img src="integrations/guide/prometheus_kubernetes/prometheus_collected_metric_kubernetes.png" alt="Métriques Prometheus recueillies Kubernetes">}}

## Collecte de métriques avec des annotations Prometheus

Grâce à la fonctionnalité Autodiscovery Prometheus, l'Agent Datadog peut détecter les annotations Prometheus natives (comme `prometheus.io/scrape`, `prometheus.io/path` ou `prometheus.io/port`) et planifier automatiquement des checks OpenMetrics de façon à recueillir des métriques Prometheus dans Kubernetes.

### Prérequis

- Agent Datadog v7.27+ ou v6.27+ (pour les checks de pod)
- Agent de cluster Datadog v1.11+ (pour les checks de service et d'endpoint)

### Configuration

#### Configuration de base

Ajoutez ce qui suit dans votre fichier `values.yaml` Helm :

```
...
datadog:
...
  prometheusScrape:
    enabled: true
...
```

Grâce à ces lignes, l'Agent Datadog détecte les pods qui possèdent des annotations Prometheus natives et génère les checks OpenMetrics correspondants.

En outre, lorsqu'il est activé, l'Agent de cluster Datadog détecte également les services qui possèdent des annotations Prometheus natives et génère les checks OpenMetrics correspondants.

- `prometheus.io/scrape=true` : requis.
- `prometheus.io/path` : facultatif (valeur par défaut : `/metrics`).
- `prometheus.io/port` : facultatif (valeur par défaut : `%%port%%`). [Template variable][13] remplacée par le port du conteneur ou service.

Ces paramètres permettent de générer un check qui recueille toutes les métriques exposées, en se basant sur la configuration par défaut de l'[intégration OpenMetrics][1].

#### Configuration avancée

Vous pouvez définir des configurations de check OpenMetrics avancées ou des règles Autodiscovery personnalisées qui diffèrent des annotations Prometheus natives. Pour ce faire, utilisez le champ de configuration `additionalConfigs` du fichier `values.yaml`.

`additionalConfigs` liste les structures contenant des configurations de check OpenMetrics et des règles Autodiscovery.

Chaque [champ de configuration][14] pris en charge par le check OpenMetrics peut être transmis dans la liste des configurations.

La configuration Autodiscovery peut reposer sur des noms de conteneur, des annotations Kubernetes ou un mélange des deux. Si vous définissez `kubernetes_container_names` et `kubernetes_annotations`, une logique d'addition (AND) s'applique, à savoir que les deux règles doivent être respectées.

`kubernetes_container_names` liste les noms de conteneur à cibler. Le wildcard `*` peut être utilisé.

`kubernetes_annotations` contient deux maps d'étiquettes permettant de définir les règles de découverte : `include` et `exclude`.

**Remarque** : dans la configuration de l'Agent Datadog, `kubernetes_annotations` a par défaut la valeur suivante : 

```
kubernetes_annotations:
  include:
    - prometheus.io/scrape: "true"
  exclude:
    - prometheus.io/scrape: "false"
```

**Exemple :**

Dans l'exemple ci-dessous, nous définissons une configuration avancée ciblant le conteneur `my-app`, qui exécute le pod `app=my-app`. Nous personnalisons également la configuration du check OpenMetrics, en activant l'option `send_distribution_buckets` et en définissant un délai d'expiration personnalisé de cinq secondes.

```
datadog:
...
  prometheusScrape:
    enabled: true
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

## Proposer une intégration personnalisée comme intégration officielle

Par défaut, toutes les métriques récupérées par le check Prometheus générique sont considérées comme des métriques custom. Si vous surveillez un logiciel prêt à l'emploi et que vous pensez qu'il mérite une intégration officielle, n'hésitez pas à apporter votre [contribution][5] !

Les intégrations officielles utilisent des répertoires dédiés. Le check générique intègre un système de création d'instances qui se charge de coder en dur la configuration par défaut et les métadonnées des métriques. Reportez-vous au référentiel sur l'intégration [kube-proxy][15] pour obtenir un exemple.

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
[9]: /fr/integrations/guide/prometheus-host-collection/#parameters-available
[10]: https://app.datadoghq.com/account/settings#agent/kubernetes
[11]: /resources/yaml/prometheus.yaml
[12]: https://app.datadoghq.com/metric/summary
[13]: /fr/agent/faq/template_variables/
[14]: https://github.com/DataDog/integrations-core/blob/7.27.x/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[15]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy