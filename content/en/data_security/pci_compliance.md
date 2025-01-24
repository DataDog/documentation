---
title: PCI DSS Compliance
disable_toc: false
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-pci-compliance-log-management-apm/"
  tag: "Blog"
  text: "Announcing PCI-Compliant Log Management and APM from Datadog"
---

{{% site-region region="us3,us5,eu,ap1,gov" %}}
<div class="alert alert-warning">
PCI DSS compliance for APM and Log Management is only available for Datadog organizations in the <a href="/getting_started/site/">US1 site</a>.
</div>
{{% /site-region %}}

{{% site-region region="us" %}}
<div class="alert alert-warning">
PCI DSS compliance for APM and Log Management is only available for Datadog organizations in the <a href="/getting_started/site/">US1 site</a>.
</div>

## Overview

The Payment Card Industry (PCI) Data Security Standard (DSS) has rigorous monitoring and data security requirements for all merchants, service providers, and financial institutions. To meet these requirements, organizations have had to separate out PCI-regulated data and non-regulated data to different applications for monitoring.

Datadog offers PCI-compliant Log Management and Application Performance Monitoring (APM) within the [US1 site][1] so that you can collect all of your logs, whether they are PCI-regulated or not, in one place. See [Set up a PCI-compliant Datadog organization](#set-up-a-pci-compliant-datadog-organization) on how to get started.

## Set up a PCI-compliant Datadog organization

{{< tabs >}}

{{% tab "Log Management" %}}

{{% pci-logs %}}

{{% /tab %}}

{{% tab "APM" %}}

{{% pci-apm %}}

{{% /tab %}}

{{< /tabs >}}

[1]: /getting_started/site/

{{% /site-region %}}

## Viewing PCI-compliance

See the [Configuration Page][2] inside Safety Center. 

Example of a fully onboarded customer:

<img width="1757" alt="image" src="https://github.com/user-attachments/assets/cba57395-bc3e-4277-8f51-13958dce9ef9" />

Example of an onboarding customer:

<img width="1757" alt="image" src="https://github.com/user-attachments/assets/f8da8c33-a43e-4ad6-a2a0-285b40df5e5a" />


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
