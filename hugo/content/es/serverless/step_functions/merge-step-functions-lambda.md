---
further_reading:
- link: /serverless/step_functions/installation
  tag: Documentación
  text: Instalar la monitorización serverless para AWS Step Functions
title: Fusionar trazas (traces) de Step Functions y de Lambda
---

Esta página describe cómo fusionar tus trazas de AWS Step Functions con trazas de AWS Lambda o trazas de Step Functions anidadas. Estas instrucciones suponen que ya instrumentaste estas [AWS Step Functions][1] y [funciones Lambda][2] para enviar trazas a Datadog.

<div class="alert alert-info">Datadog recomienda utilizar <a href="https://docs.aws.amazon.com/step-functions/latest/dg/transforming-data.html"><code>JSONata</code></a> para tus definiciones de Step Function a fin de obtener la más completa experiencia de rastreo de extremo a extremo. Esta estrategia garantiza que cualquier contexto anterior al Step Function se conservará y se transmitirá.</div>

## Fusionar trazas de Step Functions y trazas de Lambda descendentes

### Con JSONata

#### Requisitos

| Tiempo de ejecución | Requisito |
| ------- | ----------- |
| Node.js | Biblioteca Lambda Datadog para la capa Node.js v116 o posterior |
| Python  | Biblioteca Lambda Datadog para la capa Python v103 o posterior |
| Otro | Extensión de Datadog v75 o posterior |

Tu definición de máquina de estado debe utilizar `JSONata` como lenguaje de consulta. Para habilitarlo, configura el campo `QueryLanguage` de nivel superior de tu definición como `JSONata`.

#### Configuración

En la tarea Lambda, configura `Payload` en el campo `Arguments` como se indica a continuación: 

{{< highlight json "hl_lines=7-7" >}}
"Lambda Invoke": {
  "Type": "Task",
  "Resource": "arn:aws:states:::lambda:invoke",
  "Output": "{% $states.result.Payload %}",
  "Arguments": {
    "FunctionName": "MyFunctionName",
    "Payload": "{% ($execInput := $exists($states.context.Execution.Input.BatchInput) ? $states.context.Execution.Input.BatchInput : $states.context.Execution.Input; $hasDatadogTraceId := $exists($execInput._datadog.`x-datadog-trace-id`); $hasDatadogRootExecutionId := $exists($execInput._datadog.RootExecutionId); $ddTraceContext := $hasDatadogTraceId ? {'x-datadog-trace-id': $execInput._datadog.`x-datadog-trace-id`, 'x-datadog-tags': $execInput._datadog.`x-datadog-tags`} : {'RootExecutionId': $hasDatadogRootExecutionId ? $execInput._datadog.RootExecutionId : $states.context.Execution.Id}; $sfnContext := $merge([$states.context, {'Execution': $sift($states.context.Execution, function($v, $k) { $k != 'Input' })}]); $merge([$states.input, {'_datadog': $merge([$sfnContext, $ddTraceContext, {'serverless-version': 'v1'}])}])) %}"
  }
}
{{< /highlight >}}

La expresión `JSONata` fusiona el contexto del servicio ascendente con el objeto del contexto Step Functions actual y la carga útil de entrada del estado de Lambda.

Alternativamente, si tienes la lógica empresarial definida en la carga útil, puedes sustituir `$states.input` al final de la expresión `JSONata` por el valor que quieras para la clave `Payload`.

### Con JSONPath

#### Requisitos
| Tiempo de ejecución | Requisito |
| ------- | ----------- |
| Node.js | Biblioteca Lambda Datadog para la capa Node.js v112 o posterior |
| Python  | Biblioteca Lambda Datadog para la capa Python v95 o posterior |

Tu definición de máquina de estado utiliza `JSONPath`. Si se omite el campo de nivel superior `QueryLanguage` de tu definición, se utiliza por defecto `JSONPath`.

#### Configuración

{{< tabs >}}
{{% tab "Marco serverless" %}}
1. Si aún no lo hiciste, instala el [complemento del marco serverless de Datadog][4] v5.40.0 o posterior:

    ```shell
    serverless plugin install --name serverless-plugin-datadog
    ```

