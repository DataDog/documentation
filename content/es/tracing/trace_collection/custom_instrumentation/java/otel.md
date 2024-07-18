---
aliases:
- /es/tracing/trace_collection/otel_instrumentation/java/
- /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/java
code_lang: otel
code_lang_weight: 2
description: Instrumenta tu aplicación Java con la API de OpenTelemetry, para enviar
  trazas (traces) a Datadog.
further_reading:
- link: tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentación
  text: Interoperabilidad de la API de OpenTelemetry e instrumentación de trazas de
    Datadog
kind: documentación
title: Instrumentación personalizada de Java con la API de OpenTelemetry
type: multi-code-lang
---

{{% otel-custom-instrumentation-lang %}}

## Configuración

<div class="alert alert-info">OpenTelemetry es compatible con Java a partir de la versión 1.24.0.</div>

Para configurar OpenTelemetry para utilizar el proveedor de traza de Datadog:

1. Si aún no has leído las instrucciones de autoinstrumentación y configuración, comienza por las [Instrucciones de configuración de Java][1].

1. Asegúrate de que solo dependes de la API de OpenTelemetry (y no del SDK de OpenTelemetry).

1. Establece la propiedad del sistema `dd.trace.otel.enabled` o la variable de entorno `DD_TRACE_OTEL_ENABLED` en `true`.

## Añadir etiquetas al tramo

### Añadir etiquetas de tramo personalizadas
Añade etiquetas personalizadas a tus tramos correspondientes a cualquier valor dinámico dentro de tu código de aplicación como `customer.id`.

```java
import io.opentelemetry.api.trace.Span;

public void doSomething() {
  Span span = Span.current();
  span.setAttribute("user-name", "Some User");
}
```

### Añadir etiquetas globalmente a todos los tramos

La propiedad `dd.tags` permite establecer etiquetas en todos los tramos generados para una aplicación. Esto puede ser útil para agrupar las estadísticas de las aplicaciones, los centros de datos o cualquier otra etiqueta que desees ver en la interfaz de usuario de Datadog.

```shell
java -javaagent:<DD-JAVA-AGENT-PATH>.jar \
    -Ddd.tags=datacenter:njc,<TAG_KEY>:<TAG_VALUE> \
    -jar <YOUR_APPLICATION_PATH>.jar

```

### Configuración de errores en un tramo raíz desde un tramo secundario

Para establecer un error en un tramo raíz desde un tramo secundario, puedes utilizar el método `setStatus` en el tramo actual de la siguiente manera:

```java
import static io.opentelemetry.api.trace.StatusCode.ERROR;
import io.opentelemetry.api.trace.Span;

public void doSomething() {
  Span span = Span.current();
  span.setStatus(ERROR, "Some error details...");
}
```

### Configuración de etiquetas y errores en un tramo raíz desde un tramo secundario

Este ejemplo muestra cómo configurar etiquetas y errores en un tramo raíz desde un tramo secundario:

```java
import io.opentelemetry.api.OpenTelemetry;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.context.Context;
import io.opentelemetry.context.ContextKey;
import io.opentelemetry.context.Scope;
import io.opentelemetry.exporter.otlp.trace.OtlpGrpcSpanExporter;
import io.opentelemetry.sdk.OpenTelemetrySdk;
import io.opentelemetry.sdk.resources.Resource;
import io.opentelemetry.sdk.trace.SdkTracerProvider;
import io.opentelemetry.sdk.trace.export.BatchSpanProcessor;
import io.opentelemetry.semconv.ResourceAttributes;
import java.util.concurrent.TimeUnit;

public class Example {

  private final static ContextKey<Span> CONTEXT_KEY =
    ContextKey.named("opentelemetry-traces-local-root-span");

  public void begin() {
    tracer = GlobalOpenTelemetry.getTracer("my-scope", "0.1.0");
    Span parentSpan = tracer.spanBuilder("begin").startSpan();
    try (Scope scope = parentSpan.makeCurrent()) {
      createChildSpan();
    } finally {
      parentSpan.end();
    }
  }

  private void createChildSpan() {
    Span childSpan = tracer.spanBuilder("child-span").startSpan();
    try {
      Span rootSpan = Context.current().get(CONTEXT_KEY);
        if (null != rootSpan) {
          rootSpan.setAttribute("my-attribute", "my-attribute-value");
          rootSpan.setStatus(StatusCode.ERROR, "Some error details...");
        } 
    } finally {
      childSpan.end();
    }
  }

}
```

