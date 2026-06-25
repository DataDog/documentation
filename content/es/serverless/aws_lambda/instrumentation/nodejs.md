---
aliases:
- /es/serverless/datadog_lambda_library/nodejs/
- /es/serverless/guide/nodejs/
- /es/serverless/installation/nodejs
- /es/serverless/aws_lambda/installation/nodejs
further_reading:
- link: /serverless/configuration
  tag: Documentación
  text: Configurar Serverless Monitoring
- link: /serverless/guide/serverless_tracing_and_bundlers/
  tag: Documentación
  text: Compatibilidad de Trazado de Node.js Lambda y Empaquetadores
- link: /serverless/guide/troubleshoot_serverless_monitoring
  tag: Documentación
  text: Solucionar Problemas de Serverless Monitoring
- link: serverless/custom_metrics/
  tag: Documentación
  text: Enviar Custom Metrics desde Aplicaciones Serverless
title: Instrumentar Aplicaciones Serverless de Node.js
---
<div class="alert alert-info">La versión 67+ de la Extensión Lambda de Datadog está optimizada para reducir significativamente la duración del inicio en frío. <a href="/serverless/aws_lambda/configuration/?tab=datadogcli#using-datadog-lambda-extension-v67">Leer más</a>.</div>

## Configurar {#setup}

{{< tabs >}}
{{% tab "Interfaz de Usuario de Datadog" %}}
Puede instrumentar su aplicación Node.js AWS Lambda directamente dentro de Datadog. Navegue a la página [Serverless > AWS Lambda][2] y seleccione [**Instrumentar Funciones**][3].

Para más información, consulte [Instrumentación remota para AWS Lambda][1].

[1]: /es/serverless/aws_lambda/remote_instrumentation
[2]: https://app.datadoghq.com/functions?cloud=aws
[3]: https://app.datadoghq.com/serverless/aws/lambda/setup
{{% /tab %}}
{{% tab "CLI de Datadog" %}}

El CLI de Datadog modifica las configuraciones de las funciones Lambda existentes para habilitar la instrumentación sin requerir un nuevo despliegue. Es la forma más rápida de comenzar con Serverless Monitoring de Datadog.

1. Instalar el cliente CLI de Datadog

    ```sh
    npm install -g @datadog/datadog-ci @datadog/datadog-ci-plugin-lambda
    ```

2. Si eres nuevo en Serverless Monitoring de Datadog, lanza la CLI de Datadog en modo interactivo para guiar tu primera instalación para un inicio rápido, y puedes ignorar los pasos restantes. Para instalar Datadog de forma permanente en tus aplicaciones de producción, omite este paso y sigue los restantes para ejecutar el comando de la CLI de Datadog en tus pipelines de CI/CD _después_ de tu despliegue normal.

    ```sh
    datadog-ci lambda instrument -i
    ```

3. Configura las credenciales de AWS

    La CLI de Datadog requiere acceso al servicio AWS Lambda y depende del SDK de JavaScript de AWS para [resolver las credenciales][1]. Asegúrate de que tus credenciales de AWS estén configuradas utilizando el mismo método que usarías al invocar la CLI de AWS.

4. Configura el sitio de Datadog

    ```sh
    export DATADOG_SITE="<DATADOG_SITE>"
    ```

    Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (asegúrate de que el SITIO correcto esté seleccionado a la derecha).

5. Configura la clave de API de Datadog

    Datadog recomienda guardar la clave de API de Datadog en AWS Secrets Manager por seguridad y fácil rotación. La clave debe ser almacenada como una cadena de texto sin formato (no un objeto JSON). Asegúrate de que tus funciones Lambda tengan el `secretsmanager:GetSecretValue` permiso IAM requerido.

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

    For quick testing purposes, you can also set the Datadog API key in plaintext:

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

6. Instrumenta tus funciones Lambda

    **Nota**: ¡Instrumenta tus funciones Lambda primero en un entorno de desarrollo o de pruebas! Si el resultado de la instrumentación no es satisfactorio, ejecuta `uninstrument` con los mismos argumentos para revertir los cambios.

    Para instrumentar tus funciones Lambda, ejecuta el siguiente comando.

    ```sh
    datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="node" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    

```

    To fill in the placeholders:
    - Replace `<functionname>` and `<another_functionname>` with your Lambda function names. Alternatively, you can use `--functions-regex` to automatically instrument multiple functions whose names match the given regular expression.
    - Replace `<aws_region>` with the AWS region name.

    Additional parameters can be found in the [CLI documentation][2].


