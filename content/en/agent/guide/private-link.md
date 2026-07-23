---
title: Connect to Datadog over AWS PrivateLink
description: Configure AWS PrivateLink endpoints to send telemetry data to Datadog securely through internal VPC connections, including cross-region setups.
further_reading:
    - link: 'https://www.datadoghq.com/architecture/using-cross-region-aws-privatelink-to-send-telemetry-to-datadog/'
      tag: "Architecture Center"
      text: 'Using Cross-Region AWS PrivateLink to Send Telemetry to Datadog'
    - link: '/agent/logs'
      tag: 'Documentation'
      text: 'Enable log collection with the Agent'
    - link: '/integrations/amazon_web_services/#log-collection'
      tag: 'Documentation'
      text: 'Collect logs from your AWS services'
    - link: "https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink/"
      tag: "Architecture Center"
      text: "Connect to Datadog over AWS PrivateLink"
    - link: "https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink-using-aws-transit-gateway/"
      tag: "Architecture Center"
      text: "Connect to Datadog over AWS PrivateLink using AWS Transit Gateway"
    - link: "https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink-using-aws-vpc-peering/"
      tag: "Architecture Center"
      text: "Connect to Datadog over AWS PrivateLink using AWS VPC peering"
    - link: "https://www.datadoghq.com/blog/datadog-aws-cross-region-privatelink/"
      tag: "Blog"
      text: "Reduce costs and enhance security with cross-region Datadog connectivity using AWS PrivateLink"
---

{{% site-region region="us3,us5,eu,gov,gov2" %}}
<div class="alert alert-danger">Datadog PrivateLink does not support the selected Datadog site.</div>
{{% /site-region %}}

{{% site-region region="us,ap1,ap2,uk1" %}}

## Overview

This guide walks you through configuring [AWS PrivateLink][11] for use with Datadog. The overall process consists of configuring an internal endpoint in your VPC that local Datadog Agents can send data to. Your VPC endpoint is then peered with the endpoint within Datadog's VPC.

{{< img src="agent/guide/private_link/vpc_diagram_schema.png" alt="VPC diagram Schema" >}}

