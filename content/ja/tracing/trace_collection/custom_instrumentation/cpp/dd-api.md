---
aliases:
- /ja/tracing/manual_instrumentation/cpp
- /ja/tracing/custom_instrumentation/cpp
- /ja/tracing/setup_overview/custom_instrumentation/cpp
- /ja/tracing/trace_collection/custom_instrumentation/cpp
- /ja/tracing/trace_collection/custom_instrumentation/dd_libraries/cpp
description: Manually instrument your C++ application to send custom traces to Datadog.
further_reading:
- link: tracing/connect_logs_and_traces
  tag: Documentation
  text: Connect your Logs and Traces together
- link: tracing/visualization/
  tag: Documentation
  text: Explore your services, resources, and traces
kind: documentation
title: C++ Custom Instrumentation using Datadog API
---

<div class="alert alert-info">
If you have not yet read the setup instructions, start with the <a href="https://docs.datadoghq.com/tracing/setup/cpp/">C++ Setup Instructions</a>.
</div>

## Creating spans

To manually instrument a method:

```cpp
{
  // Create a root span for the current request.
  auto root_span = tracer.create_span();
  root_span.set_name("get_ingredients");
  // Set a resource name for the root span.
  root_span.set_resource_name("bologna_sandwich");
  // Create a child span with the root span as its parent.
  auto child_span = root_span.create_child();
  child_span.set_name("cache_lookup");
  // Set a resource name for the child span.
  child_span.set_resource_name("ingredients.bologna_sandwich");
  // Spans can be finished at an explicit time ...
  child_span.set_end_time(std::chrono::steady_clock::now());
} // ... or implicitly when the destructor is invoked.
  // For example, root_span finishes here.
```

## Adding tags

Add custom [span tags][1] to your [spans][2] to customize your observability within Datadog. Span tags are applied to your incoming traces, allowing you to correlate observed behavior with code-level information such as merchant tier, checkout amount, or user ID.

Note that some Datadog tags are necessary for [unified service tagging][3].

{{< tabs >}}

{{% tab "Locally" %}}

### Manually

Add tags directly to a span object by calling `Span::set_tag`. For example:

```cpp
// Add tags directly to a span by calling `Span::set_tag`
auto span = tracer.create_span();
span.set_tag("key must be string", "value must also be a string");

// Or, add tags by setting a `SpanConfig`
datadog::tracing::SpanConfig opts;
opts.tags.emplace("team", "apm-proxy");
auto span2 = tracer.create_span(opts);
```

{{% /tab %}}

{{% tab "Globally" %}}

### Environment variable

To set tags across all your spans, set the `DD_TAGS` environment variable as a list of `key:value` pairs separated by commas.

```
export DD_TAGS=team:apm-proxy,key:value
```

### Manually

```cpp
datadog::tracing::TracerConfig tracer_config;
tracer_config.tags = {
  {"team", "apm-proxy"},
  {"apply", "on all spans"}
};

const auto validated_config = datadog::tracing::finalize_config(tracer_config);
auto tracer = datadog::tracing::Tracer(*validated_config);

// All new spans will have contains tags defined in `tracer_config.tags`
auto span = tracer.create_span();
```

{{% /tab %}}

{{< /tabs >}}

### Set errors on a span

To associate a span with an error, set one or more error-related tags on the
span. For example:

```cpp
span.set_error(true);
```

Add more specific information about the error by setting any combination of `error.msg`, `error.stack`, or `error.type` by using respectively `Span::set_error_message`, `Span::set_error_stack` and `Span::set_error_type`. See [Error Tracking][4] for more information about error tags.

An example of adding a combination of error tags:

```cpp
// Associate this span with the "bad file descriptor" error from the standard
// library.
span.set_error_message("error");
span.set_error_stack("[EBADF] invalid file");
span.set_error_type("errno");
```

<div class="alert alert-info">
Using any of the `Span::set_error_*` result in an underlying call to `Span::set_error(true)`.
</div>

To unset an error on a span, set `Span::set_error` to `false`, which removes any  combination of `Span::set_error_stack`, `Span::set_error_type` or `Span::set_error_message`.

```cpp
// Clear any error information associated with this span.
span.set_error(false);
```

## Propagating context with headers extraction and injection

You can configure the propagation of context for distributed traces by injecting and extracting headers. Read [Trace Context Propagation][5] for information.

## Resource filtering

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from sending traces and influencing trace metrics. Find information about this and other security and fine-tuning configuration on the [Security][6] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/glossary/#span-tags
[2]: /ja/tracing/glossary/#spans
[3]: /ja/getting_started/tagging/unified_service_tagging
[4]: /ja/tracing/error_tracking/
[5]: /ja/tracing/trace_collection/trace_context_propagation/cpp
[6]: /ja/tracing/security