## Añadir tramos

Si no estás usando una [instrumentación de marco compatible][17], o te gustaría conocer más sobre las [trazas][16] de tu aplicación, puede que quieras añadir instrumentación personalizada a tu código para obtener gráficas de llamas completas o para medir los tiempos de ejecución de fragmentos de código.

Si no es posible modificar el código de la aplicación, utiliza la variable de entorno dd.trace.methods para detallar estos métodos.

Si ya dispones de @Trace o anotaciones similares, o prefieres utilizar anotaciones para completar cualquier traza incompleta dentro de Datadog, utiliza anotaciones de traza.

Las trazas también pueden crearse mediante la anotación de OpenTelemetry `@WithSpan`, como se describe en [anotaciones de traza](#trace-annotations).

### Anotaciones de traza

Añade `@WithSpan` a los métodos para que sean rastreados cuando se ejecuta OpenTelemetry y el `dd-java-agent.jar`. Si el Agent no está adjunto, esta anotación no tiene ningún efecto en tu aplicación.
La anotación `@WithSpan` de OpenTelemetry es proporcionada por la dependencia `opentelemetry-instrumentation-annotations`.

```java
import io.opentelemetry.instrumentation.annotations.WithSpan;

public class SessionManager {

  @WithSpan
  public static void saveSession() {
    // tu método de implementación aquí
  }
}
```

### Creación manual de un nuevo tramo

Para crear manualmente nuevos tramos en el contexto de traza actual:

```java
import io.opentelemetry.api.OpenTelemetry;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.context.Scope;
import io.opentelemetry.exporter.otlp.trace.OtlpGrpcSpanExporter;
import io.opentelemetry.sdk.OpenTelemetrySdk;
import io.opentelemetry.sdk.resources.Resource;
import io.opentelemetry.sdk.trace.SdkTracerProvider;
import io.opentelemetry.sdk.trace.export.BatchSpanProcessor;
import io.opentelemetry.semconv.ResourceAttributes;
import java.util.concurrent.TimeUnit;

public class Example {

  public void doSomething() {
    Tracer tracer = GlobalOpenTelemetry.getTracer("my-scope", "0.1.0");
    Span span = tracer.spanBuilder("my-resource").startSpan();
    try (Scope scope = span.makeCurrent()) {
      // haz alguna acción
    } catch (Throwable t) {
      span.recordException(t);
      throw t;
    } finally {
      span.end();
    }
  }

}
```

## Rastrear la configuración del cliente y el Agent

Tanto el cliente de rastreo como el Datadog Agent ofrecen opciones adicionales de configuración para la propagación de contexto. También puedes excluir recursos específicos del envío de trazas a Datadog si no deseas que esas trazas se incluyan en métricas calculadas, como trazas relacionadas con los checks de estado.

### Propagación de contexto con extracción e inyección de encabezados

Puedes configurar la propagación de contexto para trazas distribuidas al inyectar y extraer encabezados. Consulta [Propagación de contexto de traza][18] para obtener información.

### Filtrado de recursos

Las trazas se pueden excluir en función de su nombre de recurso, para eliminar el tráfico Synthetic, como los checks de estado, de la notificación de trazas a Datadog. Esta y otras configuraciones de seguridad y ajuste se pueden encontrar en la página de [Seguridad][19] o en [Ignorar recursos no deseados][20].

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[15]: /es/tracing/setup/java/
[16]: /es/tracing/glossary/#trace
[17]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/?tab=wget#compatibility
[18]: /es/tracing/trace_collection/trace_context_propagation/java/
[19]: /es/tracing/security
[20]: /es/tracing/guide/ignoring_apm_resources/