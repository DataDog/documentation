---
algolia:
  tags:
  - logs de navegador
aliases:
- /es/logs/log_collection/web_browser
title: Recopilación de logs de navegador
---

Envía logs a Datadog desde las páginas del navegador web con el SDK de logs del navegador.

Con el SDK de logs del navegador, puedes enviar logs directamente a Datadog desde las páginas del navegador web y aprovechar las siguientes funciones:

- Utiliza el SDK como generador de logs. Todo se reenvía a Datadog como documentos JSON.
- Añade `context` y atributos personalizados adicionales a cada log enviado.
- Engloba y reenvía automáticamente todos los errores del frontend.
- Reenvía errores del frontend.
- Registra las direcciones IP reales de los clientes y los agentes de usuario.
- Uso de red optimizado con envíos masivos automáticos.
- Uso en entornos de worker y worker de servicios.

**Notas**:

- **Independiente del SDK de RUM**: el SDK de logs de navegador se puede utilizar sin el SDK de RUM.
- **Entornos de worker**: el SDK de logs de navegador funcionan en entornos de worker y worker de servicio utilizando los mismos métodos de configuración. Sin embargo, los logs enviados desde entornos de worker no incluyen automáticamente información de sesión.

## Configuración

### Paso 1: Crear un token de cliente

En Datadog, ve a [**Organization Settings > New Client Tokens**][1] (Configuración de la organización > Nuevos tokens de cliente).

**Entornos compatibles**: el SDK de logs de navegador son compatibles con todos los navegadores modernos de escritorio y móviles, así como con los entornos de worker y worker de servicio. Consulta la tabla [Soporte del navegador][4].

<div class="alert alert-info">Por motivos de seguridad, <a href="https://docs.datadoghq.com/account_management/api-app-keys/#api-keys">las claves de API</a> no pueden utilizarse para configurar el SDK de logs del navegador, ya que quedarían expuestas del lado del cliente en el código de JavaScript. Para recopilar losg de los navegadores web, debe utilizarse un <a href="https://docs.datadoghq.com/account_management/api-app-keys/#client-tokens">token de cliente</a>.</div> 

### Paso 2: Instalar el SDK de logs de navegador

Elige el método de instalación del SDK de navegador.

{{< tabs >}}
{{% tab "NPM" %}}

Para aplicaciones web modernas, Datadog recomienda la instalación a través de Node Package Manager (npm). El SDK de navegador se empaqueta con el resto de tu código JavaScript de frontend. No tiene ningún impacto en el rendimiento de carga de la página. Sin embargo, es posible que el SDK no capture errores o logs de consola que se produzcan antes de que se inicialice el SDK. Datadog recomienda utilizar una versión que coincida con el SDK de logs del navegador.

Añade [`@datadog/browser-logs`][13] a tu archivo `package.json`. Por ejemplo, si utilizas npm cli.  

[13]: https://www.npmjs.com/package/@datadog/browser-logs

{{% /tab %}}
{{% tab "CDN asíncrono" %}}

Las aplicaciones web con objetivos de rendimiento deben instalarse a través de CDN asíncronas. El SDK de navegador se carga desde la CDN de Datadog de forma asíncrona, lo que garantiza que no afecte al rendimiento de carga de la página. Sin embargo, es posible que el SDK no capture errores o logs de consola que se produzcan antes de que se inicialice el SDK.

Añade el fragmento de código generado a la etiqueta head de cada página HTML que desees monitorizar en tu aplicación.

