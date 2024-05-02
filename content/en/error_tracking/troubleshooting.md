---
title: Error Tracking Troubleshooting
kind: documentation
---

If you experience unexpected behavior with Datadog Error Tracking, there are a few common issues you can investigate and this guide may help resolve issues quickly. If you continue to have trouble, reach out to [Datadog support][1] for further assistance. Datadog recommends regularly updating to the latest version of the Datadog tracing libraries you use, as each release contains improvements and fixes.

## Errors are not turned into issues

### Logs

Make sure that the error message has the [required attributes][2] and that Error Tracking is activated.
[Example query][3]

### APM

Make sure that the error message has the [required attributes][4] and the error is located in a service entry span. 
[Example query][5]

### RUM

Error Tracking processes errors that are sent with the source set to `custom`, `source` or `report`, and contain a stack trace. Errors sent with any other source (such as console) or sent from browser extensions are not processed by Error Tracking.
[Example query][6]



[1]: /help/
[2]: https://docs.datadoghq.com/logs/error_tracking/backend/?tab=serilog#attributes-for-error-tracking
[3]: https://app.datadoghq.com/logs?query=status%3A%28emergency%20OR%20alert%20OR%20critical%20OR%20error%29%20AND%20%28%40error.stack%3A%2A%20OR%20%40error.kind%3A%2A%29%20
[4]: /tracing/error_tracking/#use-span-tags-to-track-error-spans
[5]: https://app.datadoghq.com/apm/traces?query=%40_top_level%3A1%20%40error.stack%3A%2A%20AND%20%40error.message%3A%2A%20AND%20error.type%3A%2A
[6]: https://app.datadoghq.com/rum/sessions?query=%40type%3Aerror%20%40error.stack%3A%2A