---
title: Setup
description: Set up Sensitive Data Scanner to detect sensitive content in your telemetry data, LLM Observability data, cloud storage, and code repositories.
disable_toc: false
aliases:
  - /sensitive_data_scanner/setup
further_reading:
    - link: "/security/sensitive_data_scanner/scanning_rules/"
      tag: "Documentation"
      text: "Learn more about scanning rules"
---

## Overview

Sensitive Data Scanner can scan telemetry data, LLM Observability data, cloud storage, and code repositories. Because each source uses its own setup process, you only need to configure the sources relevant to what you want to scan.

## Telemetry data

Sensitive Data Scanner can scan your application logs, APM events, RUM events, and events from Event Management for sensitive content such as PII, credentials, and API keys. Logs can be scanned either in the Datadog backend or in your environment using Observability Pipelines.

### In the cloud

Datadog scans your telemetry data after it reaches the Datadog backend. Datadog recommends starting with the in-app guided setup, which applies a default scanning configuration that you can adjust later. To configure scanning manually, see [Set up for Telemetry Data][1].

### In your environment

To scan logs before they leave your network, use Observability Pipelines. The Sensitive Data Scanner processor supports logs only. To configure scanning, see [Sensitive Data Scanner processor][5].

## LLM Observability data

Sensitive Data Scanner can scan LLM Observability traces, prompts, and completions for sensitive content such as PII, credentials, and API keys. LLM Observability uses a managed configuration with one default scanning group automatically created for your organization.

To configure scanning, navigate to the [LLM Observability Settings page][3].

## Cloud storage

{{< callout url="https://www.datadoghq.com/product-preview/data-security" >}}
  Scanning support for Amazon S3 buckets and RDS instances is in Preview. To enroll, click <strong>Request Access</strong>.
{{< /callout >}}

Sensitive Data Scanner can scan your Amazon S3 buckets for sensitive content such as PII, credentials, and API keys. Scanning runs through Agentless scanners deployed in your AWS environment, so data stays in your account. Sensitive Data Scanner does not redact data in cloud storage.

To configure scanning, see [Set up for Cloud Storage][2].

## Code repositories

Sensitive Data Scanner powers Secret Scanning, which scans your code repositories for exposed secrets such as API keys, tokens, and credentials. Secret Scanning is part of Code Security.

To configure scanning, see [Secret Scanning][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/sensitive_data_scanner/setup/telemetry_data/
[2]: /security/sensitive_data_scanner/setup/cloud_storage/
[3]: https://app.datadoghq.com/sensitive-data-scanner/configuration/llm-spans
[4]: /security/code_security/secret_scanning/
[5]: /observability_pipelines/processors/sensitive_data_scanner
