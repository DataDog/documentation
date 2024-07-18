---
aliases:
- /es/serverless/datadog_lambda_library/ruby/
- /es/serverless/installation/ruby
further_reading:
- link: serverless/datadog_lambda_library/ruby
  tag: Documentación
  text: Biblioteca Lambda de Datadog para Ruby
- link: serverless/distributed_tracing/
  tag: Documentación
  text: Rastreo de aplicaciones serverless
- link: serverless/custom_metrics/
  tag: Documentación
  text: Envío de métricas personalizadas desde aplicaciones serverless
- link: /serverless/guide/troubleshoot_serverless_monitoring
  tag: Documentación
  text: Solucionar problemas de Serverless Monitoring
title: Instrumentación de aplicaciones serverless de Ruby
---

<div class="alert alert-warning">Si ya configuraste tus funciones de Lambda con el Datadog Forwarder, consulta la sección de <a href="https://docs.datadoghq.com/serverless/guide/datadog_forwarder_ruby">instrumentación mediante el Datadog Forwarder</a>. De lo contrario, sigue las instrucciones de esta guía para instrumentar mediante la extensión Lambda de Datadog.</div>

<div class="alert alert-warning">Si despliegas tus funciones de Lambda en una VPC sin acceso a la Internet pública, puedes enviar datos <a href="/agent/guide/private-link/">con AWS PrivateLink</a> para el <a href="/getting_started/site/">sitio de Datadog</a> <code>datadoghq.com</code>, o bien <a href="/agent/configuration/proxy/">mediante un proxy</a> en caso de que uses cualquier otro sitio.</div>

## Instalación

Datadog ofrece muchas formas diferentes de habilitar la instrumentación para tus aplicaciones serverless. Elige a continuación el método que mejor se adapte a tus necesidades. Por lo general, Datadog recomienda utilizar la interfaz de línea de comandos (CLI) de Datadog. *Debes* seguir las instrucciones para "Imagen de contenedor" si despliegas tu aplicación como una imagen de contenedor.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

La CLI de Datadog modifica la configuración de las funciones de Lambda existentes para habilitar la instrumentación sin necesidad de llevar a cabo un despliegue nuevo. Es la forma más rápida de empezar a trabajar con la monitorización serverless de Datadog.

1. Configurar las funciones de Lambda

    Habilita Datadog APM y envuelve la función del controlador de Lambda con la envoltura que se encuentra disponible en la biblioteca Lambda de Datadog.

    ```ruby
    require 'datadog/lambda'

    Datadog::Lambda.configure_apm do |c|
    # Enable the instrumentation
    end

    def handler(event:, context:)
        Datadog::Lambda.wrap(event, context) do
            return { statusCode: 200, body: 'Hello World' }
        end
    end
    ```

2. Instalar el cliente de la CLI de Datadog

    ```sh
    npm install -g @datadog/datadog-ci
    ```

3. Si es la primera vez que usas la monitorización serverless de Datadog, inicia la CLI de Datadog en el modo interactivo para recibir instrucciones sobre cómo realizar la primera instalación. Esto te permitirá entrar en materia rápidamente y saltarte los demás pasos. Si deseas instalar Datadog de forma permanente en tus aplicaciones de producción, omite ese paso y dirígete directamente a los siguientes para ejecutar el comando de la CLI de Datadog en tus pipelines CI/CD _después_ de haber efectuado el despliegue de la forma tradicional.

    ```sh
    datadog-ci lambda instrument -i
    ```

4. Configurar las credenciales de AWS

    La CLI de Datadog necesita acceder al servicio AWS Lambda y depende del SDK de AWS para JavaScript a la hora de [configurar las credenciales][1]. Asegúrate de que tus credenciales de AWS estén configuradas con el mismo método que utilizarás para invocar la CLI de AWS.

5. Configurar el sitio de Datadog

    ```sh
    export DATADOG_SITE="<DATADOG_SITE>"
    ```

    Reemplaza `<DATADOG_SITE>` por {{< region-param key="dd_site" code="true" >}} (asegúrate de haber seleccionado el sitio [SITE] correcto del lado derecho).

6. Configurar la clave de la API de Datadog

    Datadog recomienda guardar la clave de la API de Datadog en AWS Secrets Manager para una mayor seguridad y una rotación más sencilla. La clave debe almacenarse en una cadena de texto sin formato (no en un blob JSON). Asegúrate de que tus funciones de Lambda cuenten con el permiso de IAM `secretsmanager:GetSecretValue` obligatorio.

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

    Para agilizar el testeo, también puedes configurar la clave de la API de Datadog en texto sin formato:

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

