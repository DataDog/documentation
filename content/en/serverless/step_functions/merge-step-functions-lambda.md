---
title: Merge Step Functions and Lambda Traces
further_reading:
    - link: '/serverless/step_functions/installation'
      tag: 'Documentation'
      text: 'Install Serverless Monitoring for AWS Step Functions'
---

This page describes how to merge your AWS Step Functions traces with related AWS Lambda traces and Step Functions traces. These instructions assume that you have already instrumented these [AWS Step Functions][1] and [Lambda functions][2] to send traces to Datadog.

<div class="alert alert-info">Datadog recommends using <a href="https://docs.aws.amazon.com/step-functions/latest/dg/transforming-data.html"><code>JSONata</code></a> to define your Step Function definitions for the most complete end-to-end tracing experience. This approach ensures that any context upstream to the Step Function is preserved and passed down.</div>

## Merge Step Functions traces with downstream Lambda traces

### With JSONata

#### Requirements

| Runtime | Requirement |
| ------- | ----------- |
| Node.js | Datadog Lambda Library for Node.js layer v116+ |
| Python  | Datadog Lambda Library for Python layer v103+ |
| Other | Datadog Extension v75+ |

Your State Machine definition must use `JSONata` as the query language. To enable this, set your definition's top-level `QueryLanguage` field to `JSONata`.

#### Setup

On the Lambda Task, set the `Payload` in the `Arguments` field as follows:

{{< highlight json "hl_lines=7-7" >}}
"Lambda Invoke": {
  "Type": "Task",
  "Resource": "arn:aws:states:::lambda:invoke",
  "Output": "{% $states.result.Payload %}",
  "Arguments": {
    "FunctionName": "MyFunctionName",
    "Payload": "{% ($ddctx := ($states.context.**._datadog)[0]; $maybeSnsCtx := ($parse($parse(($states.context.**.body)[0]).**._datadog.Value))[0]; $ddctx := $exists($maybeSnsCtx) ? $maybeSnsCtx : $ddctx; $ddTraceContext := $exists($ddctx.`x-datadog-trace-id`) ? {'x-datadog-trace-id': $ddctx.`x-datadog-trace-id`, 'x-datadog-tags': $ddctx.`x-datadog-tags`} : {'RootExecutionId': $exists($ddctx.RootExecutionId) ? $ddctx.RootExecutionId : $states.context.Execution.Id}; $sfnContext := $merge([$states.context, {'Execution': $sift($states.context.Execution, function($v, $k) { $k != 'Input' })}]); $merge([$sfnContext, $ddTraceContext, {'serverless-version': 'v1'}])) %}"
  }
}
{{< /highlight >}}

The `JSONata` expression merges the upstream service's context with the current Step Functions context object and the Lambda state's input payload.

Alternatively, if you have business logic defined in the payload, you can replace `$states.input` at the end of the `JSONata` expression with your intended value for the `Payload` key.

### With JSONPath

#### Requirements
| Runtime | Requirement |
| ------- | ----------- |
| Node.js | Datadog Lambda Library for Node.js layer v112+ |
| Python  | Datadog Lambda Library for Python layer v95+ |

Your State Machine definition is using `JSONPath`. If your definition's top-level `QueryLanguage` field is omitted, it defaults to `JSONPath`.

#### Setup

{{< tabs >}}
{{% tab "Serverless Framework" %}}
1. If you have not already, install the [Datadog Serverless Framework Plugin][4] v5.40.0+:

    ```shell
    serverless plugin install --name serverless-plugin-datadog
    ```

2. Ensure you have deployed the [Datadog Lambda Forwarder][5], a Lambda function that ships logs from AWS to Datadog, and that you are using v3.130.0+. You might need to [update your Forwarder][6].

   Take note of your Forwarder's ARN.

3. Add the following to your `serverless.yml`:

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

    - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (ensure the correct SITE is selected on the right).
    - Replace `<DATADOG_API_KEY_SECRET_ARN>` with the ARN of the AWS secret where your [Datadog API key][7] is securely stored. The key needs to be stored as a plaintext string (not a JSON blob). The `secretsmanager:GetSecretValue` permission is required. For testing, you can instead use `apiKey` and set the Datadog API key in plaintext.
    - Replace `<FORWARDER_ARN>` with the ARN of your Datadog Lambda Forwarder. This step configures the log stream subscription for the Forwarder. Ensure that the Step Function log group name begins with `/aws/vendedlogs/states/`. If it does not, you must set it up manually.

    For additional settings, see [Datadog Serverless Framework Plugin - Configuration parameters][8].


[4]: https://docs.datadoghq.com/help/
[5]: /serverless/libraries_integrations/plugin/
[6]: /logs/guide/forwarder/
[7]: /logs/guide/forwarder/?tab=cloudformation#upgrade-to-a-new-version
[8]: https://app.datadoghq.com/organization-settings/api-keys
[9]: https://github.com/datadog/serverless-plugin-datadog?tab=readme-ov-file#configuration-parameters

{{% /tab %}}
{{% tab "Datadog CLI" %}}

