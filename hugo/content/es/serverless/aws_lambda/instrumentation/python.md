---
algolia:
  tags:
  - python lambda traces
aliases:
- /es/serverless/datadog_lambda_library/python/
- /es/serverless/guide/python/
- /es/serverless/installation/python
- /es/serverless/aws_lambda/installation/python
further_reading:
- link: /serverless/configuration
  tag: Documentación
  text: Configurar Serverless Monitoring
- link: /serverless/guide/troubleshoot_serverless_monitoring
  tag: Documentación
  text: Solucionar problemas de Serverless Monitoring
- link: serverless/custom_metrics/
  tag: Documentación
  text: Enviar Custom Metrics desde aplicaciones Serverless
title: Instrumentar Aplicaciones Serverless en Python
---
<div class="alert alert-info">La versión 67+ de la Extensión de Datadog Lambda está optimizada para reducir significativamente la duración del inicio en frío. <a href="/serverless/aws_lambda/configuration/?tab=datadogcli#using-datadog-lambda-extension-v67">Leer más</a>.</div>

## Configurar {#setup}

{{< tabs >}}
{{% tab "Interfaz de Usuario de Datadog" %}}
Puedes instrumentar tu aplicación AWS Lambda en Python directamente dentro de Datadog. Navega a la página [Serverless > AWS Lambda][2] y selecciona [**Instrumentar Funciones**][3].

Para más información, consulta [Instrumentación remota para AWS Lambda][1].

[1]: /es/serverless/aws_lambda/remote_instrumentation
[2]: https://app.datadoghq.com/functions?cloud=aws
[3]: https://app.datadoghq.com/serverless/aws/lambda/setup
{{% /tab %}}
{{% tab "CLI de Datadog" %}}

El CLI de Datadog modifica las configuraciones de las funciones Lambda existentes para habilitar la instrumentación sin requerir un nuevo despliegue. Es la forma más rápida de comenzar con el monitoreo serverless de Datadog.

1. Instalar el cliente CLI de Datadog

    ```sh
    npm install -g @datadog/datadog-ci @datadog/datadog-ci-plugin-lambda
    ```

2. Si eres nuevo en Serverless Monitoring de Datadog, lanza la CLI de Datadog en modo interactivo para guiar tu primera instalación para un inicio rápido, y puedes ignorar los pasos restantes. Para instalar Datadog permanentemente en tus aplicaciones de producción, omite este paso y sigue los restantes para ejecutar el comando de la CLI de Datadog en tus canalizaciones de CI/CD _después_ de tu despliegue normal.

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

5. Configura la clave API de Datadog

    Datadog recomienda guardar la clave API de Datadog en AWS Secrets Manager por seguridad y fácil rotación. La clave debe ser almacenada como una cadena de texto sin formato (no un blob JSON). Asegúrate de que tus funciones Lambda tengan el permiso `secretsmanager:GetSecretValue` IAM requerido.

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

    For quick testing purposes, you can also set the Datadog API key in plaintext:

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

6. Instrumenta tus funciones Lambda

    **Nota**: Instrumenta tus funciones Lambda primero en un entorno de desarrollo o de pruebas. Si el resultado de la instrumentación no es satisfactorio, ejecuta `uninstrument` con los mismos argumentos para revertir los cambios.

    Para instrumentar tus funciones Lambda, ejecuta el siguiente comando.

    ```sh
    datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="python" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    

```

    To fill in the placeholders:
    - Replace `<functionname>` and `<another_functionname>` with your Lambda function names. Alternatively, you can use `--functions-regex` to automatically instrument multiple functions whose names match the given regular expression.
    - Replace `<aws_region>` with the AWS region name.

    Additional parameters can be found in the [CLI documentation][2].


[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/es/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

El [Plugin Serverless de Datadog][1] configura automáticamente tus funciones para enviar métricas, trazas y registros a Datadog a través de la [Extensión Lambda de Datadog][2].

Para instalar y configurar el Plugin Serverless de Datadog, sigue estos pasos:

1. Instala el complemento sin servidor de Datadog:

    ```sh
    serverless plugin install --name serverless-plugin-datadog
    ```

2. Actualiza tu `serverless.yml`:

    ```yaml
    custom:
      datadog:
        site: <DATADOG_SITE>
        apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
    ```

    To fill in the placeholders:
    - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (asegúrate de que el SITIO correcto esté seleccionado a la derecha).
    - Reemplaza `<DATADOG_API_KEY_SECRET_ARN>` con el ARN del secreto de AWS donde tu [clave de API de Datadog][3] está almacenada de forma segura. La clave debe ser almacenada como una cadena de texto sin formato (no un blob JSON). Se requiere el permiso `secretsmanager:GetSecretValue`. Para pruebas rápidas, puedes usar `apiKey` y establecer la clave de API de Datadog en texto plano.

    For more information and additional settings, see the [plugin documentation][1].

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/es/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "AWS SAM" %}}

