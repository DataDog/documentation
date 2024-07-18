---
aliases:
- /es/tracing/opentracing/java
- /es/tracing/manual_instrumentation/java
- /es/tracing/custom_instrumentation/java
- /es/tracing/setup_overview/custom_instrumentation/java
- /es/tracing/trace_collection/custom_instrumentation/java
- /es/tracing/trace_collection/custom_instrumentation/dd_libraries/java
code_lang: dd-api
code_lang_weight: 1
description: Instrumenta tu código con el rastreador de Datadog Java APM.
further_reading:
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: Documentación
  text: Conectar tus logs y trazas
- link: tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
kind: documentación
title: Instrumentación personalizada de Java utilizando la API de Datadog
type: multi-code-lang
---

En esta página, se detallan casos de uso comunes para añadir y personalizar la observabilidad con Datadog APM. Si no has leído las instrucciones de configuración para la instrumentación automática, comienza por las [Instrucciones de configuración de Java][11].

<div class="alert alert-info">El rastreador de Datadog Java se basa en OpenTracing. Aunque OpenTracing está obsoleto en OpenTelemetry, los siguientes ejemplos importan correctamente la biblioteca de <code>opentracing</code>.</div>

## Añadir etiquetas

Añade [etiquetas (tags) de tramo (span)][1] personalizadas a tus [tramos][2] para personalizar tu capacidad de observación dentro de Datadog. Las etiquetas de tramo se aplican a tus trazas entrantes, lo que te permite correlacionar el comportamiento observado con información a nivel de código, como el nivel de comerciante, el importe del pago o el ID de usuario.

### Añadir etiquetas de tramo personalizadas

Añade etiquetas personalizadas a tus tramos correspondientes a cualquier valor dinámico dentro de tu código de aplicación como `customer.id`.

```java
import org.apache.cxf.transport.servlet.AbstractHTTPServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

@WebServlet
class ShoppingCartServlet extends AbstractHttpServlet {
    @Override
    void doGet(HttpServletRequest req, HttpServletResponse resp) {
        // Obtener tramo activo
        final Span span = GlobalTracer.get().activeSpan();
        if (span != null) {
          // id_cliente -> 254889
          // nivel_cliente -> platinum
          // valor_carrito -> 867
          span.setTag("customer.id", customer_id);
          span.setTag("customer.tier", customer_tier);
          span.setTag("cart.value", cart_value);
        }
        // [...]
    }
}
```

### Añadir etiquetas globalmente a todos los tramos

La propiedad `dd.tags` permite establecer etiquetas en todos los tramos generados para una aplicación. Esto puede ser útil para agrupar las estadísticas de las aplicaciones, los centros de datos o cualquier otra etiqueta que desees ver en la interfaz de usuario de Datadog.

```text
java -javaagent:<DD-JAVA-AGENT-PATH>.jar \
     -Ddd.tags=datacenter:njc,<TAG_KEY>:<TAG_VALUE> \
     -jar <YOUR_APPLICATION_PATH>.jar
```

### Configuración de errores en un tramo

Para personalizar un error asociado a uno de tus tramos, establece la etiqueta de error en el tramo y utiliza `Span.log()` para establecer un "evento de error". El evento de error es un `Map<String,Object>` que contiene una entrada `Fields.ERROR_OBJECT->Throwable`, una `Fields.MESSAGE->String`, o ambas.

```java
import io.opentracing.Span;
import io.opentracing.tag.Tags;
import io.opentracing.util.GlobalTracer;
import io.opentracing.log.Fields;
...
    // Obtener un tramo activo si no está disponible en el método actual
    final Span span = GlobalTracer.get().activeSpan();
    if (span != null) {
      span.setTag(Tags.ERROR, true);
      span.log(Collections.singletonMap(Fields.ERROR_OBJECT, ex));
    }
```

**Nota**: `Span.log()` es un mecanismo genérico de OpenTracing para asociar eventos a la marca temporal actual. El rastreador de Java solo admite el registro de eventos de error.
Alternativamente, puedes establecer las etiquetas de error directamente en el tramo sin `log()`:

