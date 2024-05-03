---
title: Error Tracking Troubleshooting
kind: documentation
---

If you experience unexpected behavior with Datadog Error Tracking, there are a few common issues you can investigate and this guide may help resolve issues quickly. If you continue to have trouble, reach out to [Datadog support][1] for further assistance. Datadog recommends regularly updating to the latest version of the Datadog tracing libraries, mobile and web SDKs you use, as each release contains improvements and fixes.

##  Errors are not found in Error Tracking

### Logs

Make sure that the error message has the [required attributes][2] and that Error Tracking for Logs is [activated][7].

[Example query of logs meeting the criteria][3]


### APM


To be processed by Error Tracking a span must have these following attributes:
- `error.type`
- `error.message`
- `error.stack`

**Note**: The stack must have at least two lines and one *meaningful* frame (a frame with a function name and a filename in most languages)

**Service Entry Spans**

Only errors from service entry spans - the uppermost service spans - are processed by Error Tracking. Error Tracking primarily captures unhandled exceptions and this is in place to avoid capturing errors handled internally by the service.

[Example query of spans meeting the criteria][5]

#### Workarounds for bubbling up child span errors to service entry span

Some tracers provide a feature to access the root span and bubble up the error from child to root.

{{< tabs >}}
{{% tab "Java" %}}

Initialize Amplitude's SDK and create an exposure listener reporting feature flag evaluations to Datadog using the following snippet of code:

For more information about initializing Amplitude's SDK, see Amplitude's [JavaScript SDK documentation][1].

```java
final Span span = GlobalTracer.get().activeSpan();
if (span != null && (span instanceof MutableSpan)) {
    MutableSpan localRootSpan = ((MutableSpan) span).getLocalRootSpan();
    // do stuff with root span
    localRootSpan.setTag("root", "true");
}
```

{{% /tab %}}
{{% tab "Python" %}}

```python
context = tracer.get_call_context() 
root_span = context.get_current_root_span() 
root_span.set_tag('exampletag', 'blahblah') 
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
current_root_span = Datadog.tracer.active_root_span
current_root_span.set_tag('my_tag', 'my_value') unless current_root_span.nil?
```

{{% /tab %}}
{{% tab "Flutter" %}}

Amplitude does not support this integration. Create a ticket with Amplitude to request this feature.


{{% /tab %}}
{{< /tabs >}}

### RUM

Error Tracking only processes errors that are sent with the source set to `custom`, `source` or `report`, and contain a stack trace. Errors sent with any other source (such as console) or sent from browser extensions are not processed by Error Tracking.

[Example query of RUM errors meeting the criteria][6]


## No issue samples found for an Issue

All errors are processed but only retained errors are available in the issue panel as an error sample.

### APM

Spans associated to the error needs to be retained with a custom retention filter to have samples for that error show up in the issue panel.


[1]: /help/
[2]: https://docs.datadoghq.com/logs/error_tracking/backend/?tab=serilog#attributes-for-error-tracking
[3]: https://app.datadoghq.com/logs?query=status%3A%28emergency%20OR%20alert%20OR%20critical%20OR%20error%29%20AND%20%28%40error.stack%3A%2A%20OR%20%40error.kind%3A%2A%29%20
[4]: /tracing/error_tracking/#use-span-tags-to-track-error-spans
[5]: https://app.datadoghq.com/apm/traces?query=%40_top_level%3A1%20%40error.stack%3A%2A%20AND%20%40error.message%3A%2A%20AND%20error.type%3A%2A%20AND%20%40_top_level%3A1%20
[6]: https://app.datadoghq.com/rum/sessions?query=%40type%3Aerror%20%40error.stack%3A%2A
[7]: https://app.datadoghq.com/error-tracking/settings
[8]: https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/java/dd-api/#set-tags--errors-on-a-root-span-from-a-child-span