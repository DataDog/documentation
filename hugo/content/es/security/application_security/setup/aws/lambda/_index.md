---
aliases:
- /es/security/application_security/getting_started/serverless
- /es/security/application_security/enabling/serverless
further_reading:
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Cómo funciona App and API Protection
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas de protección de aplicaciones y API predefinidas
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de protección de aplicaciones y API
- link: /security/application_security/threats/
  tag: Documentación
  text: App and API Protection
- link: https://www.datadoghq.com/blog/datadog-security-google-cloud/
  tag: Blog
  text: Datadog Security amplía las funciones de cumplimiento de normativas y protección
    frente a amenazas para Google Cloud
title: Activación de la protección de aplicaciones y API para AWS Lambda
---

La configuración de la protección de aplicaciones y API (AAP) para AWS Lambda implica:

1. Identificar las funciones vulnerables o atacadas que más se beneficiarían con la AAP. Encuéntralas en [la pestaña Seguridad de tu Software Catalog][1].
2. Configurar la instrumentación de AAP utilizando [Datadog CLI](https://docs.datadoghq.com/serverless/serverless_integrations/cli), [AWS CDK](https://github.com/DataDog/datadog-cdk-constructs), [complemento del Marco Serverless de Datadog][6] o manualmente utilizando las capas de rastreo de Datadog.
3. Activar señales de seguridad en tu aplicación y observar cómo Datadog muestra la información resultante.

## Requisitos previos

- El [rastreo APM serverless][apm-lambda-tracing-setup] está configurado en la función Lambda para enviar trazas (traces) directamente a Datadog.
  El rastreo de rayos X, por sí mismo, no es suficiente para AAP y requiere que el rastreo de APM esté activado.

## Compatibilidad

**Nota**: La protección frente a amenazas no es compatible a través de la configuración remota. Utiliza los [flujos][5] para bloquear direcciones IP en tu [WAF][6].

|Tipo               | Threat Detection  |
| --------------- | ----------------- |
| Java              | {{< X >}}         |
| .NET              | {{< X >}}         |
| Node          | {{< X >}}             |
| Python            | {{< X >}}         |
| Ruby              | {{< X >}}         |
| PHP               |                   |
| Go            | {{< X >}}         |

## Tipos de activación compatibles
La detección de amenazas admite solicitudes HTTP como entrada de función únicamente, ya que ese canal tiene la mayor probabilidad de que los atacantes exploten una aplicación serverless. Las solicitudes HTTP suelen proceder de servicios AWS como:
- Equilibrador de carga de aplicaciones (ALB)
- Pasarela API v1 (API Rest)
- Pasarela API v2 (API HTTP)
- URL de la función

<div class="alert alert-info">Si quieres que agreguemos la compatibilidad para alguna función que aún no es compatible, háznoslo saber. Rellena <a href="https://forms.gle/gHrxGQMEnAobukfn7">este breve formulario para enviarnos tu información</a>.</div>


## Información adicional sobre la compatibilidad específica de lenguajes

Node.js
: Si estás empaquetando con webpack o esbuild, [sigue las instrucciones específicas del empaquetador][4].

Java
: Para instrumentar de forma completa tu aplicación serverless con rastreo distribuido, tus funciones Lambda Java deben utilizar los tiempos de ejecución Java 8 Corretto (`java8.al2`), Java 11 (`java11`) o Java 17 (`java17`), con al menos 1024 MB de memoria.
: Si utilizas las capas Lambda Datadog `dd-trace-java:4` (o anteriores) y `Datadog-Extension:24` (o anteriores), sigue las instrucciones de [Actualización de la instrumentación para funciones Lambda Java][3].

## Para empezar

{{< tabs >}}
{{% tab "Serverless Framework" %}}

El [complemento del marco Serverless de Datadog][1] puede utilizarse para configurar y desplegar automáticamente tu lambda con AAP.

Para instalar y configurar el complemento del marco serverless de Datadog:

1. Instala el complemento del marco serverless de Datadog:
   ```sh
   serverless plugin install --name serverless-plugin-datadog
   ```

2. Activa AAP actualizando tu `serverless.yml` con el parámetro de configuración `enableASM`:
   ```yaml
   custom:
     datadog:
       enableASM: true
   ```

   En general, tu nuevo archivo `serverless.yml` debe contener al menos:
   ```yaml
   custom:
     datadog:
       apiKeySecretArn: "{Datadog_API_Key_Secret_ARN}" # or apiKey
       enableDDTracing: true
       enableASM: true
   ```
   Consulta también la lista completa de [parámetros de complementos][4] para configurar aún más tus parámetros Lambda.

4. Vuelve a desplegar la función e invócala. Al cabo de unos minutos, aparece en [Vistas AAP][3].

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/es/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/security/appsec?column=time&order=desc
[4]: https://docs.datadoghq.com/es/serverless/libraries_integrations/plugin/#configuration-parameters

{{% /tab %}}
{{% tab "Datadog CLI" %}}

La CLI de Datadog modifica las configuraciones de la función Lambda existentes para habilitar la instrumentación, sin necesidad de un nuevo despliegue. Es la forma más rápida de empezar a utilizar la monitorización serverless de Datadog.

**Si estás configurando el rastreo inicial para tus funciones**, sigue los siguientes pasos:

1. Instala el cliente CLI de Datadog:

    ```sh
    npm install -g @datadog/datadog-ci
    ```

2. Si recién estás empezando con la monitorización serverless de Datadog, ejecuta la CLI de Datadog en modo interactivo para guiar tu primera instalación y ejecutar un inicio rápido. En este caso puedes ignorar los pasos restantes. Para instalar permanentemente Datadog para tus aplicaciones de producción, omite este paso y sigue los pasos restantes para ejecutar el comando CLI de Datadog en tus pipelines CI/CD después de tu despliegue normal.

    ```sh
    datadog-ci lambda instrument -i --appsec
    ```

3. Configuración de las credenciales AWS:

    La CLI de Datadog requiere acceso al servicio AWS Lambda y depende del SDK JavaScript AWS para [resolver las credenciales][1]. Asegúrate de que tus credenciales AWS están configuradas utilizando el mismo método que utilizarías al invocar la CLI de AWS.

4. Configura el sitio Datadog:

    ```sh
    export DATADOG_SITE="<DATADOG_SITE>"
    ```

    Sustituye `<DATADOG_SITE>` por {{< region-param key="dd_site" code="true" >}} (asegúrate de seleccionar el sitio **Datadog ** correcto en la parte derecha de esta página).

5. Configura la clave de API de Datadog:

    Por motivos de seguridad, Datadog recomienda guardar la clave de API de Datadog en AWS Secrets Manager. La clave debe almacenarse como cadena de texto sin formato (no como blob JSON). Asegúrate de que tus funciones Lambda tienen el permiso IAM `secretsmanager:GetSecretValue` necesario.

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

    Para realizar tests, también puedes configurar la clave de API de Datadog utilizando texto sin formato:

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

6. Instrumenta tus funciones Lambda:

    Para instrumentar tus funciones Lambda, ejecuta el siguiente comando.

    ```sh
    datadog-ci lambda instrument --appsec -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="python" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    ```

    Para rellenar los parámetros:
    - Reemplaza `<functionname>` y `<another_functionname>` por los nombres de tu función de Lambda.
    - También puedes utilizar expresiones regulares (regex) de funciones para instrumentar automáticamente varias funciones cuyos nombres coincidan con la expresión regular dada.
    - Sustituye `<aws_region>` por el nombre de la región AWS.

   **Nota**: Primero, instrumenta tus funciones Lambda en un entorno de desarrollo o de staging. Si el resultado de la instrumentación no es satisfactorio, ejecuta `uninstrument` con los mismos argumentos para revertir los cambios.

    Puedes encontrar parámetros adicionales en la [documentación de la CLI][2].


[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/es/serverless/serverless_integrations/cli

{{% /tab %}}
{{% tab "AWS CDK" %}}

El [Constructo CDK Datadog][1] instala automáticamente Datadog en tus funciones utilizando capas Lambda y configura tus funciones para enviar métricas, trazas y logs a Datadog a través de la extensión Lambda de Datadog.

1. Instala la librería del constructo CDK Datadog:

    ```sh
    # For AWS CDK v1
    pip install datadog-cdk-constructs

    # For AWS CDK v2
    pip install datadog-cdk-constructs-v2
    ```

2. Instrumentación de tus funciones Lambda

    ```python
    # For AWS CDK v1
    from datadog_cdk_constructs import Datadog
    # NOT SUPPORTED IN V1

    # For AWS CDK v2
    from datadog_cdk_constructs_v2 import Datadog

    datadog = Datadog(self, "Datadog",
        python_layer_version={{< latest-lambda-layer-version layer="python" >}},
        extension_layer_version={{< latest-lambda-layer-version layer="extension" >}},
        site="<DATADOG_SITE>",
        api_key_secret_arn="<DATADOG_API_KEY_SECRET_ARN>", // or api_key
        enable_asm=True,
      )
    datadog.add_lambda_functions([<LAMBDA_FUNCTIONS>])
    ```

    Para rellenar los parámetros:
    - Sustituye `<DATADOG_SITE>` por {{< region-param key="dd_site" code="true" >}} (asegúrate de haber seleccionado el SITIO correcto del lado derecho).
    - Sustituye `<DATADOG_API_KEY_SECRET_ARN>` por el ARN del secreto AWS donde se almacena de forma segura tu [clave de API de Datadog][2]. La clave debe almacenarse como una cadena de texto sin formato (no como un blob JSON). Se requiere el permiso `secretsmanager:GetSecretValue`. Para realizar tests rápidos, puedes utilizar `apiKey` y configurar la clave de API de Datadog utilizando texto sin formato.

    Para obtener más información y parámetros adicionales, consulta la [documentación del CDK de Datadog][1].

[1]: https://github.com/DataDog/datadog-cdk-constructs
[2]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{% tab "Custom" %}}

{{< site-region region="us,us3,us5,eu,gov" >}}
1. Instala el rastreador Datadog:
   - **Python**
       ```sh
       # Use this format for x86-based Lambda deployed in AWS commercial regions
          arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="python" >}}

          # Use this format for arm64-based Lambda deployed in AWS commercial regions
          arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>-ARM:{{< latest-lambda-layer-version layer="python" >}}

          # Use this format for x86-based Lambda deployed in AWS GovCloud regions
          arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="python" >}}

          # Use this format for arm64-based Lambda deployed in AWS GovCloud regions
          arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>-ARM:72
          ```
Sustituye `<AWS_REGION>` por una región AWS válida, como `us-east-1`. Las opciones de `RUNTIME` disponibles son `Python37`, `Python38` y `Python39`.

   - **Node**
       ``` sh
       # Use this format for AWS commercial regions
         arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}

         # Use this format for AWS GovCloud regions
         arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}
         ```
Sustituye `<AWS_REGION>` por una región AWS válida como `us-east-1`. Las opciones de RUNTIME (Tiempo de ejecución) disponibles son {{< latest-lambda-layer-version layer="node-versions" >}}.

   - **Java**: [Configura las capas][1] para tu función Lambda utilizando el ARN en uno de los siguientes formatos, dependiendo de dónde se despliega tu Lambda. Sustituye `<AWS_REGION>` por una región AWS válida, como `us-east-1`:
     ```sh
     # In AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}
     # In AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}
     ```
   - **Go**: El rastreador Go no depende de una capa y es un módulo Go normal. Puedes actualizar a su última versión con:
     ```sh
     go get -u github.com/DataDog/datadog-lambda-go
     ```
   - **.NET**: [Configura las capas][1] para tu función Lambda utilizando el ARN en uno de los siguientes formatos, en función de dónde se despliega tu Lambda. Sustituye `<AWS_REGION>` por una región AWS válida, como `us-east-1`:
     ```sh
     # x86-based Lambda in AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     # arm64-based Lambda in AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-dotnet-ARM:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     # x86-based Lambda in AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     # arm64-based Lambda  in AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet-ARM:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     ```
2. Instala la extensión Lambda de Datadog configurando las capas para tu función Lambda, utilizando el ARN en uno de los siguientes formatos. Sustituye `<AWS_REGION>` por una región AWS válida como `us-east-1`:
   ```sh
   # x86-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
   # arm64-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
   # x86-based Lambda in AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
   # arm64-based Lambda in AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
   ```
   [1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
{{< /site-region >}}

{{< site-region region="ap1" >}}
1. Instala el rastreador Datadog:
   - **Python**
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
Sustituye `<AWS_REGION>` por una región AWS válida como `us-east-1`. Las opciones de `RUNTIME` disponibles son {{< latest-lambda-layer-version layer="python-versions" >}}.
.

   - **Node**
       ``` sh
       # Use this format for AWS commercial regions
         arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}

         # Use this format for AWS GovCloud regions
         arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}
         ```
Sustituye `<AWS_REGION>` por una región AWS válida como `us-east-1`. Las opciones de RUNTIME (Tiempo de ejecución) disponibles son {{< latest-lambda-layer-version layer="node-versions" >}}.


   - **Java**: [Configura las capas][1] para tu función Lambda utilizando el ARN en uno de los siguientes formatos, dependiendo de dónde se despliega tu Lambda. Sustituye `<AWS_REGION>` por una región AWS válida, como `us-east-1`:
     ```sh
     # In AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:417141415827:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}
     # In AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}
     ```
   - **Go**: El rastreador Go no depende de una capa y es un módulo Go normal. Puedes actualizar a su última versión con:
     ```sh
     go get -u github.com/DataDog/datadog-lambda-go
     ```
   - **.NET**: [Configura las capas][1] para tu función Lambda utilizando el ARN en uno de los siguientes formatos, en función de dónde se despliega tu Lambda. Sustituye `<AWS_REGION>` por una región AWS válida, como `us-east-1`:
     ```sh
     # x86-based Lambda in AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:417141415827:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     # arm64-based Lambda in AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:417141415827:layer:dd-trace-dotnet-ARM:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     # x86-based Lambda in AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     # arm64-based Lambda  in AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet-ARM:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     ```
2. Instala la extensión Lambda de Datadog configurando las capas para tu función Lambda, utilizando el ARN en uno de los siguientes formatos. Sustituye `<AWS_REGION>` por una región AWS válida como `us-east-1`:
   ```sh
   # x86-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:417141415827:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
   # arm64-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:417141415827:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
   # x86-based Lambda in AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
   # arm64-based Lambda in AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
   ```

   [1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
{{< /site-region >}}

{{< site-region region="ap2" >}}
1. Instala el rastreador Datadog:
   - **Python**
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
Sustituye `<AWS_REGION>` por una región AWS válida como `us-east-1`. Las opciones de `RUNTIME` disponibles son {{< latest-lambda-layer-version layer="python-versions" >}}.
.

   - **Node**
       ``` sh
       # Use this format for AWS commercial regions
         arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}

         # Use this format for AWS GovCloud regions
         arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}
         ```
Sustituye `<AWS_REGION>` por una región AWS válida como `us-east-1`. Las opciones de RUNTIME (Tiempo de ejecución) disponibles son {{< latest-lambda-layer-version layer="node-versions" >}}.


   - **Java**: [Configura las capas][1] para tu función Lambda utilizando el ARN en uno de los siguientes formatos, dependiendo de dónde se despliega tu Lambda. Sustituye `<AWS_REGION>` por una región AWS válida, como `us-east-1`:
     ```sh
     # In AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:412381753143:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}
     # In AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}
     ```
   - **Go**: El rastreador Go no depende de una capa y es un módulo Go normal. Puedes actualizar a su última versión con:
     ```sh
     go get -u github.com/DataDog/datadog-lambda-go
     ```
   - **.NET**: [Configura las capas][1] para tu función Lambda utilizando el ARN en uno de los siguientes formatos, en función de dónde se despliega tu Lambda. Sustituye `<AWS_REGION>` por una región AWS válida, como `us-east-1`:
     ```sh
     # x86-based Lambda in AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:412381753143:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     # arm64-based Lambda in AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:412381753143:layer:dd-trace-dotnet-ARM:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     # x86-based Lambda in AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     # arm64-based Lambda  in AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet-ARM:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     ```
2. Instala la extensión Lambda de Datadog configurando las capas para tu función Lambda, utilizando el ARN en uno de los siguientes formatos. Sustituye `<AWS_REGION>` por una región AWS válida como `us-east-1`:
   ```sh
   # x86-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:412381753143:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
   # arm64-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:412381753143:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
   # x86-based Lambda in AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
   # arm64-based Lambda in AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
   ```

   [1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
{{< /site-region >}}

3. Activa AAP añadiendo las siguientes variables de entorno en tu despliegue de funciones:
   ```yaml
   environment:
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
     DD_SERVERLESS_APPSEC_ENABLED: true
   ```

4. Sólo para funciones **Node** y **Python**, comprueba que el gestor de la función está configurado correctamente:
    - **Node: Configura el gestor de tu función como `/opt/nodejs/node_modules/datadog-lambda-js/handler.handler`.
       - Además, configura la variable de entorno `DD_LAMBDA_HANDLER` en tu gestor original. Por ejemplo, `myfunc.handler`.
    - **Python: Configura el gestor de tu función como `datadog_lambda.handler.handler`.
       - Además, configura la variable de entorno `DD_LAMBDA_HANDLER` en tu gestor original. Por ejemplo, `myfunc.handler`.

5. Vuelve a desplegar la función e invócala. Al cabo de unos minutos, aparece en [Vistas AAP][3].

[3]: https://app.datadoghq.com/security/appsec?column=time&order=desc

{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?query=type%3Afunction%20&env=prod&groupBy=&hostGroup=%2A&lens=Security&sort=-attackExposure&view=list
[2]: /es/serverless/distributed_tracing/
[3]: https://app.datadoghq.com/security/appsec
[4]: /es/security/application_security/serverless/compatibility
[5]: /es/security/default_rules/security-scan-detected/
[6]: /es/serverless/libraries_integrations/plugin/
[apm-lambda-tracing-setup]: https://docs.datadoghq.com/serverless/aws_lambda/distributed_tracing/
