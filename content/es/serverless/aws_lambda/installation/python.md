---
algolia:
  tags:
  - Trazas de Lambda de Python
aliases:
- /es/serverless/datadog_lambda_library/python/
- /es/serverless/guide/python/
- /es/serverless/installation/python
further_reading:
- link: /serverless/configuration
  tag: Documentación
  text: Configurar Serverless Monitoring
- link: /serverless/guide/troubleshoot_serverless_monitoring
  tag: Documentación
  text: Solucionar problemas de Serverless Monitoring
- link: serverless/custom_metrics/
  tag: Documentación
  text: Envío de métricas personalizadas desde aplicaciones serverless
title: Instrumentación de aplicaciones serverless de Python
---

<div class="alert alert-warning">Si utilizas funciones de Lambda de Python escritas en <a href="https://docs.aws.amazon.com/lambda/latest/dg/runtimes-extensions-api.html">Python 3.6 o versiones anteriores</a>, o si ya configuraste tus funciones de Lambda con el Datadog Forwarder, consulta la sección de <a href="/serverless/guide/datadog_forwarder_python">instrumentación mediante el Datadog Forwarder</a>. De lo contrario, sigue las instrucciones de esta guía para instrumentar mediante la Datadog Lambda Extension.</div>

<div class="alert alert-warning">Si despliegas tus funciones de Lambda en una VPC sin acceso a la Internet pública, puedes enviar datos <a href="/agent/guide/private-link/">con AWS PrivateLink</a> para el <a href="/getting_started/site/">sitio de Datadog</a> <code>datadoghq.com</code>, o bien <a href="/agent/configuration/proxy/">mediante un proxy</a>, en caso de que uses cualquier otro sitio.</div>

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
    datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="python" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    ```

    Para rellenar los parámetros, haz lo siguiente:
    - Reemplaza `<functionname>` y `<another_functionname>` por los nombres de tus funciones de Lambda. Otra posibilidad es usar `--functions-regex` para instrumentar automáticamente varias funciones cuyos nombres coincidan con una expresión regular determinada.
    - Reemplaza `<aws_region>` por el nombre de la región de AWS.

    Si necesitas parámetros adicionales, consulta la [documentación acerca de la CLI][2].


[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/es/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

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
    - Reemplaza `<DATADOG_API_KEY_SECRET_ARN>` por el ARN del secreto de AWS en el que almacenas la [clave de la API de Datadog][3] de forma segura. La clave debe estar almacenada en una cadena de texto sin formato (no en un blob JSON). Además, el permiso `secretsmanager:GetSecretValue` es obligatorio. Si quieres hacer un testeo rápido, puedes usar `apiKey` en lugar del ARN y configurar la clave de la API de Datadog en texto sin formato.

    Para obtener más información y parámetros adicionales, consulta la [documentación acerca del complemento][1].

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/es/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "AWS SAM" %}}

La [macro de CloudFormation de Datadog][1] transforma automáticamente tu plantilla de aplicación de SAM para instalar Datadog en tus funciones con las capas de Lambda. Además, configura las funciones para enviar métricas, trazas y logs a Datadog a través de la [Datadog Lambda Extension][2].

1. Instalar la macro de CloudFormation de Datadog

    Ejecuta el siguiente comando con tus [credenciales de AWS][3] para desplegar un stack tecnológico de CloudFormation que instale el recurso de AWS de la macro. Solo tienes que instalar la macro **una vez** en una región determinada de tu cuenta. Luego, debes reemplazar `create-stack` por `update-stack` para actualizar la macro a la versión más reciente.

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
          pythonLayerVersion: {{< latest-lambda-layer-version layer="python" >}}
          extensionLayerVersion: {{< latest-lambda-layer-version layer="extension" >}}
          site: "<DATADOG_SITE>"
          apiKeySecretArn: "<DATADOG_API_KEY_SECRET_ARN>"
    ```

    Para rellenar los parámetros, haz lo siguiente:
    - Reemplaza `<DATADOG_SITE>` por {{< region-param key="dd_site" code="true" >}} (asegúrate de seleccionar el sitio [SITE] correcto del lado derecho).
    - Reemplaza `<DATADOG_API_KEY_SECRET_ARN>` por el ARN del secreto de AWS en el que almacenas la [clave de la API de Datadog][4] de forma segura. La clave debe estar almacenada en una cadena de texto sin formato (no en un blob JSON). Además, el permiso `secretsmanager:GetSecretValue` es obligatorio. Si quieres hacer un testeo rápido, puedes usar `apiKey` en lugar del ARN y configurar la clave de la API de Datadog en texto sin formato.

    Obtén más información y parámetros adicionales en la [documentación de la macro][1].


