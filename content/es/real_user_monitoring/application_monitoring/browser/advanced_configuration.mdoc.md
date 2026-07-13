---
aliases:
- /es/real_user_monitoring/installation/advanced_configuration/
- /es/real_user_monitoring/browser/modifying_data_and_context/
- /es/real_user_monitoring/browser/advanced_configuration/
content_filters:
- option_group_id: rum_browser_sdk_source_options
  trait_id: lib_src
- option_group_id: rum_browser_sdk_version_for_advanced_config_options
  trait_id: rum_browser_sdk_version
description: Configura el SDK del navegador RUM para modificar la recolección de datos,
  sobrescribir nombres de visualizaciones, gestionar sesiones de usuario y controlar
  el muestreo según las necesidades de tu aplicación.
further_reading:
- link: /real_user_monitoring/application_monitoring/browser/tracking_user_actions
  tag: Documentación
  text: Seguimiento de acciones de usuario
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Real User Monitoring
- link: /real_user_monitoring/application_monitoring/browser/data_collected/
  tag: Documentación
  text: Datos del navegador RUM recolectados
- link: /real_user_monitoring/explorer/
  tag: Documentación
  text: Explora tus visualizaciones dentro de Datadog
- link: /real_user_monitoring/explorer/visualize/
  tag: Documentación
  text: Aplica visualizaciones a tus eventos
- link: /logs/log_configuration/attributes_naming_convention
  tag: Documentación
  text: Atributos estándar de Datadog
- link: https://learn.datadoghq.com/courses/configure-rum-javascript
  tag: Centro de aprendizaje
  text: Configura Real User Monitoring (RUM) para aplicaciones web en JavaScript
title: Configuración avanzada
---
## Resumen {% #overview %}

Existen varias formas en las que puedes modificar los [datos y contexto recolectados][1] por RUM, para apoyar tus necesidades de:

- Proteger datos sensibles como información personal identificable.
- Conectar una sesión de usuario con tu identificación interna de ese usuario, para ayudar con el soporte.
- Reducir la cantidad de datos RUM que estás recolectando, a través del muestreo de datos.
- Proporcionar más contexto del que ofrecen los atributos predeterminados sobre el origen de los datos.

<!-- Version must meet 2.17.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "2.17.0") %}

## Sobrescribir nombres de visualizaciones RUM predeterminados {% #override-default-rum-view-names %}

A partir de [versión 2.17.0][3], puedes agregar nombres de visualizaciones y asignarlos a un servicio dedicado perteneciente a un equipo al rastrear eventos de visualización manualmente con la opción `trackViewsManually`.

El SDK del navegador RUM genera automáticamente un [evento de visualización][2] para cada nueva página visitada por tus usuarios, o cuando se cambia la URL de la página (para aplicaciones de una sola página). Un nombre de visualización se calcula a partir de la URL de la página actual, donde los ID de variable se eliminan automáticamente. Un segmento de ruta que contiene al menos un número se considera un ID de variable. Por ejemplo, `/dashboard/1234` y `/dashboard/9a` se convierten en `/dashboard/?`.

Para sobrescribir los nombres de visualización RUM predeterminados:

1. Establece `trackViewsManually` en verdadero al inicializar el SDK del navegador RUM.

   <!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.init({
         ...,
         trackViewsManually: true,
         ...
   });
   ```
   {% /if %}
   <!-- ends NPM sync -->

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   window.DD_RUM.onReady(function() {
         window.DD_RUM.init({
            ...,
            trackViewsManually: true,
            ...
         })
   })
   ```
   {% /if %}
   <!-- ends CDN async -->

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   window.DD_RUM &&
         window.DD_RUM.init({
            ...,
            trackViewsManually: true,
            ...
         });
   ```
   {% /if %}
   <!-- ends CDN sync -->
2. Debes iniciar visualizaciones para cada nueva página o cambio de ruta (para aplicaciones de una sola página). Los datos RUM se recopilan cuando la visualización comienza.
{% /if %}
<!-- Ends 2.17.0 -->


<!-- Version must meet 4.13.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "4.13.0") %}

### Define el nombre del servicio y la versión {% #define-service-name-and-version %}

A partir de [versión 4.13.0][16], también puedes definir opcionalmente el nombre del servicio asociado y la versión.

- **Nombre de visualización**: Por defecto, es la ruta de la URL de la página.
- **Servicio**: Por defecto, es el servicio predeterminado especificado al crear tu aplicación RUM.
- **Versión**: Por defecto, es la versión predeterminada especificada al crear tu aplicación RUM.
{% /if %}
<!-- ends 4.13.0 -->

<!-- version exclusive examples below-->

<!-- before 4.13 -->
{% if includes($rum_browser_sdk_version, ["lt_2_13_0", "gte_2_13_0", "gte_2_17_0"]) %}

## Hacer seguimiento manual de las visualizaciones de página {% #manually-track-pageviews %}

El siguiente ejemplo hace seguimiento manual de las visualizaciones de página en la página `checkout` en una aplicación RUM. No se puede especificar ningún servicio o versión.

<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.startView('checkout')
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
        window.DD_RUM.startView('checkout')
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.startView('checkout')
```
{% /if %}
{% /if %}
<!-- ends before 4.13 -->

