---
title: Kubernetes Security Posture Management
kind: documentation
further_reading:
- link: "security/default_rules"
  tag: "Documentation"
  text: "Explore default CSM Misconfigurations cloud configuration detection rules"
- link: "/security/misconfigurations/custom_rules"
  tag: "Documentation"
  text: "Create Custom Rules"
---

<div class="alert alert-warning">Kubernetes Security Posture Management is in beta.</div>

Kubernetes Security Posture Management (KSPM) for Cloud Security Management (CSM) helps you proactively strengthen the security posture of your Kubernetes deployments by benchmarking your environment against established industry best practices, such as those defined by [CIS][1], or your own [custom detection policies](#create-your-own-kubernetes-security-detections).

## 

To take full advantage of KSPM, you must install both the Datadog Agent and cloud integrations.

| Resource Type            | Install Method    | Framework        |
|--------------------------|-------------------|------------------|
| `aws_eks_cluster`        | cloud integration |                  |
| `aws_eks_worker_node`    | Agent             | `cis-eks`        |
| `azure_aks_cluster`      | cloud integration |                  |
| `azure_aks_worker_node`  | Agent             | `cis-aks`        |
| `kubernetes_master_node` | Agent             | `cis-kubernetes` |
| `kubernetes_worker_node` | Agent             |                  |

In addition to KSPM, Datadog CSM also enables you to:

- Identify vulnerabilities in your container images and get advice on how to prioritize remediation efforts, based on whether the affected containers run in production and if attackers are likely to exploit a vulnerability (determined by public exploit availability and [Exploit Prediction Scoring System (EPSS)](https://www.first.org/epss/) score).
- Use out-of-the-box detection rules to catch Kubernetes-native attacks such as unfamiliar processes accessing a pod's service account token, and use the existing Datadog observability context for 360-degree investigations.

## Monitor risk across Kubernetes deployments

With KSPM, Datadog scans your environment for risks defined by the more than 50+ out-of-the-box Kubernetes detection rules. When at least one case defined in a rule is matched over a given period of time, a notification alert is sent (if configured), and a finding is generated in the [Misconfigurations Explorer][11].

Each finding contains the context you need to identify the issue's impact, such as the full resource configuration, resource-level tags, and a map of the resource's relationships with other components of your infrastructure. Once you understand the problem and its impact, you can start remediating the issue by [creating a Jira ticket][7] from within CSM or [executing a pre-defined workflow][8].

**Note**: You can also use the [API to programmatically interact with findings][10].

## Assess your Kubernetes security posture against industry-standard frameworks

CSM provides a [security posture score][2] that helps you understand your security and compliance status using a single metric. The score represents the percentage of your environment that satisfies all of your active out-of-the-box cloud and infrastructure detection rules. You can obtain the score for your entire organization, or for specific teams, accounts, and environments, including Kubernetes deployments.

For an in-depth explanation on how the security posture score works, see [Security posture score][3].

### View security posture score for Kubernetes deployments

To view the security posture score for your Kubernetes deployments, navigate to the [**Security** > **Compliance**][9] page and locate the CIS Kubernetes frameworks reports.

### View detailed reports for Kubernetes frameworks

To view a detailed report that gives you insight into how you score against the framework's requirements and rules, click **Framework Overview**. On the framework page, you can download a copy of the report as a PDF or export it as a CSV.

{{< img src="security/csm/kubernetes_posture_score.png" alt="The CIS Kubernetes compliance report page showing an overall posture score of 64 percent" width="100%">}}

## Create your own Kubernetes detection rules

In addition to the out-of-the-box detection rules, you can also create your own Kubernetes detection rules by cloning an existing rule or creating a new one from scratch. Rules are written in the [Rego policy language][4], a flexible Python-like language that serves as the industry standard for detection rules. For more information, see [Writing Custom Rules with Rego][5].

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
[9]: https://app.datadoghq.com/security/compliance/home
[10]: /api/latest/security-monitoring/#list-findings
[11]: https://app.datadoghq.com/security/compliance