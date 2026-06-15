---
title: Sensitive Data Scanner Setup
description: Set up Sensitive Data Scanner to detect and redact sensitive data across telemetry data, Agent Observability traces, Amazon S3 cloud storage, and code repositories.
disable_toc: false
aliases:
  - /sensitive_data_scanner/setup
further_reading:
    - link: "/security/sensitive_data_scanner/scanning_rules/"
      tag: "Documentation"
      text: "Learn more about scanning rules"
---

## Overview

Set up Sensitive Data Scanner to scan your:

- Telemetry data, so you can identify sensitive data in your logs, APM spans, RUM events, and events from Event Management. See [Set Up for Telemetry Data][1] for instructions.
- Agent Observability data, so you can identify sensitive data in LLM traces, prompts, and completions. Configure scanning on the [Agent Observability Settings page][3]. See [Agent Observability Data Security and RBAC][5] for details.
- Cloud storage data, so you can identify sensitive data in your Amazon S3 buckets. See [Set Up for Cloud Storage][2] for instructions.
- Code repositories, so you can detect exposed secrets in source code. See [Secret Scanning][4] for instructions.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/sensitive_data_scanner/setup/telemetry_data/
[2]: /security/sensitive_data_scanner/setup/cloud_storage/
[3]: https://app.datadoghq.com/sensitive-data-scanner/configuration/llm-spans
[4]: /security/code_security/secret_scanning/
[5]: /llm_observability/data_security_and_rbac/
