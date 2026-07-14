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
  text: Solucionar problemas de Serverless Monitoring para AWS Lambda
- link: /integrations/github
  tag: Documentación
  text: Integración de Datadog con GitHub
- link: https://learn.datadoghq.com/courses/visibility-aws-lambda
  tag: Centro de Aprendizaje
  text: Configurar AWS Lambda para Serverless Monitoring con Datadog
title: Configurar Serverless Monitoring para AWS Lambda
---
Primero, [instala][1] Serverless Monitoring de Datadog para comenzar a recopilar métricas, trazas y registros. Una vez que la instalación esté completa, consulta los siguientes temas para configurar tu instalación según tus necesidades de monitoreo.

- [Conectar telemetría usando etiquetas](#connect-telemetry-using-tags)
- [Recopilar las cargas útiles de solicitud y respuesta](#collect-the-request-and-response-payloads)
- [Recopilar trazas de recursos que no son Lambda](#collect-traces-from-non-lambda-resources)
- [Configurar el SDK de Datadog](#configure-the-datadog-sdk)
- [Seleccionar tasas de muestreo para la ingestión de spans de APM](#select-sampling-rates-for-ingesting-apm-spans)
- [Filtrar o eliminar información sensible de las trazas](#filter-or-scrub-sensitive-information-from-traces)
- [Habilitar/deshabilitar la recopilación de trazas](#enabledisable-trace-collection)
- [Conectar registros y trazas](#connect-logs-and-traces)
- [Vincular errores a tu código fuente](#link-errors-to-your-source-code)
- [Enviar métricas personalizadas][27]
- [Recopilar datos de perfilado](#collect-profiling-data)
- [Envía telemetría a través de PrivateLink o proxy](#send-telemetry-over-privatelink-or-proxy)
- [Envía telemetría a múltiples organizaciones de Datadog](#send-telemetry-to-multiple-datadog-organizations)
- [Habilita el cumplimiento de FIPS](#enable-fips-compliance)
- [Propaga el contexto de trazas a través de los recursos de AWS](#propagate-trace-context-over-aws-resources)
- [Fusiona las trazas de X-Ray y Datadog](#merge-x-ray-and-datadog-traces)
- [Habilita la firma de código de AWS Lambda](#enable-aws-lambda-code-signing)
- [Migra a la extensión de Datadog Lambda](#migrate-to-the-datadog-lambda-extension)
- [Migrando de x86 a arm64 con la extensión de Datadog Lambda](#migrating-between-x86-to-arm64-with-the-datadog-lambda-extension)
- [Configura la extensión de Datadog Lambda para pruebas locales](#configure-the-datadog-lambda-extension-for-local-testing)
- [Instrumenta AWS Lambda con la API de OpenTelemetry](#instrument-aws-lambda-with-the-opentelemetry-api)
- [Usando la extensión de Datadog Lambda v67+](#using-datadog-lambda-extension-v67)
- [Configura el enlace automático para DynamoDB PutItem](#configure-auto-linking-for-dynamodb-putitem)
- [Visualiza y modela los servicios de AWS correctamente](#visualize-and-model-aws-services-by-resource-name)
- [Envía registros a los Pipelines de Observabilidad](#send-logs-to-observability-pipelines)
- [Recarga el secreto de la clave API periódicamente](#reload-api-key-secret-periodically)
- [Soluciona problemas](#troubleshoot)
- [Lectura adicional](#further-reading)


## Habilita la detección de amenazas para observar intentos de ataque{#enable-threat-detection-to-observe-attack-attempts}

Recibe alertas sobre atacantes que apuntan a tus aplicaciones sin servidor y responde rápidamente.

Para comenzar, primero asegúrate de que tienes [traza habilitada][43] para tus funciones.

Para habilitar el seguimiento de amenazas, agregue las siguientes variables de entorno a su implementación:
   ```yaml
   environment:
     DD_SERVERLESS_APPSEC_ENABLED: true
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
   ```

Vuelva a implementar la función e invóquela. Después de unos minutos, aparece en [vistas de AAP][49].

Para ver la detección de amenazas de Protección de Aplicaciones y API en acción, envíe patrones de ataque conocidos a su aplicación. Por ejemplo, envíe un encabezado HTTP con el valor `acunetix-product` para activar un intento de [ataque de escáner de seguridad][44]:
   ```sh
   curl -H 'My-AAP-Test-Header: acunetix-product' https://<YOUR_FUNCTION_URL>/<EXISTING_ROUTE>
   ```
Unos minutos después de habilitar su aplicación y enviar los patrones de ataque, **aparece información de amenazas en el [Explorador de Señales de Aplicación][41]**.

## Conecte la telemetría utilizando etiquetas {#connect-telemetry-using-tags}

Conecte la telemetría de Datadog a través del uso de etiquetas reservadas (`env`, `service` y `version`) y etiquetas personalizadas. Puede usar estas etiquetas para navegar sin problemas a través de métricas, trazas y registros. Agregue los parámetros adicionales a continuación para el método de instalación que utiliza.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Asegúrese de estar utilizando la última versión del [Datadog CLI][1] y ejecute el comando `datadog-ci lambda instrument` con los argumentos adicionales apropiados. Por ejemplo:

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

Asegúrese de estar utilizando la última versión del [plugin sin servidor de Datadog][1] y aplique las etiquetas utilizando los parámetros `env`, `service`, `version` y `tags`. Por ejemplo:

```yaml
custom:
  datadog:
    # ... other required parameters, such as the Datadog site and API key
    env: dev
    service: web
    version: v1.2.3
    tags: "team:avengers,project:marvel"
```

Por defecto, si no define `env` y `service`, el plugin utiliza automáticamente los valores `stage` y `service` de la definición de la aplicación sin servidor. Para deshabilitar esta función, establezca `enableTags` en `false`.

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/plugin
{{% /tab %}}
{{% tab "AWS SAM" %}}

Asegúrate de estar utilizando la última versión del [macro sin servidor de Datadog][1] y aplica las etiquetas utilizando los parámetros `env`, `service`, `version` y `tags`. Por ejemplo:

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

Asegúrate de estar utilizando la última versión del [constructo CDK sin servidor de Datadog][1] y aplica las etiquetas utilizando los parámetros `env`, `service`, `version` y `tags`. Por ejemplo:

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

Si estás recopilando telemetría de tus funciones Lambda utilizando la [extensión Lambda de Datadog][1], establece las siguientes variables de entorno en tus funciones Lambda. Por ejemplo:
- DD_ENV: dev
- DD_SERVICE: web
- DD_VERSION: v1.2.3
- DD_TAGS: team:avengers,project:marvel

Si estás recopilando telemetría de tus funciones Lambda utilizando la [función Lambda Forwarder de Datadog][2], establece las variables `env`, `service`, `version` y etiquetas adicionales como etiquetas de recurso de AWS en tus funciones Lambda. Asegúrate de que la opción `DdFetchLambdaTags` esté configurada en `true` en la pila de CloudFormation para tu Forwarder de Datadog. Esta opción tiene como valor predeterminado verdadero desde la versión 3.19.0.

[1]: /es/serverless/libraries_integrations/extension/
[2]: /es/serverless/libraries_integrations/forwarder/
{{% /tab %}}
{{< /tabs >}}

Datadog también puede enriquecer la telemetría recopilada con las etiquetas de recurso de AWS existentes definidas en tus funciones Lambda con un retraso de unos minutos.

- Si estás recopilando telemetría de tus funciones Lambda utilizando la [extensión Lambda de Datadog][2], habilita la [integración de AWS de Datadog][3]. Esta función está destinada a enriquecer tu telemetría con etiquetas **personalizadas**. Las etiquetas reservadas de Datadog (`env`, `service` y `version`) deben establecerse a través de las variables de entorno correspondientes (`DD_ENV`, `DD_SERVICE` y `DD_VERSION` respectivamente). Las etiquetas reservadas también se pueden establecer con los parámetros proporcionados por las integraciones de Datadog con las herramientas de desarrollo sin servidor. Esta función no funciona para las funciones de Lambda desplegadas con imágenes de contenedor.

- Si está recopilando telemetría de sus funciones de Lambda utilizando la [función Lambda de Datadog Forwarder][4], establezca la opción `DdFetchLambdaTags` en `true` en la pila de CloudFormation para su Datadog Forwarder. Esta opción tiene como valor predeterminado verdadero desde la versión 3.19.0.

## Recopila las cargas útiles de solicitud y respuesta {#collect-the-request-and-response-payloads}

<div class="alert alert-info">Esta función es compatible con Python, Node.js, Go, Java y .NET.</div>

Datadog puede [recopilar y visualizar las cargas útiles de solicitud y respuesta en JSON de las funciones de AWS Lambda][5], brindándole una visión más profunda de sus aplicaciones sin servidor y ayudando a solucionar fallas en las funciones de Lambda.

Esta función está deshabilitada por defecto. Sigue las instrucciones a continuación para el método de instalación que utilizas.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Asegúrate de estar utilizando la última versión de la [Datadog CLI][1] y ejecuta el comando `datadog-ci lambda instrument` con el argumento adicional `--capture-lambda-payload`. Por ejemplo:

```sh
datadog-ci lambda instrument \
    --capture-lambda-payload true
    # ... other required arguments, such as function names
```

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

Asegúrate de estar utilizando la última versión del [plugin sin servidor de Datadog][1] y establece el `captureLambdaPayload` en `true`. Por ejemplo:

```yaml
custom:
  datadog:
    # ... other required parameters, such as the Datadog site and API key
    captureLambdaPayload: true
```

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/plugin
{{% /tab %}}
{{% tab "AWS SAM" %}}

Asegúrate de estar utilizando la última versión de la [macro sin servidor de Datadog][1] y establece el parámetro `captureLambdaPayload` en `true`. Por ejemplo:

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

Asegúrate de estar utilizando la última versión del [constructo CDK sin servidor de Datadog][1] y establece el parámetro `captureLambdaPayload` en `true`. Por ejemplo:

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

Establece la variable de entorno `DD_CAPTURE_LAMBDA_PAYLOAD` en `true` en tus funciones de Lambda.

{{% /tab %}}
{{< /tabs >}}

Para evitar que se envíen datos sensibles dentro de los objetos JSON de solicitud o respuesta a Datadog, puede eliminar parámetros específicos.

Para hacer esto, agregue un nuevo archivo `datadog.yaml` en la misma carpeta que el código de su función Lambda. La ofuscación de campos en la carga útil de Lambda está disponible a través del [bloque replace_tags][6] dentro de la configuración de `apm_config` en `datadog.yaml`:

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

Como alternativa, también puede poblar la variable de entorno `DD_APM_REPLACE_TAGS` en su función Lambda para ofuscar campos específicos:

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

Para recopilar cargas útiles de servicios de AWS, consulte [Capturar Solicitudes y Respuestas de Servicios de AWS][54].



## Recopile trazas de recursos que no son de Lambda {#collect-traces-from-non-lambda-resources}

Datadog puede inferir los spans de APM basándose en los eventos de Lambda entrantes para los recursos administrados por AWS que activan la función de Lambda. Esto puede ayudar a visualizar la relación entre los recursos administrados por AWS e identificar problemas de rendimiento en sus aplicaciones Serverless. Consulte [detalles adicionales del producto][12].

Los siguientes recursos son actualmente compatibles:

- API Gateway (API REST, API HTTP y WebSocket)
- URLs de función
- SQS
- SNS (los mensajes de SNS entregados a través de SQS también son compatibles)
- Kinesis Streams (si los datos son una cadena JSON o una cadena JSON codificada en base64)
- EventBridge (eventos personalizados, donde `Details` es una cadena JSON)
- S3
- DynamoDB

Para desactivar esta función, establezca `DD_TRACE_MANAGED_SERVICES` en `false`.

### DD_SERVICE_MAPPING {#dd-service-mapping}

`DD_SERVICE_MAPPING` es una variable de entorno que renombra los nombres de [servicios upstream no Lambda][46]. Funciona con `old-service:new-service` pares.

#### Sintaxis {#syntax}

`DD_SERVICE_MAPPING=key1:value1,key2:value2`...

Hay dos formas de interactuar con esta variable:

#### Renombrar todos los servicios de un tipo {#rename-all-services-of-a-type}

Para renombrar todos los servicios upstream asociados con una integración de AWS Lambda, utilice estos identificadores:

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

#### Renombrar servicios específicos {#rename-specific-services}

Para un enfoque más granular, utilice estos identificadores específicos de servicio:

| Servicio | Identificador | Valor de DD_SERVICE_MAPPING |
|---|---|---|
| API Gateway | API ID | `"r3pmxmplak:newServiceName"` |
| SNS | Nombre del tema | `"ExampleTopic:newServiceName"` |
| SQS | Nombre de la cola | `"MyQueue:newServiceName"` |
| S3 | Nombre del bucket | `"example-bucket:newServiceName"` |
| EventBridge | Fuente del evento | `"eventbridge.custom.event.sender:newServiceName"` |
| Kinesis | Nombre del stream | `"MyStream:newServiceName"` |
| DynamoDB | Nombre de la tabla | `"ExampleTableWithStream:newServiceName"` |
| Lambda URLs | API ID | `"a8hyhsshac:newServiceName"` |
| MSK | Nombre del clúster | `"ExampleCluster:newServiceName"` |

#### Ejemplos con descripción {#examples-with-description}

| Comando | Descripción |
|---|---|
| `DD_SERVICE_MAPPING="lambda_api_gateway:new-service-name"` | Renombra todos los `lambda_api_gateway` servicios upstream a `new-service-name` |
| `DD_SERVICE_MAPPING="08se3mvh28:new-service-name"` | Renombra el servicio upstream específico `08se3mvh28.execute-api.eu-west-1.amazonaws.com` a `new-service-name` |

Para renombrar servicios descendentes, consulte `DD_SERVICE_MAPPING` en la [documentación de configuración del rastreador][45].

## Configurar el SDK de Datadog {#configure-the-datadog-sdk}

Para ver qué bibliotecas y marcos están instrumentados automáticamente por el cliente APM de Datadog, consulte [Requisitos de compatibilidad para APM][15]. Para instrumentar aplicaciones personalizadas, consulte la guía de APM de Datadog para [instrumentación personalizada][16].

## Seleccione tasas de muestreo para la ingestión de spans de APM {#select-sampling-rates-for-ingesting-apm-spans}

Para gestionar la [tasa de muestreo de invocación rastreada por APM][17] para funciones Serverless, establezca la variable de entorno `DD_TRACE_SAMPLING_RULES` en un valor entre 0.000 (sin rastreo de invocaciones de funciones Lambda) y 1.000 (rastrear todas las invocaciones de funciones Lambda).

**Notas**:
   - El uso de `DD_TRACE_SAMPLE_RATE` está en desuso. Utilice `DD_TRACE_SAMPLING_RULES` en su lugar. Por ejemplo, si ya configuró `DD_TRACE_SAMPLE_RATE` a `0.1`, configure `DD_TRACE_SAMPLING_RULES` a `[{"sample_rate":0.1}]` en su lugar.
   - Las métricas de tráfico generales, como `trace.<OPERATION_NAME>.hits`, se calculan en función de las invocaciones muestreadas *solo* en Lambda.

Para servicios de alto rendimiento, generalmente no es necesario que recoja cada solicitud individual, ya que los datos de trazas son muy repetitivos; un problema lo suficientemente importante siempre debería mostrar síntomas en múltiples trazas. [Los controles de ingestión][18] le ayudan a tener la visibilidad que necesita para solucionar problemas mientras se mantiene dentro del presupuesto.

El mecanismo de muestreo predeterminado para la ingestión se llama [head-based sampling][19]. La decisión de mantener o descartar una traza se toma al principio de la traza, al inicio del span raíz. Esta decisión se propaga a otros servicios como parte de su contexto de solicitud, por ejemplo, como un encabezado de solicitud HTTP. Debido a que la decisión se toma al inicio de la traza y luego se transmite a todas las partes de la traza, debe configurar la tasa de muestreo en el servicio raíz para que tenga efecto.

Después de que los spans han sido ingeridos por Datadog, el Filtro de Retención Inteligente de Datadog indexa una proporción de trazas para ayudarle a monitorear la salud de sus aplicaciones. También puede definir [filtros de retención][20] personalizados para indexar los datos de trazas que desea conservar por más tiempo para apoyar los objetivos de su organización.

Aprenda más sobre la [Canalización de Trazas de Datadog][21].

## Filtrar o eliminar información sensible de las trazas {#filter-or-scrub-sensitive-information-from-traces}

Para filtrar trazas antes de enviarlas a Datadog, consulte [Ignorando Recursos No Deseados en APM][22].

Para eliminar atributos de trazas por seguridad de datos, consulte [Configurar el Agente de Datadog o el Rastreador para Seguridad de Datos][23].

## Habilitar/deshabilitar la recolección de trazas {#enabledisable-trace-collection}

La recolección de trazas a través de la extensión de Lambda de Datadog está habilitada por defecto.

Si desea comenzar a recolectar trazas de sus funciones de Lambda, aplique las configuraciones a continuación:

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

Establece la variable de entorno `DD_TRACE_ENABLED` en `true` en sus funciones de Lambda.

{{% /tab %}}
{{< /tabs >}}

#### Deshabilitar la recolección de trazas {#disable-trace-collection}

Si desea dejar de recolectar trazas de sus funciones de Lambda, aplique las configuraciones a continuación:

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

Establece la variable de entorno `DD_TRACE_ENABLED` en `false` en sus funciones de Lambda.

{{% /tab %}}
{{< /tabs >}}

## Conecte registros y trazas {#connect-logs-and-traces}

Si está utilizando la [extensión de Lambda][2] para recolectar trazas y registros, Datadog agrega automáticamente el ID de solicitud de AWS Lambda al `aws.lambda` span bajo la etiqueta `request_id`. Además, los registros de Lambda para la misma solicitud se agregan bajo el atributo `lambda.request_id`. Las vistas de trazas y registros de Datadog están conectadas utilizando el ID de solicitud de AWS Lambda.

Si está utilizando la [función Lambda Forwarder][4] para recopilar trazas y registros, `dd.trace_id` se inyecta automáticamente en los registros (habilitado por defecto con la variable de entorno `DD_LOGS_INJECTION`). Las vistas de trazas y registros de Datadog están conectadas utilizando el ID de traza de Datadog. Esta función es compatible con la mayoría de las aplicaciones que utilizan un runtime y un registrador populares (consulte el [soporte por runtime][24]).

Si está utilizando un runtime o un registrador personalizado que no es compatible, siga estos pasos:
- Al registrar en JSON, necesita obtener el ID de traza de Datadog utilizando `dd-trace` y agregarlo a sus registros bajo el campo `dd.trace_id`:
    ```javascript
    {
      "message": "This is a log",
      "dd": {
        "trace_id": "4887065908816661012"
      }
      // ... the rest of your log
    }
    ```
- Al registrar en texto plano, necesita:
    1. Obtener el ID de traza de Datadog utilizando `dd-trace` y agregarlo a su registro.
    2. Clonar la canalización de registro de Lambda predeterminada, que es de solo lectura.
    3. Habilitar la canalización clonada y deshabilitar la predeterminada.
    4. Actualizar las reglas del [parser Grok][25] de la canalización clonada para analizar el ID de traza de Datadog en el atributo `dd.trace_id`. Por ejemplo, utilice la regla `my_rule \[%{word:level}\]\s+dd.trace_id=%{word:dd.trace_id}.*` para registros que se vean como `[INFO] dd.trace_id=4887065908816661012 My log message`.

## Vincule errores a su código fuente {#link-errors-to-your-source-code}

La [integración del código fuente de Datadog][26] le permite vincular su telemetría (como trazas de pila) al código fuente de sus funciones Lambda en sus repositorios de Git.

Para obtener instrucciones sobre cómo configurar la integración del código fuente en sus aplicaciones sin servidor, consulte la sección [Incrustar información de Git en sus artefactos de construcción][101].

[101]: /es/integrations/guide/source-code-integration/?tab=go#serverless

## Recopilar datos de perfilado {#collect-profiling-data}

El [Profiler Continuo][42] de Datadog está disponible en Vista Previa para la versión 4.62.0 del tracer de Python y la versión 62 de la capa y anteriores. Esta función opcional se habilita configurando la variable de entorno `DD_PROFILING_ENABLED` a `true`.

El Profiler Continuo funciona generando un hilo que toma periódicamente una instantánea de la CPU y el heap de todo el código Python en ejecución. Esto puede incluir el propio profiler. Si deseas que el profiler se ignore a sí mismo, establece `DD_PROFILING_IGNORE_PROFILER` en `true`.

## Envía telemetría a través de PrivateLink o proxy {#send-telemetry-over-privatelink-or-proxy}

La Extensión de Lambda de Datadog necesita acceso a internet público para enviar datos a Datadog. Si tus funciones de Lambda están desplegadas en una VPC sin acceso a internet público, puedes [enviar datos a través de AWS PrivateLink][28] al `datadoghq.com` [sitio de Datadog][29], o [enviar datos a través de un proxy][30] para todos los demás sitios.

Si estás utilizando el Forwarder de Datadog, sigue estas [instrucciones][31].

## Envía telemetría a múltiples organizaciones de Datadog {#send-telemetry-to-multiple-datadog-organizations}

Si deseas enviar datos a múltiples organizaciones, puedes habilitar el envío dual utilizando una clave API en texto plano, AWS Secrets Manager o AWS KMS.

{{< tabs >}}
{{% tab "Clave API en texto plano" %}}

Puedes habilitar el envío dual utilizando una clave API en texto plano configurando las siguientes variables de entorno en tu función Lambda.

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

La Extensión de Datadog admite la recuperación automática de valores de [AWS Secrets Manager][1] para cualquier variable de entorno que comience con `_SECRET_ARN`. Puedes usar esto para almacenar de manera segura tus variables de entorno en Secrets Manager y enviar datos de manera dual con Datadog.

1. Establece la variable de entorno `DD_LOGS_CONFIG_FORCE_USE_HTTP` en tu función Lambda.
2. Agrega el permiso `secretsmanager:GetSecretValue` a los permisos del rol IAM de tu función Lambda.
3. Crea un nuevo secreto en Secrets Manager para almacenar la variable de entorno de métricas de envío dual. El contenido debe ser similar a `{"https://app.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://app.datadoghq.eu": ["<your_api_key_4>"]}`.
4. Establece la variable de entorno `DD_ADDITIONAL_ENDPOINTS_SECRET_ARN` en tu función Lambda al ARN del secreto mencionado anteriormente.
5. Crea un nuevo secreto en Secrets Manager para almacenar la variable de entorno de APM (trazas) de envío dual. El contenido debe ser **similar** a `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}`.
6. Establece la variable de entorno `DD_APM_ADDITIONAL_ENDPOINTS_SECRET_ARN` en tu función Lambda igual al ARN del secreto mencionado anteriormente.
7. Crea un nuevo secreto en Secrets Manager para almacenar la variable de entorno de APM (perfilado) de envío dual. El contenido debe ser **similar** a `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}`.
8. Establece la variable de entorno `DD_APM_PROFILING_ADDITIONAL_ENDPOINTS_SECRET_ARN` en tu función Lambda igual al ARN del secreto mencionado anteriormente.
9. Crea un nuevo secreto en Secrets Manager para almacenar la variable de entorno de registros de envío dual. El contenido debe ser **similar** a `[{"api_key": "<your_api_key_2>", "Host": "agent-http-intake.logs.datadoghq.com", "Port": 443, "is_reliable": true}]`.
10. Establece la variable de entorno `DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS_SECRET_ARN` en tu función Lambda igual al ARN del secreto mencionado anteriormente.

[1]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html

{{% /tab %}}
{{% tab "AWS KMS" %}}

La extensión de Datadog admite el descifrado de valores de [AWS KMS][41] automáticamente para cualquier variable de entorno que comience con `_KMS_ENCRYPTED`. Puedes usar esto para almacenar de manera segura tus variables de entorno en KMS y enviar de manera dual con Datadog.

1. Establece la variable de entorno `DD_LOGS_CONFIG_FORCE_USE_HTTP=true` en tu función Lambda.
2. Agrega los permisos `kms:GenerateDataKey` y `kms:Decrypt` a los permisos del rol IAM de tu función Lambda.
3. Para métricas de envío dual, encripta `{"https://app.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://app.datadoghq.eu": ["<your_api_key_4>"]}` usando KMS y establece la variable de entorno `DD_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` igual a su valor.
4. Para trazas de envío dual, encripta `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}` usando KMS y establece la variable de entorno `DD_APM_ADDITIONAL_KMS_ENCRYPTED` igual a su valor.
5. Para perfilado de envío dual, encripta `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}` usando KMS y establece la variable de entorno `DD_APM_PROFILING_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` igual a su valor.
5. Para registros de envío dual, encripta `[{"api_key": "<your_api_key_2>", "Host": "agent-http-intake.logs.datadoghq.com", "Port": 443, "is_reliable": true}]` usando KMS y establece la variable de entorno `DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` igual a su valor.

[41]: https://docs.aws.amazon.com/kms/
{{% /tab %}}
{{< /tabs >}}

Para un uso más avanzado, consulta la [guía de envío dual][32].

## Habilita la conformidad con FIPS {#enable-fips-compliance}

<div class="alert alert-info">Para una visión completa de la conformidad con FIPS para funciones de AWS Lambda, consulta la página dedicada <a href="/serverless/aws_lambda/fips-compliance">Conformidad con FIPS de AWS Lambda</a>.</div>

Para habilitar la conformidad con FIPS para funciones de AWS Lambda, sigue estos pasos:

1. Usa una capa de extensión compatible con FIPS haciendo referencia al ARN apropiado:

{{< tabs >}}
{{% tab "AWS GovCloud" %}}
 ```sh
 arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
 arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
 ```
{{% /tab %}}
{{% tab "AWS Comercial" %}}
 ```sh
 arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
 arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
 ```
{{% /tab %}}
{{< /tabs >}}

2. Para funciones de Lambda que utilizan Python, JavaScript o Go, establece la variable de entorno `DD_LAMBDA_FIPS_MODE` en `true`. Esta variable de entorno:
   - En modo FIPS, las funciones auxiliares de métricas de Lambda requieren la extensión compatible con FIPS para la presentación de métricas
   - Utiliza puntos de conexión FIPS de AWS para búsquedas de claves API
   - Está habilitado por defecto en entornos de GovCloud

3. Para funciones de Lambda que utilizan Ruby, .NET o Java, no se necesita configuración adicional de la variable de entorno.

4. Para cumplir completamente con FIPS, configure su función de Lambda para usar un sitio de Datadog para Gobierno:
   - Establezca `DD_SITE` en `ddog-gov.com` (US1-FED) o `us2.ddog-gov.com` (US2-FED)
   **Nota**: Si bien los componentes de Lambda compatibles con FIPS funcionan con cualquier sitio de Datadog, solo los sitios de Datadog para Gobierno tienen puntos finales de recepción compatibles con FIPS.

## Propague el contexto de traza a través de recursos de AWS {#propagate-trace-context-over-aws-resources}

Datadog inyecta automáticamente el contexto de traza en las solicitudes salientes del SDK de AWS y extrae el contexto de traza del evento de Lambda. Esto permite a Datadog rastrear una solicitud o transacción a través de servicios distribuidos. Vea [Propagación de Traza Serverless][33].

## Fusionar traza de X-Ray y Datadog {#merge-x-ray-and-datadog-traces}

AWS X-Ray admite el seguimiento a través de ciertos servicios administrados por AWS, como AppSync y Step Functions, lo cual no es compatible de forma nativa con Datadog APM. Puede habilitar la [integración de Datadog X-Ray][34] y fusionar la traza de X-Ray con la traza nativa de Datadog. Vea [detalles adicionales][35].

## Habilite la firma de código de AWS Lambda {#enable-aws-lambda-code-signing}

[La firma de código para AWS Lambda][36] ayuda a garantizar que solo se implemente código de confianza desde sus funciones Lambda a AWS. Cuando habilita la firma de código en sus funciones, AWS valida que todo el código en sus implementaciones esté firmado por una fuente confiable, que usted define en su configuración de firma de código.

Si sus funciones Lambda están configuradas para usar la firma de código, debe agregar el ARN del Perfil de Firma de Datadog a la configuración de firma de código de su función antes de poder implementar funciones Lambda utilizando las Capas de Lambda publicadas por Datadog.

ARN del Perfil de Firma de Datadog:

```
arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc
```


## Migre a la extensión de Datadog Lambda {#migrate-to-the-datadog-lambda-extension}

Datadog puede recopilar los datos de monitoreo de sus funciones Lambda utilizando ya sea la [función Lambda Forwarder][4] o la [extensión Lambda][2]. Datadog recomienda la extensión Lambda para nuevas instalaciones. Si no está seguro, consulte [Decidir migrar a la extensión de Datadog Lambda][37].

Para migrar, compare las [instrucciones de instalación utilizando la Extensión de Datadog Lambda][1] con las [instrucciones utilizando el Forwarder de Datadog][38]. Para su conveniencia, las diferencias clave se resumen a continuación.

**Nota**: Datadog recomienda migrar primero sus aplicaciones de desarrollo y pruebas y migrar las aplicaciones de producción una por una.

<div class="alert alert-info">La extensión de Datadog Lambda habilita la recopilación de registros por defecto. Si está migrando del Forwarder a la extensión, asegúrese de eliminar su suscripción de registros. De lo contrario, puede ver registros duplicados.</div>

{{< tabs >}}
{{% tab "Datadog CLI" %}}

1. Actualice `@datadog/datadog-ci` a la última versión
2. Actualice el argumento `--layer-version` y configúrelo a la última versión para su entorno de ejecución.
3. Establezca el argumento `--extension-version` a la última versión de la extensión. La última versión de la extensión es `{{< latest-lambda-layer-version layer="extension" >}}`.
4. Set the required environment variables `DATADOG_SITE` and `DATADOG_API_KEY_SECRET_ARN`.
5. Remove the `--argumento `forwarder`.
6. Si configuraste la integración de Datadog AWS para suscribir automáticamente el Forwarder a los grupos de registros de Lambda, desactívalo después de migrar _todas_ las funciones de Lambda en esa región.

{{% /tab %}}
{{% tab "Serverless Framework" %}}

1. Actualiza `serverless-plugin-datadog` a la última versión, que instala la Extensión de Lambda de Datadog por defecto, a menos que configures `addExtension` a `false`.
2. Establece los parámetros requeridos `site` y `apiKeySecretArn`.
3. Establece los parámetros `env`, `service` y `version` si los configuraste previamente como etiquetas de recurso de Lambda. El complemento los establecerá automáticamente a través de las variables de entorno reservadas de Datadog en su lugar, como `DD_ENV`, al usar la extensión.
4. Elimina el parámetro `forwarderArn`, a menos que desees mantener el Forwarder para recopilar registros de recursos que no son de Lambda y tengas `subscribeToApiGatewayLogs`, `subscribeToHttpApiLogs` o `subscribeToWebsocketLogs` configurados a `true`.
5. Si configuraste la integración de Datadog AWS para suscribir automáticamente el Forwarder a los grupos de registros de Lambda, desactívalo después de migrar _todas_ las funciones de Lambda en esa región.

{{% /tab %}}
{{% tab "AWS SAM" %}}

1. Actualiza la pila de CloudFormation `datadog-serverless-macro` para recoger la última versión.
2. Establece el parámetro `extensionLayerVersion` a la última versión de la extensión. La última versión de la extensión es `{{< latest-lambda-layer-version layer="extension" >}}`.
3. Set the required parameters `site` and `apiKeySecretArn`.
4. Remove the `parámetro arnForwarder`.
5. Si configuraste la integración de Datadog AWS para suscribir automáticamente el Forwarder a los grupos de registros de Lambda, desactívalo después de migrar _todas_ las funciones de Lambda en esa región.

{{% /tab %}}
{{% tab "AWS CDK" %}}

1. Actualiza `datadog-cdk-constructs` o `datadog-cdk-constructs-v2` a la última versión.
2. Establece el parámetro `extensionLayerVersion` a la última versión de la extensión. La última versión de la extensión es `{{< latest-lambda-layer-version layer="extension" >}}`.
3. Set the required parameters `sitio` and `arnClaveSecretaApi`.
4. Set the `env`, `servicio`, and `versión` parameters if you previously set them as Lambda resource tags. The construct will automatically set them through the Datadog reserved environment variables instead, such as `DD_ENV`, when using the extension.
5. Remove the `parámetro arnForwarder`.
6. Si configuraste la integración de Datadog AWS para suscribir automáticamente el Forwarder a los grupos de registros de Lambda, desactívalo después de migrar _todas_ las funciones de Lambda en esa región.

{{% /tab %}}
{{% tab "Otros" %}}

1. Actualiza la capa de la biblioteca de Lambda de Datadog para tu entorno de ejecución a la última versión.
2. Instala la última versión de la extensión Datadog Lambda.
3. Establece las variables de entorno requeridas `DD_SITE` y `DD_API_KEY_SECRET_ARN`.
3. Establece las variables de entorno `DD_ENV`, `DD_SERVICE` y `DD_VERSION` si las configuraste previamente como etiquetas de recursos de Lambda.
4. Elimina el filtro de suscripción que transmite registros desde el grupo de registros de tu función Lambda al Datadog Forwarder.
5. Si configuraste la integración de Datadog AWS para suscribir automáticamente el Forwarder a los grupos de registros de Lambda, desactívalo después de migrar _todas_ las funciones de Lambda en esa región.

{{% /tab %}}
{{< /tabs >}}

## Migrando de x86 a arm64 con la extensión Datadog Lambda {#migrating-between-x86-to-arm64-with-the-datadog-lambda-extension}

La extensión Datadog es un binario compilado, disponible en variantes x86 y arm64. Si estás migrando una función Lambda x86 a arm64 (o de arm64 a x86) utilizando una herramienta de despliegue como CDK, Serverless Framework o SAM, asegúrate de que tu integración de servicio (como API Gateway, SNS o Kinesis) esté configurada para usar las versiones o alias de la función Lambda, de lo contrario, la función puede no estar disponible durante aproximadamente diez segundos durante el despliegue.

Esto sucede porque migrar una función Lambda de x86 a arm64 consiste en dos llamadas API paralelas, `updateFunction` y `updateFunctionConfiguration`. Durante estas llamadas, hay una breve ventana donde la llamada `updateFunction` de Lambda se ha completado y el código se actualiza para usar la nueva arquitectura, mientras que la llamada `updateFunctionConfiguration` aún no se ha completado, por lo que la antigua arquitectura sigue configurada para la extensión.

Si no puedes usar versiones de capas, Datadog recomienda configurar el [Datadog Forwarder][38] durante el proceso de migración de arquitectura.


## Configura la extensión Datadog Lambda para pruebas locales {#configure-the-datadog-lambda-extension-for-local-testing}

No todos los emuladores de Lambda son compatibles con la API de Telemetría de AWS Lambda. Para probar la imagen de contenedor de tu función Lambda localmente con la extensión Datadog Lambda instalada, necesitas establecer `DD_SERVERLESS_FLUSH_STRATEGY` en `periodically,1` en tu entorno de pruebas local. De lo contrario, la extensión espera respuestas de la API de Telemetría de AWS Lambda y bloquea la invocación.

## Instrumenta AWS Lambda con la API de OpenTelemetry {#instrument-aws-lambda-with-the-opentelemetry-api}

El SDK de Datadog, que se incluye en la extensión Datadog Lambda al instalarla, acepta los spans y trazas generados por el código instrumentado con OpenTelemetry, procesa la telemetría y la envía a Datadog.

Puedes usar este enfoque si, por ejemplo, tu código ya ha sido instrumentado con la API de OpenTelemetry. También puedes usar este enfoque si deseas instrumentar utilizando código independiente del proveedor con la API de OpenTelemetry mientras sigues obteniendo los beneficios de usar los SDK de Datadog.

Para instrumentar AWS Lambda con la API de OpenTelemetry, establece la variable de entorno `DD_TRACE_OTEL_ENABLED` en `true`. Consulte [Instrumentación personalizada con la API de OpenTelemetry][48] para más detalles.

## Uso de Lambda Extension de Datadog v67+ {#using-datadog-lambda-extension-v67}
La versión 67+ de [la Extensión de Datadog][53] está optimizada para reducir significativamente la duración del inicio en frío.
Para usar la extensión optimizada, establezca la variable de entorno `DD_SERVERLESS_APPSEC_ENABLED` en `false`.
Cuando la variable de entorno `DD_SERVERLESS_APPSEC_ENABLED` está establecida en `true`, la Extensión de Datadog predetermina a la versión anterior completamente compatible. También puede forzar a su extensión a usar la versión anterior estableciendo `DD_EXTENSION_VERSION` en `compatibility`. Datadog le anima a reportar cualquier comentario o error añadiendo un [problema en GitHub][54] y etiquetando su problema con `version/next`.

## Configure el enlace automático para DynamoDB PutItem {#configure-auto-linking-for-dynamodb-putitem}
_Disponible para entornos de Python y Node.js_.
Cuando los segmentos de sus solicitudes asíncronas no pueden propagar el contexto de traza, la función de [Enlace automático de tramos][55] de Datadog detecta automáticamente los tramos vinculados. 
Para habilitar el enlace automático de Span para la operación `PutItem` de [DynamoDB Change Streams][56], configure los nombres de las claves primarias para sus tablas.

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

Esto permite que las llamadas a DynamoDB `PutItem` sean instrumentadas con punteros de tramo. Muchas llamadas a la API de DynamoDB no incluyen los campos de clave primaria del ítem como valores separados, por lo que deben proporcionarse al SDK por separado. La configuración anterior está estructurada como un diccionario (`dict`) u objeto con claves que son los nombres de las tablas como cadenas (`str`). Cada valor es el conjunto de nombres de campos de clave primaria (como cadenas) para la tabla asociada. El conjunto puede tener exactamente uno o dos elementos, dependiendo del esquema de clave primaria de la tabla.

## Visualice y modele los servicios de AWS por nombre de recurso {#visualize-and-model-aws-services-by-resource-name}

Estas versiones de las capas Lambda de [Node.js][50], [Python][51] y [Java][52] lanzaron cambios para nombrar, modelar y visualizar correctamente los servicios administrados de AWS. 

Los nombres de los servicios reflejan el nombre real del recurso de AWS en lugar de solo el servicio de AWS:
* `aws.lambda` → `[function_name]`
* `aws.dynamodb` → `[table_name]`
* `aws.sns` → `[topic_name]`
* `aws.sqs` → `[queue_name]`
* `aws.kinesis` → `[stream_name]`
* `aws.s3` → `[bucket_name]`
* `aws.eventbridge` → `[event_name]`

Puede preferir el modelo de representación de servicio anterior si sus dashboards y monitors dependen de la convención de nombres heredada. Para restaurar el comportamiento anterior, establezca la variable de entorno: `DD_TRACE_AWS_SERVICE_REPRESENTATION_ENABLED=false`

Se recomienda la configuración de modelado de servicio actualizada.

## Envía registros a Observability Pipelines {#send-logs-to-observability-pipelines}

{{% observability_pipelines/lambda_extension_source %}}

Consulte [Enviar registros de Datadog Lambda Extension Forwarder a Observability Pipelines][58] para más información.

## Recargue el secreto de la clave de API periódicamente {#reload-api-key-secret-periodically}

Si especifica la clave de API de Datadog usando `DD_API_KEY_SECRET_ARN`, también puede establecer `DD_API_KEY_SECRET_RELOAD_INTERVAL` para recargar periódicamente el secreto. Por ejemplo, si establece `DD_API_KEY_SECRET_RELOAD_INTERVAL` en `43200`, entonces el secreto se recarga cuando se necesita la clave de API para enviar datos, y ha pasado más de 43200 segundos desde la última carga.

Caso de uso de ejemplo: Por seguridad, cada día (86400 segundos), la clave de API se rota y el secreto se actualiza a la nueva clave, y la clave de API anterior se mantiene válida por otro día como período de gracia. En este caso, puede establecer `DD_API_KEY_SECRET_RELOAD_INTERVAL` en `43200`, de modo que la clave de API se recargue durante el período de gracia de la clave anterior.

Esto está disponible para la versión 88+ de la Datadog Lambda Extension.

## Solucionar problemas {#troubleshoot}

Si tiene problemas configurando sus instalaciones, establezca la variable de entorno `DD_LOG_LEVEL` en `debug` para los registros de depuración. Para obtener consejos adicionales de solución de problemas, consulte la [guía de solución de problemas de monitoreo sin servidor][39].

## Lectura adicional {#further-reading}

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