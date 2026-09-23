---
aliases:
- /es/error_tracking/standalone_frontend/collecting_browser_errors
- /es/real_user_monitoring/browser/collecting_browser_errors/
description: Aprenda a recopilar y rastrear errores de frontend de múltiples fuentes
  utilizando el SDK de navegador RUM, incluyendo la recopilación manual de errores
  y los límites de error de React.
further_reading:
- link: /error_tracking/explorer/
  tag: Documentación
  text: Explore sus errores dentro de Datadog
- link: /error_tracking/monitors/
  tag: Documentación
  text: Alerta de forma proactiva sobre problemas impactantes
- link: /real_user_monitoring
  tag: Documentación
  text: Mida el rendimiento y el impacto en el usuario
title: Recopilación de errores del navegador
---
## Descripción general {#overview}

El SDK de navegador recopila errores de frontend, incluyendo el mensaje de error y la traza de pila cuando esté disponible. Para clasificar y gestionar estos errores en el producto Error Tracking, consulte [Browser Error Tracking][4].

Cuando el SDK de navegador recopila un error:

* El error se captura como un [evento de Error][14] en RUM.
* [Retention Filters][15] que tienen como objetivo sesiones que contienen un evento de Error retienen la sesión actual.
* Las [métricas de RUM][16] `rum.measure.error`, `rum.measure.session.error` y `rum.measure.view.error_free` se actualizan, independientemente de si la sesión se retiene.
* El error se captura en [Error Tracking][4].

Las [Error Tracking rules][17] no se aplican a _eventos de Error_, y RUM sigue registrando eventos de Error que coinciden con [Ignored and Excluded issues][18] en Error Tracking. Para evitar que los errores se registren como eventos de Error, debe descartarlos antes de que se envíen a Datadog [utilizando la devolución de llamada `beforeSend`][19].

## Fuentes de error {#error-sources}
Los errores de frontend provienen de varias fuentes diferentes:

