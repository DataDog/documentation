---
description: Configure Datadog Serverless Monitoring para AWS Lambda Durable Functions.
further_reading:
- link: https://www.datadoghq.com/blog/trace-aws-lambda-durable-functions/
  tag: Blog
  text: Rastree funciones durables de AWS Lambda con Datadog
title: Seguimiento de AWS Lambda Durable Functions
---
Datadog proporciona visibilidad completa de las métricas, los registros y las trazas de las ejecuciones de AWS Lambda Durable Function. En una sola vista, puede hacer un seguimiento de sus AWS Lambda Durable Functions junto con sus otros servicios de cómputo sin servidor para detectar cuellos de botella y corregir errores.

**Tiempos de ejecución compatibles:** Node.js, Python

## Configuración {#setup}

### Instrumente su función Lambda {#instrument-your-lambda-function}

1. Siga [los pasos para instrumentar una función Lambda][1], confirmando que la biblioteca de Lambda de Datadog esté instalada y que tanto el rastreo como la [recolección de registros][9] estén habilitados (la recolección de registros está habilitada de forma predeterminada). Utilice las siguientes versiones:

    - Datadog Lambda Extension: v99+
    - Capa de Lambda de Datadog para Node.js: v142+
    - Capa de Lambda de Datadog para Python: v127+

2. Si utiliza Datadog Lambda Extension v99, configure la siguiente variable de entorno en su función Lambda. Para v100+, el valor predeterminado ya es `5`, por lo que no necesita configurarlo explícitamente.

    ```text
    DD_LAMBDA_DURABLE_FUNCTION_LOG_BUFFER_SIZE=5
    ```

    This environment variable configures the Datadog Lambda Extension to buffer logs and enrich them with the durable execution context sent by the Datadog Lambda Library. Set its value to a non-negative integer specifying the maximum number of invocations whose logs are buffered. A value of `0` disables enrichment, so durable executions do not appear in Datadog. In v99, the default is `0`; in v100+, the default is `5`.

### Reenviar eventos de ejecución duradera {#forward-durable-execution-events}

**Implementar la pila de CloudFormation**

Para reenviar eventos de cambio de estado de ejecución duradera a Datadog, implemente la pila de CloudFormation en su cuenta de AWS:

1. Inicie sesión en la cuenta y región de AWS donde se ejecutan sus funciones duraderas, luego haga clic en **Launch Stack** para abrir la pila:

    [![Launch Stack](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)][2]

2. Proporcione su clave de Datadog API utilizando exactamente uno de los siguientes parámetros:

    - `DdApiKey`: su [clave de Datadog API][3] en texto sin formato
    - `DdApiKeySecretArn`: el ARN de un secreto de AWS Secrets Manager cuyo valor es su clave de Datadog API
    - `DdApiKeySsmParameterName`: el nombre de un parámetro `SecureString` de AWS Systems Manager Parameter Store que contiene su clave de Datadog API

3. Establezca `DdSite` en su [sitio de Datadog][4]. El valor predeterminado es `datadoghq.com`.
4. Opcionalmente, restrinja qué eventos se reenvían:

    - `Statuses`: una lista separada por comas de estados de ejecución para reenviar. Los valores válidos son `RUNNING`, `SUCCEEDED`, `FAILED`, `TIMED_OUT` y `STOPPED`. Déjelo vacío para reenviar todos los estados.
    - `FunctionArnFilter1` a `FunctionArnFilter5`: hasta cinco ARN de funciones Lambda sin calificar o patrones comodín de EventBridge, como `arn:aws:lambda:us-east-2:123456789012:function:my-durable-*`. No incluya un sufijo de versión o alias. Deje los cinco vacíos para reenviar eventos de todas las funciones en la región.
    - `BufferIntervalSeconds`: el intervalo de búfer de Amazon Data Firehose, en segundos (`60`-`900`, valor predeterminado `60`). Los valores más altos reducen la cantidad de solicitudes salientes a costa de la frescura.

5. Haga clic en **Create stack** y espere a que la pila termine de crearse.
6. Si sus funciones duraderas se ejecutan en varias regiones de AWS, repita estos pasos en cada región.

**Instale la integración de AWS Lambda**

En Datadog, instale la [integración de AWS Lambda][5], que proporciona la canalización de registros lista para usar que transforma los eventos reenviados.

### Cree un filtro de retención de trazas {#create-a-trace-retention-filter}

Cree un [filtro de retención de trazas][6] con la consulta de retención `operation_name:aws.durable.execute`.

