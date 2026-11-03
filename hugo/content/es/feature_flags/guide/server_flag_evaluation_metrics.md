---
description: Configure el Datadog Agent y su aplicación para emitir y visualizar métricas
  de evaluación de feature flags del lado del servidor.
further_reading:
- link: /feature_flags/server/
  tag: Documentación
  text: Feature Flags del lado del servidor
- link: /feature_flags/concepts/flag_graphs/
  tag: Documentación
  text: Gráficos de Feature Flag
- link: /metrics/
  tag: Documentación
  text: Métricas
- link: /dashboards/
  tag: Documentación
  text: Dashboards
title: Configure las métricas de evaluación de marcadores del lado del servidor
---
## Descripción general {#overview}

Las métricas de evaluación de flags le permiten medir con qué frecuencia su aplicación del lado del servidor devuelve cada variante de una feature flag. Utilice estas métricas para realizar un seguimiento de la adopción de flags a lo largo del tiempo, verificar que las reglas de segmentación funcionen según lo esperado y graficar los datos de evaluación de flags en dashboards.

<div class="alert alert-warning">El <code>feature_flag.evaluations</code> la métrica es experimental y puede cambiar o eliminarse en una versión futura.</div>

<div class="alert alert-info">El <code>feature_flag.evaluations</code> La métrica es independiente de los eventos de exposición de experimentos y de los eventos de evaluación de feature flags del Event Platform Proxy (EVP). La salida de eventos de exposición y EVP utiliza la URL del tracer estándar en el puerto 8126. Esta métrica utiliza un punto de conexión OTLP en el puerto 4317 o 4318.</div>

## Requisitos previos {#prerequisites}

Antes de configurar las métricas de evaluación de flags, confirme lo siguiente:

- [Feature flags del lado del servidor][1] ya están configuradas.
- Para implementaciones respaldadas por Agent, Datadog Agent 7.32.0 o posterior se está ejecutando y puede recibir métricas OTLP.
- Para implementaciones sin servidor sin Agent, su plataforma tiene configurada una ruta de telemetría sin servidor compatible.
- Para entornos sin servidor de Java, Node.js y Python, consulte [Enviar telemetría de feature flags][7].
- Para configuraciones respaldadas por Agent que utilizan la ruta de activación heredada, `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` está configurado en su aplicación.
- Su tracer del lado del servidor cumple con la versión mínima para el soporte de métricas de evaluación de feature flags:

| Lenguaje | Versión mínima del tracer |
| -------- | ---------------------- |
| .NET     | 3.44.0                 |
| Go       | 2.8.0                  |
| Java     | 1.62.0                 |
| Node.js  | 5.99.0                 |
| PHP      | 1.21.1                 |
| Python   | 4.7.0                  |
| Ruby     | 2.32.0                 |

La entrega de configuración Agentless y esta métrica utilizan rutas independientes. Un SDK sin agente puede emitir la métrica cuando configura la ruta OTLP requerida a través de una configuración de telemetría sin servidor o respaldada por un Agent compatible.

## Paso 1: Configure un receptor OTLP {#step-1-configure-an-otlp-receiver}

Las métricas de evaluación de feature flags se emiten a través de OpenTelemetry (OTLP). Para implementaciones respaldadas por el Datadog Agent, habilite el receptor OTLP del Datadog Agent, que está desactivado de forma predeterminada. Para obtener instrucciones de configuración, consulte [Ingesta de OTLP por el Datadog Agent][2]. Para implementaciones sin servidor sin Agent, utilice la ruta OTLP o de métricas personalizadas admitida por su configuración de Serverless Monitoring.

Solo necesita habilitar el protocolo que utiliza su aplicación (gRPC en el puerto 4317, o HTTP en el puerto 4318).

<div class="alert alert-info">Si está ejecutando Datadog Agent v7.61.0 o posterior en Docker, configure <code>HOST_PROC=/proc</code> en el contenedor de Datadog Agent para solucionar un problema conocido con la canalización OTLP.</div>

## Paso 2: Configure su aplicación {#step-2-configure-your-application}

