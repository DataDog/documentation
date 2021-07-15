---
title: Migrating from the Datadog Forwarder to the Datadog Lambda Extension
kind: guide
---

The [Datadog Lambda Extension][1] is a lightweight version of the Datadog Agent built to run alongside your code with minimal performance overhead. 

This guide explains why you may wish to migrate from the [Datadog Forwarder][2] to the Datadog Lambda Extension, as well as how to go about migration.

## Should I migrate to the Datadog Lambda Extension?

### Advantages

The Datadog Lambda Extension offers the following advantages over the Datadog Forwarder:

- **Cost savings**: The Forwarder converts logs to metrics and traces, which are then sent to Datadog. The Datadog Lambda Extension sends traces, metrics, and logs directly to Datadog, which diminishes the expense of CloudWatch Logs.
- **Easy to set up**: Triggers need to be set up on the Forwarder for every new Lambda function. The Datadog Lambda Extension can be easily added as a Lambda layer. 

### Trade-offs

Migration from the Forwarder to the Extension can be an involved process. There is one Forwarder setup per region and account, but there is one Extension setup **per function**. That is, if you are shipping data from *N* functions using the Forwarder, you must set up the Extension *N* times before the migration is complete. Since you must reconfigure and redeploy **each** function, the full process of migration may take some time.

If this is a significant deterrent to migration, but you still wish to benefit from the advantages of the Datadog Lambda Extension, you may consider a [hybrid approach](#hybrid-approach).

## How to migrate from the Forwarder to the Extension

Datadog recommends that you set up the Extension **before** removing the Forwarder. This means that for the period during which both the Extension and Forwarder are active, all telemetry is sent twice. The alternative (removing the Forwarder before setting up the Extension) results in a period of zero visibility. Depending on your organization's particular needs, you may prefer one outcome over the other.

### Setting up the Datadog Lambda Extension {#extension-setup}

See the [Datadog Lambda Extension documentation][1].

### Removing the Datadog Forwarder

#### Prevent the Forwarder from attaching to new functions {#prevent-forwarder}

When you deploy a new function, the Datadog Forwarder detects an unsubscribed function and automatically creates a new subscription. If you used the automatic configuration for the Forwarder, it will not automatically resubscribe to your function's log groups if the Extension is installed on that function.

{{< tabs >}}
{{% tab "Serverless Framework" %}}

Remove the resource name of the Forwarder from your `serverless.yml` file.

{{% /tab %}}
{{% tab "AWS SAM" %}}

Remove the resource name of the Forwarder from your `template.yml` file.

{{% /tab %}}
{{% tab "AWS CDK" %}}

Remove the resource name of the Forwarder from your CDK stack.

{{% /tab %}}
{{% tab "Zappa" %}}

Manually remove the subscription from the AWS console.

{{% /tab %}}
{{% tab "Chalice" %}}

Manually remove the subscription from the AWS console.

{{% /tab %}}
{{% tab "Datadog CLI" %}}

Manually remove the subscription from the AWS console.

{{% /tab %}}
{{% tab "Container Image" %}}

Manually remove the subscription from the AWS console.

{{% /tab %}}
{{% tab "Custom" %}}

Manually remove the subscription from the AWS console.

{{% /tab %}}
{{< /tabs >}}

For more information, see the [Datadog Forwarder documentation][2].

### Hybrid approach

You may also wish to keep using the Datadog Forwarder for existing functions while using the Datadog Lambda Extension for all new functions. 

1. Ensure that the Forwarder [does not attach automatically](#prevent-forwarder) to new functions.
2. For each new function you deploy, [set up the Extension](#extension-setup)

[1]: /serverless/libraries_integrations/extension/
[2]: /serverless/libraries_integrations/forwarder/