2. Asegúrate de que tienes desplegado el [Datadog Lambda Forwarder][5], una función Lambda que envía logs de AWS a Datadog, y de que estás utilizando la v3.74.0 o posterior. Puede que necesites [actualizar tu Forwarder][6].

   Toma nota del ARN de tu Forwarder.

3. Añade lo siguiente a tu `serverless.yml`:

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

    - Sustituye `<DATADOG_SITE>` por {{< region-param key="dd_site" code="true" >}} (asegúrate de haber seleccionado el SITIO correcto del lado derecho).
    - Sustituye `<DATADOG_API_KEY_SECRET_ARN>` por el ARN del secreto de AWS donde está almacenada la [clave de API Datadog][7] de forma segura. La clave debe almacenarse en una cadena de texto sin formato (no en un blob JSON). El permiso `secretsmanager:GetSecretValue` es obligatorio. Para realizar tests, puedes utilizar `apiKey` y configurar la clave de API Datadog en texto sin formato.
    - Sustituye `<FORWARDER_ARN>` por el ARN de tu Datadog Lambda Forwarder. Este paso configura la suscripción de flujos (streams) de logs del Forwarder. Asegúrate de que el nombre del grupo de logs de la Step Function comienza por `/aws/vendedlogs/states/`. Si no es así, debes configurarlo manualmente.

    Para ver parámetros adicionales, consulta [Complemento del marco serverless de Datadog - Parámetros de configuración][8].


[4]: https://docs.datadoghq.com/es/help/
[5]: /es/serverless/libraries_integrations/plugin/
[6]: /es/logs/guide/forwarder/
[7]: /es/logs/guide/forwarder/?tab=cloudformation#upgrade-to-a-new-version
[8]: https://app.datadoghq.com/organization-settings/api-keys
[9]: https://github.com/datadog/serverless-plugin-datadog?tab=readme-ov-file#configuration-parameters

{{% /tab %}}
{{% tab "Datadog CLI" %}}

1. Si aún no lo hiciste, instala la [CLI Datadog][9] v2.18.0 o posterior.

   ```shell
   npm install -g @datadog/datadog-ci
   ```
2. Asegúrate de que tienes desplegado el [Datadog Lambda Forwarder][10], una función Lambda que envía logs de AWS a Datadog, y de que estás utilizando la v3.130.0 o posterior. Puede que necesites [actualizar tu Forwarder][11].

   Toma nota del ARN de tu Forwarder.
3. Instrumenta tu Step Function.

   ```shell
   datadog-ci stepfunctions instrument \
    --step-function <STEP_FUNCTION_ARN> \
    --forwarder <FORWARDER_ARN> \
    --env <ENVIRONMENT> \
    --propagate-upstream-trace \
    --merge-step-function-and-lambda-traces
   ```
   - Sustituye `<STEP_FUNCTION_ARN>` por el ARN de tu Step Function. Repite la marca `--step-function` para cada Step Function que desees instrumentar.
   - Sustituye `<FORWARDER_ARN>` por el ARN de tu Datadog Lambda Forwarder, como se indica arriba. Este paso configura la suscripción de flujos de logs del Forwarder. Asegúrate de que el nombre del grupo de logs de la Step Function comienza por "/aws/vendedlogs/states/". Si no es así, debes configurarlo manualmente.
   - Sustituye `<ENVIRONMENT>` por la etiqueta del entorno que desees aplicar a tu Step Functions.

   Para obtener más información sobre el comando `datadog-ci stepfunctions`, consulta la [documentación de la CLI Datadog][12].


[10]: /es/serverless/libraries_integrations/cli/
[11]: /es/logs/guide/forwarder/
[12]: /es/logs/guide/forwarder/?tab=cloudformation#upgrade-to-a-new-version
[13]: https://github.com/DataDog/datadog-ci/blob/master/src/commands/stepfunctions/README.md

{{% /tab %}}
{{% tab "CDK AWS" %}}

Modifica la carga útil de la tarea Lambda o la entrada de la tarea de Step Function.

**Ejemplo**:

{{< code-block lang="python" disable_copy="false" >}}
from aws_cdk import (
    aws_lambda,
    aws_stepfunctions as sfn,
    aws_stepfunctions_tasks as tasks,
)
from datadog_cdk_constructs_v2 import DatadogStepFunctions, DatadogLambda

