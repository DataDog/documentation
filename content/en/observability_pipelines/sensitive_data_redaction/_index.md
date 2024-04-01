---
title: Sensitive Data Redaction
kind: document
disable_toc: false
---

## Overview

Sensitive data, such as credit card numbers, bank routing numbers, and API keys, can be revealed unintentionally in your logs, which can expose your organization to financial and privacy risks. Use the Observability Pipelines Worker to identify, tag, and optionally redact or hash sensitive information before routing logs to different destinations and outside of your infrastructure. You can use out-of-the-box scanning rules to detect common patterns such as email addresses, credit card numbers, API keys, authorization tokens, and more. Or, create custom scanning rules using regex patterns to match sensitive information.

Select a log source to get started:

- [Splunk HEC][1]
- [Splunk TCP][2]
- [Sumo Logic][3]
- [Datadog Agent][4]

[1]: \observability_pipelines\sesntive_data_redaction\splunk_hec
[2]: \observability_pipelines\sesntive_data_redaction\splunk_tcp
[3]: \observability_pipelines\sesntive_data_redaction\sumo_logic
[4]: \observability_pipelines\sesntive_data_redaction\datadog_agent