7. Instrumentar las funciones de Lambda

    **Nota**: Antes que nada, instrumenta tus funciones de Lambda en un entorno de desarrollo o de prueba. Si el resultado de la instrumentación no es satisfactorio, ejecuta `uninstrument` con los mismos argumentos para revertir los cambios.

    Para instrumentar tus funciones de Lambda, ejecuta el siguiente comando.

    ```sh
    datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="ruby" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    ```

    Para rellenar los parámetros:
    - Reemplaza `<functionname>` y `<another_functionname>` por los nombres de tus funciones de Lambda. Otra posibilidad es usar `--functions-regex` para instrumentar automáticamente varias funciones cuyos nombres coincidan con la expresión regular facilitada.
    - Reemplaza `<aws_region>` por el nombre de la región de AWS.

    Si necesitas parámetros adicionales, consulta la [documentación acerca de la CLI][2].


[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/es/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

El [complemento serverless de Datadog][1] configura automáticamente tus funciones para enviar métricas, trazas (traces) y logs a Datadog mediante la [extensión Lambda de Datadog][2].

Para instalar y configurar el complemento serverless de Datadog, sigue estos pasos:

1. Configurar las funciones de Lambda

    Habilita Datadog APM y envuelve la función del controlador de Lambda con la envoltura que se encuentra disponible en la biblioteca Lambda de Datadog.

    ```ruby
    require 'datadog/lambda'

    Datadog::Lambda.configure_apm do |c|
    # Enable the instrumentation
    end

    def handler(event:, context:)
        Datadog::Lambda.wrap(event, context) do
            return { statusCode: 200, body: 'Hello World' }
        end
    end
    ```

2. Instalar el complemento serverless de Datadog:

    ```sh
    serverless plugin install --name serverless-plugin-datadog
    ```

3. Actualiza tu archivo `serverless.yml`:

    ```yaml
    custom:
      datadog:
        site: <DATADOG_SITE>
        apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
    ```

    Para rellenar los parámetros:
    - Reemplaza `<DATADOG_SITE>` por {{< region-param key="dd_site" code="true" >}} (asegúrate de haber seleccionado el sitio [SITE] correcto del lado derecho).
    - Reemplaza `<DATADOG_API_KEY_SECRET_ARN>` por el ARN del secreto de AWS siempre que hayas almacenado la [clave de la API de Datadog][3] de forma segura. La clave debe almacenarse en una cadena de texto sin formato (no en un blob JSON). El permiso `secretsmanager:GetSecretValue` es obligatorio. Para agilizar el testeo, puedes usar `apiKey` y configurar la clave de la API de Datadog en texto sin formato.

    Para obtener más información y parámetros adicionales, consulta la [documentación acerca del complemento][1].

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/es/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Container Image" %}}

1. Instalar la biblioteca Lambda de Datadog

    Si vas a desplegar tu función de Lambda como una imagen de contenedor, no puedes utilizar la biblioteca Lambda de Datadog como una Lambda Layer. En su lugar, debes empaquetar las bibliotecas de rastreo y Lambda de Datadog dentro de la imagen.

    Añade lo siguiente a tu Gemfile:

    ```Gemfile
    gem 'datadog-lambda'
    gem 'ddtrace'
    ```

    `ddtrace` contiene extensiones nativas que deben compilarse para que Amazon Linux funcione con AWS Lambda.

    Instala `gcc`, `gmp-devel` y `make` antes de ejecutar `bundle install` en el Dockerfile de tu función para asegurarte de que las extensiones nativas se compilen correctamente.

    ```dockerfile
    FROM <base image>

    # assemble your container image

    RUN yum -y install gcc gmp-devel make
    RUN bundle config set path 'vendor/bundle'
    RUN bundle install
    ```

2. Instalar la extensión Lambda de Datadog

    Añade la extensión Lambda de Datadog a tu imagen de contenedor mediante la adición de los siguientes parámetros al Dockerfile:

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/. /opt/
    ```

    Reemplaza `<TAG>` por un número de versión específico (por ejemplo, `{{< latest-lambda-layer-version layer="extension" >}}`) o por `latest`. Alpine también es compatible con números de versión específicos (como `{{< latest-lambda-layer-version layer="extension" >}}-alpine`) o con `latest-alpine`. Puedes ver una lista completa de posibles etiquetas (tags) en el [repositorio de Amazon ECR][1].

3. Configurar las funciones de Lambda

    Habilita Datadog APM y envuelve la función del controlador de Lambda con la envoltura que se encuentra disponible en la biblioteca Lambda de Datadog.

    ```ruby
    require 'datadog/lambda'

    Datadog::Lambda.configure_apm do |c|
    # Enable the instrumentation
    end

    def handler(event:, context:)
        Datadog::Lambda.wrap(event, context) do
            return { statusCode: 200, body: 'Hello World' }
        end
    end
    ```

4. Configurar el sitio y la clave de la API de Datadog

    - Configura la variable de entorno `DD_SITE` como {{< region-param key="dd_site" code="true" >}} (asegúrate de haber seleccionado el sitio [SITE] correcto del lado derecho).
    - Configura la variable de entorno `DD_API_KEY_SECRET_ARN` con el ARN del secreto de AWS siempre que hayas almacenado la [clave de la API de Datadog][3] de forma segura. La clave debe almacenarse en una cadena de texto sin formato (no en un blob JSON). El permiso `secretsmanager:GetSecretValue` es obligatorio. Para agilizar el testeo, puedes usar `DD_API_KEY` y configurar la clave de la API de Datadog en texto sin formato.


[1]: https://gallery.ecr.aws/datadog/lambda-extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Custom" %}}

<div class="alert alert-info">Si no utilizas una herramienta de desarrollo serverless compatible con Datadog, como Serverless Framework, Datadog te recomienda instrumentar tus aplicaciones serverless con la <a href="./?tab=datadogcli">CLI de Datadog</a>.</div>

1. Instalar la biblioteca Lambda de Datadog

    La biblioteca Lambda de Datadog puede instalarse como capa o como gema. Para la mayoría de las funciones, Datadog recomienda instalar la biblioteca como capa. Si despliegas tu función de Lambda como una imagen de contenedor, debes instalar la biblioteca como gema.

    La versión menor de la gema `datadog-lambda` siempre coincide con la versión de la capa. Por ejemplo, la versión de datadog-lambda 0.5.0 coincide con el contenido de la versión 5 de la capa.

    - Opción A: [Configura las capas][1] de tu función de Lambda con el ARN en el siguiente formato:

      ```sh
      # Usa este formato para Lambda de x86 con un despliegue en regiones comerciales de AWS

      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="ruby" >}}

      # Usa este formato para Lambda de arm64 con un despliegue en regiones comerciales de AWS
      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>-ARM:{{< latest-lambda-layer-version layer="ruby" >}}


      # Usa este formato para Lambda de x86 con un despliegue en regiones GovCloud de AWS
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="ruby" >}}

      # Usa este formato para Lambda de arm64 con un despliegue en regiones GovCloud de AWS
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>-ARM:{{< latest-lambda-layer-version layer="ruby" >}}
      ```

      Reemplaza `<AWS_REGION>` por una región de AWS válida, como `us-east-1`. Las opciones disponibles de `RUNTIME` son `Ruby2-7` y `Ruby3-2`.

    - Opción B: Si no puedes utilizar la capa Lambda de Datadog precompilada, puedes instalar las gemas `datadog-lambda` y `ddtrace` mediante su adición al Gemfile como alternativa:

      ```Gemfile
      gem 'datadog-lambda'
      gem 'ddtrace'
      ```

      `ddtrace` contiene extensiones nativas que deben compilarse para que Amazon Linux funcione con AWS Lambda. Datadog recomienda, por tanto, compilar y desplegar Lambda como una imagen de contenedor. Si no puedes desplegar tu función como una imagen de contenedor y quieres utilizar Datadog APM, Datadog recomienda instalar la biblioteca Lambda como una capa en lugar de como una gema.

      Instala `gcc`, `gmp-devel` y `make` antes de ejecutar `bundle install` en el Dockerfile de tu función para asegurarte de que las extensiones nativas se compilen correctamente.

      ```dockerfile
      FROM <base image>

      # ensambla tu imagen de contenedor

      RUN yum -y install gcc gmp-devel make
      RUN bundle config set path 'vendor/bundle'
      RUN bundle install
      ```

2. Instalar la extensión Lambda de Datadog

    - Opción A: [Configura las capas][1] de tu función de Lambda con el ARN en el siguiente formato:

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

    - Opción B: Añade la extensión Lambda de Datadog a tu imagen de contenedor mediante la adición de los siguientes parámetros al Dockerfile:

      ```dockerfile
      COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/extensions/ /opt/extensions
      ```

      Reemplaza `<TAG>` por un número de versión específico (por ejemplo, `{{< latest-lambda-layer-version layer="extension" >}}`) o por `latest`. Puedes ver una lista completa de posibles etiquetas en el [repositorio de Amazon ECR][2].

3. Configurar las funciones de Lambda

    Habilita Datadog APM y envuelve la función del controlador de Lambda con la envoltura que se encuentra disponible en la biblioteca Lambda de Datadog.

    ```ruby
    require 'datadog/lambda'

    Datadog::Lambda.configure_apm do |c|
    # Enable the instrumentation
    end

    def handler(event:, context:)
        Datadog::Lambda.wrap(event, context) do
            return { statusCode: 200, body: 'Hello World' }
        end
    end
    ```

4. Configurar el sitio y la clave de la API de Datadog

    - Configura la variable de entorno `DD_SITE` como {{< region-param key="dd_site" code="true" >}} (asegúrate de haber seleccionado el sitio [SITE] correcto del lado derecho).
    - Configura la variable de entorno `DD_API_KEY_SECRET_ARN` con el ARN del secreto de AWS siempre que hayas almacenado la [clave de la API de Datadog][3] de forma segura. La clave debe almacenarse en una cadena de texto sin formato (no en un blob JSON). El permiso `secretsmanager:GetSecretValue` es obligatorio. Para agilizar el testeo, puedes usar `DD_API_KEY` y configurar la clave de la API de Datadog en texto sin formato.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://gallery.ecr.aws/datadog/lambda-extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

## ¿Qué toca hacer ahora?

- Ahora puedes consultar métricas, logs y trazas en la [página de inicio de Serverless][4].
- Activa la [monitorización de amenazas][9] para recibir alertas sobre los atacantes que tienen tu servicio como objetivo.
- Consulta el código de ejemplo para [monitorizar la lógica de negocio personalizada](#monitor-custom-business-logic)
- Consulta la [guía de solución de problemas][5] si tienes dificultades para recopilar la telemetría
- Consulta las [configuraciones avanzadas][6] para saber cómo hacer lo siguiente:
    - conectar la telemetría mediante etiquetas;
    - recopilar telemetría para Amazon API Gateway, SQS, etc.;
    - capturar las cargas útiles de solicitud y respuesta de Lambda;
    - vincular los errores de tus funciones de Lambda con tu código fuente;
    - filtrar o borrar información confidencial de logs o trazas.

### Monitorizar la lógica de negocio personalizada

Para monitorizar la lógica de negocio personalizada, envía una métrica o un tramo (span) personalizado con el código de ejemplo que aparece abajo. Para ver opciones adicionales, consulta [Envío de métricas personalizadas desde aplicaciones serverless][7] y la guía de APM en la sección de [Instrumentación personalizada][8].

```ruby
require 'ddtrace'
require 'datadog/lambda'