<!-- Between 4.13 and 5.28 -->
{% if includes($rum_browser_sdk_version, ["gte_4_13_0", "gte_4_49_0", "gte_5_22_0"]) %}

El siguiente ejemplo hace seguimiento manual de las visualizaciones de página en la página `checkout` en una aplicación RUM. Utiliza `checkout` para el nombre de la visualización y asocia el servicio `purchase` con la versión `1.2.3`.

<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.startView({
  name: 'checkout',
  service: 'purchase',
  version: '1.2.3'
})
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
  window.DD_RUM.startView({
    name: 'checkout',
    service: 'purchase',
    version: '1.2.3'
  })
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.startView({
  name: 'checkout',
  service: 'purchase',
  version: '1.2.3'
})
```
{% /if %}
{% /if %}
<!-- ends before 5.28 -->
<!-- ends version exclusive examples -->

<!-- Version must meet 5.28.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "5.28.0") %}

- **Contexto**: A partir de [versión 5.28.0][19], puedes agregar contexto a las vistas y los eventos secundarios de las vistas.

El siguiente ejemplo hace seguimiento manual de las visualizaciones de página en la página `checkout` en una aplicación RUM. Usa `checkout` para el nombre de la visualización y asocia el servicio `purchase` con la versión `1.2.3`.

   <!-- NPM -->
   {% if equals($lib_src, "npm") %}
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
   {% /if %}
   <!-- ends NPM -->

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
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
   {% /if %}
   <!-- ends CDN async  -->

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
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
   {% /if %}
   <!-- ends CDN sync -->
{% /if %}
<!-- ends 5.28.0 -->

<!-- Version must meet 2.17.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "2.17.0") %}

### Instrumentación del enrutador de React {% #react-router-instrumentation %}

Si estás utilizando React, Angular, Vue o cualquier otro marco de frontend, Datadog recomienda implementar la lógica `startView` a nivel del enrutador del marco.

Para sobrescribir los nombres de visualización predeterminados de RUM de modo que se alineen con la forma en que los has definido en tu aplicación de React, necesitas seguir los pasos a continuación.

**Nota**: Estas instrucciones son específicas para la biblioteca **React Router v6**.

1. Establece `trackViewsManually` en `true` al inicializar el SDK del navegador RUM como se describe [arriba](#override-default-rum-view-names).

2. Inicia visualizaciones para cada cambio de ruta.
   <!-- NPM -->
   {% if equals($lib_src, "npm") %}
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
   {% /if %}

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
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
   {% /if %}

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
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
   {% /if %}
{% /if %}
<!-- Ends 2.17.0 -->

<!-- Version must meet 2.17.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "2.17.0") %}
### Establece el nombre de la visualización {% #set-view-name %}

Usa `setViewName(name: string)` para actualizar el nombre de la visualización actual. Esto te permite cambiar el nombre de la visualización durante la misma sin iniciar una nueva.
   <!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.setViewName('<VIEW_NAME>');

   // Code example
   datadogRum.setViewName('Checkout');
   ```
   {% /if %}

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   window.DD_RUM.onReady(function() {
      window.DD_RUM.setViewName('<VIEW_NAME>');
   })

   // Code example
   window.DD_RUM.onReady(function() {
      window.DD_RUM.setViewName('Checkout');
   })
   ```
   {% /if %}

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   window.DD_RUM && window.DD_RUM.setViewName('<VIEW_NAME>');

   // Code example
   window.DD_RUM && window.DD_RUM.setViewName('Checkout');
   ```
   {% /if %}

**Nota**: Cambiar el nombre de la visualización afecta a esta y a sus eventos secundarios desde el momento en que se llama al método.
{% /if %}
<!-- Ends 2.17.0 -->

Para más información, consulta [Configuración de Monitoreo del Navegador][4].


## Enriquecer y controlar los datos de RUM {% #enrich-and-control-rum-data %}

El SDK del navegador RUM captura eventos de RUM y completa sus atributos principales. La función de callback `beforeSend` te da acceso a cada evento recopilado por el SDK del navegador RUM antes de que sea enviado a Datadog.

Interceptar los eventos de RUM te permite:

- Enriquecer tus eventos de RUM con atributos de contexto adicionales
- Modificar tus eventos de RUM para alterar su contenido o redactar secuencias sensibles (ver [lista de propiedades editables](#modify-the-content-of-a-rum-event))
- Descartar eventos RUM seleccionados

<!-- Version must meet 2.13.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "2.13.0") %}
A partir de [versión 2.13.0][5], `beforeSend` toma dos argumentos: el `event` generado por el SDK del navegador RUM y el `context` que activó la creación del evento RUM.

