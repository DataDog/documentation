---
title: IaC Scanning
further_reading:
  - link: "/security/cloud_security_management/setup/iac_scanning"
    tag: "Documentation"
    text: "Setting up IaC Scanning"
  - link: "https://www.datadoghq.com/blog/iac-scanning-tools/"
    tag: "Blog"
    text: "Building on open source IaC scanning tools with Datadog"
---

{{< callout url="https://www.datadoghq.com/product-preview/iac-security/" >}}
  Static Infrastructure as Code (IaC) scanning is in Preview. To request access, complete the form.
{{< /callout >}}

Static Infrastructure as Code (IaC) scanning integrates with version control systems, such as GitHub, to detect misconfigurations in cloud resources defined by Terraform. The scanning results are displayed in two primary locations: within pull requests during code modifications and on the **Findings** page within Cloud Security.

<div class="alert alert-info">Static IaC scanning supports GitHub for version control and Terraform for infrastructure as code.</div>

{{< img src="security/csm/iac_scanning_explorer4.png" alt="Cloud Security Findings page displaying detected misconfigurations in cloud resources" width="100%">}}

When you click on a finding, the side panel reveals additional details, including a description of the IaC rule related to the finding and a preview of the code that needs to be fixed.

{{< img src="security/csm/iac_scanning_finding_3.png" alt="Finding side panel highlighting undefined EBS volume encryption in Terraform code." width="100%">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}