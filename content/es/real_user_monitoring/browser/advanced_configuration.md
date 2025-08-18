---
aliases:
- /es/real_user_monitoring/installation/advanced_configuration/
- /es/real_user_monitoring/browser/modifying_data_and_context/
further_reading:
- link: /real_user_monitoring/browser/tracking_user_actions
  tag: Documentación
  text: Rastreo de las acciones de los usuarios
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Real User Monitoring
- link: /real_user_monitoring/browser/data_collected/
  tag: Documentación
  text: Datos del navegador RUM recopilados
- link: /real_user_monitoring/explorer/
  tag: Documentación
  text: Explorar tus vistas en Datadog
- link: /real_user_monitoring/explorer/visualize/
  tag: Documentación
  text: Aplicar visualizaciones a tus eventos
- link: /logs/log_configuration/attributes_naming_convention
  tag: Documentación
  text: Atributos estándar de Datadog
title: Configuración avanzada
---

## Información general

Existen varias formas de modificar los [datos y el contexto recopilados][1] por RUM, para satisfacer tus necesidades:

- Proteger datos sensibles como la información de identificación personal.
- Conectar una sesión del usuario con tu identificación interna de ese usuario, ayuda con el soporte.
- Reducir la cantidad de datos de RUM que estás recopilando, mediante el muestreo de los datos.
- Proporcionar más contexto que el que ofrecen los atributos por defecto sobre la procedencia de los datos.

## Sustituir los nombres de las vistas de RUM por defecto

El SDK del RUM Browser genera automáticamente un [evento de vista][2] para cada nueva página visitada por tus usuarios o cuando se cambia la URL de la página (para aplicaciones de página única). El nombre de la vista se calcula a partir de la URL de la página actual, donde los ID alfanuméricos variables se eliminan automáticamente. Un segmento de ruta que contenga al menos un número se considera un ID de variable. Por ejemplo, `/dashboard/1234` y `/dashboard/9a` se convierten en `/dashboard/?`.

A partir de la [versión 2.17.0][3], puedes añadir nombres de vistas y asignarlos a un servicio dedicado propiedad de un equipo mediante el rastreo manual de eventos de vistas con la opción `trackViewsManually`:

1. Configura `trackViewsManually` en true al inicializar el SDK del RUM Browser.

   {{< tabs >}}
   {{% tab "NPM" %}}
   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.init({
       ...,
       trackViewsManually: true,
       ...
   });
   ```
   {{% /tab %}}
   {{% tab "CDN asíncrono" %}}
   ```javascript
   window.DD_RUM.onReady(function() {
       window.DD_RUM.init({
           ...,
           trackViewsManually: true,
           ...
       })
   })
   ```
   {{% /tab %}}
   {{% tab "CDN síncrono" %}}
   ```javascript
   window.DD_RUM &&
       window.DD_RUM.init({
           ...,
           trackViewsManually: true,
           ...
       });
   ```
   {{% /tab %}}
   {{< /tabs >}}

2. Debes iniciar vistas para cada nueva página o cambio de ruta (para aplicaciones de página única). Los datos de RUM se recopilan cuando se inicia la vista. A partir de la [versión 4.13.0][17], también puedes definir opcionalmente el nombre y la versión de servicios asociados.

   - Nombre de la vista: por defecto es la ruta URL de la página.
   - Servicio: por defecto es el servicio especificado al crear tu aplicación RUM.
   - Versión: por defecto es la versión especificada al crear tu aplicación RUM.
   - Contexto: A partir de la [versión 5.28.0][20], puedes añadir contexto a las vistas y a los eventos secundarios de las vistas.

   Para más información, consulta [Configuración de la monitorización del navegador][4].

   <details open>
     <summary>Última versión</summary>
   El siguiente ejemplo rastrea manualmente las vistas a la página <code>checkout</code> en una aplicación de RUM. Utiliza <code>checkout</code> como nombre de la vista y asocia el servicio <code>purchase</code> con la versión <code>1.2.3</code>.

   {{< tabs >}}
   {{% tab "NPM" %}}
   ```javascript
   datadogRum.startView({
        name: 'checkout',
        service: 'purchase',
        version: '1.2.3',
        context: {
            payment: 'Done'
        },
   })
   ```

   {{% /tab %}}
   {{% tab "CDN asíncrono" %}}
   ```javascript
   window.DD_RUM.onReady(function() {
      window.DD_RUM.startView({
            name: 'checkout',
            service: 'purchase',
            version: '1.2.3',
            context: {
                payment: 'Done'
            },
      })
   })
   ```
   {{% /tab %}}
   {{% tab "CDN síncrono" %}}
   ```javascript
   window.DD_RUM && window.DD_RUM.startView({
        name: 'checkout',
        service: 'purchase',
        version: '1.2.3',
        context: {
            payment: 'Done'
        },
   })
   ```
   {{% /tab %}}
   {{< /tabs >}}

</details>
<details>
<summary>antes de <code>v5.28.0</code></summary>
El siguiente ejemplo rastrea manualmente las vistas a la página <code>checkout</code> en una aplicación de RUM. Utiliza <code>checkout</code> como nombre de la vista y asocia el servicio <code>purchase</code> con la versión <code>1.2.3</code>.

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.startView({
  name: 'checkout',
  service: 'purchase',
  version: '1.2.3'
})
```

