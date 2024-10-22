---
title: Link Step Functions and Lambda Traces
further_reading:
    - link: '/serverless/step_functions/installation'
      tag: 'Documentation'
      text: 'Install Serverless Monitoring for AWS Step Functions'
---

This page describes how to link your AWS Step Function traces with related AWS Lambda traces.

### Requirements
- Node.js (layer v112+) or Python (layer v95+) runtimes
- You have [instrumented your AWS Lambda functions][1] to send traces to Datadog
- You have [instrumented your AWS Step Functions][2] to send traces to Datadog

## Setup

{{< tabs >}}
{{% tab "Serverless Framework" %}}

In your `serverless.yaml` file, set `mergeStepFunctionAndLambdaTraces` to `true`:

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

```shell
datadog-ci stepfunctions instrument \
 --step-function <STEP_FUNCTION_ARN> \
 --forwarder <FORWARDER_ARN> \
 --env <ENVIRONMENT> \
 --propagate-upstream-trace \
 --merge-step-function-and-lambda-traces
```

{{% /tab %}}
{{% tab "Custom" %}}

On the Lambda Task, set the `Parameters` key with the following: 

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

Alternatively, if you have business logic defined in the payload, you can also use the following:

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

[1]: /serverless/installation/#installation-instructions
[2]: /serverless/step_functions/installation