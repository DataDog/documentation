---
aliases:
- /es/logs/languages/nodejs
further_reading:
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprende a procesar tus logs
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Obtén más información sobre el parseo
- link: /logs/explorer/
  tag: Documentación
  text: Aprende a explorar tus logs
- link: /logs/explorer/#visualize
  tag: Documentación
  text: Realizar análisis de los logs
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: FAQ
  text: Guía para solucionar problemas relacionados con la recopilación de logs
- link: /glossary/#tail
  tag: Glosario
  text: Entrada de glosario para "tail" (cola)
title: Recopilación de logs de Node.js
---


## Configurar tu logger

Para enviar tus logs a Datadog, loguea un archivo y [supervisa][14] ese archivo con tu Datadog Agent. Utiliza la biblioteca de registro de [Winston][1] al log desde tu aplicación Node.js.

Winston está disponible a través de [NPM][2], para empezar, debes añadir la dependencia a tu código:

```text
npm install --save winston
```

`package.json` se actualiza con las dependencias correspondientes:

```js
{
  "name": "...",

  //...
  "dependencies": {
    //...
    "winston": "x.y.z",
    //...
  }
}
```

### Loguear a un archivo

En tu archivo de arranque o en tu código, declara el registrador de la siguiente manera:

{{< tabs >}}
{{% tab "Winston 3.0" %}}

```js

const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.File({ filename: `${appRoot}/logs/<FILE_NAME>.log` }),
  ],
});

module.exports = logger;

// Example logs
logger.log('info', 'Hello simple log!');
logger.info('Hello log with metas',{color: 'blue' });
```

{{% /tab %}}
{{% tab "Winston 2.0" %}}

```js
var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            name: '<LOGGER_NAME>',
            filename: '<FILE_NAME>.log',
            json: true,
            level: 'info'
        })
    ]
});

// Example logs
logger.log('info', 'Hello simple log!');
logger.info('Hello log with metas',{color: 'blue' });
```

{{% /tab %}}
{{< /tabs >}}

Comprueba el contenido del archivo `<FILE_NAME>.log` para confirmar que Winston está registrando en JSON:

```json
{"level":"info","message":"Hello simple log!","timestamp":"2015-04-23T16:52:05.337Z"}
{"color":"blue","level":"info","message":"Hello log with metas","timestamp":"2015-04-23T16:52:05.339Z"}
```

## Configura tu Datadog Agent

Una vez que [la recopilación de log está habilitada][6], configura la [recopilación de log personalizada][7] para supervisar tus archivos de log y enviar nuevos logs a Datadog.

1. Crea una carpeta `nodejs.d/` en el [directorio de configuración del Agent][5] `conf.d/`.
2. Crea un archivo `conf.yaml` en `nodejs.d/` con el siguiente contenido:

```yaml
init_config:

instances:

##Log section
logs:

  - type: file
    path: "<FILE_NAME_PATH>.log"
    service: <SERVICE_NAME>
    source: nodejs
    sourcecategory: sourcecode
```

3. [Reinicia el Agent][9].
4. Ejecuta el [subcomando de estado del Agent][10] y busca `nodejs` en la sección `Checks` para confirmar que los logs se han enviado correctamente a Datadog.

Si los logs están en formato JSON, Datadog [parsea los mensajes del log][7] de forma automática para extraer sus atributos. Utiliza el [Log Explorer][8] para ver tus logs y solucionar problemas relacionados.

## Conectar tus servicios al conjunto de logs y trazas (traces)

Si tienes APM activado para esta aplicación, conecta tus logs y trazas añadiendo automáticamente los ID de traza (trace) y los ID de tramo (span),
`env`, `service` y `version` a tus logs mediante [las siguientes instrucciones de APM para Node.js][3]

**Nota**: Si el rastreador APM inyecta `service` en tus logs, este reemplazará al valor definido en la configuración del Agent.

## Registro de logs sin Agent

Puedes poner en el flujo (stream) tus logs desde tu aplicación a Datadog sin instalar un Agent en tu host. Sin embargo, es recomendado que utilices un Agent para reenviar tus logs, ya que proporciona una gestión de conexión nativa.

Utiliza el [transporte de HTTP Winston][4] para enviar tus logs directamente a través de la [API de log de Datadog][5].
En tu archivo de arranque o en tu código, declara el registrador de la siguiente manera:

```javascript
const { createLogger, format, transports } = require('winston');

const httpTransportOptions = {
  host: 'http-intake.logs.{{< region-param key="dd_site" >}}',
  path: '/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=nodejs&service=<APPLICATION_NAME>',
  ssl: true
};

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.Http(httpTransportOptions),
  ],
});

module.exports = logger;

// Example logs
logger.log('info', 'Hello simple log!');
logger.info('Hello log with metas',{color: 'blue' });
```

**Nota:** También puedes utilizar el [Transporte de Datadog][13] avalado por la comunidad.


## Solucionar problemas

Si tienes errores de búsqueda de DNS en tu aplicación, esto podría ser debido a excepciones logstash no capturadas. Debe añadirse un identificador como el siguiente:

```js
var logstash = new winston.transports.Logstash({ ... });
logstash.on('error', function(err) {
    console.error(err); // replace with your own functionality here
});
```

Asegúrate de que el parámetro `max_connect_retries` no está configurado en `1` (por defecto es `4`).

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/winstonjs/winston
[2]: https://www.npmjs.com
[3]: /es/tracing/other_telemetry/connect_logs_and_traces/nodejs/
[4]: https://github.com/winstonjs/winston/blob/master/docs/transports.md#http-transport
[5]: /es/api/v1/logs/#send-logs
[6]: /es/agent/logs/?tab=tailfiles#activate-log-collection
[7]: /es/agent/logs/?tab=tailfiles#custom-log-collection
[8]: /es/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[9]: /es/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[10]: /es/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[11]: /es/logs/log_configuration/parsing/?tab=matchers
[12]: /es/logs/explorer/#overview
[13]: https://github.com/winstonjs/winston/blob/master/docs/transports.md#datadog-transport
[14]: /es/glossary/#tail