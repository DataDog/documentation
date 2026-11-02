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
  text: Envío de Custom Metrics desde aplicaciones Serverless
title: Instrumentación de aplicaciones Serverless de Python
---
<div class="alert alert-info">La versión 67+ de la Datadog Lambda Extension está optimizada para reducir significativamente la duración del arranque en frío. <a href="/serverless/aws_lambda/configuration/?tab=datadogcli#using-datadog-lambda-extension-v67">Leer más</a>.</div>

## Configuración {#setup}

{{< tabs >}}
{{% tab "Datadog UI" %}}
Puede instrumentar su aplicación Python AWS Lambda directamente dentro de Datadog. Navegue a la página [{{< ui >}}Serverless{{< /ui >}} > {{< ui >}}AWS Lambda{{< /ui >}}][2] y seleccione [{{< ui >}}Settings{{< /ui >}}][3]. En la sección {{< ui >}}Remote Instrumentation{{< /ui >}}, seleccione la pestaña {{< ui >}}AWS Lambda{{< /ui >}}.

Para obtener más información, consulte [Instrumentación remota para AWS Lambda][1].

[1]: /es/serverless/aws_lambda/remote_instrumentation
[2]: https://app.datadoghq.com/serverless/aws/lambda
[3]: https://app.datadoghq.com/serverless/settings?serverless__section=aws-lambda
{{% /tab %}}
{{% tab "Datadog CLI" %}}

Datadog CLI modifica las configuraciones de las funciones Lambda existentes para habilitar la instrumentación sin necesidad de una nueva implementación. Es la forma más rápida de comenzar con Serverless Monitoring de Datadog.

1. Instale el cliente de Datadog CLI

    ```sh
    npm install -g @datadog/datadog-ci @datadog/datadog-ci-plugin-lambda
    ```

2. Si es nuevo en Serverless Monitoring de Datadog, inicie Datadog CLI en modo interactivo para que lo guíe en su primera instalación para un inicio rápido, y puede ignorar los pasos restantes. Para instalar Datadog de forma permanente para sus aplicaciones de producción, omita este paso y siga los restantes para ejecutar el comando de Datadog CLI en sus pipelines de CI/CD _después_ de su despliegue normal.

    ```sh
    datadog-ci lambda instrument -i
    ```

3. Configure las credenciales de AWS

    Datadog CLI requiere acceso al servicio AWS Lambda y depende de AWS JavaScript SDK para [resolver las credenciales][1]. Asegúrese de que sus credenciales de AWS estén configuradas utilizando el mismo método que usaría al invocar AWS CLI.

4. Configure el sitio de Datadog

    ```sh
    export DATADOG_SITE="<DATADOG_SITE>"
    ```

    Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (asegúrese de que el SITE correcto esté seleccionado a la derecha).

5. Configure la clave de Datadog API

    Datadog recomienda guardar la clave de Datadog API en AWS Secrets Manager por seguridad y para facilitar su rotación. La clave debe almacenarse como una cadena de texto plano (no como un blob JSON). Asegúrese de que sus funciones Lambda tengan el permiso de IAM `secretsmanager:GetSecretValue` requerido.

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

    For quick testing purposes, you can also set the Datadog API key in plaintext:

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

6. Instrumente las funciones Lambda

    **Nota**: Instrumente primero sus funciones Lambda en un entorno de desarrollo o staging. Si el resultado de la instrumentación no es satisfactorio, ejecute `uninstrument` con los mismos argumentos para revertir los cambios.

    Para instrumentar las funciones Lambda, ejecute el siguiente comando.

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

El [Datadog Serverless Plugin][1] configura automáticamente sus funciones para enviar métricas, trazas y registros a Datadog a través de la [Datadog Lambda Extension][2].

Para instalar y configurar el Datadog Serverless Plugin, siga estos pasos:

1. Instale el Datadog Serverless Plugin:

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
    - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (asegúrese de que el SITE correcto esté seleccionado a la derecha).
    - Reemplace `<DATADOG_API_KEY_SECRET_ARN>` con el ARN del secreto de AWS donde su [clave de Datadog API][3] está almacenada de forma segura. La clave debe almacenarse como una cadena de texto plano (no como un blob JSON). Se requiere el permiso `secretsmanager:GetSecretValue`. Para pruebas rápidas, puede usar `apiKey` en su lugar y configurar la clave de Datadog API en texto plano.

    For more information and additional settings, see the [plugin documentation][1].

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/es/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "AWS SAM" %}}

El [Datadog CloudFormation macro][1] transforma automáticamente su plantilla de aplicación SAM para instalar Datadog en sus funciones mediante capas de Lambda, y configura sus funciones para enviar métricas, trazas y registros a Datadog a través de la [Datadog Lambda Extension][2].

1. Instale el Datadog CloudFormation macro

    Ejecute el siguiente comando con sus [credenciales de AWS][3] para implementar una pila de CloudFormation que instale el recurso de AWS de la macro. Solo necesita instalar la macro **una vez** para una región determinada en su cuenta. Reemplace `create-stack` con `update-stack` para actualizar la macro a la versión más reciente.

    ```sh
    aws cloudformation create-stack \
      --stack-name datadog-serverless-macro \
      --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
      --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
    ```

    The macro is now deployed and ready to use.

2. Instrumente las funciones Lambda

    Agregue la transformación `DatadogServerless` **después** de la transformación `AWS::Serverless` en la sección `Transform` para SAM en su archivo `template.yml`.

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
    - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (asegúrese de que el SITE correcto esté seleccionado a la derecha).
    - Reemplace `<DATADOG_API_KEY_SECRET_ARN>` con el ARN del secreto de AWS donde su [clave de Datadog API][4] está almacenada de forma segura. La clave debe almacenarse como una cadena de texto plano (no como un blob JSON). Se requiere el permiso `secretsmanager:GetSecretValue`. Para pruebas rápidas, puede usar `apiKey` en su lugar y establecer la clave de Datadog API en texto plano.

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

1. Instale el Datadog Lambda Library

    Si está implementando su función Lambda como una imagen de contenedor, no puede utilizar la biblioteca Datadog Lambda como una capa Lambda. En su lugar, debe instalar la biblioteca Datadog Lambda como una dependencia de su función dentro de la imagen.

    ```sh
    pip install datadog-lambda
    ```

    Note that the minor version of the `datadog-lambda` package always matches the layer version. For example, `datadog-lambda v0.5.0` matches the content of layer version 5.

