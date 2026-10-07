---
description: Utiliza la llamada de retorno beforeSend para enriquecer, modificar o
  filtrar eventos RUM antes de enviarlos a Datadog para mejorar el control de los
  datos.
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentación
  text: Visualización de tus datos RUM en el Explorador
title: Enriquecer y controlar datos RUM de navegador con beforeSend
---

## Información general

El SDK del Navegador RUM captura eventos RUM y rellena sus atributos principales. La función de devolución de llamada `beforeSend` te da acceso a cada evento recopilado por el SDK RUM antes de enviarlo a Datadog.

Interceptar los eventos del RUM te permite:

* Enriquecer los eventos del RUM con atributos de contexto adicionales
* Modificar tus eventos RUM para cambiar su contenido u ocultar secuencias confidenciales (consulta la [lista de propiedades editables][1])
* Descartar eventos RUM seleccionados

## Estructura de eventos y contextos
La función de devolución de llamada `beforeSend` te da acceso a dos objetos: `event` y `context`.

```javascript
function beforeSend(event, context)
```

### Evento
El evento es generado por el SDK del Navegador RUM. Para obtener más información sobre los distintos tipos de evento y los atributos recopilados, consulta la documentación [Datos del Navegador RUM recopilados[2].

La propiedad `event.type` te permite identificar el tipo de evento:
```json
{
    ...,
    "event.type": "resource",
    ...
}
```

### Contexto
El contexto está formado por las API del navegador que activan la creación de eventos. Los valores del contexto dependen del `event.type`:
| Tipo de evento RUM     | Contexto                                                  |
|----------------------|-----------------------------------------------------------------|
| Vista               | [Localización][3]                                                   |
| Acción             | [Evento][4]                                                        |
| Recurso (XHR)     | [XMLHttpRequest][5] y [PerformanceResourceTiming][6]          |
| Recurso (Fetch)    | [Solicitud][7], [Respuesta][8] y [PerformanceResourceTiming][6]   |
| Recurso (Otro)     | [PerformanceResourceTiming][6]                                  |
| Error               | [Error][9] o cualquier otro valor que aparezca como error       |
| Tarea prolongada  | [PerformanceLongTaskTiming][10]                                 |

Para obtener más información sobre la estructura de los objetos de contexto, consulta el [repositorio de SDK del Navegador][11].

## Ejemplos

### Recopilación de cabeceras HTTP de una respuesta Fetch

Recopila cabeceras HTTP de una respuesta Fetch con la siguiente configuración `beforeSend`. Los atributos de contexto adicionales **deben** almacenarse en el objeto `event.context`.

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    beforeSend: (event, context) => {
        // collect a RUM resource's response headers
        if (event.type === 'resource' && event.resource.type === 'fetch') {
            event.context.responseHeaders = Object.fromEntries(context.response.headers)
        }
        return true
    },
    ...
});
```

Las siguientes pestañas muestran la información contenida en los objetos `beforeSend` de evento y contexto de este ejemplo:

{{< tabs >}}
{{% tab "Evento" %}}

```json
{
    "application": {
        "id": "<YOUR_APPLICATION_ID>"
    },
    "date": 1623933472075,
    "service": "shopist-web-ui",
    "session": {
        "type": "user",
        "id": "308f14ac-2a27-4b50-945c-be345778994f",
        "has_replay": true
    },
    "view": {
        "id": "768f0eb9-39c5-4a1f-9c13-476bd08166bb",
        "referrer": "http://localhost:3000/",
        "url": "http://localhost:3000/"
    },
    "resource": {
        "id": "e5d1d3a4-7240-4910-bd0a-af253e06d301",
        "type": "fetch",
        "duration": 2577300000,
        "method": "get",
        "status_code": 200,
        "url": "https://api.shopist.io/products.json",
        "size": 10307,
        "download": {
            "duration": 1800000,
            "start": 2575500000
        },
        "first_byte": {
            "duration": 2574600000,
            "start": 900000
        }
    },
    "type": "resource",
    "context": {
        "browser_test": false,
        "usr.email": "jane@doe.com",
        "usr.id": "f57eg30cc9"
    }
}
```
{{% /tab %}}
{{% tab "Contexto" %}}
```json
{
    "performanceEntry": {
        "name": "https://api.shopist.io/products.json",
        "entryType": "resource",
        "startTime": 230,
        "duration": 2577.300000011921,
        "initiatorType": "fetch",
        "nextHopProtocol": "h2",
        "workerStart": 0,
        "redirectStart": 0,
        "redirectEnd": 0,
        "fetchStart": 230,
        "domainLookupStart": 230,
        "domainLookupEnd": 230,
        "connectStart": 230,
        "connectEnd": 230,
        "secureConnectionStart": 230,
        "requestStart": 230.90000000596046,
        "responseStart": 2805.5,
        "responseEnd": 2807.300000011921,
        "transferSize": 10743,
        "encodedBodySize": 10307,
        "decodedBodySize": 10307,
        "serverTiming": [],
        "workerTiming": []
    },
    "response": {
        "body": (...),
        "bodyUsed": true,
        "headers": Headers {},
        "ok": true,
        "redirected": false,
        "status": 200,
        "statusText": "",
        "type": "basic",
        "url": "https://api.shopist.io/products.json"
    },
    "requestInput": "https://api.shopist.io/products.json",
    "requestInit": {
        "headers": [
            [
                "Content-Type",
                "application/json; charset=utf-8"
            ],
            [
                "x-datadog-origin",
                "rum"
            ],
            [
                "x-datadog-parent-id",
                "595857188965892467"
            ],
            [
                "x-datadog-sampled",
                "1"
            ],
            [
                "x-datadog-sampling-priority",
                "1"
            ],
            [
                "x-datadog-trace-id",
                "796856647783126791"
            ]
        ],
        "method": "get",
        "cache": "no-cache"
    }
}
```
{{% /tab %}}
{{< /tabs >}}

### Descartar un error de frontend

Descarta los errores de frontend si tu mensaje incluye "el perfil no está definido" con la siguiente configuración `beforeSend`:

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    beforeSend: (event, context) => {
        // discard a RUM error if its message includes 'profile is not defined'
        if (event.type === 'error' && event.error.message.includes('profile is not defined')) {
            return false
        }
    },
    ...
});
```

