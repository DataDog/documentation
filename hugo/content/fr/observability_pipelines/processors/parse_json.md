---
description: Apprenez à utiliser le processeur Parse JSON pour analyser un champ JSON
  spécifié en objets.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: Blog
  text: Acheminer les données OTel des applications IA vers ClickHouse et Datadog
    à l'aide d'Observability Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: Blog
  text: Simplifiez la collecte et l'agrégation des logs pour les MSSP avec Datadog
    Observability Pipelines
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Processeur Parse JSON
---
{{< product-availability >}}

## Présentation {#overview}

Ce processeur analyse le champ JSON spécifié en objets. Par exemple, si vous avez un champ `message` qui contient du JSON sous forme de chaîne :

```json
{
    "foo": "bar",
    "team": "my-team",
    "message": "{\"level\":\"info\",\"timestamp\":\"2024-01-15T10:30:00Z\",\"service\":\"user-service\",\"user_id\":\"12345\",\"action\":\"login\",\"success\":true,\"ip_address\":\"192.168.1.100\"}"
    "app_id":"streaming-services",
    "ddtags": [
    "kube_service:my-service",
    "k8_deployment :your-host"
    ]
}
```

Utilisez le processeur Parse JSON pour analyser le champ `message` afin que le champ `message` contienne tous les attributs dans un objet imbriqué.

{{< img src="observability_pipelines/processors/parse-json-example.png" alt="Le processeur Parse JSON avec message comme champ à analyser" style="width:60%;" >}}

Cette sortie contient le champ `message` avec le JSON analysé :

```json
{
    "foo": "bar",
    "team": "my-team",
    "message": {
        "action": "login",
        "ip_address": "192.168.1.100",
        "level": "info",
        "service": "user-service",
        "success": true,
        "timestamp": "2024-01-15T10:30:00Z",
        "user_id": "12345"
    }
    "app_id":"streaming-services",
    "ddtags": [
    "kube_service:my-service",
    "k8_deployment :your-host"
    ]
}
```

## Configuration {#setup}

Pour configurer ce processeur :
1. Définissez un {{< ui >}}filter query{{< /ui >}}. Seuls les logs qui correspondent à la requête de filtrage spécifiée sont traités. Tous les logs, qu'ils correspondent ou non à la requête de filtre, sont envoyés à l'étape suivante du pipeline. Consultez [Search Syntax][1] pour plus d'informations.
2. Saisissez le nom du champ sur lequel vous souhaitez analyser le JSON.<br>**Remarque** : Le JSON analysé remplace le contenu initial du champ.

## Métriques de santé {#health-metrics}

Pour les [métriques de composants][2] et les [métriques de tampon de processeur][3] émises par tous les processeurs, consultez la documentation sur les [Métriques d'utilisation des pipelines][4]. Pour filtrer ou grouper par métriques de processeur d'analyse, utilisez le tag `component_type:parse`.

[1]: /fr/observability_pipelines/search_syntax/logs/
[2]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[3]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[4]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}