El [macro de CloudFormation de Datadog][1] transforma automáticamente tu plantilla de aplicación SAM para instalar Datadog en tus funciones utilizando capas de Lambda, y configura tus funciones para enviar métricas, trazas y registros a Datadog a través de la [Extensión de Lambda de Datadog][2].

1. Instala el macro de CloudFormation de Datadog

    Ejecuta el siguiente comando con tus [credenciales de AWS][3] para desplegar una pila de CloudFormation que instala el recurso macro de AWS. Solo necesitas instalar el macro **una** vez para una región dada en tu cuenta. Reemplaza `create-stack` con `update-stack` para actualizar el macro a la última versión.

    ```sh
    aws cloudformation create-stack \
      --stack-name datadog-serverless-macro \
      --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
      --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
    ```

    The macro is now deployed and ready to use.

2. Instrumenta tus funciones Lambda

    Agrega la transformación `DatadogServerless` **después** de la transformación `AWS::Serverless` en la sección `Transform` de tu archivo `template.yml` para SAM.

    ```yaml
    Transform:
      - AWS::Serverless-2016-10-31
      - Name: DatadogServerless
        Parameters:
          stackName: !Ref "AWS::StackName"
          pythonLayerVersion: {{< latest-lambda-layer-version layer="python" >}}
          extensionLayerVersion: {{< latest-lambda-layer-version layer="extension" >}}
          site: "<DATADOG_SITE>"
          apiKeySecretArn: "<DATADOG_API_KEY_SECRET_ARN>"
    ```

    To fill in the placeholders:
    - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (asegúrate de que el SITIO correcto esté seleccionado a la derecha).
    - Reemplaza `<DATADOG_API_KEY_SECRET_ARN>` con el ARN del secreto de AWS donde tu [clave de API de Datadog][4] está almacenada de forma segura. La clave debe ser almacenada como una cadena de texto sin formato (no un blob JSON). Se requiere el permiso `secretsmanager:GetSecretValue`. Para pruebas rápidas, puedes usar `apiKey` en su lugar y establecer la clave de API de Datadog en texto plano.

    More information and additional parameters can be found in the [macro documentation][1].


[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/es/serverless/libraries_integrations/extension
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}

{{% tab "AWS CDK" %}}
{{< lambda-install-cdk language="python" layer="python" layerParamTypescript="pythonLayerVersion" layerParamPython="python_layer_version">}}

{{% /tab %}}
{{% tab "Imagen de contenedor" %}}

1. Instala la biblioteca de Lambda de Datadog

    Si estás implementando tu función Lambda como una imagen de contenedor, no puedes usar la biblioteca Datadog Lambda como una capa de Lambda. En su lugar, debes instalar la biblioteca Datadog Lambda como una dependencia de tu función dentro de la imagen.

    ```sh
    pip install datadog-lambda
    ```

    Note that the minor version of the `datadog-lambda` package always matches the layer version. For example, `datadog-lambda v0.5.0` matches the content of layer version 5.

