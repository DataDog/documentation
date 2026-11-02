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
  text: Instale Serverless Monitoring para AWS Lambda
- link: /serverless/troubleshooting/
  tag: Documentación
  text: Solucione problemas de Serverless Monitoring para AWS Lambda
- link: /integrations/github
  tag: Documentación
  text: Integración de Datadog con GitHub
- link: https://learn.datadoghq.com/courses/visibility-aws-lambda
  tag: Centro de aprendizaje
  text: Configurar AWS Lambda para Serverless Monitoring con Datadog
title: Configure Serverless Monitoring para AWS Lambda
---
Primero, [instale][1] Datadog Serverless Monitoring para comenzar a recopilar métricas, trazas y registros. Una vez completada la instalación, consulte los siguientes temas para configurar su instalación según sus necesidades de monitoreo.

- [Conecte la telemetría mediante etiquetas](#connect-telemetry-using-tags)
- [Recopile las cargas útiles de solicitud y respuesta](#collect-the-request-and-response-payloads)
- [Recopile trazas de recursos que no sean Lambda](#collect-traces-from-non-lambda-resources)
- [Configure el SDK de Datadog](#configure-the-datadog-sdk)
- [Seleccione tasas de muestreo para la ingesta de spans de APM](#select-sampling-rates-for-ingesting-apm-spans)
- [Filtre o depure la información confidencial de las trazas](#filter-or-scrub-sensitive-information-from-traces)
- [Habilite o deshabilite la recopilación de trazas](#enabledisable-trace-collection)
- [Conecte registros y trazas](#connect-logs-and-traces)
- [Vincule errores a su código fuente](#link-errors-to-your-source-code)
- [Envíe métricas personalizadas][27]
- [Excluya las etiquetas autoinyectadas de las métricas personalizadas](#exclude-auto-injected-tags-from-custom-metrics)
- [Recopile datos de Profiling](#collect-profiling-data)
- [Envíe telemetría a través de PrivateLink o un proxy](#send-telemetry-over-privatelink-or-proxy)
- [Envíe telemetría a varias organizaciones de Datadog](#send-telemetry-to-multiple-datadog-organizations)
- [Habilite el cumplimiento de FIPS](#enable-fips-compliance)
- [Propague el contexto de traza a través de recursos de AWS](#propagate-trace-context-over-aws-resources)
- [Combine trazas de X-Ray y Datadog](#merge-x-ray-and-datadog-traces)
- [Habilite la firma de código de AWS Lambda](#enable-aws-lambda-code-signing)
- [Migre a Datadog Lambda Extension](#migrate-to-the-datadog-lambda-extension)
- [Migración de x86 a arm64 con Datadog Lambda Extension](#migrating-between-x86-to-arm64-with-the-datadog-lambda-extension)
- [Configure Datadog Lambda Extension para pruebas locales](#configure-the-datadog-lambda-extension-for-local-testing)
- [Instrumente AWS Lambda con la API de OpenTelemetry](#instrument-aws-lambda-with-the-opentelemetry-api)
- [Uso de Datadog Lambda Extension v67+](#using-datadog-lambda-extension-v67)
- [Configure Auto-linking para PutItem de DynamoDB](#configure-auto-linking-for-dynamodb-putitem)
- [Visualice y modele los servicios de AWS correctamente](#visualize-and-model-aws-services-by-resource-name)
- [Envíe registros a Observability Pipelines](#send-logs-to-observability-pipelines)
- [Autentíquese con Workload Identity Federation](#authenticate-with-workload-identity-federation)
- [Recargue el secreto de la clave de API periódicamente](#reload-api-key-secret-periodically)
- [Solución de problemas](#troubleshoot)
- [Lecturas adicionales](#further-reading)


## Habilite Threat Detection para observar intentos de ataque {#enable-threat-detection-to-observe-attack-attempts}

Reciba alertas sobre atacantes que tienen como objetivo sus aplicaciones sin servidor y responda rápidamente.

Para comenzar, primero asegúrese de tener [el rastreo habilitado][43] para sus funciones.

Para habilitar el monitoreo de amenazas, agregue las siguientes variables de entorno a su implementación:
   ```yaml
   environment:
     DD_SERVERLESS_APPSEC_ENABLED: true
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
   ```

Vuelva a implementar la función e invóquela. Después de unos minutos, aparece en las [vistas de AAP][49].

Para ver la detección de amenazas de la Protección de aplicaciones y API en acción, envíe patrones de ataque conocidos a su aplicación. Por ejemplo, envíe un encabezado HTTP con el valor `acunetix-product` para desencadenar un intento de [ataque de escáner de seguridad][44]:
   ```sh
   curl -H 'My-AAP-Test-Header: acunetix-product' https://<YOUR_FUNCTION_URL>/<EXISTING_ROUTE>
   ```
Unos minutos después de habilitar su aplicación y enviar los patrones de ataque, **la información sobre amenazas aparece en [{{< ui >}}Application Signals Explorer{{< /ui >}}][41]**.

## Conecte la telemetría usando las etiquetas {#connect-telemetry-using-tags}

Conecte la telemetría de Datadog mediante el uso de etiquetas reservadas (`env`, `service` y `version`) y personalizadas. Puede usar estas etiquetas para navegar sin problemas entre métricas, trazas y registros. Agregue los parámetros adicionales a continuación para el método de instalación que utilice.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Asegúrese de estar utilizando la versión más reciente de la [Datadog CLI][1] y ejecute el comando `datadog-ci lambda instrument` con los argumentos adicionales apropiados. Por ejemplo:

```sh
datadog-ci lambda instrument \
    --env dev \
    --service web \
    --version v1.2.3 \
    --extra-tags "team:avengers,project:marvel"
    # ... other required arguments, such as function names
```

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

Asegúrese de estar utilizando la versión más reciente del [Datadog serverless plugin][1] y aplique las etiquetas usando los parámetros `env`, `service`, `version` y `tags`. Por ejemplo:

```yaml
custom:
  datadog:
    # ... other required parameters, such as the Datadog site and API key
    env: dev
    service: web
    version: v1.2.3
    tags: "team:avengers,project:marvel"
```

De forma predeterminada, si no define `env` y `service`, el plugin utiliza automáticamente los valores `stage` y `service` de la definición de la aplicación serverless. Para deshabilitar esta función, establezca `enableTags` en `false`.

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/plugin
{{% /tab %}}
{{% tab "AWS SAM" %}}

Asegúrese de estar utilizando la versión más reciente del [Datadog serverless macro][1] y aplique las etiquetas usando los parámetros `env`, `service`, `version` y `tags`. Por ejemplo:

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... other required parameters, such as the Datadog site and API key
      env: dev
      service: web
      version: v1.2.3
      tags: "team:avengers,project:marvel"
```

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/macro
{{% /tab %}}
{{% tab "AWS CDK" %}}

Asegúrese de estar utilizando la versión más reciente del [Datadog serverless cdk construct][1] y aplique las etiquetas usando los parámetros `env`, `service`, `version` y `tags`. Por ejemplo:

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

Si está recopilando telemetría de sus funciones Lambda mediante [Datadog Lambda Extension][1], establezca las siguientes variables de entorno en sus funciones Lambda. Por ejemplo:
- DD_ENV: dev
- DD_SERVICE: web
- DD_VERSION: v1.2.3
- DD_TAGS: team:avengers,project:marvel

Si está recopilando telemetría de sus funciones Lambda mediante la [función Lambda Datadog Forwarder][2], establezca `env`, `service`, `version` y etiquetas adicionales como etiquetas de recursos de AWS en sus funciones Lambda. Asegúrese de que la opción `DdFetchLambdaTags` esté establecida en `true` en la pila de CloudFormation para su Datadog Forwarder. Esta opción tiene como valor predeterminado true desde la versión 3.19.0.

[1]: /es/serverless/libraries_integrations/extension/
[2]: /es/serverless/libraries_integrations/forwarder/
{{% /tab %}}
{{< /tabs >}}

Datadog también puede enriquecer la telemetría recopilada con etiquetas de recursos de AWS existentes definidas en sus funciones Lambda con un retraso de unos pocos minutos.

- Si está recopilando telemetría de sus funciones Lambda mediante [Datadog Lambda Extension][2], habilite la [integración de AWS con Datadog][3]. Esta función está diseñada para enriquecer su telemetría con etiquetas **personalizadas**. Las etiquetas reservadas de Datadog (`env`, `service` y `version`) deben configurarse mediante las variables de entorno correspondientes (`DD_ENV`, `DD_SERVICE` y `DD_VERSION`, respectivamente). Las etiquetas reservadas también se pueden configurar mediante los parámetros que proporcionan las integraciones de Datadog con las herramientas de desarrollo sin servidor. Esta función no funciona con funciones Lambda implementadas mediante imágenes de contenedor.

- Si está recopilando telemetría de sus funciones Lambda mediante la [función Lambda de Datadog Forwarder][4], establezca la opción `DdFetchLambdaTags` en `true` en la pila de CloudFormation de su Datadog Forwarder. Esta opción tiene como valor predeterminado true desde la versión 3.19.0.

## Recopile las cargas útiles de solicitud y respuesta {#collect-the-request-and-response-payloads}

<div class="alert alert-info">Esta función es compatible con Python, Node.js, Go, Java y .NET.</div>

Datadog puede [recopilar y visualizar las cargas útiles JSON de las solicitudes y respuestas de las funciones AWS Lambda][5], lo que le permite comprender mejor sus aplicaciones sin servidor y ayuda a solucionar las fallas de las funciones Lambda.

Esta función está deshabilitada de forma predeterminada. Siga las instrucciones que aparecen a continuación para el método de instalación que utilice.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Asegúrese de utilizar la versión más reciente de [Datadog CLI][1] y ejecute el comando `datadog-ci lambda instrument` con el argumento adicional `--capture-lambda-payload`. Por ejemplo:

```sh
datadog-ci lambda instrument \
    --capture-lambda-payload true
    # ... other required arguments, such as function names
```

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

Asegúrese de utilizar la versión más reciente de [Datadog serverless plugin][1] y establezca `captureLambdaPayload` en `true`. Por ejemplo:

```yaml
custom:
  datadog:
    # ... other required parameters, such as the Datadog site and API key
    captureLambdaPayload: true
```

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/plugin
{{% /tab %}}
{{% tab "AWS SAM" %}}

Asegúrese de utilizar la versión más reciente de [Datadog serverless macro][1] y establezca el parámetro `captureLambdaPayload` en `true`. Por ejemplo:

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... other required parameters, such as the Datadog site and API key
      captureLambdaPayload: true
```

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/macro
{{% /tab %}}
{{% tab "AWS CDK" %}}

Asegúrese de utilizar la versión más reciente de [Datadog serverless cdk construct][1] y establezca el parámetro `captureLambdaPayload` en `true`. Por ejemplo:

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

Establezca la variable de entorno `DD_CAPTURE_LAMBDA_PAYLOAD` en `true` en sus funciones Lambda.

{{% /tab %}}
{{< /tabs >}}

Para evitar que se envíen a Datadog datos confidenciales dentro de objetos JSON de solicitud o respuesta, puede depurar parámetros específicos.

Para hacer esto, agregue un archivo nuevo `datadog.yaml` en la misma carpeta que el código de su función Lambda. La ofuscación de campos en la carga útil de Lambda queda entonces disponible a través del [bloque replace_tags][6] dentro de la configuración de `apm_config` en `datadog.yaml`:

```yaml
apm_config:
  replace_tags:
    # Replace all the occurrences of "foobar" in any tag with "REDACTED":
    - name: "*"
      pattern: "foobar"
      repl: "REDACTED"
    # Replace "auth" from request headers with an empty string
    - name: "function.request.headers.auth"
      pattern: "(?s).*"
      repl: ""
    # Replace "apiToken" from response payload with "****"
    - name: "function.response.apiToken"
      pattern: "(?s).*"
      repl: "****"
```

Como alternativa, también puede completar la variable de entorno `DD_APM_REPLACE_TAGS` en su función Lambda para ofuscar campos específicos:

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

Para recopilar cargas útiles de servicios de AWS, consulte [Capturar solicitudes y respuestas de servicios de AWS][54].



## Recopilar trazas de recursos que no son Lambda {#collect-traces-from-non-lambda-resources}

Datadog puede inferir tramos de APM basados en los eventos de Lambda entrantes para los recursos administrados de AWS que activan la función Lambda. Esto puede ayudar a visualizar la relación entre los recursos administrados de AWS e identificar problemas de rendimiento en sus aplicaciones sin servidor. Consulte [detalles adicionales del producto][12].

Actualmente se admiten los siguientes recursos:

- API Gateway (REST API, HTTP API y WebSocket)
- Function URLs
- SQS
- SNS (también se admiten mensajes de SNS entregados a través de SQS)
- Kinesis Streams (si los datos son una cadena JSON o una cadena JSON codificada en base64)
- EventBridge (eventos personalizados, donde `Details` es una cadena JSON)
- S3
- DynamoDB

Para deshabilitar esta función, establezca `DD_TRACE_MANAGED_SERVICES` en `false`.

### DD_SERVICE_MAPPING {#dd-service-mapping}

`DD_SERVICE_MAPPING` es una variable de entorno que cambia el nombre de los [nombres de servicios][46] ascendentes que no son Lambda. Funciona con pares de `old-service:new-service`.

#### Sintaxis {#syntax}

`DD_SERVICE_MAPPING=key1:value1,key2:value2`...

Hay dos formas de interactuar con esta variable:

#### Cambiar el nombre de todos los servicios de un tipo {#rename-all-services-of-a-type}

Para cambiar el nombre de todos los servicios ascendentes asociados con una integración de AWS Lambda, utilice estos identificadores:

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

#### Cambiar el nombre de servicios específicos {#rename-specific-services}

Para un enfoque más granular, utilice estos identificadores específicos del servicio:

| Servicio | Identificador | Valor de DD_SERVICE_MAPPING |
|---|---|---|
| API Gateway | ID de API | `"r3pmxmplak:newServiceName"` |
| SNS | Nombre del tema | `"ExampleTopic:newServiceName"` |
| SQS | Nombre de la cola | `"MyQueue:newServiceName"` |
| S3 | Nombre del bucket | `"example-bucket:newServiceName"` |
| EventBridge | Fuente del evento | `"eventbridge.custom.event.sender:newServiceName"` |
| Kinesis | Nombre del stream | `"MyStream:newServiceName"` |
| DynamoDB | Nombre de la tabla | `"ExampleTableWithStream:newServiceName"` |
| URL de Lambda | ID de API | `"a8hyhsshac:newServiceName"` |
| MSK | Nombre del clúster | `"ExampleCluster:newServiceName"` |

#### Ejemplos con descripción {#examples-with-description}

| Comando | Descripción |
|---|---|
| `DD_SERVICE_MAPPING="lambda_api_gateway:new-service-name"` | Cambia el nombre de todos los servicios `lambda_api_gateway` ascendentes a `new-service-name` |
| `DD_SERVICE_MAPPING="08se3mvh28:new-service-name"` | Cambia el nombre del servicio ascendente específico `08se3mvh28.execute-api.eu-west-1.amazonaws.com` a `new-service-name` |

Para cambiar el nombre de servicios descendentes, consulte `DD_SERVICE_MAPPING` en la [documentación de configuración del tracer][45].

## Configure el SDK de Datadog {#configure-the-datadog-sdk}

Para ver qué bibliotecas y frameworks instrumenta automáticamente el cliente de Datadog APM, consulte [Requisitos de compatibilidad para APM][15]. Para instrumentar aplicaciones personalizadas, consulte la guía de APM de Datadog para [instrumentación personalizada][16].

## Seleccione las tasas de muestreo para la ingesta de tramos de APM {#select-sampling-rates-for-ingesting-apm-spans}

Para administrar la [tasa de muestreo de invocaciones trazadas por APM][17] para funciones serverless, establezca la variable de entorno `DD_TRACE_SAMPLING_RULES` en la función con un valor entre 0.000 (sin rastreo de invocaciones de funciones Lambda) y 1.000 (rastrear todas las invocaciones de funciones Lambda).

**Notas**:
   - El uso de `DD_TRACE_SAMPLE_RATE` está obsoleto. Use `DD_TRACE_SAMPLING_RULES` en su lugar. Por ejemplo, si ya estableció `DD_TRACE_SAMPLE_RATE` en `0.1`, establezca `DD_TRACE_SAMPLING_RULES` en `[{"sample_rate":0.1}]` en su lugar.
   - Las métricas generales de tráfico, como `trace.<OPERATION_NAME>.hits`, se calculan en función de las invocaciones muestreadas *solo* en Lambda.

Para los servicios con una alta tasa de procesamiento, generalmente no es necesario recopilar todas las solicitudes, ya que los datos de las trazas son muy repetitivos; un problema lo suficientemente importante debería manifestarse en varias trazas. [Ingestion controls][18] le permiten obtener la visibilidad necesaria para solucionar problemas sin exceder el presupuesto.

El mecanismo de muestreo predeterminado para la ingesta se llama [muestreo basado en el inicio][19]. La decisión de mantener o descartar una traza se toma al principio de la misma, al inicio del tramo raíz. Esta decisión se propaga luego a otros servicios como parte de su contexto de solicitud, por ejemplo, como un encabezado de solicitud HTTP. Debido a que la decisión se toma al inicio de la traza y luego se transmite a todas las partes de la misma, debe configurar la tasa de muestreo en el servicio raíz para que surta efecto.

Después de que Datadog ingiera los tramos, el filtro de retención inteligente de Datadog indexa una proporción de trazas para ayudarle a hacer un seguimiento del estado de sus aplicaciones. También puede definir [filtros de retención][20] personalizados para indexar los datos de trazas que desea conservar por más tiempo para respaldar los objetivos de su organización.

Obtenga más información sobre [Datadog Trace Pipeline][21].

## Filtrar o depurar información confidencial de las trazas {#filter-or-scrub-sensitive-information-from-traces}

Para filtrar trazas antes de enviarlas a Datadog, consulte [Ignorar recursos no deseados en APM][22].

Para depurar atributos de trazas por seguridad de datos, consulte [Configurar Datadog Agent o Tracer para la seguridad de los datos][23].

## Habilitar/deshabilitar la recopilación de trazas {#enabledisable-trace-collection}

La recopilación de trazas a través de la extensión Lambda de Datadog está habilitada de forma predeterminada.

Si desea comenzar a recopilar trazas de sus funciones Lambda, aplique las configuraciones a continuación:

{{< tabs >}}
{{% tab "Datadog CLI" %}}

```sh
datadog-ci lambda instrument \
    --tracing true
    # ... other required arguments, such as function names
```
{{% /tab %}}
{{% tab "Serverless Framework" %}}

```yaml
custom:
  datadog:
    # ... other required parameters, such as the Datadog site and API key
    enableDDTracing: true
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... other required parameters, such as the Datadog site and API key
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

Establezca la variable de entorno `DD_TRACE_ENABLED` en `true` en sus funciones Lambda.

{{% /tab %}}
{{< /tabs >}}

#### Deshabilitar la recopilación de trazas {#disable-trace-collection}

Si desea dejar de recopilar trazas de sus funciones Lambda, aplique las configuraciones a continuación:

{{< tabs >}}
{{% tab "Datadog CLI" %}}

```sh
datadog-ci lambda instrument \
    --tracing false
    # ... other required arguments, such as function names
```
{{% /tab %}}
{{% tab "Serverless Framework" %}}

```yaml
custom:
  datadog:
    # ... other required parameters, such as the Datadog site and API key
    enableDDTracing: false
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... other required parameters, such as the Datadog site and API key
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

Establezca la variable de entorno `DD_TRACE_ENABLED` en `false` en sus funciones Lambda.

{{% /tab %}}
{{< /tabs >}}

## Conectar registros y trazas {#connect-logs-and-traces}

Si está utilizando la [extensión Lambda][2] para recopilar trazas y registros, Datadog agrega automáticamente el ID de solicitud de AWS Lambda al tramo `aws.lambda` bajo la etiqueta `request_id`. Además, los registros de Lambda para la misma solicitud se agregan bajo el atributo `lambda.request_id`. Las vistas de trazas y registros de Datadog están conectadas usando el ID de solicitud de AWS Lambda.

Si está utilizando la [función Lambda Forwarder][4] para recopilar trazas y registros, `dd.trace_id` se inyecta automáticamente en los registros (habilitado de forma predeterminada con la variable de entorno `DD_LOGS_INJECTION`). Las vistas de trazas y registros de Datadog están conectadas usando el ID de traza de Datadog. Esta función es compatible con la mayoría de las aplicaciones que utilizan un tiempo de ejecución y un registrador populares (consulte el [soporte por tiempo de ejecución][24]).

Si está utilizando un tiempo de ejecución o un registrador personalizado que no es compatible, siga estos pasos:
- Al registrar en JSON, necesita obtener el ID de traza de Datadog usando `dd-trace` y agregarlo a sus registros bajo el campo `dd.trace_id`:
    ```javascript
    {
      "message": "This is a log",
      "dd": {
        "trace_id": "4887065908816661012"
      }
      // ... the rest of your log
    }
    ```
- Cuando registre en texto plano, necesita:
    1. Obtener el ID de traza de Datadog usando `dd-trace` y agregarlo a su registro.
    2. Clone el pipeline de registros de Lambda predeterminado, que es de solo lectura.
    3. Habilite el pipeline clonado y deshabilite el predeterminado.
    4. Actualice las reglas de [{{< ui >}}Grok parser{{< /ui >}}][25] del pipeline clonado para extraer el ID de traza de Datadog como el atributo `dd.trace_id`. Por ejemplo, use la regla `my_rule \[%{word:level}\]\s+dd.trace_id=%{word:dd.trace_id}.*` para registros que se vean como `[INFO] dd.trace_id=4887065908816661012 My log message`.

## Vincule los errores a su código fuente {#link-errors-to-your-source-code}

La [integración de código fuente de Datadog][26] le permite vincular su telemetría (como trazas de pila) al código fuente de sus funciones Lambda en sus repositorios de Git.

Para obtener instrucciones sobre cómo configurar la integración de código fuente en sus aplicaciones sin servidor, consulte la sección [Insertar información de Git en sus artefactos de compilación][101].

[101]: /es/integrations/guide/source-code-integration/?tab=go#serverless

## Excluya las etiquetas autoinyectadas de las métricas personalizadas {#exclude-auto-injected-tags-from-custom-metrics}

Datadog Lambda Extension enriquece las [métricas personalizadas][27] que envía a través de DogStatsD con etiquetas autoinyectadas como `function_arn`, `region` y `account_id`.

Para descartar etiquetas autoinyectadas específicas de sus métricas personalizadas, configure la variable de entorno `DD_LAMBDA_CUSTOMER_METRICS_EXCLUDE_TAGS` con una lista de claves de etiqueta separadas por comas. Por ejemplo, para excluir tanto las etiquetas `function_arn` como `region`:

```yaml
DD_LAMBDA_CUSTOMER_METRICS_EXCLUDE_TAGS: function_arn,region
```

**Notas**:
   - Esta configuración se aplica solo a métricas personalizadas (DogStatsD). No cambia las etiquetas de las [métricas de Lambda mejoradas][7] ni de las trazas.
   - De forma predeterminada, no se excluye ninguna etiqueta.
   - Esto está disponible a partir de la versión 98 de Datadog Lambda Extension.

## Recopile datos de perfilado {#collect-profiling-data}

El [Continuous Profiler][42] de Datadog está disponible en vista previa para la versión 4.62.0 del trazador de Python y la versión 62 y anteriores de la capa. Esta función opcional se habilita configurando la variable de entorno `DD_PROFILING_ENABLED` en `true`.

Continuous Profiler funciona generando un hilo que toma periódicamente una instantánea de la CPU y el montón de todo el código de Python en ejecución. Esto puede incluir al propio generador de perfiles. Si desea que el generador de perfiles se ignore a sí mismo, configure `DD_PROFILING_IGNORE_PROFILER` en `true`.

## Envíe telemetría a través de PrivateLink o proxy {#send-telemetry-over-privatelink-or-proxy}

La Datadog Lambda Extension necesita acceso a internet público para enviar datos a Datadog. Si sus funciones Lambda están implementadas en una VPC sin acceso a internet público, puede [enviar datos a través de AWS PrivateLink][28] al `datadoghq.com` [sitio de Datadog][29], o [enviar datos a través de un proxy][30] para todos los demás sitios.

Si está utilizando el Datadog Forwarder, siga estas [instrucciones][31].

## Envíe telemetría a múltiples organizaciones de Datadog {#send-telemetry-to-multiple-datadog-organizations}

Si desea enviar datos a múltiples organizaciones, puede habilitar el envío dual utilizando una clave de API en texto plano, AWS Secrets Manager o AWS KMS.

{{< tabs >}}
{{% tab "Clave de API en texto plano" %}}

Puede habilitar el envío dual usando una clave de API de texto plano configurando las siguientes variables de entorno en su función Lambda.

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

La extensión de Datadog admite la recuperación automática de valores de [AWS Secrets Manager][1] para cualquier variable de entorno con el prefijo `_SECRET_ARN`. Puede usar esto para almacenar de forma segura sus variables de entorno en Secrets Manager y realizar envíos duales con Datadog.

1. Configure la variable de entorno `DD_LOGS_CONFIG_FORCE_USE_HTTP` en su función Lambda.
2. Agregue el permiso `secretsmanager:GetSecretValue` a los permisos del rol de IAM de su función Lambda.
3. Cree un nuevo secreto en Secrets Manager para almacenar la variable de entorno de métricas de envío dual. El contenido debe ser similar a `{"https://app.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://app.datadoghq.eu": ["<your_api_key_4>"]}`.
4. Configure la variable de entorno `DD_ADDITIONAL_ENDPOINTS_SECRET_ARN` en su función Lambda con el ARN del secreto mencionado anteriormente.
5. Cree un nuevo secreto en Secrets Manager para almacenar la variable de entorno de APM (trazas) de envío dual. El contenido debe ser **similar** a `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}`.
6. Configure la variable de entorno `DD_APM_ADDITIONAL_ENDPOINTS_SECRET_ARN` en su función Lambda con el ARN del secreto mencionado anteriormente.
7. Cree un nuevo secreto en Secrets Manager para almacenar la variable de entorno de APM (perfilado) de envío dual. El contenido debe ser **similar** a `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}`.
8. Configure la variable de entorno `DD_APM_PROFILING_ADDITIONAL_ENDPOINTS_SECRET_ARN` en su función Lambda con el ARN del secreto mencionado anteriormente.
9. Cree un nuevo secreto en Secrets Manager para almacenar la variable de entorno de los registros para el envío dual. El contenido debe ser **similar** a `[{"api_key": "<your_api_key_2>", "Host": "agent-http-intake.logs.datadoghq.com", "Port": 443, "is_reliable": true}]`.
10. Configure la variable de entorno `DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS_SECRET_ARN` en su función Lambda igual al ARN del secreto mencionado anteriormente.

[1]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html

{{% /tab %}}
{{% tab "AWS KMS" %}}

La extensión de Datadog admite el descifrado automático de valores de [AWS KMS][41] para cualquier variable de entorno con el prefijo `_KMS_ENCRYPTED`. Puede usar esto para almacenar de forma segura sus variables de entorno en KMS y realizar el envío dual con Datadog.

1. Configure la variable de entorno `DD_LOGS_CONFIG_FORCE_USE_HTTP=true` en su función Lambda.
2. Agregue los permisos `kms:GenerateDataKey` y `kms:Decrypt` a los permisos del rol de IAM de su función Lambda.
3. Para el envío dual de métricas, cifre `{"https://app.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://app.datadoghq.eu": ["<your_api_key_4>"]}` usando KMS y establezca la variable de entorno `DD_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` igual a su valor.
4. Para el envío dual de trazas, cifre `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}` usando KMS y establezca la variable de entorno `DD_APM_ADDITIONAL_KMS_ENCRYPTED` igual a su valor.
5. Para el envío dual de perfiles, cifre `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}` usando KMS y establezca la variable de entorno `DD_APM_PROFILING_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` igual a su valor.
5. Para el envío dual de registros, cifre `[{"api_key": "<your_api_key_2>", "Host": "agent-http-intake.logs.datadoghq.com", "Port": 443, "is_reliable": true}]` usando KMS y establezca la variable de entorno `DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` igual a su valor.

[41]: https://docs.aws.amazon.com/kms/
{{% /tab %}}
{{< /tabs >}}

Para un uso más avanzado, consulte la [guía de envío dual][32].

## Habilite Compliance de FIPS {#enable-fips-compliance}

<div class="alert alert-info">Para obtener una descripción general completa de Compliance de FIPS para funciones de AWS Lambda, consulte la página específica <a href="/serverless/aws_lambda/fips-compliance">AWS Lambda FIPS Compliance</a>.</div>

Para habilitar Compliance de FIPS para funciones de AWS Lambda, siga estos pasos:

1. Utilice una capa de extensión compatible con FIPS haciendo referencia al ARN adecuado:

{{< tabs >}}
{{% tab "AWS GovCloud" %}}
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

2. Para funciones Lambda que usan Python, JavaScript o Go, establezca la variable de entorno `DD_LAMBDA_FIPS_MODE` en `true`. Esta variable de entorno:
   - En modo FIPS, las funciones auxiliares de métricas de Lambda requieren la extensión compatible con FIPS para el envío de métricas
   - Utiliza puntos de enlace de AWS FIPS para búsquedas de claves de API
   - Está habilitado de forma predeterminada en entornos GovCloud

3. Para funciones Lambda que utilizan Ruby, .NET o Java, no se necesita configuración adicional de variables de entorno.

4. Para un cumplimiento total de FIPS de extremo a extremo, configure su función Lambda para usar un sitio de Datadog for Government:
   - Establezca `DD_SITE` en `ddog-gov.com` (US1-FED) o `us2.ddog-gov.com` (US2-FED)
   **Nota**: Aunque los componentes de Lambda compatibles con FIPS funcionan con cualquier sitio de Datadog, solo los sitios de Datadog for Government tienen puntos de conexión de ingesta compatibles con FIPS.

## Propague el contexto de traza a través de recursos de AWS {#propagate-trace-context-over-aws-resources}

Datadog inyecta automáticamente el contexto de traza en las solicitudes salientes del SDK de AWS y extrae el contexto de traza del evento de Lambda. Esto permite a Datadog rastrear una solicitud o transacción a través de servicios distribuidos. Consulte [Propagación de trazas de Serverless][33].

## Combine trazas de X-Ray y Datadog {#merge-x-ray-and-datadog-traces}

Para servicios administrados de AWS que Datadog APM aún no instrumenta (como AppSync), puede habilitar la [integración de Datadog con X-Ray][34] y combinar las trazas de X-Ray con las trazas nativas de Datadog. Consulte [detalles adicionales][35].

## Habilite la firma de código de AWS Lambda {#enable-aws-lambda-code-signing}

[La firma de código para AWS Lambda][36] ayuda a garantizar que solo se implemente código confiable desde sus funciones Lambda en AWS. Cuando habilita la firma de código en sus funciones, AWS valida que todo el código en sus implementaciones esté firmado por una fuente confiable, la cual usted define desde su configuración de firma de código.

Si sus funciones Lambda están configuradas para usar firma de código, debe agregar el ARN del perfil de firma de Datadog a la configuración de firma de código de su función antes de poder implementar funciones Lambda usando capas de Lambda publicadas por Datadog.

ARN del perfil de firma de Datadog:

```
arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc
```


## Migre a Datadog Lambda Extension {#migrate-to-the-datadog-lambda-extension}

Datadog puede recopilar los datos de monitoreo de sus funciones Lambda utilizando la [función Lambda Forwarder][4] o la [extensión de Lambda][2]. Datadog recomienda la extensión de Lambda para nuevas instalaciones. Si no está seguro, consulte [Cómo decidir si migrar a Datadog Lambda Extension][37].

Para migrar, compare las [instrucciones de instalación con Datadog Lambda Extension][1] con las [instrucciones con Datadog Forwarder][38]. Para su comodidad, las diferencias clave se resumen a continuación.

**Nota**: Datadog recomienda migrar primero sus aplicaciones de desarrollo y preproducción, y migrar las aplicaciones de producción una por una.

<div class="alert alert-info">Datadog Lambda Extension habilita la recopilación de registros de forma predeterminada. Si está migrando del Forwarder a la extensión, asegúrese de eliminar su suscripción de registros. De lo contrario, es posible que vea registros duplicados.</div>

{{< tabs >}}
{{% tab "Datadog CLI" %}}

1. Actualice `@datadog/datadog-ci` a la versión más reciente
2. Actualice el argumento `--layer-version` y establézcalo en la versión más reciente para su entorno de ejecución.
3. Establezca el argumento `--extension-version` en la versión más reciente de la extensión. La versión más reciente de la extensión es `{{< latest-lambda-layer-version layer="extension" >}}`.
4. Set the required environment variables `DATADOG_SITE` and `DATADOG_API_KEY_SECRET_ARN`.
el argumento 5. Remove the `--forwarder`.
6. Si configuró la integración de Datadog con AWS para suscribir automáticamente el Forwarder a los grupos de registros de Lambda, desactívela después de migrar _todas_ las funciones Lambda en esa región.

{{% /tab %}}
{{% tab "Serverless Framework" %}}

1. Actualice `serverless-plugin-datadog` a la versión más reciente, que instala Datadog Lambda Extension de forma predeterminada, a menos que establezca `addExtension` en `false`.
2. Establezca los parámetros requeridos `site` y `apiKeySecretArn`.
3. Establezca los parámetros `env`, `service` y `version` si los configuró previamente como etiquetas de recursos de Lambda. El complemento los establecerá automáticamente a través de las variables de entorno reservadas de Datadog, como `DD_ENV`, al usar la extensión.
4. Elimine el parámetro `forwarderArn`, a menos que desee conservar el Forwarder para recopilar registros de recursos que no sean Lambda y tenga `subscribeToApiGatewayLogs`, `subscribeToHttpApiLogs` o `subscribeToWebsocketLogs` establecidos en `true`.
5. Si configuró la integración de Datadog con AWS para suscribir automáticamente el Forwarder a los grupos de registros de Lambda, desactívela después de migrar _todas_ las funciones Lambda en esa región.

{{% /tab %}}
{{% tab "AWS SAM" %}}

1. Actualice la pila de `datadog-serverless-macro` CloudFormation para obtener la versión más reciente.
2. Establezca el parámetro `extensionLayerVersion` en la versión más reciente de la extensión. La versión más reciente de la extensión es `{{< latest-lambda-layer-version layer="extension" >}}`.
3. Set the required parameters `site` and `apiKeySecretArn`.
parámetro 4. Remove the `forwarderArn`.
5. Si configuró la integración de Datadog con AWS para suscribir automáticamente el Forwarder a los grupos de registros de Lambda, desactívela después de migrar _todas_ las funciones Lambda en esa región.

{{% /tab %}}
{{% tab "AWS CDK" %}}

1. Actualice `datadog-cdk-constructs` o `datadog-cdk-constructs-v2` a la versión más reciente.
2. Establezca el parámetro `extensionLayerVersion` en la versión más reciente de la extensión. La versión más reciente de la extensión es `{{< latest-lambda-layer-version layer="extension" >}}`.
3. Set the required parameters `site` and `apiKeySecretArn`.
4. Set the `env`, `service`, and `version` parameters if you previously set them as Lambda resource tags. The construct will automatically set them through the Datadog reserved environment variables instead, such as `DD_ENV`, when using the extension.
parámetro 5. Remove the `forwarderArn`.
6. Si configuró la integración de Datadog con AWS para suscribir automáticamente el Forwarder a los grupos de registros de Lambda, desactívela después de migrar _todas_ las funciones Lambda en esa región.

{{% /tab %}}
{{% tab "Otros" %}}

1. Actualice la capa de la biblioteca de Datadog Lambda para su entorno de ejecución a la versión más reciente.
2. Instale la versión más reciente de Datadog Lambda Extension.
3. Establezca las variables de entorno requeridas `DD_SITE` y `DD_API_KEY_SECRET_ARN`.
3. Establezca las variables de entorno `DD_ENV`, `DD_SERVICE` y `DD_VERSION` si las configuró previamente como etiquetas de recursos de Lambda.
4. Elimine el filtro de suscripción que transmite los registros desde el grupo de registros de su función de Lambda al Datadog Forwarder.
5. Si configuró la integración de Datadog con AWS para suscribir automáticamente el Forwarder a los grupos de registros de Lambda, desactívela después de migrar _todas_ las funciones Lambda en esa región.

{{% /tab %}}
{{< /tabs >}}

## Migración de x86 a arm64 con Datadog Lambda Extension {#migrating-between-x86-to-arm64-with-the-datadog-lambda-extension}

Datadog Extension es un binario compilado, disponible en variantes x86 y arm64. Si está migrando una función de Lambda x86 a arm64 (o arm64 a x86) utilizando una herramienta de implementación como CDK, Serverless Framework o SAM, asegúrese de que su integración de servicio (como API Gateway, SNS o Kinesis) esté configurada para usar versiones o alias de una función de Lambda; de lo contrario, la función podría no estar disponible durante unos diez segundos durante la implementación.

Esto sucede porque la migración de una función de Lambda de x86 a arm64 consiste en dos llamadas a la API paralelas, `updateFunction` y `updateFunctionConfiguration`. Durante estas llamadas, hay una breve ventana en la que la llamada `updateFunction` se ha completado y el código se actualiza para usar la nueva arquitectura mientras la llamada `updateFunctionConfiguration` aún no se ha completado, por lo que la arquitectura antigua todavía está configurada para la extensión.

Si no puede usar versiones de capa, Datadog recomienda configurar el [Datadog Forwarder][38] durante el proceso de migración de arquitectura.


## Configure Datadog Lambda Extension para pruebas locales {#configure-the-datadog-lambda-extension-for-local-testing}

No todos los emuladores de Lambda admiten la API de telemetría de AWS Lambda. Para probar localmente la imagen de contenedor de su función Lambda con Datadog Lambda Extension instalada, debe establecer `DD_SERVERLESS_FLUSH_STRATEGY` en `periodically,1` en su entorno de prueba local. De lo contrario, la extensión espera respuestas de la API de telemetría de AWS Lambda y bloquea la invocación.

## Instrumente AWS Lambda con la API de OpenTelemetry {#instrument-aws-lambda-with-the-opentelemetry-api}

El SDK de Datadog, que se incluye en la Datadog Lambda Extension tras la instalación, acepta los tramos y las trazas generados por el código instrumentado con OpenTelemetry, procesa la telemetría y la envía a Datadog.

Puede usar este enfoque si, por ejemplo, su código ya ha sido instrumentado con la API de OpenTelemetry. También puede usar este enfoque si desea instrumentar utilizando código independiente del proveedor con la API de OpenTelemetry mientras obtiene los beneficios de usar los SDK de Datadog.

Para instrumentar AWS Lambda con la API de OpenTelemetry, establezca la variable de entorno `DD_TRACE_OTEL_ENABLED` en `true`. Consulte [Instrumentación personalizada con la API de OpenTelemetry][48] para obtener más detalles.

## Uso de la Datadog Lambda Extension v67+ {#using-datadog-lambda-extension-v67}
La versión 67+ de [la Datadog Extension][53] está optimizada para reducir significativamente la duración del arranque en frío.
Para usar la extensión optimizada, establezca la variable de entorno `DD_SERVERLESS_APPSEC_ENABLED` en `false`.
Cuando la variable de entorno `DD_SERVERLESS_APPSEC_ENABLED` se establece en `true`, la Datadog Extension utiliza de forma predeterminada la versión anterior totalmente compatible. También puede forzar a su extensión a usar la versión anterior estableciendo `DD_EXTENSION_VERSION` en `compatibility`. Datadog le recomienda enviar sus comentarios o informar sobre errores mediante una [incidencia en GitHub][54] y etiquetar la incidencia con `version/next`.

## Configure Auto-linking para PutItem de DynamoDB {#configure-auto-linking-for-dynamodb-putitem}
_Disponible para los entornos de ejecución de Python y Node.js_.
Cuando los segmentos de sus solicitudes asíncronas no pueden propagar el contexto de la traza, la función [Span Auto-linking][55] de Datadog detecta automáticamente los tramos vinculados.
Para habilitar Span Auto-linking para la operación `PutItem` de [DynamoDB Change Streams][56], configure los nombres de las claves principales para sus tablas.

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
{{% tab "Variable de entorno" %}}

```sh
export DD_BOTOCORE_DYNAMODB_TABLE_PRIMARY_KEYS='{
    "table_name": ["key1", "key2"],
    "other_table": ["other_key"]
}'
```
{{% /tab %}}
{{< /tabs >}}

Esto permite instrumentar las llamadas a DynamoDB `PutItem` con punteros de tramo. Muchas llamadas a la API de DynamoDB no incluyen los campos de clave principal del elemento como valores separados, por lo que deben proporcionarse al SDK por separado. La configuración anterior está estructurada como un diccionario (`dict`) u objeto con claves que son los nombres de las tablas como cadenas (`str`). Cada valor es el conjunto de nombres de campos de clave principal (como cadenas) para la tabla asociada. El conjunto puede tener exactamente uno o dos elementos, dependiendo del esquema de clave principal de la tabla.

## Visualice y modele los servicios de AWS por nombre de recurso {#visualize-and-model-aws-services-by-resource-name}

Estas versiones de las capas Lambda de [Node.js][50], [Python][51] y [Java][52] incorporaron cambios para nombrar, modelar y visualizar correctamente los servicios administrados de AWS.

Los nombres de los servicios reflejan el nombre real del recurso de AWS en lugar de solo el servicio de AWS:
* `aws.lambda` → `[function_name]`
* `aws.dynamodb` → `[table_name]`
* `aws.sns` → `[topic_name]`
* `aws.sqs` → `[queue_name]`
* `aws.kinesis` → `[stream_name]`
* `aws.s3` → `[bucket_name]`
* `aws.eventbridge` → `[event_name]`

Es posible que prefiera el modelo de representación de servicio anterior si sus tableros y monitores dependen de la convención de nomenclatura heredada. Para restaurar el comportamiento anterior, establezca la variable de entorno: `DD_TRACE_AWS_SERVICE_REPRESENTATION_ENABLED=false`

Se recomienda la configuración actualizada de modelado de servicios.

## Envíe logs a Observability Pipelines {#send-logs-to-observability-pipelines}

{{% observability_pipelines/lambda_extension_source %}}

Consulte [Enviar logs del Datadog Lambda Extension Forwarder a Observability Pipelines][58] para obtener más información.

## Autentíquese con Workload Identity Federation {#authenticate-with-workload-identity-federation}

En lugar de proporcionar una clave de Datadog API estática, puede autenticar Datadog Lambda Extension con [Workload Identity Federation][59]. La extensión utiliza las credenciales del rol de ejecución de AWS de su función para solicitar una clave de Datadog API administrada que Datadog rota automáticamente, por lo que usted no tiene que almacenar ni rotar una clave por su cuenta.

Para usar Workload Identity Federation:

1. En Datadog, configure un mapeo de ingesta de AWS que autorice el ARN del rol de ejecución de su función. Para conocer los pasos de configuración, consulte [Configure Workload Identity Federation para el Datadog Agent][59].
2. Configure la variable de entorno `DD_ORG_UUID` en su función con el UUID de su organización de Datadog. Para encontrarlo, llame al punto de conexión [{{< region-param key="dd_api" >}}/api/v2/current_user][60]. Cuando `DD_ORG_UUID` está configurado, la extensión se autentica con Workload Identity Federation, lo cual tiene prioridad sobre otras variables de entorno de clave de API.

Esto está disponible para la versión 96+ de la Datadog Lambda Extension.

## Recargue el secreto de la clave de API periódicamente {#reload-api-key-secret-periodically}

Si especifica la clave de Datadog API usando `DD_API_KEY_SECRET_ARN`, también puede configurar `DD_API_KEY_SECRET_RELOAD_INTERVAL` para recargar el secreto periódicamente. Por ejemplo, si configura `DD_API_KEY_SECRET_RELOAD_INTERVAL` en `43200`, entonces el secreto se recarga cuando se necesita la clave de API para enviar datos y han pasado más de 43200 segundos desde la última carga.

Caso de uso de ejemplo: Por seguridad, cada día (86400 segundos), la clave de API se rota y el secreto se actualiza a la nueva clave, y la clave de API antigua se mantiene válida por otro día como periodo de gracia. En este caso, puede configurar `DD_API_KEY_SECRET_RELOAD_INTERVAL` en `43200` para que la clave de API se recargue durante el periodo de gracia de la clave antigua.

Esto está disponible para la versión 88+ de Datadog Lambda Extension.

## Solución de problemas {#troubleshoot}

Si tiene problemas para configurar sus instalaciones, establezca la variable de entorno `DD_LOG_LEVEL` en `debug` para obtener registros de depuración. Para obtener consejos adicionales de solución de problemas, consulte la [guía de solución de problemas de monitoreo sin servidor][39].

## Lecturas adicionales {#further-reading}

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
[58]: /es/observability_pipelines/sources/lambda_extension/
[59]: /es/account_management/workload_identity_federation/#set-up-workload-identity-federation-for-the-datadog-agent
[60]: https://app.datadoghq.com/api/v2/current_user