```javascript
function beforeSend(event, context)
```

Los posibles valores de `context` son:

| Tipo de evento RUM   | Contexto                   |
|------------------|---------------------------|
| Visualización             | [Ubicación][6]                  |
| Acción           | [Evento][7] y pila de manejo                     |
| Recurso (XHR)   | [XMLHttpRequest][8], [PerformanceResourceTiming][9], y pila de manejo            |
| Recurso (Fetch) | [Solicitud][10], [Respuesta][11], [PerformanceResourceTiming][9], y pila de manejo      |
| Recurso (Otro) | [PerformanceResourceTiming][9] |
| Error            | [Error][12]                     |
| Tarea Larga        | [PerformanceLongTaskTiming][13] |

Para más información, consulte la [guía de enriquecimiento y control de datos RUM][14].
{% /if %}
<!-- ends 2.13.0 -->

### Enriquecer eventos RUM {% #enrich-rum-events %}

Junto con los atributos añadidos con el [API de Contexto Global](#global-context) o la [recolección de datos de Feature Flag](#enrich-rum-events-with-feature-flags), puedes agregar atributos de contexto adicionales al evento. Por ejemplo, etiqueta tus eventos de recursos RUM con datos extraídos de un objeto de respuesta de fetch:
<!-- NPM -->
   {% if equals($lib_src, "npm") %}
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
   {% /if %}

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
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
   {% /if %}

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
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
   {% /if %}

Si un usuario pertenece a múltiples equipos, agrega pares clave-valor adicionales en tus llamadas a la API de Contexto Global.

El SDK del navegador RUM ignora los atributos añadidos fuera de `event.context`.

### Enriquecer eventos RUM con Feature Flags {% #enrich-rum-events-with-feature-flags %}

Puedes [enriquecer los datos de eventos RUM con Feature Flags][14] para obtener contexto adicional y visibilidad en el seguimiento del rendimiento. Esto te permite determinar qué usuarios ven una experiencia específica y si está afectando negativamente el rendimiento del usuario.

### Modifica el contenido de un evento RUM {% #modify-the-content-of-a-rum-event %}

Por ejemplo, para ocultar direcciones de correo electrónico en las URL de tu aplicación web:
<!-- NPM -->
   {% if equals($lib_src, "npm") %}
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
   {% /if %}

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
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
   {% /if %}

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
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
   {% /if %}

Puedes actualizar las siguientes propiedades del evento:

| Atributo                      | Tipo   | Descripción                                                                                                                                                                               |
| ------------------------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `view.url`                     | Cadena | La URL de la página web activa.                                                                                                                                                           |
| `view.referrer`                | Cadena | La URL de la página web anterior desde la cual se siguió un enlace a la página solicitada actualmente.                                                                                          |
| `view.name`                    | Cadena | El nombre de la vista actual.                                                                                                                                                             |
| `view.performance.lcp.resource_url` | Cadena |   La URL del recurso para el Mayor Pintado de Contenido.                                                                                                                                 |
| `service`                      | Cadena | El nombre del servicio para tu aplicación.                                                                                                                                                    |
| `version`                      | Cadena | La versión de la aplicación. Por ejemplo: 1.2.3, 6c44da20, o 2020.02.13.                                                                                                                  |
| `action.target.name`           | Cadena | El elemento con el que el usuario interactuó. Solo para acciones recolectadas automáticamente.                                                                                                      |
| `error.message`                | Cadena | Un mensaje conciso, legible por humanos, de una línea que explica el error.                                                                                                                         |
| `error.stack`                 | Cadena | La traza de pila o información complementaria sobre el error.                                                                                                                             |
| `error.resource.url`           | Cadena | La URL del recurso que provocó el error.                                                                                                                                                |
| `resource.url`                 | Cadena | La URL del recurso.                                                                                                                                                                         |
| `long_task.scripts.source_url` | Cadena | La URL del recurso del script                                                                                                                                                                   |
| `long_task.scripts.invoker`    | Cadena | Un nombre significativo que indica cómo se llamó al script                                                                                                                                    |
| `context`                      | Objeto | Atributos añadidos con la [API de Contexto Global](#global-context), la [API de Contexto de Vista](#view-context), o al generar eventos manualmente (por ejemplo, `addError` y **`addAction`**). |

El SDK del Navegador RUM ignora las modificaciones realizadas a las propiedades de eventos no listadas anteriormente. Para más información sobre las propiedades de eventos, consulte el [repositorio de GitHub del SDK del Navegador RUM][15].

**Nota**: A diferencia de otros eventos, los eventos de vista se envían múltiples veces a Datadog para reflejar las actualizaciones que ocurren durante su ciclo de vida. Una actualización de un evento de vista anterior aún puede ser enviada mientras una nueva vista está activa. Datadog recomienda tener en cuenta este comportamiento al modificar el contenido de un evento de vista.

```javascript
beforeSend: (event) => {
    // discouraged, as the current view name could be applied to both the active view and the previous views
    event.view.name = getCurrentViewName()

    // recommended
    event.view.name = getViewNameForUrl(event.view.url)
}
```

### Descartar un evento RUM {% #discard-a-rum-event %}

Con la `beforeSend` API, descarta un evento RUM devolviendo `false`:
<!-- NPM -->
{% if equals($lib_src, "npm") %}

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
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

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
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

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
{% /if %}

**Nota**: No se pueden descartar los eventos de vista.

## Sesión de usuario {% #user-session %}

Agregar información del usuario a tus sesiones de RUM te ayuda a:

- Seguir el recorrido de un usuario determinado
- Conocer qué usuarios son los más afectados por errores
- Monitorear el rendimiento de tus usuarios más importantes

{% img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="API de usuario en la interfaz de RUM" /%}

<!-- Version must meet 6.4.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "6.4.0") %}
En las versiones 6.4.0 y superiores, los siguientes atributos están disponibles:

