---
further_reading:
- link: /integrations/azure_app_services/
  tag: Documentación
  text: Azure App Service
- link: /integrations/azure_app_service_environment/
  tag: Documentación
  text: Entorno de Azure App Service
kind: documentation
title: 'Instrumentar Azure App Service: contenedores de Linux'
---

## Información general

<div class="alert alert-info">Para instrumentar los contenedores de Azure App Service con un sidecar, consulta <a href="/serverless/guide/azure_app_service_linux_sidecar">Instrumentar Azure App Service: patrón de sidecar</a>.</div>

Este método de instrumentación utiliza `serverless-init` y ofrece las siguientes capacidades de monitorización adicionales para las cargas de trabajo de Azure App Service en contenedores de Linux:

- Rastreo totalmente distribuido de APM mediante la instrumentación automática.
- Vistas personalizadas de servicios y trazas (traces) de APM que incluyen las métricas y los metadatos pertinentes de Azure App Service.
- Compatibilidad con la instrumentación manual de APM para personalizar tramos (spans).
- Inyección del `Trace_ID` en los logs de aplicación.
- Compatibilidad con el envío de métricas personalizadas mediante [DogStatsD][1].

### Requisitos previos

Asegúrate de que dispones de una [clave de la API de Datadog][6] y de que utilizas un lenguaje de programación [compatible con una biblioteca de rastreo de Datadog][2].

## Instrumentar la aplicación

### Dockerfile

Datadog publica nuevas versiones de la imagen de contenedor serverless-init en gcr.io de Google, AWS ECR y Docker Hub:

| dockerhub.io | gcr.io | public.ecr.aws |
| ---- | ---- | ---- |
| datadog/serverless-init | gcr.io/datadoghq/serverless-init | public.ecr.aws/datadog/serverless-init |

Las imágenes se etiquetan en función del control de versiones semántico, y cada nueva versión recibe tres etiquetas (tags):

* `1`, `1-alpine`: utilízalas para hacer un seguimiento de las últimas versiones secundarias, sin cambios importantes.
* `1.x.x`, `1.x.x-alpine`: utilízalas para fijar una versión precisa de la biblioteca.
* `latest`, `latest-alpine`: utilízalas para hacer un seguimiento de la última versión, que puede incluir cambios importantes.

{{< programming-lang-wrapper langs="nodejs,python,java,go,dotnet,ruby,php" >}}
{{< programming-lang lang="nodejs" >}}

{{% svl-init-nodejs %}}

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

{{% svl-init-python %}}

