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

{{< callout url=https://www.datadoghq.com/product-preview/runtime-prioritization-engine/
 btn_hidden="false" header="Join the Preview!">}}
Runtime Prioritization Engine is in Preview for Cloud Security Vulnerabilities. Use this form to request access.
{{< /callout >}}

Security scanners surface thousands of findings per environment. Most teams default to ranking by CVSS severity, but static scores flag many findings that are never exploited in practice as critical. Real risk depends on live context: is the vulnerable code running, is an exploit available, and does the affected resource touch sensitive data or a business-critical workflow?

The Datadog Runtime Prioritization Engine combines runtime behavior, exploitability, exposure, and business context from Observability and Security data to identify the 5% of findings that pose real, exploitable risk, so you can focus only on what matters.

## How it works

The Runtime Prioritization Engine is designed to be explainable. For each finding, Datadog evaluates five risk dimensions using production context and shows why the finding was prioritized.

| Dimension | Question it answers | Example signals |
|---|---|---|
| **Reachability** | Is the vulnerable component actually running? | Affected image observed running on a production workload. Vulnerable package observed executing at runtime. |
| **Exposure** | Can attackers reach it? | Resource publicly accessible from static network analysis. Runtime evidence of exposure to active attacks. |
| **Exploitability** | Are attackers likely to exploit it? | Public exploit code exists. Finding actively exploited in the wild (listed in [CISA KEV][1]). High exploit probability ([EPSS][2]). |
| **Business criticality** | Would a compromise have high impact? | Resource supports a critical business function ([Crown Jewel](#crown-jewels)). Runs with elevated privileges and processes sensitive data. |
| **Actionability** | Can the right team fix it? | Service owner identified. Fix or mitigation available. |

The Runtime Prioritization Engine prioritizes a finding when these signals indicate real, exploitable risk in your environment. Findings that do not meet the prioritization criteria stay visible, but move out of the active triage queue.

## Crown Jewels

[Crown Jewels][8] are the resources that support your most critical business functions (services, hosts, databases, containers, etc.). Datadog automatically infers them from observability data such as APM trace flow, service dependencies (fan-in), SLOs, traffic, incidents, and more.

Crown Jewels update continuously as your environment changes. You can also add your own Crown Jewels manually in Datadog Cloud Security.

## Ownership

[Ownership][7] identifies the team or service owner responsible for fixing a security finding. Datadog infers ownership from observability metadata such as service tags, team tags, deployment metadata, on-call configuration, source control links, service catalog entries, and more.

When ownership is known, the engine can route findings to the right team instead of leaving security teams to manually chase remediation owners.

## Get started

1. Deploy the Datadog Agent version 7.79 or later with Cloud Security enabled. See [Setting Up Cloud Security][3].
2. Enable Runtime Package Prioritization on the Agent to surface the *Package is running* signal on vulnerability findings. See the instructions to do so for [Kubernetes][4], [Docker][9], or [Linux][10] deployments.
3. Open the [{{< ui >}}Cloud Security Summary{{< /ui >}}][5] in Datadog. Prioritized findings are surfaced at the top of each funnel and in the [{{< ui >}}Security Inbox{{< /ui >}}][6].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
[2]: https://www.first.org/epss/
[3]: /security/cloud_security_management/setup/
[4]: /security/cloud_security_management/setup/agent/kubernetes/#runtime-package-prioritization-preview
[5]: https://app.datadoghq.com/security/csm
[6]: /security/security_inbox/
[7]: /security/cloud_security_management/guide/frontier_group/ownership_agent/
[8]: /security/cloud_security_management/crown_jewels/
[9]: /security/cloud_security_management/setup/agent/docker/#runtime-package-prioritization-preview
[10]: /security/cloud_security_management/setup/agent/linux/#runtime-package-prioritization-preview
