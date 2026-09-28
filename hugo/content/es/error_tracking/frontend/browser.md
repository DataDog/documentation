---
aliases:
- /es/real_user_monitoring/error_tracking/browser_errors
- /es/error_tracking/standalone_frontend/browser
further_reading:
- link: https://learn.datadoghq.com/courses/tracking-errors-rum-javascript
  tag: Centro de aprendizaje
  text: Seguimiento de errores con RUM para aplicaciones web JavaScript
- link: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps
  tag: Código fuente
  text: Código fuente de datadog-ci
- link: /real_user_monitoring/guide/upload-javascript-source-maps
  tag: Documentación
  text: Cargue los mapas del código fuente de JavaScript
- link: /real_user_monitoring/guide/upload-webassembly-symbols
  tag: Documentación
  text: Cargue los símbolos de WebAssembly
- link: /error_tracking/explorer
  tag: Documentación
  text: Aprenda sobre Error Tracking Explorer
title: Browser Error Tracking
---
## Descripción general {#overview}

[Error Tracking][1] procesa los errores recopilados del navegador mediante el Browser SDK. Siempre que se recopila un error de [source][2], [custom][3], [report][4] o [console][4] que contiene una traza de pila, Error Tracking lo procesa y lo agrupa bajo un problema, o grupo de errores similares que se pueden encontrar en el [Error Tracking Explorer][16].

## Requisitos previos {#prerequisites}

Descargue la versión más reciente del [Browser SDK][5].

## Configuración {#setup}

Para comenzar a enviar datos de Error Tracking desde su aplicación de navegador a Datadog, siga las [instrucciones de configuración en la aplicación][6] o siga los pasos a continuación.

### Paso 1: cree la aplicación {#step-1-create-the-application}

