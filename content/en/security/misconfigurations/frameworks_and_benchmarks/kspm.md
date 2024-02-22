---
title: Kubernetes Security Posture Management
kind: documentation
further_reading:
- link: "security/default_rules"
  tag: "Documentation"
  text: "Explore default CSM Misconfigurations cloud configuration compliance rules"
- link: "/security/misconfigurations/custom_rules"
  tag: "Documentation"
  text: "Create Custom Rules"
---

Kubernetes Security Posture Management (KSPM) for Cloud Security Management (CSM) helps you proactively strengthen the security posture of your Kubernetes deployments by benchmarking your environment against established industry best practices, such as those defined by [CIS][1], or your own [custom detection policies](#create-your-own-kubernetes-security-detections).

**Note**: To take full advantage of KSPM, you must install both the Datadog Agent and cloud integrations.

* Setup requires both cloud integrations AND the Agent (for latter, e.g., cluster).
* Need to call out resource types that are surfaced as part of KSPM.
* Limited to the control plane (don't have lower level resource types and associated detections).

In addition to KSPM, Datadog CSM also enables you to:

- Identify vulnerabilities in your container images and get advice on how to prioritize remediation efforts, based on whether the affected containers run in production and if attackers are likely to exploit a vulnerability (determined by public exploit availability and [Exploit Prediction Scoring System (EPSS)](https://www.first.org/epss/) score).
- Use out-of-the-box detection rules to catch Kubernetes-native attacks such as unfamiliar processes accessing a pod's service account token, and use the existing Datadog observability context for 360-degree investigations.

## Monitor risk across Kubernetes deployments

Datadog scans your environment for risks defined by the more than 50+ out-of-the-box detection rules and offers a clear description of any issue detected, along with remediation guidelines.

Each finding contains the context you need to identify the issue's impact, such as the full resource configuration, resource-level tags, and a map of the resource's relationships with other components of your infrastructure. Once you understand the problem and its impact, you can start remediating the issue by [creating a Jira ticket][7] from within CSM or [executing a pre-defined workflow][8].

## Assess your Kubernetes security posture against industry-standard frameworks 

The [security posture score][2] helps you understand your security and compliance status at a glance under a single metric. The score represents the percentage of your environment that satisfies all of your active out-of-the-box cloud and infrastructure compliance rules.

On the report page for a framework, you can generate detailed PDF or CSV exports to share internally or with auditors. You  can also use the API to programmatically interact with the findings surfaced. For an in-depth explanation how the security posture score works, see [Security posture score][3].

## Create your own Kubernetes detection rules

In addition to the out-of-the-box detection rules, you can also create your own detection rules for Kubernetes by cloning an existing rule or creating one from scratch. Rules are written in the [Rego policy language][4], a flexible Python-like language that serves as the industry standard for detection rules. For more information, see [Writing Custom Rules with Rego][5].

After you create the detection rule, you can customize its severity (Critical, High, Medium, Low, or Info) and [set alerts for real-time notifications][6] to notify you when a new finding is detected.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.cisecurity.org/cis-benchmarks
[2]: /security/cloud_security_management#track-your-organizations-health
[3]: /glossary/#security-posture-score
[4]: https://www.openpolicyagent.org/docs/latest/policy-language/
[5]: /security/cloud_security_management/guide/writing_rego_rules/
[6]: /security/misconfigurations/compliance_rules#set-notification-targets-for-compliance-rules
[7]: /security/cloud_security_management/review_remediate/jira
[8]: /security/cloud_security_management/review_remediate/workflows