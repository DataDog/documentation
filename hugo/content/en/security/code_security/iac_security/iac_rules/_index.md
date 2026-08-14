---
title: IaC Security Rules
type: iac_security
further_reading:
  - link: "/security/code_security/iac_security/setup"
    tag: "Documentation"
    text: "Set up IaC Security"
  - link: "/security/code_security/iac_security/configuration"
    tag: "Documentation"
    text: "Configure IaC Security"
  - link: "/security/code_security/iac_security/custom_rules/"
    tag: "Documentation"
    text: "Create custom IaC rules"
  - link: "https://www.datadoghq.com/blog/github-actions-iac-security/"
    tag: "Blog"
    text: "Spotting CI/CD misconfigurations before the bots do: Securing GitHub Actions with Datadog IaC Security"
---

[Infrastructure as Code (IaC) Security][1] identifies misconfigurations and security risks in infrastructure-as-code files before deployment, helping ensure that cloud environments remain secure and compliant.

<div class="alert alert-info">For Helm resolution to work correctly, each chart directory must include the charts it depends on. For details, see <a href="https://helm.sh/docs/topics/charts/#the-chart-file-structure">Chart File Structure</a> in the Helm documentation.</div>

To enforce requirements specific to your organization, see [Custom IaC Rules][2].

[1]: /security/code_security/iac_security/
[2]: /security/code_security/iac_security/custom_rules/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
