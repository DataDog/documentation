---
title: Logs
type: apicontent
order: 22
external_redirect: /api/#logs
---

## Logs

<mark>The Logs endpoints are not supported in Datadog's client libraries. To request this functionality, contact [Datadog Support][1].</mark>

Send your logs to your Datadog platform over HTTP. Limits per HTTP request are:

* Maximum content size per payload: 2MB
* Maximum size for a single log: 256kB
* Maximum array size if sending multiple logs in an array: 50 entries

**Note**: If you are in the Datadog EU site (`app.datadoghq.eu`), the HTTP log endpoint is: `http-intake.logs.datadoghq.eu`.

[1]: /help