{{< site-region region="us" >}}

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n
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
    d=o.createElement(u);d.async=1;d.src=n
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
    d=o.createElement(u);d.async=1;d.src=n
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
    d=o.createElement(u);d.async=1;d.src=n
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
    d=o.createElement(u);d.async=1;d.src=n
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
    d=o.createElement(u);d.async=1;d.src=n
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
    d=o.createElement(u);d.async=1;d.src=n
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-logs-v6.js','DD_LOGS')
</script>
```

{{< /site-region >}}

{{% /tab %}}
{{% tab "CDN síncrono" %}}

Para recopilar todos los eventos, debes instalar a través de CDN síncronas. El SDK de navegador se carga desde la CDN de Datadog de forma sincrónica, lo que garantiza que el SDK se carga primero y recopila todos los errores, recursos y acciones del usuario. Este método puede afectar al rendimiento de carga de la página.

Añade el fragmento de código generado a la etiqueta head (delante de cualquier otra etiqueta script) de cada página HTML que desees monitorizar en tu aplicación. Colocar la etiqueta script más arriba y cargarla de forma sincrónica garantiza que Datadog RUM pueda recopilar todos los datos de rendimiento y errores.

{{< site-region region="us" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us1/v6/datadog-logs.js"
    type="text/javascript">
</script>
```