Datadog::Lambda.configure_apm do |c|
# Habilita la instrumentación
end

def handler(event:, context:)
    # Aplica la envoltura de Datadog
    Datadog::Lambda::wrap(event, context) do
        # Añade etiquetas personalizadas al tramo de la función de Lambda,
        # NO funciona si el rastreo de X-Ray está habilitado
        current_span = Datadog::Tracing.active_span
        current_span.set_tag('customer.id', '123456')

        some_operation()

        Datadog::Tracing.trace('hello.world') do |span|
          puts "Hello, World!"
        end

        # Envía una métrica personalizada
        Datadog::Lambda.metric(
          'coffee_house.order_value', # el nombre de la métrica
          12.45, # el valor de la métrica
          time: Time.now.utc, # opcional, debe estar dentro de los últimos 20 min
          "product":"latte", # etiqueta
          "order":"online" # otra etiqueta
        )
    end
end

# Instrumenta la función
def some_operation()
    Datadog::Tracing.trace('some_operation') do |span|
        # Haz algo aquí
    end
end
```

Para obtener más información sobre el envío de métricas personalizadas, consulta [Métricas personalizadas de aplicaciones serverless][7]. Para obtener más información sobre la instrumentación personalizada, consulta la documentación de Datadog APM en la sección de [Instrumentación personalizada][8].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/serverless/forwarder/
[2]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[3]: /es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[4]: https://app.datadoghq.com/functions
[5]: /es/serverless/guide/troubleshoot_serverless_monitoring/
[6]: /es/serverless/configuration
[7]: /es/serverless/custom_metrics?tab=ruby
[8]: /es/tracing/custom_instrumentation/ruby/
[9]: /es/security/application_security/enabling/serverless/?tab=serverlessframework