1. If you have not already, install the [Datadog CLI][9] v2.18.0+.

   ```shell
   npm install -g @datadog/datadog-ci
   ```
2. Ensure you have deployed the [Datadog Lambda Forwarder][10], a Lambda function that ships logs from AWS to Datadog, and that you are using v3.130.0+. You may need to [update your Forwarder][11].

   Take note of your Forwarder's ARN.
3. Instrument your Step Function.

   ```shell
   datadog-ci stepfunctions instrument \
    --step-function <STEP_FUNCTION_ARN> \
    --forwarder <FORWARDER_ARN> \
    --env <ENVIRONMENT> \
    --propagate-upstream-trace \
    --merge-step-function-and-lambda-traces
   ```
   - Replace `<STEP_FUNCTION_ARN>` with the ARN of your Step Function. Repeat the `--step-function` flag for each Step Function you wish to instrument.
   - Replace `<FORWARDER_ARN>` with the ARN of your Datadog Lambda Forwarder, as noted previously. This step configures the log stream subscription for the Forwarder. Ensure that the Step Function log group name begins with "/aws/vendedlogs/states/". If it does not, you will need to set it up manually.
   - Replace `<ENVIRONMENT>` with the environment tag you would like to apply to your Step Functions.

   For more information about the `datadog-ci stepfunctions` command, see the [Datadog CLI documentation][12].


[10]: /serverless/libraries_integrations/cli/
[11]: /logs/guide/forwarder/
[12]: /logs/guide/forwarder/?tab=cloudformation#upgrade-to-a-new-version
[13]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-stepfunctions#readme

{{% /tab %}}
{{% tab "AWS CDK" %}}

Modify your Lambda task payload or Step Function task input.

**Example**:

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

For additional code examples in TypeScript and Go, see [CDK Examples for Instrumenting AWS Step Functions][13].

[14]: /serverless/guide/step_functions_cdk
{{% /tab %}}
{{% tab "Custom" %}}

On the Lambda Task, set the `Parameters` key as follows:

```json
"Parameters": {
  "Payload.$": "States.JsonMerge($$, $, false)",
  ...
}
```

The `JsonMerge` [intrinsic function][15] merges the [Step Functions context object][16] (`$$`) with the original Lambda's input payload (`$`). Fields of the original payload overwrite the Step Functions context object if their keys are the same.

**Example**:

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

Alternatively, if you have business logic defined in the payload, you can also use the following format:

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

### Through managed services

Requests between Step Functions and Lambdas can be traced through many AWS managed services, including SNS, SQS, and EventBridge. To trace through another managed AWS service, [contact Datadog Support][3] to open a feature request.

#### Requirements

| Runtime | Requirement                                    |
| ------- |------------------------------------------------|
| Python  | Datadog Lambda Library for Python layer v107+  |
| Node.js | Datadog Lambda Library for Node.js layer v128+ |

Your State Machine definition must use [JSONata][1] as the query language. To enable this, set your definition's top-level `QueryLanguage` field to `JSONata`.

Only Python and Node.js runtimes are supported for merging Step Functions with Lambda traces through managed services.

#### EventBridge

If an EventBridge rule has a Lambda function as a target, edit your EventBridge PutEvents Task to set `_datadog` in the `Detail` field as follows:

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
          "_datadog": "{% ($ddctx := ($states.context.**._datadog)[0]; $maybeSnsCtx := ($parse($parse(($states.context.**.body)[0]).**._datadog.Value))[0]; $ddctx := $exists($maybeSnsCtx) ? $maybeSnsCtx : $ddctx; $ddTraceContext := $exists($ddctx.`x-datadog-trace-id`) ? {'x-datadog-trace-id': $ddctx.`x-datadog-trace-id`, 'x-datadog-tags': $ddctx.`x-datadog-tags`} : {'RootExecutionId': $exists($ddctx.RootExecutionId) ? $ddctx.RootExecutionId : $states.context.Execution.Id}; $sfnContext := $merge([$states.context, {'Execution': $sift($states.context.Execution, function($v, $k) { $k != 'Input' })}]); $merge([$sfnContext, $ddTraceContext, {'serverless-version': 'v1'}])) %}"
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

If an SQS queue has a Lambda trigger, edit your SQS SendMessage Task to set `_datadog` in the `MessageAttributes` field as follows:

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
        "StringValue": "{% ($ddctx := ($states.context.**._datadog)[0]; $maybeSnsCtx := ($parse($parse(($states.context.**.body)[0]).**._datadog.Value))[0]; $ddctx := $exists($maybeSnsCtx) ? $maybeSnsCtx : $ddctx; $ddTraceContext := $exists($ddctx.`x-datadog-trace-id`) ? {'x-datadog-trace-id': $ddctx.`x-datadog-trace-id`, 'x-datadog-tags': $ddctx.`x-datadog-tags`} : {'RootExecutionId': $exists($ddctx.RootExecutionId) ? $ddctx.RootExecutionId : $states.context.Execution.Id}; $sfnContext := $merge([$states.context, {'Execution': $sift($states.context.Execution, function($v, $k) { $k != 'Input' })}]); $merge([$sfnContext, $ddTraceContext, {'serverless-version': 'v1'}])) %}"
      }
    }
  }
}
{{< /highlight >}}

