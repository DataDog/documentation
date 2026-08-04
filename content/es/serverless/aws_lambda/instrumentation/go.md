---
aliases:
- /es/serverless/datadog_lambda_library/go/
- /es/serverless/installation/go
- /es/serverless/aws_lambda/installation/go
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
title: Instrumentación de aplicaciones serverless de Go
---

<div class="alert alert-danger">Si tus funciones de Go Lambda todavía utilizan el tiempo de ejecución <code>go1.x</code> y no puedes migrar al tiempo de ejecución <code>provided.al2</code>, debes <a href="https://docs.datadoghq.com/serverless/guide/datadog_forwarder_go">instrumentar utilizando Datadog Forwarder</a>. De lo contrario, sigue las instrucciones de esta guía para instrumentar utilizando Datadog Lambda Extension.</div>

<div class="alert alert-info">La versión 67+ de Datadog Lambda Extension está optimizada para reducir significativamente la duración del arranque en frío. <a href="/serverless/aws_lambda/configuration/?tab=datadogcli#using-datadog-lambda-extension-v67">Más información</a>.</div>

{{< callout url="https://www.datadoghq.com/product-preview/agentic-onboarding-for-serverless-applications/" btn_hidden="false" header="Agentically add Datadog to your Lambda Functions">}}
La incorporación del Agent para Datadog Serverless está en la vista previa. Utiliza tu herramienta de codificación de IA favorita, como Cursor o Claude, para agregar en bloque la monitorización de Datadog a tus funciones Lambda.
{{< /callout >}}

## Instalación