[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/es/serverless/libraries_integrations/extension
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "AWS CDK" %}}

El [Constructo del Datadog CDK][1] (kit de desarrollo en la nube) instala automáticamente Datadog en tus funciones con las capas de Lambda. Además, configura tus funciones para enviar métricas, trazas y logs a Datadog a través de la Datadog Lambda Extension.

1. Instalar la biblioteca de constructos del Datadog CDK

    ```sh
    # For AWS CDK v1
    pip install datadog-cdk-constructs

    # For AWS CDK v2
    pip install datadog-cdk-constructs-v2
    ```

2. Instrumentar las funciones de Lambda

    ```python
    # For AWS CDK v1
    from datadog_cdk_constructs import Datadog

    # For AWS CDK v2
    from datadog_cdk_constructs_v2 import Datadog

    datadog = Datadog(self, "Datadog",
        python_layer_version={{< latest-lambda-layer-version layer="python" >}},
        extension_layer_version={{< latest-lambda-layer-version layer="extension" >}},
        site="<DATADOG_SITE>",
        api_key_secret_arn="<DATADOG_API_KEY_SECRET_ARN>",
      )
    datadog.add_lambda_functions([<LAMBDA_FUNCTIONS>])
    ```

    Para rellenar los parámetros, haz lo siguiente:
    - Reemplaza `<DATADOG_SITE>` por {{< region-param key="dd_site" code="true" >}} (asegúrate de seleccionar el sitio [SITE] correcto del lado derecho).
    - Reemplaza `<DATADOG_API_KEY_SECRET_ARN>` por el ARN del secreto de AWS en el que almacenas la [clave de la API de Datadog][2] de forma segura. La clave debe estar almacenada en una cadena de texto sin formato (no en un blob JSON). Además, el permiso `secretsmanager:GetSecretValue` es obligatorio. Si quieres hacer un testeo rápido, puedes usar `apiKey` en lugar del ARN y configurar la clave de la API de Datadog en texto sin formato.

    Obtén más información y parámetros adicionales en la [documentación del Datadog CDK][1].

[1]: https://github.com/DataDog/datadog-cdk-constructs
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Container Image" %}}

1. Instalar la biblioteca Lambda de Datadog

    Si vas a desplegar tu función de Lambda como una imagen de contenedor, no puedes utilizar la biblioteca Lambda de Datadog como una capa de Lambda. En su lugar, debes instalar la biblioteca Lambda de Datadog como una dependencia de tu función dentro de la imagen.

    ```sh
    pip install datadog-lambda
    ```

    Ten en cuenta que la versión secundaria del paquete `datadog-lambda` siempre coincide con la versión de la capa. Por ejemplo, `datadog-lambda v0.5.0` coincide con el contenido de la versión 5 de la capa.