{{% /tab %}}
{{% tab "CDN asíncrono" %}}
```javascript
window.DD_RUM.onReady(function() {
  window.DD_RUM.startView({
    name: 'checkout',
    service: 'purchase',
    version: '1.2.3'
  })
})
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}
```javascript
window.DD_RUM && window.DD_RUM.startView({
  name: 'checkout',
  service: 'purchase',
  version: '1.2.3'
})
```
{{% /tab %}}
{{< /tabs >}}
</details>

   <details>
     <summary>antes de <code>v4.13.0</code></summary>
   El siguiente ejemplo rastrea manualmente las vistas a la página <code>checkout</code> en una aplicación de RUM. No se puede especificar el servicio ni la versión.

   {{< tabs >}}
   {{% tab "NPM" %}}
   ```javascript
   datadogRum.startView('checkout')
   ```

   {{% /tab %}}
   {{% tab "CDN asíncrono" %}}
   ```javascript
   window.DD_RUM.onReady(function() {
       window.DD_RUM.startView('checkout')
   })
   ```
   {{% /tab %}}
   {{% tab "CDN síncrono" %}}
   ```javascript
   window.DD_RUM && window.DD_RUM.startView('checkout')
   ```
   {{% /tab %}}
   {{< /tabs >}}

   </details>

Si utilizas React, Angular, Vue o cualquier otro marco de frontend, Datadog recomienda implementar la lógica de `startView` a nivel del enrutador del marco.

### Instrumentación del enrutador de React

Para sustituir los nombres por defecto de las vistas de RUM de forma que se ajusten a cómo los has definido en tu aplicación React, debes seguir los pasos a continuación.

**Nota**: Estas instrucciones son específicas para la biblioteca del **React Router v6**.

1. Configura `trackViewsManually` en `true` al inicializar el SDK del RUM Browser como se describe [anteriormente](#override-default-rum-view-names).

2. Iniciar vistas para cada cambio de ruta.

   {{< tabs >}}
   {{% tab "NPM" %}}
   ```javascript
      import { matchRoutes, useLocation } from 'react-router-dom';
      import { routes } from 'path/to/routes';
      import { datadogRum } from "@datadog/browser-rum";

      export default function App() {
        // Track every route change with useLocation API
       let location = useLocation();

       useEffect(() => {
         const routeMatches = matchRoutes(routes, location.pathname);
         const viewName = routeMatches && computeViewName(routeMatches);
         if (viewName) {
           datadogRum.startView({name: viewName});
         }
       }, [location.pathname]);

       ...
      }

      // Compute view name out of routeMatches
      function computeViewName(routeMatches) {
       let viewName = "";
       for (let index = 0; index < routeMatches.length; index++) {
         const routeMatch = routeMatches[index];
         const path = routeMatch.route.path;
         // Skip pathless routes
         if (!path) {
           continue;
         }

         if (path.startsWith("/")) {
          // Handle absolute child route paths
           viewName = path;
         } else {
          // Handle route paths ending with "/"
           viewName += viewName.endsWith("/") ? path : `/${path}`;
         }
       }

       return viewName || '/';
      }
   ```

   {{% /tab %}}
   {{% tab "CDN asíncrono" %}}
   ```javascript
      import { matchRoutes, useLocation } from 'react-router-dom';
      import { routes } from 'path/to/routes';

      export default function App() {
        // Track every route change with useLocation API
       let location = useLocation();

       useEffect(() => {
         const routeMatches = matchRoutes(routes, location.pathname);
         const viewName = routeMatches && computeViewName(routeMatches);
         if (viewName) {
           DD_RUM.onReady(function() {
             DD_RUM.startView({name: viewName});
           });
         }
       }, [location.pathname]);

       ...
      }

      // Compute view name out of routeMatches
      function computeViewName(routeMatches) {
       let viewName = "";
       for (let index = 0; index < routeMatches.length; index++) {
         const routeMatch = routeMatches[index];
         const path = routeMatch.route.path;
         // Skip pathless routes
         if (!path) {
           continue;
         }

         if (path.startsWith("/")) {
          // Handle absolute child route paths
           viewName = path;
         } else {
          // Handle route paths ending with "/"
           viewName += viewName.endsWith("/") ? path : `/${path}`;
         }
       }

       return viewName || '/';
      }
   ```
   {{% /tab %}}
   {{% tab "CDN síncrono" %}}
   ```javascript
      import { matchRoutes, useLocation } from 'react-router-dom';
      import { routes } from 'path/to/routes';

      export default function App() {
        // Track every route change with useLocation API
       let location = useLocation();

       useEffect(() => {
         const routeMatches = matchRoutes(routes, location.pathname);
         const viewName = routeMatches && computeViewName(routeMatches);
         if (viewName) {
           window.DD_RUM &&
             window.DD_RUM.startView({name: viewName});
         }
       }, [location.pathname]);

       ...
      }

      // Compute view name out of routeMatches
      function computeViewName(routeMatches) {
       let viewName = "";
       for (let index = 0; index < routeMatches.length; index++) {
         const routeMatch = routeMatches[index];
         const path = routeMatch.route.path;
         // Skip pathless routes
         if (!path) {
           continue;
         }

         if (path.startsWith("/")) {
          // Handle absolute child route paths
           viewName = path;
         } else {
          // Handle route paths ending with "/"
           viewName += viewName.endsWith("/") ? path : `/${path}`;
         }
       }

       return viewName || '/';
      }
   ```
   {{% /tab %}}
   {{< /tabs >}}

### Definir el nombre de la vista

Utiliza `setViewName(name: string)` para actualizar el nombre de la vista actual. Esto te permite cambiar el nombre de la vista mientras está activa sin iniciar una nueva.

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.setViewName('<VIEW_NAME>');

// Code example
datadogRum.setViewName('Checkout');
```
{{% /tab %}}
{{% tab "CDN asíncrono" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setViewName('<VIEW_NAME>');
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.setViewName('Checkout');
})
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}
```javascript
window.DD_RUM && window.DD_RUM.setViewName('<VIEW_NAME>');

// Code example
window.DD_RUM && window.DD_RUM.setViewName('Checkout');
```
{{% /tab%}}
{{< /tabs>}}

