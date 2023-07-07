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

### Prerequisites
* States must last less than 15 minutes for full traces.
* _Recommended_: Node.JS and Python runtimes are supported for associated Lambda tracing.

## Instrumentation

{{< tabs >}}
{{% tab "Serverless Plugin" %}}

1. Install the [Datadog Serverless Plugin][1]:

    ```shell
    serverless plugin install --name serverless-plugin-datadog
    ```
    <!-- gdoc sends you to full instructions on instrumenting each language. is the serverless plugin install step the only thing required here? -->
2. Ensure you have deployed the [Datadog Log Forwarder][2] for AWS and are sending all Step Function Logs.
    <!-- what part of this is necessary? -->
3. Update your `serverless.yml`:

    ```yaml
    custom:
      datadog:
        site: <DATADOG_SITE>
        apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
        forwarderArn: arn:aws:lambda:sa-east-1:425362996713:function:step-functions-tracing-forwarder-self-monitoring-us1-prod
          subscribeToStepFunctionLogs: true
    ```
    - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (ensure the correct SITE is selected on the right).
    - Replace `<DATADOG_API_KEY_SECRET_ARN>` with the ARN of the AWS secret where your [Datadog API key][3] is securely stored. The key needs to be stored as a plaintext string (not a JSON blob). The `secretsmanager:GetSecretValue` permission is required. For quick testing, you can instead use `apiKey` and set the Datadog API key in plaintext.
    - The `forwarderArn` value... 
    <!-- tk -->
    - Set `subscribeToStepFunctionLogs` to true to...
    <!-- more clarity here -->

    For more information and additional settings, see the [plugin documentation][1].
4. Enable tracing on your Step Functions. Set the environment variable `DD_TRACE_ENABLED` to `true`.
<!-- more here -->
5. Ensure your Step Functions have linked Lambda traces.
<!-- how to link to this? how much manual setup is required here? does it always have to be a linked Lambda trace? -->

[1]: https://docs.datadoghq.com/serverless/libraries_integrations/plugin/
[2]: /logs/guide/forwarder/
[3]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{% tab "Datadog CLI" %}}
1. Install the [Datadog Serverless CLI][1].

   ```shell
   npm install -g @datadog/datadog-ci
   ```
2. Ensure you have deployed the [Datadog Log Forwarder][2] for AWS and are sending all Step Function Logs.
3. Enable tracing on your Step Functions. Set the environment variable `DD_TRACE_ENABLED` to `true`.
4. Instrument your Step Functions.

   ```shell
   datadog-ci stepfunctions instrument --step-function <STEP_FUNCTION_ARN> --forwarder <FORWARDER_ARN>
   ```
   - Replace `<STEP_FUNCTION_ARN>` with...
   - Replace `<FORWARDER_ARN>` with...

For more information about the `datadog-ci stepfunctions` command, see the [documentation][3].

5. Ensure your Step Functions have linked Lambda traces.
<!-- how to link to this? how much manual setup is required here? does it always have to be a linked Lambda trace? -->

[1]: /serverless/libraries_integrations/cli/
[2]: /logs/guide/forwarder/
[3]: https://github.com/DataDog/datadog-ci/blob/master/src/commands/stepfunctions/README.md
{{% /tab %}}
{{% tab "Custom" %}}

{{% /tab %}}
{{< /tabs >}}

## What's next?