2. Instalar la Datadog Lambda Extension

    Añade los siguientes parámetros al Dockerfile para añadir la Datadog Lambda Extension a tu imagen de contenedor:

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/. /opt/
    ```

    Reemplaza `<TAG>` por un número de versión específico (por ejemplo, `{{< latest-lambda-layer-version layer="extension" >}}`) o por `latest`. Alpine también es compatible con números de versión específicos (como `{{< latest-lambda-layer-version layer="extension" >}}-alpine`) o con `latest-alpine`. Puedes ver una lista completa de posibles etiquetas (tags) en el [repositorio de Amazon ECR][1].

3. Redirigir la función del controlador

    - Define el valor `CMD` de tu imagen como `datadog_lambda.handler.handler`. Puedes hacerlo en AWS o directamente en tu Dockerfile. Ten en cuenta que el valor que está definido en AWS anula el valor del Dockerfile si los defines por separado.
    - Configura la variable de entorno `DD_LAMBDA_HANDLER` como tu controlador original, por ejemplo, `myfunc.handler`.

    **Nota**: Si utilizas una herramienta de seguridad o monitorización de terceros que no es compatible con la redirección del controlador de Datadog, puedes [aplicar la envoltura de Datadog en el código de tu función][2] en su lugar.

4. Configurar el sitio, la clave de la API y el rastreo de Datadog en el Dockerfile

    - Configura la variable de entorno `DD_SITE` como {{< region-param key="dd_site" code="true" >}} (asegúrate de seleccionar el sitio [SITE] correcto del lado derecho).
    - Configura la variable de entorno `DD_API_KEY_SECRET_ARN` con el ARN del secreto de AWS en el que almacenas la [clave de la API de Datadog][3] de forma segura. La clave debe estar almacenada en una cadena de texto sin formato (no en un blob JSON). Además, el permiso `secretsmanager:GetSecretValue` es obligatorio. Si quieres hacer un testeo rápido, puedes usar `DD_API_KEY` en lugar del ARN y configurar la clave de la API de Datadog en texto sin formato.
    - Configura la variable de entorno `DD_TRACE_ENABLED` como `true`.


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
  datadog_python_layer_version = 96

  # los argumentos de aws_lambda_function
}
```

1. Reemplaza el recurso `aws_lambda_function` por el módulo de Terraform `lambda-datadog`. Luego, especifica el origen `source` y la versión `version` del módulo.

2. Configura los argumentos de `aws_lambda_function`:

   Todos los argumentos disponibles en el recurso `aws_lambda_function` están disponibles en este módulo de Terraform. Los argumentos definidos como bloques en el recurso `aws_lambda_function` se redefinen como variables con sus argumentos anidados.

   Por ejemplo, en `aws_lambda_function`, `environment` está definido como un bloque con un argumento `variables`. En el módulo de Terraform `lambda-datadog`, el valor de `environment_variables` se pasa al argumento `environment.variables` en `aws_lambda_function`. Consulta las [entradas][3] para ver una lista completa de las variables de este módulo.

3. Rellena los parámetros de las variables de entorno de la siguiente manera:

   - Reemplaza `<DATADOG_API_KEY_SECRET_ARN>` por el ARN del secreto de AWS en el que almacenas la clave de la API de Datadog de forma segura. La clave debe estar almacenada en una cadena de texto sin formato (no en un blob JSON). Además, el permiso `secretsmanager:GetSecretValue` es obligatorio. Si quieres hacer un testeo rápido, puedes usar la variable de entorno `DD_API_KEY` en lugar del ARN y configurar la clave de la API de Datadog en texto sin formato.
   - Reemplaza `<ENVIRONMENT>` por el entorno de la función de Lambda, como `prod` o `staging`.
   - Reemplaza `<SERVICE_NAME>` por el nombre del servicio de la función de Lambda.
   - Reemplaza `<DATADOG_SITE>` por {{< region-param key="dd_site" code="true" >}}. (Asegúrate de seleccionar el [sitio de Datadog][4] correcto en esta página).
   - Reemplaza `<VERSION>` por el número de versión de la función de Lambda.

4. Selecciona las versiones de la capa de Lambda de la Datadog Extension y de la capa de Lambda de Datadog para Python que quieres usar. Si las dejas en blanco, se utilizarán las últimas versiones de las capas.

```
  datadog_extension_layer_version = 58
  datadog_python_layer_version = 96
```

[1]: https://registry.terraform.io/modules/DataDog/lambda-datadog/aws/latest
[2]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function
[3]: https://github.com/DataDog/terraform-aws-lambda-datadog?tab=readme-ov-file#inputs
[4]: /es/getting_started/site/
{{% /tab %}}
{{% tab "Custom" %}}

<div class="alert alert-info">Si no utilizas una herramienta de desarrollo serverless compatible con Datadog, como Serverless Framework o AWS CDK, Datadog te recomienda instrumentar tus aplicaciones serverless con la <a href="./?tab=datadogcli">Datadog CLI</a>.</div>

