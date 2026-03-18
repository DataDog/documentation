---
algolia:
  tags:
  - browser logs
aliases:
- /es/logs/log_collection/web_browser
title: Colección de registros del navegador
---
Envíe registros a Datadog desde las páginas del navegador web con el SDK de registros del navegador.

Con el SDK de registros del navegador, puede enviar registros directamente a Datadog desde las páginas del navegador web y aprovechar las siguientes características:

 Usa el SDK como registrador. Todo se envía a Datadog como documentos JSON.
 Añade `contexto` y atributos personalizados adicionales a cada registro enviado.
 Envolver y reenviar cada error de frontend automáticamente.
 Errores frontales.
 Grabar direcciones IP de clientes reales y agentes de usuario.
 Uso optimizado de la red con publicaciones masivas automáticas.
 Uso en entornos Worker y Service Worker.

**Notas**:

 **Independiente del SDK de RUM**: El SDK de Browser Logs se puede usar sin el SDK de RUM.
 **Entornos de trabajo**: El SDK de registros del explorador funciona en entornos de trabajo y de servicio utilizando los mismos métodos de configuración. Sin embargo, los registros enviados desde entornos Worker no incluyen automáticamente información de sesión.

## Setup

### Paso 1 Crear un token de cliente

En Datadog, vaya a [**Configuración de la organización > Nuevos tokens de cliente**][1]

**Entornos soportados**: El SDK de registros de navegador admite todos los navegadores modernos de escritorio y móviles, así como entornos Worker y Service Worker. Consulte la tabla [Soporte del navegador][4].

<div class="alert alert-info">For security reasons, <a href="https://docs.datadoghq.com/account_management/api-app-keys/#api-keys">API keys</a> cannot be used to configure the browser logs SDK, because they would be exposed client-side in the JavaScript code. To collect logs from web browsers, a <a href="https://docs.datadoghq.com/account_management/api-app-keys/#client-tokens">client token</a> must be used.</div>  

### Paso 2 Instalar el SDK del navegador de registros

Elija el método de instalación para el SDK del navegador.

{{< tabs >}}
{{% tab "MNP" %}}

Para aplicaciones web modernas, Datadog recomienda instalar a través de Node Package Manager (npm). El SDK del navegador se empaqueta con el resto de su código JavaScript frontend. No tiene ningún impacto en el rendimiento de carga de la página. Sin embargo, es posible que el SDK no capture errores o registros de consola que ocurran antes de que se inicialice el SDK. Datadog recomienda usar una versión coincidente con el SDK de Browser Logs.  

Agregue [`@datadog/browserlogs`][13] a su archivo `package.json`. Por ejemplo, si usa npm cli.  

[13]: https://www.npmjs.com/package/@datadog/browserlogs

{{% /tab %}}
{{% tab "CDN async" %}}

Las aplicaciones web con objetivos de rendimiento deben instalarse a través de CDN async. El SDK del navegador se carga desde la CDN de Datadog de forma asíncrona, lo que garantiza que no afecte al rendimiento de la carga de la página. Sin embargo, es posible que el SDK no capture errores o registros de consola que ocurran antes de que se inicialice el SDK.  

Agregue el fragmento de código generado a la etiqueta principal de cada página HTML que desee monitorear en su aplicación.