**Nota**: Cambiar el nombre de la vista afecta a la vista y a sus eventos secundarios desde el momento en que se llama al método.

## Enriquecer y controlar los datos de RUM

El SDK del RUM Browser captura los eventos de RUM y rellena sus atributos principales. La función de devolución de llamada `beforeSend` te da acceso a cada evento recopilado por el SDK del RUM Browser antes de enviarlo a Datadog.

Interceptar los eventos del RUM te permite:

- Enriquecer los eventos del RUM con atributos de contexto adicionales
- Modificar tus eventos del RUM para alterar su contenido o eliminar secuencias sensibles (consulta la [lista de propiedades editables](#modify-the-content-of-a-rum-event))
- Descartar eventos seleccionados del RUM

A partir de la [versión 2.13.0][5], `beforeSend` toma dos argumentos: el `event` generado por el SDK del RUM Browser y el `context` que desencadenó la creación del evento del RUM.

```javascript
function beforeSend(event, context)
```

Los valores posibles de `context` son:

| Tipo de evento de RUM   | Contexto                   |
|------------------|---------------------------|
| Vista             | [Localización][6]                  |
| Acción           | [Evento][7] y stack tecnológico de identificación                     |
| Recurso (XHR)   | [XMLHttpRequest][8], [PerformanceResourceTiming][9] y stack tecnológico de identificación            |
| Recurso (acceso) | [Request][10], [Response][11], [PerformanceResourceTiming][9] y stack tecnológico de identificación      |
| Recurso (Otros) | [PerformanceResourceTiming][9] |
| Error            | [Error] [12]                     |
| Tarea prolongada        | [PerformanceLongTaskTiming][13] |

Para más información, consulta la [Guía de enriquecimiento y control de datos de RUM][14].

### Enriquecer eventos de RUM

Junto con los atributos añadidos con la [API de Global Context](#global-context) o la [recopilación de datos de indicadores de funciones](#enrich-rum-events-with-feature-flags), puedes añadir atributos de contexto adicionales al evento. Por ejemplo, etiquetar tus eventos de recursos del RUM con datos extraídos de un objeto de respuesta de acceso:

{{< tabs >}}
{{% tab "NPM" %}}
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
{{% /tab %}}
{{% tab "CDN asíncrono" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        beforeSend: (event, context) => {
            // collect a RUM resource's response headers
            if (event.type === 'resource' && event.resource.type === 'fetch') {
                event.context.responseHeaders = Object.fromEntries(context.response.headers)
            }
            return true
        },
        ...
    })
})
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}
```javascript
window.DD_RUM &&
    window.DD_RUM.init({
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
{{% /tab%}}
{{< /tabs>}}

Si un usuario pertenece a varios equipos, añade pares clave-valor adicionales en tus llamadas a la API de Global Context.

El SDK del RUM Browser ignora los atributos añadidos fuera de `eventos.context`.

### Enriquecer eventos de RUM con indicadores de funciones

Puedes [enriquecer tus datos de eventos de RUM con indicadores de funciones][14] para obtener mejor contexto y visibilidad de la monitorización del rendimiento. Esto te permite determinar a qué usuarios se les muestra una experiencia de usuario específica y si está afectando negativamente al rendimiento del usuario.

### Modificar el contenido de un evento de RUM

Por ejemplo, para eliminar las direcciones de correo electrónico de las URL de tus aplicaciones web:

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    beforeSend: (event) => {
        // remove email from view url
        event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
    },
    ...
});
```
{{% /tab %}}
{{% tab "CDN asíncrono" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        beforeSend: (event) => {
            // remove email from view url
            event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
        },
        ...
    })
})
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}
```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        ...,
        beforeSend: (event) => {
            // remove email from view url
            event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
        },
        ...
    });
```
{{% /tab %}}
{{< /tabs >}}

