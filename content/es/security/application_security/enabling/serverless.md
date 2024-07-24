---
aliases:
- /security/application_security/getting_started/serverless
further_reading:
- link: /security/application_security/how-appsec-works/
  tag: Documentación
  text: Cómo funciona la seguridad de las aplicaciones
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Normas de Application Security Management predefinido
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas de Application Security Management
- link: /security/application_security/threats/
  tag: Documentación
  text: Gestión de las amenazas a las aplicaciones
- link: https://www.datadoghq.com/blog/datadog-security-google-cloud/
  tag: Blog
  text: Datadog Security amplía las funciones de cumplimiento de normativas y protección
    frente a amenazas para Google Cloud
title: Habilitar ASM para serverless
---

{{< partial name="security-platform/appsec-serverless.html" >}}</br>

Para obtener información sobre qué funciones de ASM están disponibles para funciones serverless, consulta los [requisitos de compatibilidad][4].

## AWS Lambda

Configurar ASM para AWS Lambda implica:

1. Identificar las funciones vulnerables o susceptibles de sufrir ataques, que más se beneficiarían con ASM. Encuéntralas en [la pestaña Seguridad de tu Catálogo de servicios][1].
2. Configurar la instrumentación ASM utilizando la [CLI de Datadog](https://docs.datadoghq.com/serverless/serverless_integrations/cli), el [kit de desarrollo en la nube (CDK) AWS](https://github.com/DataDog/datadog-cdk-constructs), el [complemento del marco serverless de Datadog][6], o manualmente, utilizando las capas de rastreo de Datadog.
3. Activar señales de seguridad en tu aplicación y observar cómo Datadog muestra la información resultante.

### Requisitos previos

- El [rastreo APM serverless][apm-lambda-tracing-setup] está configurado en la función Lambda para enviar trazas (traces) directamente a Datadog.
  El rastreo X-Ray, por sí mismo, no es suficiente para ASM y requiere que el rastreo APM esté habilitado.

### Para empezar

{{< tabs >}}
{{% tab "Marco serverless" %}}

El [complemento del marco serverless de Datadog[1] se puede utilizar para configurar y desplegar automáticamente tu función lambda con ASM.

Para instalar y configurar el complemento del marco serverless de Datadog:

1. Instala el complemento del marco serverless de Datadog:
   ```sh
   serverless plugin install --name serverless-plugin-datadog
   ```

2. Habilita ASM actualizando tu `serverless.yml` con el parámetro de configuración `enableASM`:
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
   Consulta también la página completa lista de [parámetros de complementos][4] para configurar aún más tus parámetros Lambda.

4. Vuelve a desplegar la función e invócala. Al cabo de unos minutos, aparecerá en las [vistas ASM][3].

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/es/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/security/appsec?column=time&order=desc
[4]: https://docs.datadoghq.com/es/serverless/libraries_integrations/plugin/#configuration-parameters

{{% /tab %}}
{{% tab "CLI de Datadog" %}}

La CLI de Datadog modifica las configuraciones de la función Lambda existentes para habilitar la instrumentación sin necesidad de un nuevo despliegue. Es la forma más rápida de empezar a utilizar la monitorización serverless de Datadog.

**Si estás configurando el rastreo inicial para tus funciones**, realiza los siguientes pasos:

1. Instale el cliente CLI Datadog:

    ```sh
    npm install -g @datadog/datadog-ci
    ```

2. Si recién estás empezando con la monitorización serverless de Datadog, ejecuta la CLI de Datadog en modo interactivo para guiar tu primera instalación y ejecutar un inicio rápido. En este caso puedes ignorar los pasos restantes. Para instalar permanentemente Datadog para tus aplicaciones de producción, omite este paso y sigue los pasos restantes para ejecutar el comando CLI de Datadog en tus pipelines CI/CD después de tu despliegue normal.

    ```sh
    datadog-ci lambda instrument -i --appsec
    ```

3. Configuración de las credenciales AWS:

   La CLI de Datadog requiere acceso al servicio AWS Lambda y depende del SDK AWS JavaScript para [resolver las credenciales][1]. Asegúrate de que tus credenciales AWS están configuradas utilizando el mismo método que utilizarías al invocar la CLI de AWS.

4. Configura el sitio Datadog:

    ```sh
    export DATADOG_SITE="<DATADOG_SITE>"
    ```

    Sustituya `<DATADOG_SITE>` por {{< region-param key="dd_site" code="true" >}} (asegúrese de seleccionar el sitio **Datadog ** correcto en la parte derecha de esta página).

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
    - Sustituye `<functionname>` y `<another_functionname>` por los nombres de tu función Lambda.
    - También puedes utilizar `--funciones-regex` para instrumentar automáticamente varias funciones cuyos nombres coincidan con la expresión regular dada.
    - Sustituye `<aws_region>` por el nombre de la región AWS.

   **Nota**: Primero, instrumenta tus funciones Lambda en un entorno de desarrollo o de staging. Si el resultado de la instrumentación no es satisfactorio, ejecuta `uninstrument` con los mismos argumentos para revertir los cambios.

   Puedes encontrar parámetros adicionales en la [documentación de la CLI][2].


[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/es/serverless/serverless_integrations/cli

{{% /tab %}}
{{% tab "CDK AWS" %}}

El [Constructo del CDK Datadog][1] instala automáticamente Datadog en tus funciones utilizando capas Lambda y configura tus funciones para enviar métricas, trazas y logs a Datadog a través de la extensión Lambda de Datadog.

1. Instala la biblioteca del constructo del CDK Datadog:

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
    - Sustituye `<DATADOG_SITE>` por {{< region-param key="dd_site" code="true" >}} [Asegúrate de haber seleccionado el SITE (Sitio) correcto a la derecha].
    - Sustituye `<DATADOG_API_KEY_SECRET_ARN>` por el ARN del secreto AWS donde se almacena de forma segura tu [clave de API de Datadog][2]. La clave debe almacenarse como una cadena de texto sin formato (no como un blob JSON). Se requiere el permiso `secretsmanager:GetSecretValue`. Para realizar tests rápidos, puedes utilizar `apiKey` y configurar la clave de API de Datadog utilizando texto sin formato.

    Para obtener más información y parámetros adicionales, consulta la [documentación del CDK de Datadog][1].

[1]: https://github.com/DataDog/datadog-cdk-constructs
[2]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{% tab "Personalizado" %}}

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

   - **Java**: [Configura las capas][1] para tu función Lambda utilizando el ARN en uno de los siguientes formatos, dependiendo de dónde se despliegue tu Lambda. Sustituye `<AWS_REGION>` por una región AWS válida, como `us-east-1`:
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
   - **.NET**: [Configura las capas][1] para tu función Lambda utilizando el ARN en uno de los siguientes formatos, en función de dónde se despliegue tu Lambda. Sustituye `<AWS_REGION>` por una región AWS válida, como `us-east-1`:
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
2. Instala la extensión Lambda de Datadog configurando las capas para tu función Lambda utilizando el ARN en uno de los siguientes formatos. Sustituye `<AWS_REGION>` por una región AWS válida como `us-east-1`:
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


   - **Java**: [Configura las capas][1] para tu función Lambda utilizando el ARN en uno de los siguientes formatos, dependiendo de dónde se despliegue tu Lambda. Sustituye `<AWS_REGION>` por una región AWS válida, como `us-east-1`:
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
   - **.NET**: [Configura las capas][1] para tu función Lambda utilizando el ARN en uno de los siguientes formatos, en función de dónde se despliegue tu Lambda. Sustituye `<AWS_REGION>` por una región AWS válida, como `us-east-1`:
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
2. Instala la extensión Lambda de Datadog configurando las capas para tu función Lambda utilizando el ARN en uno de los siguientes formatos. Sustituye `<AWS_REGION>` por una región AWS válida como `us-east-1`:
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

3. Habilita ASM añadiendo las siguientes variables de entorno en el despliegue de tu función:
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

5. Vuelve a desplegar la función e invócala. Al cabo de unos minutos, aparecerá en las [vistas ASM][3].

[3]: https://app.datadoghq.com/security/appsec?column=time&order=desc

{{% /tab %}}
{{< /tabs >}}

## Google Cloud Run

<div class="alert alert-info">La compatibilidad de ASM con Google Cloud Run está en fase beta.</a></div>

### Cómo funciona `serverless-init` 

La aplicación `serverless-init` envuelve tu proceso y lo ejecuta como un subproceso. Inicia un escuchador de DogStatsD para métricas y un escuchador de trazas de Trace Agent. Recopila logs envolviendo los flujos stdout/stderr de tu aplicación. Después de arrancar, `serverless-init` inicia tu comando como un subproceso.

Para una instrumentación completa, asegúrate de que estás llamando a `datadog-init` como el primer comando que se ejecuta dentro de tu contenedor Docker. Puedes hacerlo configurándolo como punto de entrada, o configurándolo como el primer argumento en CMD.

### Para empezar

{{< tabs >}}
{{% tab "NodeJS" %}}
Añade las siguientes instrucciones y argumentos a tu archivo Docker.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/
ENV DD_SERVICE=datadog-demo-run-nodejs
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["/nodejs/bin/node", "/path/to/your/app.js"]
```

#### Explicación

1. Copia el proceso `serverless-init` de Datadog en tu imagen Docker.

   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Copia el rastreador Node.JS de Datadog en tu imagen Docker.

   ```dockerfile
   COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/
   ```

   Si instalas la biblioteca del rastreador Datadog directamente en tu aplicación, como se indica en las [instrucciones de instrumentación manual del rastreador][1], omite este paso.

3. (Opcional) Añade etiquetas (tags) de Datadog.

   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-nodejs
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ENV DD_APPSEC_ENABLED=1
   ```

4. Cambia el punto de entrada para envolver tu aplicación en el proceso `serverless-init` de Datadog.
   **Nota**: Si ya tienes un punto de entrada definido dentro de tu archivo Docker, consulta la [configuración alternativa](#alt-node).

   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Ejecuta tu aplicación binaria envuelta en el punto de entrada. Adapta esta línea según tus necesidades.
   ```dockerfile
   CMD ["/nodejs/bin/node", "/path/to/your/app.js"]
   ```
#### Configuración alternativa {#alt-node}
Si ya tienes un punto de entrada definido dentro de tu archivo Docker, puedes modificar el argumento CMD.

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/
ENV DD_SERVICE=datadog-demo-run-nodejs
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
CMD ["/app/datadog-init", "/nodejs/bin/node", "/path/to/your/app.js"]
{{< /highlight >}}

Si necesitas que tu punto de entrada también se instrumente, puedes intercambiar tu punto de entrada y tus argumentos CMD. Para obtener más información, consulta [Cómo funciona `serverless-init`](#how-serverless-init-works).

{{< highlight dockerfile "hl_lines=7-8" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/
ENV DD_SERVICE=datadog-demo-run-nodejs
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["/your_entrypoint.sh", "/nodejs/bin/node", "/path/to/your/app.js"]
{{< /highlight >}}

Obtendrás una instrumentación completa, siempre y cuando el comando que se va a ejecutar se pase como argumento a `datadog-init`.

[1]: /es/tracing/trace_collection/dd_libraries/nodejs/?tab=containers#instrument-your-application

{{% /tab %}}
{{% tab "Python" %}}

Añade las siguientes instrucciones y argumentos a tu archivo Docker.
```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
RUN pip install --target /dd_tracer/python/ ddtrace
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
```

#### Explicación

1. Copia el proceso `serverless-init` de Datadog en tu imagen Docker.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Instala el rastreador Python de Datadog.
   ```dockerfile
   RUN pip install --target /dd_tracer/python/ ddtrace
   ```
   Si instalas la biblioteca del rastreador Datadog directamente en tu aplicación, como se indica en las [instrucciones de instrumentación manual del rastreador][1], omite este paso.

3. (Opcional) Añade etiquetas de Datadog.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-python
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ENV DD_APPSEC_ENABLED=1
   ```

4. Cambia el punto de entrada para envolver tu aplicación en el proceso `serverless-init` de Datadog.
   **Nota**: Si ya tienes un punto de entrada definido dentro de tu archivo Docker, consulta la [configuración alternativa](#alt-python).
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Ejecuta tu aplicación binaria envuelta en el punto de entrada, iniciado por la biblioteca de rastreo de Datadog. Adapta esta línea según tus necesidades.
   ```dockerfile
   CMD ["/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
   ```
#### Configuración alternativa {#alt-python}
Si ya tienes un punto de entrada definido dentro de tu archivo Docker, puedes modificar el argumento CMD.

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
RUN pip install --target /dd_tracer/python/ ddtrace
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
CMD ["/app/datadog-init", "/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
{{< /highlight >}}

Si necesitas que tu punto de entrada también se instrumente, puedes intercambiar tu punto de entrada y tus argumentos CMD. Para obtener más información, consulta [Cómo funciona `serverless-init`](#how-serverless-init-works).

{{< highlight dockerfile "hl_lines=7-8" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
RUN pip install --target /dd_tracer/python/ ddtrace
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
{{< /highlight >}}

Obtendrás una instrumentación completa, siempre y cuando el comando que se va a ejecutar se pase como argumento a `datadog-init`.

[1]: /es/tracing/trace_collection/dd_libraries/python/?tab=containers#instrument-your-application

{{% /tab %}}
{{% tab "Java" %}}

Añade las siguientes instrucciones y argumentos a tu archivo Docker.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD 'https://dtdg.co/latest-java-tracer' /dd_tracer/java/dd-java-agent.jar
ENV DD_SERVICE=datadog-demo-run-java
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["./mvnw", "spring-boot:run"]
```
#### Explicación

1. Copia el proceso `serverless-init` de Datadog en tu imagen Docker.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Añade el rastreador Java de Datadog en tu imagen Docker.
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' /dd_tracer/java/dd-java-agent.jar
   ```
   Si instalas la biblioteca del rastreador Datadog directamente en tu aplicación, como se indica en las [instrucciones de instrumentación manual del rastreador][1], omite este paso.

3. (Opcional) Añade etiquetas de Datadog.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-java
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ENV DD_APPSEC_ENABLED=1
   ```

4. Cambia el punto de entrada para envolver tu aplicación en el proceso `serverless-init` de Datadog.
   Si ya tienes un punto de entrada definido dentro de tu archivo Docker, consulta la [configuración alternativa](#alt-java).
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Ejecuta tu aplicación binaria envuelta en el punto de entrada. Adapta esta línea según tus necesidades.
   ```dockerfile
   CMD ["./mvnw", "spring-boot:run"]
   ```

#### Configuración alternativa {#alt-java}
Si ya tienes un punto de entrada definido dentro de tu archivo Docker, puedes modificar el argumento CMD.

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD 'https://dtdg.co/latest-java-tracer' /dd_tracer/java/dd-java-agent.jar
ENV DD_SERVICE=datadog-demo-run-java
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
CMD ["/app/datadog-init", "./mvnw", "spring-boot:run"]
{{< /highlight >}}

Si necesitas que tu punto de entrada también se instrumente, puedes intercambiar tu punto de entrada y tus argumentos CMD. Para obtener más información, consulta [Cómo funciona `serverless-init`](#how-serverless-init-works).

{{< highlight dockerfile "hl_lines=7-8" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD 'https://dtdg.co/latest-java-tracer' /dd_tracer/java/dd-java-agent.jar
ENV DD_SERVICE=datadog-demo-run-java
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "./mvnw", "spring-boot:run"]
{{< /highlight >}}

Obtendrás una instrumentación completa, siempre y cuando el comando que se va a ejecutar se pase como argumento a `datadog-init`.

[1]: /es/tracing/trace_collection/dd_libraries/java/?tab=containers#instrument-your-application

{{% /tab %}}
{{% tab "Go" %}}

[Instala manualmente][1] el rastreador Go antes de desplegar tu aplicación. Compila tu binario go con la etiqueta "appsec" habilitada (`go build --tags "appsec" ...`). Añade las siguientes instrucciones y argumentos a tu archivo Docker:

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
```

#### Explicación

1. Copia el proceso `serverless-init` de Datadog en tu imagen Docker.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

4. Cambia el punto de entrada para envolver tu aplicación en el proceso `serverless-init` de Datadog.
   **Nota**: Si ya tienes un punto de entrada definido dentro de tu archivo Docker, consulta la [configuración alternativa](#alt-go).
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

3. (Opcional) Añade etiquetas de Datadog.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-go
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ENV DD_APPSEC_ENABLED=1
   ```

4. Ejecuta tu aplicación binaria envuelta en el punto de entrada. Adapta esta línea según tus necesidades.
   ```dockerfile
   CMD ["/path/to/your-go-binary"]
   ```

#### Configuración alternativa {#alt-go}
Si ya tienes un punto de entrada definido dentro de tu archivo Docker, puedes modificar el argumento CMD.

{{< highlight dockerfile "hl_lines=6" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
CMD ["/app/datadog-init", "/path/to/your-go-binary"]
{{< /highlight >}}

Si necesitas que tu punto de entrada también se instrumente, puedes intercambiar tu punto de entrada y tus argumentos CMD. Para obtener más información, consulta [Cómo funciona `serverless-init`](#how-serverless-init-works).

{{< highlight dockerfile "hl_lines=6-7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "/path/to/your-go-binary"]
{{< /highlight >}}

Obtendrás una instrumentación completa, siempre y cuando el comando que se va a ejecutar se pase como argumento a `datadog-init`.

[1]: /es/tracing/trace_collection/dd_libraries/go

{{% /tab %}}
{{% tab ".NET" %}}

Añade las siguientes instrucciones y argumentos a tu archivo Docker.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/
ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["dotnet", "helloworld.dll"]
```

#### Explicación

1. Copia el proceso `serverless-init` de Datadog en tu imagen Docker.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Copia el rastreador .NET de Datadog en tu imagen Docker.
   ```dockerfile
   COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/
   ```
   Si instalas la biblioteca del rastreador Datadog directamente en tu aplicación, como se indica en las [instrucciones de instrumentación manual del rastreador][1], omite este paso.

3. (Opcional) Añade etiquetas de Datadog.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-dotnet
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ENV DD_APPSEC_ENABLED=1
   ```

4. Cambia el punto de entrada para envolver tu aplicación en el proceso `serverless-init` de Datadog.
   **Nota**: Si ya tienes un punto de entrada definido dentro de tu archivo Docker, consulta la [configuración alternativa](#alt-dotnet).
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Ejecuta tu aplicación binaria envuelta en el punto de entrada. Adapta esta línea según tus necesidades.
   ```dockerfile
   CMD ["dotnet", "helloworld.dll"]
   ```
#### Configuración alternativa {#alt-dotnet}
Si ya tienes un punto de entrada definido dentro de tu archivo Docker, puedes modificar el argumento CMD.

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/
ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
CMD ["/app/datadog-init", "dotnet", "helloworld.dll"]
{{< /highlight >}}

Si necesitas que tu punto de entrada también se instrumente, puedes intercambiar tu punto de entrada y tus argumentos CMD. Para obtener más información, consulta [Cómo funciona `serverless-init`](#how-serverless-init-works).

{{< highlight dockerfile "hl_lines=7-8" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/
ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "dotnet", "helloworld.dll"]
{{< /highlight >}}

Obtendrás una instrumentación completa, siempre y cuando el comando que se va a ejecutar se pase como argumento a `datadog-init`.

[1]: /es/tracing/trace_collection/dd_libraries/dotnet-core/?tab=linux#custom-instrumentation

{{% /tab %}}
{{% tab "Ruby" %}}

[Instala manualmente][1] el rastreador Ruby antes de desplegar tu aplicación. Consulta la [aplicación de ejemplo][2].

Añade las siguientes instrucciones y argumentos a tu archivo Docker.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
ENTRYPOINT ["/app/datadog-init"]
CMD ["rails", "server", "-b", "0.0.0.0"]
```

#### Explicación

1. Copia el proceso `serverless-init` de Datadog en tu imagen Docker.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. (Opcional) Añade etiquetas de Datadog.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-ruby
   ENV DD_ENV=datadog-demo
   ENV DD_APPSEC_ENABLED=1
   ENV DD_VERSION=1
   ```

3. Esta variable de entorno es necesaria para que la propagación de trazas funcione correctamente en Cloud Run. Asegúrate de configurar esta variable para todos los servicios subsiguientes instrumentados por Datadog.
   ```dockerfile
   ENV DD_TRACE_PROPAGATION_STYLE=datadog
   ```

4. Cambia el punto de entrada para envolver tu aplicación en el proceso `serverless-init` de Datadog.
   **Nota**: Si ya tienes un punto de entrada definido dentro de tu archivo Docker, consulta la [configuración alternativa](#alt-ruby).
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Ejecuta tu aplicación binaria envuelta en el punto de entrada. Adapta esta línea según tus necesidades.
   ```dockerfile
   CMD ["rails", "server", "-b", "0.0.0.0"]
   ```
#### Configuración alternativa {#alt-ruby}
Si ya tienes un punto de entrada definido dentro de tu archivo Docker, puedes modificar el argumento CMD.

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
CMD ["/app/datadog-init", "rails", "server", "-b", "0.0.0.0"]
{{< /highlight >}}

Si necesitas que tu punto de entrada también se instrumente, puedes intercambiar tu punto de entrada y tus argumentos CMD. Para obtener más información, consulta [Cómo funciona `serverless-init`](#how-serverless-init-works).

{{< highlight dockerfile "hl_lines=7-8" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "rails", "server", "-b", "0.0.0.0"]
{{< /highlight >}}

Obtendrás una instrumentación completa, siempre y cuando el comando que se va a ejecutar se pase como argumento a `datadog-init`.

[1]: /es/tracing/trace_collection/dd_libraries/ruby/?tab=containers#instrument-your-application
[2]: https://github.com/DataDog/crpb/tree/main/ruby-on-rails

{{% /tab %}}
{{% tab "PHP" %}}

Añade las siguientes instrucciones y argumentos a tu archivo Docker.
```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
RUN php /datadog-setup.php --php-bin=all
ENV DD_SERVICE=datadog-demo-run-php
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]

# utiliza lo siguiente para una imagen basada en Apache y en mod_php
RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
EXPOSE 8080
CMD ["apache2-foreground"]

# utiliza lo siguiente para una imagen basada en Nginx y en mod_php
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 8080
CMD php-fpm; nginx -g daemon off;
```

**Nota**: El punto de entrada `datadog-init` envuelve tu proceso y recopila logs de él. Para que los logs funcionen correctamente, asegúrate de que tus procesos Apache, Nginx, o PHP están escribiendo resultados a `stdout`.

#### Explicación


1. Copia el proceso `serverless-init` de Datadog en tu imagen Docker.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Copia e instala el rastreador PHP de Datadog.
   ```dockerfile
   ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
   RUN php /datadog-setup.php --php-bin=all
   ```
   Si instalas la biblioteca del rastreador Datadog directamente en tu aplicación, como se indica en las [instrucciones de instrumentación manual del rastreador][1], omite este paso.

3. (Opcional) Añade etiquetas de Datadog.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-php
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Cambia el punto de entrada para envolver tu aplicación en el proceso `serverless-init` de Datadog.
   **Nota**: Si ya tienes un punto de entrada definido dentro de tu archivo Docker, consulta la [configuración alternativa](#alt-php).
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Ejecuta tu aplicación.

   Utiliza lo siguiente para una imagen basada en Apache y en mod_php:
   ```dockerfile
   RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
   EXPOSE 8080
   CMD ["apache2-foreground"]
   ```

   Utiliza lo siguiente para una imagen basada en Nginx y en mod_php:
   ```dockerfile
   RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
   EXPOSE 8080
   CMD php-fpm; nginx -g daemon off;
   ```
#### Configuración alternativa {#alt-php}
Si ya tienes un punto de entrada definido dentro de tu archivo Docker y estás utilizando una imagen basada en Apache y en mod_php, puedes modificar el argumento CMD.

{{< highlight dockerfile "hl_lines=9" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
RUN php /datadog-setup.php --php-bin=all
ENV DD_SERVICE=datadog-demo-run-php
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
EXPOSE 8080
CMD ["/app/datadog-init", "apache2-foreground"]
{{< /highlight >}}

Si necesitas que tu punto de entrada también se instrumente, puedes intercambiar tu punto de entrada y tus argumentos CMD. Para obtener más información, consulta [Cómo funciona `serverless-init`](#how-serverless-init-works).

{{< highlight dockerfile "hl_lines=7 12 17" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
RUN php /datadog-setup.php --php-bin=all
ENV DD_SERVICE=datadog-demo-run-php
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]

# Uso de lo siguiente para una imagen basada en Apache y en mod_php
RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
EXPOSE 8080
CMD ["your_entrypoint.sh", "apache2-foreground"]

# Uso de lo siguiente para una imagen basada en Nginx y php-fpm
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 8080
CMD your_entrypoint.sh php-fpm; your_entrypoint.sh nginx -g daemon off;
{{< /highlight >}}

Obtendrás una instrumentación completa, siempre y cuando el comando que se va a ejecutar se pase como argumento a `datadog-init`.

[1]: /es/tracing/trace_collection/dd_libraries/php/?tab=containers#install-the-extension

{{% /tab %}}
{{< /tabs >}}

## Azure App Service

### Configuración
#### Configuración de los parámetros de la aplicación
Para habilitar ASM en tu aplicación, comienza por añadir los siguientes pares clave-valor en **Parámetros de la aplicación** a tus parámetros de configuración de Azure.

{{< img src="serverless/azure_app_service/application-settings.jpg" alt="Configuración de Azure App Service: parámetros de la aplicación, en la sección de configuración de parámetros de la interfaz de usuario de Azure. Se muestran tres parámetros: DD_API_KEY, DD_SERVICE y DD_START_APP" style="width:80%;" >}}

- `DD_API_KEY` es tu clave de API de Datadog.
- `DD_CUSTOM_METRICS_ENABLED` (opcional) habilita las [métricas personalizadas](#custom-metrics).
- `DD_SITE` es el [parámetro][2] del sitio Datadog. Tu sitio es {{< region-param key="dd_site" code="true" >}}. Por defecto, este valor es `datadoghq.com`.
- `DD_SERVICE` es el nombre del servicio utilizado para este programa. Por defecto, es el valor del campo de nombre en `package.json`.
- `DD_START_APP` es el comando utilizado para iniciar tu aplicación. Por ejemplo, `node ./bin/www` (no es necesario para las aplicaciones que se ejecutan en Tomcat).
- El valor `DD_APPSEC_ENABLED` debe ser 1 para habilitar la seguridad de las aplicaciones.

### Identificación del comando de inicio

Las aplicaciones Linux y Azure App Service creadas utilizando la opción de despliegue de código en tiempos de ejecución incorporados dependen de un comando de inicio que varía según el lenguaje. Los valores predeterminados se describen en [la documentación de Azure][7]. A continuación se incluyen algunos ejemplos.

Configura estos valores en la variable de entorno `DD_START_APP`. Los siguientes ejemplos corresponden a una aplicación denominada `datadog-demo`, cuando corresponda.

| Tiempo de ejecución   | `DD_START_APP` Valor de ejemplo                                                               | Descripción                                                                                                                                                                                                                        |
|-----------|--------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Node.js   | `node ./bin/www`                                                                           | Ejecuta el [archivo de configuración de Node PM2][12] o tu archivo de script.                                                                                                                                                                   |
| .NET Core | `dotnet datadog-demo.dll`                                                                  | Ejecuta un archivo `.dll` que utiliza por defecto el nombre de tu aplicación web. <br /><br /> **Nota**: El nombre del archivo `.dll` en el comando debe coincidir con el nombre de tu archivo `.dll`. En algunos casos es posible que no coincida con tu aplicación web.         |
| PHP       | `cp /home/site/wwwroot/default /etc/nginx/sites-available/default && service nginx reload` | Copia el script en la localización correcta e inicia la aplicación.                                                                                                                                                                           |
| Python    | `gunicorn --bind=0.0.0.0 --timeout 600 quickstartproject.wsgi`                             | [Script de inicio][13] personalizado. Este ejemplo muestra un comando Gunicorn para iniciar una aplicación Django.                                                                                                                                      |
| Java      | `java -jar /home/site/wwwroot/datadog-demo.jar`                                            | Comando para iniciar tu aplicación. No es necesario para las aplicaciones que se ejecutan en Tomcat.                                                                                                                                                                                                  |

[7]: https://learn.microsoft.com/en-us/troubleshoot/azure/app-service/faqs-app-service-linux#what-are-the-expected-values-for-the-startup-file-section-when-i-configure-the-runtime-stack-
[12]: https://learn.microsoft.com/en-us/azure/app-service/configure-language-nodejs?pivots=platform-linux#configure-nodejs-server
[13]: https://learn.microsoft.com/en-us/azure/app-service/configure-language-php?pivots=platform-linux#customize-start-up


**Nota**: La aplicación se reinicia cuando se guardan los nuevos parámetros.

#### Configuración de parámetros generales

{{< tabs >}}
{{% tab "Node, .NET, PHP, Python" %}}
Ve a **Parámetros generales** y añade lo siguiente al campo **Comando de inicio**:

```
curl -s https://raw.githubusercontent.com/DataDog/datadog-aas-linux/v1.4.0/datadog_wrapper | bash
```

{{< img src="serverless/azure_app_service/startup-command-1.jpeg" alt="Configuración de Azure App Service: parámetros de stack tecnológico, en la sección de configuración de parámetros en la interfaz de usuario de Azure. Debajo de los campos de versión mayor y menor del stack tecnológico se encuentra el 'Comando de inicio' rellenado por el comando curl anterior." style="width:100%;" >}}
{{% /tab %}}
{{% tab "Java" %}}
Descarga el archivo [`datadog_wrapper`][8] de las versiones y cárgalo en tu aplicación con el comando CLI de Azure:

```
  az webapp deploy --resource-group <group-name> --name <app-name> --src-path <path-to-datadog-wrapper> --type=startup
```

[8]: https://github.com/DataDog/datadog-aas-linux/releases
{{% /tab %}}
{{< /tabs >}}


## Test de detección de amenazas

Para ver la detección de amenazas de Application Security Management en acción, envía patrones de ataque conocidos a tu aplicación. Por ejemplo, envía una solicitud con la cabecera del Agent del usuario configurada como `dd-test-scanner-log` para activar un intento de [ataque del analizador de la seguridad][5]:
   ```sh
   curl -A 'dd-test-scanner-log' https://your-function-url/existing-route
   ```
Unos minutos después de habilitar tu aplicación y ponerla en ejecución, **la información sobre las amenazas** aparece en el [Explorador de señales de aplicaciones][41]**.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?query=type%3Afunction%20&env=prod&groupBy=&hostGroup=%2A&lens=Security&sort=-attackExposure&view=list
[2]: /es/serverless/distributed_tracing/
[3]: https://app.datadoghq.com/security/appsec
[4]: /es/security/application_security/enabling/compatibility/serverless
[5]: /es/security/default_rules/security-scan-detected/
[6]: /es/serverless/libraries_integrations/plugin/
[apm-lambda-tracing-setup]: https://docs.datadoghq.com/serverless/aws_lambda/distributed_tracing/