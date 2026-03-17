---
algolia:
  tags:
  - browser logs
aliases:
- /es/logs/log_collection/web_browser
title: Recopilación de registros del navegador
---
Envía registros a Datadog desde páginas web mediante el SDK de registros del navegador.

Con el SDK de registros del navegador, puedes enviar registros directamente a Datadog desde páginas web y aprovechar las siguientes funciones: 

- Utiliza el SDK como registrador. Todo se reenvía a Datadog en forma de documentos JSON. 
- Añade atributos `context`personalizados adicionales a cada registro enviado. 
- Envuelve y reenvía automáticamente todos los errores del frontend. 
- Reenvía los errores del frontend. 
- Registra las direcciones IP reales de los clientes y los agentes de usuario. 
- Optimiza el uso de la red con envíos masivos automáticos. Se
-  puede utilizar en entornos Worker y Service Worker.

**Notas**: 

- **Independiente del SDK de **RUM: El SDK de registros del navegador se puede utilizar sin el SDK de RUM. Entornos
- ** Worker**: El SDK de registros del navegador funciona en entornos Worker y Service Worker utilizando los mismos métodos de configuración. Sin embargo, los registros enviados desde entornos Worker no incluyen automáticamente información de sesión. Paso 1

###  de la configuración

## : Crear un token de cliente

En Datadog, ve a [**Configuración de la organización > Nuevos tokens de cliente**][1]Entornos

** compatibles**: El SDK de registros del navegador es compatible con todos los navegadores modernos de escritorio y móviles, así como con entornos Worker y Service Worker. Consulte la tabla [Compatibilidad con navegadores][4].

<div class="alert alert-info">Por motivos de seguridad, las claves<a href="https://docs.datadoghq.com/account_management/api-app-keys/#api-keys"> API</a> no se pueden utilizar para configurar el SDK de registros del navegador, ya que quedarían expuestas en el código JavaScript del lado del cliente. Para recopilar registros de los navegadores web, es necesario </a>utilizar un token<a href="https://docs.datadoghq.com/account_management/api-app-keys/#client-tokens"> de cliente.</div>  

### Paso 2: Instalar el SDK de Logs Browser

Elige el método de instalación del SDK del navegador.

{{< tabs >}}
{{% tab "NPM" %}}

Para las aplicaciones web modernas, Datadog recomienda realizar la instalación a través de Node Package Manager (npm). El SDK del navegador se incluye junto con el resto del código JavaScript de la interfaz de usuario. No afecta al rendimiento de la carga de la página. Sin embargo, es posible que el SDK no registre los errores ni los registros de la consola que se produzcan antes de que se inicialice el SDK. Datadog recomienda utilizar una versión compatible con el SDK de registros del navegador.  

Añade [`@datadog/browser-logs`][13] a tu`package.json`archivo. Por ejemplo, si utilizas la interfaz de línea de comandos de npm.  

[13]: https://www.npmjs.com/package/@datadog/browser-logs

{{% /tab %}}
{{% tab "CDN asíncrono" %}}

Las aplicaciones web con objetivos de rendimiento deben instalarse a través de CDN asíncrono. El SDK del navegador se carga de forma asíncrona desde el CDN de Datadog, lo que garantiza que no afecte al rendimiento de la carga de la página. Sin embargo, es posible que el SDK no registre los errores ni los registros de la consola que se produzcan antes de que se inicialice el SDK.  

Añade el fragmento de código generado a la etiqueta `head` de cada página HTML que desees supervisar en tu aplicación.

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
{{% tab "Sincronización de CDN" %}}

Para recopilar todos los eventos, debes realizar la instalación a través de la sincronización CDN. El SDK del navegador se carga de forma sincrónica desde el CDN de Datadog, lo que garantiza que el SDK se cargue primero y recopile todos los errores, recursos y acciones de los usuarios. Este método puede afectar al rendimiento de la carga de la página.  

Añade el fragmento de código generado a la etiqueta `head` (antes de cualquier otra etiqueta `script`) de cada página HTML que desees supervisar en tu aplicación. Colocar la etiqueta de script en una posición más alta y cargarla de forma sincrónica garantiza que Datadog RUM pueda recopilar todos los datos de rendimiento y los errores.

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

### Paso 3: Inicializar el SDK de Logs Browser

El SDK debe inicializarse lo antes posible durante el ciclo de vida de la aplicación. Esto garantiza que todos los registros se recopilen correctamente.