Puedes actualizar las siguientes propiedades de eventos:

| Atributo                      | Tipo   | Descripción                                                                                                                                                                               |
| ------------------------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `view.url`                     | Cadena | La URL de la página web activa.                                                                                                                                                           |
| `view.referrer`                | Cadena | La URL de la página web anterior desde la que se siguió un vínculo a la página solicitada actualmente.                                                                                          |
| `view.name`                    | Cadena | El nombre de la vista actual.                                                                                                                                                             |
| `view.performance.lcp.resource_url` | Cadena |   La URL de recursos para Largest Contentful Paint.                                                                                                                                 |
| `service`                      | Cadena | El nombre de servicio para tu aplicación.                                                                                                                                                    |
| `version`                      | Cadena | La versión de la aplicación. Por ejemplo: 1.2.3, 6c44da20 o 2020.02.13.                                                                                                                  |
| `action.target.name`           | Cadena | El elemento con el que ha interactuado el usuario. Solo para acciones recopiladas automáticamente.                                                                                                      |
| `error.message`                | Cadena | Un mensaje conciso, legible, de una línea, en el cual se explica el error.                                                                                                                         |
| `error.stack `                 | Cadena | La traza (trace) de stack tecnológico o la información adicional sobre el error.                                                                                                                             |
| `error.resource.url`           | Cadena | La URL del recurso que provocó el error.                                                                                                                                                |
| `resource.url`                 | Cadena | La URL del recurso.                                                                                                                                                                         |
| `long_task.scripts.source_url` | Cadena | La url del recurso de script                                                                                                                                                                   |
| `long_task.scripts.invoker`    | Cadena | Un nombre significativo que indique cómo se ha llamado al script                                                                                                                                    |
| `context`                      | Objeto | Atributos añadidos con la [Global Context API](#global-context), la [View Context API](#view-context) o al generar eventos manualmente (por ejemplo, `addError` y **`addAction`**). |

El SDK del RUM Browser ignora las modificaciones realizadas en las propiedades de eventos no enumeradas anteriormente. Para obtener más información sobre las propiedades de eventos, consulta el [repositorio GitHub del SDK del RUM Browser][15].

**Nota**: A diferencia de otros eventos, los eventos de vista se envían varias veces a Datadog para reflejar las actualizaciones que se producen durante su ciclo de vida. Una actualización de un evento de vista anterior puede seguir enviándose mientras una nueva vista está activa. Datadog recomienda tener en cuenta este comportamiento al modificar el contenido de un evento de vista.

```javascript
beforeSend: (event) => {
    // discouraged, as the current view name could be applied to both the active view and the previous views
    event.view.name = getCurrentViewName()

    // recommended
    event.view.name = getViewNameForUrl(event.view.url)
}
```
### Descartar un evento de RUM

Con la API `beforeSend`, descarta un evento de RUM devolviendo `false`:

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    beforeSend: (event) => {
        if (shouldDiscard(event)) {
            return false
        }
        ...
    },
    ...
});
```
{{% /tab %}}
{{% tab "CDN asíncrono" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        beforeSend: (event) => {
            if (shouldDiscard(event)) {
                return false
            },
            ...
        },
        ...
    })
})
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}
```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        ...,
        beforeSend: (event) => {
            if (shouldDiscard(event)) {
                return false
            }
            ...
        },
        ...
    });
