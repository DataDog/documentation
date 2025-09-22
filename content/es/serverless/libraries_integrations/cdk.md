---
dependencies:
- https://github.com/DataDog/datadog-cdk-constructs/blob/main/README.md
title: Construcción de Datadog CDK
---
[![NPM](https://img.shields.io/npm/v/datadog-cdk-constructs?color=blue&label=npm+cdk+v1)](https://www.npmjs.com/package/datadog-cdk-constructs)
[![NPM](https://img.shields.io/npm/v/datadog-cdk-constructs-v2?color=39a356&label=npm+cdk+v2)](https://www.npmjs.com/package/datadog-cdk-constructs-v2)
[![PyPI](https://img.shields.io/pypi/v/datadog-cdk-constructs?color=blue&label=pypi+cdk+v1)](https://pypi.org/project/datadog-cdk-constructs/)
[![PyPI](https://img.shields.io/pypi/v/datadog-cdk-constructs-v2?color=39a356&label=pypi+cdk+v2)](https://pypi.org/project/datadog-cdk-constructs-v2/)
[![Licencia](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/datadog-cdk-constructs/blob/main/LICENSE)

Utiliza esta biblioteca de construcciones de Datadog CDK para desplegar aplicaciones serverless utilizando AWS CDK .

Esta biblioteca CDK configura automáticamente la ingesta de métricas, trazas (traces) y logs desde tus aplicaciones serverless mediante:

- Instalación y configuración de las capas Lambda de Datadog para tus funciones Lambda de [.NET][19], [Java][15], [Node.js][2] y [Python][1].
- Activación de la recopilación de trazas y métricas personalizadas de tus funciones Lambda.
- Administración de suscripciones de Datadog Forwarder a tus grupos de logs Lambda y no Lambda.

## AWS CDK v1 frente a AWS CDK v2

**ADVERTENCIA**: `AWS CDK v1` ha llegado al final de su compatibilidad y `datadog-cdk-constructs` ya no recibirá actualizaciones. Se recomienda encarecidamente actualizar a `AWS CDK v2` ([guía oficial de migración ](https://docs.aws.amazon.com/cdk/v2/guide/migrating-v2.html)) y cambiar para utilizar `datadog-cdk-constructs-v2`.

Existen dos versiones distintas de Datadog CDK Constructs; `datadog-cdk-constructs` y `datadog-cdk-constructs-v2`. Están diseñadas para funcionar con `AWS CDK v1` y `AWS CDK v2`, respectivamente.

- `datadog-cdk-constructs-v2` requiere Node >= 14, mientras que `datadog-cdk-constructs` es compatible con Node >= 12.
- `datadog-cdk-constructs-v2` contiene más funciones.
- Por lo demás, el uso de los dos paquetes es idéntico.

## Instalación del paquete de npm:

Para uso con AWS CDK v2:
```
yarn add --dev datadog-cdk-constructs-v2
# or
npm install datadog-cdk-constructs-v2 --save-dev
```

Para uso con AWS CDK v1:
```
yarn add --dev datadog-cdk-constructs
# or
npm install datadog-cdk-constructs --save-dev
```

## Instalación del paquete de PyPI:

Para uso con AWS CDK v2:
```
pip install datadog-cdk-constructs-v2
```

Para uso con AWS CDK v1:
```
pip install datadog-cdk-constructs
```

### Nota:

Presta atención a la salida de tu administrador de paquete, ya que `Datadog CDK Construct Library` tiene dependencias de mismo nivel.

## Uso

### AWS CDK

- _Si no conoces AWS CDK, consulta este [taller][14].
- _Los siguientes ejemplos suponen el uso de AWS CDK v2. Si utilizas CDK v1, importa `datadog-cdk-constructs` en lugar de `datadog-cdk-constructs-v2`._

Añade esto a tu stack de CDK:

```typescript
import { Datadog } from "datadog-cdk-constructs-v2";

const datadog = new Datadog(this, "Datadog", {
  nodeLayerVersion: <LAYER_VERSION>,
  pythonLayerVersion: <LAYER_VERSION>,
  javaLayerVersion: <LAYER_VERSION>,
  dotnetLayerVersion: <LAYER_VERSION>
  addLayers: <BOOLEAN>,
  extensionLayerVersion: "<EXTENSION_VERSION>",
  forwarderArn: "<FORWARDER_ARN>",
  createForwarderPermissions: <BOOLEAN>,
  flushMetricsToLogs: <BOOLEAN>,
  site: "<SITE>",
  apiKey: "{Datadog_API_Key}",
  apiKeySecretArn: "{Secret_ARN_Datadog_API_Key}",
  apiKeySecret: <AWS_CDK_ISECRET>, // Only available in datadog-cdk-constructs-v2
  apiKmsKey: "{Encrypted_Datadog_API_Key}",
  enableDatadogTracing: <BOOLEAN>,
  enableMergeXrayTraces: <BOOLEAN>,
  enableDatadogLogs: <BOOLEAN>,
  injectLogContext: <BOOLEAN>,
  logLevel: <STRING>,
  env: <STRING>, //Optional
  service: <STRING>, //Optional
  version: <STRING>, //Optional
  tags: <STRING>, //Optional
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>])
datadog.addForwarderToNonLambdaLogGroups([<LOG_GROUPS>])
```

## Integración del código fuente
[Integración del código fuente](https://docs.datadoghq.com/integrations/guide/source-code-integration/) se activa por defecto mediante el etiquetado lambda automático y funcionará si:

- La integración de Datadog Github está instalada.
- Tu dependencia de datadog-cdk satisface cualquiera de las versiones siguientes:
  - `datadog-cdk-constructs-v2` >= 1.4.0
  - `datadog-cdk-constructs` >= 0.8.5

### Métodos alternativos para activar la integración del código fuente
Si la implementación automática no funciona en tu caso, sigue una de las dos guías siguientes.

**Nota: estas otras guías solo funcionan para Typescript**.
<details>
 <summary>Datadog-cdk versión satisfecha, pero integración de Datadog Github NO instalada</summary>

  Si la integración de Datadog Github no está instalada, necesitas importar el paquete `datadog-ci` y cargar manualmente tus metadatos de Git a Datadog.
  Te recomendamos que hagas esto cuando se inicialice tu CDK Stack.

  ```typescript
  const app = new cdk.App();

  // Make sure to add @datadog/datadog-ci via your package manager
  const datadogCi = require("@Datadog/Datadog-ci");
  // Manually uploading Git metadata to Datadog.
  datadogCi.gitMetadata.uploadGitCommitHash('{Datadog_API_Key}', '<SITE>')

  const app = new cdk.App();
  new ExampleStack(app, "ExampleStack", {});

  app.synth();
  ```
</details>
<details>
 <summary>datadog-cdk version NOT satisfied</summary>

  Cambia tu función de inicialización de la siguiente manera (nota: estamos cambiando esto para pasar solo el valor de`gitHash` al CDK):

  ``typescript
  async function main() {
    // Make sure to add @datadog/datadog-ci via your package manager
    const datadogCi = require("@datadog/datadog-ci");
    const [, gitHash] = await datadogCi.gitMetadata.uploadGitCommitHash('{Datadog_API_Key}', '<SITE>')

    const app = new cdk.App();
    // Pass in the hash to the ExampleStack constructor
    new ExampleStack(app, "ExampleStack", {}, gitHash);
  }
  ```
  Asegúrate de llamar a esta función para inicializar tu stack.

  En tu constructor de stack, cambia para añadir un parámetro opcional `gitHash` y llama a `addGitCommitMetadata()`:

  ``typescript
  export class ExampleStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps, gitHash?: string) {
      ...
      ...
     datadog.addGitCommitMetadata([<YOUR_FUNCTIONS>], gitHash)
    }
  }
  ```
</details>

## Configuración

Para configurar aún más tu construcción de Datadog, utiliza los siguientes parámetros personalizados:

_Nota_: En las descripciones, se utilizan los parámetros de paquetes de npm, pero también se aplican a los parámetros de paquetes de PyPI.

| Parámetro de paquete de npm  | Parámetro de paquete de PyPI  | Descripción |
| --- | --- | --- |
| `addLayers` | `add_layers` | Si se añaden las Lambda Layers o se espera que el usuario traiga las suyas propias. Por defecto es `true`. Cuando es `true`, también se requieren las variables de la versión de la librería Lambda. Cuando es `false`, debes incluir la librería Datadog Lambda en los paquetes de despliegue de tus funciones. |
| `pythonLayerVersion` | `python_layer_version` | Versión de la capa Lambda de Python que se va a instalar, como `83`. Es necesario si estás desplegando al menos una función Lambda escrita en Python y `addLayers` es `true`. Encuentra el número de la última versión [aquí][5]. |
| `nodeLayerVersion` | `node_layer_version` | Versión de la capa Lambda de Node.js que se va a instalar, como `100`. Es necesario si estás desplegando al menos una función Lambda escrita en Node.js y `addLayers` es `true`. Encuentra el número de la última versión en [aquí][6]. |
| `javaLayerVersion` | `java_layer_version` | Versión de la capa de Java que se va a instalar, como `8`. Es necesario si estás desplegando al menos una función Lambda escrita en Java y `addLayers` es `true`. Encuentra el número de la última versión en la [Documentación de instalación de Serverless Java][15]. **Nota**: `extensionLayerVersion >= 25` y `javaLayerVersion >= 5` son necesarios para que la construcción de Datadog para instrumentar tus funciones de Java correctamente. |
| `dotnetLayerVersion` | `dotnet_layer_version` | Versión de la capa de .NET que se va a instalar, como `13`. Es necesario si estás desplegando al menos una función Lambda escrita en .NET y `addLayers` es `true`. Busca el número de la última versión en [aquí][18]. |
| `extensionLayerVersion` | `extension_layer_version` | Versión de la capa de la extensión Datadog Lambda que se va a instalar, como por ejemplo 5. Cuando se configura `extensionLayerVersion`, también es necesario configurar `apiKey` (o si está cifrada, `apiKMSKey` o `apiKeySecretArn`). Cuando está activada, el Forwarder no se suscribirá a los grupos de logs de las funciones lambda. Más información sobre la extensión Lambda [aquí][12]. |
| `forwarderArn` | `forwarder_arn` | Cuando se configura, el complemento suscribirá automáticamente el Datadog Forwarder a los grupos de logs de las funciones. No configures `forwarderArn` cuando `extensionLayerVersion` esté configurado. |
| `createForwarderPermissions` | `createForwarderPermissions` | Cuando se configura en `true`, crea un permiso Lambda en el Datadog Forwarder por cada grupo de logs. Dado que el Datadog Forwarder tiene permisos configurados por defecto, esto es innecesario en la mayoría de los casos de uso. |
| `flushMetricsToLogs` | `flush_metrics_to_logs` | Envía métricas personalizadas utilizando logs de CloudWatch con la función lambda de Datadog Forwarder (recomendado). Por defecto es `true`. Si desactivas este parámetro, es necesario configurar `apiKey` (o si está cifrado, `apiKMSKey` o `apiKeySecretArn`). |
| `site` | `site` | Configura el sitio Datadog al cual se enviarán los datos. Solo se utiliza cuando `flushMetricsToLogs` es `false` o `extensionLayerVersion` está configurado. Los valores posibles son `datadoghq.com`, `datadoghq.eu`, `us3.datadoghq.com`, `us5.datadoghq.com`, `ap1.datadoghq.com` y `ddog-gov.com`. El valor por defecto es `datadoghq.com`. |
| `apiKey` | `api_key` | La clave de la API de Datadog, solo es necesaria cuando `flushMetricsToLogs` es `false` o `extensionLayerVersion` está configurado. Para obtener más información sobre cómo obtener una clave de la API de Datadog, consulta la [documentación sobre la clave de la API][8]. |
| `apiKeySecretArn` | `api_key_secret_arn` | El ARN del secreto que almacena la clave de la API de Datadog en AWS Secrets Manager. Utiliza este parámetro en lugar de `apiKey` cuando `flushMetricsToLogs` sea `false` o `extensionLayer` esté configurada. Recuerda añadir el permiso `secretsmanager:GetSecretValue` al rol de la ejecución Lambda. |
| `apiKeySecret` | `api_key_secret` | Un [AWS CDK ISecret][16] que representa un secreto que almacena la clave de la API de Datadog en AWS Secrets Manager. Utiliza este parámetro en lugar de `apiKeySecretArn` para conceder automáticamente a los roles de ejecución de Lambda acceso de lectura al secreto indicado. [Consulta aquí](#automatically-grant-aws-secret-read-access-to-lambda-execution-role) para ver un ejemplo. **Solo está disponible en datadog-cdk-constructs-v2**. |
| `apiKmsKey` | `api_kms_key` | Clave de la API de Datadog cifrada mediante KMS. Utiliza este parámetro en lugar de `apiKey` cuando `flushMetricsToLogs` es `false` o `extensionLayerVersion` está configurada y estás utilizando el cifrado KMS. |
| `enableDatadogTracing` | `enable_datadog_tracing` | Activa el rastreo de Datadog en tus funciones Lambda. Por defecto es `true`. |
| `enableMergeXrayTraces` | `enable_merge_xray_traces` | Activa la fusión de trazas (traces) X-Ray en tus funciones Lambda. Por defecto es `false`. |
| `enableDatadogLogs` | `enable_datadog_logs` | Envía los logs de las funciones Lambda a Datadog a través de la extensión Datadog Lambda. El valor por defecto es `true`. Nota: Esta configuración no tiene ningún efecto en los logs enviados a través de Datadog Forwarder . |
| `enableSourceCodeIntegration` | `enable_source_code_integration` | Activa la integración del código fuente de Datadog, conectando tu telemetría con el código de la aplicación en tus repositorios Git. Esto necesita la integración de Datadog Github para funcionar, de otro modo, sigue el [método alternativo](#alternative-methods-to-enable-source-code-integration). Más información [aquí](https://docs.datadoghq.com/integrations/guide/source-code-integrations/). Por defecto es `true`. |
| `injectLogContext` | `inject_log_context` | Cuando se configura, la capa Lambda aplica un parche automáticamente a console.log con los identificadores de rastreo de Datadog. Por defecto es `true`. |
| `logLevel` | `log_level` | Cuando se configura en `debug`, la librería y la extensión Datadog Lambda registran información adicional para ayudar a solucionar problemas. |
| `env` | `env` | Cuando se configura junto con `extensionLayerVersion`, se añade una variable de entorno `DD_ENV` a todas las funciones Lambda con el valor proporcionado. Cuando se configura junto con `forwarderArn`, se añade una etiqueta (tag) `env` a todas las funciones Lambda con el valor proporcionado. |
| `service` | `service` | Cuando se configura junto con `extensionLayerVersion`, se añade una variable de entorno `DD_SERVICE` a todas las funciones Lambda con el valor proporcionado. Cuando se configura junto con `forwarderArn`, se añade una etiqueta `service` a todas las funciones Lambda con el valor proporcionado. |
| `version` | `version` | Cuando se configura junto con `extensionLayerVersion`, se añade una variable de entorno `DD_VERSION` a todas las funciones Lambda con el valor proporcionado. Cuando se configura junto con `forwarderArn`, se añade una etiqueta `version` a todas las funciones Lambda con el valor proporcionado. |
| `tags` | `tags` | Una lista separada por comas de pares clave:valor como una sola cadena. Cuando se configura junto con `extensionLayerVersion`, se añade una variable de entorno `DD_TAGS` a todas las funciones Lambda con el valor proporcionado. Cuando se configura junto con `forwarderArn`, el cdk analiza la cadena y configura cada par clave:valor como una etiqueta en todas las funciones Lambda. |
| `enableColdStartTracing`      | `enable_cold_start_tracing` | Configúralo en `false` para desactivar el rastreo de inicio en frío. Se utiliza en Node.js y Python. Por defecto es `true`. |
| `coldStartTraceMinDuration`   | `min_cold_start_trace_duration` | Configura la duración mínima (en milisegundos) de un evento de carga de un módulo que se va a rastrear a través del rastreo de inicio en frío. Número. Por defecto es `3`. |
| `coldStartTraceSkipLibs`      | `cold_start_trace_skip_libs`| Opcionalmente, omite la creación de tramos (spans) de inicio en frío para una lista separada por comas de librerías. Es útil para limitar la profundidad u omitir bibliotecas conocidas. El valor por defecto depende del tiempo de ejecución. |
| `enableProfiling`             | `enable_profiling` | Activa Datadog Continuous Profiler con `true`. Es compatible en Beta con Node.js y Python. Por defecto es `false`. |
| `encodeAuthorizerContext`     |`encode_authorizer_context` | Cuando se configura en `true` para autorizadores Lambda, el contexto de rastreo se codificará en la respuesta para la propagación. Es compatible con Node.js y Python. Por defecto es `true`. |
| `decodeAuthorizerContext`     |`decode_authorizer_context` | Cuando se configura en `true` para Lambdas que están autorizadas a través de autorizadores Lambda, analizará y utilizará el contexto de rastreo codificado (si se encuentra). Es compatible con Node.js y Python. Por defecto es `true`.                         |
| `apmFlushDeadline` | `apm_flush_deadline` | Se utiliza para determinar cuándo enviar tramos antes de que se agote el tiempo, en milisegundos. Cuando el tiempo restante en una invocación de AWS lambda es inferior al valor configurado, el rastreador intenta enviar tramos activos actuales y todos los tramos finalizados. Es compatible con Node.js y Python. El valor por defecto es `100` milisegundos. |
| `redirectHandler` | `redirect_handler` | Cuando se configura en `false`, omite la redirección del controlador al controlador de la librería Datadog Lambda. Es útil cuando solo se instrumenta con la extensión Datadog Lambda. Por defecto es `true`. |

**Nota**: El uso de los parámetros anteriores puede sustituir las variables de entorno `DD_XXX` del nivel de función correspondiente.
### Rastreo

Activa el rastreo X-Ray en tus funciones Lambda. Para más información, consulta la [documentación de CDK][9].

```typescript
import * as lambda from "aws-cdk-lib/aws-lambda";

const lambda_function = new lambda.Function(this, "HelloHandler", {
  runtime: lambda.Runtime.NODEJS_14_X,
  code: lambda.Code.fromAsset("lambda"),
  handler: "hello.handler",
  tracing: lambda.Tracing.ACTIVE,
});
```

### Stacks anidados

Añade la construcción de Datadog CDK a cada stack que desees instrumentar con Datadog. En el ejemplo siguiente, inicializamos la construcción de Datadog CDK y llamamos a `addLambdaFunctions()` tanto en `RootStack` como en `NestedStack`.

```typescript
import { Datadog } from "datadog-cdk-constructs-v2";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

class RootStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new NestedStack(this, "NestedStack");

    const datadog = new Datadog(this, "Datadog", {
      nodeLayerVersion: <LAYER_VERSION>,
      pythonLayerVersion: <LAYER_VERSION>,
      javaLayerVersion: <LAYER_VERSION>,
      dotnetLayerVersion: <LAYER-VERSION>,
      addLayers: <BOOLEAN>,
      forwarderArn: "<FORWARDER_ARN>",
      flushMetricsToLogs: <BOOLEAN>,
      site: "<SITE>",
      apiKey: "{Datadog_API_Key}",
      apiKeySecretArn: "{Secret_ARN_Datadog_API_Key}",
      apiKmsKey: "{Encrypted_Datadog_API_Key}",
      enableDatadogTracing: <BOOLEAN>,
      enableMergeXrayTraces: <BOOLEAN>,
      enableDatadogLogs: <BOOLEAN>,
      injectLogContext: <BOOLEAN>
    });
    datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);

  }
}

class NestedStack extends cdk.NestedStack {
  constructor(scope: Construct, id: string, props?: cdk.NestedStackProps) {
    super(scope, id, props);

    const datadog = new Datadog(this, "Datadog", {
      nodeLayerVersion: <LAYER_VERSION>,
      pythonLayerVersion: <LAYER_VERSION>,
      javaLayerVersion: <LAYER_VERSION>,
      dotnetLayerVersion: <LAYER-VERSION>,
      addLayers: <BOOLEAN>,
      forwarderArn: "<FORWARDER_ARN>",
      flushMetricsToLogs: <BOOLEAN>,
      site: "<SITE>",
      apiKey: "{Datadog_API_Key}",
      apiKeySecretArn: "{Secret_ARN_Datadog_API_Key}",
      apiKmsKey: "{Encrypted_Datadog_API_Key}",
      enableDatadogTracing: <BOOLEAN>,
      enableMergeXrayTraces: <BOOLEAN>,
      enableDatadogLogs: <BOOLEAN>,
      injectLogContext: <BOOLEAN>
    });
    datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);

  }
}
```

### Etiquetas

Añade etiquetas a tus construcciones. Recomendamos configurar una etiqueta de `env` y `service` para unir la telemetría de Datadog. Para más información consulta la [documentación oficial de AWS ][10] y la [documentación del CDK][11].

## Concede automáticamente a AWS acceso de lectura a secretos al rol de ejecución de Lambda.
**Solo está disponible en datadog-cdk-constructs-v2**

Para conceder automáticamente a los roles de ejecución de Lambda acceso de lectura a un secreto determinado, introduce `apiKeySecret` en lugar de `apiKeySecretArn` al inicializar la construcción de Datadog.

```typescript
const { Secret } = require('aws-cdk-lib/aws-secretsmanager');

const secret = Secret.fromSecretPartialArn(this, 'DatadogApiKeySecret', 'arn:aws:secretsmanager:us-west-1:123:secret:DATADOG_API_KEY');

const datadog = new Datadog(this, 'Datadog', {
  ...
  apiKeySecret: secret
  ...
});
```

Cuando se llama a `addLambdaFunctions`, la construcción de Datadog CDK concede a tus roles de ejecución Lambda acceso de lectura al secreto AWS dado. Esto se hace a través de la [función grantRead de AWS ISecret][17].

## Cómo funciona

La construcción de Datadog CDK toma una lista de funciones lambda e instala la librería Datadog Lambda adjuntando las Lambda Layers para [.NET][19], [Java][15], [Node.js][2] y [Python][1] a tus funciones. Redirige a un controlador de sustitución que inicializa la librería Lambda sin necesidad de ningún cambio de código. Las configuraciones adicionales añadidas a la construcción de Datadog CDK también se traducirán en sus respectivas variables de entorno en cada función lambda (si es aplicable/necesario).

Los grupos de logs basados en funciones Lambda se controlan en forma automática mediante el método de `addLambdaFunctions`, mientras que la construcción tiene una función `addForwarderToNonLambdaLogGroups` adicional que suscribe el Forwarder a cualquier grupo de logs adicional de tu elección.


## Recursos para aprender sobre CDK

- [Taller de CDK TypeScript](https://cdkworkshop.com/20-typescript.html)
- [Vídeo de presentación de CDK por AWS con demostración](https://youtu.be/ZWCvNFUN-sU)
- [Conceptos de CDK](https://youtu.be/9As_ZIjUGmY)

## Utilizar Projen

Las bibliotecas de Datadog CDK Construct utilizan Projen para mantener los archivos de configuración del proyecto, como `package.json`, `.gitignore`, `.npmignore`, etc. La mayoría de los archivos de configuración estarán protegidos por Projen mediante permisos de solo lectura. Para cambiar estos archivos, edita el archivo `.projenrc.js`, luego ejecuta `npx projen` para sintetizar los nuevos cambios. Haz un check en [Projen][13] para más detalles.

## Problemas de apertura

Si encuentras un error en este paquete, queremos saberlo. Antes de abrir un nuevo problema, busca los problemas existentes para evitar duplicados.

Cuando abras un problema, incluye la versión de Datadog CDK Construct, la versión de Node y la traza del stack si está disponible. Además, incluye los pasos para la reproducción cuando corresponda.

También puedes abrir un problema para solicitar una función.

## Colaboración

Si encuentras un problema en este paquete y tienes una solución, abre una solicitud de incorporación de cambios siguiendo los [procedimientos](https://github.com/DataDog/datadog-cdk-constructs/blob/main/CONTRIBUTING.md).

## Tests

Si contribuyes a este paquete puedes ejecutar los tests utilizando `yarn test`. Este paquete también incluye una aplicación de ejemplo para tests manuales:

1. Abre un terminal independiente.
2. Ejecuta `yarn watch`, esto asegurará que los archivos Typescript en el directorio `src` se recopilen a Javascript en el directorio `lib`.
3. Ve a `src/sample`, aquí puedes editar `index.ts` para hacer un test de tus contribuciones en forma manual.
4. En el directorio raíz, ejecuta `npx cdk --app lib/sample/index.js <CDK Command>`, sustituyendo `<CDK Command>` por comandos CDK frecuentes como `synth`, `diff` o `deploy`.

- Nota, si recibes "... no estás autorizado a realizar:...", puede que también necesites autorizar los comandos con tus credenciales de AWS.

### Depurar logs

Para mostrar la depuración de logs para este biblioteca, configura la variable de entorno `DD_CONSTRUCT_DEBUG_LOGS` en `true` cuando ejecutes `cdk synth` (utiliza `--quiet` para suprimir la salida de plantilla generada).

Ejemplo:
_Asegúrate de estar en el directorio raíz_

```
DD_CONSTRUCT_DEBUG_LOGS=true npx cdk --app lib/sample/index.js synth --quiet
```

## Comunidad

Si tienes preguntas o comentarios sobre el producto, únete al canal `#serverless` en la [comunidad Datadog en Slack](https://chat.datadoghq.com/).

## Licencia

A menos que se indique explícitamente lo contrario, todos los archivos de este repositorio tienen Licencia de Apache Versión 2.0.

Este producto incluye el software desarrollado en Datadog (https://www.datadoghq.com/). Copyright 2021 Datadog, Inc.

[1]: https://github.com/DataDog/datadog-lambda-layer-python
[2]: https://github.com/DataDog/datadog-lambda-layer-js
[3]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros.html
[4]: https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_core.Stack.html
[5]: https://github.com/DataDog/datadog-lambda-python/releases
[6]: https://github.com/DataDog/datadog-lambda-js/releases
[7]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-logs-subscriptionfilter.html
[8]: https://docs.datadoghq.com/es/account_management/api-app-keys/#api-keys
[9]: https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-lambda.Tracing.html
[10]: https://docs.aws.amazon.com/cdk/latest/guide/tagging.html
[11]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.Tags.html
[12]: https://docs.datadoghq.com/es/serverless/datadog_lambda_library/extension/
[13]: https://github.com/projen/projen
[14]: https://cdkworkshop.com/15-prerequisites.html
[15]: https://docs.datadoghq.com/es/serverless/installation/java/?tab=awscdk
[16]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_secretsmanager.ISecret.html
[17]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_secretsmanager.ISecret.html#grantwbrreadgrantee-versionstages
[18]: https://github.com/DataDog/dd-trace-dotnet-aws-lambda-layer/releases
[19]: https://docs.datadoghq.com/es/serverless/aws_lambda/installation/dotnet
