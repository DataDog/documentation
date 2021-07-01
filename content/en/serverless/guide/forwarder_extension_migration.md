---
title: Migrating from the Datadog Forwarder to the Datadog Lambda Extension
kind: guide
---

The [Datadog Lambda Extension][1] is a lightweight version of the Datadog Agent built to run alongside your code with minimal performance overhead. 

This guide explains why you may wish to migrate from the [Datadog Forwarder][2] to the Datadog Lambda Extension, as well as how to go about migration.

## Should I migrate to the Datadog Lambda Extension?

### Advantages

The Datadog Lambda Extension offers the following advantages over the Datadog Forwarder:

- **Cost savings**: The Forwarder converts metrics and traces to logs, which are then sent to Datadog. The Datadog Lambda Extension sends traces, metrics, and logs directly to Datadog, which diminishes the expense of CloudWatch Logs.
- **Lower latency**: The Datadog Lambda Extension runs as a background task in a sidecar (similar to the Agent sidecar in container-based environments). As a result, the extension does not impact the latency of customer code.

### Trade-offs

Migration from the Forwarder to the Extension can be an involved process. There is one Forwarder setup per region and account, but there is one Extension setup **per function**. That is, if you are shipping data from *N* functions using the Forwarder, you must set up the Extension *N* times before the migration is complete. Since you must reconfigure and redeploy **each** function, the full process of migration may take some time.

If this is a significant deterrent to migration, but you still wish to benefit from the advantages of the Datadog Lambda Extension, you may consider a [hybrid approach](#hybrid-approach).

## How to migrate from the Forwarder to the Extension

Datadog recommends that you set up the Extension **before** removing the Forwarder. This means that for the period during which both the Extension and Forwarder are active, all telemetry is sent twice. The alternative (removing the Forwarder before setting up the Extension) results in a period of zero visibility. Depending on your organization's particular needs, you may prefer one outcome over the other.

### Setting up the Datadog Lambda Extension {#extension-setup}

{{< tabs >}}
{{% tab "Lambda Layer" %}}

1. Instrument your [Python][1] or [Node.js][2] application by installing the Datadog Lambda Library.

2. Add the Lambda Layer for the Datadog extension to your AWS Lambda function with the following ARN:

    ```
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:<EXTENSION_VERSION>
    ```

    Replace the placeholder values in the ARN as follows:
    - Replace `<AWS_REGION>` with the same AWS region as your Lambda Function, for example, `us-east-1`.
    - Replace `<EXTENSION_VERSION>` with the version of the Datadog Lambda Extension you would like to use, for example `7`. You can identify the current version by viewing the newest image tags in the [Amazon ECR repository][3].

    **Note**: This Layer is separate from the Datadog Lambda Library. If you installed the Datadog Lambda Library as a Lambda Layer,
    your function should now have two Lambda Layers attached.

3. Add the environment variable `DD_API_KEY` and set the value to your Datadog API key on the [API Management page][4]. 

4. Reference the [sample code][5] to submit a custom metric.

[1]: /serverless/installation/python
[2]: /serverless/installation/nodejs
[3]: https://gallery.ecr.aws/datadog/lambda-extension
[4]: https://app.datadoghq.com/account/settings#api
[5]: /serverless/custom_metrics#custom-metrics-sample-code

{{% /tab %}}
{{% tab "Container Image" %}}

. Install the Datadog Lambda Library by following the installation instructions for [Python][1] or [Node.js][2]. Use the installation instructions specifically for functions deployed as container images.

2. Add the Datadog Lambda Extension to your container image by adding the following to your Dockerfile:

```
COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/extensions/ /opt/extensions
```

Replace `<TAG>` with either a specific version number (for example, `7`) or with `latest`. You can see a complete list of possible tags in the [Amazon ECR repository][3].

3. Add the environment variable `DD_API_KEY` and set the value to your Datadog API key on the [API Management page][4]. 

4. Reference the [sample code][5] to submit a custom metric.

[1]: /serverless/installation/python
[2]: /serverless/installation/nodejs
[3]: https://gallery.ecr.aws/datadog/lambda-extension
[4]: https://app.datadoghq.com/account/settings#api
[5]: /serverless/custom_metrics#custom-metrics-sample-code

{{% /tab %}}
{{< /tabs >}}

For more information, see the [Datadog Lambda Extension documentation][1].

### Removing the Datadog Forwarder

Remove subscriptions (TK)

#### Prevent the Forwarder from attaching to new functions {#prevent-forwarder}

When you deploy a new function, the Datadog Forwarder detects an unsubscribed function and automatically creates a new subscription. Depending on whether the Forwarder was configured automatically or manually, complete the following steps:

{{< tabs >}}
{{% tab "Automatic" %}}

tk

{{% /tab %}}
{{% tab "Manual" %}}

1. Remove the resource name of the Forwarder from your `serverless.yaml` file.
2. Redeploy your cloud permissions stack.

{{% /tab %}}
{{< /tabs >}}

For more information, see the [Datadog Forwarder documentation][2].

### Hybrid approach

You may also wish to keep using the Datadog Forwarder for existing functions while using the Datadog Lambda Extension for all new functions. 

1. Ensure that the Forwarder [does not attach automatically](#prevent-forwarder) to new functions.
2. For each new function you deploy, [set up the Extension](#extension-setup)

## Troubleshooting

tk

[1]: /serverless/libraries_integrations/extension/
[2]: /serverless/libraries_integrations/forwarder/
