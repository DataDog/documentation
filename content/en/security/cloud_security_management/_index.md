---
title: Cloud Security
aliases:
  - /security_platform/cloud_security_management/
further_reading:
  - link: "/security/cloud_security_management/misconfigurations/"
    tag: "Documentation"
    text: "Start tracking misconfigurations with Cloud Security Misconfigurations"
  - link: "/security/research_feed"
    tag: "Documentation"
    text: "Security Research Feed"
  - link: "https://www.datadoghq.com/blog/cyber-attack-simulation-with-stratus-red-team/"
    tag: "Blog"
    text: "Elevate AWS threat detection with Stratus Red Team"
  - link: "https://www.datadoghq.com/blog/kubernetes-security-best-practices/"
    tag: "Blog"
    text: "Best practices for securing Kubernetes applications"
  - link: "https://www.datadoghq.com/blog/workload-security-evaluator/"
    tag: "Blog"
    text: "Run Atomic Red Team detection tests in container environments with Datadog's Workload Security Evaluator"
  - link: "https://www.datadoghq.com/blog/security-labs-ruleset-launch/"
    tag: "Blog"
    text: "Fix common cloud security risks with the Datadog Security Labs Ruleset"
  - link: "https://www.datadoghq.com/blog/securing-cloud-native-applications/"
    tag: "Blog"
    text: "Best practices for application security in cloud-native environments"
  - link: "https://www.datadoghq.com/blog/building-security-coverage-for-cloud-environments/"
    tag: "Blog"
    text: "Build sufficient security coverage for your cloud environment"
  - link: "https://www.datadoghq.com/blog/cloud-security-study-learnings-2024/"
    tag: "Blog"
    text: "Key learnings from the 2024 State of Cloud Security study"
  - link: "https://www.datadoghq.com/blog/security-inbox-prioritization/"
    tag: "Blog"
    text: "How Datadog Security Inbox prioritizes security risks"
  - link: "https://www.datadoghq.com/blog/datadog-detection-as-code/"
    tag: "Blog"
    text: "How we use Datadog for detection as code"
  - link: "https://www.datadoghq.com/blog/shared-responsibility-model/"
    tag: "Blog"
    text: "Simplifying the shared responsibility model: How to meet your cloud security obligations"
  - link: "https://www.datadoghq.com/blog/detect-bedrock-misconfigurations-cloud-security"
    tag: "Blog"
    text: "Detect Amazon Bedrock misconfigurations with Datadog Cloud Security"
  - link: https://www.datadoghq.com/blog/security-graph-attack-paths
    tag: Blog
    text: Trace exposure routes between resources with Datadog Cloud Security
algolia:
  tags: ['csm', 'cloud security management', 'inbox']
cascade:
    algolia:
        subcategory: Cloud Security
---