```java
import io.opentracing.Span;
import io.opentracing.tag.Tags;
import io.opentracing.util.GlobalTracer;
import datadog.trace.api.DDTags;
import java.io.PrintWriter;
import java.io.StringWriter;

...
    final Span span = GlobalTracer.get().activeSpan();
    if (span != null) {
      span.setTag(Tags.ERROR, true);
      span.setTag(DDTags.ERROR_MSG, ex.getMessage());
      span.setTag(DDTags.ERROR_TYPE, ex.getClass().getName());

      final StringWriter errorString = new StringWriter();
      ex.printStackTrace(new PrintWriter(errorString));
      span.setTag(DDTags.ERROR_STACK, errorString.toString());
    }
```

**Nota**: Puedes añadir cualquier metadato de error relevante listado en los [documentos de vista de traza][3]. Si el tramo actual no es el tramo raíz, márcalo como error usando la biblioteca `dd-trace-api` para tomar el tramo raíz con `MutableSpan`, luego usa `setError(true)`. Consulta la sección [configuración de etiquetas y errores en un tramo raíz][4] para obtener más detalles.

### Configuración de etiquetas y errores en un tramo raíz desde un tramo secundario

Cuando un evento o condición ocurre en el tráfico descendente, puede que quieras que ese comportamiento o valor se refleje como una etiqueta en el nivel superior o el tramo raíz tramo. Esto puede ser útil para contar un error o para medir el rendimiento, o establecer una etiqueta dinámica para la observabilidad.

```java
import java.util.Collections;
import io.opentracing.Span;
import io.opentracing.Scope;
import datadog.trace.api.interceptor.MutableSpan;
import io.opentracing.log.Fields;
import io.opentracing.util.GlobalTracer;
import io.opentracing.util.Tracer;

Tracer tracer = GlobalTracer.get();
final Span span = tracer.buildSpan("<OPERATION_NAME>").start();
// Nota: El contexto en la acción try con el bloque de recurso a continuación
// se cerrará automáticamente al final del bloque de código.
// Si no usas una acción try con una sentencia de recurso, necesitas
// para llamar a scope.close().
try (final Scope scope = tracer.activateSpan(span)) {
    // aparece la excepción aquí
} catch (final Exception e) {
    // Establece una etiqueta de error en el tramo como siempre
    span.log(Collections.singletonMap(Fields.ERROR_OBJECT, e));

    // Establece un error en un tramo raíz
    if (span instanceof MutableSpan) {
        MutableSpan localRootSpan = ((MutableSpan) span).getLocalRootSpan();
        localRootSpan.setError(true);
        localRootSpan.setTag("some.other.tag", "value");
    }
} finally {
    // Cierra el tramo en un bloque final
    span.finish();
}
```

Si no estás creando manualmente un tramo, aún puedes acceder al tramo raíz a través de `GlobalTracer`:

```java
import io.opentracing.Span;
import io.opentracing.util.GlobalTracer;
import datadog.trace.api.interceptor.MutableSpan;

...

final Span span = GlobalTracer.get().activeSpan();
if (span != null && (span instanceof MutableSpan)) {
    MutableSpan localRootSpan = ((MutableSpan) span).getLocalRootSpan();
    // haz acciones con el tramo raíz
}
```

**Nota**: Aunque `MutableSpan` y `Span` comparten muchos métodos similares, son tipos distintos. `MutableSpan` es específico de Datadog y no forma parte de la API de OpenTracing.

<br>

## Añadir tramos

Si no estás usando una [instrumentación de marco compatible][5], o te gustaría conocer más sobre las [trazas][3] de tu aplicación, puede que quieras añadir instrumentación personalizada a tu código para obtener gráficas de llamas completas o para medir los tiempos de ejecución de fragmentos de código.

Si no es posible modificar el código de la aplicación, utiliza la variable de entorno `dd.trace.methods` para detallar estos métodos.

Si ya dispones de `@Trace` o anotaciones similares, o prefieres utilizar anotaciones para completar cualquier traza incompleta dentro de Datadog, utiliza anotaciones de traza.


### Métodos de traza de Datadog

Con la propiedad del sistema `dd.trace.methods`, puedes obtener visibilidad de los marcos no compatibles sin cambiar el código de la aplicación.

```text
java -javaagent:/path/to/dd-java-agent.jar -Ddd.env=prod -Ddd.service.name=db-app -Ddd.trace.methods=store.db.SessionManager[saveSession] -jar path/to/application.jar
```

Para rastrear varias funciones dentro de la misma clase, utiliza la siguiente sintaxis:

```text
java -javaagent:/path/to/dd-java-agent.jar -Ddd.env=prod -Ddd.service.name=db-app -Ddd.trace.methods=store.db.SessionManager[saveSession,loadSession] -jar path/to/application.jar
```

La única diferencia entre este enfoque y el uso de anotaciones `@Trace` son las opciones de personalización de los nombres de las operaciones y los recursos. Con los métodos DD Trace, `operationName` es `trace.annotation` y `resourceName` es `SessionManager.saveSession`.

### Anotaciones de traza

Añade `@Trace` a los métodos para que se rastreen cuando se ejecuten con `dd-java-agent.jar`. Si no se adjunta el Agent, esta anotación no tiene ningún efecto en tu aplicación.

La anotación de traza de Datadog es proporcionada por la [dependencia dd-trace-api][6].

Los argumentos disponibles para la anotación `@Trace` son:

- `operationName`: establece el nombre de la operación para la traza (por defecto: el nombre del método).
- `resourceName`: establece el nombre del recurso para la traza (por defecto: el mismo valor que `operationName`).
- `noParent`: establécelo en `true` para iniciar siempre una nueva traza en ese método. Compatible desde v1.22.0+ de `dd-trace-java` (por defecto: `false`).

```java
import datadog.trace.api.Trace;

public class SessionManager {

    @Trace(operationName = "database.persist", resourceName = "SessionManager.saveSession")
    public static void saveSession() {
        // tu método de despliegue aquí
    }
}
```
**Nota**: A través de la propiedad del sistema `dd.trace.annotations`, otras anotaciones de métodos de rastreo pueden ser reconocidas por Datadog como `@Trace`. Puedes encontrar una lista en [TraceAnnotationsInstrumentation.java][7] si has añadido elementos previamente a tu código.

### Creación manual de un nuevo tramo

Además de la instrumentación automática, la anotación `@Trace` y configuraciones `dd.trace.methods`, puedes personalizar la observabilidad al crear tramos en cualquier bloque de código mediante programación. Los tramos creados de esta manera se integran automáticamente con otros mecanismos de rastreo. En otras palabras, si una traza ya se ha iniciado, el tramo manual tendrá a su llamador como tramo principal. Del mismo modo, cualquier método rastreado llamado desde el bloque de código envuelto tendrá al tramo manual como tramo principal.

```java
import datadog.trace.api.DDTags;
import io.opentracing.Scope;
import io.opentracing.Span;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

class SomeClass {
    void someMethod() {
        Tracer tracer = GlobalTracer.get();

        // Las etiquetas de servicio y nombre de recurso son obligatorias.
        // Puedes establecerlas al crear el tramo:
        Span span = tracer.buildSpan("<OPERATION_NAME>")
            .withTag(DDTags.SERVICE_NAME, "<SERVICE_NAME>")
            .withTag(DDTags.RESOURCE_NAME, "<RESOURCE_NAME>")
            .start();
        // Nota: El contexto de la acción try con el bloque de recurso a continuación
        // se cerrará automáticamente al final del bloque de código.
        // Si no usas una acción try con una sentencia de recurso, debes
        // llamar a scope.close().
        try (Scope scope = tracer.activateSpan(span)) {
            // Alternativamente, establece etiquetas después de la creación
            span.setTag("my.tag", "value");

            // El código que estás rastreando

        } catch (Exception e) {
            // Establece error en el tramo
        } finally {
            // Cierra el tramo en un bloque final
            span.finish();
        }
    }
}
```