1. Instalar la biblioteca Lambda de Datadog

    La biblioteca Lambda de Datadog puede importarse como una capa (recomendado) _O_ como un paquete de Python.

    La versión secundaria del paquete `datadog-lambda` siempre coincide con la versión de la capa. Por ejemplo, la versión 0.5.0 de datadog-lambda coincide con el contenido de la versión 5 de la capa.

    - Opción A: [Configura las capas][1] de tu función de Lambda con el ARN en el siguiente formato:

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

      Reemplaza `<AWS_REGION>` por una región de AWS válida, como `us-east-1`. Las opciones de `<RUNTIME>` disponibles son las siguientes: {{< latest-lambda-layer-version layer="python-versions" >}}.

    - Opción B: Si no puedes utilizar la capa de Lambda de Datadog prediseñada, instala el paquete `datadog-lambda` y sus dependencias localmente en la carpeta del proyecto de tu función con tu gestor de paquetes de Python favorito, como `pip`.

      ```sh
      pip install datadog-lambda -t ./
      ```

      **Nota**: `datadog-lambda` depende de `ddtrace`, que utiliza extensiones nativas; por lo tanto, debes instalarlo y compilarlo en un entorno de Linux con la arquitectura correcta (`x86_64` o `arm64`). Por ejemplo, puedes utilizar [dockerizePip][2] para Serverless Framework y [--use-container][3] para AWS SAM. Para obtener más detalles, consulta [cómo añadir dependencias al paquete de despliegue de tu función][4].

      Consulta la [última versión][5].

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

    - Configura el controlador de tu función como `datadog_lambda.handler.handler`.
    - Configura la variable de entorno `DD_LAMBDA_HANDLER` como tu controlador original, por ejemplo, `myfunc.handler`.

    **Nota**: Si utilizas una herramienta de seguridad o monitorización de terceros que no es compatible con la redirección del controlador de Datadog, puedes [aplicar la envoltura de Datadog en el código de tu función][6] en su lugar.

4. Configurar el sitio, la clave de la API y el rastreo de Datadog

    - Configura la variable de entorno `DD_SITE` como {{< region-param key="dd_site" code="true" >}} (asegúrate de seleccionar el sitio [SITE] correcto del lado derecho).
    - Configura la variable de entorno `DD_API_KEY_SECRET_ARN` con el ARN del secreto de AWS en el que almacenas la [clave de la API de Datadog][7] de forma segura. La clave debe estar almacenada en una cadena de texto sin formato, no en un blob JSON. Además, el permiso `secretsmanager:GetSecretValue` es obligatorio. Si quieres hacer un testeo rápido, puedes usar `DD_API_KEY` en lugar del ARN y configurar la clave de la API de Datadog en texto sin formato.
    - Configura la variable de entorno `DD_TRACE_ENABLED` como `true`.

5. Registrar el middleware (solo para AWS Chalice)

    Si utilizas [AWS Chalice][8], debes instalar `datadog-lambda` con `pip` y registrar `datadog_lambda_wrapper` como [middleware][9] en `app.py`:

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

## ¿Qué toca hacer ahora?

- Ya puedes consultar métricas, logs y trazas en la [página de inicio Serverless][1].
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

```python
import time
from ddtrace import tracer
from datadog_lambda.metric import lambda_metric

def lambda_handler(event, context):
    # añade etiquetas personalizadas al tramo de la función de Lambda,
    # NO funciona si el rastreo de X-Ray está habilitado
    current_span = tracer.current_span()
    if current_span:
        current_span.set_tag('customer.id', '123456')

    # envía un tramo personalizado
    with tracer.trace("hello.world"):
        print('Hello, World!')

    # envía una métrica personalizada
    lambda_metric(
        metric_name='coffee_house.order_value',
        value=12.45,
        tags=['product:latte', 'order:online']
    )

    return {
        'statusCode': 200,
        'body': get_message()
    }

# rastrea una función
@tracer.wrap()
def get_message():
    return 'Hello from serverless!'
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /es/serverless/guide/troubleshoot_serverless_monitoring/
[3]: /es/serverless/configuration/
[4]: /es/serverless/custom_metrics?tab=python
[5]: /es/tracing/custom_instrumentation/python/
[6]: /es/security/application_security/enabling/serverless/?tab=serverlessframework