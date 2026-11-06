---
further_reading:
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Cómo funciona App and API Protection
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas de protección de aplicaciones y API listas para usar
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de protección de aplicaciones y API
- link: /security/application_security/threats/
  tag: Documentación
  text: App and API Protection
- link: https://www.datadoghq.com/blog/datadog-security-google-cloud/
  tag: Blog
  text: Datadog Security amplía las capacidades de cumplimiento y protección contra
    amenazas para Google Cloud
title: Habilitación de App and API Protection para funciones de AWS Lambda en Go
---
La configuración de App and API Protection para AWS Lambda implica:

1. Identificar las funciones que son vulnerables o que están bajo ataque, las cuales se beneficiarían más de App and API Protection. Encuéntrelas en [la pestaña de Security de su Catalog][1].
2. Configurar la instrumentación de App and API Protection utilizando [Datadog CLI][8], [AWS CDK][9], el [plugin de Datadog Serverless Framework][2], o manualmente mediante las capas de rastreo de Datadog.
3. Activar señales de seguridad en su aplicación y ver cómo Datadog muestra la información resultante.

## Tipos de activación compatibles {#supported-trigger-types}
Threat Detection admite solicitudes HTTP como entrada de función únicamente, ya que ese canal tiene la mayor probabilidad de que los atacantes exploten una aplicación Serverless. Las solicitudes HTTP generalmente provienen de servicios de AWS como:
- Application Load Balancer (ALB)
- API Gateway v1 (Rest API)
- API Gateway v2 (HTTP API)
- URL de función

<div class="alert alert-info">Si desea que se agregue soporte para cualquiera de las capacidades no compatibles, complete este <a href="https://forms.gle/gHrxGQMEnAobukfn7">formulario</a> para enviar sus comentarios.</div>


## Comience {#get-started}

{{< tabs >}}
{{% tab "Serverless Framework" %}}

El [plugin de Datadog Serverless Framework][1] se puede utilizar para configurar y desplegar automáticamente su lambda con App and API Protection.

Para instalar y configurar el plugin de Datadog Serverless Framework:

1. Instale el plugin de Datadog Serverless Framework:
   ```sh
   serverless plugin install --name serverless-plugin-datadog
   ```

2. Habilite App and API Protection actualizando su `serverless.yml` con el parámetro de configuración `enableASM`:
   ```yaml
   custom:
     datadog:
       appSecMode: on
   ```

   En general, su nuevo archivo `serverless.yml` debería contener al menos:
   ```yaml
   custom:
     datadog:
       apiKeySecretArn: "{Datadog_API_Key_Secret_ARN}" # or apiKey
       appSecMode: on
   ```
   Consulte también la lista completa de [parámetros del plugin][2] para configurar aún más los ajustes de su lambda.

4. Vuelva a implementar la función e invóquela. Después de unos minutos, aparecerá en las [vistas de App and API Protection][3].

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/es/serverless/libraries_integrations/plugin/#configuration-parameters
[3]: https://app.datadoghq.com/security/appsec?column=time&order=desc
{{% /tab %}}
{{% tab "Datadog CLI" %}}

Datadog CLI modifica las configuraciones de las funciones Lambda existentes para habilitar la instrumentación sin necesidad de una nueva implementación. Es la forma más rápida de comenzar con Serverless Monitoring de Datadog.

**Si está configurando el rastreo inicial para sus funciones**, realice los siguientes pasos:

1. Instale el cliente de Datadog CLI:

    ```sh
    npm install -g @datadog/datadog-ci
    ```

2. Si es nuevo en Serverless Monitoring de Datadog, inicie Datadog CLI en modo interactivo para que lo guíe en su primera instalación para un inicio rápido, y puede ignorar los pasos restantes. Para instalar Datadog de forma permanente para sus aplicaciones de producción, omita este paso y siga los restantes para ejecutar el comando de Datadog CLI en sus pipelines de CI/CD después de su despliegue normal.

    ```sh
    datadog-ci lambda instrument -i --appsec
    ```

3. Configure las credenciales de AWS:

    Datadog CLI requiere acceso al servicio AWS Lambda y depende de AWS JavaScript SDK para [resolver las credenciales][1]. Asegúrese de que sus credenciales de AWS estén configuradas utilizando el mismo método que usaría al invocar AWS CLI.

4. Configure el sitio de Datadog:

    ```sh
    export DATADOG_SITE="<DATADOG_SITE>"
    ```

    Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (asegúrese de que el **sitio de Datadog** correcto esté seleccionado en el lado derecho de esta página).

