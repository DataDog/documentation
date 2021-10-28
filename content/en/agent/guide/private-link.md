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

{{< site-region region="gov" >}}
<div class="alert alert-warning">Datadog PrivateLink does not support the Datadog for Government site.</div>
{{< /site-region >}}

This guide walks you through how to configure [AWS PrivateLink][1] for use with Datadog.

## Overview

The overall process consists of configuring an internal endpoint in your VPC that local Datadog Agents can send data to. Your VPC endpoint is then peered with the endpoint within Datadog's VPC.

{{< img src="agent/guide/private_link/vpc_diagram_schema.png" alt="VPC diagram Schema" >}}

## Setup

Datadog exposes AWS PrivateLink endpoints in **us-east-1**.

However, to route traffic to Datadog's PrivateLink offering in `us-east-1` from other regions, use inter-region [Amazon VPC peering][2]. Inter-region VPC peering enables you to establish connections between VPCs across different AWS regions. This allows VPC resources in different regions to communicate with each other using private IP addresses. See [Amazon VPC peering][2] for more details.

{{< tabs >}}
{{% tab "us-east-1" %}}

1. Connect to the AWS console to region **us-east-1** and create a new VPC endpoint.

   {{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="Create VPC endpoint" style="width:60%;" >}}

2. Select **Find service by name**.
3. Fill the _Service Name_ text box according to which service you want to establish AWS PrivateLink for:

    {{< img src="agent/guide/private_link/vpc_service_name.png" alt="VPC service name" style="width:70%;" >}}

| Datadog             | PrivateLink service name                                  | Private DNS name                                   |
|---------------------| --------------------------------------------------------- | -------------------------------------------------- |
| Logs (HTTP intake)  | `com.amazonaws.vpce.us-east-1.vpce-svc-025a56b9187ac1f63` | `agent-http-intake.logs.datadoghq.com`            |
| API                 | `com.amazonaws.vpce.us-east-1.vpce-svc-064ea718f8d0ead77` | `api.datadoghq.com`                               |
| Metrics             | `com.amazonaws.vpce.us-east-1.vpce-svc-09a8006e245d1e7b8` | `metrics.agent.datadoghq.com`                     |
| Containers          | `com.amazonaws.vpce.us-east-1.vpce-svc-0ad5fb9e71f85fe99` | `orchestrator.datadoghq.com`                      |
| Process             | `com.amazonaws.vpce.us-east-1.vpce-svc-0ed1f789ac6b0bde1` | `process.datadoghq.com`                           |
| Traces              | `com.amazonaws.vpce.us-east-1.vpce-svc-0355bb1880dfa09c2` | `trace.agent.datadoghq.com`                       |

4. Click **Verify**. If this does not return _Service name found_, reach out to [Datadog support][1].
5. Choose the VPC and subnets that should be peered with the Datadog VPC service endpoint.
6. Make sure that for **Enable DNS name** the _Enable for this endpoint_ is checked:

   {{< img src="agent/guide/private_link/enabled_dns_private.png" alt="Enable DNS private" style="width:60%;" >}}

7. Choose the security group of your choice to control what can send traffic to this VPC endpoint.

    **Note**: **The security group must accept inbound traffic on TCP port `443`**.

8. Hit **Create endpoint** at the bottom of the screen. If successful, the following is displayed:

   {{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="VPC endpoint created" style="width:60%;" >}}

1. Click on the VPC endpoint ID to check its status.
1. Wait for the status to move from _Pending_ to _Available_. This can take up to 10 minutes. Once it shows _Available_, the AWS PrivateLink is ready to be used.

    {{< img src="agent/guide/private_link/vpc_status.png" alt="VPC status" style="width:60%;" >}}

