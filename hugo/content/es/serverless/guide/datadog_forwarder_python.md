---
title: Instrumentación de aplicaciones serverless de Python mediante el Datadog Forwarder
---
## Información general

<div class="alert alert-danger">
Si recién empiezas a utilizar Datadog Serverless, sigue las <a href="/serverless/installation/python">instrucciones para instrumentar tus funciones Lambda utilizando la extensión Lambda en Datadog</a>. Si configuraste Datadog Serverless con el Datadog Forwarder antes de que Lambda ofreciera la funcionalidad predefinida, utiliza esta guía para conservar tu instancia.
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
- Reemplaza `<layer_version>` por la versión de la biblioteca Lambda de Datadog que quieres utilizar. La última versión es `{{< latest-lambda-layer-version layer="python" >}}`.
- Reemplaza `<forwarder_arn>` por el nombre de recurso de Amazon (ARN) del Forwarder (consulta la [documentación del Forwarder][2]).

Por ejemplo:

```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -v {{< latest-lambda-layer-version layer="python" >}} --forwarder "arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder"
```

Si configuraste tu función de Lambda para utilizar la firma de código, debes añadir el ARN del perfil de firma de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) a la [configuración de firma de código][5] de tu función antes de poder instrumentarla con la Datadog CLI.

Obtén más información y parámetros adicionales en la [documentación de la CLI][4].

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/es/serverless/forwarder/
[4]: https://docs.datadoghq.com/es/serverless/serverless_integrations/cli
[5]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "Serverless Framework" %}}

El complemento [Datadog Serverless Plugin][1] añade la biblioteca Lambda de Datadog automáticamente a tus funciones mediante una capa y configura las funciones para enviar métricas, trazas y logs a Datadog a través del [Datadog Forwarder][2].

Si configuraste tu función de Lambda para utilizar la firma de código, debes añadir el ARN del perfil de firma de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) a la [configuración de firma de código][4] de tu función antes de poder instalar el Datadog Serverless Plugin.

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

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/es/serverless/forwarder/
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "AWS SAM" %}}

La [macro de CloudFormation de Datadog][1] transforma automáticamente tu plantilla de aplicación de SAM para añadir la biblioteca Lambda de Datadog a tus funciones mediante las capas. Además, configura las funciones para enviar métricas, trazas y logs a Datadog a través del [Datadog Forwarder][2].

### Instalar

Ejecuta el siguiente comando con tus [credenciales de AWS][3] para desplegar un stack tecnológico de CloudFormation que instale el recurso de AWS de la macro. Solo tienes que instalar la macro **una vez** en una región determinada de tu cuenta. Luego, debes reemplazar `create-stack` por `update-stack` para actualizar la macro a la versión más reciente.

```sh
aws cloudformation create-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

Con estos pasos, la macro ya está desplegada y lista para usar.

### Instrumentar

Para instrumentar tu función, añade lo siguiente al archivo `template.yml` en la sección `Transform` (Transformación), **después** de la transformación `AWS::Serverless` para SAM.

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      pythonLayerVersion: "{{< latest-lambda-layer-version layer="python" >}}"
      stackName: !Ref "AWS::StackName"
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

La [macro de CloudFormation de Datadog][1] transforma automáticamente tu plantilla de aplicación de CloudFormation generada con el AWS CDK para añadir la biblioteca Lambda de Datadog a tus funciones mediante capas. Además, configura las funciones para enviar métricas, trazas y logs a Datadog a través del [Datadog Forwarder][2].

### Instalar

Ejecuta el siguiente comando con tus [credenciales de AWS][3] para desplegar un stack tecnológico de CloudFormation que instale el recurso de AWS de la macro. Solo tienes que instalar la macro **una vez** en una región determinada de tu cuenta. Luego, debes reemplazar `create-stack` por `update-stack` para actualizar la macro a la versión más reciente.

```sh
aws cloudformation create-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

Con estos pasos, la macro ya está desplegada y lista para usar.

### Instrumentar

Para instrumentar la función, añade la transformación `DatadogServerless` y la asignación `CfnMapping` al objeto `Stack` en tu aplicación del AWS CDK. Consulta el siguiente código de ejemplo en Python (el uso en otro lenguaje debería ser similar).

