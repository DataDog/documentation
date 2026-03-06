---
title: Enable Dynamic Instrumentation for Ruby
description: Set up Dynamic Instrumentation for Ruby applications to add probes and capture data without code changes.
aliases:
    - /dynamic_instrumentation/enabling/ruby/
    - /tracing/dynamic_instrumentation/enabling/ruby
private: false
code_lang: ruby
type: multi-code-lang
code_lang_weight: 50
further_reading:
    - link: 'agent'
      tag: 'Documentation'
      text: 'Getting Started with Datadog Agent'
---

{{< partial name="dynamic_instrumentation/beta-callout.html" language="Ruby" limitations_anchor="unsupported-features" >}}

Dynamic Instrumentation is a feature provided by the Datadog tracing library. If you are already using [APM to collect traces][1] for your application, ensure your Agent and tracing library are on the required version. Then, go directly to enabling Dynamic Instrumentation in step 4.

## Prerequisites

Before you begin, review the [prerequisites][12]. Ruby applications also require:

- **Tracing library**: [`ddtrace`][13] version 2.9.0 or higher.
- **Ruby version**: Ruby 2.6 or higher.
- **Ruby implementation**: Only MRI (CRuby) is supported. JRuby and other Ruby implementations are not supported.
- **Web framework**: Only Rack-based applications are supported (including Rails, Sinatra, and other Rack-compatible frameworks). Background processes and jobs (including Sidekiq, Resque, etc.) are not supported.
- **Environment**: `RAILS_ENV` or `RACK_ENV` must be set to `production`. Development environments are not supported.

## Installation

1. Install or upgrade your Agent to version [7.49.0][7] or higher.
2. If you don't already have APM enabled, in your Agent configuration, set the `DD_APM_ENABLED` environment variable to `true` and listening to the port `8126/TCP`.
3. Install or upgrade the Ruby tracing library to version 2.9.0 or higher, by following the [relevant instructions][2].
4. Run your service with Dynamic Instrumentation enabled by setting the `DD_DYNAMIC_INSTRUMENTATION_ENABLED` environment variable to `true`. Specify `DD_SERVICE`, `DD_ENV`, and `DD_VERSION` Unified Service Tags so you can filter and group your instrumentations and target active clients across these dimensions.
5. After starting your service with Dynamic Instrumentation enabled, you can start using Dynamic Instrumentation on the [APM > Dynamic Instrumentation page][3].

**Note**: Dynamic Instrumentation initializes when the application processes its first HTTP request. Ensure your application receives at least one request after startup before creating probes.

## Configuration

Configure Dynamic Instrumentation using the following environment variables:

| Environment variable                             | Type          | Description                                                                                                               |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `DD_DYNAMIC_INSTRUMENTATION_ENABLED`             | Boolean       | Set to `true` to enable Dynamic Instrumentation.                                                                          |
| `DD_SERVICE`                                     | String        | The [service][4] name, for example, `web-backend`.                                                                        |
| `DD_ENV`                                         | String        | The [environment][4] name, for example, `production`.                                                                     |
| `DD_VERSION`                                     | String        | The [version][4] of your service.                                                                                         |
| `DD_TAGS`                                        | String        | Tags to apply to produced data. Must be a list of `<key>:<value>` separated by commas such as: `layer:api,team:intake`.   |

## What to do next

See [Dynamic Instrumentation][5] for information about adding instrumentations and browsing and indexing the data.

## Ruby-specific considerations

### Instrumentable code

Line probes can only be placed on executable lines of code. The following example shows which lines can be targeted:

```ruby
def example_method(param)    # Cannot instrument (method definition)
  if param == 1              # Can instrument
    result = "yes"           # Can instrument
  else                       # Cannot instrument
    result = "no"            # Can instrument
  end                        # Cannot instrument
  result                     # Can instrument
end                          # Can instrument (method exit)
```

Lines that cannot be instrumented include method definition lines (`def`), `else`/`elsif` clauses, most `end` keywords (except the final `end` of a method), comment-only lines, and empty lines.

### Expression language instance variable conflicts

Ruby's use of `@` for instance variables creates conflicts with Dynamic Instrumentation's expression language special variables. The following variable names are reserved and cannot be accessed if used as instance variables in your Ruby code:

- `@return` - The return value of the method
- `@duration` - Method execution duration
- `@exception` - Any exception raised by the method
- `@it` - Current item in collection operations
- `@key` - Current key in hash operations
- `@value` - Current value in hash operations

If your code uses instance variables with these names, rename them to use Dynamic Instrumentation expressions that reference them.

### Code loading timing

Dynamic Instrumentation tracks code as it loads. For line probes to work correctly:

- Files must be loaded **after** the Datadog tracer initializes
- Code loaded before the tracer starts cannot be instrumented with line probes
- Method probes can still work for classes defined before tracking starts
- Best practice: Ensure the tracer initializes early in your application boot process

## Supported features

- [Dynamic Logs][8] (log probes)
- Line probes (capture variables at a specific line)
- Method probes (capture method entry and exit)
- Probe conditions using [Expression Language][11]
- Message templates using [Expression Language][11]
- [PII redaction][10]
- [Source code integration][9]

## Limitations

The following features available in other languages are not supported for Ruby:

- Dynamic Metrics
- Dynamic Spans
- Dynamic Span Tags
- Local variable capture for method probes (use line probes inside the method as a workaround)

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/
[2]: /tracing/trace_collection/dd_libraries/ruby/
[3]: https://app.datadoghq.com/dynamic-instrumentation
[4]: /getting_started/tagging/unified_service_tagging
[5]: /dynamic_instrumentation/
[7]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[8]: /dynamic_instrumentation/#creating-log-probes
[9]: /integrations/guide/source-code-integration/?tab=ruby
[10]: /dynamic_instrumentation/sensitive-data-scrubbing/#custom-identifier-redaction
[11]: /dynamic_instrumentation/expression-language/
[12]: /dynamic_instrumentation/#prerequisites
[13]: https://github.com/DataDog/dd-trace-rb