{{< learning-center-callout header="Join an enablement webinar session" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Security">}}
  Learn how Datadog Cloud SIEM and Cloud Security elevate your organization's threat detection and investigation for dynamic, cloud-scale environments. 
{{< /learning-center-callout >}}

Datadog Cloud Security delivers deep visibility, continuous configuration audits, identity risk assessments, vulnerability detection, and real-time threat detection across your entire cloud infrastructure—all in a unified platform for seamless collaboration and faster remediation.

Security and DevOps teams can act on the shared context of observability and security data to quickly prioritize and remediate issues.

{{< site-region region="gov" >}}
<div class="alert alert-danger">Agentless Scanning is not available in the selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Cloud Security leverages both the Datadog Agent and Agentless. It includes a variety of features you can enable to manage different facets of your organization's security:

- [**Misconfigurations**][2]: Tracks the security hygiene and compliance posture of your production environment, automates audit evidence collection, and enables you to remediate misconfigurations that leave your organization vulnerable to attacks.
- [**Identity Risks**][8]: Provides in-depth visibility into your organization's AWS IAM, Azure, and GCP risks, and enables you to detect and resolve identity risks on an ongoing basis.
- [**Vulnerabilities**][9]: Continuously detect, prioritize, and remediate exploitable vulnerabilities in your container images, host images, and hosts running in your infrastructure.

Cloud Security also includes access to Datadog Security features, including:
- [Detection Rules][18]
- [Notifications][6]
- [Automation Pipelines][19]
- [Security Inbox][14]
- [Audit Trail][20]
- [Security Research Feed][16]

{{< callout url="#" btn_hidden="true" header="false">}}
  The new Cloud Security Summary shown below is in Preview. To get started, contact your Customer Success representative.
{{< /callout >}} 

{{< img src="security/csm/csm_overview_4.png" alt="Cloud Security Summary in Datadog" width="100%">}}

{{< partial name="security-platform/CSW-billing-note.html" >}}

## Track your organization's health

Available for [Cloud Security Misconfigurations][2], the [security posture score][5] helps you track your organization's overall health. The score represents the percentage of your environment that satisfies all of your active out-of-the-box cloud and infrastructure compliance rules.

Improve your organization's score by remediating misconfigurations, either by resolving the underlying issue or by muting the misconfiguration.

{{< img src="security/csm/health_scores.png" alt="The posture score on the Cloud Security overview page tracks your organization's overall health" width="100%">}}

## Explore and remediate issues

For an overview of your Cloud Security and App and API Protection findings, sorted by importance, use the [Security Inbox][14].

To get more detail, use [Findings][7] to review and remediate your organization's security findings concerning misconfigurations, vulnerabilities, and identity risks. View detailed information about a finding, including guidelines and remediation steps. [Send real-time notifications][6] when a threat is detected in your environment, and use tags to identify the owner of an impacted resource.

{{< img src="security/csm/findings_page_2.png" alt="Cloud Security Findings page" width="100%">}}

## Investigate resources

- Use the [Security Graph][17] to model your cloud environment as a relationship graph, so you can visualize and query the connections between your cloud resources. You can write queries to search for specific relationships between resources, such as publicly accessible EC2 instances that can access S3 buckets containing sensitive data, so you can proactively mitigate those infrastructure risks.
  {{< img src="security/csm/security_graph.png" alt="Security Graph displaying an example EC2 instance" width="100%">}}
- Use the [Resource Catalog][12] to view specific misconfigurations and threats that have been reported on the hosts and resources in your environments. For more information, see the [Resource Catalog][13] documentation.
  {{< site-region region="gov" >}}
  <div class="alert alert-danger">Resource Catalog is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
  {{< /site-region >}}
  {{< img src="infrastructure/resource_catalog/resource_catalog_infra_3.png" alt="Resource Catalog map view displaying host and cloud resources grouped by category and misconfigurations." style="width:100%;" >}}
- Use the [Cloudcraft Security Map][21] to visualize your resources and any misconfigurations, vulnerabilities, identity risks, or sensitive data associated with them. For more information on these overlays, see the [Cloudcraft overlay][22] documentation.

## Subscribe to weekly digest reports

Receive a weekly summary of Cloud Security activity over the past week, including important new security issues discovered in the last seven days. Subscriptions to the weekly digest report are managed on a per user basis. To [subscribe to the weekly digest report][11], you must have the `security_monitoring_signals_read` permission.

## Learn about emerging threats and vulnerabilities

Use the [Security Research Feed][15] to stay current with the latest security developments, with content managed by Datadog's Security Research and Detection Engineering teams. For more information, see the [Security Research Feed][16] documentation.

## Next steps

To get started with Cloud Security, navigate to the [**Cloud Security Setup**][3] page in Datadog, which has detailed steps on how to set up and configure Cloud Security. For more information, see [Setting Up Cloud Security][10].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/workload_protection/
[2]: /security/cloud_security_management/misconfigurations/
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://app.datadoghq.com/security/csm
[5]: /glossary/#posture-score
[6]: /security/notifications/
[7]: https://app.datadoghq.com/security/compliance
[8]: /security/cloud_security_management/identity_risks/
[9]: /security/cloud_security_management/vulnerabilities/
[10]: /security/cloud_security_management/setup/
[11]: https://app.datadoghq.com/security/configuration/reports
[12]: https://app.datadoghq.com/infrastructure/catalog
[13]: /infrastructure/resource_catalog
[14]: /security/security_inbox
[15]: https://app.datadoghq.com/security/feed
[16]: /security/research_feed
[17]: /security/cloud_security_management/security_graph
[18]: /security/detection_rules/
[19]: /security/automation_pipelines/
[20]: /security/audit_trail/
[21]: https://app.datadoghq.com/security/map
[22]: /datadog_cloudcraft/overlays/#security