```python
from aws_cdk import core

class CdkStack(core.Stack):
  def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
    super().__init__(scope, id, **kwargs)
    self.add_transform("DatadogServerless")

    mapping = core.CfnMapping(self, "Datadog",
      mapping={
        "Parameters": {
          "pythonLayerVersion": "{{< latest-lambda-layer-version layer="python" >}}",
          "forwarderArn": "<FORWARDER_ARN>",
          "stackName": self.stackName,
          "service": "<SERVICE>",  # Optional
          "env": "<ENV>",  # Optional
        }
      })
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
{{% tab "Zappa" %}}

### Actualizar parámetros

1. Añade los siguientes parámetros a tu archivo `zappa_settings.json`:
    ```json
    {
        "dev": {
            "layers": ["arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>"],
            "lambda_handler": "datadog_lambda.handler.handler",
            "aws_environment_variables": {
                "DD_LAMBDA_HANDLER": "handler.lambda_handler",
                "DD_TRACE_ENABLED": "true",
                "DD_FLUSH_TO_LOG": "true",
            },
        }
    }
    ```
1. Reemplaza los parámetros `<AWS_REGION>`, `<RUNTIME>` y `<VERSION>` en el ARN de la capa por los valores adecuados. Las opciones disponibles de `RUNTIME` son {{< latest-lambda-layer-version layer="python-versions" >}}. La última `VERSION` es `{{< latest-lambda-layer-version layer="python" >}}`. Por ejemplo:
    ```
    # For regular regions
    arn:aws:lambda:us-east-1:464622532012:layer:Datadog-{{< latest-lambda-layer-version layer="python-example-version" >}}:{{< latest-lambda-layer-version layer="python" >}}

    # For us-gov regions
    arn:aws-us-gov:lambda:us-gov-east-1:002406178527:layer:Datadog-{{< latest-lambda-layer-version layer="python-example-version" >}}:{{< latest-lambda-layer-version layer="python" >}}
    ```
1. Si configuraste tu función de Lambda para utilizar la firma de código, añade el ARN del perfil de firma de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) a la [configuración de firma de código][1] de tu función.

### Subscribir

Suscribe la función de Lambda del Datadog Forwarder a cada uno de los grupos de logs de tu función para enviar métricas, trazas y logs a Datadog.

1. [Instala el Datadog Forwarder][2] si todavía no lo hiciste.
2. [Suscribe el Datadog Forwarder a los grupos de logs de tu función][3].

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[2]: https://docs.datadoghq.com/es/serverless/forwarder/
[3]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{% tab "Chalice" %}}

### Actualizar el proyecto

1. Define las variables de entorno `DD_TRACE_ENABLED` y `DD_FLUSH_TO_LOG` como `"true"` en tu archivo `config.json`:
    ```json
    {
      "version": "2.0",
      "app_name": "hello-chalice",
      "stages": {
        "dev": {
          "api_gateway_stage": "api",
          "environment_variables": {
            "DD_TRACE_ENABLED": "true",
            "DD_FLUSH_TO_LOG": "true"
          }
        }
      }
    }
    ```
1. Añade `datadog_lambda` a tu archivo `requirements.txt`.
1. Registra `datadog_lambda_wrapper` como [middleware][1] en tu archivo `app.py`:
    ```python
    from chalice import Chalice, ConvertToMiddleware
    from datadog_lambda.wrapper import datadog_lambda_wrapper

    app = Chalice(app_name='hello-chalice')

    app.register_middleware(ConvertToMiddleware(datadog_lambda_wrapper))

    @app.route('/')
    def index():
        return {'hello': 'world'}
    ```

1. Si configuraste tu función de Lambda para utilizar la firma de código, añade el ARN del perfil de firma de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) a la [configuración de firma de código][5] de tu función.

### Subscribir

Suscribe la función de Lambda del Datadog Forwarder a cada uno de los grupos de logs de tu función para enviar métricas, trazas y logs a Datadog.

1. [Instala el Datadog Forwarder][3] si todavía no lo hiciste.
2. [Suscribe el Datadog Forwarder a los grupos de logs de tu función][4].

[1]: https://aws.github.io/chalice/topics/middleware.html?highlight=handler#registering-middleware
[3]: https://docs.datadoghq.com/es/serverless/forwarder/
[4]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[5]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "Imagen de contenedor" %}}

### Instalar

Si vas a desplegar tu función de Lambda como una imagen de contenedor, no puedes utilizar la biblioteca Lambda de Datadog como una capa. En su lugar, debes instalar la biblioteca Lambda de Datadog como una dependencia de tu función dentro de la imagen.


```sh
pip install datadog-lambda
```

Ten en cuenta que la versión secundaria del paquete `datadog-lambda` siempre coincide con la versión de la capa. Por ejemplo, `datadog-lambda v0.5.0` coincide con el contenido de la versión 5 de la capa.

### Configurar

Sigue estos pasos para configurar la función:

1. Define el valor `CMD` de tu imagen como `datadog_lambda.handler.handler`. Puedes hacerlo en AWS o directamente en tu Dockerfile. Ten en cuenta que el valor de AWS sobrescribirá el valor del Dockerfile si los defines por separado.
2. Configura las siguientes variables de entorno en AWS:
  - Define `DD_LAMBDA_HANDLER` como tu controlador original, por ejemplo, `myfunc.handler`.
  - Define `DD_TRACE_ENABLED` como `true`.
  - Define `DD_FLUSH_TO_LOG` como `true`.
3. Otra opción es añadir las etiquetas (tags) `service` y `env` con los valores adecuados para tu función.

### Subscribir

Suscribe la función de Lambda del Datadog Forwarder a cada uno de los grupos de logs de tus funciones para enviar métricas, trazas y logs a Datadog.

1. [Instala el Datadog Forwarder si todavía no lo hiciste][1].
2. [Suscribe el Datadog Forwarder a los grupos de logs de tu función][2].


[1]: https://docs.datadoghq.com/es/serverless/forwarder/
[2]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{% tab "Personalizar" %}}

### Instalar

Puedes instalar la biblioteca Lambda de Datadog como una capa (recomendado) o como un paquete de Python.

La versión secundaria del paquete `datadog-lambda` siempre coincide con la versión de la capa. Por ejemplo, la versión 0.5.0 de datadog-lambda coincide con el contenido de la versión 5 de la capa.

#### Como una capa

[Configura las capas][1] de tu función de Lambda con el ARN en el siguiente formato:

```
# For us,us3,us5,ap1, ap2, and eu regions
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>

