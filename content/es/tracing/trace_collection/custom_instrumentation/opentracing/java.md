---
aliases:
- /es/tracing/setup_overview/open_standards/java
- /es/tracing/trace_collection/open_standards/java
- /es/tracing/trace_collection/opentracing/java/
code_lang: java
code_lang_weight: 0
description: ' Instrumentación de OpenTracing para Java'
kind: documentación
title: Instrumentación de Java OpenTracing
type: multi-code-lang
---

<div class="alert alert-info">OpenTracing se basa en una especificación obsoleta. Si deseas instrumentar tu código con una especificación abierta, utiliza OpenTelemetry en su lugar. Prueba el soporte de fase beta para <a href="/tracing/trace_collection/otel_instrumentation/java/">procesar datos de la instrumentación de OpenTelemetry en bibliotecas de rastreo de Datadog</a>.</div>

Datadog se integra con la [API de OpenTracing][1].

## Configuración

Para Maven, añade esto a `pom.xml`:
```xml
<!-- API de OpenTracing -->
<dependency>
    <groupId>io.opentracing</groupId>
    <artifactId>opentracing-api</artifactId>
    <version>0.32.0</version>
</dependency>

<dependency>
    <groupId>io.opentracing</groupId>
    <artifactId>opentracing-util</artifactId>
    <version>0.32.0</version>
</dependency>

<!-- API de Datadog -->
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-trace-api</artifactId>
    <version>${dd-trace-java.version}</version>
</dependency>

<!-- puente de Datadog y OpenTracing (solo es necesario si no usas dd-java-agent para la autoinstrumentación) -->
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-trace-ot</artifactId>
    <version>${dd-trace-java.version}</version>
</dependency>
```

Para Gradle, añade:

```text
compile group: 'io.opentracing', name: 'opentracing-api', version: "0.32.0"
compile group: 'io.opentracing', name: 'opentracing-util', version: "0.32.0"
compile group: 'com.datadoghq', name: 'dd-trace-api', version: "${dd-trace-java.version}"
// puente de Datadog y OpenTracing (solo es necesario si no usas dd-java-agent para la autoinstrumentación)
compile group: 'com.datadoghq', name: 'dd-trace-ot', version: "${dd-trace-java.version}"
```

Configura tu aplicación con variables de entorno o propiedades del sistema, como se explica en la sección de configuración.

Si no estás utilizando la autoinstrumentación, debes registrar un rastreador configurado con `GlobalTracer`. Para ello, llama a `GlobalTracer.register(DDTracer.builder().build())` al principio del inicio de tu aplicación (por ejemplo, en el método principal).

```java
import datadog.opentracing.DDTracer;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

public class Application {
    public static void main(String[] args) {
        DDTracer tracer = DDTracer.builder().build();
        GlobalTracer.register(tracer);
        // registra el mismo rastreador con la API de Datadog
        datadog.trace.api.GlobalTracer.registerIfAbsent(tracer);
    }
}
```

Aparte de las variables de entorno y las propiedades del sistema, existen opciones adicionales de configuración como parte de la interfaz `DDTracer.Builder`. Consulta el [Javadoc][2] para obtener una lista completa.

**Nota:** Nunca añadas `dd-java-agent` a tu classpath (ruta de clase). Hacerlo puede causar un comportamiento inesperado. 

## Trazas asíncronas

Una traza asíncrona sucede cuando un tramo se inicia en un subproceso y finaliza en otro. Para instrumentar este comportamiento, debes utilizar un nuevo contexto en cada subproceso en el que el tramo esté activo.
```java
// Paso 1: Iniciar el contexto/tramo en el subproceso de envío del trabajo
final Tracer tracer = GlobalTracer.get();
final Span span = tracer.buildSpan("ServicehandlerSpan").start();

try (final Scope scope = tracer.activateSpan(span)) {
    // implementación del subproceso de envío...

    submitAsyncTask(new Runnable() {
        @Override
        public void run() {
            // Paso 2: Reactivar el tramo en el subproceso de trabajo
            try (final Scope scope = tracer.activateSpan(span)) {
              // implementación del subproceso de trabajo
            } finally {
              // Paso 3: Finalizar el tramo cuando se completa el trabajo
              span.finish();
            }
       }
    });
}
```

## Inyectar y extraer contexto para el rastreo distribuido

Crea una traza distribuida utilizando la instrumentación manual con OpenTracing:

```java
// Paso 1: Inyectar los encabezados de Datadog en el código del cliente
Span span = tracer.buildSpan("httpClientSpan").start();
try (Scope scope = tracer.activate(span)) {
    HttpRequest request = /* tu código aquí */;

    tracer.inject(span.context(),
                  Format.Builtin.HTTP_HEADERS,
                  new MyHttpHeadersInjectAdapter(request));

    // implementación de la solicitud http...
} finally {
    span.finish();
}

public static class MyHttpHeadersInjectAdapter implements TextMap {
    private final HttpRequest httpRequest;

    public HttpHeadersInjectAdapter(final HttpRequest httpRequest) {
        this.httpRequest = httpRequest;
    }

    @Override
    public void put(final String key, final String value) {
        httpRequest.addHeader(key, value);
    }

    @Override
    public Iterator<Map.Entry<String, String>> iterator() {
        throw new UnsupportedOperationException("This class should be used only with tracer#inject()");
    }
}

// Paso 2: Extraer los encabezados de Datadog en el código del servidor
HttpRequest request = /* tu código aquí */;

final SpanContext extractedContext =
  GlobalTracer.get().extract(Format.Builtin.HTTP_HEADERS,
                             new MyHttpRequestExtractAdapter(request));

// es un tramo secundario del tramo de cliente http del Paso 1
Span span = tracer.buildSpan("httpServerSpan").asChildOf(extractedContext).start();
try (Scope scope = tracer.activateSpan(span)) {
    // implementación del servidor http...
} finally {
    span.finish();
}

public class MyHttpRequestExtractAdapter implements TextMap {
    private final HttpRequest request;

    public HttpRequestExtractAdapter(final HttpRequest request) {
        this.request = request;
    }

    @Override
    public Iterator<Map.Entry<String, String>> iterator() {
        return request.headers().iterator();
    }

    @Override
    public void put(final String key, final String value) {
        throw new UnsupportedOperationException("This class should be used only with Tracer.extract()!");
    }
}
```

Observa que los ejemplos anteriores solo utilizan las clases de OpenTracing. Consulta la [API de OpenTracing][1] para más detalles e información.


[1]: https://github.com/opentracing/opentracing-java
[2]: https://github.com/DataDog/dd-trace-java/blob/master/dd-trace-ot/src/main/java/datadog/opentracing/DDTracer.java