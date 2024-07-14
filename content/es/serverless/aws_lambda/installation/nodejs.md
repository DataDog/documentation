---
aliases:
- /es/serverless/datadog_lambda_library/nodejs/
- /es/serverless/guide/nodejs/
- /es/serverless/installation/nodejs
further_reading:
- link: /serverless/configuration
  tag: Documentación
  text: Configurar Serverless Monitoring
- link: /serverless/guide/serverless_tracing_and_bundlers/
  tag: Documentación
  text: Compatibilidad del rastreo y los empaquetadores de Lambda con Node.js
- link: /serverless/guide/troubleshoot_serverless_monitoring
  tag: Documentación
  text: Solucionar problemas de Serverless Monitoring
- link: serverless/custom_metrics/
  tag: Documentación
  text: Envío de métricas personalizadas desde aplicaciones serverless
title: Instrumentación de aplicaciones serverless de Node.js
---

<div class="alert alert-warning">Si ya configuraste tus funciones de Lambda con el Datadog Forwarder, consulta la sección de <a href="https://docs.datadoghq.com/serverless/guide/datadog_forwarder_node">instrumentación mediante el Datadog Forwarder</a>. De lo contrario, sigue las instrucciones de esta guía para instrumentar mediante la Datadog Lambda Extension.</div>

<div class="alert alert-warning">Si despliegas tus funciones de Lambda en una VPC sin acceso a la Internet pública, puedes enviar datos <a href="/agent/guide/private-link/">con AWS PrivateLink</a> para el <a href="/getting_started/site/">sitio de Datadog</a> <code>datadoghq.com</code>, o bien <a href="/agent/configuration/proxy/">mediante un proxy</a>, en caso de que uses cualquier otro sitio.</div>

<div class="alert alert-warning">Si empaquetas con webpack o esbuild, quizás tengas que <a href="/serverless/guide/serverless_tracing_and_bundlers/">marcar las bibliotecas de Datadog como externas</a>.</div>

## Instalación

Datadog ofrece muchas formas diferentes de habilitar la instrumentación para tus aplicaciones serverless. Elige a continuación el método que mejor se adapte a tus necesidades. Por lo general, Datadog recomienda utilizar la Datadog CLI (interfaz de línea de comandos). *Debes* seguir las instrucciones para "Imagen de contenedor" si despliegas tu aplicación como una imagen de contenedor.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

La Datadog CLI modifica la configuración de las funciones de Lambda existentes para permitir la instrumentación sin tener que volver a desplegar. Es la forma más rápida de empezar a trabajar con la monitorización serverless de Datadog.

1. Instalar el cliente de la Datadog CLI

    ```sh
    npm install -g @datadog/datadog-ci
    ```

2. Si es la primera vez que usas la monitorización serverless de Datadog, inicia la Datadog CLI en el modo interactivo para recibir instrucciones sobre cómo realizar la primera instalación. Esto te permitirá entrar en materia rápidamente y saltarte los demás pasos. Si deseas instalar Datadog de forma permanente en tus aplicaciones de producción, omite ese paso y dirígete directamente a los siguientes para ejecutar el comando de la Datadog CLI en tus pipelines de CI/CD _después_ de haber desplegado como lo haces normalmente.

    ```sh
    datadog-ci lambda instrument -i
    ```

3. Configurar las credenciales de AWS

    La Datadog CLI necesita acceder al servicio AWS Lambda y depende del SDK de AWS para JavaScript a la hora de [configurar las credenciales][1]. Asegúrate de que tus credenciales de AWS estén configuradas con el mismo método que utilizarás para invocar la AWS CLI.

4. Configurar el sitio de Datadog

    ```sh
    export DATADOG_SITE="<DATADOG_SITE>"
    ```

    Reemplaza `<DATADOG_SITE>` por {{< region-param key="dd_site" code="true" >}} (asegúrate de seleccionar el sitio [SITE] correcto del lado derecho).