| Atributo  | Tipo | Requerido |  Descripción                                                                                              |
|------------|------|------|----------------------------------------------------------------------------------------------------|
| `usr.id`    | Cadena | Sí | Identificador único del usuario.                                                                                  |
| `usr.name`  | Cadena | No | Nombre amigable del usuario, mostrado por defecto en la interfaz de RUM.                                                  |
| `usr.email` | Cadena | No | Correo electrónico del usuario, mostrado en la interfaz de RUM si el nombre del usuario no está presente. También se utiliza para obtener Gravatars. |
{% /if %}
<!-- ends  6.4.0 -->

<!-- Version must not meet 6.4.0 -->
{% if not(semverIsAtLeast($rum_browser_sdk_version, "6.4.0")) %}
Los atributos a continuación son opcionales en versiones anteriores a 6.4.0, pero Datadog recomienda encarecidamente proporcionar al menos uno de ellos. Por ejemplo, debes establecer el ID del usuario en tus sesiones para ver datos relevantes en algunos paneles de RUM predeterminados, que dependen de `usr.id` como parte de la consulta.

| Atributo  | Tipo | Descripción                                                                                              |
|------------|------|----------------------------------------------------------------------------------------------------|
| `usr.id`    | Cadena | Identificador único del usuario.                                                                                  |
| `usr.name`  | Cadena | Nombre amigable del usuario, mostrado por defecto en la interfaz de usuario de RUM.                                                  |
| `usr.email` | Cadena | Correo electrónico del usuario, mostrado en la interfaz de usuario de RUM si el nombre de usuario no está presente. También se utiliza para obtener Gravatars. |

**Nota**: 'Usuario Público' se muestra en la interfaz de usuario de RUM cuando `usr.name` no está configurado, incluso si `usr.email` y `usr.id` están definidos.

Aumenta tus capacidades de filtrado agregando atributos adicionales además de los recomendados. Por ejemplo, agrega información sobre el plan del usuario o a qué grupo de usuarios pertenecen.

Al realizar cambios en el objeto de sesión del usuario, todos los eventos de RUM recopilados después del cambio contienen la información actualizada.

**Nota**: Eliminar la información de la sesión del usuario, como en un cierre de sesión, retiene la información del usuario en la última vista antes del cierre de sesión, pero no en vistas posteriores o a nivel de sesión, ya que los datos de la sesión utilizan los valores de la última vista.
{% /if %}
<!-- ends not 6.4.0 -->

### Identificar sesión de usuario {% #identify-user-session %}

`datadogRum.setUser(<USER_CONFIG_OBJECT>)`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.setUser({
    id: '1234',
    name: 'John Doe',
    email: 'john@doe.com',
    plan: 'premium',
    ...
})
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

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
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.setUser({
    id: '1234',
    name: 'John Doe',
    email: 'john@doe.com',
    plan: 'premium',
    ...
})
```
{% /if %}

### Acceder a la sesión de usuario {% #access-user-session %}

`datadogRum.getUser()`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.getUser()
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.getUser()
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.getUser()
```
{% /if %}

### Agregar/Sobrescribir propiedad de sesión de usuario {% #addoverride-user-session-property %}

`datadogRum.setUserProperty('<USER_KEY>', <USER_VALUE>)`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.setUserProperty('name', 'John Doe')
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setUserProperty('name', 'John Doe')
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.setUserProperty('name', 'John Doe')
```
{% /if %}

### Eliminar propiedad de sesión de usuario {% #remove-user-session-property %}

`datadogRum.removeUserProperty('<USER_KEY>')`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.removeUserProperty('name')
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeUserProperty('name')
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.removeUserProperty('name')
```
{% /if %}

### Limpiar propiedad de sesión de usuario {% #clear-user-session-property %}

