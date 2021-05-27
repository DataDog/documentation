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

{{< site-region region="gov" >}}
<div class="alert alert-warning">Datadog PrivateLink does not support the Datadog for Government site.</div>
{{< /site-region >}}

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
| `com.amazonaws.vpce.us-east-1.vpce-svc-0d560852f6f1e27ac`  |

{{% /tab %}}
{{% tab "Logs" %}}

| Forwarder | Datadog Logs Service Name |
| --------- | ------------------------- |
| Datadog Agent | `com.amazonaws.vpce.us-east-1.vpce-svc-025a56b9187ac1f63` |
| Lambda or custom forwarder | `com.amazonaws.vpce.us-east-1.vpce-svc-06394d10ccaf6fb97` |

{{% /tab %}}
{{% tab "API" %}}

| Datadog API Service Name                                  |
| --------------------------------------------------------- |
| `com.amazonaws.vpce.us-east-1.vpce-svc-064ea718f8d0ead77` |

{{% /tab %}}
{{% tab "Processes" %}}

| Datadog Process Monitoring Service Name                   |
| --------------------------------------------------------- |
| `com.amazonaws.vpce.us-east-1.vpce-svc-0ed1f789ac6b0bde1` |

{{% /tab %}}
{{% tab "Traces" %}}

| Datadog Trace Service Name                                |
| --------------------------------------------------------- |
| `com.amazonaws.vpce.us-east-1.vpce-svc-0355bb1880dfa09c2` |

{{% /tab %}}
{{% tab "Kubernetes Resources" %}}

| Datadog Kubernetes Explorer Service Name                  |
| --------------------------------------------------------- |
| `com.amazonaws.vpce.us-east-1.vpce-svc-0ad5fb9e71f85fe99` |

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

    Once it shows _Available_, the AWS PrivateLink is ready to be used. 
11. If you are collecting logs data, ensure your Agent is configured to send logs over HTTPS. If it's not already there, add the following to the [Agent `datadog.yaml` configuration file][3]:

    ```yaml
    logs_config:
        use_http: true
    ```

    If you are using the container Agent, set the following environment variable instead:

    ```
    DD_LOGS_CONFIG_USE_HTTP=true
    ```

    This configuration is required when sending logs to Datadog via AWS PrivateLink. More information about this is available in the [Agent log collection documentation][4].
12. [Restart your Agent][5] to send data to Datadog through AWS PrivateLink.

## Advanced usage

### Inter-region peering

To route traffic to Datadog’s PrivateLink offering in `us-east-1` from other regions, use inter-region [Amazon VPC peering][6]. 

Inter-region VPC peering enables you to establish connections between VPCs across different AWS regions. This allows VPC resources in different regions to communicate with each other using private IP addresses.

For more information, see the [Amazon VPC peering documentation][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/privatelink/
[2]: /help/
[3]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[4]: /agent/logs/?tab=tailexistingfiles#send-logs-over-https
[5]: /agent/guide/agent-commands/#restart-the-agent
[6]: https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html
