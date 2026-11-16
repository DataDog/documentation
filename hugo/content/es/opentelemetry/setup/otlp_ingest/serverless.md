---
description: Envíe trazas desde AWS Lambda, ECS Fargate, Azure Functions, Cloud Run
  y otras plataformas serverless directamente a Datadog sin un Datadog Agent o Collector.
further_reading:
- link: /opentelemetry/setup/otlp_ingest/
  tag: Documentación
  text: Punto de conexión de ingesta OTLP de Datadog
- link: /serverless/
  tag: Documentación
  text: Datadog Serverless Monitoring
title: Ingesta de OTLP para Serverless
---
## Descripción general {#overview}

Envíe trazas desde cargas de trabajo serverless directamente a Datadog a través de HTTP/protobuf, sin requerir un [Datadog Agent][1] o OpenTelemetry Collector. Si su plataforma aparece en la tabla [Managed platforms][5], utilice su punto de conexión dedicado en su lugar.

Las cargas de trabajo serverless también pueden enviar registros y métricas a través de los puntos de conexión generales de ingesta de [OTLP registros][3] y [OTLP métricas][4]. Los atributos de recurso en esta página se aplican a todas las señales que exporta su aplicación.

Plataformas compatibles:

- **AWS**: Lambda, ECS Fargate
- **Azure**: Container Apps, Web Apps (App Service), Azure Functions
- **GCP**: Cloud Run, Cloud Run Functions, GKE Autopilot

<div class="alert alert-info">Utilice la ingesta directa cuando ejecutar un Collector no sea práctico (por ejemplo, Lambda). Si puede ejecutar un Collector, consulte <a href="/opentelemetry/setup/collector_exporter/">OpenTelemetry Collector</a> para el enriquecimiento de metadatos, normalización y muestreo centralizado.</div>

## Requisitos previos {#prerequisites}

La siguiente configuración se aplica a todas las plataformas.

**Protocolo**: `http/protobuf` o `http/json`. `grpc` no es compatible.

**Encabezados requeridos**:

- `dd-api-key`: Su clave de Datadog API.
- `dd-otlp-source`: Establezca `serverless`.
- `compute_stats`: Establezca `true`. Requerido para [métricas de traza][2].

**Nombre del servicio**: Establezca `OTEL_SERVICE_NAME` para identificar su servicio. Sin esto, las trazas aparecen como `unknown_service`.

**Atributos de recursos**: Establezca atributos específicos de la plataforma con `OTEL_RESOURCE_ATTRIBUTES`. Consulte la pestaña de cada proveedor de nube a continuación para ver los atributos obligatorios y opcionales.

Identifique las cargas de trabajo con los atributos de plataforma en esta página, no con `host.name`. Para obtener recomendaciones de nombre de host para la ingesta directa de OTLP, consulte [Nombre de host y etiquetado][6].

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="{{< region-param key="otlp_trace_endpoint" >}}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-service"
```

## Configuración {#setup}

<div class="alert alert-info">Según su <a href="/getting_started/site/">sitio de Datadog</a>, que es {{< region-param key=dd_datacenter code="true" >}}: Reemplace <code>${YOUR_ENDPOINT}</code> con {{< region-param key="otlp_trace_endpoint" code="true" >}} en los siguientes ejemplos.</div>

Seleccione su proveedor de nube para la configuración de atributos de recursos específicos de la plataforma:

{{< tabs >}}
{{% tab "AWS" %}}

### Lambda {#lambda}

La [capa de Lambda de AWS Distro for OpenTelemetry (ADOT)][100] proporciona instrumentación automática y detección de recursos para funciones Lambda.

Agregue la capa de ADOT a su función Lambda y configure las siguientes variables de entorno:

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-lambda-function"
```

La capa de ADOT maneja la detección de atributos de recursos automáticamente. Si no está utilizando ADOT, configure los atributos de recursos manualmente. `cloud.provider` es obligatorio. Establezca `faas.id` (un ARN de Lambda analizable) para la identificación completa de la plataforma; si `faas.id` no está disponible, establezca `cloud.platform=aws_lambda` en su lugar:

```shell
export OTEL_RESOURCE_ATTRIBUTES="cloud.provider=aws,faas.id=arn:aws:lambda:us-east-1:123456789012:function:my-function"
```

| Atributo | Obligatorio | Descripción |
|---|---|---|
| `cloud.provider` | Sí | Configurado en `aws` |
| `faas.id` | Recomendado | ARN de la función Lambda (preferido para la identificación de la plataforma) |
| `cloud.platform` | Condicional | Configurado en `aws_lambda` si `faas.id` no está configurado |
| `cloud.region` | No | Región de AWS |
| `faas.name` | No | Nombre de la función |
| `faas.version` | No | Versión de la función |
| `faas.instance` | No | Identificador de instancia |
| `faas.max_memory` | No | Memoria máxima configurada (bytes) |
| `aws.log.group.names` | No | Nombres de grupos de registros de CloudWatch (habilita la correlación de registros de traza) |
| `aws.log.stream.names` | No | Nombres de flujos de registros de CloudWatch |

### ECS Fargate {#ecs-fargate}