- **agente**: De la ejecución del SDK
- **consola**: De llamadas a la API `console.error()`
- **personalizado**: Enviado con la [`addError` API](#collect-errors-manually)
- **informe**: De la `ReportingObserver` API
- **fuente**: A partir de excepciones no controladas o rechazos de promesas no controlados en el código fuente

## Atributos de error {#error-attributes}

Para obtener información sobre los atributos predeterminados para todos los tipos de eventos, consulte [Datos recopilados][1]. Para obtener información sobre la configuración del muestreo o el contexto global, consulte [Modificación de datos y contexto][2].

| Atributo       | Tipo   | Descripción                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.source`  | cadena | De dónde proviene el error (por ejemplo, `console`).         |
| `error.type`    | cadena | El tipo de error (o código de error en algunos casos).                     |
| `error.message` | cadena | Un mensaje conciso, legible por humanos y de una sola línea que explica el evento. |
| `error.stack`   | cadena | La traza de pila o información complementaria sobre el error.     |
| `error.causes` | [Array][12] | Una lista opcional de errores que proporciona contexto adicional. Este atributo se utiliza para mostrar los errores por separado y mejorar el formato. Para obtener más información, consulte la [documentación de MDN][13]. |

### Errores de fuente {#source-errors}

Los errores de fuente incluyen información a nivel de código sobre el error. Puede encontrar más información sobre los diferentes tipos de error en [la documentación de MDN][3].

| Atributo       | Tipo   | Descripción                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.type`    | cadena | El tipo de error (o código de error en algunos casos).                     |

## Configurar el Error Tracking de WebAssembly {#configure-webassembly-error-tracking}

Para rastrear errores de WebAssembly (WASM), instale el plugin WASM del SDK de navegador. Utilice la misma versión para el plugin y el SDK de navegador RUM:

```shell
npm install --save-exact \
  @datadog/browser-rum@<VERSION> \
  @datadog/browser-plugin-wasm@<VERSION>
```

Registre el plugin cuando inicialice RUM:

```javascript
import { makeWasmPlugin } from '@datadog/browser-plugin-wasm';
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
  // ...
  plugins: [makeWasmPlugin()],
});
```

Inicialice RUM antes de cargar cualquier módulo WASM. El plugin observa los módulos creados con las API `WebAssembly` del navegador y agrega sus URL y los ID de compilación a los errores que contienen trazas de pila WASM. Esto permite que Datadog seleccione el ID de compilación correcto cuando una aplicación carga múltiples módulos.

Los errores no controlados se recopilan automáticamente. Para reportar un error WASM controlado, pase el objeto `Error` a [`addError()`](#collect-errors-manually).

Luego, [suba los símbolos de WebAssembly][20] para simbolizar los errores.

## Recopile errores manualmente {#collect-errors-manually}

Haga un seguimiento de las excepciones controladas, los rechazos de promesas controlados y otros errores que el SDK de navegador no rastrea automáticamente con la API `addError()`:

{{< code-block lang="javascript" >}}
addError(
    error: unknown,
    context?: Context
);
{{< /code-block >}}

**Nota**: [Error Tracking][4] procesa errores que se envían con la fuente establecida en `custom`, `source`, `report` o `console`, y que contienen una traza de pila. Los errores enviados con cualquier otra fuente (como `network`) o enviados desde extensiones de navegador no son procesados por Error Tracking.

{{< tabs >}}
{{% tab "npm" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

// Send a custom error with context
const error = new Error('Something wrong occurred.');

datadogRum.addError(error, {
    pageStatus: 'beta',
});

// Send a network error
fetch('<SOME_URL>').catch(function(error) {
    datadogRum.addError(error);
})

// Send a handled exception error
try {
    //Some code logic
} catch (error) {
    datadogRum.addError(error);
}
```
{{% /tab %}}
{{% tab "CDN asíncrono" %}}

```javascript
// Send a custom error with context
const error = new Error('Something wrong occurred.');

window.DD_RUM.onReady(function() {
    window.DD_RUM.addError(error, {
        pageStatus: 'beta',
    });
});

// Send a network error
fetch('<SOME_URL>').catch(function(error) {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.addError(error);
    });
})

// Send a handled exception error
try {
    //Some code logic
} catch (error) {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.addError(error);
    })
}
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}

```javascript
// Send a custom error with context
const error = new Error('Something wrong occurred.');

window.DD_RUM && window.DD_RUM.addError(error, {
    pageStatus: 'beta',
});

// Send a network error
fetch('<SOME_URL>').catch(function(error) {
    window.DD_RUM && window.DD_RUM.addError(error);
})

// Send a handled exception error
try {
    //Some code logic
} catch (error) {
    window.DD_RUM && window.DD_RUM.addError(error);
}
```
{{% /tab %}}
{{< /tabs >}}

### Instrumentación de límites de error de React {#react-error-boundaries-instrumentation}

Puede instrumentar los [React error boundaries][5] para hacer un seguimiento de errores de renderizado de React usando la API `addError()` del SDK de navegador RUM.

Los errores de renderizado recopilados contienen una pila de componentes, la cual se desminifica como cualquier otra traza de pila de errores después de que [suba los sourcemaps][6].

Para instrumentar los límites de error de reacción para su monitoreo, use lo siguiente:

