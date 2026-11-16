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
---

## Overview

Static scans report issues anywhere in your repositories, including test code and modules that never run. Runtime context shows which findings sit in code that runs in your services, and the risks those services carry, so you can fix the findings in live, exposed services first.

Runtime context is available for:

- [Static Code Analysis (SAST)][1]
- [Secret Scanning][2]
- [Infrastructure as Code (IaC) Security][3]

[Software Composition Analysis (SCA)][4] uses the same service mapping.

## How it works

1. **Map findings to services.** Datadog maps each finding to every service that runs the finding's file. SAST, Secret Scanning, and IaC Security share one mapping. See [How findings are mapped to services](#how-findings-are-mapped-to-services).
2. **Add runtime risks.** Each mapped finding inherits the runtime risks of its services. When a finding maps to more than one service, a risk applies if any of those services has it.
3. **Label unmapped findings.** Findings with no mapped service show **No runtime context**. A missing mapping is never treated as low risk.

## Runtime risks

| Runtime risk | Meaning | SAST | Secret Scanning | IaC Security |
| --- | --- | --- | --- | --- |
| Service in Production | The service runs in a production environment. | Yes | Yes | Yes |
| Service Exposed to Attacks | Datadog has detected attack traffic against the service. | Yes | No | Yes |
| Access to Sensitive Data | The service handles sensitive data. | Yes | No | Yes |
| Privileged Access | The service runs with privileged access. | Yes | Yes | Yes |
| Publicly Accessible | The service is reachable from the internet. | Yes | Yes | Yes |

## Use runtime context

### In the explorers

In the SAST, Secret Scanning, and IaC Security explorers:

- **Runtime Context** facet group:
  - **Runtime Context**: select **With runtime context** or **No runtime context**.
  - **Service**: filter by mapped service.
- **Risks** facet group: filter by each runtime risk that applies to the product, such as **Service in Production** and **Service Exposed to Attacks**.
- Each row shows its risk badges. Rows with no mapped service show **No runtime context**.

Findings with no runtime context never match a runtime risk filter. If a risk filter returns no results, clear it to see more findings.

### In the finding side panel

- **Related To**: the service the finding most likely runs in. If other services also run the file, a **+N** label appears. If no service is mapped, the panel shows **No runtime context** with a **Set up service mapping** link.
- **Risk badges**: shown in the panel header. Only the risks that apply to the product appear.
- **Severity Breakdown**: the base score, followed by one entry for each runtime risk with the reason. For **Service in Production**, the entry lists the service's environments. For **Service Exposed to Attacks**, it shows the number of attacks in the last 15 days and the top detected security activities. When more than one service runs the file, the breakdown is calculated for the highest-severity service, and the panel names it.

### On the Summary page

- **Code vulnerabilities**: switch the funnel between **Static (SAST)** and **Runtime (IAST)**. The SAST funnel shows Default branch, In your services, In production, and Exposed to attacks, with counts for Publicly Accessible, Access to Sensitive Data, and Privileged Access.
- **Secrets** and **Infrastructure as Code**: select the **Runtime context** view. Secrets shows Default branch, In your services, and In production. IaC adds Exposed to attacks.
- Click any stage or count to open the explorer filtered to it.

## How findings are mapped to services

Datadog maps a finding to every service that runs its file, using these sources:

1. **Software Catalog code locations (recommended).** Set `codeLocations` in your service definitions (schema v3). This is the only way to explicitly control the mapping. See [Link findings to Datadog services and teams][5].
2. **Git metadata from your tracers.** Datadog matches the repository URL and commit SHA that your APM tracer sends. Set `DD_GIT_REPOSITORY_URL` and `DD_GIT_COMMIT_SHA`, or use a tracer version that adds them automatically. See [Datadog Source Code Integration][6].
3. **Automatic code-to-service mapping.** Datadog analyzes your repositories to find each service's entry points and dependencies, and reads deployment files, such as Dockerfiles, that name a service.
4. **Name matching.** Datadog matches service names against path segments and repository names.

For IaC Security findings, a related service means the IaC file lives in that service's repository or deployment files. It does not confirm that the misconfiguration is live in that service.

### Improve coverage

If many findings show **No runtime context**:

1. Add git metadata to the tracer of each service built from the repository, for example `DD_GIT_REPOSITORY_URL=github.com/<org>/<repo>` and `DD_GIT_COMMIT_SHA=$(git rev-parse HEAD)`.
2. Or add `codeLocations` to the service's definition in the Software Catalog.
3. Redeploy. New findings pick up the mapping on the next scan.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/code_security/static_analysis/
[2]: /security/code_security/secret_scanning/
[3]: /security/code_security/iac_security/
[4]: /security/code_security/software_composition_analysis/
[5]: /security/code_security/static_analysis/setup/#link-findings-to-datadog-services-and-teams
[6]: /integrations/guide/source-code-integration/
