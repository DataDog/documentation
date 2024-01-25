---
title: PCI DSS Compliance
kind: documentation
disable_toc: false
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-pci-compliance-log-management-apm/"
  tag: "Blog"
  text: "Announcing PCI-Compliant Log Management and APM from Datadog"
---

<div class="alert alert-warning">
PCI DSS compliance for APM and Log Management is available only for Datadog organizations in the <a href="/getting_started/site/">US1 site</a>.
</div>

## Overview

Datadog offers PCI-compliant Application Performance Monitoring (APM) and Log Management so that organizations that process cardholder data can rely on Datadog as a PCI Level 1 Service Provider.

## Set up a PCI-compliant Dataodog organization

{{< tabs >}}
{{% tab "APM" %}}

To set up a PCI-compliant Datadog organization, follow these steps:

1. Contact [Datadog support][1] or your [Customer Success Manager][2] to request that the org be configured as a PCI-compliant org.
2. After Datadog support or Customer Success confirms that the org is PCI DSS compliant, configure the Agent configuration file to send spans to the dedicated PCI-compliant endpoint (`https://trace-pci.agent.datadoghq.com`):
    ```
    apm_config:
      apm_dd_url: <https://trace-pci.agent.datadoghq.com>
    ```

[1]: /help/
[2]: mailto:success@datadoghq.com

{{% /tab %}}

{{% tab "Log Management" %}}

To set up a PCI-compliant Datadog organization, follow these steps:

1. Contact [Datadog support][1] or your [Customer Success Manager][2] to request that the org be configured as a PCI-compliant org.
2. After Datadog support or Customer Success confirms that the org is PCI DSS compliant, configure the Agent configuration file to send logs to the dedicated PCI-compliant endpoint (`agent-http-intake-pci.logs.datadoghq.com`):
    ```
    logs_config:
      logs_dd_url: <http://agent-http-intake-pci.logs.datadoghq.com:443|agent-http-intake-pci.logs.datadoghq.com:443>
    ```
    **Note**: The port must be included in the configuration. PCI compliance uses HTTPS log forwarding only. If you are using the Agent, you should [enforce HTTPS transport][3].

If you have any questions about how the Log Management service satisfies the applicable requirements under PCI DSS, contact your account manager.


[1]: /help/
[2]: mailto:success@datadoghq.com
[3]: /tracing/configure_data_security/#pci-dss-compliance-for-compliance-for-apm

{{% /tab %}}

{{< /tabs >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