Para las combinaciones compatibles de tracer y modo de entrega, excepto Java, configure la siguiente variable de entorno además de la [configuración de feature flags del lado del servidor][1] estándar. Para Java, `DD_METRICS_OTEL_ENABLED` no tiene efecto; consulte la sección [Java: Añada las dependencias del SDK de OpenTelemetry](#java-add-the-opentelemetry-sdk-dependencies) en su lugar.

{{< code-block lang="bash" >}}
# Enable flag evaluation metrics
DD_METRICS_OTEL_ENABLED=true
{{< /code-block >}}

### Java: Añada las dependencias del SDK de OpenTelemetry {#java-add-the-opentelemetry-sdk-dependencies}

El proveedor de Java registra `feature_flag.evaluations` a través del SDK de OpenTelemetry y lo exporta a través de OTLP, por lo que las dependencias `opentelemetry-sdk-metrics` y `opentelemetry-exporter-otlp` deben estar en el classpath de su aplicación. Añádalas junto con sus [dependencias de feature flags de Java][6]. Importe la BOM de OpenTelemetry para que la API y el SDK de OpenTelemetry permanezcan en la misma versión:

{{< tabs >}}
{{% tab "Gradle (Groovy)" %}}
{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    implementation platform('io.opentelemetry:opentelemetry-bom:1.47.0')
    implementation 'io.opentelemetry:opentelemetry-sdk-metrics'
    implementation 'io.opentelemetry:opentelemetry-exporter-otlp'
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Gradle (Kotlin)" %}}
{{< code-block lang="kotlin" filename="build.gradle.kts" >}}
dependencies {
    implementation(platform("io.opentelemetry:opentelemetry-bom:1.47.0"))
    implementation("io.opentelemetry:opentelemetry-sdk-metrics")
    implementation("io.opentelemetry:opentelemetry-exporter-otlp")
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Maven" %}}
{{< code-block lang="xml" filename="pom.xml" >}}
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>io.opentelemetry</groupId>
            <artifactId>opentelemetry-bom</artifactId>
            <version>1.47.0</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
<dependencies>
    <dependency>
        <groupId>io.opentelemetry</groupId>
        <artifactId>opentelemetry-sdk-metrics</artifactId>
    </dependency>
    <dependency>
        <groupId>io.opentelemetry</groupId>
        <artifactId>opentelemetry-exporter-otlp</artifactId>
    </dependency>
</dependencies>
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

En el rastreador de Java, el proveedor inicia automáticamente su exportador de métricas OTLP cuando el SDK de OpenTelemetry está en la ruta de clases. Si faltan las dependencias, no se emiten métricas y el rastreador registra `OpenTelemetry SDK is not on the classpath`.

<div class="alert alert-info">En aplicaciones de Spring Boot, la autoconfiguración de OpenTelemetry de Spring Boot también crea un <code>OpenTelemetrySdk</code> bean. Si la versión del SDK de OpenTelemetry que resuelve no coincide con la versión de la API de OpenTelemetry en la ruta de clases, el inicio falla con un <code>BeanCreationException</code> para el <code>openTelemetry</code> bean y <code>NoClassDefFoundError: io/opentelemetry/sdk/internal/ScopeConfigurator</code>. Al importar el <code>opentelemetry-bom</code> como se muestra arriba, mantiene la API y el SDK en la misma versión y resuelve el error.</div>

### Ruby: Agregue las gemas de métricas de OpenTelemetry {#ruby-add-the-opentelemetry-metrics-gems}

Para aplicaciones Ruby, agregue las gemas del SDK de métricas de OpenTelemetry y del exportador de métricas OTLP al paquete de su aplicación:

{{< code-block lang="ruby" filename="Gemfile" >}}
gem "opentelemetry-metrics-sdk", ">= 0.8"
gem "opentelemetry-exporter-otlp-metrics", ">= 0.4"
{{< /code-block >}}

Instale las gemas con `bundle install`. Estas gemas proporcionan el proveedor de medidores de OpenTelemetry y el exportador de métricas OTLP. El rastreador de Ruby los utiliza cuando `DD_METRICS_OTEL_ENABLED=true` está configurado. Si faltan las gemas, el rastreador de Ruby no emite métricas `feature_flag.evaluations` y registra `Failed to load OpenTelemetry metrics gems`.

### Configuración del punto de conexión{#endpoint-configuration}

`DD_TRACE_AGENT_URL` y el listener estándar `serverless-init` en el puerto 8126 no configuran el punto de conexión de métricas OTLP. Configure el punto de conexión OTLP por separado, como se describe en la siguiente sección. Para implementaciones sin servidor sin Agent, siga la configuración de Serverless Monitoring para su plataforma antes de configurar esta métrica.

De forma predeterminada, la mayoría de los trazadores envían métricas OTLP al Datadog Agent en `DD_AGENT_HOST` por el puerto `4318` (HTTP). Si su aplicación ya configura `DD_AGENT_HOST` para llegar al Datadog Agent, no se requiere configuración de punto de conexión.

Establezca un punto de conexión OTLP explícitamente en cualquiera de estos casos:

- El Datadog Agent no es accesible en `DD_AGENT_HOST` en el puerto OTLP predeterminado (por ejemplo, un Datadog Agent remoto o un puerto no predeterminado).
- Usted utiliza el trazador de **Java**. Su exportador de métricas de evaluación de feature flags solo admite OTLP/HTTP (gRPC no es compatible) en el puerto `4318`. El trazador de Java no deriva el punto de conexión de `DD_AGENT_HOST` y utiliza `http://localhost:4318` de forma predeterminada. Establezca `OTEL_EXPORTER_OTLP_ENDPOINT` en el punto de conexión HTTP del Datadog Agent cuando el Datadog Agent no esté en `localhost`.
- Usted utiliza el trazador de **Python**. El trazador de Python utiliza gRPC de forma predeterminada en el puerto `4317`, no HTTP. Habilite el receptor OTLP gRPC en el Datadog Agent o anule el protocolo para usar HTTP en su lugar:

{{< code-block lang="bash" >}}
OTEL_EXPORTER_OTLP_ENDPOINT=http://<AGENT_HOST>:4318
OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
{{< /code-block >}}

Para configurar el punto de conexión, utilice la variable estándar de OpenTelemetry:

{{< code-block lang="bash" >}}
# Point OTLP data at the Datadog Agent (HTTP, port 4318)
OTEL_EXPORTER_OTLP_ENDPOINT=http://<AGENT_HOST>:4318

# Or use gRPC (port 4317). For most tracers, the default protocol is http/protobuf,
# so set the protocol explicitly when switching to gRPC:
# OTEL_EXPORTER_OTLP_ENDPOINT=http://<AGENT_HOST>:4317
# OTEL_EXPORTER_OTLP_PROTOCOL=grpc
{{< /code-block >}}

Reemplace `<AGENT_HOST>` con el nombre de host o la dirección IP de su Datadog Agent.

Ejemplo de Docker Compose:

{{< code-block lang="yaml" filename="docker-compose.yml" >}}
services:
  datadog-agent:
    environment:
      - DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT=0.0.0.0:4317
      - DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT=0.0.0.0:4318
      - HOST_PROC=/proc  # If running Agent v7.61.0+ in Docker

  app-go:
    environment:
      - DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
      - DD_METRICS_OTEL_ENABLED=true
      - OTEL_EXPORTER_OTLP_ENDPOINT=http://datadog-agent:4318
    depends_on:
      datadog-agent:
        condition: service_healthy
{{< /code-block >}}

## Paso 3: Verifique que las métricas estén fluyendo {#step-3-verify-metrics-are-flowing}

Después de implementar, confirme que las métricas estén llegando a Datadog:

1. Vaya al [Metrics Explorer][3] y busque `feature_flag.evaluations`.
2. Si la métrica no aparece a los pocos minutos de que su aplicación evalúe los feature flags, verifique:
   - El receptor OTLP de Datadog Agent está habilitado y el puerto correcto está expuesto.
   - `OTEL_EXPORTER_OTLP_ENDPOINT` apunta al Datadog Agent, no a un recopilador independiente.
   - Su aplicación está evaluando activamente feature flags con un SDK de servidor en tiempo de ejecución (se está ejecutando la ruta del código).

## Paso 4: Habilitar la retención de métricas {#step-4-enable-metric-retention}

De forma predeterminada, `feature_flag.evaluations` conserva solo una hora de datos. Para conservar un historial más largo:

1. Vaya a [Metrics Summary][4] y busque `feature_flag.evaluations`.
2. Seleccione la métrica y habilite **Historical Metrics**.

Esta es una configuración de participación voluntaria y no se habilita automáticamente para las métricas OTLP.

## Graficar evaluaciones de feature flags en un tablero {#graph-flag-evaluations-on-a-dashboard}

Utilice la siguiente consulta para graficar las evaluaciones de feature flags por clave de flag y variante en un [dashboard][5]:

{{< code-block lang="text" >}}
sum:feature_flag.evaluations{*} by {feature_flag.key,feature_flag.result.variant}
{{< /code-block >}}

La métrica `feature_flag.evaluations` es un contador con las siguientes etiquetas:

| Etiqueta                                  | Descripción                                        |
| ------------------------------------ | -------------------------------------------------- |
| `feature_flag.key`                   | La clave del flag que se está evaluando                       |
| `feature_flag.result.variant`        | La variante devuelta por la evaluación             |
| `feature_flag.result.reason`         | El motivo del resultado de la evaluación               |
| `feature_flag.result.allocation_key` | El identificador de las reglas de segmentación evaluadas (se emite solo cuando está presente) |
| `error.type`                         | El tipo de error (se emite solo en evaluaciones con error) |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/feature_flags/server/
[2]: /es/opentelemetry/setup/otlp_ingest_in_the_agent/
[3]: https://app.datadoghq.com/metric/explorer
[4]: https://app.datadoghq.com/metric/summary
[5]: /es/dashboards/
[6]: /es/feature_flags/server/java/#installation
[7]: /es/feature_flags/implementation_patterns/serverless/#send-feature-flag-telemetry