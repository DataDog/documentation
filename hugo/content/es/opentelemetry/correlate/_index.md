---
aliases:
- /es/opentelemetry/otel_logs/
description: Aprende a correlacionar tus traces (trazas), métricas, logs y demás telemetría
  de OpenTelemetry en Datadog para obtener una visión unificada del rendimiento de
  tu aplicación.
further_reading:
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  tag: Blog
  text: Asociación de Datadog con OpenTelemetry
title: Correlacionar datos de OpenTelemetry
---

## Información general

Para obtener una visión unificada del rendimiento de tu aplicación es necesario conectar sus traces (trazas), métricas, logs, interacciones de usuario y mucho más. Al correlacionar tus datos de OpenTelemetry en Datadog, puedes navegar entre toda la telemetría relacionada en una sola vista, lo que te permite diagnosticar y resolver problemas más rápidamente.


## Requisito previo: Etiquetado unificado de servicios

Datadog utiliza tres etiquetas estándar para enlazar la telemetría: `env`, `service` y `version`.

Para garantizar que los datos de OpenTelemetry se correlacionen correctamente, debes configurar tu aplicación o sistema para utilizar estas etiquetas mediante la configuración de un conjunto estándar de atributos de recursos de OpenTelemetry. Datadog asigna automáticamente estos atributos a las etiquetas correctas.

| Atributo de recurso de OpenTelemetry | Etiqueta de Datadog | Notas                                                                                                   |
|----------------------------------|-------------|---------------------------------------------------------------------------------------------------------|
| `deployment.environment.name`    | `env`       | **Recomendado**. Compatible con el Agent v7.58.0+ y Collector Exporter v0.110.0+.                          |
| `deployment.environment`         | `env`       | Utilízalo en lugar de `deployment.environment.name` si ejecutas una versión del Agent anterior a v7.58.0 o un Collector Exporter anterior a v0.110.0. |
| `service.name`                   | `service`   |                                                                                                         |
| `service.version`                | `version`   |                                                                                                         |

Puedes configurar estos atributos en las variables de entorno de tu aplicación, kit de desarrollo de software (SDK) o en el recopilador de OpenTelemetry.

{{< tabs >}}
{{% tab "Variables de entorno" %}}

Configura la variable de entorno `OTEL_RESOURCE_ATTRIBUTES` con la información de tu servicio:

```sh
export OTEL_SERVICE_NAME="my-service"
export OTEL_RESOURCE_ATTRIBUTES="deployment.environment.name=production,service.version=1.2.3"
```

{{% /tab %}}
{{% tab "Kit de desarrollo de software (SDK)" %}}

Crea un recurso con los atributos requeridos y asócialo con tu TracerProvider en el código de tu aplicación.

He aquí un ejemplo que utiliza el kit de desarrollo de software (SDK) de Opentelemetry para Python:

```python
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider

resource = Resource(attributes={
    "service.name": "<SERVICE>",
    "deployment.environment.name": "<ENV>",
    "service.version": "<VERSION>"
})
tracer_provider = TracerProvider(resource=resource)
```

{{% /tab %}}
{{% tab "Recopilador" %}}

Utiliza el procesador `resource` en la configuración del recopilador para configurar los atributos de recursos en los datos de telemetría:

```yaml
processors:
  resource:
    attributes:
      - key: service.name
        value: "my-service"
        action: upsert
      - key: deployment.environment.name
        value: "production"
        action: upsert
      - key: service.version
        value: "1.2.3"
        action: upsert
...
```

{{% /tab %}}
{{< /tabs >}}

## Correlacionar telemetría

Una vez configurado el etiquetado unificado de servicios, puedes conectar tus distintos streams (flujos) de telemetría. Selecciona una de las siguientes guías para obtener instrucciones específicas de la plataforma.

- [Correlacionar logs y traces (trazas)][1]
- [Correlacionar métricas y traces (trazas)][2]
- [Correlacionar RUM y traces (trazas)][3]
- [Correlacionar DBM y traces (trazas)][4]

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/correlate/logs_and_traces
[2]: /es/opentelemetry/correlate/metrics_and_traces
[3]: /es/opentelemetry/correlate/rum_and_traces
[4]: /es/opentelemetry/correlate/dbm_and_traces