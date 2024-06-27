---
title: Cloud Security Management Misconfigurations
aliases:
  - /security_platform/cspm/
  - /security/cspm/#glossary
  - /security/cspm/
  - /security/misconfigurations/
algolia:
  tags: ['cspm']
---

Cloud Security Management Misconfigurations (CSM Misconfigurations) makes it easier to assess and visualize the current and historic security posture of your cloud resources, automate audit evidence collection, and remediate misconfigurations that leave your organization vulnerable to attacks. By continuously surfacing security weaknesses resulting from misconfigurations, teams can mitigate risks while ensuring compliance with industry standards.

## Detect misconfigurations across your cloud resources

Strengthen your security posture and achieve continuous compliance by detecting, prioritizing, and remediating misconfigurations across all your cloud resources using Datadog's [out-of-the-box compliance rules](#manage-out-of-the-box-and-custom-compliance-rules). 

View a high-level overview of your security posture on the [Overview page][1]. Examine the details of misconfigurations and analyze historical configurations with the [Misconfigurations Explorer][2].

CSM Misconfigurations evaluates resources in increments between 15 minutes and 4 hours (depending on type). Datadog generates new misconfigurations as soon as a scan is completed, and stores a complete history of all misconfigurations for the past 15 months so they are available in case of an investigation or audit.

{{< img src="security/csm/csm_overview_2.png" alt="The Security Inbox on the Cloud Security Management overview shows a list of prioritized security issues to remediate" width="100%">}}

## Maintain compliance with industry frameworks and benchmarks

CSM Misconfigurations comes with more than 1,000 out-of-the-box compliance rules that are maintained by a team of security experts. The rules map to controls and requirements within compliance standards and industry benchmarks, such as PCI and SOC2 compliance frameworks.

[View compliance reports][3] to see how well you're doing against each control in a compliance framework. The reports include details such as resources with the most failed misconfigurations, a comprehensive breakdown of the number of resources with pass/fail misconfigurations, and the top three high-severity rule failures.

{{< img src="security/cspm/frameworks_and_benchmarks/compliance_reports_2.png" alt="CSM Misconfigurations compliance frameworks" width="100%">}}

## Manage out-of-the-box and custom compliance rules

[Out-of-the-box compliance rules][4] surface the most important risks so that you can immediately take steps to remediate. Datadog continuously develops new default rules, which are automatically imported into your account. [Customize the rules][5] by defining how each rule scans your environment, [create custom rules][6], and [set up real-time notifications for failed misconfigurations](#set-up-real-time-notifications).

{{< img src="security/cspm/compliance_rules.png" alt="CSM Misconfigurations compliance rules" width="100%">}}

## Set up real-time notifications

[Send real-time notifications][7] when a new misconfiguration is detected in your environment, so that your teams can take action to mitigate the risk. Notifications can be sent to [Slack, email, PagerDuty, webhooks, and more][8].

Use template variables and Markdown to [customize notification messages][9]. Edit, disable, and delete existing notification rules, or create new rules and define custom logic for when a notification is triggered based on severity and rule type.

## Review and remediate misconfigurations

Investigate details using the [Misconfigurations Explorer][10]. View detailed information about a resource, such as configuration, compliance rules applied to the resource, and tags that provide additional context about who owns the resource and its location within your environment. If a misconfiguration does not match your business use case or is an accepted risk, you can [mute the misconfiguration][13] up to an indefinite period of time.

You can also [create a Jira issue][15] and assign it to a team, use Terraform remediation to generate a pull request in GitHub with code changes that fix the underlying misconfiguration, and leverage [Workflow Automation][14] to create automated workflows (with or without human involvement).

{{< img src="security/cspm/misconfigurations_explorer.png" alt="CSM Misconfigurations Explorer page" width="100%">}}

## Get started

{{< learning-center-callout header="Try Detect, Prioritize, and Remediate Cloud Security Risks with Datadog CSM in the Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/csm-misconfigurations">}}
  The Datadog Learning Center is full of hands-on courses to help you learn about this topic. Enroll at no cost to learn how to secure your cloud environments with CSM misconfigurations.
{{< /learning-center-callout >}}

{{< whatsnext >}}
  {{< nextlink href="/security/cloud_security_management/setup">}}Complete setup and configuration{{< /nextlink >}}
  {{< nextlink href="/getting_started/cloud_security_management">}}Getting Started with Cloud Security Management{{< /nextlink >}}
  {{< nextlink href="/account_management/rbac/permissions/#cloud-security-platform">}}Datadog role permissions for CSM Misconfigurations{{< /nextlink >}}
  {{< nextlink href="/security/default_rules/#cat-posture-management-cloud">}}Out-of-the-box cloud detection rules for CSM Misconfigurations{{< /nextlink >}}
  {{< nextlink href="/security/default_rules/#cat-posture-management-infra">}}Out-of-the-box infrastructure detection rules for CSM Misconfigurations{{< /nextlink >}}
  {{< nextlink href="/security/cloud_security_management/misconfigurations/findings">}} Learn more about misconfigurations{{< /nextlink >}}
  {{< nextlink href="https://www.datadoghq.com/blog/cspm-for-azure-with-datadog/">}} Monitor the security and compliance posture of your Azure environment{{< /nextlink >}}
  {{< nextlink href="https://www.datadoghq.com/blog/cspm-for-gcp-with-datadog/">}} Improve the compliance and security posture of your Google Cloud environment{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/security/csm
[2]: https://app.datadoghq.com/security/compliance
[3]: /security/cloud_security_management/misconfigurations/frameworks_and_benchmarks
[4]: /security/default_rules/#cat-posture-management-cloud
[5]: /security/cloud_security_management/misconfigurations/frameworks_and_benchmarks#view-your-compliance-posture
[6]: /security/cloud_security_management/misconfigurations/custom_rules
[7]: /security/notifications/
[8]: /security/notifications/#notification-channels
[9]: /security/notifications/#detection-rule-notifications
[10]: /security/cloud_security_management/misconfigurations/findings
[11]: /security/default_rules/#cat-posture-management-infra
[12]: https://www.pcisecuritystandards.org/pci_security/maintaining_payment_security
[13]: /security/cloud_security_management/mute_issues
[14]: /security/cloud_security_management/review_remediate/workflows/
[15]: /security/cloud_security_management/review_remediate/jira?tab=csmmisconfigurations