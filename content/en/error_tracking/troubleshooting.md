---
title: Error Tracking Troubleshooting
---

If you experience unexpected behavior with Error Tracking, the troubleshooting steps below can help you resolve the issue quickly. If you continue to have trouble, reach out to [Datadog support][1].

Datadog recommends regularly updating to the latest version of the Datadog tracing libraries, mobile SDKs, and web SDKs, as each release contains improvements and fixes.

## Errors are not found in Error Tracking

### Logs

Make sure the error message has the [required attributes][2], and Error Tracking for Logs is [activated][7].

This [example query][3] searches for logs meeting the criteria for inclusion in Error Tracking.

### APM

To be processed by Error Tracking, a span must have these attributes:

- `error.type`
- `error.message`
- `error.stack`

<div class="alert alert-info">
<strong>Note:</strong> The stack must have at least two lines and one <em>meaningful</em> frame (a frame with a function name and a filename in most languages).
</div>

This [example query][5] searches for spans meeting the criteria for inclusion in Error Tracking.

### RUM

Error Tracking only processes errors that are sent with the source set to `custom`, `source`, `report`, or `console`, and contain a stack trace. Errors sent with any other source (such as `network`) or sent from browser extensions are not processed by Error Tracking.

This [example query][6] shows RUM errors that meet the criteria for inclusion in Error Tracking.

### Inclusion/Exclusion filters

Make sure the errors you are looking for match at least one inclusion filter and no exclusion filters. Check your filters setup (more information in [Manage Data Collection][8]).

## No error samples found for an issue

All errors are processed, but only retained errors are available in the issue panel as an error sample.

### APM

Spans associated with the error need to be retained with a custom retention filter in order for samples of that error to show up in the issue panel.

[1]: /help/
[2]: /logs/error_tracking/backend/?tab=serilog#attributes-for-error-tracking
[3]: https://app.datadoghq.com/logs?query=status%3A%28emergency%20OR%20alert%20OR%20critical%20OR%20error%29%20AND%20%28%40error.stack%3A%2A%20OR%20%40error.kind%3A%2A%29%20
[5]: https://app.datadoghq.com/apm/traces?query=%40_top_level%3A1%20%40error.stack%3A%2A%20AND%20%40error.message%3A%2A%20AND%20error.type%3A%2A%20
[6]: https://app.datadoghq.com/rum/sessions?query=%40type%3Aerror%20%40error.stack%3A%2A
[7]: https://app.datadoghq.com/error-tracking/settings
[8]: /error_tracking/manage_data_collection/