{{< /site-region >}}
{{< site-region region="eu" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/eu/v6/datadog-logs.js"
    type="text/javascript">
</script>
```

{{< /site-region >}}
{{< site-region region="ap1" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/ap1/v6/datadog-logs.js"
    type="text/javascript">
</script>
```

{{< /site-region >}}
{{< site-region region="ap2" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/ap2/v6/datadog-logs.js"
    type="text/javascript">
</script>
```

{{< /site-region >}}
{{< site-region region="us3" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us3/v6/datadog-logs.js"
    type="text/javascript">
</script>
```

{{< /site-region >}}
{{< site-region region="us5" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us5/v6/datadog-logs.js"
    type="text/javascript">
</script>
```

{{< /site-region >}}
{{< site-region region="gov" >}}

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/datadog-logs-v6.js"
    type="text/javascript">
</script>
```

{{< /site-region >}}

{{% /tab %}}
{{< /tabs >}}

### Paso 3: Inicializar el SDK del navegador

El SDK debe inicializarse lo antes posible en el ciclo de vida de la aplicación. Esto garantiza que todos los logs se capturen correctamente.

En el fragmento de inicialización, establece el token de cliente y el sitio. Consulta la lista completa de [parámetros de inicialización][4].

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
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
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
    window.DD_RUM && window.DD_RUM.init({
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

Para cumplir con GDPR, CCPA y normativas similares, el KIT de navegador de RUM te permite proporcionar el [valor de consentimiento de seguimiento en la inicialización][5].

#### Configurar la política de seguridad de contenidos (CSP)

Si utilizas la integración de la Política de seguridad de contenidos (CSP) de Datadog en tu sitio, consulta [la documentación de la CSP][6] para conocer los pasos adicionales de configuración.

### Paso 4: Visualizar tus datos

Ahora que has completado la configuración básica de logs, tu aplicación está recopilando logs del navegador y puedes empezar a monitorizar y depurar problemas en tiempo real.

Visualiza los logs en el [Log Explorer][7].

## Utilización

### Logs personalizados

Una vez inicializado el SDK de logs de navegador de Datadog, envía una entrada de log personalizado directamente a Datadog con la API:

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

**Nota**: Las primeras llamadas a la API deben incluirse en la devolución de llamada de `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se cargue correctamente.

{{% /tab %}}
{{% tab "CDN síncrono" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

**Nota**: El check `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Resultados

Los resultados son los mismos cuando se utiliza NPM, CDN asíncrono o CDN síncrono:

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

El SDK de logs añade la siguiente información de modo predeterminado (se pueden añadir más campos si el SDK de RUM está
presente):

- `date`
- `view.url`
- `view.referrer`
- `session_id` (solo si se utiliza una sesión)

El backend de Datadog añade más campos, como:

- `http.useragent`
- `network.client.ip`

### Rastreo de errores

El SDK de logs de navegador de Datadog permite el rastreo de error manual mediante el parámetro opcional `error` (disponible en el SDK v4.36.0+). Cuando se proporciona una instancia de un [error JavaScript][8], el SDK extrae información relevante (tipo, mensaje, stack trace) del error.

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

**Nota**: Las primeras llamadas a la API deben incluirse en la devolución de llamada de `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se cargue correctamente.

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

**Nota**: El check `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Resultados

Los resultados son los mismos cuando se utiliza NPM, CDN asíncrono o CDN síncrono:

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

### Función de generador de logs genérico

El SDK de logs de navegador de Datadog añade las funciones abreviadas (`.debug`, `.info`, `.warn`, `.error`) a los generadores de logs para mayor comodidad. También está disponible una función de generador de logs genérico, que expone el parámetro `status`:

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

**Nota**: Las primeras llamadas a la API deben incluirse en la devolución de llamada de `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se cargue correctamente.

{{% /tab %}}
{{% tab "CDN síncrono" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
```

**Nota**: El check `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Parámetros

A continuación se describen los parámetros de los ejemplos anteriores:

| Parámetro         | Descripción                                                                             |
| ------------------- | --------------------------------------------------------------------------------------- |
| `<MESSAGE>`         | El mensaje de tu log que está totalmente indexado por Datadog.                               |
| `<JSON_ATTRIBUTES>` | Un objeto JSON válido, que incluye todos los atributos adjuntos al `<MESSAGE>`.         |
| `<STATUS>`          | El estado de tu log; los valores de estado aceptados son `debug`, `info`, `warn` o `error`. |
| `<ERROR>`           | Una instancia de un objeto [error JavaScript][8].                                         |

## Uso avanzado

### Limpia los datos confidenciales de tus logs de navegador

Si tus logs de navegador contienen información confidencial que debe redactarse, configura el SDK del navegador para limpiar secuencias confidenciales utilizando la devolución de llamada `beforeSend` cuando inicialices el Collector de logs del navegador.

La función de devolución de llamada `beforeSend` puede invocarse con dos argumentos: el evento `log` y `context`. Esta función te da acceso a cada log recopilado por el SDK de navegador antes de ser enviado a Datadog, y te permite utilizar el contexto para ajustar cualquier propiedad de log. El contexto contiene información adicional relacionada con el evento, pero no necesariamente incluida en el mismo. Normalmente puedes utilizar esta información para [enriquecer][11] tu evento o [descartarlo][12].

```javascript
function beforeSend(log, context)
```

Los valores posibles de `context` son:

| Valor | Tipo de datos | Caso de uso |
|-------|---------|------------|
| `isAborted` | Booleano | En el caso de los eventos de logs de red, esta propiedad te indica si la aplicación abortó la solicitud fallida. En este caso es posible que no quieras enviar este evento, ya que podría haber sido abortado intencionalmente. |
| `handlingStack` | Cadena | Un atack trace de dónde se gestionó el evento de log. Se puede utilizar para identificar desde qué [micro-frontend][9] se envió el log. |

Para eliminar las direcciones de correo electrónico de las URLs de tus aplicaciones web:

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

**Nota**: Las primeras llamadas a la API deben incluirse en la devolución de llamada de `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se cargue correctamente.

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

**Nota**: El check `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

El SDK recopila automáticamente las siguientes propiedades que podrían contener datos confidenciales:

| Atributo       | Tipo   | Descripción                                                                                      |
| --------------- | ------ | ------------------------------------------------------------------------------------------------ |
| `view.url`      | Cadena | La URL de la página web activa.                                                                  |
| `view.referrer` | Cadena | La URL de la página web anterior desde la que se siguió un vínculo a la página solicitada actualmente. |
| `message`       | Cadena | El contenido del log.                                                                          |
| `error.stack`   | Cadena | La traza de stack tecnológico o la información adicional sobre el error.                                    |
| `http.url`      | Cadena | La URL HTTP.                                                                                    |

### Descartar logs específicos

La función de devolución de la llamada `beforeSend` permite también descartar un log antes de enviarlo a Datadog.

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

**Nota**: Las primeras llamadas a la API deben incluirse en la devolución de llamada de `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se cargue correctamente.

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

**Nota**: El check `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

### Definir varios generadores de logs

El SDK de logs de navegador de Datadog contiene un generador de logs por defecto, pero es posible definir diferentes generadores de logs.

#### Crear un nuevo generador de logs

Una vez inicializado el SDK de logs de navegador de Datadog, utiliza la API `createLogger` para definir un nuevo generador de logs:

```typescript
createLogger (name: string, conf?: {
    level?: 'debug' | 'info' | 'warn' | 'error',
    handler?: 'http' | 'console' | 'silent',
    context?: Context
})
```

**Nota**: Estos parámetros pueden establecerse con las API [setLevel](#filter-by-status), [setHandler](#change-the-destination) y [setContext](#overwrite-context).

#### Obtener un generador de logs personalizado

Tras la creación de un generador de logs, accede a él en cualquier parte de tu código de JavaScript con la API:

```typescript
getLogger(name: string)
```

{{< tabs >}}
{{% tab "NPM" %}}

Por ejemplo, supongamos que hay un `signupLogger`, definido con todos los demás generadores de logs:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.createLogger('signupLogger', {
  level: 'info',
  handler: 'http',
  context: { env: 'staging' }
})
```

A continuación, puedes utilizarlo en una parte diferente del código con:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

const signupLogger = datadogLogs.getLogger('signupLogger')
signupLogger.info('Test sign up completed')
```

{{% /tab %}}
{{% tab "CDN asíncrono" %}}

Por ejemplo, supongamos que hay un `signupLogger`, definido con todos los demás generadores de logs:

```javascript
window.DD_LOGS.onReady(function () {
  const signupLogger = window.DD_LOGS.createLogger('signupLogger', {
    level: 'info',
    handler: 'http',
    context: { env: 'staging' }
  })
})
```

A continuación, puedes utilizarlo en una parte diferente del código con:

```javascript
window.DD_LOGS.onReady(function () {
  const signupLogger = window.DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
})
```

**Nota**: Las primeras llamadas a la API deben incluirse en la devolución de llamada de `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se cargue correctamente.

{{% /tab %}}
{{% tab "CDN síncrono" %}}

Por ejemplo, supongamos que hay un `signupLogger`, definido con todos los demás generadores de logs:

```javascript
if (window.DD_LOGS) {
  const signupLogger = window.DD_LOGS.createLogger('signupLogger', {
    level: 'info',
    handler: 'http',
    context: { env: 'staging' }
  })
}
```

A continuación, puedes utilizarlo en una parte diferente del código con:

```javascript
if (window.DD_LOGS) {
  const signupLogger = window.DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
}
```

**Nota**: El check `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

### Sobrescribir contexto

#### Contexto global

Una vez inicializado el SDK de logs de navegador de Datadog, es posible:

- Definir el contexto completo para todos tus generadores de logs con la API `setGlobalContext (context: object)`.
- Añadir un contexto a todos tus generadores de logs con la API `setGlobalContextProperty (key: string, value: any)`.
- Obtener todo el contexto global con la API `getGlobalContext ()`.
- Eliminar la propiedad de contexto con la API `removeGlobalContextProperty (key: string)`.
- Borrar todas las propiedades de contexto existentes con la API `clearGlobalContext ()`.

> El SDK de navegador de log v4.17.0 ha actualizado el nombre de varias API:
>
> - `getGlobalContext` en lugar de `getLoggerGlobalContext`
> - `setGlobalContext` en lugar de `setLoggerGlobalContext`
> - `setGlobalContextProperty` en lugar de `addLoggerGlobalContext`
> - `removeGlobalContextProperty` en lugar de `removeLoggerGlobalContext`

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

**Nota**: Las primeras llamadas a la API deben incluirse en la devolución de llamada de `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se cargue correctamente.

{{% /tab %}}
{{% tab "CDN síncrono" %}}

Para CDN síncrono, utiliza:

```javascript
window.DD_LOGS && window.DD_LOGS.setGlobalContext({ env: 'staging' })

window.DD_LOGS && window.DD_LOGS.setGlobalContextProperty('referrer', document.referrer)

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {env: 'staging', referrer: ...}

window.DD_LOGS && window.DD_LOGS.removeGlobalContextProperty('referrer')

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {env: 'staging'}

window.DD_LOGS && window.DD_LOGS.clearGlobalContext()

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {}
```

**Nota**: El check `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Contexto de usuario

El SDK de logs de Datadog ofrece la posibilidad de asociar un `User` a logs generados.

- Define el usuario para todos tus generadores de logs con la API `setUser (newUser: User)`.
- Añade o modifica una propiedad de usuario a todos tus generadores de logs con la API `setUserProperty (key: string, value: any)`.
- Obtén el usuario almacenado actualmente con la API `getUser ()`.
- Elimina una propiedad de usuario con la API `removeUserProperty (key: string)`.
- Borra todas las propiedades de usuario existentes con la API `clearUser ()`.

**Nota**: El contexto de usuario se aplica antes que el contexto global. Por lo tanto, cada propiedad de usuario incluida en el contexto global anulará el contexto de usuario al generar logs.

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

**Nota**: Las primeras llamadas a la API deben incluirse en la devolución de llamada de `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se cargue correctamente.

{{% /tab %}}
{{% tab "CDN síncrono" %}}

Para CDN síncrono, utiliza:

```javascript
window.DD_LOGS && window.DD_LOGS.setUser({ id: '1234', name: 'John Doe', email: 'john@doe.com' })

window.DD_LOGS && window.DD_LOGS.setUserProperty('type', 'customer')

window.DD_LOGS && window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com', type: 'customer'}

window.DD_LOGS && window.DD_LOGS.removeUserProperty('type')

window.DD_LOGS && window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com'}

window.DD_LOGS && window.DD_LOGS.clearUser()

window.DD_LOGS && window.DD_LOGS.getUser() // => {}
```

**Nota**: El check `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Contexto de la cuenta

El SDK de logs de Datadog ofrece la posibilidad de asociar una `Account`a los logs generados.

- Configura la cuenta para todos tus generadores de logs con la API `setAccount (newAccount: Account)`.
- Añade o modifica una propiedad de cuenta a todos tus generadores de logs con la API `setAccountProperty (key: string, value: any)`.
- Obtén la cuenta almacenada actualmente con la API `getAccount ()`.
- Elimina una propiedad de cuenta con la API `removeAccountProperty (key: string)`.
- Elimina todas las propiedades de cuenta existentes con la API `clearAccount ()`.

**Nota**: El contexto de cuenta se aplica antes que el contexto global. Por lo tanto, cada propiedad de cuenta incluida en el contexto global anulará el contexto de cuenta al generar logs.

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

**Nota**: Las primeras llamadas a la API deben incluirse en la devolución de llamada de `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se cargue correctamente.

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

**Nota**: El check `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

#### Ciclo de vida de los contextos

Por defecto, los contextos se almacenan en la memoria de la página actual, lo que significa que no están:

- no se mantienen tras una recarga completa de la página
- no se comparten entre diferentes pestañas ni ventanas de la misma sesión

Para añadirlas a todos los eventos de la sesión, deben adjuntarse a cada página.

Con la introducción de la opción de configuración `storeContextsAcrossPages` en la v4.49.0 del SDK de navegador, esos contextos pueden ser almacenados en [`localStorage`][9], permitiendo los siguientes comportamientos:

- Los contextos se conservan tras una recarga completa.
- Los contextos se sincronizan entre pestañas abiertas en el mismo origen.

Sin embargo, esta función tiene algunas **limitaciones**:

- No se recomienda configurar información de identificación personal (PII) en estos contextos, ya que los datos almacenados en `localStorage` perduran más allá de la sesión del usuario.
- La función no es compatible con las opciones de `trackSessionAcrossSubdomains` porque los datos de `localStorage` solo se comparten entre el mismo origen (login.site.com ≠ app.site.com)
- `localStorage` está limitado a 5 MiB por origen, por lo que los datos específicos de la aplicación, los contextos de Datadog y otros datos almacenados de terceros en `localStorage` deben estar dentro de este límite para evitar problemas.

#### Contexto del generador de logs

Una vez creado un generador de logs, es posible:

- Configurar el contexto completo para tu generador de logs con la API `setContext (context: object)`.
- Configurar una propiedad de contexto en tu generador de logs con la API `setContextProperty (key: string, value: any)`:

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

**Nota**: Las primeras llamadas a la API deben incluirse en la devolución de llamada de `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se cargue correctamente.

{{% /tab %}}
{{% tab "CDN síncrono" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.setContext("{'env': 'staging'}")

window.DD_LOGS && window.DD_LOGS.setContextProperty('referrer', document.referrer)
```

**Nota**: El check `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

### Filtrar por estado

Una vez inicializado el SDK de logs de navegador de Datadog, el nivel mínimo de log para tu generador de logs se configura con la API:

```typescript
setLevel (level?: 'debug' | 'info' | 'warn' | 'error')
```

Solo se envían logs con un estado igual o superior al nivel especificado.

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

**Nota**: Las primeras llamadas a la API deben incluirse en la devolución de llamada de `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se cargue correctamente.

{{% /tab %}}
{{% tab "CDN síncrono" %}}

```javascript
window.DD_LOGS && window.DD_LOGS.logger.setLevel('<LEVEL>')
```

**Nota**: El check `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

### Cambiar el destino

Por defecto, los generadores de logs creados por el SDK de logs de navegador de Datadog envían logs a Datadog. Una vez inicializado el SDK de logs de navegador de Datadog, es posible configurar el generador de logs para que:

- envíe logs a la `console` y Datadog (`http`)
- envíe logs solo a `console` 
- no envíe logs en absoluto (`silent`)

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

**Nota**: Las primeras llamadas a la API deben incluirse en la devolución de llamada de `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se cargue correctamente.

{{% /tab %}}
{{% tab "CDN síncrono" %}}

Para CDN síncrono, utiliza:

```javascript
window.DD_LOGS && window.DD_LOGS.logger.setHandler('<HANDLER>')
window.DD_LOGS && window.DD_LOGS.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
```

**Nota**: El check `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

{{% /tab %}}
{{< /tabs >}}

### Consentimiento de rastreo del usuario

Para cumplir con GDPR, CCPA y normativas similares, el SDK del navegador de logs te permite proporcionar el valor de consentimiento de rastreo en la inicialización.

El parámetro de inicialización `trackingConsent` puede ser uno de los siguientes valores:

1. `"granted"`: el SDK del navegador de logs comienza a recopilar datos y los envía a Datadog.
2. `"not-granted"`: el SDK del navegador de logs no recopila ningún dato.

Para cambiar el valor del consentimiento de rastreo una vez inicializado el SDK del navegador de logs, utiliza la llamada a la API `setTrackingConsent()`. El SDK del navegador de logs cambia su comportamiento según el nuevo valor:

- cuando se cambia de `"granted"` a `"not-granted"`, la sesión de logs se detiene y ya no se envían datos a Datadog.
- cuando se cambia de `"not-granted"` a `"granted"`, se crea una nueva sesión de logs si no hay ninguna sesión anterior activa y se reanuda la recopilación de datos.

Este estado no se sincroniza entre pestañas ni persiste entre navegaciones. Es tu responsabilidad proporcionar la decisión del usuario durante la inicialización del SDK de navegador de logs o mediante el uso de `setTrackingConsent()`.

Cuando se utiliza `setTrackingConsent()` antes que `init()`, el valor proporcionado tiene prioridad sobre el parámetro de inicialización.

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

Una vez inicializado el SDK de logs de navegador de Datadog, puedes acceder al contexto interno del SDK. Esto te permite acceder al `session_id`.

```typescript
getInternalContext (startTime?: 'number' | undefined)
```

También puedes utilizar el parámetro `startTime` para obtener el contexto de un momento específico. Si se omite el parámetro, se regresa el contexto actual.

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

<!-- Nota: todas las URL deben ser absolutas -->

[1]: https://app.datadoghq.com/organization-settings/client-tokens
[4]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-logs.LogsInitConfiguration.html
[5]: /es/logs/log_collection/javascript/#user-tracking-consent
[6]: /es/integrations/content_security_policy_logs/#use-csp-with-real-user-monitoring-and-session-replay
[7]: /es/logs/explorer/
[8]: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error>
[9]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[11]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#enrich-and-control-rum-data
[12]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#discard-a-rum-event