2. Instala la Extensión Datadog Lambda

    Agrega la Extensión Datadog Lambda a tu imagen de contenedor añadiendo lo siguiente a tu Dockerfile:

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/. /opt/
    ```

    Replace `<TAG>` with either a specific version number (for example, `{{< latest-lambda-layer-version layer="extension" >}}`) or with `último`. Alpine is also supported with specific version numbers (such as `{{< latest-lambda-layer-version layer="extension" >}}-alpine`) or with `último-alpine`. Puedes ver una lista completa de posibles etiquetas en el [repositorio de Amazon ECR][1].

3. Redirige la función manejadora

    - Establece el valor de `CMD` de tu imagen a `datadog_lambda.handler.handler`. Puedes establecer esto en AWS o directamente en tu Dockerfile. Ten en cuenta que el valor establecido en AWS anula el valor en el Dockerfile si estableces ambos.
    - Establece la variable de entorno `DD_LAMBDA_HANDLER` a tu manejador original, por ejemplo, `myfunc.handler`.

    **Nota**: Si estás utilizando una herramienta de seguridad o monitoreo de terceros que es incompatible con la redirección del manejador Datadog, puedes [aplicar el envoltorio de Datadog en el código de tu función][2] en su lugar.

4. Configura el sitio de Datadog, la clave de API y el trazado en tu Dockerfile

    - Establece la variable de entorno `DD_SITE` a {{< region-param key="dd_site" code="true" >}} (asegúrate de que el SITIO correcto esté seleccionado a la derecha).
    - Establece la variable de entorno `DD_API_KEY_SECRET_ARN` con el ARN del secreto de AWS donde se almacena de forma segura tu [clave API de Datadog][3]. La clave debe ser almacenada como una cadena de texto sin formato (no un blob JSON). Se requiere el permiso `secretsmanager:GetSecretValue`. Para pruebas rápidas, puedes usar `DD_API_KEY` en su lugar y establecer la clave de API de Datadog en texto plano.
    - Establece la variable de entorno `DD_TRACE_ENABLED` a `true`.


[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://docs.datadoghq.com/es/serverless/guide/handler_wrapper
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Terraform" %}}

El módulo de Terraform [`lambda-datadog`][1] envuelve el recurso [`aws_lambda_function`][2] y configura automáticamente tu función Lambda para el monitoreo Serverless de Datadog mediante:

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
  datadog_python_layer_version = {{< latest-lambda-layer-version layer="python" >}}

  # aws_lambda_function arguments
}
```

1. Reemplaza el recurso `aws_lambda_function` con el módulo de Terraform `lambda-datadog`. Luego, especifica el `source` y el `version` del módulo.

2. Establece los argumentos `aws_lambda_function`:

   Todos los argumentos disponibles en el recurso `aws_lambda_function` están disponibles en este módulo de Terraform. Los argumentos definidos como bloques en el recurso `aws_lambda_function` se redefinen como variables con sus argumentos anidados.

   Por ejemplo, en `aws_lambda_function`, `environment` se define como un bloque con un argumento `variables`. En el módulo de Terraform `lambda-datadog`, el valor para el `environment_variables` se pasa al argumento `environment.variables` en `aws_lambda_function`. Consulta [inputs][3] para una lista completa de variables en este módulo.

3. Complete los marcadores de posición de las variables de entorno:

   - Reemplace `<DATADOG_API_KEY_SECRET_ARN>` con el ARN del secreto de AWS donde se almacena de forma segura su clave API de Datadog. La clave debe ser almacenada como una cadena de texto sin formato (no un blob JSON). Se requiere el permiso `secretsmanager:GetSecretValue`. Para pruebas rápidas, puede usar en su lugar la variable de entorno `DD_API_KEY` y establecer su clave API de Datadog en texto plano.
   - Reemplace `<ENVIRONMENT>` con el entorno de la función Lambda, como `prod` o `staging`
   - Reemplace `<SERVICE_NAME>` con el nombre del servicio de la función Lambda
   - Reemplace `<DATADOG_SITE>` con {{< region-param key="dd_site" code="true" >}}. (Asegúrese de que el [sitio de Datadog][4] correcto esté seleccionado en esta página).
   - Reemplace `<VERSION>` con el número de versión de la función Lambda

4. Seleccione las versiones de la capa de extensión de Datadog Lambda y la capa de Datadog Python Lambda que desea utilizar. Si se deja en blanco, se utilizarán las versiones más recientes de la capa.

