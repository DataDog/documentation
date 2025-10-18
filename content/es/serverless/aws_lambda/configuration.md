---
aliases:
- /es/serverless/distributed_tracing/collect_lambda_payloads
- /es/serverless/libraries_integrations/lambda_code_signing
- /es/serverless/guide/forwarder_extension_migration/
- /es/serverless/guide/extension_private_link/
- /es/serverless/configuration
further_reading:
- link: /serverless/installation/
  tag: Documentación
  text: Instalar Serverless Monitoring para AWS Lambda
- link: /serverless/troubleshooting/
  tag: Documentación
  text: Solucionar problemas relacionados con Serverless Monitoring para AWS Lambda
- link: /integrations/github
  tag: Documentación
  text: Integración de GitHub para Datadog
title: Configurar Serverless Monitoring para AWS Lambda
---

Primero, [instala][1] Datadog Serverless Monitoring para comenzar a recopilar métricas, trazas (traces) y logs. Cuando la instalación se complete, consulta los siguientes temas y configura la instalación según tus necesidades de monitorización.

- [Conectar la telemetría mediante etiquetas (tags)](#connect-telemetry-using-tags)
- [Recopilar las cargas útiles de solicitud y respuesta](#collect-the-request-and-response-payloads)
- [Recopilar trazas procedentes de recursos distintos de Lambda](#collect-traces-from-non-lambda-resources)
- [Configurar el rastreador de Datadog](#configure-the-datadog-tracer)
- [Seleccionar las frecuencias de muestreo para la ingesta de tramos (spans) de APM](#select-sampling-rates-for-ingesting-apm-spans)
- [Filtrar o borrar información confidencial de las trazas](#filter-or-scrub-sensitive-information-from-traces)
- [Habilitar y deshabilitar la recopilación de trazas](#enabledisable-trace-collection)
- [Conectar logs y trazas](#connect-logs-and-traces)
- [Vincular errores al código fuente](#link-errors-to-your-source-code)
- [Enviar métricas personalizadas][27]
- [Recopilar datos de perfiles](#collect-profiling-data)
- [Enviar la telemetría a través de PrivateLink o un proxy](#send-telemetry-over-privatelink-or-proxy)
- [Enviar la telemetría a varias organizaciones de Datadog](#send-telemetry-to-multiple-datadog-organizations)
- [Activar el cumplimiento de FIPS](#enable-fips-compliance)
- [Propagar el contexto de las trazas en los recursos de AWS](#propagate-trace-context-over-aws-resources)
- [Fusionar las trazas de X-Ray y Datadog](#merge-x-ray-and-datadog-traces)
- [Habilitar la firma de código para AWS Lambda](#enable-aws-lambda-code-signing)
- [Migrar a la Datadog Lambda Extension](#migrate-to-the-datadog-lambda-extension)
- [Migrar de x86 a arm64 con la Datadog Lambda Extension](#migrating-between-x86-to-arm64-with-the-datadog-lambda-extension)
- [Configurar la Datadog Lambda Extension para hacer tests locales](#configure-the-datadog-lambda-extension-for-local-testing)
- [Instrumentar AWS Lambda con la API de OpenTelemetry](#Instrumentar-AWS-lambda-with-the-opentelemetry-api)
- [Uso de Datadog Lambda Extension v67+](#using-datadog-lambda-extension-v67)
- [Configuración del enlace automático para PutItem de DynamoDB](#configure-auto-linking-for-dynamodb-putitem)
- [Visualización y modelado correcto de los servicios de AWS](#visualize-and-model-aws-services-by-resource-name)
- [Envío de logs a Observability Pipelines](#sending-data-to-observability-pipelines)
- [Solucionar problemas](#troubleshoot)
- [Referencias adicionales](#further-reading)


## Habilitar la detección de amenazas para observar los intentos de ataque

Recibe alertas sobre los atacantes que apuntan a tus aplicaciones sin servidor y responde rápidamente.

Para empezar, asegúrate de tener el [rastreo habilitado][43] para tus funciones.

Para habilitar la monitorización de amenazas, añade las siguientes variables de entorno a tu despliegue:
   ```yaml
   environment:
     DD_SERVERLESS_APPSEC_ENABLED: true
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
   ```

Vuelve a desplegar la función e invócala. Al cabo de unos minutos, aparece en las [vistas AAP][49].

Para ver en acción la detección de amenazas a las aplicaciones y las API, envía patrones de ataque conocidos a tu aplicación. Por ejemplo, envía una cabecera HTTP con el valor `acunetix-product` para activar un intento de [ataque al analizador de seguridad][44]:
   ```sh
   curl -H 'My-AAP-Test-Header: acunetix-product' https://<YOUR_FUNCTION_URL>/<EXISTING_ROUTE>
   ```
Unos minutos después de habilitar tu aplicación y enviar los patrones de ataque, **la información sobre las amenazas aparece en el [Application Signals Explorer][41]**.

## Conectar la telemetría mediante etiquetas

Conecta la telemetría de Datadog a través del uso de etiquetas personalizadas y de etiquetas reservadas (`env`, `service` y `version`). Puedes utilizarlas para navegar fácilmente por métricas, trazas y logs. Añade los parámetros adicionales que se indican a continuación en función de tu método de instalación.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Asegúrate de usar la última versión de la [Datadog CLI][1] y ejecuta el comando `datadog-ci lambda instrument` con los argumentos adicionales adecuados. Por ejemplo:

```sh
datadog-ci lambda instrument \
    --env dev \
    --service web \
    --version v1.2.3 \
    --extra-tags "team:avengers,project:marvel"
    # ... otros argumentos obligatorios, como los nombres de las funciones
```

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

Asegúrate de usar la última versión del [complemento sin servidor Datadog][1] y aplica las etiquetas con los parámetros `env`, `service`, `version` y `tags`. Por ejemplo:

```yaml
custom:
  datadog:
    # ... otros parámetros obligatorios, como el sitio de Datadog y la clave de la API
    env: dev
    service: web
    version: v1.2.3
    tags: "team:avengers,project:marvel"
```

De forma predeterminada, si no defines `env` y `service`, el complemento utiliza automáticamente los valores `stage` y `service` de la definición de la aplicación serverless. Para deshabilitar esta característica, define`enableTags` como `false`.

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/plugin
{{% /tab %}}
{{% tab "AWS SAM" %}}

Asegúrate de usar la última versión de la [macro serverless de Datadog][1] y aplica las etiquetas con los parámetros `env`, `service`, `version` y `tags`. Por ejemplo:

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... otros parámetros obligatorios, como el sitio de Datadog y la clave de la API
      env: dev
      service: web
      version: v1.2.3
      tags: "team:avengers,project:marvel"
```

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/macro
{{% /tab %}}
{{% tab "AWS CDK" %}}

Asegúrate de usar la última versión de la [construcción del CDK serverless de Datadog][1] y aplica las etiquetas con los parámetros `env`, `service`, `version` y `tags`. Por ejemplo:

```typescript
const datadog = new DatadogLambda(this, "Datadog", {
    // ... other required parameters, such as the Datadog site and API key
    env: "dev",
    service: "web",
    version: "v1.2.3",
    tags: "team:avengers,project:marvel"
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

[1]: https://github.com/DataDog/datadog-cdk-constructs
{{% /tab %}}
{{% tab "Otros" %}}

Si vas a recopilar la telemetría de tus funciones de Lambda mediante la [Datadog Lambda Extension][1], define las siguientes variables de entorno en tus funciones de Lambda. Por ejemplo:
- DD_ENV: dev
- DD_SERVICE: web
- DD_VERSION: v1.2.3
- DD_TAGS: team:avengers,project:marvel

Si quieres recopilar la telemetría de tus funciones de Lambda mediante la [Función de Lambda del Datadog Forwarder][2], define `env`, `service`, `version` y las etiquetas adicionales como etiquetas de recursos de AWS en tus funciones de Lambda. Asegúrate de que la opción `DdFetchLambdaTags` esté definida como `true` en el stack tecnológico de CloudFormation de tu Datadog Forwarder. De forma predeterminada, el valor de esta opción es true desde la versión 3.19.0.

[1]: /es/serverless/libraries_integrations/extension/
[2]: /es/serverless/libraries_integrations/forwarder/
{{% /tab %}}
{{< /tabs >}}

Datadog también puede enriquecer la telemetría recopilada con las etiquetas de recursos de AWS definidas en tus funciones de Lambda con un retraso de unos minutos.

- Si quieres recopilar la telemetría de tus funciones de Lambda mediante la [Datadog Lambda Extension][2], habilita la [Integración de AWS para Datadog][3]. Esta característica se creó para enriquecer la telemetría con etiquetas **personalizadas**. Las etiquetas reservadas de Datadog (`env`, `service` y `version`) deben definirse en las variables de entorno correspondientes (`DD_ENV`, `DD_SERVICE` y `DD_VERSION` respectivamente). Las etiquetas reservadas también pueden definirse mediante los parámetros que ofrecen las integraciones de Datadog con las herramientas de desarrollo serverless. Esta característica no es compatible con funciones de Lambda implementadas con imágenes de contenedor.

- Si quieres recopilar la telemetría de tus funciones de Lambda mediante la [Función de Lambda del Datadog Forwarder][4], define la opción `DdFetchLambdaTags` como `true` en el stack tecnológico de CloudFormation de tu Datadog Forwarder. De forma predeterminada, el valor de esta opción es true desde la versión 3.19.0.

## Recopilar las cargas útiles de solicitud y respuesta

<div class="alert alert-info">Esta característica es compatible con Python, Node.js, Go, Java y .NET.</div>

Datadog puede [recopilar y visualizar las cargas útiles de solicitud y respuesta JSON de las funciones de AWS Lambda][5]. Esto te dará más datos sobre tus aplicaciones serverless y te ayudará a solucionar los errores de tu función de Lambda.

Esta característica está deshabilitada de forma predeterminada. Sigue las instrucciones que se indican a continuación en función del método de instalación que utilices.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Asegúrate de usar la última versión de la [Datadog CLI][1] y ejecuta el comando `datadog-ci lambda instrument` con el argumento adicional `--capture-lambda-payload`. Por ejemplo:

```sh
datadog-ci lambda instrument \
    --capture-lambda-payload true
    # ... otros argumentos obligatorios, como los nombres de las funciones
```

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

Asegúrate de usar la última versión del [Datadog Serverless Plugin][1] y define `captureLambdaPayload` como `true`. Por ejemplo:

```yaml
custom:
  datadog:
    # ... otros parámetros obligatorios, como el sitio de Datadog y la clave de la API
    captureLambdaPayload: true
```

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/plugin
{{% /tab %}}
{{% tab "AWS SAM" %}}

Asegúrate de usar la última versión de la [macro serverless de Datadog][1] y define el parámetro `captureLambdaPayload` como `true`. Por ejemplo:

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... otros parámetros obligatorios, como el sitio de Datadog y la clave de la API
      captureLambdaPayload: true
```

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/macro
{{% /tab %}}
{{% tab "AWS CDK" %}}

Asegúrate de usar la última versión de la [construcción del CDK serverless de Datadog][1] y define el parámetro `captureLambdaPayload` como `true`. Por ejemplo:

```typescript
const datadog = new DatadogLambda(this, "Datadog", {
    // ... other required parameters, such as the Datadog site and API key
    captureLambdaPayload: true
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

[1]: https://github.com/DataDog/datadog-cdk-constructs
{{% /tab %}}
{{% tab "Otros" %}}

Define la variable de entorno `DD_CAPTURE_LAMBDA_PAYLOAD` como `true` en tus funciones de Lambda.

{{% /tab %}}
{{< /tabs >}}

Para evitar que se envíe a Datadog información confidencial incluida en objetos JSON de solicitud o respuesta, puedes borrar parámetros específicos.

Para hacerlo, añade un archivo `datadog.yaml` nuevo a la misma carpeta del código de tu función de Lambda. Podrás enmascarar los campos en la carga útil de Lambda mediante [el bloque replace_tags][6] dentro de los parámetros de `apm_config` en el archivo `datadog.yaml`:

```yaml
apm_config:
  replace_tags:
    # Reemplaza "foobar" cada vez que aparezca en cualquier etiqueta por "REDACTED":
    - name: "*"
      pattern: "foobar"
      repl: "REDACTED"
    # Reemplaza "auth" en los encabezados de solicitud por una cadena vacía
    - name: "function.request.headers.auth"
      pattern: "(?s).*"
      repl: ""
    # Reemplaza "apiToken" en la carga útil de respuesta por "****"
    - name: "function.response.apiToken"
      pattern: "(?s).*"
      repl: "****"
```

Como alternativa, puedes rellenar la variable de entorno `DD_APM_REPLACE_TAGS` en tu función de Lambda para enmascarar campos específicos:

```yaml
DD_APM_REPLACE_TAGS=[
      {
        "name": "*",
        "pattern": "foobar",
        "repl": "REDACTED"
      },
      {
        "name": "function.request.headers.auth",
        "pattern": "(?s).*",
        "repl": ""
      },
      {
        "name": "function.response.apiToken",
        "pattern": "(?s).*"
        "repl": "****"
      }
]
```

Para recopilar cargas útiles de los servicios de AWS, consulta [Capturar solicitudes y respuestas de los servicios de AWS][54].



## Recopilar trazas procedentes de recursos distintos de Lambda

Datadog puede inferir tramos de APM en función de los eventos de Lambda entrantes para los recursos gestionados de AWS que activan la función de Lambda. Esto puede ayudarte a visualizar la relación entre los recursos gestionados de AWS e identificar problemas de rendimiento en tus aplicaciones serverless. Consulta [más detalles sobre el producto][12].

Los siguientes recursos son compatibles en estos momentos:

- API Gateway (API REST, API HTTP y WebSocket)
- URL de funciones
- SQS
- SNS (los mensajes de SNS entregados a través de SQS también son compatibles)
- Flujos (streams) de Kinesis (si los datos son una cadena JSON o una cadena JSON codificada en base64)
- EventBridge (eventos personalizados, donde `Details` es una cadena JSON)
- S3
- DynamoDB

Para deshabilitar esta característica, define `DD_TRACE_MANAGED_SERVICES` como `false`.

### DD_SERVICE_MAPPING

`DD_SERVICE_MAPPING` es una variable de entorno que cambia los [nombres de los servicios][46] distintos de Lambda anteriores. Opera con pares `old-service:new-service`.

#### Sintaxis

`DD_SERVICE_MAPPING=key1:value1,key2:value2`...

Hay dos formas de interactuar con esta variable:

#### Cambiar el nombre de todos los servicios de un tipo

Para cambiar el nombre de todos los servicios anteriores asociados a una integración de AWS Lambda, utiliza estos identificadores:

| Integración de AWS Lambda | Valor de DD_SERVICE_MAPPING |
|---|---|
| `lambda_api_gateway` | `"lambda_api_gateway:newServiceName"` |
| `lambda_sns` | `"lambda_sns:newServiceName"` |
| `lambda_sqs` | `"lambda_sqs:newServiceName"` |
| `lambda_s3` | `"lambda_s3:newServiceName"` |
| `lambda_eventbridge` | `"lambda_eventbridge:newServiceName"` |
| `lambda_kinesis` | `"lambda_kinesis:newServiceName"` |
| `lambda_dynamodb` | `"lambda_dynamodb:newServiceName"` |
| `lambda_url` | `"lambda_url:newServiceName"` |
| `lambda_msk` | `"lambda_msk:newServiceName"` |

#### Cambiar el nombre de servicios específicos

Para un enfoque más granular, utiliza estos identificadores específicos de los servicios:

| Servicio | Identificador | Valor de DD_SERVICE_MAPPING |
|---|---|---|
| API Gateway | ID de la API | `"r3pmxmplak:newServiceName"` |
| SNS | Nombre del tema | `"ExampleTopic:newServiceName"` |
| SQS | Nombre de la cola | `"MyQueue:newServiceName"` |
| S3 | Nombre del bucket | `"example-bucket:newServiceName"` |
| EventBridge | Origen del evento | `"eventbridge.custom.event.sender:newServiceName"` |
| Kinesis | Nombre del flujo | `"MyStream:newServiceName"` |
| DynamoDB | Nombre de la tabla | `"ExampleTableWithStream:newServiceName"` |
| URL de Lambda | ID de la API | `"a8hyhsshac:newServiceName"` |
| MSK | Nombre del clúster | `"ExampleCluster:newServiceName"` |

#### Ejemplos con descripción

| Comando | Descripción |
|---|---|
| `DD_SERVICE_MAPPING="lambda_api_gateway:new-service-name"` | Cambia el nombre de todos los servicios anteriores `lambda_api_gateway` a `new-service-name` |
| `DD_SERVICE_MAPPING="08se3mvh28:new-service-name"` | Cambia el nombre del servicio anterior específico `08se3mvh28.execute-api.eu-west-1.amazonaws.com` a `new-service-name` |

Para cambiar el nombre de los servicios posteriores, consulta `DD_SERVICE_MAPPING` en la [documentación de configuración del rastreador][45].

## Configurar el rastreador de Datadog

Para ver qué bibliotecas y marcos instrumenta de forma automática el cliente de Datadog APM, consulta los [Requisitos de compatibilidad para APM][15]. Para instrumentar las aplicaciones personalizadas, consulta la guía de Datadog APM en la sección sobre [instrumentación personalizada][16].

## Seleccionar las frecuencias de muestreo para la ingesta de tramos de APM

Para gestionar la [frecuencia de muestreo de invocaciones de APM rastreadas][17] de las funciones sin servidor, configura la variable de entorno `DD_TRACE_SAMPLING_RULES` en la función con un valor entre 0.000 (sin rastreo de invocaciones de funciones Lambda) y 1.000 (con rastreo de todas las invocaciones de funciones Lambda).

**Notas**:
   - El uso de `DD_TRACE_SAMPLE_RATE` está obsoleto. Utiliza `DD_TRACE_SAMPLING_RULES` en su lugar. Por ejemplo, si ya configuraste `DD_TRACE_SAMPLE_RATE` como `0.1`, configura `DD_TRACE_SAMPLING_RULES` como `[{"sample_rate":0.1}]` en su lugar.
   - Las métricas de tráfico globales como `trace (traza).<OPERATION_NAME>.hits` se calculan en función de las invocaciones muestreadas *sólo* en Lambda.

Para los servicios de alto rendimiento, normalmente no es necesario que recopiles todas las solicitudes, porque los datos de las trazas son muy repetitivos. Los problemas suficientemente graves siempre deberían poder detectarse en varias trazas. Los [controles de ingesta][18] te permiten solucionar los problemas sin salirte del presupuesto.

El mecanismo de muestreo predeterminado para la ingesta se denomina [head-based sampling][19] (muestreo basado en la fase inicial). La decisión sobre si se debe mantener o eliminar una traza se toma al inicio de la traza, cuando comienza el tramo raíz. Luego, esta decisión se propaga a otros servicios como parte de su contexto de solicitud, por ejemplo, un encabezado de solicitud HTTP. Como la decisión se toma al inicio de la traza y luego se transmite al resto de la traza, debes configurar la frecuencia de muestreo en el servicio raíz para que surta efecto.

Cuando Datadog ingiere los tramos, el filtro de retención inteligente de Datadog indexa una proporción de trazas que contribuye a la monitorización del estado de tus aplicaciones. También puedes definir [filtros de retención][20] personalizados para indexar los datos de trazas que quieras mantener durante más tiempo para ayudar a alcanzar los objetivos de tu organización.

Obtén más información acerca del [Datadog Trace Pipeline][21].

## Filtrar o borrar información confidencial de las trazas

Para filtrar las trazas antes de enviarlas a Datadog, consulta [Ignorar los recursos no deseados en APM][22].

Para borrar atributos de trazas por razones de seguridad de los datos, consulta [Configurar el Datadog Agent o su rastreador para la seguridad de los datos][23].

## Habilitar y deshabilitar la recopilación de trazas

La recopilación de trazas (traces) a través de la extensión Datadog Lambda está activada por defecto.

Si quieres empezar a recopilar las trazas de tus funciones de Lambda, aplica las configuraciones que se indican a continuación:

{{< tabs >}}
{{% tab "Datadog CLI" %}}

```sh
datadog-ci lambda instrument \
    --tracing true
    # ... otros argumentos obligatorios, como los nombres de las funciones
```
{{% /tab %}}
{{% tab "Serverless Framework" %}}

```yaml
custom:
  datadog:
    # ... otros parámetros obligatorios, como el sitio de Datadog y la clave de la API
    enableDDTracing: true
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... otros parámetros obligatorios, como el sitio de Datadog y la clave de la API
      enableDDTracing: true
```

{{% /tab %}}
{{% tab "AWS CDK" %}}

```typescript
const datadog = new DatadogLambda(this, "Datadog", {
    // ... other required parameters, such as the Datadog site and API key
    enableDatadogTracing: true
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

{{% /tab %}}
{{% tab "Otros" %}}

Define la variable de entorno `DD_TRACE_ENABLED` como `true` en tus funciones de Lambda.

{{% /tab %}}
{{< /tabs >}}

#### Deshabilitar la recopilación de trazas

Si quieres dejar de recopilar las trazas de tus funciones de Lambda, aplica las configuraciones que se indican a continuación:

{{< tabs >}}
{{% tab "Datadog CLI" %}}

```sh
datadog-ci lambda instrument \
    --tracing false
    # ... otros argumentos obligatorios, como los nombres de las funciones
```
{{% /tab %}}
{{% tab "Serverless Framework" %}}

```yaml
custom:
  datadog:
    # ... otros parámetros obligatorios, como el sitio de Datadog y la clave de la API
    enableDDTracing: false
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... otros parámetros obligatorios, como el sitio de Datadog y la clave de la API
      enableDDTracing: false
```

{{% /tab %}}
{{% tab "AWS CDK" %}}

```typescript
const datadog = new DatadogLambda(this, "Datadog", {
    // ... other required parameters, such as the Datadog site and API key
    enableDatadogTracing: false
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

{{% /tab %}}
{{% tab "Otros" %}}

Define la variable de entorno `DD_TRACE_ENABLED` como `false` en tus funciones de Lambda.

{{% /tab %}}
{{< /tabs >}}

## Conectar logs y trazas

Si usas la [extensión de Lambda][2] para recopilar trazas y logs, Datadog añade automáticamente el ID de solicitud de AWS Lambda al tramo `aws.lambda` en la etiqueta `request_id`. Además, los logs de Lambda para la misma solicitud se añaden en el atributo `lambda.request_id`. Las vistas de trazas y logs de Datadog se vinculan mediante el uso del ID de solicitud de AWS Lambda.

Si estás utilizando la [función del Forwarder Lambda][4] para recopilar trazas y logs, `dd.trace_id` se inyecta automáticamente en logs (habilitado por defecto con la variable de entorno `DD_LOGS_INJECTION`). Las vistas de traza y log de Datadog se conectan utilizando el ID de traza de Datadog. Esta característica es compatible con la mayoría de las aplicaciones que utilizan un tiempo de ejecución y un registrador populares (ver [compatibilidad por tiempo de ejecución][24]).

Si usas un tiempo de ejecución o un logger personalizado no compatible, sigue estos pasos:
- Al generar logs en JSON, debes obtener el ID de traza de Datadog mediante `dd-trace` y añadirlo a tus logs en el campo `dd.trace_id`:
    ```javascript
    {
      "message": "This is a log",
      "dd": {
        "trace_id": "4887065908816661012"
      }
      // ... the rest of your log
    }
    ```
- Para generar logs de texto sin formato, tienes que hacer lo siguiente:
    1. Obtén el ID de traza de Datadog mediante `dd-trace` y añádelo a tu log.
    2. Clona el pipeline de logs de Lambda predeterminado, que es de solo lectura.
    3. Habilita el pipeline clonado y deshabilita el predeterminado.
    4. Actualiza las reglas del [analizador Grok][25] del pipeline clonado para analizar el ID de traza de Datadog en el atributo `dd.trace_id`. Por ejemplo, utiliza la regla `my_rule \[%{word:level}\]\s+dd.trace_id=%{word:dd.trace_id}.*` para los logs que tengan este aspecto `[INFO] dd.trace_id=4887065908816661012 My log message`.

## Vincular errores al código fuente

La [integración del código fuente de Datadog][26] te permite vincular tu telemetría (como trazas de stack tecnológico) al código fuente de tus funciones Lambda en tus repositorios Git.

Para obtener instrucciones sobre cómo configurar la integración del código fuente en tus aplicaciones serverless, consulta la [sección Integrar información de Git en los artefactos de compilación][101].

[101]: /es/integrations/guide/source-code-integration/?tab=go#serverless

## Recopilar datos de perfiles

El [Continuous Profiler][42] de Datadog está disponible en Vista Previa para Python versión 4.62.0 y para la capa versión 62 y anteriores. Esta función opcional se activa configurando la variable de entorno `DD_PROFILING_ENABLED` como `true`.

Continuous Profiler genera un subproceso que toma periódicamente una snapshot de la CPU y el montículo de todo el código de Python en ejecución. Esto puede incluir el propio generador de perfiles. Si quieres que el generador de perfiles se ignore a sí mismo, define `DD_PROFILING_IGNORE_PROFILER` como `true`.

## Enviar la telemetría a través de PrivateLink o un proxy

La Datadog Lambda extension necesita acceder a la red pública de Internet para enviar datos a Datadog. Si tus funciones de Lambda están desplegadas en una VPC sin acceso a una red pública, puedes [enviar datos a través de AWS PrivateLink][28] al [sitio de Datadog][29] `datadoghq.com` o [a través de un proxy][30] para cualquier otro sitio.

Si usas el Datadog Forwarder, sigue estas [instrucciones][31].

## Enviar la telemetría a varias organizaciones de Datadog

Si quieres enviar datos a varias organizaciones, puedes habilitar el envío múltiple con una clave de API de texto sin formato, AWS Secrets Manager o AWS KMS.

{{< tabs >}}
{{% tab "Plaintext API Key" %}}

Puedes habilitar el envío múltiple con una clave de API de texto sin formato al configurar las siguientes variables de entorno en tu función de Lambda.

```bash
# Enable dual shipping for metrics
DD_ADDITIONAL_ENDPOINTS={"https://app.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://app.datadoghq.eu": ["<your_api_key_4>"]}
# Enable dual shipping for APM (traces)
DD_APM_ADDITIONAL_ENDPOINTS={"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}
# Enable dual shipping for APM (profiling)
DD_APM_PROFILING_ADDITIONAL_ENDPOINTS={"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}
# Enable dual shipping for logs
DD_LOGS_CONFIG_FORCE_USE_HTTP=true
DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS=[{"api_key": "<your_api_key_2>", "Host": "agent-http-intake.logs.datadoghq.com", "Port": 443, "is_reliable": true}]
```

{{% /tab %}}
{{% tab "AWS Secrets Manager" %}}

La extensión de Datadog es compatible con la recuperación automática de valores de [AWS Secrets Manager][1] para cualquier variable de entorno con el prefijo `_SECRET_ARN`. Puedes utilizar esta estrategia para almacenar de forma segura tus variables de entorno en Secrets Manager y aprovechar la característica de envío múltiple de Datadog.

1. Establece la variable de entorno `DD_LOGS_CONFIG_FORCE_USE_HTTP` en tu función de Lambda.
2. Añade el permiso `secretsmanager:GetSecretValue` a los permisos del rol de IAM de tu función de Lambda.
3. Crea un secreto nuevo en Secrets Manager para almacenar la variable de entorno de las métricas de envío múltiple. El contenido debe ser similar a este: `{"https://app.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://app.datadoghq.eu": ["<your_api_key_4>"]}`.
4. Define la variable de entorno `DD_ADDITIONAL_ENDPOINTS_SECRET_ARN` en tu función de Lambda como el ARN del secreto antes mencionado.
5. Crea un secreto nuevo en Secrets Manager para almacenar la variable de entorno de APM (trazas) de envío múltiple. El contenido debe ser **similar** a este: `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}`.
6. Define la variable de entorno `DD_APM_ADDITIONAL_ENDPOINTS_SECRET_ARN` en tu función de Lambda para que sea igual que el ARN del secreto antes mencionado.
7. Crea un secreto nuevo en Secrets Manager para almacenar la variable de entorno de APM (creación de perfiles) de envío múltiple. El contenido debe ser **similar** a este: `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}`.
8. Define la variable de entorno `DD_APM_PROFILING_ADDITIONAL_ENDPOINTS_SECRET_ARN` en tu función de Lambda para que coincida con el ARN del secreto antes mencionado.
9. Crea un secreto nuevo en Secrets Manager para almacenar la variable de entorno de los logs de envío múltiple. El contenido debe ser **similar** a este: `[{"api_key": "<your_api_key_2>", "Host": "agent-http-intake.logs.datadoghq.com", "Port": 443, "is_reliable": true}]`.
10. Define la variable de entorno `DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS_SECRET_ARN` en tu función de Lambda para que coincida con el ARN del secreto antes mencionado.

[1]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html

{{% /tab %}}
{{% tab "AWS KMS" %}}

La extensión de Datadog es compatible con el descifrado automático de valores de [AWS KMS][41] para cualquier variable de entorno con el prefijo `_KMS_ENCRYPTED`. Puedes utilizar esta estrategia para almacenar de forma segura tus variables de entorno en KMS y aprovechar la característica de envío múltiple de Datadog.

1. Establece la variable de entorno `DD_LOGS_CONFIG_FORCE_USE_HTTP=true` en tu función de Lambda.
2. Añade los permisos `kms:GenerateDataKey` y `kms:Decrypt` a los permisos del rol de IAM de tu función de Lambda.
3. Para habilitar el envío múltiple de las métricas, cifra `{"https://app.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://app.datadoghq.eu": ["<your_api_key_4>"]}` con KMS y define la variable de entorno `DD_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` de modo que coincida con su valor.
4. Para habilitar el envío múltiple de las trazas, cifra `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}` con KMS y define la variable de entorno `DD_APM_ADDITIONAL_KMS_ENCRYPTED` de modo que coincida con su valor.
5. Para habilitar el envío múltiple de la creación de perfiles, cifra`{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}` con KMS y define la variable de entorno `DD_APM_PROFILING_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` de modo que coincida con su valor.
5. Para habilitar el envío múltiple de los logs, cifra`[{"api_key": "<your_api_key_2>", "Host": "agent-http-intake.logs.datadoghq.com", "Port": 443, "is_reliable": true}]` con KMS y define la variable de entorno `DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` de modo que coincida con su valor.

[41]: https://docs.aws.amazon.com/kms/
{{% /tab %}}
{{< /tabs >}}

Para obtener información sobre un uso más avanzado, consulta la [guía de Envío múltiple][32].

## Habilitar el cumplimiento FIPS

<div class="alert alert-info">Para obtener una descripción completa del cumplimiento de FIPS de las funciones AWS Lambda, consulta la página de <a href="/serverless/aws_lambda/fips-compliance">Cumplimiento de FIPS para AWS Lambda</a> exclusiva.</div>

Para habilitar el cumplimiento de FIPS de las funciones AWS Lambda, sigue estos pasos:

1. Utiliza una capa de extensión que cumpla con FIPS haciendo referencia al ARN apropiado:

{{< tabs >}}
{{% tab "AWS GovCLoud" %}}
 ```sh
 arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
 arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
 ```
{{% /tab %}}
{{% tab "AWS Commercial" %}}
 ```sh
 arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
 arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
 ```
{{% /tab %}}
{{< /tabs >}}

2. Para las funciones Lambda que utilizan Python, JavaScript o Go, configura la variable de entorno `DD_LAMBDA_FIPS_MODE` como `true`. Esta variable de entorno:
   - En el modo FIPS, las funciones auxiliares para métricas de Lambda requieren la extensión que cumpla con FIPS para el envío de métricas
   - Utiliza endpoints AWS FIPS para la búsqueda de claves de API
   - Está activado por defecto en los entornos GovCloud

3. Para las funciones Lambda que utilizan Ruby, .NET o Java, no es necesario configurar ninguna variable de entorno adicional.

4. Para un cumplimiento de FIPS completo de extremo a extremo, configura tu función Lambda para utilizar el sitio US1-FED de Datadog:
   - Configura `DD_SITE` en `ddog-gov.com` (necesario para el cumplimiento de FIPS de extremo a extremo).
   **Nota**: Aunque los componentes Lambda que cumplen con FIPS funcionan con cualquier sitio de Datadog, sólo el sitio US1-FED dispone de endpoints de entrada que cumplen con FIPS.

## Propagar el contexto de las trazas en los recursos de AWS

Datadog inyecta de forma automática el contexto de las trazas en las solicitudes de AWS SDK salientes y extrae el contexto de las trazas del evento de Lambda. Esto le permite rastrear una solicitud o transacción a través de servicios distribuidos. Consulta [Propagación de trazas serverless][33].

## Fusionar las trazas de X-Ray y Datadog

AWS X-Ray es compatible con el rastreo a través de determinados servicios gestionados de AWS, como AppSync y Step Functions, que no son compatibles con Datadog APM de forma nativa. Puedes habilitar la [integración de X-Ray para Datadog][34] y fusionar las trazas de X-Ray con las trazas nativas de Datadog. Consulta [más información al respecto][35].

## Habilitar la firma de código para AWS Lambda

[La firma de código para AWS Lambda][36] ayuda a garantizar que solo el código de confianza procedente de tus funciones de Lambda se despliega en AWS. Cuando habilitas la firma de código en tus funciones, AWS comprueba que todo el código de tus despliegues contenga una firma de un origen conocido, que tú defines en la configuración de la firma de código.

Si tus funciones de Lambda están configuradas para utilizar una firma de código, debes añadir el ARN del perfil de firma de Datadog a la configuración de firma de código de tu función antes de poder desplegar tus funciones de Lambda mediante el uso de las capas de Lambda que publica Datadog.

ARN del perfil de firma de Datadog:

{{< site-region region="us,us3,us5,eu,gov" >}}
```
arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc
```
{{< /site-region >}}

{{< site-region region="ap1" >}}
```
arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc
```
{{< /site-region >}}


## Migrar a la Datadog Lambda Extension

Datadog puede recopilar los datos de monitorización de tus funciones de Lambda mediante la [función de Lambda del Forwarder][4] o la [extensión de Lambda][2]. Datadog recomienda utilizar la extensión para las instalaciones nuevas. Si no lo tienes claro, consulta [Decidir migrar a la Datadog Lambda Extension][37].

Para proceder con la migración, compara las [instrucciones de instalación de la Datadog Lambda Extension][1] con las [instrucciones del Datadog Forwarder][38]. Las principales diferencias se resumen a continuación:

**Nota**: Datadog recomienda migrar las aplicaciones de desarrollo y de prueba primero y las aplicaciones de producción una por una.

<div class="alert alert-info">La extensión Datadog Lambda permite la recopilación de logs de forma predeterminada. Si estás migrando del Forwarder a la extensión, asegúrate de eliminar tu suscripción a logs. De lo contrario, es posible que veas logs duplicados.</div>

{{< tabs >}}
{{% tab "Datadog CLI" %}}

1. Actualiza `@datadog/datadog-ci` a la última versión.
2. Actualiza el argumento `--layer-version` y configúralo con la última versión de tu tiempo de ejecución.
3. Configura el argumento `--extension-version` con la última versión de la extensión, que es `{{< latest-lambda-layer-version layer="extension" >}}`.
4. Define las variables de entorno obligatorias `DATADOG_SITE` y `DATADOG_API_KEY_SECRET_ARN`.
5. Elimina el argumento `--forwarder`.
6. Si configuraste tu integración de AWS para Datadog de modo que suscriba automáticamente los grupos de logs del Forwarder a Lambda, deshabilita esta característica cuando migres _todas_ las funciones de Lambda de esa región.

{{% /tab %}}
{{% tab "Serverless Framework" %}}

1. Actualiza `serverless-plugin-datadog` a la última versión, que instala de forma predeterminada la Datadog Lambda Extension, a no ser que hayas definido `addExtension` como `false`.
2. Define los parámetros obligatorios `site` y `apiKeySecretArn`.
3. Define los parámetros `env`, `service` y `version` si antes los definiste como etiquetas de recursos de Lambda. El complemento los definirá automáticamente en las variables de entorno reservadas de Datadog, como `DD_ENV`, al utilizar la extensión.
4. Elimina el parámetro `forwarderArn`, a no ser que quieras que el Forwarder continúe recopilando logs procedentes de recursos distintos de Lambda y tengas `subscribeToApiGatewayLogs`, `subscribeToHttpApiLogs` o `subscribeToWebsocketLogs` definidos como `true`.
5. Si configuraste tu integración de AWS para Datadog de modo que suscriba automáticamente los grupos de logs del Forwarder a Lambda, deshabilita esta característica cuando migres _todas_ las funciones de Lambda de esa región.

{{% /tab %}}
{{% tab "AWS SAM" %}}

1. Actualiza el stack tecnológico de CloudFormation `datadog-serverless-macro` de modo que seleccione la última versión.
2. Configura el parámetro `extensionLayerVersion` con la última versión de la extensión, que es `{{< latest-lambda-layer-version layer="extension" >}}`.
3. Define los parámetros obligatorios `site` y `apiKeySecretArn`.
4. Elimina el parámetro `forwarderArn`.
5. Si configuraste tu integración de AWS para Datadog de modo que suscriba automáticamente los grupos de logs del Forwarder a Lambda, deshabilita esta característica cuando migres _todas_ las funciones de Lambda de esa región.

{{% /tab %}}
{{% tab "AWS CDK" %}}

1. Actualiza `datadog-cdk-constructs` o `datadog-cdk-constructs-v2` a la última versión.
2. Configura el parámetro `extensionLayerVersion` con la última versión de la extensión, que es `{{< latest-lambda-layer-version layer="extension" >}}`.
3. Define los parámetros obligatorios `site` y `apiKeySecretArn`.
4. Define los parámetros `env`, `service` y `version` si antes los definiste como etiquetas de recursos de Lambda. La construcción los definirá en las variables de entorno reservadas de Datadog, como `DD_ENV`, al utilizar la extensión.
5. Elimina el parámetro `forwarderArn`.
6. Si configuraste tu integración de AWS para Datadog de modo que suscriba automáticamente los grupos de logs del Forwarder a Lambda, deshabilita esta característica cuando migres _todas_ las funciones de Lambda de esa región.

{{% /tab %}}
{{% tab "Otros" %}}

1. Actualiza la capa de la biblioteca Lambda de Datadog de tu tiempo de ejecución a la última versión.
2. Instala la última versión de la Datadog Lambda Extension.
3. Define las variables de entorno obligatorias `DD_SITE` y `DD_API_KEY_SECRET_ARN`.
3. Define las variables de entorno `DD_ENV`, `DD_SERVICE` y `DD_VERSION` si antes las definiste como etiquetas de recursos de Lambda.
4. Elimina el filtro de suscripción que transmite logs procedentes del grupo de logs de tu función de Lambda al Datadog Forwarder.
5. Si configuraste tu integración de AWS para Datadog de modo que suscriba automáticamente los grupos de logs del Forwarder a Lambda, deshabilita esta característica cuando migres _todas_ las funciones de Lambda de esa región.

{{% /tab %}}
{{< /tabs >}}

## Migrar de x86 a arm64 con la Datadog Lambda Extension

La extensión de Datadog es un archivo binario compilado, disponible en x86 y arm64. Si vas a migrar una función de Lambda de x86 a arm64 (o de arm64 a x86) mediante una herramienta de despliegue como el CDK, Serverless Framework o SAM, asegúrate de que la integración de tu servicio (como API Gateway, SNS o Kinesis) esté configurada para utilizar versiones o alias de una función de Lambda. De lo contrario, la función no estará disponible durante unos diez segundos durante el despliegue.

Esto ocurre porque migrar una función de Lambda de x86 a arm64 se hace mediante dos llamadas paralelas a la API, `updateFunction` y `updateFunctionConfiguration`. Durante estas llamadas, existe un breve periodo en el que la llamada de Lambda `updateFunction` y el código se actualizan para utilizar la arquitectura nueva, pero la llamada`updateFunctionConfiguration` aún no se completa, por lo que la arquitectura antigua sigue configurada para la extensión.

Si no puedes usar versiones de capa, Datadog recomienda configurar el [Datadog Forwarder][38] durante el proceso de migración de la arquitectura.


## Configurar la Datadog Lambda Extension para hacer tests locales

No todos los emuladores Lambda son compatibles con la API de telemetría de AWS Lambda. Para probar la imagen de contenedor de tu función Lambda de forma local con la extensión Datadog Lambda instalada, necesitas configurar `DD_SERVERLESS_FLUSH_STRATEGY` en `periodically,1` en tu entorno de test local. De lo contrario, la extensión esperará las respuestas de la API de telemetría de AWS Lambda y bloqueará la invocación.

## Instrumentar AWS Lambda con la API de OpenTelemetry

La biblioteca de rastreo de Datadog, que se incluye en la Datadog Lambda Extension tras su instalación, acepta los tramos y trazas generados a partir del código instrumentado por OpenTelemetry, procesa la telemetría y la envía a Datadog.

Puedes utilizar este enfoque si, por ejemplo, tu código ya se instrumentó con la API de OpenTelemetry. También puedes utilizar este enfoque si quieres instrumentar mediante código agnóstico del proveedor con la API de OpenTelemetry sin dejar de obtener los beneficios de utilizar las bibliotecas de rastreo de Datadog.

Para instrumentar AWS Lambda con la API de OpenTelemetry, define la variable de entorno `DD_TRACE_OTEL_ENABLED` como `true`. Consulta [Instrumentación personalizada con la API de OpenTelemetry][48] para obtener más detalles.

## Uso de Datadog Lambda Extension v67+
La versión 67+ de [Datadog Extension][53] está optimizada para reducir significativamente la duración del arranque en frío.
Para utilizar la extensión optimizada, establece la variable de entorno `DD_SERVERLESS_APPSEC_ENABLED` en `false`.
Cuando la variable de entorno `DD_SERVERLESS_APPSEC_ENABLED` se establece en `true`, la Datadog Extension utiliza por defecto la versión anterior totalmente compatible. También puedes forzar a tu extensión a utilizar la versión anterior configurando `DD_EXTENSION_VERSION` en `compatibility`. Datadog te anima a informar de cualquier comentario o error añadiendo una [incidencia en GitHub][54] y etiquetando tu incidencia con `version/next`.

## Configuración del enlace automático para PutItem de DynamoDB
Disponible para los tiempos de ejecución de Python y Node.js.
Cuando los segmentos de tus solicitudes asíncronas no pueden propagar el contexto de traza, la función [enlace automático de tramos][55] de Datadog detecta automáticamente los tramos vinculados. 
Para habilitar el enlace automático de tramos para la operación `PutItem` de [DynamoDB Change Streams][56], configura nombres de clave primaria para tus tablas.

{{< tabs >}}
{{% tab "Python" %}}
```python
ddtrace.config.botocore['dynamodb_primary_key_names_for_tables'] = {
    'table_name': {'key1', 'key2'},
    'other_table': {'other_key'},
}
```
{{% /tab %}}
{{% tab "Node.js" %}}
```js
// Initialize the tracer with the configuration
const tracer = require('dd-trace').init({
  dynamoDb: {
    tablePrimaryKeys: {
      'table_name': ['key1', 'key2'],
      'other_table': ['other_key']
    }
  }
})
```
{{% /tab %}}
{{% tab "Environment variable" %}}
```sh
export DD_BOTOCORE_DYNAMODB_TABLE_PRIMARY_KEYS='{
    "table_name": ["key1", "key2"],
    "other_table": ["other_key"]
}'
```
{{% /tab %}}
{{< /tabs >}}

Esto permite instrumentar las llamadas `PutItem` a DynamoDB con punteros a tramo. Muchas llamadas a la API de DynamoDB no incluyen los campos de clave principal del elemento como valores independientes, por lo que deben proporcionarse al rastreador por separado. La configuración anterior está estructurada como un diccionario (`dict`) u objeto cuya clave son los nombres de tabla como cadenas (`str`). Cada valor es el conjunto de nombres de campo de clave primaria (como cadenas) para la tabla asociada. El conjunto puede tener exactamente uno o dos elementos, dependiendo del esquema de clave primaria de la tabla.

## Visualización y modelado de los servicios de AWS por nombre de recurso

Estas versiones de las capas Lambda de [Node.js][50], [Python][51] y [Java][52] lanzaron cambios para nombrar, modelar y visualizar correctamente los servicios gestionados de AWS. 

Los nombres de los servicios reflejan el nombre real del recurso de AWS y no solo el servicio de AWS:
* `aws.lambda` → `[function_name]`
* `aws.dynamodb` → `[table_name]`
* `aws.sns` → `[topic_name]`
* `aws.sqs` → `[queue_name]`
* `aws.kinesis` → `[stream_name]`
* `aws.s3` → `[bucket_name]`
* `aws.eventbridge` → `[event_name]`

Es posible que prefieras el modelo de representación de servicios anterior si tus dashboards y monitores dependen de la convención de nomenclatura heredada. Para restaurar el comportamiento anterior, establece la variable de entorno: `DD_TRACE_AWS_SERVICE_REPRESENTATION_ENABLED=false`

Se recomienda la configuración actualizada del modelado de servicios. 

## Envío de logs a Observability Pipelines
La versión 87+ de la Datadog Lambda Extension permite a los usuarios enviar logs a [Observability Pipelines][58].

Para activar esta función, establece estas variables de entorno:
- `DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_ENABLED`: `true`
- `DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_URL`: `<YOUR_OBSERVABILITY_PIPELINE_URL>`

**Nota**: Tu Observability pipeline debe utilizar `Http Server` como fuente para procesar logs de Lambda Extension. No utilices `Datadog Agent` como fuente.

## Solucionar problemas

Si tienes problemas para configurar tus instalaciones, define la variable de entorno `DD_LOG_LEVEL` como `debug` en los logs de depuración. Para obtener más consejos sobre cómo solucionar problemas, consulta la [guía de solución de problemas de la monitorización serverless][39].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/serverless/installation/
[2]: /es/serverless/libraries_integrations/extension/
[3]: /es/integrations/amazon_web_services/
[4]: /es/serverless/libraries_integrations/forwarder/
[5]: https://www.datadoghq.com/blog/troubleshoot-lambda-function-request-response-payloads/
[6]: /es/tracing/configure_data_security/#scrub-sensitive-data-from-your-spans
[7]: /es/serverless/enhanced_lambda_metrics
[8]: /es/integrations/amazon_api_gateway/#data-collected
[9]: /es/integrations/amazon_appsync/#data-collected
[10]: /es/integrations/amazon_sqs/#data-collected
[11]: /es/integrations/amazon_web_services/#log-collection
[12]: https://www.datadoghq.com/blog/monitor-aws-fully-managed-services-datadog-serverless-monitoring/
[13]: /es/agent/logs/advanced_log_collection/
[14]: /es/logs/log_configuration/pipelines/
[15]: /es/tracing/trace_collection/compatibility/
[16]: /es/tracing/trace_collection/custom_instrumentation/
[17]: /es/tracing/trace_pipeline/ingestion_controls/#configure-the-service-ingestion-rate
[18]: /es/tracing/guide/trace_ingestion_volume_control#effects-of-reducing-trace-ingestion-volume
[19]: /es/tracing/trace_pipeline/ingestion_mechanisms/?tabs=environmentvariables#head-based-sampling
[20]: /es/tracing/trace_pipeline/trace_retention/
[21]: /es/tracing/trace_pipeline/
[22]: /es/tracing/guide/ignoring_apm_resources/
[23]: /es/tracing/configure_data_security/
[24]: /es/tracing/other_telemetry/connect_logs_and_traces/
[25]: /es/logs/log_configuration/parsing/
[26]: /es/integrations/guide/source-code-integration
[27]: /es/serverless/aws_lambda/metrics/#submit-custom-metrics
[28]: /es/agent/guide/private-link/
[29]: /es/getting_started/site/
[30]: /es/agent/proxy/
[31]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#aws-privatelink-support
[32]: /es/agent/guide/dual-shipping/
[33]: /es/serverless/distributed_tracing/#trace-propagation
[34]: /es/integrations/amazon_xray/
[35]: /es/serverless/distributed_tracing/#trace-merging
[36]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html
[37]: /es/serverless/guide/extension_motivation/
[38]: /es/serverless/guide#install-using-the-datadog-forwarder
[39]: /es/serverless/guide/troubleshoot_serverless_monitoring/
[40]: /es/serverless/libraries_integrations/extension/
[41]: https://app.datadoghq.com/security/appsec?column=time&order=desc
[42]: /es/profiler/
[43]: /es/serverless/installation#installation-instructions
[44]: /es/security/default_rules/security-scan-detected/
[45]: https://docs.datadoghq.com/es/tracing/trace_collection/library_config/
[46]: https://docs.datadoghq.com/es/tracing/glossary/#services
[47]: /es/logs/
[48]: /es/tracing/trace_collection/otel_instrumentation/
[49]: https://app.datadoghq.com/security/appsec?column=time&order=desc
[50]: https://github.com/DataDog/datadog-lambda-js/releases/tag/v12.127.0
[51]: https://github.com/DataDog/datadog-lambda-python/releases/tag/v8.113.0
[52]: https://github.com/DataDog/datadog-lambda-java/releases/tag/v24
[53]: https://github.com/DataDog/datadog-lambda-extension
[54]: https://github.com/DataDog/datadog-lambda-extension/issues
[55]: /es/serverless/aws_lambda/distributed_tracing/#span-auto-linking
[56]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html
[57]: /es/tracing/guide/aws_payload_tagging/?code-lang=python&tab=nodejs
[58]: https://www.datadoghq.com/product/observability-pipelines/