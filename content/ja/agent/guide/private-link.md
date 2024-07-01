---
title: Connect to Datadog over AWS PrivateLink
further_reading:
    - link: /agent/logs
      tag: Documentation
      text: Enable log collection with the Agent
    - link: "/integrations/amazon_web_services/#log-collection"
      tag: Documentation
      text: Collect logs from your AWS services
---

{{% site-region region="us3,us5,eu,gov" %}}
<div class="alert alert-warning">Datadog PrivateLink does not support the selected Datadog site.</div>
{{% /site-region %}}

{{% site-region region="us,ap1" %}}

This guide walks you through how to configure [AWS PrivateLink][1] for use with Datadog.

## Overview

The overall process consists of configuring an internal endpoint in your VPC that local Datadog Agents can send data to. Your VPC endpoint is then peered with the endpoint within Datadog's VPC.

{{< img src="agent/guide/private_link/vpc_diagram_schema.png" alt="VPC diagram Schema" >}}

## Setup

Datadog exposes AWS PrivateLink endpoints in **{{< region-param key="aws_region" >}}**.

However, to route traffic to Datadog's PrivateLink offering in {{< region-param key="aws_region" code="true" >}} from other regions, use inter-region [Amazon VPC peering][2]. Inter-region VPC peering enables you to establish connections between VPCs across different AWS regions. This allows VPC resources in different regions to communicate with each other using private IP addresses. For more details, see [Amazon VPC peering][2].

{{< tabs >}}
{{% tab "Connect from same region" %}}

1. Connect the AWS Console to region **{{< region-param key="aws_region" >}}** and create a VPC endpoint.

   {{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="Create VPC endpoint" style="width:60%;" >}}

2. Select **Find service by name**.
3. Fill the _Service Name_ text box according to which service you want to establish AWS PrivateLink for:

    {{< img src="agent/guide/private_link/vpc_service_name.png" alt="VPC service name" style="width:70%;" >}}

| Datadog                   | PrivateLink service name                                                               | Private DNS name                                                       |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Logs (Agent HTTP intake)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint" code="true">}}              |
| Logs (User HTTP intake)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint" code="true">}}                    |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | <code>api.{{< region-param key="dd_site" >}}</code>                    |
| Metrics                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | <code>metrics.agent.{{< region-param key="dd_site" >}}</code>          |
| Containers                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | <code>orchestrator.{{< region-param key="dd_site" >}}</code>           |
| Process                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | <code>process.{{< region-param key="dd_site" >}}</code>                |
| Profiling                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | <code>intake.profile.{{< region-param key="dd_site" >}}</code>         |
| Traces                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | <code>trace.agent.{{< region-param key="dd_site" >}}</code>            |
| Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | <code>dbm-metrics-intake.{{< region-param key="dd_site" >}}</code>     |
| Remote Configuration      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | <code>config.{{< region-param key="dd_site" >}}</code>                 |

4. Click **Verify**. If this does not return _Service name found_, reach out to [Datadog support][1].
5. Choose the VPC and subnets that should be peered with the Datadog VPC service endpoint.
6. Make sure that for **Enable DNS name**, _Enable for this endpoint_ is checked:

   {{< img src="agent/guide/private_link/enabled_dns_private.png" alt="Enable DNS private" style="width:80%;" >}}

7. Choose the security group of your choice to control what can send traffic to this VPC endpoint.

    **Note**: **The security group must accept inbound traffic on TCP port `443`**.

8. Click **Create endpoint** at the bottom of the screen. If successful, the following is displayed:

   {{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="VPC endpoint created" style="width:60%;" >}}

9. Click on the VPC endpoint ID to check its status.
10. Wait for the status to move from _Pending_ to _Available_. This can take up to 10 minutes. Once it shows _Available_, you can use AWS PrivateLink.

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

    This configuration is required when sending logs to Datadog with AWS PrivateLink and the Datadog Agent, and is not required for the Lambda Extension. For more details, see [Agent log collection][3].

12. If your Lambda Extension loads the Datadog API Key from AWS Secrets Manager using the ARN specified by the environment variable `DD_API_KEY_SECRET_ARN`, you need to [create a VPC endpoint for Secrets Manager][4].

13. [Restart your Agent][5] to send data to Datadog through AWS PrivateLink.



[1]: /help/
[2]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
[3]: /agent/logs/?tab=tailexistingfiles#send-logs-over-https
[4]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html
[5]: /agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}

{{% tab "Connect from another region using VPC Peering" %}}

