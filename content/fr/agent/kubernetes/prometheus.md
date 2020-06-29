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

2. Utilisez [ce DaemonSet Prometheus `prometheus.yaml`][11] pour lancer un pod Prometheus qui comporte une configuration Autodiscovery existante :

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

## Proposer une intégration personnalisée comme intégration officielle

Par défaut, toutes les métriques récupérées par le check Prometheus générique sont considérées comme des métriques custom. Si vous surveillez un logiciel prêt à l'emploi et que vous pensez qu'il mérite une intégration officielle, n'hésitez pas à apporter votre [contribution][5] !

Les intégrations officielles utilisent des répertoires dédiés. Le check générique intègre un système de création d'instances qui se charge de coder en dur la configuration par défaut et les métadonnées des métriques. Reportez-vous au référentiel sur l'intégration [kube-proxy][13] pour obtenir un exemple.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/openmetrics/
[2]: /fr/integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /fr/developers/prometheus/
[6]: /fr/integrations/guide/prometheus-metrics
[7]: /fr/agent/kubernetes/#installation
[8]: /fr/getting_started/tagging/
[9]: /fr/integrations/guide/prometheus-host-collection/#parameters-available
[10]: https://app.datadoghq.com/account/settings#agent/kubernetes
[11]: /resources/yaml/prometheus.yaml
[12]: https://app.datadoghq.com/metric/summary
[13]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy