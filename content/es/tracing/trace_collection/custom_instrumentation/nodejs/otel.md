---
aliases:
- /es/tracing/trace_collection/otel_instrumentation/nodejs/
- /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/nodejs
code_lang: otel
code_lang_weight: 2
description: Instrumenta tu aplicación Node.js con la API de OpenTelemetry, para enviar
  trazas a Datadog.
further_reading:
- link: tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentación
  text: Interoperabilidad de la API de OpenTelemetry e instrumentación de trazas de
    Datadog
title: Instrumentación personalizada de Node.js utilizando la API de OpenTelemetry
type: multi-code-lang
---

{{% otel-custom-instrumentation-lang %}}


## Configuración

Para configurar OpenTelemetry para utilizar el proveedor de traza de Datadog:

1. Añade la instrumentación manual de OpenTelemetry deseada a tu código Node.js siguiendo la [documentación de la Instrumentación manual de OpenTelemetry Node.js][1]. **Nota**: Cuando esas instrucciones indiquen que tu código debe llamar al SDK de OpenTelemetry, llama a la librería de rastreo de Datadog en su lugar.

2. Añadir el módulo `dd-trace` a tu paquete .json:

    ```sh
    npm install dd-trace
    ```

3. Inicializar el módulo `dd-trace` en tu aplicación:

    ```js
    const tracer = require('dd-trace').init({
      // ...
    })
    ```

4. Visitar `TracerProvider` en `tracer`:

    ```js
    const { TracerProvider } = tracer
    ```

5. Crear y registrar un `TracerProvider`:

    ```js
    const provider = new TracerProvider()
    provider.register()
    ```

6. Importar la API de OpenTelemetry y crear una instancia de rastreador OpenTelemetry:

    ```js
    const ot = require('@opentelemetry/api')
    const otelTracer = ot.trace.getTracer(
      'my-service'
    )
    ```

7. Ejecuta tu aplicación.

Datadog combina estos tramos de OpenTelemetry con otros tramos de Datadog APM en una traza única de tu aplicación. También es compatible con [la instrumentación de la integración][2] y [la instrumentación automática de OpenTelemetry][3].

## Añadir etiquetas al tramo

Añade atributos personalizados a tus tramos para proporcionar un contexto adicional:

{{< highlight js "hl_lines=6" >}}
function processData(i, param1, param2) {
  return otelTracer.startActiveSpan(`processData:${i}`, (span) => {
    const result = someOperation(param1, param2);

    // Add an attribute to the span
    span.setAttribute('app.processedData', result.toString());
    span.end();
    return result;
    });
}
{{< /highlight >}}

## Creación de tramos

Para crear un nuevo tramo y cerrarlo correctamente, utiliza el método `startActiveSpan`:

{{< highlight js "hl_lines=3 9" >}}
function performTask(iterations, param1, param2) {
  // Create a span. A span must be closed.
  return otelTracer.startActiveSpan('performTask', (span) => {
    const results = [];
    for (let i = 0; i < iterations; i++) {
      results.push(processData(i, param1, param2));
    }
    // Be sure to end the span!
    span.end();
    return results;
  });
}
{{< /highlight >}}

## Añadir eventos de tramo

<div class="alert alert-info">Para añadir eventos de tramo se requiere la versión 5.17.0/4.41.0 o posterior del SDK.</div>

Puedes añadir eventos de tramos utilizando la API `addEvent`. Este método requiere un parámetro `name` y acepta opcionalmente los parámetros `attributes` y `timestamp`. El método crea un nuevo evento de tramo con las propiedades especificadas y lo asocia al tramo correspondiente.

- **Nombre** [_obligatorio_]: una cadena que representa el nombre del evento.
- **Atributos** [_opcional_]: cero o más pares clave-valor con las siguientes propiedades:
  - La clave debe ser una cadena no vacía.
  - El valor puede ser:
    - Un tipo primitivo: string, Boolean o number.
    - Una matriz homogénea de valores de tipo primitivo (por ejemplo, una matriz de cadenas).
  - Las matrices anidadas y las matrices que contienen elementos de distintos tipos de datos no están permitidas.
- **Marca de tiempo** [_opcional_]: una marca de tiempo UNIX que representa la hora en que se produjo un evento. Se espera un objeto `TimeInput`.

Los siguientes ejemplos muestran distintas formas de añadir eventos a un tramo:

```js
span.addEvent('Event With No Attributes')
span.addEvent('Event With Some Attributes', {"int_val": 1, "string_val": "two", "int_array": [3, 4], "string_array": ["5", "6"], "bool_array": [true, false]})
```

Lee la especificación de [OpenTelemetry][6] para obtener más información.

### Registro de excepciones

Para registrar excepciones, utiliza la API `recordException`. Este método requiere un parámetro `exception` y acepta opcionalmente un parámetro UNIX `timestamp`. Crea un nuevo evento de tramo que incluya atributos de excepción estandarizados y lo asocia al tramo correspondiente.

Los siguientes ejemplos muestran diferentes formas de registrar excepciones:

```js
span.recordException(new TestError())
```

Lee la especificación de [OpenTelemetry][7] para obtener más información.

## Filtrado de solicitudes

En algunos casos, puede que desees excluir instrumentar ciertas solicitudes, como el tráfico de check de estado o tráfico Synthetic. Puedes utilizar las opciones `blocklist` o `allowlist` del complemento `http` para ignorar estas solicitudes.

Para excluir solicitudes a nivel de aplicación, añade lo siguiente después de inicializar el rastreador:

```javascript
// en la parte superior del punto de entrada justo después de tracer.init()
tracer.use('http', {
  blocklist: ['/health', '/ping']
})
```

También puedes dividir la configuración entre el cliente y el servidor si es necesario:

```javascript
tracer.use('http', {
  server: {
    blocklist: ['/ping']
  }
})
```

Además, puedes excluir trazas basándote en su nombre de recurso para evitar que el Agent las envíe a Datadog. Para obtener más información sobre la seguridad y el ajuste de las configuraciones del Agent, consulta las secciones [Seguridad][4] o [Ignorar recursos no deseados][5].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/js/instrumentation/
[2]: /es/tracing/trace_collection/dd_libraries/nodejs#integration-instrumentation
[3]: https://opentelemetry.io/docs/instrumentation/js/automatic/
[4]: /es/tracing/security
[5]: /es/tracing/guide/ignoring_apm_resources/
[6]: https://opentelemetry.io/docs/specs/otel/trace/api/#add-events
[7]: https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception
