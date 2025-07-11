---
title: Kubernetes Security Posture Management
aliases:
  - /security/cloud_security_management/misconfigurations/frameworks_and_benchmarks/kspm/
further_reading:
- link: "security/default_rules"
  tag: "Documentation"
  text: "Explore default Cloud Security Misconfigurations cloud configuration detection rules"
- link: "/security/misconfigurations/custom_rules"
  tag: "Documentation"
  text: "Create Custom Rules"
---

Kubernetes Security Posture Management (KSPM) for Cloud Security helps you proactively strengthen the security posture of your Kubernetes deployments by benchmarking your environment against established industry best practices, such as those defined by [CIS][1], or your own [custom detection policies](#create-your-own-kubernetes-detection-rules).

## Setting up KSPM

To take full advantage of KSPM, you must install both the Datadog Agent and cloud integrations. For detailed instructions, see the following articles:

- [Deploying Cloud Security on the Agent][12]
- [Deploying Cloud Security via Cloud Integrations][13]

This allows Datadog to detect risks in your Kubernetes deployments for each of the following resource types:

| Resource Type                     | Install Method    | Framework        |
|-----------------------------------|-------------------|------------------|
| `aws_eks_cluster`                 | Cloud integration | `cis-eks`        |
| `aws_eks_worker_node`             | Agent             | `cis-eks`        |
| `azure_aks_cluster`               | Cloud integration | `cis-aks`        |
| `azure_aks_worker_node`           | Agent             | `cis-aks`        |
| `gcp_kubernetes_engine_cluster`   | Cloud integration | `cis-gke`        |
| `gcp_kubernetes_engine_node_pool` | Cloud integration | `cis-gke`        |
| `gcp_gke_worker_node`             | Agent             | `cis-gke`        |
| `kubernetes_master_node`          | Agent             | `cis-kubernetes` |
| `kubernetes_worker_node`          | Agent             | `cis-kubernetes` |

## Monitor risk across Kubernetes deployments

With KSPM, Datadog scans your environment for risks defined by more than 50+ out-of-the-box Kubernetes detection rules. When at least one case defined in a rule is matched over a given period of time, [a notification alert is sent][6], and a finding is generated in the [Misconfigurations explorer][11].

Each finding contains the context you need to identify the issue's impact, such as the full resource configuration, resource-level tags, and a map of the resource's relationships with other components of your infrastructure. After you understand the problem and its impact, you can start remediating the issue by [creating a Jira ticket][7] from within Cloud Security or by [executing a pre-defined workflow][8].

**Note**: You can also use the [API to programmatically interact with findings][10].

{{< img src="security/csm/kspm_finding_1.png" alt="The details panel for a medium severity finding for the EKS Cluster should have public access limited rule" width="80%">}}

## Assess your Kubernetes security posture against industry-standard frameworks

Cloud Security provides a [security posture score][2] that helps you understand your security and compliance status using a single metric. The score represents the percentage of your environment that satisfies all of your active out-of-the-box cloud and infrastructure detection rules. You can obtain the score for your entire organization, or for specific teams, accounts, and environments, including Kubernetes deployments.

For an in-depth explanation on how the security posture score works, see [Security posture score][3].

### View security posture score for Kubernetes deployments

To view the security posture score for your Kubernetes deployments, navigate to the [**Security** > **Compliance**][9] page and locate the CIS Kubernetes frameworks reports.

### View detailed reports for Kubernetes frameworks

Click a framework to view a detailed report that gives you insight into how you score against the framework's requirements and rules. On the framework page, you can download a copy of the report as a PDF or export it as a CSV.

{{< img src="security/csm/kubernetes_posture_score_3.png" alt="The CIS Kubernetes compliance report page showing an overall posture score of 64 percent" width="100%">}}

## Create your own Kubernetes detection rules

In addition to the out-of-the-box detection rules, you can also create your own Kubernetes detection rules by cloning an existing rule or creating a new one from scratch. Rules are written in the [Rego policy language][4], a flexible Python-like language that serves as the industry standard for detection rules. For more information, see [Writing Custom Rules with Rego][5].

After you create the detection rule, you can customize its severity (`Critical`, `High`, `Medium`, `Low`, or `Info`) and [set alerts for real-time notifications][6] to notify you when a new finding is detected.

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
[12]: /security/cloud_security_management/setup/agent/
[13]: /security/cloud_security_management/setup/cloud_integrations/