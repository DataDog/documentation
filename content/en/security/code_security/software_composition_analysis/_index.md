---
title: Software Composition Analysis
disable_toc: false
aliases:
- /path-to-old-doc/
---

Code Security Software Composition Analysis (SCA) performs both static and runtime scans:

- Static
  - Datadog-hosted scanning
  - CI pipeline scanning
- Runtime
  - Services (in-app or using a Datadog Tracing Library configuration)

## SCA static scans

SCA scans open source libraries imported into repositories through package managers such as npm for known vulnerabilities, and creates a catalog of libraries used across your repositories that identifies risky licenses, end-of-life libraries, and vulnerabilities to ensure a high quality, secure codebase.

SCA scans can be run directly through Datadog (Datadog-hosted) or in your CI pipelines using Code Analysis to detect library vulnerabilities before they reach production.

For set up instructions, see [SCA Static Setup][1].

## SCA runtime scans

SCA scans the production applications already running in your Datadog deployment.

Datadog SCA uses a curated proprietary database. The database is sourced from Open Source Vulnerabilities (OSV), National Vulnerability Database (NVD), GitHub advisories, and other language ecosystem advisories. Additionally, the Datadog Security research team evaluates vulnerabilities and malware findings. For more information, see the GuardDog GitHub project.

For set up instructions, see [Runtime Setup][2].

### Library inventory

The Datadog SCA [Library Inventory][8] helps you understand the list of libraries and its versions that compose your application.

With Datadog SCA spanning your software development lifecycle from code to production, it detects libraries throughout the lifecycle of an application and alerts you to vulnerabilities, risks, licenses, and more.


### Datadog severity score

Each vulnerability has a defined base severity score. To assist in prioritizing remediation, Datadog modifies the base CVSS score into the Datadog Severity Score by considering evidence of suspicious requests or attacks, the business sensitivity or internet exposure of the environment, and the risk of a successful exploit.

Four score modifiers may apply to a base score. Two are provided by runtime context:
 - Vulnerability is in production
 - Service affected by vulnerability is under attack

Two are provided by CVE context:
 - Whether an exploit is available
 - The exploitation probability

Datadog shows how the base CVSS score is adjusted to the Datadog Severity Score based on the factors above.


See [Getting Started with Software Composition Analysis][7] for more information on the adjusted vulnerability score.

### Remediation

The Vulnerability Explorer offers remediation recommendations for detected vulnerabilities. Recommendations enable you to change the status of a vulnerability, assign it to a team member for review, and create a Jira issue for tracking. They also include a collection of links and references to websites or information sources to help you understand the context behind each vulnerability.

**Note**: To create Jira issues for SCA vulnerabilities, you must configure the Jira integration, and have the `manage_integrations` permission. For detailed instructions, see the [Jira integration][11] documentation, as well as the [Role Based Access Control][9] documentation.

## Risk information in APM views

Software Composition Analysis enriches the information APM is already collecting, and flags libraries that match with current vulnerability advisories. Potentially vulnerable services are highlighted directly in the **Security** view embedded in the [APM Service Catalog][10].

[1]: /security/code_security/software_composition_analysis/setup_static/
[2]: /security/code_security/software_composition_analysis/setup_runtime/
[3]: https://app.datadoghq.com/security/appsec/vm
[7]: /getting_started/application_security/software_composition_analysis
[8]: https://app.datadoghq.com/security/appsec/inventory/libraries
[9]: /account_management/rbac/permissions/#integrations
[10]: https://app.datadoghq.com/services?lens=Security
