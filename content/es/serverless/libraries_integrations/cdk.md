---
dependencies:
- https://github.com/DataDog/datadog-cdk-constructs/blob/main/README.md
title: Construcción de Datadog CDK
---
[![NPM](https://img.shields.io/npm/v/datadog-cdk-constructs-v2?color=39a356&label=npm)](https://www.npmjs.com/package/datadog-cdk-constructs-v2)
[![PyPI](https://img.shields.io/pypi/v/datadog-cdk-constructs-v2?color=39a356&label=pypi)](https://pypi.org/project/datadog-cdk-constructs-v2/)
[![Go](https://img.shields.io/github/v/tag/datadog/datadog-cdk-constructs-go?color=39a356&label=go)](https://pkg.go.dev/github.com/DataDog/datadog-cdk-constructs-go/ddcdkconstruct)
[![Maven](https://img.shields.io/badge/maven-v3.3.0-39a356?label=maven)](https://search.maven.org/artifact/com.datadoghq/datadog-cdk-constructs)
[![Licencia](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/datadog-cdk-constructs/blob/main/LICENSE)

Utiliza esta biblioteca de construcciones CDK de Datadog para desplegar aplicaciones serverless mediante AWS CDK.

Para más información sobre el constructo **DatadogECSFargate**, consulta [aquí][23].

Esta biblioteca CDK configura automáticamente la ingesta de métricas, trazas (traces) y logs desde tus aplicaciones serverless mediante:

- Instalación y configuración de las capas Lambda de Datadog para tus funciones Lambda [Python][1], [Node.js][2], [Java][15], [Go][26], [Ruby][25] y [.NET][19].
- Activación de la recopilación de trazas y métricas personalizadas de tus funciones Lambda.
- Administración de suscripciones de Datadog Forwarder a tus grupos de logs Lambda y no Lambda.

## Lambda

### Instalación del paquete

#### npm

```
yarn add --dev datadog-cdk-constructs-v2
# or
npm install datadog-cdk-constructs-v2 --save-dev
```

#### PyPI

```
pip install datadog-cdk-constructs-v2
```

##### Nota:

Presta atención a la salida de tu administrador de paquete, ya que `Datadog CDK Construct Library` tiene dependencias de mismo nivel.

#### Go

```
go get github.com/DataDog/datadog-cdk-constructs-go/ddcdkconstruct/v3
```

#### Maven (Java)

Añádelo a tu `pom.xml`:

```xml
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>datadog-cdk-constructs</artifactId>
    <version>3.3.0</version>
</dependency>
```

### Utilización

#### AWS CDK

Añade esto a tu stack de CDK:

#### TypeScript

```typescript
import { DatadogLambda } from "datadog-cdk-constructs-v2";

const datadogLambda = new DatadogLambda(this, "datadogLambda", {
  nodeLayerVersion: <LAYER_VERSION>,
  pythonLayerVersion: <LAYER_VERSION>,
  javaLayerVersion: <LAYER_VERSION>,
  dotnetLayerVersion: <LAYER_VERSION>,
  rubyLayerVersion: <LAYER_VERSION>,
  addLayers: <BOOLEAN>,
  extensionLayerVersion: <EXTENSION_VERSION>,
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
datadogLambda.addLambdaFunctions([<LAMBDA_FUNCTIONS>])
datadogLambda.addForwarderToNonLambdaLogGroups([<LOG_GROUPS>])
```

#### Python

```python
from datadog_cdk_constructs_v2 import DatadogLambda
datadog = DatadogLambda(
    self,
    "Datadog",
    dotnet_layer_version=<LAYER_VERSION>,
    node_layer_version=<LAYER_VERSION>,
    python_layer_version=<LAYER_VERSION>,
    ruby_layer_version=<LAYER_VERSION>,
    java_layer_version=<LAYER_VERSION>,
    extension_layer_version=<EXTENSION_VERSION>,
    add_layers=<BOOLEAN>,
    api_key=os.getenv("DD_API_KEY"),
    site=<SITE>,
)
datadog.add_lambda_functions([<LAMBDA_FUNCTIONS>])
datadog.add_forwarder_to_non_lambda_log_groups(self.logGroups)
```

#### Go

```go
import (
    "github.com/DataDog/datadog-cdk-constructs-go/ddcdkconstruct/v3"
)
datadogLambda := ddcdkconstruct.NewDatadogLambda(
    stack,
    jsii.String("Datadog"),
    &ddcdkconstruct.DatadogLambdaProps{
        NodeLayerVersion:      jsii.Number(<LAYER_VERSION>),
        PythonLayerVersion:    jsii.Number(<LAYER_VERSION>),
        JavaLayerVersion:      jsii.Number(<LAYER_VERSION>),
        DotnetLayerVersion:    jsii.Number(<LAYER_VERSION>),
        RubyLayerVersion:      jsii.Number(<LAYER_VERSION>),
        AddLayers:             jsii.Bool(<BOOLEAN>),
        Site:                  jsii.String(<SITE>),
        ApiKey:                jsii.String(os.Getenv("DD_API_KEY")),
        // ...
    })
datadogLambda.AddLambdaFunctions(&[]interface{}{myFunction}, nil)
datadogLambda.AddForwarderToNonLambdaLogGroups()
```

#### Java

```java
import com.datadoghq.cdkconstructs.DatadogLambda;
import com.datadoghq.cdkconstructs.DatadogLambdaProps;

DatadogLambda datadogLambda = new DatadogLambda(this, "Datadog",
    DatadogLambdaProps.builder()
        .nodeLayerVersion(<LAYER_VERSION>)
        .pythonLayerVersion(<LAYER_VERSION>)
        .javaLayerVersion(<LAYER_VERSION>)
        .dotnetLayerVersion(<LAYER_VERSION>)
        .rubyLayerVersion(<LAYER_VERSION>)
        .addLayers(<BOOLEAN>)
        .extensionLayerVersion(<EXTENSION_VERSION>)
        .flushMetricsToLogs(<BOOLEAN>)
        .site("<SITE>")
        .apiKey(System.getenv("DD_API_KEY"))
        .enableDatadogTracing(<BOOLEAN>)
        .enableDatadogLogs(<BOOLEAN>)
        .build()
);
datadogLambda.addLambdaFunctions(new Object[]{myFunction});
datadogLambda.addForwarderToNonLambdaLogGroups(new Object[]{myLogGroup});
```

### Integración del código fuente

[Integración del código fuente](https://docs.datadoghq.com/integrations/guide/source-code-integration/) se activa por defecto mediante el etiquetado lambda automático y funcionará si:

- La integración de Datadog Github está instalada.
- Tu versión de `datadog-cdk-constructs-v2` es >= 1.4.0

#### Métodos alternativos para activar la integración del código fuente

Si la implementación automática no funciona en tu caso, sigue una de las dos guías siguientes.

**Nota: estas otras guías solo funcionan para Typescript**.

<details>
  <summary>Versión datadog-cdk completa, pero la integración de Datadog Github NO está instalada</summary>

Si la integración de Datadog Github no está instalada, debes importar el paquete `datadog-ci` y cargar manualmente tu metadatos Git a Datadog.
Para obtener mejores resultados, importa el paquete `datadog-ci` en el que el stack tecnológico de CDK está inicializado.

```typescript
const app = new cdk.App();

// Make sure to add @datadog/datadog-ci via your package manager
const datadogCi = require("@datadog/datadog-ci");
// Manually uploading Git metadata to Datadog.
datadogCi.gitMetadata.uploadGitCommitHash("{Datadog_API_Key}", "<SITE>");

const app = new cdk.App();
new ExampleStack(app, "ExampleStack", {});

app.synth();
```

</details>
<details>
  <summary>Versión de datadog-cdk NO completada</summary>

Cambia tu función de inicialización de la siguiente manera (en este caso, el valor `gitHash` pasado a la CDK):

```typescript
async function main() {
  // Make sure to add @datadog/datadog-ci via your package manager
  const datadogCi = require("@datadog/datadog-ci");
  const [, gitHash] = await datadogCi.gitMetadata.uploadGitCommitHash("{Datadog_API_Key}", "<SITE>");

  const app = new cdk.App();
  // Pass in the hash to the ExampleStack constructor
  new ExampleStack(app, "ExampleStack", {}, gitHash);
}
```

Asegúrate de llamar a esta función para inicializar tu stack tecnológico.

En tu constructor de stack, cambia para añadir un parámetro `gitHash` opcional y llama a `addGitCommitMetadata()`:

```typescript
export class ExampleStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps, gitHash?: string) {
    ...
    ...
    datadogLambda.addGitCommitMetadata([<YOUR_FUNCTIONS>], gitHash)
  }
}
```

</details>

### Configuración

Para configurar aún más tu compilación de DatadogLambda para Lambda, utiliza los siguientes parámetros personalizados:

Nota: Las descripciones utilizan los parámetros del paquete npm, pero también se aplican a los parámetros de los paquetes PyPI y Go.

| Parámetro de paquete de npm         | Parámetro de paquete de PyPI           | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `addLayers`                  | `add_layers`                    | Si se añaden las capas Lambda de tiempo de ejecución o se espera que el usuario traiga las suyas propias. Por defecto es `true`. Cuando es `true`, también se requieren las variables de la versión de la biblioteca de Lambda. Cuando es `false`, debes incluir la biblioteca de Datadog Lambda en los paquetes de despliegue de tus funciones.                                                                                                                                                                                                                                                                                                     |
| `pythonLayerVersion`         | `python_layer_version`          | Versión de la capa Lambda de Python a instalar, como `83`. Se requiere si estás desplegando al menos una función de Lambda escrita en Python y `addLayers` es `true`. Encuentra el último número de versión [aquí][5]. **Atención**: Este parámetro y `pythonLayerArn` son mutuamente excluyentes. Si se utiliza, sólo se debe establecer uno u otro.                                                                                                                                                                                                                                                    |
| `pythonLayerArn`             | `python_layer_arn`              | El ARN personalizado de la capa Lambda de Python a instalar. Es necesario si estás desplegando al menos una función de Lambda escrita en Python y `addLayers` es `true`. **Atención**: Este parámetro y `pythonLayerVersion` son mutuamente excluyentes. Si se utiliza, establece sólo uno o el otro.                                                                                                                                                                                                                                                                                                 |
| `nodeLayerVersion`           | `node_layer_version`            | Versión de la capa Lambda de Node.js a instalar, como `100`. Es requerido si estás desplegando al menos una función de Lambda escrita en Node.js y `addLayers` es `true`. Encuentra el último número de versión desde [aquí][6]. **Atención**: Este parámetro y `nodeLayerArn` son mutuamente excluyentes. Si se utiliza, sólo establece uno o el otro.                                                                                                                                                                                                                                              |
| `nodeLayerArn`               | `node_layer_arn`                | El ARN personalizado de la capa Lambda de Node.js a instalar. Es requerido si estás desplegando al menos una función de Lambda escrita en Node.js y `addLayers` es `true`. **Atención**: Este parámetro y `nodeLayerVersion` son mutuamente excluyentes. Si lo utilizas, establece sólo uno u otro.                                                                                                                                                                                                                                                                                                 |
| `javaLayerVersion`           | `java_layer_version`            | Versión de la capa Java a instalar, como `8`. Obligatorio si estás desplegando al menos una función de Lambda escrita en Java y `addLayers` es `true`. Encuentra el último número de versión en la [Documentación de instalación de Java sin servidor][15]. **Nota**: `extensionLayerVersion >= 25` y `javaLayerVersion >= 5` son necesarios para que la construcción DatadogLambda instrumente correctamente tus funciones de Java. **Atención**: Este parámetro y `javaLayerArn` se excluyen mutuamente. Si se utiliza, establece sólo uno u otro.                                                       |
| `javaLayerArn`               | `java_layer_arn`                | El ARN personalizado de la capa Java a instalar. Es necesario si estás desplegando al menos una función de Lambda escrita en Java y `addLayers` es `true`. **Atención**: Este parámetro y `javaLayerVersion` se excluyen mutuamente. Si se utiliza, establece sólo uno u otro.                                                                                                                                                                                                                                                                                                              |
| `dotnetLayerVersion`         | `dotnet_layer_version`          | Versión de la capa .NET a instalar, como `13`. Es obligatorio si vas a desplegar al menos una función de Lambda escrita en .NET y `addLayers` es `true`. Encuentra el último número de versión [aquí][18]. **Atención**: Este parámetro y `dotnetLayerArn` se excluyen mutuamente. Si se utiliza, establece sólo uno o el otro.                                                                                                                                                                                                                                                         |
| `dotnetLayerArn`             | `dotnet_layer_arn`              | El ARN personalizado de la capa .NET a instalar. Es obligatorio si vas a desplegar al menos una función de Lambda escrita en .NET y `addLayers` es `true`. **Atención**: Este parámetro y `dotnetLayerVersion` se excluyen mutuamente. Si lo utilizas, establece sólo uno u otro.                                                                                                                                                                                                                                                                                                          |
| `extensionLayerVersion`      | `extension_layer_version`       | Versión de la capa de la extensión Lamba Datadog a instalar, como 5. Cuando se configura`extensionLayerVersion`, es necesario configurar también `apiKey` (o `apiKMSKey`, `apiKeySecret` o `apiKeySecretArn`, si está cifrada). Cuando están activados, los grupos de logs de la función Lambda no son suscritos por el Forwarder. Consulta más información sobre la extensión Lambda [aquí][12]. **Advertencia**: Este parámetro y `extensionVersionArn` son mutuamente excluyentes. Configura solo uno u otro. **Nota**: Si se configura este parámetro, se añade una capa incluso si `addLayers` está configurado como `false`.                       |
| `extensionLayerArn`          | `extension_layer_arn`           | El ARN personalizado de la capa de la extensión Lambda de Datadog a instalar. Cuando se configura `extensionLayerArn`, es necesario configurar también `apiKey` (o `apiKMSKey`, o `apiKeySecret`, o `apiKeySecretArn`, si está cifrado). Cuando están activados, los grupos de logs de la función Lambda no son suscritos por el Forwarder. Consulta más información sobre la extensión Lambda [aquí][12]. **Advertencia**: Este parámetro y`extensionLayerVersion` son mutuamente excluyentes. Si se utilizan, configura solo uno u otro. **Nota**: Si se configura este parámetro, se añade una capa incluso si `addLayers` está configurado como `false`.                         |
| `forwarderArn`               | `forwarder_arn`                 | Cuando se establece, el complemento suscribe automáticamente el Datadog Forwarder a los grupos de log de las funciones. No configures `forwarderArn` cuando `extensionLayerVersion` o `extensionLayerArn` estén configurados.                                                                                                                                                                                                                                                                                                                                                                                        |
| `createForwarderPermissions` | `createForwarderPermissions`    | Cuando se configura en `true`, crea un permiso Lambda en el Datadog Forwarder por cada grupo de logs. Dado que el Datadog Forwarder tiene permisos configurados por defecto, esto es innecesario en la mayoría de los casos de uso.                                                                                                                                                                                                                                                                                                                                                                          |
| `flushMetricsToLogs`         | `flush_metrics_to_logs`         | Envía métricas personalizadas utilizando logs de CloudWatch con la función Lambda del Datadog Forwarder (recomendado). Por defecto es `true`. Si desactivas este parámetro, es necesario configurar `apiKey` (o `apiKMSKey`, o `apiKeySecret`, o `apiKeySecretArn`, si está cifrado).                                                                                                                                                                                                                                                                                                                    |
| `site`                       | `site`                          | Establece el sitio de Datadog al que se enviarán los datos. Sólo se utiliza cuando `flushMetricsToLogs` es `false` o `extensionLayerVersion` o `extensionLayerArn` está configurado. Los valores posibles son `datadoghq.com`, `datadoghq.eu`, `us3.datadoghq.com`, `us5.datadoghq.com`, `ap1.datadoghq.com`, `ap2.datadoghq.com` y `ddog-gov.com`. El valor por defecto es `datadoghq.com`.                                                                                                                                                                                                                             |
| `apiKey`                     | `api_key`                       | La clave de API de Datadog, sólo es necesaria cuando `flushMetricsToLogs` es `false` o `extensionLayerVersion` o `extensionLayerArn` está configurado. Para obtener más información sobre cómo obtener una clave de API de Datadog, consulta la [documentación sobre la clave de API][8].                                                                                                                                                                                                                                                                                                                                                          |
| `apiKeySecretArn`            | `api_key_secret_arn`            | El ARN del secreto que almacena la clave de la API de Datadog en AWS Secrets Manager. Utiliza este parámetro en lugar de `apiKey` cuando `flushMetricsToLogs` sea `false` o `extensionLayer` esté configurada. Recuerda añadir el permiso `secretsmanager:GetSecretValue` al rol de la ejecución Lambda.                                                                                                                                                                                                                                                                                                |
| `apiKeySecret`               | `api_key_secret`                | Un [AWS CDK ISecret][16] que representa un secreto que almacena la clave de la API de Datadog en AWS Secrets Manager. Utiliza este parámetro en lugar de `apiKeySecretArn` para conceder automáticamente a los roles de ejecución de Lambda acceso de lectura al secreto indicado. [Consulta aquí](#automatically-grant-aws-secret-read-access-to-lambda-execution-role) para ver un ejemplo. **Solo está disponible en datadog-cdk-constructs-v2**.                                                                                                                                                                                      |
| `apiKmsKey`                  | `api_kms_key`                   | Clave de la API de Datadog cifrada mediante KMS. Utiliza este parámetro en lugar de `apiKey` cuando `flushMetricsToLogs` es `false` o `extensionLayerVersion` o `extensionLayerArn` está configurado y estás utilizando el cifrado KMS.                                                                                                                                                                                                                                                                                                                                                                  |
| `enableDatadogTracing`       | `enable_datadog_tracing`        | Activa el rastreo de Datadog en tus funciones Lambda. Por defecto es `true`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `enableMergeXrayTraces`      | `enable_merge_xray_traces`      | Activa la fusión de trazas (traces) X-Ray en tus funciones Lambda. Por defecto es `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `enableDatadogLogs`          | `enable_datadog_logs`           | Envía los logs de las funciones de Lambda a Datadog a través de la extensión Datadog Lambda. Por defecto es `true`. Nota: Esta configuración no tiene ningún efecto en los logs enviados a través de Datadog Forwarder.                                                                                                                                                                                                                                                                                                                                                                                                            |
| `enableDatadogASM`           | `enable_datadog_asm`            | **Obsoleto**: Utiliza `datadogAppsecMode: on` en su lugar. Habilita [Datadog App and API Protection][21] en la función Lambda. Requiere que `enableDatadogTracing` esté habilitado. Por defecto es `false`.                                                                                                                                                                                                                                                                                                                                                                                   |
| `datadogAppSecMode`          | `datadog_app_sec_mode`          | Habilita [Datadog App and API Protection][21] en la función Lambda. Para habilitar App and API Protection, configura el valor como `on`. Acepta `off`, `on`, `extension` y `tracer`. Los valores `on`, `extension` y `tracer` requieren `enableDatadogTracing`. Por defecto es `off`. Para obtener más información sobre las opciones `tracer` y `extension`, consulta [Habilitar App and API Protection en el estreador](#enable-in-tracer-app-and-api-protection).                                                                                                                                               |
| `captureLambdaPayload`       | `capture_lambda_payload`        | [Captura las cargas útiles de AWS Lambda entrantes y salientes][22] en los tramos de Datadog APM para las invocaciones de Lambda. Por defecto es `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `captureCloudServicePayload` | `capture_cloud_service_payload` | [Captura las solicitudes y respuestas entre tu aplicación y los servicios de AWS][24] en las etiquetas de tramos de Datadog APM. Los servicios compatibles son SNS, SQS, Kinesis, S3, EventBridge y DynamoDB. Si se establece en `true`, añadirá `DD_TRACE_CLOUD_REQUEST_PAYLOAD_TAGGING='all'` y `DD_TRACE_CLOUD_RESPONSE_PAYLOAD_TAGGING='all'`. Si se establece en `false`, añadirá `DD_TRACE_CLOUD_REQUEST_PAYLOAD_TAGGING='$.*'` y `DD_TRACE_CLOUD_RESPONSE_PAYLOAD_TAGGING='$.*'`. `$.*` es una regla de redacción JSONPath que redacta todos los valores. Por defecto es `false`.                                  |
| `sourceCodeIntegration`      | `source_code_integration`       | Habilita la integración de código fuente de Datadog, conectando tu telemetría con el código de la aplicación en tus repositorios Git. Esto requiere la integración de Datadog Github para funcionar, de lo contrario, sigue el [método alternativo](#alternative-methods-to-enable-source-code-integration). Más información [aquí](https://docs.datadoghq.com/integrations/guide/source-code-integration/). Por defecto es `true`.                                                                                                                                                                               |
| `injectLogContext`           | `inject_log_context`            | Cuando se configura, la capa Lambda aplica un parche automáticamente a console.log con los identificadores de rastreo de Datadog. Por defecto es `true`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `logLevel`                   | `log_level`                     | Cuando se configura en `debug`, la biblioteca y la extensión Datadog Lambda registran información adicional para ayudar a solucionar problemas.                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `env`                        | `env`                           | Cuando se establece junto con `extensionLayerVersion` o `extensionLayerArn`, se añade una variable de entorno `DD_ENV` a todas las funciones de Lambda con el valor proporcionado. Cuando se establece junto con `forwarderArn`, se añade una etiqueta `env` a todas las funciones de Lambda con el valor proporcionado.                                                                                                                                                                                                                                                                                                       |
| `service`                    | `service`                       | Cuando se establece junto con `extensionLayerVersion` o `extensionLayerArn`, se añade una variable de entorno `DD_SERVICE` a todas las funciones Lambda con el valor proporcionado. Cuando se establece junto con `forwarderArn`, se añade una etiqueta `service` a todas las funciones de Lambda con el valor proporcionado.                                                                                                                                                                                                                                                                                                |
| `version`                    | `version`                       | Cuando se establece junto con `extensionLayerVersion` o `extensionLayerArn`, se añade una variable de entorno `DD_VERSION` a todas las funciones de Lambda con el valor proporcionado. Cuando se establece junto con `forwarderArn`, se añade una etiqueta `version` a todas las funciones de Lambda con el valor proporcionado.                                                                                                                                                                                                                                                                                                |
| `tags`                       | `tags`                          | Una lista separada por comas de pares clave:valor como una sola cadena. Cuando se establece junto con `extensionLayerVersion` o `extensionLayerArn`, se añade una variable de entorno `DD_TAGS` a todas las funciones de Lambda con el valor proporcionado. Cuando se establece junto con `forwarderArn`, el cdk analiza la cadena y establece cada par clave valor como una etiqueta en todas las funciones de Lambda.                                                                                                                                                                                                                      |
| `enableColdStartTracing`     | `enable_cold_start_tracing`     | Configúralo en `false` para desactivar el rastreo de inicio en frío. Se utiliza en Node.js y Python. Por defecto es `true`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `coldStartTraceMinDuration`  | `min_cold_start_trace_duration` | Configura la duración mínima (en milisegundos) de un evento de carga de un módulo que se va a rastrear a través del rastreo de inicio en frío. Número. Por defecto es `3`.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `coldStartTraceSkipLibs`     | `cold_start_trace_skip_libs`    | Opcionalmente, omite la creación de tramos (spans) de inicio en frío para una lista separada por comas de bibliotecas. Es útil para limitar la profundidad u omitir bibliotecas conocidas. El valor por defecto depende del tiempo de ejecución.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `enableProfiling`            | `enable_profiling`              | Activa Datadog Continuous Profiler con `true`. Es compatible en Beta con Node.js y Python. Por defecto es `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `encodeAuthorizerContext`    | `encode_authorizer_context`     | Cuando se configura en `true` para autorizadores Lambda, el contexto de rastreo se codificará en la respuesta para la propagación. Es compatible con Node.js y Python. Por defecto es `true`.                                                                                                                                                                                                                                                                                                                                                                                                        |
| `decodeAuthorizerContext`    | `decode_authorizer_context`     | Cuando se configura en `true` para Lambdas que están autorizadas a través de autorizadores Lambda, analizará y utilizará el contexto de rastreo codificado (si se encuentra). Es compatible con Node.js y Python. Por defecto es `true`.                                                                                                                                                                                                                                                                                                                                                                                 |
| `apmFlushDeadline`           | `apm_flush_deadline`            | Se utiliza para determinar cuándo enviar tramos antes de que se agote el tiempo, en milisegundos. Cuando el tiempo restante en una invocación de AWS lambda es inferior al valor configurado, el rastreador intenta enviar tramos activos actuales y todos los tramos finalizados. Es compatible con Node.js y Python. Por defecto es `100` milisegundos.                                                                                                                                                                                                                                                              |
| `redirectHandler`            | `redirect_handler`              | Cuando se configura en `false`, omite la redirección del controlador al controlador de la biblioteca Datadog Lambda. Es útil cuando solo se instrumenta con la extensión Datadog Lambda. Por defecto es `true`.                                                                                                                                                                                                                                                                                                                                                                                                       |
| `grantSecretReadAccess`      | `grant_secret_read_access`      | Cuando se establece en `true` y se proporciona `apiKeySecretArn`, automáticamente concede acceso de lectura al secreto dado a todas las funciones de Lambda añadidas. Por defecto es `true`.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `llmObsEnabled`              | `llm_obs_enabled`               | Activa el envío de datos a LLM Observability. Por defecto es `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `llmObsMlApp`                | `llm_obs_ml_app`                | El nombre de tu aplicación, servicio o proyecto LLM, bajo el cual se agrupan todas las trazas (traces) y tramos (spans). Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulta [Instrucciones de nomenclatura de aplicaciones](https://docs.datadoghq.com/llm_observability/sdk/?tab=nodejs#application-naming-guidelines) para ver los caracteres permitidos y otras restricciones. Para anular este valor para un tramo raíz dado, consulta [Rastreo de múltiples aplicaciones](https://docs.datadoghq.com/llm_observability/sdk/?tab=nodejs#tracing-multiple-applications).  Obligatorio si `llmObsEnabled` es `true`. |
| `llmObsAgentlessEnabled`     | `llm_obs_agentless_enabled`     | Solo es obligatorio si no estás utilizando la extensión Lambda Datadog, en cuyo caso debe configurarse como `true`.  Por defecto es `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                             |



#### Rastreo

Activa el rastreo X-Ray en tus funciones Lambda. Para más información, consulta la [documentación de CDK][9].

```typescript
import * as lambda from "aws-cdk-lib/aws-lambda";

const lambda_function = new lambda.Function(this, "HelloHandler", {
  runtime: lambda.Runtime.NODEJS_18_X,
  code: lambda.Code.fromAsset("lambda"),
  handler: "hello.handler",
  tracing: lambda.Tracing.ACTIVE,
});
```

#### Stacks anidados

Añade la construcción de Datadog CDK a cada stack que desees instrumentar con Datadog. En el ejemplo siguiente, inicializamos la construcción de Datadog CDK y llamamos a `addLambdaFunctions()` tanto en `RootStack` como en `NestedStack`.

```typescript
import { DatadogLambda } from "datadog-cdk-constructs-v2";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

class RootStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new NestedStack(this, "NestedStack");

    const datadogLambda = new DatadogLambda(this, "DatadogLambda", {
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
    datadogLambda.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);

  }
}

class NestedStack extends cdk.NestedStack {
  constructor(scope: Construct, id: string, props?: cdk.NestedStackProps) {
    super(scope, id, props);

    const datadogLambda = new DatadogLambda(this, "DatadogLambda", {
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
    datadogLambda.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);

  }
}
```

#### Etiquetas

Añade etiquetas a tus construcciones. Recomendamos configurar una etiqueta de `env` y `service` para unir la telemetría de Datadog. Para más información consulta la [documentación oficial de AWS ][10] y la [documentación del CDK][11].


#### Activar App and API Protection en el rastreador

La [biblioteca Lambda Datadog para Python][8] (versión `8.114.0` o posterior) puede ejecutar [App and API Protection][19] directamente en la aplicación instrumentada, proporcionando un contexto adicional al motor de seguridad. Esto complementa el despliegue dentro de la extensión proporcionado por la [extensión Lambda Datadog][12]. `appSecMode` selecciona qué despliegue se ejecuta:
- `on`: con `pythonLayerVersion>=114` en las funciones de Python, App and API Protection se ejecuta dentro de la biblioteca. Otros tiempos de ejecución o bibliotecas proporcionadas manualmente recurren a la extensión.
- `tracer`: Utiliza siempre el despliegue de la biblioteca (todas las funciones deben estar en Python y utilizar la biblioteca Python en la versión `8.114.0` o posterior).
- `extension`: Utiliza siempre el despliegue de la extensión, incluso cuando se detecta una biblioteca compatible.
- `off`: Desactiva App and API Protection por completo.



### Concede automáticamente a AWS acceso de lectura a secretos al rol de ejecución de Lambda.

**Solo está disponible en datadog-cdk-constructs-v2**

Para conceder acceso de lectura automáticamente a los roles de ejecución de Lambda a un secreto determinado, introduce `apiKeySecret` en lugar de `apiKeySecretArn` al inicializar la construcción LambdaDatadog.

```typescript
const { Secret } = require('aws-cdk-lib/aws-secretsmanager');

const secret = Secret.fromSecretPartialArn(this, 'DatadogApiKeySecret', 'arn:aws:secretsmanager:us-west-1:123:secret:DATADOG_API_KEY');

const datadogLambda = new DatadogLambda(this, 'DatadogLambda', {
  ...
  apiKeySecret: secret
  ...
});
```

Cuando se llama a `addLambdaFunctions`, la construcción de Datadog CDK concede a tus roles de ejecución Lambda acceso de lectura al secreto AWS dado. Esto se hace a través de la [función grantRead de AWS ISecret][17].

### Cómo funciona

El constructor DatadogLambda toma una lista de funciones de Lambda e instala la biblioteca de Lambda Datadog adjuntando las capas Lambda para [.NET][19], [Java][15], [Node.js][2] y [Python][1] a tus funciones. Redirige a un controlador de reemplazo que inicializa la biblioteca de Lambda sin ningún cambio de código requerido. Las configuraciones adicionales añadidas a la construcción Datadog CDK también se traducirán en sus respectivas variables de entorno bajo cada función de Lambda (si es aplicable/requerido).

Los grupos de logs basados en funciones Lambda se controlan en forma automática mediante el método de `addLambdaFunctions`, mientras que la construcción tiene una función `addForwarderToNonLambdaLogGroups` adicional que suscribe el Forwarder a cualquier grupo de logs adicional de tu elección.

## Step Functions

Sólo se admite AWS CDK v2.

### Utilización

#### TypeScript

Stack tecnológico de ejemplo: [step-functions-typescript-stack](https://github.com/DataDog/datadog-cdk-constructs/tree/main/examples/step-functions-typescript-stack)

##### Configuración básica

```
import * as sfn from "aws-cdk-lib/aws-stepfunctions";
import { DatadogStepFunctions} from "datadog-cdk-constructs-v2";

const stateMachine = new sfn.StateMachine(...);
const datadogSfn = new DatadogStepFunctions(this, "DatadogSfn", {
  env: "<ENV>", // e.g. "dev"
  service: "<SERVICE>", // e.g. "my-cdk-service"
  version: "<VERSION>", // e.g. "1.0.0"
  forwarderArn: "<FORWARDER_ARN>", // e.g. "arn:test:forwarder:sa-east-1:12345678:1"
  tags: <TAGS>, // optional, e.g. "custom-tag-1:tag-value-1,custom-tag-2:tag-value-2"
});
datadogSfn.addStateMachines([stateMachine]);
```

##### Fusión de trazas (traces)

Para fusionar las trazas de Step Function con las trazas de la función de Lambda descendente o las trazas de Step Function, modifica la carga útil de la tarea de Lambda o la entrada de la tarea de Step Function:

```
import * as tasks from "aws-cdk-lib/aws-stepfunctions-tasks";
import * as sfn from "aws-cdk-lib/aws-stepfunctions";
import { DatadogStepFunctions, DatadogLambda } from "datadog-cdk-constructs-v2";

const lambdaFunction = ...;
const lambdaTask = new tasks.LambdaInvoke(this, "MyLambdaTask", {
  lambdaFunction: lambdaFunction,
  payload: sfn.TaskInput.fromObject(
    DatadogStepFunctions.buildLambdaPayloadToMergeTraces(
      { "custom-key": "custom-value" }
    )
  ),
});

const childStateMachine = new sfn.StateMachine(...);
const invokeChildStateMachineTask = new tasks.StepFunctionsStartExecution(this, "InvokeChildStateMachineTask", {
  stateMachine: childStateMachine,
  input: sfn.TaskInput.fromObject(
    DatadogStepFunctions.buildStepFunctionTaskInputToMergeTraces({ "custom-key": "custom-value" }),
  ),
});

const stateMachine = new sfn.StateMachine(this, "CdkTypeScriptTestStateMachine", {
  definitionBody: sfn.DefinitionBody.fromChainable(lambdaTask.next(invokeChildStateMachineTask)),
});

const datadogLambda = ...;
datadogLambda.addLambdaFunctions([lambdaFunction]);

const datadogSfn = ...;
datadogSfn.addStateMachines([childStateMachine, stateMachine]);
```

#### Python

Stack tecnológico de ejemplo: [step-functions-python-stack](https://github.com/DataDog/datadog-cdk-constructs/tree/main/examples/step-functions-python-stack)

##### Configuración básica

```
from aws_cdk import (
    aws_stepfunctions as sfn,
    aws_stepfunctions_tasks as tasks,
)
from datadog_cdk_constructs_v2 import DatadogStepFunctions, DatadogLambda

state_machine = sfn.StateMachine(...)
datadog_sfn = DatadogStepFunctions(
    self,
    "DatadogSfn",
    env="<ENV>", # e.g. "dev"
    service="<SERVICE>", # e.g. "my-cdk-service"
    version="<VERSION>", # e.g. "1.0.0"
    forwarderArn="<FORWARDER_ARN>", # e.g. "arn:test:forwarder:sa-east-1:12345678:1"
    tags=<TAGS>, # optional, e.g. "custom-tag-1:tag-value-1,custom-tag-2:tag-value-2"
)
datadog_sfn.add_state_machines([child_state_machine, parent_state_machine])
```

##### Fusión de trazas (traces)

Para fusionar las trazas de Step Function con las trazas de la función de Lambda descendente o las trazas de Step Function, modifica la carga útil de la tarea de Lambda o la entrada de la tarea de Step Function:

```
from aws_cdk import (
    aws_lambda,
    aws_stepfunctions as sfn,
    aws_stepfunctions_tasks as tasks,
)
from datadog_cdk_constructs_v2 import DatadogStepFunctions, DatadogLambda

lambda_function = aws_lambda.Function(...)
lambda_task = tasks.LambdaInvoke(
    self,
    "MyLambdaTask",
    lambda_function=lambda_function,
    payload=sfn.TaskInput.from_object(
        DatadogStepFunctions.build_lambda_payload_to_merge_traces(
            {"custom-key": "custom-value"}
        )
    ),
)

child_state_machine = sfn.StateMachine(...)
invoke_child_state_machine_task = tasks.StepFunctionsStartExecution(
    self,
    "InvokeChildStateMachineTask",
    state_machine=child_state_machine,
    input=sfn.TaskInput.from_object(
        DatadogStepFunctions.build_step_function_task_input_to_merge_traces(
            {"custom-key": "custom-value"}
        )
    ),
)

state_machine = sfn.StateMachine(
    self,
    "CdkPythonTestStateMachine",
    definition_body=sfn.DefinitionBody.from_chainable(
        lambda_task.next(invoke_child_state_machine_task)
    ),
)

datadog_lambda = DatadogLambda(...)
datadog_lambda.add_lambda_functions([lambda_function])

datadog_sfn = DatadogStepFunctions(...)
datadog_sfn.add_state_machines([child_state_machine, state_machine])
```

#### Go

Stack tecnológico de ejemplo: [step-functions-go-stack](https://github.com/DataDog/datadog-cdk-constructs/tree/main/examples/step-functions-go-stack)

##### Configuración básica

```
import (
    "github.com/DataDog/datadog-cdk-constructs-go/ddcdkconstruct/v2"
    "github.com/aws/aws-cdk-go/awscdk/v2"
    sfn "github.com/aws/aws-cdk-go/awscdk/v2/awsstepfunctions"
)

stack := awscdk.NewStack(...)
stateMachine := sfn.NewStateMachine(...)
datadogSfn := ddcdkconstruct.NewDatadogStepFunctions(
  stack,
  jsii.String("DatadogSfn"),
  &ddcdkconstruct.DatadogStepFunctionsProps{
    Env:            jsii.String("<ENV>"), // e.g. "dev"
    Service:        jsii.String("<SERVICE>), // e.g. "my-cdk-service"
    Version:        jsii.String("<VERSION>"), // e.g. "1.0.0"
    ForwarderArn:   jsii.String("<FORWARDER_ARN>"), // e.g. "arn:test:forwarder:sa-east-1:12345678:1"
    Tags:           jsii.String("<TAGS>"), // optional, e.g. "custom-tag-1:tag-value-1,custom-tag-2:tag-value-2"
  }
)
datadogSfn.AddStateMachines(&[]sfn.StateMachine{stateMachine}, nil)
```

##### Fusión de trazas (traces)

Para fusionar las trazas de Step Function con las trazas de la función de Lambda descendente o las trazas de Step Function, modifica la carga útil de la tarea de Lambda o la entrada de la tarea de Step Function:

```
import (
    "github.com/DataDog/datadog-cdk-constructs-go/ddcdkconstruct/v2"
    "github.com/aws/aws-cdk-go/awscdk/v2/awslambda"
    sfn "github.com/aws/aws-cdk-go/awscdk/v2/awsstepfunctions"
    sfntasks "github.com/aws/aws-cdk-go/awscdk/v2/awsstepfunctionstasks"
    "github.com/aws/jsii-runtime-go"
)

lambdaFunction := awslambda.NewFunction(...)
lambdaPayload := ddcdkconstruct.DatadogStepFunctions_BuildLambdaPayloadToMergeTraces(&map[string]interface{}{
  "custom-key": "custom-value",
})
lambdaTask := sfntasks.NewLambdaInvoke(stack, jsii.String("MyLambdaTask"), &sfntasks.LambdaInvokeProps{
  LambdaFunction: lambdaFunction,
  Payload: sfn.TaskInput_FromObject(lambdaPayload),
})

childStateMachine := sfn.NewStateMachine(...)
stateMachineTaskInput := ddcdkconstruct.DatadogStepFunctions_BuildStepFunctionTaskInputToMergeTraces(
  &map[string]interface{}{
    "custom-key": "custom-value",
  }
)
invokeChildStateMachineTask := sfntasks.NewStepFunctionsStartExecution(
  stack,
  jsii.String("InvokeChildStateMachineTask"),
  &sfntasks.StepFunctionsStartExecutionProps{
    StateMachine: childStateMachine,
    Input: sfn.TaskInput_FromObject(stateMachineTaskInput),
  }
)
stateMachine := sfn.NewStateMachine(stack, jsii.String("CdkGoTestStateMachine"), &sfn.StateMachineProps{
  DefinitionBody: sfn.DefinitionBody_FromChainable(lambdaTask.Next(invokeChildStateMachineTask)),
})

datadogLambda := ...
datadogLambda.AddLambdaFunctions(&[]interface{}{lambdaFunction}, nil)

datadogSfn := ...
datadogSfn.AddStateMachines(&[]sfn.StateMachine{childStateMachine, stateMachine}, nil)
```

### Configuración

Parámetros para crear la construcción `DatadogStepFunctions`:

| Parámetro de paquete de npm  | Parámetro de paquete de PyPI  | Parámetro del paquete Go | Descripción                                                                                                    |
| --------------------- | ---------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------- |
| `env`                 | `env`                  | `Env`                | La etiqueta `env` que se añadirá a la máquina de estados.                                                                |
| `service`             | `service`              | `Service`            | La etiqueta `service` que se añadirá a la máquina de estados.                                                            |
| `version`             | `version`              | `Version`            | La etiqueta `version` que se añadirá a la máquina de estados.                                                            |
| `forwarderArn`        | `forwarder_arn`        | `ForwarderArn`       | ARN o Datadog Forwarder, que se suscribirá al grupo de logs de la máquina de estado.                               |
| `tags`                | `tags`                 | `Tags`               | Una lista separada por comas de pares clave valor como una única cadena, que se añadirá a las etiquetas de la máquina de estado. |

### Cómo funciona

La construcción `DatadogStepFunctions` toma una lista de máquinas de estado y para cada una de ellas:

1. Configurar el registro, incluyendo:
   1. Establecer el nivel de log en ALL (TODOS)
   2. Establecer includeExecutionData como true
   3. Crear y definir el grupo de logs de destino (si aún no está definido)
   4. Añadir permisos al rol de máquina de estado para loguear en CloudWatch Logs
2. Suscripción de Datadog Forwarder al grupo de logs de la máquina de estado
3. Establece etiquetas, incluyendo:
   1. `env`
   2. `service`
   3. `version`
   4. `DD_TRACE_ENABLED`: `true`. Esto permite el rastreo.
      1. Para desactivar el rastreo, configúralo en `false` desde AWS Management Console después de desplegar el stack tecnológico.
      2. Si deseas desactivar el rastreo mediante CDK, abre una incidencia para que podamos ofrecerte soporte.
   5. etiqueta de versión de `dd_cdk_construct`
   6. etiquetas personalizadas pasadas como parámetro `tags` a la construcción `DatadogStepFunctions` 

Para fusionar las trazas de Step Function con las trazas de la función de Lambda descendente o la función de Step Function, el constructor añade los campos `$$.Execution`, `$$.State` y `$$.StateMachine` a la entrada de la tarea de Step Function o a la carga útil de la tarea de Lambda.

### Solucionar problemas

#### El grupo de logs ya existe

Si `cdk deploy` falla con un error del tipo:

> Resource of type 'AWS::Logs::LogGroup' with identifier '{"/properties/LogGroupName":"/aws/vendedlogs/states/CdkStepFunctionsTypeScriptStack1-CdkTypeScriptTestChildStateMachine-Logs-dev"}' already exists.

Tienes dos opciones:

1. Elimina el grupo de logs si ya no necesita los logs que contiene. Puedes hacerlo desde la AWS Management Console, en CloudWatch -> Logs -> Log groups (CloudWatch -> Logs -> Grupos de logs).
2. Actualiza la definición de la máquina de estados si deseas utilizar el grupo de logs existente:

```
import * as logs from 'aws-cdk-lib/aws-logs';

const logGroupName = "/aws/vendedlogs/states/xxx";
const logGroup = logs.LogGroup.fromLogGroupName(stack, 'StateMachineLogGroup', logGroupName);

const stateMachine = new sfn.StateMachine(stack, 'MyStateMachine', {
  logs: {
    destination: logGroup,
  },
  ...
});
```

## Recursos para aprender sobre CDK

- Si no conoce AWS CDK, consulta este [taller][14].
- [Taller de CDK TypeScript](https://cdkworkshop.com/20-typescript.html)
- [Vídeo de presentación de CDK por AWS con demostración](https://youtu.be/ZWCvNFUN-sU)
- [Conceptos de CDK](https://youtu.be/9As_ZIjUGmY)

## Utilizar Projen

Las bibliotecas de Datadog CDK Construct utilizan Projen para mantener los archivos de configuración del proyecto, como `package.json`, `.gitignore`, `.npmignore`, etc. La mayoría de los archivos de configuración estarán protegidos por Projen mediante permisos de solo lectura. Para cambiar estos archivos, edita el archivo `.projenrc.js`, luego ejecuta `npx projen` para sintetizar los nuevos cambios. Haz un check en [Projen][13] para más detalles.

## Migración de v2-1.x.x a v2-2.x.x

En febrero de 2025, Datadog lanzó una importante actualización de la versión `1.x.x` a `2.x.x`. Los cambios necesarios para migrar a la nueva versión son los siguientes:

1. Renombra las clases para instrumentar funciones de Lambda:

   1. `Datadog` -> `DatadogLambda`
   2. `DatadogProps` -> `DatadogLambdaProps`
      Para ver ejemplos, consulta la sección [Uso](#usage) de esta página y la carpeta [examples/][20] del repositorio GitHub.

2. Actualiza la versión de Node.js a `18.18.0` o posterior.

3. Para Go, cambia la importación de:

   ```
   "github.com/DataDog/datadog-cdk-constructs-go/ddcdkconstruct"
   ```

   a:

   ```
   "github.com/DataDog/datadog-cdk-constructs-go/ddcdkconstruct/v2"
   ```

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

Para mostrar los logs de depuración de esta biblioteca para Lambda, establece la variable de entorno `DD_CONSTRUCT_DEBUG_LOGS` a `true` cuando ejecutes `cdk synth` (utiliza `--quiet` para suprimir la salida de plantilla generada).

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
[20]: https://github.com/DataDog/datadog-cdk-constructs/tree/main/examples
[21]: https://docs.datadoghq.com/es/security/application_security/
[22]: https://www.datadoghq.com/blog/troubleshoot-lambda-function-request-response-payloads/
[23]: https://github.com/DataDog/datadog-cdk-constructs/blob/main/src/ecs/fargate/README.md
[24]: https://docs.datadoghq.com/es/tracing/guide/aws_payload_tagging/
[25]: https://docs.datadoghq.com/es/serverless/aws_lambda/installation/ruby
[26]: https://docs.datadoghq.com/es/serverless/aws_lambda/installation/go