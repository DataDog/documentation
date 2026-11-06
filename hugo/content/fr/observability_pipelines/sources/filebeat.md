---
description: Apprenez à envoyer des logs vers Observability Pipelines avec Filebeat
  via la source Logstash.
disable_toc: false
title: Envoyez des logs vers Observability Pipelines avec Filebeat
---
## Présentation {#overview}

Utilisez la source Logstash pour envoyer des logs vers Observability Pipelines avec Filebeat.

## Configuration {#setup}

1. [Configurez Filebeat][1] si ce n'est pas déjà fait.
1. Dans le fichier `filebeat.yml` :
    <br>a. Commentez la section de configuration de sortie Elasticsearch.
    <br>b. Décommentez et configurez la section de sortie Logstash :
    ```
    # ------------------------------ Logstash Output -------------------------------
    output.logstash:
    # The Logstash hosts
    hosts: ["<OPW_HOST>:9997"]
    ```
    `<OPW_HOST>` is the host IP address or the load balancer URL associated with the Observability Pipelines Worker.

    For CloudFormation installs, use the `LoadBalancerDNS` CloudFormation output for the URL.

    For Kubernetes installs, you can use the internal DNS record of the Observability Pipelines Worker service. For example: `opw-observability-pipelines-worker.default.svc.cluster.local`.
1. [Configurez un pipeline][2] avec la source Logstash.

## Métriques de santé {#health-metrics}

Pour les [métriques de composant][3] et les [métriques de tampon source][4] émises par toutes les sources, consultez la documentation [Métriques d'utilisation des pipelines][5]. La source Filebeat utilise la source Logstash. Pour filtrer ou regrouper par les métriques de la source Logstash, utilisez le tag `component_type:logstash`.

[1]: https://www.elastic.co/guide/en/beats/filebeat/current/setup-repositories.html
[2]: /fr/observability_pipelines/configuration/set_up_pipelines/
[3]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[4]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[5]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/