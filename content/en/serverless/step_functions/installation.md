---
title: Install Serverless Monitoring for AWS Step Functions
kind: documentation
further_reading:
    - link: '/serverless/configuration/'
      tag: 'Documentation'
      text: 'Configure Serverless Monitoring'
    - link: "/integrations/amazon_lambda/"
      tag: "Documentation"
      text: "AWS Lambda Integration"
---

### Requirements
* The full Step Function execution length must be less than 90 minutes for full traces.
* Linked Lambda traces are supported for Node.js (layer v94+) and Python (layer v75+) runtimes.

AWS Step Functions Monitoring collects logs and integration metrics from the AWS integration and uses ingested logs from AWS Step Functions to generate enhanced metrics and traces for your Step Function executions.

### Setup

{{< tabs >}}
{{% tab "Serverless Framework" %}}

For developers using [Serverless Framework][4] to deploy serverless applications, use the Datadog Serverless Framework Plugin.

1. If you have not already, install the [Datadog Serverless Framework Plugin][1] v5.40.0+:

    ```shell
    serverless plugin install --name serverless-plugin-datadog
    ```

2. Ensure you have deployed the [Datadog Lambda Forwarder][2], a Lambda function that ships logs from AWS to Datadog, and that you are using v3.74.0+. You may need to [update your Forwarder][5].

   Take note of your Forwarder's ARN.

3. Add the following to your `serverless.yml`:

    ```yaml
    custom:
      datadog:
        site: <DATADOG_SITE>
        apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
        forwarderArn: <FORWARDER_ARN>
        enableStepFunctionsTracing: true
        propagateUpstreamTrace : true
    ```
    - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (ensure the correct SITE is selected on the right).
    - Replace `<DATADOG_API_KEY_SECRET_ARN>` with the ARN of the AWS secret where your [Datadog API key][3] is securely stored. The key needs to be stored as a plaintext string (not a JSON blob). The `secretsmanager:GetSecretValue` permission is required. For quick testing, you can instead use `apiKey` and set the Datadog API key in plaintext.
    - Replace `<FORWARDER_ARN>` with the ARN of your Datadog Lambda Forwarder, as noted previously.
    - `propagateUpstreamTrace`: Optional. Set to `true` to inject Step Function context into downstream Lambda and Step Function invocations

    For additional settings, see [Datadog Serverless Framework Plugin - Configuration parameters][7].

4. For Node.js and Python runtimes, set `mergeStepFunctionAndLambdaTraces:true` in your `serverless.yaml` file. This links your Step Function traces with Lambda traces. If you have not instrumented your Lambda functions to send traces, you can [follow the steps to add the Lambda layer for your preferred runtime][8].

[1]: https://docs.datadoghq.com/serverless/libraries_integrations/plugin/
[2]: /logs/guide/forwarder/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://www.serverless.com/
[5]: /logs/guide/forwarder/?tab=cloudformation#upgrade-to-a-new-version
[6]: logs/guide/forwarder/?tab=cloudformation#installation
[7]: https://github.com/datadog/serverless-plugin-datadog?tab=readme-ov-file#configuration-parameters
[8]: /serverless/installation/#installation-instructions
{{% /tab %}}
{{% tab "Datadog CLI" %}}
1. If you have not already, install the [Datadog CLI][1] v2.18.0+.

   ```shell
   npm install -g @datadog/datadog-ci
   ```
2. Ensure you have deployed the [Datadog Lambda Forwarder][2], a Lambda function that ships logs from AWS to Datadog, and that you are using v3.74.0+. You may need to [update your Forwarder][3].

   Take note of your Forwarder's ARN.
3. Instrument your Step Function.

   ```shell
   datadog-ci stepfunctions instrument \
    --step-function <STEP_FUNCTION_ARN> \
    --forwarder <FORWARDER_ARN> \
    --env <ENVIRONMENT> \
    --propagate-upstream-trace

   ```
   - Replace `<STEP_FUNCTION_ARN>` with the ARN of your Step Function. Repeat the `--step-function` flag for each Step Function you wish to instrument.
   - Replace `<FORWARDER_ARN>` with the ARN of your Datadog Lambda Forwarder, as noted previously.
   - Replace `<ENVIRONMENT>` with the environment tag you would like to apply to your Step Functions.
   - `--propagate-upstream-trace` is optional, and updates your Step Function definitions to inject Step Function context into any downstream Step Function or Lambda invocations.

   For more information about the `datadog-ci stepfunctions` command, see the [Datadog CLI documentation][5].

4. For Node.js and Python runtimes, add the flag `--merge-step-function-and-lambda-traces` in your datadog-ci command. This links your Step Function traces with Lambda traces. If you have not yet instrumented your Lambda functions to send traces, you can [follow the steps to add the Lambda layer for your preferred runtime][6].

[1]: /serverless/libraries_integrations/cli/
[2]: /logs/guide/forwarder/
[3]: /logs/guide/forwarder/?tab=cloudformation#upgrade-to-a-new-version
[4]: logs/guide/forwarder/?tab=cloudformation#installation
[5]: https://github.com/DataDog/datadog-ci/blob/master/src/commands/stepfunctions/README.md
[6]: /serverless/installation/#installation-instructions
{{% /tab %}}
{{% tab "Custom" %}}

