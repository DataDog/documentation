---
title: PCI DSS Compliance
disable_toc: false
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-pci-compliance-log-management-apm/"
  tag: "Blog"
  text: "Announcing PCI-Compliant Log Management and APM from Datadog"
- link: "coterm"
  tag: "Documentation"
  text: "CoTerm: Monitor terminal sessions and sensitive activities on local and remote systems"
---

{{% site-region region="us3,us5,eu,ap1,gov,ap2" %}}
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

## View your PCI Compliance status

See the [Configuration Page][2] inside Safety Center. 

Example of a fully onboarded customer:

{{< img src="/data_security/pci_compliant.png" alt="View of PCI compliance in the Configuration Page" style="width:75%;" >}}

Example of an onboarding customer:

{{< img src="/data_security/pci_onboarding.png" alt="View of PCI onboarding in the Configuration Page" style="width:75%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/organization-settings/safety-center/configuration
