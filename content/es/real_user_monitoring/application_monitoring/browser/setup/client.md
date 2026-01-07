---
aliases:
- /es/real_user_monitoring/setup
- /es/real_user_monitoring/browser/setup/client
description: Configura el kit de desarrollo de software (SDK) de RUM Browser utilizando
  instrumentación del lado del cliente con NPM o CDN para monitorizar la experiencia
  del usuario, rendimiento y errores en aplicaciones web.
further_reading:
- link: /real_user_monitoring/application_monitoring/browser/advanced_configuration/
  tag: Documentación
  text: Configuración avanzada
- link: /real_user_monitoring/session_replay/browser/
  tag: Documentación
  text: Configurar Session Replay
- link: /real_user_monitoring/error_tracking/browser/
  tag: Documentación
  text: Configurar Error Tracking
- link: /real_user_monitoring/correlate_with_other_telemetry/
  tag: Documentación
  text: Correlacionar eventos de RUM con otra telemetría
title: Configuración del cliente de la monitorización del navegador
---

## Información general

El kit de desarrollo de software (SDK) de Datadog Browser permite Real User Monitoring (RUM) para tus aplicaciones web y te proporciona una visibilidad completa de la experiencia del usuario y el rendimiento de la aplicación. Con RUM, puedes monitorizar tiempos de carga de la página, interacciones de usuario, carga de recursos y errores de aplicación en tiempo real.

RUM te ayuda a:

- Monitorizar la experiencia del usuario con métricas de rendimiento detalladas para las cargas de página, las acciones de los usuarios y las solicitudes de recursos
- Rastrear el recorrido del usuario a través de tu aplicación con las funciones de Session Replay 
- Identificar los cuellos de botella del rendimiento y correlacionar el rendimiento del frontend y del backend con las trazas de APM

El kit de desarrollo de software (SDK) del navegador es compatible con todos los navegadores modernos para ordenadores de sobremesa y móviles, y proporciona una recopilación automática de métricas clave de rendimiento, interacciones de usuario y errores de aplicación. Tras la instalación, puedes gestionar las configuraciones de RUM por aplicación en Datadog y visualizar los datos recopilados en dashboards y el RUM Explorer.

## Configuración

### Paso 1: Crear la aplicación en la interfaz de usuario

1. En Datadog, ve a [**Digital Experience** > **Add an Application**][1] (Experiencia digital > Añadir una aplicación) y selecciona el tipo de aplicación JavaScript (JS).
2. Introduce un nombre para tu aplicación y haz clic en **Create Application** (Crear aplicación). Esto genera un `clientToken` y un `applicationId` para tu aplicación.

### Paso 2: Instalar el kit de desarrollo de software (SDK) del navegador

Elige el método de instalación del SDK de navegador.

{{< tabs >}}
{{% tab "NPM" %}}

La instalación a través del registro Node Package Manager (npm) se recomienda para aplicaciones web modernas. El kit de desarrollo de software (SDK) del navegador se empaqueta con el resto de tu código JavaScript de frontend. No tiene ningún impacto en el rendimiento de carga de la página. Sin embargo, kit de desarrollo de software (SDK) puede pasar por alto errores, recursos y acciones del usuario desencadenadas antes de que se inicialice el kit de desarrollo de software (SDK). Datadog recomienda utilizar una versión que coincida con los el SDK de logs del navegador.

Añade [`@datadog/browser-rum`][2] a tu archivo `package.json`, por ejemplo si usas la cli de npm:

```
npm install --save @datadog/browser-rum
```

[2]: https://www.npmjs.com/package/@datadog/browser-rum

{{% /tab %}}
{{% tab "CDN asíncrono" %}}

La instalación a través de CDN asíncrona se recomienda para aplicaciones web con objetivos de rendimiento. El kit de desarrollo de software (SDK) del navegador carga desde la CDN de Datadog de forma asíncrona, lo que garantiza que la descarga del SDK no afecte al rendimiento de carga de la página. Sin embargo, el SDK puede saltearse errores, recursos y acciones del usuario activadas antes de que se inicialice el kit de desarrollo de software (SDK).

Añade el fragmento de código generado a la etiqueta head de cada página HTML que desees monitorizar en tu aplicación.

