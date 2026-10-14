---
description: Aprenda a utilizar el procesador Parse JSON para analizar un campo JSON
  especificado en objetos.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: Blog
  text: Enrutar datos de OTel de aplicaciones de IA a ClickHouse y Datadog usando
    Observability Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: Blog
  text: Simplifique la recopilación y agregación de registros para MSSP con Datadog
    Observability Pipelines
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Procesador Parse JSON
---
{{< product-availability >}}

## Descripción general {#overview}

Este procesador analiza el campo JSON especificado en objetos. Por ejemplo, si tiene un campo `message` que contiene JSON convertido en cadena:

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

Utilice el procesador Parse JSON para analizar el campo `message` de modo que el campo `message` tenga todos los atributos dentro de un objeto anidado.

{{< img src="observability_pipelines/processors/parse-json-example.png" alt="El procesador Parse JSON con message como el campo a analizar" style="width:60%;" >}}

Esta salida contiene el campo `message` con el JSON analizado:

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

## Configuración {#setup}

Para configurar este procesador:
1. Defina un {{< ui >}}filter query{{< /ui >}}. Solo se procesan los registros que coinciden con la consulta de filtro especificada. Todos los registros, independientemente de si coinciden o no con la consulta de filtro, se envían al siguiente paso en la canalización. Consulte [Sintaxis de búsqueda][1] para obtener más información.
2. Ingrese el nombre del campo en el que desea analizar JSON.<br>**Nota**: El JSON analizado sobrescribe lo que originalmente contenía el campo.

## Métricas de estado {#health-metrics}

Para [métricas de componentes][2] y [métricas de búfer de procesador][3] emitidas por todos los procesadores, consulte la documentación de [Métricas de uso de Pipelines][4]. Para filtrar o agrupar por métricas del procesador Parse, utilice la etiqueta `component_type:parse`.

[1]: /es/observability_pipelines/search_syntax/logs/
[2]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[3]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[4]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}