5. Configurar la clave de la API de Datadog

    Datadog recomienda guardar la clave de la API de Datadog en AWS Secrets Manager para una mayor seguridad y una rotación más sencilla. La clave debe almacenarse en una cadena de texto sin formato (no en un blob JSON). Además, asegúrate de que tus funciones de Lambda tengan el permiso de IAM obligatorio `secretsmanager:GetSecretValue`.

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

    Si quieres hacer un testeo rápido, también puedes configurar la clave de la API de Datadog en texto sin formato:

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

6. Instrumentar las funciones de Lambda

    **Nota**: Antes que nada, instrumenta tus funciones de Lambda en un entorno de desarrollo o de prueba. Si el resultado de la instrumentación no es satisfactorio, ejecuta `uninstrument` con los mismos argumentos para revertir los cambios.

    Para instrumentar tus funciones de Lambda, ejecuta el siguiente comando.

    ```sh
    datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="node" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    ```

    Para rellenar los parámetros, haz lo siguiente:
    - Reemplaza `<functionname>` y `<another_functionname>` por los nombres de tus funciones de Lambda. Otra posibilidad es usar `--functions-regex` para instrumentar automáticamente varias funciones cuyos nombres coincidan con una expresión regular determinada.
    - Reemplaza `<aws_region>` por el nombre de la región de AWS.

    Si necesitas parámetros adicionales, consulta la [documentación acerca de la CLI][2].


[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/es/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

<div class="alert alert-info">Si, por el contrario, vas a desplegar tu aplicación de Serverless Framework <a href="https://www.serverless.com/framework/docs/providers/aws/guide/intro">mediante la exportación nativa de un objeto JSON desde un archivo JavaScript</a> (por ejemplo, con un archivo <code>serverless.ts</code> ), sigue las <a href="./?tab=custom">instrucciones de instalación personalizadas</a>.</div>

El complemento [Datadog Serverless Plugin][1] configura automáticamente tus funciones para enviar métricas, trazas (traces) y logs a Datadog mediante la [Datadog Lambda Extension][2].

Para instalar y configurar el Datadog Serverless Plugin, sigue estos pasos:

1. Instala el Datadog Serverless Plugin:

    ```sh
    serverless plugin install --name serverless-plugin-datadog
    ```

2. Actualiza tu archivo `serverless.yml`:

    ```yaml
    custom:
      datadog:
        site: <DATADOG_SITE>
        apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
    ```

    Para rellenar los parámetros, haz lo siguiente:
    - Reemplaza `<DATADOG_SITE>` por {{< region-param key="dd_site" code="true" >}} (asegúrate de seleccionar el sitio [SITE] correcto del lado derecho).
    - Reemplaza `<DATADOG_API_KEY_SECRET_ARN>` por el ARN del secreto de AWS en el que almacenaste la [clave de la API de Datadog][3] de forma segura. La clave debe estar almacenada en una cadena de texto sin formato (no en un blob JSON). Además, el permiso `secretsmanager:GetSecretValue` es obligatorio. Si quieres hacer un testeo rápido, puedes usar `apiKey` en lugar del ARN y configurar la clave de la API de Datadog en texto sin formato.

    Para obtener más información y parámetros adicionales, consulta la [documentación acerca del complemento][1].

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/es/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "AWS SAM" %}}

La [macro de CloudFormation de Datadog][1] transforma automáticamente tu plantilla de aplicación de SAM para instalar Datadog en tus funciones con las capas de Lambda. Además, configura las funciones para enviar métricas, trazas y logs a Datadog a través de la [Datadog Lambda Extension][2].

1. Instalar la macro de CloudFormation de Datadog

    Ejecuta el siguiente comando con tus [credenciales de AWS][3] para desplegar un stack tecnológico de CloudFormation que instale el recurso de AWS de la macro. Solo tienes que instalar la macro **una vez** en una región determinada de tu cuenta. Reemplaza `create-stack` por `update-stack` para actualizar la macro a la versión más reciente.

    ```sh
    aws cloudformation create-stack \
      --stack-name datadog-serverless-macro \
      --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
      --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
    ```

    Con estos pasos, la macro ya está desplegada y lista para usar.

