---
title: Setting Up CSM Pro
kind: documentation
---

Cloud Security Management (CSM) Pro includes [CSM Misconfigurations][1] (cloud accounts) and [CSM Vulnerabilities][2] (container images). For additional information on the CSM packages, see [Setting up Cloud Security Management][3].

## Enable resource scanning for cloud accounts

To enable resource scanning for your cloud accounts, you must first set up the integration and then enable CSM for each AWS account, Azure subscription, and Google Cloud project.

{{< tabs >}}
{{% tab "AWS" %}}

{{% csm-setup-aws %}}

{{% /tab %}}

{{% tab "Azure" %}}

{{% csm-setup-aws %}}

{{% /tab %}}

{{% tab "Google Cloud" %}}

{{% csm-setup-google-cloud %}}

{{% /tab %}}

{{< /tabs >}}

[1]: /security/misconfigurations
[2]: /security/infrastructure_vulnerabilities
[3]: /security/cloud_security_management/setup