[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/es/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

<div class="alert alert-info">Si en cambio estás desplegando tu aplicación Serverless Framework <a href="https://www.serverless.com/framework/docs/providers/aws/guide/intro">exportando nativamente un objeto JSON desde un archivo JavaScript</a> (por ejemplo, utilizando un <code>serverless.ts</code> archivo), siga las <a href="./?tab=custom">instrucciones de instalación personalizadas</a>.</div>

El [Plugin Serverless de Datadog][1] configura automáticamente sus funciones para enviar métricas, trazas y registros a Datadog a través de la [Extensión Lambda de Datadog][2].

Para instalar y configurar el Plugin Serverless de Datadog, siga estos pasos:

1. Instale el Plugin Serverless de Datadog:

    ```sh
    serverless plugin install --name serverless-plugin-datadog
    ```

2. Actualice su `serverless.yml`:

    ```yaml
    custom:
      datadog:
        site: <DATADOG_SITE>
        apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
    ```

    To fill in the placeholders:
    - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (asegúrate de que el SITIO correcto esté seleccionado a la derecha).
    - Reemplace `<DATADOG_API_KEY_SECRET_ARN>` con el ARN del secreto de AWS donde se almacena de forma segura su [clave API de Datadog][3]. La clave debe ser almacenada como una cadena de texto sin formato (no un objeto JSON). Se requiere el permiso `secretsmanager:GetSecretValue`. Para pruebas rápidas, puede usar `apiKey` y establecer la clave API de Datadog en texto plano.

    For more information and additional settings, see the [plugin documentation][1].

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/es/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "AWS SAM" %}}

El [macro de CloudFormation de Datadog][1] transforma automáticamente su plantilla de aplicación SAM para instalar Datadog en sus funciones utilizando capas de Lambda, y configura sus funciones para enviar métricas, trazas y registros a Datadog a través de la [Extensión Lambda de Datadog][2].

1. Instale el macro de CloudFormation de Datadog

    Ejecute el siguiente comando con sus [credenciales de AWS][3] para implementar una pila de CloudFormation que instala el recurso macro de AWS. Solo necesita instalar el macro **una** vez para una región dada en su cuenta. Reemplace `create-stack` con `update-stack` para actualizar el macro a la última versión.

    ```sh
    aws cloudformation create-stack \
      --stack-name datadog-serverless-macro \
      --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
      --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
    ```

    The macro is now deployed and ready to use.

2. Instrumente sus funciones Lambda

    Agregue la transformación `DatadogServerless` **después** de la transformación `AWS::Serverless` en la sección `Transform` de su `template.yml` para SAM.

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

    To fill in the placeholders:
    - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (asegúrate de que el SITIO correcto esté seleccionado a la derecha).
    - Reemplace `<DATADOG_API_KEY_SECRET_ARN>` con el ARN del secreto de AWS donde se almacena de forma segura su [clave API de Datadog][4]. La clave debe ser almacenada como una cadena de texto sin formato (no un objeto JSON). Se requiere el permiso `secretsmanager:GetSecretValue`. Para pruebas rápidas, puede usar `apiKey` en su lugar y establecer la clave API de Datadog en texto plano.

    More information and additional parameters can be found in the [macro documentation][1].


[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/es/serverless/libraries_integrations/extension
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}

{{% tab "AWS CDK" %}}
{{< lambda-install-cdk language="node" layer="node" layerParamTypescript="nodeLayerVersion" layerParamPython="node_layer_version">}}
{{% /tab %}}

{{% tab "Imagen de contenedor" %}}

1. Instalar la biblioteca de Lambda de Datadog

    Empaquetar la biblioteca Lambda de Datadog y los SDK dentro de la imagen:

    ```sh
    npm install datadog-lambda-js dd-trace
    ```

    Note that the minor version of the `datadog-lambda-js` package always matches the layer version. For example, `datadog-lambda-js v0.5.0` matches the content of layer version 5.

    You cannot install the Datadog Lambda Library as a layer if you are deploying your Lambda function as a container image.

