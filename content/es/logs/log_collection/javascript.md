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

**Notas**:
- **Independiente del SDK de RUM**: el SDK de logs de navegador se puede utilizar sin el SDK de RUM.

## Configuración

**Token de cliente de Datadog**: Por motivos de seguridad, las [claves de la API][1] no pueden utilizarse para configurar el SDK de logs del navegador, ya que quedarían expuestas del lado del cliente en el código JavaScript. Para recopilar logs de los navegadores web, se debe utilizar un [token de cliente][2]. Consulta la [documentación del token de cliente][2] para más detalles.

**SKD de logs del navegador de Datadog**: Configura el SDK a través de [NPM](#npm) o utiliza los fragmentos de código [CDN asíncrono](#cdn-async) o [CDN síncrono](#cdn-sync) en la etiqueta (tag) del encabezado.

**Navegadores compatibles**: el SDK de logs de navegador es compatible con todos los navegadores modernos de escritorio y móviles. Consulta la tabla de [Compatibilidad de navegadores][4].

### Elegir el método de instalación adecuado

| Método de instalación        | Caso práctico                                                                                                                                                                                                                                                                                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| npm (node package manager) | Este método se recomienda para las aplicaciones web modernas. El SDK de logs del navegador se empaqueta con el resto de tu código frontend de JavaScript. No tiene ningún efecto en el rendimiento de la carga de la página. Sin embargo, el SDK puede omitir errores, recursos y acciones del usuario activadas antes de que el SDK se inicialice. **Nota**: Se recomienda utilizar una versión coincidente con el SDK de RUM si se utiliza. |
| CDN asíncrono                  | Este método se recomienda para aplicaciones web con objetivos de rendimiento. El SDK de logs de navegador se carga desde nuestra CDN de forma asíncrona: este método garantiza que la descarga del SDK no afecte al rendimiento de carga de la página. Sin embargo, el SDK podría omitir errores, recursos y acciones del usuario activados antes de que se inicialice el SDK.                                                  |
| CDN síncrono                   | Este método se recomienda para recopilar todos los eventos de RUM. El SDK de logs de navegador se carga desde nuestra CDN de forma sincrónica: este método garantiza que el SDK se cargue primero y recopile todos los errores, recursos y acciones del usuario. Este método puede afectar al rendimiento de carga de la página.                                                                                                      |

### NPM

Después de añadir [`@datadog/browser-logs`][3] a tu archivo `package.json`, inicialízalo con:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.init({
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  forwardErrorsToLogs: true,
  sessionSampleRate: 100,
})
```

### CDN asíncrono

Carga y configura el SDK en la sección de encabezado de tus páginas. Para el sitio **{{<region-param key="dd_site_name">}}**:

{{< site-region region="us" >}}
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v6/datadog-logs.js','DD_LOGS')
      window.DD_LOGS.onReady(function() {
          window.DD_LOGS.init({
            clientToken: '<DATADOG_CLIENT_TOKEN>',
            site: 'datadoghq.com',
            forwardErrorsToLogs: true,
            sessionSampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v6/datadog-logs.js','DD_LOGS')
      DD_LOGS.onReady(function() {
          DD_LOGS.init({
            clientToken: '<DATADOG_CLIENT_TOKEN>',
            site: 'ap1.datadoghq.com',
            forwardErrorsToLogs: true,
            sessionSampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="ap2" >}}
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/ap2/v6/datadog-logs.js','DD_LOGS')
      DD_LOGS.onReady(function() {
          DD_LOGS.init({
            clientToken: '<DATADOG_CLIENT_TOKEN>',
            site: 'ap2.datadoghq.com',
            forwardErrorsToLogs: true,
            sessionSampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/eu1/v6/datadog-logs.js','DD_LOGS')
      window.DD_LOGS.onReady(function() {
          window.DD_LOGS.init({
            clientToken: '<DATADOG_CLIENT_TOKEN>',
            site: 'datadoghq.eu',
            forwardErrorsToLogs: true,
            sessionSampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v6/datadog-logs.js','DD_LOGS')
      window.DD_LOGS.onReady(function() {
          window.DD_LOGS.init({
            clientToken: '<DATADOG_CLIENT_TOKEN>',
            site: 'us3.datadoghq.com',
            forwardErrorsToLogs: true,
            sessionSampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v6/datadog-logs.js','DD_LOGS')
      window.DD_LOGS.onReady(function() {
          window.DD_LOGS.init({
            clientToken: '<DATADOG_CLIENT_TOKEN>',
            site: 'us5.datadoghq.com',
            forwardErrorsToLogs: true,
            sessionSampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-logs-v6.js','DD_LOGS')
      window.DD_LOGS.onReady(function() {
          window.DD_LOGS.init({
            clientToken: '<DATADOG_CLIENT_TOKEN>',
            site: 'ddog-gov.com',
            forwardErrorsToLogs: true,
            sessionSampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```
{{</ site-region>}}


**Nota**: Las primeras llamadas a la API deben incluirse en la devolución de llamada de `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se cargue correctamente.

### CDN síncrono

Para recibir todos los logs y errores, carga y configura el SDK al principio de la sección de encabezado de tus páginas. Para el sitio **{{<region-param key="dd_site_name">}}**:

{{< site-region region="us" >}}
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v6/datadog-logs.js"></script>
    <script>
      window.DD_LOGS &&
        window.DD_LOGS.init({
          clientToken: '<DATADOG_CLIENT_TOKEN>',
          site: 'datadoghq.com',
          forwardErrorsToLogs: true,
          sessionSampleRate: 100,
        })
    </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/ap1/v6/datadog-logs.js"></script>
    <script>
      window.DD_LOGS &&
        DD_LOGS.init({
          clientToken: '<DATADOG_CLIENT_TOKEN>',
          site: 'ap1.datadoghq.com',
          forwardErrorsToLogs: true,
          sessionSampleRate: 100,
        })
    </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="ap2" >}}
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/ap2/v6/datadog-logs.js"></script>
    <script>
      window.DD_LOGS &&
        DD_LOGS.init({
          clientToken: '<DATADOG_CLIENT_TOKEN>',
          site: 'ap2.datadoghq.com',
          forwardErrorsToLogs: true,
          sessionSampleRate: 100,
        })
    </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/eu1/v6/datadog-logs.js"></script>
    <script>
      window.DD_LOGS &&
        window.DD_LOGS.init({
          clientToken: '<DATADOG_CLIENT_TOKEN>',
          site: 'datadoghq.eu',
          forwardErrorsToLogs: true,
          sessionSampleRate: 100,
        })
    </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us3/v6/datadog-logs.js"></script>
    <script>
      window.DD_LOGS &&
        window.DD_LOGS.init({
          clientToken: '<DATADOG_CLIENT_TOKEN>',
          site: 'us3.datadoghq.com',
          forwardErrorsToLogs: true,
          sessionSampleRate: 100,
        })
    </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us5/v6/datadog-logs.js"></script>
    <script>
      window.DD_LOGS &&
        window.DD_LOGS.init({
          clientToken: '<DATADOG_CLIENT_TOKEN>',
          site: 'us5.datadoghq.com',
          forwardErrorsToLogs: true,
          sessionSampleRate: 100,
        })
    </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-v6.js"></script>
    <script>
      window.DD_LOGS &&
        window.DD_LOGS.init({
          clientToken: '<DATADOG_CLIENT_TOKEN>',
          site: 'ddog-gov.com',
          forwardErrorsToLogs: true,
          sessionSampleRate: 100,
        })
    </script>
  </head>
</html>
```
{{</ site-region>}}

**Nota**: El check `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

### TypeScript

Los tipos son compatibles con TypeScript >= 3.8.2. Para las versiones anteriores, importa fuentes JS y utiliza variables globales para evitar problemas de compilación:

```typescript
import '@datadog/browser-logs/bundle/datadog-logs'

window.DD_LOGS.init({
  clientToken: '<CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  forwardErrorsToLogs: true,
  sessionSampleRate: 100,
})
```

## Configuración

### Integración de la política de seguridad de contenido

Si utilizas la integración de política de seguridad de contenido (CSP) de Datadog en tu sitio, consulta [la sección RUM de la documentación de CSP][14] para conocer los pasos a seguir en la configuración.

### Parámetros de inicialización

Los siguientes parámetros están disponibles para configurar el SDK de logs de navegador de Datadog para enviar logs a Datadog:

| Parámetro                  | Tipo                                                                      | Obligatorio | Valor predeterminado         | Descripción                                                                                                                                                                           |
|----------------------------|---------------------------------------------------------------------------|----------|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `clientToken`              | Cadena                                                                    | Sí      |                 | Un [token de cliente de Datadog][2].                                                                                                                                                          |
| `site`                     | Cadena                                                                    | Sí      | `datadoghq.com` | El [parámetro del sitio de Datadog de tu organización][9].                                                                                                                                 |
| `service`                  | Cadena                                                                    | No       |                 | El nombre de servicio para tu aplicación. Debes seguir los [requisitos de sintaxis de etiqueta][7].                                                                                             |
| `env`                      | Cadena                                                                    | No       |                 | El entorno de la aplicación, por ejemplo: producción, preproducción, preparación, etc. Debe seguir los [requisitos de sintaxis de etiqueta][7].                                                    |
| `version`                  | Cadena                                                                    | No       |                 | La versión de la aplicación, por ejemplo: 1.2.3, 6c44da20, 2020.02.13, etc. Debe seguir los [requisitos de sintaxis de etiqueta][7].                                                    |
| `forwardErrorsToLogs`      | Booleano                                                                   | No       | `true`          | Configúralo en `false` para dejar de reenviar logs console.error, excepciones no capturadas y errores de red a Datadog.                                                                              |
| `forwardConsoleLogs`       | `"all"` o una matriz de `"log"` `"debug"` `"info"` `"warn"` `"error"`      | No       | `[]`            | Reenvía logs de `console.*` a Datadog. Utiliza `"all"` para reenviar todo o una matriz de nombres de la API de consola para reenviar solo un subconjunto.                                                |
| `forwardReports`           | `"all"` o una matriz de `"intervention"` `"deprecation"` `"csp_violation"` | No       | `[]`            | Reenvía informes de la [API de informes][8] a Datadog. Utiliza `"all"` para reenviar todo o una matriz de tipos de informes para reenviar solo un subconjunto.                                       |
| `sampleRate`               | Número                                                                    | No       | `100`           | **Obsoleto**: Consulta `sessionSampleRate`.                                                                                                                                             |
| `sessionSampleRate`        | Número                                                                    | No       | `100`           | El porcentaje de sesiones a rastrear: `100` para todas, `0` para ninguna. Sólo las sesiones rastreadas envían logs. Sólo se aplica a los logs recopilados a través del SDK de logs de navegador y es independiente de los datos de RUM.                                                                                    |
| `trackingConsent`          | `"granted"` o `"not-granted"`                                            | No       | `"granted"`     | Establece el estado inicial del consentimiento de rastreo del usuario. Consulta [Consentimiento de rastreo del usuario][15].                                                                                                         |
| `silentMultipleInit`       | Booleano                                                                   | No       |                 | Evita errores de registro al tener múltiples inicios.                                                                                                                                    |
| `proxy`                    | Cadena                                                                    | No       |                 | URL proxy opcional (ej: `https://www.proxy.com/path`). Para obtener más información, consulta la [guía completa para la configuración de proxies][6].                                                                      |
| `telemetrySampleRate`      | Número                                                                    | No       | `20`            | Los datos de telemetría (error, logs de depuración) sobre la ejecución del SDK se envían a Datadog para detectar y resolver posibles problemas. Configura esta opción en `0` si te quieres excluir de la recopilación de datos telemétricos. |
| `storeContextsAcrossPages` | Booleano                                                                   | No       |                 | Almacena el contexto global y el contexto de usuario en `localStorage` para preservarlos a lo largo de la navegación del usuario. Consulta [Ciclos de vida de los contextos][11] para obtener más detalles y limitaciones específicas.          |
| `allowUntrustedEvents`     | Booleano                                                                   | No       |                 | Permite la captura de [eventos no confiables][13], por ejemplo, en tests automatizados de interfaz de usuario.                                                                                                           |
| `allowedTrackingOrigins`   | Matriz                                                                     | No       |                 | Lista de orígenes en los que el kit de desarrollo de software (SDK) puede funcionar.                                                                                                                                      |


Opciones que deben tener una configuración coincidente cuando utilices el SDK `RUM`:


| Parámetro                              | Tipo                            | Obligatorio | Valor predeterminado    | Descripción                                                                                                                                                                                                                                                              |
| -------------------------------------- | ------------------------------- | -------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `sessionPersistence`                   | `"cookie"` o `"local-storage"` | No       | `"cookie"` | Qué estrategia de almacenamiento utilizar para persistir las sesiones. Puede ser `cookie` o `local-storage`.                                                                                                                                                                        |
| `trackAnonymousUser`                   | Booleano                         | No       | `true`     | Permite la recopilación del identificador de usuario anónimo en todas las sesiones.                                                                                                                                                                        |
| `trackSessionAcrossSubdomains`         | Booleano                         | No       | `false`    | Preserva la sesión a través de subdominios para el mismo sitio.                                                                                                                                                                                                                |
| `useSecureSessionCookie`               | Booleano                         | No       | `false`    | Utiliza una cookie de sesión segura. Esto desactiva logs enviados en conexiones inseguras (no HTTPS).                                                                                                                                                                                |
| `usePartitionedCrossSiteSessionCookie` | Booleano                         | No       | `false`    | Utiliza una cookie de sesión segura particionada entre sitios. Esto permite que el SDK de logs se ejecute cuando el sitio se carga desde otro (iframe). Implica `useSecureSessionCookie`.                                                                                                 |

## Utilización

### Logs personalizados

Una vez inicializado el SDK de logs de navegador de Datadog, envía una entrada de log personalizado directamente a Datadog con la API:

```
logger.debug | info | warn | error (message: string, messageContext?: Context, error?: Error)
```

#### NPM

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

#### CDN asíncrono

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
})
```

**Nota**: Las primeras llamadas a la API deben incluirse en la devolución de llamada de `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se cargue correctamente.