2. Instrumentar las funciones de Lambda

    Añade la transformación `DatadogServerless` **después** de la transformación `AWS::Serverless` en la sección `Transform` de tu archivo `template.yml` para SAM.

    ```yaml
    Transform:
      - AWS::Serverless-2016-10-31
      - Name: DatadogServerless
        Parameters:
          stackName: !Ref "AWS::StackName"
          nodeLayerVersion: {{< latest-lambda-layer-version layer="node" >}}
          extensionLayerVersion: {{< latest-lambda-layer-version layer="extension" >}}
          site: "<DATADOG_SITE>"
          apiKeySecretArn: "<DATADOG_API_KEY_SECRET_ARN>"
    ```

    Para rellenar los parámetros, haz lo siguiente:
    - Reemplaza `<DATADOG_SITE>` por {{< region-param key="dd_site" code="true" >}} (asegúrate de seleccionar el sitio [SITE] correcto del lado derecho).
    - Reemplaza `<DATADOG_API_KEY_SECRET_ARN>` por el ARN del secreto de AWS en el que almacenaste la [clave de la API de Datadog][4] de forma segura. La clave debe estar almacenada en una cadena de texto sin formato (no en un blob JSON). Además, el permiso `secretsmanager:GetSecretValue` es obligatorio. Si quieres hacer un testeo rápido, puedes usar `apiKey` en lugar del ARN y configurar la clave de la API de Datadog en texto sin formato.

    Obtén más información y parámetros adicionales en la [documentación de la macro][1].


[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/es/serverless/libraries_integrations/extension
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "AWS CDK" %}}

El [Constructo del Datadog CDK][1] instala automáticamente Datadog en tus funciones con las capas de Lambda. Además, configura tus funciones para enviar métricas, trazas y logs a Datadog a través de la Datadog Lambda Extension.

1. Instalar la biblioteca de constructos del Datadog CDK

    ```sh
    # For AWS CDK v1
    npm install datadog-cdk-constructs --save-dev

    # For AWS CDK v2
    npm install datadog-cdk-constructs-v2 --save-dev
    ```

2. Instrumentar las funciones de Lambda

    ```javascript
    // For AWS CDK v1
    import { Datadog } from "datadog-cdk-constructs";

    // For AWS CDK v2
    import { Datadog } from "datadog-cdk-constructs-v2";

    const datadog = new Datadog(this, "Datadog", {
        nodeLayerVersion: {{< latest-lambda-layer-version layer="node" >}},
        extensionLayerVersion: {{< latest-lambda-layer-version layer="extension" >}},
        site: "<DATADOG_SITE>",
        apiKeySecretArn: "<DATADOG_API_KEY_SECRET_ARN>"
    });
    datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>])
    ```

    Para rellenar los parámetros, haz lo siguiente:
    - Reemplaza `<DATADOG_SITE>` por {{< region-param key="dd_site" code="true" >}} (asegúrate de seleccionar el sitio [SITE] correcto del lado derecho).
    - Reemplaza `<DATADOG_API_KEY_SECRET_ARN>` por el ARN del secreto de AWS en el que almacenaste la [clave de la API de Datadog][2] de forma segura. La clave debe estar almacenada en una cadena de texto sin formato (no en un blob JSON). Además, el permiso `secretsmanager:GetSecretValue` es obligatorio. Si quieres hacer un testeo rápido, puedes usar `apiKey` en lugar del ARN y configurar la clave de la API de Datadog en texto sin formato.

    Obtén más información y parámetros adicionales en la [documentación del Datadog CDK][1].

[1]: https://github.com/DataDog/datadog-cdk-constructs
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Container Image" %}}

1. Instalar la biblioteca Lambda de Datadog

    Si vas a desplegar tu función de Lambda como una imagen de contenedor, no puedes utilizar la biblioteca Lambda de Datadog como una capa de Lambda. En su lugar, debes empaquetar las bibliotecas de rastreo y de Lambda de Datadog dentro de la imagen.

    ```sh
    npm install datadog-lambda-js dd-trace
    ```

    Ten en cuenta que la versión secundaria del paquete `datadog-lambda-js` siempre coincide con la versión de la capa. Por ejemplo, `datadog-lambda-js v0.5.0` coincide con el contenido de la versión 5 de la capa.

