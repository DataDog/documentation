---
algolia:
  tags:
  - browser logs
aliases:
- /es/logs/log_collection/web_browser
title: Colección de registros del navegador
---
Envía registros a Datadog desde páginas del navegador con el SDK de registros del navegador.

Con el SDK de registros del navegador, puedes enviar registros directamente a Datadog desde páginas del navegador y aprovechar las siguientes características:

- Usa el SDK como un registrador. Todo se envía a Datadog como documentos JSON.
- Agrega `context` y atributos personalizados adicionales a cada registro enviado.
- Envuelve y reenvía automáticamente cada error del frontend.
- Reenvía errores del frontend.
- Registra direcciones IP reales de clientes y agentes de usuario.
- Uso de red optimizado con publicaciones automáticas en bloque.
- Usa en entornos de Worker y Service Worker.

**Notas**:

- **Independiente del SDK de RUM**: El SDK de registros del navegador se puede usar sin el SDK de RUM.
- **Entornos de Worker**: El SDK de registros del navegador funciona en entornos de Worker y Service Worker utilizando los mismos métodos de configuración. Sin embargo, los registros enviados desde entornos de Worker no incluyen automáticamente información de sesión.

## Configuración

### Paso 1 - Crear un token de cliente

En Datadog, navega a [**Configuración de la Organización > Nuevos Tokens de Cliente**][1]

**Entornos soportados**: El SDK de registros del navegador soporta todos los navegadores de escritorio y móviles modernos, así como entornos de Worker y Service Worker. Consulta la tabla de [Soporte del Navegador][4].

<div class="alert alert-info">Por razones de seguridad, <a href="https://docs.datadoghq.com/account_management/api-app-keys/#api-keys">las claves de API</a> no pueden ser utilizadas para configurar el SDK de registros del navegador, porque estarían expuestas del lado del cliente en el código JavaScript. Para recopilar registros de navegadores web, se debe utilizar un <a href="https://docs.datadoghq.com/account_management/api-app-keys/#client-tokens">token de cliente</a>.</div>  

### Paso 2 - Instalar el SDK de Registros del Navegador

Elige el método de instalación para el SDK del Navegador.

{{< tabs >}}
{{% tab "NPM" %}}

Para aplicaciones web modernas, Datadog recomienda instalar a través de Node Package Manager (npm). El SDK del Navegador está empaquetado con el resto de tu código JavaScript del frontend. No tiene impacto en el rendimiento de carga de la página. Sin embargo, el SDK puede no capturar errores o registros de consola que ocurran antes de que el SDK sea inicializado. Datadog recomienda usar una versión coincidente con el SDK de Registros del Navegador.  

Agrega [`@datadog/browser-logs`][13] a tu `package.json` archivo. Por ejemplo, si usas npm cli.  

[13]: https://www.npmjs.com/package/@datadog/browser-logs

{{% /tab %}}
{{% tab "CDN asíncrono" %}}

Las aplicaciones web con objetivos de rendimiento deben instalarse a través de CDN asíncrono. El SDK del navegador se carga desde el CDN de Datadog de manera asíncrona, asegurando que no impacte el rendimiento de carga de la página. Sin embargo, el SDK puede no capturar errores o registros de consola que ocurran antes de que el SDK sea inicializado.  

Agrega el fragmento de código generado a la etiqueta head de cada página HTML que desees monitorear en tu aplicación.

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
{{% tab "CDN síncrono" %}}

Para recopilar todos los eventos, debes instalar a través de CDN síncrono. El SDK del navegador se carga desde el CDN de Datadog de manera síncrona, asegurando que el SDK se cargue primero y recopile todos los errores, recursos y acciones del usuario. Este método puede impactar el rendimiento de carga de la página.  

Agrega el fragmento de código generado a la etiqueta head (delante de cualquier otra etiqueta de script) de cada página HTML que desees monitorear en tu aplicación. Colocar la etiqueta de script más arriba y cargarla de manera síncrona asegura que Datadog RUM pueda recopilar todos los datos de rendimiento y errores.

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