11. If you are collecting logs data, ensure your Agent is configured to send logs over HTTPS. If the data is not already there, add the following to the [Agent `datadog.yaml` configuration file][2]:

    ```yaml
    logs_config:
        use_http: true
    ```

    If you are using the container Agent, set the following environment variable instead:

    ```
    DD_LOGS_CONFIG_USE_HTTP=true
    ```

    This configuration is required when sending logs to Datadog with AWS PrivateLink and the Datadog Agent, and is not required for the Lambda Extension. See [Agent log collection][3] for more details.
12. [Restart your Agent][4] to send data to Datadog through AWS PrivateLink.



[1]: /help/
[2]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[3]: /agent/logs/?tab=tailexistingfiles#send-logs-over-https
[4]: /agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}

{{% tab "VPC peering" %}}

### Amazon VPC peering

1. Connect to the AWS console to region **us-east-1** and create a new VPC endpoint.

{{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="Create VPC endpoint" style="width:60%;" >}}

2. Select **Find service by name**.
3. Fill the _Service Name_ text box according to which service you want to establish AWS PrivateLink for:

{{< img src="agent/guide/private_link/vpc_service_name.png" alt="VPC service name" style="width:70%;" >}}

| Datadog             | PrivateLink service name                                  |
|---------------------| --------------------------------------------------------- |
| Metrics             | `com.amazonaws.vpce.us-east-1.vpce-svc-09a8006e245d1e7b8` |
| Logs (HTTP intake)  | `com.amazonaws.vpce.us-east-1.vpce-svc-025a56b9187ac1f63` |
| API                 | `com.amazonaws.vpce.us-east-1.vpce-svc-064ea718f8d0ead77` |
| Process             | `com.amazonaws.vpce.us-east-1.vpce-svc-0ed1f789ac6b0bde1` |
| Traces              | `com.amazonaws.vpce.us-east-1.vpce-svc-0355bb1880dfa09c2` |
| Containers          | `com.amazonaws.vpce.us-east-1.vpce-svc-0ad5fb9e71f85fe99` |

4. Click **Verify**. If this does not return _Service name found_, reach out to [Datadog support][1].

5. Next, choose the VPC and subnets that should be peered with the Datadog VPC service endpoint. **Do not select Enable DNS name** as VPC peering requires DNS to be manually configured.

6. Choose the security group of your choice to control what can send traffic to this VPC endpoint.

    **Note**: **The security group must accept inbound traffic on TCP port `443`**.

7. Hit **Create endpoint** at the bottom of the screen. If successful, the following is displayed:

{{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="VPC endpoint created" style="width:60%;" >}}

8. Click on the VPC endpoint ID to check its status. Wait for the status to move from _Pending_ to _Available_. This can take up to 10 minutes.

{{< img src="agent/guide/private_link/vpc_status.png" alt="VPC status" style="width:60%;" >}}

9. Once it shows _Available_, the AWS PrivateLink is ready to be used.

### Amazon Route53

1. Create a [Route53 private hosted zone][2] for each service for which you have created an AWS PrivateLink endpoint. Attach the private hosted zone to the VPC in `us-east-1`.

    You can find this information by referencing the table below or interrogating the AWS APIs, `DescribeVpcEndpointServices`, or by using the following CLI command: `aws ec2 describe-vpc-endpoint-services --service-names <service-name>`. For example, in the case of the Datadog metrics endpoint:

    ```bash
    aws ec2 describe-vpc-endpoint-services --service-names com.amazonaws.vpce.us-east-1.vpce-svc-09a8006e245d1e7b8 | jq '.ServiceDetails[0].PrivateDnsName'
    ```

    This returns `metrics.agent.datadoghq.com`. This is the name of the private hosted zone that you need to create and associate with the VPC which the Agent traffic originates in. Overriding this record grabs all dynamic Agent-versioned hostnames that exist.

    Use the list below to map service and DNS name to different parts of Datadog:

    | Datadog             | PrivateLink service name                                  | Private DNS name                                   |
    |---------------------| --------------------------------------------------------- | -------------------------------------------------- |
    | Metrics             | `com.amazonaws.vpce.us-east-1.vpce-svc-09a8006e245d1e7b8` | `metrics.agent.datadoghq.com`                     |
    | Logs (HTTP intake)  | `com.amazonaws.vpce.us-east-1.vpce-svc-025a56b9187ac1f63` | `agent-http-intake.logs.datadoghq.com`            |
    | API                 | `com.amazonaws.vpce.us-east-1.vpce-svc-064ea718f8d0ead77` | `api.datadoghq.com`                               |
    | Process             | `com.amazonaws.vpce.us-east-1.vpce-svc-0ed1f789ac6b0bde1` | `process.datadoghq.com`                           |
    | Traces              | `com.amazonaws.vpce.us-east-1.vpce-svc-0355bb1880dfa09c2` | `trace.agent.datadoghq.com`                       |
    | Containers          | `com.amazonaws.vpce.us-east-1.vpce-svc-0ad5fb9e71f85fe99` | `orchestrator.datadoghq.com`                      |