2. Instalar la Datadog Lambda Extension

    Añade los siguientes parámetros al Dockerfile para añadir la Datadog Lambda Extension a tu imagen de contenedor:

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/. /opt/
    ```

    Reemplaza `<TAG>` por un número de versión específico (por ejemplo, `{{< latest-lambda-layer-version layer="extension" >}}`) o por `latest`. Alpine también es compatible con números de versión específicos (como `{{< latest-lambda-layer-version layer="extension" >}}-alpine`) o con `latest-alpine`. Puedes ver una lista completa de posibles etiquetas (tags) en el [repositorio de Amazon ECR][1].

3. Redirigir la función del controlador

    - Define el valor `CMD` de tu imagen como `node_modules/datadog-lambda-js/dist/handler.handler`. Puedes hacerlo en AWS o directamente en tu Dockerfile. Ten en cuenta que el valor que está definido en AWS anula el valor del Dockerfile si los defines por separado.
    - Configura la variable de entorno `DD_LAMBDA_HANDLER` como tu controlador original, por ejemplo, `myfunc.handler`.
    - Si utilizas ESModule con el contenedor, tendrás que eliminar el archivo `handler.js`. Este archivo existe en Node 12 y se eliminará cuando AWS finalice el soporte de Node 12.
      ```dockerfile
      RUN rm node_modules/datadog-lambda-js/dist/handler.js
      CMD ["node_modules/datadog-lambda-js/dist/handler.handler"]
      ```

    **Nota**: Si tu función de Lambda se ejecuta en `arm64`, debes crear tu imagen de contenedor en un entorno de Amazon Linux basado en arm64 o [aplicar la envoltura de Datadog en el código de tu función][2] en su lugar. Es posible que también tengas que hacer esto si utilizas una herramienta de seguridad o monitorización de terceros que no es compatible con la redirección del controlador de Datadog.

4. Configurar el sitio y la clave de la API de Datadog

    - Configura la variable de entorno `DD_SITE` como {{< region-param key="dd_site" code="true" >}} (asegúrate de seleccionar el sitio [SITE] correcto del lado derecho).
    - Configura la variable de entorno `DD_API_KEY_SECRET_ARN` con el ARN del secreto de AWS en el que almacenaste la [clave de la API de Datadog][3] de forma segura. La clave debe estar almacenada en una cadena de texto sin formato (no en un blob JSON). Además, el permiso `secretsmanager:GetSecretValue` es obligatorio. Si quieres hacer un testeo rápido, puedes usar `DD_API_KEY` en lugar del ARN y configurar la clave de la API de Datadog en texto sin formato.


[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://docs.datadoghq.com/es/serverless/guide/handler_wrapper
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Terraform" %}}

El módulo de Terraform [`lambda-datadog`][1] envuelve el recurso [`aws_lambda_function`][2] y configura automáticamente tu función de Lambda para Datadog Serverless Monitoring mediante las siguientes acciones:

- adición de las capas de Lambda de Datadog,
- redireccionamiento del controlador de Lambda,
- habilitación de la recopilación de métricas, trazas y logs y su envío a Datadog.

```tf
module "lambda-datadog" {
  source  = "DataDog/lambda-datadog/aws"
  version = "1.3.0"

  environment_variables = {
    "DD_API_KEY_SECRET_ARN" : "<DATADOG_API_KEY_SECRET_ARN>"
    "DD_ENV" : "<ENVIRONMENT>"
    "DD_SERVICE" : "<SERVICE_NAME>"
    "DD_SITE": "<DATADOG_SITE>"
    "DD_VERSION" : "<VERSION>"
  }

  datadog_extension_layer_version = 58
  datadog_node_layer_version = 112

