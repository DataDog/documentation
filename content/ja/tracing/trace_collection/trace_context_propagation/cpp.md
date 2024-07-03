---
code_lang: cpp
code_lang_weight: 50
further_reading:
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: Blog
  text: Monitor OpenTelemetry-instrumented apps with support for W3C Trace Context
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentation
  text: Interoperability of OpenTelemetry API and Datadog instrumented traces
kind: documentation
title: Propagating C++ Trace Context
type: multi-code-lang
---

## Overview

Datadog APM tracer supports [B3][11] and [W3C][1] headers extraction and injection for distributed tracing.

Distributed headers injection and extraction is controlled by configuring injection/extraction styles. The supported styles for C++ are:

- Datadog: `datadog`
- B3: `b3`
- W3C: `tracecontext`

### 構成

{{< tabs >}}

{{% tab "Environment Variable" %}}

#### Injection styles

`DD_TRACE_PROPAGATION_STYLE_INJECT="datadog,b3"`

The value of the environment variable is a comma (or space) separated list of header styles that are enabled for injection. The default injection styles are `datadog,tracecontext`.

#### Extraction styles

`DD_TRACE_PROPAGATION_STYLE_EXTRACT="datadog,b3"`

The value of the environment variable is a comma (or space) separated list of header styles that are enabled for extraction. The default extraction styles are `datadog,tracecontext`.

{{% /tab %}}

{{% tab "Code" %}}

```cpp
#include <datadog/tracer_config.h>
#include <datadog/propagation_style.h>

namespace dd = datadog::tracing;
int main() {
  dd::TracerConfig config;
  config.service = "my-service";

  // `injection_styles` indicates with which tracing systems trace propagation
  // will be compatible when injecting (sending) trace context.
  // All styles indicated by `injection_styles` are used for injection.
  // `injection_styles` is overridden by the `DD_TRACE_PROPAGATION_STYLE_INJECT`
  // and `DD_TRACE_PROPAGATION_STYLE` environment variables.
  config.injection_styles = {dd::PropagationStyle::DATADOG, dd::PropagationStyle::B3};

  // `extraction_styles` indicates with which tracing systems trace propagation
  // will be compatible when extracting (receiving) trace context.
  // Extraction styles are applied in the order in which they appear in
  // `extraction_styles`. The first style that produces trace context or
  // produces an error determines the result of extraction.
  // `extraction_styles` is overridden by the
  // `DD_TRACE_PROPAGATION_STYLE_EXTRACT` and `DD_TRACE_PROPAGATION_STYLE`
  // environment variables.
  config.extraction_styles = {dd::PropagationStyle::W3C};

  ...
}
```

{{% /tab %}}

{{< /tabs >}}

If multiple extraction styles are enabled, the extraction attempt is done on the order those styles are configured and first successful extracted value is used.

The default injection and extractions settings for the most recent versions of the library are `datadog,tracecontext`.

### Extract propagated context
Propagation context extraction can be accomplished by implementing a custom `DictReader` interface and calling `Tracer::extract_span` or `Tracer::extract_or_create_span`.

Here is an implementation to extract propagation context from HTTP Headers:

```cpp
#include <datadog/dict_reader.h>
#include <datadog/optional.h>
#include <datadog/string_view.h>

#include <unordered_map>

namespace dd = datadog::tracing;

class HTTPHeadersReader : public datadog::tracing::DictReader {
  std::unordered_map<dd::StringView, dd::StringView> headers_;

public:
  HTTPHeadersReader(std::unordered_map<dd::StringView, dd::StringView> headers)
    : headers_(std::move(headers)) {}

  ~HTTPHeadersReader() override = default;

  // Return the value at the specified `key`, or return `nullopt` if there
  // is no value at `key`.
  dd::Optional<dd::StringView> lookup(dd::StringView key) const override {
    auto found = headers_.find(key);
    if (found == headers_.cend()) return dd::nullopt;

    return found->second;
  }

  // Invoke the specified `visitor` once for each key/value pair in this object.
  void visit(
      const std::function<void(dd::StringView key, dd::StringView value)>& visitor)
      const override {
      for (const auto& [key, value] : headers_) {
        visitor(key, value);
      }
  };
};

// Usage example:
void handle_http_request(const Request& request, datadog::tracing::Tracer& tracer) {
  HTTPHeadersReader reader{request.headers};
  auto maybe_span = tracer.extract_span(reader);
  ..
}
```

### Inject context for distributed tracing
Propagation context injection can be accomplished by implementing the `DictWriter` interface and calling `Span::inject` on a span instance.

```cpp
#include <datadog/dict_writer.h>
#include <datadog/string_view.h>

#include <string>
#include <unordered_map>

using namespace dd = datadog::tracing;

class HTTPHeaderWriter : public dd::DictWriter {
  std::unordered_map<std::string, std::string>& headers_;

public:
  explicit HTTPHeaderWriter(std::unordered_map<std::string, std::string>& headers) : headers_(headers) {}

  ~HTTPHeaderWriter() override = default;

  void set(dd::StringView key, dd::StringView value) override {
    headers_.emplace(key, value);
  }
};

// Usage example:
void handle_http_request(const Request& request, dd::Tracer& tracer) {
  auto span = tracer.create_span();

  HTTPHeaderWriter writer(request.headers);
  span.inject(writer);
  // `request.headers` now populated with the headers needed to propagate the span.
  ..
}
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/w3c/trace-context
[9]: https://github.com/opentracing/opentracing-cpp/#inject-span-context-into-a-textmapwriter
[10]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/propagation.h
[11]: https://github.com/openzipkin/b3-propagation