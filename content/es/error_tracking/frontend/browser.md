---
aliases:
- /es/real_user_monitoring/error_tracking/browser_errors
- /es/error_tracking/standalone_frontend/browser
further_reading:
- link: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps
  tag: Código fuente
  text: Código fuente de datadog-ci
- link: /real_user_monitoring/guide/upload-javascript-source-maps
  tag: Documentación
  text: Cargar mapas fuente de JavaScript
- link: /error_tracking/explorer
  tag: Documentación
  text: Más información sobre el Explorador de seguimiento de errores
title: Seguimiento de errores del navegador
---

## Información general

[Error Tracking][1] procesa los errores recopilados del navegador por el SDK del navegador. Cada vez que se recopila un error de [origen][2], [personalizado][3], de [informe][4] o de [consola][4] que contiene una traza de stack tecnológico, Error Tracking lo procesa y agrupa como un problema o grupo de errores similares que se encuentran en el [Error Tracking Explorer][16].

## Requisitos previos

Descarga la última versión del [SDK del navegador][5].

## Configuración

Para empezar a enviar datos de Error Tracking desde tu aplicación de navegador a Datadog, sigue las [instrucciones de configuración de la aplicación][6] o sigue los pasos que se indican a continuación.

### Paso 1 - Crear la aplicación

1. En Datadog, ve a la página [**Errors > Settings > Browser and Mobile > Add an Application** (Errores > Configuración > Navegador y móvil > Añadir una aplicación)][6] y selecciona el tipo de aplicación JavaScript (JS).
2. Introduce un nombre para tu aplicación y haga clic en **Create Application** (Crear aplicación). Se genera un `clientToken` y un `applicationId` para tu aplicación.

### Paso 2 - Elegir el método de instalación adecuado

Elige el tipo de instalación para el SDK del navegador.

{{< tabs >}}
{{% tab "npm" %}}

La instalación a través del (Node Package Manager) se recomienda para aplicaciones web modernas. El SDK del navegador viene en un paquete con el resto del código JavaScript de tu frontend. No tiene ningún impacto en el rendimiento de la carga de las páginas. Sin embargo, el SDK puede pasar por alto errores, recursos y acciones del usuario desencadenadas antes de que se inicialice el SDK. Datadog recomienda utilizar una versión que coincida con el SDK de logs del navegador.

Añade [`@datadog/browser-rum`][1] a tu archivo `package.json`, e inícialo con:

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({

   applicationId: '<APP_ID>',
   clientToken: '<CLIENT_TOKEN>',
   service: '<SERVICE>',
   env: '<ENV_NAME>',
   // site: '<SITE>',
   // version: '1.0.0',
   trackUserInteractions: true,
   trackResources: true
});

```

El parámetro `trackUserInteractions` activa la recopilación automática de los clics del usuario en tu aplicación. **Los datos confidenciales y privados** contenidos en tus páginas pueden incluirse para identificar los elementos con los que se interactúa.

[1]: https://www.npmjs.com/package/@datadog/browser-rum

{{% /tab %}}
{{% tab "CDN asíncrono" %}}

La instalación a través de la CDN asíncrona se recomienda para aplicaciones web con objetivos de rendimiento. El SDK del navegador se carga desde la CDN de Datadog de forma asíncrona, lo que garantiza que la descarga del SDK no afecte al rendimiento de la carga de las páginas. Sin embargo, el SDK puede pasar por alto errores, recursos y acciones del usuario desencadenadas antes de que se inicialice el SDK.

Añade el fragmento de código generado a la etiqueta (tag) de cabecera de cada página HTML que quieras monitorizar en tu aplicación. Para el [sitio][1] **{{<region-param key="dd_site_name">}}**:

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v6/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APP_ID>',
      // site: '<SITE>',
      service: '<APP_ID>',
      env: '<ENV_NAME>',
      // version: '1.0.0'
    });
  })
</script>
```

El parámetro `trackUserInteractions` activa la recopilación automática de los clics del usuario en tu aplicación. **Los datos confidenciales y privados** contenidos en tus páginas pueden incluirse para identificar los elementos con los que se interactúa.

[1]: /es/getting_started/site/

{{% /tab %}}
{{% tab "CDN síncrono" %}}

Se recomienda la instalación a través de la CDN síncrona para recopilartodos los eventos. El SDK del navegador se carga desde la CDN de Datadog de forma sincrónica, lo que garantiza que el SDK se cargue primero y recopile todos los errores, recursos y acciones del usuario. Este método puede afectar al rendimiento de la carga de las páginas.

Añade el fragmento de código generado a la etiqueta de cabebcera (delante de cualquier otra etiqueta de script) de cada página HTML que quieras monitorizar en tu aplicación. Al incluir la etiqueta de script en un nivel más alto y mantenerla sincronizada, Datadog RUM puede recopilar todos los datos y errores de rendimiento. Para el [sitio][1] **{{<region-param key="dd_site_name">}}**:

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us1/v6/datadog-rum.js"
    type="text/javascript">
</script>
<script>
    window.DD_RUM && window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APP_ID>',
      // site: '<SITE>',
      service: '<APP_ID>',
      env: '<ENV_NAME>',
      // version: '1.0.0'
    });
</script>
```

El parámetro `trackUserInteractions` activa la recopilación automática de los clics del usuario en tu aplicación. **Los datos confidenciales y privados** contenidos en tus páginas pueden incluirse para identificar los elementos con los que se interactúa.

[1]: /es/getting_started/site/

{{% /tab %}}
{{< /tabs >}}

#### TypeScript (opcional)

Si estás inicializando el SDK en un proyecto TypeScript, utiliza el siguiente fragmento de código. Los tipos son compatibles con versiones >= 3.8.2 de TypeScript.

<div class="alert alert-info">Para versiones anteriores de TypeScript, importa fuentes JavaScript y utiliza variables globales para evitar problemas de compilación.</div>

```javascript
import '@datadog/browser-rum/bundle/datadog-rum'

