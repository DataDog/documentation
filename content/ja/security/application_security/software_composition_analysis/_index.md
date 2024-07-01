---
title: Software Composition Analysis
aliases:
  - /security/application_security/risk_management/
  - /security/application_security/vulnerability_management/
further_reading:
- link: /getting_started/application_security/software_composition_analysis
  tag: Guide
  text: Getting started with Software Composition Analysis
- link: /security/application_security/code_security
  tag: documentation
  text: Enable code security vulnerability detection on your services
- link: /code_analysis/software_composition_analysis/
  tag: documentation
  text: Setup Software Composition Analysis on your CI pipelines
- link: "https://www.datadoghq.com/blog/datadog-software-composition-analysis/"
  tag: Blog
  text: Mitigate vulnerabilities from third-party libraries with Datadog Software Composition Analysis 
- link: "https://www.datadoghq.com/blog/iast-datadog-application-vulnerability-management/"
  tag: Blog
  text: Enhance application security in production with Application Vulnerability Management  
- link: "https://securitylabs.datadoghq.com/articles/guarddog-identify-malicious-pypi-packages/"
  tag: Blog
  text: "Finding malicious PyPI packages through static code analysis: Meet GuardDog"
- link: "https://www.datadoghq.com/blog/sca-prioritize-vulnerabilities/"
  tag: Blog
  text: Prioritize vulnerability remediation with Datadog SCA
algolia:
  tags: [Software Composition Analysis, Vulnerability Management, SCA, AVM, GuardDog]
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Application Security Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

Datadog Software Composition Analysis (SCA) helps you leverage open source with confidence. The capabilities of SCA include vulnerability detection, business risk (library inventory and licensing information), and quality evaluation of the open source libraries in your services. 

What makes Datadog SCA unique is its end-to-end coverage of your software development lifecycle: from the code that your developers commit, to the production applications already running in your Datadog deployment.

Datadog SCA uses a curated proprietary database. The database is sourced from Open Source Vulnerabilities (OSV), National Vulnerability Database (NVD), GitHub advisories, and other language ecosystem advisories. Additionally, the Datadog Security research team evaluates vulnerabilities and malware findings. For more information, see the [GuardDog][13] GitHub project.


Check [ASM Compatibility][6] to see if your service is supported.



## Library Inventory

The Datadog SCA Library Inventory helps you understand the list of libraries and its versions that compose your application. To access the Library Explorer, navigate to [**Security** > **Application Security** > **Catalog** > **Libraries**][8].

Since Datadog SCA covers your software development lifecycle end-to-end, the libraries are detected throughout the entire lifecycle of the application. The library inventory contains everything you need to know about the libraries, including name and version, and other risk aspects such as licenses and quality aspects. 

{{< img src="/security/application_security/software_composition_analysis/asm_library_explorer.png" alt="Software Composition Analysis (SCA) library explorer page showing library vulnerabilities grouped by library." style="width:100%;" >}}

## Explore and manage SCA vulnerabilities

<div class="alert alert-info">Datadog Software Composition Analysis can find vulnerable libraries across the software development lifecycle (SDLC). Application Security summarizes results found in the default branches of your repositories and in your running services. To view vulnerabilities found in different branches and commits, see <a href="/code_analysis/software_composition_analysis" target="_blank">Code Analysis</a> for more details.</div>

The [Vulnerability Explorer][3] shows a complete list of the open source libraries detected by Datadog SCA and reports security vulnerabilities associated with them. 

Datadog SCA leverages two techniques to analyze your services: 

- Static code analysis in your repositories (static point of view)
- Runtime analysis in your deployed services (runtime point of view)

Combining both techniques monitors open source libraries end-to-end, from the code repository commit (static point of view), to the applications running in production (runtime point of view).

To switch to the code repository commit point of view, select **Static**. The static view shows vulnerabilities from the _source code_ in your repositories. 

To switch to the _real-time_ point of view for the applications already running, select **Runtime**. The runtime view is the live view of the services monitored by Datadog.

{{< img src="/security/application_security/software_composition_analysis/asm_sca_vulnerabilities.png" alt="Software Composition Analysis (SCA) explorer page showing vulnerabilities sorted by static or runtime." style="width:100%;" >}}

Select a specific vulnerability to see its details, including the affected services, severity breakdown score, and recommended remediation steps. 

On the Details Explorer for a vulnerability, you can view impacted infrastructure. This view gives you better insights to your overall attack exposure.

Within ASM, the vulnerability severity base score is modified using existing attacks and the business sensitivity of the environment where the vulnerability is detected. For example, if no production environment is detected, the severity is reduced.

The adjusted vulnerability score includes the full context of each service:

- The original vulnerability severity
- Evidence of suspicious requests
- Sensitive or internet-exposed environments

{{< img src="security/application_security/vulnerability-score-modified_3.png" alt="Vulnerability details page showing a modified severity score" style="width:100%;" >}}

See [Getting Started with Software Composition Analysis][7] for more information on the adjusted vulnerability score.

## Remediation

The Vulnerability Explorer offers remediation recommendations for detected vulnerabilities. Recommendations enable you to change the status of a vulnerability, assign it to a team member for review, and create a Jira issue for tracking. They also include a collection of links and references to websites or information sources to help you understand the context behind each vulnerability.

**Note**: To create Jira issues for SCA vulnerabilities, you must configure the Jira integration, and have the `manage_integrations` permission. For detailed instructions, see the [Jira integration][11] documentation, as well as the [Role Based Access Control][10] documentation.

{{< img src="getting_started/appsec/appsec-vuln-remediation_3.png" alt="Application Vulnerability Management vulnerability details page showing affected services, links to infrastructure, suggested remediation, and links to more information." style="width:100%;" >}}

## Configure Software Composition Analysis

Software Composition Analysis (SCA) contains additional capabilities to allow you to scan for vulnerabilities in your CI pipelines by using [Code Analysis][9]. With SCA for Code Analysis, you can identify vulnerable open source libraries that have been imported into your codebase.

To configure vulnerabilities in your CI pipelines, navigate to [Security -> Application Security -> Settings][12].

In **Software Composition Analysis (SCA)**, click **Get Started** to enable Software Composition Analysis, and select your repositories and services.

See [Getting Started with Software Composition Analysis][7] for more detailed instructions.

## Risk information in APM views

Software Composition Analysis enriches the information APM is already collecting, and flags libraries that match with current vulnerability advisories. Potentially vulnerable services are highlighted directly in the **Security** view embedded in the [APM Service Catalog][2].

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
[8]: https://app.datadoghq.com/security/appsec/inventory/libraries
[9]: /code_analysis/software_composition_analysis/setup/?tab=githubactions
[10]: /account_management/rbac/permissions/#integrations
[11]: /integrations/jira/
[12]: https://app.datadoghq.com/security/configuration/asm/setup
[13]: https://github.com/DataDog/guarddog