```
{{% /tab %}}
{{< /tabs >}}

**Nota**: Los eventos de vistas no se pueden descartar.

## Sesión del usuario

Añadir información del usuario a tus sesiones de RUM te ayuda a:

* Seguir el recorrido de un usuario concreto
* Conocer qué usuarios se han visto más afectados por los errores
* Monitorizar el rendimiento de tus usuarios más importantes

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="API de usuario en la interfaz de usuario de RUM" >}}

{{< tabs >}}
{{% tab "6.4.0 and above" %}}

Están disponibles los siguientes atributos:

| Atributo  | Tipo | Obligatorio |  Descripción                                                                                              |
|------------|------|------|----------------------------------------------------------------------------------------------------|
| `usr.id`    | Cadena | Sí | Identificador único de usuario.                                                                                  |
| `usr.name`  | Cadena | No | Nombre descriptivo, que se muestra por defecto en la interfaz de usuario de RUM.                                                  |
| `usr.email` | Cadena | No | Correo electrónico del usuario, que se muestra en la interfaz de usuario de RUM si el nombre de usuario no está presente. También se usa para obtener Gravatars. |

{{% /tab %}}
{{% tab "Before 6.4.0" %}}

Los siguientes atributos son opcionales, pero Datadog recomienda encarecidamente proporcionar al menos uno de ellos. Por ejemplo, debes establecer el ID de usuario en tus sesiones para ver los datos relevantes en algunos dashboards predeterminados de RUM, que dependen de `usr.id` como parte de la consulta.

| Atributo  | Tipo | Descripción                                                                                              |
|------------|------|----------------------------------------------------------------------------------------------------|
| `usr.id`    | Cadena | Identificador único de usuario.                                                                                  |
| `usr.name`  | Cadena | Nombre descriptivo, que se muestra por defecto en la interfaz de usuario de RUM.                                                  |
| `usr.email` | Cadena | Correo electrónico del usuario, que se muestra en la interfaz de usuario de RUM si el nombre de usuario no está presente. También se usa para obtener Gravatars. |

{{% /tab %}}
{{< /tabs >}}

Aumentar tus posibilidades de filtrado añadiendo atributos adicionales a los recomendados. Por ejemplo, añade información sobre el plan del usuario o a qué grupo de usuarios pertenece.

Cuando se realizan cambios en el objeto de la sesión del usuario, todos los eventos de RUM recopilados tras el cambio contienen la información actualizada.

**Nota**: Al eliminar la información de la sesión del usuario, como en un cierre de sesión, se conserva la información del usuario en la última vista antes del cierre de sesión, pero no en las vistas posteriores ni en el nivel de sesión, ya que los datos de la sesión utilizan los valores de la última vista.

### Identificar la sesión del usuario

`datadogRum.setUser(<USER_CONFIG_OBJECT>)`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.setUser({
    id: '1234',
    name: 'John Doe',
    email: 'john@doe.com',
    plan: 'premium',
    ...
})
```
{{% /tab %}}
{{% tab "CDN asíncrono" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setUser({
        id: '1234',
        name: 'John Doe',
        email: 'john@doe.com',
        plan: 'premium',
        ...
    })
})
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}
```javascript
window.DD_RUM && window.DD_RUM.setUser({
    id: '1234',
    name: 'John Doe',
    email: 'john@doe.com',
    plan: 'premium',
    ...
})
```

{{% /tab %}}
{{< /tabs >}}

### Acceder a la sesión del usuario

`datadogRum.getUser()`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.getUser()
```
{{% /tab %}}
{{% tab "CDN asíncrono" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.getUser()
})
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}
```javascript
window.DD_RUM && window.DD_RUM.getUser()
```

{{% /tab %}}
{{< /tabs >}}

### Añadir/sustituir la propiedad de la sesión del usuario

`datadogRum.setUserProperty('<USER_KEY>', <USER_VALUE>)`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.setUserProperty('name', 'John Doe')
```
{{% /tab %}}
{{% tab "CDN asíncrono" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setUserProperty('name', 'John Doe')
})
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}
```javascript
window.DD_RUM && window.DD_RUM.setUserProperty('name', 'John Doe')
```

{{% /tab %}}
{{< /tabs >}}

### Eliminar la propiedad de la sesión del usuario

`datadogRum.removeUserProperty('<USER_KEY>')`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.removeUserProperty('name')
```
{{% /tab %}}
{{% tab "CDN asíncrono" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeUserProperty('name')
})
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}
```javascript
window.DD_RUM && window.DD_RUM.removeUserProperty('name')
```
{{% /tab %}}
{{< /tabs >}}

### Borrar la propiedad de la sesión del usuario

`datadogRum.clearUser()`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.clearUser()
```
{{% /tab %}}
{{% tab "CDN asíncrono" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.clearUser()
})
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}
```javascript
window.DD_RUM && window.DD_RUM.clearUser()
```
{{% /tab %}}
{{< /tabs >}}

## Cuenta

Para agrupar a los usuarios en conjuntos diferentes, utiliza el concepto de cuenta.

Están disponibles los siguientes atributos:

| Atributo      | Tipo   | Obligatorio | Descripción                                                |
|----------------|--------|----------|------------------------------------------------------------|
| `account.id`   | Cadena | Sí      | Identificador único de la cuenta.                                 |
| `account.name` | Cadena | No       | Nombre descriptivo de la cuenta, mostrado por defecto en la interfaz de usuario RUM. |

### Identificar cuenta