5. Configure la clave de Datadog API:

    Datadog recomienda guardar la clave de Datadog API en AWS Secrets Manager por seguridad. La clave debe almacenarse como una cadena de texto plano (no como un blob JSON). Asegúrese de que sus funciones Lambda tengan el permiso de IAM `secretsmanager:GetSecretValue` requerido.

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

    For testing purposes, you can also set the Datadog API key in plaintext:

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

6. Instrumentar sus funciones Lambda:

    Para instrumentar las funciones Lambda, ejecute el siguiente comando.

    ```sh
    datadog-ci lambda instrument --appsec -f <functionname> -f <another_functionname> -r <aws_region> -e {{< latest-lambda-layer-version layer="extension" >}}
    

```

    To fill in the placeholders:
    - Replace `<functionname>` and `<another_functionname>` with your Lambda function names.
    - Alternatively, you can use `--functions-regex` to automatically instrument multiple functions whose names match the given regular expression.
    - Replace `<aws_region>` with the AWS region name.

   **Nota**: Instrumentar sus funciones Lambda primero en un entorno de desarrollo o de pruebas. Si el resultado de la instrumentación no es satisfactorio, ejecute `uninstrument` con los mismos argumentos para revertir los cambios. Una vez que la CLI finalice, actualice su código fuente para que dependa de la última versión del módulo `datadog-lambda-go` para habilitar App and API Protection.

    Additional parameters can be found in the [CLI documentation][2].

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/es/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "AWS CDK" %}}

El [Datadog CDK Construct][1] instala automáticamente Datadog en sus funciones mediante Lambda Layers y configura sus funciones para enviar métricas, trazas y logs a Datadog a través de Datadog Lambda Extension.

1. Instale la biblioteca de construcciones de Datadog CDK:

    ```sh
    npm install datadog-cdk-constructs-v2 --save-dev
    ```

2. Instrumente las funciones Lambda

    ```typescript
    import { Datadog, DatadogAppSecMode } from "datadog-cdk-constructs-v2";

    const datadog = new Datadog(this, "Datadog", {
        extension_layer_version: {{< latest-lambda-layer-version layer="extension" >}},
        sitio: \"<DATADOG_SITE>\",
        api_key_secret_arn: \"<DATADOG_API_KEY_SECRET_ARN>\", // o api_key
        enable_asm: true,
        datadog_app_sec_mode: DatadogAppSecMode.ON,
      });
    datadog.add_lambda_functions([<LAMBDA_FUNCTIONS>]);
    ```

    To fill in the placeholders:
    - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (asegúrese de que el SITE correcto esté seleccionado a la derecha).
    - Reemplace `<DATADOG_API_KEY_SECRET_ARN>` con el ARN del secreto de AWS donde su [clave de Datadog API][2] está almacenada de forma segura. La clave debe almacenarse como una cadena de texto plano (no como un blob JSON). Se requiere el permiso `secretsmanager:GetSecretValue`. Para pruebas rápidas, puede usar `apiKey` en su lugar y establecer la clave de Datadog API en texto plano.

    More information and additional parameters can be found on the [Datadog CDK documentation][1].

[1]: https://github.com/DataDog/datadog-cdk-constructs
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Personalizado" %}}

1. Actualice el código de su función para usar el rastreador de Go más reciente:
   ```sh
   go get -u github.com/DataDog/datadog-lambda-go
   ```

2. Instale Datadog Lambda Extension configurando las capas para su función Lambda mediante el ARN en uno de los siguientes formatos. Reemplace `<AWS_REGION>` con una región de AWS válida, como `us-east-1`:
   ```sh
   # x86-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
   # Lambda basada en arm64 en regiones comerciales de AWS
   arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
   # Lambda basada en x86 en regiones de AWS GovCloud
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
   # Lambda basada en arm64 en regiones de AWS GovCloud
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
   ```

3. Enable App and API Protection by adding the following environment variables on your function deployment:
   ```yaml
   environment:
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
     DD_SERVERLESS_APPSEC_ENABLED: true
   ```

4. Vuelva a implementar la función e invóquela. Después de unos minutos, aparece en [App and API Protection views][1].
[1]: https://app.datadoghq.com/security/appsec?column=time&order=desc

{{% /tab %}}
{{< /tabs >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?query=type%3Afunction%20&env=prod&groupBy=&hostGroup=%2A&lens=Security&sort=-attackExposure&view=list
[2]: https://docs.datadoghq.com/es/serverless/serverless_integrations/plugin
[5]: https://docs.datadoghq.com/es/serverless/libraries_integrations/plugin/#configuration-parameters
[6]: https://app.datadoghq.com/security/appsec?column=time&order=desc
[7]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[8]: https://docs.datadoghq.com/es/serverless/serverless_integrations/cli
[9]: https://github.com/DataDog/datadog-cdk-constructs
[10]: https://app.datadoghq.com/organization-settings/api-keys