### Paso 3 - Inicializar el SDK de Logs Browser

El SDK debe ser inicializado tan pronto como sea posible en el ciclo de vida de la aplicación. Esto asegura que todos los registros se capturen correctamente.

En el fragmento de inicialización, establece el token del cliente y el sitio. Consulta la lista completa de [parámetros de inicialización][4].

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

#### Configurar el consentimiento de seguimiento (cumplimiento de GDPR)

Para cumplir con GDPR, CCPA y regulaciones similares, el SDK del navegador RUM te permite proporcionar el [valor de consentimiento de seguimiento en la inicialización][5].

#### Configurar la Política de Seguridad de Contenidos (CSP)

Si estás utilizando la integración de Política de Seguridad de Contenidos (CSP) de Datadog en tu sitio, consulta [la documentación de CSP][6] para pasos adicionales de configuración.

### Paso 4 - Visualiza tus datos

Ahora que has completado la configuración básica para los registros, tu aplicación está recopilando registros del navegador y puedes comenzar a monitorear y depurar problemas en tiempo real.

Visualiza los registros en el [Explorador de Registros][7].

## Uso

### Registros personalizados

Después de que el SDK de registros del navegador de Datadog esté inicializado, envía una entrada de registro personalizada directamente a Datadog con la API:

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

**Nota**: Las llamadas a la API tempranas deben estar envueltas en el `window.DD_LOGS.onReady()` callback. Esto asegura que el código solo se ejecute una vez que el SDK esté correctamente cargado.