`datadogRum.setAccount(<ACCOUNT_CONFIG_OBJECT>)`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.setAccount({
    id: '1234',
    name: 'My Company Name',
    ...
})
```
{{% /tab %}}
{{% tab "CDN asíncrono" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setAccount({
        id: '1234',
        name: 'My Company Name',
        ...
    })
})
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}
```javascript
window.DD_RUM && window.DD_RUM.setAccount({
    id: '1234',
    name: 'My Company Name',
    ...
})
```

{{% /tab %}}
{{< /tabs >}}

### Cuenta de acceso

`datadogRum.getAccount()`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.getAccount()
```
{{% /tab %}}
{{% tab "CDN asíncrono" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.getAccount()
})
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}
```javascript
window.DD_RUM && window.DD_RUM.getAccount()
```

{{% /tab %}}
{{< /tabs >}}

### Añadir/Anular propiedad de cuenta

`datadogRum.setAccountProperty('<ACCOUNT_KEY>', <ACCOUNT_VALUE>)`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.setAccountProperty('name', 'My Company Name')
```
{{% /tab %}}
{{% tab "CDN asíncrono" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setAccountProperty('name', 'My Company Name')
})
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}
```javascript
window.DD_RUM && window.DD_RUM.setAccountProperty('name', 'My Company Name')
```

{{% /tab %}}
{{< /tabs >}}

### Eliminar propiedad de cuenta

`datadogRum.removeAccountProperty('<ACCOUNT_KEY>')`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.removeAccountProperty('name')
```
{{% /tab %}}
{{% tab "CDN asíncrono" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeAccountProperty('name')
})
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}
```javascript
window.DD_RUM && window.DD_RUM.removeAccountProperty('name')
```
{{% /tab %}}
{{< /tabs >}}

### Borrar propiedades de cuenta

`datadogRum.clearAccount()`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.clearAccount()
```
{{% /tab %}}
{{% tab "CDN asíncrono" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.clearAccount()
})
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}
```javascript
window.DD_RUM && window.DD_RUM.clearAccount()
```
{{% /tab %}}
{{< /tabs >}}

## Muestreo

Por defecto, no se aplica ningún muestreo al número de sesiones recopiladas. Para aplicar un muestreo relativo (en porcentaje) al número de sesiones recopiladas, utiliza el parámetro `sessionSampleRate` al inicializar el RUM.

El siguiente ejemplo recopila solo el 90 % de las sesiones de una aplicación de RUM determinada:

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    sessionSampleRate: 90,
});
```
{{% /tab %}}
{{% tab "CDN asíncrono" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        site: '<DATADOG_SITE>',
        sessionSampleRate: 90,
    })
})
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}
```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        site: '<DATADOG_SITE>',
        sessionSampleRate: 90,
    });
```
{{% /tab %}}
{{< /tabs >}}

Para una sesión muestreada, no se recopilan todas las páginas de vistas ni la telemetría asociada a esa sesión.

## Consentimiento de rastreo del usuario

Para cumplir con GDPR, CCPA y regulaciones similares, el SDK del RUM Browser te permite proporcionar el valor del consentimiento de rastreo en la inicialización. Para obtener más información sobre el consentimiento de rastreo, consulta [Seguridad de datos][18].

El parámetro de inicialización `trackingConsent` puede ser uno de los siguientes valores:

1. `"granted"`: el SDK del RUM Browser comienza a recopilar datos y los envía a Datadog.
2. `"not-granted"`: el SDK del RUM Browser no recopila ningún dato.

Para cambiar el valor del consentimiento de rastreo después de que el SDK del RUM Browser se inicialice, utiliza la llamada a la API `setTrackingConsent()`. El SDK del RUM Browser cambia su comportamiento de acuerdo con el nuevo valor:

* cuando se cambia de `"granted"` a `"not-granted"`, la sesión de RUM se detiene, los datos ya no se envían a Datadog.
* cuando se cambia de `"not-granted"` a `"granted"`, se crea una nueva sesión de RUM si no hay ninguna sesión anterior activa y se reanuda la recopilación de datos.

Este estado no se sincroniza entre pestañas ni persiste entre navegaciones. Es tu responsabilidad proporcionar la decisión del usuario durante la inicialización del SDK del RUM Browser o mediante el uso de `setTrackingConsent()`.

