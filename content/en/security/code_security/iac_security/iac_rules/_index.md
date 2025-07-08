---
title: Infrastucture as Code (IaC) Rules
description: View rules for multiple frameworks and providers for IaC analysis.
is_beta: false
type: iac_security
  
cascade:
  modal:
    title: Try this rule and analyze your code with Datadog Code Security
    top_box:
      title: How to use this rule
      steps:
        - Create a static-analysis.datadog.yml with the content above at the root of your repository
        - Use our free IDE Plugins or add Code Security scans to your CI pipelines
        - Get feedback on your code
      footer: For more information, please read the <a href="/security/code_security/">Code Security documentation</a>
    footer:
      text: Use Datadog Code Security to catch code issues at every step of your development process
      link:
        name: Datadog Code Security
        url: https://www.datadoghq.com/product/code-security/

  banner:
    title: "<span>Seamless integrations.</span> Try Datadog Code Security"
    link:
      name: Datadog Code Security
      url: https://www.datadoghq.com/product/code-security/


further_reading:
  - link: "/security/code_security/iac_security/setup"
    tag: "Documentation"
    text: "Set up IaC Security"
  - link: "/security/code_security/iac_security/exclusions"
    tag: "Documentation"
    text: "Configure IaC Security Exclusions"
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Code Security is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

## Overview

Datadog IaC Scan helps detect misconfigurations and security risks in infrastructure-as-code files before deployment, ensuring cloud environments remain secure and compliant. For more information, see the [Setup documentation][1].

[1]: /security/code_security/iac_security/setup/
