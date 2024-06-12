---
title: Error Tracking Troubleshooting
kind: documentation
---

If you experience unexpected behavior with Error Tracking, the troubleshooting steps below can help you resolve the issue quickly. If you continue to have trouble, reach out to [Datadog support][1]. 

Datadog recommends regularly updating to the latest version of the Datadog tracing libraries, mobile SDKs, and web SDKs, as each release contains improvements and fixes.

##  Errors are not found in Error Tracking

### Logs

Make sure the error message has the [required attributes][2], and Error Tracking for Logs is [activated][7]. 

This [example query][3] searches for logs meeting the criteria for inclusion in Error Tracking.

### APM

To be processed by Error Tracking, a span must have these attributes:
- `error.type`
- `error.message`
- `error.stack`

**Note**: The stack must have at least two lines and one *meaningful* frame (a frame with a function name and a filename in most languages).

Only errors from service entry spans (the uppermost service spans) are processed by Error Tracking. Error Tracking primarily captures unhandled exceptions, and this behavior is in place to avoid capturing errors handled internally by the service.

This [example query][5] searches for spans meeting the criteria for inclusion in Error Tracking.

#### Workarounds for bubbling up child span errors to service entry span

Some tracers provide a way to access the root span and bubble up the error from child to root.

{{< tabs >}}
{{% tab "Java" %}}

```java
final Span span = GlobalTracer.get().activeSpan();
if (span != null && (span instanceof MutableSpan)) {
    MutableSpan localRootSpan = ((MutableSpan) span).getLocalRootSpan();
    // do stuff with root span
    localRootSpan.setTag("<TAG>", "<VALUE>");
}
```

{{% /tab %}}
{{% tab "Python" %}}

```python
context = tracer.get_call_context() 
root_span = context.get_current_root_span() 
root_span.set_tag('<TAG>', '<VALUE>') 
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
current_root_span = Datadog.tracer.active_root_span
current_root_span.set_tag('<TAG>', '<VALUE>') unless current_root_span.nil?
```

{{% /tab %}}

{{< /tabs >}}

### RUM

Error Tracking only processes errors that are sent with the source set to `custom`, `source` or `report`, and contain a stack trace. Errors sent with any other source (such as `console`) or sent from browser extensions are not processed by Error Tracking.

This [example query][6] shows RUM errors that meet the criteria for inclusion in Error Tracking.

## No error samples found for an issue

All errors are processed, but only retained errors are available in the issue panel as an error sample.

### APM

Spans associated with the error need to be retained with a custom retention filter in order for samples of that error to show up in the issue panel.

[1]: /help/
[2]: /logs/error_tracking/backend/?tab=serilog#attributes-for-error-tracking
[3]: https://app.datadoghq.com/logs?query=status%3A%28emergency%20OR%20alert%20OR%20critical%20OR%20error%29%20AND%20%28%40error.stack%3A%2A%20OR%20%40error.kind%3A%2A%29%20
[4]: /tracing/error_tracking/#use-span-tags-to-track-error-spans
[5]: https://app.datadoghq.com/apm/traces?query=%40_top_level%3A1%20%40error.stack%3A%2A%20AND%20%40error.message%3A%2A%20AND%20error.type%3A%2A%20AND%20%40_top_level%3A1%20
[6]: https://app.datadoghq.com/rum/sessions?query=%40type%3Aerror%20%40error.stack%3A%2A
[7]: https://app.datadoghq.com/error-tracking/settings
[8]: /tracing/trace_collection/custom_instrumentation/java/dd-api/#set-tags--errors-on-a-root-span-from-a-child-span