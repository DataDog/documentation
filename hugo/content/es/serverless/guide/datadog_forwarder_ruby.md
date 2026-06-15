---
title: Instrumentación de aplicaciones serverless de Ruby mediante el Datadog Forwarder
---

## Información general

<div class="alert alert-danger">
Si recién empiezas a utilizar Datadog Serverless, sigue las <a href="/serverless/installation/ruby">instrucciones para instrumentar tus funciones de Lambda mediante la Datadog Lambda Extension</a>. Si configuraste Datadog Serverless con el Datadog Forwarder antes que la funcionalidad de Lambda lista para usar, utiliza esta guía para mantener tu instancia.
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
- Reemplaza `<layer_version>` por la versión de la librería Lambda de Datadog que quieres utilizar. La última versión es `{{< latest-lambda-layer-version layer="ruby" >}}`.
- Reemplaza `<forwarder_arn>` por el nombre de recurso de Amazon (ARN) del Forwarder (consulta la [documentación del Forwarder][2]).

Por ejemplo:

```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -v {{< latest-lambda-layer-version layer="ruby" >}} --forwarder "arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder"
```

Si configuraste tu función de Lambda para utilizar la firma de código, debes añadir el ARN del perfil de firma de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) a la [configuración de la firma de código][4] de tu función antes de poder instrumentarla con la Datadog CLI.

Obtén más información y parámetros adicionales en la [documentación de la CLI][3].

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/es/serverless/forwarder/
[3]: https://docs.datadoghq.com/es/serverless/serverless_integrations/cli
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "Serverless Framework" %}}

El complemento [Datadog Serverless Plugin][1] añade la librería Lambda de Datadog automáticamente a tus funciones mediante capas y configura las funciones para enviar métricas, trazas y logs a Datadog a través del [Datadog Forwarder][2].

Si configuraste tu función de Lambda para utilizar la firma de código, debes añadir el ARN del perfil de firma de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) a la [configuración de la firma de código][4] de tu función antes de poder instalar el Datadog Serverless Plugin.

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
{{% tab "Custom" %}}

### Instalar

La librería Lambda de Datadog puede instalarse como una capa o como un gem. Para la mayoría de las funciones, Datadog recomienda instalar la librería como capa. Si despliegas tu función de Lambda como una imagen de contenedor, debes instalar la librería como gem.

La versión secundaria del gem `datadog-lambda` siempre coincide con la versión de la capa. Por ejemplo, la versión 0.5.0 de datadog-lambda coincide con el contenido de la versión 5 de la capa.

#### Como una capa

[Configura las capas][1] de tu función de Lambda con el ARN en el siguiente formato.

```
# Para las regiones us, us3, us5 o eu
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>

# Para las regiones us-gov
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:<VERSION>
```

Las opciones disponibles de `RUNTIME` son `Ruby2-7` y `Ruby3-2`. La última `VERSION` es `{{< latest-lambda-layer-version layer="ruby" >}}`. Por ejemplo:

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Ruby3-2:{{< latest-lambda-layer-version layer="ruby" >}}
```

Si configuraste tu función de Lambda para utilizar la firma de código, debes añadir el ARN del perfil de firma de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) a la [configuración de la firma de código][4] de tu función antes de poder añadir la librería Lambda de Datadog como una capa.

#### Como un gem

Si no puedes utilizar la capa de Lambda de Datadog prediseñada, puedes añadir lo siguiente a tu Gemfile como alternativa:

```Gemfile
gem 'datadog-lambda'
gem 'ddtrace'
```

`ddtrace` contiene extensiones nativas que deben compilarse para que Amazon Linux funcione con AWS Lambda. Por lo tanto, Datadog recomienda compilar y desplegar la función de Lambda como una imagen de contenedor. Si tu función no puede desplegarse como una imagen de contenedor y quieres utilizar Datadog APM, Datadog recomienda instalar la librería Lambda como una capa en lugar de como un gem.

Instala `gcc`, `gmp-devel` y `make` antes de ejecutar `bundle install` en el Dockerfile de tu función para asegurarte de que las extensiones nativas se compilen correctamente.

```dockerfile
FROM <base image>

# ensambla tu imagen de contenedor

RUN yum -y install gcc gmp-devel make
RUN bundle config set path 'vendor/bundle'
RUN bundle install
```

### Configurar

Habilita Datadog APM y envuelve la función de controlador de Lambda con la envoltura que se encuentra disponible en la librería Lambda de Datadog.

```ruby
require 'datadog/lambda'

Datadog::Lambda.configure_apm do |c|
# Habilita la instrumentación
end

def handler(event:, context:)
    Datadog::Lambda.wrap(event, context) do
        return { statusCode: 200, body: 'Hello World' }
    end
end
```

### Subscribir

Suscribe la función de Lambda del Datadog Forwarder a cada uno de los grupos de logs de tu función. Esto habilita el envío de métricas, trazas y logs a Datadog.

1. [Instala el Datadog Forwarder si todavía no lo hiciste][2].
2. [Suscribe el Datadog Forwarder a los grupos de logs de tu función][3].


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://docs.datadoghq.com/es/serverless/forwarder/
[3]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{< /tabs >}}

### Etiquetar

Aunque es opcional, Datadog recomienda etiquetar las aplicaciones serverless con las etiquetas (tags) `env`, `service` y `version` para el [etiquetado de servicios unificado][2].

## Explorar

Una vez que tienes tu función configurada según los pasos anteriores, puedes consultar tus métricas, logs y trazas en la [página de inicio de Serverless][3].

### Monitorizar la lógica de negocio personalizada

Si quieres enviar una métrica o un tramo (span) personalizados, consulta el siguiente código de ejemplo:

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
          "product":"latte", # una etiqueta
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

Para obtener más información sobre el envío de métricas personalizadas, consulta [Métricas personalizadas de aplicaciones serverless][4]. Para obtener más información sobre la instrumentación personalizada, consulta la documentación de Datadog APM en la sección de [instrumentación personalizada][5].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/serverless/forwarder
[2]: /es/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[3]: https://app.datadoghq.com/functions
[4]: /es/serverless/custom_metrics?tab=ruby
[5]: /es/tracing/custom_instrumentation/ruby/
