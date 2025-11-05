---
title: Instrumentación de aplicaciones serverless de Node.js mediante el Datadog Forwarder
---

## Información general

<div class="alert alert-danger">
Si recién empiezas a utilizar Datadog Serverless, sigue las <a href="/serverless/installation/nodejs">instrucciones para instrumentar tus funciones de Lambda mediante la Datadog Lambda Extension</a>. Si configuraste Datadog Serverless con el Datadog Forwarder antes de que Lambda ofreciera la funcionalidad lista para usar, utiliza esta guía para mantener tu instancia.
</div>

## Requisitos previos

Se necesita la [función de Lambda del Datadog Forwarder][1] para ingerir las trazas (traces), las métricas mejoradas, las métricas personalizadas y los logs de AWS Lambda.

## Configuración

{{< tabs >}}
{{% tab "Datadog CLI" %}}

La Datadog CLI modifica la configuración de las funciones de Lambda existentes para permitir la instrumentación sin tener que volver a desplegar. Es la forma más rápida de empezar a trabajar con la monitorización serverless de Datadog.

También puedes añadir el comando a tus pipelines de CI/CD y así activar la instrumentación para todas tus aplicaciones serverless. Ejecuta el comando *después* del despliegue normal de tu aplicación serverless para evitar que los cambios del comando de la Datadog CLI se sobrescriban.

### Instalar

Instala la Datadog CLI con NPM o Yarn:

```sh
# NPM
npm install -g @datadog/datadog-ci

# Yarn
yarn global add @datadog/datadog-ci
```

### Instrumentar

Para instrumentar la función, ejecuta el siguiente comando con tus [credenciales de AWS][1].

```sh
datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v <layer_version> --forwarder <forwarder_arn>
```

Para rellenar los parámetros, haz lo siguiente:
- Reemplaza `<functionname>` y `<another_functionname>` por los nombres de tu función de Lambda.
- Reemplaza `<aws_region>` por el nombre de la región de AWS.
- Reemplaza `<layer_version>` por la versión de la librería Lambda de Datadog que quieres utilizar. La última versión es `{{< latest-lambda-layer-version layer="node" >}}`.
- Reemplaza `<forwarder_arn>` por el nombre de recurso de Amazon (ARN) del Forwarder (consulta la [documentación del Forwarder][2]).

Por ejemplo:

```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -v {{< latest-lambda-layer-version layer="node" >}} --forwarder "arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder"
```

Si configuraste tu función de Lambda para utilizar la firma de código, debes añadir el ARN del perfil de firma de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) a la [configuración de firma de código][3] de tu función antes de poder instrumentarla con la Datadog CLI.

Obtén más información y parámetros adicionales en la [documentación de la CLI][4].

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/es/serverless/forwarder/
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[4]: https://docs.datadoghq.com/es/serverless/serverless_integrations/cli

{{% /tab %}}
{{% tab "Serverless Framework" %}}

El complemento [Datadog Serverless Plugin][1] añade la librería Lambda de Datadog automáticamente a tus funciones mediante capas y configura las funciones para enviar métricas, trazas y logs a Datadog a través del [Datadog Forwarder][2].

Si configuraste tu función de Lambda para utilizar la firma de código, debes añadir el ARN del perfil de firma de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) a la [configuración de firma de código][6] de tu función antes de poder instalar el Datadog Serverless Plugin.

Para instalar y configurar el Datadog Serverless Plugin, sigue estos pasos:

1. Instala el Datadog Serverless Plugin:
    ```
    yarn add --dev serverless-plugin-datadog
    ```
2. Añade lo siguiente a tu archivo `serverless.yml`:
    ```
    plugins:
      - serverless-plugin-datadog
    ```
3. Añade también la siguiente sección a tu archivo `serverless.yml`:
    ```
    custom:
      datadog:
        forwarderArn: # The Datadog Forwarder ARN goes here.
    ```
    Puedes obtener más información sobre el ARN o la instalación del Datadog Forwarder [aquí][2]. Consulta parámetros adicionales en la [documentación del complemento][1].

**Nota**: Tendrás que seguir estos [pasos de configuración adicionales][4] si tu función de Lambda utiliza las bibliotecas de rastreo de Datadog y [webpack][5] de forma simultánea.

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/es/serverless/forwarder/
[4]: /es/serverless/guide/serverless_tracing_and_webpack/
[5]: https://webpack.js.org/
[6]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "AWS SAM" %}}

La [macro de CloudFormation de Datadog][1] transforma automáticamente tu plantilla de aplicación de SAM para añadir la librería Lambda de Datadog a tus funciones mediante capas. Además, configura las funciones para enviar métricas, trazas y logs a Datadog a través del [Datadog Forwarder][2].

### Instalar

Ejecuta el siguiente comando con tus [credenciales de AWS][3] para desplegar un stack tecnológico de CloudFormation que instale el recurso de AWS de la macro. Solo tienes que instalar la macro una vez en una región determinada de tu cuenta. Luego, debes reemplazar `create-stack` por `update-stack` para actualizar la macro a la versión más reciente.

```sh
aws cloudformation create-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

Con estos pasos, la macro ya está desplegada y lista para usar.

### Instrumentar

En tu archivo `template.yml`, añade lo siguiente en la sección `Transform` (Transformación), **después** de la transformación `AWS::Serverless` para SAM.

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      stackName: !Ref "AWS::StackName"
      nodeLayerVersion: "{{< latest-lambda-layer-version layer="node" >}}"
      forwarderArn: "<FORWARDER_ARN>"
      service: "<SERVICE>" # Optional
      env: "<ENV>" # Optional
```

Para rellenar los parámetros, haz lo siguiente:
- Reemplaza `<FORWARDER_ARN>` por el ARN del Forwarder (consulta la [documentación del Forwarder][2]).
- Reemplaza `<SERVICE>` y `<ENV>` por los valores de tu servicio y entorno.

Si configuraste tu función de Lambda para utilizar la firma de código, debes añadir el ARN del perfil de firma de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) a la [configuración de firma de código][4] de tu función antes de poder usar la macro.

Obtén más información y parámetros adicionales en la [documentación de la macro][1].

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/es/serverless/forwarder/
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "AWS CDK" %}}

Las [Construcciones del Datadog CDK][1] configuran automáticamente la ingesta de métricas, trazas y logs de tus aplicaciones serverless mediante las siguientes acciones:

- La instalación y configuración de la librería Lambda de Datadog para tus funciones de Lambda de Python y Node.js.
- La habilitación de la recopilación de trazas y métricas personalizadas de tus funciones de Lambda.
- La gestión de las suscripciones del Datadog Forwarder a los grupos de logs de tus funciones de Lambda.

### Instalar

Ejecuta el siguiente comando de Yarn o NPM en tu proyecto del CDK para instalar la librería de Construcciones del Datadog CDK:

```sh
#Yarn
yarn add --dev datadog-cdk-constructs-v2

#NPM
npm install datadog-cdk-constructs-v2 --save-dev
```

### Instrumentar

Para instrumentar la función, importa el módulo `datadog-cdk-construct` en tu aplicación del AWS CDK y añade las siguientes configuraciones (este ejemplo es de TypeScript, pero el uso en otros lenguajes es similar):

```typescript
import * as cdk from "@aws-cdk/core";
import { DatadogLambda } from "datadog-cdk-constructs-v2";

class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const datadogLambda = new DatadogLambda(this, "DatadogLambda", {
      nodeLayerVersion: {{< latest-lambda-layer-version layer="node" >}},
      forwarderArn: "<FORWARDER_ARN>",
      service: "<SERVICE>",  // Optional
      env: "<ENV>",  // Optional
    });
    datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>])
  }
}
```

Para rellenar los parámetros, haz lo siguiente:

- Reemplaza `<FORWARDER_ARN>` por el ARN del Forwarder (consulta la [documentación del Forwarder][2]).
- Reemplaza `<SERVICE>` y `<ENV>` por los valores de tu servicio y entorno.

Si configuraste tu función de Lambda para utilizar la firma de código, debes añadir el ARN del perfil de firma de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) a la [configuración de firma de código][3] de tu función antes de poder usar la macro.

Obtén más información y parámetros adicionales en la [página de NPM del Datadog CDK][1].


[1]: https://www.npmjs.com/package/datadog-cdk-constructs-v2
[2]: https://docs.datadoghq.com/es/serverless/forwarder/
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "Imagen de contenedor" %}}

### Instalar

Si vas a desplegar tu función de Lambda como una imagen de contenedor, no puedes utilizar la librería Lambda de Datadog como una capa. En su lugar, debes instalar la librería Lambda de Datadog como una dependencia de tu función dentro de la imagen. Si quieres utilizar el rastreo de Datadog, también debes instalar `dd-trace`.

**NPM**:

```sh
npm install --save datadog-lambda-js dd-trace
```

**Yarn**:

```sh
yarn add datadog-lambda-js dd-trace
```

**Nota**: La versión secundaria del paquete `datadog-lambda-js` siempre coincide con la versión de la capa. Por ejemplo, `datadog-lambda-js v0.5.0` coincide con el contenido de la versión 5 de la capa.

### Configurar

Sigue estos pasos para configurar la función:

1. Define el valor `CMD` de tu imagen como `node_modules/datadog-lambda-js/dist/handler.handler`. Puedes hacerlo en AWS o directamente en tu Dockerfile. **Nota**: El valor de AWS sobrescribirá el valor del Dockerfile si los defines por separado.
2. Configura las siguientes variables de entorno en AWS:
  - Define `DD_LAMBDA_HANDLER` como tu controlador original, por ejemplo, `myfunc.handler`.
  - Define `DD_TRACE_ENABLED` como `true`.
  - Define `DD_FLUSH_TO_LOG` como `true`.
3. Otra opción es añadir las etiquetas (tags) `service` y `env` con los valores adecuados a tu función.

### Subscribir

Suscribe la función de Lambda del Datadog Forwarder a cada uno de los grupos de logs de tus funciones para enviar métricas, trazas y logs a Datadog.

1. [Instala el Datadog Forwarder si todavía no lo hiciste][1].
2. [Suscribe el Datadog Forwarder a los grupos de logs de tu función][2].


