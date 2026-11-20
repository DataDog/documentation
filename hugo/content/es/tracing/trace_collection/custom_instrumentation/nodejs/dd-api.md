---
aliases:
- /es/tracing/opentracing/nodejs
- /es/tracing/manual_instrumentation/nodejs
- /es/tracing/custom_instrumentation/nodejs
- /es/tracing/setup_overview/custom_instrumentation/nodejs
- /es/tracing/trace_collection/custom_instrumentation/nodejs
- /es/tracing/trace_collection/custom_instrumentation/dd_libraries/nodejs
code_lang: dd-api
code_lang_weight: 1
description: Instrumenta manualmente tu aplicación Node.js para enviar trazas (traces)
  personalizadas a Datadog.
further_reading:
- link: /tracing/trace_collection/trace_context_propagation/
  tag: Documentación
  text: Propagación del contexto de traza
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: Documentación
  text: Conectar tus logs y trazas
- link: tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
title: Instrumentación personalizada de Node.js con la API Datadog
type: multi-code-lang
---

<div class="alert alert-info">
Si aún no has leído las instrucciones de autoinstrumentación y configuración, empieza por las <a href="/tracing/setup/nodejs/">Instrucciones de configuración de Node.js</a>.
</div>

Si no utilizas la instrumentación de biblioteca compatible (consulta [Compatibilidad de bibliotecas][1]), puede que desees instrumentar manualmente tu código.

También es posible que desees ampliar la funcionalidad de la biblioteca `dd-trace` u obtener un control más preciso sobre la instrumentación de tu aplicación. La biblioteca proporciona varias técnicas para conseguirlo.

## Añadir etiquetas (tags)

La instrumentación incorporada y tu propia instrumentación personalizada crean
tramos (span) alrededor de operaciones significativas.

{{< tabs >}}
{{% tab "Locally" %}}

Puedes acceder al tramo activo para incluir datos significativos al añadir etiquetas.

```javascript
const span = tracer.scope().active()
```

Para más información, lee [Detalles de la API de `Scope`][1].

Puedes añadir etiquetas a un tramo mediante el método `setTag` o `addTags` en un tramo. Los tipos de valor admitidos son cadena, número y objeto.

```javascript
// add a foo:bar tag
span.setTag('foo', 'bar')

// add a user_id:5 tag
span.setTag('user_id', 5)

// add a obj.first:foo and obj.second:bar tags
span.setTag('obj', { first: 'foo', second: 'bar' })

// add a foo:bar and baz:qux tags
span.addTags({
  foo: 'bar',
  baz: 'qux'
})
```


[1]: https://datadoghq.dev/dd-trace-js/interfaces/export_.Scope.html
{{% /tab %}}

{{% tab "Globally" %}}

Puedes añadir etiquetas a cada tramo configurándolos directamente en el rastreador, ya sea con la variable de entorno `DD_TAGS` separada por comas o con la opción `tags` en la inicialización del rastreador:

```javascript
// equivalent to DD_TAGS=foo:bar,baz:qux
tracer.init({
  tags: {
    foo: 'bar',
    baz: 'qux'
  }
})

// All spans will now have these tags
```

{{% /tab %}}

{{% tab "Component" %}}

Algunas integraciones de Datadog admiten hooks de tramo que pueden utilizarse para actualizar el tramo justo antes de que termine. Esto es útil para modificar o añadir etiquetas a un tramo que de otro modo es inaccesible desde tu código.

```javascript
// at the top of the entry point right after tracer.init()
tracer.use('express', {
  // hook will be executed right before the request span is finished
  hooks: {
    request: (span, req, res) => {
      span.setTag('customer.id', req.query.customer_id)
    }
  }
})
```

Para obtener más información, lee [Detalles de la API para complementos individuales][1].


[1]: https://datadoghq.dev/dd-trace-js/modules/export_.plugins.html
{{% /tab %}}

{{% tab "Errors" %}}

Los errores pueden añadirse a un tramo con la etiqueta especial `error` que admite objetos de error. Esta acción divide el error en tres etiquetas: `error.type`, `error.message` y `error.stack`.

```javascript
try {
  getIngredients()
} catch (e) {
  span.setTag('error', e)
}

```