lambda_function = aws_lambda.Function(...)
lambda_task = tasks.LambdaInvoke(
    self,
    "MyLambdaTask",
    lambda_function=lambda_function,
    payload=sfn.TaskInput.from_object(
        DatadogStepFunctions.build_lambda_payload_to_merge_traces(
            {"custom-key": "custom-value"}
        )
    ),
)

child_state_machine = sfn.StateMachine(...)
invoke_child_state_machine_task = tasks.StepFunctionsStartExecution(
    self,
    "InvokeChildStateMachineTask",
    state_machine=child_state_machine,
    input=sfn.TaskInput.from_object(
        DatadogStepFunctions.build_step_function_task_input_to_merge_traces(
            {"custom-key": "custom-value"}
        )
    ),
)

state_machine = sfn.StateMachine(
    self,
    "CdkPythonTestStateMachine",
    definition_body=sfn.DefinitionBody.from_chainable(
        lambda_task.next(invoke_child_state_machine_task)
    ),
)

datadog_lambda = DatadogLambda(...)
datadog_lambda.add_lambda_functions([lambda_function])

datadog_sfn = DatadogStepFunctions(...)
datadog_sfn.add_state_machines([child_state_machine, state_machine])
{{< /code-block >}}

Para ver ejemplos de código adicionales en TypeScript y Go, consulta [Ejemplos de CDK para la instrumentación de AWS Step Functions][13].

[14]: /es/serverless/guide/step_functions_cdk
{{% /tab %}}
{{% tab "Personalizado" %}}

En la tarea Lambda, configura la clave `Parameters` de la siguiente manera: 

```json
"Parameters": {
  "Payload.$": "States.JsonMerge($$, $, false)",
  ...
}
```

La [función intrínseca][15] `JsonMerge` fusiona el [objeto de contexto de Step Functions][16] (`$$`) con la carga útil de entrada original de Lambda (`$`). Los campos de la carga útil original sobrescriben el objeto de contexto de Step Functions si tus claves son las mismas.

**Ejemplo**:

{{< highlight json "hl_lines=5-5" >}}
"Lambda Read From DynamoDB": {
  "Type": "Task",
  "Resource": "arn:aws:states:::lambda:invoke",
  "Parameters": {
    "Payload.$": "States.JsonMerge($$, $, false)",
    "FunctionName": "${lambdaArn}"
  },
  "End": true
}
{{< /highlight >}}

Alternativamente, si tienes la lógica empresarial definida en la carga útil, también puedes utilizar el siguiente formato:

{{< highlight json "hl_lines=7-9" >}}
"Lambda Read From DynamoDB": {
  "Type": "Task",
  "Resource": "arn:aws:states:::lambda:invoke",
  "Parameters": {
    "Payload": {
      ...
      "Execution.$": "$$.Execution",
      "State.$": "$$.State",
      "StateMachine.$": "$$.StateMachine"
    },
    "FunctionName": "${lambdaArn}"
  },
  "End": true
}
{{< /highlight >}}

[15]: https://docs.aws.amazon.com/step-functions/latest/dg/amazon-states-language-intrinsic-functions.html#asl-intrsc-func-json-manipulate
[16]: https://docs.aws.amazon.com/step-functions/latest/dg/input-output-contextobject.html

{{% /tab %}}
{{< /tabs >}}

### Mediante servicios gestionados

Sigue estas instrucciones si tu Step Function invoca indirectamente una Lambda a través de EventBridge, SQS o SNS. Para rastrear con otro servicio AWS gestionado, [ponte en contacto con el servicio de asistencia de Datadog][3] para abrir una solicitud de función.

#### Requisitos

| Tiempo de ejecución | Requisito |
| ------- | ----------- |
| Python  | Biblioteca Lambda Datadog para la capa Python v107 o posterior |

Tu definición de máquina de estado debe utilizar [JSONata][1] como lenguaje de consulta. Para habilitarlo, configura el campo `QueryLanguage` de nivel superior de tu definición como `JSONata`.

La fusión de Step Functions con trazas de Lambda mediante servicios gestionados sólo es compatible con los tiempos de ejecución Python.