# For us-gov regions
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:<VERSION>
```

Las opciones disponibles en `RUNTIME` son {{< latest-lambda-layer-version layer="python-versions" >}}. La última `VERSION` es `{{< latest-lambda-layer-version layer="python" >}}`. Por ejemplo:

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-{{< latest-lambda-layer-version layer="python-example-version" >}}:{{< latest-lambda-layer-version layer="python" >}}
```

Si configuraste tu función de Lambda para utilizar la firma de código, debes añadir el ARN del perfil de firma de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) a la [configuración de firma de código][9] de tu función antes de poder añadir la biblioteca Lambda de Datadog como una capa.


#### Como un paquete

Instala `datadog-lambda` y sus dependencias localmente en la carpeta del proyecto de tu función. **Nota**: `datadog-lambda` depende de `ddtrace`, que utiliza extensiones nativas; por lo tanto, deben instalarse y compilarse en un entorno de Linux. Por ejemplo, puedes utilizar [dockerizePip][3] para el Serverless Framework y [--use-container][4] para AWS SAM. Para obtener más información, consulta [cómo añadir dependencias al paquete de despliegue de tu función][5].

```
pip install datadog-lambda -t ./
```

Consulta la [última versión][6].

### Configurar

Sigue estos pasos para configurar la función:

1. Configura el controlador de tu función como `datadog_lambda.handler.handler`.
2. Define la variable de entorno `DD_LAMBDA_HANDLER` como tu controlador original, por ejemplo, `myfunc.handler`.
3. Define la variable de entorno `DD_TRACE_ENABLED` como `true`.
4. Define la variable de entorno `DD_FLUSH_TO_LOG` como `true`.
5. Otra opción es añadir las etiquetas `service` y `env` con los valores adecuados para tu función.

### Subscribir

Suscribe la función de Lambda del Datadog Forwarder a cada uno de los grupos de logs de tu función para enviar métricas, trazas y logs a Datadog.

1. [Instala el Datadog Forwarder][7] si todavía no lo hiciste.
2. [Suscribe el Datadog Forwarder a los grupos de logs de tu función][8].


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[3]: https://github.com/UnitedIncome/serverless-python-requirements#cross-compiling
[4]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-build.html
[5]: https://docs.aws.amazon.com/lambda/latest/dg/python-package.html#python-package-dependencies
[6]: https://pypi.org/project/datadog-lambda/
[7]: https://docs.datadoghq.com/es/serverless/forwarder/
[8]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[9]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{< /tabs >}}

### Etiquetar

Aunque es opcional, Datadog recomienda etiquetar las aplicaciones serverless con las etiquetas `env`, `service` y `version` para el [etiquetado de servicios unificado][2].

## Explorar

Una vez que tienes tu función configurada según los pasos anteriores, puedes consultar tus métricas, logs y trazas en la [página de inicio de Serverless][3].

## Monitorizar la lógica de negocio personalizada

Si quieres enviar una métrica o un tramo (span) personalizados, consulta el siguiente código de ejemplo:

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
        timestamp=int(time.time()), # optional, must be within last 20 mins
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

Para obtener más información sobre el envío de métricas personalizadas, consulta los detalles [aquí][4]. Para obtener más información sobre la instrumentación personalizada, consulta la documentación de Datadog APM en la sección de [instrumentación personalizada][5].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/serverless/forwarder
[2]: /es/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[3]: https://app.datadoghq.com/functions
[4]: /es/serverless/custom_metrics?tab=python
[5]: /es/tracing/custom_instrumentation/python/