---
title: Archive Logs to Datadog Log Archives
kind: document
disable_toc: false
---

## Overview

Use Observability Pipelines to route ingested logs to an archive or a bucket in Datadog rehydratable format. You can then rehydrate the archive in Datadog ad hoc whenever you need to analyze and investigate them. This is useful when:

- You are migrating from another log vendor to Datadog Log Management, and want to ensure you have access to historical logs when you finish migrating
- You have a high volume of noisy logs, but you may need to index them in Log Management ad hoc.
- You have a retention policy.

Select a source to get started:

- [Splunk HEC][1]
- [Splunk TCP][2]
- [Sumo Logic][3]
- [Datadog Agent][4]

[1]: \observability_pipelines\archive_logs\splunk_hec
[2]: \observability_pipelines\archive_logs\splunk_tcp
[3]: \observability_pipelines\archive_logs\sumo_logic
[4]: \observability_pipelines\archive_logs\datadog_agent
