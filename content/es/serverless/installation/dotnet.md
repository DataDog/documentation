---
further_reading:
- link: /serverless/configuration
  tag: Documentación
  text: Configurar la monitorización serverless
- link: /serverless/guide/troubleshoot_serverless_monitoring
  tag: Documentación
  text: Solucionar los problemas de la monitorización serverless
- link: serverless/custom_metrics/
  tag: Documentación
  text: Enviar métricas personalizadas desde aplicaciones serverless
kind: documentación
title: Instrumentar aplicaciones .NET serverless
---

<div class="alert alert-warning">Si implementas tus funciones lambda en la VPC sin tener acceso a la red pública de Internet, podrás enviar datos mediante <a href="/agent/guide/private-link/">AWS PrivateLink</a>, en caso de que uses el <a href="/getting_started/site/">sitio de Datadog</a> <code>datadoghq.com</code>, o bien mediante un <a href="/agent/proxy/">proxy</a>, en caso de que uses cualquier otro sitio.</div>

## Instalación

Datadog te permite habilitar la instrumentación de tus aplicaciones serverless de muchas formas diferentes. Elige el método que más te convenga de todos los que te presentamos a continuación. Por norma general, Datadog recomienda usar la interfaz de línea de comandos de Datadog (Datadog CLI).

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Datadog CLI modifica la configuración de las funciones lambda existentes para habilitar la instrumentación sin necesidad de llevar a cabo otra implementación. Es la forma más rápida de empezar con la monitorización serverless de Datadog.

1. Instala el cliente de Datadog CLI

    ```sh
    npm install -g @datadog/datadog-ci
    ```

2. Si es la primera vez que usas la monitorización serverless de Datadog, inicia Datadog CLI en modo interactivo para recibir instrucciones sobre cómo realizar la primera instalación. Esto te permitirá entrar en materia rápidamente y saltarte los demás pasos. Si deseas instalar Datadog de forma permanente en tus aplicaciones de producción, omite ese paso y dirígete directamente a los siguientes para ejecutar el comando de Datadog CLI en tus canalizaciones CI/CD _después_ de haber efectuado la implementación de la forma tradicional.

    ```sh
    datadog-ci lambda instrument -i
    ```

3. Configura las credenciales de AWS

    Datadog CLI necesita acceder al servicio AWS Lambda y depende del SDK de AWS para JavaScript a la hora de [configurar las credenciales][1]. Asegúrate de que tus credenciales de AWS estén configuradas con el mismo método que utilizarás para recurrir a la interfaz de línea de comandos de AWS.

4. Configura el sitio de Datadog

    ```sh
    export DATADOG_SITE="<DATADOG_SITE>"
    ```

    Reemplaza `<DATADOG_SITE>` por {{< region-param key="dd_site" code="true" >}} [asegúrate de que has seleccionado el sitio (SITE) correcto a la derecha].

5. Configura la clave de API de Datadog

    Datadog recomienda guardar la clave de API de Datadog en AWS Secrets Manager para una mayor seguridad y una rotación más sencilla. La clave tiene que almacenarse en una cadena de texto sin formato (no en un blob JSON). Asegúrate de que tus funciones lambda cuenten con el permiso de IAM `secretsmanager:GetSecretValue` obligatorio.

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

    Para agilizar la prueba, también puedes configurar la clave de API de Datadog en texto sin formato:

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

6. Instrumenta tus funciones lambda

    **Nota**: Antes de nada, instrumenta tus funciones lambda en un entorno de desarrollo o ensayo. Si el resultado de la instrumentación no es satisfactorio, ejecuta `uninstrument` con los mismos argumentos para revertir los cambios.

    Para instrumentar tus funciones lambda, ejecuta el siguiente comando.

    ```sh
    datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="dd-trace-dotnet" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    ```

    Para rellenar los marcadores de posición:
    - Reemplaza `<functionname>` y `<another_functionname>` por los nombres de tus funciones lambda. Otra posibilidad es usar `--functions-regex` para instrumentar automáticamente varias funciones cuyos nombres coincidan con la expresión regular facilitada.
    - Reemplaza `<aws_region>` por el nombre de la región de AWS.

    Si necesitas parámetros adicionales, consulta la [documentación acerca de la interfaz de línea de comandos (CLI)][3].

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[3]: https://docs.datadoghq.com/es/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Marco serverless" %}}

El [plugin serverless de Datadog][1] configura automáticamente tus funciones para enviar métricas, trazas (traces) y logs a Datadog mediante la [extensión Datadog Lambda][2].

Para instalar y configurar el plugin serverless de Datadog, sigue estos pasos:

