---
title: Use the Datadog Agent for Cloud Security Only
further_reading:
  - link: "/security/cloud_security_management/guide"
    tag: "Documentation"
    text: Cloud Security Guides
  - link: "/security/cloud_security_management/setup"
    tag: "Documentation"
    text: Setting Up Cloud Security
---

To use Cloud Security with Infrastructure Monitoring disabled, you must be running Agent v6.4+. This disables metric data submission (including Custom Metrics) so that hosts stop showing up in Datadog. Follow these steps:

{{< tabs >}}
{{% tab "Host " %}}

1. Open the [datadog.yaml configuration file][1].
2. Add `enable_payloads` as a top-level attribute anywhere in the configuration file with the following settings:

    ```yaml
    enable_payloads:
        series: false
        events: false
        service_checks: false
        sketches: false
    ```

3. [Configure the Agent with Cloud Security][2].
4. [Restart the Agent][3].

[1]: /agent/configuration/agent-configuration-files/
[2]: /security/cloud_security_management/setup/agent
[3]: /agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

If you're using the Docker containerized Agent, add and set the following environment variables to `false` to the [Cloud Security configuration for Agent][4]:
- `DD_ENABLE_PAYLOADS_EVENTS`
- `DD_ENABLE_PAYLOADS_SERIES`
- `DD_ENABLE_PAYLOADS_SERVICE_CHECKS`
- `DD_ENABLE_PAYLOADS_SKETCHES`

[4]: /security/cloud_security_management/setup/agent/docker/

{{% /tab %}}
{{% tab "Kubernetes" %}}

If you're deploying the Agent in Kubernetes, make the following changes in your Helm chart in addition to the [Cloud Security configuration for Agent][5]:

```yaml
clusterAgent:
  enabled: false
datadog:
[...]
  processAgent:
    enabled: false
    containerCollection: false
[...]
  env:
    - name: DD_ENABLE_PAYLOADS_EVENTS
      value: "false"
    - name: DD_ENABLE_PAYLOADS_SERIES
      value: "false"
    - name: DD_ENABLE_PAYLOADS_SERVICE_CHECKS
      value: "false"
    - name: DD_ENABLE_PAYLOADS_SKETCHES
      value: "false"
```
[5]: /security/cloud_security_management/setup/agent/kubernetes?tab=helm
{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