Cuando se utiliza `setTrackingConsent()` antes que `init()`, el valor proporcionado tiene prioridad sobre el parámetro de inicialización.

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', function() {
    datadogRum.setTrackingConsent('granted');
});
```
{{% /tab %}}
{{% tab "CDN asíncrono" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        trackingConsent: 'not-granted'
    });
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.setTrackingConsent('granted');
    });
});
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}
```javascript
window.DD_RUM && window.DD_RUM.init({
  ...,
  trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_RUM && window.DD_RUM.setTrackingConsent('granted');
});
```
{{% /tab %}}
{{< /tabs >}}

## Ver contexto

A partir de la [versión 5.28.0][20], el contexto de los eventos de vista es modificable. El contexto solo puede añadirse a la vista actual, y rellena sus eventos secundarios (como `action`, `error` y `timing`) con funciones `startView`, `setViewContext` y `setViewContextProperty`.

### Vista inicial con contexto

Opcionalmente, define el contexto al iniciar una vista con [opciones `startView`](#override-default-rum-view-names).

### Añadir contexto de vista

Enriquece o modifica el contexto de los eventos de vista del RUM y los eventos secundarios correspondientes con la API `setViewContextProperty(key: string, value: any)`.

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.setViewContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// Code example
datadogRum.setViewContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{{% /tab %}}
{{% tab "CDN asíncrono" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setViewContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.setViewContextProperty('activity', {
        hasPaid: true,
        amount: 23.42
    });
})
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}
```javascript
window.DD_RUM && window.DD_RUM.setViewContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// Code example
window.DD_RUM && window.DD_RUM.setViewContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{{% /tab %}}
{{< /tabs >}}


### Sustituir el contexto de la vista

Sustituye el contexto de tus eventos de vista del RUM y de los eventos secundarios correspondientes por la API `setViewContext(context: Context)`.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.setViewContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
datadogRum.setViewContext({
    originalUrl: 'shopist.io/department/chairs',
});
```

{{% /tab %}}
{{% tab "CDN asíncrono" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setViewContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.setViewContext({
      originalUrl: 'shopist.io/department/chairs',
    })
})
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.setViewContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
window.DD_RUM &&
    window.DD_RUM.setViewContext({
        originalUrl: 'shopist.io/department/chairs',
    });
```

{{% /tab %}}
{{< /tabs >}}

## Contexto de error

### Adjuntar contexto de error local con dd_context

Al capturar errores, se puede proporcionar contexto adicional en el momento en que se genera un error. En lugar de pasar información adicional a través de la API `addError()`, puedes adjuntar una propiedad `dd_context` directamente a la instancia de error. El SDK del RUM Browser detecta automáticamente esta propiedad y la fusiona en el contexto final del evento de error.

{{< code-block lang="javascript" >}}
const error = new Error('Something went wrong')
error.dd_context = { component: 'Menu', param: 123, }
throw error
{{< /code-block >}}

## Contexto global

### Añadir la propiedad de contexto global

Después de inicializar el RUM, añade contexto adicional a todos los eventos de RUM recopilados de tu aplicación con la API `setGlobalContextProperty(key: string, value: any)`:

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.setGlobalContextProperty('<CONTEXT_KEY>', <CONTEXT_VALUE>);

// Code example
datadogRum.setGlobalContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{{% /tab %}}
{{% tab "CDN asíncrono" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContextProperty('activity', {
        hasPaid: true,
        amount: 23.42
    });
})
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}
```javascript
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// Code example
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{{% /tab %}}
{{< /tabs >}}

### Eliminar la propiedad de contexto global

Puedes eliminar una propiedad de contexto global previamente definida.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.removeGlobalContextProperty('<CONTEXT_KEY>');

// Code example
datadogRum.removeGlobalContextProperty('codeVersion');
```

{{% /tab %}}
{{% tab "CDN asíncrono" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeGlobalContextProperty('<CONTEXT_KEY>');
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeGlobalContextProperty('codeVersion');
})
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.removeGlobalContextProperty('<CONTEXT_KEY>');

// Code example
window.DD_RUM &&
    window.DD_RUM.removeGlobalContextProperty('codeVersion');
```

{{% /tab %}}
{{< /tabs >}}


### Sustituir el contexto global

Sustituye el contexto por defecto de todos tus eventos de RUM con la API `setGlobalContext(context: Context)`.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
datadogRum.setGlobalContext({
    codeVersion: 34,
});
```

{{% /tab %}}
{{% tab "CDN asíncrono" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContext({
        codeVersion: 34,
    })
})
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
window.DD_RUM &&
    window.DD_RUM.setGlobalContext({
        codeVersion: 34,
    });
```

{{% /tab %}}
{{< /tabs >}}

### Borrar un contexto global

Puedes borrar el contexto global utilizando `clearGlobalContext`.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.clearGlobalContext();
```

{{% /tab %}}
{{% tab "CDN asíncrono" %}}
```javascript
window.DD_RUM.onReady(function() {
  window.DD_RUM.clearGlobalContext();
});
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}

```javascript
window.DD_RUM && window.DD_RUM.clearGlobalContext();
```

{{% /tab %}}
{{< /tabs >}}

### Leer el contexto global

Una vez inicializado el RUM, lee el contexto global con la API `getGlobalContext()`.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

const context = datadogRum.getGlobalContext();
```

