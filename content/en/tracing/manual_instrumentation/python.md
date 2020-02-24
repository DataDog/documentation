---
title: Python Manual Instrumentation
kind: documentation
decription: 'Manually instrument your Python application to send custom traces to Datadog.'
further_reading:
    - link: 'tracing/guide/instrument_custom_method'
      tag: 'Guide'
      text: 'Instrument a custom method to get deep visibility into your business logic'
    - link: 'tracing/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/opentracing'
      tag: 'Documentation'
      text: 'Implement Opentracing across your applications'
    - link: 'tracing/visualization/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---

If you aren't using supported library instrumentation (see [library compatibility][1]), you may want to manually instrument your code.

You may also want to extend the functionality of the `ddtrace` library or gain finer control over instrumenting your application. Several techniques are provided by the library to accomplish this.

The following examples use the global tracer object which can be imported via:

```python
from ddtrace import tracer
```

{{< tabs >}}
{{% tab "Decorator" %}}

`ddtrace` provides a decorator that can be used to trace a particular method in your application:

```python
  @tracer.wrap()
  def business_logic():
    """A method that would be of interest to trace."""
    # ...
    # ...
```

API details for the decorator can be found at [`ddtrace.Tracer.wrap()`][1]

[1]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Tracer.wrap

{{% /tab %}}
{{% tab "Context Manager" %}}

To trace an arbitrary block of code, you can use the [`ddtrace.Span`][1] context manager:

```python
  # trace some interesting operation
  with tracer.trace('interesting.operations'):
    # do some interesting operation(s)
    # ...
    # ...
```

Further API details can be found at [`ddtrace.Tracer()`][2]

[1]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Span
[2]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#tracer

{{% /tab %}}
{{% tab "API" %}}

If the decorator and context manager methods are still not enough to satisfy your tracing needs, a manual API is provided which allows you to start and finish [spans][1] however you may require:

```python
  span = tracer.trace('operations.of.interest')

  # do some operation(s) of interest in between

  # NOTE: make sure to call span.finish() or the entire trace is not sent
  # to Datadog
  span.finish()
```

API details of the decorator can be found here:

- [`ddtrace.Tracer.trace`][2]
- [`ddtrace.Span.finish`][3]

[1]: /tracing/visualization/#spans
[2]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Tracer.trace
[3]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Span.finish

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup/python/#compatibility
