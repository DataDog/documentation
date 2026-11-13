---
further_reading:
- link: /integrations/azure_app_services/
  tag: Documentación
  text: Azure App Service
- link: /integrations/azure_app_service_environment/
  tag: Documentación
  text: Azure App Service Environment
title: Instrumente Azure App Service con serverless-init - Linux Containers
---
## Descripción general {#overview}

<div class="alert alert-info">Para instrumentar sus contenedores de Azure App Service con un sidecar (recomendado), consulte <a href="/serverless/azure_app_services/azure_app_services_container">Instrumente Azure App Service</a>.</div>

Este método de instrumentación utiliza `serverless-init` y proporciona las siguientes capacidades de monitoreo adicionales para cargas de trabajo de Azure App Service en contenedores Linux:

- Rastreo APM totalmente distribuido mediante instrumentación automática.
- Vistas de servicio y de traza de APM personalizadas que muestran métricas y metadatos relevantes de Azure App Service.
- Soporte para instrumentación APM manual para personalizar los spans.
- `Trace_ID` inyección en los registros de la aplicación.
- Soporte para enviar métricas personalizadas mediante DogStatsD.
- Las [métricas mejoradas][18] se distinguen con el espacio de nombres `azure.app_services.enhanced.*`.

### Requisitos previos {#prerequisites}

Asegúrese de tener una [clave de API de Datadog][6] y de utilizar un lenguaje de programación [compatible con un SDK de Datadog][2].

## Instrumente su aplicación {#instrument-your-application}

### Dockerfile {#dockerfile}

Datadog publica nuevas versiones de la imagen de contenedor serverless-init en Docker Hub, gcr.io de Google y ECR de AWS:

| dockerhub.io | gcr.io | public.ecr.aws |
| ---- | ---- | ---- |
| datadog/serverless-init | gcr.io/datadoghq/serverless-init | public.ecr.aws/datadog/serverless-init |

Las imágenes se etiquetan según el versionado semántico, y cada nueva versión recibe tres etiquetas relevantes:

* `1`, `1-alpine`: utilícelas para realizar un seguimiento de las versiones menores más recientes, sin cambios incompatibles
* `1.x.x`, `1.x.x-alpine`: utilícelas para fijar una versión precisa de la biblioteca
* `latest`, `latest-alpine`: utilícelas para seguir la versión más reciente, que puede incluir cambios incompatibles

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

### 2. Configure su aplicación {#2-configure-your-application}

Una vez que el contenedor esté compilado y enviado a su registro, el último paso es configurar las variables de entorno necesarias para el Datadog Agent:
- `DD_API_KEY`: clave de API de Datadog, utilizada para enviar datos a su cuenta de Datadog. Debe configurarse como un [Azure Secret][7] por privacidad y seguridad.
- `DD_SITE`: punto de conexión y sitio web de Datadog. Seleccione su sitio en el lado derecho de esta página. Su sitio es: {{< region-param key="dd_site" code="true" >}}.
- `DD_TRACE_ENABLED`: Establezca en `true` para habilitar el rastreo.

Para obtener más variables de entorno y su función, consulte [Configuración adicional](#additional-configurations).

### 3. Resultados {#3-results}

Una vez completada la implementación, sus métricas y trazas se envían a Datadog. En Datadog, navegue a {{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Serverless{{< /ui >}} para ver sus métricas y trazas sin servidor.

## Despliegue {#deployment}

{{% aas-workflow-linux %}}

## Configuración adicional {#additional-configurations}

- **Rastreo avanzado:** El Datadog Agent ya proporciona rastreo básico para frameworks populares. Siga la [guía de rastreo avanzado][2] para obtener más información.

- **Registros:** Si utiliza la [integración de Azure][1], sus registros ya se están recopilando. Alternativamente, puede establecer la variable de entorno `DD_LOGS_ENABLED` en `true` para capturar los registros de la aplicación directamente a través de la instrumentación sin servidor.

- **Custom Metrics:** Puede enviar métricas personalizadas utilizando un [cliente DogStatsD][3]. Para monitorear Cloud Run y otras aplicaciones sin servidor, utilice métricas de [distribución][8]. Las distribuciones proporcionan agregaciones de `avg`, `sum`, `max`, `min` y `count` de forma predeterminada. En la página {{< ui >}}Metrics Catalog{{< /ui >}}, puede habilitar agregaciones de percentiles (p50, p75, p90, p95, p99) y también administrar etiquetas. Para monitorear una distribución de un tipo de métrica gauge, utilice `avg` para las [agregaciones de tiempo y espacio][9]. Para monitorear una distribución de un tipo de métrica de conteo (count), utilice `sum` para las agregaciones de tiempo y espacio.

- **Muestreo de trazas:**  Para administrar la tasa de muestreo de solicitudes rastreadas por APM para aplicaciones sin servidor, establezca la variable de entorno DD_TRACE_SAMPLE_RATE en la función con un valor entre 0.000 (sin rastreo de solicitudes de Container App) y 1.000 (rastrear todas las solicitudes de Container App).

Las métricas se calculan en función del 100 % del tráfico de la aplicación y siguen siendo precisas independientemente de cualquier configuración de muestreo.

### Variables de entorno {#environment-variables}

| Variable | Descripción |
| -------- | ----------- |
|`DD_API_KEY`| [Clave de API de Datadog][6] - **Obligatoria**|
| `DD_SITE` | [Sitio de Datadog][4] - **Obligatorio** |
| `DD_LOGS_ENABLED` | Si se establece en true, se envían los registros (stdout y stderr) a Datadog. El valor predeterminado es false. |
| `DD_LOGS_INJECTION`| Enriquezca todos los registros con datos de trazas para los registradores compatibles en [Java][10], [Node.js][11], [.NET][12] y [PHP][13]. Consulte la documentación adicional para [Python][14], [Go][15] y [Ruby][16]. |
| `DD_TRACE_SAMPLE_RATE`|  Controla la tasa de muestreo de ingesta de trazas entre `0.0` y `1.0`.|
| `DD_SERVICE`      | Consulte [unified service tagging][5].                                       |
| `DD_VERSION`      | Consulte [unified service tagging][5].                                       |
| `DD_ENV`          | Consulte [unified service tagging][5].                                       |
| `DD_SOURCE`       | Consulte [unified service tagging][5].                                       |
| `DD_TAGS`         | Consulte [unified service tagging][5].                                       |

## Solución de problemas {#troubleshooting}

Si no está recibiendo trazas o datos de métricas personalizadas como esperaba, habilite {{< ui >}}App Service logs{{< /ui >}} para recibir registros de depuración.

{{< img src="serverless/azure_app_service/app-service-logs.png" style="width:100%;" >}}

Comparta el contenido de {{< ui >}}Log stream{{< /ui >}} con [Datadog Support][17].

## Lecturas adicionales {#further-reading}

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
[17]: /es/help
[18]: /es/integrations/azure-app-services/#metrics