{{< img src="agent/guide/private_link/create-a-route53-private-hosted-zone.png" alt="Create a Route53 private hosted zone" style="width:80%;" >}}

2. Within each new Route53 private hosted zone, create an A record with the same name. Toggle the **Alias** option, then under **Route traffic to**, choose **Alias to VPC endpoint**, **us-east-1**, and enter the DNS name of the VPC endpoint associated with the DNS name.

{{< img src="agent/guide/private_link/create-an-a-record.png" alt="Create an A record" style="width:80%;" >}}

3. Configure VPC peering and routing between the VPC in `us-east-1` that contains the Datadog PrivateLink endpoints and the VPC in the region where the Datadog Agents will run.

4. If the VPCs are in different AWS accounts, the VPC containing the Datadog Agent must be authorized to associate with the Route53 private hosted zones before continuing. Create a [VPC association authorization][3] for each Route53 private hosted zone using the region and VPC ID of the VPC where the Datadog Agent will run. This option is not available in the AWS web console. It must be configured using the AWS CLI, SDK, or API.

5. Edit the Route53 hosted zone to add the non-us-east-1 VPC.

{{< img src="agent/guide/private_link/edit-route53-hosted-zone.png" alt="Edit a Route53 private hosted zone" style="width:80%;" >}}

1. [Restart the Agent][4] to send data to Datadog through AWS PrivateLink.

#### Troubleshooting DNS resolution and connectivity

The DNS names should resolve to IP addresses contained within the CIDR block of the VPC in `us-east-1`, and connections to `port 443` should succeed.

{{< img src="agent/guide/private_link/successful-setup.png" alt="Connection to port 443 should be successful" style="width:80%;" >}}

If DNS is resolving to public IP addresses, then the Route53 zone has **not** been associated with the VPC in the alternate region, or the A record does not exist.

If DNS resolves correctly, but connections to `port 443` are failing, then VPC peering or routing may be misconfigured, or port 443 may not be allowed outbound to the CIDR block of the VPC in `us-east-1`.

### Datadog Agent

1. If you are collecting logs data, ensure your Agent is configured to send logs over HTTPS. If the data is not already there, add the following to the [Agent `datadog.yaml` configuration file][5]:

    ```yaml
    logs_config:
        use_http: true
    ```

    If you are using the container Agent, set the following environment variable instead:

    ```
    DD_LOGS_CONFIG_USE_HTTP=true
    ```

    This configuration is required when sending logs to Datadog with AWS PrivateLink and the Datadog Agent, and is not required for the Lambda Extension. See [Agent log collection][6] for more details.

2. [Restart the Agent][4].


[1]: /help/
[2]: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-private.html
[3]: https://docs.amazonaws.cn/en_us/Route53/latest/DeveloperGuide/hosted-zone-private-associate-vpcs-different-accounts.html
[4]: /agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[5]: /agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[6]: https://docs.datadoghq.com/agent/logs/?tab=tailexistingfiles#send-logs-over-https
{{% /tab %}}
{{< /tabs >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/privatelink/
[2]: https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html
