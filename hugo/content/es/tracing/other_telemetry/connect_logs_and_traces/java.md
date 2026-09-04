---
aliases:
- /es/tracing/connect_logs_and_traces/java
code_lang: java
code_lang_weight: 10
description: Conecta tus logs y trazas (traces) de Java para correlacionarlos en Datadog.
further_reading:
- link: tracing/trace_collection/custom_instrumentation
  tag: Documentación
  text: Instrumenta tu aplicación de forma manual para crear trazas.
- link: tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: Blog
  text: Correlacionar automáticamente logs de solicitud con trazas
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Guía
  text: Facilita la solución de problemas con una correlación entre productos.
title: Correlación de logs y trazas de Java
type: multi-code-lang
---
## Antes de empezar

Asegúrate de que la recopilación de log está configurada. Consulta [Recopilación de log de Java][1] para obtener instrucciones sobre Log4j, Log4j 2 o Logback.

## Inyección automática

A partir de la versión 0.74.0, el rastreador de Java inyecta automáticamente identificadores de correlación de traza en logs con formato JSON. Para versiones anteriores, activa la inyección automática en el rastreador de Java añadiendo `dd.logs.injection=true` como propiedad del sistema, o a través de la variable de entorno `DD_LOGS_INJECTION=true`. Los detalles completos de configuración pueden encontrarse en la página de [configuración del rastreador de Java][2].

Para un enfoque más universal, basado en la configuración, también puedes utilizar appenders de logs de OpenTelemetry'. Consulta [Correlación de traces (trazas) y logs de OpenTelemetry][6] para obtener instrucciones de configuración.

**Notas**:
- La inserción automática de la correlación de traces (trazas) está disponible para Log4j2, Log4j o SLF4J y Logback.
- Si la `attribute.path` de tu ID de traza *no* es `dd.trace_id`, asegúrate de que la configuración de atributos reservados de tu ID de trace (traza) tenga en cuenta la `attribute.path`. Para obtener más información, consulta [Los logs correlacionados no aparecen en el panel de ID de traces (trazas)][3].

<div class="alert alert-info">A partir de la versión 1.18.3, si la <a href="/tracing/guide/remote_config">Configuración remota del Agent</a> está activada donde se ejecuta el servicio, puedes configurar <code>DD_LOGS_INJECTION</code> en la interfaz de usuario de <a href="/tracing/software_catalog">Software Catalog</a>.</div>

## Inserción manual

Si prefieres añadir manualmente identificadores de correlación a tus logs, puedes utilizar una API de rastreo. Datadog recomienda utilizar la API estándar de OpenTelemetry para la neutralidad del proveedor y una mayor compatibilidad. También puedes utilizar la API específica de Datadog.

### API de OpenTelemetry (recomendada)

Para correlacionar logs y traces (trazas) con la API de OpenTelemetry, añade primero la dependencia `OpenTelemetry-api` a tu project (proyecto).

{{< tabs >}}
{{% tab "Maven" %}}

```xml
<dependency>
    <groupId>io.opentelemetry</groupId>
    <artifactId>opentelemetry-api</artifactId>
    <version>1.40.0</version> <scope>provided</scope>
</dependency>
```

{{% /tab %}}
{{% tab "Gradle" %}}

```groovy
compileOnly 'io.opentelemetry:opentelemetry-api:1.40.0'
```
{{% /tab %}}
{{% tab "Gradle (Kotlin DSL)" %}}

```kotlin
compileOnly("io.opentelemetry:opentelemetry-api:1.40.0")
```

{{% /tab %}}
{{< /tabs >}}

Después de añadir la dependencia, utiliza la clase `Span` de OpenTelemetry para acceder a los ID actuales de trace (traza) y span (tramo) y añadirlos a tu contexto de logging.

Por ejemplo:

```java
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.SpanContext;
import org.slf4j.MDC;

// ...

SpanContext spanContext = Span.current().getSpanContext();
if (spanContext.isValid()) {
   try {
        MDC.put("dd.trace_id", spanContext.getTraceId());
        MDC.put("dd.span_id", spanContext.getSpanId());
        // Log something
    } finally {
        MDC.remove("dd.trace_id");
        MDC.remove("dd.span_id");
    }
}
```

