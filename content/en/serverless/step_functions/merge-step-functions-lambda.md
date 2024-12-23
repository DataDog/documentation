---
title: Merge Step Functions and Lambda Traces
further_reading:
    - link: '/serverless/step_functions/installation'
      tag: 'Documentation'
      text: 'Install Serverless Monitoring for AWS Step Functions'
---

This page describes how to merge your AWS Step Functions traces with related AWS Lambda traces or nested Step Functions traces. These instructions assume that you have already instrumented these [AWS Step Functions][1] and [Lambda functions][2] to send traces to Datadog.

## Merge Step Functions traces with downstream Lambda traces

### Requirements
Node.js (layer v112+) or Python (layer v95+) runtimes.

### Setup

{{< tabs >}}
{{% tab "Serverless Framework" %}}

In your `serverless.yaml` file, set `mergeStepFunctionAndLambdaTraces` to `true`. For example:

{{< highlight yaml "hl_lines=8" >}}
custom:
  datadog:
    site: <DATADOG_SITE>
    apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
    forwarderArn: <FORWARDER_ARN>
    enableStepFunctionsTracing: true
    propagateUpstreamTrace: true
    mergeStepFunctionAndLambdaTraces: true
{{< /highlight >}}

{{% /tab %}}
{{% tab "Datadog CLI" %}}

Run the following `datadog-ci` command:

{{< highlight yaml "hl_lines=6" >}}
datadog-ci stepfunctions instrument \
 --step-function <STEP_FUNCTION_ARN> \
 --forwarder <FORWARDER_ARN> \
 --env <ENVIRONMENT> \
 --propagate-upstream-trace \
 --merge-step-function-and-lambda-traces
{{< /highlight >}}

The `merge-step-function-and-lambda-traces` flag lets you inject Step Functions context into downstream Lambda and Step Functions invocations.

{{% /tab %}}
{{% tab "Custom" %}}

On the Lambda Task, set the `Parameters` key as follows: 

```json
"Parameters": {
  "Payload.$": "States.JsonMerge($$, $, false)",
  ...
}
```

The `JsonMerge` [intrinsic function][1] merges the [Step Functions context object][2] (`$$`) with the original Lambda's input payload (`$`). Fields of the original payload overwrite the Step Functions context object if their keys are the same.

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

[1]: https://docs.aws.amazon.com/step-functions/latest/dg/amazon-states-language-intrinsic-functions.html#asl-intrsc-func-json-manipulate
[2]: https://docs.aws.amazon.com/step-functions/latest/dg/input-output-contextobject.html

{{% /tab %}}
{{< /tabs >}}

## Merge upstream Lambda traces with Step Functions traces

### Requirements
For Node.js: Datadog Lambda Library for Node.js layer v112+ **or** `dd-trace-js` v3.58.0, v4.37.0, v5.13.0.

For Python: Datadog Lambda Library for Python layer 99+ **or** `dd-trace-py` v2.13.0.

### Setup

If the layer or tracer version requirements are fulfilled, no further setup is required.

<div class="alert alert-info">To ensure proper trace merging, provide input to the Step Functions Start Execution command, even if the input is an empty JSON object.</div>

## Merge Step Functions traces with nested Step Functions traces

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

## Merge Lambda -> Step Functions -> Lambda

This capability is not supported.

[1]: /serverless/installation/#installation-instructions
[2]: /serverless/step_functions/installation
