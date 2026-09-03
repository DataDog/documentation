---
title: Run Failover Tests
---

<div class="alert alert-info">This is step 3 of 3 in setting up DDR. Previous: <a href="/disaster_recovery/setup/">Set up access, integrations, syncing, and agents</a>.</div>

Run failover tests to validate your DDR setup and measure your Recovery Time Objective (RTO) before an actual outage occurs.

## 1. Activate and test DDR failover in Agent-based environments

To trigger a failover of your Agents, you can click on one of the policies in [Fleet Automation][1] in your DDR org, and then click {{< ui >}}Enable{{< /ui >}}. The status of each host updates as the failover occurs.

{{< img src="/agent/guide/ddr/ddr-fa-policy-enable3.png" alt="Enable the failover policy in the DDR org" style="width:80%;" >}}

Use the steps appropriate for your environment to activate/test the DDR failover.

{{< tabs >}}
{{% tab "Agent in non-containerized environments" %}}

For Agent deployments in non-containerized environments, use the below Agent CLI commands:

```shell
agent config set multi_region_failover.failover_metrics true
agent config set multi_region_failover.failover_logs true
agent config set multi_region_failover.failover_apm true
```

{{% /tab %}}

{{% tab "Agent in containerized environments" %}}

If you are running the Agent in a containerized environment like Kubernetes, you can still use the Agent command-line tool, but you need to invoke it on the container running the Agent. You can make changes using one of the following, depending on your needs:

- [kubectl](#using-kubectl)
- [Agent configuration file (`datadog.yaml`)](#using-the-agent-configuration-file)
- [Helm chart or Datadog Operator](#using-the-helm-chart-or-datadog-operator)

##### Using kubectl

Below is an example of using `kubectl` to fail over metrics and logs for a Datadog Agent pod deployed with either the official Helm chart or Datadog Operator. The `<POD_NAME>` should be replaced with the name of the Agent pod:

```shell
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_metrics true
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_logs true
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_apm true
```

##### Using the Agent configuration file

Alternatively, you can specify the below settings in the main Agent configuration file (`datadog.yaml`) and restart the Datadog Agent for the changes to apply:

```shell
multi_region_failover:
  enabled: true
  failover_metrics: true
  failover_logs: true
  failover_apm: true
  site: NEW_ORG_SITE
  api_key: NEW_SITE_API_KEY
```

##### Using the Helm chart or Datadog Operator

You can make similar changes with either the official Helm chart or Datadog Operator if you need to specify a custom configuration. Otherwise, you can pass the settings as environment variables:

```shell
DD_MULTI_REGION_FAILOVER_ENABLED=true
DD_MULTI_REGION_FAILOVER_FAILOVER_METRICS=true
DD_MULTI_REGION_FAILOVER_FAILOVER_LOGS=true
DD_MULTI_REGION_FAILOVER_FAILOVER_APM=true
DD_MULTI_REGION_FAILOVER_SITE=ADD_NEW_ORG_SITE
DD_MULTI_REGION_FAILOVER_API_KEY=ADD_NEW_SITE_API_KEY
```

{{% /tab %}}
{{< /tabs >}}

## 2. Activate and test DDR failover in cloud integrations {#id-for-cloud}

You can test failover for your cloud integrations from your DDR organization's landing page.

{{< img src="/agent/guide/ddr/ddr-failover-main-page.png" alt="Enable the failover policy in the DDR org" style="width:80%;" >}}

On the failover landing page, you can check the status of your DDR org, or click {{< ui >}}Fail over your integrations{{< /ui >}} to test your cloud integration failover.

When no longer in failover, **disable the failover policy** in the DDR org to return integration data collection to the primary org.

During testing, integration telemetry is spread over both organizations. If you cancel a failover test, the integrations return to running in the primary data center.

## Previous step

Return to [Set up access, integrations, syncing, and agents][2] if you still need to configure dual shipping or DNS-based failover.

[1]: https://app.datadoghq.com/fleet
[2]: /disaster_recovery/setup/