Las siguientes pestañas muestran la información contenida en los objetos `beforeSend` de evento y contexto de este ejemplo:

{{< tabs >}}
{{% tab "Evento" %}}

```json
{
    "application": {
        "id": "75d50c62-8b66-403c-a453-aaa1c44d64bd"
    },
    "date": 1623941859639,
    "service": "shopist-web-ui",
    "session": {
        "type": "user",
        "id": "4203a142-1e3c-41b0-822d-316705d98f19",
        "has_replay": true
    },
    "view": {
        "id": "0a771c95-9bc4-4640-978e-ad28da64da45",
        "referrer": "http://localhost:3000/profile",
        "url": "http://localhost:3000/profile-edit"
    },
    "action": {
        "id": "7b30e681-ce5c-47a8-ac22-6aff8be59744"
    },
    "error": {
        "id": "3c0295b1-da48-4827-93c9-ea06be4aafd9",
        "message": "profile is not defined",
        "source": "source",
        "stack": "ReferenceError: profile is not defined\n  at VueComponent.discardEdit @ http://localhost:3000/_nuxt/pages/profile-edit.js:911:41\n  at invokeWithErrorHandling @ http://localhost:3000/_nuxt/commons.app.js:12167:26\n  at VueComponent.invoker @ http://localhost:3000/_nuxt/commons.app.js:12492:14\n  at invokeWithErrorHandling @ http://localhost:3000/_nuxt/commons.app.js:12167:26\n  at VueComponent.Vue.$emit @ http://localhost:3000/_nuxt/commons.app.js:14196:9\n  at VueComponent.cancelDraft @ http://localhost:3000/_nuxt/pages/profile-edit.js:828:12\n  at invokeWithErrorHandling @ http://localhost:3000/_nuxt/commons.app.js:12167:26\n  at HTMLButtonElement.invoker @ http://localhost:3000/_nuxt/commons.app.js:12492:14\n  at HTMLButtonElement.original._wrapper @ http://localhost:3000/_nuxt/commons.app.js:17221:25",
        "type": "ReferenceError",
        "handling": "unhandled"
    },
    "type": "error",
    "context": {
        "browser_test": false,
        "usr.email": "jane@doe.com",
        "usr.id": "f57eg30cc9"
    }
}
```
{{% /tab %}}
{{% tab "Contexto" %}}
```json
{
    "error": {
        "message": "profile is not defined",
        "stack": "ReferenceError: profile is not defined\n  at VueComponent.discardEdit @ http://localhost:3000/_nuxt/pages/profile-edit.js:911:41\n  at invokeWithErrorHandling @ http://localhost:3000/_nuxt/commons.app.js:12167:26\n  at VueComponent.invoker @ http://localhost:3000/_nuxt/commons.app.js:12492:14\n  at invokeWithErrorHandling @ http://localhost:3000/_nuxt/commons.app.js:12167:26\n  at VueComponent.Vue.$emit @ http://localhost:3000/_nuxt/commons.app.js:14196:9\n  at VueComponent.cancelDraft @ http://localhost:3000/_nuxt/pages/profile-edit.js:828:12\n  at invokeWithErrorHandling @ http://localhost:3000/_nuxt/commons.app.js:12167:26\n  at HTMLButtonElement.invoker @ http://localhost:3000/_nuxt/commons.app.js:12492:14\n  at HTMLButtonElement.original._wrapper @ http://localhost:3000/_nuxt/commons.app.js:17221:25"
    }
}
```
{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#modify-the-content-of-a-rum-event
[2]: /es/real_user_monitoring/browser/data_collected/
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Location
[4]: https://developer.mozilla.org/en-US/docs/Web/API/Event
[5]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[6]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Request
[8]: https://developer.mozilla.org/en-US/docs/Web/API/Response
[9]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[10]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming
[11]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum-core/src/domainContext.types.ts