`datadogRum.clearUser()`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.clearUser()
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.clearUser()
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.clearUser()
```
{% /if %}

## Cuenta {% #account %}

Para agrupar usuarios en diferentes conjuntos, utiliza el concepto de cuenta.

Los siguientes atributos están disponibles:

| Atributo      | Tipo   | Requerido | Descripción                                                |
|----------------|--------|----------|------------------------------------------------------------|
| `account.id`   | Cadena | Sí      | Identificador único de cuenta.                                 |
| `account.name` | Cadena | No       | Nombre amigable de la cuenta, mostrado por defecto en la interfaz de usuario de RUM. |

### Identificar cuenta {% #identify-account %}

`datadogRum.setAccount(<ACCOUNT_CONFIG_OBJECT>)`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.setAccount({
    id: '1234',
    name: 'My Company Name',
    ...
})
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setAccount({
        id: '1234',
        name: 'My Company Name',
        ...
    })
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.setAccount({
    id: '1234',
    name: 'My Company Name',
    ...
})
```
{% /if %}

### Acceder a la cuenta {% #access-account %}

`datadogRum.getAccount()`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.getAccount()
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.getAccount()
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.getAccount()
```
{% /if %}

### Agregar/Sobrescribir propiedad de la cuenta {% #addoverride-account-property %}

`datadogRum.setAccountProperty('<ACCOUNT_KEY>', <ACCOUNT_VALUE>)`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.setAccountProperty('name', 'My Company Name')
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setAccountProperty('name', 'My Company Name')
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.setAccountProperty('name', 'My Company Name')
```
{% /if %}

### Eliminar propiedad de la cuenta {% #remove-account-property %}

`datadogRum.removeAccountProperty('<ACCOUNT_KEY>')`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.removeAccountProperty('name')
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeAccountProperty('name')
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.removeAccountProperty('name')
```
{% /if %}

### Limpiar propiedades de la cuenta {% #clear-account-properties %}

`datadogRum.clearAccount()`
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
datadogRum.clearAccount()
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.clearAccount()
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.clearAccount()
```
{% /if %}

## Muestreo {% #sampling %}

Por defecto, no se aplica muestreo en el número de sesiones recolectadas. Para aplicar un muestreo relativo (en porcentaje) al número de sesiones recolectadas, utiliza el parámetro `sessionSampleRate` al inicializar RUM.

El siguiente ejemplo recolecta solo el 90% de todas las sesiones en una aplicación RUM dada:
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    sessionSampleRate: 90,
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

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
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        site: '<DATADOG_SITE>',
        sessionSampleRate: 90,
    });
```
{% /if %}

Para una sesión excluida por muestreo, no se recolectan ninguna de las vistas de página ni la telemetría asociada a esa sesión.

## Consentimiento de seguimiento de usuario {% #user-tracking-consent %}

Para cumplir con GDPR, CCPA y regulaciones similares, el SDK del navegador RUM te permite proporcionar el valor de consentimiento de seguimiento al inicializar. Para más información sobre el consentimiento de seguimiento, consulta [Seguridad de Datos][17].

El parámetro de inicialización `trackingConsent` puede ser uno de los siguientes valores:

1. `"granted"` (por defecto): El SDK del navegador RUM comienza a recolectar datos y los envía a Datadog.
2. `"not-granted"`: El SDK del navegador RUM no recolecta ningún dato.

Para cambiar el valor de consentimiento de seguimiento después de que se inicializa el SDK del navegador RUM, utiliza la llamada a la API `setTrackingConsent()`. El SDK del navegador RUM cambia su comportamiento de acuerdo con el nuevo valor:

- cuando se cambia de `"granted"` a `"not-granted"`, la sesión RUM se detiene, y los datos ya no se envían a Datadog.
- cuando se cambia de `"not-granted"` a `"granted"`, se crea una nueva sesión RUM si no hay una sesión anterior activa, y la recolección de datos se reanuda.

Este estado no se sincroniza entre pestañas ni se persiste entre navegaciones. Es tu responsabilidad proporcionar la decisión del usuario durante la inicialización del SDK del navegador RUM o utilizando `setTrackingConsent()`.

Cuando se utiliza `setTrackingConsent()` antes de `init()`, el valor proporcionado tiene prioridad sobre el parámetro de inicialización.
<!-- NPM -->
{% if equals($lib_src, "npm") %}

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
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

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
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.init({
  ...,
  trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_RUM && window.DD_RUM.setTrackingConsent('granted');
});
```
{% /if %}

## Contexto de visualización {% #view-context %}


A partir de [versión 5.28.0][20], el contexto de los eventos de visualización es modificable. El contexto solo se puede agregar a la visualización actual y propaga sus eventos hijos (como `action`, `error` y `timing`) con las funciones `startView`, `setViewContext` y `setViewContextProperty`.

### Iniciar visualización con contexto {% #start-view-with-context %}