1. Instala el plugin serverless de Datadog:

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

    Para rellenar los marcadores de posición:
    - Reemplaza `<DATADOG_SITE>` por {{< region-param key="dd_site" code="true" >}} [asegúrate de que has seleccionado el sitio (SITE) correcto a la derecha].
    - Reemplaza `<DATADOG_API_KEY_SECRET_ARN>` por el ARN del secreto de AWS siempre que tu [clave de API de Datadog][4] se haya almacenado de forma segura. La clave tiene que almacenarse en una cadena de texto sin formato (no en un blob JSON). El permiso `secretsmanager:GetSecretValue` es obligatorio. Para agilizar la prueba, puedes usar `apiKey` y configurar la clave de API de Datadog en texto sin formato.

    Para obtener más información y ajustes adicionales, consulta la [documentación acerca del plugin][1].

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/es/serverless/libraries_integrations/extension
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Imagen de contenedor" %}}

1. Instala la extensión Datadog Lambda

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/. /opt/
    ```

    Reemplaza `<TAG>` por un número de versión específico (ej.: `{{< latest-lambda-layer-version layer="extension" >}}`) o por `latest`. Para ver una lista completa con todas las etiquetas (tags) posibles, dirígete al  [repositorio de Amazon ECR][1].

2. Instala el cliente de Datadog .NET APM

    ```dockerfile
    RUN yum -y install tar wget gzip
    RUN wget https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm-<TRACER_VERSION>.tar.gz
    RUN mkdir /opt/datadog
    RUN tar -C /opt/datadog -xzf datadog-dotnet-apm-<TRACER_VERSION>.tar.gz
    ENV AWS_LAMBDA_EXEC_WRAPPER /opt/datadog_wrapper
    ```

    Reemplaza `<TRACER_VERSION>` por el número de versión de `dd-trace-dotnet` que quieras usar (ej.: `2.3.0`). La versión compatible más antigua es `2.3.0`. Puedes consultar las versiones más recientes de `dd-trace-dotnet` en [GitHub][2].

3. Configura las variables de entorno obligatorias

    - Configura la variable de entorno `DD_SITE` como {{< region-param key="dd_site" code="true" >}} [asegúrate de que has seleccionado el sitio (SITE) correcto a la derecha].
    - Configura la variable de entorno `DD_API_KEY_SECRET_ARN` con el ARN del secreto de AWS siempre que tu [clave de API de Datadog][3] se haya almacenado de forma segura. La clave tiene que almacenarse en una cadena de texto sin formato (no en un blob JSON). El permiso `secretsmanager:GetSecretValue` es obligatorio. Para agilizar la prueba, puedes usar `DD_API_KEY` y configurar la clave de API de Datadog en texto sin formato.

[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://github.com/DataDog/dd-trace-dotnet/releases
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Personalizado" %}}

1. Instala el rastreador de Datadog

    [Configura las capas][1] de tu función lambda usando el siguiente formato de ARN:

    ```sh
    # Use this format for x86-based Lambda deployed in AWS commercial regions
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}

    # Use this format for arm64-based Lambda deployed in AWS commercial regions
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-dd-trace-dotnet-ARM:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}

    # Use this format for x86-based Lambda deployed in AWS GovCloud regions
    arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}

    # Use this format for arm64-based Lambda deployed in AWS GovCloud regions
    arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet-ARM:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
    ```

    Reemplaza `<AWS_REGION>` por una región de AWS válida, como puede ser `us-east-1`.

2. Instala la extensión Datadog Lambda

    [Configura las capas][1] de tu función lambda usando el siguiente formato de ARN:

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

    Reemplaza `<AWS_REGION>` por una región de AWS válida, como puede ser `us-east-1`.

3. Configura las variables de entorno obligatorias

    - Configura `AWS_LAMBDA_EXEC_WRAPPER` como `/opt/datadog_wrapper`.
    - Configura `DD_SITE` como {{< region-param key="dd_site" code="true" >}} [asegúrate de que has seleccionado el sitio (SITE) correcto a la derecha].
    - Configura `DD_API_KEY_SECRET_ARN` como ARN del secreto de AWS siempre que tu [clave de API de Datadog][2] se haya almacenado de forma segura. La clave tiene que almacenarse en una cadena de texto sin formato (no en un blob JSON). El permiso `secretsmanager:GetSecretValue` es obligatorio. Para agilizar la prueba, puedes usar `DD_API_KEY` y configurar la clave de API de Datadog en texto sin formato.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

## ¿Qué toca hacer ahora?

- Ya puedes consultar las métricas, logs y trazas en la [Página principal serverless][1].
- Envía una [métrica personalizada][2] o [tramo de APM][3] para monitorizar tu lógica empresarial.
- Consulta la [guía sobre cómo solucionar los problemas][4] si necesitas ayuda para recopilar la telemetría.
- Consulta la [configuración avanzada][5] para:
    - conectar tu telemetría mediante el uso de tags,
    - recopilar la telemetría de Amazon API Gateway, Amazon SQS, etc.,
    - capturar las cargas de solicitud y respuesta de Lambda,
    - vincular los errores de tus funciones lambda con tu código fuente,
    - filtrar o borrar información confidencial procedente de logs o trazas.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/functions
[2]: https://docs.datadoghq.com/es/metrics/dogstatsd_metrics_submission/
[3]: /es/tracing/custom_instrumentation/dotnet/
[4]: /es/serverless/guide/troubleshoot_serverless_monitoring/
[5]: /es/serverless/configuration/