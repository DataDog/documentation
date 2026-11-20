---
title: OpenTelemetry Logs
description: Learn more about the OpenTelemetry Logs pack.
---

## Overview

{{< img src="observability_pipelines/packs/opentelemetry_logs.png" alt="The OpenTelemetry Logs pack" style="width:25%;" >}}

OTLP/JSON logs nest events under resourceLogs, scopeLogs, and logRecords arrays, three levels deep per payload.

What this pack does:

- Splits nested arrays into events
- Extracts service and severity
- Samples low-value debug logs
