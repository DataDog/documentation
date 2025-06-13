---
title: IaC Scanning
aliases:
  - /security/cloud_security_management/iac_scanning/
further_reading:
  - link: "/security/code_security/iac_scanning/setup"
    tag: "Documentation"
    text: "Setting up IaC Scanning"
  - link: "/security/code_security/iac_scanning/exclusions"
    tag: "Documentation"
    text: "Setting up IaC Scanning Exclusions"
---

{{< callout url="https://www.datadoghq.com/product-preview/iac-security/" >}}
  Static Infrastructure as Code (IaC) scanning is in Preview. To request access, complete the form.
{{< /callout >}}

Static Infrastructure as Code (IaC) scanning integrates with version control systems, such as GitHub, to detect misconfigurations in cloud resources defined by Terraform. The scanning results are displayed in two primary locations: within pull requests during code modifications and on the **Findings** page within Cloud Security.

<div class="alert alert-info">Static IaC scanning supports GitHub for version control and Terraform for infrastructure as code.</div>

{{< img src="security/csm/iac_scanning_explorer3.png" alt="Cloud Security Findings page displaying detected misconfigurations in cloud resources" width="100%">}}

When you click on a finding, the side panel reveals additional details, including a short description of the IaC rule related to the finding and a preview of the offending code.

{{< img src="security/csm/iac_scanning_finding_2.png" alt="Finding side panel highlighting undefined EBS volume encryption in Terraform code." width="100%">}}

## Key capabilities

## Getting started

## Further reading

{{< partial name="whats-next/whats-next.html" >}}