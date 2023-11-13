---
title: Setting Up Cloud Security Management
kind: documentation
aliases:
  - /security_platform/cloud_workload_security/getting_started
  - /security/cloud_workload_security/getting_started
  - /security/cloud_workload_security/setup
  - /security/threats/setup
  - /security_platform/cspm/getting_started
  - /security/cspm/getting_started
  - /security/cspm/setup
  - /security/misconfigurations/setup
further_reading:
- link: "/getting_started/cloud_security_management"
  tag: "Documentation"
  text: "Getting Started with Cloud Security Management"
- link: "security/default_rules"
  tag: "Documentation"
  text: "Explore default cloud configuration compliance rules"
- link: "https://www.datadoghq.com/blog/datadog-runtime-security/"
  tag: "Blog"
  text: "Learn more about Datadog Cloud Runtime Security"
- link: "https://www.datadoghq.com/blog/linux-security-threat-detection-datadog/"
  tag: "Blog"
  text: "How to detect security threats in your systems' Linux processes"
- link: "https://www.datadoghq.com/blog/pwnkit-vulnerability-overview-and-remediation/"
  tag: "Blog"
  text: "The PwnKit vulnerability: Overview, detection, and remediation"
- link: "https://www.datadoghq.com/blog/dirty-pipe-vulnerability-overview-and-remediation/"
  tag: "Blog"
  text: "The Dirty Pipe vulnerability: Overview, detection, and remediation"
- link: "https://www.datadoghq.com/blog/engineering/dirty-pipe-container-escape-poc/"
  tag: "Blog"
  text: "Using the Dirty Pipe Vulnerability to Break Out from Containers"
- link: "https://www.datadoghq.com/blog/dns-based-threat-detection/"
  tag: "Blog"
  text: "Catch attacks at the network layer with DNS-based threat detection"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloud Security Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">Cloud Security Management offerings are now available in three separate packages: CSM Enterprise, CSM Pro, and CSM Workload Security. For more information, see <a href="https://www.datadoghq.com/blog/cloud-security-management-changes/">Changes to Datadog Cloud Security Management</a>.</div>

Cloud Security Management (CSM) delivers real-time threat detection and continuous configuration audits across your entire cloud infrastructure, all in a unified view for seamless collaboration and faster remediation.

CSM is available in three packages: [CSM Enterprise][1], [CSM Pro][2], and [CSM Workload Security][3]. Each package includes access to a specific set of features, as shown in the following table:

<table>
    <tr>
        <th>Package</th>
        <th>Features</th>
    </tr>
    <tr>
        <td><a href="/security/cloud_security_management/setup/csm_enterprise">CSM Enterprise</a></td>
        <td><ul><li style="font-size:16px"><a href="/security/threats">Threats</a></li><li style="font-size:16px"><a href="/security/misconfigurations">Misconfigurations (cloud accounts and Agent)</a></li><li style="font-size:16px"><a href="/security/identity_risks">Identity Risks</a></li><li style="font-size:16px"><a href="/security/infrastructure_vulnerabilities">Vulnerabilities (container images and hosts)</a></li></ul></td>
    </tr>
    <tr>
        <td><a href="/security/cloud_security_management/setup/csm_pro">CSM Pro</a></td>
        <td><ul><li style="font-size:16px"><a href="/security/misconfigurations">Misconfigurations (cloud accounts)</a></li><li style="font-size:16px"><a href="/security/infrastructure_vulnerabilities">Vulnerabilities (container images)</a></li></ul></td>
    </tr>
    <tr>
        <td><a href="/security/cloud_security_management/setup/csm_workload_security">CSM Workload Security</a></td>
        <td><ul><li style="font-size:16px"><a href="/security/threats">Threats</a></li></ul></td>
    </tr>
</table>

**Notes**: 

- You can enable features that aren't included in your package at any time by following the instructions on the [CSM Setup page][4].
- CSM Identity Risks and CSM Vulnerabilities are in beta. For setup instructions, see [Cloud Security Management Identity Risks][5] and [Setting up Cloud Security Management Vulnerabilities][6].

## Prerequisites

{{< tabs >}}
{{% tab "CSM Enterprise" %}}

{{% csm-prereqs-enterprise-ws %}}

{{% /tab %}}

{{% tab "CSM Pro" %}}

To [enable CSM Pro][1], you must first set up the Datadog cloud account integrations for AWS, Azure, and Google Cloud Platform.

[1]: /security/cloud_security_management/setup/csm_pro

{{% /tab %}}

{{% tab "CSM Workload Security" %}}

{{% csm-prereqs-enterprise-ws %}}

{{% /tab %}}

{{< /tabs >}}

## Next steps

To get started setting up CSM, navigate to the [**Security** > **Setup**][4] section in Datadog, which has detailed steps on how to set up and configure CSM. For detailed instructions, see the [CSM Enterprise][1], [CSM Pro][2], and [CSM Workload Security][3] setup docs.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/setup/csm_enterprise
[2]: /security/cloud_security_management/setup/csm_pro
[3]: /security/cloud_security_management/setup/csm_workload_security
[4]: https://app.datadoghq.com/security/configuration/csm/setup
[5]: /security/identity_risks/#setup
[6]: /security/infrastructure_vulnerabilities/setup