#### EventBridge

Si una regla EventBridge tiene una función Lambda como objetivo, edita tu tarea EventBridge PutEvents para configurar `_datadog` en el campo `Detail` de la siguiente manera: 

{{< highlight json "hl_lines=10-10" >}}
"EventBridge PutEvents": {
  "Type": "Task",
  "Resource": "arn:aws:states:::events:putEvents",
  "Arguments": {
    "Entries": [
      {
        "Detail": {
          "Message": "Hello from Step Functions!",
          "TaskToken": "{% $states.context.Task.Token %}",
          "_datadog": "{% ($execInput := $exists($states.context.Execution.Input.BatchInput) ? $states.context.Execution.Input.BatchInput : $states.context.Execution.Input; $hasDatadogTraceId := $exists($execInput._datadog.`x-datadog-trace-id`); $hasDatadogRootExecutionId := $exists($execInput._datadog.RootExecutionId); $ddTraceContext := $hasDatadogTraceId ? {'x-datadog-trace-id': $execInput._datadog.`x-datadog-trace-id`, 'x-datadog-tags': $execInput._datadog.`x-datadog-tags`} : {'RootExecutionId': $hasDatadogRootExecutionId ?  $execInput._datadog.RootExecutionId : $states.context.Execution.Id}; $sfnContext := $merge([$states.context, {'Execution': $sift($states.context.Execution, function($v, $k) { $k != 'Input' })}]); $merge([$sfnContext, $ddTraceContext, {'serverless-version': 'v1'}])) %}"
        },
        "DetailType": "MyDetailType",
        "EventBusName": "MyEventBusName",
        "Source": "MySource"
      }
    ]
  }
}
{{< /highlight >}}

#### SQS

Si una cola SQS tiene un activador Lambda, edita tu tarea SQS SendMessage para configurar `_datadog` en el campo `MessageAttributes` de la siguiente manera: 

{{< highlight json "hl_lines=8-11" >}}
"SQS SendMessage": {
  "Type": "Task",
  "Resource": "arn:aws:states:::sqs:sendMessage",
  "Arguments": {
    "MessageBody": "{% $states.input %}",
    "QueueUrl": "https://sqs.<REGION>.amazonaws.com/<ACCOUNT_ID>/<QUEUE_NAME>",
    "MessageAttributes": {
      "_datadog": {
        "DataType": "String",
        "StringValue": "{% ($execInput := $exists($states.context.Execution.Input.BatchInput) ? $states.context.Execution.Input.BatchInput : $states.context.Execution.Input; $hasDatadogTraceId := $exists($execInput._datadog.`x-datadog-trace-id`); $hasDatadogRootExecutionId := $exists($execInput._datadog.RootExecutionId); $ddTraceContext := $hasDatadogTraceId ? {'x-datadog-trace-id': $execInput._datadog.`x-datadog-trace-id`, 'x-datadog-tags': $execInput._datadog.`x-datadog-tags`} : {'RootExecutionId': $hasDatadogRootExecutionId ?  $execInput._datadog.RootExecutionId : $states.context.Execution.Id}; $sfnContext := $merge([$states.context, {'Execution': $sift($states.context.Execution, function($v, $k) { $k != 'Input' })}]); $merge([$sfnContext, $ddTraceContext, {'serverless-version': 'v1'}])) %}"
      }
    }
  }
}
{{< /highlight >}}

#### SNS

Si hay una suscripción Lambda en el tema, edita la tarea SNS Publish Task para configurar `_datadog` en el campo `MessageAttributes` de la siguiente manera:

{{< highlight json "hl_lines=8-11" >}}
"SNS Publish": {
  "Type": "Task",
  "Resource": "arn:aws:states:::sns:publish",
  "Arguments": {
    "TopicArn": "arn:aws:sns:<REGION>:<ACCOUNT_ID>:<TOPIC_NAME>",
    "Message": "{% $states.input %}",
    "MessageAttributes": {
      "_datadog": {
        "DataType": "String",
        "StringValue": "{% ($execInput := $exists($states.context.Execution.Input.BatchInput) ? $states.context.Execution.Input.BatchInput : $states.context.Execution.Input; $hasDatadogTraceId := $exists($execInput._datadog.`x-datadog-trace-id`); $hasDatadogRootExecutionId := $exists($execInput._datadog.RootExecutionId); $ddTraceContext := $hasDatadogTraceId ? {'x-datadog-trace-id': $execInput._datadog.`x-datadog-trace-id`, 'x-datadog-tags': $execInput._datadog.`x-datadog-tags`} : {'RootExecutionId': $hasDatadogRootExecutionId ?  $execInput._datadog.RootExecutionId : $states.context.Execution.Id}; $sfnContext := $merge([$states.context, {'Execution': $sift($states.context.Execution, function($v, $k) { $k != 'Input' })}]); $merge([$sfnContext, $ddTraceContext, {'serverless-version': 'v1'}])) %}"
      }
    }
  }
}
{{< /highlight >}}

## Fusionar trazas de Step Functions con trazas de Step Functions anidadas

### Con JSONata

Edita la tarea Step Functions para configurar `_datadog` en el campo `Input` de la siguiente manera: 

{{< highlight json "hl_lines=7-7" >}}
"Step Functions StartExecution": {
  "Type": "Task",
  "Resource": "arn:aws:states:::states:startExecution.sync:2",
  "Arguments": {
    "StateMachineArn": "arn:aws:states:<REGION>:<ACCOUNT_ID>:stateMachine:<STATE_MACHINE_NAME>",
    "Input": {
      "_datadog": "{% ($execInput := $exists($states.context.Execution.Input.BatchInput) ? $states.context.Execution.Input.BatchInput : $states.context.Execution.Input; $hasDatadogTraceId := $exists($execInput._datadog.`x-datadog-trace-id`); $hasDatadogRootExecutionId := $exists($execInput._datadog.RootExecutionId); $ddTraceContext := $hasDatadogTraceId ? {'x-datadog-trace-id': $execInput._datadog.`x-datadog-trace-id`, 'x-datadog-tags': $execInput._datadog.`x-datadog-tags`} : {'RootExecutionId': $hasDatadogRootExecutionId ?  $execInput._datadog.RootExecutionId : $states.context.Execution.Id}; $sfnContext := $merge([$states.context, {'Execution': $sift($states.context.Execution, function($v, $k) { $k != 'Input' })}]); $merge([$sfnContext, $ddTraceContext, {'serverless-version': 'v1'}])) %}"
    }
  }
}
{{< /highlight >}}

### Con JSONPath

Configura tu tarea según el siguiente ejemplo:

{{< highlight json "hl_lines=9-13" >}}
"Step Functions StartExecution": {
  "Type": "Task",
  "Resource": "arn:aws:states:::states:startExecution",
  "Parameters": {
    "StateMachineArn": "${stateMachineArn}",
    "Input": {
      "StatePayload": "Hello from Step Functions!",
      "CONTEXT": {
        "Execution.$": "$$.Execution",
        "State.$": "$$.State",
        "StateMachine.$": "$$.StateMachine"
      }
    }
  },
  "End": true
}
{{< /highlight >}}

## Fusionar trazas de Lambda con trazas de Step Functions descendentes

Sigue estas instrucciones si una función Lambda invoca directamente una Step Function utilizando `StartExecution` o `StartSyncExecution`.

### Requisitos
| Tiempo de ejecución | Requisito |
| ------- | ----------- |
| Node.js | Biblioteca Lambda Datadog para la capa Node.js v112 o posterior **o** `dd-trace-js` v3.58.0, v4.37.0, o v5.13.0 o posterior |
| Python  | Biblioteca Lambda Datadog para la capa Python v99 o posterior **o** `dd-trace-py` v2.13.0 o posterior |
| Java | `dd-trace-java` v1.47.0 o posterior |
| .NET | `dd-trace-dotnet` v3.11.0 o posterior |

### Configuración

Si se cumplen los requisitos de la capa o de la versión del rastreador, no es necesaria ninguna otra configuración.

<div class="alert alert-info">Para garantizar la correcta fusión de las trazas, proporciona la entrada al comando Start Execution de Step Functions, incluso si la entrada es un objeto JSON vacío.</div>

[1]: /es/serverless/step_functions/installation
[2]: /es/serverless/aws_lambda/installation
[3]: /es/help