### Amazon VPC peering

1. Connect the AWS Console to region **{{< region-param key="aws_region" >}}** and create a VPC endpoint.

{{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="Create VPC endpoint" style="width:80%;" >}}

2. Select **Find service by name**.
3. Fill the _Service Name_ text box according to the service you want to establish AWS PrivateLink for:

{{< img src="agent/guide/private_link/vpc_service_name.png" alt="VPC service name" style="width:90%;" >}}

| Datadog                   | PrivateLink service name                                                               |
|---------------------------|----------------------------------------------------------------------------------------|
| Logs (Agent HTTP intake)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        |
| Logs (User HTTP intake)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               |
| Metrics                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           |
| Containers                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        |
| Process                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           |
| Profiling                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         |
| Traces                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            |
| Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               |
| Remote Configuration      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     |

4. Click **Verify**. If this does not return _Service name found_, reach out to [Datadog support][1].

5. Next, choose the VPC and subnets that should be peered with the Datadog VPC service endpoint. Do not select **Enable DNS name** as VPC peering requires DNS to be manually configured.

6. Choose the security group of your choice to control what can send traffic to this VPC endpoint.

    **Note**: **The security group must accept inbound traffic on TCP port `443`**.

7. Click **Create endpoint** at the bottom of the screen. If successful, the following is displayed:

{{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="VPC endpoint created" style="width:80%;" >}}

8. Click on the VPC endpoint ID to check its status.
9. Wait for the status to move from _Pending_ to _Available_. This can take up to 10 minutes.
10. After creating the endpoint, use VPC peering to make the PrivateLink endpoint available in another region to send telemetry to Datadog over PrivateLink. For more information, read the [Work With VPC Peering connections][2] page in AWS.

{{< img src="agent/guide/private_link/vpc_status.png" alt="VPC status" style="width:80%;" >}}

### Amazon Route53

1. Create a [Route53 private hosted zone][3] for each service you have created an AWS PrivateLink endpoint for. Attach the private hosted zone to the VPC in {{< region-param key="aws_region" code="true" >}}.

{{< img src="agent/guide/private_link/create-a-route53-private-hosted-zone.png" alt="Create a Route53 private hosted zone" style="width:80%;" >}}