En el fragmento de código de inicialización, configura el token de cliente y el sitio. Consulte la lista completa de [parámetros de inicialización][4].

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
{{% tab "Sincronización de CDN" %}}

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

#### Configurar el consentimiento para el seguimiento (cumplimiento del RGPD)

Para cumplir con el RGPD, la CCPA y normativas similares, el SDK de RUM para navegadores te permite especificar el [valor de consentimiento de seguimiento durante la inicialización][5]. 

#### Configurar la Política de Seguridad de Contenidos (CSP)

Si estás utilizando la integración de la Política de seguridad de contenidos (CSP) de Datadog en tu sitio web, consulta [la documentación de CSP][6] para conocer los pasos adicionales de configuración.

### Paso 4: Visualiza tus datos

Ahora que has completado la configuración básica de Logs, tu aplicación está recopilando registros del navegador y ya puedes empezar a supervisar y solucionar problemas en tiempo real.

Visualiza los registros en el [Explorador de registros][7]. Uso

### 

## : Registros personalizados

Una vez inicializado el SDK de registros del navegador de Datadog, envía una entrada de registro personalizada directamente a Datadog mediante la API:

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

**Nota**: Las llamadas a la API anteriores deben incluirse en la`window.DD_LOGS.onReady()`función de devolución de llamada. Esto garantiza que el código solo se ejecute una vez que el SDK se haya cargado correctamente.