1. Enable all logging for your Step Function. In your AWS console, open your state machine. Click *Edit* and find the Logging section. There, set *Log level* to `ALL` and enable the *Include execution data* checkbox.
   {{< img src="serverless/step_functions/aws_log.png" alt="AWS UI, Logging section, showing log level set to ALL." style="width:100%;" >}}

2. Ensure you have deployed the [Datadog Lambda Forwarder][1], a Lambda function that ships logs from AWS to Datadog, and that you are using v3.74.0+. You may need to [update your Forwarder][2].

   Take note of your Forwarder's ARN.

3. Subscribe CloudWatch logs to the Datadog Lambda Forwarder. To do this, you have two options:
   - **Datadog-AWS integration** (recommended)
     1. Ensure that you have set up the [Datadog-AWS integration][4].
     2. In Datadog, open the [AWS integration tile][5], and view the *Configuration* tab.
     3. On the left, select the AWS account where your Step Function is running. Open the *Log Collection* tab.
     4. In the *Log Autosubscription* section, under *Autosubscribe Forwarder Lambda Functions*, enter the ARN of your Datadog Lambda Forwarder, as noted previously. Click *Add*.
     5. Toggle on *Step Functions CloudWatch Logs*. Changes take 15 minutes to take effect.

     **Note**: Log Autosubscription requires your Lambda Forwarder and Step Function to be in the same region.

   - **Manual**
     1. Ensure that your log group name has the prefix `/aws/vendedlogs/states`. 
     2. Open your AWS console and go to your Datadog Lambda Forwarder. In the *Function overview* section, click on *Add trigger*.
     3. Under *Add trigger*, in the *Trigger configuration* section, use the *Select a source* dropdown to select `CloudWatch Logs`.
     4. Under *Log group*, select the log group for your state machine. For example, `/aws/vendedlogs/states/my-state-machine`.
     5. Enter a filter name. You can choose to name it "empty filter" and leave the *Filter pattern* box blank.

<div class="alert alert-warning"> If you are using a different instrumentation method such as Serverless Framework or datadog-ci, enabling autosubscription may create duplicated logs. Choose one configuration method to avoid this behavior.</a>.</div>

4. Enable enhanced metrics on your Step Function by adding a `DD_ENHANCED_METRICS` tag. Set the value to `true`. 
5. Enable tracing on your Step Function by adding a `DD_TRACE_ENABLED` tag. Set the value to `true`.
6. Set up tags. Open your AWS console and go to your Step Functions state machine. Open the *Tags* section and add `env:<ENV_NAME>` and `service:<SERVICE_NAME>` tags. The `env` tag is required to see traces in Datadog, and it defaults to `dev`. The `service` tag defaults to the state machine's name.
7. For Node.js and Python runtimes, you can link your Step Function traces to Lambda traces. On the Lambda Task, set the `Parameters` key with the following: 

   ```json
   "Parameters": {
     "Payload.$": "States.JsonMerge($$, $, false)",
     ...
   }
   ```

   The `JsonMerge` [intrinsic function][6] merges the [Step Functions context object][7] (`$$`) with the original Lambda's input payload (`$`). Fields of the original payload overwrite the Step Functions context object if their keys are the same.

**Example**:

{{< highlight json "hl_lines=4-7" >}}
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

Alternatively, if you have business logic defined in the payload, you could also use the following:

{{< highlight json "hl_lines=8-10" >}}
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

If you have not yet instrumented your Lambda functions to send traces, you can [follow the steps to add the Lambda layer for your preferred runtime][3].

[1]: /logs/guide/forwarder/
[2]: /logs/guide/forwarder/?tab=cloudformation#upgrade-to-a-new-version
[3]: /logs/guide/forwarder/?tab=cloudformation#installation
[4]: /getting_started/integrations/aws/
[5]: https://app.datadoghq.com/integrations/aws
[6]: https://docs.aws.amazon.com/step-functions/latest/dg/amazon-states-language-intrinsic-functions.html#asl-intrsc-func-json-manipulate
[7]: https://docs.aws.amazon.com/step-functions/latest/dg/input-output-contextobject.html
{{% /tab %}}
{{< /tabs >}}



## See your Step Function metrics, logs, and traces in Datadog

After you have invoked your state machine, go to the [**Serverless app**][2] in Datadog. Search for `service:<YOUR_STATE_MACHINE_NAME>` to see the relevant metrics, logs, and traces associated with that state machine. If you set the `service` tag on your state machine to a custom value, search for `service:<CUSTOM_VALUE>`.

{{< img src="serverless/step_functions/overview1.png" alt="An AWS Step Function side panel view." style="width:100%;" >}}

If you cannot see your traces, see [Troubleshooting][5].

[2]: https://app.datadoghq.com/functions?search=&cloud=aws&entity_view=step_functions
[3]: /serverless/installation/#installation-instructions
[5]: /serverless/step_functions/troubleshooting