Use the list below to map service and DNS name to different parts of Datadog:

  | Datadog                   | PrivateLink service name                                                               | Private DNS name                                                       |
  |---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
  | Logs (Agent HTTP intake)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | <code>agent-http-intake.logs.{{< region-param key="dd_site" >}}</code> |
  | Logs (User HTTP intake)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | <code>http-intake.logs.{{< region-param key="dd_site" >}}</code>       |
  | API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | <code>api.{{< region-param key="dd_site" >}}</code>                    |
  | Metrics                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | <code>metrics.agent.{{< region-param key="dd_site" >}}</code>          |
  | Containers                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | <code>orchestrator.{{< region-param key="dd_site" >}}</code>           |
  | Process                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | <code>process.{{< region-param key="dd_site" >}}</code>                |
  | Profiling                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | <code>intake.profile.{{< region-param key="dd_site" >}}</code>         |
  | Traces                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | <code>trace.agent.{{< region-param key="dd_site" >}}</code>            |
  | Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | <code>dbm-metrics-intake.{{< region-param key="dd_site" >}}</code>     |
  | Remote Configuration      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | <code>config.{{< region-param key="dd_site" >}}</code>                 |

  You can also find this information by interrogating the AWS API, `DescribeVpcEndpointServices`, or by using the following command: 

  ```bash
  aws ec2 describe-vpc-endpoint-services --service-names <service-name>`
  ```

  For example, in the case of the Datadog metrics endpoint for {{< region-param key="aws_region" code="true" >}}:

<div class="site-region-container">
  <div class="highlight">
    <pre tabindex="0" class="chroma"><code class="language-bash" data-lang="bash"><span class="line">aws ec2 describe-vpc-endpoint-services --service-names {{< region-param key="aws_private_link_metrics_service_name" >}} | jq '.ServiceDetails[0].PrivateDnsName'</span></code></pre>
  </div>
</div>

This returns <code>metrics.agent.{{< region-param key="dd_site" >}}</code>, the private hosted zone name that you need in order to associate with the VPC which the Agent traffic originates in. Overriding this record grabs all Metrics-related intake hostnames.

2. Within each new Route53 private hosted zone, create an A record with the same name. Toggle the **Alias** option, then under **Route traffic to**, choose **Alias to VPC endpoint**, **{{< region-param key="aws_region" >}}**, and enter the DNS name of the VPC endpoint associated with the DNS name.

   **Notes**:
      - To retrieve your DNS name, see the [View endpoint service private DNS name configuration documentation.][4]
      - The Agent sends telemetry to versioned endpoints, for example, <code>[version]-app.agent.{{< region-param key="dd_site" >}}</code> which resolves to <code>metrics.agent.{{< region-param key="dd_site" >}}</code> through a CNAME alias. Therefore, you only need to set up a private hosted zone for <code>metrics.agent.{{< region-param key="dd_site" >}}</code>.

{{< img src="agent/guide/private_link/create-an-a-record.png" alt="Create an A record" style="width:90%;" >}}

3. Configure VPC peering and routing between the VPC in {{< region-param key="aws_region" code="true" >}} that contains the Datadog PrivateLink endpoints and the VPC in the region where the Datadog Agents run.

4. If the VPCs are in different AWS accounts, the VPC containing the Datadog Agent must be authorized to associate with the Route53 private hosted zones before continuing. Create a [VPC association authorization][5] for each Route53 private hosted zone using the region and VPC ID of the VPC where the Datadog Agent runs. This option is not available in the AWS Console. It must be configured using the AWS CLI, SDK, or API.

5. Edit the Route53 hosted zone to add VPCs for other regions.

{{< img src="agent/guide/private_link/edit-route53-hosted-zone.png" alt="Edit a Route53 private hosted zone" style="width:80%;" >}}

6. VPCs that have the Private Hosted Zone (PHZ) attached need to have certain settings toggled on, specifically `enableDnsHostnames` and `enableDnsSupport` in the VPCs that the PHZ is associated with. See [Considerations when working with a private hosted zone][6].

7. [Restart the Agent][7] to send data to Datadog through AWS PrivateLink.

#### Troubleshooting DNS resolution and connectivity

The DNS names should resolve to IP addresses contained within the CIDR block of the VPC in {{< region-param key="aws_region" code="true" >}}, and connections to `port 443` should succeed.

{{< img src="agent/guide/private_link/successful-setup.png" alt="Connection to port 443 should be successful" style="width:80%;" >}}

If DNS is resolving to public IP addresses, then the Route53 zone has **not** been associated with the VPC in the alternate region, or the A record does not exist.

If DNS resolves correctly, but connections to `port 443` are failing, then VPC peering or routing may be misconfigured, or port 443 may not be allowed outbound to the CIDR block of the VPC in {{< region-param key="aws_region" code="true" >}}.

The VPCs with Private Hosted Zone (PHZ) attached need to have a couple of settings toggled on. Specifically, `enableDnsHostnames` and `enableDnsSupport` need to be turned on in the VPCs that the PHZ is associated with. See [Amazon VPC settings][6].

### Datadog Agent

1. If you are collecting logs data, ensure your Agent is configured to send logs over HTTPS. If the data is not already there, add the following to the [Agent `datadog.yaml` configuration file][8]:

    ```yaml
    logs_config:
        force_use_http: true
    ```

    If you are using the container Agent, set the following environment variable instead:

    ```
    DD_LOGS_CONFIG_FORCE_USE_HTTP=true
    ```

    This configuration is required when sending logs to Datadog with AWS PrivateLink and the Datadog Agent, and is not required for the Lambda Extension. For more details, see [Agent log collection][9].

2. If your Lambda Extension loads the Datadog API Key from AWS Secrets Manager using the ARN specified by the environment variable `DD_API_KEY_SECRET_ARN`, you need to [create a VPC endpoint for Secrets Manager][10].

3. [Restart the Agent][7].


[1]: /help/
[2]: https://docs.aws.amazon.com/vpc/latest/peering/working-with-vpc-peering.html
[3]: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-private.html
[4]: https://docs.aws.amazon.com/vpc/latest/privatelink/view-vpc-endpoint-service-dns-name.html
[5]: https://docs.amazonaws.cn/en_us/Route53/latest/DeveloperGuide/hosted-zone-private-associate-vpcs-different-accounts.html
[6]: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-considerations.html#hosted-zone-private-considerations-vpc-settings
[7]: /agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[8]: /agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[9]: https://docs.datadoghq.com/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[10]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html
{{% /tab %}}
{{< /tabs >}}


[1]: https://aws.amazon.com/privatelink/
[2]: https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html
{{% /site-region %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
