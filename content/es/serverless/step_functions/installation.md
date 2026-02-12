---
further_reading:
- link: /serverless/configuration/
  tag: Documentación
  text: Configurar Serverless Monitoring
- link: /integrations/amazon_lambda/
  tag: Documentación
  text: Integración de AWS Lambda
title: Instalar Serverless Monitoring para AWS Step Functions
---

### Requisitos
* La duración de la ejecución completa de Step Functions debe ser inferior a 6 horas para obtener trazas (traces) completas.

### Cómo funciona
AWS Step Functions es un servicio totalmente gestionado y el Datadog Agent no puede instalarse directamente en Step Functions. Sin embargo, Datadog puede monitorizar Step Functions a través de métricas y logs de CloudWatch.

Datadog recopila métricas de Step Functions de CloudWatch a través de la [integración AWS Step Functions][9]. Datadog recopila logs de Step Functions desde CloudWatch a través de uno de los siguientes:

- [Datadog Forwarder][6]. Para obtener instrucciones, consulta la sección [Configuración](#setup) de esta página.
- Amazon Data Firehose. Para obtener instrucciones, consulta [Enviar logs de servicios AWS al destino Datadog Amazon Data Firehose][7].

Datadog utiliza estos logs ingeridos para generar [métricas][8] y trazas mejoradas para tus ejecuciones de Step Functions.

{{< img src="serverless/step_functions/telemetry_ingestion.png" alt="Diagrama que explica cómo se ingiere y se utiliza la telemetría de Step Functions en Datadog" style="width:100%;" >}}

## Configuración

Asegúrate de que la [integración AWS Step Functions][9] está instalada.

A continuación, para enviar tus logs de Step Functions a Datadog:
{{< tabs >}}
{{% tab "Custom (Terraform)" %}}
1. Habilita todos los registros para tu Step Function. En tu consola de AWS, abre tu máquina de estados. Haz clic en *Edit* (Editar) y busca la sección Registro. Allí, configura *Nivel de log* en `ALL` y activa la casilla *Incluir datos de ejecución*.
   {{< img src="serverless/step_functions/aws_log.png" alt="Interfaz de usuario de AWS, sección Registro, donde se muestra el nivel de log configurado en TODOS." style="width:100%;" >}}

2. Asegúrate de haber desplegado el [Datadog Lambda Forwarder][6] y de estar utilizando la versión 3.130.0 o posterior. Como alternativa, también puedes utilizar [Amazon Data Firehose][16], que puede suscribirse a grupos de logs de Amazon CloudWatch en varias regiones de AWS. Sin embargo, requiere que el nombre del grupo de logs de Step Functions comience por "/aws/vendedlogs/states/".

3. Suscribe logs de CloudWatch al Datadog Lambda Forwarder. Si el nombre del grupo de logs de tu Step Functions empieza por "/aws/vendedlogs/states/", también puedes utilizar el [marco serverless o la CLI Datadog para configurar la suscripción][11].
   ### Instalación automática personalizada
   1. Asegúrate de que has configurado la [integración Datadog-AWS][1].
   2. En Datadog, abre el [cuadro de la integración AWS][2] y observa la pestaña *Configuración*.
   3. A la izquierda, selecciona la cuenta de AWS en la que se ejecuta tu Step Function. Abre la pestaña *Recopilación de logs*.
   4. En la sección *Autosuscripción de logs*, en *Autosuscribir Forwarder Lambda Functions*, introduce el ARN de tu Datadog Lambda Forwarder, como se ha indicado anteriormente. Haz clic en *Add* (Añadir).
   5. Cambia a *Logs de CloudWatch de Step Functions*. Los cambios tardan 15 minutos en surtir efecto.

   **Nota**: Para la autosuscripción de logs, es necesario que tu Lambda Forwarder y Step Function estén en la misma región.


   ### Instalación manual personalizada
   1. Abre tu consola AWS y ve a tu Datadog Lambda Forwarder. En la sección *Información general sobre funciones*, haz clic en *Añadir desencadenador*.
   2. En *Añadir desencadenador*, en la sección *Configuración de desencadenador*, utiliza el desplegable *Seleccionar una fuente* para seleccionar `CloudWatch Logs`.
   3. En *Grupo de logs*, selecciona el grupo de logs para tu máquina de estados. Por ejemplo, `/aws/vendedlogs/states/my-state-machine`.
   4. Introduce un nombre para el filtro. Puedes elegir llamarlo "filtro vacío" y dejar en blanco la casilla *Patrón de filtro*.



4. Configura etiquetas (tags). Abre tu consola AWS y ve a tu máquina de estado de Step Functions. Abre la sección *Etiquetas* y añade las etiquetas `env:<ENV_NAME>`, `service:<SERVICE_NAME>` y `version:<VERSION>`. La etiqueta `env` es necesaria para ver trazas en Datadog y es `dev` por defecto. La etiqueta `service` es por defecto el nombre de la máquina de estado. La etiqueta `version` por defecto es `1.0`.

5. Para habilitar el rastreo, tienes dos opciones:
   - **Por cada Step Function**: Añade la etiqueta `DD_TRACE_ENABLED` a cada Step Function y configura el valor como `true`.
   - **A nivel del Forwarder**: Para habilitar el rastreo para todas las Step Functions conectadas al Forwarder, tienes dos opciones:
     - Al crear el stack tecnológico de CloudFormation para el Forwarder, configura el parámetro `DdStepFunctionsTraceEnabled` como `true`.
     - Una vez creado el Forwarder, configura la variable de entorno `DD_STEP_FUNCTIONS_TRACE_ENABLED` como `true`.

[6]: /es/logs/guide/forwarder
[11]: /es/serverless/step_functions/merge-step-functions-lambda
[16]: /es/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination
[1]: /es/getting_started/integrations/aws/
[2]: https://app.datadoghq.com/integrations/aws
{{% /tab %}}
{{% tab "Datadog CI" %}}
1. Si aún no lo has hecho, instala la v2.18.0 o posterior de la [CLI Datadog][1].

   ```shell
   npm install -g @datadog/datadog-ci
   ```

1. Asegúrate de haber desplegado el [Datadog Lambda Forwarder][2] y de estar utilizando la versión 3.130.0 o posterior. Como alternativa, también puedes utilizar [Amazon Data Firehose][3], que puede suscribirse a grupos de logs de Amazon CloudWatch en varias regiones de AWS. El nombre de tu grupo de logs de Step Functions debe utilizar este formato: 
   ```
   /aws/vendedlogs/states/<STEP_FUNCTION_NAME>-Logs
   ```

   **Opcionalmente**, puedes añadir tu entorno a este nombre de grupo de logs: `/aws/vendedlogs/states/<STEP_FUNCTION_NAME>-Logs-<ENV>`

   Toma nota del ARN de tu Forwarder.

1. Ejecuta:

   ```shell
   datadog-ci stepfunctions instrument \
    --step-function <STEP_FUNCTION_ARN> \
    --forwarder <FORWARDER_ARN> \
    --env <ENVIRONMENT> \
    --propagate-upstream-trace \
    --merge-step-function-and-lambda-traces
   ```

   - Sustituye `<STEP_FUNCTION_ARN>` por el ARN de tu Step Function. Repite la marca `--step-function` para cada Step Function que desees instrumentar.
   - Sustituye `<FORWARDER_ARN>` por el ARN de tu Datadog Lambda Forwarder. Este paso configura la suscripción a flujos (streams) de logs del Forwarder.
   - Sustituye `<ENVIRONMENT>` por la etiqueta del entorno que desees aplicar a tu Step Functions.

    Para obtener más información sobre el comando `datadog-ci stepfunctions`, consulta la [documentación de la CLI Datadog][4].

**Nota**: El comando `datadog-ci stepfunctions instrument` habilita automáticamente el rastreo.

[1]: /es/serverless/libraries_integrations/cli/
[2]: /es/logs/guide/forwarder
[3]: /es/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination
[4]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-stepfunctions#readme
{{% /tab %}}
{{% tab "Serverless Plugin" %}}

1. Si aún no lo has hecho, instala la v5.40.0 o posterior del [complemento del marco serverless de Datadog][1]:

    ```shell
    serverless plugin install --name serverless-plugin-datadog
    ```

1. Asegúrate de haber desplegado el [Datadog Lambda Forwarder][2] y de estar utilizando la versión 3.130.0 o posterior. Como alternativa, también puedes utilizar [Amazon Data Firehose][3], que puede suscribirse a grupos de logs de Amazon CloudWatch en varias regiones de AWS. El nombre de tu grupo de logs de Step Functions debe utilizar este formato: 
   ```
   /aws/vendedlogs/states/<STEP_FUNCTION_NAME>-Logs-<STAGE>
   ```

1. Añade lo siguiente a tu `serverless.yml`:

   ```yaml
   custom:
     datadog:
       site: <DATADOG_SITE>
       apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
       forwarderArn: <FORWARDER_ARN>
       enableStepFunctionsTracing: true
       propagateUpstreamTrace: true
       mergeStepFunctionAndLambdaTraces: true
   ```

    - Sustituye `<DATADOG_SITE>` por {{< region-param key="dd_site" code="true" >}} (asegúrate de que has seleccionado el SITIO DATADOG correcto a la derecha de esta página).
    - Reemplaza `<DATADOG_API_KEY_SECRET_ARN>` por el ARN del secreto de AWS en el que almacenas la [clave de la API de Datadog][4] de forma segura. La clave debe estar almacenada en una cadena de texto sin formato (no en un blob JSON). Además, el permiso `secretsmanager:GetSecretValue` es obligatorio. Si quieres hacer un testeo rápido, puedes usar `apiKey` en lugar del ARN y configurar la clave de la API de Datadog en texto sin formato.
    - Sustituye `<FORWARDER_ARN>` por el ARN de tu Datadog Lambda Forwarder. Este paso configura la suscripción a flujos de logs del Forwarder.

    Para ver parámetros adicionales, consulta [Complemento del marco serverless de Datadog - Parámetros de configuración][5].

    **Nota**: La línea `enableStepFunctionsTracing: true` habilita automáticamente el rastreo.

[1]: https://docs.datadoghq.com/es/serverless/libraries_integrations/plugin/
[2]: /es/logs/guide/forwarder
[3]: /es/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://github.com/datadog/serverless-plugin-datadog?tab=readme-ov-file#configuration-parameters
{{% /tab %}}
{{% tab "CDK AWS" %}}
1. Asegúrate de que has desplegado el [Datadog Lambda Forwarder][1] y de que utilizas la versión 3.130.0 o posterior.

1. Instala la [biblioteca de constructos CDK de Datadog][3], que configura automáticamente la generación de logs y suscribe el Forwarder al grupo de logs.

**Ejemplo**

```python
from aws_cdk import (
    aws_stepfunctions as sfn,
    aws_stepfunctions_tasks as tasks,
)
from datadog_cdk_constructs_v2 import DatadogStepFunctions, DatadogLambda

state_machine = sfn.StateMachine(...)
datadog_sfn = DatadogStepFunctions(
    self,
    "DatadogSfn",
    env="<ENV>", # e.g. "dev"
    service="<SERVICE>", # e.g. "my-cdk-service"
    version="<VERSION>", # e.g. "1.0.0"
    forwarderArn="<FORWARDER_ARN>", # e.g. "arn:test:forwarder:sa-east-1:12345678:1"
    tags=<TAGS>, # optional, e.g. "custom-tag-1:tag-value-1,custom-tag-2:tag-value-2"
)
datadog_sfn.add_state_machines([child_state_machine, parent_state_machine])
```

Para ver ejemplos de stack tecnológico y de código adicionales, consulta [ejemplos de CDK para la instrumentación de AWS Step Functions][4].

**Nota**: El constructo CDK de Step Functions de Datadog habilita automáticamente el rastreo.

[1]: /es/logs/guide/forwarder
[2]: /es/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination
[3]: https://github.com/DataDog/datadog-cdk-constructs
[4]: /es/serverless/guide/step_functions_cdk
{{% /tab %}}
{{% tab "AWS SAM" %}}
1. Asegúrate de que has desplegado el [Datadog Lambda Forwarder][1] y de que utilizas la versión 3.130.0 o posterior.

1. Añade lo siguiente a tu `template.yaml`:
   ```yaml
   Transform:
   - AWS::Serverless-2016-10-31
   - Name: DatadogServerless
      Parameters:
         stackName: !Ref "AWS::StackName"
         apiKey: "<DATADOG_API_KEY>"
         env: "<ENV>" # e.g. "dev"
         service: "<SERVICE>" # e.g. "my-sam-service"
         version: "<VERSION>" # e.g. "1.0.0"
         stepFunctionForwarderArn: "<FORWARDER_ARN>" # "arn:test:forwarder:sa-east-1:12345678:1"
         tags: "<TAGS>" # optional, e.g. "custom-tag-1:tag-value-1,custom-tag-2:tag-value-2"
   ```

Para ajustes adicionales, [consulta la documentación en GitHub][2].

[1]: /es/logs/guide/forwarder
[2]: https://github.com/DataDog/datadog-cloudformation-macro/blob/main/serverless/README.md

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">Las métricas mejoradas se habilitan automáticamente si se habilita el rastreo. De esta forma, si se habilita el rastreo, se te facturará por la Monitorización de cargas de trabajo serverless y también por APM serverless. Consulta <a href="https://www.datadoghq.com/pricing/?product=serverless-monitoring#products">Precios</a>.</div>

## Opciones de instrumentación adicionales


### Fusionar trazas de Step Functions y trazas de AWS Lambda

Consulta [Fusionar trazas de Step Functions y trazas de AWS Lambda][11]. Asegúrate de que también has configurado la [monitorización serverless para AWS Lambda][10].

### Ejemplo de trazas

Para gestionar la frecuencia de muestreo de invocaciones rastreadas de APM para funciones serverless, configura la variable de entorno `DD_TRACE_SAMPLE_RATE` de la función con un valor entre 0.00 (sin rastreo de invocaciones Step Function) y 1.00 (rastreo de todas las invocaciones Step Function).

Las trazas descartadas no se ingieren en Datadog.

### Habilitar métricas mejoradas (sin rastreo)

Datadog genera [métricas mejoradas][8] a partir de la información recopilada de logs de CloudWatch. Las métricas mejoradas se habilitan automáticamente si se habilitan las trazas.

Para habilitar métricas mejoradas sin habilitar el rastreo, añade una etiqueta `DD_ENHANCED_METRICS` a cada una de tus Step Functions y configura el valor como `true`.

<div class="alert alert-info">Si habilitas métricas mejoradas sin habilitar las trazas, sólo se te facturará la Monitorización de cargas de trabajo serverless. Si habilitas el rastreo (que incluye automáticamente métricas mejoradas), se te facturará por la Monitorización de cargas de trabajo serverless y también por APM serverless. Consulta <a href="https://www.datadoghq.com/pricing/?product=serverless-monitoring#products">Precios</a>.</div>

## Consulta tus métricas, logs y trazas de Step Function en Datadog

Después de haber invocado tu máquina de estados, ve a la [**Aplicación serverless**][2] en Datadog. Busca`service:<YOUR_STATE_MACHINE_NAME>` para ver las métricas, logs y trazas relevantes asociados con esa máquina de estados. Si configuras la etiqueta `service` en tu máquina de estados en un valor personalizado, busca `service:<CUSTOM_VALUE>`.

{{< img src="serverless/step_functions/overview1.png" alt="Una vista del panel lateral de AWS Step Function." style="width:100%;" >}}

Si no puedes ver tus trazas, consulta [Solucionar problemas][5].

[2]: https://app.datadoghq.com/functions?search=&cloud=aws&entity_view=step_functions
[3]: /es/serverless/installation/#installation-instructions
[5]: /es/serverless/step_functions/troubleshooting
[6]: /es/logs/guide/forwarder
[7]: /es/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination
[8]: /es/serverless/step_functions/enhanced-metrics
[9]: /es/integrations/amazon_step_functions
[10]: /es/serverless/aws_lambda/installation
[11]: /es/serverless/step_functions/merge-step-functions-lambda
[13]: /es/logs/guide/forwarder/?tab=cloudformation#upgrade-to-a-new-version
[14]: /es/getting_started/integrations/aws/
[15]: https://app.datadoghq.com/integrations/aws
[16]: /es/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination