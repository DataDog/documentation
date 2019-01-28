---
title: Logs
type: apicontent
order: 15
external_redirect: /api/#logs
---

## Logs

Send your logs to your Datadog platform over HTTP. Limits per HTTP request are:

* Maximum content size per payload: 2MB
* Maximum size for a single log: 256kB
* Maximum array size if sending multiple logs in an array: 50 entries

**Note**: If you are in the Datadog EU region (`app.datadoghq.eu`), the HTTP log endpoint is: `http-intake.logs.datadoghq.eu`.
