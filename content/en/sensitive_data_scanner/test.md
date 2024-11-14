---
title: Sensitive Data Scanner
disable_toc: false
further_reading:
    - link: "/data_security/"
      tag: "Documentation"
      text: "Reducing data related risks"
    - link: "/sensitive_data_scanner/scanning_rules/library_rules"
      tag: "Documentation"
      text: "Learn more about creating custom rules"
    - link: "/sensitive_data_scanner/scanning_rules/custom_rules"
      tag: "Documentation"
      text: "Learn more about creating custom rules"
    - link: "/sensitive_data_scanner/guide/best_practices_for_creating_custom_rules"
      tag: "Documentation"
      text: "Best practices for creating custom rules"
    - link: "https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/"
      tag: "Blog"
      text: "Discover, triage, and remediate sensitive data issues at scale with Sensitive Data Scanner"
    - link: "https://www.datadoghq.com/blog/sensitive-data-scanner/"
      tag: "Blog"
      text: "Build a modern data compliance strategy with Datadog's Sensitive Data Scanner"
    - link: "https://www.datadoghq.com/blog/sensitive-data-management-best-practices/"
      tag: "Blog"
      text: "Best practices for sensitive data management"
    - link: "https://www.datadoghq.com/blog/data-security/"
      tag: "Blog"
      text: "Discover sensitive data in your cloud data stores with Data Security"
    - link: "https://www.datadoghq.com/blog/hipaa-compliance-sensitive-data-scanner/"
      tag: "Blog"
      text: "How companies subject to HIPAA requirements manage sensitive data with Datadog"
---

## Overview

Sensitive data, such as credit card numbers, API keys, IP addresses, and personally identifiable information (PII) are often leaked unintentionally, which can expose your organization to security and compliance risks. Sensitive data can be found in your telemetry data, such as application logs, APM spans, and RUM events. It can also be unintentionally moved to cloud storage resources when engineering teams move their workloads to the cloud. Datadog's Sensitive Data Scanner can help prevent sensitive data leaks and limit non-compliance risks by discovering, classifying, and optionally redacting sensitive data.

**Note**: See [PCI DSS Compliance][1] for information on setting up a PCI-compliant Datadog organization.

## Scan telemetry data

{{< img src="sensitive_data_scanner/telemetry_data_issues.png" alt="Five different sensitive issues detected where two have critical priority, one has medium priority, and two are info." style="width:100%;" >}}