Datadog exposes AWS PrivateLink endpoints in **{{< region-param key="aws_region" >}}**.
- If you need to route Datadog traffic in the same region, follow the steps in [Connect from the same region](#connect-from-the-same-region) to set up your endpoint.
- To route traffic to Datadog's PrivateLink offering in {{< region-param key="aws_region" >}} from other regions, Datadog recommends [cross-region PrivateLink endpoints](?tab=crossregionprivatelinkendpoints#connect-from-other-regions). [Cross-region PrivateLink][11] enables you to establish connections between VPCs across different AWS regions. This allows VPC resources in different regions to communicate with each other using private IP addresses. Alternatively, use [VPC Peering](?tab=vpcpeering#connect-from-other-regions).

## Connect from the same region

1. Connect the AWS Management Console to the region of your choice.
1. From the VPC Dashboard, under {{< ui >}}PrivateLink and Lattice{{< /ui >}}, select {{< ui >}}Endpoints{{< /ui >}}.
1. Click {{< ui >}}Create Endpoint{{< /ui >}}:
   {{< img src="agent/guide/private-link-vpc.png" alt="The endpoints page on the VPC dashboard" style="width:90%;" >}}
1. Select {{< ui >}}Find service by name{{< /ui >}}.
1. Fill the _Service Name_ text box according to which service you want to establish AWS PrivateLink for:

    {{< img src="agent/guide/private_link/vpc_service_name.png" alt="VPC service name" style="width:70%;" >}}

{{% site-region region="ap1" %}}
| Datadog                   | PrivateLink service name                                                               | Private DNS name                                                       |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Logs (Agent HTTP intake)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
| Logs (User HTTP intake)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
| Metrics                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
| Containers                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
| Process                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
| Profiling                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
| Traces                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
| Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
| Remote Configuration      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |
{{% /site-region %}}
{{% site-region region="us" %}}
For the complete list of US1 DNS records and VPC service endpoints, see [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}
{{% site-region region="ap2" %}}
For the complete list of AP2 DNS records and VPC service endpoints, see [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}

{{% site-region region="uk1" %}}
For the complete list of UK1 DNS records and VPC service endpoints, see [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}

4. Click {{< ui >}}Verify{{< /ui >}}. If this does not return _Service name found_, reach out to [Datadog support][14].
5. Choose the VPC and subnets that should be peered with the Datadog VPC service endpoint.
6. Make sure that for {{< ui >}}Enable DNS name{{< /ui >}}, _Enable for this endpoint_ is checked:

   {{< img src="agent/guide/private_link/enabled_dns_private.png" alt="Enable DNS private" style="width:80%;" >}}

7. Choose the security group of your choice to control what can send traffic to this VPC endpoint.

    **Note**: **The security group must accept inbound traffic on TCP port `443`**.

8. Click {{< ui >}}Create endpoint{{< /ui >}} at the bottom of the screen. If successful, the following is displayed:

   {{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="VPC endpoint created" style="width:60%;" >}}

9. Click on the VPC endpoint ID to check its status.
10. Wait for the status to move from _Pending_ to _Available_. This can take up to 10 minutes. Once it shows _Available_, you can use AWS PrivateLink.

    {{< img src="agent/guide/private_link/vpc_status.png" alt="VPC status" style="width:60%;" >}}

11. If you are running a Datadog Agent version older than v6.19 or v7.19, to collect logs data, ensure your Agent is configured to send logs over HTTPS. If the data is not already there, add the following to the [Agent `datadog.yaml` configuration file][15]:

    ```yaml
    logs_config:
        force_use_http: true
    ```

    If you are using the container Agent, set the following environment variable instead:

    ```
    DD_LOGS_CONFIG_FORCE_USE_HTTP=true
    ```

    This configuration is required when sending logs to Datadog with AWS PrivateLink and the Datadog Agent, and is not required for the Lambda Extension. For more details, see [Agent log collection][16].

12. If your Lambda Extension loads the Datadog API Key from AWS Secrets Manager using the ARN specified by the environment variable `DD_API_KEY_SECRET_ARN`, you need to [create a VPC endpoint for Secrets Manager][17].

13. [Restart your Agent][13] to send data to Datadog through AWS PrivateLink.

## Connect from other regions

{{< tabs >}}
{{% tab "Cross-region PrivateLink endpoints" %}}
1. Connect the AWS Management Console to the region of your choice.
1. From the VPC Dashboard, under {{< ui >}}PrivateLink and Lattice{{< /ui >}}, select {{< ui >}}Endpoints{{< /ui >}}.
1. Click {{< ui >}}Create Endpoint{{< /ui >}}:
   {{< img src="agent/guide/private-link-vpc.png" alt="The endpoints page on the VPC dashboard" style="width:90%;" >}}
1. Configure the VPC interface endpoint settings
   1. Optionally, fill in the {{< ui >}}Name tag{{< /ui >}}.
   1. Under {{< ui >}}Type{{< /ui >}}, select {{< ui >}}PrivateLink Ready partner services{{< /ui >}}.
1. Discover and configure the interface endpoint with cross-region support:
   1. Under {{< ui >}}Service name{{< /ui >}}, fill in the service name with a valid PrivateLink service name from the [table](#privatelink-service-names) below.
   1. Under {{< ui >}}Service region{{< /ui >}}, click {{< ui >}}Enable Cross Region endpoint{{< /ui >}} and select **{{< region-param key="aws_private_link_cross_region" >}}**.
   1. Click {{< ui >}}Verify service{{< /ui >}} and wait for a _Service name verified_ notification.
      **Note:** If you aren't able to verify the service after completing the steps above, reach out to [Datadog Support][1].
1. Under {{< ui >}}Network Settings{{< /ui >}}, select a VPC to deploy the VPC Interface endpoint with.
1. Ensure the option to {{< ui >}}Enable DNS name{{< /ui >}} is checked.
1. Under {{< ui >}}Subnets{{< /ui >}}, select one or more subnets in your VPC for the interface endpoint.
1. Under {{< ui >}}Security Groups{{< /ui >}}, select a security group to control what can send traffic to the VPC endpoint.

   **Note**: The security group must accept inbound traffic on TCP port 443.
1. Optionally, provide a {{< ui >}}Name tag{{< /ui >}} and click {{< ui >}}Create endpoint{{< /ui >}}.
1. Allow a few minutes for the endpoint status to update from {{< ui >}}Pending{{< /ui >}} to {{< ui >}}Available{{< /ui >}}. This may take up to 10 minutes. If it is taking longer than expected, reach out to [Datadog Support][1].

After the endpoint status is updated to {{< ui >}}Available{{< /ui >}}, you can use this endpoint to send telemetry to Datadog using the cross-region AWS PrivateLink endpoint.

## PrivateLink service names

{{% site-region region="ap1" %}}
| Datadog                   | PrivateLink service name                                                               | Private DNS name                                                       |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Logs (Agent HTTP intake)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
| Logs (User HTTP intake)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
| Metrics                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
| Containers                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
| Process                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
| Profiling                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
| Traces                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
| Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
| Remote Configuration      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |
{{% /site-region %}}
{{% site-region region="ap2" %}}
For the complete list of AP2 DNS records and VPC service endpoints, see [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}

{{% site-region region="us" %}}
For the complete list of US1 DNS records and VPC service endpoints, see [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}
{{% site-region region="uk1" %}}
For the complete list of UK1 DNS records and VPC service endpoints, see [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}

**Note**: Cross-region PrivateLink doesn't emit CloudWatch metrics. See [CloudWatch metrics for AWS PrivateLink][2] for more information.

[1]: /help/
[2]: https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-cloudwatch-metrics.html
{{% /tab %}}

{{% tab "VPC Peering" %}}
1. Connect the AWS Console to region **{{< region-param key="aws_region" >}}** and create a VPC endpoint.

{{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="Create VPC endpoint" style="width:80%;" >}}

2. Select {{< ui >}}Find service by name{{< /ui >}}.
3. Fill the _Service Name_ text box according to the service you want to establish AWS PrivateLink for:

{{< img src="agent/guide/private_link/vpc_service_name.png" alt="VPC service name" style="width:90%;" >}}

{{% site-region region="ap1" %}}
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
{{% /site-region %}}
{{% site-region region="us" %}}
For the complete list of US1 DNS records and VPC service endpoints, see [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}
{{% site-region region="ap2" %}}
For the complete list of AP2 DNS records and VPC service endpoints, see [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}

{{% site-region region="uk1" %}}
For the complete list of UK1 DNS records and VPC service endpoints, see [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}

4. Click {{< ui >}}Verify{{< /ui >}}. If this does not return _Service name found_, reach out to [Datadog support][1].

5. Next, choose the VPC and subnets that should be peered with the Datadog VPC service endpoint. Do not select {{< ui >}}Enable DNS name{{< /ui >}} as VPC peering requires DNS to be manually configured.

6. Choose the security group of your choice to control what can send traffic to this VPC endpoint.

    **Note**: **The security group must accept inbound traffic on TCP port `443`**.

7. Click {{< ui >}}Create endpoint{{< /ui >}} at the bottom of the screen. If successful, the following is displayed:

{{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="VPC endpoint created" style="width:80%;" >}}

8. Click on the VPC endpoint ID to check its status.
9. Wait for the status to move from _Pending_ to _Available_. This can take up to 10 minutes.
10. After creating the endpoint, use VPC peering to make the PrivateLink endpoint available in another region to send telemetry to Datadog over PrivateLink. For more information, read the [Work With VPC Peering connections][2] page in AWS.

{{< img src="agent/guide/private_link/vpc_status.png" alt="VPC status" style="width:80%;" >}}

### Amazon Route53

1. Create a [Route53 private hosted zone][3] for each service you have created an AWS PrivateLink endpoint for. Attach the private hosted zone to the VPC in {{< region-param key="aws_region" code="true" >}}.

{{< img src="agent/guide/private_link/create-a-route53-private-hosted-zone.png" alt="Create a Route53 private hosted zone" style="width:80%;" >}}

Use the list below to map service and DNS name to different parts of Datadog:

{{% site-region region="ap1" %}}
  | Datadog                   | PrivateLink service name                                                               | Private DNS name                                                       |
  |---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
  | Logs (Agent HTTP intake)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
  | Logs (User HTTP intake)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
  | API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
  | Metrics                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
  | Containers                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
  | Process                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
  | Profiling                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
  | Traces                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
  | Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
  | Remote Configuration      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |
{{% /site-region %}}
{{% site-region region="us" %}}
For the complete list of US1 DNS records and VPC service endpoints, see [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}
{{% site-region region="ap2" %}}
For the complete list of AP2 DNS records and VPC service endpoints, see [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}

{{% site-region region="uk1" %}}
For the complete list of UK1 DNS records and VPC service endpoints, see [VPC Endpoint Service IDs](#vpc-endpoint-service-ids).
{{% /site-region %}}

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

2. Within each new Route53 private hosted zone, create an A record with the same name. Toggle the {{< ui >}}Alias{{< /ui >}} option, then under {{< ui >}}Route traffic to{{< /ui >}}, choose {{< ui >}}Alias to VPC endpoint{{< /ui >}}, **{{< region-param key="aws_region" >}}**, and enter the DNS name of the VPC endpoint associated with the DNS name.

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
[8]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
[9]: /agent/logs/?tab=tailexistingfiles#send-logs-over-https
[10]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html
{{% /tab %}}
{{< /tabs >}}

[11]: https://aws.amazon.com/privatelink/
[12]: https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html
[13]: /agent/configuration/agent-commands/#restart-the-agent
[14]: /help/
[15]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
[16]: /agent/logs/?tab=tailexistingfiles#send-logs-over-https
[17]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html

{{% site-region region="us" %}}
## VPC Endpoint Service IDs

US1 uses a two-level DNS architecture for PrivateLink. Every customer-facing DNS record maps to a dedicated `color.intake.datadoghq.com` VPC endpoint address. Setting up a VPC endpoint for a given anchor address covers all customer-facing records that map to it.

Use the following table to identify which VPC endpoints to set up for the Datadog features you use. Wildcard entries match any subdomain not otherwise listed.

**Note**: In the table below, `---` indicates a direct VPC service endpoint with no intermediate anchor address.
| Name | Anchor | VPC Endpoint Service ID |
|---|---|---|
| `webhook-intake.datadoghq.com` | `azure.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-02bee2072b5c3c226` |
| `webhooks-http-intake.logs.datadoghq.com` | `azure.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-02bee2072b5c3c226` |
| `*.integrations.otlp.datadoghq.com` | `brown.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-00192e92115cbcc75` |
| `opamp.datadoghq.com` | `brown.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-00192e92115cbcc75` |
| `otlp.datadoghq.com` | `brown.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-00192e92115cbcc75` |
| `mcp.datadoghq.com` | `cornsilk.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-058a75ceea85a9175` |
| `agenthealth-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `ci-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `cicodescan-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `citestcov-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `citestcycle-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `cloudplatform-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `contimage-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `contlcycle-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `cws-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `debugger-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `error-tracking-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `event-management-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `event-platform-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `feed-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `instrumentation-telemetry-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `kubeops-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `llmobs-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `ndm-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `ndmflow-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `netpath-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `ocimetrics-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `resources-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `sbom-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `sds-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `sentry-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `snmp-traps-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `softinv-intake.datadoghq.com` | `cyan.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0b3292e3efce2a445` |
| `iam-rum-intake.datadoghq.com` | `gray.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0a3b2d86676122d8d` |
| `rum-http-intake.logs.datadoghq.com` | `gray.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0a3b2d86676122d8d` |
| `rum.browser-intake-datadoghq.com` | `gray.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0a3b2d86676122d8d` |
| `data-obs-intake.datadoghq.com` | `lime.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0ee865cd1c0a7ba32` |
| `trace.agent.datadoghq.com` | `lime.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-0ee865cd1c0a7ba32` |
| `network-devices.datadoghq.com` | `olive.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-05e3bfec4501e714d` |
| `*.api.datadoghq.com` | `orchid.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-07895350fd0109264` |
| `*.synthetics.datadoghq.com` | `orchid.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-07895350fd0109264` |
| `api.datadoghq.com` | `orchid.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-07895350fd0109264` |
| `intake.synthetics.datadoghq.com` | `orchid.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-07895350fd0109264` |
| `synthetics.datadoghq.com` | `orchid.intake.datadoghq.com` | `com.amazonaws.vpce.us-east-1.vpce-svc-07895350fd0109264` |
| `agent-http-intake.logs.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-025a56b9187ac1f63` |
| `http-intake.logs.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-0e36256cb6172439d` |
| `metrics.agent.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-09a8006e245d1e7b8` |
| `orchestrator.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-0ad5fb9e71f85fe99` |
| `process.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-0ed1f789ac6b0bde1` |
| `intake.profile.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-022ae36a7b2472029` |
| `dbm-metrics-intake.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-0ce70d55ec4af8501` |
| `config.datadoghq.com` | `---` | `com.amazonaws.vpce.us-east-1.vpce-svc-01f21309e507e3b1d` |

{{% /site-region %}}

{{% site-region region="ap2" %}}
## VPC Endpoint Service IDs

AP2 uses a two-level DNS architecture for PrivateLink. Every customer-facing DNS record maps to a dedicated `color.intake.ap2.datadoghq.com` VPC endpoint address. Setting up a VPC endpoint for a given anchor address covers all customer-facing records that map to it.

Use the following table to identify which VPC endpoints to set up for the Datadog features you use. More specific DNS records take precedence over wildcards—for example, `trace.agent.ap2.datadoghq.com` resolves to `lime.intake.ap2.datadoghq.com` even though `*.agent.ap2.datadoghq.com` points to `beige.intake.ap2.datadoghq.com`.

| Name | Anchor | VPC Endpoint Service ID |
|---|---|---|
| `gcp-intake.logs.ap2.datadoghq.com` | `aqua.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-01b61a61d21fc7273` |
| `*.agent.ap2.datadoghq.com` | `beige.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06a30d6a016b746ff` |
| `agent.ap2.datadoghq.com` | `beige.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06a30d6a016b746ff` |
| `process.ap2.datadoghq.com` | `bisque.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0c26ca335d93a68b5` |
| `*.integrations.otlp.ap2.datadoghq.com` | `brown.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-04c61207a01a73496` |
| `opamp.ap2.datadoghq.com` | `brown.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-04c61207a01a73496` |
| `otlp.ap2.datadoghq.com` | `brown.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-04c61207a01a73496` |
| `agenthealth-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `awsmetrics-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `ci-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `cicodescan-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `cireport-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `citestcov-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `citestcycle-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `cloudplatform-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `contimage-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `contlcycle-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `cspm-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `cws-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `debugger-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `error-tracking-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `event-management-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `instrumentation-telemetry-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `intake.profile.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `kubeops-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `llmobs-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `ndm-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `ndmflow-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `netpath-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `ocimetrics-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `resources-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `sbom-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `sds-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `sentry-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `snmp-traps-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `softinv-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `webhook-intake.ap2.datadoghq.com` | `cyan.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd` |
| `agent-http-intake.logs.ap2.datadoghq.com` | `gold.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace` |
| `aws-kinesis-http-intake.logs.ap2.datadoghq.com` | `gold.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace` |
| `eventbridge-intake.logs.ap2.datadoghq.com` | `gold.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace` |
| `http-intake.logs.ap2.datadoghq.com` | `gold.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace` |
| `lambda-http-intake.logs.ap2.datadoghq.com` | `gold.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace` |
| `obpipeline-intake.ap2.datadoghq.com` | `gold.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace` |
| `runtime-security-http-intake.logs.ap2.datadoghq.com` | `gold.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace` |
| `live.logs.ap2.datadoghq.com` | `indigo.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0545109555aa68e7e` |
| `data-obs-intake.ap2.datadoghq.com` | `lime.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0f3e01f4180b2ae09` |
| `trace.agent.ap2.datadoghq.com` | `lime.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0f3e01f4180b2ae09` |
| `orchestrator.ap2.datadoghq.com` | `linen.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-031da3ffac78ef902` |
| `*.synthetics.ap2.datadoghq.com` | `orchid.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06ec78b291ce8020a` |
| `api.ap2.datadoghq.com` | `orchid.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06ec78b291ce8020a` |
| `quota.browser-intake-ap2-datadoghq.com` | `orchid.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06ec78b291ce8020a` |
| `synthetics.ap2.datadoghq.com` | `orchid.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06ec78b291ce8020a` |
| `sourcemap-intake.ap2.datadoghq.com` | `plum.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-028e4348e80fa73f5` |
| `config.ap2.datadoghq.com` | `violet.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-01f8f80f4cb97bd10` |
| `dbm-metrics-intake.ap2.datadoghq.com` | `white.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-094469ee7a178f448` |
| `dbquery-intake.ap2.datadoghq.com` | `white.intake.ap2.datadoghq.com` | `com.amazonaws.vpce.ap-southeast-2.vpce-svc-094469ee7a178f448` |
{{% /site-region %}}

{{% /site-region %}}

{{% site-region region="uk1" %}}
## VPC Endpoint Service IDs

UK1 uses a two-level DNS architecture for PrivateLink. Every customer-facing DNS record maps to a dedicated `color.intake.uk1.datadoghq.com` VPC endpoint address. Setting up a VPC endpoint for a given anchor address covers all customer-facing records that map to it.

Use the following table to identify which VPC endpoints to set up for the Datadog features you use. More specific DNS records take precedence over wildcards—for example, `trace.agent.uk1.datadoghq.com` resolves to `lime.intake.uk1.datadoghq.com` even though `*.agent.uk1.datadoghq.com` points to `beige.intake.uk1.datadoghq.com`.

| Name | Anchor | VPC Endpoint Service ID |
|---|---|---|
| `gcp-intake.logs.uk1.datadoghq.com` | `aqua.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-099b74a86151e7f91` |
| `*.agent.uk1.datadoghq.com` | `beige.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-058a9de2dbf6959f9` |
| `agent.uk1.datadoghq.com` | `beige.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-058a9de2dbf6959f9` |
| `process.uk1.datadoghq.com` | `bisque.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0fe52c96bfb6c5d0e` |
| `*.integrations.otlp.uk1.datadoghq.com` | `brown.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0d7e1e795a19787c9` |
| `opamp.uk1.datadoghq.com` | `brown.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0d7e1e795a19787c9` |
| `otlp.uk1.datadoghq.com` | `brown.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0d7e1e795a19787c9` |
| `mcp.uk1.datadoghq.com` | `cornsilk.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0d345b92b8a5e8743` |
| `agenthealth-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `awsmetrics-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `ci-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `cicodescan-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `cireport-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `citestcov-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `citestcycle-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `cloudplatform-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `contimage-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `contlcycle-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `cspm-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `cws-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `debugger-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `error-tracking-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `event-management-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `instrumentation-telemetry-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `intake.profile.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `kubeops-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `llmobs-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `ndm-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `ndmflow-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `netpath-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `ocimetrics-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `resources-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `sbom-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `sds-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `sentry-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `snmp-traps-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `softinv-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `webhook-intake.uk1.datadoghq.com` | `cyan.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-01f4f12969c768c0c` |
| `agent-http-intake.logs.uk1.datadoghq.com` | `gold.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03fb3a3dd752ef336` |
| `aws-kinesis-http-intake.logs.uk1.datadoghq.com` | `gold.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03fb3a3dd752ef336` |
| `eventbridge-intake.logs.uk1.datadoghq.com` | `gold.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03fb3a3dd752ef336` |
| `http-intake.logs.uk1.datadoghq.com` | `gold.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03fb3a3dd752ef336` |
| `lambda-http-intake.logs.uk1.datadoghq.com` | `gold.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03fb3a3dd752ef336` |
| `obpipeline-intake.uk1.datadoghq.com` | `gold.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03fb3a3dd752ef336` |
| `runtime-security-http-intake.logs.uk1.datadoghq.com` | `gold.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03fb3a3dd752ef336` |
| `data-obs-intake.uk1.datadoghq.com` | `lime.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-08989912d1ef253f4` |
| `trace.agent.uk1.datadoghq.com` | `lime.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-08989912d1ef253f4` |
| `orchestrator.uk1.datadoghq.com` | `linen.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-07f22a32140efaae5` |
| `*.uk1.datadoghq.com` | `orange.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0682567dcbfd55a95` |
| `custom-domains.uk1.datadoghq.com` | `orange.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0682567dcbfd55a95` |
| `*.synthetics.uk1.datadoghq.com` | `orchid.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-05399db7fb3b28c77` |
| `api.uk1.datadoghq.com` | `orchid.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-05399db7fb3b28c77` |
| `quota.browser-intake-uk1-datadoghq.com` | `orchid.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-05399db7fb3b28c77` |
| `synthetics.uk1.datadoghq.com` | `orchid.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-05399db7fb3b28c77` |
| `sourcemap-intake.uk1.datadoghq.com` | `plum.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-04fbf10021b0308cd` |
| `config.uk1.datadoghq.com` | `violet.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-0755097b02a34f9e7` |
| `dbm-metrics-intake.uk1.datadoghq.com` | `white.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03e170925a2baa029` |
| `dbquery-intake.uk1.datadoghq.com` | `white.intake.uk1.datadoghq.com` | `com.amazonaws.vpce.eu-west-2.vpce-svc-03e170925a2baa029` |
{{% /site-region %}}

## Verify that data is being sent using PrivateLink

After setting up PrivateLink, to verify that data is getting sent using PrivateLink, run the `dig` command on a machine that is on that VPC. For example, run this command if you had set up a PrivateLink for the endpoint `http-intake.logs.datadoghq.com`:

```
dig http-intake.logs.datadoghq.com
```

If logs are being sent over PrivateLink, the `ANSWER Section` section of the output shows `http-intake.logs.datadoghq.com` like in the following example. **Note**: The IP addresses you get back should be in [private IP space][1].

```
;; ANSWER SECTION:
http-intake.logs.datadoghq.com.	60 IN	A	172.31.57.3
http-intake.logs.datadoghq.com.	60 IN	A	172.31.3.10
http-intake.logs.datadoghq.com.	60 IN	A	172.31.20.174
http-intake.logs.datadoghq.com.	60 IN	A	172.31.34.135
```

If logs are not being sent over PrivateLink, the `ANSWER SECTION` of the output shows the load balancer (`4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com`) to which the logs are getting sent.

```
;; ANSWER SECTION:
http-intake.logs.datadoghq.com.	177 IN	CNAME	http-intake-l4.logs.datadoghq.com.
http-intake-l4.logs.datadoghq.com. 173 IN CNAME	l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com.
l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com. 42 IN A 3.233.158.48
l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com. 42 IN A 3.233.158.49
l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com. 42 IN A 3.233.158.50
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://en.wikipedia.org/wiki/Private_network#Private_IPv4_addresses
