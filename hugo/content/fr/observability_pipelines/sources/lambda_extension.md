---
description: Apprenez à envoyer les logs de Lambda Extension vers Observability Pipelines
disable_toc: false
title: Envoyez les logs de Datadog Lambda Extension vers Observability Pipelines
---
## Présentation {#overview}

Ce document décrit comment utiliser Datadog Lambda Extension pour envoyer des logs AWS fournis vers Observability Pipelines. Les étapes de configuration sont les suivantes:

- [Configurez un pipeline avec la source HTTP/S Server](#set-up-a-pipeline).
- [Déployez Datadog Lambda Extension](#deploy-the-datadog-lambda-extension)

Consultez [Datadog Lambda Extension][1] pour en savoir plus.

**Remarque**: Datadog Lambda Extension envoie des logs marqués avec `ddsource` et `ddtags`, et non `source` et `tags`. Lorsque vous définissez des requêtes ou des filtres de processeur pour ces logs, utilisez `ddsource` et `ddtags`.

## Configurez un pipeline {#set-up-a-pipeline}

{{% observability_pipelines/lambda_forwarder/pipeline_setup %}}

**Remarque**: Votre pipeline d'observabilité doit utiliser {{< ui >}}HTTP Server{{< /ui >}} comme source pour traiter les logs de l'extension Lambda. N'utilisez pas {{< ui >}}Datadog Agent{{< /ui >}} comme source.

## Déployez Datadog Lambda Extension {#deploy-the-datadog-lambda-extension}

### Installez Datadog Lambda Extension {#install-the-datadog-lambda-extension}

Suivez les instructions de [Instrument AWS Lambda applications][2] pour configurer la bibliothèque Datadog Lambda afin de collecter des données depuis vos applications AWS Lambda.

### Définissez les variables d'environnement pour Datadog Lambda Extension {#set-environment-variables-for-datadog-lambda-extension}

{{% observability_pipelines/lambda_extension_source %}}

## Métriques de santé {#health-metrics}

Pour les [métriques de composant][3] et les [métriques de tampon source][4] émises par toutes les sources, consultez la documentation [Pipelines Usage Metrics][5]. Puisque vous utilisez la source HTTP Server pour envoyer des logs de Lambda Extension vers Observability Pipelines, utilisez le tag `component_type:http_server` pour filtrer les métriques pertinentes.

[1]: https://docs.datadoghq.com/fr/serverless/libraries_integrations/extension/
[2]: https://docs.datadoghq.com/fr/serverless/aws_lambda/instrumentation/
[3]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[4]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[5]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/