2. Instale Datadog Lambda Extension

    Agregue la Datadog Lambda Extension a su imagen de contenedor añadiendo lo siguiente a su Dockerfile:

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/. /opt/
    ```

    Replace `<TAG>` with either a specific version number (for example, `{{< latest-lambda-layer-version layer="extension" >}}`) or with `latest`. Alpine is also supported with specific version numbers (such as `{{< latest-lambda-layer-version layer="extension" >}}-alpine`) or with `latest-alpine`. Puede ver una lista completa de las etiquetas posibles en el [repositorio de Amazon ECR][1].

3. Redirija la función del controlador

    - Establezca el valor `CMD` de su imagen en `datadog_lambda.handler.handler`. Puede establecer esto en AWS o directamente en su Dockerfile. Tenga en cuenta que el valor establecido en AWS anula el valor en el Dockerfile si establece ambos.
    - Establezca la variable de entorno `DD_LAMBDA_HANDLER` en su controlador original, por ejemplo, `myfunc.handler`.

    **Nota**: Si utiliza una herramienta de seguridad o monitoreo de terceros que es incompatible con la redirección del controlador de Datadog, puede [aplicar el wrapper de Datadog en el código de su función][2] en su lugar.

4. Configure el sitio de Datadog, la clave de API y el rastreo en su Dockerfile

    - Establezca la variable de entorno `DD_SITE` en {{< region-param key="dd_site" code="true" >}} (asegúrese de que el SITE correcto esté seleccionado a la derecha).
    - Establezca la variable de entorno `DD_API_KEY_SECRET_ARN` con el ARN del secreto de AWS donde su [clave de Datadog API][3] está almacenada de forma segura. La clave debe almacenarse como una cadena de texto plano (no como un blob JSON). Se requiere el permiso `secretsmanager:GetSecretValue`. Para pruebas rápidas, puede usar `DD_API_KEY` en su lugar y establecer la clave de Datadog API en texto plano.
    - Establezca la variable de entorno `DD_TRACE_ENABLED` en `true`.


[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://docs.datadoghq.com/es/serverless/guide/handler_wrapper
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Terraform" %}}

El módulo de Terraform [`lambda-datadog`][1] envuelve el recurso [`aws_lambda_function`][2] y configura automáticamente su función Lambda para Datadog Serverless Monitoring mediante:

- Agregar Datadog Lambda layers
- Redirigir el controlador de Lambda
- Habilitar la recopilación y el envío de métricas, trazas y registros a Datadog

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

1. Reemplace el recurso `aws_lambda_function` con el módulo de Terraform `lambda-datadog`. Luego, especifique la `source` y `version` del módulo.

2. Establezca los argumentos `aws_lambda_function`:

   Todos los argumentos disponibles en el recurso `aws_lambda_function` están disponibles en este módulo de Terraform. Los argumentos definidos como bloques en el recurso `aws_lambda_function` se redefinen como variables con sus argumentos anidados.

   Por ejemplo, en `aws_lambda_function`, `environment` se define como un bloque con un argumento `variables`. En el módulo de Terraform `lambda-datadog`, el valor para `environment_variables` se pasa al argumento `environment.variables` en `aws_lambda_function`. Consulte [inputs][3] para obtener una lista completa de las variables en este módulo.

3. Complete los marcadores de posición de las variables de entorno:

   - Reemplace `<DATADOG_API_KEY_SECRET_ARN>` con el ARN del secreto de AWS donde se almacena de forma segura su clave de Datadog API. La clave debe almacenarse como una cadena de texto plano (no como un blob JSON). Se requiere el permiso `secretsmanager:GetSecretValue`. Para pruebas rápidas, puede usar en su lugar la variable de entorno `DD_API_KEY` y establecer su clave de Datadog API en texto plano.
   - Reemplace `<ENVIRONMENT>` con el entorno de la función Lambda, como `prod` o `staging`
   - Reemplace `<SERVICE_NAME>` con el nombre del servicio de la función Lambda
   - Reemplace `<DATADOG_SITE>` con {{< region-param key="dd_site" code="true" >}}. (Asegúrese de que el [sitio de Datadog][4] correcto esté seleccionado en esta página).
   - Reemplace `<VERSION>` con el número de versión de la función Lambda

4. Seleccione las versiones de Datadog Lambda Extension y de Datadog Python Lambda layer que desea utilizar. Si se deja en blanco, se utilizarán las versiones más recientes de la capa.

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
      $interpolate`arn:aws:lambda:${aws.getRegionOutput().name}:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="python" >}}`,
    ],
  });
  ```

  1. Configure the Datadog Lambda Library and Datadog Lambda Extension layers

     - The available `<RUNTIME>` options are: {{< latest-lambda-layer-version layer="python-versions" >}}.

  2. Complete los marcadores de posición de las variables de entorno:
     - Reemplace `<DATADOG_API_KEY_SECRET_ARN>` con el ARN del secreto de AWS donde se almacena de forma segura su clave de Datadog API. La clave debe almacenarse como una cadena de texto plano (no como un blob JSON). Se requiere el permiso `secretsmanager:GetSecretValue`. Para pruebas rápidas, puede usar en su lugar la variable de entorno `DD_API_KEY` y establecer su clave de Datadog API en texto plano.
     - Reemplace `<ENVIRONMENT>` con el entorno de la función Lambda, como `prod` o `staging`
     - Reemplace `<SERVICE_NAME>` con el nombre del servicio de la función Lambda
     - Reemplace `<DATADOG_SITE>` con {{< region-param key="dd_site" code="true" >}}. (Asegúrese de que el [sitio de Datadog][1] correcto esté seleccionado en esta página).
     - Reemplace `<VERSION>` con el número de versión de la función Lambda

  3. [Aplique el wrapper de Datadog en el código de su función][2]

