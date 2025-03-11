---
further_reading:
- link: /opentelemetry/agent/install_agent_with_collector
  tag: Documentation
  text: Uso de componentes personalizados de OpenTelemetry con el Datadog Agent
private: true
title: Uso de componentes personalizados de OpenTelemetry con el Datadog Agent
---

{{< callout url="https://www.datadoghq.com/private-beta/agent-with-embedded-opentelemetry-collector/" btn_hidden="false" header="Unirse a la Vista previa">}}
El Datadog Agent con el recopilador de OpenTelemetry integrado está en Vista previa. Para solicitar acceso, rellena este formulario.
{{< /callout >}}

Esta guía explica cómo crear una imagen del Datadog Agent con componentes adicionales de OpenTelemetry no incluidos en la imagen por defecto del Datadog Agent. Para ver una lista de los componentes ya incluidos en el Agent por defecto, consulta [Componentes incluidos][1].

## Requisitos previos

Para completar esta guía, necesitas lo siguiente:

- [Docker][2]
- GitHub y acceso al código fuente del [Datadog Agent ][3].
- Los componentes de OpenTelemetry que quieres incluir en el Agent deben ser compatibles con la versión del recopilador de OpenTelemetry integrado.

**Recomendado**:

- Conocimientos sobre la [creación de un recopilador personalizado][4] y [OpenTelemetry Collector Builder][5] (OCB).
- Conocimientos básicos del proceso de compilación [Go](https://go.dev/) y de los [módulos Go](https://go.dev/blog/using-go-modules).

## Descargar el archivo Docker

Descargue la plantilla del archivo Docker:

1. Ve a tu localización de archivos preferida en un terminal. Ejecuta los siguientes comandos para crear una nueva carpeta (por ejemplo, llamada `agent-with-otel`) y cd en ella.
   ```shell
   mkdir -p agent-with-otel
   cd agent-with-otel
   ```
2. Descargar el archivo Docker
   ```shell
   curl -o Dockerfile https://raw.githubusercontent.com/DataDog/datadog-agent/main/Dockerfiles/agent-ot/Dockerfile.agent-otel
   ```

El archivo Docker:

- Crea una [compilación multietapa][6] con Ubuntu v24.04 y `datadog/agent:7.59.0-v1.1.0-ot-beta-jmx`.
- Instala Go, Python y las dependencias necesarias.
- Descarga y descomprime el código fuente del Datadog Agent.
- Crea un entorno virtual e instala los paquetes Python necesarios.
- Crea el Agent OpenTelemetry y copia el binario resultante en la imagen final.

## Crear un manifiesto de OpenTelemetry Collector Builder

Crea y personaliza un archivo del manifiesto de OpenTelemetry Collector Builder (OCB), que defina los componentes que se incluirán en tu Datadog Agent personalizado.

1. Descarga el manifiesto por defecto de Datadog:
   ```shell
   curl -o manifest.yaml https://raw.githubusercontent.com/DataDog/datadog-agent/7.59.x/comp/otelcol/collector-contrib/impl/manifest.yaml
   ```
2. Abre el archivo `manifest.yaml` y añade los componentes adicionales de OpenTelemetry a las secciones correspondientes (extensiones, exportadores, procesadores, receptores o conectores).
   La línea resaltada en este ejemplo añade un [procesador de transformación de métricas][7]:
   {{< highlight json "hl_lines=19" >}}
dist:
  módulo: github.com/DataDog/comp/otelcol/collector-contrib
  nombre: otelcol-contrib
  descripción: Datadog OpenTelemetry Collector
  versión: 0.104.0
  ruta_salida: ./comp/otelcol/collector-contrib/impl
  versión_otelcol: 0.104.0

extensions:
# Verás una lista de extensiones ya incluidas por Datadog
# Añadir aquí las extensiones elegidas

exporters:
# Verá una lista de exportadores ya incluidos por Datadog
# Añadir aquí los exportadores elegidos

procesadores:
# añadir el procesador de transformación de métricas para modificar métricas
  - gomod: github.com/open-telemetry/opentelemetry-collector-contrib/processor/metricstransformprocessor v0.104.0

receivers:
  - gomod: go.opentelemetry.io/collector/receiver/nopreceiver v0.104.0
  - gomod: go.opentelemetry.io/collector/receiver/otlpreceiver v0.104.0
  - gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/filelogreceiver v0.104.0
  - gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/fluentforwardreceiver v0.104.0
  - gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/hostmetricsreceiver v0.104.0
  - gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/jaegerreceiver v0.104.0
  - gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/prometheusreceiver v0.104.0
  - gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/receivercreator v0.104.0
  - gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/zipkinreceiver v0.104.0

conectores:
# Verás una lista de conectores ya incluidos por Datadog
# Añadir aquí los conectores elegidos
{{< /highlight >}}
1. Guarda los cambios en el archivo del manifiesto.

## Crear y enviar la imagen del Agent 

Crea tu imagen personalizada del Datadog Agent y envíala a un registro de contenedor.

1. Crea la imagen con Docker:
   ```shell
   docker build . -t agent-otel --no-cache
   ```
2. Tag and push the image:
   ```shell
   docker tag agent-otel <IMAGE-NAME>/<IMAGE-TAG>
   docker push <IMAGE-NAME>/<IMAGE-TAG>
   ```
   Replace `<IMAGE-NAME>` and `<IMAGE-TAG>` with your image name and desired tag. If the target repository is not Docker Hub, you need to include the repository name.
3. For a Helm chart installation, set the image tag in your values file:
   {{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
agents:
  image:
    repository: <YOUR-REPO>
    tag: <IMAGE-TAG>
    doNotCheckTag: true
   {{< /code-block >}}
   Replace `<YOUR-REPO>` and `<IMAGE-TAG>` with your repository name and desired image tag.

## Test and validate

Create a sample configuration file and run your custom Agent to ensure everything is working correctly.

1. Create a sample OpenTelemetry configuration file with the additional components.
  The following example configures an additional [metrics transform processor][7]:
   ```yaml
   receivers:
     otlp:
       protocols:
         http:
           endpoint: "0.0.0.0:4318"
         grpc:
           endpoint: "0.0.0.0:4317"

   processors:
     batch:
       send_batch_max_size: 1000
       send_batch_size: 100
       timeout: 10s
     # Rename system.cpu.usage to system.cpu.usage_time
     metricstransform:
       transforms:
         - include: system.cpu.usage
           action: update
           new_name: system.cpu.usage_time

   exporters:
     datadog:
       api:
         site: ${env:DD_SITE}
         key: ${env:DD_API_KEY}

   connectors:
       datadog/connector:
           traces:
             compute_top_level_by_span_kind: true
             peer_tags_aggregation: true
             compute_stats_by_span_kind: true

   service:
     pipelines:
       metrics:
         receivers: [otlp, datadog/connector]
         processors: [metricstransform, batch]
         exporters: [datadog]
       traces:
         receivers: [otlp]
         processors: [batch]
         exporters: [datadog/connector]
       traces/2:
         receivers: [datadog/connector]
         processors: [batch]
         exporters: [datadog]
       logs:
         receivers: [otlp]
         processors: [batch]
         exporters: [datadog]
   ```
2. Run the Agent using the following Docker command.
   ```shell
   docker run -it \
     -e DD_API_KEY=XX \
     -e DD_SITE=datadoghq.com \
     -e DD_HOSTNAME=datadog \
     -v $(pwd)/config.yaml:/config.yaml \
     -p 4317:4317 \
     -p 4318:4318 \
     --entrypoint otel-agent \
     agent-otel --config /config.yaml
   ```
3. If the Agent starts, then the build process was successful.

You can now use this new image to install the Agent. This enables Datadog monitoring capabilities along with the additional OpenTelemetry components you've added.

For detailed instructions on installing and configuring the Agent with added OpenTelemetry components, see the [Install the Datadog Agent with Embedded OpenTelemetry Collector][9] guide.

## Troubleshooting

This section discusses some common issues you might encounter while building and running your custom Datadog Agent, along with their solutions:

### Compatibility issues with `awscontainerinsightreceiver`

**Problem**: You may encounter errors related to `awscontainerinsightreceiver` during the build:
```text
#0 0.879 go: downloading github.com/tidwall/gjson v1.17.1
#0 0.889 go: downloading code.cloudfoundry.org/go-diodes v0.0.0-20240604201846-c756bfed2ed3
#0 0.916 go: downloading github.com/hashicorp/go-retryablehttp v0.7.5
#0 0.940 go: downloading github.com/tidwall/pretty v1.2.1
#0 88.24 # github.com/opencontainers/runc/libcontainer/cgroups/ebpf
#0 88.24 /go/pkg/mod/github.com/opencontainers/runc@v1.1.12/libcontainer/cgroups/ebpf/ebpf_linux.go:190:3: unknown field Replace in struct literal of type link.RawAttachProgramOptions
#0 89.14 # github.com/open-telemetry/opentelemetry-collector-contrib/receiver/awscontainerinsightreceiver/internal/k8sapiserver
#0 89.14 /go/pkg/mod/github.com/open-telemetry/opentelemetry-collector-contrib/receiver/awscontainerinsightreceiver@v0.104.0/internal/k8sapiserver/k8sapiserver.go:47:68: undefined: record.EventRecorderLogger
------
```

**Solution**: Remove `awscontainerinsightreceiver` from the `manifest.yaml` file. This receiver has incompatible libraries and cannot be included in the build.

### Build process failures

**Problem**: You receive the following error:
```text
ERROR: failed to solve: process "/bin/sh -c . venv/bin/activate && invoke otel-agent.build" did not complete successfully: chown /var/lib/docker/overlay2/r75bx8o94uz6t7yr3ae6gop0b/work/work: no such file or directory
```

**Solution**: Run the build command again:
```shell
docker build . -t agent-otel --no-cache
```

### Espacio en disco insuficiente

**Problema**: Puedes encontrarte con errores relacionados con la insuficiencia de espacio en el disco, como:
```text
no space left on device
```

**Solución**: Libera espacio de Docker:
```shell
docker system prune -a
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/agent/#included-components
[2]: https://docs.docker.com/engine/install/
[3]: https://github.com/DataDog/datadog-agent
[4]: https://opentelemetry.io/docs/collector/custom-collector/
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/cmd/builder/README.md
[6]: https://docs.docker.com/build/building/multi-stage/
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/metricstransformprocessor/README.md
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/jmxreceiver/README.md
[9]: /es/opentelemetry/agent/install_agent_with_collector