#### CDN síncrono

```javascript
window.DD_LOGS && window.DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

**Nota**: El check `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

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

El SDK de logs de navegador de Datadog permite el rastreo manual de errores mediante el parámetro opcional `error` (disponible en SDK v4.36.0+). Cuando se proporciona una instancia de un [error de JavaScript][10], el SDK extrae información relevante (tipo, mensaje, traza (trace) de stack tecnológico) del error.

```
logger.debug | info | warn | error (message: string, messageContext?: Context, error?: Error)
```

#### NPM

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

#### CDN asíncrono

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

#### CDN síncrono

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

```
log (message: string, messageContext?: Context, status? = 'debug' | 'info' | 'warn' | 'error', error?: Error)
```

#### NPM

Para NPM, utiliza:

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
```

#### CDN asíncrono

Para CDN asíncrono, utiliza:

```javascript
window.DD_LOGS.onReady(function() {
  window.DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
})
```

**Nota**: Las primeras llamadas a la API deben incluirse en la devolución de llamada de `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se cargue correctamente.

#### CDN síncrono

Para CDN síncrono, utiliza:

```javascript
window.DD_LOGS && window.DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
```

#### Parámetros

A continuación se describen los parámetros de los ejemplos anteriores:

| Parámetro         | Descripción                                                                             |
| ------------------- | --------------------------------------------------------------------------------------- |
| `<MESSAGE>`         | El mensaje de tu log que está totalmente indexado por Datadog.                               |
| `<JSON_ATTRIBUTES>` | Un objeto JSON válido, que incluye todos los atributos adjuntos al `<MESSAGE>`.         |
| `<STATUS>`          | El estado de tu log; los valores de estado aceptados son `debug`, `info`, `warn` o `error`. |
| `<ERROR>`           | Una instancia de un objeto de [error de JavaScript][10].                                         |

