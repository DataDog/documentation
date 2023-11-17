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

## Add tags

Add custom [span tags][1] to your [spans][2] to customize your observability within Datadog. The span tags are applied to your incoming traces, allowing you to correlate observed behavior with code-level information such as merchant tier, checkout amount, or user ID.

C++ tracing uses "common tags". These tags can be sourced from both [Datadog specific tags][3] or [OpenTracing tags][4], and included like this:

```cpp
#include <opentracing/ext/tags.h>
#include <datadog/tags.h>
```

Note that the Datadog tags are necessary for [unified service tagging][5].

### Add custom span tags

Add [tags][1] directly to a [span][2] object by calling `Span::SetTag`. For example:

```cpp
auto tracer = ...
auto span = tracer->StartSpan("operation_name");
span->SetTag("key must be string", "Values are variable types");
span->SetTag("key must be string", 1234);
```

Values are of [variable type][6] and can be complex objects. Values are serialized as JSON, with the exception of a string value being serialized bare (without extra quotation marks).

### Adding tags globally to all spans

To set tags across all your spans, set the `DD_TAGS` environment variable as a list of `key:value` pairs separated by commas.

### Set errors on a span

To associate a span with an error, set one or more error-related tags on the
span. For example:

```cpp
span->SetTag(opentracing::ext::error, true);
```

Or, alternatively:

```cpp
span->SetTag("error", true);
```

Add more specific information about the error by setting any combination of the
`error.msg`, `error.stack`, or `error.type` tags. See [Error Tracking][7] for
more information about error tags.

An example of adding a combination of error tags:

```cpp
// Associate this span with the "bad file descriptor" error from the standard
// library.
span->SetTag("error.msg", "[EBADF] invalid file");
span->SetTag("error.type", "errno");
```

Adding any of the `error.msg`, `error.stack`, or `error.type` tags sets
`error` to the value `true`.

To unset an error on a span, set the `error` tag to value `false`, which removes
any previously set `error.msg`, `error.stack`, or `error.type` tags.

```cpp
// Clear any error information associated with this span.
span->SetTag("error", false);
```

## Adding spans

### Manually instrument a method

To manually instrument your code, install the tracer as in the [setup examples][8], and then use the tracer object to create [spans][2].

```cpp
{
  // Create a root span for the current request.
  auto root_span = tracer->StartSpan("get_ingredients");
  // Set a resource name for the root span.
  root_span->SetTag(datadog::tags::resource_name, "bologna_sandwich");
  // Create a child span with the root span as its parent.
  auto child_span = tracer->StartSpan(
      "cache_lookup",
      {opentracing::ChildOf(&root_span->context())});
  // Set a resource name for the child span.
  child_span->SetTag(datadog::tags::resource_name, "ingredients.bologna_sandwich");
  // Spans can be finished at an explicit time ...
  child_span->Finish();
} // ... or implicitly when the destructor is invoked.
  // For example, root_span finishes here.
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
