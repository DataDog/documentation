---
aliases:
- /error_tracking/standalone_frontend/collecting_browser_errors
description: Aprende a recopilar y realizar un seguimiento de errores frontend de
  varias fuentes utilizando el SDK del navegador RUM, incluida la recopilación manual
  de errores y los límites de errores React.
further_reading:
- link: /error_tracking/explorer/
  tag: Documentation
  text: Explora tus errores en Datadog
- link: /error_tracking/monitors/
  tag: Documentation
  text: Alerta proactiva sobre cuestiones de impacto
- tag: Documentation
  link: /real_user_monitoring
  text: Medir el rendimiento y el impacto en el usuario
title: Recopilación de errores del navegador
---
## Información general

Los errores del front-end se recopilan con el SDK del navegador. El mensaje de error y la traza (trace) del stack tecnológico se incluyen cuando están disponibles.

## Fuentes de errores
Los errores de front-end proceden de diversas fuentes:

- **Agent**: De la ejecución del SDK
- **consola**: De las llamadas a la API `console.error()`
- **personalizado**: Enviado con la [API`addError`](#collect-errors-manually)
- **informe**: Desde la API `ReportingObserver` 
- **Fuente**: De excepciones no manejadas o rechazos de promesas no manejadas en el código fuente.

## Atributos de errores

Para obtener información sobre los atributos por defecto para todos los tipos de eventos, consulta [Datos recopilados][1]. Para obtener información sobre la configuración para el muestreo o el contexto global, consulta [Modificación de datos y contexto][2].

| Atributo       | Tipo   | Descripción                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.source`  | cadena | Donde se origina el error (por ejemplo, `console`).         |
| `error.type`    | cadena | El tipo de error (o código de error en algunos casos).                     |
| `error.message` | cadena | Un mensaje conciso, legible, de una línea, en el cual se explica el evento. |
| `error.stack`   | cadena | El stack trace o información complementaria sobre el error.     |
| `error.causes` | [Matriz][12] | Una lista de errores opcional que proporciona contexto adicional. Este atributo se utiliza para mostrar los errores por separado y mejorar el formato. Para más información, consulta la [documentación de MDN][13]. |

### Errores de origen

Los errores de origen incluyen información a nivel de código sobre el error. Puedes encontrar más información sobre los distintos tipos de errores en [la documentación de MDN][3].

| Atributo       | Tipo   | Descripción                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.type`    | cadena | El tipo de error (o código de error en algunos casos).                     |

## Recopilación manual de errores

Excepciones manejadas por Monitor, rechazos de promesas manejados y otros errores no rastreados automáticamente por el SDK del navegador con la API `addError()`:

{{< code-block lang="javascript" >}}
addError(
    error: unknown,
    context?: Context
);
{{< /code-block >}}

**Nota**: [Error Tracking][4] procesa errores que se envían con la fuente establecida en `custom`, `source`, `report` o `console` y contienen un stack trace. Los errores enviados con cualquier otra fuente (como `network`) o enviados desde extensiones del navegador no son procesados por Error Tracking.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

// Enviar un error personalizado con contexto
const error = new Error('Something wrong occurred.');

datadogRum.addError(error, {
    pageStatus: 'beta',
});

// Enviar un error de red
fetch('<SOME_URL>').catch(function(error) {
    datadogRum.addError(error);
})

// Enviar un error de excepción gestionada
try {
    //Some code logic
} catch (error) {
    datadogRum.addError(error);
}
```
{{% /tab %}}
{{% tab "CDN asíncrono" %}}

```JavaScript
// Enviar un error personalizado con contexto
const error = nuevo Error('Something wrong occurred.');

window.DD_RUM.onReady(function() {
    window.DD_RUM.addError(error, {
        pageStatus: 'beta',
    });
});

// Enviar un error de red
fetch('<SOME_URL>').catch(function(error) {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.addError(error);
    });
})

// Enviar un error de excepción manejado
probar {
    //Alguna lógica de código
} capturar (error) {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.addError(error);
    })
}
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}

```JavaScript
// Enviar un error personalizado con contexto
const error = nuevo Error('Something wrong occurred.');

window.DD_RUM && window.DD_RUM.addError(error, {
    pageStatus: 'beta',
});

// Enviar un error de red
fetch('<SOME_URL>').catch(function(error) {
    window.DD_RUM && window.DD_RUM.addError(error);
})

// Enviar un error de excepción manejado
probar {
    //Alguna lógica de código
} capturar (error) {
    window.DD_RUM && window.DD_RUM.addError(error);
}
```
{{% /tab %}}
{{< /tabs >}}

### Instrumentación de límites de error de React

Puedes instrumentar los [límites de error][5] de React para monitorizar errores de representación de React utilizando la API `addError()` del RUM Browser SDK.

Los errores de representación recopilados contienen un stak tecnológico de componentes, que está desminificado como cualquier otra traza de stack de errores después de [cargar mapas de origen][6].

Para instrumentar límites de errores de React para la monitorización, utiliza lo siguiente:

{{< tabs >}}
{{% tab "NPM" %}}

```JavaScript
importar { datadogRum } desde '@Datadog/browser-rum';

clase ErrorBoundary extends React.Component {
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

```JavaScript
clase ErrorBoundary extends React.Component {
  ...

  componentDidCatch(error, info) {
    const renderingError = new Error(error.message);
    renderingError.name = `ReactRenderingError`;
    renderingError.stack = info.componentStack;
    renderingError.cause = error;

    DD_RUM.onReady(función() {
       DD_RUM.addError(renderingError);
    });
  }

  ...
}
```

{{% /tab %}}
{{% tab "CDN síncrono" %}}

```JavaScript
clase ErrorBoundary extends React.Component {
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


## Solucionar problemas

### Error de script

Por motivos de seguridad, los navegadores ocultan los detalles de los errores provocados por scripts de origen cruzado. Cuando esto ocurre, la pestaña Detalles del error muestra un error con el mensaje mínimo "Error de script".

{{< img src="real_user_monitoring/browser/script-error.png" alt="Ejemplo de error de script de Real User Monitoring" style="width:75%;" >}}

Para más información sobre scripts de origen cruzado y por qué se ocultan los detalles, consulta [CORS][7] y [esta Nota sobre Global Event Handlers][8]. Algunos posibles motivos de este error incluyen:
- Tus archivos JavaScript están alojados en un nombre de host diferente (por ejemplo, `example.com` incluye activos de `static.example.com`).
- Tu sitio web incluye bibliotecas JavaScript alojadas en una CDN.
- Tu sitio web incluye bibliotecas JavaScript de terceros alojadas en los servidores del proveedor.

Obtén visibilidad de los scripts de origen cruzado siguiendo estos dos pasos:
1. Llama a las bibliotecas JavaScript con [`crossorigin="anonymous"`][9].

   Con `crossorigin="anonymous"`, la solicitud para acceder al script se realiza de forma segura. No se transmiten datos sensibles a través de cookies ni autenticación HTTP.

2. Configura el encabezado de respuesta HTTP [`Access-Control-Allow-Origin`][10]:

    - `Access-Control-Allow-Origin: *` para permitir que todos los orígenes obtengan el recurso.
    - `Access-Control-Allow-Origin: example.com` para especificar un único origen permitido. Si el servidor admite clientes de varios orígenes, debe devolver el origen del cliente específico que realiza la solicitud.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/real_user_monitoring/browser/data_collected/
[2]: /es/real_user_monitoring/browser/advanced_configuration/
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