```
  datadog_extension_layer_version = {{< latest-lambda-layer-version layer="extension" >}}
  datadog_python_layer_version = {{< latest-lambda-layer-version layer="python" >}}
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
    handler: "lambda_function.lambda_handler",
    runtime: "python3.13",
    environment: {
      DD_ENV: "<ENVIRONMENT>",
      DD_SERVICE: "<SERVICE_NAME>",
      DD_VERSION: "<VERSION>",
      DATADOG_API_KEY_SECRET_ARN: "<DATADOG_API_KEY_SECRET_ARN>",
      DD_SITE: "<DATADOG_SITE>",
    },
    layers: [
      $interpolate`arn:aws:lambda:${aws.getRegionOutput().name}:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}`,
      $interpolate`arn:aws:lambda:${aws.getRegionOutput().name}:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="python" >}}`
    ]
  });
  ```

  1. Configure the Datadog Lambda Library and Datadog Lambda Extension layers

     - The available `<RUNTIME>` options are: {{< latest-lambda-layer-version layer="python-versions" >}}.

  2. Complete los marcadores de posición de las variables de entorno:
     - Reemplace `<DATADOG_API_KEY_SECRET_ARN>` con el ARN del secreto de AWS donde se almacena de forma segura su clave API de Datadog. La clave debe ser almacenada como una cadena de texto sin formato (no un blob JSON). Se requiere el permiso `secretsmanager:GetSecretValue`. Para pruebas rápidas, puedes usar en su lugar la variable de entorno `DD_API_KEY` y establecer tu clave de API de Datadog en texto plano.
     - Reemplace `<ENVIRONMENT>` con el entorno de la función Lambda, como `prod` o `staging`
     - Reemplace `<SERVICE_NAME>` con el nombre del servicio de la función Lambda
     - Reemplace `<DATADOG_SITE>` con {{< region-param key="dd_site" code="true" >}}. (Asegúrese de que el [sitio de Datadog][1] correcto esté seleccionado en esta página).
     - Reemplace `<VERSION>` con el número de versión de la función Lambda

  3. [Aplique el envoltorio de Datadog en el código de su función][2]

[1]: /es/getting_started/site/
[2]: https://docs.datadoghq.com/es/serverless/guide/handler_wrapper

{{% /tab %}}
{{% tab "Personalizado" %}}

<div class="alert alert-info">Si no está utilizando una herramienta de desarrollo Serverless que Datadog soporte, como Serverless Framework o AWS CDK, Datadog le recomienda encarecidamente instrumentar sus aplicaciones Serverless con el <a href="./?tab=datadogcli">Datadog CLI</a>.</div>

1. Instale la biblioteca de Lambda de Datadog

    La biblioteca de Lambda de Datadog se puede importar ya sea como una capa (recomendada) _O_ como un paquete de Python.

    La versión menor del `datadog-lambda` paquete siempre coincide con la versión de la capa. Por ejemplo, datadog-lambda v0.5.0 coincide con el contenido de la versión de la capa 5.

    - Opción A: [Configure las capas][1] para su función Lambda utilizando el ARN en el siguiente formato:

      ```sh
      # Use this format for x86-based Lambda deployed in AWS commercial regions
      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="python" >}}

      # Use this format for arm64-based Lambda deployed in AWS commercial regions
      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>-ARM:{{< latest-lambda-layer-version layer="python" >}}

      # Use this format for x86-based Lambda deployed in AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="python" >}}

      # Use this format for arm64-based Lambda deployed in AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>-ARM:{{< latest-lambda-layer-version layer="python" >}}
      ```

      Replace `<AWS_REGION>` with a valid AWS region, such as `us-east-1`. The available `<RUNTIME>` options are: {{< latest-lambda-layer-version layer="python-versions" >}}.

    - Option B: If you cannot use the prebuilt Datadog Lambda layer, alternatively install the `datadog-lambda` package and its dependencies locally to your function project folder using your favorite Python package manager, such as `pip`.

      ```sh
      pip install datadog-lambda -t ./
      ```

      **Note**: `datadog-lambda` depends on `ddtrace`, which uses native extensions; therefore it must be installed and compiled in a Linux environment on the right architecture (`x86_64` or `arm64`). For example, you can use [dockerizePip][2] for the Serverless Framework and [--use-container][3] for AWS SAM. For more details, see [how to add dependencies to your function deployment package][4].

      See the [latest release][5].

2. Instale la Lambda Extension de Datadog

    [Configure las capas][1] para su función Lambda utilizando el ARN en el siguiente formato:

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

    - Establezca el manejador de su función a `datadog_lambda.handler.handler`.
    - Establezca la variable de entorno `DD_LAMBDA_HANDLER` a su manejador original, por ejemplo, `myfunc.handler`.

    **Nota**: Si está utilizando una herramienta de seguridad o monitoreo de terceros que es incompatible con la redirección del manejador de Datadog, puede [Aplique el envoltorio de Datadog en el código de su función][6] en su lugar.

