---
description: Apprenez comment envoyer les journaux fournis par AWS vers Observability
  Pipelines en utilisant le Datadog Lambda Forwarder.
disable_toc: false
title: Envoyez les journaux du Datadog Lambda Forwarder vers Observability Pipelines
---
## Présentation {#overview}

Ce document explique comment envoyer les journaux fournis par AWS avec le Datadog Lambda Forwarder vers Observability Pipelines. Les étapes de configuration sont les suivantes:

- [Configurez un pipeline avec la source HTTP/S Server](#set-up-a-pipeline).
- [Déployez le Datadog Forwarder](#deploy-the-datadog-lambda-forwarder).

Consultez [Datadog Forwarder][1] pour en savoir plus à ce sujet.

**Remarque** : Le Datadog Forwarder envoie des journaux marqués avec `ddsource` et `ddtags`, et non `source` et `tags`. Lorsque vous définissez des requêtes ou des filtres de processeur pour ces logs, utilisez `ddsource` et `ddtags`.

## Configurez un pipeline {#set-up-a-pipeline}

{{% observability_pipelines/lambda_forwarder/pipeline_setup %}}

## Déployez le Datadog Lambda Forwarder {#deploy-the-datadog-lambda-forwarder}

{{% observability_pipelines/lambda_forwarder/deploy_forwarder %}}

## Métriques de santé {#health-metrics}

Pour les [métriques de composant][2] et les [métriques de tampon source][3] émises par toutes les sources, consultez la documentation [Pipelines Usage Metrics][4]. Puisque vous utilisez la source HTTP Server pour envoyer des journaux du Lambda Forwarder vers Observability Pipelines, utilisez le tag `component_type:http_server` pour filtrer les métriques pertinentes.

[1]: /fr/logs/guide/forwarder/?tab=cloudformation
[2]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[3]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[4]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/