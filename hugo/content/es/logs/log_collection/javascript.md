---
algolia:
  tags:
  - browser logs
aliases:
- /es/logs/log_collection/web_browser
title: Recopilación de registros del navegador
---
Envíe registros a Datadog desde páginas de navegadores web con el SDK de registros del navegador.

Con el SDK de registros del navegador, puede enviar registros directamente a Datadog desde páginas de navegadores web y aprovechar las siguientes funciones:

- Utilice el SDK como registrador. Todo se reenvía a Datadog como documentos JSON.
- Agregue `context` y atributos personalizados adicionales a cada registro enviado.
- Envuelva y reenvíe automáticamente cada error de frontend.
- Reenvíe errores de frontend.
- Registre las direcciones IP reales del cliente y los agentes de usuario.
- Uso de red optimizado con publicaciones automáticas por lotes.
- Uso en entornos de Worker y Service Worker.

**Notas**:

- **Independiente del SDK de RUM**: El SDK de registros del navegador se puede utilizar sin el SDK de RUM.
- **Entornos de Worker**: El SDK de registros del navegador funciona en entornos de Worker y Service Worker utilizando los mismos métodos de configuración. Sin embargo, los registros enviados desde entornos de Worker no incluyen automáticamente información de la sesión.
- **Errores de WebAssembly**: Para simbolizar marcos WASM en los registros del navegador, [configure el plugin WASM del SDK del navegador](#webassembly-errors) y [cargue los símbolos de depuración del módulo][14].

## Configuración {#setup}

### Paso 1: Cree un token de cliente {#step-1-create-a-client-token}

En Datadog, navegue a [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}New Client Tokens{{< /ui >}}][1]

**Entornos compatibles**: El SDK de registros del navegador es compatible con todos los navegadores modernos de escritorio y móviles, así como con entornos de Worker y Service Worker. Consulte la tabla de [Compatibilidad del navegador][4].

<div class="alert alert-info">Por razones de seguridad, las <a href="https://docs.datadoghq.com/account_management/api-app-keys/#api-keys">claves de API</a> no se pueden utilizar para configurar el SDK de registros del navegador, ya que quedarían expuestas en el lado del cliente en el código JavaScript. Para recopilar registros de navegadores web, se debe utilizar un <a href="https://docs.datadoghq.com/account_management/api-app-keys/#client-tokens">token de cliente</a>.</div>  

### Paso 2 - Instalar el SDK de registros del navegador {#step-2-install-the-logs-browser-sdk}

Elija el método de instalación para el SDK de registros del navegador.

{{< tabs >}}
{{% tab "NPM" %}}

Para aplicaciones web modernas, Datadog recomienda realizar la instalación a través de Node Package Manager (npm). El Browser SDK se empaqueta con el resto de su código JavaScript de frontend. No tiene impacto en el rendimiento de carga de la página. Sin embargo, es posible que el SDK no capture errores o registros de consola que ocurran antes de que se inicialice el SDK. Datadog recomienda usar una versión que coincida con el Browser Logs SDK.  

Agregue [`@datadog/browser-logs`][13] a su archivo `package.json`. Por ejemplo, si utiliza la CLI de npm.  

[13]: https://www.npmjs.com/package/@datadog/browser-logs

{{% /tab %}}
{{% tab "CDN asíncrono" %}}

Las aplicaciones web con objetivos de rendimiento deben realizar la instalación a través de CDN de forma asincrónica. El Browser SDK se carga desde la CDN de Datadog de forma asincrónica, lo que garantiza que no afecte el rendimiento de carga de la página. Sin embargo, es posible que el SDK no capture errores o registros de consola que ocurran antes de que se inicialice el SDK.  

Agregue el fragmento de código generado a la etiqueta head de cada página HTML que desee hacer un seguimiento en su aplicación.

