---
title: C++ Manual Instrumentation
kind: documentation
decription: "Manually instrument your C++ application to send custom traces to Datadog."
further_reading:
- link: "tracing/guide/instrument_custom_method"
  text: "Instrument a custom method to get deep visibility into your business logic"
- link: "tracing/connect_logs_and_traces"
  text: "Connect your Logs and Traces together"
- link: "tracing/opentracing"
  text: "Implement Opentracing across your applications"
- link: "tracing/visualization/"
  text: "Explore your services, resources, and traces"
---

To manually instrument your code, install the tracer as in the setup examples, and then use the tracer object to create [spans][1].

```cpp
{
  // Create a root span.
  auto root_span = tracer->StartSpan("operation_name");
  // Create a child span.
  auto child_span = tracer->StartSpan(
      "operation_name",
      {opentracing::ChildOf(&root_span->context())});
  // Spans can be finished at a specific time ...
  child_span->Finish();
} // ... or when they are destructed (root_span finishes here).
```

Distributed tracing can be accomplished by [using the `Inject` and `Extract` methods on the tracer][2], which accept [generic `Reader` and `Writer` types][3]. Priority sampling (enabled by default) should be on to ensure uniform delivery of spans.

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/#spans
[2]: https://github.com/opentracing/opentracing-cpp/#inject-span-context-into-a-textmapwriter
[3]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/propagation.h