{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

{{% svl-init-java %}}

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

{{% svl-init-go %}}

{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

{{% svl-init-dotnet %}}

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

{{% svl-init-ruby %}}

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

{{% svl-init-php %}}

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### 2. Configurar la aplicación

Una vez que el contenedor se ha creado y enviado al registro, el último paso consiste en configurar las variables de entorno obligatorias del Datadog Agent:
- `DD_API_KEY`: la clave de la API de Datadog, utilizada para enviar datos a tu cuenta de Datadog. Debe configurarse como un [secreto de Azure][7] por cuestiones de privacidad y seguridad.
- `DD_SITE`: el endpoint y el sitio web de Datadog. Selecciona tu sitio en la parte derecha de esta página. Tu sitio es: {{< region-param key="dd_site" code="true" >}}.
- `DD_TRACE_ENABLED`: defínela como `true` para habilitar el rastreo.

Para obtener más información sobre las variables de entorno y sus funciones, consulta [Configuraciones adicionales](#additional-configurations).

### 3. Resultados

Una vez completado el despliegue, tus métricas y trazas se envían a Datadog. En Datadog, navega hasta **Infrastructure->Serverless** (Infraestructura->Serverless) para ver tus métricas y trazas serverless.

## Despliegue

{{% aas-workflow-linux %}}

## Configuraciones adicionales

- **Rastreo avanzado:** el Datadog Agent ya proporciona un rastreo básico para los marcos más populares. Sigue la [guía de rastreo avanzado][2] para obtener más información.

- **Logs:** si utilizas la [integración de Azure][1], tus logs ya se están recopilando. Como alternativa, puedes definir la variable de entorno `DD_LOGS_ENABLED` como `true` para capturar los logs de aplicación directamente a través de la instrumentación serverless.

- **Métricas personalizadas:** puedes enviar métricas personalizadas mediante un [cliente de DogStatsD][3]. Para monitorizar Cloud Run y otras aplicaciones serverless, utiliza métricas de [distribución][8]. Las distribuciones ofrecen las agregaciones predeterminadas `avg`, `sum`, `max`, `min` y `count`. En la página Metric Summary (Resumen de métrica), puedes habilitar las agregaciones percentiles (p50, p75, p90, p95, p99) y también gestionar etiquetas. Para monitorizar una distribución para un tipo de métrica de calibre, utiliza `avg` tanto para las [agregaciones temporales como espaciales][9]. Para monitorizar una distribución para un tipo de métrica de recuento, utiliza `sum` tanto para las agregaciones temporales como espaciales.

- **Muestreo de trazas:** para gestionar la frecuencia de muestreo de las solicitudes rastreadas de APM en aplicaciones serverless, define la variable de entorno DD_TRACE_SAMPLE_RATE en la función como un valor entre 0,000 (no se rastrea ninguna solicitud de la aplicación de contenedor) y 1,000 (se rastrean todas las solicitudes de la aplicación de contenedor).

Las métricas se calculan en función del 100 % del tráfico de la aplicación, y son precisas independientemente de la configuración del muestreo.

### Variables de entorno

| Variable | Descripción |
| -------- | ----------- |
|`DD_API_KEY`| La [clave de la API de Datadog][6]: **obligatoria**.|
| `DD_SITE` | El [sitio de Datadog][4]: **obligatorio**. |
| `DD_LOGS_ENABLED` | Cuando es true, envía logs (stdout y stderr) a Datadog. Por defecto, es false. |
| `DD_LOGS_INJECTION`| Cuando es true, enriquece todos los logs con datos de trazas para los loggers admitidos en [Java][10], [Node.js][11], [.NET][12] y [PHP][13]. Consulta la documentación adicional de [Python][14], [Go][15] y [Ruby][16]. |
| `DD_TRACE_SAMPLE_RATE`|  Controla las frecuencias de muestreo de la ingesta de trazas `0.0` y `1.0`.|
| `DD_SERVICE`      | Consulta [Etiquetado de servicios unificado][5].                                       |
| `DD_VERSION`      | Consulta [Etiquetado de servicios unificado][5].                                       |
| `DD_ENV`          | Consulta [Etiquetado de servicios unificado][5].                                       |
| `DD_SOURCE`       | Consulta [Etiquetado de servicios unificado][5].                                       |
| `DD_TAGS`         | Consulta [Etiquetado de servicios unificado][5].                                       |

## Solucionar problemas

Si no recibes datos de trazas o métricas personalizadas como esperabas, habilita **App Service logs** (Logs de App Service) para recibir logs de depuración.

{{< img src="serverless/azure_app_service/app-service-logs.png" style="width:100%;" >}}

Comparte el contenido del **Log stream** (Flujo de logs) con el [servicio de asistencia de Datadog][14].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/integrations/azure/#log-collection
[2]: /es/tracing/trace_collection/library_config
[3]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/
[4]: /es/getting_started/site/
[5]: /es/getting_started/tagging/unified_service_tagging/
[6]: /es/account_management/api-app-keys/
[7]: https://learn.microsoft.com/en-us/azure/container-apps/manage-secrets
[8]: /es/metrics/distributions/
[9]: /es/metrics/#time-and-space-aggregation
[10]: /es/tracing/other_telemetry/connect_logs_and_traces/java/?tab=log4j2
[11]: /es/tracing/other_telemetry/connect_logs_and_traces/nodejs
[12]: /es/tracing/other_telemetry/connect_logs_and_traces/dotnet?tab=serilog
[13]: /es/tracing/other_telemetry/connect_logs_and_traces/php
[14]: /es/tracing/other_telemetry/connect_logs_and_traces/python
[15]: /es/tracing/other_telemetry/connect_logs_and_traces/go
[16]: /es/tracing/other_telemetry/connect_logs_and_traces/ruby