**Nota**: Datadog recomienda utilizar el rastreador de Go v2 para instrumentar las funciones de AWS Lambda. Consulta las [Instrucciones para la migración del rastreador de Go](https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/go/migration/#migration-instructions) para obtener orientación sobre la actualización de v1 a v2.

{{< tabs >}}
{{% tab "Interfaz de usuario de Datadog" %}}
Puedes instrumentar tu aplicación de Go AWS Lambda directamente dentro de Datadog. Ve a  la page (página) [Serverless > AWS Lambda][2] y selecciona [**Instrument Functions**][3] (Instrumentar funciones).

Para obtener más información, consulta [Instrumentación remota para AWS Lambda][1].

[1]: /es/serverless/aws_lambda/remote_instrumentation
[2]: https://app.datadoghq.com/functions?cloud=aws
[3]: https://app.datadoghq.com/serverless/aws/lambda/setup
{{% /tab %}}
{{% tab "Datadog CLI" %}}

La Datadog CLI modifica la configuración de las funciones de Lambda existentes para permitir la instrumentación sin tener que volver a desplegar. Es la forma más rápida de empezar a trabajar con la monitorización serverless de Datadog.

1. Instalar el cliente de la Datadog CLI

    ```sh
    npm install -g @datadog/datadog-ci @datadog/datadog-ci-plugin-lambda
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

6. Instrumentación de tus funciones Lambda

    **Nota**: Antes que nada, instrumenta tus funciones de Lambda en un entorno de desarrollo o de prueba. Si el resultado de la instrumentación no es satisfactorio, ejecuta `uninstrument` con los mismos argumentos para revertir los cambios.

    Para instrumentar tus funciones Lambda, ejecuta el siguiente comando.

    ```sh
    datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -e {{< latest-lambda-layer-version layer="extension" >}}
    ```

    Para rellenar los parámetros:
    - Reemplaza `<functionname>` y `<another_functionname>` por los nombres de tus funciones de Lambda. Otra posibilidad es usar `--functions-regex` para instrumentar automáticamente varias funciones cuyos nombres coincidan con una expresión regular determinada.
    - Sustituye `<aws_region>` por el nombre de la región AWS.

    Si necesitas parámetros adicionales, consulta la [documentación acerca de la CLI][2].

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/es/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Marco serverless" %}}

El complemento [Datadog Serverless Plugin][1] configura automáticamente tus funciones para enviar métricas, trazas (traces) y logs a Datadog mediante la [Datadog Lambda Extension][2].

Para instalar y configurar el Datadog Serverless Plugin, sigue estos pasos:

### Instala el Datadog Serverless Plugin:

```sh
serverless plugin install --name serverless-plugin-datadog
```

### Actualiza tu archivo `serverless.yml`:

```yaml
custom:
  datadog:
    site: <DATADOG_SITE>
    apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
```

Para rellenar los parámetros, haz lo siguiente:
- Reemplaza `<DATADOG_SITE>` por el [sitio de Datadog][3] al que quieres enviar la telemetría.
- Reemplaza `<DATADOG_API_KEY_SECRET_ARN>` por el ARN del secreto de AWS en el que almacenas la [clave de la API de Datadog][4] de forma segura. La clave debe estar almacenada en una cadena de texto sin formato (no en un blob JSON). Además, el permiso `secretsmanager:GetSecretValue` es obligatorio. Si quieres hacer un testeo rápido, puedes usar `apiKey` en lugar del ARN y configurar la clave de la API de Datadog en texto sin formato.

Para obtener más información y parámetros adicionales, consulta la [documentación acerca del complemento][1].

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/es/serverless/libraries_integrations/extension
[3]: https://docs.datadoghq.com/es/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "AWS SAM" %}}

La [macro de CloudFormation de Datadog][1] transforma automáticamente tu plantilla de aplicación de SAM para instalar Datadog en tus funciones mediante capas de Lambda. Además, configura las funciones para enviar métricas, trazas y logs a Datadog a través de la [Datadog Lambda Extension][2].

1. Instalar la macro de CloudFormation de Datadog

    Ejecuta el siguiente comando con tus [credenciales de AWS][3] para desplegar un stack tecnológico de CloudFormation que instale el recurso de AWS de la macro. Solo tienes que instalar la macro **una vez** en una región determinada de tu cuenta. Luego, debes reemplazar `create-stack` por `update-stack` para actualizar la macro a la versión más reciente.

    ```sh
    aws cloudformation create-stack \
      --stack-name datadog-serverless-macro \
      --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
      --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
    ```

    Con estos pasos, la macro ya está desplegada y lista para usar.

2. Instrumentación de tus funciones Lambda

    Añade la transformación `DatadogServerless` **después** de la transformación `AWS::Serverless` en la sección `Transform` de tu archivo `template.yml` para SAM.

    ```yaml
    Transform:
      - AWS::Serverless-2016-10-31
      - Name: DatadogServerless
        Parameters:
          stackName: !Ref "AWS::StackName"
          extensionLayerVersion: {{< latest-lambda-layer-version layer="extension" >}}
          site: "<DATADOG_SITE>"
          apiKeySecretArn: "<DATADOG_API_KEY_SECRET_ARN>"
    ```

    Para rellenar los parámetros:
    - Sustituye `<DATADOG_SITE>` por {{< region-param key="dd_site" code="true" >}} (asegúrate de haber seleccionado el SITIO correcto del lado derecho).
    - Reemplaza `<DATADOG_API_KEY_SECRET_ARN>` por el ARN del secreto de AWS en el que almacenas la [clave de la API de Datadog][4] de forma segura. La clave debe estar almacenada en una cadena de texto sin formato (no en un blob JSON). Además, el permiso `secretsmanager:GetSecretValue` es obligatorio. Si quieres hacer un testeo rápido, puedes usar `apiKey` en lugar del ARN y configurar la clave de la API de Datadog en texto sin formato.

    Obtén más información y parámetros adicionales en la [documentación de la macro][1].


[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/es/serverless/libraries_integrations/extension
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}

{{% tab "AWS CDK" %}}
{{< lambda-install-cdk language="go" >}}
{{% /tab %}}

{{% tab "Imagen de contenedor" %}}

1. Instalar la Datadog Lambda Extension

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/. /opt/
    ```

    Reemplaza `<TAG>` por un número de versión específico (por ejemplo, `{{< latest-lambda-layer-version layer="extension" >}}`) o por `latest`. Alpine también es compatible con números de versión específicos (como `{{< latest-lambda-layer-version layer="extension" >}}-alpine`) o con `latest-alpine`. Puedes ver una lista completa de posibles etiquetas (tags) en el [repositorio de Amazon ECR][1].

2. Configurar las variables de entorno obligatorias

    - Configura `DD_SITE` como {{< region-param key="dd_site" code="true" >}} (asegúrate de seleccionar el sitio [SITE] correcto del lado derecho).
    - Configura `DD_API_KEY_SECRET_ARN` con el ARN del secreto de AWS en el que almacenas la [clave de la API de Datadog][2] de forma segura. La clave debe estar almacenada en una cadena de texto sin formato (no en un blob JSON). Además, el permiso `secretsmanager:GetSecretValue` es obligatorio. Si quieres hacer un testeo rápido, puedes usar `DD_API_KEY` en lugar del ARN y configurar la clave de la API de Datadog en texto sin formato.
    - De manera opcional, puedes configurar `DD_UNIVERSAL_INSTRUMENTATION: true` para aprovechar las ventajas de las [configuraciones avanzadas][3], como capturar las cargas útiles de solicitud y respuesta de Lambda e inferir tramos (spans) de APM de los eventos de Lambda entrantes.

[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /es/serverless/configuration/
{{% /tab %}}
{{% tab "Terraform" %}}

El módulo de Terraform [`lambda-datadog`][1] envuelve el recurso [`aws_lambda_function`][2] y configura automáticamente tu función de Lambda para Datadog Serverless Monitoring mediante las siguientes acciones:

- adición de las capas de Lambda de Datadog,
- redireccionamiento del controlador de Lambda,
- habilitación de la recopilación de métricas, trazas y logs y su envío a Datadog.

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

  # aws_lambda_function arguments
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

4. Selecciona la versión de la capa de Datadog Extension Lambda que desees utilizar. Si se deja en blanco, se utilizará la última versión de la capa.

```
  datadog_extension_layer_version = {{< latest-lambda-layer-version layer="extension" >}}
```

[1]: https://registry.terraform.io/modules/DataDog/lambda-datadog/aws/latest
[2]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function
[3]: https://github.com/DataDog/terraform-aws-lambda-datadog?tab=readme-ov-file#inputs
[4]: /es/getting_started/site/
{{% /tab %}}
{{% tab "SST v3" %}}

Para configurar Datadog utilizando SST v3, sigue estos steps (UI) / pasos (generic):

```ts
const app = new sst.aws.Function("MyApp", {
  handler: "./src",
  runtime: "go",
  environment: {
    DD_ENV: "<ENVIRONMENT>",
    DD_SERVICE: "<SERVICE_NAME>",
    DD_VERSION: "<VERSION>",
    DATADOG_API_KEY_SECRET_ARN: "<DATADOG_API_KEY_SECRET_ARN>",
    DD_SITE: "<DATADOG_SITE>",
  },
  layers: [
    $interpolate`arn:aws:lambda:${aws.getRegionOutput().name}:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}`,
  ],
});
```

Rellena los parámetros de las variables de entorno de la siguiente manera:

  - Reemplaza `<DATADOG_API_KEY_SECRET_ARN>` por el ARN del secreto de AWS en el que almacenas la clave de la API de Datadog de forma segura. La clave debe estar almacenada en una cadena de texto sin formato (no en un blob JSON). Además, el permiso `secretsmanager:GetSecretValue` es obligatorio. Si quieres hacer un testeo rápido, puedes usar la variable de entorno `DD_API_KEY` en lugar del ARN y configurar la clave de la API de Datadog en texto sin formato.
  - Reemplaza `<ENVIRONMENT>` por el entorno de la función de Lambda, como `prod` o `staging`.
  - Reemplaza `<SERVICE_NAME>` por el nombre del servicio de la función de Lambda.
  - Sustituye `<DATADOG_SITE>` por {{< region-param key="dd_site" code="true" >}}. (Asegúrate de seleccionar el [sitio de Datadog ][1] correcto en esta page (página)).
  - Reemplaza `<VERSION>` por el número de versión de la función de Lambda.

[1]: /es/getting_started/site/

{{% /tab %}}
{{% tab "Personalizado" %}}
### Instalar la Datadog Lambda Extension

[Añade la capa de Lambda][1] de la Datadog Lambda Extension a tus funciones de Lambda, con el formato del ARN definido según tu región y arquitectura de AWS:

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

### Configurar las variables de entorno obligatorias

- Configura `DD_SITE` como {{< region-param key="dd_site" code="true" >}} (asegúrate de seleccionar el sitio [SITE] correcto del lado derecho).
- Configura `DD_API_KEY_SECRET_ARN` con el ARN del secreto de AWS en el que almacenas la [clave de la API de Datadog][2] de forma segura. La clave debe estar almacenada en una cadena de texto sin formato (no en un blob JSON). Además, el permiso `secretsmanager:GetSecretValue` es obligatorio. Si quieres hacer un testeo rápido, puedes usar `DD_API_KEY` en lugar del ARN y configurar la clave de la API de Datadog en texto sin formato.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

### Instalar la biblioteca Lambda de Datadog

```
go get github.com/DataDog/dd-trace-go/contrib/aws/datadog-lambda-go/v2
```

### Actualizar el código de la función de Lambda

```go
package main

import (
    "context"
    "net/http"
    "time"

  ddlambda "github.com/DataDog/dd-trace-go/contrib/aws/datadog-lambda-go/v2"
  "github.com/aws/aws-lambda-go/events"
  "github.com/aws/aws-lambda-go/lambda"
  httptrace "github.com/DataDog/dd-trace-go/contrib/net/http/v2"
  "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

func main() {
    // Wrap your lambda handler
    lambda.Start(ddlambda.WrapFunction(myHandler, nil))
}

func myHandler(ctx context.Context, _ events.APIGatewayProxyRequest) (string, error) {
    // Trace an HTTP request
    req, _ := http.NewRequestWithContext(ctx, "GET", "https://www.datadoghq.com", nil)
    client := http.Client{}
    client = httptrace.WrapClient(&client)
    client.Do(req)

    // Submit a custom metric
    ddlambda.Metric(
        "coffee_house.order_value",      // Metric name
        12.45,                           // Metric value
        "product:latte", "order:online", // Associated tags
    )

    // Create a custom span
    s, _ := tracer.StartSpanFromContext(ctx, "child.span")
    time.Sleep(100 * time.Millisecond)
    s.Finish()
    return "ok", nil
}
```

## Cumplimiento de FIPS

{{% svl-lambda-fips %}}

## AWS Lambda y VPC

{{% svl-lambda-vpc %}}

## ¿Qué toca hacer ahora?

- Añade etiquetas personalizadas a tu telemetría utilizando la variable de entorno `DD_TAGS` 
- Configura [recopilación de cargas útiles][8] para capturar las cargas útiles de solicitud y respuesta JSON de tus funciones.
- Si utilizas la extensión Lambda de Datadog, desactiva los logs Lambda de Datadog Forwarder.
- Consulta [Configurar Serverless Monitoring para AWS Lambda][3] para obtener más funciones.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /es/serverless/guide/troubleshoot_serverless_monitoring/
[3]: /es/serverless/configuration/
[4]: /es/security/application_security/serverless/
[5]: https://github.com/DataDog/datadog-lambda-extension
[6]: https://github.com/DataDog/datadog-lambda-extension/issues
[7]: /es/tracing/trace_collection/custom_instrumentation/go/migration
[8]: /es/serverless/aws_lambda/configuration?tab=datadogcli#collect-the-request-and-response-payloads