  # los argumentos de aws_lambda_function
}
```

1. Reemplaza el recurso `aws_lambda_function` por el módulo de Terraform `lambda-datadog` y, luego, especifica el origen `source` y la versión `version` del módulo.

2. Configura los argumentos de `aws_lambda_function`:

   Todos los argumentos disponibles en el recurso `aws_lambda_function` están disponibles en este módulo de Terraform. Los argumentos definidos como bloques en el recurso `aws_lambda_function` se redefinen como variables con sus argumentos anidados.

   Por ejemplo, en `aws_lambda_function`, `environment` está definido como un bloque con un argumento `variables`. En el módulo de Terraform `lambda-datadog`, el valor de `environment_variables` se pasa al argumento `environment.variables` en `aws_lambda_function`. Consulta las [entradas][3] para ver una lista completa de las variables en este módulo.

3. Rellena los parámetros de las variables de entorno de la siguiente manera:

   - Reemplaza `<DATADOG_API_KEY_SECRET_ARN>` por el ARN del secreto de AWS en el que almacenaste la clave de la API de Datadog de forma segura. La clave debe estar almacenada en una cadena de texto sin formato (no en un blob JSON). Además, el permiso `secretsmanager:GetSecretValue` es obligatorio. Si quieres hacer un testeo rápido, puedes usar la variable de entorno `DD_API_KEY` en lugar del ARN y configurar la clave de la API de Datadog en texto sin formato.
   - Reemplaza `<ENVIRONMENT>` por el entorno de la función de Lambda, como `prod` o `staging`.
   - Reemplaza `<SERVICE_NAME>` por el nombre del servicio de la función de Lambda.
   - Reemplaza `<DATADOG_SITE>` por {{< region-param key="dd_site" code="true" >}}. (Asegúrate de seleccionar el [sitio de Datadog][4] correcto en esta página).
   - Reemplaza `<VERSION>` por el número de versión de la función de Lambda.

4. Selecciona las versiones de la capa de Lambda de la Datadog Extension y de la capa de Lambda de Datadog para .NET que quieres usar. Por defecto, se utilizan las últimas versiones de las capas.

```
  datadog_extension_layer_version = 58
  datadog_node_layer_version = 112
