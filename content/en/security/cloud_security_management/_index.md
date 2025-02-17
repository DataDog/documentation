---
title: Cloud Security Management
aliases:
  - /security_platform/cloud_security_management/
further_reading:
  - link: "https://app.datadoghq.com/release-notes?category=Security%20%26%20Compliance"
    tag: "Release Notes"
    text: "See What's New in Datadog Security Compliance"
  - link: "/security/cloud_security_management/misconfigurations/"
    tag: "Documentation"
    text: "Start tracking misconfigurations with CSM Misconfigurations"
  - link: "/security/threats/setup"
    tag: "Documentation"
    text: "Uncover kernel-level threats with CSM Threats"
  - link: "https://www.datadoghq.com/blog/cyber-attack-simulation-with-stratus-red-team/"
    tag: "Blog"
    text: "Elevate AWS threat detection with Stratus Red Team"
  - link: "https://www.datadoghq.com/blog/kubernetes-security-best-practices/"
    tag: "Blog"
    text: "Best practices for securing Kubernetes applications"
  - link: "https://www.datadoghq.com/blog/workload-security-evaluator/"
    tag: "Blog"
    text: "Run Atomic Red Team detection tests in container environments with Datadog's Workload Security Evaluator"
  - link: "https://www.datadoghq.com/blog/security-context-with-datadog-cloud-security-management/"
    tag: "Blog"
    text: "Add security context to observability data with Datadog Cloud Security Management"
  - link: "https://www.datadoghq.com/blog/security-labs-ruleset-launch/"
    tag: "Blog"
    text: "Fix common cloud security risks with the Datadog Security Labs Ruleset"
  - link: "https://www.datadoghq.com/blog/securing-cloud-native-applications/"
    tag: "Blog"
    text: "Best practices for application security in cloud-native environments"
  - link: "https://www.datadoghq.com/blog/custom-detection-rules-with-datadog-cloud-security-management/"
    tag: "Blog"
    text: "Customize rules for detecting cloud misconfigurations with Datadog Cloud Security Management"
  - link: "https://www.datadoghq.com/blog/building-security-coverage-for-cloud-environments/"
    tag: "Blog"
    text: "Build sufficient security coverage for your cloud environment"
  - link: "https://www.datadoghq.com/blog/cloud-security-study-learnings-2024/"
    tag: "Blog"
    text: "Key learnings from the 2024 State of Cloud Security study"
  - link: "https://www.datadoghq.com/blog/cloud-security-malware-detection/"
    tag: "Blog"
    text: "Detect malware in your containers with Datadog Cloud Security Management"
  - link: "https://www.datadoghq.com/blog/security-posture-csm/"
    tag: "Blog"
    text: "Report on changes to your security posture with Cloud Security Management"
  - link: "https://www.datadoghq.com/blog/security-inbox-prioritization/"
    tag: "Blog"
    text: "How Datadog Security Inbox prioritizes security risks"
  - link: "https://www.datadoghq.com/blog/datadog-detection-as-code/"
    tag: "Blog"
    text: "How we use Datadog for detection as code"
algolia:
  tags: ['csm', 'cloud security management', 'inbox']
cascade:
    algolia:
        subcategory: Cloud Security Management
---

{{< learning-center-callout header="Join an enablement webinar session" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Security">}}
  Learn how Datadog Cloud SIEM and Cloud Security Management elevate your organization's threat detection and investigation for dynamic, cloud-scale environments. 
{{< /learning-center-callout >}}

Datadog Cloud Security Management (CSM) delivers deep visibility, continuous configuration audits, identity risk assessments, vulnerability detection, and real-time threat detection across your entire cloud infrastructure—all in a unified platform for seamless collaboration and faster remediation.

Security and DevOps teams can act on the shared context of observability and security data to quickly prioritize and remediate issues.

CSM leverages both the Datadog Agent and Agentless, and includes:

- [**Threats**][1]: Monitors file, network, and process activity across your environment to detect real-time threats to your infrastructure.
- [**Misconfigurations**][2]: Tracks the security hygiene and compliance posture of your production environment, automates audit evidence collection, and enables you to remediate misconfigurations that leave your organization vulnerable to attacks.
- [**Identity Risks**][8]: Provides in-depth visibility into your organization's AWS IAM risks and enables you to detect and resolve identity risks on an ongoing basis.
- [**Vulnerabilities**][9]: Continuously detect, prioritize, and remediate exploitable vulnerabilities in your container images, host images, and hosts running in your infrastructure.

{{< img src="security/csm/csm_overview_2.png" alt="Cloud Security Management in Datadog" width="100%">}}

{{< partial name="security-platform/CSW-billing-note.html" >}}

## Track your organization's health

Available for [CSM Misconfigurations][2], the [security posture score][5] helps you track your organization's overall health. The score represents the percentage of your environment that satisfies all of your active out-of-the-box cloud and infrastructure compliance rules.

Improve your organization's score by remediating misconfigurations, either by resolving the underlying issue or by muting the misconfiguration.

{{< img src="security/csm/health_scores.png" alt="The posture score on the CSM overview page tracks your organization's overall health" width="100%">}}

## Explore and remediate issues

Use the [Explorers][7] to review and remediate your organization's security detections. View detailed information about a detection, including guidelines and remediation steps. [Send real-time notifications][6] when a threat is detected in your environment, and use tags to identify the owner of an impacted resource.

{{< img src="security/csm/explorers_page.png" alt="CSM Explorers page" width="100%">}}

## Investigate resources

{{< site-region region="gov" >}}
<div class="alert alert-warning">Resource Catalog is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">Resource Catalog is in Preview.</div>

Use the [Resource Catalog][12] to view specific misconfigurations and threats that have been reported on the hosts and resources in your environments. See [Resource Catalog][13] for more information.

{{< img src="infrastructure/resource_catalog/resource_catalog_infra.png" alt="Resource Catalog map view displaying host and cloud resources grouped by category and misconfigurations." style="width:100%;" >}}

## Subscribe to weekly digest reports

Receive a weekly summary of Cloud Security Management activity over the past week, including important new security issues discovered in the last seven days. Subscriptions to the weekly digest report are managed on a per user basis. To [subscribe to the weekly digest report][11], you must have the `security_monitoring_signals_read` permission.

## Next steps

To get started with CSM, navigate to the [**Cloud Security Management Setup**][3] page in Datadog, which has detailed steps on how to set up and configure CSM. For more information, see [Setting Up Cloud Security Management][10].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/threats/
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