#### SNS

If there is a Lambda subscription on the topic, edit the SNS Publish Task to set `_datadog` in the `MessageAttributes` field as follows:

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
        "StringValue": "{% ($ddctx := ($states.context.**._datadog)[0]; $maybeSnsCtx := ($parse($parse(($states.context.**.body)[0]).**._datadog.Value))[0]; $ddctx := $exists($maybeSnsCtx) ? $maybeSnsCtx : $ddctx; $ddTraceContext := $exists($ddctx.`x-datadog-trace-id`) ? {'x-datadog-trace-id': $ddctx.`x-datadog-trace-id`, 'x-datadog-tags': $ddctx.`x-datadog-tags`} : {'RootExecutionId': $exists($ddctx.RootExecutionId) ? $ddctx.RootExecutionId : $states.context.Execution.Id}; $sfnContext := $merge([$states.context, {'Execution': $sift($states.context.Execution, function($v, $k) { $k != 'Input' })}]); $merge([$sfnContext, $ddTraceContext, {'serverless-version': 'v1'}])) %}"
      }
    }
  }
}
{{< /highlight >}}

## Merge Step Functions traces with nested Step Functions traces

### With JSONata

Edit the Step Functions Task to set `_datadog` in the `Input` field as follows:

{{< highlight json "hl_lines=7-7" >}}
"Step Functions StartExecution": {
  "Type": "Task",
  "Resource": "arn:aws:states:::states:startExecution.sync:2",
  "Arguments": {
    "StateMachineArn": "arn:aws:states:<REGION>:<ACCOUNT_ID>:stateMachine:<STATE_MACHINE_NAME>",
    "Input": {
      "_datadog": "{% ($ddctx := ($states.context.**._datadog)[0]; $maybeSnsCtx := ($parse($parse(($states.context.**.body)[0]).**._datadog.Value))[0]; $ddctx := $exists($maybeSnsCtx) ? $maybeSnsCtx : $ddctx; $ddTraceContext := $exists($ddctx.`x-datadog-trace-id`) ? {'x-datadog-trace-id': $ddctx.`x-datadog-trace-id`, 'x-datadog-tags': $ddctx.`x-datadog-tags`} : {'RootExecutionId': $exists($ddctx.RootExecutionId) ? $ddctx.RootExecutionId : $states.context.Execution.Id}; $sfnContext := $merge([$states.context, {'Execution': $sift($states.context.Execution, function($v, $k) { $k != 'Input' })}]); $merge([$sfnContext, $ddTraceContext, {'serverless-version': 'v1'}])) %}"
    }
  }
}
{{< /highlight >}}

### With JSONPath

Configure your task according to the following example:

{{< highlight json "hl_lines=8-12" >}}
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

## Merge Lambda traces with downstream Step Functions traces

Traces can be connected downstream from Lambda functions when called directly using `StartExecution` or `StartSyncExecution`, or when called indirectly through managed services like SNS, SQS, or EventBridge.

### Requirements
| Runtime | Requirement |
| ------- | ----------- |
| Node.js | Datadog Lambda Library for Node.js layer v112+ **or** `dd-trace-js` v3.58.0, v4.37.0, or v5.13.0+ |
| Python  | Datadog Lambda Library for Python layer v99+ **or** `dd-trace-py` v2.13.0+ |
| Java | `dd-trace-java` v1.47.0+ |
| .NET | `dd-trace-dotnet` v3.11.0+ |

### Setup

If the layer or tracer version requirements are fulfilled, no further setup is required.

<div class="alert alert-info">To ensure proper trace merging, provide input to the Step Functions Start Execution command, even if the input is an empty JSON object.</div>

## Merge Step Functions traces with other services

For services not covered in this guide, you can merge traces by manually propagating [Datadog trace context][3].

### Upstream services to Step Functions

Include trace context in the Step Function input payload as JSON under the `_datadog` key, which can be located anywhere in the payload.
- The context object must contain the `x-datadog-trace-id` and `x-datadog-parent-id` keys.
- The `x-datadog-tags` key is optional and is used to pass additional tags.

{{< highlight json >}}
"_datadog": {
  "x-datadog-trace-id": "280166049706551372",
  "x-datadog-parent-id": "611647714644695775",
  "x-datadog-tags": "_dd.p.tid=66bcb5eb00000000,_dd.p.dm=-0"
}
{{< /highlight >}}

### Step Functions to downstream services

Add Step Function execution context to your task definitions using the patterns described above in the [propagating traces to Lambda via Managed Services][4] section. Additional configuration of the downstream service may be required.

For assistance with custom integrations, [contact Datadog Support][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/step_functions/installation
[2]: /serverless/aws_lambda/installation
[3]: /tracing/trace_collection/trace_context_propagation/?tab=java#datadog-format
[4]: #through-managed-services
[5]: /help
