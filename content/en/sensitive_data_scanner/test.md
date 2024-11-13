---
title: Sensitive Data Scanner
disable_toc: false
further_reading:
    - link: "/data_security/"
      tag: "Documentation"
      text: "Reducing data related risks"
    - link: "/sensitive_data_scanner/regular_expression_syntax"
      tag: "Documentation"
      text: "Regular expression syntax for custom scanning rules"
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

Sensitive data, such as credit card numbers, bank routing numbers, personally identifiable information (PII), and API keys are often leaked unintentionally, which can expose your organization to financial and privacy risks. Sensitive data can be found in your [telemetry data](#telemetry), such as application logs, APM spans, and RUM events. It can also be unintentionally moved to [cloud storage](#cloud-storage) when engineering teams move their workloads to the cloud. Datadog's Sensitive Data Scanner can prevent against these sensitive data leaks and limit non-compliance risks by identifying, tagging, and optionally redacting sensitive data.

## Telemetry

Sensitive Data Scanner can scan your data [in the cloud](#in-the-cloud) or [within your environment](#in-your-environment).

### In the cloud

With Sensitive Data Scanner in the Cloud, you submit your logs to the Datadog backend. With this method, logs leave your premises before they are redacted. You can have multiple scanning groups per organization, and you can create custom scanning rules or use out-of-the-box library rules. You can also redact sensitive data in tags. See Set Up Sensitive Data Scanner in the Cloud for setup details.

### In your environment

Use Sensitive Data Scanner for the Agent or Observability Pipelines if you want to scan your data on premises, before the data leaves your environment.

#### Sensitive Data Scanner using the Agent

{{< callout url="https://www.datadoghq.com/private-beta/sensitive-data-scanner-using-agent-in-your-premises/" >}}
  Sensitive Data Scanner support for the Datadog Agent is in beta. To enroll, click <strong>Request Access</strong>.
{{< /callout >}}

With Sensitive Data Scanner using the Agent, Datadog redacts your logs before submitting them to the Datadog backend, and unredacted logs never leave your premises. With this method, you can set up one scanning group per organization, and set up scanning rules using predefined library rules. See Set Up Sensitive Data Scanner using the Agent for setup details.

#### Observability Pipelines

[Observability Pipelines][1] collects and processes your data within your environment, and then routes the data to their downstream integrations. When you [set up a pipeline][2] in Observability Pipelines, add the [Sensitive Data Scanner processor][3] to redact sensitive data in your logs before they leave your environment.

## Cloud Storage

{{< callout header="Join the Preview!" url="https://www.datadoghq.com/private-beta/data-security" >}}
  Scanning support for Amazon S3 buckets and RDS instances is in Preview. To enroll, click <strong>Request Access</strong>.
{{< /callout >}}

If you have [Sensitive Data Scanner][4] enabled, you can now catalog and classify sensitive data in your Amazon S3 buckets and RDS instances.

Sensitive Data Scanner scans for sensitive data by deploying [Agentless scanners][5] in your cloud environments. These scanning instances retrieve a list of all S3 buckets and RDS instances through [Remote Configuration][6], and have set instructions to scan text files—such as CSVs and JSONs—and tables in every datastore over time. Sensitive Data Scanner leverages its [entire rules library][7] to find matches. When a match is found, the location of the match is sent to Datadog by the scanning instance. Data stores and their files are only read in your environment—no sensitive data is sent back to Datadog.
Along with displaying sensitive data matches, Sensitive Data Scanner surfaces any security issues detected by [Cloud Security Management][8] affecting the sensitive data stores. You can click any issue to continue triage and remediation within Cloud Security Management.

See Set up Sensitive Data Scanner for Cloud Storage for setup details.

## Summary page

{{<img src="sensitive_data_scanner/sds_summary_12_01_24.png" alt="The Sensitive Data Scanner summary page showing the number of sensitive data issues, the number of scanning rules enabled, and a list of issues" style="width:80%;">}}

Use the [Summary page][9] to see details of sensitive data issues identified by your scanning rules. These details include:

- The specific scanning rule that detected the matches, so that you can determine which rules to modify as needed.
- The scanning group in which the issue has occurred, so that you can determine the blast radius of any leaks.
- The number of events associated with the issue to help you gauge its scope and severity.
- A graph of the events associated with the issue to help you pinpoint when an issue started and see how it has progressed.
- Related cases created for the issue.

See [Investigate Sensitive Data Issues][10] for more information on how to use the Summary page to triage your sensitive data issues.

## Out-of-the-box dashboard

{{<img src="sensitive_data_scanner/sdslight.png" alt="Sensitive Data Scanner Overview dashboard" style="width:80%;">}}

When Sensitive Data Scanner is enabled, an [out-of-the-box dashboard][11] summarizing sensitive data findings is automatically installed in your account. To access this dashboard, navigate to **Dashboards** \> **Dashboards List** and search for "Sensitive Data Scanner Overview".

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/observability_pipelines/
[2]: https://docs.datadoghq.com/observability_pipelines/set_up_pipelines/
[3]: https://docs.datadoghq.com/observability_pipelines/processors/#sensitive-data-scanner
[4]: https://docs.datadoghq.com/sensitive_data_scanner/?tab=inthecloud
[5]: https://docs.datadoghq.com/security/cloud_security_management/setup/agentless_scanning
[6]: https://docs.datadoghq.com/agent/remote_config
[7]: https://docs.datadoghq.com/sensitive_data_scanner/scanning_rules/library_rules/
[8]: https://docs.datadoghq.com/security/cloud_security_management
[9]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[10]: https://docs.datadoghq.com/sensitive_data_scanner/guide/investigate_sensitive_data_issues/
[11]: https://app.datadoghq.com/dash/integration/sensitive_data_scanner