**Nota**: Si no hay ningún span (tramo) activo, `spanContext.isValid()` devuelve `false` y no se añade ningún ID a los logs.

### API de Datadog

Para correlacionar manualmente logs y traces (trazas) con la API de Datadog, añade la dependencia `dd-trace-api` a tu project (proyecto).

{{< tabs >}}
{{% tab "Maven" %}}

```xml
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-trace-api</artifactId>
    <version>LATEST_VERSION</version>
</dependency>
```

{{% /tab %}}
{{% tab "Gradle" %}}

```groovy
implementation 'com.datadoghq:dd-trace-api:LATEST_VERSION'
```
{{% /tab %}}
{{% tab "Gradle (Kotlin DSL)" %}}

```kotlin
implementation("com.datadoghq:dd-trace-api:LATEST_VERSION")
```

{{% /tab %}}
{{< /tabs >}}

Sustituye `LATEST_VERSION` por la misma versión que tu rastreador de Java de Datadog (`dd-java-agent`).

Después de añadir la dependencia, utiliza `CorrelationIdentifier.getTraceId()` y `CorrelationIdentifier.getSpanId()` para recuperar e insertar los ID en tu contexto de logging, como se muestra en los siguientes ejemplos.

<div class="alert alert-info">Si no hay ningún span (tramo) activo, <code>CorrelationIdentifier.getTraceId()</code> y <code>getSpanId()</code> devuelven <code>"0"</code>. Asegúrate de que los spans (tramos) se inicien antes de ejecutar este código.</div>

{{< tabs >}}
{{% tab "Log4j 2" %}}

```java
import org.apache.logging.log4j.ThreadContext;
import datadog.trace.api.CorrelationIdentifier;

// There must be spans started and active before this block.
try {
    ThreadContext.put("dd.trace_id", CorrelationIdentifier.getTraceId());
    ThreadContext.put("dd.span_id", CorrelationIdentifier.getSpanId());

// Log something

} finally {
    ThreadContext.remove("dd.trace_id");
    ThreadContext.remove("dd.span_id");
}
```
{{% /tab %}}
{{% tab "SLF4J y Logback" %}}

```java
import org.slf4j.MDC;
import datadog.trace.api.CorrelationIdentifier;

// There must be spans started and active before this block.
try {
    MDC.put("dd.trace_id", CorrelationIdentifier.getTraceId());
    MDC.put("dd.span_id", CorrelationIdentifier.getSpanId());

// Log something

} finally {
    MDC.remove("dd.trace_id");
    MDC.remove("dd.span_id");
}
```
{{% /tab %}}
{{% tab "Tinylog" %}}

```java
import org.tinylog.ThreadContext;
import datadog.trace.api.CorrelationIdentifier;

// There must be spans started and active before this block.
try {
    ThreadContext.put("dd.trace_id", CorrelationIdentifier.getTraceId());
    ThreadContext.put("dd.span_id", CorrelationIdentifier.getSpanId());

// Log something

} finally {
    ThreadContext.remove("dd.trace_id");
    ThreadContext.remove("dd.span_id");
}
```
{{% /tab %}}
{{< /tabs >}}

**Nota:** Si no utilizas [la integración de log de Datadog][4] para analizar tus logs, las reglas personalizadas de parseo de log deben asegurar que `dd.trace_id` y `dd.span_id` se analicen como cadenas. Para obtener más información, consulta [Los logs correlacionados no aparecen en el panel de ID de trace (traza)][5].

[Consulta la documentación de la recopilación de log de Java][1] para obtener más detalles sobre el despliegue específico del registrador e instrucciones para el registro en formato JSON.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_collection/java/
[2]: /es/tracing/trace_collection/dd_libraries/java/
[3]: /es/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?
[4]: /es/logs/log_collection/java/#raw-format
[5]: /es/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=custom
[6]: /es/tracing/connect_logs_and_traces/opentelemetry