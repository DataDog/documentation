---
title: Enable APM
further_reading:
- link: "/tracing"
  tag: "Documentation"
  text: "Learn about APM"
- link: "/error_tracking/guides/enable_infra"
  tag: "Guide"
  text: "Enable Infrastructure Monitoring"
---

[Datadog Application Performance Monitoring (APM)][1] provides deep visibility into your applications, enabling you to identify performance bottlenecks, troubleshoot issues, and optimize your services. This guide explains how to update the Datadog Agent configuration to enable APM and leverage its features on top of standalone backend error tracking.

{{< tabs >}}
{{% tab "Linux host or VM" %}}

If your agent is deployed on a Linux host, the configuration update depends on the method you used to install the agent.

{{< collapse-content title="Single Step Instrumentation" level="h5" >}}
For a Datadog agent installed using the one-line installation command:

1. Open the [datadog.yaml configuration file][2].
2. Remove the `enable_payloads` and `error_tracking_standalone` attributes:

   ```diff
   - # Configuration to prevent sending metric data so that hosts don't show up in Datadog.
   - enable_payloads:
   -   series: false
   -   events: false
   -   service_checks: false
   -   sketches: false

     # Configuration to enable the collection of errors so they show up in Error Tracking.
     apm_config:
       enabled: true
   -   error_tracking_standalone:
   -     enabled: true
   ```

3. [Restart the Agent][3].
   {{< /collapse-content >}}

{{< collapse-content title="Using Datadog tracing libraries" level="h5" >}}
For a Datadog agent configured manually for Backend Error Tracking:

1. Open the [datadog.yaml configuration file][2].
2. Remove the `core_agent` and `error_tracking_standalone` attributes:

   ```diff
   - core_agent:
   -   enabled: false
     apm_config:
   +   enabled: true
   -   error_tracking_standalone:
   -     enabled: true
   ```

3. [Restart the Agent][3].
   {{< /collapse-content >}}

[2]: /agent/configuration/agent-configuration-files
[3]: /agent/configuration/agent-commands/#restart-the-agent

{{% /tab %}}
{{% tab "Kubernetes" %}}

If your agent is deployed in Kubernetes, you need to update its configuration in Datadog Operator or Helm depending on the method you used to install the Agent.

{{< collapse-content title="Helm" level="h5" >}}
For a Datadog Agent installed with Helm:

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
   -   errorTrackingStandalone:
   -     enabled: true
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
   -       errorTrackingStandalone:
   -         enabled: true
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

[1]: /tracing