## Uso avanzado

### Limpia los datos confidenciales de tus logs de navegador

Si tus logs de navegador contienen información confidencial que debe redactarse, configura el SDK del navegador para limpiar secuencias confidenciales utilizando la devolución de llamada `beforeSend` cuando inicialices el Collector de logs del navegador.

La función callback `beforeSend` puede invocarse con dos argumentos: evento de `log` y `context`. Esta función te proporciona acceso a cada log recopilado por el SDK del navegador, antes de ser enviado a Datadog, y te permite utilizar el contexto para ajustar cualquier propiedad del log. El contexto contiene información adicional relacionada con el evento, que podría no estar necesariamente incluida en el evento. Por lo general, puedes utilizar esta información para [enriquecer][18] o [descartar][19] tu evento.

```javascript
function beforeSend(log, context)
```

Los valores posibles de `context` son:

| Valor | Tipo de datos | Caso de uso |
|-------|---------|------------|
| `isAborted` | Booleano | En el caso de los eventos de logs de red, esta propiedad te indica si la aplicación abortó la solicitud fallida. En este caso es posible que no quieras enviar este evento, ya que podría haber sido abortado intencionalmente. |
| `handlingStack` | Cadena | Una traza de stack tecnológico de donde se gestionó el evento de log. Puede utilizarse para identificar desde qué [micro-frontend][17] se envió el log. |

