---
title: Software Composition Analysis
kind: documentation
aliases:
  - /security/application_security/risk_management/
  - /security/application_security/vulnerability_management/
further_reading:
- link: "/security/application_security/how-appsec-works/"
  tag: "Documentation"
  text: "How Application Security Works in Datadog"
- link: "/security/application_security/enabling/"
  tag: "Documentation"
  text: "Enabling Application Security on your services"
- link: "/getting_started/application_security/software_composition_analysis"
  tag: "Guide"
  text: "Getting started with Software Composition Analysis"
- link: "https://www.datadoghq.com/blog/iast-datadog-application-vulnerability-management/"
  tag: "Blog"
  text: "Enhance application security in production with Application Vulnerability Management"  
- link: "/security/application_security/software_composition_analysis/code_security"
  tag: "documentation"
  text: "Learn about code security vulnerability detection"
algolia:
  tags: ['Software Composition Analysis', 'Vulnerability Management', 'SCA', 'AVM']
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Application Security Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

Datadog Software Composition Analysis (SCA) helps you leverage open source with confidence. The capabilities of SCA include vulnerability detection, business risk (library inventory and licensing information), and quality evaluation of the open source libraries in your services. The key differentiation factor powering Datadog SCA is the end-to-end coverage of your software development lifecycle: from the code that your developers commit, to the production applications already running in your Datadog deployment.

Check [ASM Compatibility][6] to see if your service is supported.

## Explore and manage SCA vulnerabilities

The [Vulnerability Explorer][3] shows a complete list of the open source libraries detected by Datadog SCA used by your application at runtime, and reports security vulnerabilities associated with them. Datadog does **not** scan your source code, and the analysis is based on how your application behaves during runtime. The open-source libraries are monitored from the code commit to the repository (static point of view), to the applications running in production (runtime point of view). To switch to the code repository commit point of view, click on the **static** button. To switch to the real-time point of view to the applications already running, click on the **runtime** button.

{{< img src="/security/application_security/software_composition_analysis/asm_sca_vulnerabilities.png" alt="Software Composition Analysis (SCA) explorer page showing vulnerabilities sorted by static or runtime." style="width:100%;" >}}

Select a specific vulnerability to see its details, including which services are affected, severity breakdown score, and recommended remediation steps. On the details explorer, you can also view impacted infrastructure to gain better insights to your overall attack exposure.

Within ASM, the severity of a vulnerability is modified from the base score to take into account the presence of attacks and the business sensitivity of the environment where the vulnerability is detected. For example, if no production environment is detected, the severity is reduced.

The adjusted vulnerability score includes the full context of each service:

- The original vulnerability severity
- Evidence of suspicious requests
- Sensitive or internet-exposed environments

{{< img src="security/application_security/vulnerability-score-modified_3.png" alt="Vulnerability details page showing a modified severity score" style="width:100%;" >}}

See [getting started with software composition analysis][7] for more information on the adjusted vulnerability score.

## Remediation

The explorer also offers remediation recommendations for detected vulnerabilities that enable you to change the status of a vulnerability, assign it to a team member for review, and create a Jira issue for tracking. It also includes a collection of links and references to websites or information sources that help you understand the context behind each vulnerability.

{{< img src="getting_started/appsec/appsec-vuln-remediation_3.png" alt="Application Vulnerability Management vulnerability details page showing affected services, links to infrastructure, suggested remediation, and links to more information." style="width:100%;" >}}

## Library Inventory

The Datadog SCA Library Inventory helps you understand the list of libraries and its versions that compose your application. Since Datadog SCA covers your software development life cycle end-to-end, the libraries are detected throughout the entire lifecycle of the application. The library inventory contains everything you need to know about the libraries, including name and version, and other risk aspects such as licenses, and quality aspects. 

## Risk information in APM views

Software Composition Analysis enriches the information APM is already collecting, and flags libraries that match with current vulnerability advisories. Potentially vulnerable services are highlighted directly in the security views embedded in the [APM Service Catalog][2].

{{< img src="security/application_security/threats/threats-on-svc-cat_3.png" alt="Vulnerability information shown in the APM Service Catalog" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: https://app.datadoghq.com/services?lens=Security
[3]: https://app.datadoghq.com/security/appsec/vm
[4]: https://app.datadoghq.com/security/appsec
[5]: https://app.datadoghq.com/security/appsec/landing
[6]: /security/application_security/enabling/compatibility
[7]: /getting_started/application_security/software_composition_analysis