{{< site-region region="us" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v6/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="eu" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu/v6/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="ap1" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v6/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="ap2" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap2/v6/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="us3" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v6/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="us5" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v6/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="gov" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-logs-v6.js','DD_LOGS')
</script>
```

{{< /site-region >}}

{{% /tab %}}
{{% tab "CDN sync" %}}

Para recopilar todos los eventos, debe instalar a través de CDN sync. El SDK del navegador se carga desde la CDN de Datadog de forma sincronizada, lo que garantiza que el SDK se cargue primero y recoja todos los errores, recursos y acciones del usuario. Este método puede afectar el rendimiento de la carga de la página.  

Añade el fragmento de código generado a la etiqueta head (delante de cualquier otra etiqueta script) de cada página HTML que quieras monitorizar en tu aplicación. Colocar la etiqueta script más alta y cargarla de forma sincronizada garantiza que Datadog RUM pueda recopilar todos los datos de rendimiento y errores.

{{< site-region region="us" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us1/v6/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="eu" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/eu/v6/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="ap1" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/ap1/v6/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="ap2" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/ap2/v6/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="us3" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us3/v6/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="us5" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us5/v6/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="gov" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/datadog-logs-v6.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}

{{% /tab %}}
{{< /tabs >}}

### Paso 3 Inicializar el SDK del navegador de registros

El SDK debe inicializarse lo antes posible en el ciclo de vida de la aplicación. Esto garantiza que todos los registros se capturen correctamente.

En el fragmento de inicialización, establezca el token del cliente y el sitio. Consulte la lista completa de [parámetros de inicialización][4].

{{< tabs >}}
{{% tab "MNP" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.init({
  clientToken: '<CLIENT_TOKEN>',
  // `site` refers to the Datadog site parameter of your organization
  // see https://docs.datadoghq.com/getting_started/site/
  site: '<DATADOG_SITE>',
  forwardErrorsToLogs: true,
  sessionSampleRate: 100,
});

```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
<script>
  window.DD_LOGS.onReady(function() {
    window.DD_LOGS.init({
      clientToken: '<CLIENT_TOKEN>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: '<DATADOG_SITE>',
      forwardErrorsToLogs: true,
      sessionSampleRate: 100,
    });
  })
</script>
```

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
<script>
    window.DD_LOGS && window.DD_LOGS.init({
      clientToken: '<CLIENT_TOKEN>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: '<DATADOG_SITE>',
      forwardErrorsToLogs: true,
      sessionSampleRate: 100,
    });
</script>
```

{{% /tab %}}
{{< /tabs >}}

#### Configurar el consentimiento de seguimiento (cumplimiento de GDPR)

Para cumplir con GDPR, CCPA y regulaciones similares, el SDK del navegador RUM le permite proporcionar el [valor de consentimiento de seguimiento en la inicialización][5].

#### Configurar directiva de seguridad de contenido (CSP)

Si usas la integración de la directiva de seguridad de contenido (CSP) de Datadog en tu sitio, consulta [la documentación de CSP][6] para ver los pasos de configuración adicionales.

### Paso 4 Visualiza tus datos

Ahora que ha completado la configuración básica para los registros, su aplicación recopila registros del navegador y puede comenzar a monitorear y depurar problemas en tiempo real.

Visualice los registros en el Explorador de registros.

## Uso

### Registros personalizados

Después de inicializar el SDK de registros del navegador Datadog, envíe una entrada de registro personalizada directamente a Datadog con la API:

```tipografía
logger.debug | info | warn | error (message: string, messageContext?: Context, error?: Error)
```

{{< tabs >}}
{{% tab "MNP" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
})
```

**Nota**: Las primeras llamadas API deben envolverse en la devolución de llamada `window.DD_LOGS.onReady()`. Esto garantiza que el código solo se ejecute una vez que el SDK se cargue correctamente.

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

**Nota**: La comprobación `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Resultados

Los resultados son los mismos cuando se usa NPM, CDN async o CDN sync:

```json
{
  "status": "info",
  "session_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "name": "buttonName",
  "id": 123,
  "message": "Button clicked",
  "date": 1234567890000,
  "origin": "logger",
  "http": {
    "useragent": "Mozilla/5.0 ...",
  },
  "view": {
    "url": "https://...",
    "referrer": "https://...",
  },
  "network": {
    "client": {
      "geoip": {...}
      "ip": "xxx.xxx.xxx.xxx"
    }
  }
}
```

El SDK de Logs añade la siguiente información de forma predeterminada (se pueden añadir más campos si el SDK de RUM está
present):

 `fecha`
 `view.url`
 `view.referrer`
 `session_id` (solo si se usa una sesión)

El backend Datadog añade más campos, como:

 `http.useragent`
 `network.client.ip`

### Seguimiento de errores

El SDK de registros del navegador Datadog permite el seguimiento manual de errores mediante el parámetro “error” opcional (disponible en SDK v4.36.0+). Cuando se proporciona una instancia de un [Error de JavaScript][8], el SDK extrae información relevante (tipo, mensaje, rastro de pila) del error.

```tipografía
logger.{debug|info|warn|error}(message: string, messageContext?: Context, error?: Error)
```

{{< tabs >}}
{{% tab "MNP" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

try {
  ...
  throw new Error('Wrong behavior')
  ...
} catch (ex) {
  datadogLogs.logger.error('Error occurred', {}, ex)
}
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
try {
  ...
  throw new Error('Wrong behavior')
  ...
} catch (ex) {
  window.DD_LOGS.onReady(function () {
    window.DD_LOGS.logger.error('Error occurred', {}, ex)
  })
}
```

**Nota**: Las primeras llamadas API deben envolverse en la devolución de llamada `window.DD_LOGS.onReady()`. Esto garantiza que el código solo se ejecute una vez que el SDK se cargue correctamente.

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
try {
  ...
  throw new Error('Wrong behavior')
  ...
} catch (ex) {
    window.DD_LOGS && window.DD_LOGS.logger.error('Error occurred', {}, ex)
}
```

**Nota**: La comprobación `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Resultados

Los resultados son los mismos cuando se usa NPM, CDN async o CDN sync:

```json
{
  "status": "error",
  "session_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "message": "Error occurred",
  "date": 1234567890000,
  "origin": "logger",
  "error" : {
    "message": "Wrong behavior",
    "kind" : "Error",
    "stack" : "Error: Wrong behavior at <anonymous> @ <anonymous>:1:1"
  },
  ...
}
```

### Función de registrador genérico

El SDK de registros del navegador Datadog añade funciones abreviadas (`.debug`, `.info`, `.warn`, `.error`) a los registradores para mayor comodidad. También hay disponible una función genérica de registro, que expone el parámetro `status`:

```tipografía
log(message: string, messageContext?: Context, status? = 'debug' | 'info' | 'warn' | 'error', error?: Error)
```

{{< tabs >}}
{{% tab "MNP" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
window.DD_LOGS.onReady(function() {
  window.DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
})
```

**Nota**: Las primeras llamadas API deben envolverse en la devolución de llamada `window.DD_LOGS.onReady()`. Esto garantiza que el código solo se ejecute una vez que el SDK se cargue correctamente.

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
```

**Nota**: La comprobación `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Marcadores de posición

Los marcadores de posición en los ejemplos anteriores se describen a continuación:

| Marcador de posición | Descripción |
|  |  |
| `<MESSAGE>` | El mensaje de su registro que está completamente indexado por Datadog.                               |
| `<JSON_ATTRIBUTES>` | Un objeto JSON válido, que incluye todos los atributos adjuntos al `<MESSAGE>`.         |
| `<STATUS>` | El estado de su registro; los valores de estado aceptados son `debug`, `info`, `warn` o `error`. |
| `<ERROR>` | Una instancia de un objeto [JavaScript Error][8].                                         |

## Uso avanzado

### Fregar datos sensibles de los registros de su navegador

Si los registros del navegador contienen información sensible que necesita ser redactada, configure el SDK del navegador para borrar secuencias sensibles utilizando la devolución de llamada "beforeSend" cuando inicialice el recopilador de registros del navegador.

La función de devolución de llamada `beforeSend` se puede invocar con dos argumentos: el evento `log` y `context`. Esta función le da acceso a cada registro recopilado por el SDK del navegador antes de que se envíe a Datadog, y le permite usar el contexto para ajustar cualquier propiedad de registro. El contexto contiene información adicional relacionada con el evento, pero no necesariamente incluida en el evento. Normalmente puedes usar esta información para [enriquecer][11] tu evento o [descartar][12] él.

```javascript
function beforeSend(log, context)
```

Los valores potenciales del `contexto` son:

| Valor | Tipo de datos | Caso de uso |
||||
| `isAborted` | Boolean | Para los eventos de registro de red, esta propiedad le indica si la solicitud fallida fue abortada por la aplicación, en cuyo caso es posible que no desee enviar este evento porque puede ser abortado intencionalmente. |
| `handlingStack` | String | Una traza de pila de donde se manejó el evento de registro. Esto se puede usar para identificar desde qué [microfrontend] [9] se envió el registro. |

Para borrar direcciones de correo electrónico de las URL de tu aplicación web:

{{< tabs >}}
{{% tab "MNP" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.init({
    ...,
    beforeSend: (log) => {
        // remove email from view url
        log.view.url = log.view.url.replace(/email=[^&]*/, "email=REDACTED")
    },
    ...
});
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
window.DD_LOGS.onReady(function() {
    window.DD_LOGS.init({
        ...,
        beforeSend: (log) => {
            // remove email from view url
            log.view.url = log.view.url.replace(/email=[^&]*/, "email=REDACTED")
        },
        ...
    })
})
```

**Nota**: Las primeras llamadas API deben envolverse en la devolución de llamada `window.DD_LOGS.onReady()`. Esto garantiza que el código solo se ejecute una vez que el SDK se cargue correctamente.

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_LOGS &&
    window.DD_LOGS.init({
        ...,
        beforeSend: (log) => {
            // remove email from view url
            log.view.url = log.view.url.replace(/email=[^&]*/, "email=REDACTED")
        },
        ...
    });
```

**Nota**: La comprobación `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

El SDK recopila automáticamente las siguientes propiedades que podrían contener datos confidenciales:

| Atributo | Tipo | Descripción |
|  |  |  |
| `view.url` | String | La URL de la página web activa.                                                                  |
| `view.referrer` | String | La URL de la página web anterior desde la que se siguió un enlace a la página solicitada actualmente. |
| `mensaje` | Cadena | El contenido del registro.                                                                          |
| `error.stack` | String | El rastro de la pila o información complementaria sobre el error.                                    |
| `http.url` | Cadena | La URL HTTP.                                                                                    |

### Descartar registros específicos

La función de devolución de llamada "beforeSend" le permite también descartar un registro antes de que se envíe a Datadog.

Para descartar errores de red si su estado es 404:

{{< tabs >}}
{{% tab "MNP" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.init({
    ...,
    beforeSend: (log) => {
        // discard 404 network errors
        if (log.http && log.http.status_code === 404) {
          return false
        }
    },
    ...
});
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
window.DD_LOGS.onReady(function() {
    window.DD_LOGS.init({
        ...,
        beforeSend: (log) => {
          // discard 404 network errors
          if (log.http && log.http.status_code === 404) {
            return false
          }
        },
        ...
    })
})
```

**Nota**: Las primeras llamadas API deben envolverse en la devolución de llamada `window.DD_LOGS.onReady()`. Esto garantiza que el código solo se ejecute una vez que el SDK se cargue correctamente.

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_LOGS &&
    window.DD_LOGS.init({
        ...,
        beforeSend: (log) => {
          // discard 404 network errors
          if (log.http && log.http.status_code === 404) {
            return false
          }
        },
        ...
    });
```

**Nota**: La comprobación `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

### Definir varios registradores

El SDK de registros del navegador Datadog contiene un registrador predeterminado, pero es posible definir diferentes registradores.

#### Crear un nuevo registrador

Después de inicializar el SDK de registros del navegador Datadog, utilice la API `createLogger` para definir un nuevo logger:

```tipografía
createLogger (name: string, conf?: {
    level?: 'debug' | 'info' | 'warn' | 'error',
    handler?: 'http' | 'console' | 'silent',
    context?: Context
})
```

**Nota**: Estos parámetros se pueden establecer con las API [setLevel](#filterbystatus), [setHandler](#changethedestination) y [setContext](#overwritecontext).

#### Obtener un registrador personalizado

Después de la creación de un registrador, acceda a él en cualquier parte de su código JavaScript con la API:

```tipografía
getLogger(name: string)
```

{{< tabs >}}
{{% tab "MNP" %}}

Por ejemplo, supongamos que hay un `signupLogger`, definido con todos los demás loggers:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.createLogger('signupLogger', {
  level: 'info',
  handler: 'http',
  context: { env: 'staging' }
})
```

Luego se puede usar en una parte diferente del código con:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

const signupLogger = datadogLogs.getLogger('signupLogger')
signupLogger.info('Test sign up completed')
```

{{% /tab %}}
{{% tab "CDN async" %}}

Por ejemplo, supongamos que hay un `signupLogger`, definido con todos los demás loggers:

```javascript
window.DD_LOGS.onReady(function () {
  const signupLogger = window.DD_LOGS.createLogger('signupLogger', {
    level: 'info',
    handler: 'http',
    context: { env: 'staging' }
  })
})
```

Luego se puede usar en una parte diferente del código con:

```javascript
window.DD_LOGS.onReady(function () {
  const signupLogger = window.DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
})
```

**Nota**: Las primeras llamadas API deben envolverse en la devolución de llamada `window.DD_LOGS.onReady()`. Esto garantiza que el código solo se ejecute una vez que el SDK se cargue correctamente.

{{% /tab %}}
{{% tab "CDN sync" %}}

Por ejemplo, supongamos que hay un `signupLogger`, definido con todos los demás loggers:

```javascript
if (window.DD_LOGS) {
  const signupLogger = window.DD_LOGS.createLogger('signupLogger', {
    level: 'info',
    handler: 'http',
    context: { env: 'staging' }
  })
}
```

Luego se puede usar en una parte diferente del código con:

```javascript
if (window.DD_LOGS) {
  const signupLogger = window.DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
}
```

**Nota**: La comprobación `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

### Sobrescribir contexto

#### Contexto global

Después de inicializar el SDK de registros del navegador Datadog, es posible:

 Establezca todo el contexto para todos sus registradores con la API `setGlobalContext (context: object)`.
 Agregue un contexto a todos sus registradores con la API `setGlobalContextProperty (key: string, value: any)`.
 Obtenga todo el contexto global con la API `getGlobalContext ()`.
 Eliminar la propiedad context con la API `removeGlobalContextProperty (key: string)`.
 Borre todas las propiedades de contexto existentes con la API `clearGlobalContext ()`.

> El SDK del navegador de registros v4.17.0 ha actualizado los nombres de varias API:
>
> `getGlobalContext` en lugar de `getLoggerGlobalContext`
> `setGlobalContext` en lugar de `setLoggerGlobalContext`
> `setGlobalContextProperty` en lugar de `addLoggerGlobalContext`
> `removeGlobalContextProperty` en lugar de `removeLoggerGlobalContext`

{{< tabs >}}
{{% tab "MNP" %}}

Para el MNP, utilice:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setGlobalContext({ env: 'staging' })

datadogLogs.setGlobalContextProperty('referrer', document.referrer)

datadogLogs.getGlobalContext() // => {env: 'staging', referrer: ...}

datadogLogs.removeGlobalContextProperty('referrer')

datadogLogs.getGlobalContext() // => {env: 'staging'}

datadogLogs.clearGlobalContext()

datadogLogs.getGlobalContext() // => {}
```

{{% /tab %}}
{{% tab "CDN async" %}}

Para la sincronización CDN, use:

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setGlobalContext({ env: 'staging' })
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setGlobalContextProperty('referrer', document.referrer)
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getGlobalContext() // => {env: 'staging', referrer: ...}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.removeGlobalContextProperty('referrer')
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getGlobalContext() // => {env: 'staging'}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.clearGlobalContext()
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getGlobalContext() // => {}
})
```

**Nota**: Las primeras llamadas API deben envolverse en la devolución de llamada `window.DD_LOGS.onReady()`. Esto garantiza que el código solo se ejecute una vez que el SDK se cargue correctamente.

{{% /tab %}}
{{% tab "CDN sync" %}}

Para la sincronización CDN, use:

```javascript
window.DD_LOGS && window.DD_LOGS.setGlobalContext({ env: 'staging' })

window.DD_LOGS && window.DD_LOGS.setGlobalContextProperty('referrer', document.referrer)

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {env: 'staging', referrer: ...}

window.DD_LOGS && window.DD_LOGS.removeGlobalContextProperty('referrer')

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {env: 'staging'}

window.DD_LOGS && window.DD_LOGS.clearGlobalContext()

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {}
```

**Nota**: La comprobación `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Contexto de usuario

El Datadog logs SDK proporciona funciones convenientes para asociar un `Usuario` con los registros generados.

 Configure el usuario para todos sus registradores con la API `setUser (newUser: User)`.
 Agregue o modifique una propiedad de usuario a todos sus registradores con la API `setUserProperty (key: string, value: any)`.
 Obtener el usuario almacenado actualmente con la API `getUser ()`.
 Eliminar una propiedad de usuario con la API `removeUserProperty (key: string)`.
 Borre todas las propiedades de usuario existentes con la API `clearUser ()`.

**Nota**: El contexto de usuario se aplica antes que el contexto global. Por lo tanto, cada propiedad de usuario incluida en el contexto global anulará el contexto de usuario al generar registros.

{{< tabs >}}
{{% tab "MNP" %}}

Para el MNP, utilice:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setUser({ id: '1234', name: 'John Doe', email: 'john@doe.com' })
datadogLogs.setUserProperty('type', 'customer')
datadogLogs.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com', type: 'customer'}

datadogLogs.removeUserProperty('type')
datadogLogs.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com'}

datadogLogs.clearUser()
datadogLogs.getUser() // => {}
```

{{% /tab %}}
{{% tab "CDN async" %}}

Para la sincronización CDN, use:

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setUser({ id: '1234', name: 'John Doe', email: 'john@doe.com' })
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setUserProperty('type', 'customer')
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com', type: 'customer'}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.removeUserProperty('type')
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com'}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.clearUser()
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getUser() // => {}
})
```

**Nota**: Las primeras llamadas API deben envolverse en la devolución de llamada `window.DD_LOGS.onReady()`. Esto garantiza que el código solo se ejecute una vez que el SDK se cargue correctamente.

{{% /tab %}}
{{% tab "CDN sync" %}}

Para la sincronización CDN, use:

```javascript
window.DD_LOGS && window.DD_LOGS.setUser({ id: '1234', name: 'John Doe', email: 'john@doe.com' })

window.DD_LOGS && window.DD_LOGS.setUserProperty('type', 'customer')

window.DD_LOGS && window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com', type: 'customer'}

window.DD_LOGS && window.DD_LOGS.removeUserProperty('type')

window.DD_LOGS && window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com'}

window.DD_LOGS && window.DD_LOGS.clearUser()

window.DD_LOGS && window.DD_LOGS.getUser() // => {}
```

**Nota**: La comprobación `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Contexto de la cuenta

El Datadog logs SDK proporciona funciones convenientes para asociar una `Cuenta` con los registros generados.

 Configure la cuenta de todos sus registradores con la API `setAccount (newAccount: Account)`.
 Agregue o modifique una propiedad de cuenta a todos sus registradores con la API `setAccountProperty (key: string, value: any)`.
 Obtenga la cuenta almacenada actualmente con la API `getAccount ()`.
 Eliminar una propiedad de cuenta con la API `removeAccountProperty (key: string)`.
 Borre todas las propiedades de cuenta existentes con la API `clearAccount ()`.

**Nota**: El contexto de la cuenta se aplica antes que el contexto global. Por lo tanto, cada propiedad de cuenta incluida en el contexto global anulará el contexto de cuenta al generar registros.

{{< tabs >}}
{{% tab "MNP" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setAccount({ id: '1234', name: 'My Company Name' })
datadogLogs.setAccountProperty('type', 'premium')
datadogLogs.getAccount() // => {id: '1234', name: 'My Company Name', type: 'premium'}

datadogLogs.removeAccountProperty('type')
datadogLogs.getAccount() // => {id: '1234', name: 'My Company Name'}

datadogLogs.clearAccount()
datadogLogs.getAccount() // => {}
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setAccount({ id: '1234', name: 'My Company Name' })
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setAccountProperty('type', 'premium')
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getAccount() // => {id: '1234', name: 'My Company Name', type: 'premium'}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.removeAccountProperty('type')
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getAccount() // => {id: '1234', name: 'My Company Name'}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.clearAccount()
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getAccount() // => {}
})
```

**Nota**: Las primeras llamadas API deben envolverse en la devolución de llamada `window.DD_LOGS.onReady()`. Esto garantiza que el código solo se ejecute una vez que el SDK se cargue correctamente.

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.setAccount({ id: '1234', name: 'My Company Name' })

window.DD_LOGS && window.DD_LOGS.setAccountProperty('type', 'premium')

window.DD_LOGS && window.DD_LOGS.getAccount() // => {id: '1234', name: 'My Company Name', type: 'premium'}

window.DD_LOGS && window.DD_LOGS.removeAccountProperty('type')

window.DD_LOGS && window.DD_LOGS.getAccount() // => {id: '1234', name: 'My Company Name'}

window.DD_LOGS && window.DD_LOGS.clearAccount()

window.DD_LOGS && window.DD_LOGS.getAccount() // => {}
```

**Nota**: La comprobación `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Contextos ciclo de vida

De forma predeterminada, los contextos se almacenan en la memoria de la página actual, lo que significa que no son:

 conservados después de una recarga completa de la página
 compartidos en diferentes pestañas o ventanas de una misma sesión

Para agregarlos a todos los eventos de la sesión, deben adjuntarse a cada página.

Con la introducción de la opción de configuración `storeContextsAcrossPages` en la versión 4.49.0 del SDK del navegador, esos contextos se pueden almacenar en [`localStorage`][9], permitiendo los siguientes comportamientos:

 Los contextos se conservan después de una recarga completa
 Los contextos se sincronizan entre pestañas abiertas en el mismo origen

Sin embargo, esta característica viene con algunas **limitaciones**:

 No se recomienda configurar la información de identificación personal (PII) en esos contextos, ya que los datos almacenados en `localStorage` sobreviven a la sesión del usuario
 La función es incompatible con las opciones de `trackSessionAcrossSubdomains` porque los datos de `localStorage` solo se comparten entre el mismo origen (login.site.com ≠ app.site.com)
 “localStorage” está limitado a 5 MiB por origen, por lo que los datos específicos de la aplicación, contextos Datadog y otros datos de terceros almacenados en “localStorage” deben estar dentro de este límite para evitar cualquier problema.

#### Contexto del registrador

Después de crear un registrador, es posible:

 Establezca todo el contexto de su registrador con la API `setContext (context: object)`.
 Establezca una propiedad de contexto en su registrador con `setContextProperty (key: string, value: any)` API:

{{< tabs >}}
{{% tab "MNP" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setContext("{'env': 'staging'}")

datadogLogs.setContextProperty('referrer', document.referrer)
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setContext("{'env': 'staging'}")
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setContextProperty('referrer', document.referrer)
})
```

**Nota**: Las primeras llamadas API deben envolverse en la devolución de llamada `window.DD_LOGS.onReady()`. Esto garantiza que el código solo se ejecute una vez que el SDK se cargue correctamente.

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.setContext("{'env': 'staging'}")

window.DD_LOGS && window.DD_LOGS.setContextProperty('referrer', document.referrer)
```

**Nota**: La comprobación `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

### Filtrar por estado

Después de inicializar el SDK de registros del navegador Datadog, el nivel de registro mínimo para su registrador se establece con la API:

```tipografía
setLevel (level?: 'debug' | 'info' | 'warn' | 'error')
```

Solo se envían registros con un estado igual o superior al nivel especificado.

{{< tabs >}}
{{% tab "MNP" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.setLevel('<LEVEL>')
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.setLevel('<LEVEL>')
})
```

**Nota**: Las primeras llamadas API deben envolverse en la devolución de llamada `window.DD_LOGS.onReady()`. Esto garantiza que el código solo se ejecute una vez que el SDK se cargue correctamente.

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.setLevel('<LEVEL>')
```

**Nota**: La comprobación `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

### Cambiar el destino

De forma predeterminada, los registradores creados por el SDK de registros del navegador Datadog envían registros a Datadog. Después de inicializar el SDK de registros del navegador Datadog, es posible configurar el registrador para:

 enviar registros a la `consola` y Datadog (`http`)
 enviar registros a la `consola` solamente
 no enviar registros en absoluto (`silencioso`)

```tipografía
setHandler (handler?: 'http' | 'console' | 'silent' | Array<handler>)
```

{{< tabs >}}
{{% tab "MNP" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.setHandler('<HANDLER>')
datadogLogs.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
```

{{% /tab %}}

{{% tab "CDN async" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.setHandler('<HANDLER>')
  window.DD_LOGS.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
})
```

**Nota**: Las primeras llamadas API deben envolverse en la devolución de llamada `window.DD_LOGS.onReady()`. Esto garantiza que el código solo se ejecute una vez que el SDK se cargue correctamente.

{{% /tab %}}
{{% tab "CDN sync" %}}

Para la sincronización CDN, use:

```javascript
window.DD_LOGS && window.DD_LOGS.logger.setHandler('<HANDLER>')
window.DD_LOGS && window.DD_LOGS.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
```

**Nota**: La comprobación `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

### Consentimiento de seguimiento de usuario

Para cumplir con GDPR, CCPA y regulaciones similares, el SDK del navegador de registros le permite proporcionar el valor de consentimiento de seguimiento en la inicialización.

El parámetro de inicialización `trackingConsent` puede ser uno de los siguientes valores:

1. `"concedido"`: El SDK del explorador de registros comienza a recopilar datos y los envía a Datadog.
2. ``no concedido"`: El SDK del navegador de registros no recopila ningún dato.

Para cambiar el valor de consentimiento de seguimiento después de inicializar el SDK del explorador de registros, utilice la llamada a la API `setTrackingConsent()`. El SDK del navegador de registros cambia su comportamiento de acuerdo con el nuevo valor:

 Cuando se cambia de `"concedido"` a `"no concedido"`, la sesión de Registros se detiene y los datos ya no se envían a Datadog.
 cuando se cambia de `"no concedido"` a `"concedido"`, se crea una nueva sesión de Registros si no hay ninguna sesión anterior activa, y se reanuda la recopilación de datos.

Este estado no se sincroniza entre pestañas ni persiste entre navegación. Es su responsabilidad proporcionar la decisión del usuario durante la inicialización del SDK del navegador de registros o mediante el uso de `setTrackingConsent()`.

Cuando se usa `setTrackingConsent()` antes de `init()`, el valor proporcionado tiene prioridad sobre el parámetro de inicialización.

{{< tabs >}}
{{% tab "MNP" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.init({
    ...,
    trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', function() {
    datadogLogs.setTrackingConsent('granted');
});
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
window.DD_LOGS.onReady(function() {
    window.DD_LOGS.init({
        ...,
        trackingConsent: 'not-granted'
    });
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_LOGS.onReady(function() {
        window.DD_LOGS.setTrackingConsent('granted');
    });
});
```

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.init({
  ...,
  trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_LOGS && window.DD_LOGS.setTrackingConsent('granted');
});
```

{{% /tab %}}
{{< /tabs >}}

### Acceder al contexto interno

Después de inicializar el SDK de registros del navegador Datadog, puede acceder al contexto interno del SDK. Esto le permite acceder al `session_id`.

```tipografía
getInternalContext (startTime?: 'number' | undefined)
```

Opcionalmente puede usar el parámetro `startTime` para obtener el contexto de un tiempo específico. Si se omite el parámetro, se devuelve el contexto actual.

{{< tabs >}}
{{% tab "MNP" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
```

{{% /tab %}}

{{% tab "CDN async" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
})
```

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
```

{{% /tab %}}
{{< /tabs >}}

<!-- Note: all URLs should be absolute -->

[1]: https://app.datadoghq.com/organizationsettings/clienttokens [4]: https://datadoghq.dev/browsersdk/interfaces/_datadog_browserlogs.LogsInitConfiguration.html [5]: /logs/log_collection/javascript/#usertrackingconsent [6]: /integrations/content_security_policy_logs/#usecspwithrealusermonitoringandsessionreplay [7]: /logs/explorer/ [8]: <https: mem-invalid-attributes-holder=developer.mozilla.org mem-invalid-attributes-holder=en-us mem-invalid-attributes-holder=docs mem-invalid-attributes-holder=web mem-invalid-attributes-holder=javascript mem-invalid-attributes-holder=reference mem-invalid-attributes-holder=global_objects mem-invalid-attributes-holder=error>
[9]: https://developer.mozilla.org/enUS/docs/Web/API/Window/localStorage [11]: /real_user_monitoring/browser/advanced_configuration/?tab=npm#enrichandcontrolrumdata [12]: /real_user_monitoring/browser/advanced_configuration/?tab=npm#discardarumevent