Para eliminar las direcciones de correo electrónico de las URLs de tus aplicaciones web:

#### NPM

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

#### CDN asíncrono

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

#### CDN síncrono

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

#### NPM

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

#### CDN asíncrono

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

#### CDN síncrono

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

##### NPM

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

##### CDN asíncrono

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

##### CDN síncrono

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

##### NPM

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

##### CDN asíncrono

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

##### CDN síncrono

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

#### Contexto de usuario

El SDK de logs de Datadog ofrece la posibilidad de asociar un `User` a logs generados.

- Define el usuario para todos tus generadores de logs con la API `setUser (newUser: User)`.
- Añade o modifica una propiedad de usuario a todos tus generadores de logs con la API `setUserProperty (key: string, value: any)`.
- Obtén el usuario almacenado actualmente con la API `getUser ()`.
- Elimina una propiedad de usuario con la API `removeUserProperty (key: string)`.
- Borra todas las propiedades de usuario existentes con la API `clearUser ()`.

**Nota**: El contexto de usuario se aplica antes que el contexto global. Por lo tanto, cada propiedad de usuario incluida en el contexto global anulará el contexto de usuario al generar logs.

##### NPM

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

##### CDN asíncrono

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

##### CDN síncrono

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

#### Contexto de la cuenta

El SDK de logs de Datadog ofrece la posibilidad de asociar una `Account`a los logs generados.

