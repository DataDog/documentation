---
title: Prioritize Findings with Runtime Context
description: See the services that your Static Code Analysis, Software Composition Analysis, Secret Scanning, and IaC Security findings map to, and the runtime risks those services carry.
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

Static scans report issues anywhere in your repositories, including test code and modules that never run in production. Runtime context shows the services that each finding maps to and the runtime risks those services carry, so you can fix findings in live, exposed services first.

Runtime context is available for:

- [Static Code Analysis (SAST)][1]
- [Software Composition Analysis (SCA)][2]
- [Secret Scanning][3]
- [Infrastructure as Code (IaC) Security][4]

## How runtime context works

Runtime context comes from the services that each finding maps to. Findings from repository scans in all four products share one service mapping. Runtime SCA findings are detected in a running service, so they map to that service directly. For details, see the [How findings are mapped to services](#how-findings-are-mapped-to-services) section.

- **Findings mapped to one service**: Each finding inherits the runtime risks of its service.
- **Findings mapped to more than one service**: A runtime risk applies if any of the mapped services has it.
- **Unmapped findings**: Findings show no risk badges and keep their current severity. Datadog never treats unmapped findings as low risk.

For SCA findings, runtime risks adjust the Datadog Severity Score. For details, see [how SCA calculates the Datadog Severity Score][9]. For SAST, Secret Scanning, and IaC Security findings, runtime risks are informational: they don't change the Datadog Severity Score.

## Runtime risks

Runtime risks help you decide which findings to fix first, based on how the mapped services run. Not every risk is available for every product.

| Runtime risk | How it is evaluated | SAST | SCA | Secret Scanning | IaC Security |
| --- | --- | --- | --- | --- | --- |
| Service in Production | The service runs in a production environment. | Yes | Yes | Yes | Yes |
| Service Exposed to Attacks | The service has received attacks in the last 15 days. | Yes | Yes | No | Yes |
| Access to Sensitive Data | The service runs on infrastructure that has access to sensitive data. | Yes | Yes | No | Yes |
| Privileged Access | The service runs with elevated privileges or can assume a privileged role. | Yes | Yes | Yes | Yes |
| Publicly Accessible | The service is reachable from the internet. | Yes | Yes | Yes | Yes |

SCA findings also carry signals about the vulnerability itself, such as reachability, exploit availability, and Exploit Prediction Scoring System (EPSS) scores. For details, see [how SCA calculates the Datadog Severity Score][9].

## Use runtime context

Runtime context appears wherever you work with findings, from filtering lists to inspecting a single finding to tracking risk on the Summary page.

### In the explorers

In {{< ui >}}Code Security{{< /ui >}} > {{< ui >}}Vulnerabilities{{< /ui >}}, use the {{< ui >}}Static Code (SAST){{< /ui >}}, {{< ui >}}Libraries (SCA){{< /ui >}}, {{< ui >}}Secret Scanning (Secrets){{< /ui >}}, and {{< ui >}}Infrastructure as Code (IaC){{< /ui >}} explorers to filter findings in production and exposed services, so you can triage those findings first.

- In the {{< ui >}}Risks{{< /ui >}} facet group, filter by each runtime risk that applies to the product, such as {{< ui >}}Service in Production{{< /ui >}} and {{< ui >}}Service Exposed to Attacks{{< /ui >}}. In the IaC explorer, these facets are {{< ui >}}In Production{{< /ui >}} and {{< ui >}}Exposed to Attacks{{< /ui >}}.
- Each finding shows risk badges under its title, such as {{< ui >}}Service In Production{{< /ui >}} or {{< ui >}}Exposed to attacks{{< /ui >}}. IaC Security findings show {{< ui >}}In production{{< /ui >}} instead of {{< ui >}}Service In Production{{< /ui >}}. Hover over a badge to see what it means.

{{< img src="code_security/runtime_context/explorer-risks-facets.png" alt="The Static Code Analysis explorer filtered by two Risks facets, with runtime risk badges on each finding" style="width:100%;" >}}

Unmapped findings never match a runtime risk filter. If a risk filter returns no results, clear it to see more findings.

### In the finding side panel

The finding side panel shows the services that a finding maps to and the runtime risks those services carry, so you can judge how urgent the finding is.

- **{{< ui >}}Related To{{< /ui >}}**: For SAST, Secret Scanning, and IaC Security findings, the services that the finding maps to. Hover over the label to see how Datadog maps findings to services and how to fix an incorrect mapping. If a finding maps to no service, SAST and Secret Scanning findings show {{< ui >}}Missing Service{{< /ui >}}, and IaC Security findings hide this row.
- **{{< ui >}}Repositories{{< /ui >}} and {{< ui >}}Impacted services{{< /ui >}}**: For SCA findings, the {{< ui >}}Repositories{{< /ui >}} section shows the services mapped to each finding from a repository scan, and the {{< ui >}}Impacted services{{< /ui >}} section lists the services where Runtime SCA detected the library. For details, see [View vulnerability details][10].
- **Risk badges**: For SAST, Secret Scanning, and IaC Security findings, the panel header shows the runtime risks that apply to the product.
- **{{< ui >}}Severity Breakdown{{< /ui >}}**: The base score, followed by one sentence for each runtime risk, for example: "This vulnerability has associated service(s) running in a production environment." For SCA findings, expand a row in the {{< ui >}}Repositories{{< /ui >}} section to see its severity breakdown.

{{< img src="code_security/runtime_context/side-panel-related-to.png" alt="The Detected In and Related To sections of a finding side panel, with two mapped services" style="width:70%;" >}}

{{< img src="code_security/runtime_context/side-panel-severity-breakdown.png" alt="The Severity Breakdown tab of a finding side panel, with one row for each runtime risk" style="width:100%;" >}}

### On the Summary page

On the [{{< ui >}}Code Security Summary{{< /ui >}}][5] page, runtime context shows how many SAST and SCA findings are in production services and in services exposed to attacks, so you can track risk across repositories and teams.

- In the {{< ui >}}Code vulnerabilities{{< /ui >}} section, select {{< ui >}}Static (SAST){{< /ui >}} to see a funnel of SAST findings: {{< ui >}}Default branch{{< /ui >}}, {{< ui >}}In your services{{< /ui >}}, {{< ui >}}In Production{{< /ui >}}, and {{< ui >}}Exposed to Attacks{{< /ui >}}.
- In the {{< ui >}}Library vulnerabilities{{< /ui >}} section, a funnel shows SCA findings: {{< ui >}}Default branch{{< /ui >}}, {{< ui >}}In Production{{< /ui >}}, {{< ui >}}Exploit Available{{< /ui >}}, and {{< ui >}}Exposed to Attacks{{< /ui >}}.
- Below each funnel, counts appear for the runtime risks that aren't funnel stages, such as {{< ui >}}Publicly Accessible{{< /ui >}}, {{< ui >}}Access to Sensitive Data{{< /ui >}}, and {{< ui >}}Privileged Access{{< /ui >}}. Risks with no matching findings are hidden.
- In the {{< ui >}}Code vulnerabilities grouped{{< /ui >}} section, select {{< ui >}}Static (SAST){{< /ui >}} to group SAST findings by repository and team.

{{< img src="code_security/runtime_context/summary-funnel.png" alt="The static code vulnerabilities funnel on the Code Security Summary page" style="width:100%;" >}}

Click a funnel stage or a risk count to open the explorer filtered to those findings.

## How findings are mapped to services

Datadog combines several sources to map findings to services, including Software Catalog code locations, runtime data from your services, analysis of your repositories, Error Tracking, and service names. A finding can map to more than one service. For details on each source and how to control the mapping with Software Catalog code locations, see [Link findings to Datadog services and teams][6].

A mapping means that the finding's file is related to the service. It does not confirm that the file is part of the version of the service that is deployed.

For IaC Security findings, a mapped service means that the IaC file is in that service's repository or deployment files. It does not confirm that the misconfiguration is present in the running service.

## Map more findings to services

Findings without a mapped service get no runtime context, so mapping more of your code to services gives you more findings you can prioritize by risk. Use one or both of these methods:

- **Add code locations in the Software Catalog (recommended)**: Add `codeLocations` to the service's definition in the [Software Catalog][8]. This is the only way to control the mapping explicitly, and it doesn't require a redeploy.
- **Report Git metadata from your services**: Configure each service built from the repository to report Git metadata, so Datadog can link the service to its repository and map findings automatically. For example, set `DD_GIT_REPOSITORY_URL=github.com/<org>/<repo>` and `DD_GIT_COMMIT_SHA=$(git rev-parse HEAD)`, then redeploy the service so it reports the new values. See [Datadog Source Code Integration][7].

Mapping changes can take up to 24 hours to apply to your findings.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/code_security/static_analysis/
[2]: /security/code_security/software_composition_analysis/
[3]: /security/code_security/secret_scanning/
[4]: /security/code_security/iac_security/
[5]: https://app.datadoghq.com/security/code-security/summary
[6]: /security/code_security/static_analysis/setup/#link-findings-to-datadog-services-and-teams
[7]: /integrations/guide/source-code-integration/
[8]: /software_catalog/
[9]: /security/code_security/software_composition_analysis/#datadog-severity-score
[10]: /security/code_security/software_composition_analysis/#view-vulnerability-details
