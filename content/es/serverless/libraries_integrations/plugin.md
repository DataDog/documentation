---
aliases:
- /es/serverless/serverless_integrations/plugin
dependencies:
- https://github.com/DataDog/serverless-plugin-datadog/blob/main/README.md
title: Complemento de Datadog Serverless Framework
---
![crear](https://github.com/DataDog/serverless-plugin-datadog/workflows/build/badge.svg)
[![Cobertura del código](https://img.shields.io/codecov/c/github/DataDog/serverless-plugin-datadog)](https://codecov.io/gh/DataDog/serverless-plugin-datadog)
[![NPM](https://img.shields.io/npm/v/serverless-plugin-datadog)](https://www.npmjs.com/package/serverless-plugin-datadog)
[![Slack](https://chat.datadoghq.com/badge.svg?bg=632CA6)](https://chat.datadoghq.com/)
[![Licencia](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/serverless-plugin-datadog/blob/master/LICENSE)

Datadog recomienda el complemento de Severless Framework a los desarrolladores que utilicen el Serverless Framework para desplegar sus aplicaciones serverless.
El complemento habilita automáticamente la instrumentación para que las aplicaciones recopilen métricas, trazas (traces) y logs mediante:

- Instalación de la biblioteca Datadog Lambda en tus funciones Lambda como una capa Lambda.
- Instalación de la extensión Datadog Lambda a tus funciones Lambda como una campa Lambda (`addExtension`) o la suscripción de Datadog Forwarder a los grupos de logs de tus funciones Lambda (`forwarderArn`).
- Realización de los cambios de configuración necesarios, como añadir variables de entorno o capas de rastreo adicionales, a tus funciones Lambda.

## Empezando

Para empezar rápidamente, sigue las instrucciones de instalación de [Python][1], [Node.js][2], [Ruby][3], [Java][4], [Go][5] o [.NET][6] y ve las métricas mejoradas, trazas y logs de tus funciones en Datadog.

Una vez finalizada la instalación, configura las [opciones avanzadas](https://docs.datadoghq.com/serverless/configuration) para adaptarlas a tus necesidades de monitorización.

## Actualización

Cada versión del complemento se publica con un [conjunto específico de versiones de Datadog Lambda Layers][15]. Para recoger las nuevas características y correcciones de errores proporcionadas por las últimas versiones de Datadog Lambda Layers, actualiza el complemento del marco serverless. Realiza un test de la nueva versión antes de aplicarla a tus aplicaciones de producción.

## Parámetros de configuración

Para configurar más tu complemento, utiliza los siguientes parámetros personalizados en tu `serverless.yml`:

| Parámetro                     | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------------------- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `site`                        | Configura a qué sitio de Datadog se enviarán los datos, como `datadoghq.com` (por defecto), `datadoghq.eu`, `us3.datadoghq.com`, `us5.datadoghq.com`, `ap1.datadoghq.com` o `ddog-gov.com`. Este parámetro es necesario cuando se recopila telemetría utilizando la extensión Datadog Lambda.                                                                                                                                                        |
| `apiKey`                      | [Clave de la API de Datadog][7]. Este parámetro es necesario cuando se recopila telemetría utilizando la extensión Datadog Lambda. Como alternativa, también puedes configurar la variable de entorno `DATADOG_API_KEY` en tu entorno de despliegue.                                                                                                                                                                                                    |
| `appKey`                      | Clave de la aplicación de Datadog. Solo es necesaria cuando el campo `monitors` está definido. Como alternativa, también puedes configurar la variable de entorno `DATADOG_APP_KEY` en tu entorno de despliegue.                                                                                                                                                                                                                                                |
| `apiKeySecretArn`             | Una alternativa al uso del campo `apiKey`. El ARN del secreto que almacena la clave de la API de Datadog en AWS Secrets Manager. Recuerda añadir el permiso `secretsmanager:GetSecretValue` al rol de ejecución de Lambda.                                                                                                                                                                                                   |
| `apiKMSKey`                   | Una alternativa al uso del campo `apiKey`. Clave de la API de Datadog cifrada mediante KMS. Recuerda añadir el permiso `kms:Decrypt` al rol de ejecución de Lambda.                                                                                                                                                                                                                                                                  |
| `env`                         | Cuando se configura junto con `addExtension`, se añade una variable de entorno `DD_ENV` a todas las funciones Lambda con el valor proporcionado. De lo contrario, se añade una etiqueta (tag) de `env` a todas las funciones Lambda con el valor proporcionado. El valor por defecto es el valor `stage` del despliegue serverless.                                                                                                                                                  |
| `service`                     | Cuando se configura junto con `addExtension`, se añade una variable de entorno `DD_SERVICE` a todas las funciones Lambda con el valor proporcionado. De lo contrario, se añade una etiqueta de `service` a todas las funciones Lambda con el valor proporcionado. El valor por defecto es el valor `service` del proyecto serverless.
| `version`                     | Cuando se configura junto con `addExtension`, se añade una variable de entorno `DD_VERSION` a todas las funciones Lambda con el valor proporcionado. Cuando se configura junto con `forwarderArn`, se añade una etiqueta `version` a todas las funciones Lambda con el valor proporcionado.                                                                                                                                                                              |
| `tags`                        | Una lista separada por comas de pares `key`:`value` como una sola cadena. Cuando se configura junto con `extensionLayerVersion`, se añade una variable de entorno `DD_TAGS` a todas las funciones Lambda con el valor proporcionado. Cuando se configura junto con `forwarderArn`, el complemento analiza la cadena y configura cada par `key`:`value` como una etiqueta en todas las funciones Lambda.                                                                                |
| `enableXrayTracing`           | Configura `true` para activar el rastreo X-Ray en las funciones Lambda y las integraciones de la API Gateway. Por defecto es `false`.                                                                                                                                                                                                                                                                                                                |
| `enableDDTracing`             | Activa el rastreo de Datadog en las funciones Lambda. Por defecto es `true`.                                                                                                                                                                                                                                                                                                                                                           |
| `enableASM`                   | Activa [Datadog Application Security Management (ASM)][19] en la función Lambda. Necesita que la extensión Datadog esté presente (utilizando `addExtension` o añadida manualmente) y `enableDDTracing`. Por defecto es  `false`.                                                                                                                                                                                                                                                                                                                                                          |
| `enableDDLogs`                | Activa la recopilación de logs de Datadog mediante la extensión Lambda. Por defecto es `true`. Nota: Esta configuración no tiene ningún efecto en los logs enviados por el Datadog Forwarder .                                                                                                                                                                                                                                                                        |
| `monitors`                    | Cuando se define, el complemento de Datadog configura monitors para la función desplegada. Requiere configurar `DATADOG_API_KEY` y `DATADOG_APP_KEY` en tu entorno. Para saber cómo definir monitors, consulta [Para activar y configurar un Monitor serverless recomendado](#to-enable-and-configure-a-recommended-serverless-monitor).                                                                                                    |
| `captureLambdaPayload`        | [Captura las cargas útiles entrantes y salientes de AWS Lambda][17] en los tramos (spans) de APM de Datadog para invocaciones Lambda. Por defecto es `false`.                                                                                                                                                                                                                                                                                               |
| `enableSourceCodeIntegration` | Activa la [Integración del código fuente Datadog][18] para la función. Por defecto es `true`.                                                                                                                                                                                                                                                                                                                                           |
| `uploadGitMetadata`           | Activa la carga de metadatos Git para la función, como parte de la integración del código fuente. Configúralo en false si tienes instalada la integración de Datadog Github, ya que hace innecesaria la carga de metadatos Git. Por defecto es `true`.                                                                                                                                                                                          |
| `subscribeToAccessLogs`       | Activa la suscripción automática de Datadog Forwarder a los grupos de logs de acceso de API Gateway. Requiere la configuración de `forwarderArn`. Por defecto es `true`.                                                                                                                                                                                                                                                                                |
| `subscribeToExecutionLogs`    | Activa la suscripción automática de Datadog Forwarder a los grupos de logs de API HTTP y Websocket. Requiere la configuración de `forwarderArn`. Por defecto es `true`.                                                                                                                                                                                                                                                                           |
| `forwarderArn`                | El ARN de Datadog Forwarder que se suscribirá a los grupos de logs de Lambda o API Gateway.                                                                                                                                                                                                                                                                                                                                   |
| `addLayers`                   | Si deseas instalar la biblioteca de Datadog Lambda como una capa. Por defecto es `true`. Configúralo en `false` cuando planees empaquetar la biblioteca Datadog Lambda al paquete de despliegue de tus funciones por tu cuenta para poder instalar una versión específica de la biblioteca Datadog Lambda ([Python][8] o [Node.js][9]).                                                                                                                   |
| `addExtension`                | Si se instala la extensión Datadog Lambda como capa. El valor por defecto es `true`. Cuando se activa, es necesario configurar `apiKey` y `site`.                                                                                                                                                                                                                                                                                  |
| `exclude`                     | Cuando se configura, este complemento ignora todas las funciones especificadas. Utiliza este parámetro si tienes algunas funciones que no deban incluir la funcionalidad Datadog. Por defecto es `[]`.                                                                                                                                                                                                                                                         |
| `enabled`                     | Cuando se configura en `false`, el complemento de Datadog permanece inactivo. Por defecto es `true`. Puedes controlar esta opción utilizando una variable de entorno. Por ejemplo, utiliza `enabled: ${strToBool(${env:DD_PLUGIN_ENABLED, true})}` para activar/desactivar el complemento durante el despliegue. Como alternativa, también puedes utilizar el valor pasado a través de `--stage` para controlar esta opción-[consulta el ejemplo](#disable-plugin-for-particular-environment). |
| `customHandler`               | Cuando se configura, el controlador especificado se configura como el controlador para todas las funciones.                                                                                                                                                                                                                                                                                                                                                 |
| `failOnError`                 | Cuando se configura, este complemento genera un error si no se crea o actualiza algún monitor Datadog personalizado. Esto ocurre después del despliegue, pero hará que el resultado de `serverless deploy` devuelva un código de salida distinto de cero (para un error de la CI de usuario). Por defecto es `false`.                                                                                                                                                                              |
| `logLevel`                    | El nivel del log, configurado en `DEBUG` para un registro extendido.                                                                                                                                                                                                                                                                                                                                                                          |
| `skipCloudformationOutputs`   | Se configura en `true` si deseas omitir añadir Datadog Cloudformation Outputs para tu stack. Esto es útil si se está ejecutando en el límite de 200 salidas que puede causar un error en la creación del stack.                                                                                                                                                                                                                              |
| `enableColdStartTracing`      | Se configura en `false` para desactivar el rastreo de inicio en frío. Se utiliza en NodeJS y Python. Por defecto es `true`.                                                                                                                                                                                                                                                                                                                                 |
| `coldStartTraceMinDuration`   | Configura la duración mínima (en milisegundos) de un evento de carga de un módulo que se va a rastrear a través del rastreo de inicio en frío. Número. Por defecto es `3`.                                                                                                                                                                                                                                                                                            |
| `coldStartTraceSkipLibs`      | Omite opcionalmente la creación de tramos de inicio en frío para un lista separada por comas de bibliotecas. Es útil para limitar la profundidad u omitir bibliotecas conocidas. El valor por defecto depende del tiempo de ejecución.                                                                                                                                                                                                                                                                |
| `subdomain`                   | Configura el subdominio opcional que se utilizará para las URL de las aplicaciones que se imprimen en la salida. Por defecto es `app`.                                                                                                                                                                                                                                                                                                                                |
| `enableProfiling`             | Activa el Datadog Continuous Profiler con `true`. Es compatible en Beta con NodeJS y Python. Por defecto es `false`.                                                                                                                                                                                                                                                                                                            |
| `encodeAuthorizerContext`     | Cuando se configura en `true` para los autorizadores Lambda, el contexto de rastreo se codificará en la respuesta para la propagación. Compatible con NodeJS y Python. Por defecto es `true`.                                                                                                                                                                                                                                                       |
| `decodeAuthorizerContext`     | Cuando se configura en `true` para Lambdas que están autorizadas a través de autorizadores Lambda, analizará y utilizará el contexto de rastreo codificado (si se encuentra). Compatible con NodeJS y Python. Por defecto es `true`.                                                                                                                                                                                                                                |
| `apmFlushDeadline`            | Se utiliza para determinar cuándo enviar tramos antes de que se agote el tiempo, en milisegundos. Cuando el tiempo restante en una invocación de AWS Lambda es inferior al valor configurado, el rastreador intenta enviar los tramos (spans) activos actuales y todos los tramos finalizados. Compatible con NodeJS y Python. El valor por defecto es `100` milisegundos.                                                                                                             |
| `enableStepFunctionsTracing`    | Activa la suscripción automática de los grupos de logs de Datadog Forwarder a Step Functions y el rastreo de Step Functions. Si no hay grupos de logs de Step Functions configurados, se crearán automáticamente. Requiere la configuración de `forwarderArn`. Por defecto es `false`.                                                                                                                                                                  |
| `propagateUpstreamTrace` | Cuando se configura en `true`, las trazas de invocaciones de Stepfunction aguas abajo se fusionan con las invocaciones de Stepfunction aguas arriba. Por defecto es `false`. |
| `redirectHandlers`    | Opcionalmente desactiva la redirección del controlador si se configura en `false`. Esto solo debe configurarse en `false` cuando APM está totalmente desactivada. Por defecto es `true`.                                                                                                                                                                  |
Para utilizar cualquiera de estos parámetros, añade una sección `custom` > `datadog` a tu `serverless.yml` similar a este ejemplo:

```yaml
custom:
  datadog:
    apiKeySecretArn: "{Datadog_API_Key_Secret_ARN}"
    enableXrayTracing: false
    enableDDTracing: true
    enableDDLogs: true
    subscribeToAccessLogs: true
    forwarderArn: arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder
    exclude:
      - dd-excluded-function
```

### Webpack

Si utilizas un software que instala varios programas, como webpack, consulta [Rastreo serverless y Webpack](https://docs.datadoghq.com/serverless/guide/serverless_tracing_and_webpack/).

### TypeScript

Es posible que encuentres el error de que faltan definiciones de tipo. Para resolver el error, añade `datadog-lambda-js` y `dd-trace` a la lista de `devDependencies` del package.json de tu proyecto.

Si estás utilizando serverless-typescript, asegúrate de que `serverless-datadog` esté por encima de la entrada `serverless-typescript` en tu `serverless.yml`. El complemento detectará automáticamente los archivos `.ts`.

```yaml
plugins:
  - serverless-plugin-datadog
  - serverless-typescript
```

### Desactivar un complemento para un entorno particular

Si deseas desconectar el complemento en función del entorno (pasado a través de `--stage`), puedes utilizar algo similar al ejemplo siguiente.

```yaml
provider:
  stage: ${self:opt.stage, 'dev'}

custom:
  staged: ${self:custom.stageVars.${self:provider.stage}, {}}

  stageVars:
    dev:
      dd_enabled: false

  datadog:
    enabled: ${self:custom.staged.dd_enabled, true}
```

### Serverless Monitors

Hay siete monitors recomendados con valores por defecto preconfigurados.

|       Monitor        |                                         Métricas                                          | Umbral  | ID de Serverless Monitor  |
| :------------------: | :--------------------------------------------------------------------------------------: | :--------: | :--------------------: |
|   Alto porcentaje de errores    |                       `aws.lambda.errors`/`aws.lambda.invocations`                       |   >= 10 %   |   `high_error_rate`    |
|       Tiempo de espera        |                      `aws.lambda.duration.max`/`aws.lambda.timeout`                      |    >= 1    |       `timeout`        |
|    Sin memoria     |                           `aws.lambda.enhanced.out_of_memory`                            |    > 0     |    `out_of_memory`     |
|  Alta antigüedad del iterador   |                            `aws.lambda.iterator_age.maximum`                             | >= 24 h  |  `high_iterator_age`   |
| Alto índice de inicio en frío | `aws.lambda.enhanced.invocations(cold_start:true)`/<br>`aws.lambda.enhanced.invocations` |   >= 20 %   | `high_cold_start_rate` |
|    Limitaciones altas    |                     `aws.lambda.throttles`/`aws.lambda.invocations`                      |   >= 20 %   |    `high_throttles`    |
|    Mayores costos    |                           `aws.lambda.enhanced.estimated_cost`                           | ↑20 % |    `increased_cost`    |

#### Para activar y configurar un Serverless Monitor recomendado

Para crear un Monitor recomendado, debes utilizar tu respectivo ID de Serverless Monitor. Ten en cuenta que también debes configurar las `DATADOG_API_KEY` y `DATADOG_APP_KEY` en tu entorno.

Si deseas configurar más los parámetros de un Monitor recomendado, puedes definir directamente los valores de los parámetros en el ID del Serverless Monitor. Los parámetros no especificados en un Monitor recomendado utilizarán el valor por defecto recomendado. El parámetro `query` para monitors recomendados no se puede modificar directamente y utilizará por defecto el valor de `query` definido anteriormente; sin embargo, puedes cambiar el valor umbral en `query` redefiniéndolo dentro del parámetro `options`. Para eliminar un Monitor, elimina el Monitor de la plantilla `serverless.yml`. Para hallar más documentación sobre cómo definir los parámetros de Monitors, consulta la [API de Datadog Monitors](https://docs.datadoghq.com/api/latest/monitors/#create-a-monitor).

La creación de un Monitor se produce después del despliegue de la función. En el caso de que no se consiga crear un Monitor, la función seguirá desplegándose correctamente.

##### Para crear un Monitor recomendado con los valores por defecto

Define el ID apropiado del serverless monitor sin especificar ningún valor de parámetro.

```yaml
custom:
  datadog:
    addLayers: true
    monitors:
      - high_error_rate:
```

##### Para configurar un Monitor recomendado

```yaml
personalizado:
  datadog:
    addLayers: true
    monitors:
      - high_error_rate:
          nombre: "High Error Rate with Modified Warning Threshold"
          mensaje: "More than 10% of the function’s invocations were errors in the selected time range. Notify @data.dog@datadoghq.com @slack-serverless-monitors"
          etiquetas: ["modified_error_rate", "serverless", "error_rate"]
          require_full_window: true
          prioridad: 2
          opciones:
            include_tags: true
            notify_audit: true
            Umbrales:
              advertencia: 0.05
              crítico: 0.1
```

##### Para eliminar un Monitor

Al eliminar el identificador del serverless Monitor y sus parámetros se eliminará el Monitor.

#### Para activar y configurar un Monitor personalizado

Para definir un Monitor personalizado, debes definir una cadena de ID única de serverless Monitor, además de pasar la clave de la API y la clave de la aplicación, `DATADOG_API_KEY` y `DATADOG_APP_KEY`, en tu entorno. El parámetro `query` es obligatorio, pero todos los demás parámetros son opcionales. Define una cadena de ID única de serverless Monitor y especifica los parámetros necesarios a continuación. Para hallar más documentación sobre los parámetros de Monitor, consulta la [API de Datadog Monitors](https://docs.datadoghq.com/api/latest/monitors/#create-a-monitor).

```yaml
personalizado:
  datadog:
    addLayers: true
    monitors:
      - custom_monitor_id:
          nombre: "Custom Monitor"
          consulta :"max(next_1w):forecast(avg:system.load.1{*}, 'linear', 1, interval='60m', history='1w', model='default') >= 3"
          mensaje: "Custom message for custom monitor. Notify @data.dog@datadoghq.com @slack-serverless-monitors"
          etiquetas: ["custom_monitor", "serverless"]
          prioridad: 3
          options:
            enable_logs_sample: true
            require_full_window: true
            include_tags: false
            notify_audit: true
            notify_no_data: false
            umbrales:
              advertencia: 2
              crítico: 3
```

## Cambios de última hora

[**v5.0.0**](https://github.com/DataDog/serverless-plugin-datadog/releases/tag/v5.0.0)

- Cuando se utiliza junto con la extensión Datadog, este complemento configura las etiquetas `service` y `env` a través de las variables de entorno, en lugar de las etiquetas de recursos Lambda.
- El parámetro `enableTags` se sustituyó por los nuevos parámetros `service`, `env`.

[**v4.0.0**](https://github.com/DataDog/serverless-plugin-datadog/releases/tag/v4.0.0)

- La extensión Datadog Lambda es ahora el mecanismo por defecto para transmitir telemetría a Datadog.

## Trabajar con serverless-plugin-warmup
Esta biblioteca es compatible en el mayor esfuerzo con [serverless-plugin-warmup](https://github.com/juanjoDiaz/serverless-plugin-warmup). Si deseas excluir la función del calentador de Datadog, utiliza la función `exclude` de este biblioteca.

Para que tu aplicación funcione correctamente en paquete, este complemento *debe* aparecer _después_ de `serverless-plugin-warmup` en tu archivo `serverless.yml`:
```yaml
plugins:
  - serverless-plugin-warmup
  - serverless-plugin-datadog
```

## Problemas de apertura

Si encuentras un error en este paquete, ¡háznoslo saber presentando una incidencia! Antes de abrir un nuevo problema, busca los problemas existentes para evitar duplicaciones.

Cuando abras un problema, incluye tu versión de Serverless Framework, Python/Node.js y la traza del stack si está disponible. También, incluye los pasos para la reproducción cuando corresponda.

También puedes abrir un problema para solicitar una función.

## Colaboración

Si encuentras un problema en este paquete y tienes una solución, abre una solicitud de incorporación de cambios siguiendo los [procedimientos][14].

## Comunidad

Si tienes preguntas o comentarios sobre el producto, únete al canal `#serverless` en la [comunidad Datadog en Slack](https://chat.datadoghq.com/).

## Licencia

A menos que se indique explícitamente lo contrario, todos los archivos de este repositorio tienen Licencia de Apache Versión 2.0.

Este producto incluye el software desarrollado en Datadog (<https://www.datadoghq.com/>). Copyright 2021 Datadog, Inc.

[1]: https://docs.datadoghq.com/es/serverless/installation/python/?tab=serverlessframework
[2]: https://docs.datadoghq.com/es/serverless/installation/nodejs/?tab=serverlessframework
[3]: https://docs.datadoghq.com/es/serverless/installation/ruby/?tab=serverlessframework
[4]: https://docs.datadoghq.com/es/serverless/installation/java/?tab=serverlessframework
[5]: https://docs.datadoghq.com/es/serverless/installation/go/?tab=serverlessframework
[6]: https://docs.datadoghq.com/es/serverless/installation/dotnet/?tab=serverlessframework
[7]: https://docs.datadoghq.com/es/account_management/api-app-keys/#api-keys
[8]: https://pypi.org/project/datadog-lambda/
[9]: https://www.npmjs.com/package/datadog-lambda-js
[10]: https://webpack.js.org/configuration/externals/
[11]: https://docs.datadoghq.com/es/serverless/forwarder/
[12]: https://docs.datadoghq.com/es/serverless/datadog_lambda_library/extension/
[13]: https://docs.aws.amazon.com/lambda/latest/dg/using-extensions.html
[14]: https://github.com/DataDog/serverless-plugin-datadog/blob/master/CONTRIBUTING.md
[15]: https://github.com/DataDog/serverless-plugin-datadog/blob/master/src/layers.json
[16]: https://docs.datadoghq.com/es/tracing/setup_overview/configure_data_security/?tab=mongodb#replace-rules-for-tag-filtering
[17]: https://www.datadoghq.com/blog/troubleshoot-lambda-function-request-response-payloads/
[18]: https://docs.datadoghq.com/es/integrations/guide/source-code-integration
[19]: https://docs.datadoghq.com/es/security/application_security/