Cuando se utiliza `tracer.trace()` o `tracer.wrap()` esto se hace automáticamente cuando se lanza un error.

{{% /tab %}}
{{< /tabs >}}

## Creación de tramos

La biblioteca `dd-trace` crea [tramos][2] automáticamente con `tracer.init()` para [muchas bibliotecas y marcos][1]. Sin embargo, es posible que desees obtener visibilidad de tu propio código y esto se logra utilizando tramos.

Dentro de tu solicitud web (por ejemplo, `/make-sandwich`), puedes realizar varias operaciones, como `getIngredients()` y `assembleSandwich()`, que son útiles para hacer mediciones.

{{< tabs >}}
{{% tab "Synchronous" %}}

El código síncrono puede ser rastreado con `tracer.trace()`, que automáticamente termina el tramo cuando su devolución de llamada retorna y captura cualquier error lanzado automáticamente.

```javascript
app.get('/make-sandwich', (req, res) => {
  const sandwich = tracer.trace('sandwich.make', { resource: 'resource_name' }, () => {
    const ingredients = tracer.trace('get_ingredients', { resource: 'resource_name' }, () => {
      return getIngredients()
    })

    return tracer.trace('assemble_sandwich', { resource: 'resource_name' }, () => {
      assembleSandwich(ingredients)
    })
  })

  res.end(sandwich)
})
```

Para más información, lee [Detalles de la API de `tracer.trace()`][1].


[1]: https://datadoghq.dev/dd-trace-js/interfaces/export_.Tracer.html#trace
{{% /tab %}}

{{% tab "Promises" %}}

Las promesas pueden rastrearse con `tracer.trace()`, que finaliza automáticamente el tramo cuando se resuelve la promesa devuelta y captura automáticamente cualquier error de rechazo.

```javascript
const getIngredients = () => {
    return new Promise((resolve, reject) => {
        resolve('Salami');
    });
};

app.get('/make-sandwich', (req, res) => {
  return tracer.trace('sandwich.make', { resource: 'resource_name' }, () => {
    return tracer.trace('get_ingredients', { resource: 'resource_name' }, () => getIngredients())
      .then((ingredients) => {
        return tracer.trace('assemble_sandwich', { resource: 'resource_name' }, () => {
          return assembleSandwich(ingredients)
        })
      })
  }).then(sandwich => res.end(sandwich))
})
```

Para más información, lee [Detalles de la API de `tracer.trace()`][1].


[1]: https://datadoghq.dev/dd-trace-js/interfaces/export_.Tracer.html#trace
{{% /tab %}}

{{% tab "Async/await" %}}

Async/await puede ser rastreado con `tracer.trace()` que automáticamente termina el tramo cuando la promesa devuelta se resuelve y captura cualquier error de rechazo automáticamente.

```javascript
app.get('/make-sandwich', async (req, res) => {
  const sandwich = await tracer.trace('sandwich.make', { resource: 'resource_name' }, async () => {
    const ingredients = await tracer.trace('get_ingredients', { resource: 'resource_name' }, () => {
      return getIngredients()
    })

    return tracer.trace('assemble_sandwich', { resource: 'resource_name' }, () => {
      return assembleSandwich(ingredients)
    })
  })

  res.end(sandwich)
})
```

Para más información, lea [Detalles de la API de `tracer.trace()`][1].


[1]: https://datadoghq.dev/dd-trace-js/interfaces/export_.Tracer.html#trace
{{% /tab %}}

{{% tab "Wrapper" %}}

Puedes envolver un función existente sin cambiar su código. Esto es útil para rastrear funciones para las que no controlas el código. Esto se puede hacer con `tracer.wrap()` que toma los mismos argumentos que `tracer.trace()`, excepto su último argumento, que es la función para envolver en lugar de hacer una devolución de llamada.

```javascript

// After the functions are defined
getIngredients = tracer.wrap('get_ingredients', { resource: 'resource_name' }, getIngredients)
assembleSandwich = tracer.wrap('assemble_sandwich', { resource: 'resource_name' }, assembleSandwich)

// Where routes are defined
app.get('/make-sandwich', (req, res) => {

  const sandwich = tracer.trace('sandwich.make', { resource: 'resource_name' }, () => {
    const ingredients = getIngredients()

    return assembleSandwich(ingredients)
  })

  res.end(sandwich)
})
```