- Configura la cuenta para todos tus generadores de logs con la API `setAccount (newAccount: Account)`.
- Añade o modifica una propiedad de cuenta a todos tus generadores de logs con la API `setAccountProperty (key: string, value: any)`.
- Obtén la cuenta almacenada actualmente con la API `getAccount ()`.
- Elimina una propiedad de cuenta con la API `removeAccountProperty (key: string)`.
- Elimina todas las propiedades de cuenta existentes con la API `clearAccount ()`.

**Nota**: El contexto de cuenta se aplica antes que el contexto global. Por lo tanto, cada propiedad de cuenta incluida en el contexto global anulará el contexto de cuenta al generar logs.

##### NPM

Para NPM, utiliza:

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

##### CDN asíncrono

Para CDN asíncrono, utiliza:

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

##### CDN síncrono

Para CDN síncrono, utiliza:

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

#### Ciclo de vida de los contextos

Por defecto, los contextos se almacenan en la memoria de la página actual, lo que significa que no están:

- no se mantienen tras una recarga completa de la página
- no se comparten entre diferentes pestañas ni ventanas de la misma sesión

Para añadirlas a todos los eventos de la sesión, deben adjuntarse a cada página.

Con la introducción de la opción de configuración `storeContextsAcrossPages` en la v4.49.0 del SDK del navegador, esos contextos pueden almacenarse en [`localStorage`][12], permitiendo los siguientes comportamientos:

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