2. Instalar la extensión de Lambda de Datadog

    Agrega la extensión de Lambda de Datadog a tu imagen de contenedor añadiendo lo siguiente a tu Dockerfile:

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/. /opt/
    ```

    Replace `<TAG>` with either a specific version number (for example, `{{< latest-lambda-layer-version layer="extension" >}}`) or with `latest`. Alpine is also supported with specific version numbers (such as `{{< latest-lambda-layer-version layer="extension" >}}-alpine`) or with `latest-alpine`. Puedes ver una lista completa de posibles etiquetas en el [repositorio de Amazon ECR][1].

3. Redirigir la función manejadora

    - Establecer el valor de `CMD` de tu imagen a `node_modules/datadog-lambda-js/dist/handler.handler`. Puedes establecer esto en AWS o directamente en tu Dockerfile. Ten en cuenta que el valor establecido en AWS anula el valor en el Dockerfile si estableces ambos.
    - Establecer la variable de entorno `DD_LAMBDA_HANDLER` a tu manejador original, por ejemplo, `myfunc.handler`.
    - Si estás usando ESModule con el contenedor, necesitarás eliminar el archivo `handler.js`. Este archivo existe para Node 12 y será eliminado cuando AWS deprecie el soporte para Node 12.
      ```dockerfile
      RUN rm node_modules/datadog-lambda-js/dist/handler.js
      CMD ["node_modules/datadog-lambda-js/dist/handler.handler"]
      ```

    **Note**: If your Lambda function runs on `arm64`, you must either build your container image in an arm64-based Amazon Linux environment or [apply the Datadog wrapper in your function code][2] instead. You may also need to do that if you are using a third-party security or monitoring tool that is incompatible with the Datadog handler redirection.

4. Configurar el sitio de Datadog y la clave de API

    - Establecer la variable de entorno `DD_SITE` a {{< region-param key="dd_site" code="true" >}} (asegúrate de que el SITIO correcto esté seleccionado a la derecha).
    - Establecer la variable de entorno `DD_API_KEY_SECRET_ARN` con el ARN del secreto de AWS donde tu [clave de API de Datadog][3] está almacenada de forma segura. La clave debe ser almacenada como una cadena de texto sin formato (no un objeto JSON). Se requiere el permiso `secretsmanager:GetSecretValue`. Para pruebas rápidas, puedes usar `DD_API_KEY` en su lugar y establecer la clave de API de Datadog en texto plano.


[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://docs.datadoghq.com/es/serverless/guide/handler_wrapper
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Terraform" %}}

El módulo de Terraform [`lambda-datadog`][1] envuelve el recurso [`aws_lambda_function`][2] y configura automáticamente su función Lambda para el Serverless Monitoring de Datadog mediante:

- Agregando las capas de Lambda de Datadog
- Redirigiendo el controlador de Lambda
- Habilitando la recolección y el envío de métricas, trazas y registros a Datadog

```tf
module "lambda-datadog" {
  source  = "DataDog/lambda-datadog/aws"
  version = "4.0.0"

  environment_variables = {
    "DD_API_KEY_SECRET_ARN" : "<DATADOG_API_KEY_SECRET_ARN>"
    "DD_ENV" : "<ENVIRONMENT>"
    "DD_SERVICE" : "<SERVICE_NAME>"
    "DD_SITE": "<DATADOG_SITE>"
    "DD_VERSION" : "<VERSION>"
  }

  datadog_extension_layer_version = {{< latest-lambda-layer-version layer="extension" >}}
  datadog_node_layer_version = {{< latest-lambda-layer-version layer="node" >}}

  # aws_lambda_function arguments
}
```

1. Reemplaza el recurso `aws_lambda_function` con el módulo de Terraform `lambda-datadog` y luego especifica el `source` y `version` del módulo.

2. Establece los argumentos `aws_lambda_function`:

   Todos los argumentos disponibles en el recurso `aws_lambda_function` están disponibles en este módulo de Terraform. Los argumentos definidos como bloques en el recurso `aws_lambda_function` se redefinen como variables con sus argumentos anidados.

   Por ejemplo, en `aws_lambda_function`, `environment` se define como un bloque con un argumento `variables`. En el módulo de Terraform `lambda-datadog`, el valor para el `environment_variables` se pasa al argumento `environment.variables` en `aws_lambda_function`. Consulte [inputs][3] para una lista completa de variables en este módulo.

3. Complete los marcadores de posición de las variables de entorno:

   - Reemplace `<DATADOG_API_KEY_SECRET_ARN>` con el ARN del secreto de AWS donde su clave de API de Datadog está almacenada de forma segura. La clave debe ser almacenada como una cadena de texto sin formato (no un objeto JSON). Se requiere el permiso `secretsmanager:GetSecretValue`. Para pruebas rápidas, puede usar en su lugar la variable de entorno `DD_API_KEY` y establecer su clave de API de Datadog en texto plano.
   - Reemplace `<ENVIRONMENT>` con el entorno de la función Lambda, como `prod` o `staging`
   - Reemplace `<SERVICE_NAME>` con el nombre del servicio de la función Lambda
   - Reemplace `<DATADOG_SITE>` con {{< region-param key="dd_site" code="true" >}}. (Asegúrese de que el [sitio de Datadog][4] correcto esté seleccionado en esta página).
   - Reemplace `<VERSION>` con el número de versión de la función Lambda

4. Seleccione las versiones de la capa de extensión de Datadog Lambda y la capa de Datadog Node.js Lambda que desea utilizar. Por defecto, se utilizan las versiones más recientes de la capa.

```
  datadog_extension_layer_version = {{< latest-lambda-layer-version layer="extension" >}}
  datadog_node_layer_version = {{< latest-lambda-layer-version layer="node" >}}
