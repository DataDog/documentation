---
title: Runtime Context for Static Findings
description: See which services run the code behind your Static Code Analysis, Secret Scanning, and IaC Security findings, and the runtime risks those services carry.
further_reading:
- link: "/security/code_security/static_analysis/setup/#link-findings-to-datadog-services-and-teams"
  tag: "Documentation"
  text: "Link findings to Datadog services and teams"
- link: "/software_catalog/"
  tag: "Documentation"
  text: "Software Catalog"
- link: "/integrations/guide/source-code-integration/"
  tag: "Documentation"
  text: "Datadog Source Code Integration"
- link: "/security/security_inbox/"
  tag: "Documentation"
  text: "Security Inbox"
---

## Overview

Static scans report issues anywhere in your repositories, including test code and modules that never run in production. Runtime context shows which findings are in code that your services run, and the risks those services carry, so you can fix the findings in live, exposed services first.

Runtime context is available for:

- [Static Code Analysis (SAST)][1]
- [Secret Scanning][2]
- [Infrastructure as Code (IaC) Security][3]

[Software Composition Analysis (SCA)][4] findings use the same service mapping.

## How it works

1. **Datadog maps findings to services.** Each finding maps to every service that its file is related to. SAST, Secret Scanning, and IaC Security findings share one mapping. See [How findings are mapped to services](#how-findings-are-mapped-to-services).
2. **Mapped findings inherit runtime risks.** Each mapped finding inherits the runtime risks of its services. When a finding maps to more than one service, a risk applies if any of those services has it.
3. **Unmapped findings are labeled.** Findings with no mapped service show {{< ui >}}No runtime context{{< /ui >}}. A missing mapping is never treated as low risk.

For SAST, Secret Scanning, and IaC Security findings, runtime risks are informational: they don't change the Datadog Severity Score.

## Runtime risks

| Runtime risk | How it is evaluated | SAST | Secret Scanning | IaC Security |
| --- | --- | --- | --- | --- |
| Service in Production | The service runs in a production environment, computed from the `env` and `environment` tags. | Yes | Yes | Yes |
| Service Exposed to Attacks | A security signal has been detected on the service in the last 15 days. | Yes | No | Yes |
| Access to Sensitive Data | The service handles sensitive data. | Yes | No | Yes |
| Privileged Access | The service runs with privileged access. | Yes | Yes | Yes |
| Publicly Accessible | The service is reachable from the internet. | Yes | Yes | Yes |

## Use runtime context

### In the explorers

In the SAST, Secret Scanning, and IaC Security explorers on the [{{< ui >}}Code Security Vulnerabilities{{< /ui >}}][5] page:

- In the {{< ui >}}Runtime Context{{< /ui >}} facet group:
  - Use the {{< ui >}}Runtime Context{{< /ui >}} facet to show findings {{< ui >}}With runtime context{{< /ui >}} or with {{< ui >}}No runtime context{{< /ui >}}.
  - Use the {{< ui >}}Service{{< /ui >}} facet to filter by mapped service.
- In the {{< ui >}}Risks{{< /ui >}} facet group, filter by each runtime risk that applies to the product, such as {{< ui >}}Service in Production{{< /ui >}} and {{< ui >}}Service Exposed to Attacks{{< /ui >}}.

Each finding shows the risk badges of its services. Findings with no mapped service show {{< ui >}}No runtime context{{< /ui >}} and never match a runtime risk filter. If a risk filter returns no results, clear it to see more findings.

### In the finding side panel

- **{{< ui >}}Related To{{< /ui >}}**: The service that the finding most likely runs in. If other services are also mapped, a count of the additional services appears. If no service is mapped, the panel shows {{< ui >}}No runtime context{{< /ui >}} with a {{< ui >}}Set up service mapping{{< /ui >}} link.
- **Risk badges**: The panel header shows the runtime risks that apply to the product.
- **{{< ui >}}Severity Breakdown{{< /ui >}}**: The base score, followed by one entry for each runtime risk with the reason it applies or doesn't apply. The {{< ui >}}Service in Production{{< /ui >}} entry lists the service's environments. The {{< ui >}}Service Exposed to Attacks{{< /ui >}} entry shows the number of attacks in the last 15 days and the top detected security activities. When more than one service is mapped, the breakdown is calculated for the service with the highest severity, and the panel names that service.

### On the Summary page

On the [{{< ui >}}Code Security Summary{{< /ui >}}][6] page:

- In the {{< ui >}}Code vulnerabilities{{< /ui >}} section, select {{< ui >}}Static (SAST){{< /ui >}} to see a funnel of SAST findings: {{< ui >}}Default branch{{< /ui >}}, {{< ui >}}In your services{{< /ui >}}, {{< ui >}}In production{{< /ui >}}, and {{< ui >}}Exposed to attacks{{< /ui >}}. Counts for {{< ui >}}Publicly Accessible{{< /ui >}}, {{< ui >}}Access to Sensitive Data{{< /ui >}}, and {{< ui >}}Privileged Access{{< /ui >}} appear below the funnel.
- In the {{< ui >}}Secrets{{< /ui >}} and {{< ui >}}Infrastructure as Code{{< /ui >}} sections, select {{< ui >}}Runtime context{{< /ui >}}. The Secrets funnel shows {{< ui >}}Default branch{{< /ui >}}, {{< ui >}}In your services{{< /ui >}}, and {{< ui >}}In production{{< /ui >}}. The IaC funnel adds {{< ui >}}Exposed to attacks{{< /ui >}}.

Click a funnel stage or a risk count to open the explorer filtered to those findings.

## How findings are mapped to services

Datadog combines several sources to map findings to services, including Software Catalog code locations, analysis of your repositories, and service names. A finding can map to more than one service. For details on each source and how to control the mapping with Software Catalog code locations, see [Link findings to Datadog services and teams][7].

A mapping means that the finding's file is related to the service. It does not confirm that the file is part of the version of the service that is deployed.

For IaC Security findings, a related service means that the IaC file is in that service's repository or deployment files. It does not confirm that the misconfiguration is present in the running service.

### Improve coverage

If many findings show {{< ui >}}No runtime context{{< /ui >}}:

1. Make sure that each service built from the repository reports Git metadata, so Datadog can link the service to its repository. For example, set `DD_GIT_REPOSITORY_URL=github.com/<org>/<repo>` and `DD_GIT_COMMIT_SHA=$(git rev-parse HEAD)`. See [Datadog Source Code Integration][8].
2. Add `codeLocations` to the service's definition in the [Software Catalog][9].
3. Redeploy the service. New findings use the updated mapping after the next scan.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/code_security/static_analysis/
[2]: /security/code_security/secret_scanning/
[3]: /security/code_security/iac_security/
[4]: /security/code_security/software_composition_analysis/
[5]: https://app.datadoghq.com/security/code-security/vulnerabilities
[6]: https://app.datadoghq.com/security/code-security/summary
[7]: /security/code_security/static_analysis/setup/#link-findings-to-datadog-services-and-teams
[8]: /integrations/guide/source-code-integration/
[9]: /software_catalog/