##### NPM

Para NPM, utiliza:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setContext("{'env': 'staging'}")

datadogLogs.setContextProperty('referrer', document.referrer)
```

##### CDN asíncrono

Para CDN asíncrono, utiliza:

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setContext("{'env': 'staging'}")
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setContextProperty('referrer', document.referrer)
})
```

**Nota**: Las primeras llamadas a la API deben incluirse en la devolución de llamada de `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se cargue correctamente.

##### CDN síncrono

Para CDN síncrono, utiliza:

```javascript
window.DD_LOGS && window.DD_LOGS.setContext("{'env': 'staging'}")

window.DD_LOGS && window.DD_LOGS.setContextProperty('referrer', document.referrer)
```

**Nota**: El check `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

### Filtrar por estado

Una vez inicializado el SDK de logs de navegador de Datadog, el nivel mínimo de log para tu generador de logs se configura con la API:

```
setLevel (level?: 'debug' | 'info' | 'warn' | 'error')
```

Solo se envían logs con un estado igual o superior al nivel especificado.

#### NPM

Para NPM, utiliza:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.setLevel('<LEVEL>')
```

#### CDN asíncrono

Para CDN asíncrono, utiliza:

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.setLevel('<LEVEL>')
})
```

**Nota**: Las primeras llamadas a la API deben incluirse en la devolución de llamada de `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se cargue correctamente.

#### CDN síncrono

Para CDN síncrono, utiliza:

```javascript
window.DD_LOGS && window.DD_LOGS.logger.setLevel('<LEVEL>')
```

**Nota**: El check `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

### Cambiar el destino

Por defecto, los generadores de logs creados por el SDK de logs de navegador de Datadog envían logs a Datadog. Una vez inicializado el SDK de logs de navegador de Datadog, es posible configurar el generador de logs para que:

- envíe logs a la `console` y Datadog (`http`)
- envíe logs solo a `console` 
- no envíe logs en absoluto (`silent`)

```
setHandler (handler?: 'http' | 'console' | 'silent' | Array<handler>)
```

#### NPM

Para NPM, utiliza:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.setHandler('<HANDLER>')
datadogLogs.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
```

#### CDN asíncrono

Para CDN asíncrono, utiliza:

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.setHandler('<HANDLER>')
  window.DD_LOGS.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
})
```

**Nota**: Las primeras llamadas a la API deben incluirse en la devolución de llamada de `window.DD_LOGS.onReady()`. Esto asegura que el código solo se ejecute una vez que el SDK se cargue correctamente.

#### CDN síncrono

Para CDN síncrono, utiliza:

```javascript
window.DD_LOGS && window.DD_LOGS.logger.setHandler('<HANDLER>')
window.DD_LOGS && window.DD_LOGS.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
```

