---
aliases:
- /es/real_user_monitoring/setup
further_reading:
- link: /real_user_monitoring/explorer/
  tag: Documentación
  text: Información sobre el explorador RUM
- link: /logs/log_collection/javascript/
  tag: Documentación
  text: Información sobre el SDK de RUM Browser de Datadog para logs
title: Configuración de la monitorización de RUM Browser
---

El SDK de RUM Browser es compatible con todos los navegadores modernos de escritorio y móviles, incluido IE11. Para obtener más información, consulta la tabla [Compatibilidad del navegador][1].

Datadog y los desarrolladores que sacan provecho de los SDK de RUM comparten la responsabilidad de mantener seguros los datos de los usuarios. Más información sobre [Responsabilidad compartida][2].

## Configuración

{{< callout url="https://www.datadoghq.com/private-beta/rum-sdk-auto-injection/" btn_hidden="false" header="Join the Beta!">}}
La inserción del SDK de RUM está en beta privada. Completa el formulario para solicitar acceso.
{{< /callout >}}

Para configurar una monitorización de RUM Browser, crea una aplicación de RUM:

1. En Datadog, ve a la página [**Experiencia digital** > **Añadir una aplicación**][3] y selecciona el tipo de aplicación JavaScript (JS).
   - Por defecto, la recopilación automática de datos del usuario está activada. Para desactivar la recopilación automática de datos del usuario para la IP del cliente o los datos de geolocalización, desactiva las casillas de esas configuraciones. Para obtener más información, consulta [Recopilación de datos del RUM Browser][4].
   - Introduce un nombre para la aplicación y haz clic en **Generar token del cliente**. Al hacerlo, se generará un `clientToken` y un `applicationId` para tu aplicación.
   - Elige el tipo de instalación para el SDK de RUM Browser: [npm](#npm) o una versión hospedada ([CDN asíncrono](#cdn-async) o [CDN síncrono](#cdn-sync)).
   - Define el nombre del entorno y el nombre del servicio para que tu aplicación utilice un etiquetado de servicio unificado para [RUM & Session Replay][5]. Configura un número de versión para tu aplicación implementada en el fragmento de inicialización. Para obtener más información, consulta [etiquetado](#tagging).
   - Configura la frecuencia de muestreo del total de sesiones de usuario recopiladas y utiliza el control deslizante para configurar el porcentaje del total de sesiones [Browser RUM & Session Replay][6] recopiladas. Las sesiones de Browser RUM & Session Replay incluyen recursos, tareas largas y grabaciones de repeticiones. Para obtener más información sobre la configuración del porcentaje de sesiones de Browseer RUM & Session Replay recopiladas de la cantidad total de sesiones de usuario, consulta [Configurar tu configuración del muestreo de Brower RUM & Session Replay][7].
   - Haz clic en **Session Replay activada** para cambiar a las grabaciones de repeticiones en [Session Replay][8].
   - Selecciona una [configuración de privacidad][9] para Session Replay en el menú desplegable.
2. Implementa los cambios en tu aplicación. Una vez activada la implementación, Datadog recopilará eventos de los navegadores de tus usuarios.
3. Visualiza los [datos recopilados][4] en los [dashboards][10] o crea una consulta de búsqueda en el [Explorador RUM][11].
4. (Opcional) Inicializa el SDK de RUM con el parámetro `allowedTracingUrls` para [Conectar RUM y trazas (traces)][12] si deseas comenzar a vincular las solicitudes de tus aplicaciones web y móviles a tus trazas de backend correspondientes. Consulta la lista completa de [parámetros de inicialización](#initialization-parameters).
5. Si utilizas la integración de la Directiva de seguridad de contenido de Datadog (CSP) en tu sitio, consulta [la sección RUM de la documentación de CSP][13] para conocer los pasos de configuración adicionales.

Hasta que Datadog empiece a recibir datos, tu aplicación aparecerá como `pending` en la página **Aplicaciones de RUM**.

### Elegir el método de instalación adecuado

Inserción de SDK
: Este método instala RUM configurando tu servidor para insertar el SDK. La inserción del SDK de RUM está en beta privada. Para utilizar esta función, [solicitar acceso a la inserción de RUM SDK][28].

npm (administrador de paquetes de nodos)
: Se recomienda este método para aplicaciones web modernas. El SDK de RUM Browser está empaquetado con el resto de tu código JavaScript de frontend. No afecta al rendimiento de carga de la página. Sin embargo, el SDK puede pasar por alto errores, recursos y acciones de usuarios activadas antes de que se inicializara. Datadog recomienda utilizar una versión coincidente con el SDK del navegador para logs.

CDN asíncrono
: Se recomienda este método para aplicaciones web con objetivos de rendimiento. El SDK de RUM Browser se carga desde nuestra CDN de forma asincrónica, por lo que tu descarga no afecta al rendimiento de carga de la página. Sin embargo, el SDK puede pasar por alto errores, recursos y acciones de usuarios activadas antes de que se inicializara.

CDN síncrono
: Se recomienda este método para recopilar todos los eventos de RUM. El SDK de RUM Browser se carga desde nuestra CDN de forma sincrónica, por lo que se descarga primero y recopila todos los errores, recursos y acciones de usuarios. Este método puede afectar al rendimiento de carga de la página.

### npm

Añade [`@datadog/browser-rum`][14] a tu archivo `package.json` e inicialízalo con:

<details open>
 <summary>Última versión</summary>

```JavaScript
importar { datadogRum } desde '@Datadog/browser-rum'

datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  // `site` se refiere al parámetro del sitio Datadog de tu organización
  // consulta https://docs.datadoghq.com/getting_started/site/
  sitio: '<DATADOG_SITE>',
  // servicio: 'mi-aplicacion-web',
  // variable de entorno: 'production',
  // versión: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100,
  trackResources: true,
  trackLongTasks: true,
  trackUserInteractions: true,
  enablePrivacyForActionName: true,
});
```

</details>

<details>
 <summary>antes de <code>v5.0.0</code></summary>

```JavaScript
importar { datadogRum } desde '@Datadog/browser-rum'

datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  // `site` se refiere al parámetro del sitio Datadog de tu organización
  // consulta https://docs.datadoghq.com/getting_started/site/
  sitio: '<DATADOG_SITE>',
  // servicio: 'mi-aplicacion-web',
  // variable de entorno: 'production',
  // versión: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100, // si no se incluye, el valor por defecto es 100
  trackResources: true,
  trackLongTasks: true,
  trackUserInteractions: true,
});
datadogRum.startSessionReplayRecording();
```

</details>

<details>
 <summary>antes de <code>v4.30.0</code></summary>

```JavaScript
importar { datadogRum } desde '@Datadog/browser-rum'

datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  // `site` se refiere al parámetro del sitio Datadog de tu organización
  // consulta https://docs.datadoghq.com/getting_started/site/
  sitio: '<DATADOG_SITE>',
  // servicio: 'mi-aplicacion-web',
  // variable de entorno: 'production',
  // versión: '1.0.0',
  sampleRate: 100,
  sessionReplaySampleRate: 100, // si no se incluye, el valor por defecto es 100
  trackResources: true,
  trackLongTasks: true,
  trackInteractions: true,
});
datadogRum.startSessionReplayRecording();
```

</details>

<details>
 <summary>antes de <code>v4.20.0</code></summary>

```JavaScript
importar { datadogRum } desde '@Datadog/browser-rum'

datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  // `site` se refiere al parámetro del sitio Datadog de tu organización
  // consulta https://docs.datadoghq.com/getting_started/site/
  sitio: '<DATADOG_SITE>',
  // servicio: 'mi-aplicacion-web',
  // variable de entorno: 'production',
  // versión: '1.0.0',
  sampleRate: 100,
  premiumSampleRate: 100, // si no se incluye, el valor por defecto es 100
  trackInteractions: true,
});
datadogRum.startSessionReplayRecording();
```

</details>

<details>
 <summary>antes de <code>v4.10.2</code></summary>

```JavaScript
importar { datadogRum } desde '@Datadog/browser-rum'

datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  // `site` se refiere al parámetro del sitio Datadog de tu organización
  // consulta https://docs.datadoghq.com/getting_started/site/
  sitio: '<DATADOG_SITE>',
  // servicio: 'my-web-application',
  // variable de entorno: 'production',
  // versión: '1.0.0',
  sampleRate: 100,
  replaySampleRate: 100, // si no se incluye, el valor por defecto es 100
  trackInteractions: true,
});
datadogRum.startSessionReplayRecording();
```

</details>

El parámetro `trackUserInteractions` activa la recopilación automática de los clics del usuario en tu aplicación. **Los datos sensibles y privados** contenidos en tus páginas pueden incluirse para identificar los elementos con los que se interactúa.

### CDN asincrónico

Añade el fragmento de código generado a la etiqueta (tag) del encabezado de cada página HTML que desees monitorizar en tu aplicación. Para el sitio **{{<region-param key="dd_site_name">}}**:

<details open>
 <summary>Última versión</summary>

< site-region region="us" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/us1/v5/Datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      enablePrivacyForActionName: true,
    });
  })
