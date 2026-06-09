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

{{% site-region region="us,ap1,ap2" %}}

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

{{% site-region region="ap2" %}}
**AP2 customers:** each `Private DNS name` shown below is a routing record covering one or more agent FQDNs. See [AP2: VPC endpoints by color](#ap2-vpc-endpoints-by-color) for the complete FQDN mapping.
{{% /site-region %}}

| Datadog                   | PrivateLink service name                                                               | Agent hostname(s)                                                      |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Logs (Agent HTTP intake)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
| Logs (User HTTP intake)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
| Metrics                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
| Container Monitoring      | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
| Process Monitoring        | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
| General Intake (EVP All)  | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
| APM (Traces)              | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
| Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
| Remote Configuration      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |
| Network Device Monitoring | {{< region-param key="aws_private_link_ndm_service_name" code="true" >}}               | {{< region-param key="ndm_endpoint_private_link" code="true" >}}               |
| CI Visibility             | {{< region-param key="aws_private_link_ci_visibility_service_name" code="true" >}}     | {{< region-param key="ci_visibility_endpoint_private_link" code="true" >}}     |
| Logs (Live Tail)          | {{< region-param key="aws_private_link_logs_livetail_service_name" code="true" >}}     | {{< region-param key="logs_livetail_endpoint_private_link" code="true" >}}     |
| Echo                      | {{< region-param key="aws_private_link_echo_service_name" code="true" >}}               | {{< region-param key="echo_endpoint_private_link" code="true" >}}               |
| Slack                     | {{< region-param key="aws_private_link_slack_gw_service_name" code="true" >}}           | {{< region-param key="slack_gw_endpoint_private_link" code="true" >}}           |
| Cloud Security Management | {{< region-param key="aws_private_link_evp_compliance_service_name" code="true" >}}     | {{< region-param key="evp_compliance_endpoint_private_link" code="true" >}}     |
| Salesforce                | {{< region-param key="aws_private_link_salesforce_service_name" code="true" >}}         | {{< region-param key="salesforce_endpoint_private_link" code="true" >}}         |
| Logs (Kinesis Firehose)   | {{< region-param key="aws_private_link_evp_aws_kinesis_service_name" code="true" >}}    | {{< region-param key="evp_aws_kinesis_endpoint_private_link" code="true" >}}    |
| RUM & Session Replay      | {{< region-param key="aws_private_link_evp_replay_service_name" code="true" >}}         | {{< region-param key="evp_replay_endpoint_private_link" code="true" >}}         |
| Logs (GCP)                | {{< region-param key="aws_private_link_evp_gcp_service_name" code="true" >}}            | {{< region-param key="evp_gcp_endpoint_private_link" code="true" >}}            |
| Source Maps               | {{< region-param key="aws_private_link_evp_srcmap_service_name" code="true" >}}         | {{< region-param key="evp_srcmap_endpoint_private_link" code="true" >}}         |
| Webhooks (Build)          | {{< region-param key="aws_private_link_webhooks_service_name" code="true" >}}           | {{< region-param key="webhooks_endpoint_private_link" code="true" >}}           |
| Webhooks                  | {{< region-param key="aws_private_link_evp_webhooks_service_name" code="true" >}}       | {{< region-param key="evp_webhooks_endpoint_private_link" code="true" >}}       |
| All Datadog (EVP)         | {{< region-param key="aws_private_link_evp_all_ddog_service_name" code="true" >}}       | {{< region-param key="evp_all_ddog_endpoint_private_link" code="true" >}}       |
| HAMR All EVP              | {{< region-param key="aws_private_link_hamr_evp_all_service_name" code="true" >}}       | {{< region-param key="hamr_evp_all_endpoint_private_link" code="true" >}}       |
| Continuous Profiler       | {{< region-param key="aws_private_link_evp_profile_service_name" code="true" >}}        | {{< region-param key="evp_profile_endpoint_private_link" code="true" >}}        |
| Real User Monitoring (All)| {{< region-param key="aws_private_link_evp_all_rum_service_name" code="true" >}}        | {{< region-param key="evp_all_rum_endpoint_private_link" code="true" >}}        |
| Datadog Web               | {{< region-param key="aws_private_link_web_ddog_service_name" code="true" >}}           | {{< region-param key="web_ddog_endpoint_private_link" code="true" >}}           |
| Internal (EVP)            | {{< region-param key="aws_private_link_evp_internal_service_name" code="true" >}}       | {{< region-param key="evp_internal_endpoint_private_link" code="true" >}}       |
| Agent (EVP)               | {{< region-param key="aws_private_link_evp_agent_service_name" code="true" >}}          | {{< region-param key="evp_agent_endpoint_private_link" code="true" >}}          |
| AWS Metrics (EVP)         | {{< region-param key="aws_private_link_evp_awsmetrics_service_name" code="true" >}}     | {{< region-param key="evp_awsmetrics_endpoint_private_link" code="true" >}}     |
| Real User Monitoring (Browser)| {{< region-param key="aws_private_link_evp_browser_service_name" code="true" >}}        | {{< region-param key="evp_browser_endpoint_private_link" code="true" >}}        |
| APM (Datadog internal)    | {{< region-param key="aws_private_link_evp_apm_ddog_service_name" code="true" >}}       | {{< region-param key="evp_apm_ddog_endpoint_private_link" code="true" >}}       |
| Real User Monitoring      | {{< region-param key="aws_private_link_evp_rum_service_name" code="true" >}}            | {{< region-param key="evp_rum_endpoint_private_link" code="true" >}}            |
| OpenTelemetry (OTLP)      | {{< region-param key="aws_private_link_hamr_metrics_agent_service_name" code="true" >}} | {{< region-param key="hamr_metrics_agent_endpoint_private_link" code="true" >}} |

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

{{% site-region region="ap2" %}}
**AP2 customers:** each `Private DNS name` shown below is a routing record covering one or more agent FQDNs. See [AP2: VPC endpoints by color](#ap2-vpc-endpoints-by-color) for the complete FQDN mapping.
{{% /site-region %}}

| Datadog                   | PrivateLink service name                                                               | Agent hostname(s)                                                      |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Logs (Agent HTTP intake)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
| Logs (User HTTP intake)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
| Metrics                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
| Container Monitoring      | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
| Process Monitoring        | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
| General Intake (EVP All)  | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
| APM (Traces)              | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
| Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
| Remote Configuration      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |
| Network Device Monitoring | {{< region-param key="aws_private_link_ndm_service_name" code="true" >}}               | {{< region-param key="ndm_endpoint_private_link" code="true" >}}               |
| CI Visibility             | {{< region-param key="aws_private_link_ci_visibility_service_name" code="true" >}}     | {{< region-param key="ci_visibility_endpoint_private_link" code="true" >}}     |
| Logs (Live Tail)          | {{< region-param key="aws_private_link_logs_livetail_service_name" code="true" >}}     | {{< region-param key="logs_livetail_endpoint_private_link" code="true" >}}     |
| Echo                      | {{< region-param key="aws_private_link_echo_service_name" code="true" >}}               | {{< region-param key="echo_endpoint_private_link" code="true" >}}               |
| Slack                     | {{< region-param key="aws_private_link_slack_gw_service_name" code="true" >}}           | {{< region-param key="slack_gw_endpoint_private_link" code="true" >}}           |
| Cloud Security Management | {{< region-param key="aws_private_link_evp_compliance_service_name" code="true" >}}     | {{< region-param key="evp_compliance_endpoint_private_link" code="true" >}}     |
| Salesforce                | {{< region-param key="aws_private_link_salesforce_service_name" code="true" >}}         | {{< region-param key="salesforce_endpoint_private_link" code="true" >}}         |
| Logs (Kinesis Firehose)   | {{< region-param key="aws_private_link_evp_aws_kinesis_service_name" code="true" >}}    | {{< region-param key="evp_aws_kinesis_endpoint_private_link" code="true" >}}    |
| RUM & Session Replay      | {{< region-param key="aws_private_link_evp_replay_service_name" code="true" >}}         | {{< region-param key="evp_replay_endpoint_private_link" code="true" >}}         |
| Logs (GCP)                | {{< region-param key="aws_private_link_evp_gcp_service_name" code="true" >}}            | {{< region-param key="evp_gcp_endpoint_private_link" code="true" >}}            |
| Source Maps               | {{< region-param key="aws_private_link_evp_srcmap_service_name" code="true" >}}         | {{< region-param key="evp_srcmap_endpoint_private_link" code="true" >}}         |
| Webhooks (Build)          | {{< region-param key="aws_private_link_webhooks_service_name" code="true" >}}           | {{< region-param key="webhooks_endpoint_private_link" code="true" >}}           |
| Webhooks                  | {{< region-param key="aws_private_link_evp_webhooks_service_name" code="true" >}}       | {{< region-param key="evp_webhooks_endpoint_private_link" code="true" >}}       |
| All Datadog (EVP)         | {{< region-param key="aws_private_link_evp_all_ddog_service_name" code="true" >}}       | {{< region-param key="evp_all_ddog_endpoint_private_link" code="true" >}}       |
| HAMR All EVP              | {{< region-param key="aws_private_link_hamr_evp_all_service_name" code="true" >}}       | {{< region-param key="hamr_evp_all_endpoint_private_link" code="true" >}}       |
| Continuous Profiler       | {{< region-param key="aws_private_link_evp_profile_service_name" code="true" >}}        | {{< region-param key="evp_profile_endpoint_private_link" code="true" >}}        |
| Real User Monitoring (All)| {{< region-param key="aws_private_link_evp_all_rum_service_name" code="true" >}}        | {{< region-param key="evp_all_rum_endpoint_private_link" code="true" >}}        |
| Datadog Web               | {{< region-param key="aws_private_link_web_ddog_service_name" code="true" >}}           | {{< region-param key="web_ddog_endpoint_private_link" code="true" >}}           |
| Internal (EVP)            | {{< region-param key="aws_private_link_evp_internal_service_name" code="true" >}}       | {{< region-param key="evp_internal_endpoint_private_link" code="true" >}}       |
| Agent (EVP)               | {{< region-param key="aws_private_link_evp_agent_service_name" code="true" >}}          | {{< region-param key="evp_agent_endpoint_private_link" code="true" >}}          |
| AWS Metrics (EVP)         | {{< region-param key="aws_private_link_evp_awsmetrics_service_name" code="true" >}}     | {{< region-param key="evp_awsmetrics_endpoint_private_link" code="true" >}}     |
| Real User Monitoring (Browser)| {{< region-param key="aws_private_link_evp_browser_service_name" code="true" >}}        | {{< region-param key="evp_browser_endpoint_private_link" code="true" >}}        |
| APM (Datadog internal)    | {{< region-param key="aws_private_link_evp_apm_ddog_service_name" code="true" >}}       | {{< region-param key="evp_apm_ddog_endpoint_private_link" code="true" >}}       |
| Real User Monitoring      | {{< region-param key="aws_private_link_evp_rum_service_name" code="true" >}}            | {{< region-param key="evp_rum_endpoint_private_link" code="true" >}}            |
| OpenTelemetry (OTLP)      | {{< region-param key="aws_private_link_hamr_metrics_agent_service_name" code="true" >}} | {{< region-param key="hamr_metrics_agent_endpoint_private_link" code="true" >}} |

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

{{% site-region region="ap2" %}}
**AP2 customers:** each `Private DNS name` shown below is a routing record covering one or more agent FQDNs. See [AP2: VPC endpoints by color](#ap2-vpc-endpoints-by-color) for the complete FQDN mapping.
{{% /site-region %}}

| Datadog                   | PrivateLink service name                                                               |
|---------------------------|----------------------------------------------------------------------------------------|
| Logs (Agent HTTP intake)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        |
| Logs (User HTTP intake)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               |
| Metrics                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           |
| Container Monitoring      | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        |
| Process Monitoring        | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           |
| General Intake (EVP All)  | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         |
| APM (Traces)              | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            |
| Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               |
| Remote Configuration      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     |
| Network Device Monitoring | {{< region-param key="aws_private_link_ndm_service_name" code="true" >}}               |
| CI Visibility             | {{< region-param key="aws_private_link_ci_visibility_service_name" code="true" >}}     |
| Logs (Live Tail)          | {{< region-param key="aws_private_link_logs_livetail_service_name" code="true" >}}     |
| Echo                      | {{< region-param key="aws_private_link_echo_service_name" code="true" >}}               |
| Slack                     | {{< region-param key="aws_private_link_slack_gw_service_name" code="true" >}}           |
| Cloud Security Management | {{< region-param key="aws_private_link_evp_compliance_service_name" code="true" >}}     |
| Salesforce                | {{< region-param key="aws_private_link_salesforce_service_name" code="true" >}}         |
| Logs (Kinesis Firehose)   | {{< region-param key="aws_private_link_evp_aws_kinesis_service_name" code="true" >}}    |
| RUM & Session Replay      | {{< region-param key="aws_private_link_evp_replay_service_name" code="true" >}}         |
| Logs (GCP)                | {{< region-param key="aws_private_link_evp_gcp_service_name" code="true" >}}            |
| Source Maps               | {{< region-param key="aws_private_link_evp_srcmap_service_name" code="true" >}}         |
| Webhooks (Build)          | {{< region-param key="aws_private_link_webhooks_service_name" code="true" >}}           |
| Webhooks                  | {{< region-param key="aws_private_link_evp_webhooks_service_name" code="true" >}}       |
| All Datadog (EVP)         | {{< region-param key="aws_private_link_evp_all_ddog_service_name" code="true" >}}       |
| HAMR All EVP              | {{< region-param key="aws_private_link_hamr_evp_all_service_name" code="true" >}}       |
| Continuous Profiler       | {{< region-param key="aws_private_link_evp_profile_service_name" code="true" >}}        |
| Real User Monitoring (All)| {{< region-param key="aws_private_link_evp_all_rum_service_name" code="true" >}}        |
| Datadog Web               | {{< region-param key="aws_private_link_web_ddog_service_name" code="true" >}}           |
| Internal (EVP)            | {{< region-param key="aws_private_link_evp_internal_service_name" code="true" >}}       |
| Agent (EVP)               | {{< region-param key="aws_private_link_evp_agent_service_name" code="true" >}}          |
| AWS Metrics (EVP)         | {{< region-param key="aws_private_link_evp_awsmetrics_service_name" code="true" >}}     |
| Real User Monitoring (Browser)| {{< region-param key="aws_private_link_evp_browser_service_name" code="true" >}}        |
| APM (Datadog internal)    | {{< region-param key="aws_private_link_evp_apm_ddog_service_name" code="true" >}}       |
| Real User Monitoring      | {{< region-param key="aws_private_link_evp_rum_service_name" code="true" >}}            |
| OpenTelemetry (OTLP)      | {{< region-param key="aws_private_link_hamr_metrics_agent_service_name" code="true" >}} |

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

  {{% site-region region="ap2" %}}
**AP2 customers:** each `Private DNS name` shown below is a routing record covering one or more agent FQDNs. See [AP2: VPC endpoints by color](#ap2-vpc-endpoints-by-color) for the complete FQDN mapping.
{{% /site-region %}}

| Datadog                   | PrivateLink service name                                                               | Agent hostname(s)                                                      |
  |---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
  | Logs (Agent HTTP intake)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
  | Logs (User HTTP intake)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
  | API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
  | Metrics                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
  | Container Monitoring      | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
  | Process Monitoring        | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
  | General Intake (EVP All)  | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
  | APM (Traces)              | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
  | Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
  | Remote Configuration      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |
  | Network Device Monitoring | {{< region-param key="aws_private_link_ndm_service_name" code="true" >}}               | {{< region-param key="ndm_endpoint_private_link" code="true" >}}               |
  | CI Visibility             | {{< region-param key="aws_private_link_ci_visibility_service_name" code="true" >}}     | {{< region-param key="ci_visibility_endpoint_private_link" code="true" >}}     |
  | Logs (Live Tail)          | {{< region-param key="aws_private_link_logs_livetail_service_name" code="true" >}}     | {{< region-param key="logs_livetail_endpoint_private_link" code="true" >}}     |
  | Echo                      | {{< region-param key="aws_private_link_echo_service_name" code="true" >}}               | {{< region-param key="echo_endpoint_private_link" code="true" >}}               |
  | Slack                     | {{< region-param key="aws_private_link_slack_gw_service_name" code="true" >}}           | {{< region-param key="slack_gw_endpoint_private_link" code="true" >}}           |
  | Cloud Security Management | {{< region-param key="aws_private_link_evp_compliance_service_name" code="true" >}}     | {{< region-param key="evp_compliance_endpoint_private_link" code="true" >}}     |
  | Salesforce                | {{< region-param key="aws_private_link_salesforce_service_name" code="true" >}}         | {{< region-param key="salesforce_endpoint_private_link" code="true" >}}         |
  | Logs (Kinesis Firehose)   | {{< region-param key="aws_private_link_evp_aws_kinesis_service_name" code="true" >}}    | {{< region-param key="evp_aws_kinesis_endpoint_private_link" code="true" >}}    |
  | RUM & Session Replay      | {{< region-param key="aws_private_link_evp_replay_service_name" code="true" >}}         | {{< region-param key="evp_replay_endpoint_private_link" code="true" >}}         |
  | Logs (GCP)                | {{< region-param key="aws_private_link_evp_gcp_service_name" code="true" >}}            | {{< region-param key="evp_gcp_endpoint_private_link" code="true" >}}            |
  | Source Maps               | {{< region-param key="aws_private_link_evp_srcmap_service_name" code="true" >}}         | {{< region-param key="evp_srcmap_endpoint_private_link" code="true" >}}         |
  | Webhooks (Build)          | {{< region-param key="aws_private_link_webhooks_service_name" code="true" >}}           | {{< region-param key="webhooks_endpoint_private_link" code="true" >}}           |
  | Webhooks                  | {{< region-param key="aws_private_link_evp_webhooks_service_name" code="true" >}}       | {{< region-param key="evp_webhooks_endpoint_private_link" code="true" >}}       |
  | All Datadog (EVP)         | {{< region-param key="aws_private_link_evp_all_ddog_service_name" code="true" >}}       | {{< region-param key="evp_all_ddog_endpoint_private_link" code="true" >}}       |
  | HAMR All EVP              | {{< region-param key="aws_private_link_hamr_evp_all_service_name" code="true" >}}       | {{< region-param key="hamr_evp_all_endpoint_private_link" code="true" >}}       |
  | Continuous Profiler       | {{< region-param key="aws_private_link_evp_profile_service_name" code="true" >}}        | {{< region-param key="evp_profile_endpoint_private_link" code="true" >}}        |
  | Real User Monitoring (All)| {{< region-param key="aws_private_link_evp_all_rum_service_name" code="true" >}}        | {{< region-param key="evp_all_rum_endpoint_private_link" code="true" >}}        |
  | Datadog Web               | {{< region-param key="aws_private_link_web_ddog_service_name" code="true" >}}           | {{< region-param key="web_ddog_endpoint_private_link" code="true" >}}           |
  | Internal (EVP)            | {{< region-param key="aws_private_link_evp_internal_service_name" code="true" >}}       | {{< region-param key="evp_internal_endpoint_private_link" code="true" >}}       |
  | Agent (EVP)               | {{< region-param key="aws_private_link_evp_agent_service_name" code="true" >}}          | {{< region-param key="evp_agent_endpoint_private_link" code="true" >}}          |
  | AWS Metrics (EVP)         | {{< region-param key="aws_private_link_evp_awsmetrics_service_name" code="true" >}}     | {{< region-param key="evp_awsmetrics_endpoint_private_link" code="true" >}}     |
  | Real User Monitoring (Browser)| {{< region-param key="aws_private_link_evp_browser_service_name" code="true" >}}        | {{< region-param key="evp_browser_endpoint_private_link" code="true" >}}        |
  | APM (Datadog internal)    | {{< region-param key="aws_private_link_evp_apm_ddog_service_name" code="true" >}}       | {{< region-param key="evp_apm_ddog_endpoint_private_link" code="true" >}}       |
  | Real User Monitoring      | {{< region-param key="aws_private_link_evp_rum_service_name" code="true" >}}            | {{< region-param key="evp_rum_endpoint_private_link" code="true" >}}            |
  | OpenTelemetry (OTLP)      | {{< region-param key="aws_private_link_hamr_metrics_agent_service_name" code="true" >}} | {{< region-param key="hamr_metrics_agent_endpoint_private_link" code="true" >}} |

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

{{% site-region region="ap2" %}}
**Note for AP2:** On AP2, PrivateLink endpoints use an intermediate color-named routing record instead of the agent hostname directly. The `PrivateDnsName` returned by the command above will be a record like `beige.intake.ap2.datadoghq.com`, not the agent-facing hostname. Create your Route53 hosted zone for _that_ color record. Because the customer-facing agent hostnames (for example, `metrics.agent.ap2.datadoghq.com`) CNAME to the color record, overriding the color record in your VPC is sufficient — you do not need a separate hosted zone per agent hostname.
{{% /site-region %}}

2. Within each new Route53 private hosted zone, create an A record with the same name. Toggle the {{< ui >}}Alias{{< /ui >}} option, then under {{< ui >}}Route traffic to{{< /ui >}}, choose {{< ui >}}Alias to VPC endpoint{{< /ui >}}, **{{< region-param key="aws_region" >}}**, and enter the DNS name of the VPC endpoint associated with the DNS name.

   **Notes**:
      - To retrieve your DNS name, see the [View endpoint service private DNS name configuration documentation.][4]
      - The Agent sends telemetry to versioned endpoints, for example, <code>[version]-app.agent.{{< region-param key="dd_site" >}}</code> which resolves to <code>metrics.agent.{{< region-param key="dd_site" >}}</code> through a CNAME alias. Therefore, you only need to set up a private hosted zone for <code>metrics.agent.{{< region-param key="dd_site" >}}</code>.
      - {{% site-region region="ap2" %}}**AP2 only:** The agent hostname shown in the table above (for example, `metrics.agent.ap2.datadoghq.com`) CNAME-resolves to an intermediate color record (for example, `beige.intake.ap2.datadoghq.com`). The Route53 hosted zone you need to create is for the color record, not the agent hostname. Retrieve the correct hosted zone name for each service using `DescribeVpcEndpointServices` as shown above.{{% /site-region %}}

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

{{% site-region region="ap2" %}}

## AP2: VPC endpoints by color

On AP2, each PrivateLink VPC endpoint is identified by a color. Each color maps to one VPC service endpoint and one Route53 private hosted zone, and covers one or more agent FQDNs. Create one VPC endpoint and one Route53 private hosted zone per color. No per-FQDN configuration is required.

Each FQDN table lists the specific Datadog service it serves and the high-level category that service belongs to.

<!--
  INTENTIONAL OMISSIONS — do not add the following endpoints to this section:

  - On Call (primary):   green.intake.ap2.datadoghq.com  (aws_private_link_on_call_service_name / on_call_endpoint_private_link)
  - On Call (secondary): ivory.intake.ap2.datadoghq.com  (aws_private_link_on_call_secondary_service_name / on_call_secondary_endpoint_private_link)
  - Datadog Web (orange): orange.intake.ap2.datadoghq.com (aws_private_link_web_ddog_service_name / web_ddog_endpoint_private_link)

  These three endpoints serve non-agent, non-telemetry purposes (On-Call notification delivery and
  Datadog web UI access) and are not intended for customer PrivateLink configuration. They are
  defined in regions.config.js for completeness but should not appear in this color reference or
  in the service-name tables above.
-->

### Aqua (`vpce-svc-01b61a61d21fc7273`)

- **VPC service endpoint:** `com.amazonaws.vpce.ap-southeast-2.vpce-svc-01b61a61d21fc7273`
- **Private DNS name (Route53 zone):** `aqua.intake.ap2.datadoghq.com`

**FQDNs covered:**

| FQDN | Product | Category |
|------|---------|----------|
| `gcp-intake.logs.ap2.datadoghq.com` | [Log Management](https://www.datadoghq.com/product/log-management/) | Observability |

### Beige (`vpce-svc-06a30d6a016b746ff`)

- **VPC service endpoint:** `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06a30d6a016b746ff`
- **Private DNS name (Route53 zone):** `beige.intake.ap2.datadoghq.com`

**FQDNs covered:**

| FQDN | Product | Category |
|------|---------|----------|
| `*.agent.ap2.datadoghq.com` | [Infrastructure Monitoring](https://www.datadoghq.com/product/infrastructure-monitoring/) | Observability |
| `agent.ap2.datadoghq.com` | [Infrastructure Monitoring](https://www.datadoghq.com/product/infrastructure-monitoring/) | Observability |

### Bisque (`vpce-svc-0c26ca335d93a68b5`)

- **VPC service endpoint:** `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0c26ca335d93a68b5`
- **Private DNS name (Route53 zone):** `bisque.intake.ap2.datadoghq.com`

**FQDNs covered:**

| FQDN | Product | Category |
|------|---------|----------|
| `process.ap2.datadoghq.com` | [Infrastructure Monitoring](https://www.datadoghq.com/product/infrastructure-monitoring/) | Observability |

### Brown (`vpce-svc-04c61207a01a73496`)

- **VPC service endpoint:** `com.amazonaws.vpce.ap-southeast-2.vpce-svc-04c61207a01a73496`
- **Private DNS name (Route53 zone):** `brown.intake.ap2.datadoghq.com`

**FQDNs covered:**

| FQDN | Product | Category |
|------|---------|----------|
| `*.integrations.otlp.ap2.datadoghq.com` | [Application Performance Monitoring](https://www.datadoghq.com/product/apm/) | Observability |
| `opamp.ap2.datadoghq.com` | [Fleet Automation](https://www.datadoghq.com/product/fleet-automation/) | Platform Capabilities |
| `otlp.ap2.datadoghq.com` | [Application Performance Monitoring](https://www.datadoghq.com/product/apm/) | Observability |

### Cyan (`vpce-svc-0d936da0e6a30d3cd`)

- **VPC service endpoint:** `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd`
- **Private DNS name (Route53 zone):** `cyan.intake.ap2.datadoghq.com`

**FQDNs covered:**

| FQDN | Product | Category |
|------|---------|----------|
| `agenthealth-intake.ap2.datadoghq.com` | [Fleet Automation](https://www.datadoghq.com/product/fleet-automation/) | Platform Capabilities |
| `awsmetrics-intake.ap2.datadoghq.com` | [Integrations](https://www.datadoghq.com/product/platform/integrations/) | Platform Capabilities |
| `ci-intake.ap2.datadoghq.com` | [CI Visibility](https://www.datadoghq.com/product/ci-cd-monitoring/) | Software Delivery |
| `cicodescan-intake.ap2.datadoghq.com` | [Code Security](https://www.datadoghq.com/product/code-security/) | Security |
| `cireport-intake.ap2.datadoghq.com` | [CI Visibility](https://www.datadoghq.com/product/ci-cd-monitoring/) | Software Delivery |
| `citestcov-intake.ap2.datadoghq.com` | [Test Optimization](https://www.datadoghq.com/product/test-optimization/) | Software Delivery |
| `citestcycle-intake.ap2.datadoghq.com` | [Test Optimization](https://www.datadoghq.com/product/test-optimization/) | Software Delivery |
| `cloudplatform-intake.ap2.datadoghq.com` | [Integrations](https://www.datadoghq.com/product/platform/integrations/) | Platform Capabilities |
| `contimage-intake.ap2.datadoghq.com` | [Container Monitoring](https://www.datadoghq.com/product/container-monitoring/) | Observability |
| `contlcycle-intake.ap2.datadoghq.com` | [Container Monitoring](https://www.datadoghq.com/product/container-monitoring/) | Observability |
| `cspm-intake.ap2.datadoghq.com` | [Cloud Security](https://www.datadoghq.com/product/cloud-security/) | Security |
| `cws-intake.ap2.datadoghq.com` | [Cloud Security](https://www.datadoghq.com/product/cloud-security/) | Security |
| `debugger-intake.ap2.datadoghq.com` | [Dynamic Instrumentation](https://www.datadoghq.com/product/dynamic-instrumentation/) | Observability |
| `error-tracking-intake.ap2.datadoghq.com` | [Error Tracking](https://www.datadoghq.com/product/error-tracking/) | Digital Experience |
| `event-management-intake.ap2.datadoghq.com` | [Event Management](https://www.datadoghq.com/product/event-management/) | Service Management |
| `instrumentation-telemetry-intake.ap2.datadoghq.com` | [Application Performance Monitoring](https://www.datadoghq.com/product/apm/) | Observability |
| `intake.profile.ap2.datadoghq.com` | [Continuous Profiler](https://www.datadoghq.com/product/code-profiling/) | Observability |
| `kubeops-intake.ap2.datadoghq.com` | [Kubernetes Autoscaling](https://www.datadoghq.com/product/kubernetes-autoscaling/) | Observability |
| `llmobs-intake.ap2.datadoghq.com` | [LLM Observability](https://www.datadoghq.com/product/ai/llm-observability/) | AI |
| `ndm-intake.ap2.datadoghq.com` | [Network Monitoring](https://www.datadoghq.com/product/network-monitoring/) | Observability |
| `ndmflow-intake.ap2.datadoghq.com` | [Network Monitoring](https://www.datadoghq.com/product/network-monitoring/) | Observability |
| `netpath-intake.ap2.datadoghq.com` | [Network Monitoring](https://www.datadoghq.com/product/network-monitoring/) | Observability |
| `ocimetrics-intake.ap2.datadoghq.com` | [Integrations](https://www.datadoghq.com/product/platform/integrations/) | Platform Capabilities |
| `resources-intake.ap2.datadoghq.com` | [Infrastructure Monitoring](https://www.datadoghq.com/product/infrastructure-monitoring/) | Observability |
| `sbom-intake.ap2.datadoghq.com` | [Cloud Security](https://www.datadoghq.com/product/cloud-security/) | Security |
| `sds-intake.ap2.datadoghq.com` | [Sensitive Data Scanner](https://www.datadoghq.com/product/sensitive-data-scanner/) | Security |
| `sentry-intake.ap2.datadoghq.com` | [Error Tracking](https://www.datadoghq.com/product/error-tracking/) | Digital Experience |
| `snmp-traps-intake.ap2.datadoghq.com` | [Network Monitoring](https://www.datadoghq.com/product/network-monitoring/) | Observability |
| `softinv-intake.ap2.datadoghq.com` | [Infrastructure Monitoring](https://www.datadoghq.com/product/infrastructure-monitoring/) | Observability |
| `webhook-intake.ap2.datadoghq.com` | [CI Visibility](https://www.datadoghq.com/product/ci-cd-monitoring/) | Software Delivery |

### Gold (`vpce-svc-06460db30a7cfdace`)

- **VPC service endpoint:** `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace`
- **Private DNS name (Route53 zone):** `gold.intake.ap2.datadoghq.com`

**FQDNs covered:**

| FQDN | Product | Category |
|------|---------|----------|
| `agent-http-intake.logs.ap2.datadoghq.com` | [Log Management](https://www.datadoghq.com/product/log-management/) | Observability |
| `aws-kinesis-http-intake.logs.ap2.datadoghq.com` | [Log Management](https://www.datadoghq.com/product/log-management/) | Observability |
| `eventbridge-intake.logs.ap2.datadoghq.com` | [Log Management](https://www.datadoghq.com/product/log-management/) | Observability |
| `http-intake.logs.ap2.datadoghq.com` | [Log Management](https://www.datadoghq.com/product/log-management/) | Observability |
| `lambda-http-intake.logs.ap2.datadoghq.com` | [Log Management](https://www.datadoghq.com/product/log-management/) | Observability |
| `obpipeline-intake.ap2.datadoghq.com` | [Observability Pipelines](https://www.datadoghq.com/product/observability-pipelines/) | Observability |
| `runtime-security-http-intake.logs.ap2.datadoghq.com` | [Cloud Security](https://www.datadoghq.com/product/cloud-security/) | Security |

### Indigo (`vpce-svc-0545109555aa68e7e`)

- **VPC service endpoint:** `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0545109555aa68e7e`
- **Private DNS name (Route53 zone):** `indigo.intake.ap2.datadoghq.com`

**FQDNs covered:**

| FQDN | Product | Category |
|------|---------|----------|
| `live.logs.ap2.datadoghq.com` | [Log Management](https://www.datadoghq.com/product/log-management/) | Observability |

### Lime (`vpce-svc-0f3e01f4180b2ae09`)

- **VPC service endpoint:** `com.amazonaws.vpce.ap-southeast-2.vpce-svc-0f3e01f4180b2ae09`
- **Private DNS name (Route53 zone):** `lime.intake.ap2.datadoghq.com`

**FQDNs covered:**

| FQDN | Product | Category |
|------|---------|----------|
| `data-obs-intake.ap2.datadoghq.com` | [Data Observability](https://www.datadoghq.com/product/data-observability/quality-monitoring/) | Observability |
| `trace.agent.ap2.datadoghq.com` | [Application Performance Monitoring](https://www.datadoghq.com/product/apm/) | Observability |

### Linen (`vpce-svc-031da3ffac78ef902`)

- **VPC service endpoint:** `com.amazonaws.vpce.ap-southeast-2.vpce-svc-031da3ffac78ef902`
- **Private DNS name (Route53 zone):** `linen.intake.ap2.datadoghq.com`

**FQDNs covered:**

| FQDN | Product | Category |
|------|---------|----------|
| `orchestrator.ap2.datadoghq.com` | [Container Monitoring](https://www.datadoghq.com/product/container-monitoring/) | Observability |

### Orchid (`vpce-svc-06ec78b291ce8020a`)

- **VPC service endpoint:** `com.amazonaws.vpce.ap-southeast-2.vpce-svc-06ec78b291ce8020a`
- **Private DNS name (Route53 zone):** `orchid.intake.ap2.datadoghq.com`

**FQDNs covered:**

| FQDN | Product | Category |
|------|---------|----------|
| `*.synthetics.ap2.datadoghq.com` | [Synthetic Monitoring](https://www.datadoghq.com/product/synthetic-monitoring/) | Digital Experience |
| `api.ap2.datadoghq.com` | [Platform (API)](https://www.datadoghq.com/product/) | Platform Capabilities |
| `quota.browser-intake-ap2-datadoghq.com` | [Real User Monitoring](https://www.datadoghq.com/product/real-user-monitoring/) | Digital Experience |
| `synthetics.ap2.datadoghq.com` | [Synthetic Monitoring](https://www.datadoghq.com/product/synthetic-monitoring/) | Digital Experience |

### Plum (`vpce-svc-028e4348e80fa73f5`)

- **VPC service endpoint:** `com.amazonaws.vpce.ap-southeast-2.vpce-svc-028e4348e80fa73f5`
- **Private DNS name (Route53 zone):** `plum.intake.ap2.datadoghq.com`

**FQDNs covered:**

| FQDN | Product | Category |
|------|---------|----------|
| `sourcemap-intake.ap2.datadoghq.com` | [Error Tracking](https://www.datadoghq.com/product/error-tracking/) | Digital Experience |

### Violet (`vpce-svc-01f8f80f4cb97bd10`)

- **VPC service endpoint:** `com.amazonaws.vpce.ap-southeast-2.vpce-svc-01f8f80f4cb97bd10`
- **Private DNS name (Route53 zone):** `violet.intake.ap2.datadoghq.com`

**FQDNs covered:**

| FQDN | Product | Category |
|------|---------|----------|
| `config.ap2.datadoghq.com` | [Fleet Automation](https://www.datadoghq.com/product/fleet-automation/) | Platform Capabilities |

### White (`vpce-svc-094469ee7a178f448`)

- **VPC service endpoint:** `com.amazonaws.vpce.ap-southeast-2.vpce-svc-094469ee7a178f448`
- **Private DNS name (Route53 zone):** `white.intake.ap2.datadoghq.com`

**FQDNs covered:**

| FQDN | Product | Category |
|------|---------|----------|
| `dbm-metrics-intake.ap2.datadoghq.com` | [Database Monitoring](https://www.datadoghq.com/product/database-monitoring/) | Observability |
| `dbquery-intake.ap2.datadoghq.com` | [Database Monitoring](https://www.datadoghq.com/product/database-monitoring/) | Observability |

{{% /site-region %}}

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