Opcionalmente, define el contexto al iniciar una visualización con las opciones [`startView`](#override-default-rum-view-names).

### Agregar contexto de visualización {% #add-view-context %}

Enriquece o modifica el contexto de los eventos de visualización RUM y los eventos hijos correspondientes con la API `setViewContextProperty(key: string, value: any)`.
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.setViewContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// Code example
datadogRum.setViewContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

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
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.setViewContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// Code example
window.DD_RUM && window.DD_RUM.setViewContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{% /if %}

### Reemplazar contexto de visualización {% #replace-view-context %}

Reemplaza el contexto de tus eventos de visualización RUM y los eventos hijos correspondientes con la API `setViewContext(context: Context)`.
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.setViewContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
datadogRum.setViewContext({
    originalUrl: 'shopist.io/department/chairs',
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

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
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM &&
    window.DD_RUM.setViewContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
window.DD_RUM &&
    window.DD_RUM.setViewContext({
        originalUrl: 'shopist.io/department/chairs',
    });
```
{% /if %}

## Contexto de error {% #error-context %}

### Adjuntando contexto de error local con dd_context {% #attaching-local-error-context-with-dd-context %}

Al capturar errores, se puede proporcionar contexto adicional en el momento en que se genera un error. En lugar de pasar información extra a través de la API `addError()`, puedes adjuntar una propiedad `dd_context` directamente a la instancia de error. El SDK de RUM para navegadores detecta automáticamente esta propiedad y la incorpora al contexto final del evento de error.

```javascript
const error = new Error('Something went wrong')
error.dd_context = { component: 'Menu', param: 123, }
throw error
```

## Contexto global {% #global-context %}

### Agregar propiedad de contexto global {% #add-global-context-property %}

Después de que se inicializa RUM, agrega contexto adicional a todos los eventos de RUM recopilados de tu aplicación con la API `setGlobalContextProperty(key: string, value: any)`:
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.setGlobalContextProperty('<CONTEXT_KEY>', <CONTEXT_VALUE>);

// Code example
datadogRum.setGlobalContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```

{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

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
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// Code example
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{% /if %}

### Eliminar propiedad de contexto global {% #remove-global-context-property %}

Puedes eliminar una propiedad de contexto global definida previamente.
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.removeGlobalContextProperty('<CONTEXT_KEY>');

// Code example
datadogRum.removeGlobalContextProperty('codeVersion');
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeGlobalContextProperty('<CONTEXT_KEY>');
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeGlobalContextProperty('codeVersion');
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM &&
    window.DD_RUM.removeGlobalContextProperty('<CONTEXT_KEY>');

// Code example
window.DD_RUM &&
    window.DD_RUM.removeGlobalContextProperty('codeVersion');
```
{% /if %}

### Reemplazar contexto global {% #replace-global-context %}

Reemplaza el contexto predeterminado para todos tus eventos de RUM con la API `setGlobalContext(context: Context)`.
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
datadogRum.setGlobalContext({
    codeVersion: 34,
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

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
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM &&
    window.DD_RUM.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
window.DD_RUM &&
    window.DD_RUM.setGlobalContext({
        codeVersion: 34,
    });
```
{% /if %}

### Limpiar contexto global {% #clear-global-context %}

Puedes limpiar el contexto global utilizando `clearGlobalContext`.
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.clearGlobalContext();
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
  window.DD_RUM.clearGlobalContext();
});
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.clearGlobalContext();
```
{% /if %}

### Leer contexto global {% #read-global-context %}

Una vez que se inicializa RUM, lee el contexto global con la API `getGlobalContext()`.
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

const context = datadogRum.getGlobalContext();
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
  const context = window.DD_RUM.getGlobalContext();
});
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
const context = window.DD_RUM && window.DD_RUM.getGlobalContext();
```
{% /if %}

## Ciclo de vida de los contextos {% #contexts-life-cycle %}

Por defecto, el contexto global y el contexto del usuario se almacenan en la memoria de la página actual, lo que significa que no están:

- guardados después de una recarga completa de la página
- compartidos entre diferentes pestañas o ventanas de la misma sesión

Para agregarlos a todos los eventos de la sesión, deben estar adjuntos a cada página.

<!-- Version must meet 4.49.0 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "4.49.0") %}
Con la introducción de la opción de configuración `storeContextsAcrossPages` en la versión 4.49.0, esos contextos pueden ser almacenados en [`localStorage`][18], permitiendo los siguientes comportamientos:

- Los contextos se preservan después de una recarga completa
- Los contextos se sincronizan entre pestañas abiertas en el mismo origen

Sin embargo, esta función tiene algunas **limitaciones**:

- No se recomienda establecer Información Personalmente Identificable (PII) en esos contextos, ya que los datos almacenados en `localStorage` sobreviven a la sesión del usuario.
- La función es incompatible con las `trackSessionAcrossSubdomains` opciones porque `localStorage` los datos solo se comparten entre el mismo origen (login.site.com ≠ app.site.com).
- `localStorage` está limitada a 5 MiB por origen, por lo que los datos específicos de la aplicación, los contextos de Datadog y otros datos de terceros almacenados localmente deben estar dentro de este límite para evitar problemas.

{% /if %}
<!-- ends  4.49.0 -->

## Contexto interno {% #internal-context %}

Después de que se inicializa el SDK de RUM para navegadores de Datadog, puedes acceder al contexto interno del SDK. Esto proporciona identificadores centrales y metadatos que el SDK utiliza internamente, como IDs de sesión y detalles de la aplicación.

Puedes explorar los siguientes atributos:

| Atributo      | Descripción                                                       |
| -------------- | ----------------------------------------------------------------- |
| application_id | ID de la aplicación.                                            |
| session_id     | ID de la sesión.                                                |
| user_action    | Objeto que contiene el ID de acción (o indefinido si no se encuentra ninguna acción). |
| view           | Objeto que contiene detalles sobre el evento de visualización actual.           |

Para más información, consulta [Datos recopilados por RUM en el navegador][2].

### Ejemplo {% #example %}

```json
{
  application_id : "xxx",
  session_id : "xxx",
  user_action: { id: "xxx" },
  view : {
    id : "xxx",
    referrer : "",
    url: "http://localhost:8080/",
    name: "homepage"
  }
}
```

Puedes usar opcionalmente el `startTime` parámetro para obtener el contexto de un momento específico. Si se omite el parámetro, se devuelve el contexto actual.

