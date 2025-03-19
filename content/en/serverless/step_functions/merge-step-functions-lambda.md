---
title: Merge Step Functions and Lambda Traces
further_reading:
    - link: '/serverless/step_functions/installation'
      tag: 'Documentation'
      text: 'Install Serverless Monitoring for AWS Step Functions'
---

This page describes how to merge your AWS Step Functions traces with related AWS Lambda traces or nested Step Functions traces. These instructions assume that you have already instrumented these [AWS Step Functions][1] and [Lambda functions][2] to send traces to Datadog.

<div class="alert alert-info">Datadog recommends using <code>JSONata</code> to define your Step Function definitions for the most complete end-to-end tracing experience. This approach will ensure that any context upstream to the Step Function will be preserved and passed down. If you are using <code>JSONPath</code> to define your Step Function definitions, see the below sections for supported configurations</a>.</div>

## Merge with downstream Lambda traces

### Requirements
For Node.js: Datadog Lambda Library for Node.js layer v116+.

For Python: Datadog Lambda Library for Python layer v103+.

For other runtimes: Datadog Extension v75+.

Your State Machine Definition must be using [JSONata][3] as the query language. This can be enabled by setting `"QueryLanguage": "JSONata"` at the top-level of the State Machine Definition.

### Setup

On the Lambda Task, set the `Payload` in the `Arguments` field as follows: 

{{< highlight json "hl_lines=7-7" >}}
"Lambda Invoke": {
  "Type": "Task",
  "Resource": "arn:aws:states:::lambda:invoke",
  "Output": "{% $states.result.Payload %}",
  "Arguments": {
    "FunctionName": "MyFunctionName",
    "Payload": "{% ($execInput := $states.context.Execution.Input; $hasDatadogTraceId := $exists($execInput._datadog.`x-datadog-trace-id`); $hasDatadogRootExecutionId := $exists($execInput._datadog.RootExecutionId); $ddTraceContext := $hasDatadogTraceId ? {'x-datadog-trace-id': $execInput._datadog.`x-datadog-trace-id`, 'x-datadog-tags': $execInput._datadog.`x-datadog-tags`} : {'RootExecutionId': $hasDatadogRootExecutionId ? $execInput._datadog.RootExecutionId : $states.context.Execution.Id}; $sfnContext := $merge([$states.context, {'Execution': $sift($states.context.Execution, function($v, $k) { $k != 'Input' })}]); $merge([$states.input, {'_datadog': $merge([$sfnContext, $ddTraceContext, {'serverless-version': 'v1'}])}])) %}"
  }
}
{{< /highlight >}}

The `JSONata` expression merges the upstream service's context with the current Step Functions context object and the Lambda state's input payload.

Alternatively, if you have business logic defined in the payload, you can replace `$states.input` at the end of the `JSONata` expression with your intended value for the `Payload` key.

[1]: /serverless/step_functions/installation
[2]: /serverless/aws_lambda/installation
[3]: https://docs.aws.amazon.com/step-functions/latest/dg/transforming-data.html

## Merge with nested Step Functions traces

### Setup

On the Step Functions Task, set `_datadog` in the `Input` field as follows: 

{{< highlight json "hl_lines=7-7" >}}
"Step Functions StartExecution": {
  "Type": "Task",
  "Resource": "arn:aws:states:::states:startExecution.sync:2",
  "Arguments": {
    "StateMachineArn": "arn:aws:states:<REGION>:<ACCOUNT_ID>:stateMachine:<STATE_MACHINE_NAME>",
    "Input": {
      "_datadog": "{% ($execInput := $states.context.Execution.Input; $hasDatadogTraceId := $exists($execInput._datadog.`x-datadog-trace-id`); $hasDatadogRootExecutionId := $exists($execInput._datadog.RootExecutionId); $ddTraceContext := $hasDatadogTraceId ? {'x-datadog-trace-id': $execInput._datadog.`x-datadog-trace-id`, 'x-datadog-tags': $execInput._datadog.`x-datadog-tags`} : {'RootExecutionId': $hasDatadogRootExecutionId ?  $execInput._datadog.RootExecutionId : $states.context.Execution.Id}; $sfnContext := $merge([$states.context, {'Execution': $sift($states.context.Execution, function($v, $k) { $k != 'Input' })}]); $merge([$sfnContext, $ddTraceContext, {'serverless-version': 'v1'}])) %}"
    }
  }
}
{{< /highlight >}}

## Merge with downstream Lambda traces through Managed Services

For cases where a Step Function is indirectly invoking a Lambda through a managed AWS service.

### Requirements
Python (layer v107+) runtimes only.

### EventBridge Setup

For cases where an EventBridge Rule has a Lambda function as a target. Also works for cases where an SQS queue is a target and that queue has a Lambda trigger.

On the EventBridge PutEvents Task, set `_datadog` in the `Detail` field as follows: 

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
          "_datadog": "{% ($execInput := $states.context.Execution.Input; $hasDatadogTraceId := $exists($execInput._datadog.`x-datadog-trace-id`); $hasDatadogRootExecutionId := $exists($execInput._datadog.RootExecutionId); $ddTraceContext := $hasDatadogTraceId ? {'x-datadog-trace-id': $execInput._datadog.`x-datadog-trace-id`, 'x-datadog-tags': $execInput._datadog.`x-datadog-tags`} : {'RootExecutionId': $hasDatadogRootExecutionId ?  $execInput._datadog.RootExecutionId : $states.context.Execution.Id}; $sfnContext := $merge([$states.context, {'Execution': $sift($states.context.Execution, function($v, $k) { $k != 'Input' })}]); $merge([$sfnContext, $ddTraceContext, {'serverless-version': 'v1'}])) %}"
        },
        "DetailType": "MyDetailType",
        "EventBusName": "MyEventBusName",
        "Source": "MySource"
      }
    ]
  }
}
{{< /highlight >}}

