---
title: Logs
type: apicontent
order: 15
external_redirect: /api/#logs
---

## Logs

Send your logs to your Datadog platform over HTTP, limits per http request are:

* Maximum content size per payload: 2MB
* Maximum size for a single log: 256kB
* Maximum array size if sending multiple logs in a array: 50 entries

**Note**: If you are in Datadog EU `app.datadoghq.eu`, the HTTP log endpoint is: `http-intake.logs.datadoghq.eu`