```typescript
getInternalContext (startTime?: 'number' | undefined)
```
<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function () {
  window.DD_RUM.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
```
{% /if %}


## Micro frontend {% #micro-frontend %}

El SDK de RUM del navegador admite arquitecturas de micro frontend al atribuir eventos a micro frontends específicos utilizando los atributos `service` y `version`. Una sola instancia del SDK de RUM se ejecuta a nivel de shell. Los eventos se segmentan por `service` y `version` para que los equipos puedan filtrar tableros, establecer alertas y rastrear el rendimiento por micro frontend.

Datadog proporciona dos enfoques para atribuir eventos de RUM a micro frontends:

1. **Atribución automática**: Utiliza un complemento de construcción que inyecta contexto de código fuente, eliminando el análisis manual de la traza de pila.
2. **Atribución manual**: Utiliza el `beforeSend` callback para analizar trazas de pila y extraer información del servicio.


### Atribución automática de servicio y versión {% #automatic-service-and-version-attribution %}

Este enfoque utiliza un complemento de construcción para inyectar contexto de código fuente en sus paquetes, que el SDK de RUM lee automáticamente para enriquecer eventos con el `service` y `version` correctos.

#### Requisitos previos y configuraciones soportadas {% #prerequisites-and-supported-setups %}

-   **Paquetes separados**: Cada micro frontend tiene su propio paquete con rutas de archivo distintas, por ejemplo, utilizando [federación de módulos][21].
-   **Bundler soportado**: Utilice un bundler [soportado por los complementos de construcción de Datadog][22].
-   **SDK de navegador**: Versión del SDK de navegador v6.30.1 o superior.

#### Guía de configuración {% #setup-guide %}

**Paso 1 - Configure el [complemento de construcción][23] para cada micro frontend**

En la configuración de construcción de cada micro frontend, habilite la inyección de contexto de código fuente:

{% tabs %}
{% tab label="Webpack" %}

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
    plugins: [
        new datadogWebpackPlugin({
            rum: {
                enable: true,
                sourceCodeContext: {
                    service: 'foo-microfrontend',
                    version: process.env.APP_VERSION || '1.0.0'
                }
            }
        })
    ]
};
```
{% /tab %}

{% tab label="Vite" %}

```javascript
import { datadogVitePlugin } from '@datadog/vite-plugin';

export default {
    plugins: [
        datadogVitePlugin({
            rum: {
                enable: true,
                sourceCodeContext: {
                    service: 'foo-microfrontend',
                    version: process.env.APP_VERSION || '1.0.0'
                }
            }
        })
    ]
};
```
{% /tab %}

{% tab label="esbuild" %}

```javascript
const { datadogEsbuildPlugin } = require('@datadog/esbuild-plugin');

require('esbuild').build({
    plugins: [
        datadogEsbuildPlugin({
            rum: {
                enable: true,
                sourceCodeContext: {
                    service: 'foo-microfrontend',
                    version: process.env.APP_VERSION || '1.0.0'
                }
            }
        })
    ]
});
```
{% /tab %}

{% tab label="Rollup" %}

```javascript
import { datadogRollupPlugin } from '@datadog/rollup-plugin';

export default {
    plugins: [
        datadogRollupPlugin({
            rum: {
                enable: true,
                sourceCodeContext: {
                    service: 'foo-microfrontend',
                    version: process.env.APP_VERSION || '1.0.0'
                }
            }
        })
    ]
};
```
{% /tab %}

{% tab label="Rspack" %}

```javascript
const { datadogRspackPlugin } = require('@datadog/rspack-plugin');

module.exports = {
    plugins: [
        new datadogRspackPlugin({
            rum: {
                enable: true,
                sourceCodeContext: {
                    service: 'foo-microfrontend',
                    version: process.env.APP_VERSION || '1.0.0'
                }
            }
        })
    ]
};
```
{% /tab %}
{% /tabs %}

**Paso 2 - Configura el SDK del navegador a nivel de shell**

[Configura el seguimiento del navegador][4] en tu aplicación de shell (punto de entrada principal). El SDK del navegador enriquece automáticamente los eventos RUM (errores, acciones personalizadas, recursos XHR/Fetch, tareas largas, métricas vitales) con `service` y `version` del mapa de contexto.

{% alert level="warning" %}
Los eventos que no coinciden con ningún micro frontend recurren al servicio y a la versión a nivel de shell.
{% /alert %}

**Paso 3 - [Explorar datos de micro frontend en Datadog](#explore-micro-frontend-data-in-datadog)**


<!-- Version must meet 5.22 -->
{% if semverIsAtLeast($rum_browser_sdk_version, "5.22") %}

### Atribución manual de servicio y versión {% #manual-service-and-version-attribution %}

En la propiedad `beforeSend`, puedes sobrescribir las propiedades de servicio y versión. Para ayudarte a identificar de dónde provino el evento, utiliza la propiedad `context.handlingStack`.
<!-- NPM -->
{% if equals($lib_src, "npm") %}

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
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

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
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

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
{% /if %}

La expresión regular debe coincidir con la estructura de la ruta de archivo de tu aplicación. Ajusta el patrón para extraer el servicio y la versión de las URL de tu paquete. Cualquier consulta en el Explorador RUM puede usar el atributo de servicio para filtrar eventos.
<!-- ends  5.22 -->

{% /if %}

### Limitaciones {% #limitations %}

#### Eventos sin un origen atribuido {% #events-without-an-attributed-origin %}

Algunos eventos no pueden ser atribuidos a un origen porque no tienen una pila de manejo asociada:

-   Eventos de acción recolectados automáticamente
-   Eventos de recursos distintos a XHR y Fetch
-   Eventos de vista recolectados automáticamente
-   Violaciones de CORS y CSP

#### Resolución de mapas del código fuente a través de micro frontends {% #source-map-resolution-across-micro-frontends %}

Cuando una traza de pila contiene marcos de múltiples micro frontends, el evento recibe un único `service` y `version` del marco superior (donde se lanzó el error). Los mapas del código fuente se resuelven para el evento bajo ese único servicio, por lo que los marcos de otros micro frontends permanecen minificados, incluso cuando sus mapas del código fuente fueron correctamente subidos bajo su propio `service`.

Para controlar qué mapas del código fuente de micro frontend se utilizan, usa el enfoque de [atribución manual](#manual-service-and-version-attribution) con `beforeSend` para establecer `event.service` y `event.version`. Solo los marcos que pertenecen al micro frontend elegido aparecen sin minificar.

### Explora los datos de micro frontend en Datadog {% #explore-micro-frontend-data-in-datadog %}

Después de la configuración, el `service` y `version` en los eventos RUM identifican qué micro frontend generó cada evento. Usa estos atributos en varios lugares en Datadog:

-   **Paneles laterales**: Los atributos `service` y `version` aparecen en la sesión, vista, error, recurso, acción y paneles laterales de tareas largas en el Explorador RUM.
-   **Tablero de Resumen RUM**: Usa el `service` y `version` para filtrar en el tablero de Resumen RUM y limitar las métricas de rendimiento a un micro frontend específico.
-   **Tableros personalizados**: Crea tableros usando el `service` y `version` para monitorear cada micro frontend de manera independiente.

Las etiquetas `service` y `version` que representan cada micro frontend también se pueden encontrar en las siguientes métricas de [RUM without Limits][24]:

- `rum.measure.error`
- `rum.measure.operation`
- `rum.measure.operation.duration`

[1]: /es/real_user_monitoring/application_monitoring/browser/data_collected/
[2]: /es/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/
[3]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2170
[4]: /es/real_user_monitoring/application_monitoring/browser/setup/
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
[16]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v4130
[17]: /es/data_security/real_user_monitoring/#browser-rum-use-of-cookies
[18]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[19]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v5280
[20]: /es/real_user_monitoring/application_monitoring/browser/advanced_configuration#override-default-rum-view-names
[21]: https://module-federation.io/
[22]: https://github.com/DataDog/build-plugins?tab=readme-ov-file#usage
[23]: https://github.com/DataDog/build-plugins
[24]: /es/real_user_monitoring/rum_without_limits/