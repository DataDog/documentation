---
title: C++ Custom Instrumentation with Datadog Library
kind: documentation
aliases:
    - /tracing/manual_instrumentation/cpp
    - /tracing/custom_instrumentation/cpp
    - /tracing/setup_overview/custom_instrumentation/cpp
    - /tracing/trace_collection/custom_instrumentation/cpp
description: 'Manually instrument your C++ application to send custom traces to Datadog.'
code_lang: cpp
type: multi-code-lang
code_lang_weight: 50
further_reading:
    - link: 'tracing/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/visualization/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---

<div class="alert alert-info">
If you have not yet read the setup instructions, start with the <a href="https://docs.datadoghq.com/tracing/setup/cpp/">C++ Setup Instructions</a>.
</div>

## Creating spans

### Manually instrument a method

```cpp
{
  // Create a root span for the current request.
  auto root_span = tracer.create_span();
  root_span.set_name("get_ingredients");
  // Set a resource name for the root span.
  root_span.set_resource("bologna_sandwich");
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

Add custom [span tags][1] to your [spans][2] to customize your observability within Datadog. The span tags are applied to your incoming traces, allowing you to correlate observed behavior with code-level information such as merchant tier, checkout amount, or user ID.

Note that the Datadog tags are necessary for [unified service tagging][5].

{{< tabs >}}

{{% tab "Locally" %}}

Add [tags][1] directly to a [span][2] object by calling `Span::set_tag`. For example:

```cpp
auto tracer = ...

// Add tags directly to a span by calling `Span::set_tag`
auto span = tracer->create_span();
span->set_tag("key must be string", "value must also be a string");

// Or, add tags by providing a `SpanConfig`
datadog::tracing::SpanConfig opt;
opt.tag.emplace("team", "apm-proxy");
auto span2 = tracer->create_span(opts);
```

{{% /tab %}}

{{% tab "Globally" %}}

There is two ways to set tags across all your spans.

### Environment variable

To set tags across all your spans, set the `DD_TAGS` environment variable as a list of `key:value` pairs separated by commas.

### Manually

```cpp
const datadog::tracing::TracerConfig tracer_config;
tracer_config.tags.emplace("team", "apm-proxy");
tracer_config.tags.emplace("apply", "on all spans");

const auto validated_config = validate_config(tracer_config);
auto tracer = datadog::trace::Tracer(*validated_config);

// New spans will have all tags defined in `tracer_config.tags`
auto span = tracer.create_tags();
```

{{% /tab %}}

{{< /tabs >}}

### Set errors on a span

To associate a span with an error, set one or more error-related tags on the
span. For example:

```cpp
span.set_error(true);
```

Or, alternatively:

```cpp
span.set_error_message("error");
span.set_error_type("propagation");
span.set_error_stack(stack);
```

Add more specific information about the error by setting any combination of the
`error.msg`, `error.stack`, or `error.type` tags. See [Error Tracking][7] for
more information about error tags.

An example of adding a combination of error tags:

```cpp
// Associate this span with the "bad file descriptor" error from the standard
// library.
span.set_error_stack("[EBADF] invalid file");
span.set_error_type("errno");
```

Using any of the `Span::set_error_stack`, `Span::set_error_type` or `Span::set_error_message` sets tags `error` to the value `true`.

To unset an error on a span, set the `error` tag to value `false`, which removes any previously set `error.msg`, `error.stack`, or `error.type` tags.

```cpp
// Clear any error information associated with this span.
span.set_error(false);
```

## Propagating context with headers extraction and injection

You can configure the propagation of context for distributed traces by injecting and extracting headers. Read [Trace Context Propagation][9] for information.

## Resource filtering

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from sending traces and influencing trace metrics. Find information about this and other security and fine-tuning configuration on the [Security][12] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/glossary/#span-tags
[2]: /tracing/glossary/#spans
[3]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/include/datadog/tags.h
[4]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/ext/tags.h
[5]: /getting_started/tagging/unified_service_tagging
[6]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/value.h
[7]: /tracing/error_tracking/
[8]: /tracing/setup/cpp/#installation
[9]: /tracing/trace_collection/trace_context_propagation/cpp
[12]: /tracing/security
