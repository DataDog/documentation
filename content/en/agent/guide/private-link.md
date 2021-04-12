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
| `com.amazonaws.vpce.us-east-1.vpce-svc-056576c12b36056ca`  |

{{% /tab %}}
{{% tab "Logs" %}}

| Forwarder | Datadog Logs Service Name |
| --------- | ------------------------- |
| Datadog Agent | `com.amazonaws.vpce.us-east-1.vpce-svc-0a2aef8496ee043bf` |
| Lambda or custom forwarder | `com.amazonaws.vpce.us-east-1.vpce-svc-06394d10ccaf6fb97` |

{{% /tab %}}
{{% tab "API" %}}

| Datadog API Service Name                                  |
| --------------------------------------------------------- |
| `com.amazonaws.vpce.us-east-1.vpce-svc-02a4a57bc703929a0` |

{{% /tab %}}
{{% tab "Processes" %}}

| Datadog Process Monitoring Service Name                   |
| --------------------------------------------------------- |
| `com.amazonaws.vpce.us-east-1.vpce-svc-05316fe237f6d8ddd` |

{{% /tab %}}
{{% tab "Traces" %}}

| Datadog Trace Service Name                                |
| --------------------------------------------------------- |
| `com.amazonaws.vpce.us-east-1.vpce-svc-07672d13af0033c24` |

{{% /tab %}}
{{% tab "Kubernetes Resources" %}}

| Datadog Kubernetes Explorer Service Name                  |
| --------------------------------------------------------- |
| `com.amazonaws.vpce.us-east-1.vpce-svc-0b03d6756bf6c2ec3` |

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
    dd_url: https://pvtlink.agent.datadoghq.com
    ```

2. [Restart your Agent][2] to send metrics to Datadog through AWS PrivateLink.

**Note**: If you are using the container Agent, set the environment variable instead: `DD_DD_URL="https://pvtlink.agent.datadoghq.com"`. Configure this environment variable on _both_ the Cluster Agent & Node Agent if using the Cluster Agent to monitor a Kubernetes environment.


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

**Using the Lambda or a custom forwarder**:

Add `DD_URL: api-pvtlink.logs.datadoghq.com` in your [Datadog Lambda function][4] environment variable to use the private link when forwarding AWS Service Logs to Datadog.

By default, the forwarder's API key is stored in Secrets Manager. The Secrets Manager endpoint needs to be added to the VPC. You can follow the instructions [here for adding AWS services to a VPC][5].

When installing the forwarder with the CloudFormation template, enable 'DdUsePrivateLink' and set at least one subnet ID and security group.

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /agent/logs/?tab=tailexistingfiles#send-logs-over-https
[3]: /agent/guide/agent-commands/#restart-the-agent
[4]: /integrations/amazon_web_services/#set-up-the-datadog-lambda-function
[5]: https://docs.aws.amazon.com/vpc/latest/userguide/vpce-interface.html#create-interface-endpoint
{{% /tab %}}
{{% tab "API" %}}

To send data to the Datadog API or consume data from it through this new endpoint, replace your API call host signature `api.datadoghq.com/api/` with `pvtlink.api.datadoghq.com/api/`.

{{% /tab %}}
{{% tab "Processes" %}}

To forward your processes metrics to Datadog using this new VPC endpoint, configure `pvtlink.process.datadoghq.com` as your new processes data destination:

1. Update the `process_dd_url` in the `process_config:` section of the [Agent `datadog.yaml` configuration file][1]:

    ```yaml
    process_dd_url: https://pvtlink.process.datadoghq.com
    ```

2. [Restart your Agent][2] to send processes data to Datadog through AWS PrivateLink.

**Note**: If you are using the container Agent, set the environment variable instead: `DD_PROCESS_AGENT_URL="https://pvtlink.process.datadoghq.com"`. Configure this environment variable on _both_ the Cluster Agent & Node Agent if using the Cluster Agent to monitor a Kubernetes environment.


[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Traces" %}}

To forward your trace metrics to Datadog using this new VPC endpoint, configure `trace-pvtlink.agent.datadoghq.com` as your new trace destination:

1. Update the `apm_dd_url` parameter in the `apm_config` section of the [Agent `datadog.yaml` configuration file][1]:

    ```yaml
    apm_dd_url: https://trace-pvtlink.agent.datadoghq.com
    ```

2. [Restart your Agent][2] to send traces to Datadog through AWS PrivateLink.

**Note**: If you are using the container Agent, set the environment variable instead: `DD_APM_DD_URL="https://trace-pvtlink.agent.datadoghq.com"`. Configure this environment variable on _both_ the Cluster Agent & Node Agent if using the Cluster Agent to monitor a Kubernetes environment.


[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Kubernetes Resources" %}}

To forward your Kubernetes resources to Datadog using this new VPC endpoint, configure `orchestrator-pvtlink.datadoghq.com` as your new orchestrator data destination:

1. Update the `dd_url` parameter in the [Agent `datadog.yaml` configuration file][1]:

    ```yaml
    dd_url: orchestrator-pvtlink.datadoghq.com
    ```

   For the container Agent, set the following environment variable instead:

   ```
   DD_ORCHESTRATOR_EXPLORER_ORCHESTRATOR_DD_URL="orchestrator-pvtlink.datadoghq.com"
   ```

   Set this for the process Agent as well. If you are using the Cluster Agent to monitor a Kubernetes environment, also configure this environment variable for the Cluster Agent and the node Agent.

2. [Restart your Agent][2] to send Kubernetes resources to Datadog through AWS PrivateLink.


[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

## Advanced usage

### Inter-region peering

To route traffic to Datadog’s PrivateLink offering in `us-east-1` from other regions, use inter-region [Amazon VPC peering][3]. 

Inter-region VPC peering enables you to establish connections between VPCs across different AWS regions. This allows VPC resources in different regions to communicate with each other using private IP addresses.

For more information, see the [Amazon VPC peering documentation][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/privatelink/
[2]: /help/
[3]: https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html
