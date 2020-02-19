---
title: Set up a AWS PrivateLink from AWS us-east-1 region to Datadog
kind: guide
further_reading:
    - link: 'agent/logs'
      tag: 'Documentation'
      text: 'Enable log collection with the Agent.'
    - link: '/integrations/amazon_web_services/#set-up-the-datadog-lambda-function'
      tag: 'Documentation'
      text: 'Collect logs from your AWS services'
---

<div class="alert alert-info">
The Datadog PrivateLink setup is only available to in AWS us-east-1 region.
</div>

This guide walks you through how to configure [AWS PrivateLink][1] for use with Datadog. AWS PrivateLink simplifies the security of data shared with Datadog by eliminating the exposure of data to the public internet.

## Overview

The overall process consists of configuring an internal endpoint in your VPC that local Datadog Agents can send data to. Your VPC endpoint is then peered with the endpoint within Datadog VPC.

{{< img src="agent/guide/private_link/vpc_diagram_schema.png" alt="VPC diagram Schema" >}}

## Create your VPC endpoint

1. Connect to the AWS console and create a new VPC endpoint:
    {{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="Create VPC endpoint" style="width:60%;" >}}
2. Select **Find service by name**.
3. Fill the _service name_ text box with the following value depending of which private link you want to setup:

    {{< tabs >}}

{{% tab "Metric" %}}

| Service name                                               | Description                                      |
| ---------------------------------------------------------- | ------------------------------------------------ |
| `com.amazonaws.vpce.us-east-1.vpce-svc-056576c12b36056ca`  |  Allows you to forward your metrics to Datadog.  |

{{% /tab %}}
{{% tab "Logs" %}}

| Service name                                              | Description                                 |
| --------------------------------------------------------- | ------------------------------------------- |
| `com.amazonaws.vpce.us-east-1.vpce-svc-0a2aef8496ee043bf` | Allows you to forward your logs to Datadog. |

{{% /tab %}}
{{% tab "API" %}}

| Service name                                               | Description                                    |
| ---------------------------------------------------------- | ---------------------------------------------- |
|  `com.amazonaws.vpce.us-east-1.vpce-svc-056576c12b36056ca` |  Allows you to send and consume Datadog APIs.  |

{{% /tab %}}
{{< /tabs >}}

    {{< img src="agent/guide/private_link/vpc_service_name.png" alt="VPC service name" style="width:60%;" >}}

4. Hit the _verify_ button. If it does not return _Service name Found_, reach out to [Datadog support team][2].
5. Choose the VPC and subnets that should be peered with the Datadog VPC service endpoint.
   **Note**: The VPC must be in `us-east-1` and it's recommend to set subnets with all of the following availability zone IDs: `use1-az6`, `use1-az2`, and `use1-az4`:
   {{< img src="agent/guide/private_link/saved_az.png" alt="Saved AZ" style="width:60%;" >}}
6. Make sure that for **Enable DNS name** the _Enable for this Endpoint_ is checked:
   {{< img src="agent/guide/private_link/enabled_dns_private.png" alt="Enable DNS private" style="width:60%;" >}}
7. Choose the security group of your choice to control what can send traffic to this VPC endpoint.

    **Note**: **If you want to forward logs to Datadog through this VPC endpoint, the security group must accept inbound and outbound traffic on port `443`**.

8. Hit **Create endpoint** at the bottom of the screen. If successful, you will see this:
   {{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="VPC endpoint created" style="width:60%;" >}}
9. Click on the VPC endpoint ID to check its status.
10. Wait for the status to move from _Pending_ to _Available_ (this can take up to 10 minutes):
    {{< img src="agent/guide/private_link/vpc_status.png" alt="VPC status" style="width:60%;" >}}

Once it shows _Available_, the AWS PrivateLink is ready to be used. The next step is to update your agent configurations those new target endpoint for your Datadog Agents, Lambda forwarder, and/or other clients shipping data to Datadog.

## Client configuration

Select the tab below to see how to send your metrics and logs to Datadog using this new VPC endpoint, or which new host url you would need to use for Datadog API:

{{< tabs >}}
{{% tab "Metric" %}}

To forward your metrics to Datadog using this new VPC endpoint your need to setup `pvtlink.agent.datadoghq.com` as your new metric destination:

1. Update the `dd_url` parameter in the [Agent `datadog.yaml` configuration file][1]:

    ```yaml
    dd_url: pvtlink.agent.datadoghq.com
    ```

2. [Restart your Agent][2] to send metrics to Datadog through AWS PrivateLink.


[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Logs" %}}

To forward your logs to Datadog using this new VPC endpoint, you need to set up `pvtlink.logs.datadoghq.com` as your new log destination:

**Using the Datadog Agent**:

1. Add the following to the [Agent `datadog.yaml` configuration file][1]:

    ```yaml
    logs_config:
        use_http: true
        logs_dd_url: pvtlink.logs.datadoghq.com:443
    ```

    - The `use_http` variable is used to force the Datadog Agent to send logs over HTTPS, which is the protocol supported by the VPC endpoint. More information about this is available in the [Agent log collection documentation][2].
    - The `logs_dd_url` variable is used to send logs to the VPC endpoint.

2. [Restart your Agent][3] to send Logs to Datadog through AWS PrivateLink.

**Using the Lambda forwarder**:

Add `DD_URL: pvtlink.logs.datadoghq.com` in your [Datadog Lambda function][4] environment variable to use the private link when forwarding AWS Service Logs to Datadog.


[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /agent/logs/?tab=tailexistingfiles#send-logs-over-https
[3]: /agent/guide/agent-commands/#restart-the-agent
[4]: /integrations/amazon_web_services/#set-up-the-datadog-lambda-function
{{% /tab %}}
{{% tab "API" %}}

To send data to Datadog API or consume data from it through this new private link, replace your API call host signature `api.datadoghq.com/api/` with `pvtlink.api.datadoghq.com`.

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/privatelink/
[2]: /help
