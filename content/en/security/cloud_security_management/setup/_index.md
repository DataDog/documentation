---
title: Setting up Cloud Security Management
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
  - /security/vulnerabilities/setup
  - /security/infrastructure_vulnerabilities/setup/
  - /security/cloud_security_management/setup/windows
further_reading:
- link: "/getting_started/cloud_security_management"
  tag: "Documentation"
  text: "Getting Started with Cloud Security Management"
- link: "/security/cloud_security_management/setup/csm_enterprise"
  tag: "Documentation"
  text: "Setting up CSM Enterprise"
- link: "/security/cloud_security_management/setup/csm_pro"
  tag: "Documentation"
  text: "Setting up CSM Pro"
- link: "/security/cloud_security_management/setup/csm_cloud_workload_security"
  tag: "Documentation"
  text: "Setting up CSM Workload Security"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloud Security Management Misconfigurations is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Cloud Security Management (CSM) delivers real-time threat detection and continuous configuration audits across your entire cloud infrastructure, all in a unified view for seamless collaboration and faster remediation.

You can enable features that aren't included in your package at any time by following the instructions on the [CSM Setup page][4].

CSM is available in three packages: [CSM Enterprise][1], [CSM Pro][2], and [CSM Workload Security][3]. For more information, see [Changes to Datadog Cloud Security Management][7]. Each package includes access to a specific set of **features**, as shown in the following table:

<table>
    <tr>
        <th>Package</th>
        <th>Features</th>
    </tr>
    <tr>
        <td><a href="/security/cloud_security_management/setup/csm_enterprise">CSM Enterprise</a></td>
        <td><ul><li style="font-size:16px"><a href="/security/threats">Threats</a></li><li style="font-size:16px"><a href="/security/misconfigurations">Misconfigurations (cloud accounts and Agent)</a></li><li style="font-size:16px"><a href="/security/identity_risks">Identity Risks</a></li><li style="font-size:16px"><a href="/security/vulnerabilities">Vulnerabilities (container images and hosts)</a></li></ul></td>
    </tr>
    <tr>
        <td><a href="/security/cloud_security_management/setup/csm_pro">CSM Pro</a></td>
        <td><ul><li style="font-size:16px"><a href="/security/misconfigurations">Misconfigurations (cloud accounts)</a></li><li style="font-size:16px"><a href="/security/vulnerabilities">Vulnerabilities (container images)</a></li></ul></td>
    </tr>
    <tr>
        <td><a href="/security/cloud_security_management/setup/csm_cloud_workload_security">CSM Workload Security</a></td>
        <td><ul><li style="font-size:16px"><a href="/security/threats">Threats</a></li></ul></td>
    </tr>
</table>

## Supported deployment types and features

| Type              | Agent Required (7.46+) | CSM Misconfigurations | CSM Threats | CSM Vulnerabilities | CSM Identity Risks |
|-------------------|--------------------|-----------------------|-------------|---------------------|--------------------| 
| Docker            | {{< X >}}          | {{< X >}}             | {{< X >}}   | {{< X >}}           |                    |
| Kubernetes        | {{< X >}}          | {{< X >}}             | {{< X >}}   | {{< X >}}           |                    |
| Linux             | {{< X >}}          | {{< X >}}             | {{< X >}}   | {{< X >}}           |                    |
| Amazon ECS        | {{< X >}}          | {{< X >}}             | {{< X >}}   | {{< X >}}           |                    |
| AWS Account       |                    | {{< X >}}             |             |                     | {{< X >}}          |
| Azure Account     |                    | {{< X >}}             |             |                     |                    |
| GCP Account       |                    | {{< X >}}             |             |                     |                    |
| Windows           | {{< X >}}          |                       | beta        |                     |                    |
| AWS Fargate       | {{< X >}}          |                       | beta        |                     |                    |

{{% csm-prereqs %}}

## Next steps

To get started setting up CSM, navigate to the [**Security** > **Setup**][4] section in Datadog, which has detailed steps on how to configure CSM. For detailed setup instructions, see the [CSM Enterprise][1], [CSM Pro][2], and [CSM Workload Security][3] setup docs.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/setup/csm_enterprise
[2]: /security/cloud_security_management/setup/csm_pro
[3]: /security/cloud_security_management/setup/csm_cloud_workload_security
[4]: https://app.datadoghq.com/security/configuration/csm/setup
[5]: /security/identity_risks/#setup
[6]: /security/cloud_security_management/setup/compatibility
[7]: https://www.datadoghq.com/blog/cloud-security-management-changes/

