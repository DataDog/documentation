---
kind: documentación
title: Recopilación de logs para AWS Lambda
---

### Recopilar logs provenientes de recursos distintos de Lambda

Los logs que se generan a partir de recursos administrados distintos de las funciones de AWS Lambda pueden ser útiles para identificar la causa raíz de los problemas de las aplicaciones serverless. Datadog te recomienda [recopilar logs][11] de los siguientes recursos administrados de AWS de tu entorno.
- API: API Gateway, AppSync, ALB
- Colas y flujos: SQS, SNS, Kinesis
- Almacenes de datos: DynamoDB, S3, RDS

## Configuración

### Habilitar la recopilación de logs

La recopilación de logs a través de la extensión de Lambda para Datadog está habilitada por defecto.

{{< tabs >}}
{{% tab "Serverless Framework" %}}

```yaml
custom:
  datadog:
    # ... otros parámetros necesarios, como el sitio de Datadog y la clave de API
    enableDDLogs: true
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... otros parámetros necesarios, como el sitio de Datadog y la clave de API
      enableDDLogs: true
```

{{% /tab %}}
{{% tab "AWS CDK" %}}

```typescript
const datadog = new Datadog(this, "Datadog", {
    // ... otros parámetros necesarios, como el sitio de Datadog y la clave de API
    enableDatadogLogs: true
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

{{% /tab %}}
{{% tab "Others" %}}

Define la variable de entorno `DD_SERVERLESS_LOGS_ENABLED` como `true` en tus funciones de Lambda.

{{% /tab %}}
{{< /tabs >}}

### Deshabilitar la recopilación de logs

Si quieres dejar de recopilar logs con la función de Lamba del Datadog Forwarder, borra el filtro de suscripción del grupo de logs de CloudWatch de tu propia función de Lambda.

Si quieres dejar de recopilar logs con la extensión de Lambda para Datadog, sigue las instrucciones que se muestran a continuación en función de tu método de instalación:

{{< tabs >}}
{{% tab "Serverless Framework" %}}

```yaml
custom:
  datadog:
    # ... otros parámetros necesarios, como el sitio de Datadog y la clave de API
    enableDDLogs: false
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... otros parámetros necesarios, como el sitio de Datadog y la clave de API
      enableDDLogs: false
```

{{% /tab %}}
{{% tab "AWS CDK" %}}

```typescript
const datadog = new Datadog(this, "Datadog", {
    // ... otros parámetros necesarios, como el sitio de Datadog y la clave de API
    enableDatadogLogs: false
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

{{% /tab %}}
{{% tab "Others" %}}

Define la variable de entorno `DD_SERVERLESS_LOGS_ENABLED` como `false` en tus funciones de Lambda.

{{% /tab %}}
{{< /tabs >}}

Para obtener más información, consulta [Gestión de logs][47].

### Filtrar o borrar información procedente de logs

Para excluir los logs `START` y `END`, define la variable de entorno `DD_LOGS_CONFIG_PROCESSING_RULES` como `[{"type": "exclude_at_match", "name": "exclude_start_and_end_logs", "pattern": "(START|END) RequestId"}]`. Otra posibilidad sería añadir un archivo `datadog.yaml` en el directorio raíz de tu proyecto con el siguiente contenido:

```yaml
logs_config:
  processing_rules:
    - type: exclude_at_match
      name: exclude_start_and_end_logs
      pattern: (START|END) RequestId
```

Datadog te recomienda mantener los logs `REPORT`, ya que se utilizan para rellenar la lista de invocaciones en las vistas de funciones serverless.

Para borrar o filtrar otros logs antes de enviarlos a Datadog, consulta [Recopilación avanzada de logs][13].

### Analizar y transformar logs

Para analizar y transformar tus logs en Datadog, consulta la documentación sobre [pipelines de logs de Datadog][14].

### Conectar logs y trazas

Si utilizas la [extensión de Lambda][2] para recopilar trazas (traces) y logs, Datadog añade automáticamente el ID de solicitud de AWS Lambda al tramo (span) `aws.lambda` en la etiqueta (tag) `request_id`. Además, los logs de Lambda para la misma solicitud se añaden en el atributo `lambda.request_id`. Las vistas de trazas y logs de Datadog se conectan mediante el uso del ID de solicitud de AWS Lambda.

Si utilizas la [función de Lambda del Forwarder][4] para recopilar trazas y logs, `dd.trace_id` se inserta automáticamente en los logs (habilitada por la variable de entorno `DD_LOGS_INJECTION`). Las vistas de trazas y logs de Datadog se conectan mediante el ID de traza de Datadog. Esta característica es compatible con la mayoría de aplicaciones que utilizan runtimes y loggers populares (consulta la [compatibilidad por runtime][24]).

Si utilizas un runtime o un logger personalizado no compatible, sigue estos pasos:
- Cuando generas logs en JSON, es necesario obtener el ID de traza de Datadog mediante `dd-trace` y añadirlo a tus logs en el campo `dd.trace_id`:
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

[2]: /es/serverless/libraries_integrations/extension/
[4]: /es/serverless/libraries_integrations/forwarder/
[11]: /es/integrations/amazon_web_services/#log-collection
[13]: /es/agent/logs/advanced_log_collection/
[14]: /es/logs/log_configuration/pipelines/
[24]: /es/tracing/other_telemetry/connect_logs_and_traces/
[25]: /es/logs/log_configuration/parsing/
[47]: /es/logs/