### SQS Setup

For cases where an SQS queue has a Lambda trigger.

On the SQS SendMessage Task, set `_datadog` in the `MessageAttributes` field as follows: 

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
        "StringValue": "{% ($execInput := $states.context.Execution.Input; $hasDatadogTraceId := $exists($execInput._datadog.`x-datadog-trace-id`); $hasDatadogRootExecutionId := $exists($execInput._datadog.RootExecutionId); $ddTraceContext := $hasDatadogTraceId ? {'x-datadog-trace-id': $execInput._datadog.`x-datadog-trace-id`, 'x-datadog-tags': $execInput._datadog.`x-datadog-tags`} : {'RootExecutionId': $hasDatadogRootExecutionId ?  $execInput._datadog.RootExecutionId : $states.context.Execution.Id}; $sfnContext := $merge([$states.context, {'Execution': $sift($states.context.Execution, function($v, $k) { $k != 'Input' })}]); $merge([$sfnContext, $ddTraceContext, {'serverless-version': 'v1'}])) %}"
      }
    }
  }
}
{{< /highlight >}}

### SNS Setup

For cases where there is a Lambda subscription on the topic. Also works for cases where there's an SQS subscription and that queue has a Lambda trigger.

On the SNS Publish Task, set `_datadog` in the `MessageAttributes` field as follows: 

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
        "StringValue": "{% ($execInput := $states.context.Execution.Input; $hasDatadogTraceId := $exists($execInput._datadog.`x-datadog-trace-id`); $hasDatadogRootExecutionId := $exists($execInput._datadog.RootExecutionId); $ddTraceContext := $hasDatadogTraceId ? {'x-datadog-trace-id': $execInput._datadog.`x-datadog-trace-id`, 'x-datadog-tags': $execInput._datadog.`x-datadog-tags`} : {'RootExecutionId': $hasDatadogRootExecutionId ?  $execInput._datadog.RootExecutionId : $states.context.Execution.Id}; $sfnContext := $merge([$states.context, {'Execution': $sift($states.context.Execution, function($v, $k) { $k != 'Input' })}]); $merge([$sfnContext, $ddTraceContext, {'serverless-version': 'v1'}])) %}"
      }
    }
  }
}
{{< /highlight >}}

## Merge Lambda traces with downstream Step Functions traces

### Requirements
For Node.js: Datadog Lambda Library for Node.js layer v112+ **or** `dd-trace-js` v3.58.0, v4.37.0, v5.13.0.

For Python: Datadog Lambda Library for Python layer v99+ **or** `dd-trace-py` v2.13.0.

For Java: `dd-trace-java` v1.47.0.

For .NET: `dd-trace-dotnet` v3.11.0.

### Setup

If the layer or tracer version requirements are fulfilled, no further setup is required.

<div class="alert alert-info">To ensure proper trace merging, provide input to the Step Functions Start Execution command, even if the input is an empty JSON object.</div>

## Merge with downstream Lambda traces (JSONPath)

### Requirements
Node.js (layer v112+) or Python (layer v95+) runtimes.

### Setup

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
    - Replace `<DATADOG_API_KEY_SECRET_ARN>` with the ARN of the AWS secret where your [Datadog API key][7] is securely stored. The key needs to be stored as a plaintext string (not a JSON blob). The `secretsmanager:GetSecretValue` permission is required. For quick testing, you can instead use `apiKey` and set the Datadog API key in plaintext.
    - Replace `<FORWARDER_ARN>` with the ARN of your Datadog Lambda Forwarder. This step configures the log stream subscription for the Forwarder. Ensure that the Step Function log group name begins with "/aws/vendedlogs/states/". If it does not, you will need to set it up manually.

    For additional settings, see [Datadog Serverless Framework Plugin - Configuration parameters][8].


[4]: /serverless/libraries_integrations/plugin/
[5]: /logs/guide/forwarder/
[6]: /logs/guide/forwarder/?tab=cloudformation#upgrade-to-a-new-version
[7]: https://app.datadoghq.com/organization-settings/api-keys
[8]: https://github.com/datadog/serverless-plugin-datadog?tab=readme-ov-file#configuration-parameters

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


[9]: /serverless/libraries_integrations/cli/
[10]: /logs/guide/forwarder/
[11]: /logs/guide/forwarder/?tab=cloudformation#upgrade-to-a-new-version
[12]: https://github.com/DataDog/datadog-ci/blob/master/src/commands/stepfunctions/README.md

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

[13]: /serverless/guide/step_functions_cdk
{{% /tab %}}
{{% tab "Custom" %}}

On the Lambda Task, set the `Parameters` key as follows: 

```json
"Parameters": {
  "Payload.$": "States.JsonMerge($$, $, false)",
  ...
}
```

The `JsonMerge` [intrinsic function][14] merges the [Step Functions context object][15] (`$$`) with the original Lambda's input payload (`$`). Fields of the original payload overwrite the Step Functions context object if their keys are the same.

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

[14]: https://docs.aws.amazon.com/step-functions/latest/dg/amazon-states-language-intrinsic-functions.html#asl-intrsc-func-json-manipulate
[15]: https://docs.aws.amazon.com/step-functions/latest/dg/input-output-contextobject.html

{{% /tab %}}
{{< /tabs >}}

## Merge with nested Step Functions traces (JSONPath)

To link your Step Function traces to nested Step Function traces, configure your task according to the following example:

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