[1]: /es/getting_started/site/
[2]: https://docs.datadoghq.com/es/serverless/guide/handler_wrapper

{{% /tab %}}
{{% tab "Personalizado" %}}

<div class="alert alert-info">Si no está utilizando una herramienta de desarrollo sin servidor que Datadog admita, como Serverless Framework o AWS CDK, Datadog le recomienda encarecidamente que instrumente sus aplicaciones sin servidor con la <a href="./?tab=datadogcli">Datadog CLI</a>.</div>

1. Instale Datadog Lambda Library

    La Datadog Lambda Library se puede importar ya sea como una capa (recomendado) _O_ como un paquete de Python.

    La versión menor del paquete `datadog-lambda` siempre coincide con la versión de la capa. Por ejemplo, datadog-lambda v0.5.0 coincide con el contenido de la versión 5 de la capa.

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

2. Instale Datadog Lambda Extension

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

3. Redirija la función del controlador

    - Establezca el controlador de su función en `datadog_lambda.handler.handler`.
    - Establezca la variable de entorno `DD_LAMBDA_HANDLER` en su controlador original, por ejemplo, `myfunc.handler`.

    **Nota**: Si utiliza una herramienta de seguridad o monitoreo de terceros que sea incompatible con la redirección del controlador de Datadog, puede [aplicar el wrapper de Datadog en el código de su función][6] en su lugar.

4. Configure el sitio de Datadog, la clave de API y el rastreo

    - Establezca la variable de entorno `DD_SITE` en {{< region-param key="dd_site" code="true" >}} (asegúrese de que el SITE correcto esté seleccionado a la derecha).
    - Establezca la variable de entorno `DD_API_KEY_SECRET_ARN` con el ARN del secreto de AWS donde su [clave de Datadog API][7] está almacenada de forma segura. La clave debe almacenarse como una cadena de texto sin formato, en lugar de estar dentro de un blob JSON. Se requiere el permiso `secretsmanager:GetSecretValue`. Para pruebas rápidas, puede usar `DD_API_KEY` en su lugar y establecer la clave de Datadog API en texto plano.
    - Establezca la variable de entorno `DD_TRACE_ENABLED` en `true`.

5. (Solo para AWS Chalice) Registre el middleware

    Si utiliza [AWS Chalice][8], debe instalar `datadog-lambda` usando `pip` y registrar `datadog_lambda_wrapper` como un [middleware][9] en su `app.py`:

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

## Durable Function {#durable-function}

{{< site-region region="gov,gov2" >}}<div class="alert alert-warning">Esta función no está disponible para {{< region-param key="dd_site_name" >}}.</div>{{< /site-region >}}

{{% svl-lambda-durable-function %}}

## ¿Qué sigue? {#whats-next}

- Agregue etiquetas personalizadas a su telemetría usando la variable de entorno `DD_TAGS`
- Configure [la recopilación de carga útil][12] para capturar las cargas útiles de solicitud y respuesta JSON de sus funciones
- Si está utilizando Datadog Lambda Extension, desactive los registros Lambda del Datadog Forwarder
- Consulte [Configure Serverless Monitoring for AWS Lambda][3] para obtener más capacidades

### Haga un seguimiento de la lógica de negocio personalizada {#monitor-custom-business-logic}

Para hacer un seguimiento de su lógica de negocio personalizada, envíe una métrica o un span personalizado utilizando el código de ejemplo a continuación. Para opciones adicionales, consulte [envío de métricas personalizadas para aplicaciones sin servidor][4] y la guía de APM para [instrumentación personalizada][5].

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

## Lecturas adicionales {#further-reading}

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