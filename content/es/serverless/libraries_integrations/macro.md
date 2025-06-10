---
aliases:
- /es/serverless/serverless_integrations/macro/
dependencies:
- https://github.com/DataDog/datadog-cloudformation-macro/blob/main/serverless/README.md
title: Datadog Serverless Macro
---
![build_serverless](https://github.com/DataDog/datadog-cloudformation-macro/workflows/build_serverless/badge.svg)
[![Slack](https://chat.datadoghq.com/badge.svg?bg=632CA6)](https://chat.datadoghq.com/)

Datadog recomienda la macro serverless CloudFormation para los clientes que utilizan AWS SAM para desplegar sus aplicaciones serverless.

La macro configura automáticamente la ingesta de métricas, trazas (traces) y logs desde tus aplicaciones serverless mediante:

- Instalación y configuración de la biblioteca Datadog Lambda biblioteca y la extensión Lambda para tus funciones de [Python][1], [Node.js][2], [.NET][9] y [Java][10] Lambda.
- Habilitación de la recopilación de métricas de Lambda mejoradas y métricas personalizadas de tus funciones de Lambda.
- Administración de suscripciones desde Datadog Forwarder a tus grupos de logs de funciones Lambda, si lo deseas.

## Instalación

Para que la macro Datadog serverless esté disponible para utilizarla en tu cuenta de AWS, despliega un stack de CloudFormation con una plantilla proporcionada por Datadog. Esta implementación incluye un recurso de macro de CloudFormation y una función Lambda que se invoca cuando se ejecuta la macro. El despliegue de este stack te permite utilizar la macro en otros stacks de CloudFormation desplegados en la misma cuenta. Para obtener más detalles sobre la definición de una macro en tu cuenta, consulta la [página de documentación de CloudFormation][3].

**Nota:** La macro Datadog serverless debe crearse una vez en cada región que contenga stacks que desees transformar.

### Opción 1: AWS Console

[![Lanzar el stack](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)](https://console.aws.amazon.com/cloudformation/home?region=sa-east-1#/stacks/quickCreate?stackName=datadog-serverless-macro&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml)

Crea el stack de macros Datadog serverless en tu cuenta de AWS utilizando el enlace a la plantilla `Launch Stack` anterior.

### Opción 2: AWS CLI

Si estás instalando por primera vez, despliega con:

```bash
aws cloudformation create-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

## Utilización con AWS SAM

Para desplegar tu aplicación serverless con SAM, añade la macro CloudFormation Datadog serverless en la sección `Transform` en tu archivo `template.yml`, después de la transformación SAM requerida. Añade también un parámetro de `DDGitData` y pásalo a la macro para habilitar integración con el código fuente de Datadog:

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      stackName: !Ref "AWS::StackName"
      apiKey: "<DATADOG_API_KEY>"
      pythonLayerVersion: "<LAYER_VERSION>" # Use appropriate parameter for other runtimes
      extensionLayerVersion: "<LAYER_VERSION>"
      service: "<SERVICE>" # Optional
      env: "<ENV>" # Optional
      version: "<VERSION>" # Optional
      tags: "<TAGS>" # Optional
      # Pass DDGitData here to enable Source Code Integration tagging
      gitData: !Ref DDGitData
      # For additional parameters, see the Configuration section

Parameters:
  DDGitData:
    Type: String
    Default: ""
    Description: "The output of $(git rev-parse HEAD),$(git config --get remote.origin.url). Used for Datadog Source Code Integration tagging"
```

Para configurar el parámetro `DDGitData` para la integración del código fuente de Datadog, utiliza la opción `--parameter-overrides` de SAM:

```bash
sam deploy --parameter-overrides  DDGitData="$(git rev-parse HEAD),$(git config --get remote.origin.url)"
```

Nota: Si no modificaste el archivo `template.yml` proporcionado cuando instalaste la macro, el nombre de la macro definida en tu cuenta será `DatadogServerless`. Si has modificado la plantilla original, asegúrate de que el nombre de la transformación que añadas aquí coincida con la propiedad `Name` del recurso `AWS::CloudFormation::Macro`.

Nota: Si deseas especificar algo de las configuración solo una vez, puedes modificar `template.yml` y añadir las variables de entorno que desees configurar para esa región. Esta es una forma de controlar los valores por defecto adicionales. El ejemplo siguiente configura `DD_API_KEY_SECRET_ARN` y `DD_ENV`, que la macro tratará como valores por defecto:

```yaml
Resources:
  MacroFunction:
    Type: AWS::Serverless::Function
    DependsOn: MacroFunctionZip
    Properties:
      FunctionName:
        Fn::If:
          - SetFunctionName
          - Ref: FunctionName
          - Ref: AWS::NoValue
      Description: Processes a CloudFormation template to install Datadog Lambda layers for Lambda functions.
      Handler: src/index.handler
      ...
      Environment:
        Variables:
          DD_API_KEY_SECRET_ARN: "arn:aws:secretsmanager:us-west-2:123456789012:secret:DdApiKeySecret-e1v5Yn7TvIPc-d1Qc4E"
          DD_ENV: "dev"
```

## Actualización

Si vas a actualizar la macro después de una nueva versión, utiliza el método `update-stack`:

```bash
aws cloudformation update-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

También puedes especificar una versión de la macro de las últimas [versiones](https://github.com/DataDog/datadog-cloudformation-macro/releases) sustituyendo `latest.yml` con la versión, por ejemplo `0.1.2.yml`.

## Configuración

Para configurar más tu complemento, utiliza los siguientes parámetros personalizados:

| Parámetro                   | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `addLayers`                 | Si se añaden Lambda Layers o se espera que el usuario traiga las suyas propias. Por defecto es true. Cuando es true, las variables de la versión de la biblioteca Lambda también son necesarias. Cuando es false, debes incluir la biblioteca Datadog Lambda en los paquetes de despliegue de tus funciones.                                                                                                                                                                                                                                        |
| `pythonLayerVersion`        | Versión de Python Lambda Layer que se va a instalar, como "21". Es obligatorio si estás desplegando al menos una función Lambda escrita en Python y `addLayers` es true. Busca el número de la última versión en [https://github.com/DataDog/datadog-lambda-python/releases][5].                                                                                                                                                                                                                              |
| `nodeLayerVersion`          | Versión de Node.js Lambda Layer que se va a instalar, como "29". Es obligatorio si estás desplegando al menos una función Lambda escrita en Node.js y `addLayers` es true. Busca el número de la última versión en [https://github.com/DataDog/datadog-lambda-js/releases][6].                                                                                                                                                                                                                                |
| `dotnetLayerVersion`        | Versión de .NET Lambda Layer que se va a instalar, como "14". Es obligatorio si estás desplegando al menos una función Lambda escrita en .NET y `addLayers` es true. Busca el número de la última versión en [https://github.com/DataDog/dd-trace-dotnet-aws-lambda-layer/releases][9].
| `javaLayerVersion`        | Versión de Java Lambda Layer que se va a instalar, como "12". Es obligatorio si estás desplegando al menos una función Lambda escrita en Java y `addLayers` es true. Busca el número de la última versión en [https://github.com/DataDog/datadog-lambda-Java/releases][10].
| `extensionLayerVersion`     | Versión de la extensión Datadog Lambda que se va a instalar, como "5". Si se configura `extensionLayerVersion`, también debe configurarse `apiKey` (o, si está cifrada, `apiKMSKey` o `apiKeySecretArn`). Mientras utilizas `extensionLayerVersion` no configures `forwarderArn`. Encontrarás más información sobre la extensión Lambda [aquí][8].                                                                                                                                                                                   |
| `forwarderArn`              | Cuando se configura, el complemento suscribirá automáticamente los grupos de logs de las funciones a Datadog Forwarder. Alternativamente, puedes definir la suscripción de logs utilizando el recurso [AWS::Logs::SubscriptionFilter][7]. **Nota**: La propiedad 'FunctionName' debe definirse para las funciones que se desplieguen por primera vez porque la macro necesita el nombre de la función para crear los grupos de logs y los filtros de suscripción. FunctionName' NO debe contener ninguna función de CloudFormation, como `!Sub`. |
| `stackName`                 | El nombre del stack de CloudFormation que se está desplegando. Solo es necesario cuando se proporciona un `forwarderArn` y las funciones Lambda se nombran dinámicamente (cuando no se proporciona la propiedad `FunctionName` para una Lambda). Para obtener más información sobre cómo añadir este parámetro para SAM y CDK, consulta los ejemplos siguientes.                                                                                                                                                                                          |
| `flushMetricsToLogs`        | Envía métricas personalizadas a través de logs con la función Datadog Forwarder Lambda (recomendado). El valor por defecto es `true`. Cuando se establece en `false`, la clave de la API de Datadog debe definirse mediante `apiKey` (o, si está cifrada, `apiKMSKey` o `apiKeySecretArn`).                                                                                                                                                                                                                                                             |
| `site`                      | Configura el sitio Datadog al cual se enviarán los datos, solo es necesario cuando flushMetricsToLogs es `false`. Los valores posibles son `datadoghq.com`, `datadoghq.eu`, `us3.datadoghq.com`, `us5.datadoghq.com`, `ap1.datadoghq.com` y `ddog-gov.com`. El valor por defecto es `datadoghq.com`.                                                                                                                                                                                                                                        |
| `apiKey`                    | La clave de la API de Datadog, solo es necesaria cuando `flushMetricsToLogs` se configura en `false`.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `apiKeySecretArn`           | El ARN del secreto que almacena la clave de la API de Datadog en AWS Secrets Manager. Utiliza este parámetro en lugar de `apiKey` cuando `flushMetricsToLogs` sea `false` o `extensionLayerVersion`. Recuerda añadir el permiso `secretsmanager:GetSecretValue` al rol de ejecución Lambda.                                                                                                                                                                                                              |
| `apiKMSKey`                 | La clave de la API de Datadog cifrada mediante KMS. Utiliza este parámetro en lugar de `apiKey` cuando `flushMetricsToLogs` sea false y estés utilizando el cifrado de KMS.                                                                                                                                                                                                                                                                                                                                                  |
| `enableEnhancedMetrics`     | Habilitar métricas mejoradas para funciones Lambda. Por defecto es `true`. La función Datadog Forwarder Lambda debe suscribirse al grupo de logs de la función.                                                                                                                                                                                                                                                                                                                                                      |
| `enableXrayTracing`         | Habilitar el rastreo en las funciones Lambda. Por defecto es false.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `enableDDTracing`           | Habilitar el rastreo en la función Lambda a través de dd-trace, la biblioteca de la APM de Datadog. El valor por defecto es `true`. La función Datadog Forwarder Lambda debe suscribirse al grupo de logs de la función.                                                                                                                                                                                                                                                                                                                           |
| `enableDDLogs`              | Habilitar la recopilación de logs de Datadog para la función Lambda. Nota: Esta configuración no tiene ningún efecto sobre los logs enviados a través de Datadog Forwarder. Por defecto es true.                                                                                                                                                                                                                                                                                                                                                   |
| `service`                   | Cuando se configura junto con `extensionLayerVersion`, la macro añade una variable de entorno `DD_SERVICE` a todas las funciones Lambda con el valor proporcionado. Cuando se configura junto con `forwarderArn`, la macro añade una etiqueta `service` a todas las funciones Lambda con el valor proporcionado.                                                                                                                                                                                                                        |
| `env`                       | Cuando se configura junto con `extensionLayerVersion`, la macro añade una variable de entorno `DD_ENV` a todas las funciones Lambda con el valor proporcionado. Cuando se configura junto con `forwarderArn`, la macro añade una etiqueta `env` a todas las funciones Lambda con el valor proporcionado.                                                                                                                                                                                                                               |
| `version`                   | Cuando se configura junto con `extensionLayerVersion`, la macro añade una variable de entorno `DD_VERSION` a todas las funciones Lambda con el valor proporcionado. Cuando se configura junto con `forwarderArn`, la macro añade una etiqueta `version` a todas las funciones Lambda con el valor proporcionado.                                                                                                                                                                                                                        |
| `tags`                      | Una lista separada por comas de pares de clave:valor como una sola cadena. Cuando se configura junto con `extensionLayerVersion`, se añade una variable de entorno `DD_TAGS` en todas las funciones Lambda con el valor proporcionado. Cuando se configura junto con `forwarderArn`, la macro analiza la cadena y configura cada par de clave:valor como una etiqueta en todas las funciones Lambda.                                                                                                                                                                |
| `logLevel`                  | Configura el nivel de log. Configura en `DEBUG` para un registro extendido.                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `captureLambdaPayload`      | Etiqueta automáticamente el tramo (span) de ejecución de la función con cargas útiles de solicitud y respuesta, para que puedan mostrarse en la aplicación de APM.                                                                                                                                                                                                                                                                                                                                                                 |
| `enableColdStartTracing`    | Configurado en `false` para desactivar el Rastreo de inicio en frío. Se utiliza en NodeJS y Python. Por defecto es `true`.                                                                                                                                                                                                                                                                                                                                                                                                        |
| `coldStartTraceMinDuration` | Configura la duración mínima (en milisegundos) de un evento de carga de módulo que se va a rastrear a través del rastreo de inicio en frío. Número. Por defecto es `3`.                                                                                                                                                                                                                                                                                                                                                                   |
| `coldStartTraceSkipLibs`    | Opcionalmente omitir la creación de tramos de inicio en frío para un lista separada por comas de bibliotecas. Útil para limitar la profundidad u omitir bibliotecas conocidas. El valor por defecto depende del tiempo de ejecución.                                                                                                                                                                                                                                                                                                                                       |
| `enableProfiling`           | Habilita el Datadog Continuous Profiler con `true`. Compatible con Beta para NodeJS y Python. Por defecto en `false`.                                                                                                                                                                                                                                                                                                                                                                                   |
| `encodeAuthorizerContext`   | Cuando se configure en `true` para los autorizadores Lambda, el contexto del rastreo se codificará en la respuesta para la propagación. Compatible con NodeJS y Python. Por defecto es `true`.                                                                                                                                                                                                                                                                                                                              |
| `decodeAuthorizerContext`   | Cuando se configure en `true` para Lambdas que están autorizadas a través de autorizadores Lambda, analizará y utilizará el contexto de rastreo codificado (si se lo encuentra). Compatible con NodeJS y Python. Por defecto es `true`.                                                                                                                                                                                                                                                                                                       |
| `apmFlushDeadline`          | Se utiliza para determinar cuándo enviar tramos antes de que se agote el tiempo, en milisegundos. Cuando el tiempo restante en una invocación de AWS Lambda es menor que el valor configurado, el rastreador intenta enviar los tramos activos actuales y todos los tramos finalizados. Compatible con NodeJS y Python. El valor por defecto es `100` milisegundos.                                                                                                                                                                                    |

## Cómo funciona

Esta macro modifica tu plantilla de CloudFormation para instalar la biblioteca Datadog Lambda adjuntando las Lambda Layers para [Node.js][2], [Python][1], [.NET][9] y [Java][10] a tus funciones. Redirige a un controlador de sustitución que inicializa la biblioteca Lambda sin ningún cambio de código requerido.

## Solucionar problemas

### Depurar logs

Para ayudarte a depurar problemas, puedes consultar en los logs de CloudWatch la función Lambda de la macro. Para encontrar los logs de CloudWatch:

- Encuentra el stack CloudFormation de la macro (llamada `datadog-serverless-macro` si has copiado el comando en las instrucciones)
- Haz clic en la pestaña de recursos y el grupo de logs de CloudWatch debería estar disponible con el ID lógico `MacroFunctionLogGroup`

### Mensaje de error: La propiedad 'FunctionName' no está definida para...

Este error se produce cuando proporcionas un `forwarderArn` y estás desplegando tu función Lambda por primera vez, por lo que no existe actualmente ningún grupo de logs y la macro no puede crear este grupo de logs ni suscribirse al Forwarder por ti. Una forma de solucionar este problema es definir explícitamente la propiedad `FunctionName` en tu Lambda (consulta el ejemplo siguiente).

```yml
Resources:
  MyLambda:
    Type: AWS::Serverless::Function
    Properties:
      Handler: index.handler
      Runtime: nodejs12.x
      FunctionName: MyFunctionName # Add this property to your Lambdas
```

Si no puedes (o prefieres no) definir el `FunctionName` explícitamente, elimina el parámetro `forwarderArn` de la plantilla SAM o del código fuente CDK y, en su lugar, define los filtros de suscripción utilizando el recurso [AWS::Logs::SubscriptionFilter][7] como se indica a continuación.

```yaml
Resources:
  MyLogSubscriptionFilter:
    Type: "AWS::Logs::SubscriptionFilter"
    Properties:
      DestinationArn: "<DATADOG_FORWARDER_ARN>"
      LogGroupName: "<CLOUDWATCH_LOG_GROUP_NAME>"
      FilterPattern: ""
```

### Mensaje de error: 'logGroupNamePrefix' no satisface la restricción...

La opción `forwarderArn` no funciona cuando `FunctionName` contiene funciones de CloudFormation, como `!Sub`. En este caso, la macro no tiene acceso al nombre de la función real (CloudFormation ejecuta funciones después de las transformaciones). Por lo tanto, no puede crear grupos de logs ni filtros de suscripción para tus funciones.

Elimina el parámetro `forwarderArn` de la plantilla SAM o del código fuente CDK y, en su lugar, define los filtros de suscripción utilizando el recurso [AWS::Logs::SubscriptionFilter][7] como se indica a continuación.

```yaml
Resources:
  MyLogSubscriptionFilter:
    Type: "AWS::Logs::SubscriptionFilter"
    Properties:
      DestinationArn: "<DATADOG_FORWARDER_ARN>"
      LogGroupName: "<CLOUDWATCH_LOG_GROUP_NAME>"
      FilterPattern: ""
```

### Mensaje de error: 'Error al ejecutar la transformación DatadogServerless'

Este error puede producirse si el usuario IAM que ejecuta el comando no tiene el permiso `lambda:InvokeFunction`. Añade el permiso al rol IAM del usuario.

## Comunidad

Si tienes preguntas o comentarios sobre el producto, únete al canal `#serverless` en la [comunidad Datadog en Slack](https://chat.datadoghq.com/).

[1]: https://github.com/DataDog/datadog-lambda-layer-python
[2]: https://github.com/DataDog/datadog-lambda-layer-js
[3]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros.html
[4]: https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_core.Stack.html
[5]: https://github.com/DataDog/datadog-lambda-python/releases
[6]: https://github.com/DataDog/datadog-lambda-js/releases
[7]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-logs-subscriptionfilter.html
[8]: https://docs.datadoghq.com/es/serverless/datadog_lambda_library/extension/
[9]: https://github.com/DataDog/dd-trace-dotnet-aws-lambda-layer/releases
[10]: https://github.com/DataDog/datadog-lambda-java/releases