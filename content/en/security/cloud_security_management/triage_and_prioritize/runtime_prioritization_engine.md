---
title: Runtime Prioritization Engine
further_reading:
- link: "/security/cloud_security_management/triage_and_prioritize/severity_scoring/"
  tag: "Documentation"
  text: "Understand Cloud Security severity scoring"
- link: "/security/cloud_security_management/vulnerabilities/"
  tag: "Documentation"
  text: "Detect and remediate vulnerabilities with Cloud Security"
- link: "/security/security_inbox/"
  tag: "Documentation"
  text: "Review prioritized findings in the Security Inbox"
---

{{< callout url="#" btn_hidden="true" header="Runtime Prioritization Engine is in Preview" >}}
The Runtime Prioritization Engine is available in Preview for Cloud Security Vulnerabilities. Coverage for misconfigurations and identity risks is in active development.
{{< /callout >}}

Security scanners surface thousands of findings per environment. Most teams default to ranking by CVSS severity, but static scores flag many "critical" findings that are never exploited in practice. Real risk depends on live context: is the vulnerable code running, is an exploit available, and does the affected resource touch sensitive data or a business-critical workflow?

The Datadog Runtime Prioritization Engine combines runtime behavior, exploitability, exposure, and business context from Observability and Security data to identify the 5% of findings that pose real, exploitable risk, so you can focus only on what matters.

## How it works

The Runtime Prioritization Engine is designed to be explainable. For each finding, Datadog evaluates five risk dimensions using production context and shows why the finding was prioritized.

| Dimension | Question it answers | Example signals |
|---|---|---|
| **Reachability** | Is the vulnerable component actually running? | Affected image observed running on a production workload. Vulnerable package observed executing at runtime. |
| **Exposure** | Can attackers reach it? | Resource publicly accessible from static network analysis. Runtime evidence of exposure to active attacks. |
| **Exploitability** | Are attackers likely to exploit it? | Public exploit code exists. Finding actively exploited in the wild (listed in [CISA KEV][1]). High exploit probability ([EPSS][2]). |
| **Business criticality** | Would a compromise have high impact? | Resource supports a critical business function (Crown Jewel). Runs with elevated privileges and processes sensitive data. |
| **Actionability** | Can the right team fix it? | Service owner identified. Fix or mitigation available. |

A finding is prioritized when these signals show real, exploitable risk in your environment. Findings that do not meet the prioritization criteria stay visible, but move out of the active triage queue.

## Crown Jewels

Crown Jewels are the resources (services, hosts, databases, containers, and more) that support your most critical business functions. Datadog automatically infers them from observability data such as APM trace flow, service dependencies (fan-in), SLOs, traffic, incidents, and more.

Crown Jewels update continuously as your environment changes. You can also add your own Crown Jewels manually in Datadog Cloud Security.

## Ownership

Ownership identifies the team or service owner responsible for fixing a security finding. Datadog infers ownership from observability metadata such as service tags, team tags, deployment metadata, on-call configuration, source control links, service catalog entries, and more.

When ownership is known, the engine can route findings to the right team instead of leaving security teams to manually chase remediation owners.

## Coverage

| Finding type | Coverage |
|---|---|
| Vulnerabilities (host and container) | Preview |
| Misconfigurations | In development |
| Identity risks | In development |

## Get started

1. Deploy the Datadog Agent version 7.79 or later with Cloud Security enabled. See [Setting Up Cloud Security][3].
2. Enable [Runtime Package Tracking][4] on the Agent to surface the *package in use* signal on vulnerability findings.
3. Open the [Cloud Security Summary][5] in Datadog. Prioritized findings are surfaced at the top of each funnel and in the [Security Inbox][6].

## What's next

- **Live attack corroboration**: elevate findings on resources receiving confirmed attack traffic from Cloud SIEM, App and API Protection, and Workload Protection.
- **Ownership inference**: extend ownership coverage with tags, audit logs, infrastructure-as-code, and resource catalog signals.
- **Container-aware severity adjustment**: tune severity based on whether the affected container runs as root or with elevated privileges.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
[2]: https://www.first.org/epss/
[3]: /security/cloud_security_management/setup/
[4]: /security/cloud_security_management/setup/agent/
[5]: https://app.datadoghq.com/security/csm
[6]: /security/security_inbox/
