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

La macro configura automáticamente la ingesta de métricas, traces (trazas) y logs de tus aplicaciones serverless.

Para las funciones lambda, esta macro:

- Instala y configura la biblioteca Datadog Lambda y Extensión Lambda para tus funciones Lambda [Python][1], [Node.js][2], [.NET][9] y [Java][10].
- Permite recopilar métricas de Lambda mejoradas y métricas personalizadas de tus funciones de Lambda.
- Gestiona las suscripciones desde Datadog Forwarder a tus grupos de logs de la función Lambda, si lo deseas.

Para funciones de step (UI) / paso (generic), esta macro:

- Crea un grupo de logs y suscribe a él la lambda de reenvío Datadog.
- Añade etiquetas (tags) para permitir el rastreo y el etiquetado unificado de servicios.
- Modifica la carga útil de los pasos de invocación de Lambda y de los pasos de invocación de la función step (UI) / paso (generic), de modo que las traces (trazas) de la función step (UI) / paso (generic) puedan fusionarse con las funciones Lambda y step (UI) / paso (generic) posteriores.

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

Para desplegar tu aplicación serverless con SAM, añade la macro Datadog Serverless CloudFormation en la sección `Transform` de tu archivo `template.yml`, después de la transformación SAM requerida. Añade un parámetro `DDGitData`, que se pasa a la macro para habilitar la integración del código source (fuente) de Datadog. Consulta el siguiente ejemplo sobre la instrumentación de tus funciones Lambda y funciones step (UI) / paso (generic):

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
      stepFunctionForwarderArn: <FORWARDER_ARN> # Required for instrumenting Step Functions
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

Nota: Si deseas especificar parte de la configuración una sola vez, puedes modificar `template.yml` y añadir las variables de entorno que desees configurar para esa región. Esta es una forma de controlar valores predeterminados adicionales. El ejemplo siguiente configura `DD_API_KEY_SECRET_ARN` y `DD_ENV`, que la macro trata como valores predeterminados:

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

Para configurar aún más tu macro, utiliza los siguientes parámetros personalizados:

