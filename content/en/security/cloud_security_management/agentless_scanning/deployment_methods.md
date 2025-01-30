---
title: Deploying Agentless Scanning
further_reading:
  - link: "/security/cloud_security_management/agentless_scanning"
    tag: "Documentation"
    text: "Cloud Security Management Agentless Scanning"
  - link: "/security/cloud_security_management/setup/agentless_scanning/quick_start"
    tag: "Documentation"
    text: "Agentless Scanning Quick Start for Cloud Security Management"
  - link: "/security/cloud_security_management/setup/agentless_scanning/terraform"
    tag: "Documentation"
    text: "Setting up Agentless Scanning using Terraform"
  - link: "/security/cloud_security_management/setup/agentless_scanning/cloudformation"
    tag: "Documentation"
    text: "Setting up Agentless Scanning with the AWS Integration"
---

There are two recommended ways to deploy Agentless scanners in your environment, either using cross-account scanning, or same account scanning.

**Note**: When using Agentless Scanning, there are additional costs for running scanners in your cloud environments. To optimize on costs while being able to reliably scan every 12 hours, Datadog recommends setting up Agentless Scanning with Terraform as the default template, as this also avoids cross-region networking. 

To establish estimates on scanner costs, reach out to your [Datadog Customer Success Manager][1].

{{< tabs >}}
{{% tab "Cross-account scanning" %}}

With cross-account scanning, Agentless scanners are deployed across multiple regions in a single cloud account. The deployed Agentless scanners are granted visibility across multiple accounts without needing to perform cross-region scans, which are expensive in practice.

For larger accounts with 250 or more hosts, this is the most cost-effective option as it avoids cross-region scans, and reduces friction for managing your Agentless scanners. You can either create a dedicated account for your Agentless scanners or choose an existing one. The account where the Agentless scanners are located can also be scanned.

The following diagram illustrates how Agentless scanning works when deployed in a central cloud account:

{{< img src="/security/agentless_scanning/agentless_advanced_2.png" alt="Diagram of Agentless scanning showing the Agentless scanner is deployed in a central Cloud account" width="90%" >}}

{{% /tab %}}
{{% tab "Same account scanning" %}}

With same account scanning, a single Agentless scanner is deployed per account. Although this can incur more costs, as it requires each Agentless scanner to perform cross-region scans per account, Datadog recommends this option if you do not want to grant cross-account permissions.

The following diagram illustrates how Agentless scanning works when deployed within each Cloud account:

{{< img src="/security/agentless_scanning/agentless_quickstart_2.png" alt="Diagram of Agentless scanning showing the Agentless scanner is deployed in each Cloud account" width="90%" >}}

[3]: https://app.datadoghq.com/security/csm/vm
[4]: /agent/remote_config/?tab=configurationyamlfile#setup

{{% /tab %}}
{{< /tabs >}}


**Note**: The actual scanned data remains in your infrastructure, and only the collected list of packages, as well as information related to collected hosts (hostnames/EC2 Instances), are reported back to Datadog.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: mailto:success@datadoghq.com