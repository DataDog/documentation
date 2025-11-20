---
title: Sensitive Data Scanner
disable_toc: false
aliases:
  - /account_management/org_settings/sensitive_data_detection
  - /sensitive_data_scanner/
further_reading:
    - link: "/security/sensitive_data_scanner/setup/telemetry_data"
      tag: "Documentation"
      text: "Set up Sensitive Data Scanner for Telemetry Data"
    - link: "/security/sensitive_data_scanner/setup/cloud_storage"
      tag: "Documentation"
      text: "Set up Sensitive Data Scanner for Cloud Storage"
    - link: "coterm"
      tag: "Documentation"
      text: "CoTerm: Monitor terminal sessions and sensitive activities on local and remote systems"
    - link: "/security/sensitive_data_scanner/guide/best_practices_for_creating_custom_rules"
      tag: "Documentation"
      text: "Best practices for creating custom rules"
    - link: "/data_security/"
      tag: "Documentation"
      text: "Reducing data related risks"
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
    - link: "https://www.datadoghq.com/blog/sds-dlp-for-financial-service-companies/"
      tag: "Blog"
      text: "How financial services companies discover, classify, and manage sensitive data with Datadog"
    - link: "https://www.datadoghq.com/blog/sds-for-insurance-companies/"
      tag: "Blog"
      text: "How insurance companies discover, classify, and act on sensitive data risks with Datadog"
---

## Overview

Sensitive data, such as credit card numbers, API keys, IP addresses, and personally identifiable information (PII) are often leaked unintentionally, which can expose your organization to security and compliance risks. Sensitive data can be found in your telemetry data, such as application logs, APM spans, RUM events, events from Event Management. It can also be unintentionally moved to cloud storage resources when engineering teams move their workloads to the cloud. Datadog's Sensitive Data Scanner can help prevent sensitive data leaks and limit non-compliance risks by discovering, classifying, and optionally redacting sensitive data.

**Note**: Datadog's tools and policies comply with PCI v4.0. For more information, see [PCI DSS Compliance][1].

## Scan telemetry data

{{< img src="sensitive_data_scanner/telemetry_data_issues.png" alt="Five different sensitive findings detected where two have critical priority, one has medium priority, and two are info." style="width:100%;" >}}