4. Configure el sitio de Datadog, la clave de API y el rastreo

    - Establezca la variable de entorno `DD_SITE` a {{< region-param key="dd_site" code="true" >}} (Asegúrese de que el SITIO correcto esté seleccionado a la derecha).
    - Establezca la variable de entorno `DD_API_KEY_SECRET_ARN` con el ARN del secreto de AWS donde su [clave de API de Datadog][7] está almacenada de forma segura. La clave necesita ser almacenada como una cadena de texto sin formato, en lugar de estar dentro de un blob JSON. Se requiere el permiso `secretsmanager:GetSecretValue`. Para pruebas rápidas, puede usar `DD_API_KEY` en su lugar y establecer la clave de API de Datadog en texto sin formato.
    - Establezca la variable de entorno `DD_TRACE_ENABLED` a `true`.

5. (Solo AWS Chalice) Registre el middleware

    Si está utilizando [AWS Chalice][8], debe instalar `datadog-lambda` usando `pip`, y registrar `datadog_lambda_wrapper` como un [middleware][9] en su `app.py`:

    ```python
    from chalice import Chalice, ConvertToMiddleware
    from datadog_lambda.wrapper import datadog_lambda_wrapper

    app = Chalice(app_name='hello-chalice')

    app.register_middleware(ConvertToMiddleware(datadog_lambda_wrapper))

    @app.route('/')
    def index():
        return {'hello': 'world'}
    ```

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://github.com/UnitedIncome/serverless-python-requirements#cross-compiling
[3]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-build.html
[4]: https://docs.aws.amazon.com/lambda/latest/dg/python-package.html#python-package-dependencies
[5]: https://pypi.org/project/datadog-lambda/
[6]: https://docs.datadoghq.com/es/serverless/guide/handler_wrapper
[7]: https://app.datadoghq.com/organization-settings/api-keys
[8]: https://aws.github.io/chalice/
[9]: https://aws.github.io/chalice/topics/middleware.html
{{% /tab %}}
{{< /tabs >}}

{{% svl-tracing-env %}}

## Cumplimiento de FIPS {#fips-compliance}

{{% svl-lambda-fips %}}

## AWS Lambda y VPC {#aws-lambda-and-vpc}

{{% svl-lambda-vpc %}}

## ¿Qué sigue? {#whats-next}

- Agregue etiquetas personalizadas a su telemetría utilizando la variable de entorno `DD_TAGS`
- Configure [la recolección de payloads][12] para capturar los payloads de solicitud y respuesta JSON de sus funciones
- Si está utilizando la Lambda Extension de Datadog, desactive los registros de Lambda del Forwarder de Datadog
- Consulte [Configurar Monitoreo Serverless para AWS Lambda][3] para más capacidades

### Seguimiento de la lógica de negocio personalizada {#monitor-custom-business-logic}

Para el seguimiento de su lógica de negocio personalizada, envíe una métrica o un span personalizado utilizando el código de muestra a continuación. Para opciones adicionales, consulte [el envío de métricas personalizadas para aplicaciones serverless][4] y la guía de APM para [instrumentación personalizada][5].

```python
import time
from ddtrace import tracer
from datadog_lambda.metric import lambda_metric

def lambda_handler(event, context):
    # add custom tags to the lambda function span,
    # does NOT work when X-Ray tracing is enabled
    current_span = tracer.current_span()
    if current_span:
        current_span.set_tag('customer.id', '123456')

    # submit a custom span
    with tracer.trace("hello.world"):
        print('Hello, World!')

    # submit a custom metric
    lambda_metric(
        metric_name='coffee_house.order_value',
        value=12.45,
        tags=['product:latte', 'order:online']
    )

    return {
        'statusCode': 200,
        'body': get_message()
    }

# trace a function
@tracer.wrap()
def get_message():
    return 'Hello from serverless!'
```

## Lectura Adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /es/serverless/guide/troubleshoot_serverless_monitoring/
[3]: /es/serverless/configuration/
[4]: /es/serverless/aws_lambda/metrics/?code-lang=python
[5]: /es/tracing/custom_instrumentation/python/
[6]: /es/security/application_security/serverless/
[7]: https://github.com/DataDog/datadog-lambda-extension
[8]: https://github.com/DataDog/datadog-lambda-extension/issues
[9]: /es/serverless/aws_lambda/distributed_tracing/#span-auto-linking
[10]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html
[11]: /es/serverless/aws_lambda/remote_instrumentation
[12]: /es/serverless/aws_lambda/configuration?tab=datadogcli#collect-the-request-and-response-payloads