{{% /tab %}}
{{% tab "CDN asíncrono" %}}
```javascript
window.DD_RUM.onReady(function() {
  const context = window.DD_RUM.getGlobalContext();
});
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}

```javascript
const context = window.DD_RUM && window.DD_RUM.getGlobalContext();
```

{{% /tab %}}
{{< /tabs >}}

## Ciclo de vida de los contextos

Por defecto, el contexto global y el contexto de usuario se almacenan en la memoria de la página actual, lo que significa que:

- no se mantienen tras una recarga completa de la página
- no se comparten entre diferentes pestañas ni ventanas de la misma sesión

Para añadirlas a todos los eventos de la sesión, deben adjuntarse a cada página.

Con la introducción de la opción de configuración de `storeContextsAcrossPages` en la v4.49.0 del SDK del navegador, esos contextos pueden almacenarse en [`localStorage`][19], lo cual permite los siguientes comportamientos:

- Los contextos se conservan tras una recarga completa.
- Los contextos se sincronizan entre pestañas abiertas en el mismo origen.

Sin embargo, esta función tiene algunas **limitaciones**:

- No se recomienda configurar información de identificación personal (PII) en estos contextos, ya que los datos almacenados en `localStorage` perduran más allá de la sesión del usuario.
- La función no es compatible con las opciones de `trackSessionAcrossSubdomains` porque los datos de `localStorage` solo se comparten entre el mismo origen (login.site.com ≠ app.site.com)
- `localStorage` está limitado a 5 MiB por origen, por lo que los datos específicos de la aplicación, los contextos de Datadog y otros datos de terceros almacenados en la memoria local deben estar dentro de este límite para evitar problemas.

## Micro frontend

A partir de la versión 5.22, el SDK del navegador RUM admite arquitecturas micro frontend. El mecanismo se basa en trazas del stack tecnológico. Para utilizarlo, debes poder extraer servicios y propiedades de versiones de las rutas y nombres de archivo de tu aplicación.

### Cómo utilizarlo

En la propiedad `beforeSend`, puede anular las propiedades servicio y version. Para ayuda identificar dónde se originó el evento, utilice la propiedad `context.handlingStack`.

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
import { datadogRum } from '@datadog/browser-rum';

const SERVICE_REGEX = /some-pathname\/(?<service>\w+)\/(?<version>\w+)\//;

datadogRum.init({
    ...,
    beforeSend: (event, context) => {
        const stack = context?.handlingStack || event?.error?.stack;
        const { service, version } = stack?.match(SERVICE_REGEX)?.groups;

        if (service && version) {
          event.service = service;
          event.version = version;
        }

        return true;
    },
});
```
{{% /tab %}}
{{% tab "CDN asíncrono" %}}
```javascript
const SERVICE_REGEX = /some-pathname\/(?<service>\w+)\/(?<version>\w+)\//;

window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        beforeSend: (event, context) => {
            const stack = context?.handlingStack || event?.error?.stack;
            const { service, version } = stack?.match(SERVICE_REGEX)?.groups;

            if (service && version) {
                event.service = service;
                event.version = version;
            }

            return true;
        },
    });
});
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}
```javascript
const SERVICE_REGEX = /some-pathname\/(?<service>\w+)\/(?<version>\w+)\//;

window.DD_RUM && window.DD_RUM.init({
    ...,
    beforeSend: (event, context) => {
        const stack = context?.handlingStack || event?.error?.stack;
        const { service, version } = stack?.match(SERVICE_REGEX)?.groups;

        if (service && version) {
          event.service = service;
          event.version = version;
        }

        return true;
    },
});
```
{{% /tab %}}
{{< /tabs >}}

Cualquier consulta realizada en el Explorador RUM puede utilizar el atributo servicio para filtrar eventos.

### Limitaciones

Algunos eventos no pueden atribuirse a un origen, por lo que no tienen una pila de manipulación asociada. Esto incluye:
- Acción eventos recogida automáticamente
- Eventos de recursos distintos de XHR y Fetch.
- Ver eventos (pero en su lugar puedes [sobrescribir los nombres de vistas de RUM predeterminados][21])
- Violaciones de CORS y CSP

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/browser/data_collected/
[2]: /es/real_user_monitoring/browser/monitoring_page_performance/
[3]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2170
[4]: /es/real_user_monitoring/browser/setup/
[5]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2130
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Location
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Event
[8]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[9]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[10]: https://developer.mozilla.org/en-US/docs/Web/API/Request
[11]: https://developer.mozilla.org/en-US/docs/Web/API/Response
[12]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[13]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming
[14]: /es/real_user_monitoring/guide/enrich-and-control-rum-data
[15]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum-core/src/rumEvent.types.ts
[16]: /es/logs/log_configuration/attributes_naming_convention/#user-related-attributes
[17]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v4130
[18]: /es/data_security/real_user_monitoring/#browser-rum-use-of-cookies
[19]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[20]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v5280
[21]: /es/real_user_monitoring/browser/advanced_configuration#override-default-rum-view-names