{{% /tab %}}
{{% tab "CDN síncrono" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

**Nota**: La verificación `window.DD_LOGS` previene problemas cuando ocurre un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Resultados

Los resultados son los mismos al usar NPM, CDN asíncrono o CDN síncrono:

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

El SDK de Registros agrega la siguiente información por defecto (se pueden agregar más campos si el SDK de RUM está
presente):

- `date`
- `view.url`
- `view.referrer`
- `session_id` (solo si se utiliza una sesión)

El backend de Datadog agrega más campos, como:

- `http.useragent`
- `network.client.ip`

### Seguimiento de errores

El SDK de registros del navegador de Datadog permite el seguimiento manual de errores utilizando el parámetro opcional `error` (disponible en SDK v4.36.0+). Cuando se proporciona una instancia de un [Error de JavaScript][8], el SDK extrae información relevante (tipo, mensaje, traza de pila) del error.

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

**Nota**: Las llamadas a la API tempranas deben estar envueltas en el `window.DD_LOGS.onReady()` callback. Esto asegura que el código solo se ejecute una vez que el SDK esté correctamente cargado.

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

**Nota**: La verificación `window.DD_LOGS` previene problemas cuando ocurre un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Resultados

Los resultados son los mismos al usar NPM, CDN asíncrono o CDN síncrono:

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

El SDK de registros del navegador de Datadog agrega funciones abreviadas (`.debug`, `.info`, `.warn`, `.error`) a los registradores para mayor comodidad. También está disponible una función de registro genérica, que expone el parámetro `status`:

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

**Nota**: Las llamadas a la API tempranas deben estar envueltas en el `window.DD_LOGS.onReady()` callback. Esto asegura que el código solo se ejecute una vez que el SDK esté correctamente cargado.

{{% /tab %}}
{{% tab "CDN síncrono" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
```

**Nota**: La verificación `window.DD_LOGS` previene problemas cuando ocurre un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Marcadores de posición

Los marcadores de posición en los ejemplos anteriores se describen a continuación:

| Marcador de posición         | Descripción                                                                             |
| ------------------- | --------------------------------------------------------------------------------------- |
| `<MESSAGE>`         | El mensaje de su registro que está completamente indexado por Datadog.                               |
| `<JSON_ATTRIBUTES>` | Un objeto JSON válido, que incluye todos los atributos adjuntos al `<MESSAGE>`.         |
| `<STATUS>`          | El estado de su registro; los valores de estado aceptados son `debug`, `info`, `warn` o `error`. |
| `<ERROR>`           | Una instancia de un objeto [Error de JavaScript][8].                                         |

## Uso avanzado

### Eliminar datos sensibles de sus registros del navegador

Si sus registros del navegador contienen información sensible que necesita ser redactada, configure el SDK del navegador para eliminar secuencias sensibles utilizando el callback `beforeSend` cuando inicialice el recolector de registros del navegador.

La función de callback `beforeSend` se puede invocar con dos argumentos: el evento `log` y `context`. Esta función le da acceso a cada registro recopilado por el SDK del navegador antes de que se envíe a Datadog, y le permite usar el contexto para ajustar cualquier propiedad del registro. El contexto contiene información adicional relacionada con el evento, pero no necesariamente incluida en el evento. Normalmente puede usar esta información para [enriquecer][11] su evento o [descartarlo][12].

```javascript
function beforeSend(log, context)
```

Los valores potenciales `context` son:

| Valor | Tipo de dato | Caso de uso |
|-------|---------|------------|
| `isAborted` | Boolean | Para los eventos de registro de red, esta propiedad indica si la solicitud fallida fue abortada por la aplicación, en cuyo caso es posible que no desee enviar este evento porque puede haber sido abortado intencionalmente. |
| `handlingStack` | Cadena | Un seguimiento de pila de dónde se manejó el evento de registro. Esto se puede utilizar para identificar de qué [micro-frontend][9] se envió el registro. |

Para redactar direcciones de correo electrónico de las URL de su aplicación web:

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

**Nota**: Las llamadas a la API tempranas deben estar envueltas en el `window.DD_LOGS.onReady()` callback. Esto asegura que el código solo se ejecute una vez que el SDK esté correctamente cargado.

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

**Nota**: La verificación `window.DD_LOGS` previene problemas cuando ocurre un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

Las siguientes propiedades son recopiladas automáticamente por el SDK y podrían contener datos sensibles:

| Atributo       | Tipo   | Descripción                                                                                      |
| --------------- | ------ | ------------------------------------------------------------------------------------------------ |
| `view.url`      | Cadena | La URL de la página web activa.                                                                  |
| `view.referrer` | Cadena | La URL de la página web anterior desde la cual se siguió un enlace a la página actualmente solicitada. |
| `message`       | Cadena | El contenido del registro.                                                                          |
| `error.stack`   | Cadena | El seguimiento de pila o información complementaria sobre el error.                                    |
| `http.url`      | Cadena | La URL HTTP.                                                                                    |

### Descartar registros específicos

La `beforeSend` función de callback también le permite descartar un registro antes de que se envíe a Datadog.

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

**Nota**: Las llamadas a la API tempranas deben estar envueltas en el `window.DD_LOGS.onReady()` callback. Esto asegura que el código solo se ejecute una vez que el SDK esté correctamente cargado.

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

**Nota**: La verificación `window.DD_LOGS` previene problemas cuando ocurre un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

### Definir múltiples registradores

El SDK de registros del navegador de Datadog contiene un registrador predeterminado, pero es posible definir diferentes registradores.

#### Crear un nuevo registrador

Después de que el SDK de registros del navegador de Datadog esté inicializado, utiliza la API `createLogger` para definir un nuevo registrador:

```typescript
createLogger (name: string, conf?: {
    level?: 'debug' | 'info' | 'warn' | 'error',
    handler?: 'http' | 'console' | 'silent',
    context?: Context
})
```

**Nota**: Estos parámetros se pueden establecer con las APIs [setLevel](#filter-by-status), [setHandler](#change-the-destination) y [setContext](#overwrite-context).

#### Obtener un registrador personalizado

Después de la creación de un registrador, accede a él en cualquier parte de tu código JavaScript con la API:

```typescript
getLogger(name: string)
```

{{< tabs >}}
{{% tab "NPM" %}}

Por ejemplo, supón que hay un `signupLogger`, definido con todos los otros registradores:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.createLogger('signupLogger', {
  level: 'info',
  handler: 'http',
  context: { env: 'staging' }
})
```

Luego se puede usar en otra parte del código con:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

const signupLogger = datadogLogs.getLogger('signupLogger')
signupLogger.info('Test sign up completed')
```

{{% /tab %}}
{{% tab "CDN asíncrono" %}}

Por ejemplo, supón que hay un `signupLogger`, definido con todos los otros registradores:

```javascript
window.DD_LOGS.onReady(function () {
  const signupLogger = window.DD_LOGS.createLogger('signupLogger', {
    level: 'info',
    handler: 'http',
    context: { env: 'staging' }
  })
})
```

Luego se puede usar en otra parte del código con:

```javascript
window.DD_LOGS.onReady(function () {
  const signupLogger = window.DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
})
```

**Nota**: Las llamadas a la API tempranas deben estar envueltas en el `window.DD_LOGS.onReady()` callback. Esto asegura que el código solo se ejecute una vez que el SDK esté correctamente cargado.

{{% /tab %}}
{{% tab "CDN síncrono" %}}

Por ejemplo, supón que hay un `signupLogger`, definido con todos los otros registradores:

```javascript
if (window.DD_LOGS) {
  const signupLogger = window.DD_LOGS.createLogger('signupLogger', {
    level: 'info',
    handler: 'http',
    context: { env: 'staging' }
  })
}
```

Luego se puede usar en otra parte del código con:

```javascript
if (window.DD_LOGS) {
  const signupLogger = window.DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
}
```

**Nota**: La verificación `window.DD_LOGS` previene problemas cuando ocurre un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

### Sobrescribir contexto

#### Contexto global

Después de que el SDK de registros del navegador de Datadog esté inicializado, es posible:

- Establecer el contexto completo para todos tus registradores con la API `setGlobalContext (context: object)`.
- Agregar un contexto a todos tus registradores con la API `setGlobalContextProperty (key: string, value: any)`.
- Obtener el contexto global completo con la API `getGlobalContext ()`.
- Eliminar la propiedad de contexto con la API `removeGlobalContextProperty (key: string)`.
- Limpiar todas las propiedades de contexto existentes con la API `clearGlobalContext ()`.

> El SDK de Log Browser v4.17.0 ha actualizado los nombres de varias APIs:
>
> - `getGlobalContext` en lugar de `getLoggerGlobalContext`
> - `setGlobalContext` en lugar de `setLoggerGlobalContext`
> - `setGlobalContextProperty` en lugar de `addLoggerGlobalContext`
> - `removeGlobalContextProperty` en lugar de `removeLoggerGlobalContext`

{{< tabs >}}
{{% tab "NPM" %}}

Para NPM, usa:

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

Para CDN asíncrono, usa:

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

**Nota**: Las llamadas a la API tempranas deben estar envueltas en el `window.DD_LOGS.onReady()` callback. Esto asegura que el código solo se ejecute una vez que el SDK esté correctamente cargado.

{{% /tab %}}
{{% tab "CDN síncrono" %}}

Para CDN síncrono, usa:

```javascript
window.DD_LOGS && window.DD_LOGS.setGlobalContext({ env: 'staging' })

window.DD_LOGS && window.DD_LOGS.setGlobalContextProperty('referrer', document.referrer)

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {env: 'staging', referrer: ...}

window.DD_LOGS && window.DD_LOGS.removeGlobalContextProperty('referrer')

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {env: 'staging'}

window.DD_LOGS && window.DD_LOGS.clearGlobalContext()

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {}
```

**Nota**: La verificación `window.DD_LOGS` previene problemas cuando ocurre un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Contexto de usuario

El SDK de registros de Datadog proporciona funciones convenientes para asociar un `User` con los registros generados.

- Establece el usuario para todos tus registradores con la API `setUser (newUser: User)`.
- Agrega o modifica una propiedad de usuario en todos tus registradores con la API `setUserProperty (key: string, value: any)`.
- Obtén el usuario almacenado actualmente con la API `getUser ()`.
- Elimina una propiedad de usuario con la API `removeUserProperty (key: string)`.
- Limpia todas las propiedades de usuario existentes con la API `clearUser ()`.

**Nota**: El contexto de usuario se aplica antes del contexto global. Por lo tanto, cada propiedad de usuario incluida en el contexto global sobrescribirá el contexto de usuario al generar registros.

{{< tabs >}}
{{% tab "NPM" %}}

Para NPM, usa:

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

Para CDN asíncrono, usa:

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

**Nota**: Las llamadas a la API tempranas deben estar envueltas en el `window.DD_LOGS.onReady()` callback. Esto asegura que el código solo se ejecute una vez que el SDK esté correctamente cargado.

{{% /tab %}}
{{% tab "CDN síncrono" %}}

Para CDN síncrono, usa:

```javascript
window.DD_LOGS && window.DD_LOGS.setUser({ id: '1234', name: 'John Doe', email: 'john@doe.com' })

window.DD_LOGS && window.DD_LOGS.setUserProperty('type', 'customer')

window.DD_LOGS && window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com', type: 'customer'}

window.DD_LOGS && window.DD_LOGS.removeUserProperty('type')

window.DD_LOGS && window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com'}

window.DD_LOGS && window.DD_LOGS.clearUser()

window.DD_LOGS && window.DD_LOGS.getUser() // => {}
```

**Nota**: La verificación `window.DD_LOGS` previene problemas cuando ocurre un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Contexto de cuenta

El SDK de registros de Datadog proporciona funciones convenientes para asociar un `Account` con los registros generados.

- Establece la cuenta para todos tus registradores con la API `setAccount (newAccount: Account)`.
- Agrega o modifica una propiedad de cuenta en todos tus registradores con la API `setAccountProperty (key: string, value: any)`.
- Obtén la cuenta almacenada actualmente con la API `getAccount ()`.
- Elimina una propiedad de cuenta con la API `removeAccountProperty (key: string)`.
- Limpia todas las propiedades de cuenta existentes con la API `clearAccount ()`.

**Nota**: El contexto de la cuenta se aplica antes del contexto global. Por lo tanto, cada propiedad de cuenta incluida en el contexto global sobrescribirá el contexto de la cuenta al generar registros.

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

**Nota**: Las llamadas a la API tempranas deben estar envueltas en el `window.DD_LOGS.onReady()` callback. Esto asegura que el código solo se ejecute una vez que el SDK esté correctamente cargado.

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

**Nota**: La verificación `window.DD_LOGS` previene problemas cuando ocurre un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Ciclo de vida de los contextos

Por defecto, los contextos se almacenan en la memoria de la página actual, lo que significa que no están:

- mantenidos después de una recarga completa de la página
- compartidos entre diferentes pestañas o ventanas de la misma sesión

Para agregarlos a todos los eventos de la sesión, deben estar adjuntos a cada página.

Con la introducción de la opción de configuración `storeContextsAcrossPages` en la v4.49.0 del SDK del navegador, esos contextos pueden ser almacenados en [`localStorage`][9], permitiendo los siguientes comportamientos:

- Los contextos se preservan después de una recarga completa
- Los contextos se sincronizan entre pestañas abiertas en el mismo origen

Sin embargo, esta función viene con algunas **limitaciones**:

- No se recomienda establecer Información Personal Identificable (PII) en esos contextos, ya que los datos almacenados en `localStorage` sobreviven a la sesión del usuario
- La función es incompatible con las opciones `trackSessionAcrossSubdomains` porque `localStorage` los datos solo se comparten entre el mismo origen (login.site.com ≠ app.site.com)
- `localStorage` está limitado a 5 MiB por origen, por lo que los datos específicos de la aplicación, los contextos de Datadog y otros datos de terceros almacenados en `localStorage` deben estar dentro de este límite para evitar problemas

#### Contexto del registrador

Después de que se crea un registrador, es posible:

- Establecer todo el contexto para su registrador con la API `setContext (context: object)`.
- Establecer una propiedad de contexto en su registrador con la API `setContextProperty (key: string, value: any)`:

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

**Nota**: Las llamadas a la API tempranas deben estar envueltas en el `window.DD_LOGS.onReady()` callback. Esto asegura que el código solo se ejecute una vez que el SDK esté correctamente cargado.

{{% /tab %}}
{{% tab "CDN síncrono" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.setContext("{'env': 'staging'}")

window.DD_LOGS && window.DD_LOGS.setContextProperty('referrer', document.referrer)
```

**Nota**: La verificación `window.DD_LOGS` previene problemas cuando ocurre un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

### Filtrar por estado

Después de que se inicializa el SDK de registros del navegador de Datadog, el nivel mínimo de registro para su registrador se establece con la API:

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

**Nota**: Las llamadas a la API tempranas deben estar envueltas en el `window.DD_LOGS.onReady()` callback. Esto asegura que el código solo se ejecute una vez que el SDK esté correctamente cargado.

{{% /tab %}}
{{% tab "CDN síncrono" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.setLevel('<LEVEL>')
```

**Nota**: La verificación `window.DD_LOGS` previene problemas cuando ocurre un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

### Cambiar el destino

Por defecto, los registradores creados por el SDK de registros del navegador de Datadog envían registros a Datadog. Después de que se inicializa el SDK de registros del navegador de Datadog, es posible configurar el registrador para:

- enviar registros a `console` y Datadog (`http`)
- enviar registros solo a `console`
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

**Nota**: Las llamadas a la API tempranas deben estar envueltas en el `window.DD_LOGS.onReady()` callback. Esto asegura que el código solo se ejecute una vez que el SDK esté correctamente cargado.

{{% /tab %}}
{{% tab "CDN síncrono" %}}

Para CDN síncrono, usa:

```javascript
window.DD_LOGS && window.DD_LOGS.logger.setHandler('<HANDLER>')
window.DD_LOGS && window.DD_LOGS.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
```

**Nota**: La verificación `window.DD_LOGS` previene problemas cuando ocurre un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

### Consentimiento de seguimiento del usuario

Para cumplir con el GDPR, CCPA y regulaciones similares, el SDK de Logs Browser le permite proporcionar el valor de consentimiento de seguimiento en la inicialización.

El parámetro de inicialización `trackingConsent` puede ser uno de los siguientes valores:

1. `"granted"`: El SDK de Logs Browser comienza a recopilar datos y los envía a Datadog.
2. `"not-granted"`: El SDK de Logs Browser no recopila ningún dato.

Para cambiar el valor de consentimiento de seguimiento después de que se inicializa el SDK de Logs Browser, utilice la llamada a la API `setTrackingConsent()`. El SDK de Logs Browser cambia su comportamiento de acuerdo con el nuevo valor:

- cuando se cambia de `"granted"` a `"not-granted"`, la sesión de registros se detiene y los datos ya no se envían a Datadog.
- cuando se cambia de `"not-granted"` a `"granted"`, se crea una nueva sesión de registros si no hay ninguna sesión anterior activa, y la recopilación de datos se reanuda.

Este estado no está sincronizado entre pestañas ni persistido entre navegaciones. Es su responsabilidad proporcionar la decisión del usuario durante la inicialización del SDK de Logs Browser o utilizando `setTrackingConsent()`.

Cuando `setTrackingConsent()` se utiliza antes de `init()`, el valor proporcionado tiene prioridad sobre el parámetro de inicialización.

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

### Acceder al contexto interno

Después de que se inicializa el SDK de registros del navegador de Datadog, puedes acceder al contexto interno del SDK. Esto te permite acceder al `session_id`.

```typescript
getInternalContext (startTime?: 'number' | undefined)
```

Puedes usar opcionalmente el parámetro `startTime` para obtener el contexto de un momento específico. Si se omite el parámetro, se devuelve el contexto actual.

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