## Consultas en Datadog {#querying-in-datadog}

La pestaña **Ejecuciones** en la página de la función Lambda enumera las ejecuciones duraderas. Utilice los atributos de registro, las etiquetas de tramo y las métricas a continuación para buscar ejecuciones duraderas, o para crear paneles y monitores.

### Registros {#logs}

Para limitar el alcance de una consulta de registro a una función, filtre por el ARN de la función:

```text
@lambda.arn:"<FUNCTION_ARN>"
```

La Datadog Lambda Extension agrega estos atributos a los registros de una función duradera:

| Atributo de registro | Descripción |
|---|---|
| `@lambda.durable_function.execution_name` | El nombre de la ejecución. Agrupa todos los registros de una ejecución. |
| `@lambda.durable_function.execution_id` | El ID de la ejecución. |
| `@lambda.durable_function.first_invocation` | `true` en los registros de la primera invocación de la ejecución, `false` en caso contrario. |
| `@lambda.durable_function.execution_status` | El estado de la ejecución cuando finalizó la invocación: `SUCCEEDED`, `FAILED` o `PENDING`, donde `PENDING` significa que la ejecución se suspendió y se reanuda en una invocación posterior. En el registro `END` o en el registro `REPORT` para ejecuciones en [Instancias administradas de Lambda][10]. |

Consultas de ejemplo (agregue `@lambda.arn:"<FUNCTION_ARN>"` para limitar el alcance a una función):

- Todos los registros de una ejecución duradera:

    ```text
    @lambda.durable_function.execution_name:"<EXECUTION_NAME>"
    ```

- El registro `START` de cada ejecución, que marca cuándo comenzó:

    ```text
    "START RequestId:" @lambda.durable_function.first_invocation:true
    ```

- El último registro de cada ejecución, que marca cuándo finalizó:

    ```text
    "END RequestId:" OR "REPORT RequestId:"
    ```

    Lambda Managed Instances emit no `END` log, so query both.

### Eventos de cambio de estado {#status-change-events}

Los eventos enviados por la pila de CloudFormation llegan como registros, que coinciden con:

```text
@detail-type:"Durable Execution Status Change"
```

La canalización de integración de AWS Lambda asigna estos eventos a los siguientes atributos:

| Atributo de registro | Descripción |
|---|---|
| `@lambda.durable_function.execution_status` | Uno de los siguientes: `RUNNING`, `SUCCEEDED`, `FAILED`, `TIMED_OUT` o `STOPPED`. |
| `@lambda.durable_function.execution_start_time` | Cuándo comenzó la ejecución, en milisegundos UNIX. |
| `@lambda.durable_function.execution_end_time` | Cuándo alcanzó la ejecución un estado terminal, en milisegundos UNIX. |

Trate estos eventos como la fuente de verdad para el estado terminal, ya que los registros `END` y `REPORT` no pueden informar `TIMED_OUT` o `STOPPED`.

Los eventos terminales tienen una marca de tiempo cuando finaliza la ejecución, por lo que un rango de tiempo selecciona las ejecuciones que finalizaron dentro de él.

### Trazas {#traces}

Para limitar una consulta de tramo a una función, filtre por el ARN de la función:

```text
@function_arn:"<FUNCTION_ARN>"
```

**El tramo de ejecución duradera**

El rastreador crea un tramo `aws.durable.execute` por invocación y une las invocaciones de una ejecución en una sola traza.

| Etiqueta de tramo | Descripción |
|---|---|
| `@aws.durable.execution_arn` | El ARN completo de la ejecución duradera, que contiene el nombre de la ejecución. Este tramo no lleva el nombre de la ejecución como una etiqueta separada. |
| `@aws.durable.invocation_status` | El estado de la ejecución cuando terminó esta invocación: `succeeded`, `failed` o `pending`. `pending` significa que la ejecución se suspendió y se reanuda en una invocación posterior. |
| `@aws.durable.replayed` | `false` en la invocación que inicia una ejecución, `true` en cada invocación posterior que la reanuda después de una suspensión. |

**El tramo de invocación de Lambda**

Cada invocación también produce el tramo `aws.lambda` estándar, etiquetado con el contexto de ejecución duradera:

| Etiqueta de tramo | Descripción |
|---|---|
| `@aws.durable.execution_name` | El nombre de la ejecución. |
| `@aws.durable.execution_id` | El ID de ejecución. |
| `@aws.durable.first_invocation` | `true` en la primera invocación de una ejecución. |
| `@aws.durable.execution_status` | El estado de la ejecución cuando terminó la invocación: `SUCCEEDED`, `FAILED` o `PENDING`. |