window.DD_RUM.init({
  applicationId: 'XXX',
  clientToken: 'XXX',
  site: 'datadoghq.com',
  trackUserInteractions: true,
  trackResources: true,
  ...
})
```

### Paso 3 - Configurar el entorno y los parámetros

1. En el campo Environment (Entorno), define el entorno (`env`) para que tu aplicación utilice el [etiquetado unificado de servicios][18].
2. En el campo Service (Servicio), define el servicio (`service`) para que tu aplicación utilice el [etiquetado unificado de servicios][18].
3. Define el nivel de privacidad para el ingreso de usuario. Para obtener más información, consulta [Opciones de privacidad del navegador de Session Replay][10].
4. Define un número de versión (`version`) para tu aplicación desplegada en el fragmento de inicialización. Para obtener más información, consulta [Etiquetado](#tagging-for-error-tracking).
5. Configura parámetros adicionales según sea necesario. Consulta la sección [Referencia de configuración](#configuration-reference) a continuación para conocer todas las opciones disponibles.

### Paso 4 - Desplegar la aplicación

Despliega los cambios en tu aplicación. Una vez desplegada la aplicación, Datadog recopila eventos de los navegadores de usuarios.

### Paso 5 - Cargar mapas de fuentes (opcional pero recomendado)

Carga tus mapas de fuentes JavaScript para acceder a trazas de stack tecnológico sin minificar. Consulta la [guía para la carga de mapas de fuentes][17].

### Paso 6 - Visualizar tus datos

Ahora que has completado la configuración básica de Error Tracking para el navegador, tu aplicación recopila errores del navegador, y puedes empezar a monitorizar y depurar problemas en tiempo real.

Visualiza los [datos recopilados][7] en [dashboards][8] o crea una consulta de búsqueda en Error Tracking.

Hasta que Datadog empiece a recibir datos, tu aplicación aparecerá como `pending` en la página **Aplicaciones**.

### Paso 7 - Vincular los errores con tu código fuente (opcional)

Además de enviar mapas de fuentes, la [Datadog CLI][11] reporta información Git como el hash de confirmación, la URL del repositorio y una lista de rutas de archivos rastreados en el repositorio de código.

Error Tracking puede utilizar esta información para correlacionar errores con tu [código fuente][15], lo que te permite pasar desde cualquier marco de traza de stack tecnológico a la línea de código relacionada en [GitHub][12], [GitLab][13] y [Bitbucket][14].

<div class="alert alert-info">La vinculación de marcos de stack tecnológico al código fuente es compatible con la <a href="https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps#sourcemaps-command">Datadog CLI</a> versión <code>0.12.0</code> y posteriores.</div>

Para obtener más información, consulta la página [integración del código fuente de Datadog][15].

## Etiquetado para Error Tracking

Estas etiquetas (configuradas en el paso 3 más arriba) alimentan la funcionalidad Error Tracking:

- Problemas de filtrado y facetado en `service` y `env`
- Correlación cruzada con RUM, logs y APM para el mismo `service`/`env`
- Correspondencia de los mapas de fuentes cargados a través del mismo `service` y la misma `version` configurados durante la carga

Un servicio es un repositorio de código independiente y desplegable que se asigna a un conjunto de páginas:

- Si tu aplicación de navegador se ha creado como un monolito, tu aplicación Datadog tendrá un nombre de servicio para la aplicación.
- Si tu aplicación de navegador se construyó como repositorios separados para varias páginas, edita los nombres de servicio por defecto en todo el ciclo de vida de tu aplicación.

Más información sobre [etiquetado][19] en Datadog.

## Referencia de configuración

Consulta la [referencia de la API del SDK del navegador][9] para ver la lista completa de opciones de configuración disponibles.

## Funciones avanzadas (opcionales)

### Gestionar los mapas de fuentes cargados

Consulta todos los símbolos cargados y gestiona tus mapas de fuentes en la página [Símbolos de depuración][17].

**Nota**: El tamaño de los mapas de fuentes está limitado a **500 MB** cada uno.

## Siguientes pasos

Puedes monitorizar excepciones no gestionadas, rechazos de promesas no gestionadas, excepciones gestionadas, rechazos de promesas gestionadas y otros errores que el SDK del navegador no rastrea automáticamente. Más información sobre [Recopilación de errores del navegador][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/error_tracking/
[2]: /es/real_user_monitoring/application_monitoring/browser/data_collected/?tab=error#source-errors
[3]: /es/error_tracking/frontend/collecting_browser_errors/
[4]: /es/error_tracking/frontend/collecting_browser_errors/?tab=npm#error-sources
[5]: https://www.npmjs.com/package/@datadog/browser-rum
[6]: https://app.datadoghq.com/error-tracking/settings/setup/client
[7]: /es/real_user_monitoring/application_monitoring/browser/data_collected/
[8]: /es/real_user_monitoring/platform/dashboards/errors/
[9]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumInitConfiguration.html
[10]: /es/real_user_monitoring/session_replay/browser/privacy_options#mask-action-names
[11]: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps#sourcemaps-command
[12]: https://github.com
[13]: https://about.gitlab.com
[14]: https://bitbucket.org/product
[15]: /es/integrations/guide/source-code-integration/
[16]: /es/error_tracking/explorer
[17]: /es/real_user_monitoring/guide/upload-javascript-source-maps
[18]: /es/getting_started/tagging/unified_service_tagging/
[19]: /es/getting_started/tagging/