Para más información, lee [Detalles de la API de `tracer.trace()`][1].


[1]: https://datadoghq.dev/dd-trace-js/interfaces/export_.Tracer.html#wrap
{{% /tab %}}
{{< /tabs >}}

## Filtrado de solicitudes

Puede que no quieras instrumentar algunas solicitudes de una aplicación. Un caso común sería el check de estado u otro tráfico Synthetic. Estas pueden ignorarse usando la opción `blocklist` o `allowlist` en el complemento `http`.

```javascript
// at the top of the entry point right after tracer.init()
tracer.use('http', {
  blocklist: ['/health', '/ping']
})
```

Esta configuración puede dividirse entre el cliente y el servidor si es necesario. Por ejemplo:

```javascript
tracer.use('http', {
  server: {
    blocklist: ['/ping']
  }
})
```

Además, se pueden excluir trazas en función de su nombre de recurso, para que el Agent no los envíe a Datadog. Ésta y otras configuraciones de seguridad y ajuste del Agent se pueden encontrar en la página [Seguridad][3] o en [Ignorar recursos no deseados][4].

## dd-trace-api

{{< callout btn_hidden="true" header="ddtrace-api está en vista previa">}}
El paquete <code>dd-trace-api</code> está en vista previa y puede que no incluya todas las llamadas a la API que necesitas. Si buscas una funcionalidad más completa, utiliza la API como se describe en las secciones anteriores.
<br><br>Los siguientes pasos solo son necesarios si quieres probar el paquete <code>dd-trace-api</code> en vista previa.{{< /callout >}}

El [paquete dd-trace-api][5] proporciona una API pública estable para la instrumentación personalizada de Node.js de Datadog APM. Este paquete solo implementa la interfaz API, y no la funcionalidad subyacente que crea y envía tramos a Datadog.

Esta separación entre interfaz (`dd-trace-api`) e implementación (`dd-trace`) ofrece varias ventajas:

- Puedes confiar en una API que cambia con menos frecuencia y de forma más predecible para tu instrumentación personalizada
- Si solo utilizas la instrumentación automática, puedes ignorar por completo los cambios en la API
- Si implementas la instrumentación tanto de un solo paso como personalizada evitarás depender de varias copias del paquete `dd-trace`

Para utilizar `dd-trace-api`:

1. Instala las bibliotecas `dd-trace` y `dd-trace-api` en tu aplicación. **Nota**: `dd-trace` está instalado para la instrumentación de un solo paso, pero necesitas instalar `dd-trace-api` manualmente en tu aplicación.
   ```shell
   npm install dd-trace dd-trace-api
   ```

2. Instrumenta tu aplicación Node.js utilizando `dd-trace`. Si estás utilizando la instrumentación de un solo paso, puedes saltarte esta etapa.
   ```shell
    node --require dd-trace/init app.js
   ```

3. Una vez configurado esto, puedes escribir la instrumentación personalizada exactamente igual que en los ejemplos de las secciones anteriores, pero necesitas `dd-trace-api` en lugar de `dd-trace`.

   Por ejemplo:
```javascript
const tracer = require('dd-trace-api')
const express = require('express')
const app = express()

app.get('/make-sandwich', (req, res) => {
  const sandwich = tracer.trace('sandwich.make', { resource: 'resource_name' }, () => {
    const ingredients = tracer.trace('get_ingredients', { resource: 'resource_name' }, () => {
      return getIngredients()
    })

    return tracer.trace('assemble_sandwich', { resource: 'resource_name' }, () => {
      assembleSandwich(ingredients)
    })
  })

  res.end(sandwich)
})
```

Consulta la [definición de la API][6] de ese paquete para ver la lista completa de llamadas a la API compatibles.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/compatibility_requirements/nodejs/
[2]: /es/tracing/glossary/#spans
[3]: /es/tracing/security
[4]: /es/tracing/guide/ignoring_apm_resources/
[5]: https://npm.im/dd-trace-api
[6]: https://github.com/DataDog/dd-trace-api-js/blob/master/index.d.ts