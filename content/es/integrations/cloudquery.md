---
app_id: cloudquery
categories:
- gestión de costes
- almacenes de datos
- herramientas para desarrolladores
- seguridad
custom_kind: integración
description: Monitorización de tus sincronizaciones de CloudQuery
integration_version: 1.0.0
media:
- caption: Información de las sincronizaciones de CloudQuery
  image_url: images/dashboard.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: CloudQuery
---
![integración-datadog](https://raw.githubusercontent.com/DataDog/integrations-extras/master/cloudquery/images/cloudquery_logo_png_dark_background.png)

## Información general

[CloudQuery](https://www.cloudquery.io/) es un marco de trabajo de integración de datos de alto rendimiento de [código abierto](https://github.com/cloudquery/cloudquery), creado para desarrolladores y compatible con una amplia gama de complementos.

CloudQuery extrae, transforma y carga configuración desde las APIs de la nube a una variedad de destinos compatibles, como bases de datos, lagos de datos o plataformas de streaming para su posterior análisis.

## Configuración

### Instalación

Para ingerir trazas (traces), métricas y logs de OpenTelemetry desde CloudQuery, instala las versiones >=6.48.0 o >=7.48.0 del [Datadog Agent ](https://docs.datadoghq.com/agent/).
Alternativamente, puedes utilizar OpenTelemetry Collector y Datadog Exporter como se describe a continuación.

### Configuración

CloudQuery admite trazas, métricas y logs de [OpenTelemetry](https://opentelemetry.io/) de forma predefinida.
Existen diversas maneras de configurar OpenTelemetry con Datadog:

- [Uso de un OpenTelemetry Collector](#opentelemetry-collector)
- [Ingesta directa de OTEL por el Datadog Agent a través de un archivo de configuración](#datadog-agent-otel-ingestion-through-a-configuration-file)
- [Ingesta directa de OTEL por el Datadog Agent a través de las variables de entorno](#datadog-agent-otel-ingestion-through-environment-variables)

Para obtener más información, consulta [OpenTelemetry en Datadog](https://docs.datadoghq.com/opentelemetry/).

#### OpenTelemetry Collector

Para configurar un OpenTelemetry Collector con Datadog:

1. Crea un archivo de configuración. Por ejemplo, crea un archivo `otel_collector_config.yaml` con el siguiente contenido:

```yaml
receivers:
  otlp:
    protocols:
      http:
        endpoint: "0.0.0.0:4318"

processors:
  batch/datadog:
    send_batch_max_size: 1000
    send_batch_size: 100
    timeout: 10s

exporters:
  datadog:
    api:
      site: ${env:DATADOG_SITE}
      key: ${env:DATADOG_API_KEY}

service:
  pipelines:
    metrics:
      receivers: [otlp]
      processors: [batch/datadog]
      exporters: [datadog]
    traces:
      receivers: [otlp]
      processors: [batch/datadog]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      processors: [batch/datadog]
      exporters: [datadog]
```

2. Ejecuta el recopilador con el siguiente comando (sustituye `DATADOG_SITE` y `DATADOG_API_KEY` por tus propios valores):

```bash
docker run \
    -p 4318:4318 \
    -e DATADOG_SITE=$DATADOG_SITE \
    -e DATADOG_API_KEY=$DATADOG_API_KEY \
    --hostname $(hostname) \
    -v $(pwd)/otel_collector_config.yaml:/etc/otelcol-contrib/config.yaml \
    otel/opentelemetry-collector-contrib:0.104.0
```

3. Una vez que tengas listo el recopilador, especifica el endpoint en la especificación de la fuente:

```yaml
kind: source
spec:
  name: "aws"
  path: "cloudquery/aws"
  # Replace with the AWS source plugin version
  version: "<VERSION_SOURCE_AWS>"
  tables: ["aws_s3_buckets"]
  destinations: ["postgresql"]
  otel_endpoint: "0.0.0.0:4318"
  otel_endpoint_insecure: true
  spec:
```

Para conocer otras formas de ejecutar el recopilador, consulta [Despliegues de OpenTelemetry](https://docs.datadoghq.com/opentelemetry/collector_exporter/deployment#running-the-collector).

#### Ingesta de OTEL del Datadog Agent a través de un archivo de configuración 

1. Busca tu [archivo de configuración `datadog.yaml` del Agent](https://docs.datadoghq.com/agent/configuration/agent-configuration-files/) y añade la siguiente configuración:

```yaml
otlp_config:
  receiver:
    protocols:
      http:
        endpoint: 0.0.0.0:4318
  logs:
    enabled: true
logs_enabled: true
```

2. [Reinicia](https://docs.datadoghq.com/agent/configuration/agent-commands/#restart-the-agent) el Datadog Agent para que el cambio surta efecto.

1. Una vez que tengas listo el Agent, especifica el endpoint en la especificación fuente:

```yaml
kind: source
spec:
  name: "aws"
  path: "cloudquery/aws"
  # Replace with the AWS source plugin version
  version: "<VERSION_SOURCE_AWS>"
  tables: ["aws_s3_buckets"]
  destinations: ["postgresql"]
  otel_endpoint: "0.0.0.0:4318"
  otel_endpoint_insecure: true
  spec:
```

#### Ingesta de OTEL del Datadog Agent a través de variables de entorno

1. Pasa la variable de entorno `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT` al Datadog Agent con un valor de `0.0.0.0:4318`.
   Si utilizas Docker compose, consulta el ejemplo siguiente:

```yaml
version: "3.0"
services:
  agent:
    image: gcr.io/datadoghq/agent:7
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /proc/:/host/proc/:ro
      - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
    environment:
      DD_API_KEY: redacted
      DD_SITE: "datadoghq.eu"
      DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT: "0.0.0.0:4318"
      DD_LOGS_ENABLED: "true"
      DD_OTLP_CONFIG_LOGS_ENABLED: "true"
    ports:
      - "4318:4318"
```

2. [Reinicia](https://docs.datadoghq.com/agent/configuration/agent-commands/#restart-the-agent) el Datadog Agent para que el cambio surta efecto.

1. Una vez que tengas listo el Agent, especifica el endpoint en la especificación fuente:

```yaml
kind: source
spec:
  name: "aws"
  path: "cloudquery/aws"
  # Replace with the AWS source plugin version
  version: "<VERSION_SOURCE_AWS>"
  tables: ["aws_s3_buckets"]
  destinations: ["postgresql"]
  otel_endpoint: "0.0.0.0:4318"
  otel_endpoint_insecure: true
  spec:
```

Para conocer más formas de configurar el Datadog Agent, consulta [Ingesta de OpenTelemetry Protocol Ingestion por el Datadog Agent](https://docs.datadoghq.com/opentelemetry/interoperability/otlp_ingest_in_the_agent#enabling-otlp-ingestion-on-the-datadog-agent).

### Validación

Ejecuta `cloudquery sync spec.yml`.
Una vez iniciada la ingesta, deberías empezar a ver las trazas en el [**Explorador de trazas APM**](https://app.datadoghq.com/apm/traces) de Datadog.
También puedes validar las métricas y los logs en el [**Resumen de métricas**](https://app.datadoghq.com/metric/summary) y el [**Explorador de logs**](https://app.datadoghq.com/logs).

## Datos recopilados

### Métricas

CloudQuery no incluye ninguna métrica.

### Checks de servicio

CloudQuery no incluye ningún check de servicio.

### Eventos

CloudQuery no incluye ningún evento.

## Desinstalación

Si utilizas el recopilador de OpenTelemetry, puedes detenerlo ejecutando `docker stop <container_id>`.
Si utilizas el Datadog Agent, elimina la configuración o las variables de entorno que hayas añadido y [reinicia](https://docs.datadoghq.com/agent/configuration/agent-commands/#restart-the-agent) el Agent.
Por último, elimina el dashboard de tu cuenta Datadog.

## Soporte

Para obtener asistencia, ponte en contacto con [CloudQuery](https://www.cloudquery.io/pricing).