Sensitive Data Scanner can scan your data [in the cloud](#in-the-cloud) or [within your environment](#in-your-environment).

### In the cloud  {#in-the-cloud}

With Sensitive Data Scanner in the Cloud, you submit your logs to the Datadog backend, so logs leave your premises before they are redacted. To use Sensitive Data Scanner, set up a scanning group to define what data to scan and then set up scanning rules to determine what sensitive data information to match within the data. For scanning rules you can:

- Add predefined scanning rules from Datadog's Scanning Rule Library. These rules detect common patterns such as email addresses, credit card numbers, API keys, authorization tokens, network and device information, and more.
- Create your own rules using regex patterns.

See Set Up Sensitive Data Scanner in the Cloud for setup details.

### In your environment {#in-your-environment}

Use Sensitive Data Scanner for the Agent or Observability Pipelines if you want to scan your data on premises, before the data leaves your environment.

#### Datadog Agent

{{< callout header="Join the Preview!" url="https://www.datadoghq.com/private-beta/sensitive-data-scanner-using-agent-in-your-premises/" >}}
  Sensitive Data Scanner support for the Datadog Agent is in Preview. To enroll, click <strong>Request Access</strong>.
{{< /callout >}}

With Sensitive Data Scanner using the Agent, Datadog redacts your logs before submitting them to the Datadog backend, and unredacted logs never leave your premises. To use Sensitive Data Scanner, set up a scanning group to define what data to scan. You can set up one scanning group per organization. In the scanning group, add scanning rules from the Rule Library, which are predefined rules that detect email addresses, credit card numbers, API keys, authorization tokens, network and device information, and more. You cannot create your own rules.

See [Set Up Sensitive Data Scanner using the Agent][2] for setup details.

#### Observability Pipelines

[Observability Pipelines][3] collects and processes your data within your environment, and then routes the data to their downstream integrations. When you [set up a pipeline][4] in Observability Pipelines, add the [Sensitive Data Scanner processor][5] to redact sensitive data in your logs before they leave your premises. You can add predefined scanning rules from the Rule Library, such as email address, credit card numbers, API keys, authorization tokens, IP addresses, and more. You can also create your own rules using regex patterns.

## Scan cloud storage

{{< callout header="Join the Preview!" url="https://www.datadoghq.com/private-beta/data-security" >}}
  Scanning support for Amazon S3 buckets and RDS instances is in Preview. To enroll, click <strong>Request Access</strong>.
{{< /callout >}}

{{< img src="sensitive_data_scanner/cloud_storage_issues.png" alt="Your image description" style="width:100%;" >}}

If you have [Sensitive Data Scanner][6] enabled, you can now catalog and classify sensitive data in your Amazon S3 buckets and RDS instances. \*\*Note\*\*: Sensitive Data Scanner does not redact sensitive data in your cloud storage resources.

Sensitive Data Scanner scans for sensitive data by deploying [Agentless scanners][7] in your cloud environments. These scanning instances retrieve a list of all S3 buckets and RDS instances through [Remote Configuration][8], and have set instructions to scan text files—such as CSVs and JSONs—and tables in every datastore over time.

Sensitive Data Scanner leverages its [entire rules library][9] to find matches. When a match is found, the location of the match is sent to Datadog by the scanning instance. **Note**: Data stores and their files are only read in your environment—no sensitive data is sent back to Datadog.

Along with displaying sensitive data matches, Sensitive Data Scanner surfaces any security issues detected by [Cloud Security Management][10] affecting the sensitive data stores. You can click any issue to continue triage and remediation within Cloud Security Management.

See [Set up Sensitive Data Scanner for Cloud Storage][2] for setup details.

## Investigate sensitive data issues

{{< img src="sensitive_data_scanner/sds_summary_20241114.png" alt="The summary page showing an overview of sensitive issues broken down by priority" style="width:100%;" >}}

Use the [Summary page][11] to see details of sensitive data issues identified by your scanning rules. These details include:

- The specific scanning rule that detected the matches, so that you can determine which rules to modify as needed.
- The scanning group in which the issue has occurred, so that you can determine the blast radius of any leaks.
- The number of events associated with the issue to help you gauge its scope and severity.
- A graph of the events associated with the issue to help you pinpoint when an issue started and see how it has progressed.
- Related cases created for the issue.

See [Investigate Sensitive Data Issues][12] for more information on how to use the Summary page to triage your sensitive data issues.

## Review sensitive data trends

{{<img src="sensitive_data_scanner/sdslight.png" alt="Sensitive Data Scanner Overview dashboard" style="width:80%;">}}

When Sensitive Data Scanner is enabled, an [out-of-the-box dashboard][13] summarizing sensitive data issues is automatically installed in your account. To access this dashboard, navigate to **Dashboards** \> **Dashboards List** and search for "Sensitive Data Scanner Overview".

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_security/pci_compliance/
[2]: /sensitive_data_scanner/setup/
[3]: /observability_pipelines/
[4]: /observability_pipelines/set_up_pipelines/
[5]: /observability_pipelines/processors/#sensitive-data-scanner
[6]: /sensitive_data_scanner/?tab=inthecloud
[7]: /security/cloud_security_management/setup/agentless_scanning
[8]: /agent/remote_config
[9]: /sensitive_data_scanner/library_rules/
[10]: /security/cloud_security_management
[11]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[12]: /sensitive_data_scanner/guide/investigate_sensitive_data_issues/
[13]: https://app.datadoghq.com/dash/integration/sensitive_data_scanner