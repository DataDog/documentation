---
title: Merge Step Functions and Lambda Traces
further_reading:
    - link: '/serverless/step_functions/installation'
      tag: 'Documentation'
      text: 'Install Serverless Monitoring for AWS Step Functions'
---

This page describes how to merge your AWS Step Functions traces with related AWS Lambda traces or nested Step Functions traces. These instructions assume that you have already instrumented these [AWS Step Functions][1] and [Lambda functions][2] to send traces to Datadog.

<div class="alert alert-info">Datadog recommends using <code>JSONata</code> to define your Step Function payloads for the most complete end-to-end tracing experience. If you are using <code>JSONPath</code> to define your Step Function payloads, see the below sections for supported configurations</a>.</div>

## Merge upstream traces with Step Functions and downstream Lambda traces

### Requirements
Node.js (layer v116+) or Python (layer v103+) runtimes.

Your State Machine Definition must be using [JSONata][1] as the query language. This can be enabled by setting `"QueryLanguage": "JSONata"` at the top-level of the State Machine Definition.

### Setup

On the Lambda Task, set the `Arguments` key as follows: 

```json
"Arguments": {
  "Payload": "{% ($execInput := $states.context.Execution.Input; $hasDatadogTraceId := $exists($execInput._datadog.`x-datadog-trace-id`); $hasDatadogRootExecutionId := $exists($execInput._datadog.RootExecutionId); $ddTraceContext := $hasDatadogTraceId ? {'x-datadog-trace-id': $execInput._datadog.`x-datadog-trace-id`, 'x-datadog-tags': $execInput._datadog.`x-datadog-tags`} : {'RootExecutionId': $hasDatadogRootExecutionId ? $execInput._datadog.RootExecutionId : $states.context.Execution.Id}; $sfnContext := $merge([$states.context, {'Execution': $sift($states.context.Execution, function($v, $k) { $k != 'Input' })}]); $merge([$states.input, {'_datadog': $merge([$sfnContext, $ddTraceContext, {'serverless-version': 'v1'}])}])) %}",
  ...
}
```

The `JSONata` expression merges the upstream service's context with the current Step Functions context object and the Lambda state's input payload.

Alternatively, if you have business logic defined in the payload, you can replace `$states.input` at the end of the `JSONata` expression with your intended value for the `Payload` key.

[1]: https://docs.aws.amazon.com/step-functions/latest/dg/transforming-data.html

## Merge upstream traces with Step Functions and nested Step Functions traces

### Requirements
Your State Machine Definition must be using `JSONata` as the query language. This can be enabled by setting `"QueryLanguage": "JSONata"` at the top-level of the State Machine Definition.

### Setup

On the Step Functions Task, set the `_datadog` field in the `Input` key as follows: 

```json
"Arguments": {
  "Input": {
    "_datadog": "{% ($execInput := $states.context.Execution.Input; $hasDatadogTraceId := $exists($execInput._datadog.`x-datadog-trace-id`); $hasDatadogRootExecutionId := $exists($execInput._datadog.RootExecutionId); $ddTraceContext := $hasDatadogTraceId ? {'x-datadog-trace-id': $execInput._datadog.`x-datadog-trace-id`, 'x-datadog-tags': $execInput._datadog.`x-datadog-tags`} : {'RootExecutionId': $hasDatadogRootExecutionId ?  $execInput._datadog.RootExecutionId : $states.context.Execution.Id}; $sfnContext := $merge([$states.context, {'Execution': $sift($states.context.Execution, function($v, $k) { $k != 'Input' })}]); $merge([$sfnContext, $ddTraceContext, {'serverless-version': 'v1'}])) %}",
    ...
  }
}
```

## Merge Step Functions traces with downstream Lambda traces

### Requirements
Node.js (layer v112+) or Python (layer v95+) runtimes.

### Setup

{{< tabs >}}
{{% tab "Serverless Framework" %}}

1. If you have not already, install the [Datadog Serverless Framework Plugin][1] v5.40.0+:

    ```shell
    serverless plugin install --name serverless-plugin-datadog
    ```

2. Ensure you have deployed the [Datadog Lambda Forwarder][2], a Lambda function that ships logs from AWS to Datadog, and that you are using v3.130.0+. You might need to [update your Forwarder][5].

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
    - Replace `<DATADOG_API_KEY_SECRET_ARN>` with the ARN of the AWS secret where your [Datadog API key][3] is securely stored. The key needs to be stored as a plaintext string (not a JSON blob). The `secretsmanager:GetSecretValue` permission is required. For quick testing, you can instead use `apiKey` and set the Datadog API key in plaintext.
    - Replace `<FORWARDER_ARN>` with the ARN of your Datadog Lambda Forwarder. This step configures the log stream subscription for the Forwarder. Ensure that the Step Function log group name begins with "/aws/vendedlogs/states/". If it does not, you will need to set it up manually.

    For additional settings, see [Datadog Serverless Framework Plugin - Configuration parameters][7].


[1]: https://docs.datadoghq.com/serverless/libraries_integrations/plugin/
[2]: /logs/guide/forwarder/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://www.serverless.com/
[5]: /logs/guide/forwarder/?tab=cloudformation#upgrade-to-a-new-version
[6]: logs/guide/forwarder/?tab=cloudformation#installation
[7]: https://github.com/datadog/serverless-plugin-datadog?tab=readme-ov-file#configuration-parameters

{{% /tab %}}
{{% tab "Datadog CLI" %}}

1. If you have not already, install the [Datadog CLI][1] v2.18.0+.

   ```shell
   npm install -g @datadog/datadog-ci
   ```
2. Ensure you have deployed the [Datadog Lambda Forwarder][2], a Lambda function that ships logs from AWS to Datadog, and that you are using v3.130.0+. You may need to [update your Forwarder][3].

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

   For more information about the `datadog-ci stepfunctions` command, see the [Datadog CLI documentation][5].


[1]: /serverless/libraries_integrations/cli/
[2]: /logs/guide/forwarder/
[3]: /logs/guide/forwarder/?tab=cloudformation#upgrade-to-a-new-version
[4]: logs/guide/forwarder/?tab=cloudformation#installation
[5]: https://github.com/DataDog/datadog-ci/blob/master/src/commands/stepfunctions/README.md

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

[1]: /serverless/step_functions/installation
[2]: /serverless/installation/#installation-instructions