### Extender los rastreadores

Las bibliotecas de rastreo están diseñadas para ser extensibles. Los clientes pueden escribir un posprocesador personalizado llamado `TraceInterceptor` para interceptar tramos y luego ajustarlos, o descartarlos en consecuencia (por ejemplo, basándose en expresiones regulares). El siguiente ejemplo implementa dos interceptores para lograr una lógica compleja de posprocesamiento.

```java
import java.util.List;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import datadog.trace.api.interceptor.TraceInterceptor;
import datadog.trace.api.interceptor.MutableSpan;

class FilteringInterceptor implements TraceInterceptor {
    @Override
    public Collection<? extends MutableSpan> onTraceComplete(
            Collection<? extends MutableSpan> trace) {

        List<MutableSpan> filteredTrace = new ArrayList<>();
        for (final MutableSpan span : trace) {
          String orderId = (String) span.getTags().get("order.id");

          // Descarta tramos cuando el Id. de orden inicie con "TEST-"
          if (orderId == null || !orderId.startsWith("TEST-")) {
            filteredTrace.add(span);
          }
        }

        return filteredTrace;
    }

    @Override
    public int priority() {
        // algún número único alto para que el interceptor sea último
        return 100;
    }
}

class PricingInterceptor implements TraceInterceptor {
    @Override
    public Collection<? extends MutableSpan> onTraceComplete(
            Collection<? extends MutableSpan> trace) {

        for (final MutableSpan span : trace) {
          Map<String, Object> tags = span.getTags();
          Double originalPrice = (Double) tags.get("order.price");
          Double discount = (Double) tags.get("order.discount");

          // Establece una etiqueta de un cálculo de otras etiquetas
          if (originalPrice != null && discount != null) {
            span.setTag("order.value", originalPrice - discount);
          }
        }

        return trace;
    }

    @Override
    public int priority() {
        return 20; // some unique number
    }
}
```

Cerca del inicio de tu aplicación, registra los interceptores con lo siguiente:
```java
datadog.trace.api.GlobalTracer.get().addTraceInterceptor(new FilteringInterceptor());
datadog.trace.api.GlobalTracer.get().addTraceInterceptor(new PricingInterceptor());
```

<br>

## Rastrear la configuración del cliente y el Agent

Existen configuraciones adicionales posibles tanto para el cliente de rastreo como para el Datadog Agent para la propagación del contexto, así como para excluir recursos específicos del envío de trazas a Datadog en el caso que no desees que estas trazas cuenten en métricas calculadas, como checks de estado.

### Propagación de contexto con extracción e inyección de encabezados

Puedes configurar la propagación de contexto para trazas distribuidas al inyectar y extraer encabezados. Consulta [Propagación de contexto de traza][8] para obtener información.

### Filtrado de recursos

Las trazas se pueden excluir en función de su nombre de recurso, para eliminar el tráfico Synthetic, como los checks de estado, de la notificación de trazas a Datadog. Esta y otras configuraciones de seguridad y ajuste se pueden encontrar en la página de [Seguridad][9] o en [Ignorar recursos no deseados][10].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/glossary/#span-tags
[2]: /es/tracing/glossary/#spans
[3]: /es/tracing/glossary/#trace
[4]: /es/tracing/custom_instrumentation/java/#set-tags-errors-on-a-root-span-from-a-child-span
[5]: /es/tracing/setup/java/#compatibility
[6]: https://mvnrepository.com/artifact/com.datadoghq/dd-trace-api
[7]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
[8]: /es/tracing/trace_collection/trace_context_propagation/java/
[9]: /es/tracing/security
[10]: /es/tracing/guide/ignoring_apm_resources/
[11]: /es/tracing/setup/java/