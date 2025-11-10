---
title: IaC Security Rules
type: iac_security
cascade:
  - disable_edit: true
further_reading:
  - link: "/security/code_security/iac_security/setup"
    tag: "Documentation"
    text: "Set up IaC Security"
  - link: "/security/code_security/iac_security/exclusions"
    tag: "Documentation"
    text: "Configure IaC Security Exclusions"
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">This product is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{% /site-region %}}

[Infrastructure as Code (IaC) Security][1] identifies misconfigurations and security risks in infrastructure-as-code files before deployment, helping ensure that cloud environments remain secure and compliant.</br>
**Note**: For Helm resolution to work correctly, each chart directory must include the charts it depends on. For details, see [Chart File Structure][2] in the Helm documentation.

[1]: /security/code_security/iac_security/
[2]: https://helm.sh/docs/topics/charts/#the-chart-file-structure
