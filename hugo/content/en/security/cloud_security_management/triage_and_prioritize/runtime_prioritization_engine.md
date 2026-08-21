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
- link: "https://www.datadoghq.com/blog/runtime-prioritization-engine/"
  tag: "Blog"
  text: "Prioritize security findings with the Datadog Runtime Prioritization Engine"
- link: "https://www.datadoghq.com/blog/datadog-security/"
  tag: "Blog"
  text: "Securing the AI era: Outpace AI-powered attacks with unified security and observability"
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

## Filter findings by runtime signals

Datadog adds the runtime signals it observes to vulnerability findings. Use these signals in the [Vulnerability Explorer][11], combined with any other criteria.

### Package is running

When [Runtime Package Prioritization][4] is enabled, Datadog adds package-level runtime signals to container image vulnerability findings for packages installed by an operating system package manager (`apt`, `yum`, or `apk`). Search, filter, and group by these tags:

| Signal | Tag |
|---|---|
| Package is running | `@risk.is_package_running:true` |
| Accessed by root process | `@package.is_running_as_root:true` |
| SUID binary present | `@package.has_suid:true` |

Datadog adds a tag when it observes a signal. An absent tag means Datadog did not observe the signal; it does not mean the package is unused. Use the tags to prioritize what to fix first, not to rule findings out.

For example, high and critical vulnerabilities that are running and have a fix available:

```
@risk.is_package_running:true @severity:(high OR critical) @remediation.is_available:true
```

Signals persist for the lifetime of an image version: after a package is observed running, findings for that image keep the signal. Because container images are immutable, the signal reflects what has run in that image. When the image is no longer deployed, its findings age out and close.

### Image is running

Datadog adds the **Container Image Running** signal to every container image vulnerability finding, with no additional Agent configuration. Search, filter, and group by this tag:

| Signal | Tag |
|---|---|
| Image detected running in the last 12 hours | `@risk.is_image_running:true` |

The tag is always `true` or `false` on container image findings, and absent on host, host image, and serverless findings. To prioritize running images across all asset types, exclude what is known to be stopped:

```
-@risk.is_image_running:false
```

For a window other than 12 hours, query `@risk_details.is_image_running.evidence.detected_at`, the time of the last detection in epoch milliseconds. This field has no facet and is independent of `@risk.is_image_running`.

How Datadog detects a running image depends on how the image is scanned:

| | Agent | Agentless |
|---|---|---|
| **Requires** | [Cloud Security vulnerability scanning][14] and [container monitoring][12] enabled on the Agent. | [Agentless Scanning][13] on the cloud account. |
| **Registries** | Any. | Amazon ECR, Azure Container Registry, or Google Artifact Registry. See [compatibility][15]. |
| **Source** | [Live Containers][12] reporting. | The cloud provider's service inventory, read at scan time. |

Without container monitoring, or for an image in an unsupported registry, the tag reads `false`.

Each detection restarts the 12-hour window, so a continuously running image does not read `false`. Nothing reports a stop and detection is periodic, so act on `true` and treat `false` as weaker evidence, especially for short-lived workloads such as CI jobs. The signal attaches to a specific image digest and does not change severity.

The severity breakdown shows how long ago Datadog last detected the image running. When the tag is `true`, the vulnerability side panel lists that image's containers from [Live Containers][12], including ones that have since exited. Live Containers does not monitor Agentless-scanned workloads, so no containers appear for them.

## Get started

1. Deploy the Datadog Agent, version **7.79.0** or later, with Cloud Security enabled. On Kubernetes, use **7.81.0** or later for the most complete signal coverage. See [Setting Up Cloud Security][3].
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
[7]: /security/cloud_security_management/review_remediate/ownership_agent/
[8]: /security/cloud_security_management/crown_jewels/
[9]: /security/cloud_security_management/setup/agent/docker/#runtime-package-prioritization-preview
[10]: /security/cloud_security_management/setup/agent/linux/#runtime-package-prioritization-preview
[11]: https://app.datadoghq.com/security/csm/vm
[12]: /containers/
[13]: /security/cloud_security_management/setup/agentless_scanning/
[14]: /security/cloud_security_management/vulnerabilities/
[15]: /security/cloud_security_management/setup/agentless_scanning/compatibility/