{{< site-region region="us" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v6/datadog-rum.js','DD_RUM')
</script>
```

{{< /site-region >}}
{{< site-region region="eu" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu/v6/datadog-rum.js','DD_RUM')
</script>
```

{{< /site-region >}}
{{< site-region region="ap1" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v6/datadog-rum.js','DD_RUM')
</script>
```

{{< /site-region >}}
{{< site-region region="ap2" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap2/v6/datadog-rum.js','DD_RUM')
</script>
```

{{< /site-region >}}
{{< site-region region="us3" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v6/datadog-rum.js','DD_RUM')
</script>
```

{{< /site-region >}}
{{< site-region region="us5" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v6/datadog-rum.js','DD_RUM')
</script>
```

{{< /site-region >}}
{{< site-region region="gov" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v6.js','DD_RUM')
</script>
```

{{< /site-region >}}

{{% /tab %}}
{{% tab "CDN síncrono" %}}

Se recomienda la instalación a través de la sincronización de CDN para recopilar todos los eventos. El kit de desarrollo de software (SDK) del navegador se carga desde la CDN de Datadog de forma sincrónica, lo que garantiza que el kit de desarrollo de software (SDK) se cargue primero y recopile todos los errores, recursos y acciones del usuario. Este método puede afectar al rendimiento de carga de la página.

Añade el fragmento de código generado a la etiqueta head (delante de cualquier otra etiqueta script) de cada página HTML que desees monitorizar en tu aplicación. Colocar la etiqueta script más arriba y cargarla de forma sincrónica garantiza que Datadog RUM pueda recopilar todos los datos de rendimiento y errores.

{{< site-region region="us" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us1/v6/datadog-rum.js"
    type="text/javascript">
</script>
```

{{< /site-region >}}
{{< site-region region="eu" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/eu/v6/datadog-rum.js"
    type="text/javascript">
</script>
```

{{< /site-region >}}
{{< site-region region="ap1" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/ap1/v6/datadog-rum.js"
    type="text/javascript">
</script>
```

{{< /site-region >}}
{{< site-region region="ap2" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/ap2/v6/datadog-rum.js"
    type="text/javascript">
</script>
```

{{< /site-region >}}
{{< site-region region="us3" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us3/v6/datadog-rum.js"
    type="text/javascript">
</script>
```

{{< /site-region >}}
{{< site-region region="us5" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us5/v6/datadog-rum.js"
    type="text/javascript">
</script>
```

{{< /site-region >}}
{{< site-region region="gov" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/datadog-rum-v6.js"
    type="text/javascript">
</script>
```

{{< /site-region >}}

{{% /tab %}}
{{< /tabs >}}

### Paso 3: Inicializar el SDK del navegador

El kit de desarrollo de software (SDK) debe inicializarse lo antes posible en el ciclo de vida de la aplicación. Así se garantiza que todas las mediciones se realicen correctamente.

En el fragmento de inicialización, establece un nombre de entorno, un nombre de servicio y un token de cliente. Consulta la lista completa de [parámetros de inicialización][3].

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
   applicationId: '<APP_ID>',
   clientToken: '<CLIENT_TOKEN>',
   // `site` refers to the Datadog site parameter of your organization
   // see https://docs.datadoghq.com/getting_started/site/
   site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
});

```

<div class="alert alert-info"><strong>Nota</strong>: Los tipos son compatibles con TypeScript >= 3.8.2. Para versiones anteriores de TypeScript, importa fuentes de JavaScript y utiliza variables globales para evitar problemas de compilación.</div>

```javascript
import '@datadog/browser-rum/bundle/datadog-rum'

window.DD_RUM.init({
  ...
})
```

{{% /tab %}}
{{% tab "CDN asíncrono" %}}

```javascript
<script>
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APP_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: '<DATADOG_SITE>',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
    });
  })
</script>
```

{{% /tab %}}
{{% tab "CDN síncrono" %}}

```javascript
<script>
    window.DD_RUM && window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APP_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: '<DATADOG_SITE>',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',

    });
</script>
```

{{% /tab %}}
{{< /tabs >}}

#### Muestra de las sesiones

Para controlar los datos que tu aplicación envía a Datadog, puedes especificar las [sesiones de Browser RUM & Session Replay][4].

#### Configurar el consentimiento de seguimiento (cumplimiento de GDPR)

Para cumplir con GDPR, CCPA y normativas similares, el KIT de navegador de RUM te permite proporcionar el [valor de consentimiento de seguimiento en la inicialización][5].

#### Configurar la política de seguridad de contenidos (CSP)

Si utilizas la integración de la Política de seguridad de contenidos (CSP) de Datadog en tu sitio, consulta [la documentación de la CSP][6] para conocer los pasos adicionales de configuración.

### Paso 4: Visualizar tus datos

Ahora que has completado la configuración básica de RUM, tu aplicación está recopilando errores del navegador y puedes empezar a monitorizar y depurar problemas en tiempo real.

Puedes ver los [datos recopilados][8] en [dashboards][9] o crear una consulta de búsqueda en el [RUM Explorer][10].

Tu aplicación aparece como pendiente en la página de aplicaciones hasta que Datadog empiece a recibir datos.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/list
[3]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumInitConfiguration.html
[4]: /es/real_user_monitoring/guide/sampling-browser-plans/
[5]: /es/real_user_monitoring/application_monitoring/browser
[6]: /es/integrations/content_security_policy_logs/
[8]: /es/real_user_monitoring/application_monitoring/browser/data_collected/
[9]: /es/real_user_monitoring/platform/dashboards/
[10]: https://app.datadoghq.com/rum/sessions