```

[1]: https://registry.terraform.io/modules/DataDog/lambda-datadog/aws/latest
[2]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function
[3]: https://github.com/DataDog/terraform-aws-lambda-datadog?tab=readme-ov-file#inputs
[4]: /es/getting_started/site/
{{% /tab %}}
{{% tab "SST v3" %}}

Para configurar Datadog usando SST v3, siga estos pasos:

  ```ts
  const app = new sst.aws.Function("MyApp", {
    handler: "index.handler",
    nodejs : {
      install: [
        "datadog-lambda-js",
        "dd-trace",
      ]
    },
    environment: {
      DD_ENV: "<ENVIRONMENT>",
      DD_SERVICE: "<SERVICE_NAME>",
      DD_VERSION: "<VERSION>",
      DATADOG_API_KEY_SECRET_ARN: "<DATADOG_API_KEY_SECRET_ARN>",
      DD_SITE: "<DATADOG_SITE>",
    },
    layers: [
      $interpolate`arn:aws:lambda:${aws.getRegionOutput().name}:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}`,
      $interpolate`arn:aws:lambda:${aws.getRegionOutput().name}:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}`
    ]
  });
  ```

  1. Configure the Datadog Lambda Library and Datadog Lambda Extension layers

     - The available `<RUNTIME>` options are: {{< latest-lambda-layer-version layer="node-versions" >}}.

  2. Agregue `dd-trace` y `datadog-lambda-js` a la lista `nodejs.install`

  3. Complete los marcadores de posición de las variables de entorno:

     - Reemplace `<DATADOG_API_KEY_SECRET_ARN>` con el ARN del secreto de AWS donde su clave de API de Datadog está almacenada de forma segura. La clave debe ser almacenada como una cadena de texto sin formato (no un objeto JSON). Se requiere el permiso `secretsmanager:GetSecretValue`. Para pruebas rápidas, puede usar en su lugar la variable de entorno `DD_API_KEY` y establecer su clave de API de Datadog en texto plano.
     - Reemplace `<ENVIRONMENT>` con el entorno de la función Lambda, como `prod` o `staging`
     - Reemplace `<SERVICE_NAME>` con el nombre del servicio de la función Lambda
     - Reemplace `<DATADOG_SITE>` con {{< region-param key="dd_site" code="true" >}}. (Asegúrese de que el [sitio de Datadog][1] correcto esté seleccionado en esta página)
     - Reemplace `<VERSION>` con el número de versión de la función Lambda

  4. [Aplique el envoltorio de Datadog en su código de función][2]

[1]: /es/getting_started/site/
[2]: https://docs.datadoghq.com/es/serverless/guide/handler_wrapper
{{% /tab %}}
{{% tab "Personalizado" %}}

<div class="alert alert-info">Si no está utilizando una herramienta de desarrollo serverless que Datadog soporte, como el Serverless Framework o AWS CDK, Datadog le anima encarecidamente a instrumentar sus aplicaciones Serverless con el <a href="./?tab=datadogcli">CLI de Datadog</a>.</div>

1. Instale la biblioteca de Lambda de Datadog

    La biblioteca de Lambda de Datadog se puede importar ya sea como una capa (recomendada) _O_ como un paquete de JavaScript.

    La versión menor del paquete `datadog-lambda-js` siempre coincide con la versión de la capa. Por ejemplo, datadog-lambda-js v0.5.0 coincide con el contenido de la versión de la capa 5.

    - Opción A: [Configure las capas][1] para su función Lambda usando el ARN en el siguiente formato:

      ```sh
      # Use this format for AWS commercial regions
      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}

      # Use this format for AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}
      ```

      Replace `<AWS_REGION>` with a valid AWS region such as `us-east-1`. The available `<RUNTIME>` options are: {{< latest-lambda-layer-version layer="node-versions" >}}.

    - Option B: If you cannot use the prebuilt Datadog Lambda layer, alternatively you can install the packages `datadog-lambda-js` and `dd-trace` using your favorite package manager.

      ```
      npm install datadog-lambda-js dd-trace
      ```

2. Instale la Lambda Extension de Datadog

    [Configure las capas][1] para su función Lambda usando el ARN en el siguiente formato:

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

    Replace `<AWS_REGION>` with a valid AWS region, such as `us-east-1`.

3. Redirija la función manejadora

    - Establezca el manejador de su función a `/opt/nodejs/node_modules/datadog-lambda-js/handler.handler` si usa la capa, o `node_modules/datadog-lambda-js/dist/handler.handler` si usa el paquete.
    - Establezca la variable de entorno `DD_LAMBDA_HANDLER` a su manejador original, por ejemplo, `myfunc.handler`.

    **Nota**: Si su función Lambda se ejecuta en `arm64` y la `datadog-lambda-js` biblioteca está instalada como un paquete NPM (opción B del paso 1), debe [aplicar el envoltorio de Datadog en su código de función][2] en su lugar. También podría ser necesario hacerlo si está utilizando una herramienta de seguridad o monitoreo de terceros que es incompatible con la redirección del manejador de Datadog.

4. Configure el sitio de Datadog y la clave de API

    - Establezca la variable de entorno `DD_SITE` a {{< region-param key="dd_site" code="true" >}} (Asegúrese de que el SITIO correcto esté seleccionado a la derecha).
    - Establezca la variable de entorno `DD_API_KEY_SECRET_ARN` con el ARN del secreto de AWS donde su [clave de API de Datadog][3] está almacenada de forma segura. La clave debe ser almacenada como una cadena de texto sin formato (no un objeto JSON). Se requiere el permiso `secretsmanager:GetSecretValue`. Para pruebas rápidas, puede usar `DD_API_KEY` en su lugar y establecer la clave de API de Datadog en texto plano.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://docs.datadoghq.com/es/serverless/guide/handler_wrapper
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

{{% svl-tracing-env %}}

<div class="alert alert-danger">No instale la biblioteca de Lambda de Datadog como una capa <i>y</i> como un paquete de JavaScript. Si instaló la biblioteca de Lambda de Datadog como una capa, no incluya <code>datadog-lambda-js</code> en su <code>package.json</code>, o instálelo como una dependencia de desarrollo y ejecute <code>npm install --production</code> antes de desplegar.</div>

## Cumplimiento de FIPS {#fips-compliance}

{{% svl-lambda-fips %}}

## AWS Lambda y VPC {#aws-lambda-and-vpc}

{{% svl-lambda-vpc %}}

## ¿Qué sigue? {#whats-next}

- Agregue etiquetas personalizadas a su telemetría utilizando la variable de entorno `DD_TAGS`
- Configure [la recolección de payloads][12] para capturar los payloads de solicitud y respuesta JSON de sus funciones.
- Si está utilizando la Lambda Extension de Datadog, desactive los registros de Lambda del Forwarder de Datadog
- Consulte [Configurar Serverless Monitoring para AWS Lambda][3] para obtener más información sobre las capacidades.

### Realice el seguimiento de la lógica de negocio personalizada {#monitor-custom-business-logic}

Para realizar el seguimiento de su lógica de negocio personalizada, envíe una métrica o un tramo personalizado utilizando el código de muestra a continuación. Para opciones adicionales, consulte [la presentación de métricas personalizadas para aplicaciones serverless][4] y la guía de APM para [instrumentación personalizada][5].

```javascript
const { sendDistributionMetric, sendDistributionMetricWithDate } = require('datadog-lambda-js');
const tracer = require('dd-trace');

// submit a custom span named "sleep"
const sleep = tracer.wrap('sleep', (ms) => {
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
        'coffee_house.order_value', // metric name
        12.45, // metric value
        'product:latte', // tag
        'order:online' // another tag
    );

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from serverless!')
    };
    return response;
};
```

## Lectura Adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /es/serverless/guide/troubleshoot_serverless_monitoring/
[3]: /es/serverless/configuration/
[4]: /es/serverless/custom_metrics?tab=nodejs
[5]: /es/tracing/custom_instrumentation/nodejs/
[6]: /es/security/application_security/serverless/
[7]: https://github.com/DataDog/datadog-lambda-extension
[8]: https://github.com/DataDog/datadog-lambda-extension/issues
[9]: /es/serverless/aws_lambda/distributed_tracing/#span-auto-linking
[10]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html
[11]: /es/serverless/aws_lambda/remote_instrumentation
[12]: /es/serverless/aws_lambda/configuration?tab=datadogcli#collect-the-request-and-response-payloads