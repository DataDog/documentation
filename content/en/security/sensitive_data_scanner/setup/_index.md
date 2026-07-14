---
title: Sensitive Data Scanner Setup
description: Set up Sensitive Data Scanner to detect and redact sensitive data across telemetry data, Agent Observability traces, Amazon S3 cloud storage, and code repositories.
disable_toc: false
aliases:
  - /sensitive_data_scanner/setup
further_reading:
    - link: "/security/sensitive_data_scanner/"
      tag: "Documentation"
      text: "Sensitive Data Scanner"
    - link: "/security/sensitive_data_scanner/scanning_rules/"
      tag: "Documentation"
      text: "Learn more about scanning rules"
    - link: "/security/sensitive_data_scanner/guide/investigate_sensitive_data_findings/"
      tag: "Documentation"
      text: "Investigate sensitive data findings"
    - link: "/security/sensitive_data_scanner/guide/create-monitors-for-sensitive-data/"
      tag: "Documentation"
      text: "Create monitors for sensitive data"
---

## Overview

Set up Sensitive Data Scanner for each data source you want to scan. Each source uses its own setup process, so you only need to configure the sources relevant to your needs.

- **Telemetry data:** Scan your logs, APM spans, RUM events, and events from Event Management. See [Telemetry Data][1] for setup instructions. To scan logs before they leave your network, use the [Sensitive Data Scanner processor for Observability Pipelines][5].
- **Agent Observability data:** Scan LLM traces, prompts, and completions. Configure scanning from the [Agent Observability Settings page][3].
- **Cloud storage data:** Scan your Amazon S3 buckets and RDS instances. See [Cloud Storage][2] for setup instructions.
- **Code repositories:** Detect exposed secrets in your source code. See [Secret Scanning][4] for setup instructions.
- **AI Guard evaluations:** Scan the conversations AI Guard evaluates for sensitive data such as credentials and PII. Configure scanning rules from the [AI Guard tab][6] of the Sensitive Data Scanner configuration page.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/sensitive_data_scanner/setup/telemetry_data/
[2]: /security/sensitive_data_scanner/setup/cloud_storage/
[3]: https://app.datadoghq.com/sensitive-data-scanner/configuration/llm-spans
[4]: /security/code_security/secret_scanning/
[5]: /observability_pipelines/processors/sensitive_data_scanner
[6]: https://app.datadoghq.com/sensitive-data-scanner/configuration/ai-guard
