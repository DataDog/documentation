---
title: IaC Scanning
further_reading:
  - link: "/security/cloud_security_management/setup/iac_scanning"
    tag: "Documentation"
    text: "Setting up IaC Scanning"
---

{{< callout url="https://www.datadoghq.com/product-preview/iac-security/" >}}
  Static Infrastructure as Code (IaC) scanning is in Preview. To request access, complete the form.
{{< /callout >}}

Static Infrastructure as Code (IaC) scanning integrates with version control systems, such as GitHub, to detect misconfigurations in cloud resources defined by Terraform. The scanning results are displayed in two primary locations: within pull requests during code modifications and on the **Explorers** page within Cloud Security Management.

{{< img src="security/csm/iac_scanning_explorer2.png" alt="CSM Explorers page displaying detected misconfigurations in cloud resources" width="100%">}}

When you click on a finding, the side panel reveals additional details, including a short description of the IaC rule related to the finding and a preview of the offending code.

{{< img src="security/csm/iac_scanning_finding.png" alt="Finding side panel highlighting undefined EBS volume encryption in Terraform code." width="100%">}}

## Supported providers

- **Version control system**: GitHub
- **Infrastructure as code tool**: Terraform

## Further reading

{{< partial name="whats-next/whats-next.html" >}}