</script>
```</ site-region>
< site-region region="us" >{{}}</ site-region>
< site-region region="ap1" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/ap1/v5/Datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      site: 'ap1.datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      enablePrivacyForActionName: true,
    });
  })
</script>
```</ site-region>
< site-region region="ap1" >{{}}</ site-region>
< site-region region="eu" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/eu1/v5/Datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'datadoghq.eu',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      enablePrivacyForActionName: true,
    });
  })
</script>
```</ site-region>
< site-region region="eu" >{{}}</ site-region>
< site-region region="us3" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/us3/v5/Datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'us3.datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      enablePrivacyForActionName: true,
    });
  })
</script>
```</ site-region>
< site-region region="us3" >{{}}</ site-region>
< site-region region="us5" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:función(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/us5/v5/Datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'us5.datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      enablePrivacyForActionName: true,
    });
  })
</script>
```</ site-region>
< site-region region="us5" >{{}}</ site-region>
< site-region region="gov" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:función(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/Datadog-rum-v5.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'ddog-gov.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      enablePrivacyForActionName: true,
    });
  })
</script>
```</ site-region>
< site-region region="gov" >{{}}</ site-region>

</details>

<details>
 <summary>antes de v5<code>.0.0</code></summary>

< site-region region="us" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:función(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/us1/v4/Datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(función() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
     });
    window.DD_RUM.startSessionReplayRecording();
   })
