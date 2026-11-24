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
  text: Envío de Custom Metrics desde aplicaciones Serverless
title: Instrumentación de aplicaciones Serverless de Go
---
<div class="alert alert-danger">Si sus funciones Lambda de Go todavía usan el runtime <code>go1.x</code> y no puede migrar al <code>provided.al2</code> runtime, debe <a href="https://docs.datadoghq.com/serverless/guide/datadog_forwarder_go">instrumentar usando el Datadog Forwarder</a>. De lo contrario, siga las instrucciones de esta guía para instrumentar usando Datadog Lambda Extension.</div>

<div class="alert alert-info">La versión 67+ de la Datadog Lambda Extension está optimizada para reducir significativamente la duración del arranque en frío. <a href="/serverless/aws_lambda/configuration/?tab=datadogcli#using-datadog-lambda-extension-v67">Leer más</a>.</div>

## Configuración {#setup}

**Nota**: Datadog recomienda usar la v2 del trazador de Go para instrumentar funciones AWS Lambda. Consulte las [instrucciones de migración](https://github.com/DataDog/dd-trace-go/tree/main/contrib/aws/datadog-lambda-go) para obtener orientación sobre cómo actualizar de la v1 a la v2.

{{% svl-lambda-memory %}}

{{< tabs >}}
{{% tab "Datadog UI" %}}
Puede instrumentar su aplicación de Go para AWS Lambda directamente en Datadog. Navegue a la página [{{< ui >}}Serverless{{< /ui >}} > {{< ui >}}AWS Lambda{{< /ui >}}][2] y seleccione [{{< ui >}}Settings{{< /ui >}}][3]. En la sección {{< ui >}}Remote Instrumentation{{< /ui >}}, seleccione la pestaña {{< ui >}}AWS Lambda{{< /ui >}}.

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

    La CLI de Datadog requiere acceso al servicio AWS Lambda y depende del SDK de JavaScript de AWS para [resolver las credenciales][1]. Asegúrese de que sus credenciales de AWS estén configuradas utilizando el mismo método que usaría al invocar AWS CLI.

4. Configure el sitio de Datadog

    ```sh
    export DATADOG_SITE="<DATADOG_SITE>"
    ```

    Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (asegúrese de que el SITE correcto esté seleccionado a la derecha).

5. Configure la clave de API de Datadog

    Datadog recomienda guardar la clave de API de Datadog en AWS Secrets Manager por seguridad y para facilitar su rotación. La clave debe almacenarse como una cadena de texto plano (no como un blob JSON). Asegúrese de que sus funciones Lambda tengan el permiso de IAM `secretsmanager:GetSecretValue` requerido.

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

    For quick testing purposes, you can also set the Datadog API key in plaintext:

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

6. Instrumente sus funciones Lambda

    **Nota**: ¡Instrumente las funciones Lambda primero en un entorno de desarrollo o de pruebas (staging)! Si el resultado de la instrumentación no es satisfactorio, ejecute `uninstrument` con los mismos argumentos para revertir los cambios.

    Para instrumentar las funciones Lambda, ejecute el siguiente comando.

    ```sh
    datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -e {{< latest-lambda-layer-version layer="extension" >}}
    

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

### Instale el Datadog Serverless Plugin: {#install-the-datadog-serverless-plugin}

```sh
serverless plugin install --name serverless-plugin-datadog
```

### Actualice su `serverless.yml`: {#update-your-serverlessyml}

```yaml
custom:
  datadog:
    site: <DATADOG_SITE>
    apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
```

Para completar los marcadores de posición:
- Reemplace `<DATADOG_SITE>` con su [sitio de Datadog][3] al cual enviar la telemetría.
- Reemplace `<DATADOG_API_KEY_SECRET_ARN>` con el ARN del secreto de AWS donde su [clave de API de Datadog][4] está almacenada de forma segura. La clave debe almacenarse como una cadena de texto plano (no como un blob JSON). Se requiere el permiso `secretsmanager:GetSecretValue`. Para pruebas rápidas, puede usar `apiKey` en su lugar y configurar la clave de API de Datadog en texto plano.

Para obtener más información y configuraciones adicionales, consulte la [documentación del plugin][1].

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/es/serverless/libraries_integrations/extension
[3]: https://docs.datadoghq.com/es/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
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
          extensionLayerVersion: {{< latest-lambda-layer-version layer="extension" >}}
          site: "<DATADOG_SITE>"
          apiKeySecretArn: "<DATADOG_API_KEY_SECRET_ARN>"
    ```

    To fill in the placeholders:
    - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (asegúrese de que el SITE correcto esté seleccionado a la derecha).
    - Reemplace `<DATADOG_API_KEY_SECRET_ARN>` con el ARN del secreto de AWS donde su [clave de API de Datadog][4] está almacenada de forma segura. La clave debe almacenarse como una cadena de texto plano (no como un blob JSON). Se requiere el permiso `secretsmanager:GetSecretValue`. Para pruebas rápidas, puede usar `apiKey` en su lugar y establecer la clave de API de Datadog en texto plano.

    More information and additional parameters can be found in the [macro documentation][1].


[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/es/serverless/libraries_integrations/extension
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}

{{% tab "AWS CDK" %}}
{{< lambda-install-cdk language="go" >}}
{{% /tab %}}

{{% tab "Imagen de contenedor" %}}

1. Instale Datadog Lambda Extension

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/. /opt/
    ```

    Replace `<TAG>` with either a specific version number (for example, `{{< latest-lambda-layer-version layer="extension" >}}`) or with `latest`. Alpine is also supported with specific version numbers (such as `{{< latest-lambda-layer-version layer="extension" >}}-alpine`) or with `latest-alpine`. Puede ver una lista completa de las etiquetas posibles en el [repositorio de Amazon ECR][1].

2. Establezca las variables de entorno requeridas

    - Establezca `DD_SITE` en {{< region-param key="dd_site" code="true" >}} (asegúrese de que el SITE correcto esté seleccionado a la derecha).
    - Establezca `DD_API_KEY_SECRET_ARN` en el ARN del secreto de AWS donde su [clave de API de Datadog][2] está almacenada de forma segura. La clave debe almacenarse como una cadena de texto plano (no como un blob JSON). Se requiere el permiso `secretsmanager:GetSecretValue`. Para pruebas rápidas, puede usar `DD_API_KEY` en su lugar y establecer la clave de API de Datadog en texto plano.
    - Opcionalmente, establezca `DD_UNIVERSAL_INSTRUMENTATION: true` para aprovechar las [configuraciones avanzadas][3], como capturar las cargas útiles de solicitud y respuesta de Lambda e inferir spans de APM a partir de eventos entrantes de Lambda.

[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /es/serverless/configuration/
{{% /tab %}}
{{% tab "Terraform" %}}

El módulo de Terraform [`lambda-datadog`][1] envuelve el recurso [`aws_lambda_function`][2] y configura automáticamente su función Lambda para Datadog Serverless Monitoring mediante:

- Agregar Datadog Lambda layers
- Redirigir el controlador de Lambda
- Habilitar la recopilación y el envío de métricas, trazas y registros a Datadog

```tf
module "lambda-datadog" {
  source  = "DataDog/lambda-datadog/aws"
  version = "4.10.0"

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

1. Reemplace el recurso `aws_lambda_function` con el módulo de Terraform `lambda-datadog`. Luego, especifique la `source` y `version` del módulo.

2. Establezca los argumentos `aws_lambda_function`:

   Todos los argumentos disponibles en el recurso `aws_lambda_function` están disponibles en este módulo de Terraform. Los argumentos definidos como bloques en el recurso `aws_lambda_function` se redefinen como variables con sus argumentos anidados.

   Por ejemplo, en `aws_lambda_function`, `environment` se define como un bloque con un argumento `variables`. En el módulo de Terraform `lambda-datadog`, el valor para `environment_variables` se pasa al argumento `environment.variables` en `aws_lambda_function`. Consulte [inputs][3] para obtener una lista completa de las variables en este módulo.

3. Complete los marcadores de posición de las variables de entorno:

   - Reemplace `<DATADOG_API_KEY_SECRET_ARN>` con el ARN del secreto de AWS donde se almacena de forma segura su clave de API de Datadog. La clave debe almacenarse como una cadena de texto plano (no como un blob JSON). Se requiere el permiso `secretsmanager:GetSecretValue`. Para pruebas rápidas, puede usar en su lugar la variable de entorno `DD_API_KEY` y establecer su clave de API de Datadog en texto plano.
   - Reemplace `<ENVIRONMENT>` con el entorno de la función Lambda, como `prod` o `staging`
   - Reemplace `<SERVICE_NAME>` con el nombre del servicio de la función Lambda
   - Reemplace `<DATADOG_SITE>` con {{< region-param key="dd_site" code="true" >}}. (Asegúrese de que el [sitio de Datadog][4] correcto esté seleccionado en esta página).
   - Reemplace `<VERSION>` con el número de versión de la función Lambda

4. Seleccione la versión de la capa de Lambda de Datadog Extension que desea utilizar. Si se deja en blanco, se utilizará la versión más reciente de la capa.

```
  datadog_extension_layer_version = {{< latest-lambda-layer-version layer="extension" >}}
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

Complete los marcadores de posición de las variables de entorno:

  - Reemplace `<DATADOG_API_KEY_SECRET_ARN>` con el ARN del secreto de AWS donde se almacena de forma segura su clave de API de Datadog. La clave debe almacenarse como una cadena de texto plano (no como un blob JSON). Se requiere el permiso `secretsmanager:GetSecretValue`. Para pruebas rápidas, puede usar en su lugar la variable de entorno `DD_API_KEY` y establecer su clave de API de Datadog en texto plano.
  - Reemplace `<ENVIRONMENT>` con el entorno de la función Lambda, como `prod` o `staging`
  - Reemplace `<SERVICE_NAME>` con el nombre del servicio de la función Lambda
  - Reemplace `<DATADOG_SITE>` con {{< region-param key="dd_site" code="true" >}}. (Asegúrese de que el [sitio de Datadog][1] correcto esté seleccionado en esta página).
  - Reemplace `<VERSION>` con el número de versión de la función Lambda

[1]: /es/getting_started/site/

{{% /tab %}}
{{% tab "Personalizado" %}}
### Instale Datadog Lambda Extension {#install-the-datadog-lambda-extension}

[Agregue la capa de Lambda][1] de Datadog Lambda Extension a sus funciones de Lambda, utilizando el formato ARN basado en su región y arquitectura de AWS:

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

Reemplace `<AWS_REGION>` con una región de AWS válida, como `us-east-1`.

### Configure las variables de entorno requeridas {#configure-the-required-environment-variables}

- Establezca `DD_SITE` en {{< region-param key="dd_site" code="true" >}} (asegúrese de que el SITE correcto esté seleccionado a la derecha).
- Establezca `DD_API_KEY_SECRET_ARN` en el ARN del secreto de AWS donde su [clave de API de Datadog][2] está almacenada de forma segura. La clave debe almacenarse como una cadena de texto plano (no como un blob JSON). Se requiere el permiso `secretsmanager:GetSecretValue`. Para pruebas rápidas, puede usar `DD_API_KEY` en su lugar y establecer la clave de API de Datadog en texto plano.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

{{% svl-tracing-env %}}

### Instale la biblioteca de Datadog para Lambda {#install-the-datadog-lambda-library}

```
go get github.com/DataDog/dd-trace-go/contrib/aws/datadog-lambda-go/v2
```

### Actualice el código de su función Lambda {#update-your-lambda-function-code}

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

## Cumplimiento de FIPS {#fips-compliance}

{{% svl-lambda-fips %}}

## AWS Lambda y VPC {#aws-lambda-and-vpc}

{{% svl-lambda-vpc %}}

## ¿Qué sigue? {#whats-next}

- Agregue etiquetas personalizadas a su telemetría usando la variable de entorno `DD_TAGS`
- Configure [la recopilación de cargas útiles][8] para capturar las cargas útiles JSON de solicitud y respuesta de sus funciones
- Si está utilizando Datadog Lambda Extension, desactive los registros Lambda del Datadog Forwarder
- Consulte [Configure Serverless Monitoring for AWS Lambda][3] para obtener más capacidades

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /es/serverless/guide/troubleshoot_serverless_monitoring/
[3]: /es/serverless/configuration/
[4]: /es/security/application_security/serverless/
[5]: https://github.com/DataDog/datadog-lambda-extension
[6]: https://github.com/DataDog/datadog-lambda-extension/issues
[7]: /es/tracing/trace_collection/custom_instrumentation/go/migration
[8]: /es/serverless/aws_lambda/configuration?tab=datadogcli#collect-the-request-and-response-payloads