{{< site-region region="us" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v7/datadog-logs.js','DD_LOGS')
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
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu1/v7/datadog-logs.js','DD_LOGS')
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
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v7/datadog-logs.js','DD_LOGS')
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
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap2/v7/datadog-logs.js','DD_LOGS')
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
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v7/datadog-logs.js','DD_LOGS')
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
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v7/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="uk1" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/uk1/v7/datadog-logs.js','DD_LOGS')
</script>
```

{{< /site-region >}}
{{< site-region region="gov,gov2" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n;d.crossOrigin=''
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-logs-v7.js','DD_LOGS')
</script>
```

{{< /site-region >}}

{{% /tab %}}
{{% tab "CDN síncrono" %}}

Para recopilar todos los eventos, debe realizar la instalación a través de CDN de forma sincrónica. El Browser SDK se carga desde la CDN de Datadog de forma sincrónica, lo que garantiza que el SDK se cargue primero y recopile todos los errores, recursos y acciones del usuario. Este método puede afectar el rendimiento de carga de la página.  

Agregue el fragmento de código generado a la etiqueta head (antes de cualquier otra etiqueta script) de cada página HTML que desee hacer un seguimiento en su aplicación. Colocar la etiqueta script más arriba y cargarla de forma sincrónica garantiza que Datadog RUM pueda recopilar todos los datos de rendimiento y errores.

{{< site-region region="us" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us1/v7/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="eu" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/eu1/v7/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="ap1" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/ap1/v7/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="ap2" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/ap2/v7/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="us3" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us3/v7/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="us5" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us5/v7/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="uk1" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/uk1/v7/datadog-logs.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}
{{< site-region region="gov,gov2" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/datadog-logs-v7.js"
    type="text/javascript"
    crossorigin>
</script>
```

{{< /site-region >}}

{{% /tab %}}
{{< /tabs >}}

### Paso 3 - Inicializar el SDK de registros del navegador {#step-3-initialize-the-logs-browser-sdk}

El SDK debe inicializarse lo antes posible en el ciclo de vida de la aplicación. Esto garantiza que todos los registros se capturen correctamente.

En el fragmento de inicialización, configure el token de cliente y el sitio. Consulte la lista completa de [parámetros de inicialización][4].

{{< tabs >}}
{{% tab "NPM" %}}

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
{{% tab "CDN asíncrono" %}}

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
{{% tab "CDN síncrono" %}}

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

#### Configurar el consentimiento de seguimiento (cumplimiento del RGPD) {#configure-tracking-consent-gdpr-compliance}

Para cumplir con el RGPD, la CCPA y regulaciones similares, el RUM Browser SDK le permite proporcionar el [valor de consentimiento de seguimiento durante la inicialización][5].

#### Configurar la Política de Seguridad de Contenido (CSP) {#configure-content-security-policy-csp}

Si utiliza la integración de Política de Seguridad de Contenido (CSP) de Datadog en su sitio, consulte [la documentación de CSP][6] para conocer los pasos de configuración adicionales.

### Paso 4: Visualice sus datos {#step-4-visualize-your-data}

Ahora que ha completado la configuración básica para registros, su aplicación está recopilando registros del navegador y puede comenzar a monitorear y depurar problemas en tiempo real.

Visualice los registros en el [Explorador de registros][7].

## Uso {#usage}

### Registros personalizados {#custom-logs}

Después de inicializar el SDK de registros del navegador de Datadog, envíe una entrada de registro personalizada directamente a Datadog con la API:

```typescript
logger.debug | info | warn | error (message: string, messageContext?: Context, error?: Error)
```

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

{{% /tab %}}
{{% tab "CDN asíncrono" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
})
```

**Nota**: Las llamadas a la API tempranas deben incluirse en el callback `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se haya cargado correctamente.

{{% /tab %}}
{{% tab "CDN síncrono" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

**Nota**: La verificación `window.DD_LOGS` evita problemas cuando ocurre un error de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Resultados {#results}

Los resultados son los mismos al usar NPM, CDN async o CDN sync:

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

El SDK de registros del navegador agrega la siguiente información de forma predeterminada (se pueden agregar más campos si el SDK de RUM está
presente):

- `date`
- `view.url`
- `view.referrer`
- `session_id` (solo si se usa una sesión)

El backend de Datadog agrega más campos, como:

- `http.useragent`
- `network.client.ip`

### Seguimiento de errores {#error-tracking}

El SDK de registros del navegador de Datadog permite el seguimiento de errores manual mediante el uso del parámetro opcional `error` (disponible en el SDK v4.36.0+). Cuando se proporciona una instancia de un [JavaScript Error][8], el SDK extrae información relevante (tipo, mensaje, traza de pila) del error.

```typescript
logger.{debug|info|warn|error}(message: string, messageContext?: Context, error?: Error)
```

{{< tabs >}}
{{% tab "NPM" %}}

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
{{% tab "CDN asíncrono" %}}

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

**Nota**: Las llamadas a la API tempranas deben incluirse en el callback `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se haya cargado correctamente.

{{% /tab %}}
{{% tab "CDN síncrono" %}}

```javascript
try {
  ...
  throw new Error('Wrong behavior')
  ...
} catch (ex) {
    window.DD_LOGS && window.DD_LOGS.logger.error('Error occurred', {}, ex)
}
```

**Nota**: La verificación `window.DD_LOGS` evita problemas cuando ocurre un error de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Resultados {#results-1}

Los resultados son los mismos al usar NPM, CDN async o CDN sync:

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

#### Errores de WebAssembly {#webassembly-errors}

Para simbolizar los marcos de pila de WebAssembly (WASM), instale el plugin WASM del SDK de registros del navegador. Utilice la misma versión para el plugin y el SDK de registro de navegador:

```shell
npm install --save-exact \
  @datadog/browser-logs@<VERSION> \
  @datadog/browser-plugin-wasm@<VERSION>
```

Registre el plugin cuando inicialice el SDK de registros del navegador:

```javascript
import { datadogLogs } from '@datadog/browser-logs';
import { makeWasmPlugin } from '@datadog/browser-plugin-wasm';

datadogLogs.init({
  // ...
  forwardErrorsToLogs: true,
  plugins: [makeWasmPlugin()],
});
```

Inicialice el SDK de registros del navegador antes de cargar cualquier módulo WASM. El plugin observa los módulos creados con las API `WebAssembly` del navegador y agrega sus URL y los ID de compilación a los errores que contienen trazas de pila WASM.

Establezca `forwardErrorsToLogs` en `true` para reenviar automáticamente los errores de WASM no controlados. Al registrar un error de WASM controlado, pase su objeto `Error` como tercer argumento a `logger.error()`, como se muestra en [Seguimiento de errores](#error-tracking).

Luego, [suba los símbolos de WebAssembly][14] para simbolizar los errores.

### Función de registrador genérica {#generic-logger-function}

El SDK de registros del navegador de Datadog añade funciones abreviadas (`.debug`, `.info`, `.warn`, `.error`) a los registradores para mayor comodidad. También hay disponible una función de registrador genérica, que expone el parámetro `status`:

```typescript
log(message: string, messageContext?: Context, status? = 'debug' | 'info' | 'warn' | 'error', error?: Error)
```

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
```

{{% /tab %}}
{{% tab "CDN asíncrono" %}}

```javascript
window.DD_LOGS.onReady(function() {
  window.DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
})
```

**Nota**: Las llamadas a la API tempranas deben incluirse en el callback `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se haya cargado correctamente.

{{% /tab %}}
{{% tab "CDN síncrono" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
```

**Nota**: La verificación `window.DD_LOGS` evita problemas cuando ocurre un error de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Marcadores de posición {#placeholders}

Los marcadores de posición en los ejemplos anteriores se describen a continuación:

| Marcador de posición         | Descripción                                                                             |
| ------------------- | --------------------------------------------------------------------------------------- |
| `<MESSAGE>`         | El mensaje de su registro que está totalmente indexado por Datadog.                               |
| `<JSON_ATTRIBUTES>` | Un objeto JSON válido, que incluye todos los atributos adjuntos al `<MESSAGE>`.         |
| `<STATUS>`          | El estado de su registro; los valores de estado aceptados son `debug`, `info`, `warn` o `error`. |
| `<ERROR>`           | Una instancia de un objeto [JavaScript Error][8].                                         |

## Uso avanzado {#advanced-usage}

### Eliminar datos confidenciales de sus registros del navegador {#scrub-sensitive-data-from-your-browser-logs}

Si sus registros del navegador contienen información confidencial que necesita ser redactada, configure el SDK del navegador para eliminar secuencias confidenciales usando la devolución de llamada `beforeSend` cuando inicialice el recopilador de registros del navegador.

La función de devolución de llamada `beforeSend` puede invocarse con dos argumentos: el evento `log` y `context`. Esta función le da acceso a cada registro recopilado por el SDK del navegador antes de que se envíe a Datadog, y le permite usar el contexto para ajustar cualquier propiedad de registro. El contexto contiene información adicional relacionada con el evento, pero no necesariamente incluida en el evento. Normalmente puede usar esta información para [enriquecer][11] su evento o [descartarlo][12].

```javascript
function beforeSend(log, context)
```

Los posibles valores de `context` son:

| Valor | Tipo de datos | Caso de uso |
|-------|---------|------------|
| `isAborted` | Booleano | Para eventos de registros de red, esta propiedad le indica si la solicitud fallida fue abortada por la aplicación, en cuyo caso es posible que no desee enviar este evento porque puede haber sido abortado intencionalmente. |
| `handlingStack` | Cadena | Una traza de pila de dónde se manejó el evento de registro. Esto se puede usar para identificar desde qué [micro-frontend][9] se envió el registro. |

Para anonimizar las direcciones de correo electrónico de las URL de su aplicación web:

{{< tabs >}}
{{% tab "NPM" %}}

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
{{% tab "CDN asíncrono" %}}

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

**Nota**: Las llamadas a la API tempranas deben incluirse en el callback `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se haya cargado correctamente.

{{% /tab %}}
{{% tab "CDN síncrono" %}}

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

**Nota**: La verificación `window.DD_LOGS` evita problemas cuando ocurre un error de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

Las siguientes propiedades son recopiladas automáticamente por el SDK y podrían contener datos confidenciales:

| Atributo       | Tipo   | Descripción                                                                                      |
| --------------- | ------ | ------------------------------------------------------------------------------------------------ |
| `view.url`      | Cadena | La URL de la página web activa.                                                                  |
| `view.referrer` | Cadena | La URL de la página web anterior desde la cual se siguió un enlace a la página solicitada actualmente. |
| `message`       | Cadena | El contenido del registro.                                                                          |
| `error.stack`   | Cadena | La traza de pila o información complementaria sobre el error.                                    |
| `http.url`      | Cadena | La URL HTTP.                                                                                    |

### Descartar registros específicos {#discard-specific-logs}

La función de devolución de llamada `beforeSend` le permite también descartar un registro antes de que sea enviado a Datadog.

Para descartar errores de red si su estado es 404:

{{< tabs >}}
{{% tab "NPM" %}}

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
{{% tab "CDN asíncrono" %}}

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

**Nota**: Las llamadas a la API tempranas deben incluirse en el callback `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se haya cargado correctamente.

{{% /tab %}}
{{% tab "CDN síncrono" %}}

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

**Nota**: La verificación `window.DD_LOGS` evita problemas cuando ocurre un error de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

### Definir múltiples registradores {#define-multiple-loggers}

El SDK de registros del navegador de Datadog contiene un registrador predeterminado, pero es posible definir diferentes registradores.

#### Crear un nuevo registrador {#create-a-new-logger}

Después de que el SDK de registros del navegador de Datadog se inicializa, utilice la API `createLogger` para definir un nuevo registrador:

```typescript
createLogger (name: string, conf?: {
    level?: 'debug' | 'info' | 'warn' | 'error',
    handler?: 'http' | 'console' | 'silent',
    context?: Context
})
```

**Nota**: Estos parámetros pueden establecerse con las API [setLevel](#filter-by-status), [setHandler](#change-the-destination) y [setContext](#overwrite-context).

#### Obtener un registrador personalizado {#get-a-custom-logger}

Después de la creación de un registrador, acceda a él en cualquier parte de su código JavaScript con la API:

```typescript
getLogger(name: string)
```

{{< tabs >}}
{{% tab "NPM" %}}

Por ejemplo, suponga que existe un `signupLogger`, definido con todos los demás registradores:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.createLogger('signupLogger', {
  level: 'info',
  handler: 'http',
  context: { env: 'staging' }
})
```

Luego puede utilizarse en una parte diferente del código con:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

const signupLogger = datadogLogs.getLogger('signupLogger')
signupLogger.info('Test sign up completed')
```

{{% /tab %}}
{{% tab "CDN asíncrono" %}}

Por ejemplo, suponga que existe un `signupLogger`, definido con todos los demás registradores:

```javascript
window.DD_LOGS.onReady(function () {
  const signupLogger = window.DD_LOGS.createLogger('signupLogger', {
    level: 'info',
    handler: 'http',
    context: { env: 'staging' }
  })
})
```

Luego puede utilizarse en una parte diferente del código con:

```javascript
window.DD_LOGS.onReady(function () {
  const signupLogger = window.DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
})
```

**Nota**: Las llamadas a la API tempranas deben incluirse en el callback `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se haya cargado correctamente.

{{% /tab %}}
{{% tab "CDN síncrono" %}}

Por ejemplo, suponga que existe un `signupLogger`, definido con todos los demás registradores:

```javascript
if (window.DD_LOGS) {
  const signupLogger = window.DD_LOGS.createLogger('signupLogger', {
    level: 'info',
    handler: 'http',
    context: { env: 'staging' }
  })
}
```

Luego puede utilizarse en una parte diferente del código con:

```javascript
if (window.DD_LOGS) {
  const signupLogger = window.DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
}
```

**Nota**: La verificación `window.DD_LOGS` evita problemas cuando ocurre un error de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

### Sobrescribir contexto {#overwrite-context}

#### Contexto global {#global-context}

Después de que el SDK de registros del navegador de Datadog se inicializa, es posible:

- Establecer el contexto completo para todos sus registradores con la API `setGlobalContext (context: object)`.
- Agregar un contexto a todos sus registradores con la API `setGlobalContextProperty (key: string, value: any)`.
- Obtener el contexto global completo con la API `getGlobalContext ()`.
- Eliminar una propiedad de contexto con la API `removeGlobalContextProperty (key: string)`.
- Borrar todas las propiedades de contexto existentes con la API `clearGlobalContext ()`.

> El SDK de registros del navegador v4.17.0 ha actualizado los nombres de varias API:
>
> - `getGlobalContext` en lugar de `getLoggerGlobalContext`
> - `setGlobalContext` en lugar de `setLoggerGlobalContext`
> - `setGlobalContextProperty` en lugar de `addLoggerGlobalContext`
> - `removeGlobalContextProperty` en lugar de `removeLoggerGlobalContext`

{{< tabs >}}
{{% tab "NPM" %}}

Para NPM, utilice:

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
{{% tab "CDN asíncrono" %}}

Para CDN asíncrono, utilice:

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

**Nota**: Las llamadas a la API tempranas deben incluirse en el callback `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se haya cargado correctamente.

{{% /tab %}}
{{% tab "CDN síncrono" %}}

Para la sincronización con CDN, utilice:

```javascript
window.DD_LOGS && window.DD_LOGS.setGlobalContext({ env: 'staging' })

window.DD_LOGS && window.DD_LOGS.setGlobalContextProperty('referrer', document.referrer)

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {env: 'staging', referrer: ...}

window.DD_LOGS && window.DD_LOGS.removeGlobalContextProperty('referrer')

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {env: 'staging'}

window.DD_LOGS && window.DD_LOGS.clearGlobalContext()

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {}
```

**Nota**: La verificación `window.DD_LOGS` evita problemas cuando ocurre un error de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Contexto de usuario {#user-context}

El SDK de logs de Datadog proporciona funciones convenientes para asociar un `User` con los logs generados.

- Establezca el usuario para todos sus registradores con la API `setUser (newUser: User)`.
- Agregue o modifique una propiedad de usuario en todos sus registradores con la API `setUserProperty (key: string, value: any)`.
- Obtenga el usuario almacenado actualmente con la API `getUser ()`.
- Elimine una propiedad de usuario con la API `removeUserProperty (key: string)`.
- Borre todas las propiedades de usuario existentes con la API `clearUser ()`.

**Nota**: El contexto de usuario se aplica antes que el contexto global. Por lo tanto, cada propiedad de usuario incluida en el contexto global anulará el contexto de usuario al generar logs.

{{< tabs >}}
{{% tab "NPM" %}}

Para NPM, utilice:

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
{{% tab "CDN asíncrono" %}}

Para CDN asíncrono, utilice:

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

**Nota**: Las llamadas a la API tempranas deben incluirse en el callback `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se haya cargado correctamente.

{{% /tab %}}
{{% tab "CDN síncrono" %}}

Para la sincronización con CDN, utilice:

```javascript
window.DD_LOGS && window.DD_LOGS.setUser({ id: '1234', name: 'John Doe', email: 'john@doe.com' })

window.DD_LOGS && window.DD_LOGS.setUserProperty('type', 'customer')

window.DD_LOGS && window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com', type: 'customer'}

window.DD_LOGS && window.DD_LOGS.removeUserProperty('type')

window.DD_LOGS && window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com'}

window.DD_LOGS && window.DD_LOGS.clearUser()

window.DD_LOGS && window.DD_LOGS.getUser() // => {}
```

**Nota**: La verificación `window.DD_LOGS` evita problemas cuando ocurre un error de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Contexto de cuenta {#account-context}

El SDK de logs de Datadog proporciona funciones convenientes para asociar una `Account` con los logs generados.

- Establezca la cuenta para todos sus registradores con la API `setAccount (newAccount: Account)`.
- Agregue o modifique una propiedad de cuenta en todos sus registradores con la API `setAccountProperty (key: string, value: any)`.
- Obtenga la cuenta almacenada actualmente con la API `getAccount ()`.
- Elimine una propiedad de cuenta con la API `removeAccountProperty (key: string)`.
- Borre todas las propiedades de cuenta existentes con la API `clearAccount ()`.

**Nota**: El contexto de la cuenta se aplica antes que el contexto global. Por lo tanto, cada propiedad de cuenta incluida en el contexto global anulará el contexto de la cuenta al generar registros.

{{< tabs >}}
{{% tab "NPM" %}}

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
{{% tab "CDN asíncrono" %}}

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

**Nota**: Las llamadas a la API tempranas deben incluirse en el callback `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se haya cargado correctamente.

{{% /tab %}}
{{% tab "CDN síncrono" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.setAccount({ id: '1234', name: 'My Company Name' })

window.DD_LOGS && window.DD_LOGS.setAccountProperty('type', 'premium')

window.DD_LOGS && window.DD_LOGS.getAccount() // => {id: '1234', name: 'My Company Name', type: 'premium'}

window.DD_LOGS && window.DD_LOGS.removeAccountProperty('type')

window.DD_LOGS && window.DD_LOGS.getAccount() // => {id: '1234', name: 'My Company Name'}

window.DD_LOGS && window.DD_LOGS.clearAccount()

window.DD_LOGS && window.DD_LOGS.getAccount() // => {}
```

**Nota**: La verificación `window.DD_LOGS` evita problemas cuando ocurre un error de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Ciclo de vida de los contextos {#contexts-life-cycle}

De forma predeterminada, los contextos se almacenan en la memoria de la página actual, lo que significa que no se:

- se mantienen después de una recarga completa de la página
- compartidos entre diferentes pestañas o ventanas de la misma sesión

Para agregarlos a todos los eventos de la sesión, deben adjuntarse a cada página.

Con la introducción de la opción de configuración `storeContextsAcrossPages` en la v4.49.0 del SDK de navegador, esos contextos pueden almacenarse en [`localStorage`][9], lo que permite los siguientes comportamientos:

- Los contextos se conservan después de una recarga completa
- Los contextos se sincronizan entre pestañas abiertas en el mismo origen

Sin embargo, esta función conlleva algunas **limitaciones**:

- No se recomienda establecer información de identificación personal (PII) en esos contextos, ya que los datos almacenados en `localStorage` sobreviven a la sesión del usuario
- La función es incompatible con las opciones `trackSessionAcrossSubdomains` porque los datos `localStorage` solo se comparten entre el mismo origen (login.site.com ≠ app.site.com)
- `localStorage` está limitado a 5 MiB por origen, por lo que los datos específicos de la aplicación, los contextos de Datadog y otros datos de terceros almacenados en `localStorage` deben estar dentro de este límite para evitar problemas

#### Contexto del registrador {#logger-context}

Después de crear un registrador, es posible:

- Establezca todo el contexto para su registrador con la API `setContext (context: object)`.
- Establezca una propiedad de contexto en su registrador con la API `setContextProperty (key: string, value: any)`:

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setContext("{'env': 'staging'}")

datadogLogs.setContextProperty('referrer', document.referrer)
```

{{% /tab %}}
{{% tab "CDN asíncrono" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setContext("{'env': 'staging'}")
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setContextProperty('referrer', document.referrer)
})
```

**Nota**: Las llamadas a la API tempranas deben incluirse en el callback `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se haya cargado correctamente.

{{% /tab %}}
{{% tab "CDN síncrono" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.setContext("{'env': 'staging'}")

window.DD_LOGS && window.DD_LOGS.setContextProperty('referrer', document.referrer)
```

**Nota**: La verificación `window.DD_LOGS` evita problemas cuando ocurre un error de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

### Filtrar por estado {#filter-by-status}

Después de inicializar el SDK de registro para navegador de Datadog, el nivel de registro mínimo para su registrador se establece con la API:

```typescript
setLevel (level?: 'debug' | 'info' | 'warn' | 'error')
```

Solo se envían los registros con un estado igual o superior al nivel especificado.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.setLevel('<LEVEL>')
```

{{% /tab %}}
{{% tab "CDN asíncrono" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.setLevel('<LEVEL>')
})
```

**Nota**: Las llamadas a la API tempranas deben incluirse en el callback `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se haya cargado correctamente.

{{% /tab %}}
{{% tab "CDN síncrono" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.setLevel('<LEVEL>')
```

**Nota**: La verificación `window.DD_LOGS` evita problemas cuando ocurre un error de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

### Cambie el destino {#change-the-destination}

De forma predeterminada, los registradores creados por el SDK de registro para navegador de Datadog envían registros a Datadog. Después de inicializar el SDK de registro para navegador de Datadog, es posible configurar el registrador para:

- enviar registros al `console` y a Datadog (`http`)
- enviar registros solo al `console`
- no enviar registros en absoluto (`silent`)

```typescript
setHandler (handler?: 'http' | 'console' | 'silent' | Array<handler>)
```

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.setHandler('<HANDLER>')
datadogLogs.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
```

{{% /tab %}}

{{% tab "CDN asíncrono" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.setHandler('<HANDLER>')
  window.DD_LOGS.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
})
```

**Nota**: Las llamadas a la API tempranas deben incluirse en el callback `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se haya cargado correctamente.

{{% /tab %}}
{{% tab "CDN síncrono" %}}

Para la sincronización con CDN, utilice:

```javascript
window.DD_LOGS && window.DD_LOGS.logger.setHandler('<HANDLER>')
window.DD_LOGS && window.DD_LOGS.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
```

**Nota**: La verificación `window.DD_LOGS` evita problemas cuando ocurre un error de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

### Consentimiento de seguimiento del usuario {#user-tracking-consent}

Para cumplir con el RGPD, la CCPA y regulaciones similares, el SDK de registro para navegador le permite proporcionar el valor de consentimiento de seguimiento durante la inicialización.

El parámetro de inicialización `trackingConsent` puede ser uno de los siguientes valores:

1. `"granted"`: El SDK de registro para navegador comienza a recopilar datos y los envía a Datadog.
2. `"not-granted"`: El SDK de registro para navegador no recopila ningún dato.

Para cambiar el valor de consentimiento de seguimiento después de que el SDK de registro para navegador se haya inicializado, utilice la llamada API `setTrackingConsent()`. El SDK de registro para navegador cambia su comportamiento de acuerdo con el nuevo valor:

- cuando se cambia de `"granted"` a `"not-granted"`, la sesión de registro se detiene y los datos ya no se envían a Datadog.
- cuando se cambia de `"not-granted"` a `"granted"`, se crea una nueva sesión de registro si no hay ninguna sesión previa activa, y la recopilación de datos se reanuda.

Este estado no se sincroniza entre pestañas ni persiste entre navegaciones. Es su responsabilidad proporcionar la decisión del usuario durante la inicialización del SDK de registro para navegador o mediante el uso de `setTrackingConsent()`.

Cuando se utiliza `setTrackingConsent()` antes de `init()`, el valor proporcionado tiene prioridad sobre el parámetro de inicialización.

{{< tabs >}}
{{% tab "NPM" %}}

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
{{% tab "CDN asíncrono" %}}

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
{{% tab "CDN síncrono" %}}

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

### Acceda al contexto interno {#access-internal-context}

Después de inicializar el SDK de registro para navegador de Datadog, puede acceder al contexto interno del SDK. Esto le permite acceder a `session_id`.

```typescript
getInternalContext (startTime?: 'number' | undefined)
```

Opcionalmente, puede utilizar el parámetro `startTime` para obtener el contexto de un momento específico. Si se omite el parámetro, se devuelve el contexto actual.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
```

{{% /tab %}}

{{% tab "CDN asíncrono" %}}

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
})
```

{{% /tab %}}
{{% tab "CDN síncrono" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
```

{{% /tab %}}
{{< /tabs >}}

<!-- Note: all URLs should be absolute -->

[1]: https://app.datadoghq.com/organization-settings/client-tokens
[4]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-logs.LogsInitConfiguration.html
[5]: /es/logs/log_collection/javascript/#user-tracking-consent
[6]: /es/integrations/content_security_policy_logs/#use-csp-with-real-user-monitoring-and-session-replay
[7]: /es/logs/explorer/
[8]: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error>
[9]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[11]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#enrich-and-control-rum-data
[12]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#discard-a-rum-event
[14]: /es/real_user_monitoring/guide/upload-webassembly-symbols/