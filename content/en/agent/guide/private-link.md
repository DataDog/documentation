---
title: How to setup a PrivateLink to Datadog?
kind: guide
further_reading:
- link: "agent/logs"
  tag: "Documentation"
  text: "Enable log collection with the Agent."
- link: "/integrations/amazon_web_services/#set-up-the-datadog-lambda-function"
  tag: "Documentation"
  text: "Collect logs from your AWS services"
---

<div class="alert alert-warning">
The PrivateLink setup is only available to <b>forward Logs to Datadog in AWS us-east-1 region</b>. Reach out to <a href="/help">Datadog Support</a> to enable this feature for your organization.
</div>

The goal of this guide is to explain how to configure a PrviateLink for a given VPC. This allows you to send your log traffic to Datadog without going over the public internet, thereby reducing transit costs and improving security.

## Overview

Datadog provides a VPC endpoint service which lives in the AWS `us-east-1` region.

The overall process consist in configuring an internal VPC endpoint that local Datadog Agents can send data to. This VPC endpoint is then peered with the Datadog VPC endpoint service.

{{< img src="agent/guide/private_link/vpc_schema.png" alt="VPC Schema" >}}

## Create your VPC endpoint

1. Connect to the AWS console and create a new VPC endpoint:
    {{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="Create VPC endpoint" style="width:60%;" >}}
2. Select **Find service by name**.
3. Fill the *service name* text box with: `com.amazonaws.vpce.us-east-1.vpce-svc-<UNIQUE_ID>` where `<UNIQUE_ID>` is the ID communicated by the Datadog [Support team][1]:
    {{< img src="agent/guide/private_link/vpc_service_name.png" alt="VPC service name" style="width:60%;" >}}
4. Hit the *verify* button.
    **Note**: If it does not return *Service name Found*, reach out to [Datadog support team][1] as this means that your AWS account id was not authorised to connect on the Datadog VPC service endpoint.
5. Choose the VPC and subnets that should be peered with the Datadog VPC service endpoint.
    **Note**: The VPC must be in `us-east-1` and it's recommend to set subnets with all of the following Availability zones id: `use1-az6`, `use1-az2`, and `Use1-az4`:
    {{< img src="agent/guide/private_link/saved_az.png" alt="Saved AZ" style="width:60%;" >}}
6. Choose the security group of your choice to control what can send traffic to this VPC endpoint.
    **The security group must accept inbound and outbound traffic on port `443`**.
7. Hit **Create endpoint** at the bottom of the screen, if successful you should see this:
    {{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="VPC endpoint created" style="width:60%;" >}}
8. Click on the VPC endpoint ID to check its status.
9. Wait for the status to move from *Pending* to *Available* (it can take up to 10 minutes):
    {{< img src="agent/guide/private_link/vpc_status.png" alt="VPC status" style="width:60%;" >}}

Once it shows *Available*, the AWS PrivateLink is ready to be used. The next step is to update your configurations to use `logs.vpce.datadoghq.com` as the target endpoint for your Datadog Agents, Lambda forwarder, and/or other clients shipping logs to Datadog.

## Forwarding your Logs to Datadog

### Get the DNS name

From the created VPC endpoint details, select the DNS name:

{{< img src="agent/guide/private_link/dns_name_selection.png" alt="DNS name selection" style="width:80%;" >}}

### Configure the Datadog Agent

1. Add the following to the [Agent `datadog.yaml` configuration file][1]:

    ```yaml
    logs_config:
      use_http: true
      logs_dd_url: logs.vpce.datadoghq.com:443
    ```

    * The `use_http` variable is used to force the Datadog Agent to send Logs in HTTPS which is the protocol supported by the VPC endpoint. More information about this available in the [Agent Log collection documentation][2].
    * The `logs_dd_url` variable is used to send Logs to the VPC endpoint.

2. [Restart your Agent][3] to send Logs to Datadog through AWS PrivateLink.

### Configure the Lambda forwarder

Add `DD_URL: logs.vpce.datadoghq.com` in your [Datadog Lambda function][4] environment variable to use the private link when forwarding AWS Service Logs to Datadog.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /agent/logs/?tab=tailexistingfiles#send-logs-over-https
[3]: /agent/guide/agent-commands/#restart-the-agent
[4]: /integrations/amazon_web_services/#set-up-the-datadog-lambda-function