{{% /tab %}}
{{% tab "Sincronización de CDN" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

**Nota**: Esta`window.DD_LOGS`comprobación evita problemas cuando se produce un error de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Resultados

Los resultados son los mismos tanto si se utiliza NPM, CDN asíncrono o CDN síncrono:

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
actual):

- `date`
- `view.url`
- `view.referrer`
- `session_id` (solo si se utiliza una sesión)

El backend de Datadog añade más campos, como: Seguimiento

- `http.useragent`
- `network.client.ip`

###  de errores

El SDK de registros del navegador de Datadog permite el seguimiento manual de errores mediante el uso del parámetro`error` opcional (disponible en la versión 4.36.0 o posterior del SDK). Cuando se proporciona una instancia de un [error de JavaScript][8], el SDK extrae la información relevante (tipo, mensaje, traza de pila) del error.

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

**Nota**: Las llamadas a la API anteriores deben incluirse en la`window.DD_LOGS.onReady()`función de devolución de llamada. Esto garantiza que el código solo se ejecute una vez que el SDK se haya cargado correctamente.

{{% /tab %}}
{{% tab "Sincronización de CDN" %}}

```javascript
try {
  ...
  throw new Error('Wrong behavior')
  ...
} catch (ex) {
    window.DD_LOGS && window.DD_LOGS.logger.error('Error occurred', {}, ex)
}
```

**Nota**: Esta`window.DD_LOGS`comprobación evita problemas cuando se produce un error de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Resultados

Los resultados son los mismos tanto si se utiliza NPM, CDN asíncrono o CDN síncrono:

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

### Función de registro genérica

El SDK de registros del navegador de Datadog añade funciones abreviadas (`.debug`, `.info`, `.warn`, `.error`) a los registradores para mayor comodidad. También hay disponible una función de registro genérica, que expone el`status`parámetro:

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

**Nota**: Las llamadas a la API anteriores deben incluirse en la`window.DD_LOGS.onReady()`función de devolución de llamada. Esto garantiza que el código solo se ejecute una vez que el SDK se haya cargado correctamente.

{{% /tab %}}
{{% tab "Sincronización de CDN" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
```

**Nota**: Esta`window.DD_LOGS`comprobación evita problemas cuando se produce un error de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Marcadores de posición

A continuación se describen los marcadores de posición de los ejemplos anteriores:

| Marcador de          |                                                                              |
| ------------------- | --------------------------------------------------------------------------------------- |
| `<MESSAGE>`         | posiciónDescripciónEl mensaje de tu registro que Datadog indexa en su totalidad.                               |
| `<JSON_ATTRIBUTES>` | Un objeto JSON válido, que incluye todos los atributos asociados al `<MESSAGE>`.         |
| `<STATUS>`          | El estado de tu registro; los valores de estado válidos son `debug`, `info`, `warn`, o `error`. |
| `<ERROR>`           | Una instancia de un objeto [JavaScript Error][8].                                         |

## Uso 

### avanzadoElimina los datos confidenciales de los registros de tu navegador

Si los registros de tu navegador contienen información confidencial que debe ocultarse, configura el SDK del navegador para que elimine las secuencias confidenciales mediante la función`beforeSend`de devolución de llamada al inicializar el recopilador de registros del navegador.

La función`beforeSend` de devolución de llamada se puede invocar con dos argumentos: el`log`evento y `context`. Esta función te permite acceder a cada registro recopilado por el SDK del navegador antes de que se envíe a Datadog, y te permite utilizar el contexto para modificar cualquier propiedad del registro. El contexto contiene información adicional relacionada con el evento, pero que no se incluye necesariamente en él. Por lo general, puedes utilizar esta información para [enriquecer][11] tu evento o [descartarla][12].

```javascript
function beforeSend(log, context)
```

Los valores`context` posibles son:

|  | ValorTipo de datosCaso  | de  |
|-------|---------|------------|
| `isAborted` |  | usoBooleanoEn el caso de los eventos de registro de red, esta propiedad indica si la solicitud fallida fue abortada por la aplicación; en tal caso, es posible que no desee enviar este evento, ya que podría tratarse de un aborto intencionado. |
| `handlingStack` |  | CadenaUn seguimiento de la pila que indica dónde se gestionó el evento de registro. Esto permite identificar desde qué [microfrontend][9] se envió el registro.  |

Para ocultar las direcciones de correo electrónico en las URL de tu aplicación web:

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

**Nota**: Las llamadas a la API anteriores deben incluirse en la`window.DD_LOGS.onReady()`función de devolución de llamada. Esto garantiza que el código solo se ejecute una vez que el SDK se haya cargado correctamente.

{{% /tab %}}
{{% tab "Sincronización de CDN" %}}

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

**Nota**: Esta`window.DD_LOGS`comprobación evita problemas cuando se produce un error de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

El SDK recopila automáticamente las siguientes propiedades, que podrían contener datos confidenciales:

|     |                                                                                       |
| --------------- | ------ | ------------------------------------------------------------------------------------------------ |
| `view.url`      | AttributeType Descripción       |  |  String La URL de la página web activa.                                                                   |
| `view.referrer` | String  | La URL de la página web anterior desde la que se siguió un enlace a la página solicitada actualmente. String |
| `message`       |  |  El contenido del registro. String El seguimiento                                                                          |
| `error.stack`   |  |  de la pila o información complementaria sobre el error.                                    |
| `http.url`      |  String  | La URL HTTP.                                                                                     |

### Descartar registros específicos

La función`beforeSend` de devolución de llamada te permite también descartar un registro antes de que se envíe a Datadog.

Para descartar los errores de red si su estado es 404:

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

**Nota**: Las llamadas a la API anteriores deben incluirse en la`window.DD_LOGS.onReady()`función de devolución de llamada. Esto garantiza que el código solo se ejecute una vez que el SDK se haya cargado correctamente.

{{% /tab %}}
{{% tab "Sincronización de CDN" %}}

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

**Nota**: Esta`window.DD_LOGS`comprobación evita problemas cuando se produce un error de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

### Definir varios registradores

El SDK de registros del navegador de Datadog incluye un registrador predeterminado, pero es posible definir otros registradores. 

#### Crea un nuevo registrador

Una vez inicializado el SDK de registros del navegador de Datadog, utiliza la API`createLogger`para definir un nuevo registrador:

```typescript
createLogger (name: string, conf?: {
    level?: 'debug' | 'info' | 'warn' | 'error',
    handler?: 'http' | 'console' | 'silent',
    context?: Context
})
```

**Nota**: Estos parámetros se pueden configurar mediante las API[ setLevel](#filter-by-status), [](#overwrite-context)setHandler ](#change-the-destination)y [setContext. 

#### Obtener un registrador personalizado

Una vez creado el registrador, puedes acceder a él desde cualquier parte de tu código JavaScript mediante la API:

```typescript
getLogger(name: string)
```

{{< tabs >}}
{{% tab "NPM" %}}

Por ejemplo, supongamos que hay un `signupLogger`, definido junto con todos los demás registradores:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.createLogger('signupLogger', {
  level: 'info',
  handler: 'http',
  context: { env: 'staging' }
})
```

A continuación, se puede utilizar en otra parte del código con:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

const signupLogger = datadogLogs.getLogger('signupLogger')
signupLogger.info('Test sign up completed')
```

{{% /tab %}}
{{% tab "CDN asíncrono" %}}

Por ejemplo, supongamos que hay un `signupLogger`, definido junto con todos los demás registradores:

```javascript
window.DD_LOGS.onReady(function () {
  const signupLogger = window.DD_LOGS.createLogger('signupLogger', {
    level: 'info',
    handler: 'http',
    context: { env: 'staging' }
  })
})
```

A continuación, se puede utilizar en otra parte del código con:

```javascript
window.DD_LOGS.onReady(function () {
  const signupLogger = window.DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
})
```

**Nota**: Las llamadas a la API anteriores deben incluirse en la`window.DD_LOGS.onReady()`función de devolución de llamada. Esto garantiza que el código solo se ejecute una vez que el SDK se haya cargado correctamente.

{{% /tab %}}
{{% tab "Sincronización de CDN" %}}

Por ejemplo, supongamos que hay un `signupLogger`, definido junto con todos los demás registradores:

```javascript
if (window.DD_LOGS) {
  const signupLogger = window.DD_LOGS.createLogger('signupLogger', {
    level: 'info',
    handler: 'http',
    context: { env: 'staging' }
  })
}
```

A continuación, se puede utilizar en otra parte del código con:

```javascript
if (window.DD_LOGS) {
  const signupLogger = window.DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
}
```

**Nota**: Esta`window.DD_LOGS`comprobación evita problemas cuando se produce un error de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

### Sobrescribir contexto global

#### 

Una vez inicializado el SDK de registros del navegador de Datadog, es posible: 

- Establecer el contexto completo para todos los registradores mediante la`setGlobalContext (context: object)`API. 
- Añadir un contexto a todos los registradores mediante la`setGlobalContextProperty (key: string, value: any)`API. 
- Obtener el contexto global completo mediante la`getGlobalContext ()`API. 
- Eliminar una propiedad de contexto mediante la`removeGlobalContextProperty (key: string)`API. 
- Borrar todas las propiedades de contexto existentes mediante la`clearGlobalContext ()`API.

> El SDK del navegador de registros v4.17.0 ha actualizado los nombres de varias API:
>
> - `getGlobalContext` en lugar de`getLoggerGlobalContext`
> - `setGlobalContext`  en`setLoggerGlobalContext`
> - `setGlobalContextProperty`lugar de  en lugar de`addLoggerGlobalContext`
> - `removeGlobalContextProperty`  en lugar de `removeLoggerGlobalContext`

{{< tabs >}}
{{% tab "NPM" %}}

Para NPM, utiliza:

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

Para CDN asíncrono, utiliza:

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

**Nota**: Las llamadas a la API anteriores deben incluirse en la`window.DD_LOGS.onReady()`función de devolución de llamada. Esto garantiza que el código solo se ejecute una vez que el SDK se haya cargado correctamente.

{{% /tab %}}
{{% tab "Sincronización de CDN" %}}

Para la sincronización de la CDN, utiliza:

```javascript
window.DD_LOGS && window.DD_LOGS.setGlobalContext({ env: 'staging' })

window.DD_LOGS && window.DD_LOGS.setGlobalContextProperty('referrer', document.referrer)

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {env: 'staging', referrer: ...}

window.DD_LOGS && window.DD_LOGS.removeGlobalContextProperty('referrer')

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {env: 'staging'}

window.DD_LOGS && window.DD_LOGS.clearGlobalContext()

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {}
```

**Nota**: Esta`window.DD_LOGS`comprobación evita problemas cuando se produce un error de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Contexto del usuario

El SDK de registros de Datadog ofrece funciones prácticas para asociar un`User`usuario a los registros generados. 

- Configura el usuario para todos tus registradores mediante la`setUser (newUser: User)`API. 
- Añade o modifica una propiedad de usuario en todos tus registradores mediante la`setUserProperty (key: string, value: any)`API. 
- Obtén el usuario almacenado actualmente mediante la`getUser ()`API. 
- Elimina una propiedad de usuario mediante la`removeUserProperty (key: string)`API. 
- Borra todas las propiedades de usuario existentes mediante la`clearUser ()`API. 

**Nota**: El contexto de usuario se aplica antes que el contexto global. Por lo tanto, cualquier propiedad de usuario incluida en el contexto global prevalecerá sobre el contexto de usuario a la hora de generar registros.

{{< tabs >}}
{{% tab "NPM" %}}

Para NPM, utiliza:

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

Para CDN asíncrono, utiliza:

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

**Nota**: Las llamadas a la API anteriores deben incluirse en la`window.DD_LOGS.onReady()`función de devolución de llamada. Esto garantiza que el código solo se ejecute una vez que el SDK se haya cargado correctamente.

{{% /tab %}}
{{% tab "Sincronización de CDN" %}}

Para la sincronización de la CDN, utiliza:

```javascript
window.DD_LOGS && window.DD_LOGS.setUser({ id: '1234', name: 'John Doe', email: 'john@doe.com' })

window.DD_LOGS && window.DD_LOGS.setUserProperty('type', 'customer')

window.DD_LOGS && window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com', type: 'customer'}

window.DD_LOGS && window.DD_LOGS.removeUserProperty('type')

window.DD_LOGS && window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com'}

window.DD_LOGS && window.DD_LOGS.clearUser()

window.DD_LOGS && window.DD_LOGS.getUser() // => {}
```

**Nota**: Esta`window.DD_LOGS`comprobación evita problemas cuando se produce un error de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Contexto de la cuenta

El SDK de registros de Datadog ofrece funciones prácticas para asociar una`Account`cuenta a los registros generados. 

- Configura la cuenta para todos tus registradores mediante la`setAccount (newAccount: Account)`API. 
- Añade o modifica una propiedad de cuenta en todos tus registradores mediante la`setAccountProperty (key: string, value: any)`API. 
- Obtén la cuenta almacenada actualmente mediante la`getAccount ()`API. 
- Elimina una propiedad de cuenta mediante la`removeAccountProperty (key: string)`API. 
- Borra todas las propiedades de cuenta existentes mediante la`clearAccount ()`API. 

**Nota**: El contexto de la cuenta se aplica antes que el contexto global. Por lo tanto, cualquier propiedad de la cuenta incluida en el contexto global prevalecerá sobre el contexto de la cuenta a la hora de generar registros.

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

**Nota**: Las llamadas a la API anteriores deben incluirse en la`window.DD_LOGS.onReady()`función de devolución de llamada. Esto garantiza que el código solo se ejecute una vez que el SDK se haya cargado correctamente.

{{% /tab %}}
{{% tab "Sincronización de CDN" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.setAccount({ id: '1234', name: 'My Company Name' })

window.DD_LOGS && window.DD_LOGS.setAccountProperty('type', 'premium')

window.DD_LOGS && window.DD_LOGS.getAccount() // => {id: '1234', name: 'My Company Name', type: 'premium'}

window.DD_LOGS && window.DD_LOGS.removeAccountProperty('type')

window.DD_LOGS && window.DD_LOGS.getAccount() // => {id: '1234', name: 'My Company Name'}

window.DD_LOGS && window.DD_LOGS.clearAccount()

window.DD_LOGS && window.DD_LOGS.getAccount() // => {}
```

**Nota**: Esta`window.DD_LOGS`comprobación evita problemas cuando se produce un error de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Ciclo de vida de los contextos

Por defecto, los contextos se almacenan en la memoria de la página actual, lo que significa que no se conservan tras una recarga completa de la 
- página ni 

- se comparten entre diferentes pestañas o ventanas de la misma sesión.

Para que se apliquen a todos los eventos de la sesión, deben incluirse en todas las páginas.

Con la introducción de la opción`storeContextsAcrossPages` de configuración en la versión 4.49.0 del SDK del navegador, esos contextos se pueden almacenar en [`localStorage`][9], lo que permite los siguientes comportamientos:

- Los contextos se conservan tras una recarga 
- completaLos contextos se sincronizan entre las pestañas abiertas en el mismo origen

Sin embargo, esta función presenta algunas **limitaciones**: no se recomienda

-  configurar información de identificación personal (PII) en esos contextos, ya que los datos almacenados en`localStorage`  permanecen más tiempo que la sesión del usuario
- . La función es incompatible con las`trackSessionAcrossSubdomains`opciones de  porque`localStorage`los datos solo se comparten entre el mismo origen (login.site.com ≠ app.site.com)
- `localStorage` y está limitada a 5 MiB por origen, por lo que los datos específicos de la aplicación, los contextos de Datadog y otros datos de terceros almacenados en`localStorage`  deben estar dentro de este límite para evitar cualquier problema. Contexto

####  del registrador

Una vez creado el registrador, es posible: 

- configurar todo el contexto del registrador mediante la`setContext (context: object)`API. 
- Configurar una propiedad de contexto en el registrador mediante`setContextProperty (key: string, value: any)`la API:

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

**Nota**: Las llamadas a la API anteriores deben incluirse en la`window.DD_LOGS.onReady()`función de devolución de llamada. Esto garantiza que el código solo se ejecute una vez que el SDK se haya cargado correctamente.

{{% /tab %}}
{{% tab "Sincronización de CDN" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.setContext("{'env': 'staging'}")

window.DD_LOGS && window.DD_LOGS.setContextProperty('referrer', document.referrer)
```

**Nota**: Esta`window.DD_LOGS`comprobación evita problemas cuando se produce un error de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

### Filtrar por estado

Una vez inicializado el SDK de registros del navegador de Datadog, el nivel mínimo de registro para tu registrador se configura mediante la API:

```typescript
setLevel (level?: 'debug' | 'info' | 'warn' | 'error')
```

Solo se envían los registros cuyo estado sea igual o superior al nivel especificado.

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

**Nota**: Las llamadas a la API anteriores deben incluirse en la`window.DD_LOGS.onReady()`función de devolución de llamada. Esto garantiza que el código solo se ejecute una vez que el SDK se haya cargado correctamente.

{{% /tab %}}
{{% tab "Sincronización de CDN" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.setLevel('<LEVEL>')
```

**Nota**: Esta`window.DD_LOGS`comprobación evita problemas cuando se produce un error de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

### Cambiar el destino

De forma predeterminada, los registradores creados por el SDK de registros del navegador de Datadog envían registros a Datadog. Una vez inicializado el SDK de registros del navegador de Datadog, es posible configurar el registrador para: 

- enviar registros a  y a`console` Datadog (`http`) 
- enviar registros únicamente a`console`  
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

**Nota**: Las llamadas a la API anteriores deben incluirse en la`window.DD_LOGS.onReady()`función de devolución de llamada. Esto garantiza que el código solo se ejecute una vez que el SDK se haya cargado correctamente.

{{% /tab %}}
{{% tab "Sincronización de CDN" %}}

Para la sincronización de la CDN, utiliza:

```javascript
window.DD_LOGS && window.DD_LOGS.logger.setHandler('<HANDLER>')
window.DD_LOGS && window.DD_LOGS.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
```

**Nota**: Esta`window.DD_LOGS`comprobación evita problemas cuando se produce un error de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

### Consentimiento para el seguimiento de usuarios

Para cumplir con el RGPD, la CCPA y normativas similares, el SDK de Logs Browser te permite indicar el valor del consentimiento de seguimiento durante la inicialización.

El `trackingConsent`parámetro de inicialización puede tomar uno de los siguientes valores

1. `"granted"`: El SDK de Logs Browser comienza a recopilar datos y los envía a Datadog
2. `"not-granted"`.El SDK de Logs Browser no recopila ningún dato.

Para cambiar el valor del consentimiento de seguimiento una vez inicializado el SDK de Logs Browser, utiliza la llamada`setTrackingConsent()` a la API. El SDK de Logs Browser modifica su comportamiento en función del nuevo valor: 

- cuando se cambia de`"granted"`  a `"not-granted"`, la sesión de Logs se detiene y ya no se envían datos a Datadog; 
- cuando se cambia de`"not-granted"`  a `"granted"`, se crea una nueva sesión de Logs si no hay ninguna sesión anterior activa, y se reanuda la recopilación de datos.

Este estado no se sincroniza entre pestañas ni se conserva al cambiar de página. Es tu responsabilidad proporcionar la decisión del usuario durante la inicialización del SDK de Logs Browser o mediante el uso de `setTrackingConsent()`.

Cuando`setTrackingConsent()`se utiliza «when» antes `init()`de «», el valor proporcionado tiene prioridad sobre el parámetro de inicialización.

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
{{% tab "Sincronización de CDN" %}}

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

Una vez inicializado el SDK de registros del navegador de Datadog, podrás acceder al contexto interno del SDK. Esto te permite acceder al `session_id`.

```typescript
getInternalContext (startTime?: 'number' | undefined)
```

Si lo deseas, puedes utilizar`startTime`el parámetro para obtener el contexto de un momento concreto. Si se omite el parámetro, se devuelve el contexto actual.

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
{{% tab "Sincronización de CDN" %}}

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