</script>
```</ site-region>
< site-region region="us" >{{}}</ site-region>
< site-region region="ap1" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/ap1/v4/Datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'ap1.datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```</ site-region>
< site-region region="ap1" >{{}}</ site-region>
< site-region region="eu" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/eu1/v4/Datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function) {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'datadoghq.eu',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```</ site-region>
< site-region region="eu" >{{}}</ site-region>
< site-region region="us3" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/us3/v4/Datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(functjion) {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'us3.datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```</ site-region>
< site-region region="us3" >{{}}</ site-region>
< site-region region="us5" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:función(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/us5/v4/Datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'us5.datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```</ site-region>
< site-region region="us5" >{{}}</ site-region>
< site-region region="gov" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/Datadog-rum-v4.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'ddog-gov.com',
      // servicio: 'my-web-application',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```</ site-region>
< site-region region="gov" >{{}}</ site-region>

</details>

<details>
 <summary>antes de v4<code>.30.0</code></summary>

< site-region region="us" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/us1/v4/Datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```</ site-region>
< site-region region="us" >{{}}</ site-region>
< site-region region="ap1" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/ap1/v4/Datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'ap1.datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```</ site-region>
< site-region region="ap1" >{{}}</ site-region>
< site-region region="eu" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/eu1/v4/Datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'datadoghq.eu',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```</ site-region>
< site-region region="eu" >{{}}</ site-region>
< site-region region="us3" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/us3/v4/Datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'us3.datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```</ site-region>
< site-region region="us3" >{{}}</ site-region>
< site-region region="us5" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/us5/v4/Datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'us5.datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```</ site-region>
< site-region region="us5" >{{}}</ site-region>
< site-region region="gov" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/Datadog-rum-v4.js','DD_RUM')
  window.DD_RUM.onReady(función() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'ddog-gov.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```</ site-region>
< site-region region="gov" >{{}}</ site-region>

</details>

<details>
 <summary>antes de v4<code>.20.0</code></summary>

< site-region region="us" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/us1/v4/Datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'datadoghq.com',
      // servicio: 'my-web-application',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```</ site-region>
< site-region region="us" >{{}}</ site-region>
< site-region region="ap1" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/ap1/v4/Datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function) {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'ap1.datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```</ site-region>
< site-region region="ap1" >{{}}</ site-region>
< site-region region="eu" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/eu1/v4/Datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function) {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'datadoghq.eu',
      // servicio: 'my-web-application',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```</ site-region>
< site-region region="eu" >{{}}</ site-region>
< site-region region="us3" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:función(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/us3/v4/Datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'us3.datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```</ site-region>
< site-region region="us3" >{{}}</ site-region>
< site-region region="us5" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:función(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/us5/v4/Datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'us5.datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```</ site-region>
< site-region region="us5" >{{}}</ site-region>
< site-region region="gov" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/Datadog-rum-v4.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'ddog-gov.com',
      // servicio: 'my-web-application',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```</ site-region>
< site-region region="gov" >{{}}</ site-region>

</details>

<details>
 <summary>antes de v4<code>.10.2</code></summary>

< site-region region="us" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/us1/v4/Datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function) {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'datadoghq.com',
      // servicio: 'my-web-application',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```</ site-region>
< site-region region="us" >{{}}</ site-region>
< site-region region="ap1" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/ap1/v4/Datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'ap1.datadoghq.com',
      // servicio: 'my-web-application',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```</ site-region>
< site-region region="ap1" >{{}}</ site-region>
< site-region region="eu" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/eu1/v4/Datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function) {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'datadoghq.eu',
      // servicio: 'my-web-application',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```</ site-region>
< site-region region="eu" >{{}}</ site-region>
< site-region region="us3" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/us3/v4/Datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'us3.datadoghq.com',
      // servicio: 'my-web-application',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```</ site-region>
< site-region region="us3" >{{}}</ site-region>
< site-region region="us5" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/us5/v4/Datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'us5.datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```</ site-region>
< site-region region="us5" >{{}}</ site-region>
< site-region region="gov" >{{}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-Agent.com/Datadog-rum-v4.js','DD_RUM')
  window.DD_RUM.onReady(function) {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'ddog-gov.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```</ site-region>
< site-region region="gov" >{{}}</ site-region>

</details>

El parámetro `trackUserInteractions` permite la recopilación automática de los clics del usuario en tu aplicación. **Los datos sensibles y privados** contenidos en tus páginas pueden incluirse para identificar los elementos con los que se interactúa.

Las llamadas de la API de RUM iniciales deben estar envueltas en la devolución de llamada `window.DD_RUM.onReady()`. De esta forma, se garantiza que el código solo se ejecute una vez que el SDK se haya cargado correctamente.

### CDN síncrono

Añade el fragmento de código generado a la etiqueta del encabezado (delante de cualquier otra etiqueta de script) de cada página HTML que desees monitorizar en tu aplicación. Al incluir la etiqueta de script en un nivel más alto y tenerla sincronizada, Datadog RUM puede recopilar todos los datos y errores de rendimiento. Para el sitio **{{<region-param key="dd_site_name">}}**:

<details open>
 <summary>Última versión</summary>

< site-region region="us" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/us1/v5/Datadog-rum.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      enablePrivacyForActionName: true,
    });
</script>
```</ site-region>
< site-region region="us" >{{}}</ site-region>
< site-region region="ap1" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/ap1/v5/Datadog-rum.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'ap1.datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      enablePrivacyForActionName: true,
    });
</script>
```</ site-region>
< site-region region="ap1" >{{}}</ site-region>
< site-region region="eu" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/eu1/v5/Datadog-rum.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'datadoghq.eu',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      enablePrivacyForActionName: true,
    });
</script>
```</ site-region>
< site-region region="eu" >{{}}</ site-region>
< site-region region="us3" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/us3/v5/Datadog-rum.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'us3.datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      enablePrivacyForActionName: true,
    });
</script>
```</ site-region>
< site-region region="us3" >{{}}</ site-region>
< site-region region="us5" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/us5/v5/Datadog-rum.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'us5.datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      enablePrivacyForActionName: true,
    });
</script>
```</ site-region>
< site-region region="us5" >{{}}</ site-region>
< site-region region="gov" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/Datadog-rum-v5.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'ddog-gov.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      enablePrivacyForActionName: true,
    });
</script>
```</ site-region>
< site-region region="gov" >{{}}</ site-region>

</details>

<details>
 <summary>antes de v5<code>.0.0</code></summary>

< site-region region="us" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/us1/v4/Datadog-rum.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```</ site-region>
< site-region region="us" >{{}}</ site-region>
< site-region region="ap1" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/ap1/v4/Datadog-rum.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'ap1.datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```</ site-region>
< site-region region="ap1" >{{}}</ site-region>
< site-region region="eu" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/eu1/v4/Datadog-rum.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'datadoghq.eu',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // si no se incluye, el valor predeterminado es 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```</ site-region>
< site-region region="eu" >{{}}</ site-region>
< site-region region="us3" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/us3/v4/Datadog-rum.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'us3.datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```</ site-region>
< site-region region="us3" >{{}}</ site-region>
< site-region region="us5" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/us5/v4/Datadog-rum.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'us5.datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno 'production',
      // versión: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```</ site-region>
< site-region region="us5" >{{}}</ site-region>
< site-region region="gov" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/Datadog-rum-v4.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'ddog-gov.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```</ site-region>
< site-region region="gov" >{{}}</ site-region>

</details>

<details>
 <summary>antes de v4<code>.30.0</code></summary>

< site-region region="us" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/us1/v4/Datadog-rum.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```</ site-region>
< site-region region="us" >{{}}</ site-region>
< site-region region="ap1" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/ap1/v4/Datadog-rum.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'ap1.datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // si no se incluye, el valor predeterminado es 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```</ site-region>
< site-region region="ap1" >{{}}</ site-region>
< site-region region="eu" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/eu1/v4/Datadog-rum.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'datadoghq.eu',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```</ site-region>
< site-region region="eu" >{{}}</ site-region>
< site-region region="us3" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/us3/v4/Datadog-rum.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'us3.datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```</ site-region>
< site-region region="us3" >{{}}</ site-region>
< site-region region="us5" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/us5/v4/Datadog-rum.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'us5.datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```</ site-region>
< site-region region="us5" >{{}}</ site-region>
< site-region region="gov" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/Datadog-rum-v4.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'ddog-gov.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```</ site-region>
< site-region region="gov" >{{}}</ site-region>

</details>

<details>
 <summary>antes de v4<code>.20.0</code></summary>

< site-region region="us" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/us1/v4/Datadog-rum.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de etorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```</ site-region>
< site-region region="us" >{{}}</ site-region>
< site-region region="ap1" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/ap1/v4/Datadog-rum.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'ap1.datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```</ site-region>
< site-region region="ap1" >{{}}</ site-region>
< site-region region="eu" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/eu1/v4/Datadog-rum.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'datadoghq.eu',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```</ site-region>
< site-region region="eu" >{{}}</ site-region>
< site-region region="us3" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/us3/v4/Datadog-rum.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'us3.datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```</ site-region>
< site-region region="us3" >{{}}</ site-region>
< site-region region="us5" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/us5/v4/Datadog-rum.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'us5.datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```</ site-region>
< site-region region="us5" >{{}}</ site-region>
< site-region region="gov" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/Datadog-rum-v4.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'ddog-gov.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```</ site-region>
< site-region region="gov" >{{}}</ site-region>

</details>

<details>
 <summary>antes de v4<code>.10.2</code></summary>

< site-region region="us" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/us1/v4/Datadog-rum.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```</ site-region>
< site-region region="us" >{{}}</ site-region>
< site-region region="ap1" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/ap1/v4/Datadog-rum.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'ap1.datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```</ site-region>
< site-region region="ap1" >{{}}</ site-region>
< site-region region="eu" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/eu1/v4/Datadog-rum.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'datadoghq.eu',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```</ site-region>
< site-region region="eu" >{{}}</ site-region>
< site-region region="us3" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/us3/v4/Datadog-rum.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'us3.datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```</ site-region>
< site-region region="us3" >{{}}</ site-region>
< site-region region="us5" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/us5/v4/Datadog-rum.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'us5.datadoghq.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```</ site-region>
< site-region region="us5" >{{}}</ site-region>
< site-region region="gov" >{{}}
```html
<script src="https://www.datadoghq-browser-Agent.com/Datadog-rum-v4.js" type="text/JavaScript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` se refiere al parámetro del sitio Datadog de tu organización
      // consulta https://docs.datadoghq.com/getting_started/site/
      sitio: 'ddog-gov.com',
      // servicio: 'mi-aplicacion-web',
      // variable de entorno: 'production',
      // versión: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // si no se incluye, el valor por defecto es 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```</ site-region>
< site-region region="gov" >{{}}</ site-region>

</details>

El parámetro `trackUserInteractions` permite la recopilación automática de los clics del usuario en tu aplicación. **Los datos sensibles y privados** contenidos en tus páginas pueden incluirse para identificar los elementos con los que se interactúa.

El check `window.DD_RUM` se utiliza para evitar problemas en caso de que se produzca un error en la carga del SDK de RUM Browser.

### TypeScript

Los tipos son compatibles con TypeScript >= 3.8.2. Para versiones anteriores, importa fuentes de JavaScript y utiliza variables globales para evitar posibles problemas de compilación:

```JavaScript
importar '@Datadog/browser-rum/bundle/Datadog-rum'

window.DD_RUM.init({
  applicationId: 'XXX',
  clientToken: 'XXX',
  sitio: 'datadoghq.com',
  ...
})
```

## Configuración

### Parámetros de inicialización

Ejecuta el comando de inicialización para empezar el seguimiento. Estos son los parámetros disponibles:

`applicationId`
: Requerido<br/>
**Tipo**: Cadena<br/>
El ID de aplicación de RUM.

`clientToken`
: Requerido<br/>
**Tipo Cadena<br/>
Un [token del cliente de Datadog][15].

`site`
: Requerido<br/>
**Tipo**: Cadena<br/>
**Por defecto**: `datadoghq.com`<br/>
[El parámetro del sitio Datadog de tu organización][16].

`service`
: Opcional<br/>
**Tipo**: Cadena<br/>
El nombre del servicio para tu aplicación. Cumple los [requisitos de sintaxis de las etiquetas][17].

`env`
: Opcional<br/>
**Tipo**: Cadena<br/>
El entorno de la aplicación, por ejemplo: producción, preproducción y almacenamiento provisional. Cumple los [requisitos de sintaxis de las etiquetas][17].

`version`
: Opcional<br/>
**Tipo**: Cadena<br/>
La versión de la aplicación, por ejemplo: 1.2.3, 6c44da20, y 2020.02.13. Cumple los [requisitos de sintaxis de las etiquetas][17].

`trackingConsent`
: Opcional<br/>
**Tipo**: `"granted"` o `"not-granted"`<br/>
**Por defecto**: `"granted"`<br/>
Configura el estado inicial del consentimiento de rastreo del usuario. Consulta [Consentimiento de rastreo del usuario][18].

`trackViewsManually`
: Opcional<br/>
**Tipo**: Booleano<br/>
**Por defecto**: `false` <br/>
Permite controlar la creación de vistas RUM. Consulta [sustituir nombres de vistas RUM por defecto][19].

`trackUserInteractions`
: Opcional<br/>
**Tipo**: Booleano<br/>
**Por defecto**: `false` <br/>
Activa la [recopilación automática de acciones de los usuarios][20].

`trackResources`
: Opcional<br/>
**Tipo**: Booleano<br/>
**Por defecto**: `false` <br/>
Activa la recopilación de eventos de recursos.

`trackLongTasks`
: Opcional<br/>
**Tipo**: Booleano<br/>
**Por defecto**: `false` <br/>
Activa la recopilación de eventos de tareas largas.

`defaultPrivacyLevel`
: Opcional<br/>
**Tipo**: Cadena<br/>
**Por defecto**: `mask` <br/>Consulta [Opciones de privacidad de Session Replay][21].

`enablePrivacyForActionName`
: Opcional<br/>
**Tipo**: Booleano<br/>
**Por defecto**: `false` <br/>Consulta [Enmascarar nombres de acciones][29].

`actionNameAttribute`
: Opcional<br/>
**Tipo**: Cadena<br/>
Especifica tu propio atributo que se utilizará para [nombrar acciones][22].

`sessionSampleRate`
: Opcional<br/>
**Tipo**: Número<br/>
**Por defecto**: `100`<br/>
El porcentaje de sesiones que se van a rastrear: `100` para todas, `0` para ninguna. Solo las sesiones rastreadas envían eventos de RUM. Para obtener más detalles sobre `sessionSampleRate`, consulta la [configuración del muestreo][7].

`sessionReplaySampleRate`
: Opcional<br/>
**Tipo**: Número<br/>
**Por defecto**: `0`<br/>
El porcentaje de sesiones rastreadas con funciones de [precios de Browser RUM & Session Replay][6]: `100` para todas, `0` para ninguna. Para obtener más detalles sobre `sessionReplaySampleRate`, consulta la [configuración del muestreo][7].

`startSessionReplayRecordingManually`
: Opcional<br/>
**Tipo**: Booleano<br/>
**Por defecto**: `false`<br/>
Si la sesión se muestrea para Session Replay, solo se inicia la grabación cuando se llame a `startSessionReplayRecording()`, en lugar de al principio de la sesión. Consulta [Uso de Session Replay][23] para obtener más detalles.

`silentMultipleInit`
: Opcional<br/>
**Tipo**: Booleano <br/>
**Por defecto**: `false`<br/>
La inicialización falla silenciosamente si el SDK de RUM Browser ya está inicializado en la página.

`proxy`
: Opcional<br/>
**Tipo**: Cadena<br/>
URL proxy opcional, por ejemplo: https://www.proxy.com/path. Para más información, consulta la [guía completa de configuración de configuración de proxy][24].

`allowedTracingUrls`
: Opcional<br/>
**Tipo**: Lista<br/>
Una lista de URL de solicitudes utilizadas para insertar encabezados de rastreo. Para obtener más información, consulta [Conectar RUM y trazas][12].

`traceSampleRate`
: Opcional<br/>
**Tipo**: Número<br/>
**Por defecto**: `100`<br/>
El porcentaje de solicitudes que se van a rastrear: `100` para todas, `0` para ninguna. Para obtener más información, consulta [Conectar RUM y trazas][12].

`telemetrySampleRate`
: Opcional<br/>
**Tipo**: Número<br/>
**Por defecto**: `20`<br/>
Se envían datos de telemetría (como errores y logs de depuración) sobre la ejecución del SDK a Datadog para detectar y solucionar posibles problemas. Configura esta opción en `0` si no quieres activar la recopilación de telemetría.

`excludedActivityUrls`
: Opcional<br/>
**Tipo**: Lista<br/>
Una lista de orígenes de solicitudes que se ignoraron al calcular la actividad de la página. Consulta [Cómo se calcula la actividad de la página][11].

`workerUrl`
: Opcional<br/>
**Tipo**: Cadena<br/>
La URL que apunta al archivo Worker JavaScript de Datadog Browser. La URL puede ser relativa o absoluta, pero se requiere que tenga el mismo origen que la aplicación web. Consulta [Directrices de la política de seguridad de contenidos][13] para obtener más información.

`compressIntakeRequests`
: Opcional<br/>
**Tipo**: Booleano<br/>
**Por defecto**: `false`<br/>
Comprime las solicitudes enviadas a la entrada de Datadog para reducir el uso del ancho de banda cuando se envían grandes cantidades de datos. La compresión se realiza en un subproceso de Worker. Consulta las [Directrices de la política de seguridad de contenidos][13] para obtener más información.

`storeContextsAcrossPages`
: Opcional<br/>
**Tipo**: Booleano<br/>
**Por defecto**: `false`<br/>
Almacena el contexto global y el contexto de usuario en `localStorage` para preservarlos a lo largo de la navegación del usuario. Consulta [Ciclo de vida de contextos][25] para más detalles y limitaciones específicas.

`allowUntrustedEvents`
: Opcional<br/>
**Tipo**: Booleano<br/>
**Por defecto**: `false`<br/>
Permitir la captura de [eventos no fiables][26], por ejemplo en tests automatizados de la interfaz de usuario.

Opciones que deben tener una configuración coincidente cuando utilices el SDK del navegador para logs:

`trackSessionAcrossSubdomains`
: Opcional<br/>
**Tipo**: Booleano<br/>
**Por defecto**: `false`<br/>
Conservar la sesión en diferentes subdominios para el mismo sitio.

`useSecureSessionCookie`
: Opcional<br/>
**Tipo**: Booleano<br/>
**Por defecto**: `false`<br/>
Utilizar una cookie de sesión segura. Esto desactiva eventos de RUM enviados en conexiones no seguras (no HTTPS).

`usePartitionedCrossSiteSessionCookie`
: Opcional<br/>
**Tipo**: Booleano<br/>
**Por defecto**:`false`<br/>
Utilizar una cookie de sesión segura entre sitios con particiones. Esto permite que el SDK del RUM Browser se ejecute cuando el sitio se carga desde otro (fotograma). Implica `useSecureSessionCookie`.

`useCrossSiteSessionCookie`
: Opcional - **Obsoleto**<br/>
**Tipo**: Booleano<br/>
**Por defecto**:`false`<br/>
Consulta `usePartitionedCrossSiteSessionCookie`.

`allowFallbackToLocalStorage`
: Opcional<br/>
**Tipo**: Booleano<br/>
**Por defecto**: `false`<br/>
Permite el uso de `localStorage` cuando no se pueden configurar cookies. Esto permite que el SDK de RUM Browser se ejecute en entornos que no proporcionan soporte para cookies. Consulta [Aplicaciones de Monitor Electron que utilizan el SDK del navegador][27] para un caso de uso típico.

### Etiquetado

Un servicio es un repositorio de código independiente e implementable que se asigna a un conjunto de páginas.

- Si tu aplicación de navegador se construyó como un monolito, tu aplicación de RUM tendrá un nombre de servicio para la aplicación.
- Si tu aplicación de navegador se construyó como repositorios separados para varias páginas, edita los nombres de servicio por defecto en todo el ciclo de vida de tu aplicación.

### Acceder al contexto interno

Una vez inicializado el SDK de RUM Browser, puedes acceder al contexto interno del SDK.

Puedes explorar los siguientes atributos:

| Atributo      | Descripción                                                       |
| -------------- | ----------------------------------------------------------------- |
| application_id | ID de la aplicación.                                            |
| session_id     | ID de la sesión.                                                |
| user_action    | Objeto que contiene un ID de acción (o no identificado si no se encuentra ninguna acción). |
| view           | Objeto que contiene detalles sobre el evento de vista actual.           |

Para obtener más información, consulta [Datos recopilados del RUM Browser][4].

#### Ejemplo

```
{
  application_id : "xxx",
  session_id : "xxx",
  user_action: { id: "xxx" },
  view : {
    id : "xxx",
    origen de referencia : "",
    url: "http://localhost:8080/",
    nombre: "homepage"
  }
}
```

También puedes utilizar el parámetro `startTime` para obtener el contexto de un momento específico. Si se omite el parámetro, se regresa el contexto actual.

```
getInternalContext (startTime?: 'number' | undefined)
```

#### NPM

Para NPM, utiliza:

```JavaScript
importar { datadogRum } desde '@datadog/browser-rum'

datadogRum.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
```

#### CDN asíncrono

Para CDN asíncrono, utiliza:

```JavaScript
window.DD_RUM.onReady(function () {
  window.DD_RUM.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
})
```

#### CDN síncrono

Para CDN síncrono, utiliza:

```JavaScript
window.DD_RUM && window.DD_RUM.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/BROWSER_SUPPORT.md
[2]: /es/data_security/real_user_monitoring/#shared-responsibility
[3]: https://app.datadoghq.com/rum/list
[4]: /es/real_user_monitoring/data_collected/
[5]: /es/getting_started/tagging/using_tags
[6]: https://www.datadoghq.com/pricing/?product=real-user-monitoring--session-replay#real-user-monitoring--session-replay
[7]: /es/real_user_monitoring/guide/sampling-browser-plans/
[8]: /es/real_user_monitoring/session_replay/browser/
[9]: /es/real_user_monitoring/session_replay/browser/privacy_options
[10]: /es/real_user_monitoring/platform/dashboards/
[11]: /es/real_user_monitoring/browser/monitoring_page_performance/#how-page-activity-is-calculated
[12]: /es/real_user_monitoring/platform/connect_rum_and_traces?tab=browserrum
[13]: /es/integrations/content_security_policy_logs/#use-csp-with-real-user-monitoring-and-session-replay
[14]: https://www.npmjs.com/package/@datadog/browser-rum
[15]: /es/account_management/api-app-keys/#client-tokens
[16]: /es/getting_started/site/
[17]: /es/getting_started/tagging/#define-tags
[18]: /es/real_user_monitoring/browser/advanced_configuration/#user-tracking-consent
[19]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#override-default-rum-view-names
[20]: /es/real_user_monitoring/browser/tracking_user_actions
[21]: /es/real_user_monitoring/session_replay/privacy_options?tab=maskuserinput
[22]: /es/real_user_monitoring/browser/tracking_user_actions/#declare-a-name-for-click-actions
[23]: /es/real_user_monitoring/session_replay/browser/#usage
[24]: /es/real_user_monitoring/guide/proxy-rum-data/
[25]: /es/real_user_monitoring/browser/advanced_configuration#contexts-life-cycle
[26]: https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted
[27]: /es/real_user_monitoring/guide/monitor-electron-applications-using-browser-sdk
[28]: https://www.datadoghq.com/private-beta/rum-sdk-auto-injection/
[29]: /es/real_user_monitoring/session_replay/browser/privacy_options/#mask-action-names