```

[1]: https://registry.terraform.io/modules/DataDog/lambda-datadog/aws/latest
[2]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function
[3]: https://github.com/DataDog/terraform-aws-lambda-datadog?tab=readme-ov-file#inputs
[4]: /es/getting_started/site/
{{% /tab %}}
{{% tab "Custom" %}}

<div class="alert alert-info">Si no utilizas una herramienta de desarrollo serverless compatible con Datadog, como Serverless Framework o AWS CDK, Datadog te recomienda instrumentar tus aplicaciones serverless con la <a href="./?tab=datadogcli">Datadog CLI</a>.</div>

1. Instalar la biblioteca Lambda de Datadog

    La biblioteca Lambda de Datadog puede importarse como una capa (recomendado) _O_ como un paquete de JavaScript.

    La versión secundaria del paquete `datadog-lambda-js` siempre coincide con la versión de la capa. Por ejemplo, la versión 0.5.0 de datadog-lambda-js coincide con el contenido de la versión 5 de la capa.

    - Opción A: [Configura las capas][1] de tu función de Lambda con el ARN en el siguiente formato:

      ```sh
      # Use this format for AWS commercial regions
      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}

      # Use this format for AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}
      ```

      Reemplaza `<AWS_REGION>` por una región de AWS válida, como `us-east-1`. Las opciones de `<RUNTIME>` disponibles son las siguientes: {{< latest-lambda-layer-version layer="node-versions" >}}.

    - Opción B: Si no puedes utilizar la capa de Lambda de Datadog prediseñada, puedes instalar los paquetes `datadog-lambda-js` y `dd-trace` con tu gestor de paquetes favorito.

      ```
      npm install datadog-lambda-js dd-trace
      ```

2. Instalar la Datadog Lambda Extension

    [Configura las capas][1] de tu función de Lambda con el ARN en el siguiente formato:

    ```sh
    # Use this format for x86-based Lambda deployed in AWS commercial regions
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

    # Use this format for arm64-based Lambda deployed in AWS commercial regions
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}

    # Use this format for x86-based Lambda deployed in AWS GovCloud regions
    arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

    # Use this format for arm64-based Lambda deployed in AWS GovCloud regions
    arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
    ```

    Reemplaza `<AWS_REGION>` por una región de AWS válida, como `us-east-1`.

3. Redirigir la función del controlador

    - Configura el controlador de tu función como `/opt/nodejs/node_modules/datadog-lambda-js/handler.handler` si utilizas la capa, o `node_modules/datadog-lambda-js/dist/handler.handler` si utilizas el paquete.
    - Configura la variable de entorno `DD_LAMBDA_HANDLER` como tu controlador original, por ejemplo, `myfunc.handler`.

    **Nota**: Si tu función de Lambda se ejecuta en `arm64` y la biblioteca `datadog-lambda-js` está instalada como un paquete NPM (opción B del paso 1), debes [aplicar la envoltura de Datadog en el código de tu función][2] en su lugar. Es posible que también tengas que hacer esto si utilizas una herramienta de seguridad o monitorización de terceros que no es compatible con la redirección del controlador de Datadog.

4. Configurar el sitio y la clave de la API de Datadog

    - Configura la variable de entorno `DD_SITE` como {{< region-param key="dd_site" code="true" >}} (asegúrate de seleccionar el sitio [SITE] correcto del lado derecho).
    - Configura la variable de entorno `DD_API_KEY_SECRET_ARN` con el ARN del secreto de AWS en el que almacenaste la [clave de la API de Datadog][3] de forma segura. La clave debe estar almacenada en una cadena de texto sin formato (no en un blob JSON). Además, el permiso `secretsmanager:GetSecretValue` es obligatorio. Si quieres hacer un testeo rápido, puedes usar `DD_API_KEY` en lugar del ARN y configurar la clave de la API de Datadog en texto sin formato.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://docs.datadoghq.com/es/serverless/guide/handler_wrapper
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

## ¿Qué toca hacer ahora?

- ¡Excelente! Ya puedes consultar métricas, logs y trazas en la [página de inicio Serverless][1].
- Activa la [monitorización de amenazas][6] para recibir alertas sobre los atacantes que tienen tu servicio como objetivo.
- Consulta el código de ejemplo para [monitorizar la lógica de negocio personalizada](#monitor-custom-business-logic).
- Consulta la [guía de solución de problemas][2] si tienes dificultades para recopilar la telemetría.
- Consulta las [configuraciones avanzadas][3] para saber cómo hacer lo siguiente:
    - conectar la telemetría mediante etiquetas;
    - recopilar telemetría para Amazon API Gateway, SQS, etc.;
    - capturar las cargas útiles de solicitud y respuesta de Lambda;
    - vincular los errores de tus funciones de Lambda con tu código fuente;
    - filtrar o borrar información confidencial de logs o trazas.

### Monitorizar la lógica de negocio personalizada

Para monitorizar la lógica de negocio personalizada, envía una métrica o un tramo (span) personalizados con el código de ejemplo que aparece abajo. Para ver opciones adicionales, consulta [Envío de métricas personalizadas desde aplicaciones serverless][4] y la guía de APM en la sección de [instrumentación personalizada][5].

```javascript
const { sendDistributionMetric, sendDistributionMetricWithDate } = require('datadog-lambda-js');
const tracer = require('dd-trace');

// envía un tramo personalizado con el nombre "sleep"
const sleep = tracer.wrap('sleep', (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
});

exports.handler = async (event) => {
    // añade etiquetas al tramo de la función de Lambda,
    // NO funciona si el rastreo de X-Ray está habilitado
    const span = tracer.scope().active();
    span.setTag('customer_id', '123456');

    await sleep(100);

    // envía un tramo personalizado
    const sandwich = tracer.trace('hello.world', () => {
        console.log('Hello, World!');
    });

    // envía una métrica personalizada
    sendDistributionMetric(
        'coffee_house.order_value', // metric name
        12.45, // el valor de la métrica
        'product:latte', // una etiqueta
        'order:online' // otra etiqueta
    );

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from serverless!')
    };
    return response;
};
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /es/serverless/guide/troubleshoot_serverless_monitoring/
[3]: /es/serverless/configuration/
[4]: /es/serverless/custom_metrics?tab=nodejs
[5]: /es/tracing/custom_instrumentation/nodejs/
[6]: /es/security/application_security/enabling/serverless/?tab=serverlessframework