**Tramos de operación**

Cada operación llamada en el contexto durable produce un tramo hijo:

| Nombre de la operación | Método de Node.js | Método de Python |
|---|---|---|
| `aws.durable.step` | `step` | `step` |
| `aws.durable.invoke` | `invoke` | `invoke` |
| `aws.durable.wait` | `wait` | `wait` |
| `aws.durable.wait_for_condition` | `waitForCondition` | `wait_for_condition` |
| `aws.durable.wait_for_callback` | `waitForCallback` | `wait_for_callback` |
| `aws.durable.create_callback` | `createCallback` | `create_callback` |
| `aws.durable.map` | `map` | `map` |
| `aws.durable.parallel` | `parallel` | `parallel` |
| `aws.durable.child_context` | `runInChildContext` | `run_in_child_context` |

| Etiqueta de tramo | Descripción |
|---|---|
| `@aws.durable.operation_name` | El nombre de la operación. |
| `@aws.durable.operation_id` | Un hash del ID de paso de la operación. |
| `@aws.durable.operation_attempt` | El número de intento, en las operaciones reintentables `aws.durable.step` y `aws.durable.wait_for_condition`. `0` es el intento original, `1` el primer reintento. |
| `@aws.durable.replayed` | `true` cuando el resultado de la operación se obtuvo de un punto de control en lugar de ejecutarse, independientemente de si ese resultado almacenado fue un éxito o un error. |
| `@aws.durable.invoke.function_name` | La función de destino, en `aws.durable.invoke` tramos. |

### Métricas {#metrics}

AWS publica estas métricas de ejecución duradera en CloudWatch. Llegan a Datadog a través de la [integración de AWS Lambda][5] y están etiquetadas con `functionname`.

| Métrica | Descripción | Agregación |
|---|---|---|
| `aws.lambda.durable_execution_started` | Número de ejecuciones duraderas iniciadas. | `sum` como recuento |
| `aws.lambda.durable_execution_succeeded` | Número de ejecuciones duraderas que se completaron correctamente. | `sum` como recuento |
| `aws.lambda.durable_execution_failed` | Número de ejecuciones duraderas que finalizaron con error. | `sum` como recuento |
| `aws.lambda.durable_execution_timed_out` | Número de ejecuciones duraderas que excedieron su tiempo de espera. | `sum` como recuento |
| `aws.lambda.durable_execution_stopped` | Número de ejecuciones duraderas detenidas con la API `StopDurableExecution`. | `sum` como recuento |
| `aws.lambda.durable_execution_duration` | Tiempo de reloj de pared que una ejecución duradera pasó en el estado `RUNNING`, en milisegundos. | `avg` |
| `aws.lambda.durable_execution_operations` | Número acumulado de operaciones realizadas por ejecuciones duraderas. | `sum` como recuento |
| `aws.lambda.durable_execution_storage_written_bytes` | Cantidad acumulada de datos persistidos por ejecuciones duraderas, en bytes. | `sum` |
| `aws.lambda.approximate_running_durable_executions` | Número de ejecuciones duraderas en el estado `RUNNING`. | `avg` |
| `aws.lambda.approximate_running_durable_executions_utilization` | Porcentaje de la cuota de ejecución duradera en uso. | `avg` |

Por ejemplo, para graficar las ejecuciones fallidas de una función:

```text
sum:aws.lambda.durable_execution_failed{functionname:<FUNCTION_NAME>}.as_count()
```

## Limitaciones y comentarios {#limitations-and-feedback}

No se admiten otros entornos de ejecución que no sean Node.js y Python. Si encuentra un problema con otro entorno de ejecución, abra un problema en el [repositorio de GitHub datadog-lambda-extension][7].

Si encuentra un problema con la pila de CloudFormation, abra un problema en el [repositorio de GitHub cloudformation-template][8].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/serverless/aws_lambda/instrumentation
[2]: https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=datadog-durable-function-event-forwarder&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/lambda-durable-function-event-forwarder/latest.yaml
[3]: /es/account_management/api-app-keys/#api-keys
[4]: /es/getting_started/site/
[5]: /es/integrations/amazon_lambda/
[6]: /es/tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter
[7]: https://github.com/DataDog/datadog-lambda-extension
[8]: https://github.com/DataDog/cloudformation-template/tree/master/aws_durable_function_event_forwarder
[9]: /es/serverless/aws_lambda/logs/#enable-log-collection
[10]: /es/serverless/aws_lambda/managed_instances/