**Nota**: El check `window.DD_LOGS` evita problemas cuando se produce un fallo de carga con el SDK.

### Consentimiento de rastreo del usuario

Para cumplir con GDPR, CCPA y normativas similares, el SDK del navegador de logs te permite proporcionar el valor de consentimiento de rastreo en la inicialización.

El parámetro de inicialización `trackingConsent` puede ser uno de los siguientes valores:

1. `"granted"`: el SDK del navegador de logs comienza a recopilar datos y los envía a Datadog.
2. `"not-granted"`: el SDK del navegador de logs no recopila ningún dato.

Para cambiar el valor del consentimiento de rastreo una vez inicializado el SDK del navegador de logs, utiliza la llamada a la API `setTrackingConsent()`. El SDK del navegador de logs cambia su comportamiento según el nuevo valor:

* cuando se cambia de `"granted"` a `"not-granted"`, la sesión de logs se detiene y ya no se envían datos a Datadog.
* cuando se cambia de `"not-granted"` a `"granted"`, se crea una nueva sesión de logs si no hay ninguna sesión anterior activa y se reanuda la recopilación de datos.

Este estado no se sincroniza entre pestañas ni persiste entre navegaciones. Es tu responsabilidad proporcionar la decisión del usuario durante la inicialización del SDK de navegador de logs o mediante el uso de `setTrackingConsent()`.

Cuando se utiliza `setTrackingConsent()` antes que `init()`, el valor proporcionado tiene prioridad sobre el parámetro de inicialización.

#### NPM

Para NPM, utiliza:

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

#### CDN asíncrono

Para CDN asíncrono, utiliza:

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

#### CDN síncrono

Para CDN síncrono, utiliza:

```javascript
window.DD_LOGS && window.DD_LOGS.init({
  ...,
  trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_LOGS && window.DD_LOGS.setTrackingConsent('granted');
});
```

### Acceder al contexto interno

Una vez inicializado el SDK de logs de navegador de Datadog, puedes acceder al contexto interno del SDK. Esto te permite acceder al `session_id`.

```
getInternalContext (startTime?: 'number' | undefined)
```

También puedes utilizar el parámetro `startTime` para obtener el contexto de un momento específico. Si se omite el parámetro, se regresa el contexto actual.

#### NPM

Para NPM, utiliza:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
```

#### CDN asíncrono

Para CDN asíncrono, utiliza:

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
})
```

#### CDN síncrono

Para CDN síncrono, utiliza:

```javascript
window.DD_LOGS && window.DD_LOGS.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
```

<!-- Nota: todas las URL deben ser absolutas -->

[1]: https://docs.datadoghq.com/es/account_management/api-app-keys/#api-keys
[2]: https://docs.datadoghq.com/es/account_management/api-app-keys/#client-tokens
[3]: https://www.npmjs.com/package/@datadog/browser-logs
[4]: https://github.com/DataDog/browser-sdk/blob/main/packages/logs/BROWSER_SUPPORT.md
[5]: https://docs.datadoghq.com/es/real_user_monitoring/guide/enrich-and-control-rum-data/
[6]: https://docs.datadoghq.com/es/real_user_monitoring/faq/proxy_rum_data/
[7]: https://docs.datadoghq.com/es/getting_started/tagging/#define-tags
[8]: https://developer.mozilla.org/en-US/docs/Web/API/Reporting_API
[9]: https://docs.datadoghq.com/es/getting_started/site/
[10]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[11]: https://docs.datadoghq.com/es/logs/log_collection/javascript/#contexts-life-cycle
[12]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[13]: https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted
[14]: /es/integrations/content_security_policy_logs/#use-csp-with-real-user-monitoring-and-session-replay
[15]: #user-tracking-consent
[17]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#micro-frontend
[18]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#enrich-and-control-rum-data
[19]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#discard-a-rum-event