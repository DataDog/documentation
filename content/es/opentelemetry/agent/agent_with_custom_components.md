---
further_reading:
- link: /opentelemetry/agent/install_agent_with_collector
  tag: Documentation
  text: Uso de componentes personalizados de OpenTelemetry con el Datadog Agent
private: true
title: Uso de componentes personalizados de OpenTelemetry con el Datadog Agent
---

{{< callout url="https://www.datadoghq.com/private-beta/agent-with-embedded-opentelemetry-collector/" btn_hidden="false" header="Join the Preview!">}}
  El Datadog Agent con el OpenTelemetry Collector integrado está en Vista previa. Para solicitar acceso, rellena este formulario.
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
   curl -o Dockerfile https://raw.githubusercontent.com/DataDog/datadog-agent/refs/tags/{{< version key="agent_version" >}}/Dockerfiles/agent-ot/Dockerfile.agent-otel
   ```

El archivo Docker:

- Crea una [compilación multietapa][6] con Ubuntu 24.04 y `datadog/agent:{{% version key="agent_tag" %}}`.
- Instala Go, Python y las dependencias necesarias.
- Descarga y descomprime el código fuente del Datadog Agent.
- Crea un entorno virtual e instala los paquetes Python necesarios.
- Crea el Agent OpenTelemetry y copia el binario resultante en la imagen final.

<div class="alert alert-info">La rama <code>main</code> tiene la versión más actualizada del <a href="https://github.com/DataDog/datadog-agent/blob/main/Dockerfiles/agent-ot/Dockerfile.agent-otel">Dockerfile</a>. Sin embargo, es una rama de desarrollo que está sujeta a cambios frecuentes y es menos estable que las etiquetas (tags) de versión. Para producción y otros casos de uso estables, utiliza las versiones etiquetadas que se indican en esta guía.</div>

## Crear un manifiesto de OpenTelemetry Collector Builder

Crea y personaliza un archivo del manifiesto de OpenTelemetry Collector Builder (OCB), que defina los componentes que se incluirán en tu Datadog Agent personalizado.

1. Descarga el manifiesto por defecto de Datadog:
   ```shell
   curl -o manifest.yaml https://raw.githubusercontent.com/DataDog/datadog-agent/refs/tags/{{< version key="agent_version" >}}/comp/otelcol/collector-contrib/impl/manifest.yaml
   ```
2. Abre el archivo `manifest.yaml` y añade los componentes adicionales de OpenTelemetry a las secciones correspondientes (extensiones, exportadores, procesadores, receptores o conectores).
   La línea resaltada en este ejemplo añade un [procesador de transformación de métricas][7]:
   {{< highlight json "hl_lines=19" >}}
dist:
  módulo: github.com/DataDog/comp/otelcol/collector-contrib
  nombre: otelcol-contrib
  descripción: Datadog OpenTelemetry Collector
  versión: {{< version key="collector_version" >}}
  output_path: ./comp/otelcol/collector-contrib/impl
  otelcol_version: {{< version key="collector_version" >}}

extensions:
# Verás una lista de extensiones ya incluidas por Datadog
# Añadir aquí las extensiones elegidas

exporters:
# Verá una lista de exportadores ya incluidos por Datadog
# Añadir aquí los exportadores elegidos

procesadores:
# añadir el procesador de transformación de métricas para modificar métricas
  - gomod: github.com/open-telemetry/opentelemetry-collector-contrib/processor/metricstransformprocessor v{{< version key="collector_version" >}}

receivers:
  - gomod: go.opentelemetry.io/collector/receiver/nopreceiver v{{< version key="collector_version" >}}
  - gomod: go.opentelemetry.io/collector/receiver/otlpreceiver v{{< version key="collector_version" >}}
  - gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/filelogreceiver v{{< version key="collector_version" >}}
  - gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/fluentforwardreceiver v{{< version key="collector_version" >}}
  - gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/hostmetricsreceiver v{{< version key="collector_version" >}}
  - gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/jaegerreceiver v{{< version key="collector_version" >}}
  - gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/prometheusreceiver v{{< version key="collector_version" >}}
  - gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/receivercreator v{{< version key="collector_version" >}}
  - gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/zipkinreceiver v{{< version key="collector_version" >}}

conectores:
# Verás una lista de conectores ya incluidos por Datadog
# Añadir aquí los conectores elegidos
{{< /highlight >}}
1. Guarda los cambios en el archivo del manifiesto.

## Crear y enviar la imagen del Agent 

Crea tu imagen personalizada del Datadog Agent y envíala a un registro de contenedor.

1. Crea la imagen con Docker:
   ```shell
   docker build . -t agent-otel --no-cache \
     --build-arg AGENT_VERSION="{{< version key="agent_tag" >}}" \
     --build-arg AGENT_BRANCH="{{< version key="agent_branch" >}}"
   ```
2. Etiquetar y enviar la imagen:
   ```shell
   docker tag agent-otel <IMAGE-NAME>/<IMAGE-TAG>
   docker push <IMAGE-NAME>/<IMAGE-TAG>
   ```
   Sustituye `<IMAGE-NAME>` y `<IMAGE-TAG>` por el nombre y la etiqueta de tu imagen. Si el repositorio de destino no es Docker Hub, tendrás que incluir el nombre del repositorio.
3. Para instalar una tabla de Helm, establece la etiqueta de la imagen en tu archivo de valores:
   {{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
agents:
  image:
    repository: <YOUR-REPO>
    tag: <IMAGE-TAG>
    doNotCheckTag: true
   {{< /code-block >}}
   Sustituye `<YOUR-REPO>` y `<IMAGE-TAG>` por el nombre de tu repositorio y la imagen deseada etiquetar.

## Testear y validar

Crea un archivo de configuración de ejemplo y ejecuta tu Agent personalizado para asegurarte de que todo funciona correctamente.

1. Crea un archivo de configuración de ejemplo de OpenTelemetry con los componentes adicionales.
  El siguiente ejemplo configura un [procesador de transformación de métricas][7] adicional:
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
2. Ejecuta el Agent con el siguiente comando de Docker.
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
3. El inicio del Agent indica que el proceso de compilación fue correcto.

Ahora puedes utilizar esta nueva imagen para instalar el Agent. Esto activa las capacidades de monitorización de Datadog junto con los componentes adicionales de OpenTelemetry que añadiste.

Para obtener instrucciones detalladas sobre la instalación y configuración del Agent con componentes de OpenTelemetry añadidos, consulta la guía [Instalar el Datadog Agent con el OpenTelemetry Collector integrado][9].

## Resolución de problemas

En esta sección, se tratan algunos de los problemas más comunes que pueden surgir durante la compilación y ejecución del Datadog Agent, junto con sus soluciones:

### Problemas de compatibilidad con `awscontainerinsightreceiver`

**Problema**: es posible que se produzcan errores relacionados con `awscontainerinsightreceiver` durante la compilación:
```text
#0 0.879 go: downloading github.com/tidwall/gjson v1.17.1
#0 0.889 go: downloading code.cloudfoundry.org/go-diodes v0.0.0-20240604201846-c756bfed2ed3
#0 0.916 go: downloading github.com/hashicorp/go-retryablehttp v0.7.5
#0 0.940 go: downloading github.com/tidwall/pretty v1.2.1
#0 88.24 # github.com/opencontainers/runc/libcontainer/cgroups/ebpf
#0 88.24 /go/pkg/mod/github.com/opencontainers/runc@v1.1.12/libcontainer/cgroups/ebpf/ebpf_linux.go:190:3: unknown field Replace in struct literal of type link.RawAttachProgramOptions
#0 89.14 # github.com/open-telemetry/opentelemetry-collector-contrib/receiver/awscontainerinsightreceiver/internal/k8sapiserver
#0 89.14 /go/pkg/mod/github.com/open-telemetry/opentelemetry-collector-contrib/receiver/awscontainerinsightreceiver@v0.115.0/internal/k8sapiserver/k8sapiserver.go:47:68: undefined: record.EventRecorderLogger
------
```

**Solución**: elimina `awscontainerinsightreceiver` del archivo `manifest.yaml`. Este receptor tiene bibliotecas incompatibles y no se puede incluir en la compilación.

### Errores en el proceso de compilación

**Problema**: recibes el siguiente error:
```text
ERROR: failed to solve: process "/bin/sh -c . venv/bin/activate && invoke otel-agent.build" did not complete successfully: chown /var/lib/docker/overlay2/r75bx8o94uz6t7yr3ae6gop0b/work/work: no such file or directory
```

**Solución**: vuelve a ejecutar el comando de compilación:
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