La identificación de ECS Fargate se determina mediante el ARN de la tarea y el tipo de lanzamiento, no por `cloud.provider` o `cloud.platform`. Configure el SDK de OpenTelemetry para exportar trazas directamente desde su tarea de ECS:

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-ecs-service"
export OTEL_RESOURCE_ATTRIBUTES="aws.ecs.task.arn=arn:aws:ecs:us-east-1:123456789012:task/my-cluster/1234567890abcdef,aws.ecs.launchtype=fargate"
```

| Atributo | Obligatorio | Descripción |
|---|---|---|
| `aws.ecs.task.arn` | Sí | ARN de la tarea de ECS |
| `aws.ecs.launchtype` | Sí | Se establece en `fargate` (sin distinción entre mayúsculas y minúsculas) |
| `cloud.provider` | No | El valor predeterminado es `aws` |
| `cloud.platform` | No | Se establece de forma predeterminada en `aws_ecs` |
| `cloud.region` | No | Región de AWS |
| `cloud.availability_zone` | No | Zona de disponibilidad |
| `aws.ecs.cluster.arn` | No | ARN del clúster |
| `aws.ecs.task.family` | No | Familia de definición de tarea |
| `aws.ecs.task.id` | No | ID de tarea |
| `aws.ecs.task.revision` | No | Revisión de definición de tarea |
| `aws.log.group.names` | No | Nombres de grupos de registros de CloudWatch (habilita la correlación de registros de traza) |
| `aws.log.stream.names` | No | Nombres de flujos de registros de CloudWatch |

[100]: https://aws-otel.github.io/docs/getting-started/lambda

{{% /tab %}}
{{% tab "Azure" %}}

<div class="alert alert-warning">El procesador de detección de recursos de Azure del OpenTelemetry Collector solo admite máquinas virtuales. Los detectores de recursos de Azure a nivel de SDK admiten algunas plataformas (Web Apps, Functions), pero la cobertura varía según el SDK del lenguaje. Establezca <code>cloud.provider</code>, <code>cloud.platform</code>, y <code>cloud.resource_id</code> manualmente como la ruta confiable para todas las plataformas Serverless de Azure.</div>

### Container Apps {#container-apps}

La compatibilidad del detector de recursos de Azure para Container Apps varía según el SDK del lenguaje. Establezca los atributos de recurso manualmente:

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-container-app"
export OTEL_RESOURCE_ATTRIBUTES="cloud.provider=azure,cloud.platform=azure.container_apps,cloud.resource_id=/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.App/containerApps/{appName}"
```

### Web Apps (servicio de aplicación) {#web-apps-app-service}

Utilice el paquete SDK del detector de recursos de Azure (la cobertura varía según el SDK del lenguaje) o establezca `OTEL_RESOURCE_ATTRIBUTES` manualmente:

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-web-app"
export OTEL_RESOURCE_ATTRIBUTES="cloud.provider=azure,cloud.platform=azure.app_service,cloud.resource_id=/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Web/sites/{appName}"
```

### Azure Functions {#azure-functions}

Utilice el paquete SDK del detector de recursos de Azure (la cobertura varía según el SDK del lenguaje) o establezca `OTEL_RESOURCE_ATTRIBUTES` manualmente:

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-azure-function"
export OTEL_RESOURCE_ATTRIBUTES="cloud.provider=azure,cloud.platform=azure.functions,cloud.resource_id=/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Web/sites/{functionAppName}"
```

### Referencia de atributos de recurso {#resource-attributes-reference}

| Plataforma | `cloud.provider` | `cloud.platform` | `cloud.resource_id` |
|---|---|---|---|
| Container Apps | `azure` | `azure.container_apps` | `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.App/containerApps/{appName}` |
| Web Apps | `azure` | `azure.app_service` | `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Web/sites/{appName}` |
| Azure Functions | `azure` | `azure.functions` | `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Web/sites/{functionAppName}` |

{{% /tab %}}
{{% tab "GCP" %}}

La detección de recursos de GCP funciona automáticamente con el paquete SDK del detector de recursos de GCP. Agréguelo a las dependencias de su aplicación para completar los atributos de recursos sin configuración manual.

### Cloud Run y Cloud Run Functions {#cloud-run-and-cloud-run-functions}

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-cloud-run-service"
```

El SDK de GCP Resource Detector completa automáticamente: `cloud.account.id`, `cloud.platform`, `cloud.provider`, `cloud.region`, `faas.id`, `faas.instance`, `faas.name`, `faas.version`.

### GKE Autopilot {#gke-autopilot}

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-gke-service"
```

El SDK de GCP Resource Detector completa automáticamente: `cloud.account.id`, `cloud.platform`, `cloud.provider`, `cloud.region`, `host.id`, `k8s.cluster.name`.

### Referencia de atributos de recursos {#resource-attributes-reference-1}

| Plataforma | Atributos completados por GCP Resource Detector |
|---|---|
| Cloud Run / Cloud Run Functions | `cloud.account.id`, `cloud.platform`, `cloud.provider`, `cloud.region`, `faas.id`, `faas.instance`, `faas.name`, `faas.version` |
| GKE Autopilot | `cloud.account.id`, `cloud.platform`, `cloud.provider`, `cloud.region`, `host.id`, `k8s.cluster.name` |

{{% /tab %}}
{{< /tabs >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/otlp_ingest_in_the_agent/
[2]: /es/tracing/metrics/
[3]: /es/opentelemetry/setup/otlp_ingest/logs/
[4]: /es/opentelemetry/setup/otlp_ingest/metrics/
[5]: /es/opentelemetry/setup/otlp_ingest/managed_platforms/
[6]: /es/opentelemetry/config/hostname_tagging/#direct-otlp-intake-without-a-collector