[1]: https://docs.datadoghq.com/es/serverless/forwarder/
[2]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{% tab "Personalizar" %}}

### Instalar

La librería Lambda de Datadog puede importarse como una capa o como un paquete de JavaScript.

La versión secundaria del paquete `datadog-lambda-js` siempre coincide con la versión de la capa. Por ejemplo, la versión 0.5.0 de datadog-lambda-js coincide con el contenido de la versión 5 de la capa.

#### Como una capa

[Configura las capas][8] de tu función de Lambda con el ARN en el siguiente formato.

```
# For us,us3,us5,eu, ap1, and ap2 regions
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>

# For us-gov regions
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:<VERSION>

```

Las opciones disponibles en `RUNTIME` son {{< latest-lambda-layer-version layer="node-versions" >}}. La última `VERSION` es `{{< latest-lambda-layer-version layer="node" >}}`. Por ejemplo:

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-{{< latest-lambda-layer-version layer="node-example-version" >}}:{{< latest-lambda-layer-version layer="node" >}}
```

Si configuraste tu función de Lambda para utilizar la firma de código, debes añadir el ARN del perfil de firma de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) a la [configuración de firma de código][2] de tu función antes de poder añadir la librería Lambda de Datadog como una capa.

#### Como un paquete

**NPM**:

```
npm install --save datadog-lambda-js
```

**Yarn**:

```
yarn add datadog-lambda-js
```

Consulta la [última versión][3].

### Configurar

Sigue estos pasos para configurar la función:

1. Configura el controlador de tu función como `/opt/nodejs/node_modules/datadog-lambda-js/handler.handler` si utilizas la capa, o `node_modules/datadog-lambda-js/dist/handler.handler` si utilizas el paquete.
2. Define la variable de entorno `DD_LAMBDA_HANDLER` como tu controlador original, por ejemplo, `myfunc.handler`.
3. Define la variable de entorno `DD_TRACE_ENABLED` como `true`.
4. Define la variable de entorno `DD_FLUSH_TO_LOG` como `true`.
5. Otra opción es añadir las etiquetas `service` y `env` con los valores adecuados para tu función.

**Nota**: Tendrás que seguir estos [pasos de configuración adicionales][4] si tu función de Lambda utiliza las bibliotecas de rastreo de Datadog y [webpack][5] de forma simultánea.

### Subscribir

Suscribe la función de Lambda del Datadog Forwarder a cada uno de los grupos de logs de tu función para enviar métricas, trazas y logs a Datadog.

1. [Instala el Datadog Forwarder si todavía no lo hiciste][6].
2. [Suscribe el Datadog Forwarder a los grupos de logs de tu función][7].

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[3]: https://www.npmjs.com/package/datadog-lambda-js
[4]: /es/serverless/guide/serverless_tracing_and_webpack/
[5]: https://webpack.js.org/
[6]: https://docs.datadoghq.com/es/serverless/forwarder/
[7]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[8]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html

{{% /tab %}}
{{< /tabs >}}

### Etiquetar

Aunque es opcional, Datadog recomienda etiquetar las aplicaciones serverless con las etiquetas `env`, `service` y `version` para el [etiquetado de servicios unificado][2].

## Explorar

Una vez que tienes tu función configurada según los pasos anteriores, puedes consultar tus métricas, logs y trazas en la [página de inicio de Serverless][3].

## Monitorizar la lógica de negocio personalizada

Si quieres enviar una métrica o un tramo (span) personalizados, consulta el siguiente código de ejemplo:

```javascript
const { sendDistributionMetric, sendDistributionMetricWithDate } = require("datadog-lambda-js");
const tracer = require("dd-trace");

// submit a custom span named "sleep"
const sleep = tracer.wrap("sleep", (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
});

exports.handler = async (event) => {
  // add custom tags to the lambda function span,
  // does NOT work when X-Ray tracing is enabled
  const span = tracer.scope().active();
  span.setTag('customer_id', '123456');

  await sleep(100);

  // submit a custom span
  const sandwich = tracer.trace('hello.world', () => {
    console.log('Hello, World!');
  });

  // submit a custom metric
  sendDistributionMetric(
    "coffee_house.order_value", // metric name
    12.45, // metric value
    "product:latte", // tag
    "order:online", // another tag
  );

  // submit a custom metric with timestamp
  sendDistributionMetricWithDate(
    "coffee_house.order_value", // metric name
    12.45, // metric value
    new Date(Date.now()), // date, must be within last 20 mins
    "product:latte", // tag
    "order:online", // another tag
  );

  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from serverless!"),
  };
  return response;
};
```

Para obtener más información sobre el envío de métricas personalizadas, consulta [Métricas personalizadas de aplicaciones serverless][4]. Para obtener más información sobre la instrumentación personalizada, consulta la documentación de Datadog APM en la sección de [instrumentación personalizada][5].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/serverless/forwarder
[2]: /es/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[3]: https://app.datadoghq.com/functions
[4]: /es/serverless/custom_metrics?tab=nodejs
[5]: /es/tracing/custom_instrumentation/nodejs/