| Parámetro                   | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|-----------------------------| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `addLayers`                 | Si se añaden las Lambda Layers o se espera que el usuario traiga las suyas propias. Por defecto es `true`. Cuando es `true`, también se requieren las variables de la versión de la biblioteca Lambda. Cuando es `false`, debes incluir la biblioteca Datadog Lambda en los paquetes de despliegue de tus funciones.                                                                                                                                                                                                                                                                                         |
| `pythonLayerVersion`        | Versión de la capa Lambda de Python a instalar, como "21". Es obligatorio si estás desplegando al menos una función Lambda escrita en Python y `addLayers` es `true`. Busca el último número de versión en [https://github.com/DataDog/datadog-lambda-python/releases][5].                                                                                                                                                                                                                                                                                   |
| `nodeLayerVersion`          | Versión de la capa Node.js Lambda a instalar, como "29". Es obligatorio si estás desplegando al menos una función Lambda escrita en Node.js y `addLayers` es `true`. Busca el último número de versión en [https://github.com/DataDog/datadog-lambda-js/releases][6].                                                                                                                                                                                                                                                                                     |
| `dotnetLayerVersion`        | Versión de la capa .NET Lambda a instalar, como "14". Es obligatorio si estás desplegando al menos una función Lambda escrita en .NET y `addLayers` es `true`. Busca el número de la última versión en [https://github.com/DataDog/dd-trace-dotnet-aws-lambda-layer/releases][9].                                                                                                                                                                                                                                                                            |
| `javaLayerVersion`          | Versión de la capa Java Lambda a instalar, como "12". Es obligatorio si estás desplegando al menos una función Lambda escrita en Java y `addLayers` es `true`. Busca el número de versión más reciente en [https://github.com/DataDog/datadog-lambda-java/releases][10].                                                                                                                                                                                                                                                                                        |
| `extensionLayerVersion`     | Versión de la capa Datadog Lambda Extension a instalar, como por ejemplo "5". Cuando se configura `extensionLayerVersion`, también es necesario configurar `apiKey` (o si está cifrada, `apiKMSKey` o `apiKeySecretArn`).                                                                                                                                                                                                                                                                                                                                                          |
| `addExtension`              | Si se añade la capa de extensión Lambda a la función Lambda. En forma predeterminada `false`. Cuando `true`, se aplica la capa de extensión que gestiona el envío de logs, traces (trazas) y métricas personalizadas. El parámetro `extensionLayerVersion` debe estar configurado. Si se utiliza `extensionLayerVersion`, no se debe configurar `forwarderArn`. Para obtener más información, lee la documentación [Datadog Lambda Extension][8].                                                                                                                                                                           |
| `exclude`                   | Cuando se configura, la macro ignora las funciones lambda especificadas. Utilízala si hay funciones que no requieren la instrumentación de Datadog. En forma predeterminada es `[]`.                                                                                                                                                                                                                                                                                                                                                                                                 |
| `forwarderArn`              | Cuando se configura, el complemento suscribe automáticamente los grupos de logs de las funciones Lambda al Datadog Forwarder. Alternativamente, puedes definir la suscripción de logs utilizando el recurso [AWS::Logs::SubscriptionFilter][7]. **Nota**: La propiedad 'FunctionName' debe definirse para las funciones que se despliegan por primera vez porque la macro necesita el nombre de la función para crear los grupos de logs y los filtros de suscripción. 'FunctionName' NO debe contener ninguna función de CloudFormation, como `!Sub`. Para las funciones de step (UI) / paso (generic), configura `stepFunctionForwarderArn`. |
| `stackName`                 | El nombre del stack tecnológico de CloudFormation que se está desplegando. Sólo es necesario cuando se proporciona un `forwarderArn` y las funciones Lambda se nombran dinámicamente (cuando no se proporciona la propiedad `FunctionName` para una Lambda). Para obtener más información sobre cómo añadir este parámetro para SAM y CDK, consulta los siguientes ejemplos.                                                                                                                                                                                                                                             |
| `flushMetricsToLogs`        | Envía métricas personalizadas a través de logs con la función Datadog Forwarder Lambda (recomendado). En forma predeterminada, `true`. Cuando se configura en `false`, la clave de API Datadog debe definirse utilizando `apiKey` (o si está cifrada, `apiKMSKey` o `apiKeySecretArn`).                                                                                                                                                                                                                                                                                                                |
| `site`                      | Configura a qué sitio Datadog se envían los datos, sólo es necesario cuando `flushMetricsToLogs` es `false`. Los valores posibles son `datadoghq.com`, `datadoghq.eu`, `us3.datadoghq.com`, `us5.datadoghq.com`, `ap1.datadoghq.com`, `ap2.datadoghq.com` y `ddog-gov.com`. El valor predeterminado es `datadoghq.com`.                                                                                                                                                                                                                                                                                             |
| `apiKey`                    | La clave de la API de Datadog, solo es necesaria cuando `flushMetricsToLogs` se configura en `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `apiKeySecretArn`           | El ARN del secreto que almacena la clave de la API de Datadog en AWS Secrets Manager. Utiliza este parámetro en lugar de `apiKey` cuando `flushMetricsToLogs` sea `false` o `extensionLayerVersion`. Recuerda añadir el permiso `secretsmanager:GetSecretValue` al rol de ejecución Lambda.                                                                                                                                                                                                                                                                     |
| `apiKMSKey`                 | La clave de API de Datadog cifrada mediante KMS. Utiliza este parámetro en lugar de `apiKey` cuando `flushMetricsToLogs` sea `false` y estés utilizando el cifrado KMS.                                                                                                                                                                                                                                                                                                                                                                                                       |
| `enableEnhancedMetrics`     | Habilita métricas mejoradas para funciones Lambda. En forma predeterminada es `true`. La función Datadog Forwarder Lambda debe suscribirse al grupo de logs de la función.                                                                                                                                                                                                                                                                                                                                                                                                             |
| `enableXrayTracing`         | Habilita el rastreo en funciones Lambda. En forma predeterminada `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `enableDDTracing`           | Habilita el rastreo en la función Lambda a través de dd-trace, la biblioteca de la APM de Datadog. El valor predeterminado es `true`. La función Datadog Forwarder Lambda debe suscribirse al grupo de logs de la función.                                                                                                                                                                                                                                                                                                                                                                                  |
| `enableDDLogs`              | Habilita la recopilación de logs de Datadog para la función Lambda. Esta configuración no tiene ningún efecto en los logs enviados a través de Datadog Forwarder. En forma predeterminada es `true`.                                                                                                                                                                                                                                                                                                                                                                                                          |
| `service`                   | Cuando se configura junto con `extensionLayerVersion`, la macro añade una variable de entorno `DD_SERVICE` a todas las funciones Lambda con el valor proporcionado. Cuando se configura junto con `forwarderArn`, la macro añade una etiqueta (tag) `service` a todas las funciones Lambda con el valor proporcionado. La macro también añade una etiqueta (tag) `service` a todas las máquinas de estado con el valor proporcionado.                                                                                                                                                                                            |
| `env`                       | Cuando se configura junto con `extensionLayerVersion`, la macro añade una variable de entorno `DD_ENV` a todas las funciones Lambda con el valor proporcionado. Cuando se configura junto con `forwarderArn`, la macro añade una etiqueta (tag) `env` a todas las funciones Lambda con el valor proporcionado. La macro también añade una etiqueta (tag) `env` a todas las máquinas de estado con el valor proporcionado.                                                                                                                                                                                                      |
| `version`                   | Cuando se configura junto con `extensionLayerVersion`, la macro añade una variable de entorno `DD_VERSION` a todas las funciones Lambda con el valor proporcionado. Cuando se configura junto con `forwarderArn`, la macro añade una etiqueta (tag)  `version` a todas las funciones Lambda con el valor proporcionado. La macro también añade una etiqueta (tag) `version` a todas las máquinas de estado con el valor proporcionado.                                                                                                                                                                                            |
| `tags`                      | Una lista separada por comas de pares clave:valor como una única cadena. Cuando se configura junto con `extensionLayerVersion`, se añade una variable de entorno `DD_TAGS` en todas las funciones Lambda con el valor proporcionado. Cuando se configura junto con `forwarderArn`, la macro analiza la cadena y configura cada par clave:valor como una etiqueta (tag) en todas las funciones Lambda. La macro también configura estas etiquetas (tags) en todas las máquinas de estado.                                                                                                                                                             |
| `logLevel`                  | Configura el nivel de log. Configura en `DEBUG` para un registro extendido.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `captureLambdaPayload`      | Etiqueta automáticamente el tramo (span) de ejecución de la función con cargas útiles de solicitud y respuesta, para que puedan mostrarse en la aplicación de APM.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `enableColdStartTracing`    | Configúralo en `false` para desactivar el rastreo de inicio en frío. Se utiliza en Node.js y Python. Por defecto es `true`.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `coldStartTraceMinDuration` | Configura la duración mínima (en milisegundos) para que un evento de carga de módulo se rastree a través del rastreo de arranques en frío. El valor predeterminado es `3`.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `coldStartTraceSkipLibs`    | Opcionalmente, omite la creación de tramos (spans) de inicio en frío para una lista separada por comas de bibliotecas. Es útil para limitar la profundidad u omitir bibliotecas conocidas. El valor por defecto depende del tiempo de ejecución.                                                                                                                                                                                                                                                                                                                                                                                              |
| `enableProfiling`           | Activa Datadog Continuous Profiler con `true`. Es compatible en Beta con Node.js y Python. Por defecto es `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `encodeAuthorizerContext`   | Cuando se configura en `true` para los autorizadores de Lambda, el contexto de rastreo se codifica en la respuesta para la propagación. Compatible con Node.js y Python. En forma predeterminada es `true`.                                                                                                                                                                                                                                                                                                                                                                                         |
| `decodeAuthorizerContext`   | Cuando se configura en `true` para Lambdas que están autorizadas a través de autorizadores Lambda, analiza y utiliza el contexto de rastreo codificado (si se encuentra). Compatible con Node.js y Python. En forma predeterminada es `true`.                                                                                                                                                                                                                                                                                                                                                             |
| `apmFlushDeadline`          | Se utiliza para determinar cuándo enviar tramos antes de que se agote el tiempo, en milisegundos. Cuando el tiempo restante en una invocación de AWS lambda es inferior al valor configurado, el rastreador intenta enviar tramos activos actuales y todos los tramos finalizados. Es compatible con Node.js y Python. El valor por defecto es `100` milisegundos.                                                                                                                                                                                                                                          |
| `stepFunctionForwarderArn`  | Cuando se configura, el reenvío se suscribe a todos los grupos de logs de la máquina de estados. Es necesario para instrumentar las funciones de step (UI) / paso (generic).                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `llmObsEnabled`             | Alterna para activar el envío de datos a LLM Observability. En forma predeterminada es `false`. |
| `llmObsMlApp`               | El nombre de tu aplicación, servicio o project (proyecto) de LLM, en el cual se agrupan todas las traces (trazas) y spans (tramos). Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulta [Directrices de nomenclatura de aplicaciones](https://docs.datadoghq.com/llm_observability/sdk/?tab=nodejs#application-naming-guidelines) para conocer los caracteres permitidos y otras restricciones. Para sustituir este valor con un span (tramo) raíz dado, consulta [Rastreo de varias aplicaciones](https://docs.datadoghq.com/llm_observability/sdk/?tab=nodejs#tracing-multiple-applications).  Es obligatorio si `llmObsEnabled` es `true` |
| `llmObsAgentlessEnabled`    | Sólo es obligatorio si no utiilzas la extensión Lambda de Datadog, en cuyo caso debes configurar en `true`.  En forma predeterminada, es `false`. |
| `lambdaFips`                | Activa la compatibilidad de FIPS para la función lambda. En forma predeterminada, es `false`. |

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

### Configuración del rastreo X-Ray mediante un rol de ejecución de Lambda predefinido

Completa los siguientes pasos para habilitar el rastreo de X-Ray cuando utilices un rol de ejecución de Lambda predefinido (como uno creado fuera de la plantilla de CloudFormation, como este ejemplo):

```
Resources:
  MyFunction:
    Type: AWS::Serverless::Function
    Properties:
      Role: !Sub arn:aws:iam::${AWS::AccountId}:role/PredefinedRole
```

1. Configura la opción `enableXrayTracing` en `true` para la macro.
2. Añade esta política en línea a tu rol de ejecución de Lambda:

```
{
    "Version": "2012-10-17",
    "Statement": {
        "Action": [
            "xray:PutTraceSegments",
            "xray:PutTelemetryRecords"
        ],
        "Resource": [
            "*"
        ],
        "Effect": "Allow"
    }
}
```

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