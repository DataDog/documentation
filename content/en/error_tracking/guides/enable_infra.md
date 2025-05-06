---
title: Enable Infrastructure Monitoring
further_reading:
- link: "/infrastructure"
  tag: "Documentation"
  text: "Learn about Infrastructure Monitoring"
- link: "/error_tracking/guides/enable_apm"
  tag: "Guide"
  text: "Enable APM"
---

[Infrastructure monitoring][1] includes core Datadog features that visualize, monitor, and measure the performance of your hosts, containers, and processes. This guide explains how to update the Datadog Agent configuration to enable infrastructure monitoring and leverage its features on top of standalone backend error tracking.

{{< tabs >}}
{{% tab "Linux host or VM" %}}

If your agent is deployed on a Linux host, the configuration update depends on the method you used to install the agent.

{{< collapse-content title="Single Step Instrumentation" level="h5" >}}
For a Datadog agent installed using the one-line installation command:

1. Open the [datadog.yaml configuration file][2].
2. Remove the `enable_payloads` top-level attribute:

   ```diff
   - enable_payloads:
   -   series: false
   -   events: false
   -   service_checks: false
   -   sketches: false

     apm_config:
       enabled: true
       error_tracking_standalone:
         enabled: true
   ```

3. [Restart the Agent][3].
   {{< /collapse-content >}}

{{< collapse-content title="Using Datadog tracing libraries" level="h5" >}}
For a Datadog agent configured manually for Backend Error Tracking:

1. Open the [datadog.yaml configuration file][2].
2. Remove the `core_agent` top-level attribute:

   ```diff
   - core_agent:
   -   enabled: false
     apm_config:
       error_tracking_standalone:
         enabled: true
   ```

3. [Restart the Agent][3].
   {{< /collapse-content >}}

[2]: /agent/configuration/agent-configuration-files
[3]: /agent/configuration/agent-commands/#restart-the-agent

{{% /tab %}}
{{% tab "Kubernetes" %}}

If your agent is deployed in Kubernetes, you need to update its configuration in Datadog Operator or Helm depending on the method you used to install the agent.

{{< collapse-content title="Helm" level="h5" >}}
For a Datadog agent installed with Helm:

1. Update your `datadog-values.yaml` file, replacing the `site` and `env` values appropriately:

   ```diff
     agents:
       containers:
         agent:
           env:
             [...]
   -         - name: DD_CORE_AGENT_ENABLED
   -           value: "false"
     datadog:
   -   processAgent:
   -     enabled: false
   -     containerCollection: false
     apiKeyExistingSecret: datadog-secret
     site: <DATADOG_SITE>
     tags:
       - env:<AGENT_ENV>
     apm:
       errorTrackingStandalone:
         enabled: true
       # Required to enable Single-Step Instrumentation
       instrumentation:
         enabled: true
         libVersions:
           java: "1"
           dotnet: "3"
           python: "2"
           js: "5"
           php: "1"
   ```

2. After making your changes, upgrade your Datadog Helm chart:
   ```shell
   helm upgrade -f datadog-values.yaml datadog-agent datadog/datadog
   ```
{{< /collapse-content >}}

{{< collapse-content title="Datadog Operator" level="h5" >}}
For a Datadog agent installed with the Datadog Operator:

1. Update your `datadog-agent.yaml` file, replacing the `site` and `env` values appropriately:
   ```diff
     apiVersion: datadoghq.com/v2alpha1
     kind: DatadogAgent
     metadata:
       name: datadog
     spec:
       global:
         site: <DATADOG_SITE>
         tags:
           - env:<AGENT_ENV>
         credentials:
           apiSecret:
             secretName: datadog-secret
             keyName: api-key
         env:
   -       - name: DD_CORE_AGENT_ENABLED
   -         value: "false"
       features:
         apm:
           errorTrackingStandalone:
             enabled: true
           instrumentation:
             enabled: true
             libVersions:
               java: "1"
               dotnet: "3"
               python: "2"
               js: "5"
               php: "1"
   ```
2. Deploy the Datadog Agent with the updated configuration file:
   ```shell
   kubectl apply -f path/to/your/datadog-agent.yaml
   ```
{{< /collapse-content >}}

{{% /tab %}}
{{< /tabs >}}

[1]: /infrastructure