1. En Datadog, navegue a la página [{{< ui >}}Errors{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Browser and Mobile{{< /ui >}} > {{< ui >}}Add an Application{{< /ui >}}][6] y seleccione el tipo de aplicación JavaScript (JS).
2. Ingrese un nombre para su aplicación y luego haga clic en {{< ui >}}Create Application{{< /ui >}}. Esto genera un `clientToken` y un `applicationId` para su aplicación.

### Paso 2: elija el método de instalación correcto {#step-2-choose-the-right-installation-method}

Elija el tipo de instalación para el Browser SDK.

{{< tabs >}}
{{% tab "npm" %}}

Se recomienda la instalación a través de npm (Node Package Manager) para aplicaciones web modernas. El Browser SDK se empaqueta con el resto de su código JavaScript de frontend. No tiene impacto en el rendimiento de carga de la página. Sin embargo, es posible que el SDK pierda errores, recursos y acciones de usuario activados antes de que se inicialice el SDK. Datadog recomienda usar una versión que coincida con el Browser Logs SDK.

Agregue [`@datadog/browser-rum`][1] a su archivo `package.json`, luego inicialícelo con:

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

El parámetro `trackUserInteractions` permite la recopilación automática de clics de usuario en su aplicación. **Los datos confidenciales y privados** contenidos en sus páginas pueden incluirse para identificar los elementos con los que se interactuó.

[1]: https://www.npmjs.com/package/@datadog/browser-rum

{{% /tab %}}
{{% tab "CDN asíncrono" %}}

Se recomienda la instalación a través de CDN asincrónico para aplicaciones web con objetivos de rendimiento. El Browser SDK se carga desde la CDN de Datadog de forma asincrónica, lo que garantiza que la descarga del SDK no afecte el rendimiento de carga de la página. Sin embargo, es posible que el SDK pierda errores, recursos y acciones de usuario activados antes de que se inicialice el SDK.

Agregue el fragmento de código generado a la etiqueta head de cada página HTML que desee hacer un seguimiento en su aplicación. Para el **{{<region-param key="dd_site_name">}}** [sitio][1]:

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v7/datadog-rum.js','DD_RUM')
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

El parámetro `trackUserInteractions` permite la recopilación automática de clics de usuario en su aplicación. **Los datos confidenciales y privados** contenidos en sus páginas pueden incluirse para identificar los elementos con los que se interactuó.

[1]: /es/getting_started/site/

{{% /tab %}}
{{% tab "CDN síncrono" %}}

Se recomienda la instalación a través de CDN sincrónico para recopilar todos los eventos. El Browser SDK se carga desde la CDN de Datadog de forma sincrónica, lo que garantiza que el SDK se cargue primero y recopile todos los errores, recursos y acciones del usuario. Este método puede afectar el rendimiento de carga de la página.

Agregue el fragmento de código generado a la etiqueta head (antes de cualquier otra etiqueta script) de cada página HTML que desee hacer un seguimiento en su aplicación. Colocar la etiqueta script más arriba y cargarla de forma sincrónica garantiza que Datadog RUM pueda recopilar todos los datos de rendimiento y errores. Para el **{{<region-param key="dd_site_name">}}** [sitio][1]:

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us1/v7/datadog-rum.js"
    type="text/javascript"
    crossorigin>
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

El parámetro `trackUserInteractions` permite la recopilación automática de clics de usuario en su aplicación. **Los datos confidenciales y privados** contenidos en sus páginas pueden incluirse para identificar los elementos con los que se interactuó.

[1]: /es/getting_started/site/

{{% /tab %}}
{{< /tabs >}}

#### TypeScript (opcional) {#typescript-optional}

Si está inicializando el SDK en un proyecto de TypeScript, utilice el fragmento de código a continuación. Los tipos son compatibles con TypeScript >= 3.8.2.

<div class="alert alert-info">Para versiones anteriores de TypeScript, importe fuentes de JavaScript y utilice variables globales para evitar problemas de compilación.</div>

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

### Paso 3: Configure el entorno y la configuración {#step-3-configure-environment-and-settings}

1. En el campo Entorno, defina el entorno (`env`) que utilizará su aplicación para el [unified service tagging][18].
2. En el campo Servicio, defina el servicio (`service`) que utilizará su aplicación para el [unified service tagging][18].
3. Establezca el nivel de privacidad para la entrada del usuario. Consulte [Session Replay Browser Privacy Options][10] para obtener más detalles.
4. Establezca un número de versión (`version`) para su aplicación implementada en el fragmento de inicialización. Para obtener más información, consulte [Tagging](#tagging-for-error-tracking).
5. Configure parámetros adicionales según sea necesario. Consulte la sección [Referencia de configuración](#configuration-reference) a continuación para ver todas las opciones disponibles.

### Paso 4: Implemente su aplicación {#step-4-deploy-your-application}

Implemente los cambios en su aplicación. Una vez que su implementación esté activa, Datadog recopila eventos de los navegadores de sus usuarios.

### Paso 5 - Cargue mapas del código fuente y símbolos de WebAssembly (opcional pero recomendado) {#step-5-upload-source-maps-and-webassembly-symbols-optional-but-recommended}

Cargue sus mapas del código fuente de JavaScript para acceder a trazas de pila sin minificar. Consulte la [guía de carga de mapas del código fuente][17].

Si su aplicación de navegador utiliza WebAssembly, [configure el Browser SDK WASM plugin][20] y [cargue los símbolos de depuración del módulo][21].

### Paso 6: Visualice sus datos {#step-6-visualize-your-data}

Ahora que ha completado la configuración básica para el Error Tracking del navegador, su aplicación está recopilando errores del navegador y puede comenzar a monitorear y depurar problemas en tiempo real.

Visualice los [datos recopilados][7] en [tableros][8] o cree una consulta de búsqueda en el Error Tracking.

Hasta que Datadog comience a recibir datos, su aplicación aparecerá como `pending` en la página {{< ui >}}Applications{{< /ui >}}.

### Paso 7 - Vincular errores con su código fuente (opcional) {#step-7-link-errors-with-your-source-code-optional}

Además de enviar mapas del código fuente, el [Datadog CLI][11] informa información de Git como el hash de confirmación, la URL del repositorio y una lista de rutas de archivos rastreados en el repositorio de código.

Error Tracking puede usar esta información para correlacionar errores con su [source code][15], lo que le permite pasar de cualquier marco de traza de pila a la línea de código relacionada en [GitHub][12], [GitLab][13] y [Bitbucket][14].

<div class="alert alert-info">La vinculación desde marcos de traza de pila al código fuente es compatible en la versión <a href="https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps#sourcemaps-command">Datadog CLI</a> <code>0.12.0</code> y versiones posteriores.</div>

Para obtener más información, consulte la [Datadog Source Code Integration][15].

## Tagging for Error Tracking {#tagging-for-error-tracking}

Estas etiquetas (configuradas en el paso 3 anterior) potencian la funcionalidad de Error Tracking:

- Filtrado y desglose de problemas por `service` y `env`
- Correlación entre productos con RUM, Logs y APM para el mismo `service`/`env`
- Coincidencia de mapas del código fuente cargados a través del mismo `service` y `version` que configure durante la carga

Un servicio es un repositorio de código independiente y desplegable que se asigna a un conjunto de páginas:

- Si su aplicación de navegador se construyó como un monolito, su aplicación de Datadog tiene un nombre de servicio para la aplicación.
- Si su aplicación de navegador se construyó como repositorios separados para múltiples páginas, edite los nombres de servicio predeterminados a lo largo del ciclo de vida de su aplicación.

Obtenga más información sobre [tagging][19] en Datadog.

## Referencia de configuración {#configuration-reference}

Consulte la [Browser SDK API Reference][9] para obtener la lista completa de opciones de configuración disponibles.

## Próximos pasos {#next-steps}

Puede hacer un seguimiento de excepciones no controladas, rechazos de promesas no controlados, excepciones controladas, rechazos de promesas controlados y otros errores que el Browser SDK no rastrea automáticamente. Obtenga más información sobre [Collecting Browser Errors][3].

## Lecturas adicionales {#further-reading}

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
[10]: /es/session_replay/privacy_options?platform=browser#mask-action-names
[11]: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps#sourcemaps-command
[12]: https://github.com
[13]: https://about.gitlab.com
[14]: https://bitbucket.org/product
[15]: /es/integrations/guide/source-code-integration/
[16]: /es/error_tracking/explorer
[17]: /es/real_user_monitoring/guide/upload-javascript-source-maps
[18]: /es/getting_started/tagging/unified_service_tagging/
[19]: /es/getting_started/tagging/
[20]: /es/real_user_monitoring/application_monitoring/browser/collecting_browser_errors/#configure-webassembly-error-tracking
[21]: /es/real_user_monitoring/guide/upload-webassembly-symbols/#upload-your-symbols