{{< tabs >}}
{{% tab "npm" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

class ErrorBoundary extends React.Component {
  ...

  componentDidCatch(error, info) {
    const renderingError = new Error(error.message);
    renderingError.name = `ReactRenderingError`;
    renderingError.stack = info.componentStack;
    renderingError.cause = error;

    datadogRum.addError(renderingError);
  }

  ...
}
```

{{% /tab %}}
{{% tab "CDN asíncrono" %}}

```javascript
class ErrorBoundary extends React.Component {
  ...

  componentDidCatch(error, info) {
    const renderingError = new Error(error.message);
    renderingError.name = `ReactRenderingError`;
    renderingError.stack = info.componentStack;
    renderingError.cause = error;

    DD_RUM.onReady(function() {
       DD_RUM.addError(renderingError);
    });
  }

  ...
}
```

{{% /tab %}}
{{% tab "CDN síncrono" %}}

```javascript
class ErrorBoundary extends React.Component {
  ...

  componentDidCatch(error, info) {
    const renderingError = new Error(error.message);
    renderingError.name = `ReactRenderingError`;
    renderingError.stack = info.componentStack;
    renderingError.cause = error;

     window.DD_RUM &&
       window.DD_RUM.addError(renderingError);

  }

  ...
}
```

{{% /tab %}}
{{< /tabs >}}


## Solución de problemas {#troubleshooting}

### Error de script {#script-error}

Por razones de seguridad, los navegadores ocultan los detalles de los errores provocados por scripts de origen cruzado. Cuando esto sucede, la pestaña {{< ui >}}Error Details{{< /ui >}} muestra un error con el mensaje mínimo "Script error".

{{< img src="real_user_monitoring/browser/script-error.png" alt="Ejemplo de error de script de Real User Monitoring" style="width:75%;" >}}

Para obtener más información sobre los scripts de origen cruzado y por qué se ocultan los detalles, consulte [CORS][7] y [esta Nota sobre los controladores de eventos globales][8]. Algunas posibles razones para este error incluyen:
- Sus archivos de JavaScript están alojados en un nombre de host diferente (por ejemplo, `example.com` incluye activos de `static.example.com`).
- Su sitio web incluye bibliotecas de JavaScript alojadas en una CDN.
- Su sitio web incluye bibliotecas de JavaScript de terceros alojadas en los servidores del proveedor.

Obtenga visibilidad de los scripts de origen cruzado siguiendo estos dos pasos:
1. Llame a las bibliotecas de JavaScript con [`crossorigin="anonymous"`][9].

    Con `crossorigin="anonymous"`, la solicitud para obtener el script se realiza de forma segura. No se reenvían datos confidenciales a través de cookies o autenticación HTTP.

2. Configure el encabezado de respuesta HTTP [`Access-Control-Allow-Origin`][10]:

    - `Access-Control-Allow-Origin: *` para permitir que todos los orígenes obtengan el recurso.
    - `Access-Control-Allow-Origin: example.com` para especificar un único origen permitido. Si el servidor admite clientes de múltiples orígenes, debe devolver el origen para el cliente específico que realiza la solicitud.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/real_user_monitoring/application_monitoring/browser/data_collected/
[2]: /es/real_user_monitoring/application_monitoring/browser/advanced_configuration/
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[4]: /es/real_user_monitoring/error_tracking
[5]: https://legacy.reactjs.org/docs/error-boundaries.html
[6]: /es/real_user_monitoring/guide/upload-javascript-source-maps/?tab=webpackjs#upload-your-source-maps
[7]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[8]: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror#notes
[9]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin
[10]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
[11]: /es/real_user_monitoring/guide/upload-javascript-source-maps/?tab=webpackjs
[12]: https://github.com/DataDog/rum-events-format/blob/69147431d689b3e59bff87e15bb0088a9bb319a9/lib/esm/generated/rum.d.ts#L185-L203
[13]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause
[14]: /es/real_user_monitoring/explorer/search/#event-types
[15]: /es/real_user_monitoring/rum_without_limits/retention_filters
[16]: /es/real_user_monitoring/rum_without_limits/metrics
[17]: /es/error_tracking/manage_data_collection
[18]: /es/error_tracking/issue_states#excluding-an-issue
[19]: /es/real_user_monitoring/guide/enrich-and-control-rum-data/?tab=event#discard-a-frontend-error
[20]: /es/real_user_monitoring/guide/upload-webassembly-symbols/