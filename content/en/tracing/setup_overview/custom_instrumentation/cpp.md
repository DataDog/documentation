---
title: C++ Custom Instrumentation
kind: documentation
aliases:
    - /tracing/manual_instrumentation/cpp
    - /tracing/custom_instrumentation/cpp
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

Add custom [span tags][1] to your [spans][2] to customize your observability within Datadog.  The span tags are applied to your incoming traces, allowing you to correlate observed behavior with code-level information such as merchant tier, checkout amount, or user ID.

C++ tracing uses "common tags".  These tags can be sourced from both [Datadog specific tags][3] or [OpenTracing tags][4], and included via the below:

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

To customize an error associated with one of your spans, use the below:

```cpp
span->SetTag(opentracing::ext::error, true);
```

Error metadata may be set as additional tags on the same span as well.

## Adding spans

### Manually instrument a method

To manually instrument your code, install the tracer as in the [setup examples][7], and then use the tracer object to create [spans][2].

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

### Inject and extract context for distributed tracing

Distributed tracing can be accomplished by [using the `Inject` and `Extract` methods on the tracer][8], which accept [generic `Reader` and `Writer` types][9]. Priority sampling (enabled by default) should be on to ensure uniform delivery of spans.

```cpp
// Allows writing propagation headers to a simple map<string, string>.
// Copied from https://github.com/opentracing/opentracing-cpp/blob/master/mocktracer/test/propagation_test.cpp
struct HTTPHeadersCarrier : HTTPHeadersReader, HTTPHeadersWriter {
  HTTPHeadersCarrier(std::unordered_map<std::string, std::string>& text_map_)
      : text_map(text_map_) {}

  expected<void> Set(string_view key, string_view value) const override {
    text_map[key] = value;
    return {};
  }

  expected<void> ForeachKey(
      std::function<expected<void>(string_view key, string_view value)> f)
      const override {
    for (const auto& key_value : text_map) {
      auto result = f(key_value.first, key_value.second);
      if (!result) return result;
    }
    return {};
  }

  std::unordered_map<std::string, std::string>& text_map;
};

void example() {
  auto tracer = ...
  std::unordered_map<std::string, std::string> headers;
  HTTPHeadersCarrier carrier(headers);

  auto span = tracer->StartSpan("operation_name");
  tracer->Inject(span->context(), carrier);
  // `headers` now populated with the headers needed to propagate the span.
}
```

## Trace client and Agent configuration

There are additional configurations possible for both the tracing client and Datadog Agent for context propagation with B3 Headers, as well as to exclude specific Resources from sending traces to Datadog in the event these traces are not wanted to count in metrics calculated, such as Health Checks.

### B3 headers extraction and injection

Datadog APM tracer supports [B3 headers extraction][10] and injection for distributed tracing.

Distributed headers injection and extraction is controlled by configuring injection/extraction styles. Currently two styles are supported:

- Datadog: `Datadog`
- B3: `B3`

Injection styles can be configured using:

- Environment Variable: `DD_PROPAGATION_STYLE_INJECT="Datadog B3"`

The value of the environment variable is a comma (or space) separated list of header styles that are enabled for injection. By default only Datadog injection style is enabled.

Extraction styles can be configured using:

- Environment Variable: `DD_PROPAGATION_STYLE_EXTRACT="Datadog B3"`

The value of the environment variable is a comma (or space) separated list of header styles that are enabled for extraction. By default only Datadog extraction style is enabled.

If multiple extraction styles are enabled extraction attempt is done on the order those styles are configured and first successful extracted value is used.

### Resource filtering

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from reporting traces to Datadog.  This and other security and fine-tuning configurations can be found on the [Security][11] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/#span-tags
[2]: /tracing/visualization/#spans
[3]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/include/datadog/tags.h
[4]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/ext/tags.h
[5]: /getting_started/tagging/unified_service_tagging
[6]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/value.h
[7]: /tracing/setup/cpp/#installation
[8]: https://github.com/opentracing/opentracing-cpp/#inject-span-context-into-a-textmapwriter
[9]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/propagation.h
[10]: https://github.com/openzipkin/b3-propagation
[11]: /tracing/security