Sensitive Data Scanner can scan your data [in the cloud](#in-the-cloud) or [within your environment](#in-your-environment).

### In the Cloud  {#in-the-cloud}

With Sensitive Data Scanner in the Cloud, you submit logs and events to the Datadog backend, so the data leaves your environment before it gets redacted. The logs and events are scanned and redacted in the Datadog backend during processing, so sensitive data is redacted before events are indexed and shown in the Datadog UI.

The data that can be scanned and redacted are:

- **Logs**: All structured and unstructured log content, including log message and attribute values
- **APM**: Span attribute values only
- **RUM**: Event attribute values only
- **Events**: Event attribute values only

Optionally, sampling rates can be set between 10% and 99% for each product. This helps manage costs when you first get started by reducing the amount of data that gets scanned for sensitive information.

For each [scanning rule][17], one of the following actions can be applied to matched sensitive data:

- **Redact**: Replace the entire matched data with a single token that you choose, such as `[sensitive_data]`.
- **Partially redact**: Replace a specific portion of all matching values.
- **Hash**: Replace the entire matched data with a non-reversible unique identifier.
- **Mask** (available for logs only): Obfuscate all matching values. Users with the `Data Scanner Unmask` permission can de-obfuscate (unmask) and view this data in Datadog. See [Mask action][16] for more information.

**Note**: When scanning sampled data, you will not be able to select actions that obfuscate the data it scans.

To use Sensitive Data Scanner, set up a scanning group to define what data to scan and then set up scanning rules to determine what sensitive information to match within the data. For scanning rules you can:
- Add predefined scanning rules from Datadog's [Scanning Rule Library][2]. These rules detect common patterns such as email addresses, credit card numbers, API keys, authorization tokens, network and device information, and more.
- [Create your own rules using regex patterns][3].

See [Set Up Sensitive Data Scanner for Telemetry Data][4] for setup details.

### In your environment {#in-your-environment}

Use [Observability Pipelines][5] to collect and process your logs within your environment, and then route the data to their downstream integrations. When you set up a pipeline in Observability Pipelines, add the [Sensitive Data Scanner processor][6] to redact sensitive data in your logs before they leave your premises. You can add predefined scanning rules from the Rule Library, such as email addresses, credit card numbers, API keys, authorization tokens, IP addresses, and more. You can also create your own rules using regex patterns.

See [Set Up Pipelines][7] for more information.

## Scan cloud storage

{{< callout url="https://www.datadoghq.com/product-preview/data-security" >}}
  Scanning support for Amazon S3 buckets and RDS instances available in our Preview Program. To enroll, click <strong>Request Access</strong>.
{{< /callout >}}

{{< img src="sensitive_data_scanner/cloud_storage_issues.png" alt="The Findings page's datastore section with three Amazon S3 findings" style="width:100%;" >}}

If you have Sensitive Data Scanner enabled, you can catalog and classify sensitive data in your Amazon S3 buckets. **Note**: Sensitive Data Scanner does not redact sensitive data in your cloud storage resources.

Sensitive Data Scanner scans for sensitive data by deploying [Agentless scanners][8] in your cloud environments. These scanning instances retrieve a list of all S3 buckets through [Remote Configuration][9], and have set instructions to scan text files—such as CSVs and JSONs over time.

Sensitive Data Scanner leverages its [entire rules library][10] to find matches. When a match is found, the location of the match is sent to Datadog by the scanning instance. **Note**: Data stores and their files are only read in your environment—no sensitive data that was scanned is sent back to Datadog.

Along with displaying sensitive data matches, Sensitive Data Scanner surfaces any security issues detected by [Cloud Security][11] affecting the sensitive data stores. You can click any issue to continue triage and remediation within Cloud Security.

See [Set up Sensitive Data Scanner for Cloud Storage][12] for setup details.

## Investigate sensitive data findings

{{< img src="sensitive_data_scanner/findings_20251014.png" alt="The Findings page showing an overview of sensitive findings broken down by priority" style="width:100%;" >}}

Use the [Findings page][13] to see details of sensitive data findings identified by your scanning rules. These details include:

- The specific scanning rule that detected the matches, so that you can determine which rules to modify as needed.
- The scanning group in which the finding has occurred, so that you can determine the blast radius of any leaks.
- The number of events associated with the finding to help you gauge its scope and severity.
- A graph of the events associated with the finding to help you pinpoint when a finding started and see how it has progressed.
- Related cases created for the finding.

See [Investigate Sensitive Data Findings][14] for more information on triaging sensitive data using the Findings page.

## Review sensitive data trends

{{<img src="sensitive_data_scanner/sdslight.png" alt="Sensitive Data Scanner Overview dashboard" style="width:80%;">}}

When Sensitive Data Scanner is enabled, an [out-of-the-box dashboard][15] summarizing sensitive data findings is automatically installed in your account. To access this dashboard, navigate to **Dashboards** > **Dashboards List** and search for "Sensitive Data Scanner Overview".

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_security/pci_compliance/
[2]: /security/sensitive_data_scanner/scanning_rules/library_rules/
[3]: /security/sensitive_data_scanner/scanning_rules/custom_rules/
[4]: /security/sensitive_data_scanner/setup/telemetry_data/
[5]: /observability_pipelines/
[6]: /observability_pipelines/processors/sensitive_data_scanner
[7]: /observability_pipelines/configuration/set_up_pipelines/
[8]: /security/cloud_security_management/setup/agentless_scanning
[9]: /remote_configuration
[10]: /security/sensitive_data_scanner/scanning_rules/library_rules/
[11]: /security/cloud_security_management
[12]: /security/sensitive_data_scanner/setup/cloud_storage/
[13]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[14]: /security/sensitive_data_scanner/guide/investigate_sensitive_data_findings/
[15]: https://app.datadoghq.com/dash/integration/sensitive_data_scanner
[16]: /security/sensitive_data_scanner/setup/telemetry_data/?tab=logs#mask-action
[17]: /security/sensitive_data_scanner/scanning_rules/
