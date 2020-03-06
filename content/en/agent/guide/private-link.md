---
title: Connect to Datadog over AWS PrivateLink
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
Datadog exposes AWS PrivateLink endpoints in <b>us-east-1</b>.
</div>

This guide walks you through how to configure [AWS PrivateLink][1] for use with Datadog.

## Overview

The overall process consists of configuring an internal endpoint in your VPC that local Datadog Agents can send data to. Your VPC endpoint is then peered with the endpoint within Datadog's VPC.

{{< img src="agent/guide/private_link/vpc_diagram_schema.png" alt="VPC diagram Schema" >}}

## Create your VPC endpoint

1. Connect to the AWS console and create a new VPC endpoint:
   {{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="Create VPC endpoint" style="width:60%;" >}}
2. Select **Find service by name**.
3. Fill the _Service Name_ text box according to which service you want to establish AWS PrivateLink for:

    {{< img src="agent/guide/private_link/vpc_service_name.png" alt="VPC service name" style="width:70%;" >}}
    {{< tabs >}}

{{% tab "Metrics" %}}

| Datadog Metric Service Name                                |
| ---------------------------------------------------------- |
| `com.amazonaws.vpce.us-east-1.vpce-svc-056576c12b36056ca`  |

{{% /tab %}}
{{% tab "Logs" %}}

| Datadog Log Service Name                                  |
| --------------------------------------------------------- |
| `com.amazonaws.vpce.us-east-1.vpce-svc-0a2aef8496ee043bf` |

{{% /tab %}}
{{% tab "API" %}}

| Datadog API Service Name                                  |
| --------------------------------------------------------- |
| `com.amazonaws.vpce.us-east-1.vpce-svc-02a4a57bc703929a0` |

{{% /tab %}}
{{< /tabs >}}

4. Hit the _verify_ button. If it does not return _Service name found_, reach out to the [Datadog support team][2].
5. Choose the VPC and subnets that should be peered with the Datadog VPC service endpoint.
6. Make sure that for **Enable DNS name** the _Enable for this endpoint_ is checked:
   {{< img src="agent/guide/private_link/enabled_dns_private.png" alt="Enable DNS private" style="width:60%;" >}}
7. Choose the security group of your choice to control what can send traffic to this VPC endpoint.

    **Note**: **If you want to forward logs to Datadog through this VPC endpoint, the security group must accept inbound and outbound traffic on port `443`**.

8. Hit **Create endpoint** at the bottom of the screen. If successful, you will see this:
   {{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="VPC endpoint created" style="width:60%;" >}}
9. Click on the VPC endpoint ID to check its status.
10. Wait for the status to move from _Pending_ to _Available_. This can take up to 10 minutes.
    {{< img src="agent/guide/private_link/vpc_status.png" alt="VPC status" style="width:60%;" >}}

Once it shows _Available_, the AWS PrivateLink is ready to be used. The next step is to update your Agent configurations with the new target endpoint for your Datadog Agents, Lambda forwarder, and/or other clients shipping data to Datadog.

## Client configuration

Select the tab below to see how to send your metrics and logs to Datadog using this new VPC endpoint, or which new host URL you would need to use for Datadog API:

{{< tabs >}}
{{% tab "Metrics" %}}

_Available for Agent 6.0+_

To forward your metrics to Datadog using this new VPC endpoint, configure `pvtlink.agent.datadoghq.com` as your new metric destination:

1. Update the `dd_url` parameter in the [Agent `datadog.yaml` configuration file][1]:

    ```yaml
    dd_url: pvtlink.agent.datadoghq.com
    ```

2. [Restart your Agent][2] to send metrics to Datadog through AWS PrivateLink.

**Note**: if you are using the container Agent, set the environment variable instead: `DD_DD_URL="pvtlink.agent.datadoghq.com"`


[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Logs" %}}

_Available for Agent 6.14+_

To forward your logs to Datadog using this new VPC endpoint, configure `pvtlink.logs.datadoghq.com` as your new log destination:

**Using the Datadog Agent**:

1. Add the following to the [Agent `datadog.yaml` configuration file][1]:

    ```yaml
    logs_config:
        use_http: true
        logs_dd_url: pvtlink.logs.datadoghq.com:443
    ```

    - The `use_http` variable forces the Datadog Agent to send logs over HTTPS. This configuration is required when sending logs to Datadog via AWS PrivateLink. More information about this is available in the [Agent log collection documentation][2].
    - The `logs_dd_url` variable is used to send logs to the VPC endpoint.

2. [Restart your Agent][3] to send logs to Datadog through AWS PrivateLink.

**Note**: if you are using the container Agent, set the following environment variables instead:

- `DD_LOGS_CONFIG_USE_HTTP=true`
- `DD_LOGS_CONFIG_LOGS_DD_URL="pvtlink.logs.datadoghq.com:443"`

**Using the Lambda forwarder**:

Add `DD_URL: pvtlink.logs.datadoghq.com` in your [Datadog Lambda function][4] environment variable to use the private link when forwarding AWS Service Logs to Datadog.


[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /agent/logs/?tab=tailexistingfiles#send-logs-over-https
[3]: /agent/guide/agent-commands/#restart-the-agent
[4]: /integrations/amazon_web_services/#set-up-the-datadog-lambda-function
{{% /tab %}}
{{% tab "API" %}}

To send data to the Datadog API or consume data from it through this new endpoint, replace your API call host signature `api.datadoghq.com/api/` with `pvtlink.api.datadoghq.com/api/`.

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/privatelink/
[2]: /help
